import { notFound } from 'next/navigation'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Loja — House Mazzutti',
  description: 'Produtos, serviços e cursos da House Mazzutti.',
}

type Product = {
  id: string
  slug: string
  name: string
  description: string | null
  product_type: string
  images: string[]
  featured: boolean
  store_prices: { unit_amount: number; currency: string; price_type: string }[]
}

function formatPrice(cents: number, currency = 'brl') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

function ProductCard({ product }: { product: Product }) {
  const price = product.store_prices?.[0]
  const image = product.images?.[0] ?? null

  return (
    <Link
      href={`/loja/${product.slug}`}
      className="group block rounded-xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-400 transition-all duration-200 hover:shadow-md"
    >
      {/* Imagem */}
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
          <div className="w-full h-full flex items-center justify-center text-neutral-300">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide">
            Destaque
          </span>
        )}
        <span className="absolute top-2 right-2 bg-white/90 text-neutral-600 text-[10px] px-2 py-0.5 rounded-full capitalize">
          {product.product_type === 'digital' ? 'Digital'
            : product.product_type === 'service' ? 'Serviço'
            : product.product_type === 'bundle' ? 'Bundle'
            : 'Físico'}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{product.description}</p>
        )}
        {price && (
          <p className="text-base font-bold text-neutral-900">
            {formatPrice(price.unit_amount, price.currency)}
            {price.price_type === 'recurring' && (
              <span className="text-xs font-normal text-neutral-400 ml-1">/mês</span>
            )}
          </p>
        )}
      </div>
    </Link>
  )
}

function ProductSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-neutral-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 rounded w-full" />
        <div className="h-3 bg-neutral-200 rounded w-2/3" />
        <div className="h-5 bg-neutral-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}

export default async function LojaPage() {
  if (!featureFlags.isStoreEnabled()) notFound()

  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('store_products')
    .select(`
      id, slug, name, description, product_type, images, featured,
      store_prices (unit_amount, currency, price_type)
    `)
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  const items = (products ?? []) as Product[]

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="bg-white border-b border-neutral-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">House Mazzutti</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
            Loja
          </h1>
          <p className="text-neutral-500 max-w-lg">
            Serviços, cursos e produtos digitais para marcas, profissionais de imagem e criadores.
          </p>
        </div>
      </section>

      {/* Produtos */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        {error && (
          <p className="text-sm text-red-600 mb-6">Erro ao carregar produtos. Tente novamente.</p>
        )}

        {items.length === 0 && !error ? (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-lg">Em breve.</p>
            <p className="text-sm mt-1">Os produtos estão sendo preparados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
