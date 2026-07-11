'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'

const PasswordSchema = z
  .object({
    current_password: z.string().min(1, 'Informe a senha atual.'),
    password: z.string().min(8, 'A nova senha precisa ter ao menos 8 caracteres.').max(128),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'As senhas não conferem.',
    path: ['confirm'],
  })

export type ChangePasswordState = {
  success?: boolean
  error?: string
  fieldErrors?: { current_password?: string; password?: string; confirm?: string }
}

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const hdrs = await headers()
  const ip =
    hdrs.get('x-real-ip') ?? hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
  const rl = await checkRateLimit('auth', ip)
  if (!rl.allowed) return { error: 'Muitas tentativas. Aguarde um minuto e tente novamente.' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Sessão expirada. Faça login novamente.' }

  const raw = {
    current_password: String(formData.get('current_password') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirm: String(formData.get('confirm') ?? ''),
  }

  const parsed = PasswordSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: ChangePasswordState['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors
      fieldErrors[key] = issue.message
    }
    return { fieldErrors }
  }

  // Verifica senha atual antes de trocar
  const email = user.email ?? ''
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: parsed.data.current_password,
  })
  if (authError) return { fieldErrors: { current_password: 'Senha atual incorreta.' } }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })
  if (error) return { error: error.message }

  revalidatePath('/minha-conta/senha')
  return { success: true }
}
