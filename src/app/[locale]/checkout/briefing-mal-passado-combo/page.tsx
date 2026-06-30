/**
 * Checkout · Briefing Mal Passado · Vol. 03 · Combo (Digital + Impresso)
 * Server component — preço puxado de academy_products (slug=briefing-mal-passado-combo).
 *
 * Stripe Price ID: precisa ser criado no dashboard como SHIPPABLE (R$ 119,00).
 * Enquanto STRIPE_PRICE_ID_BRIEFING_MAL_PASSADO_COMBO não estiver setado,
 * a página exibe estado "Em breve · pré-reserva" — não quebra o funil.
 */
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { PaymentMethodSelector } from '@/components/ecommerce/PaymentMethodSelector'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Checkout · Briefing Mal Passado · Combo · House Mazzutti Academy',
  description:
    'Combo Briefing Mal Passado — PDF imediato + livro físico em capa cartonada. R$ 119 (economiza R$ 30).',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const SLUG = 'briefing-mal-passado-combo'
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID_BRIEFING_MAL_PASSADO_COMBO ?? ''

const brl = (cents: number | null | undefined) =>
  ((cents ?? 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function CheckoutComboPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('academy_products')
    .select('title, price_cents, original_price_cents, subtitle, page_count')
    .eq('slug', SLUG)
    .maybeSingle()

  const finalCents = product?.price_cents ?? 11900
  const originalCents = product?.original_price_cents ?? 14900
  const hasDiscount = originalCents !== null && originalCents > finalCents
  const discountPct = hasDiscount
    ? Math.round(((originalCents! - finalCents) / originalCents!) * 100)
    : 0
  const savings = hasDiscount ? originalCents! - finalCents : 0

  const subtitleLine = product?.subtitle ?? 'PDF + Livro impresso · Vol. 03'

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
            color: '#8b1f1f',
            marginBottom: 18,
          }}
        >
          ● House Mazzutti Academy · Vol. 03 · Combo
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
          Briefing
          <br />
          <em style={{ fontStyle: 'italic', color: '#a0a0a0' }}>Mal Passado</em>
          <br />
          <span style={{ fontSize: '0.45em', color: '#8b1f1f', letterSpacing: '0.02em' }}>
            — Combo
          </span>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#ccc', margin: '0 0 8px' }}>
          {subtitleLine}
        </p>

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
              De {brl(originalCents)} (avulso)
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
              <span
                style={{ fontSize: 18, color: '#8b1f1f', verticalAlign: 'top', marginRight: 4 }}
              >
                R$
              </span>
              {(finalCents / 100).toLocaleString('pt-BR', {
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
                  background: '#8b1f1f',
                  padding: '4px 8px',
                  borderRadius: 2,
                }}
              >
                Economiza {brl(savings)} · {discountPct}% OFF
              </span>
            )}
          </div>
        </div>

        {/* O que está incluído */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.16)',
            borderLeft: '3px solid #8b1f1f',
            padding: '16px 20px',
            textAlign: 'left',
            margin: '0 auto 28px',
            maxWidth: 440,
            fontSize: 13.5,
            color: '#ccc',
            lineHeight: 1.6,
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
              marginBottom: 8,
            }}
          >
            O combo entrega
          </div>
          <div style={{ marginBottom: 6 }}>
            <strong style={{ color: '#f2efe8' }}>1.</strong> PDF de alta resolução — entrega
            imediata por e-mail após pagamento.
          </div>
          <div>
            <strong style={{ color: '#f2efe8' }}>2.</strong> Livro físico — capa cartonada, 417
            págs, 16×23 cm, despachado em até 10 dias úteis para todo o Brasil. Endereço coletado na
            próxima etapa.
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
          <div
            style={{
              border: '1px dashed rgba(255,255,255,0.25)',
              padding: '20px 18px',
              maxWidth: 440,
              margin: '0 auto',
              color: '#e6e4dc',
              fontSize: 14,
              lineHeight: 1.55,
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 10,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#8b1f1f',
                marginBottom: 6,
              }}
            >
              ● Pré-reserva aberta
            </div>
            O combo está em configuração final. Deixe seu e-mail no botão abaixo — avisamos no
            instante em que abrir.
            <div style={{ marginTop: 18 }}>
              <Link
                href={`/${locale}/academy/briefing-mal-passado#sample`}
                style={{
                  display: 'inline-block',
                  background: '#f2efe8',
                  color: '#0e110e',
                  padding: '14px 28px',
                  textDecoration: 'none',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                Quero ser avisado →
              </Link>
            </div>
          </div>
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
          ← Ver formatos avulsos (digital e impresso)
        </Link>
      </div>
    </main>
  )
}
