'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { resolveSiteOrigin } from '@/lib/auth/site-url'

const EmailSchema = z.string().email('Informe um e-mail válido.')

export async function signUpAction(formData: FormData): Promise<void> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')
  const terms = formData.get('terms')
  const recaptchaToken = String(formData.get('recaptchaToken') ?? '')

  if (!name) {
    redirect('/login/cadastro?error=' + encodeURIComponent('Informe seu nome.'))
  }
  if (!EmailSchema.safeParse(email).success) {
    redirect('/login/cadastro?error=' + encodeURIComponent('Informe um e-mail válido.'))
  }
  if (password.length < 8) {
    redirect(
      '/login/cadastro?error=' + encodeURIComponent('A senha precisa ter ao menos 8 caracteres.'),
    )
  }
  if (password !== confirm) {
    redirect('/login/cadastro?error=' + encodeURIComponent('As senhas não conferem.'))
  }
  if (!terms) {
    redirect(
      '/login/cadastro?error=' +
        encodeURIComponent('Você precisa aceitar os Termos de Uso e a Política de Privacidade.'),
    )
  }

  const hdrs = await headers()
  const ip =
    hdrs.get('x-real-ip') ?? hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'

  const rl = await checkRateLimit('auth', ip)
  if (!rl.allowed) {
    redirect(
      '/login/cadastro?error=' +
        encodeURIComponent('Muitas tentativas. Aguarde um minuto e tente novamente.'),
    )
  }

  const captcha = await verifyRecaptcha(recaptchaToken, 'signup')
  if (!captcha.ok) {
    redirect(
      '/login/cadastro?error=' +
        encodeURIComponent('Falha na verificação de segurança. Tente novamente.'),
    )
  }

  const origin = resolveSiteOrigin(hdrs)

  // Detecta locale via header ou cookie do next-intl; padrão pt
  const locale = hdrs.get('x-next-intl-locale') ?? 'pt'

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${origin}/auth/callback/?next=/${locale}/minha-conta/`,
    },
  })

  if (error) {
    redirect('/login/cadastro?error=' + encodeURIComponent(error.message))
  }

  if (!data.session) {
    redirect('/login/sucesso?email=' + encodeURIComponent(email) + '&kind=confirm')
  }

  redirect(`/${locale}/minha-conta?welcome=1`)
}
