import type Stripe from 'stripe'
import { getStripe } from '../server'
import { logger } from '@/lib/logger'

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
    case 'checkout.session.completed':
      // Sprint 3: import handleCheckoutCompleted
      log.info('checkout.session.completed — handler pendente Sprint 3')
      break
    case 'payment_intent.payment_failed':
      log.info('payment_intent.payment_failed — handler pendente Sprint 3')
      break
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      log.info('subscription event — handler pendente Sprint 5')
      break
    default:
      log.info('evento ignorado')
  }
}
