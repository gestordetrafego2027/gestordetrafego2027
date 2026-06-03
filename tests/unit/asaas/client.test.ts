import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { asaasFetch, AsaasError } from '@/lib/asaas/client'

describe('asaas/client', () => {
  const originalFetch = globalThis.fetch
  beforeEach(() => {
    process.env.ASAAS_API_KEY = 'test_key'
    process.env.ASAAS_ENV = 'sandbox'
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('manda header access_token e Content-Type', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    )
    globalThis.fetch = fetchMock as unknown as typeof fetch

    await asaasFetch({ method: 'POST', path: '/x', body: { a: 1 } })

    const [, init] = fetchMock.mock.calls[0]
    expect(init.headers.access_token).toBe('test_key')
    expect(init.headers['Content-Type']).toBe('application/json')
    expect(init.method).toBe('POST')
    expect(init.body).toBe(JSON.stringify({ a: 1 }))
  })

  it('retry em 500 e sucesso na segunda tentativa', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response('{"err":1}', { status: 500 }))
      .mockResolvedValueOnce(new Response('{"ok":true}', { status: 200 }))
    globalThis.fetch = fetchMock as unknown as typeof fetch

    const res = await asaasFetch<{ ok: boolean }>({ path: '/x', maxRetries: 3 })
    expect(res.ok).toBe(true)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('falha imediata em 400 (não retry)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ errors: [{ code: 'invalid_cpf' }] }), { status: 400 }),
    )
    globalThis.fetch = fetchMock as unknown as typeof fetch

    await expect(asaasFetch({ path: '/x' })).rejects.toBeInstanceOf(AsaasError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('AsaasError preserva status, code, body', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ errors: [{ code: 'invalid_cpf' }] }), { status: 422 }),
      ) as unknown as typeof fetch

    try {
      await asaasFetch({ path: '/x' })
      throw new Error('deveria ter falhado')
    } catch (err) {
      expect(err).toBeInstanceOf(AsaasError)
      const e = err as AsaasError
      expect(e.status).toBe(422)
      expect(e.code).toBe('invalid_cpf')
      expect(e.body).toEqual({ errors: [{ code: 'invalid_cpf' }] })
    }
  })

  it('passa Idempotency-Key quando informado', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response('{}', { status: 200 }))
    globalThis.fetch = fetchMock as unknown as typeof fetch

    await asaasFetch({ method: 'POST', path: '/x', body: {}, idempotencyKey: 'abc' })

    const [, init] = fetchMock.mock.calls[0]
    expect(init.headers['Idempotency-Key']).toBe('abc')
  })
})
