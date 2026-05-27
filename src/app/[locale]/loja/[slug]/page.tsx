// @ts-nocheck
import { notFound } from 'next/navigation'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AddToCartButton } from '@/components/ecommerce/product/AddToCartButton'

export const revalidate = 60

type Props = { params: Promise<{ slug: string; locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!featureFlags.isStoreEnabled()) return {}
  const { slug } = await params
  const supabase = await createClient()
  const { data: p } = await supabase
    .from('store_products')
    .select('name, seo_title, seo_description, og_image_url, images')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle()

  if (!p) return { title: 'Produto não encontrado' }

  return {
    title: p.seo_title ?? `${p.name} — House Mazzutti`,
    description: p.seo_description,
    openGraph: {
      images: p.og_image_url ? [p.og_image_url] : p.images?.[0] ? [p.images[0]] : [],
    },
  }
}

function formatPrice(cents: number, currency = 'brl') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

export default async function ProdutoPage({ params }: Props) {
  if (!featureFlags.isStoreEnabled()) notFound()

  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('store_products')
    .select(`
      id, slug, name, description, product_type, images, features,
      metadata, seo_title, seo_description, og_image_url, featured,
      store_prices (
        id, stripe_price_id, unit_amount, currency, price_type,
        recurring_interval, recurring_interval_count, nickname, active
      ),
      store_product_categories (
        store_categories ( id, slug, name )
      )
    `)
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle()

  if (!product) notFound()

  const allPrices = (product.store_prices as any[]) ?? []
  const mainPrice = allPrices.find((p: any) => p.active) ?? null
  const isQuoteOnly = mainPrice?.metadata?.quote_only === 'true'
  const mainImage = product.images?.[0] ?? null
  const galleryImages = product.images ?? []

  // JSON-LD Product
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: mainPrice
      ? {
          '@type': 'Offer',
          priceCurrency: mainPrice.currency?.toUpperCase() ?? 'BRL',
          price: (mainPrice.unit_amount / 100).toFixed(2),
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'House Mazzutti' },
        }
      : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="border-b border-neutral-100 px-6 py-3">
          <div className="max-w-5xl mx-auto flex gap-2 text-sm text-neutral-400">
            <Link href="/loja" className="hover:text-neutral-900 transition-colors">Loja</Link>
            <span>/</span>
            <span className="text-neutral-700">{product.name}</span>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Galeria */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryImages.slice(1, 5).map((img, i) => (
                    <div key={i} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                      <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  {product.product_type === 'digital' ? 'Produto Digital'
                    : product.product_type === 'service' ? 'Serviço'
                    : product.product_type === 'bundle' ? 'Bundle'
                    : 'Produto Físico'}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-1 leading-tight">
                  {product.name}
                </h1>
              </div>

              {mainPrice && (
                <div>
                  <p className="text-3xl font-bold text-neutral-900">
                    {formatPrice(mainPrice.unit_amount, mainPrice.currency)}
                    {mainPrice.price_type === 'recurring' && (
                      <span className="text-base font-normal text-neutral-400 ml-1">
                        /{mainPrice.recurring_interval === 'month' ? 'mês' : 'ano'}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {product.description && (
                <p className="text-neutral-600 leading-relaxed">{product.description}</p>
              )}

              {/* Features */}
              {Array.isArray(product.features) && product.features.length > 0 && (
                <ul className="space-y-2">
                  {(product.features as string[]).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              {mainPrice && (
                <AddToCartButton
                  isQuoteOnly={isQuoteOnly}
                  item={{
                    id: mainPrice.id,
                    stripePriceId: mainPrice.stripe_price_id,
                    stripeProductId: product.id,
                    slug: product.slug,
                    name: product.name,
                    description: product.description ?? null,
                    image: mainImage,
                    unitAmount: mainPrice.unit_amount,
                    currency: mainPrice.currency ?? 'brl',
                    productType: product.product_type as 'digital' | 'service' | 'physical' | 'bundle',
                    quoteOnly: isQuoteOnly,
                  }}
                />
              )}

              <p className="text-xs text-neutral-400 text-center">
                Pagamento seguro via Stripe · Cartão, Pix e Boleto
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
