'use client'
/**
 * PaymentMethodSelector
 * Exibe as 3 opções de pagamento: Cartão (Stripe), Pix (Asaas), Boleto (Asaas).
 * Para Pix/Boleto coleta e-mail (entrega digital) + CPF (exigência Asaas produção).
 * Fluxo:
 *   Cartão  → POST /api/store/checkout       → redirect Stripe Checkout
 *   Pix     → POST /api/store/checkout/asaas → redirect /checkout/pix-pendente/[orderId]
 *   Boleto  → POST /api/store/checkout/asaas → redirect /checkout/boleto/[orderId]
 */
import { useState } from 'react'
import { TERMS_VERSION } from '@/lib/legal/consent'
import { validateEmail } from '@/lib/email-validate'

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
  {
    id: 'card',
    label: 'Cartão de crédito',
    desc: 'Visa, Master, Elo, Amex · Apple Pay',
    icon: '💳',
  },
  { id: 'pix', label: 'Pix', desc: 'Aprovação imediata · taxa R$ 1,99', icon: '📱' },
  { id: 'boleto', label: 'Boleto bancário', desc: 'Vence em 3 dias úteis', icon: '📄' },
]

function onlyDigits(s: string) {
  return s.replace(/\D/g, '')
}

function formatCpf(s: string) {
  const d = onlyDigits(s).slice(0, 11)
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function isValidEmail(s: string) {
  return validateEmail(s).valid
}

export function PaymentMethodSelector({ stripePriceId, productSlug, locale, priceCents }: Props) {
  const [selected, setSelected] = useState<Method>('card')
  const [email, setEmail] = useState('')
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [accepted, setAccepted] = useState(false)

  function onEmailBlur() {
    if (!email) return
    const r = validateEmail(email)
    setEmailError(r.valid ? null : (r.error ?? null))
    setEmailSuggestion(r.suggestion ?? null)
  }

  function acceptSuggestion() {
    if (emailSuggestion) {
      setEmail(emailSuggestion)
      setEmailSuggestion(null)
      setEmailError(null)
    }
  }

  const needsDetails = selected === 'pix' || selected === 'boleto'
  const consent = { accepted: true, termsVersion: TERMS_VERSION }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #ddd6c8',
    borderRadius: 4,
    fontSize: 15,
    fontFamily: 'Georgia, serif',
    background: '#fff',
    color: '#14140e',
    marginBottom: 10,
    boxSizing: 'border-box',
  }

  async function handlePay() {
    setError(null)

    if (!accepted) {
      return setError('Para continuar, marque que leu e aceita o Termo de Compra e Venda.')
    }

    if (needsDetails) {
      if (!name.trim()) return setError('Informe seu nome completo.')
      if (!isValidEmail(email)) return setError('Informe um e-mail válido para receber o livro.')
      if (onlyDigits(cpf).length !== 11) return setError('Informe um CPF válido (11 dígitos).')
    }

    setLoading(true)
    try {
      if (selected === 'card') {
        const res = await fetch('/api/store/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ stripePriceId, quantity: 1 }], locale, consent }),
        })
        const data = await res.json()
        if (!res.ok || !data.url) throw new Error(data.error ?? 'Erro ao abrir checkout.')
        window.location.href = data.url
        return
      }

      const res = await fetch('/api/store/checkout/asaas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripePriceId,
          productSlug,
          method: selected,
          locale,
          email: email.trim(),
          name: name.trim(),
          cpf: onlyDigits(cpf),
          consent,
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
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
              <span style={{ display: 'block', fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                {m.desc}
              </span>
            </span>
            {selected === m.id && <span style={{ marginLeft: 'auto', fontSize: 16 }}>✓</span>}
          </button>
        ))}
      </div>

      {needsDetails && (
        <div style={{ marginBottom: 16 }}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            style={{
              ...inputStyle,
              marginBottom: emailError || emailSuggestion ? 4 : 10,
              borderColor: emailError
                ? '#c92a2a'
                : inputStyle.border?.toString().includes('ddd6c8')
                  ? '#ddd6c8'
                  : '#ddd6c8',
            }}
            type="email"
            placeholder="Seu e-mail (para receber o livro)"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError(null)
              setEmailSuggestion(null)
            }}
            onBlur={onEmailBlur}
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
          />
          {emailError && (
            <div
              style={{
                fontSize: 13,
                color: '#c92a2a',
                marginBottom: 10,
                fontFamily: 'Georgia, serif',
              }}
            >
              {emailError}
            </div>
          )}
          {emailSuggestion && (
            <div
              style={{
                fontSize: 13,
                color: '#14140e',
                marginBottom: 10,
                fontFamily: 'Georgia, serif',
              }}
            >
              Você quis dizer{' '}
              <button
                type="button"
                onClick={acceptSuggestion}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#c92a2a',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {emailSuggestion}
              </button>
              ?
            </div>
          )}
          <input
            style={{ ...inputStyle, marginBottom: 0 }}
            type="text"
            inputMode="numeric"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
          />
        </div>
      )}

      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          margin: '0 0 16px',
          fontFamily: 'Georgia, serif',
          fontSize: 13,
          lineHeight: 1.5,
          color: '#aaa',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }}
          aria-label="Aceite do Termo de Compra e Venda"
        />
        <span>
          Li e aceito o{' '}
          <a
            href={`/${locale}/politicas/termos-de-uso`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#cccccc', textDecoration: 'underline' }}
          >
            Termo de Compra e Venda
          </a>{' '}
          e a{' '}
          <a
            href={`/${locale}/politicas/cancelamento-e-reembolso`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#cccccc', textDecoration: 'underline' }}
          >
            Política de Cancelamento e Reembolso
          </a>
          . Compreendo que é um produto digital de entrega imediata.
        </span>
      </label>

      <button
        onClick={handlePay}
        disabled={loading || !accepted}
        style={{
          width: '100%',
          background: loading || !accepted ? '#888' : '#c92a2a',
          color: '#fff',
          fontFamily: '"Rock Grotesque", system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '18px 24px',
          border: 'none',
          borderRadius: 4,
          cursor: loading || !accepted ? 'not-allowed' : 'pointer',
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
