/**
 * Mercado Pago helper — cria preference para checkout de produto único.
 * Usa a API REST oficial via fetch (sem SDK pra reduzir surface).
 */

const MP_API = 'https://api.mercadopago.com'

export type CreatePreferenceInput = {
  orderId: string
  orderNumber: string
  title: string
  description?: string
  unitPriceCents: number
  payerEmail?: string
  externalReference?: string
  successUrl: string
  failureUrl: string
  pendingUrl: string
  notificationUrl: string
}

export async function createPreference(input: CreatePreferenceInput) {
  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error('MP_ACCESS_TOKEN não configurado.')
  }

  const body = {
    items: [
      {
        id: input.orderId,
        title: input.title.slice(0, 256),
        description: (input.description || '').slice(0, 600),
        quantity: 1,
        currency_id: 'BRL',
        unit_price: input.unitPriceCents / 100,
      },
    ],
    external_reference: input.externalReference || input.orderId,
    payer: input.payerEmail ? { email: input.payerEmail } : undefined,
    back_urls: {
      success: input.successUrl,
      failure: input.failureUrl,
      pending: input.pendingUrl,
    },
    auto_return: 'approved',
    notification_url: input.notificationUrl,
    statement_descriptor: 'HOUSE MAZZUTTI',
    metadata: { order_id: input.orderId, order_number: input.orderNumber },
  }

  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`MP create preference falhou (${res.status}): ${text}`)
  }
  return res.json() as Promise<{ id: string; init_point: string; sandbox_init_point: string }>
}

export async function getPayment(paymentId: string) {
  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) throw new Error('MP_ACCESS_TOKEN não configurado.')
  const res = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error(`MP getPayment falhou (${res.status})`)
  return res.json()
}

export function mpStatusToOrderStatus(mpStatus: string): string {
  switch (mpStatus) {
    case 'approved': return 'paid'
    case 'pending': return 'pending'
    case 'in_process':
    case 'authorized': return 'processing'
    case 'rejected': return 'failed'
    case 'refunded': return 'refunded'
    case 'cancelled': return 'cancelled'
    case 'charged_back': return 'chargeback'
    default: return 'pending'
  }
}
