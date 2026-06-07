/**
 * reCAPTCHA v3 — cliente (browser).
 *
 * Carrega o script do Google de forma PREGUIÇOSA (só na primeira vez que
 * um formulário precisa de um token), para não impactar performance nem
 * a privacidade de quem só navega. Gera tokens por `action`.
 *
 * Uso:
 *   import { getRecaptchaToken } from '@/lib/recaptcha/client'
 *   const token = await getRecaptchaToken('newsletter')
 *
 * Se NEXT_PUBLIC_RECAPTCHA_SITE_KEY não estiver configurado, retorna null
 * (o servidor faz fail-open — ver src/lib/recaptcha.ts).
 */

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no-window'))
  if (window.grecaptcha) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById('recaptcha-v3')
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.id = 'recaptcha-v3'
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('recaptcha-load-failed'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

/**
 * Gera um token reCAPTCHA v3 para a ação informada.
 * Nunca lança: em caso de erro/ausência de chave, retorna null e deixa
 * o servidor decidir (fail-open). Assim um problema no Google nunca
 * bloqueia um lead legítimo.
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!SITE_KEY) return null
  try {
    await loadScript()
    const grecaptcha = window.grecaptcha
    if (!grecaptcha) return null
    await new Promise<void>((resolve) => grecaptcha.ready(resolve))
    return await grecaptcha.execute(SITE_KEY, { action })
  } catch {
    return null
  }
}

export const recaptchaEnabled = Boolean(SITE_KEY)
