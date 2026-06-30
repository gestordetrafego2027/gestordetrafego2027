'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') redirect('/crm?error=acesso_negado')
  return { supabase, user: user! }
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export async function createAcademyProductAction(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin()
  const title = String(formData.get('title') ?? '').trim()
  const type = String(formData.get('type') ?? 'course')
  const businessUnit = String(formData.get('business_unit') ?? 'studio')
  const priceCents = Math.round(Number(formData.get('price_brl') ?? 0) * 100)
  if (!title)
    redirect('/crm/academy/products/new?error=' + encodeURIComponent('Titulo obrigatorio.'))

  const baseSlug = slugify(title)
  let slug = baseSlug
  let attempt = 0
  while (true) {
    const { data: exists } = await supabase
      .from('academy_products')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (!exists) break
    attempt++
    slug = `${baseSlug}-${attempt}`
    if (attempt > 10) break
  }

  // Pega um autor default (Angelo). Form do CRM ainda não suporta múltiplos autores.
  const { data: defaultAuthor } = await supabase
    .from('academy_authors')
    .select('id')
    .eq('active', true)
    .order('featured', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (!defaultAuthor) {
    redirect(
      '/crm/academy/products/new?error=' +
        encodeURIComponent('Nenhum autor cadastrado. Cadastre um autor primeiro.'),
    )
  }

  const insertRow = {
    title,
    slug,
    type,
    business_unit: businessUnit,
    status: 'draft',
    level: 'todos',
    price_cents: priceCents,
    currency: 'BRL',
    author_id: defaultAuthor!.id,
    cover_url: '/academy/placeholder-cover.svg',
  }

  const { data: created, error } = await supabase
    .from('academy_products')
    .insert(insertRow as any)
    .select('id')
    .single()

  if (error) redirect('/crm/academy/products/new?error=' + encodeURIComponent(error.message))
  redirect(`/crm/academy/products/${created!.id}`)
}

export async function updateAcademyProductAction(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const patch: Record<string, unknown> = {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim() || null,
    short_description: String(formData.get('short_description') ?? '').trim() || null,
    status: String(formData.get('status') ?? 'draft'),
    level: String(formData.get('level') ?? 'todos'),
    business_unit: String(formData.get('business_unit') ?? 'studio'),
    type: String(formData.get('type') ?? 'course'),
    price_cents: Math.round(Number(formData.get('price_brl') ?? 0) * 100),
    original_price_cents:
      Number(formData.get('original_price_brl') ?? 0) > 0
        ? Math.round(Number(formData.get('original_price_brl')) * 100)
        : null,
    cover_url: String(formData.get('cover_url') ?? '').trim() || null,
    thumbnail_url: String(formData.get('thumbnail_url') ?? '').trim() || null,
    trailer_video_url: String(formData.get('trailer_video_url') ?? '').trim() || null,
    access_duration_days: Number(formData.get('access_duration_days') ?? 0) || null,
    featured: formData.get('featured') === 'on',
    bestseller: formData.get('bestseller') === 'on',
    new_release: formData.get('new_release') === 'on',
    included_in_subscription: formData.get('included_in_subscription') === 'on',
  }

  if (patch.status === 'published' && !patch.published_at) {
    patch.published_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('academy_products')
    .update(patch as any)
    .eq('id', id)
  if (error) redirect(`/crm/academy/products/${id}?error=` + encodeURIComponent(error.message))
  revalidatePath(`/crm/academy/products/${id}`)
  revalidatePath('/crm/academy/products')
}

export async function createModuleAction(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin()
  const productId = String(formData.get('product_id') ?? '')
  const title = String(formData.get('title') ?? '').trim()
  if (!productId || !title) return

  const { data: maxOrder } = await supabase
    .from('academy_modules')
    .select('order_index')
    .eq('product_id', productId)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle()
  const nextIdx = (maxOrder?.order_index ?? -1) + 1

  await supabase.from('academy_modules').insert({
    product_id: productId,
    title,
    order_index: nextIdx,
  } as any)
  revalidatePath(`/crm/academy/products/${productId}`)
}

export async function createLessonAction(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin()
  const productId = String(formData.get('product_id') ?? '')
  const moduleId = String(formData.get('module_id') ?? '')
  const title = String(formData.get('title') ?? '').trim()
  const videoUrl = String(formData.get('video_url') ?? '').trim() || null
  if (!productId || !moduleId || !title) return

  const { data: maxOrder } = await supabase
    .from('academy_lessons')
    .select('order_index')
    .eq('module_id', moduleId)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle()
  const nextIdx = (maxOrder?.order_index ?? -1) + 1

  await supabase.from('academy_lessons').insert({
    product_id: productId,
    module_id: moduleId,
    title,
    video_url: videoUrl,
    order_index: nextIdx,
    type: 'video',
  } as any)
  revalidatePath(`/crm/academy/products/${productId}`)
}

export async function deleteModuleAction(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const productId = String(formData.get('product_id') ?? '')
  if (!id) return
  await supabase.from('academy_modules').delete().eq('id', id)
  revalidatePath(`/crm/academy/products/${productId}`)
}

export async function deleteLessonAction(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const productId = String(formData.get('product_id') ?? '')
  if (!id) return
  await supabase.from('academy_lessons').delete().eq('id', id)
  revalidatePath(`/crm/academy/products/${productId}`)
}
