import { z } from 'zod'

export const CartItemSchema = z.object({
  id: z.string().uuid(), // store_prices.id (UUID interno)
  stripePriceId: z.string(), // price_xxx do Stripe
  stripeProductId: z.string(), // prod_xxx do Stripe
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  unitAmount: z.number().int().positive(), // centavos
  currency: z.string().default('brl'),
  quantity: z.number().int().min(1).max(99),
  productType: z.enum(['physical', 'digital', 'service', 'bundle']).default('digital'),
  quoteOnly: z.boolean().default(false),
})

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  couponCode: z.string().optional(),
  couponDiscount: z.number().int().default(0), // centavos
})

export type CartItem = z.infer<typeof CartItemSchema>
export type Cart = z.infer<typeof CartSchema>
