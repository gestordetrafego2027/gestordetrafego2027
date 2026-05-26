'use client'
import { useCartStore } from '@/lib/cart/store'
import { CartDrawer } from './cart/Drawer'
import { useEffect, useState } from 'react'

/**
 * Botão do carrinho com badge de quantidade.
 * Renderiza o Drawer global. Adicionar no Header.
 */
export function CartButton({ color = 'black' }: { color?: 'black' | 'white' }) {
  const { openDrawer, itemCount } = useCartStore()
  const count = itemCount()

  // Evita hydration mismatch — carrinho só existe no client
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <button
        onClick={openDrawer}
        className="relative flex items-center justify-center w-9 h-9 hover:opacity-70 transition-opacity"
        aria-label={`Carrinho${count > 0 ? ` (${count} itens)` : ''}`}
      >
        {/* Ícone sacola */}
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ color }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
          />
        </svg>

        {/* Badge */}
        {mounted && count > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {/* Drawer global — montado uma vez na árvore */}
      <CartDrawer />
    </>
  )
}
