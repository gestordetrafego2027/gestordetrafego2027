'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'

async function clientIp(): Promise<string> {
  const h = await headers()
  return h.get('x-real-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/crm') || '/crm'
  const recaptchaToken = String(formData.get('recaptchaToken') ?? '')

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent('Informe email e senha.')}&next=${encodeURIComponent(next)}`,
    )
  }

  // Rate limit por IP — barra brute-force / credential stuffing.
  const rl = await checkRateLimit('auth', await clientIp())
  if (!rl.allowed) {
    redirect(
      `/login?error=${encodeURIComponent('Muitas tentativas. Aguarde um minuto e tente novamente.')}&next=${encodeURIComponent(next)}`,
    )
  }

  // reCAPTCHA v3 (fail-open se não configurado).
  const captcha = await verifyRecaptcha(recaptchaToken, 'login')
  if (!captcha.ok) {
    redirect(
      `/login?error=${encodeURIComponent('Falha na verificação de segurança. Tente novamente.')}&next=${encodeURIComponent(next)}`,
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`)
  }

  redirect(next.startsWith('/') ? next : '/crm')
}
