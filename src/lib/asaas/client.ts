/**
 * Asaas HTTP client.
 *
 * - Header de auth: `access_token` (NÃO é Bearer).
 * - Base URL conforme ASAAS_ENV (sandbox|production).
 * - Retry exponencial até 3x em 5xx ou timeout (15s por tentativa).
 * - Idempotency-Key opcional em POSTs (Asaas suporta em endpoints de pagamento).
 * - Erros tipados via AsaasError.
 *
 * NUNCA importar em código client-side: vaza a API key.
 */
import { logger } from '@/lib/logger'

const log = logger.child({ module: 'asaas/client' })

export type AsaasEnv = 'sandbox' | 'production'

export function getAsaasBaseUrl(env?: AsaasEnv): string {
  const e = env ?? (process.env.ASAAS_ENV as AsaasEnv | undefined) ?? 'sandbox'
  return e === 'production' ? 'https://api.asaas.com/v3' : 'https://sandbox.asaas.com/api/v3'
}

function getApiKey(): string {
  const key = process.env.ASAAS_API_KEY
  if (!key) throw new Error('ASAAS_API_KEY não configurada.')
  return key
}

export class AsaasError extends Error {
  readonly code: string
  readonly status: number
  readonly body: unknown

  constructor(message: string, opts: { code?: string; status: number; body?: unknown }) {
    super(message)
    this.name = 'AsaasError'
    this.code = opts.code ?? 'asaas_error'
    this.status = opts.status
    this.body = opts.body
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  body?: unknown
  query?: Record<string, string | number | undefined>
  idempotencyKey?: string
  /** Tentativas máximas em 5xx/timeout. Default 3. */
  maxRetries?: number
  /** Timeout por tentativa em ms. Default 15000. */
  timeoutMs?: number
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const base = getAsaasBaseUrl()
  const url = new URL(base + (path.startsWith('/') ? path : '/' + path))
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
    }
  }
  return url.toString()
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

export async function asaasFetch<T = unknown>(opts: RequestOptions): Promise<T> {
  const method = opts.method ?? 'GET'
  const url = buildUrl(opts.path, opts.query)
  const maxRetries = opts.maxRetries ?? 3
  const timeoutMs = opts.timeoutMs ?? 15_000

  let lastErr: unknown
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        method,
        headers: {
          access_token: getApiKey(),
          'Content-Type': 'application/json',
          ...(opts.idempotencyKey ? { 'Idempotency-Key': opts.idempotencyKey } : {}),
        },
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        signal: controller.signal,
      })
      clearTimeout(timer)

      const text = await res.text()
      const parsed: unknown = text ? safeJson(text) : null

      if (!res.ok) {
        // 5xx → retry; 4xx → falha imediata
        if (res.status >= 500 && attempt < maxRetries) {
          const backoff = 250 * 2 ** (attempt - 1)
          log.warn({ status: res.status, attempt, url }, 'asaas 5xx — retry')
          await sleep(backoff)
          continue
        }
        const errCode = extractCode(parsed)
        throw new AsaasError(`Asaas ${res.status} ${errCode}`, {
          code: errCode,
          status: res.status,
          body: parsed,
        })
      }

      return parsed as T
    } catch (err) {
      clearTimeout(timer)
      lastErr = err
      if (err instanceof AsaasError) throw err
      // timeout / network → retry
      if (attempt < maxRetries) {
        const backoff = 250 * 2 ** (attempt - 1)
        log.warn({ err: String(err), attempt, url }, 'asaas network — retry')
        await sleep(backoff)
        continue
      }
    }
  }
  throw new AsaasError('Asaas request failed após retries', {
    code: 'network',
    status: 0,
    body: String(lastErr),
  })
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function extractCode(body: unknown): string {
  if (body && typeof body === 'object' && 'errors' in body) {
    const errs = (body as { errors: unknown }).errors
    if (Array.isArray(errs) && errs[0] && typeof errs[0] === 'object' && 'code' in errs[0]) {
      return String((errs[0] as { code: unknown }).code)
    }
  }
  return 'asaas_error'
}
