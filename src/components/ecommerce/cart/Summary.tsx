'use client'
import { useState } from 'react'
import { useCartStore } from '@/lib/cart/store'
import { useRouter } from 'next/navigation'
import { validateEmail } from '@/lib/email-validate'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

type PaymentMethodChoice = 'card' | 'pix' | 'boleto'

const ASAAS_PUBLIC_FLAG = process.env.NEXT_PUBLIC_FEATURE_ASAAS_ENABLED === 'true'

export function CartSummary({ onClose }: { onClose?: () => void }) {
  const { subtotal, total, couponCode, couponDiscount, setCoupon, removeCoupon, items, clearCart } =
    useCartStore()
  const [couponInput, setCouponInput] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [method, setMethod] = useState<PaymentMethodChoice>('card')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [buyerEmailError, setBuyerEmailError] = useState<string | null>(null)
  const [buyerEmailSuggestion, setBuyerEmailSuggestion] = useState<string | null>(null)
  const [buyerName, setBuyerName] = useState('')
  const [buyerCpf, setBuyerCpf] = useState('')
  const router = useRouter()

  const hasItems = items.length > 0
  const asaasEnabled = ASAAS_PUBLIC_FLAG

  async function handleAsaasCheckout(chosen: 'pix' | 'boleto') {
    if (!buyerEmail) {
      setCheckoutError('Informe seu email para gerar a cobrança.')
      return
    }
    const orderRes = await fetch('/api/store/create-pending-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((i) => ({ stripePriceId: i.stripePriceId, quantity: i.quantity })),
        buyerEmail,
        buyerName: buyerName || undefined,
        buyerCpf: buyerCpf || undefined,
        couponCode: couponCode ?? undefined,
      }),
    })
    const orderData = await orderRes.json()
    if (!orderRes.ok || !orderData.orderId) {
      setCheckoutError(orderData.error ?? 'Erro ao criar pedido.')
      return
    }
    const orderId = orderData.orderId as string

    const chargeRes = await fetch(
      chosen === 'pix' ? '/api/payments/asaas/create-pix' : '/api/payments/asaas/create-boleto',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      },
    )
    const chargeData = await chargeRes.json()
    if (!chargeRes.ok) {
      setCheckoutError(chargeData.error ?? 'Erro ao gerar cobrança.')
      return
    }
    onClose?.()
    clearCart()
    router.push(
      chosen === 'pix' ? `/pt/checkout/pix-pendente/${orderId}` : `/pt/checkout/boleto/${orderId}`,
    )
  }

  async function handleCheckout() {
    if (!hasItems) return
    setCheckoutLoading(true)
    setCheckoutError('')
    try {
      if (method === 'pix' || method === 'boleto') {
        await handleAsaasCheckout(method)
        return
      }
      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ stripePriceId: i.stripePriceId, quantity: i.quantity })),
          couponCode: couponCode ?? undefined,
          locale: 'pt',
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? 'Erro ao iniciar checkout.')
        return
      }
      onClose?.()
      clearCart()
      router.push(data.url)
    } catch {
      setCheckoutError('Erro de conexão. Tente novamente.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return
    setCouponLoading(true)
    setCouponError('')
    try {
      const res = await fetch(
        `/api/store/validate-coupon?code=${encodeURIComponent(couponInput.trim())}`,
      )
      const data = await res.json()
      if (!data.valid) {
        setCouponError(data.error ?? 'Cupom inválido ou expirado.')
        return
      }
      const discount = data.amountOff ?? Math.round((subtotal() * (data.percentOff ?? 0)) / 100)
      setCoupon(couponInput.trim(), discount)
      setCouponInput('')
    } catch {
      setCouponError('Não foi possível validar o cupom. Tente novamente.')
    } finally {
      setCouponLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Cupom */}
      {!couponCode ? (
        <div>
          <p className="text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
            Cupom de desconto
          </p>
          <div className="flex gap-2">
            <label htmlFor="cart-coupon" className="sr-only">
              Código de cupom
            </label>
            <input
              id="cart-coupon"
              type="text"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value.toUpperCase())
                setCouponError('')
              }}
              placeholder="CÓDIGO"
              className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-900 font-mono tracking-widest uppercase"
              onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
            />
            <button
              onClick={handleApplyCoupon}
              disabled={couponLoading || !couponInput.trim()}
              className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg disabled:opacity-40 hover:bg-neutral-700 transition-colors"
            >
              {couponLoading ? '...' : 'Aplicar'}
            </button>
          </div>
          {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <div>
            <p className="text-xs font-medium text-green-800 font-mono">{couponCode}</p>
            <p className="text-xs text-green-600">−{formatPrice(couponDiscount)}</p>
          </div>
          <button
            onClick={removeCoupon}
            className="text-green-600 hover:text-green-800 text-xs underline"
          >
            Remover
          </button>
        </div>
      )}

      {/* Totais */}
      <div className="border-t border-neutral-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-neutral-500">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal())}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Desconto</span>
            <span>−{formatPrice(couponDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-neutral-900 text-base pt-1 border-t border-neutral-100">
          <span>Total</span>
          <span>{formatPrice(total())}</span>
        </div>
      </div>

      {/* Método de pagamento */}
      {asaasEnabled && hasItems && (
        <div className="border-t border-neutral-100 pt-4 space-y-3">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Forma de pagamento
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['card', 'pix', 'boleto'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  method === m
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
                aria-pressed={method === m}
              >
                {m === 'card' ? 'Cartão' : m === 'pix' ? 'Pix' : 'Boleto'}
              </button>
            ))}
          </div>
          {(method === 'pix' || method === 'boleto') && (
            <div className="space-y-2">
              <label htmlFor="cart-buyer-email" className="sr-only">
                Email
              </label>
              <input
                id="cart-buyer-email"
                type="email"
                placeholder="Email *"
                value={buyerEmail}
                onChange={(e) => {
                  setBuyerEmail(e.target.value)
                  setBuyerEmailError(null)
                  setBuyerEmailSuggestion(null)
                }}
                onBlur={() => {
                  if (!buyerEmail) return
                  const r = validateEmail(buyerEmail)
                  setBuyerEmailError(r.valid ? null : (r.error ?? null))
                  setBuyerEmailSuggestion(r.suggestion ?? null)
                }}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none ${
                  buyerEmailError
                    ? 'border-red-600 focus:border-red-700'
                    : 'border-neutral-200 focus:border-neutral-900'
                }`}
                inputMode="email"
                spellCheck={false}
                required
              />
              {buyerEmailError && <p className="text-xs text-red-600">{buyerEmailError}</p>}
              {buyerEmailSuggestion && (
                <p className="text-xs text-neutral-700">
                  Você quis dizer{' '}
                  <button
                    type="button"
                    className="text-red-700 underline font-semibold"
                    onClick={() => {
                      setBuyerEmail(buyerEmailSuggestion)
                      setBuyerEmailSuggestion(null)
                      setBuyerEmailError(null)
                    }}
                  >
                    {buyerEmailSuggestion}
                  </button>
                  ?
                </p>
              )}
              <label htmlFor="cart-buyer-name" className="sr-only">
                Nome completo
              </label>
              <input
                id="cart-buyer-name"
                type="text"
                placeholder="Nome completo"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
              />
              <label htmlFor="cart-buyer-cpf" className="sr-only">
                CPF ou CNPJ
              </label>
              <input
                id="cart-buyer-cpf"
                type="text"
                placeholder="CPF/CNPJ (recomendado)"
                value={buyerCpf}
                onChange={(e) => setBuyerCpf(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
              />
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      {checkoutError && <p className="text-xs text-red-500 text-center -mb-1">{checkoutError}</p>}
      {hasItems ? (
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="block w-full bg-neutral-900 text-white text-center font-semibold py-3.5 rounded-xl hover:bg-neutral-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {checkoutLoading ? 'Redirecionando...' : 'Finalizar compra'}
        </button>
      ) : (
        <button
          disabled
          className="block w-full bg-neutral-200 text-neutral-400 text-center font-semibold py-3.5 rounded-xl cursor-not-allowed"
        >
          Carrinho vazio
        </button>
      )}

      <p className="text-xs text-neutral-400 text-center">
        Pagamento seguro via Stripe · Cartão, Pix e Boleto
      </p>
    </div>
  )
}
