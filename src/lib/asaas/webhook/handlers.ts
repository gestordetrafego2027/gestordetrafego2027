/**
 * Handlers do webhook Asaas — separados em módulo próprio para testabilidade.
 * Cada handler é puro: recebe (supabase, payload) e atualiza store_orders.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'
import { sendEmail } from '@/lib/email/resend'
import { digitalDeliveryHTML } from '@/lib/email/templates/digital-delivery'
import { resolveDigitalProduct, createDownloadUrl } from '@/lib/digital-products'
import { issueNfse } from '@/lib/fiscal/nfeio'

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
    .update({ status: 'paid', paid_at: new Date().toISOString(), payment_gateway: 'asaas' })
    .eq('id', order.id)

  // Emite NFS-e (best-effort, não bloqueia entrega digital)
  try {
    const meta = (order.metadata ?? {}) as Record<string, unknown>
    const productName = (meta.product_name as string) ?? 'Pedido House Mazzutti'
    const buyerCpf = (meta.buyer_cpf as string) ?? undefined
    if (order.buyer_email) {
      await issueNfse({
        orderId: order.id,
        buyerEmail: order.buyer_email,
        buyerName: order.buyer_name ?? 'Consumidor Final',
        totalCents: order.total_cents,
        currency: 'BRL',
        description: productName,
        buyerCpfCnpj: buyerCpf,
      })
    }
  } catch (err) {
    log.error({ err: String(err), order_id: order.id }, 'falha ao emitir NFS-e')
  }

  // Reserva Tour Marca Pessoal — email de confirmação específico
  const meta = (order.metadata ?? {}) as Record<string, unknown>
  if (meta.product_type === 'tour' && order.buyer_email) {
    try {
      const planNames: Record<string, string> = {
        'ensaio-01': 'Ensaio 01 — R$ 1.900',
        'ensaio-02': 'Ensaio 02 — R$ 2.600',
        'ensaio-03': 'Ensaio 03 — R$ 3.200',
      }
      const planLabel = planNames[(meta.plan_id as string) ?? ''] ?? meta.product_name ?? 'Ensaio'
      await sendEmail({
        to: order.buyer_email,
        subject: `Reserva confirmada · Tour Marca Pessoal · ${planLabel}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#111">
            <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#999;margin-bottom:32px">House Mazzutti · Tour Canoinhas</p>
            <h1 style="font-weight:300;font-size:28px;line-height:1.1;margin-bottom:16px">Sua reserva está confirmada.</h1>
            <p style="color:#555;line-height:1.7;margin-bottom:24px">
              Olá, <strong>${order.buyer_name ?? ''}</strong>.<br>
              Recebemos seu pagamento e sua agenda no <strong>Tour Marca Pessoal · Canoinhas, SC</strong> está reservada.
            </p>
            <div style="border:1px solid #eee;padding:20px;margin-bottom:24px">
              <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#aaa;margin-bottom:8px">Sua reserva</p>
              <p style="font-size:18px;font-weight:300;margin:0">${planLabel}</p>
              <p style="color:#888;font-size:13px;margin-top:6px">20 · 21 · 22 de Julho · Canoinhas, SC</p>
            </div>
            <p style="color:#555;line-height:1.7;margin-bottom:32px">
              Entraremos em contato pelo WhatsApp para alinhar todos os detalhes da sua produção.<br>
              Qualquer dúvida, responda este e-mail ou fale diretamente com a House.
            </p>
            <p style="font-size:11px;color:#bbb">Pedido ${order.order_number} · contato@housemazzutti.com</p>
          </div>
        `,
        replyTo: 'contato@housemazzutti.com',
      })
      log.info({ order_id: order.id }, 'email de confirmação tour enviado')
    } catch (err) {
      log.error({ err: String(err), order_id: order.id }, 'falha ao enviar email tour')
    }
    return
  }

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
          await ctx.supabase.from('store_orders').update({
            delivery_sent_at: new Date().toISOString(),
            delivery_email_id: r.id ?? null,
          }).eq('id', order.id)
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
