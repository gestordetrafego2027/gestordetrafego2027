import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { featureFlags } from '@/lib/feature-flags'
import { createServiceClient } from '@/lib/supabase/service'
import { upsertCustomer } from '@/lib/asaas/customer'
import { createPixCharge } from '@/lib/asaas/pix'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const Body = z.object({ orderId: z.string().uuid() })

export async function POST(req: NextRequest) {
  const log = logger.child({ route: 'POST /api/payments/asaas/create-pix' })

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
    .select('id, order_number, total_cents, buyer_email, buyer_name, buyer_cpf, user_id, status, metadata')
    .eq('id', body.orderId)
    .maybeSingle()

  if (orderErr || !order) {
    return NextResponse.json({ error: 'pedido não encontrado' }, { status: 404 })
  }
  if (order.status !== 'pending') {
    return NextResponse.json({ error: 'pedido não está pendente' }, { status: 409 })
  }
  const existingMeta = (order.metadata ?? {}) as Record<string, unknown>
  if (existingMeta.asaas_payment_id) {
    return NextResponse.json({ error: 'cobrança já gerada' }, { status: 409 })
  }

  try {
    const customer = await upsertCustomer({
      name: order.buyer_name ?? order.buyer_email,
      email: order.buyer_email,
      cpfCnpj: order.buyer_cpf ?? undefined,
      externalReference: order.user_id ?? `guest:${order.buyer_email}`,
    })

    const { payment, qrCode } = await createPixCharge({
      customerId: customer.id,
      valueCents: order.total_cents,
      externalReference: order.id,
      description: `Pedido ${order.order_number} — House Mazzutti`,
      idempotencyKey: `order:${order.id}:pix`,
    })

    await supabase
      .from('store_orders')
      .update({
        metadata: {
          ...existingMeta,
          provider: 'asaas',
          asaas_payment_id: payment.id,
          asaas_customer_id: customer.id,
          asaas: {
            method: 'pix',
            encodedImage: qrCode.encodedImage,
            payload: qrCode.payload,
            expirationDate: qrCode.expirationDate,
          },
        },
      })
      .eq('id', order.id)

    return NextResponse.json({
      paymentId: payment.id,
      encodedImage: qrCode.encodedImage,
      payload: qrCode.payload,
      expirationDate: qrCode.expirationDate,
    })
  } catch (err) {
    log.error({ err: String(err) }, 'falha ao criar cobrança Pix')
    return NextResponse.json({ error: 'falha ao criar cobrança' }, { status: 502 })
  }
}
