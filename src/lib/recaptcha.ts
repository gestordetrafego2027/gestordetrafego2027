import { logger } from '@/lib/logger'

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const MIN_SCORE = 0.5 // abaixo disso = provável bot

/**
 * Verifica token reCAPTCHA v3 no servidor.
 * Retorna { ok: true, score } se legítimo, { ok: false, reason } se suspeito.
 *
 * Se RECAPTCHA_SECRET_KEY não estiver configurado, retorna ok=true (fail-open em dev).
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  action?: string,
): Promise<{ ok: boolean; score?: number; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    logger.debug('recaptcha: RECAPTCHA_SECRET_KEY não configurado — pulando verificação')
    return { ok: true }
  }

  if (!token) {
    return { ok: false, reason: 'Token reCAPTCHA ausente.' }
  }

  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })

    if (!res.ok) {
      logger.error({ status: res.status }, 'recaptcha: erro HTTP')
      return { ok: true } // fail-open em caso de erro na API do Google
    }

    const data = await res.json()

    if (!data.success) {
      logger.warn({ errors: data['error-codes'] }, 'recaptcha: token inválido')
      return { ok: false, reason: 'Token reCAPTCHA inválido.' }
    }

    if (action && data.action !== action) {
      logger.warn({ expected: action, got: data.action }, 'recaptcha: action mismatch')
      return { ok: false, reason: 'Ação reCAPTCHA inválida.' }
    }

    if (data.score < MIN_SCORE) {
      logger.warn({ score: data.score }, 'recaptcha: score baixo — possível bot')
      return { ok: false, score: data.score, reason: 'Score reCAPTCHA muito baixo.' }
    }

    return { ok: true, score: data.score }
  } catch (err) {
    logger.error({ err }, 'recaptcha: exceção — permitindo por segurança')
    return { ok: true } // fail-open
  }
}
