import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { resolveSiteOrigin, safeNext } from '@/lib/auth/site-url'
import { friendlyAuthError, failurePath } from '@/lib/auth/errors'

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

function headers(init: Record<string, string>) {
  return new Headers(init)
}

describe('resolveSiteOrigin', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://housemazzutti.com'
  })
  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL
  })

  it('usa NEXT_PUBLIC_SITE_URL', () => {
    expect(resolveSiteOrigin()).toBe('https://housemazzutti.com')
  })

  it('ignora o host interno do container — a regressão do 0.0.0.0:3000', () => {
    expect(resolveSiteOrigin(headers({ host: '0.0.0.0:3000' }))).toBe('https://housemazzutti.com')
  })

  it('cai no x-forwarded-host quando o env não está setado', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    const h = headers({ 'x-forwarded-host': 'crm.housemazzutti.com', 'x-forwarded-proto': 'https' })
    expect(resolveSiteOrigin(h)).toBe('https://crm.housemazzutti.com')
  })

  it('nunca devolve host interno, nem sem env nem sem headers', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    expect(resolveSiteOrigin(headers({ host: '0.0.0.0:3000' }))).toBe('https://housemazzutti.com')
    expect(resolveSiteOrigin(headers({ host: '127.0.0.1:3000' }))).toBe('https://housemazzutti.com')
    expect(resolveSiteOrigin()).toBe('https://housemazzutti.com')
  })
})

describe('safeNext', () => {
  it('bloqueia destino externo', () => {
    expect(safeNext('https://evil.com')).toBe('/crm/')
    expect(safeNext('//evil.com')).toBe('/crm/')
    expect(safeNext('/\\evil.com')).toBe('/crm/')
  })

  it('mantém caminho interno e normaliza a barra final', () => {
    expect(safeNext('/login/redefinir')).toBe('/login/redefinir/')
    expect(safeNext('/login/redefinir/')).toBe('/login/redefinir/')
    expect(safeNext('/crm/leads?status=novo')).toBe('/crm/leads/?status=novo')
  })

  it('usa o fallback quando vazio', () => {
    expect(safeNext(null)).toBe('/crm/')
    expect(safeNext('', '/login/')).toBe('/login/')
  })
})

describe('friendlyAuthError', () => {
  it('traduz o erro real do print: link expirado', () => {
    expect(friendlyAuthError('Email link is invalid or has expired', 'otp_expired')).toMatch(
      /expirou ou já foi utilizado/i,
    )
  })

  it('traduz a falha de PKCE em linguagem de usuário', () => {
    expect(friendlyAuthError('PKCE code verifier not found in storage.')).toMatch(
      /expirou ou já foi utilizado/i,
    )
  })

  it('não vaza mensagem crua desconhecida', () => {
    expect(friendlyAuthError('some internal boom')).toBe(
      'Não foi possível validar o link. Solicite um novo.',
    )
  })
})

describe('failurePath', () => {
  it('manda fluxo de senha para /login/recuperar', () => {
    expect(failurePath('recovery')).toBe('/login/recuperar/')
    expect(failurePath('invite')).toBe('/login/recuperar/')
  })
  it('demais fluxos vão para /login', () => {
    expect(failurePath('magiclink')).toBe('/login/')
    expect(failurePath(null)).toBe('/login/')
  })
})
