'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function setNewPassword(formData: FormData): Promise<void> {
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  if (password.length < 8) {
    redirect(`/login/redefinir?error=${encodeURIComponent('A senha precisa ter ao menos 8 caracteres.')}`)
  }
  if (password !== confirm) {
    redirect(`/login/redefinir?error=${encodeURIComponent('As senhas nao conferem.')}`)
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/login?error=${encodeURIComponent('Sessao expirada. Solicite novo link de recuperacao.')}`)
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    redirect(`/login/redefinir?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/crm?reset=ok')
}
