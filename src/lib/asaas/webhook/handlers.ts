/**
 * Handlers do webhook Asaas — separados em módulo próprio para testabilidade.
 * Cada handler é puro: recebe (supabase, payload) e atualiza store_orders.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'
import { sendEmail } from '@/lib/email/resend'
import { digitalDeliveryHTML } from '@/lib/email/templates/digital-delivery'
import { resolveDigitalProduct, createDownloadUrl } from '@/lib/digital-products'

const log = logger.child({ module: 'asaas/webhook' })

interface AsaasPaymentLike {
  id?: string
  status?: string
  externalReference?: string | null
}

interface HandlerCtx {
  supabase: SupabaseClient
  payment: AsaasPaymentLike
}

async function findOrder(ctx: HandlerCtx) {
  const { supabase, payment } = ctx
  if (!payment.id) return null
  const { data } = await supabase
    .from('store_orders')
    .select('id, status, buyer_email, buyer_name, total_cents, order_number, metadata')
    .eq('metadata->>asaas_payment_id', payment.id)
    .maybeSingle()
  return data
}

export async function handlePaymentCreated(ctx: HandlerCtx): Promise<void> {
  log.info({ payment_id: ctx.payment.id }, 'PAYMENT_CREATED')
}

export async function handlePaymentConfirmed(ctx: HandlerCtx): Promise<void> {
  const order = await findOrder(ctx)
  if (!order) {
    log.warn({ payment_id: ctx.payment.id }, 'pedido não encontrado para confirmação')
    return
  }
  if (order.status === 'paid') {
    log.info({ order_id: order.id }, 'já paid — idempotente')
    return
  }
  await ctx.supabase
    .from('store_orders')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', order.id)

  // Entrega digital (best-effort): resolve o produto a partir do slug guardado
  // no metadata do pedido e envia o email com o link de download do PDF.
  // Sem slug resolvível, cai no email de confirmação simples.
  if (order.buyer_email) {
    const slug = (order.metadata as Record<string, unknown> | null)?.product_slug as
      | string
      | undefined
    const product = resolveDigitalProduct(slug)
    try {
      if (product) {
        const html = digitalDeliveryHTML({
          customerName: order.buyer_name ?? undefined,
          productName: product.name,
          downloadUrl: await createDownloadUrl(product, ctx.supabase),
          orderId: order.id,
          expiresIn: product.expiresIn ?? '7 dias',
          volumeLabel: product.volumeLabel,
          detail: product.detail,
        })
        const r = await sendEmail({
          to: order.buyer_email,
          subject: `Seu exemplar está pronto · ${product.name}`,
          html,
          replyTo: 'academy@housemazzutti.com',
        })
        if (!r.ok) {
          log.error({ err: r.error, order_id: order.id }, 'falha ao enviar email de entrega')
        } else {
          log.info({ order_id: order.id, slug }, 'email de entrega enviado')
        }
      } else {
        log.warn({ order_id: order.id, slug }, 'produto digital não resolvido — enviando confirmação simples')
        await sendEmail({
          to: order.buyer_email,
          subject: `Pagamento confirmado — pedido ${order.order_number}`,
          html: `<p>Recebemos seu pagamento do pedido <strong>${order.order_number}</strong>. Obrigado!</p>`,
        })
      }
    } catch (err) {
      log.error({ err: String(err) }, 'falha ao enviar email pós-confirmação')
    }
  }
}

export async function handlePaymentOverdue(ctx: HandlerCtx): Promise<void> {
  const order = await findOrder(ctx)
  if (!order) return
  await ctx.supabase
    .from('store_orders')
    .update({ status: 'failed', failed_at: new Date().toISOString() })
    .eq('id', order.id)
  // Lembrete por email (best-effort)
  if (order.buyer_email) {
    try {
      await sendEmail({
        to: order.buyer_email,
        subject: `Pagamento pendente — pedido ${order.order_number}`,
        html: `<p>Seu boleto/Pix do pedido <strong>${order.order_number}</strong> venceu. Gere uma nova cobrança se ainda deseja concluir.</p>`,
      })
    } catch (err) {
      log.error({ err: String(err) }, 'falha email overdue')
    }
  }
}

export async function handlePaymentRefunded(ctx: HandlerCtx): Promise<void> {
  const order = await findOrder(ctx)
  if (!order) return
  await ctx.supabase
    .from('store_orders')
    .update({ status: 'refunded', refunded_at: new Date().toISOString() })
    .eq('id', order.id)
}

export async function handlePaymentDeleted(ctx: HandlerCtx): Promise<void> {
  const order = await findOrder(ctx)
  if (!order) return
  await ctx.supabase
    .from('store_orders')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', order.id)
}

/** Dispatcher por event type. Retorna true se o evento foi tratado. */
export async function dispatchAsaasEvent(
  eventType: string,
  ctx: HandlerCtx,
): Promise<boolean> {
  switch (eventType) {
    case 'PAYMENT_CREATED':
      await handlePaymentCreated(ctx)
      return true
    case 'PAYMENT_CONFIRMED':
    case 'PAYMENT_RECEIVED':
      await handlePaymentConfirmed(ctx)
      return true
    case 'PAYMENT_OVERDUE':
      await handlePaymentOverdue(ctx)
      return true
    case 'PAYMENT_REFUNDED':
      await handlePaymentRefunded(ctx)
      return true
    case 'PAYMENT_DELETED':
      await handlePaymentDeleted(ctx)
      return true
    default:
      log.info({ eventType }, 'evento Asaas ignorado')
      return false
  }
}
