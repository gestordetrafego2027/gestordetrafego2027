'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

const ProfileSchema = z.object({
  full_name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres.').max(120),
  display_name: z.string().max(60).optional(),
  phone: z.string().max(20).optional(),
  city: z.string().max(80).optional(),
  state: z.string().max(2).optional(),
})

export type UpdateProfileState = {
  success?: boolean
  error?: string
  fieldErrors?: Partial<Record<keyof z.infer<typeof ProfileSchema>, string>>
}

export async function updateProfile(
  _prev: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const log = logger.child({ action: 'updateProfile' })

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Sessão expirada. Faça login novamente.' }

  const raw = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    display_name: String(formData.get('display_name') ?? '').trim() || undefined,
    phone: String(formData.get('phone') ?? '').trim() || undefined,
    city: String(formData.get('city') ?? '').trim() || undefined,
    state:
      String(formData.get('state') ?? '')
        .trim()
        .toUpperCase() || undefined,
  }

  const parsed = ProfileSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: UpdateProfileState['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors
      fieldErrors[key] = issue.message
    }
    return { fieldErrors }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) {
    log.error({ err: error }, 'falha ao atualizar perfil')
    return { error: 'Não foi possível salvar. Tente novamente.' }
  }

  log.info({ user_id: user.id }, 'perfil atualizado')
  revalidatePath('/minha-conta/dados')
  revalidatePath('/minha-conta')
  return { success: true }
}

export async function uploadAvatar(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Sessão expirada.' }

  const file = formData.get('avatar') as File | null
  if (!file || file.size === 0) return { error: 'Nenhum arquivo enviado.' }
  if (file.size > 2 * 1024 * 1024) return { error: 'Tamanho máximo: 2 MB.' }
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  if (!ALLOWED_TYPES.includes(file.type))
    return { error: 'Tipo de arquivo inválido. Use JPG, PNG ou WebP.' }

  const EXT_MAP: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  }
  const ext = EXT_MAP[file.type] ?? 'jpg'
  const path = `${user.id}/avatar.${ext}`
  const bytes = await file.arrayBuffer()

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, bytes, { contentType: file.type, upsert: true })

  if (uploadError) return { error: uploadError.message }

  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(path)

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (updateError) return { error: updateError.message }

  revalidatePath('/minha-conta/dados')
  revalidatePath('/minha-conta')
  return {}
}
