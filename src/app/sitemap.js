import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@/lib/supabase/server'
import {articles as blogArticles} from '@/app/[locale]/blog/[slug]/articles'
import {policySlugs} from '@/lib/policies/content'

const BASE = 'https://housemazzutti.com'
const L = '/pt'

// Páginas delistadas (gate 0.7) — fora do sitemap até permissão de uso de imagem.
const DELISTED_PORTFOLIO = new Set([
  'jequiti-larissa-manoela',
  'jequiti-galisteu',
  'jequiti-ana-castela',
  'we-pink-ze-felipe',
  'simony-marca',
  'mileide-mihaile',
])

function listPortfolioSlugs(unit) {
  const dir = path.join(
    process.cwd(),
    'src',
    'app',
    '[locale]',
    `portfolio-${unit}`,
  )
  try {
    return fs
      .readdirSync(dir, {withFileTypes: true})
      .filter(
        (d) =>
          d.isDirectory() &&
          d.name !== '[slug]' &&
          !DELISTED_PORTFOLIO.has(d.name),
      )
      .map((d) => d.name)
  } catch {
    return []
  }
}

export default async function sitemap() {
  const now = new Date()

  const staticPages = [
    {p: '', priority: 1.0},
    // Unidades
    {p: '/studio', priority: 0.9},
    {p: '/agencia', priority: 0.9},
    {p: '/produtora', priority: 0.9},
    {p: '/academy', priority: 0.8},
    // Landings de serviço (SEO por categoria)
    {p: '/agencia/branding', priority: 0.8},
    {p: '/agencia/comunicacao', priority: 0.8},
    {p: '/agencia/web', priority: 0.8},
    {p: '/produtora/institucional', priority: 0.8},
    {p: '/produtora/moda', priority: 0.8},
    {p: '/produtora/publicidade', priority: 0.8},
    {p: '/studio/book', priority: 0.8},
    {p: '/studio/cobertura', priority: 0.8},
    {p: '/studio/ensaio', priority: 0.8},
    // Academy (landings)
    {p: '/academy/preco-da-relevancia', priority: 0.7},
    {p: '/academy/marketing-para-modelos', priority: 0.7},
    // Institucional / comercial
    {p: '/sobre', priority: 0.8},
    {p: '/angelo', priority: 0.7},
    {p: '/comunidade', priority: 0.6},
    {p: '/comunidade/vagas', priority: 0.5},
    {p: '/loja', priority: 0.7},
    {p: '/portfolio', priority: 0.7},
    {p: '/portfolio-studio', priority: 0.6},
    {p: '/portfolio-agencia', priority: 0.6},
    {p: '/portfolio-produtora', priority: 0.6},
    {p: '/blog', priority: 0.7},
    {p: '/contato', priority: 0.6},
  ].map(({p, priority}) => ({
    url: `${BASE}${L}${p}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority,
  }))

  const blogPosts = Object.keys(blogArticles).map((slug) => ({
    url: `${BASE}${L}/blog/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const portfolioPages = ['studio', 'agencia', 'produtora'].flatMap((unit) =>
    listPortfolioSlugs(unit).map((slug) => ({
      url: `${BASE}${L}/portfolio-${unit}/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  )

  const policyPages = [
    {url: `${BASE}${L}/politicas/`, priority: 0.3},
    ...policySlugs.map((slug) => ({
      url: `${BASE}${L}/politicas/${slug}/`,
      priority: 0.3,
    })),
  ].map((p) => ({...p, lastModified: now, changeFrequency: 'yearly'}))

  let academyProducts = []
  try {
    const supabase = await createClient()
    const {data} = await supabase
      .from('academy_products')
      .select('slug, type, updated_at')
      .eq('status', 'published')
    academyProducts = (data ?? []).map((p) => ({
      url: `${BASE}${L}/academy/${p.type}/${p.slug}/`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch {
    // Build sem credenciais — ignora.
  }

  return [...staticPages, ...blogPosts, ...portfolioPages, ...policyPages, ...academyProducts]
}
