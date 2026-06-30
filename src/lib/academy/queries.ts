import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'
import { logger } from '@/lib/logger'

type CatalogRow = Database['public']['Tables']['academy_products']['Row'] & {
  category?: { id: string; slug: string; name: string } | null
  author?: {
    id: string
    slug: string
    pen_name: string | null
    avatar_override_url: string | null
  } | null
}

/**
 * Lista produtos publicados (catálogo público).
 * Usa a tabela direta — quando houver dados em volume, migrar para mv_academy_catalog.
 */
export async function listPublishedProducts(opts?: {
  type?: Database['public']['Enums']['academy_product_type']
  businessUnit?: Database['public']['Enums']['business_unit']
  limit?: number
}) {
  const supabase = await createClient()
  let q = supabase
    .from('academy_products')
    .select(
      `
      id, slug, type, level, business_unit, title, subtitle, short_description,
      cover_url, thumbnail_url, price_cents, original_price_cents, currency,
      duration_minutes, page_count, module_count, lesson_count,
      featured, bestseller, new_release, avg_rating, rating_count, published_at,
      category:academy_categories(id, slug, name),
      author:academy_authors(id, slug, pen_name, avatar_override_url)
    `,
    )
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(opts?.limit ?? 100)

  if (opts?.type) q = q.eq('type', opts.type)
  if (opts?.businessUnit) q = q.eq('business_unit', opts.businessUnit)

  const { data, error } = await q
  if (error) {
    logger.error({ err: error }, '[academy/queries] listPublishedProducts')
    return [] as CatalogRow[]
  }
  return (data ?? []) as unknown as CatalogRow[]
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('academy_products')
    .select(
      `
      *,
      category:academy_categories(id, slug, name),
      author:academy_authors(id, slug, pen_name, headline, bio_long, avatar_override_url)
    `,
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (error) {
    logger.error({ err: error }, '[academy/queries] getProductBySlug')
    return null
  }
  return data
}

export async function listCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('academy_categories')
    .select('id, slug, name, parent_id, business_unit, order_index')
    .eq('active', true)
    .order('order_index')
  return data ?? []
}

export function formatPriceBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}
