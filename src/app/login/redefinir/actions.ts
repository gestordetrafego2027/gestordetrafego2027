'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function setNewPassword(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  if (password.length < 8) {
    return { error: 'A senha precisa ter ao menos 8 caracteres.' }
  }
  if (password !== confirm) {
    return { error: 'As senhas não conferem.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect(
      '/login/recuperar?error=' +
        encodeURIComponent('Sessão expirada. Solicite um novo link de recuperação.'),
    )
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    return { error: error.message }
  }

  redirect('/crm?reset=ok')
}
