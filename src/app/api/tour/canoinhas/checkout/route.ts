/**
 * POST /api/tour/canoinhas/checkout
 *
 * Cria um store_order + cobrança Asaas para o Tour Marca Pessoal · Canoinhas.
 * PIX → retorna QR code.
 * Boleto → retorna URL do boleto.
 * Cartão 3x → retorna URL do payment link Asaas (hospedado pelo Asaas).
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { createServiceClient } from '@/lib/supabase/service'
import { upsertCustomer } from '@/lib/asaas/customer'
import { createPixCharge } from '@/lib/asaas/pix'
import { createBoletoCharge } from '@/lib/asaas/boleto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PLANS: Record<string, { name: string; cents: number; priceId: string }> = {
  'ensaio-01': { name: 'Tour Canoinhas · Ensaio 01', cents: 190000, priceId: 'asaas:tour-canoinhas-ensaio-01' },
  'ensaio-02': { name: 'Tour Canoinhas · Ensaio 02', cents: 260000, priceId: 'asaas:tour-canoinhas-ensaio-02' },
  'ensaio-03': { name: 'Tour Canoinhas · Ensaio 03', cents: 320000, priceId: 'asaas:tour-canoinhas-ensaio-03' },
}

const Body = z.object({
  planId: z.enum(['ensaio-01', 'ensaio-02', 'ensaio-03']),
  paymentMethod: z.enum(['pix', 'boleto', 'credit_card']),
  buyerName: z.string().min(2),
  buyerEmail: z.string().email(),
  buyerCpf: z.string().min(11).max(14),
  buyerPhone: z.string().min(10),
  instagram: z.string().optional(),
})

const log = logger.child({ route: 'POST /api/tour/canoinhas/checkout' })

export async function POST(req: NextRequest) {
  let body: z.infer<typeof Body>
  try {
    body = Body.parse(await req.json())
  } catch (err) {
    return NextResponse.json({ error: 'payload inválido' }, { status: 400 })
  }

  const plan = PLANS[body.planId]

  // Cartão 3x → redirect para o payment link Asaas (hospedado)
  if (body.paymentMethod === 'credit_card') {
    const envKey = `ASAAS_LINK_${body.planId.toUpperCase().replace('-', '_')}`
    const linkUrl = process.env[envKey]
    if (!linkUrl) {
      log.error({ envKey }, 'Payment link não configurado')
      return NextResponse.json({ error: 'Link de pagamento não configurado. Tente PIX ou Boleto.' }, { status: 503 })
    }
    return NextResponse.json({ redirectUrl: linkUrl })
  }

  const supabase = createServiceClient()

  // Cria pedido pendente em store_orders
  const { data: order, error: orderErr } = await supabase
    .from('store_orders')
    .insert({
      status: 'pending',
      payment_provider: 'asaas',
      subtotal_cents: plan.cents,
      discount_cents: 0,
      total_cents: plan.cents,
      currency: 'brl',
      buyer_email: body.buyerEmail,
      buyer_name: body.buyerName,
      buyer_phone: body.buyerPhone,
      buyer_cpf: body.buyerCpf,
      metadata: {
        source: 'tour_canoinhas',
        product_type: 'tour',
        product_name: plan.name,
        plan_id: body.planId,
        instagram: body.instagram ?? null,
        payment_method: body.paymentMethod,
      },
    })
    .select('id, order_number')
    .single()

  if (orderErr || !order) {
    log.error({ err: orderErr }, 'falha ao criar pedido')
    return NextResponse.json({ error: 'Erro ao criar pedido. Tente novamente.' }, { status: 500 })
  }

  try {
    const customer = await upsertCustomer({
      name: body.buyerName,
      email: body.buyerEmail,
      cpfCnpj: body.buyerCpf,
      externalReference: `tour:${body.buyerEmail}`,
    })

    if (body.paymentMethod === 'pix') {
      const { payment, qrCode } = await createPixCharge({
        customerId: customer.id,
        valueCents: plan.cents,
        externalReference: order.id,
        description: `${plan.name} — House Mazzutti · Canoinhas`,
        idempotencyKey: `tour:${order.id}:pix`,
      })

      await supabase
        .from('store_orders')
        .update({
          metadata: {
            source: 'tour_canoinhas',
            product_type: 'tour',
            product_name: plan.name,
            plan_id: body.planId,
            instagram: body.instagram ?? null,
            payment_method: 'pix',
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
        orderId: order.id,
        orderNumber: order.order_number,
        paymentId: payment.id,
        method: 'pix',
        encodedImage: qrCode.encodedImage,
        payload: qrCode.payload,
        expirationDate: qrCode.expirationDate,
      })
    }

    if (body.paymentMethod === 'boleto') {
      // Vencimento: 3 dias úteis
      const due = new Date()
      due.setDate(due.getDate() + 3)
      const dueDate = due.toISOString().slice(0, 10)

      const payment = await createBoletoCharge({
        customerId: customer.id,
        valueCents: plan.cents,
        dueDate,
        externalReference: order.id,
        description: `${plan.name} — House Mazzutti · Canoinhas`,
        idempotencyKey: `tour:${order.id}:boleto`,
      })

      await supabase
        .from('store_orders')
        .update({
          metadata: {
            source: 'tour_canoinhas',
            product_type: 'tour',
            product_name: plan.name,
            plan_id: body.planId,
            instagram: body.instagram ?? null,
            payment_method: 'boleto',
            provider: 'asaas',
            asaas_payment_id: payment.id,
            asaas_customer_id: customer.id,
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

      return NextResponse.json({
        orderId: order.id,
        orderNumber: order.order_number,
        paymentId: payment.id,
        method: 'boleto',
        bankSlipUrl: payment.bankSlipUrl,
        identificationField: payment.identificationField,
        barCode: payment.barCode,
        dueDate: payment.dueDate,
      })
    }
  } catch (err) {
    log.error({ err: String(err), orderId: order.id }, 'falha ao criar cobrança Asaas')
    // Cancela o pedido órfão
    await supabase.from('store_orders').update({ status: 'failed' }).eq('id', order.id)
    return NextResponse.json({ error: 'Falha ao gerar cobrança. Tente novamente.' }, { status: 502 })
  }
}
