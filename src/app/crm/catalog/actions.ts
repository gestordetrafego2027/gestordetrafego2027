'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { TablesInsert, TablesUpdate, Json } from '@/types/database'

type BusinessUnit = 'agencia' | 'studio' | 'produtora'

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

function parseJson(raw: string, fallback: Json): Json {
  const trimmed = raw.trim()
  if (!trimmed) return fallback
  try {
    return JSON.parse(trimmed) as Json
  } catch {
    return fallback
  }
}

function num(v: FormDataEntryValue | null): number | null {
  if (v === null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

// =============== SERVICES ===============

export async function createServiceAction(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const unit = String(formData.get('unit') ?? 'agencia') as BusinessUnit
  const description = String(formData.get('description') ?? '').trim() || null
  const active = formData.get('active') === 'on'
  const questionsRaw = String(formData.get('questions_schema') ?? '')
  const questions_schema = parseJson(questionsRaw, {})

  if (!name) redirect('/crm/catalog/services/new?error=' + encodeURIComponent('Nome é obrigatório.'))

  const payload: TablesInsert<'services'> = {
    name,
    slug: slugify(name),
    unit,
    description,
    active,
    questions_schema,
  }

  const supabase = await createClient()
  const { data, error } = await supabase.from('services').insert(payload).select('id').single()
  if (error || !data) {
    redirect('/crm/catalog/services/new?error=' + encodeURIComponent(error?.message ?? 'erro'))
  }
  revalidatePath('/crm/catalog')
  redirect(`/crm/catalog/services/${data.id}`)
}

export async function updateServiceAction(formData: FormData) {
  const id = String(formData.get('service_id') ?? '')
  if (!id) redirect('/crm/catalog')

  const name = String(formData.get('name') ?? '').trim()
  if (!name) {
    redirect(`/crm/catalog/services/${id}?edit=1&error=` + encodeURIComponent('Nome é obrigatório.'))
  }

  const patch: TablesUpdate<'services'> = {
    name,
    slug: slugify(name),
    unit: String(formData.get('unit') ?? 'agencia') as BusinessUnit,
    description: String(formData.get('description') ?? '').trim() || null,
    active: formData.get('active') === 'on',
    questions_schema: parseJson(String(formData.get('questions_schema') ?? ''), {}),
  }

  const supabase = await createClient()
  const { error } = await supabase.from('services').update(patch).eq('id', id)
  if (error) {
    redirect(`/crm/catalog/services/${id}?edit=1&error=` + encodeURIComponent(error.message))
  }
  revalidatePath('/crm/catalog')
  revalidatePath(`/crm/catalog/services/${id}`)
  redirect(`/crm/catalog/services/${id}`)
}

export async function deleteServiceAction(formData: FormData) {
  const id = String(formData.get('service_id') ?? '')
  if (!id) redirect('/crm/catalog')

  const supabase = await createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) {
    redirect(`/crm/catalog/services/${id}?error=` + encodeURIComponent(error.message))
  }
  revalidatePath('/crm/catalog')
  redirect('/crm/catalog')
}

// =============== PACKAGES ===============

export async function upsertPackageAction(formData: FormData) {
  const id = String(formData.get('package_id') ?? '')
  const serviceId = String(formData.get('service_id') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  if (!serviceId || !name) {
    redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent('Service/Nome obrigatórios.'))
  }

  const description = String(formData.get('description') ?? '').trim() || null
  const duration = String(formData.get('duration') ?? '').trim() || null
  const price = num(formData.get('price_brl'))
  const position = num(formData.get('position')) ?? 0
  const active = formData.get('active') === 'on'

  const supabase = await createClient()
  if (id) {
    const patch: TablesUpdate<'service_packages'> = {
      name,
      slug: slugify(name),
      description,
      duration,
      price_brl: price,
      position,
      active,
    }
    const { error } = await supabase.from('service_packages').update(patch).eq('id', id)
    if (error) {
      redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent(error.message))
    }
  } else {
    const payload: TablesInsert<'service_packages'> = {
      service_id: serviceId,
      name,
      slug: slugify(name),
      description,
      duration,
      price_brl: price,
      position,
      active,
    }
    const { error } = await supabase.from('service_packages').insert(payload)
    if (error) {
      redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent(error.message))
    }
  }

  revalidatePath(`/crm/catalog/services/${serviceId}`)
  redirect(`/crm/catalog/services/${serviceId}`)
}

export async function deletePackageAction(formData: FormData) {
  const id = String(formData.get('package_id') ?? '')
  const serviceId = String(formData.get('service_id') ?? '')
  if (!id || !serviceId) redirect(`/crm/catalog/services/${serviceId}`)

  const supabase = await createClient()
  const { error } = await supabase.from('service_packages').delete().eq('id', id)
  if (error) {
    redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent(error.message))
  }
  revalidatePath(`/crm/catalog/services/${serviceId}`)
  redirect(`/crm/catalog/services/${serviceId}`)
}

// =============== ADDONS ===============

export async function upsertAddonAction(formData: FormData) {
  const id = String(formData.get('addon_id') ?? '')
  const serviceId = String(formData.get('service_id') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  if (!serviceId || !name) {
    redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent('Service/Nome obrigatórios.'))
  }

  const description = String(formData.get('description') ?? '').trim() || null
  const price = num(formData.get('price_brl'))
  const position = num(formData.get('position')) ?? 0
  const active = formData.get('active') === 'on'

  const supabase = await createClient()
  if (id) {
    const patch: TablesUpdate<'service_addons'> = {
      name,
      slug: slugify(name),
      description,
      price_brl: price,
      position,
      active,
    }
    const { error } = await supabase.from('service_addons').update(patch).eq('id', id)
    if (error) redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent(error.message))
  } else {
    const payload: TablesInsert<'service_addons'> = {
      service_id: serviceId,
      name,
      slug: slugify(name),
      description,
      price_brl: price,
      position,
      active,
    }
    const { error } = await supabase.from('service_addons').insert(payload)
    if (error) redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent(error.message))
  }

  revalidatePath(`/crm/catalog/services/${serviceId}`)
  redirect(`/crm/catalog/services/${serviceId}`)
}

export async function deleteAddonAction(formData: FormData) {
  const id = String(formData.get('addon_id') ?? '')
  const serviceId = String(formData.get('service_id') ?? '')
  if (!id || !serviceId) redirect(`/crm/catalog/services/${serviceId}`)

  const supabase = await createClient()
  const { error } = await supabase.from('service_addons').delete().eq('id', id)
  if (error) redirect(`/crm/catalog/services/${serviceId}?error=` + encodeURIComponent(error.message))
  revalidatePath(`/crm/catalog/services/${serviceId}`)
  redirect(`/crm/catalog/services/${serviceId}`)
}
