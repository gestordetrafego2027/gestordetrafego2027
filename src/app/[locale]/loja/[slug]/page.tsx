import { notFound } from 'next/navigation'
import SiteFooterLinks from '@/app/components/SiteFooterLinks'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/academy/WaitlistForm'
import { DirectCheckoutButton } from '@/components/ecommerce/DirectCheckoutButton'

export const revalidate = 60

type ServicePackage = {
  id: string
  name: string
  price_brl: number | null
  includes: string[] | null
  duration: string | null
}

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
  const canonical = `https://housemazzutti.com/pt/loja/${slug}/`
  return {
    title: p.seo_title ?? `${p.name} — House Mazzutti`,
    description: p.seo_description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      images: p.og_image_url
        ? [p.og_image_url]
        : Array.isArray(p.images) && p.images[0]
          ? [(p.images as string[])[0]]
          : [],
    },
  }
}

function formatBRL(cents: number, currency = 'brl') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

export default async function ProdutoPage({ params }: Props) {
  if (!featureFlags.isStoreEnabled()) notFound()
  const { slug, locale } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('store_products')
    .select(
      `id, slug, name, description, product_type, images, features,
      metadata, seo_title, seo_description, og_image_url, featured, status,
      store_prices (id, stripe_price_id, unit_amount, currency, price_type,
        recurring_interval, recurring_interval_count, nickname, active, metadata),
      store_product_categories (store_categories (id, slug, name))`,
    )
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle()

  if (!product) notFound()

  // Pacotes do serviço correspondente (mesmo slug)
  let servicePackages: ServicePackage[] = []
  const { data: svc } = await supabase.from('services').select('id').eq('slug', slug).maybeSingle()
  if (svc?.id) {
    const { data: pkgs } = await supabase
      .from('service_packages')
      .select('id, name, price_brl, includes, duration')
      .eq('service_id', svc.id)
      .eq('active', true)
      .order('price_brl', { ascending: true })
    servicePackages = (pkgs ?? []) as ServicePackage[]
  }

  const allPrices = Array.isArray(product.store_prices) ? product.store_prices : []
  const mainPrice = allPrices.find((p) => p.active) ?? null
  const isQuoteOnly = (mainPrice?.metadata as { quote_only?: string } | null)?.quote_only === 'true'
  const rawImages = Array.isArray(product.images) ? (product.images as string[]) : []
  const mainImage = product.og_image_url ?? rawImages[0] ?? null
  const galleryImages = rawImages
  const productCats = Array.isArray(product.store_product_categories)
    ? product.store_product_categories
    : []
  const category = (
    productCats[0] as
      { store_categories?: { id?: string; slug?: string; name?: string } } | undefined
  )?.store_categories

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

  const descBullets = product.description
    ? product.description
        .split('·')
        .map((s: string) => s.trim())
        .filter(Boolean)
    : []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#faf9f7] flex flex-col">
        {/* ── HEADER ──────────────────────────────────────────── */}
        <header className="bg-[#111] text-white">
          <div className="px-8 md:px-16 h-[60px] flex items-center justify-between border-b border-white/[0.06]">
            <Link
              href="/"
              className="hm-logo"
              style={{ fontSize: '18px', color: 'white', textDecoration: 'none' }}
            >
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href={`/${locale}/loja`}
                className="text-caption text-[9px] tracking-[0.28em] text-white/30 hover:text-white/80 transition-colors duration-300"
              >
                ← Loja
              </Link>
              {category?.name && (
                <span className="text-caption text-[9px] tracking-[0.22em] text-white/14 border-l border-white/[0.08] pl-6">
                  {category.name}
                </span>
              )}
            </nav>
          </div>
        </header>

        {/* ── PRODUTO ─────────────────────────────────────────── */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 md:px-16 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-14">
            <Link
              href={`/${locale}/loja`}
              className="text-caption text-[9px] tracking-[0.22em] text-[#bbb] hover:text-[#111] transition-colors duration-300"
            >
              Loja
            </Link>
            <span className="text-caption text-[9px] text-[#ddd]">/</span>
            <span className="text-caption text-[9px] tracking-[0.22em] text-[#999]">
              {category?.name ?? ''}
            </span>
            <span className="text-caption text-[9px] text-[#ddd]">/</span>
            <span className="text-caption text-[9px] tracking-[0.22em] text-[#555]">
              {product.name}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* ── IMAGEM ─────────────────────────────────────── */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#ede9e2]">
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
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#c8bfb0] text-5xl" style={{ fontWeight: 300 }}>
                      ✦
                    </span>
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-5 left-5">
                    <span className="text-caption text-[9px] tracking-[0.28em] text-white bg-black px-3 py-1.5">
                      DESTAQUE
                    </span>
                  </div>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {galleryImages.slice(1, 5).map((img, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden bg-[#ede9e2]">
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 2}`}
                        fill
                        className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── INFO ───────────────────────────────────────── */}
            <div className="flex flex-col pt-1">
              {/* Tipo */}
              <p className="text-caption text-[9px] tracking-[0.32em] text-[#aaa] mb-5">
                {category?.name ?? ''} ·{' '}
                {product.product_type === 'digital'
                  ? 'Produto Digital'
                  : product.product_type === 'service'
                    ? 'Serviço'
                    : product.product_type === 'bundle'
                      ? 'Bundle'
                      : 'Produto'}
              </p>

              {/* Nome */}
              <h1
                className="font-headline text-[#111] tracking-tight mb-8"
                style={{
                  fontSize: 'clamp(28px,3.5vw,48px)',
                  lineHeight: '1.0',
                  fontWeight: 300,
                }}
              >
                {product.name}
              </h1>

              {/* Preço */}
              {mainPrice && !isQuoteOnly && (
                <div className="py-7 border-t border-b border-[#e8e3db] mb-8">
                  <p
                    className="font-headline text-[#111] tabular-nums"
                    style={{
                      fontSize: 'clamp(36px,4vw,56px)',
                      lineHeight: 1,
                      fontWeight: 300,
                    }}
                  >
                    {formatBRL(mainPrice.unit_amount, mainPrice.currency)}
                    {mainPrice.price_type === 'recurring' && (
                      <span className="text-caption text-[10px] tracking-[0.15em] text-[#aaa] ml-2">
                        /{mainPrice.recurring_interval === 'month' ? 'MÊS' : 'ANO'}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {isQuoteOnly && (
                <div className="py-7 border-t border-b border-[#e8e3db] mb-8">
                  <p className="text-caption text-[10px] tracking-[0.22em] text-[#999]">
                    Preço sob consulta · orçamento personalizado
                  </p>
                </div>
              )}

              {/* Chips de descrição */}
              {descBullets.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {descBullets.map((item, i) => (
                    <span
                      key={i}
                      className="text-caption text-[9px] tracking-[0.14em] text-[#666] bg-[#f0ede8] border border-[#e8e3db] px-3 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* Features */}
              {Array.isArray(product.features) && product.features.length > 0 && (
                <ul className="flex flex-col gap-2.5 mb-8 pb-8 border-b border-[#e8e3db]">
                  {(product.features as string[]).map((f, i) => (
                    <li
                      key={i}
                      className="text-caption text-[10px] tracking-[0.14em] text-[#777] flex items-start gap-3"
                    >
                      <span className="text-[#ccc] mt-px">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Pacotes */}
              {servicePackages.length > 0 && (
                <div className="mb-8 pb-8 border-b border-[#e8e3db]">
                  <p className="text-caption text-[9px] tracking-[0.28em] text-[#aaa] mb-4">
                    Pacotes disponíveis
                  </p>
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(servicePackages.length, 3)}, 1fr)`,
                    }}
                  >
                    {servicePackages.map((pkg) => (
                      <div key={pkg.id} className="bg-[#111] p-5 flex flex-col gap-2">
                        <p className="text-caption text-[8px] tracking-[0.28em] text-white/35">
                          {pkg.name}
                        </p>
                        {pkg.price_brl != null ? (
                          <p
                            className="font-headline tabular-nums"
                            style={{
                              fontSize: '19px',
                              color: '#c4a97a',
                              fontWeight: 300,
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(pkg.price_brl)}
                          </p>
                        ) : (
                          <p className="text-caption text-[8px] tracking-[0.22em] text-[#c4a97a]">
                            Sob consulta
                          </p>
                        )}
                        {pkg.duration && (
                          <p className="text-caption text-[8px] tracking-[0.18em] text-white/20">
                            {pkg.duration}
                          </p>
                        )}
                        {Array.isArray(pkg.includes) && pkg.includes.length > 0 && (
                          <ul className="flex flex-col gap-1 mt-1 pt-3 border-t border-white/[0.06]">
                            {pkg.includes.map((item: string, idx: number) => (
                              <li
                                key={idx}
                                className="text-[9px] text-white/40 pl-3 relative leading-relaxed font-body"
                              >
                                <span className="absolute left-0 text-[#a88e5c]">·</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-2">
                {product.status === 'published' && mainPrice?.stripe_price_id ? (
                  <DirectCheckoutButton
                    stripePriceId={mainPrice.stripe_price_id}
                    label="Comprar agora"
                    className="w-full"
                  />
                ) : (
                  <>
                    <p className="text-caption text-[9px] tracking-[0.22em] text-[#aaa] mb-4">
                      Disponível a partir de 10 de agosto · entre na lista
                    </p>
                    <WaitlistForm product={product.slug} />
                  </>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer className="bg-[#111] text-white mt-20">
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
    </>
  )
}
