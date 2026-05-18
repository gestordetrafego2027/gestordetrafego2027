// Edge Function: mp-webhook
// Recebe notificações do Mercado Pago, registra em academy_mp_webhooks,
// busca detalhes do payment via MP API e atualiza academy_payments +
// academy_orders. A trigger DB tg_academy_orders_grant_enrollment cria
// enrollments automaticamente quando status='paid'.
//
// Endpoint público (verify_jwt=false). MP envia POST sem auth header.
// Configurar no painel do Mercado Pago como URL de notificação.
//
// Secrets necessárias no Supabase Edge Functions:
//   MP_ACCESS_TOKEN    — token APP_USR-xxx pra GET /v1/payments/{id}
//   MP_WEBHOOK_SECRET  — opcional, validação de assinatura x-signature
//   SUPABASE_URL       — auto-injetada pelo Supabase
//   SUPABASE_SERVICE_ROLE_KEY — auto-injetada pelo Supabase

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const MP_API = 'https://api.mercadopago.com'

type WebhookPayload = {
  id?: string | number
  type?: string
  action?: string
  data?: { id?: string | number }
  resource?: string
  topic?: string
  user_id?: string | number
  api_version?: string
  date_created?: string
  live_mode?: boolean
}

type MPPayment = {
  id: number
  status: string
  status_detail?: string
  external_reference?: string
  transaction_amount?: number
  currency_id?: string
  payment_method_id?: string
  payment_type_id?: string
  installments?: number
  date_approved?: string | null
  date_created?: string
  date_last_updated?: string
  metadata?: Record<string, unknown>
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

function methodToPaymentMethod(mpMethod?: string, mpType?: string):
  'pix' | 'credit_card' | 'debit_card' | 'boleto' | 'other' {
  if (!mpMethod && !mpType) return 'other'
  const m = (mpMethod ?? '').toLowerCase()
  const t = (mpType ?? '').toLowerCase()
  if (t === 'bank_transfer' || m.includes('pix')) return 'pix'
  if (t === 'ticket' || m.includes('bolbradesco') || m.includes('boleto')) return 'boleto'
  if (t === 'debit_card') return 'debit_card'
  if (t === 'credit_card') return 'credit_card'
  return 'other'
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  )

  // 1) Lê payload bruto + headers relevantes
  let raw: WebhookPayload = {}
  try { raw = await req.json() } catch { raw = {} }

  const url = new URL(req.url)
  const topic = raw.type ?? raw.topic ?? url.searchParams.get('topic') ?? 'unknown'
  const action = raw.action ?? null
  const resourceId = String(raw.data?.id ?? raw.id ?? url.searchParams.get('id') ?? '')
  const signature = req.headers.get('x-signature') ?? req.headers.get('x-hub-signature') ?? null

  // 2) Registra webhook (sempre, mesmo se falhar depois)
  const { data: hookRow, error: hookErr } = await supabase
    .from('academy_mp_webhooks')
    .insert({
      topic,
      action,
      resource_id: resourceId,
      payload: raw,
      signature,
      processing_status: 'pending',
      processing_attempts: 1,
    })
    .select('id')
    .single()

  if (hookErr) {
    console.error('[mp-webhook] insert webhook failed:', hookErr.message)
    return json({ ok: false, error: hookErr.message }, 500)
  }

  const hookId = hookRow.id as string

  // 3) Se não for payment, só registra e retorna OK (MP exige 2xx pra parar de tentar)
  if (topic !== 'payment' && topic !== 'merchant_order') {
    await supabase
      .from('academy_mp_webhooks')
      .update({ processing_status: 'ignored', processed_at: new Date().toISOString() })
      .eq('id', hookId)
    return json({ ok: true, ignored: true, topic })
  }

  // 4) Só processa payment — merchant_order resolvemos via payments também
  if (topic !== 'payment' || !resourceId) {
    await supabase
      .from('academy_mp_webhooks')
      .update({ processing_status: 'skipped', processed_at: new Date().toISOString() })
      .eq('id', hookId)
    return json({ ok: true, skipped: true })
  }

  const mpToken = Deno.env.get('MP_ACCESS_TOKEN')
  if (!mpToken) {
    await supabase.from('academy_mp_webhooks').update({
      processing_status: 'error',
      error_message: 'MP_ACCESS_TOKEN not configured',
      processed_at: new Date().toISOString(),
    }).eq('id', hookId)
    return json({ ok: false, error: 'mp_access_token_missing' }, 500)
  }

  // 5) Busca payment no MP
  const mpRes = await fetch(`${MP_API}/v1/payments/${resourceId}`, {
    headers: { Authorization: `Bearer ${mpToken}` },
  })

  if (!mpRes.ok) {
    const errText = await mpRes.text()
    await supabase.from('academy_mp_webhooks').update({
      processing_status: 'error',
      error_message: `MP ${mpRes.status}: ${errText.slice(0, 200)}`,
      processed_at: new Date().toISOString(),
    }).eq('id', hookId)
    return json({ ok: false, error: 'mp_api_fail', status: mpRes.status }, 502)
  }

  const payment: MPPayment = await mpRes.json()

  // 6) Encontra order: por mp_external_reference OU mp_payment_id existente
  let orderId: string | null = null
  if (payment.external_reference) {
    const { data: o } = await supabase
      .from('academy_orders')
      .select('id, status')
      .eq('mp_external_reference', payment.external_reference)
      .maybeSingle()
    if (o) orderId = o.id
  }
  if (!orderId) {
    const { data: o } = await supabase
      .from('academy_orders')
      .select('id, status')
      .eq('mp_payment_id', String(payment.id))
      .maybeSingle()
    if (o) orderId = o.id
  }

  if (!orderId) {
    await supabase.from('academy_mp_webhooks').update({
      processing_status: 'orphan',
      error_message: `Order not found for payment ${payment.id}`,
      processed_at: new Date().toISOString(),
    }).eq('id', hookId)
    return json({ ok: true, warning: 'order_not_found', payment_id: payment.id })
  }

  // 7) Upsert academy_payments
  const amountCents = Math.round((payment.transaction_amount ?? 0) * 100)
  const isApproved = payment.status === 'approved'
  const isRefunded = payment.status === 'refunded' || payment.status === 'charged_back'

  const { data: existingPay } = await supabase
    .from('academy_payments')
    .select('id')
    .eq('mp_payment_id', String(payment.id))
    .maybeSingle()

  const paymentRow = {
    order_id: orderId,
    method: methodToPaymentMethod(payment.payment_method_id, payment.payment_type_id) as never,
    status: payment.status,
    amount_cents: amountCents,
    currency: (payment.currency_id ?? 'BRL') as string,
    mp_payment_id: String(payment.id),
    mp_status: payment.status,
    mp_status_detail: payment.status_detail ?? null,
    mp_payment_type: payment.payment_type_id ?? null,
    installments: payment.installments ?? null,
    paid_at: isApproved && payment.date_approved ? payment.date_approved : null,
    refunded_at: isRefunded ? (payment.date_last_updated ?? new Date().toISOString()) : null,
    gateway_response: payment as unknown as Record<string, unknown>,
  }

  let paymentRowId: string | null = null
  if (existingPay) {
    const { data: u } = await supabase
      .from('academy_payments').update(paymentRow).eq('id', existingPay.id).select('id').single()
    paymentRowId = u?.id ?? existingPay.id
  } else {
    const { data: i } = await supabase
      .from('academy_payments').insert(paymentRow).select('id').single()
    paymentRowId = i?.id ?? null
  }

  // 8) Atualiza order conforme status do pagamento
  const orderUpdate: Record<string, unknown> = {
    mp_payment_id: String(payment.id),
  }
  if (isApproved) orderUpdate.status = 'paid'
  else if (payment.status === 'rejected' || payment.status === 'cancelled') orderUpdate.status = 'failed'
  else if (isRefunded) orderUpdate.status = 'refunded'

  await supabase.from('academy_orders').update(orderUpdate).eq('id', orderId)

  // 9) Marca webhook como processado
  await supabase.from('academy_mp_webhooks').update({
    processing_status: 'success',
    processed_at: new Date().toISOString(),
    order_id: orderId,
    payment_id: paymentRowId,
  }).eq('id', hookId)

  return json({
    ok: true,
    payment_id: payment.id,
    status: payment.status,
    order_id: orderId,
    order_paid: isApproved,
  })
})
