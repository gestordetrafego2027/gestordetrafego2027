'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem } from '@/lib/schemas/cart'

export type AddItemResult =
  | { added: true }
  | { added: false; reason: 'already-in-cart' }

// ── Tipos ────────────────────────────────────────────────────
interface CartState {
  items: CartItem[]
  couponCode: string | undefined
  couponDiscount: number          // centavos
  drawerOpen: boolean

  // Actions
  addItem: (item: CartItem) => AddItemResult
  removeItem: (priceId: string) => void
  updateQuantity: (priceId: string, quantity: number) => void
  clearCart: () => void
  setCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void

  // Computed (helpers)
  subtotal: () => number
  total: () => number
  itemCount: () => number
}

// ── Store ────────────────────────────────────────────────────
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: undefined,
      couponDiscount: 0,
      drawerOpen: false,

      addItem: (item) => {
        const state = get()
        const existing = state.items.find((i) => i.id === item.id)

        // Digital/serviço: quantidade fixa em 1. Se já existe, no-op (sem incrementar).
        // Físico/bundle: incrementa quantidade até o limite de 99.
        const isFixedQty = item.productType === 'digital' || item.productType === 'service'

        if (existing && isFixedQty) {
          // Indica ao caller (UI/toast) que foi no-op.
          set({ drawerOpen: true })
          return { added: false as const, reason: 'already-in-cart' as const }
        }

        if (existing) {
          set({
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: Math.min(i.quantity + item.quantity, 99) }
                : i,
            ),
            drawerOpen: true,
          })
        } else {
          set({
            items: [...state.items, isFixedQty ? { ...item, quantity: 1 } : item],
            drawerOpen: true,
          })
        }
        broadcastCartUpdate()
        return { added: true as const }
      },

      removeItem: (priceId) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== priceId) }))
        broadcastCartUpdate()
      },

      updateQuantity: (priceId, quantity) => {
        if (quantity < 1) {
          get().removeItem(priceId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === priceId ? { ...i, quantity: Math.min(quantity, 99) } : i,
          ),
        }))
        broadcastCartUpdate()
      },

      clearCart: () => {
        set({ items: [], couponCode: undefined, couponDiscount: 0 })
        broadcastCartUpdate()
      },

      setCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: undefined, couponDiscount: 0 }),

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),

      subtotal: () => get().items.reduce((acc, i) => acc + i.unitAmount * i.quantity, 0),
      total: () => Math.max(0, get().subtotal() - get().couponDiscount),
      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    {
      name: 'hmzt-cart',
      storage: createJSONStorage(() => localStorage),
      // Não persiste estado da UI (drawerOpen)
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    },
  ),
)

// ── BroadcastChannel: sync entre abas ────────────────────────
let channel: BroadcastChannel | null = null

function getChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined') return null
  if (!channel) {
    try {
      channel = new BroadcastChannel('hmzt-cart-sync')
      channel.onmessage = () => {
        // Força re-hydrate lendo do localStorage
        useCartStore.persist.rehydrate()
      }
    } catch {
      // BroadcastChannel não disponível (Safari antigo)
      return null
    }
  }
  return channel
}

function broadcastCartUpdate() {
  getChannel()?.postMessage({ type: 'cart-updated', ts: Date.now() })
}

// Inicializa o channel assim que o módulo é carregado no browser
if (typeof window !== 'undefined') {
  getChannel()
}
