import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY não configurado.')
    _stripe = new Stripe(key, {
      apiVersion: '2025-04-30.basil',
      appInfo: { name: 'House Mazzutti', version: '1.0.0' },
    })
  }
  return _stripe
}
