import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const intlMiddleware = createMiddleware(routing)

// Rotas fora do i18n (sem prefixo de locale)
const NON_I18N = ['/crm', '/login', '/logout', '/api', '/academy', '/auth', '/sitemap.xml', '/robots.txt']

// Rotas de API da loja com rate limit geral (cobertura extra além dos handlers)
const STORE_API_PATHS = ['/api/store/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rate limit geral nas APIs da loja (fail-open se Upstash não configurado)
  if (STORE_API_PATHS.some((p) => pathname.startsWith(p))) {
    const ip = getClientIp(request)
    const rl = await checkRateLimit('api_general', ip)
    if (!rl.allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Muitas requisições. Tente novamente em instantes.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rl.retryAfter ?? 60),
          },
        },
      )
    }
  }

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
