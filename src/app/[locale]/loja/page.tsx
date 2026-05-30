// @ts-nocheck
import { notFound } from 'next/navigation'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Loja — House Mazzutti',
  description: 'Serviços, cursos e produtos digitais da House Mazzutti — Agência, Studio, Produtora e Academy.',
  openGraph: {
    title: 'Loja — House Mazzutti',
    description: 'Serviços, cursos e produtos digitais da House Mazzutti.',
  },
}

type Price = {
  unit_amount: number
  currency: string
  price_type: string
  metadata: { quote_only?: string }
}
type Category = { slug: string; name: string }
type Product = {
  id: string
  slug: string
  name: string
  description: string | null
  product_type: string
  images: string[]
  featured: boolean
  store_prices: Price[]
  store_product_categories: { store_categories: Category }[]
}

function formatPrice(cents: number, currency = 'brl') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100)
}
function isQuoteOnly(prices: Price[]) {
  return prices?.[0]?.metadata?.quote_only === 'true'
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const price = product.store_prices?.[0]
  const image = product.images?.[0] ?? null
  const quoteOnly = isQuoteOnly(product.store_prices)

  return (
    <Link
      href={`/loja/${product.slug}`}
      className="group block relative overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800">
            <span className="text-zinc-600 text-5xl font-thin">✦</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="font-label uppercase tracking-[0.25em] text-[9px] text-white bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1">
              DESTAQUE
            </span>
          </div>
        )}

        {/* Price on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-headline text-white text-lg leading-tight mb-2 tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            {quoteOnly ? (
              <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/60">
                Sob consulta
              </span>
            ) : price ? (
              <span className="font-headline text-white text-base">
                {formatPrice(price.unit_amount, price.currency)}
              </span>
            ) : null}
            <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/50 group-hover:text-white transition-colors duration-300">
              VER →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const CATEGORY_ORDER = ['academy', 'studio', 'agencia', 'produtora']
const CATEGORY_LABELS: Record<string, string> = {
  agencia: 'Agência',
  studio: 'Studio',
  produtora: 'Produtora',
  academy: 'Academy',
}
const CATEGORY_SUBS: Record<string, string> = {
  agencia: 'Branding · Web · Comunicação',
  studio: 'Book · Ensaio · Cobertura',
  produtora: 'Moda · Beleza · Institucional',
  academy: 'Ebooks · Cursos · Conteúdo',
}

export default async function LojaPage() {
  if (!featureFlags.isStoreEnabled()) notFound()

  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('store_products')
    .select(`
      id, slug, name, description, product_type, images, featured,
      store_prices (unit_amount, currency, price_type, metadata),
      store_product_categories (store_categories (slug, name))
    `)
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('name', { ascending: true })

  const items = (products ?? []) as Product[]

  const grouped: Record<string, Product[]> = {}
  for (const p of items) {
    const catSlug = p.store_product_categories?.[0]?.store_categories?.slug ?? 'outros'
    if (!grouped[catSlug]) grouped[catSlug] = []
    grouped[catSlug].push(p)
  }

  const categories = CATEGORY_ORDER.filter((c) => grouped[c]?.length > 0)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative border-b border-white/5 px-8 md:px-16 pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-label uppercase tracking-[0.35em] text-[9px] text-white/30 mb-6">
            House Mazzutti · Loja
          </p>
          <h1 className="font-headline text-[clamp(56px,8vw,120px)] text-white leading-[0.88] tracking-tight mb-8">
            PRODUTOS &<br />
            <span className="text-white/20">SERVIÇOS</span>
          </h1>
          <p className="font-body text-white/40 text-sm max-w-sm leading-relaxed">
            Serviços, cursos e produtos digitais para marcas, profissionais de imagem e criadores.
          </p>

          {/* Category nav */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-0 mt-10 border-t border-white/5 pt-8">
              {categories.map((cat, i) => (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className="font-label uppercase tracking-[0.25em] text-[9px] text-white/30 hover:text-white transition-colors duration-300 pr-8 mr-8 border-r border-white/10 last:border-r-0 last:mr-0"
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PRODUTOS ──────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-16 space-y-24">

        {error && (
          <p className="font-label text-[11px] text-red-400 uppercase tracking-[0.2em]">
            Erro ao carregar produtos.
          </p>
        )}

        {categories.length === 0 && !error && (
          <div className="text-center py-32">
            <p className="font-headline text-4xl text-white/10">Em breve.</p>
          </div>
        )}

        {categories.map((cat) => (
          <section key={cat} id={cat}>
            {/* Section header */}
            <div className="flex items-end justify-between mb-10 pb-6 border-b border-white/5">
              <div>
                <p className="font-label uppercase tracking-[0.3em] text-[9px] text-white/20 mb-2">
                  {CATEGORY_SUBS[cat] ?? ''}
                </p>
                <h2 className="font-headline text-4xl md:text-5xl text-white tracking-tight leading-none">
                  {CATEGORY_LABELS[cat] ?? cat}
                </h2>
              </div>
              <span className="font-label uppercase tracking-[0.2em] text-[9px] text-white/20">
                {grouped[cat].length} {grouped[cat].length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            {/* Grid */}
            <div className={`grid gap-px ${
              grouped[cat].length === 1
                ? 'grid-cols-1 max-w-sm'
                : grouped[cat].length === 2
                ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {grouped[cat].map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ── FOOTER STRIP ──────────────────────────────────────── */}
      <div className="border-t border-white/5 px-8 md:px-16 py-8 mt-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <span className="font-label uppercase tracking-[0.3em] text-[9px] text-white/15">
            House Mazzutti © {new Date().getFullYear()}
          </span>
          <Link href="/" className="font-label uppercase tracking-[0.25em] text-[9px] text-white/20 hover:text-white transition-colors duration-300">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  )
}
