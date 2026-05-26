'use client'
import { useState } from 'react'
import { useCartStore } from '@/lib/cart/store'
import Link from 'next/link'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export function CartSummary({ onClose }: { onClose?: () => void }) {
  const { subtotal, total, couponCode, couponDiscount, setCoupon, removeCoupon, items } = useCartStore()
  const [couponInput, setCouponInput] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState('')

  const hasItems = items.length > 0

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return
    setCouponLoading(true)
    setCouponError('')
    try {
      // Sprint 3: chamar /api/store/validate-coupon
      // Por ora: simula erro de cupom não encontrado
      await new Promise((r) => setTimeout(r, 500))
      setCouponError('Cupom inválido ou expirado. (Checkout disponível no Sprint 3)')
    } finally {
      setCouponLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Cupom */}
      {!couponCode ? (
        <div>
          <p className="text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Cupom de desconto</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError('') }}
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
          <button onClick={removeCoupon} className="text-green-600 hover:text-green-800 text-xs underline">
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

      {/* CTA */}
      {hasItems ? (
        <Link
          href="/checkout"
          onClick={onClose}
          className="block w-full bg-neutral-900 text-white text-center font-semibold py-3.5 rounded-xl hover:bg-neutral-700 transition-colors"
        >
          Finalizar compra
        </Link>
      ) : (
        <button disabled className="block w-full bg-neutral-200 text-neutral-400 text-center font-semibold py-3.5 rounded-xl cursor-not-allowed">
          Carrinho vazio
        </button>
      )}

      <p className="text-xs text-neutral-400 text-center">
        Pagamento seguro via Stripe · Cartão, Pix e Boleto
      </p>
    </div>
  )
}
