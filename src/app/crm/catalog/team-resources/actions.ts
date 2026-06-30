'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { TablesInsert, TablesUpdate } from '@/types/database'

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function num(v: FormDataEntryValue | null): number | null {
  if (v === null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

function bounce(error: string, suffix = '') {
  redirect('/crm/catalog/team-resources' + suffix + '?error=' + encodeURIComponent(error))
}

// =============== CATEGORIES ===============

export async function upsertCategoryAction(formData: FormData) {
  const id = String(formData.get('category_id') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  const position = num(formData.get('position')) ?? 0
  if (!name) bounce('Nome é obrigatório.')

  const supabase = await createClient()
  if (id) {
    const patch: TablesUpdate<'team_resource_categories'> = {
      name,
      slug: slugify(name),
      position,
    }
    const { error } = await supabase.from('team_resource_categories').update(patch).eq('id', id)
    if (error) bounce(error.message)
  } else {
    const payload: TablesInsert<'team_resource_categories'> = {
      name,
      slug: slugify(name),
      position,
    }
    const { error } = await supabase.from('team_resource_categories').insert(payload)
    if (error) bounce(error.message)
  }

  revalidatePath('/crm/catalog/team-resources')
  redirect('/crm/catalog/team-resources')
}

export async function deleteCategoryAction(formData: FormData) {
  const id = String(formData.get('category_id') ?? '')
  if (!id) bounce('ID inválido.')

  const supabase = await createClient()
  // Recusa se houver resources usando — checa antes
  const { count } = await supabase
    .from('team_resources')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id)
  if ((count ?? 0) > 0) {
    bounce(`Categoria tem ${count} recurso(s). Mova ou exclua os recursos primeiro.`)
  }

  const { error } = await supabase.from('team_resource_categories').delete().eq('id', id)
  if (error) bounce(error.message)

  revalidatePath('/crm/catalog/team-resources')
  redirect('/crm/catalog/team-resources')
}

// =============== RESOURCES ===============

export async function upsertResourceAction(formData: FormData) {
  const id = String(formData.get('resource_id') ?? '')
  const categoryId = String(formData.get('category_id') ?? '')
  const role = String(formData.get('role') ?? '').trim()
  if (!categoryId || !role) bounce('Categoria e função são obrigatórios.')

  const description = String(formData.get('description') ?? '').trim() || null
  const targetAudience = String(formData.get('target_audience') ?? '').trim() || null
  const basePrice = num(formData.get('base_price_brl'))
  const finalPrice = num(formData.get('final_price_brl'))
  const position = num(formData.get('position')) ?? 0
  const active = formData.get('active') === 'on'

  const supabase = await createClient()
  if (id) {
    const patch: TablesUpdate<'team_resources'> = {
      category_id: categoryId,
      role,
      slug: slugify(role),
      description,
      target_audience: targetAudience,
      base_price_brl: basePrice,
      final_price_brl: finalPrice,
      position,
      active,
    }
    const { error } = await supabase.from('team_resources').update(patch).eq('id', id)
    if (error) bounce(error.message)
  } else {
    const payload: TablesInsert<'team_resources'> = {
      category_id: categoryId,
      role,
      slug: slugify(role),
      description,
      target_audience: targetAudience,
      base_price_brl: basePrice,
      final_price_brl: finalPrice,
      position,
      active,
    }
    const { error } = await supabase.from('team_resources').insert(payload)
    if (error) bounce(error.message)
  }

  revalidatePath('/crm/catalog/team-resources')
  redirect('/crm/catalog/team-resources')
}

export async function deleteResourceAction(formData: FormData) {
  const id = String(formData.get('resource_id') ?? '')
  if (!id) bounce('ID inválido.')

  const supabase = await createClient()
  const { error } = await supabase.from('team_resources').delete().eq('id', id)
  if (error) bounce(error.message)

  revalidatePath('/crm/catalog/team-resources')
  redirect('/crm/catalog/team-resources')
}
