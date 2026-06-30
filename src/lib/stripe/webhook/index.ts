import type Stripe from 'stripe'
import { getStripe } from '../server'
import { logger } from '@/lib/logger'
import { handleCheckoutCompleted } from './handlers/checkout-completed'
import { handlePaymentFailed } from './handlers/payment-failed'
import { handleChargeRefunded } from './handlers/charge-refunded'

/**
 * Verifica a assinatura do webhook Stripe e retorna o evento tipado.
 * Deve receber o raw body (Buffer) — não JSON.parse.
 */
export async function constructWebhookEvent(
  rawBody: Buffer,
  signature: string,
): Promise<Stripe.Event> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET não configurado.')
  return getStripe().webhooks.constructEventAsync(rawBody, signature, secret)
}

/**
 * Dispatcher de handlers por tipo de evento.
 * Adicionar novos handlers em ./handlers/*.
 */
export async function dispatchWebhookEvent(event: Stripe.Event): Promise<void> {
  const log = logger.child({ event_id: event.id, event_type: event.type })
  log.info('webhook recebido')

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutCompleted(session)
      break
    }
    case 'payment_intent.payment_failed': {
      await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
      break
    }
    case 'charge.refunded': {
      await handleChargeRefunded(event.data.object as Stripe.Charge)
      break
    }
    case 'charge.dispute.created':
    case 'charge.dispute.closed': {
      const dispute = event.data.object as Stripe.Dispute
      log.warn(
        { dispute_id: dispute.id, status: dispute.status, reason: dispute.reason },
        'dispute event — review manual',
      )
      break
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      log.info('subscription event — handler Sprint 5')
      break
    default:
      log.info('evento ignorado')
  }
}
