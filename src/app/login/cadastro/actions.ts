'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'

export async function signUpAction(formData: FormData): Promise<void> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')
  const recaptchaToken = String(formData.get('recaptchaToken') ?? '')

  if (!name) {
    redirect('/login/cadastro?error=' + encodeURIComponent('Informe seu nome.'))
  }
  if (!email || !email.includes('@')) {
    redirect('/login/cadastro?error=' + encodeURIComponent('Informe um email valido.'))
  }
  if (password.length < 8) {
    redirect('/login/cadastro?error=' + encodeURIComponent('A senha precisa ter ao menos 8 caracteres.'))
  }
  if (password !== confirm) {
    redirect('/login/cadastro?error=' + encodeURIComponent('As senhas nao conferem.'))
  }

  const hdrs = await headers()
  const ip =
    hdrs.get('x-real-ip') ??
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'

  const rl = await checkRateLimit('auth', ip)
  if (!rl.allowed) {
    redirect('/login/cadastro?error=' + encodeURIComponent('Muitas tentativas. Aguarde um minuto e tente novamente.'))
  }

  const captcha = await verifyRecaptcha(recaptchaToken, 'signup')
  if (!captcha.ok) {
    redirect('/login/cadastro?error=' + encodeURIComponent('Falha na verificação de segurança. Tente novamente.'))
  }
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `https://${hdrs.get('host') ?? 'housemazzutti.com'}`

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${origin}/auth/callback?next=/crm`,
    },
  })

  if (error) {
    redirect('/login/cadastro?error=' + encodeURIComponent(error.message))
  }

  // Se confirma email automatica esta desligada, vai vir session=null e
  // o usuario precisa confirmar pelo email.
  if (!data.session) {
    redirect('/login/sucesso?email=' + encodeURIComponent(email) + '&kind=confirm')
  }
  // Se ja entrou direto (confirma desligada no Supabase), redireciona pro CRM.
  redirect('/crm?welcome=1')
}
