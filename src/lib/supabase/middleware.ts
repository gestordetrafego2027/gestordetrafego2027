import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PREFIX = '/crm'
const AUTH_PAGE = '/login'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Fail-open: sem Supabase configurado, não derruba o site institucional.
  // /crm continua bloqueado por proteção em layout, e /login só funciona com auth.
  if (!url || !anonKey) {
    if (request.nextUrl.pathname.startsWith(PROTECTED_PREFIX)) {
      const u = request.nextUrl.clone()
      u.pathname = AUTH_PAGE
      u.searchParams.set('error', 'Supabase não configurado neste ambiente.')
      return NextResponse.redirect(u)
    }
    return supabaseResponse
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // IMPORTANTE: não rode código entre createServerClient e getUser() —
  // qualquer erro aqui pode causar logout silencioso.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Rota protegida sem usuário → manda para login com ?next=
  if (pathname.startsWith(PROTECTED_PREFIX) && !user) {
    const u = request.nextUrl.clone()
    u.pathname = AUTH_PAGE
    u.searchParams.set('next', pathname)
    return NextResponse.redirect(u)
  }

  // Já autenticado tentando ver /login → manda para /crm
  if (pathname === AUTH_PAGE && user) {
    const u = request.nextUrl.clone()
    u.pathname = '/crm'
    u.search = ''
    return NextResponse.redirect(u)
  }

  return supabaseResponse
}
