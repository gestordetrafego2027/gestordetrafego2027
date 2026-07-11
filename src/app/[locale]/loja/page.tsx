import { notFound } from 'next/navigation'
import SiteFooterLinks from '@/app/components/SiteFooterLinks'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { COVER_MAP } from '@/components/ecommerce/product/ProductCoverSVG'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Loja — House Mazzutti',
  description: 'Serviços, cursos e produtos digitais da House Mazzutti.',
  alternates: { canonical: 'https://housemazzutti.com/pt/loja/' },
  openGraph: {
    title: 'Loja — House Mazzutti',
    description: 'Serviços, cursos e produtos digitais da House Mazzutti.',
    url: 'https://housemazzutti.com/pt/loja/',
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
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}
function isQuoteOnly(prices: Price[]) {
  return prices?.[0]?.metadata?.quote_only === 'true'
}

function ProductCard({ product }: { product: Product }) {
  const price = product.store_prices?.[0]
  const image = product.images?.[0] ?? null
  const quoteOnly = isQuoteOnly(product.store_prices)
  const InlineCover = COVER_MAP[product.slug] ?? null

  return (
    <Link href={`/loja/${product.slug}`} className="group block">
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f0ede8] mb-5">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : InlineCover ? (
          <InlineCover className="w-full h-full transition-transform duration-700 group-hover:scale-[1.04]" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#c8bfb0] text-4xl font-light">✦</span>
          </div>
        )}

        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="text-caption text-white bg-black px-3 py-1.5 tracking-[0.28em] text-[9px]">
              DESTAQUE
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-headline text-[15px] text-[#111] tracking-tight leading-snug flex-1 min-w-0 group-hover:text-black transition-colors duration-300">
          {product.name}
        </h3>
        <div className="shrink-0 text-right">
          {quoteOnly ? (
            <span className="text-caption text-[9px] text-[#999] tracking-[0.22em]">Consulta</span>
          ) : price ? (
            <span className="font-headline text-[15px] text-[#111] tabular-nums">
              {formatPrice(price.unit_amount, price.currency)}
            </span>
          ) : null}
        </div>
      </div>

      <span className="text-caption text-[9px] text-[#bbb] group-hover:text-black transition-colors duration-500 mt-2 block tracking-[0.28em]">
        VER PRODUTO →
      </span>
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
    .select(
      `id, slug, name, description, product_type, images, featured,
      store_prices (unit_amount, currency, price_type, metadata),
      store_product_categories (store_categories (slug, name))`,
    )
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
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="bg-[#111] text-white">
        {/* Brand bar */}
        <div className="border-b border-white/5 px-8 md:px-16 h-[60px] flex items-center justify-between">
          <Link
            href="/"
            className="hm-logo"
            style={{ fontSize: '18px', color: 'white', textDecoration: 'none' }}
          >
            <span className="hm-house">House</span>
            <span className="hm-mazzutti">Mazzutti</span>
          </Link>

          <nav className="hidden md:flex items-center" aria-label="Navegação principal">
            {[
              ['Studio', '/studio'],
              ['Agência', '/agencia'],
              ['Produtora', '/produtora'],
              ['Academy', '/academy'],
            ].map(([l, h]) => (
              <Link
                key={l}
                href={h as string}
                className="text-caption text-[9px] tracking-[0.28em] text-white/25 hover:text-white/80 transition-colors duration-300 px-5 border-r border-white/[0.06] last:border-r-0"
              >
                {l}
              </Link>
            ))}
            <span className="text-caption text-[9px] tracking-[0.22em] text-white/12 pl-6 ml-4 border-l border-white/[0.06]">
              CHECKOUT SEGURO · STRIPE
            </span>
          </nav>
        </div>

        {/* Hero */}
        <div className="px-8 md:px-16 pt-16 pb-14 max-w-[1400px]">
          <p className="text-caption text-[9px] tracking-[0.38em] text-white/25 mb-6">
            Loja — House Mazzutti
          </p>

          <h1
            className="text-h1 text-white mb-6"
            style={{ fontSize: 'clamp(56px,8vw,108px)', lineHeight: '0.88' }}
          >
            Produtos
            <br />
            <span style={{ color: 'rgba(255,255,255,0.14)' }}>{'& Serviços'}</span>
          </h1>

          <p className="text-body text-sm text-white/35 max-w-[340px] leading-relaxed">
            Educação, serviços criativos e produtos digitais para marcas e profissionais de imagem.
          </p>

          {/* Category anchors */}
          {categories.length > 0 && (
            <div className="flex mt-10 pt-8 border-t border-white/[0.06]">
              {categories.map((cat, i) => (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className="text-caption text-[9px] tracking-[0.28em] text-white/25 hover:text-white transition-colors duration-300 pr-8 mr-8 border-r border-white/[0.08] last:border-r-0 last:mr-0 last:pr-0"
                  style={i === categories.length - 1 ? { borderRight: 'none' } : {}}
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── PRODUTOS ──────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 md:px-16 py-20">
        {error && (
          <p className="text-caption text-[11px] text-red-500 tracking-[0.2em] mb-10">
            Erro ao carregar produtos.
          </p>
        )}

        {categories.length === 0 && !error && (
          <div className="text-center py-32">
            <p className="font-headline text-3xl text-[#ddd]">Em breve.</p>
          </div>
        )}

        <div className="flex flex-col gap-24">
          {categories.map((cat) => (
            <section key={cat} id={cat}>
              {/* Section header */}
              <div className="flex items-end justify-between mb-10 pb-5 border-b border-[#e8e3db]">
                <div>
                  <p className="text-caption text-[9px] tracking-[0.3em] text-[#bbb] mb-2">
                    {CATEGORY_SUBS[cat] ?? ''}
                  </p>
                  <h2 className="text-h2 text-[#111]" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                    {CATEGORY_LABELS[cat] ?? cat}
                  </h2>
                </div>
                <span className="text-caption text-[9px] tracking-[0.22em] text-[#ccc] tabular-nums">
                  {grouped[cat].length} {grouped[cat].length === 1 ? 'item' : 'itens'}
                </span>
              </div>

              {/* Grid */}
              <div
                className="grid gap-x-8 gap-y-12"
                style={{
                  gridTemplateColumns:
                    grouped[cat].length === 1
                      ? '280px'
                      : grouped[cat].length === 2
                        ? 'repeat(2, 1fr)'
                        : 'repeat(3, 1fr)',
                }}
              >
                {grouped[cat].map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-[#111] text-white mt-auto">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-12 flex items-center justify-between border-b border-white/[0.06]">
          <Link
            href="/"
            className="hm-logo"
            style={{ fontSize: '16px', color: 'white', textDecoration: 'none' }}
          >
            <span className="hm-house">House</span>
            <span className="hm-mazzutti">Mazzutti</span>
          </Link>
          <div className="flex gap-8">
            {[
              ['Studio', '/studio'],
              ['Agência', '/agencia'],
              ['Produtora', '/produtora'],
              ['Academy', '/academy'],
            ].map(([l, h]) => (
              <Link
                key={l}
                href={h}
                className="text-caption text-[9px] tracking-[0.22em] text-white/22 hover:text-white/70 transition-colors duration-300"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-5">
          <span className="text-caption text-[9px] tracking-[0.22em] text-white/10">
            © {new Date().getFullYear()} House Mazzutti · Pagamentos processados por Stripe
          </span>
        </div>
        <div className="mt-4">
          <SiteFooterLinks />
        </div>
      </footer>
    </div>
  )
}
