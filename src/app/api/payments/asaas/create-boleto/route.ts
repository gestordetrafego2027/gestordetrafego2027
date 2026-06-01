import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { featureFlags } from '@/lib/feature-flags'
import { createServiceClient } from '@/lib/supabase/service'
import { upsertCustomer } from '@/lib/asaas/customer'
import { createBoletoCharge } from '@/lib/asaas/boleto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const Body = z.object({
  orderId: z.string().uuid(),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

export async function POST(req: NextRequest) {
  const log = logger.child({ route: 'POST /api/payments/asaas/create-boleto' })

  if (!featureFlags.isAsaasEnabled()) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  let body: z.infer<typeof Body>
  try {
    body = Body.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'payload inválido' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data: order, error: orderErr } = await supabase
    .from('store_orders')
    .select('id, order_number, total_cents, buyer_email, buyer_name, buyer_cpf, user_id, asaas_payment_id, status')
    .eq('id', body.orderId)
    .maybeSingle()

  if (orderErr || !order) {
    return NextResponse.json({ error: 'pedido não encontrado' }, { status: 404 })
  }
  if (order.status !== 'pending') {
    return NextResponse.json({ error: 'pedido não está pendente' }, { status: 409 })
  }
  if (order.asaas_payment_id) {
    return NextResponse.json({ error: 'cobrança já gerada' }, { status: 409 })
  }

  try {
    const customer = await upsertCustomer({
      name: order.buyer_name ?? order.buyer_email,
      email: order.buyer_email,
      cpfCnpj: order.buyer_cpf ?? undefined,
      externalReference: order.user_id ?? `guest:${order.buyer_email}`,
    })

    const payment = await createBoletoCharge({
      customerId: customer.id,
      valueCents: order.total_cents,
      dueDate: body.dueDate,
      externalReference: order.id,
      description: `Pedido ${order.order_number} — House Mazzutti`,
      idempotencyKey: `order:${order.id}:boleto`,
    })

    await supabase
      .from('store_orders')
      .update({
        payment_provider: 'asaas',
        asaas_payment_id: payment.id,
        asaas_customer_id: customer.id,
      })
      .eq('id', order.id)

    return NextResponse.json({
      paymentId: payment.id,
      bankSlipUrl: payment.bankSlipUrl,
      identificationField: payment.identificationField,
      barCode: payment.barCode,
      dueDate: payment.dueDate,
    })
  } catch (err) {
    log.error({ err: String(err) }, 'falha ao criar boleto')
    return NextResponse.json({ error: 'falha ao criar cobrança' }, { status: 502 })
  }
}
