import { asaasFetch } from './client'
import { AsaasPaymentSchema, type AsaasPayment } from './schemas'

/**
 * Estorna (refund) um pagamento Asaas.
 * Se valueCents omitido, estorna o valor total.
 */
export async function refundPayment(paymentId: string, valueCents?: number): Promise<AsaasPayment> {
  const body: Record<string, unknown> = {}
  if (typeof valueCents === 'number') {
    body.value = Math.round(valueCents) / 100
  }
  const res = await asaasFetch<unknown>({
    method: 'POST',
    path: `/payments/${paymentId}/refund`,
    body,
  })
  return AsaasPaymentSchema.parse(res)
}
