import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

// Route dinâmica: client Supabase só é criado em request time,
// nunca em build time (evita "supabaseKey is required" durante build).
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // 1) Rate limit por IP — barra flood de inscrições
  const ip = getClientIp(req)
  const rl = await checkRateLimit('newsletter', ip)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde um instante e tente novamente.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Configuração do servidor ausente.' }, { status: 500 })
  }

  let body: {
    email?: string
    name?: string
    source?: string
    utm?: unknown
    recaptchaToken?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }
  const { email, name, source, utm, recaptchaToken } = body

  if (!email) {
    return NextResponse.json({ error: 'E-mail obrigatório.' }, { status: 400 })
  }

  // 2) reCAPTCHA v3 — filtra bots (fail-open se não configurado)
  const captcha = await verifyRecaptcha(recaptchaToken, 'newsletter')
  if (!captcha.ok) {
    return NextResponse.json({ error: 'Falha na verificação de segurança.' }, { status: 400 })
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { error } = await supabase.from('newsletter_subscribers').upsert(
    {
      email: email.toLowerCase().trim(),
      name: name ?? null,
      source: source ?? 'blog',
      utm: utm ?? {},
    },
    { onConflict: 'email', ignoreDuplicates: false },
  )

  if (error) {
    logger.error({ err: error }, '[newsletter/subscribe]')
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
