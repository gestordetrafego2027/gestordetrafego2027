import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

/**
 * Cobre a máquina de estados do token: semear da env, renovar quando vence,
 * não renovar antes da hora, e degradar sem quebrar quando o banco falha.
 */

const upsert = vi.fn().mockResolvedValue({ error: null })
const maybeSingle = vi.fn()

vi.mock('@/lib/supabase/service', () => ({
  createServiceClient: () => ({
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle }) }),
      upsert,
    }),
  }),
}))

vi.mock('@/lib/logger', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), error: vi.fn(), debug: vi.fn() },
}))

const ONE_HOUR = 60 * 60 * 1000
const ONE_DAY = 24 * ONE_HOUR

function row(overrides: Record<string, unknown> = {}) {
  return {
    key: 'instagram',
    access_token: 'token-do-banco',
    expires_at: new Date(Date.now() + 50 * ONE_DAY).toISOString(),
    refreshed_at: new Date(Date.now() - ONE_HOUR).toISOString(),
    metadata: { seed: 'token-da-env' },
    ...overrides,
  }
}

async function load() {
  const mod = await import('@/lib/instagram-token')
  mod.resetInstagramTokenCache()
  return mod
}

describe('getInstagramAccessToken', () => {
  beforeEach(() => {
    vi.resetModules()
    upsert.mockClear()
    maybeSingle.mockReset()
    vi.unstubAllGlobals()
    process.env.INSTAGRAM_ACCESS_TOKEN = 'token-da-env'
    delete process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  })

  afterEach(() => {
    delete process.env.INSTAGRAM_ACCESS_TOKEN
    delete process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  })

  it('devolve null quando não há token configurado', async () => {
    delete process.env.INSTAGRAM_ACCESS_TOKEN
    maybeSingle.mockResolvedValue({ data: null, error: null })

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBeNull()
  })

  it('semeia o banco com o token da env na primeira execução', async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null })

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-da-env')
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({ access_token: 'token-da-env', metadata: { seed: 'token-da-env' } }),
      { onConflict: 'key' }
    )
  })

  it('usa o token do banco sem renovar quando a renovação não é devida', async () => {
    maybeSingle.mockResolvedValue({ data: row(), error: null })
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-do-banco')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('renova e persiste quando passaram mais de 24h', async () => {
    maybeSingle.mockResolvedValue({
      data: row({ refreshed_at: new Date(Date.now() - 2 * ONE_DAY).toISOString() }),
      error: null,
    })
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ access_token: 'token-renovado', expires_in: 5183944 }),
      })
    )

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-renovado')
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({ access_token: 'token-renovado' }),
      { onConflict: 'key' }
    )
  })

  it('renova quando o token está perto de vencer', async () => {
    maybeSingle.mockResolvedValue({
      data: row({ expires_at: new Date(Date.now() + 2 * ONE_DAY).toISOString() }),
      error: null,
    })
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: 'token-renovado', expires_in: 5183944 }),
    })
    vi.stubGlobal('fetch', fetchSpy)

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-renovado')
    expect(fetchSpy).toHaveBeenCalledOnce()
  })

  it('mantém o token atual quando a Meta recusa a renovação', async () => {
    maybeSingle.mockResolvedValue({
      data: row({ refreshed_at: new Date(Date.now() - 2 * ONE_DAY).toISOString() }),
      error: null,
    })
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 400 }))

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-do-banco')
    expect(upsert).not.toHaveBeenCalled()
  })

  it('sobrescreve o banco quando o token da env muda (troca manual)', async () => {
    process.env.INSTAGRAM_ACCESS_TOKEN = 'token-novo-na-mao'
    maybeSingle.mockResolvedValue({ data: row(), error: null })

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-novo-na-mao')
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({ metadata: { seed: 'token-novo-na-mao' } }),
      { onConflict: 'key' }
    )
  })

  it('cai para a env quando a tabela não existe', async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: { message: 'relation "integration_tokens" does not exist' },
    })

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-da-env')
    expect(upsert).not.toHaveBeenCalled()
  })

  it('não tenta renovar token de Página do Facebook', async () => {
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID = '123'
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const { getInstagramAccessToken } = await load()
    expect(await getInstagramAccessToken()).toBe('token-da-env')
    expect(maybeSingle).not.toHaveBeenCalled()
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
