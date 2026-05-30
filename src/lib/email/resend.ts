import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const FROM = process.env.RESEND_FROM || 'House Mazzutti <noreply@housemazzutti.com.br>'

let _client: Resend | null = null
function getClient(): Resend | null {
  if (!apiKey) return null
  if (!_client) _client = new Resend(apiKey)
  return _client
}

export interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function sendEmail(params: SendEmailParams): Promise<{ id: string | null }> {
  const client = getClient()
  if (!client) {
    console.warn('[email/resend] RESEND_API_KEY ausente — email nao enviado:', params.subject)
    return { id: null }
  }
  const { data, error } = await client.emails.send({
    from: params.from || FROM,
    to: params.to,
    subject: params.subject,
    html: params.html,
    ...(params.replyTo ? { replyTo: params.replyTo } : {}),
  })
  if (error) {
    console.error('[email/resend] erro ao enviar:', error)
    throw new Error(error.message || 'Resend send failed')
  }
  return { id: data?.id ?? null }
}
