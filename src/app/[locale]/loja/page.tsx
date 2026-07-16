import { notFound } from 'next/navigation'
import SiteFooterLinks from '@/app/components/SiteFooterLinks'
import Header from '@/app/components/Header'
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
  // Canonical próprio: sem isto a página herda a canonical raiz (/pt/) do [locale]/layout,
  // o que apontava a loja para a home e impedia sua indexação.
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

function ProductCard({ product, catSlug }: { product: Product; catSlug: string }) {
  const price = product.store_prices?.[0]
  const image = product.images?.[0] ?? null
  const quoteOnly = isQuoteOnly(product.store_prices)
  const InlineCover = COVER_MAP[product.slug] ?? null
  const excerpt = product.description
    ? product.description
        .replace(/·[^·]*/g, '')
        .split('·')[0]
        .trim()
        .split(/\s+/)
        .slice(0, 6)
        .join(' ')
    : null

  return (
    <Link href={`/loja/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f0ede8] mb-4">
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
            <span className="text-[#c8bfb0] text-4xl">✦</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end pointer-events-none">
          <span className="font-label uppercase tracking-[0.25em] text-[8px] text-white px-5 py-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            VER {CATEGORY_LABELS[catSlug] ?? 'SERVIÇO'} →
          </span>
        </div>

        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="font-label uppercase tracking-[0.25em] text-[8px] text-white bg-black px-3 py-1.5">
              DESTAQUE
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <p className="font-label uppercase tracking-[0.2em] text-[7px] text-[#bbb] mb-1">
            {CATEGORY_LABELS[catSlug] ?? catSlug}
          </p>
          <h3 className="font-headline text-[15px] text-[#111] tracking-tight leading-snug group-hover:text-black">
            {product.name}
          </h3>
          {excerpt && (
            <p className="font-body text-[11px] text-[#999] leading-snug mt-0.5 line-clamp-1">
              {excerpt}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right pt-[1.1rem]">
          {quoteOnly ? (
            <span className="font-label uppercase tracking-[0.15em] text-[8px] text-[#888]">
              Consulta
            </span>
          ) : price ? (
            <span className="font-headline text-[15px] text-[#111]">
              {formatPrice(price.unit_amount, price.currency)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

const CATEGORY_ORDER = ['studio', 'produtora', 'academy', 'agencia', 'avulso']
const CATEGORY_LABELS: Record<string, string> = {
  agencia: 'Agência',
  studio: 'Studio',
  produtora: 'Produtora',
  academy: 'Academy',
  avulso: 'Produtos Digitais',
}
const CATEGORY_SUBS: Record<string, string> = {
  agencia: 'Branding · Web · Comunicação',
  studio: 'Book · Ensaio · Cobertura',
  produtora: 'Moda · Beleza · Institucional',
  academy: 'Cursos · Formação · Conteúdo',
  avulso: 'Ebooks · Downloads · Avulsos',
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

  // Avulso = produto digital que não é curso (cursos têm slug terminando em -academy)
  const isAvulso = (p: Product) => p.product_type === 'digital' && !p.slug.endsWith('-academy')

  const grouped: Record<string, Product[]> = {}
  for (const p of items) {
    const catSlug = isAvulso(p)
      ? 'avulso'
      : (p.store_product_categories?.[0]?.store_categories?.slug ?? 'outros')
    if (!grouped[catSlug]) grouped[catSlug] = []
    grouped[catSlug].push(p)
  }

  // Dentro de cada seção: preço crescente; sem preço vai por último
  const priceOf = (p: Product) => {
    if (isQuoteOnly(p.store_prices) || !p.store_prices?.[0]) return Infinity
    return p.store_prices[0].unit_amount
  }
  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) => priceOf(a) - priceOf(b))
  }

  const categories = CATEGORY_ORDER.filter((c) => grouped[c]?.length > 0)

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* ── HEADER GLOBAL (P-LOJ1: mesmo header do site principal) ── */}
      <Header variant="dark" />

      {/* ── HERO DA LOJA ─────────────────────────────────────────── */}
      <header style={{ background: '#111', color: '#fff', paddingTop: '90px' }}>
        {/* Hero text */}
        <div style={{ padding: '48px 64px 56px', maxWidth: '1400px' }}>
          <p
            className="font-label uppercase tracking-[0.35em] text-[8px] mb-5"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Loja — House Mazzutti
          </p>
          <h1
            className="text-h1"
            style={{
              fontSize: 'clamp(48px,7vw,96px)',
              lineHeight: '0.9',
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Produtos
            <br />
            <span style={{ color: 'rgba(255,255,255,0.18)' }}>&amp; Serviços</span>
          </h1>
          <p
            className="font-body text-sm"
            style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '360px', lineHeight: 1.6 }}
          >
            Educação, serviços criativos e produtos digitais para marcas e profissionais de imagem.
          </p>

          {/* Category anchors */}
          {categories.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '0',
                marginTop: '40px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {categories.map((cat, i) => (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className="font-label uppercase tracking-[0.25em] text-[8px] text-white/30 hover:text-white transition-colors duration-300"
                  style={{
                    paddingRight: '32px',
                    marginRight: '32px',
                    borderRight:
                      i < categories.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── PRODUTOS ──────────────────────────────────────────────── */}
      <main
        className="flex-1"
        style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '72px 64px' }}
      >
        {error && (
          <p className="font-label text-[11px] text-red-500 uppercase tracking-[0.2em] mb-8">
            Erro ao carregar produtos.
          </p>
        )}

        {categories.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <p className="font-headline text-3xl" style={{ color: '#ddd' }}>
              Em breve.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {categories.map((cat) => (
            <section key={cat} id={cat}>
              {/* Section header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: '32px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #e8e3db',
                }}
              >
                <div>
                  <p
                    className="font-label uppercase tracking-[0.28em] text-[8px] mb-2"
                    style={{ color: '#bbb' }}
                  >
                    {CATEGORY_SUBS[cat] ?? ''}
                  </p>
                  <h2
                    className="text-h2"
                    style={{ fontSize: 'clamp(28px,3.5vw,44px)', color: '#111', lineHeight: 1 }}
                  >
                    {CATEGORY_LABELS[cat] ?? cat}
                  </h2>
                </div>
                <span
                  className="font-label uppercase tracking-[0.2em] text-[8px]"
                  style={{ color: '#ccc' }}
                >
                  {grouped[cat].length} {grouped[cat].length === 1 ? 'item' : 'itens'}
                </span>
              </div>

              {/* Grid */}
              <div
                style={{
                  display: 'grid',
                  gap: '40px 32px',
                  gridTemplateColumns:
                    grouped[cat].length === 1
                      ? '280px'
                      : grouped[cat].length === 2
                        ? 'repeat(2, 1fr)'
                        : 'repeat(3, 1fr)',
                }}
                className="md:grid-cols-3"
              >
                {grouped[cat].map((p) => (
                  <ProductCard key={p.id} product={p} catSlug={cat} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* ── RODAPÉ ────────────────────────────────────────────────── */}
      <footer style={{ background: '#111', color: '#fff', marginTop: 'auto' }}>
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '48px 64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Link
            href="/"
            className="hm-logo"
            style={{ fontSize: '18px', color: 'white', textDecoration: 'none' }}
          >
            <span className="hm-house">House</span>
            <span className="hm-mazzutti">Mazzutti</span>
          </Link>
          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              ['Studio', '/studio'],
              ['Agência', '/agencia'],
              ['Produtora', '/produtora'],
              ['Academy', '/academy'],
            ].map(([l, h]) => (
              <Link
                key={l}
                href={h}
                className="font-label uppercase tracking-[0.2em] text-[8px] transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 64px' }}>
          <span
            className="font-label uppercase tracking-[0.25em] text-[8px]"
            style={{ color: 'rgba(255,255,255,0.12)' }}
          >
            © {new Date().getFullYear()} House Mazzutti · Pagamentos processados por Stripe
          </span>
        </div>
        <div className="mt-6">
          <SiteFooterLinks />
        </div>
      </footer>
    </div>
  )
}
