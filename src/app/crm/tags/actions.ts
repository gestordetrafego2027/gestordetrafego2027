'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

function bounce(error: string) {
  redirect('/crm/tags?error=' + encodeURIComponent(error))
}

export async function createTagAction(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const color = String(formData.get('color') ?? '').trim() || null
  if (!name) bounce('Nome é obrigatório.')

  const slug = slugify(name)
  if (!slug) bounce('Nome inválido.')

  const supabase = await createClient()
  const { error } = await supabase.from('tags').insert({ name, slug, color })
  if (error) bounce(error.message)

  revalidatePath('/crm/tags')
  redirect('/crm/tags')
}

export async function updateTagAction(formData: FormData) {
  const id = String(formData.get('tag_id') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  const color = String(formData.get('color') ?? '').trim() || null
  if (!id || !name) bounce('Nome é obrigatório.')

  const supabase = await createClient()
  const { error } = await supabase
    .from('tags')
    .update({ name, slug: slugify(name), color })
    .eq('id', id)
  if (error) bounce(error.message)

  revalidatePath('/crm/tags')
  redirect('/crm/tags')
}

export async function deleteTagAction(formData: FormData) {
  const id = String(formData.get('tag_id') ?? '')
  if (!id) bounce('ID inválido.')

  const supabase = await createClient()
  // remove ligações primeiro (caso não exista ON DELETE CASCADE)
  await supabase.from('lead_tags').delete().eq('tag_id', id)
  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) bounce(error.message)

  revalidatePath('/crm/tags')
  redirect('/crm/tags')
}
