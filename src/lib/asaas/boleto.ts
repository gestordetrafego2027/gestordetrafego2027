import { asaasFetch } from './client'
import { AsaasPaymentSchema, type AsaasPayment } from './schemas'

interface CreateBoletoInput {
  customerId: string
  valueCents: number
  /** YYYY-MM-DD. Default: hoje + 3 dias úteis (simplificado para +3). */
  dueDate?: string
  externalReference: string
  description?: string
  idempotencyKey?: string
}

function toReais(cents: number): number {
  return Math.round(cents) / 100
}

function defaultDueDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  return d.toISOString().slice(0, 10)
}

/**
 * Cria uma cobrança Boleto no Asaas.
 */
export async function createBoletoCharge(input: CreateBoletoInput): Promise<AsaasPayment> {
  const payment = AsaasPaymentSchema.parse(
    await asaasFetch<unknown>({
      method: 'POST',
      path: '/payments',
      idempotencyKey: input.idempotencyKey,
      body: {
        customer: input.customerId,
        billingType: 'BOLETO',
        value: toReais(input.valueCents),
        dueDate: input.dueDate ?? defaultDueDate(),
        externalReference: input.externalReference,
        description: input.description,
      },
    }),
  )

  // A linha digitável vem de um endpoint separado no Asaas.
  let identificationField = payment.identificationField ?? null
  let barCode = payment.barCode ?? null
  try {
    const idf = await asaasFetch<{ identificationField?: string; barCode?: string }>({
      method: 'GET',
      path: `/payments/${payment.id}/identificationField`,
    })
    identificationField = idf.identificationField ?? identificationField
    barCode = idf.barCode ?? barCode
  } catch {
    // Boleto pode ainda estar em registro — segue com o que tiver.
  }

  return { ...payment, identificationField, barCode }
}
