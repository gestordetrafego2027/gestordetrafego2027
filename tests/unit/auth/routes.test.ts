import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const verifyOtp = vi.fn()
const exchangeCodeForSession = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: async () => ({ auth: { verifyOtp, exchangeCodeForSession } }),
}))

const { GET: confirmGET } = await import('@/app/auth/confirm/route')
const { GET: callbackGET } = await import('@/app/auth/callback/route')

// Simula o proxy do Coolify: o host que chega ao Next é o do container.
function reqAsBehindProxy(path: string) {
  return new Request(`http://0.0.0.0:3000${path}`, { headers: { host: '0.0.0.0:3000' } })
}

const ORIGINAL = process.env.NEXT_PUBLIC_SITE_URL

beforeEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://housemazzutti.com'
  verifyOtp.mockReset()
  exchangeCodeForSession.mockReset()
})
afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL
})

describe('/auth/confirm', () => {
  it('valida o token e manda para o destino, sempre no domínio público', async () => {
    verifyOtp.mockResolvedValue({ error: null })
    const res = await confirmGET(
      reqAsBehindProxy('/auth/confirm/?token_hash=abc&type=recovery&next=/login/redefinir/'),
    )
    expect(verifyOtp).toHaveBeenCalledWith({ token_hash: 'abc', type: 'recovery' })
    expect(res.headers.get('location')).toBe('https://housemazzutti.com/login/redefinir/')
  })

  it('link expirado cai em /login/recuperar com mensagem acionável', async () => {
    verifyOtp.mockResolvedValue({
      error: { message: 'Email link is invalid or has expired', code: 'otp_expired' },
    })
    const res = await confirmGET(
      reqAsBehindProxy('/auth/confirm/?token_hash=abc&type=recovery&next=/login/redefinir/'),
    )
    const loc = new URL(res.headers.get('location')!)
    expect(loc.origin).toBe('https://housemazzutti.com')
    expect(loc.pathname).toBe('/login/recuperar/')
    expect(loc.searchParams.get('error')).toMatch(/expirou ou já foi utilizado/i)
  })

  it('ignora next apontando para fora do domínio', async () => {
    verifyOtp.mockResolvedValue({ error: null })
    const res = await confirmGET(
      reqAsBehindProxy('/auth/confirm/?token_hash=abc&type=recovery&next=https://evil.com'),
    )
    expect(res.headers.get('location')).toBe('https://housemazzutti.com/crm/')
  })

  it('rejeita type desconhecido sem chamar o Supabase', async () => {
    const res = await confirmGET(reqAsBehindProxy('/auth/confirm/?token_hash=abc&type=hack'))
    expect(verifyOtp).not.toHaveBeenCalled()
    expect(res.headers.get('location')).toContain('/login/')
  })
})

describe('/auth/callback (compatibilidade)', () => {
  it('reproduz o bug do print e prova a correção: nunca 0.0.0.0:3000', async () => {
    const res = await callbackGET(
      reqAsBehindProxy(
        '/auth/callback/?error=access_denied&error_code=otp_expired' +
          '&error_description=Email+link+is+invalid+or+has+expired&next=/login/redefinir/',
      ),
    )
    const loc = res.headers.get('location')!
    expect(loc).not.toContain('0.0.0.0')
    expect(loc.startsWith('https://housemazzutti.com/login/recuperar/')).toBe(true)
  })

  it('ainda troca o ?code= de links já enviados', async () => {
    exchangeCodeForSession.mockResolvedValue({ error: null })
    const res = await callbackGET(
      reqAsBehindProxy('/auth/callback/?code=xyz&next=/login/redefinir/'),
    )
    expect(exchangeCodeForSession).toHaveBeenCalledWith('xyz')
    expect(res.headers.get('location')).toBe('https://housemazzutti.com/login/redefinir/')
  })

  it('falha de PKCE não vaza jargão nem host interno', async () => {
    exchangeCodeForSession.mockResolvedValue({
      error: { message: 'PKCE code verifier not found in storage.', code: null },
    })
    const res = await callbackGET(
      reqAsBehindProxy('/auth/callback/?code=xyz&next=/login/redefinir/'),
    )
    const loc = new URL(res.headers.get('location')!)
    expect(loc.origin).toBe('https://housemazzutti.com')
    expect(loc.pathname).toBe('/login/recuperar/')
    expect(loc.searchParams.get('error')).not.toMatch(/PKCE/i)
  })

  it('aceita token_hash também, para links novos que caírem aqui', async () => {
    verifyOtp.mockResolvedValue({ error: null })
    const res = await callbackGET(
      reqAsBehindProxy('/auth/callback/?token_hash=abc&type=recovery&next=/login/redefinir/'),
    )
    expect(verifyOtp).toHaveBeenCalled()
    expect(res.headers.get('location')).toBe('https://housemazzutti.com/login/redefinir/')
  })

  it('sem code e sem token_hash: entrega a ponte de hash apontando para o domínio público', async () => {
    const res = await callbackGET(reqAsBehindProxy('/auth/callback/?next=/login/redefinir/'))
    const html = await res.text()
    expect(res.status).toBe(200)
    expect(html).toContain('https://housemazzutti.com/auth/callback/')
    expect(html).not.toContain('0.0.0.0')
  })
})
