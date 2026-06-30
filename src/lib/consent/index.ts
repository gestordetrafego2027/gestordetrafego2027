/**
 * Consentimento de cookies (LGPD / GDPR) — modelo granular.
 *
 * Categorias:
 *  - essential : sempre ativo (sessão, idioma, segurança, carrinho). Não opcional.
 *  - analytics : Google Analytics 4 (medição de audiência).
 *  - marketing : Meta Pixel e remarketing.
 *
 * O estado é persistido em um cookie first-party `hmzt-consent` (JSON),
 * para que tanto o cliente quanto o servidor possam lê-lo. Versionado:
 * se a política de cookies mudar, suba CONSENT_VERSION para re-exibir o banner.
 */

export const CONSENT_COOKIE = 'hmzt-consent'
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180 // 180 dias (recomendação ANPD)

export type ConsentCategory = 'analytics' | 'marketing'

export interface ConsentState {
  v: number
  analytics: boolean
  marketing: boolean
  ts: number // epoch ms da decisão
}

export const DENIED: Omit<ConsentState, 'ts'> = {
  v: CONSENT_VERSION,
  analytics: false,
  marketing: false,
}

export const GRANTED_ALL: Omit<ConsentState, 'ts'> = {
  v: CONSENT_VERSION,
  analytics: true,
  marketing: true,
}

/** Faz o parse de uma string de cookie; retorna null se inválida/desatualizada. */
export function parseConsent(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null
  try {
    const data = JSON.parse(decodeURIComponent(raw))
    if (
      typeof data !== 'object' ||
      data === null ||
      data.v !== CONSENT_VERSION ||
      typeof data.analytics !== 'boolean' ||
      typeof data.marketing !== 'boolean'
    ) {
      return null
    }
    return data as ConsentState
  } catch {
    return null
  }
}

/** Lê o consentimento do `document.cookie` (apenas no browser). */
export function readConsentClient(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
  return parseConsent(match?.split('=').slice(1).join('='))
}

/** Grava o consentimento no `document.cookie` (apenas no browser). */
export function writeConsentClient(state: Omit<ConsentState, 'ts'>): ConsentState {
  const full: ConsentState = { ...state, v: CONSENT_VERSION, ts: Date.now() }
  if (typeof document !== 'undefined') {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie =
      `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(full))}` +
      `; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`
  }
  return full
}
