'use client'
/**
 * PaymentMethodSelector
 * Exibe as 3 opções de pagamento: Cartão (Stripe), Pix (Asaas), Boleto (Asaas).
 * Fluxo:
 *   Cartão  → POST /api/store/checkout       → redirect Stripe Checkout
 *   Pix     → POST /api/store/checkout/asaas → redirect /checkout/pix-pendente/[orderId]
 *   Boleto  → POST /api/store/checkout/asaas → redirect /checkout/boleto/[orderId]
 */
import { useState } from 'react'

type Method = 'card' | 'pix' | 'boleto'

interface Props {
  stripePriceId: string
  productSlug: string
  locale: string
  priceCents: number
}

const BRL = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const METHODS: { id: Method; label: string; desc: string; icon: string }[] = [
  { id: 'card',   label: 'Cartão de crédito', desc: 'Visa, Master, Elo, Amex · Apple Pay', icon: '💳' },
  { id: 'pix',    label: 'Pix',               desc: 'Aprovação imediata · taxa R$ 1,99',   icon: '📱' },
  { id: 'boleto', label: 'Boleto bancário',    desc: 'Vence em 3 dias úteis',               icon: '📄' },
]

export function PaymentMethodSelector({ stripePriceId, productSlug, locale, priceCents }: Props) {
  const [selected, setSelected] = useState<Method>('card')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handlePay() {
    setLoading(true)
    setError(null)

    try {
      if (selected === 'card') {
        // Fluxo existente → Stripe Checkout
        const res = await fetch('/api/store/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ stripePriceId, quantity: 1 }],
            locale,
          }),
        })
        const data = await res.json()
        if (!res.ok || !data.url) throw new Error(data.error ?? 'Erro ao abrir checkout.')
        window.location.href = data.url
        return
      }

      // Fluxo Asaas → criar order → redirecionar para pix/boleto
      const res = await fetch('/api/store/checkout/asaas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripePriceId,
          productSlug,
          method: selected,
          locale,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.orderId) throw new Error(data.error ?? 'Erro ao iniciar pagamento.')

      if (selected === 'pix') {
        window.location.href = `/${locale}/checkout/pix-pendente/${data.orderId}`
      } else {
        window.location.href = `/${locale}/checkout/boleto/${data.orderId}`
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      {/* Seletor de método */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 18px',
              border: selected === m.id ? '2px solid #14140e' : '2px solid #ddd6c8',
              borderRadius: 4,
              background: selected === m.id ? '#14140e' : '#fff',
              color: selected === m.id ? '#efe9da' : '#14140e',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 22 }}>{m.icon}</span>
            <span>
              <span
                style={{
                  display: 'block',
                  fontFamily: '"Rock Grotesque", system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 12,
                  opacity: 0.7,
                  marginTop: 2,
                }}
              >
                {m.desc}
              </span>
            </span>
            {selected === m.id && (
              <span style={{ marginLeft: 'auto', fontSize: 16 }}>✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Botão de pagamento */}
      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          width: '100%',
          background: loading ? '#888' : '#c92a2a',
          color: '#fff',
          fontFamily: '"Rock Grotesque", system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '18px 24px',
          border: 'none',
          borderRadius: 4,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s',
        }}
        aria-busy={loading}
      >
        {loading
          ? 'Processando…'
          : `Pagar ${BRL(priceCents)} com ${METHODS.find((m) => m.id === selected)?.label}`}
      </button>

      {error && (
        <p style={{ color: '#c92a2a', fontSize: 13, marginTop: 12, textAlign: 'center' }}>
          {error}
        </p>
      )}

      <p style={{ fontSize: 11, color: '#888', marginTop: 14, textAlign: 'center' }}>
        Pagamento seguro · 7 dias de garantia
      </p>
    </div>
  )
}
