'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { resolveSiteOrigin } from '@/lib/auth/site-url'
import { recoveryEmailClient } from '@/lib/auth/recovery-client'

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
  const origin = resolveSiteOrigin(hdrs)

  // Fluxo implícito de propósito — ver recovery-client.ts. redirectTo cobre o
  // template legado ({{ .ConfirmationURL }}); o template atual usa token_hash e
  // cai direto em /auth/confirm.
  // Mantido SEM barra final: é a forma que já consta na allow-list de Redirect
  // URLs do projeto. O 308 de trailingSlash normaliza e preserva a query.
  const { error } = await recoveryEmailClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/login/redefinir')}`,
  })

  // Não revelamos se o e-mail existe na base: enumeração de usuário é vetor
  // conhecido. Só erro real de infraestrutura volta pra tela.
  if (error && !/not found/i.test(error.message)) {
    redirect(`/login/recuperar?error=${encodeURIComponent(error.message)}`)
  }
  redirect(`/login/sucesso?kind=recover&email=${encodeURIComponent(email)}`)
}
