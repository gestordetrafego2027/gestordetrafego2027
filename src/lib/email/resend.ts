import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
// IMPORTANTE: usar subdomínio `send.housemazzutti.com` — é onde o Resend está
// autenticado (SPF amazonses + DKIM). Enviar pelo domínio raiz quebra SPF
// e manda os emails pra spam.
const FROM = process.env.RESEND_FROM || 'House Mazzutti <noreply@send.housemazzutti.com>'

let _client: Resend | null = null
function getClient(): Resend | null {
  if (!apiKey) return null
  if (!_client) _client = new Resend(apiKey)
  return _client
}

export interface SendEmailTag {
  name: string
  value: string
}

export interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
  tags?: SendEmailTag[]
}

export interface SendEmailResult {
  ok: boolean
  id?: string | null
  error?: string
}

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const client = getClient()
  if (!client) {
    console.warn('[email/resend] RESEND_API_KEY ausente — email nao enviado:', params.subject)
    return { ok: false, id: null, error: 'RESEND_API_KEY ausente' }
  }
  try {
    const { data, error } = await client.emails.send({
      from: params.from || FROM,
      to: params.to,
      subject: params.subject,
      html: params.html,
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
      ...(params.tags ? { tags: params.tags } : {}),
    })
    if (error) {
      console.error('[email/resend] erro ao enviar:', error)
      return { ok: false, error: error.message || 'Resend send failed' }
    }
    return { ok: true, id: data?.id ?? null }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[email/resend] erro ao enviar:', msg)
    return { ok: false, error: msg }
  }
}
