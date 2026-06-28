/**
 * Checkout · Marketing para Modelos · Vol. 01
 * Server component — preço/título puxados de academy_products (slug=marketing-para-modelos).
 * O DirectCheckoutButton faz POST /api/store/checkout e redireciona ao Stripe.
 */
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { PaymentMethodSelector } from '@/components/ecommerce/PaymentMethodSelector'
import { createClient } from '@/lib/supabase/server'
import { DIGITAL_PRODUCTS } from '@/lib/digital-products'

export const metadata: Metadata = {
  title: 'Checkout · Marketing para Modelos · House Mazzutti Academy',
  description: 'Finalize sua compra do ebook Marketing para Modelos · Vol. 01.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const SLUG = 'marketing-para-modelos'
// Fonte de verdade: catálogo (independe de env/Coolify). Env fica só como override.
const STRIPE_PRICE_ID =
  DIGITAL_PRODUCTS[SLUG]?.stripePriceId ?? process.env.STRIPE_PRICE_MARKETING_PARA_MODELOS ?? ''

const brl = (cents: number | null | undefined) =>
  ((cents ?? 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('academy_products')
    .select('title, price_cents, original_price_cents, page_count, module_count, lesson_count, subtitle')
    .eq('slug', SLUG)
    .maybeSingle()

  const title = product?.title ?? 'Marketing para Modelos'
  const finalCents = product?.price_cents ?? 4900
  const originalCents = product?.original_price_cents ?? null
  const hasDiscount = originalCents !== null && originalCents > finalCents
  const discountPct = hasDiscount
    ? Math.round(((originalCents! - finalCents) / originalCents!) * 100)
    : 0

  const pageCount = product?.page_count ?? 94
  const moduleCount = product?.module_count ?? 12
  const subtitleLine =
    product?.subtitle ??
    `Ebook · ${pageCount} páginas · ${moduleCount} capítulos`

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#efe9da',
        color: '#14140e',
        fontFamily: '"Source Serif 4", Georgia, serif',
        display: 'grid',
        placeItems: 'center',
        padding: '64px 24px',
      }}
    >
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: '"Rock Grotesque", system-ui, sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: '#c92a2a',
            marginBottom: 18,
          }}
        >
          ● House Mazzutti Academy · Vol. 01
        </div>
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 0.98,
            margin: '0 0 24px',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: '#2a2a22',
            margin: '0 0 8px',
          }}
        >
          {subtitleLine}
        </p>

        {/* Bloco de preço */}
        <div style={{ margin: '12px 0 32px' }}>
          {hasDiscount && (
            <div
              style={{
                fontFamily: '"Rock Grotesque", system-ui, sans-serif',
                fontSize: 14,
                color: '#888',
                textDecoration: 'line-through',
                marginBottom: 4,
              }}
            >
              De {brl(originalCents)}
            </div>
          )}
          <div
            style={{
              fontFamily: '"Rock Grotesque", system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 700,
              color: '#14140e',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 12,
            }}
          >
            {brl(finalCents)}
            {hasDiscount && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#c92a2a',
                  background: '#fff3f3',
                  padding: '4px 8px',
                  borderRadius: 2,
                }}
              >
                {discountPct}% OFF
              </span>
            )}
          </div>
        </div>

        {STRIPE_PRICE_ID ? (
          <PaymentMethodSelector
            stripePriceId={STRIPE_PRICE_ID}
            productSlug={SLUG}
            locale={locale}
            priceCents={finalCents}
          />
        ) : (
          <p style={{ color: '#c92a2a', fontSize: 14 }}>
            Checkout em configuração — volte em breve.
          </p>
        )}

        <p style={{ fontSize: 12, color: '#888', marginTop: 16 }}>
          Pagamento seguro via Stripe · Cartão, Pix e Boleto · 7 dias de garantia
        </p>

        <Link
          href={`/${locale}/academy/marketing-para-modelos`}
          style={{
            display: 'inline-block',
            marginTop: 24,
            fontSize: 13,
            color: '#888',
            textDecoration: 'underline',
          }}
        >
          ← Voltar para a página do livro
        </Link>
      </div>
    </main>
  )
}
