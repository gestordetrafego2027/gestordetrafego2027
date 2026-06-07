// @ts-nocheck
/**
 * Cria um store_orders com status='pending' a partir dos itens do carrinho.
 * Usado pelo fluxo Asaas (Pix/Boleto), que precisa de um orderId existente
 * antes de gerar a cobrança. Para Stripe (cartão), o pedido continua sendo
 * criado no webhook checkout.session.completed.
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { featureFlags } from '@/lib/feature-flags'
import { createServiceClient } from '@/lib/supabase/service'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const Body = z.object({
  items: z
    .array(
      z.object({
        stripePriceId: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(20),
  buyerEmail: z.string().email(),
  buyerName: z.string().min(1).optional(),
  buyerPhone: z.string().optional(),
  buyerCpf: z.string().optional(),
  couponCode: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const log = logger.child({ route: 'POST /api/store/create-pending-order' })

  if (!featureFlags.isStoreEnabled() || !featureFlags.isAsaasEnabled()) {
    return NextResponse.json({ error: 'indisponível' }, { status: 503 })
  }

  // Rate limit — protege a criação de pedidos (guest checkout).
  const rl = await checkRateLimit('checkout', getClientIp(req))
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde um instante.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    )
  }

  let body: z.infer<typeof Body>
  try {
    body = Body.parse(await req.json())
  } catch (err) {
    log.warn({ err }, 'payload inválido')
    return NextResponse.json({ error: 'payload inválido' }, { status: 400 })
  }

  // Usuário (se logado) — para client_reference_id
  const userSb = await createClient()
  const { data: { user } } = await userSb.auth.getUser()

  const service = createServiceClient()

  // Resolve prices
  const priceIds = body.items.map((i) => i.stripePriceId)
  const { data: prices, error: pricesErr } = await service
    .from('store_prices')
    .select('id, stripe_price_id, unit_amount, active, metadata')
    .in('stripe_price_id', priceIds)
    .eq('active', true)

  if (pricesErr || !prices?.length) {
    return NextResponse.json({ error: 'produtos indisponíveis' }, { status: 404 })
  }

  const priceMap = new Map(prices.map((p) => [p.stripe_price_id, p]))
  let subtotal = 0
  const orderItems: Array<Record<string, unknown>> = []
  for (const item of body.items) {
    const p = priceMap.get(item.stripePriceId)
    if (!p) {
      return NextResponse.json({ error: `price ${item.stripePriceId} não encontrado` }, { status: 404 })
    }
    subtotal += p.unit_amount * item.quantity
    orderItems.push({
      stripe_price_id: p.stripe_price_id,
      quantity: item.quantity,
      unit_amount: p.unit_amount,
      total_amount: p.unit_amount * item.quantity,
    })
  }

  // Cupom: aplica do cache local (sem chamar Stripe)
  let discount = 0
  let couponId: string | null = null
  let couponSnapshot: string | null = null
  if (body.couponCode) {
    const { data: coupon } = await service
      .from('store_coupons')
      .select('id, code, active, percent_off, amount_off, valid_until')
      .eq('code', body.couponCode.toUpperCase())
      .eq('active', true)
      .maybeSingle()
    if (coupon) {
      const validUntil = coupon.valid_until ? new Date(coupon.valid_until).getTime() : Infinity
      if (validUntil >= Date.now()) {
        couponId = coupon.id
        couponSnapshot = coupon.code
        if (coupon.amount_off) discount = coupon.amount_off
        else if (coupon.percent_off) discount = Math.round((subtotal * Number(coupon.percent_off)) / 100)
      }
    }
  }

  const total = Math.max(0, subtotal - discount)

  const { data: order, error: orderErr } = await service
    .from('store_orders')
    .insert({
      user_id: user?.id ?? null,
      status: 'pending',
      payment_provider: 'asaas',
      subtotal_cents: subtotal,
      discount_cents: discount,
      total_cents: total,
      currency: 'brl',
      buyer_email: body.buyerEmail,
      buyer_name: body.buyerName ?? null,
      buyer_phone: body.buyerPhone ?? null,
      buyer_cpf: body.buyerCpf ?? null,
      coupon_id: couponId,
      coupon_code_snapshot: couponSnapshot,
      ip_address: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
      user_agent: req.headers.get('user-agent') ?? null,
      metadata: { source: 'asaas_checkout' },
    })
    .select('id, order_number')
    .single()

  if (orderErr || !order) {
    log.error({ err: orderErr }, 'falha ao criar pedido')
    return NextResponse.json({ error: 'falha ao criar pedido' }, { status: 500 })
  }

  // Insere itens
  const { error: itemsErr } = await service
    .from('store_order_items')
    .insert(orderItems.map((i) => ({ ...i, order_id: order.id })))

  if (itemsErr) {
    log.error({ err: itemsErr }, 'falha ao inserir items')
    // não deleta — fica órfão para investigação manual
  }

  return NextResponse.json({ orderId: order.id, orderNumber: order.order_number })
}
