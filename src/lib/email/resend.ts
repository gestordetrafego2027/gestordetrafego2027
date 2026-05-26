import { Resend } from 'resend'
import { logger } from '@/lib/logger'

let _resend: Resend | null = null

export function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY não configurado.')
    _resend = new Resend(key)
  }
  return _resend
}

export const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? 'House Mazzutti <contato@mztgrupo.com>'

/**
 * Envia e-mail via Resend com logging e tratamento de erro.
 * Nunca lança — loga o erro e retorna false.
 */
export async function sendEmail(opts: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
  tags?: { name: string; value: string }[]
}): Promise<boolean> {
  const log = logger.child({ to: opts.to, subject: opts.subject })
  try {
    const resend = getResend()
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      reply_to: opts.replyTo,
      tags: opts.tags,
    })
    if (error) {
      log.error({ err: error }, 'resend: erro ao enviar e-mail')
      return false
    }
    log.info('e-mail enviado')
    return true
  } catch (err) {
    log.error({ err }, 'resend: exceção ao enviar e-mail')
    return false
  }
}
