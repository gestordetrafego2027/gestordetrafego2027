'use client'
import { useCartStore } from '@/lib/cart/store'
import type { CartItem } from '@/lib/schemas/cart'
import { useState } from 'react'
import { Link } from '@/i18n/navigation'

interface Props {
  item: Omit<CartItem, 'quantity'>
  isQuoteOnly?: boolean
}

export function AddToCartButton({ item, isQuoteOnly = false }: Props) {
  const { addItem } = useCartStore()
  const [added, setAdded] = useState(false)

  if (isQuoteOnly) {
    return (
      <Link
        href="/contato"
        className="block w-full bg-neutral-900 text-white font-semibold py-3.5 rounded-xl text-center hover:bg-neutral-700 transition-colors"
      >
        Solicitar orçamento
      </Link>
    )
  }

  function handleAdd() {
    addItem({ ...item, quantity: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full font-semibold py-3.5 rounded-xl transition-all duration-200 ${
        added
          ? 'bg-green-600 text-white'
          : 'bg-neutral-900 text-white hover:bg-neutral-700'
      }`}
    >
      {added ? '✓ Adicionado ao carrinho' : 'Adicionar ao carrinho'}
    </button>
  )
}
