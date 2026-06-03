import type { PaymentProvider } from '../types'

export const stripeProvider: PaymentProvider = {
  name: 'stripe',
  supports: ['card', 'subscription'],
}
