/**
 * Checkout · O Preço da Relevância · Vol. 02
 * Server component — preço/título puxados de academy_products (slug=preco-da-relevancia).
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { DirectCheckoutButton } from '@/components/ecommerce/DirectCheckoutButton'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Checkout · O Preço da Relevância · House Mazzutti Academy',
  description: 'Finalize sua compra do ebook O Preço da Relevância · Vol. 02.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const SLUG = 'preco-da-relevancia'
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_PRECO_DA_RELEVANCIA ?? ''

const brl = (cents: number | null | undefined) =>
  ((cents ?? 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('academy_products')
    .select('title, price_cents, original_price_cents, subtitle, page_count')
    .eq('slug', SLUG)
    .maybeSingle()

  const finalCents = product?.price_cents ?? 5400
  const originalCents = product?.original_price_cents ?? null
  const hasDiscount = originalCents !== null && originalCents > finalCents
  const discountPct = hasDiscount
    ? Math.round(((originalCents! - finalCents) / originalCents!) * 100)
    : 0

  const subtitleLine =
    product?.subtitle ?? 'Manifesto sobre creator economy · Ebook · Vol. 02'

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0e0e0e',
        color: '#f5f0e8',
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
            color: '#8b0000',
            marginBottom: 18,
          }}
        >
          ● House Mazzutti Academy · Vol. 02
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
          O Preço da<br />
          <em style={{ fontStyle: 'italic', color: '#8b0000' }}>Relevância</em>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#ccc', margin: '0 0 8px' }}>
          {subtitleLine}
        </p>

        {/* Bloco de preço */}
        <div style={{ margin: '12px 0 32px' }}>
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
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 12,
            }}
          >
            <span>
              <span style={{ fontSize: 18, color: '#8b0000', verticalAlign: 'top', marginRight: 4 }}>
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
                  color: '#f5f0e8',
                  background: '#8b0000',
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
          <DirectCheckoutButton
            stripePriceId={STRIPE_PRICE_ID}
            label="Garantir meu exemplar →"
            loadingLabel="Abrindo checkout seguro…"
            style={{
              display: 'inline-block',
              background: '#8b0000',
              color: '#f5f0e8',
              fontFamily: 'monospace',
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              padding: '18px 32px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ) : (
          <p style={{ color: '#8b0000', fontSize: 14 }}>
            Checkout em configuração — volte em breve.
          </p>
        )}

        <p style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
          Pagamento seguro via Stripe · Cartão, Pix e Boleto · 7 dias de garantia
        </p>

        <Link
          href={`/${locale}/academy/preco-da-relevancia`}
          style={{
            display: 'inline-block',
            marginTop: 24,
            fontSize: 13,
            color: '#666',
            textDecoration: 'underline',
          }}
        >
          ← Voltar para a página do livro
        </Link>
      </div>
    </main>
  )
}
