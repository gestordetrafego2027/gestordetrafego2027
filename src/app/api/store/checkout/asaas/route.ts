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

  // Buscar preço no Supabase
  const { data: price, error: priceErr } = await supabase
    .from('store_prices')
    .select('id, unit_amount, active, store_products(name, product_type)')
    .eq('stripe_price_id', body.stripePriceId)
    .eq('active', true)
    .maybeSingle()

  if (priceErr || !price) {
    log.warn({ stripePriceId: body.stripePriceId }, 'preço não encontrado')
    return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 })
  }

  const productName = Array.isArray(price.store_products)
    ? price.store_products[0]?.name
    : (price.store_products as { name?: string } | null)?.name ?? body.productSlug

  const totalCents = price.unit_amount ?? 0

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
      payment_provider: 'asaas',
      idempotency_key: `asaas:${body.stripePriceId}:${user?.id ?? 'guest'}:${Date.now()}`,
      metadata: {
        source: 'asaas_checkout',
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

  return NextResponse.json({ orderId: order.id })
}
