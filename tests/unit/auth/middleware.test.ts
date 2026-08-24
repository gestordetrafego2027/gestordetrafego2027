import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const getUser = vi.fn()

vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({ auth: { getUser } }),
}))

const { updateSession } = await import('@/lib/supabase/middleware')

function req(path: string) {
  return new NextRequest(new Request(`https://housemazzutti.com${path}`))
}

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://ohmnzalkfbhdivtttzsa.supabase.co'
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key-de-teste'
  getUser.mockReset()
})

const logged = () => getUser.mockResolvedValue({ data: { user: { id: 'u1' } } })
const anon = () => getUser.mockResolvedValue({ data: { user: null } })

describe('updateSession', () => {
  it('autenticado em /login/ vai para /crm — trailingSlash não pode furar a comparação', async () => {
    logged()
    const res = await updateSession(req('/login/'))
    expect(res.headers.get('location')).toBe('https://housemazzutti.com/crm/')
  })

  it('idem sem a barra final (a barra do destino segue a da entrada; o 308 normaliza)', async () => {
    logged()
    const res = await updateSession(req('/login'))
    const loc = new URL(res.headers.get('location')!)
    expect(loc.origin).toBe('https://housemazzutti.com')
    expect(loc.pathname.replace(/\/+$/, '')).toBe('/crm')
  })

  it('NÃO desvia /login/redefinir/ — a sessão ali vem do link de recuperação', async () => {
    logged()
    const res = await updateSession(req('/login/redefinir/'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('NÃO desvia /login/recuperar/', async () => {
    logged()
    const res = await updateSession(req('/login/recuperar/'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('anônimo em /crm/ vai para /login com ?next=', async () => {
    anon()
    const res = await updateSession(req('/crm/leads/'))
    const loc = new URL(res.headers.get('location')!)
    expect(loc.pathname).toBe('/login/')
    expect(loc.searchParams.get('next')).toBe('/crm/leads/')
  })
})
