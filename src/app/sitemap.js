import { createClient } from '@/lib/supabase/server'

const BASE = 'https://housemazzutti.com'

export default async function sitemap() {
  const now = new Date()
  const staticRoutes = [
    '', 'about', 'studio', 'produtora', 'agencia', 'angelo',
    'comunidade', 'academy', 'portfolio', 'blog', 'contato',
  ].map((p) => ({
    url: `${BASE}/${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1.0 : 0.7,
  }))

  // Produtos publicados do Academy
  let academyProducts = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('academy_products')
      .select('slug, type, updated_at')
      .eq('status', 'published')
    academyProducts = (data ?? []).map((p) => ({
      url: `${BASE}/academy/${p.type}/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  } catch {
    // Em build estático sem credenciais, ignora.
  }

  return [...staticRoutes, ...academyProducts]
}
