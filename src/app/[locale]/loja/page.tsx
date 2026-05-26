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
  const category = product.store_product_categories?.[0]?.store_categories

  return (
    <Link
      href={`/loja/${product.slug}`}
      className="group block rounded-xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-400 transition-all duration-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-50">
            <span className="text-4xl">
              {product.product_type === 'service' ? '✦' :
               product.product_type === 'digital' ? '◈' : '◻'}
            </span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4">
        {category && (
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
            {category.name}
          </span>
        )}
        <h3 className="font-semibold text-neutral-900 leading-snug mt-0.5 mb-1 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{product.description}</p>
        )}
        {quoteOnly ? (
          <span className="inline-block text-xs font-medium text-neutral-600 border border-neutral-300 rounded-full px-3 py-0.5">
            Solicitar orçamento
          </span>
        ) : price ? (
          <p className="text-base font-bold text-neutral-900">
            {formatPrice(price.unit_amount, price.currency)}
            {price.price_type === 'recurring' && (
              <span className="text-xs font-normal text-neutral-400 ml-1">/mês</span>
            )}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

const CATEGORY_ORDER = ['agencia', 'studio', 'produtora', 'academy']
const CATEGORY_LABELS: Record<string, string> = {
  agencia: 'Agência',
  studio: 'Studio',
  produtora: 'Produtora',
  academy: 'Academy',
}

export default async function LojaPage() {
  if (!featureFlags.isStoreEnabled()) notFound()

  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('store_products')
    .select(`
      id, slug, name, description, product_type, images, featured,
      store_prices (unit_amount, currency, price_type, metadata),
      store_product_categories (
        store_categories (slug, name)
      )
    `)
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('name', { ascending: true })

  const items = (products ?? []) as Product[]

  // Agrupar por categoria
  const grouped: Record<string, Product[]> = {}
  for (const p of items) {
    const catSlug = p.store_product_categories?.[0]?.store_categories?.slug ?? 'outros'
    if (!grouped[catSlug]) grouped[catSlug] = []
    grouped[catSlug].push(p)
  }

  const categories = CATEGORY_ORDER.filter((c) => grouped[c]?.length > 0)

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="bg-white border-b border-neutral-100 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">House Mazzutti</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
            Loja
          </h1>
          <p className="text-neutral-500 max-w-xl">
            Serviços, cursos e produtos digitais para marcas, profissionais de imagem e criadores.
          </p>

          {/* Nav de categorias */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className="px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-sm text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Produtos por categoria */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {error && (
          <p className="text-sm text-red-600">Erro ao carregar produtos. Tente novamente.</p>
        )}

        {categories.length === 0 && !error && (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-lg font-medium">Em breve.</p>
            <p className="text-sm mt-1">Os produtos estão sendo preparados.</p>
          </div>
        )}

        {categories.map((cat) => (
          <section key={cat} id={cat}>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-xl font-bold text-neutral-900">
                {CATEGORY_LABELS[cat] ?? cat}
              </h2>
              <span className="text-sm text-neutral-400">
                {grouped[cat].length} {grouped[cat].length === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {grouped[cat].map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
