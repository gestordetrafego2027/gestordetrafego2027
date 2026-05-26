'use client'
/**
 * DirectCheckoutButton
 * Redireciona direto para o Stripe Checkout sem passar pelo carrinho.
 * Ideal para landing pages de produto único (livros, cursos, etc.).
 *
 * Usage:
 *   <DirectCheckoutButton
 *     stripePriceId="price_xxx"
 *     label="Garantir meu exemplar"
 *     className="..."
 *   />
 */
import { useState } from 'react'

interface Props {
  stripePriceId: string
  label?: string
  loadingLabel?: string
  className?: string
  style?: React.CSSProperties
}

export function DirectCheckoutButton({
  stripePriceId,
  label = 'Comprar agora',
  loadingLabel = 'Aguarde…',
  className,
  style,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ stripePriceId, quantity: 1 }],
          locale: document.documentElement.lang?.startsWith('en') ? 'en' : 'pt',
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Erro ao abrir checkout.')
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <span style={{ display: 'inline-block' }}>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className}
        style={style}
        aria-busy={loading}
      >
        {loading ? loadingLabel : label}
      </button>
      {error && (
        <span
          style={{
            display: 'block',
            marginTop: 8,
            fontSize: 13,
            color: '#c92a2a',
            textAlign: 'center',
          }}
        >
          {error}
        </span>
      )}
    </span>
  )
}
