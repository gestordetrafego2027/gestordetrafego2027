/**
 * Token do Instagram com renovação automática.
 *
 * O token da Graph API vive ~60 dias. Guardar só em env var significa que a
 * seção da home morre a cada dois meses. Aqui o token fica no Supabase
 * (tabela integration_tokens, restrita ao service_role) e é renovado sozinho:
 *
 *   1. Primeira execução: semeia a linha com INSTAGRAM_ACCESS_TOKEN.
 *   2. A cada leitura, se a última renovação tem mais de 24h (ou o token vence
 *      em menos de 7 dias), chama refresh_access_token e grava o token novo.
 *      Cada renovação estende a validade por mais 60 dias.
 *   3. Trocou o token na mão no Coolify? A env vira a nova semente e sobrescreve
 *      o que está no banco — é a saída de emergência quando o token morre de vez.
 *
 * Degrada sem quebrar: sem Supabase, sem a tabela ou com a renovação falhando,
 * volta a usar o token da env direto.
 *
 * ⚠️ A renovação só existe no fluxo Instagram Login (graph.instagram.com).
 * Com INSTAGRAM_BUSINESS_ACCOUNT_ID setado o token é de Página do Facebook,
 * que não se renova por esse endpoint — nesse caso só usamos a env.
 */
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

const TOKEN_KEY = 'instagram'
/** Meta recusa renovar token com menos de 24h de vida. */
const REFRESH_EVERY_MS = 24 * 60 * 60 * 1000
/** Renova antes da hora se estiver perto de vencer. */
const RENEW_WHEN_EXPIRING_IN_MS = 7 * 24 * 60 * 60 * 1000
/** Memória de processo — evita ler o banco a cada visita da home. */
const MEMO_TTL_MS = 10 * 60 * 1000

type TokenRow = {
  key: string
  access_token: string
  expires_at: string | null
  refreshed_at: string | null
  metadata: { seed?: string } | null
}

let memo: { token: string; at: number } | null = null
/** Tabela ausente/banco fora do ar: para de bater no Supabase e de logar a cada visita. */
let dbUnavailableUntil = 0

function readMemo(): string | null {
  if (memo && Date.now() - memo.at < MEMO_TTL_MS) return memo.token
  return null
}

function writeMemo(token: string): string {
  memo = { token, at: Date.now() }
  return token
}

/** Só para teste — zera o cache de processo. */
export function resetInstagramTokenCache(): void {
  memo = null
  dbUnavailableUntil = 0
}

/** Token de Página do Facebook não passa pelo fluxo de refresh do Instagram. */
function usesFacebookPageToken(): boolean {
  return Boolean(process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID)
}

type TokenTable = {
  from: (table: string) => {
    select: (cols: string) => {
      eq: (
        col: string,
        val: string,
      ) => {
        maybeSingle: () => Promise<{ data: TokenRow | null; error: { message?: string } | null }>
      }
    }
    upsert: (
      row: Record<string, unknown>,
      opts: { onConflict: string },
    ) => Promise<{
      error: { message?: string } | null
    }>
  }
}

function tokenTable(): TokenTable | null {
  try {
    return createServiceClient() as unknown as TokenTable
  } catch {
    // Sem service_role configurado (build local, preview) — segue só com a env.
    return null
  }
}

async function persist(
  db: TokenTable,
  token: string,
  expiresInSeconds: number | null,
  seed: string | undefined,
): Promise<void> {
  const now = new Date()
  const { error } = await db.from('integration_tokens').upsert(
    {
      key: TOKEN_KEY,
      access_token: token,
      expires_at: expiresInSeconds
        ? new Date(now.getTime() + expiresInSeconds * 1000).toISOString()
        : null,
      refreshed_at: now.toISOString(),
      metadata: seed ? { seed } : {},
    },
    { onConflict: 'key' },
  )

  if (error) {
    logger.warn({ err: error.message }, '[instagram] não consegui gravar o token renovado')
  }
}

function isRefreshDue(row: TokenRow): boolean {
  const now = Date.now()

  if (row.expires_at) {
    const expiresIn = new Date(row.expires_at).getTime() - now
    if (expiresIn < RENEW_WHEN_EXPIRING_IN_MS) return true
  }

  if (!row.refreshed_at) return true
  return now - new Date(row.refreshed_at).getTime() > REFRESH_EVERY_MS
}

/**
 * Estende a validade do token por mais ~60 dias.
 * Retorna null quando a Meta recusa (token novo demais, expirado ou revogado).
 */
async function refresh(token: string): Promise<{ token: string; expiresIn: number } | null> {
  const url = new URL('https://graph.instagram.com/refresh_access_token')
  url.searchParams.set('grant_type', 'ig_refresh_token')
  url.searchParams.set('access_token', token)

  try {
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(6000) })
    if (!res.ok) {
      logger.warn({ status: res.status }, '[instagram] renovação de token recusada pela Meta')
      return null
    }

    const json = (await res.json()) as { access_token?: string; expires_in?: number }
    if (!json.access_token) return null

    return { token: json.access_token, expiresIn: json.expires_in ?? 60 * 24 * 60 * 60 }
  } catch (error) {
    logger.warn(
      { err: error instanceof Error ? error.message : String(error) },
      '[instagram] renovação de token falhou',
    )
    return null
  }
}

/** Token válido para chamar a Graph API, ou null se nada estiver configurado. */
export async function getInstagramAccessToken(): Promise<string | null> {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN || null

  if (usesFacebookPageToken()) return envToken

  const cached = readMemo()
  if (cached) return cached

  if (Date.now() < dbUnavailableUntil) return envToken

  const db = tokenTable()
  if (!db) return envToken

  const { data: row, error } = await db
    .from('integration_tokens')
    .select('key,access_token,expires_at,refreshed_at,metadata')
    .eq('key', TOKEN_KEY)
    .maybeSingle()

  if (error) {
    // Migration ainda não aplicada, ou banco fora do ar: segue com a env.
    dbUnavailableUntil = Date.now() + MEMO_TTL_MS
    logger.warn({ err: error.message }, '[instagram] integration_tokens indisponível — usando env')
    return envToken
  }

  // Env mudou (ou é a primeira vez): a env manda, vira a nova semente.
  const seedChanged = Boolean(envToken) && row?.metadata?.seed !== envToken
  if (!row || seedChanged) {
    if (!envToken) return row?.access_token ?? null
    await persist(db, envToken, null, envToken)
    return writeMemo(envToken)
  }

  if (!isRefreshDue(row)) return writeMemo(row.access_token)

  const renewed = await refresh(row.access_token)
  if (!renewed) {
    // Mantém o token atual; tenta de novo na próxima leitura fora do memo.
    return writeMemo(row.access_token)
  }

  await persist(db, renewed.token, renewed.expiresIn, row.metadata?.seed ?? envToken ?? undefined)
  logger.info('[instagram] token renovado por mais ~60 dias')
  return writeMemo(renewed.token)
}
