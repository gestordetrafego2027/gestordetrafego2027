import type Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

/**
 * Marca pedido como failed quando o pagamento falha.
 * Procura o pedido por payment_intent_id; se não achar, só registra o evento.
 */
export async function handlePaymentFailed(pi: Stripe.PaymentIntent): Promise<void> {
  const log = logger.child({ pi_id: pi.id, handler: 'payment-failed' })
  const supabase = createServiceClient()

  const reason = pi.last_payment_error?.message ?? pi.last_payment_error?.code ?? 'unknown'

  const { data: order, error: findErr } = await supabase
    .from('store_orders')
    .select('id, status')
    .eq('stripe_payment_intent_id', pi.id)
    .maybeSingle()

  if (findErr) {
    log.error({ err: findErr }, 'falha ao buscar pedido')
    return
  }

  if (!order) {
    log.warn(
      'nenhum pedido encontrado para este PI — possivelmente é tentativa anterior a criação do pedido',
    )
    return
  }

  if (order.status === 'paid' || order.status === 'refunded') {
    log.info({ order_id: order.id, status: order.status }, 'pedido já finalizado — ignora falha')
    return
  }

  const { error: updateErr } = await supabase
    .from('store_orders')
    .update({
      status: 'failed',
      failed_at: new Date().toISOString(),
      notes: `Stripe payment_failed: ${reason}`,
    })
    .eq('id', order.id)

  if (updateErr) {
    log.error({ err: updateErr }, 'falha ao marcar pedido como failed')
    return
  }

  log.info({ order_id: order.id, reason }, 'pedido marcado como failed')
}
