import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/lib/cart/store'
import type { CartItem } from '@/lib/schemas/cart'

function makeDigital(over: Partial<CartItem> = {}): CartItem {
  return {
    id: '11111111-1111-1111-1111-111111111111',
    stripePriceId: 'price_dig_1',
    stripeProductId: 'prod_dig_1',
    slug: 'ebook',
    name: 'Ebook Marketing',
    description: null,
    image: null,
    unitAmount: 4990,
    currency: 'brl',
    quantity: 1,
    productType: 'digital',
    quoteOnly: false,
    ...over,
  }
}

function makePhysical(over: Partial<CartItem> = {}): CartItem {
  return {
    id: '22222222-2222-2222-2222-222222222222',
    stripePriceId: 'price_phy_1',
    stripeProductId: 'prod_phy_1',
    slug: 'camiseta',
    name: 'Camiseta',
    description: null,
    image: null,
    unitAmount: 9900,
    currency: 'brl',
    quantity: 1,
    productType: 'physical',
    quoteOnly: false,
    ...over,
  }
}

beforeEach(() => {
  // Reset entre testes — zustand persiste no localStorage do jsdom.
  useCartStore.setState({
    items: [],
    couponCode: undefined,
    couponDiscount: 0,
    drawerOpen: false,
  })
})

describe('useCartStore', () => {
  it('addItem adiciona um item novo', () => {
    useCartStore.getState().addItem(makeDigital())
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().itemCount()).toBe(1)
  })

  it('addItem de item duplicado incrementa quantidade', () => {
    const s = useCartStore.getState()
    s.addItem(makeDigital())
    s.addItem(makeDigital())
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(2)
  })

  it('addItem de físico duplicado incrementa quantidade até 99', () => {
    const s = useCartStore.getState()
    s.addItem(makePhysical({ quantity: 1 }))
    s.addItem(makePhysical({ quantity: 5 }))
    expect(useCartStore.getState().items[0].quantity).toBe(6)

    s.addItem(makePhysical({ quantity: 200 }))
    expect(useCartStore.getState().items[0].quantity).toBe(99)
  })

  it('removeItem remove pelo id', () => {
    const s = useCartStore.getState()
    s.addItem(makeDigital())
    s.removeItem(makeDigital().id)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('updateQuantity ajusta quantidade; quantity<1 remove', () => {
    const s = useCartStore.getState()
    s.addItem(makePhysical())
    s.updateQuantity(makePhysical().id, 4)
    expect(useCartStore.getState().items[0].quantity).toBe(4)
    s.updateQuantity(makePhysical().id, 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('updateQuantity respeita teto de 99', () => {
    const s = useCartStore.getState()
    s.addItem(makePhysical())
    s.updateQuantity(makePhysical().id, 500)
    expect(useCartStore.getState().items[0].quantity).toBe(99)
  })

  it('clearCart limpa itens e cupom', () => {
    const s = useCartStore.getState()
    s.addItem(makeDigital())
    s.setCoupon('OFF10', 500)
    s.clearCart()
    const after = useCartStore.getState()
    expect(after.items).toHaveLength(0)
    expect(after.couponCode).toBeUndefined()
    expect(after.couponDiscount).toBe(0)
  })

  it('subtotal soma unitAmount * quantity de cada item', () => {
    const s = useCartStore.getState()
    s.addItem(makeDigital()) // 4990
    s.addItem(makePhysical({ quantity: 2 })) // 9900*2 = 19800
    expect(useCartStore.getState().subtotal()).toBe(4990 + 19800)
  })

  it('total = max(0, subtotal - cupom)', () => {
    const s = useCartStore.getState()
    s.addItem(makeDigital()) // 4990
    s.setCoupon('OFF', 500)
    expect(useCartStore.getState().total()).toBe(4490)

    s.setCoupon('SUPER', 999999)
    expect(useCartStore.getState().total()).toBe(0)
  })

  it('setCoupon / removeCoupon', () => {
    const s = useCartStore.getState()
    s.setCoupon('PROMO', 1000)
    expect(useCartStore.getState().couponCode).toBe('PROMO')
    expect(useCartStore.getState().couponDiscount).toBe(1000)
    s.removeCoupon()
    expect(useCartStore.getState().couponCode).toBeUndefined()
    expect(useCartStore.getState().couponDiscount).toBe(0)
  })

  it('itemCount soma quantidades de todos os itens', () => {
    const s = useCartStore.getState()
    s.addItem(makeDigital())
    s.addItem(makePhysical({ quantity: 3 }))
    expect(useCartStore.getState().itemCount()).toBe(4)
  })
})
