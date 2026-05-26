import { notFound } from 'next/navigation'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'
import { ProductCard, type ProductCardProduct } from '@/components/ecommerce/product/ProductCard'

export const revalidate = 60

type Product = ProductCardProduct

export const metadata: Metadata = {
  title: 'Loja — House Mazzutti',
  description: 'Serviços, cursos e produtos digitais da House Mazzutti — Agência, Studio, Produtora e Academy.',
  openGraph: {
    title: 'Loja — House Mazzutti',
    description: 'Serviços, cursos e produtos digitais da House Mazzutti.',
  },
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
