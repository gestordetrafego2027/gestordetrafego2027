'use client'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart/store'
import type { CartItem } from '@/lib/schemas/cart'
import { formatBRL } from '@/lib/format/price'

// Tipos com quantidade fixa (sem controles +/-): produtos digitais e serviços.
// O catálogo da House Mazzutti hoje é majoritariamente digital — controles de
// quantidade só fazem sentido para itens físicos/bundles.
const FIXED_QUANTITY_TYPES = new Set<CartItem['productType']>(['digital', 'service'])

export function CartLine({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore()
  const hasQuantityControls = !FIXED_QUANTITY_TYPES.has(item.productType)

  return (
    <div className="flex gap-3 py-4 border-b border-neutral-100 last:border-0">
      {/* Imagem */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xl">
            {item.productType === 'service' ? '✦' : '◈'}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 leading-tight truncate">{item.name}</p>
        <p className="text-xs text-neutral-400 mt-0.5 capitalize">{item.productType === 'digital' ? 'Digital' : item.productType === 'service' ? 'Serviço' : 'Físico'}</p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantidade — controles +/- apenas para físico/bundle */}
          {hasQuantityControls ? (
            <div className="flex items-center gap-1 border border-neutral-200 rounded-lg overflow-hidden">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors text-sm"
                aria-label="Diminuir"
              >−</button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors text-sm"
                aria-label="Aumentar"
              >+</button>
            </div>
          ) : (
            <span className="text-xs text-neutral-400">
              {item.productType === 'service' ? '1 serviço' : '1 unidade'}
            </span>
          )}

          {/* Preço + remover */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-neutral-900">
              {formatBRL(item.unitAmount * item.quantity, item.currency)}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-neutral-300 hover:text-red-400 transition-colors"
              aria-label="Remover item"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
