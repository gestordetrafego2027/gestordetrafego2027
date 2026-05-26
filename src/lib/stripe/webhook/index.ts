import type Stripe from 'stripe'
import { getStripe } from '../server'
import { logger } from '@/lib/logger'
import { handleCheckoutCompleted } from './handlers/checkout-completed'
import { sendEmail } from '@/lib/email/resend'
import { paymentFailedEmail } from '@/lib/email/templates/payment-failed'

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
      const pi = event.data.object as Stripe.PaymentIntent
      log.warn({ pi: pi.id }, 'pagamento falhou')
      const email = pi.receipt_email ?? (pi.metadata as any)?.buyer_email
      const name = (pi.metadata as any)?.buyer_name ?? 'Cliente'
      if (email) {
        const { subject, html } = paymentFailedEmail({ buyerName: name, buyerEmail: email })
        await sendEmail({ to: email, subject, html, tags: [{ name: 'type', value: 'payment_failed' }] })
      }
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
