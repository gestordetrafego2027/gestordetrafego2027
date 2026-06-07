import type Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

/**
 * Marca pedido como refunded quando uma charge é estornada (total ou parcial).
 * Busca o pedido pelo payment_intent associado à charge.
 */
export async function handleChargeRefunded(
  charge: Stripe.Charge,
): Promise<void> {
  const log = logger.child({ charge_id: charge.id, handler: 'charge-refunded' })
  const supabase = createServiceClient()

  const piId =
    typeof charge.payment_intent === 'string'
      ? charge.payment_intent
      : charge.payment_intent?.id

  if (!piId) {
    log.warn('charge sem payment_intent — não consigo localizar pedido')
    return
  }

  const { data: order, error: findErr } = await supabase
    .from('store_orders')
    .select('id, status, total_cents')
    .eq('stripe_payment_intent_id', piId)
    .maybeSingle()

  if (findErr) {
    log.error({ err: findErr }, 'falha ao buscar pedido')
    return
  }

  if (!order) {
    log.warn({ pi_id: piId }, 'nenhum pedido encontrado para este PI')
    return
  }

  const refundedCents = charge.amount_refunded ?? 0
  const isPartial = refundedCents > 0 && refundedCents < (charge.amount ?? 0)
  const newStatus = isPartial ? 'refunded_partial' : 'refunded'

  const { error: updateErr } = await supabase
    .from('store_orders')
    .update({
      status: newStatus,
      refunded_at: new Date().toISOString(),
      notes: `Stripe refund ${isPartial ? 'parcial' : 'total'}: ${refundedCents / 100} BRL`,
    })
    .eq('id', order.id)

  if (updateErr) {
    log.error({ err: updateErr }, 'falha ao marcar pedido como refunded')
    return
  }

  log.info(
    { order_id: order.id, refunded_cents: refundedCents, partial: isPartial },
    'pedido marcado como refunded',
  )
}
