'use client'
import { loadStripe, type Stripe } from '@stripe/stripe-js'

let _promise: Promise<Stripe | null> | null = null

export function getStripeClient(): Promise<Stripe | null> {
  if (!_promise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não configurado.')
      return Promise.resolve(null)
    }
    _promise = loadStripe(key)
  }
  return _promise
}
