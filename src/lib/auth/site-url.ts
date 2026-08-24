/**
 * Origem canônica pública + saneamento de destinos de redirect do fluxo de auth.
 *
 * Por que existe: atrás do proxy do Coolify o Next resolve `request.url` com o
 * host interno do container (0.0.0.0:3000). Todo redirect construído a partir de
 * `new URL(path, url.origin)` virava `https://0.0.0.0:3000/...` — Location morto
 * no navegador. Era a causa do "Não é possível acessar esse site" ao abrir o link
 * de recuperação de senha. Nenhuma rota de auth deve derivar origem do request.
 */

const FALLBACK_ORIGIN = 'https://housemazzutti.com'

// Hosts internos/loopback: válidos dentro do container, inúteis para o navegador.
const INTERNAL_HOST = /^(0\.0\.0\.0|127(?:\.\d+){3}|\[::1?\]|localhost)(:\d+)?$/i

function normalize(raw: string | null | undefined, proto: string, allowInternal: boolean) {
  const value = raw?.trim()
  if (!value) return null
  const withProto = /^https?:\/\//i.test(value) ? value : `${proto}://${value}`
  try {
    const url = new URL(withProto)
    if (!allowInternal && INTERNAL_HOST.test(url.host)) return null
    return url.origin
  } catch {
    return null
  }
}

/**
 * Origem pública do site. Ordem: NEXT_PUBLIC_SITE_URL → x-forwarded-host →
 * host → fallback. Em desenvolvimento o host do request vem primeiro, para o
 * fluxo funcionar em http://localhost:3000.
 */
export function resolveSiteOrigin(h?: Headers): string {
  const isDev = process.env.NODE_ENV === 'development'
  const proto = h?.get('x-forwarded-proto')?.split(',')[0]?.trim() || (isDev ? 'http' : 'https')

  const fromRequest = () => {
    if (!h) return null
    return (
      normalize(h.get('x-forwarded-host')?.split(',')[0], proto, isDev) ??
      normalize(h.get('host'), proto, isDev)
    )
  }

  if (isDev) {
    const req = fromRequest()
    if (req) return req
  }

  return (
    normalize(process.env.NEXT_PUBLIC_SITE_URL, proto, false) ?? fromRequest() ?? FALLBACK_ORIGIN
  )
}

/**
 * Saneia o `next` de um link de e-mail: só caminho interno, nunca host externo.
 * Normaliza a barra final porque o projeto roda com `trailingSlash: true` —
 * evita um 308 extra no meio do fluxo de autenticação.
 */
export function safeNext(next: string | null | undefined, fallback = '/crm/'): string {
  const value = next?.trim()
  if (!value) return fallback
  // Bloqueia open redirect: "//evil.com" e "/\\evil.com" são tratados como absolutos.
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback

  const cut = value.search(/[?#]/)
  const pathname = cut === -1 ? value : value.slice(0, cut)
  const suffix = cut === -1 ? '' : value.slice(cut)
  const lastSegment = pathname.split('/').pop() ?? ''
  const needsSlash = !pathname.endsWith('/') && !lastSegment.includes('.')

  return `${needsSlash ? `${pathname}/` : pathname}${suffix}`
}

/** Monta uma URL absoluta de redirect a partir da origem canônica. */
export function authRedirectUrl(path: string, origin: string): URL {
  return new URL(path, origin)
}
