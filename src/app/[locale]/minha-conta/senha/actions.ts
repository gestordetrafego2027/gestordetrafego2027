'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const PasswordSchema = z
  .object({
    password: z.string().min(8, 'A senha precisa ter ao menos 8 caracteres.').max(128),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'As senhas não conferem.',
    path: ['confirm'],
  })

export type ChangePasswordState = {
  success?: boolean
  error?: string
  fieldErrors?: { password?: string; confirm?: string }
}

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Sessão expirada. Faça login novamente.' }

  const raw = {
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

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })
  if (error) return { error: error.message }

  revalidatePath('/minha-conta/senha')
  return { success: true }
}
