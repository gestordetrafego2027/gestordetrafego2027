/**
 * POST /api/store/checkout/asaas
 * Cria um store_order pendente e retorna o orderId para redirecionar
 * ao fluxo Pix ou Boleto via Asaas.
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { featureFlags } from '@/lib/feature-flags'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { upsertCustomer } from '@/lib/asaas/customer'
import { createPixCharge } from '@/lib/asaas/pix'
import { createBoletoCharge } from '@/lib/asaas/boleto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const Body = z.object({
  stripePriceId: z.string().min(1),
  productSlug: z.string().min(1),
  method: z.enum(['pix', 'boleto']),
  locale: z.enum(['pt', 'en']).default('pt'),
})

export async function POST(req: NextRequest) {
  const log = logger.child({ route: 'POST /api/store/checkout/asaas' })

  if (!featureFlags.isStoreEnabled() || !featureFlags.isAsaasEnabled()) {
    return NextResponse.json({ error: 'Pagamento não disponível.' }, { status: 503 })
  }

  let body: z.infer<typeof Body>
  try {
    body = Body.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }

  const supabase = await createClient()
  const serviceSupabase = createServiceClient()

  // Sessão do usuário (guest permitido)
  const { data: { user } } = await supabase.auth.getUser()

  // Buscar preço — tenta store_prices primeiro, depois academy_products como fallback
  let totalCents = 0
  let productName = body.productSlug

  const { data: price } = await supabase
    .from('store_prices')
    .select('id, unit_amount, active, store_products(name)')
    .eq('stripe_price_id', body.stripePriceId)
    .eq('active', true)
    .maybeSingle()

  if (price) {
    totalCents = price.unit_amount ?? 0
    const prod = price.store_products
    productName = (Array.isArray(prod) ? prod[0]?.name : (prod as { name?: string } | null)?.name) ?? body.productSlug
  } else {
    // Fallback: buscar em academy_products pelo slug
    const { data: academyProduct } = await supabase
      .from('academy_products')
      .select('title, price_cents')
      .eq('slug', body.productSlug)
      .maybeSingle()

    if (!academyProduct) {
      log.warn({ stripePriceId: body.stripePriceId, slug: body.productSlug }, 'produto não encontrado')
      return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 })
    }

    totalCents = academyProduct.price_cents ?? 0
    productName = academyProduct.title ?? body.productSlug
  }

  // Gerar order_number único
  const orderNumber = `HM-${Date.now().toString(36).toUpperCase()}`

  // Criar store_order pendente
  const { data: order, error: orderErr } = await serviceSupabase
    .from('store_orders')
    .insert({
      order_number: orderNumber,
      user_id: user?.id ?? null,
      buyer_email: user?.email ?? 'guest@housemazzutti.com',
      buyer_name: user?.user_metadata?.full_name ?? null,
      subtotal_cents: totalCents,
      total_cents: totalCents,
      status: 'pending',
      idempotency_key: `asaas:${body.stripePriceId}:${user?.id ?? 'guest'}:${Date.now()}`,
      metadata: {
        source: 'asaas_checkout',
        provider: 'asaas',
        method: body.method,
        product_slug: body.productSlug,
        product_name: productName,
        stripe_price_id: body.stripePriceId,
        locale: body.locale,
      },
    })
    .select('id')
    .single()

  if (orderErr || !order) {
    log.error({ orderErr }, 'erro ao criar order')
    return NextResponse.json({ error: 'Erro ao criar pedido.' }, { status: 500 })
  }

  log.info({ orderId: order.id, method: body.method, orderNumber }, 'order asaas criado')

  // Gerar a cobrança Asaas (Pix ou Boleto) imediatamente
  try {
    const customer = await upsertCustomer({
      name: user?.user_metadata?.full_name ?? user?.email ?? 'Cliente House Mazzutti',
      email: user?.email ?? 'guest@housemazzutti.com',
      externalReference: user?.id ?? `guest:${order.id}`,
    })

    const baseMeta = {
      source: 'asaas_checkout',
      provider: 'asaas',
      method: body.method,
      product_slug: body.productSlug,
      product_name: productName,
      stripe_price_id: body.stripePriceId,
      locale: body.locale,
      asaas_customer_id: customer.id,
    }

    if (body.method === 'pix') {
      const { payment, qrCode } = await createPixCharge({
        customerId: customer.id,
        valueCents: totalCents,
        externalReference: order.id,
        description: `${productName} — House Mazzutti`,
        idempotencyKey: `order:${order.id}:pix`,
      })
      await serviceSupabase
        .from('store_orders')
        .update({
          metadata: {
            ...baseMeta,
            asaas_payment_id: payment.id,
            asaas: {
              method: 'pix',
              encodedImage: qrCode.encodedImage,
              payload: qrCode.payload,
              expirationDate: qrCode.expirationDate,
            },
          },
        })
        .eq('id', order.id)
    } else {
      const payment = await createBoletoCharge({
        customerId: customer.id,
        valueCents: totalCents,
        externalReference: order.id,
        description: `${productName} — House Mazzutti`,
        idempotencyKey: `order:${order.id}:boleto`,
      })
      await serviceSupabase
        .from('store_orders')
        .update({
          metadata: {
            ...baseMeta,
            asaas_payment_id: payment.id,
            asaas: {
              method: 'boleto',
              bankSlipUrl: payment.bankSlipUrl,
              identificationField: payment.identificationField,
              barCode: payment.barCode,
              dueDate: payment.dueDate,
            },
          },
        })
        .eq('id', order.id)
    }
  } catch (err) {
    log.error({ err: String(err), orderId: order.id }, 'falha ao gerar cobrança Asaas')
    return NextResponse.json({ error: 'Falha ao gerar cobrança. Tente novamente.' }, { status: 502 })
  }

  return NextResponse.json({ orderId: order.id })
}
