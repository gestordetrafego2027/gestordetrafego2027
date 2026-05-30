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
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100)
}

export default async function ProdutoPage({ params }: Props) {
  if (!featureFlags.isStoreEnabled()) notFound()

  const { slug, locale } = await params
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
  const mainImage = product.og_image_url ?? product.images?.[0] ?? null
  const galleryImages = product.images ?? []
  const category = (product.store_product_categories as any[])?.[0]?.store_categories

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: mainPrice ? {
      '@type': 'Offer',
      priceCurrency: mainPrice.currency?.toUpperCase() ?? 'BRL',
      price: (mainPrice.unit_amount / 100).toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'House Mazzutti' },
    } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-[#0a0a0a] text-white">

        {/* ── TOP NAV ─────────────────────────────────────────── */}
        <nav className="border-b border-white/5 px-8 md:px-16 py-5 flex items-center justify-between">
          <Link href={`/${locale}/loja`} className="font-label uppercase tracking-[0.25em] text-[9px] text-white/30 hover:text-white transition-colors duration-300">
            ← Loja
          </Link>
          <Link href="/" className="hm-logo" style={{ fontSize: '18px', color: 'white' }}>
            <span className="hm-house">House</span>
            <span className="hm-mazzutti">Mazzutti</span>
          </Link>
          <span className="font-label uppercase tracking-[0.25em] text-[9px] text-white/15 hidden md:block">
            {category?.name ?? product.product_type}
          </span>
        </nav>

        {/* ── PRODUCT LAYOUT ──────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-0 md:gap-20 items-start">

            {/* ── IMAGE COLUMN ───────────────────────────────── */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
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
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <span className="text-zinc-700 text-6xl">✦</span>
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-5 left-5">
                    <span className="font-label uppercase tracking-[0.25em] text-[9px] text-white bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1">
                      DESTAQUE
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-px mt-px">
                  {galleryImages.slice(1, 5).map((img, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden bg-zinc-900">
                      <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── INFO COLUMN ────────────────────────────────── */}
            <div className="md:pt-4 flex flex-col gap-8 mt-8 md:mt-0">

              {/* Category + type */}
              <div>
                <p className="font-label uppercase tracking-[0.3em] text-[9px] text-white/25 mb-3">
                  {category?.name ?? ''} · {
                    product.product_type === 'digital' ? 'Produto Digital'
                    : product.product_type === 'service' ? 'Serviço'
                    : product.product_type === 'bundle' ? 'Bundle'
                    : 'Produto'
                  }
                </p>
                <h1 className="font-headline text-[clamp(28px,4vw,52px)] text-white leading-[0.95] tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              {mainPrice && !isQuoteOnly && (
                <div className="border-t border-white/5 pt-6">
                  <p className="font-headline text-[clamp(36px,4vw,56px)] text-white leading-none tracking-tight">
                    {formatPrice(mainPrice.unit_amount, mainPrice.currency)}
                    {mainPrice.price_type === 'recurring' && (
                      <span className="font-label text-sm font-normal text-white/30 ml-2 tracking-[0.1em]">
                        /{mainPrice.recurring_interval === 'month' ? 'MÊS' : 'ANO'}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="font-body text-white/50 text-sm leading-relaxed border-t border-white/5 pt-6">
                  {product.description}
                </p>
              )}

              {/* Features */}
              {Array.isArray(product.features) && product.features.length > 0 && (
                <ul className="space-y-3 border-t border-white/5 pt-6">
                  {(product.features as string[]).map((f, i) => (
                    <li key={i} className="flex items-start gap-4 font-label text-[11px] text-white/50 uppercase tracking-[0.15em]">
                      <span className="text-white/20 mt-px">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              <div className="border-t border-white/5 pt-6">
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
                <p className="font-label text-[9px] uppercase tracking-[0.2em] text-white/15 text-center mt-4">
                  Pagamento seguro via Stripe · Cartão · Pix · Boleto
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}
