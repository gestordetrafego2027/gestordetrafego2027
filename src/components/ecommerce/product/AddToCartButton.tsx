'use client'
import { useCartStore } from '@/lib/cart/store'
import type { CartItem } from '@/lib/schemas/cart'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'

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
    const result = addItem({ ...item, quantity: 1 })
    if (!result.added) {
      // Já estava no carrinho (digital/serviço — quantidade fixa).
      toast.info('Este item já está no seu carrinho.')
      return
    }
    toast.success(`${item.name} adicionado ao carrinho`)
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
