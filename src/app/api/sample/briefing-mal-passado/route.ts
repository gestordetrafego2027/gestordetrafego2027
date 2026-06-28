/**
 * Sample lead magnet — Briefing Mal Passado Vol. 03
 * Captura email, registra em newsletter_subscribers (source='sample-vol-03')
 * e envia link de download do capítulo 1 (signed URL · TTL 7d).
 *
 * O arquivo sample fica em storage privado `digital-products/casos-da-producao/sample-cap-01.pdf`
 * — sobe via dashboard quando estiver pronto. Enquanto não existe, o e-mail é
 * enviado mesmo assim (fallback para link da landing).
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email/resend'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SAMPLE_BUCKET = 'digital-products'
const SAMPLE_PATH = 'casos-da-producao/sample-cap-01.pdf'
const SAMPLE_TTL = 60 * 60 * 24 * 7
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://housemazzutti.com'

function sampleEmailHTML(name: string | null, sampleUrl: string) {
  const hello = name ? `Olá, ${name}.` : 'Olá.'
  return `<!doctype html><html><body style="margin:0;padding:0;background:#fafaf7;font-family:Georgia,serif;color:#0b0b0a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 28px;">
    <div style="font-family:monospace;font-size:10px;letter-spacing:0.34em;color:#6a6a6a;text-transform:uppercase;margin-bottom:24px;">● House Mazzutti Academy</div>
    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:34px;line-height:1.05;margin:0 0 24px;text-transform:uppercase;letter-spacing:-0.01em;">
      Briefing<br/><em style="font-style:italic;color:#8b1f1f;">Mal Passado</em><br/>
      <span style="font-size:18px;color:#6a6a6a;letter-spacing:0.04em;text-transform:none;font-style:italic;">— capítulo 1 grátis</span>
    </h1>
    <p style="font-size:16px;line-height:1.65;margin:0 0 20px;">${hello}</p>
    <p style="font-size:16px;line-height:1.65;margin:0 0 24px;">
      Você pediu o primeiro capítulo do <em>Briefing Mal Passado</em>. Segue o link abaixo — leitura curta, sem mocinho. É o que abre o livro.
    </p>
    <p style="margin:32px 0;">
      <a href="${sampleUrl}" style="display:inline-block;background:#0b0b0a;color:#fafaf7;padding:18px 32px;text-decoration:none;font-family:monospace;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;border-radius:2px;">Ler capítulo 1 →</a>
    </p>
    <p style="font-size:13px;line-height:1.6;color:#6a6a6a;margin:24px 0 8px;">
      O link expira em 7 dias. Se quiser o livro completo — 25 capítulos, 417 páginas — é por aqui:
    </p>
    <p style="margin:0 0 32px;">
      <a href="${SITE}/pt/academy/casos-da-producao#formatos" style="color:#8b1f1f;text-decoration:underline;font-size:13px;">housemazzutti.com/academy/casos-da-producao</a>
    </p>
    <hr style="border:none;border-top:1px solid #e6e4dc;margin:32px 0;"/>
    <p style="font-size:11px;color:#a0a0a0;line-height:1.6;margin:0;">
      House Mazzutti · Casa criativa em São Paulo<br/>
      Você pediu este capítulo em ${SITE}. Não responde nada se não foi você.
    </p>
  </div></body></html>`
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = await checkRateLimit('lead', ip)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde um instante.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Configuração do servidor ausente.' }, { status: 500 })
  }

  let body: { email?: string; name?: string; recaptchaToken?: string; utm?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }
  const { email, name, recaptchaToken, utm } = body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
  }

  const captcha = await verifyRecaptcha(recaptchaToken, 'sample-vol-03')
  if (!captcha.ok) {
    return NextResponse.json({ error: 'Falha na verificação de segurança.' }, { status: 400 })
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  // 1) Registra o lead (idempotente — se já existe, atualiza source pra refletir o capture mais recente)
  const cleanEmail = email.toLowerCase().trim()
  const { error: upsertErr } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { email: cleanEmail, name: name ?? null, source: 'sample-vol-03', utm: utm ?? {} },
      { onConflict: 'email', ignoreDuplicates: false },
    )
  if (upsertErr) {
    logger.error({ err: upsertErr, email: cleanEmail }, '[sample/vol-03] erro ao registrar lead')
  }

  // 2) Tenta gerar signed URL do sample. Se o arquivo ainda não foi enviado,
  //    aponta pra landing pra não bloquear o lead capture.
  let sampleUrl = `${SITE}/pt/academy/casos-da-producao`
  try {
    const { data, error } = await supabase.storage
      .from(SAMPLE_BUCKET)
      .createSignedUrl(SAMPLE_PATH, SAMPLE_TTL)
    if (!error && data?.signedUrl) {
      sampleUrl = data.signedUrl
    } else {
      logger.warn({ err: error }, '[sample/vol-03] signed URL falhou — usando fallback landing')
    }
  } catch (e) {
    logger.warn({ err: e }, '[sample/vol-03] storage indisponível')
  }

  // 3) Dispara email
  const sent = await sendEmail({
    to: cleanEmail,
    subject: 'Briefing Mal Passado · Capítulo 1 — House Mazzutti',
    html: sampleEmailHTML(name ?? null, sampleUrl),
    tags: [
      { name: 'kind', value: 'sample' },
      { name: 'product', value: 'casos-da-producao' },
    ],
  })

  if (!sent.ok) {
    logger.error({ err: sent.error, email: cleanEmail }, '[sample/vol-03] resend falhou')
    return NextResponse.json(
      { error: 'Não conseguimos enviar o e-mail. Tente novamente em instantes.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
