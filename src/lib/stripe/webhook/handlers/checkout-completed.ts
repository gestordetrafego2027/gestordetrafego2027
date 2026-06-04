import type Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'
import { sendEmail } from '@/lib/email/resend'
import { digitalDeliveryHTML } from '@/lib/email/templates/digital-delivery'
import { resolveDigitalProduct, createDownloadUrl } from '@/lib/digital-products'

/**
 * Processa checkout.session.completed com idempotência total.
 * Cria store_orders + store_order_items usando UPSERT idempotente.
 * Se o evento chegar duplicado, o ON CONFLICT garante no-op.
 */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const log = logger.child({ session_id: session.id, handler: 'checkout-completed' })

  // Idempotência: se o pedido já existe para esta session, sai sem erro
  const supabase = createServiceClient()

  const { data: existing } = await supabase
    .from('store_orders')
    .select('id, status')
    .eq('stripe_session_id', session.id)
    .maybeSingle()

  if (existing) {
    log.info({ order_id: existing.id, status: existing.status }, 'pedido já existe — idempotente, ignorando')
    return
  }

  // Monta itens a partir dos line_items expandidos
  const lineItems = (session as any).line_items?.data as Stripe.LineItem[] | undefined
  if (!lineItems?.length) {
    log.warn('session sem line_items expandidos — verifique expand na criação da session')
  }

  const subtotalCents = session.amount_subtotal ?? 0
  const totalCents = session.amount_total ?? 0
  const discountCents = Math.max(0, subtotalCents - totalCents + (session.total_details?.amount_tax ?? 0))
  const taxCents = session.total_details?.amount_tax ?? 0

  // Resolve coupon_id se houver discount
  let couponId: string | null = null
  const promoCode = (session as any).discounts?.[0]?.promotion_code as Stripe.PromotionCode | null
  if (promoCode) {
    const stripePromoId = typeof promoCode === 'string' ? promoCode : promoCode.id
    const { data: couponRow } = await supabase
      .from('store_coupons')
      .select('id')
      .eq('stripe_promo_code_id', stripePromoId)
      .maybeSingle()
    couponId = couponRow?.id ?? null
  }

  // Insere o pedido
  const { data: order, error: orderErr } = await supabase
    .from('store_orders')
    .insert({
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      stripe_customer_id:
        typeof session.customer === 'string'
          ? session.customer
          : session.customer?.id ?? null,
      status: 'paid',
      subtotal_cents: subtotalCents,
      discount_cents: discountCents,
      tax_cents: taxCents,
      total_cents: totalCents,
      currency: session.currency ?? 'brl',
      buyer_email: session.customer_details?.email ?? session.customer_email ?? '',
      buyer_name: session.customer_details?.name ?? null,
      buyer_phone: session.customer_details?.phone ?? null,
      coupon_id: couponId,
      coupon_code_snapshot: promoCode
        ? typeof promoCode === 'string'
          ? promoCode
          : (promoCode as any).code ?? null
        : null,
      metadata: { stripe_mode: session.mode, locale: session.locale },
    })
    .select('id')
    .single()

  if (orderErr || !order) {
    log.error({ err: orderErr }, 'falha ao inserir store_order')
    throw new Error(`store_order insert falhou: ${orderErr?.message}`)
  }

  log.info({ order_id: order.id }, 'store_order criado')

  // Insere line items
  if (lineItems?.length) {
    const items = lineItems.map((li) => ({
      order_id: order.id,
      stripe_price_id: (li.price as Stripe.Price)?.id ?? '',
      product_snapshot: {
        name: li.description ?? '',
        stripe_product_id: (li.price as Stripe.Price)?.product ?? null,
        images: ((li.price as Stripe.Price)?.product as Stripe.Product)?.images ?? [],
      },
      quantity: li.quantity ?? 1,
      unit_amount: (li.price as Stripe.Price)?.unit_amount ?? 0,
      total_amount: li.amount_total ?? 0,
    }))

    const { error: itemsErr } = await supabase.from('store_order_items').insert(items)
    if (itemsErr) {
      log.error({ err: itemsErr }, 'falha ao inserir store_order_items')
      // Não lança — o pedido foi criado; itens são auditados mas não bloqueiam
    }
  }

  // Registra evento na timeline
  await supabase.from('store_order_events').insert({
    order_id: order.id,
    status: 'paid',
    metadata: { source: 'stripe_webhook', event_type: 'checkout.session.completed' },
  })

  // Atualiza stripe_customer_id no perfil do usuário (se tiver user_id)
  if (session.client_reference_id && session.customer) {
    const customerId =
      typeof session.customer === 'string' ? session.customer : session.customer.id
    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', session.client_reference_id)
  }

  // ── Entrega digital (email com link de download) ────────────────
  try {
    const buyerEmail = session.customer_details?.email ?? session.customer_email
    const buyerName = session.customer_details?.name ?? null

    if (buyerEmail && lineItems?.length) {
      // Resolve cada produto digital a partir do metadata.slug do produto Stripe
      const deliveries: Array<{
        name: string
        url: string
        expiresIn: string
        volumeLabel?: string
        detail?: string
      }> = []
      for (const li of lineItems) {
        const stripeProduct = (li.price as Stripe.Price)?.product as Stripe.Product | undefined
        const slug = stripeProduct?.metadata?.slug
        const product = resolveDigitalProduct(slug)
        if (product) {
          deliveries.push({
            name: product.name,
            url: await createDownloadUrl(product, supabase),
            expiresIn: product.expiresIn ?? '7 dias',
            volumeLabel: product.volumeLabel,
            detail: product.detail,
          })
        }
      }

      // Envia um email por produto digital (simples; bundles podem ser combinados depois)
      for (const d of deliveries) {
        const html = digitalDeliveryHTML({
          customerName: buyerName ?? undefined,
          productName: d.name,
          downloadUrl: d.url,
          orderId: order.id,
          expiresIn: d.expiresIn,
          volumeLabel: d.volumeLabel,
          detail: d.detail,
        })
        const r = await sendEmail({
          to: buyerEmail,
          subject: `Seu exemplar está pronto · ${d.name}`,
          html,
          replyTo: 'academy@housemazzutti.com',
        })
        if (!r.ok) {
          log.error({ err: r.error, order_id: order.id }, 'falha ao enviar email de entrega')
        } else {
          log.info({ email_id: r.id, order_id: order.id }, 'email de entrega enviado')
        }
      }
    }
  } catch (err) {
    log.error({ err }, 'erro no envio de email de entrega — pedido permanece OK')
  }

  log.info({ order_id: order.id, total: totalCents }, 'checkout.session.completed processado')
}
