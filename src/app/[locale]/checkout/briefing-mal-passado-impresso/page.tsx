/**
 * Checkout · Briefing Mal Passado · Vol. 03 · Impresso
 * Server component — preço/título puxados de academy_products (slug=briefing-mal-passado-impresso).
 * Stripe: prod_Um008RUkxLtmGQ · price_1TmS0KLcrEu1967ngdZ2bk5k · R$ 95,00 (shippable)
 *
 * Diferenças do digital:
 *  - Aviso explícito de envio físico (10 dias úteis, Brasil inteiro)
 *  - Stripe Checkout coleta endereço (product.shippable=true na sessão)
 *  - Sem download imediato — entrega via Correios
 */
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { PaymentMethodSelector } from '@/components/ecommerce/PaymentMethodSelector'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Checkout · Briefing Mal Passado · Impresso · House Mazzutti Academy',
  description: 'Finalize sua compra do livro físico Briefing Mal Passado · Vol. 03 — capa cartonada, 417 páginas, envio para todo o Brasil.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const SLUG = 'briefing-mal-passado-impresso'
const STRIPE_PRICE_ID =
  process.env.STRIPE_PRICE_ID_BRIEFING_MAL_PASSADO_IMPRESSO ?? 'price_1TmS0KLcrEu1967ngdZ2bk5k'

const brl = (cents: number | null | undefined) =>
  ((cents ?? 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function CheckoutImpressoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('academy_products')
    .select('title, price_cents, original_price_cents, subtitle, page_count')
    .eq('slug', SLUG)
    .maybeSingle()

  const finalCents = product?.price_cents ?? 9500
  const originalCents = product?.original_price_cents ?? null
  const hasDiscount = originalCents !== null && originalCents > finalCents
  const discountPct = hasDiscount
    ? Math.round(((originalCents! - finalCents) / originalCents!) * 100)
    : 0

  const subtitleLine =
    product?.subtitle ?? 'Livro físico · capa cartonada · Vol. 03'

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0e110e',
        color: '#f2efe8',
        fontFamily: '"Source Serif 4", Georgia, serif',
        display: 'grid',
        placeItems: 'center',
        padding: '64px 24px',
      }}
    >
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: '#a0a0a0',
            marginBottom: 18,
          }}
        >
          ● House Mazzutti Academy · Vol. 03 · Impresso
        </div>
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 400,
            fontSize: 'clamp(32px, 5vw, 60px)',
            lineHeight: 0.98,
            margin: '0 0 24px',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}
        >
          Briefing<br />
          <em style={{ fontStyle: 'italic', color: '#a0a0a0' }}>Mal Passado</em>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#ccc', margin: '0 0 8px' }}>
          {subtitleLine}
        </p>

        {/* Bloco de preço */}
        <div style={{ margin: '12px 0 24px' }}>
          {hasDiscount && (
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                color: '#777',
                textDecoration: 'line-through',
                marginBottom: 6,
                letterSpacing: '0.04em',
              }}
            >
              De {brl(originalCents)}
            </div>
          )}
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 48,
              fontWeight: 400,
              color: '#f2efe8',
              letterSpacing: '-0.02em',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 12,
            }}
          >
            <span>
              <span style={{ fontSize: 18, color: '#a0a0a0', verticalAlign: 'top', marginRight: 4 }}>
                R$
              </span>
              {((finalCents) / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            {hasDiscount && (
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#f2efe8',
                  background: '#3a3a3a',
                  padding: '4px 8px',
                  borderRadius: 2,
                }}
              >
                {discountPct}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Aviso de envio físico */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.16)',
            borderLeft: '3px solid #a0a0a0',
            padding: '14px 18px',
            textAlign: 'left',
            margin: '0 auto 28px',
            maxWidth: 440,
            fontSize: 13,
            color: '#ccc',
            lineHeight: 1.55,
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 9.5,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#a0a0a0',
              marginBottom: 6,
            }}
          >
            Envio físico
          </div>
          Livro despachado em até <strong>10 dias úteis</strong> após a confirmação do pagamento.
          Frete calculado pelos Correios no checkout, para todo o Brasil. Endereço de entrega
          coletado na próxima etapa.
        </div>

        {STRIPE_PRICE_ID ? (
          <PaymentMethodSelector
            stripePriceId={STRIPE_PRICE_ID}
            productSlug={SLUG}
            locale={locale}
            priceCents={finalCents}
          />
        ) : (
          <p style={{ color: '#a0a0a0', fontSize: 14 }}>
            Checkout em configuração — volte em breve.
          </p>
        )}

        <p style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
          Pagamento seguro via Stripe · Cartão, Pix e Boleto · 7 dias de garantia
        </p>

        <Link
          href={`/${locale}/academy/briefing-mal-passado#formatos`}
          style={{
            display: 'inline-block',
            marginTop: 24,
            fontSize: 13,
            color: '#666',
            textDecoration: 'underline',
          }}
        >
          ← Prefere o PDF? Veja as duas formas de ler
        </Link>
      </div>
    </main>
  )
}
