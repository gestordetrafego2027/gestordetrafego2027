// @ts-nocheck
import { notFound } from 'next/navigation'
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
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
    .eq('slug', slug).eq('active', true).maybeSingle()
  if (!p) return { title: 'Produto não encontrado' }
  return {
    title: p.seo_title ?? `${p.name} — House Mazzutti`,
    description: p.seo_description,
    openGraph: { images: p.og_image_url ? [p.og_image_url] : p.images?.[0] ? [p.images[0]] : [] },
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
    .select(`id, slug, name, description, product_type, images, features,
      metadata, seo_title, seo_description, og_image_url, featured,
      store_prices (id, stripe_price_id, unit_amount, currency, price_type,
        recurring_interval, recurring_interval_count, nickname, active),
      store_product_categories (store_categories (id, slug, name))`)
    .eq('slug', slug).eq('active', true).maybeSingle()

  if (!product) notFound()

  const allPrices = (product.store_prices as any[]) ?? []
  const mainPrice = allPrices.find((p: any) => p.active) ?? null
  const isQuoteOnly = mainPrice?.metadata?.quote_only === 'true'
  const mainImage = product.og_image_url ?? product.images?.[0] ?? null
  const galleryImages = product.images ?? []
  const category = (product.store_product_categories as any[])?.[0]?.store_categories

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: product.name, description: product.description, image: product.images,
    offers: mainPrice ? {
      '@type': 'Offer', priceCurrency: mainPrice.currency?.toUpperCase() ?? 'BRL',
      price: (mainPrice.unit_amount / 100).toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'House Mazzutti' },
    } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#faf9f7] flex flex-col">

        {/* ── TOPO ────────────────────────────────────────────────── */}
        <header style={{ background: '#111', color: '#fff' }}>
          <div style={{ padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/" className="hm-logo" style={{ fontSize: '20px', color: 'white', textDecoration: 'none' }}>
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <Link href={`/${locale}/loja`} className="font-label uppercase tracking-[0.25em] text-[8px] transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.3)' }}>
                ← Loja
              </Link>
              <span className="font-label uppercase tracking-[0.25em] text-[8px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
                {category?.name ?? ''}
              </span>
            </nav>
          </div>
        </header>

        {/* ── PRODUTO ─────────────────────────────────────────────── */}
        <main className="flex-1" style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '64px 64px' }}>

          {/* Breadcrumb */}
          <div style={{ marginBottom: '48px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href={`/${locale}/loja`} className="font-label uppercase tracking-[0.2em] text-[8px] transition-colors" style={{ color: '#bbb' }}>
              Loja
            </Link>
            <span className="font-label text-[8px]" style={{ color: '#ddd' }}>/</span>
            <span className="font-label uppercase tracking-[0.2em] text-[8px]" style={{ color: '#666' }}>
              {category?.name ?? ''}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

            {/* ── IMAGEM ─────────────────────────────────────────── */}
            <div>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#ede9e2' }}>
                {mainImage ? (
                  <Image src={mainImage} alt={product.name} fill
                    sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#c8bfb0', fontSize: '48px' }}>✦</span>
                  </div>
                )}
                {product.featured && (
                  <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                    <span className="font-label uppercase tracking-[0.25em] text-[8px] text-white" style={{ background: '#111', padding: '6px 12px' }}>
                      DESTAQUE
                    </span>
                  </div>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', marginTop: '4px' }}>
                  {galleryImages.slice(1, 5).map((img, i) => (
                    <div key={i} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#ede9e2' }}>
                      <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── INFO ───────────────────────────────────────────── */}
            <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '0' }}>

              {/* Categoria */}
              <p className="font-label uppercase tracking-[0.3em] text-[8px] mb-4" style={{ color: '#aaa' }}>
                {category?.name ?? ''} · {
                  product.product_type === 'digital' ? 'Produto Digital'
                  : product.product_type === 'service' ? 'Serviço'
                  : product.product_type === 'bundle' ? 'Bundle' : 'Produto'
                }
              </p>

              {/* Nome */}
              <h1 className="font-headline tracking-tight" style={{ fontSize: 'clamp(26px,3.5vw,44px)', color: '#111', lineHeight: '1', marginBottom: '32px' }}>
                {product.name}
              </h1>

              {/* Preço */}
              {mainPrice && !isQuoteOnly && (
                <div style={{ paddingTop: '28px', paddingBottom: '28px', borderTop: '1px solid #e8e3db', borderBottom: '1px solid #e8e3db', marginBottom: '28px' }}>
                  <p className="font-headline tracking-tight" style={{ fontSize: 'clamp(36px,4vw,52px)', color: '#111', lineHeight: '1' }}>
                    {formatPrice(mainPrice.unit_amount, mainPrice.currency)}
                    {mainPrice.price_type === 'recurring' && (
                      <span className="font-label text-sm ml-2 tracking-[0.1em]" style={{ color: '#aaa', fontWeight: 'normal', fontSize: '11px' }}>
                        /{mainPrice.recurring_interval === 'month' ? 'MÊS' : 'ANO'}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* Descrição */}
              {product.description && (
                <p className="font-body text-sm leading-relaxed mb-8" style={{ color: '#666' }}>
                  {product.description}
                </p>
              )}

              {/* Features */}
              {Array.isArray(product.features) && product.features.length > 0 && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #e8e3db' }}>
                  {(product.features as string[]).map((f, i) => (
                    <li key={i} className="font-label uppercase tracking-[0.12em] text-[10px]" style={{ color: '#777', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ color: '#ccc' }}>—</span> {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              {mainPrice && (
                <div>
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
                  <p className="font-label text-[8px] uppercase tracking-[0.2em] text-center mt-4" style={{ color: '#ccc' }}>
                    Pagamento seguro via Stripe · Cartão · Pix · Boleto
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* ── RODAPÉ ──────────────────────────────────────────────── */}
        <footer style={{ background: '#111', color: '#fff', marginTop: '80px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/" className="hm-logo" style={{ fontSize: '18px', color: 'white', textDecoration: 'none' }}>
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </Link>
            <div style={{ display: 'flex', gap: '32px' }}>
              {[['Studio', '/studio'], ['Agência', '/agencia'], ['Produtora', '/produtora'], ['Academy', '/academy']].map(([l, h]) => (
                <Link key={l} href={h} className="font-label uppercase tracking-[0.2em] text-[8px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 64px' }}>
            <span className="font-label uppercase tracking-[0.25em] text-[8px]" style={{ color: 'rgba(255,255,255,0.12)' }}>
              © {new Date().getFullYear()} House Mazzutti · Pagamentos processados por Stripe
            </span>
          </div>
          <div className="mt-6"><SiteFooterLinks /></div>
            </footer>
      </div>
    </>
  )
}
