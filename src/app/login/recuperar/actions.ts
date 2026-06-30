'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'

export async function requestPasswordReset(formData: FormData): Promise<void> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const recaptchaToken = String(formData.get('recaptchaToken') ?? '')
  if (!email || !email.includes('@')) {
    redirect(`/login/recuperar?error=${encodeURIComponent('Informe um email valido.')}`)
  }

  const hdrs = await headers()
  const ip =
    hdrs.get('x-real-ip') ?? hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'

  const rl = await checkRateLimit('auth', ip)
  if (!rl.allowed) {
    redirect(
      `/login/recuperar?error=${encodeURIComponent('Muitas tentativas. Aguarde um minuto e tente novamente.')}`,
    )
  }

  const captcha = await verifyRecaptcha(recaptchaToken, 'recover')
  if (!captcha.ok) {
    redirect(
      `/login/recuperar?error=${encodeURIComponent('Falha na verificação de segurança. Tente novamente.')}`,
    )
  }
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || `https://${hdrs.get('host') ?? 'housemazzutti.com'}`

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/login/redefinir')}`,
  })

  if (error) {
    redirect(`/login/recuperar?error=${encodeURIComponent(error.message)}`)
  }
  redirect(`/login/sucesso?kind=recover&email=${encodeURIComponent(email)}`)
}
