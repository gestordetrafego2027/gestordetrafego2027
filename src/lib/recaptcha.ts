import { logger } from '@/lib/logger'

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const MIN_SCORE = 0.5
const IS_PROD = process.env.NODE_ENV === 'production'

/**
 * Verifica token reCAPTCHA v3 no servidor.
 * Em produção: fail-closed — qualquer falha bloqueia a requisição.
 * Em dev/test: fail-open quando RECAPTCHA_SECRET_KEY não está configurado.
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  action?: string,
): Promise<{ ok: boolean; score?: number; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    if (IS_PROD) {
      logger.error('recaptcha: RECAPTCHA_SECRET_KEY ausente em produção — bloqueando requisição')
      return { ok: false, reason: 'Verificação de segurança indisponível.' }
    }
    logger.debug('recaptcha: RECAPTCHA_SECRET_KEY não configurado — pulando em dev')
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
      logger.error({ status: res.status }, 'recaptcha: erro HTTP na API do Google')
      if (IS_PROD) return { ok: false, reason: 'Erro na verificação de segurança.' }
      return { ok: true }
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
    logger.error({ err }, 'recaptcha: exceção ao verificar token')
    if (IS_PROD) return { ok: false, reason: 'Erro na verificação de segurança.' }
    return { ok: true }
  }
}
