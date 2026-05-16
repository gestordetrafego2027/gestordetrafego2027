'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function requestPasswordReset(formData: FormData): Promise<void> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (!email || !email.includes('@')) {
    redirect(`/login/recuperar?error=${encodeURIComponent('Informe um email valido.')}`)
  }

  const hdrs = await headers()
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `https://${hdrs.get('host') ?? 'housemazzutti.com'}`

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/login/redefinir')}`,
  })

  if (error) {
    redirect(`/login/recuperar?error=${encodeURIComponent(error.message)}`)
  }
  redirect(`/login/recuperar?ok=1&email=${encodeURIComponent(email)}`)
}
