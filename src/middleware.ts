import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const intlMiddleware = createMiddleware(routing)

// Rotas fora do i18n (sem prefixo de locale)
const NON_I18N = ['/crm', '/login', '/logout', '/api', '/academy', '/auth', '/sitemap.xml', '/robots.txt']

/**
 * Rate limiting NÃO pode rodar no middleware Edge Runtime (Node.js APIs).
 * Está implementado diretamente nos route handlers via @upstash/ratelimit:
 *   - POST /api/store/checkout     → 5 req/min por IP
 *   - GET  /api/store/validate-coupon → 10 req/min por IP
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas sem i18n: só Supabase auth
  if (NON_I18N.some((prefix) => pathname.startsWith(prefix))) {
    return await updateSession(request)
  }

  // next-intl: detecta locale, redireciona / → /pt/, etc.
  const intlResponse = intlMiddleware(request)
  if (intlResponse && intlResponse.status !== 200) return intlResponse

  // Supabase session (mantém cookie atualizado)
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|woff|woff2|ttf|otf|ico|xml|txt)$).*)',
  ],
}
