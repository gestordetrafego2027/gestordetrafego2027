/**
 * Cliente Resend singleton para envio de emails transacionais.
 *
 * Lê RESEND_API_KEY do ambiente. Se não estiver configurado,
 * exporta um stub que loga em vez de enviar (útil em dev).
 */
import { Resend } from 'resend'
import { logger } from '@/lib/logger'

const log = logger.child({ module: 'email/resend' })

const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM ?? 'House Mazzutti <contato@mztgrupo.com>'

let resend: Resend | null = null
if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY)
} else {
  log.warn('RESEND_API_KEY não configurada — emails serão apenas logados')
}

export interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!resend) {
    log.info({ to, subject }, '[STUB] email logado (RESEND_API_KEY ausente)')
    return { ok: true, id: 'stub' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
      replyTo,
    })

    if (error) {
      log.error({ error, to, subject }, 'erro ao enviar email')
      return { ok: false, error: error.message }
    }

    log.info({ id: data?.id, to, subject }, 'email enviado')
    return { ok: true, id: data?.id }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown'
    log.error({ err: msg, to, subject }, 'exceção ao enviar email')
    return { ok: false, error: msg }
  }
}

export { EMAIL_FROM }
