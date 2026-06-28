'use client'
import { useCartStore } from '@/lib/cart/store'
import { CartLine } from '@/components/ecommerce/cart/Line'
import { CartSummary } from '@/components/ecommerce/cart/Summary'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'

export function CarrinhoClient() {
  const { items, clearCart, itemCount } = useCartStore()
  const count = itemCount()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // SSR-safe skeleton até hidratar — o estado do carrinho mora no localStorage,
  // então no primeiro render do server nunca temos itens.
  if (!mounted) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="h-8 w-40 rounded bg-neutral-100 animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-2">
              <div className="h-24 rounded-2xl bg-neutral-100 animate-pulse" />
              <div className="h-24 rounded-2xl bg-neutral-100 animate-pulse" />
            </div>
            <div className="lg:col-span-1">
              <div className="h-48 rounded-2xl bg-neutral-100 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
            Carrinho
            {count > 0 && (
              <span className="ml-3 text-base font-normal text-neutral-400">
                ({count} {count === 1 ? 'item' : 'itens'})
              </span>
            )}
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
            >
              Limpar carrinho
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <div className="text-6xl text-neutral-200">◻</div>
            <div>
              <p className="font-semibold text-neutral-700 text-lg">Seu carrinho está vazio</p>
              <p className="text-sm text-neutral-400 mt-1">Adicione produtos para continuar</p>
            </div>
            <Link
              href="/loja"
              className="mt-2 px-8 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-colors font-medium"
            >
              Ver loja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itens */}
            <div className="lg:col-span-2">
              <div className="border border-neutral-100 rounded-2xl divide-y divide-neutral-100 overflow-hidden">
                {items.map((item) => (
                  <div key={item.id} className="px-5">
                    <CartLine item={item} />
                  </div>
                ))}
              </div>
              <Link
                href="/loja"
                className="inline-flex items-center gap-2 mt-4 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                ← Continuar comprando
              </Link>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="border border-neutral-100 rounded-2xl p-5 bg-neutral-50 sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
