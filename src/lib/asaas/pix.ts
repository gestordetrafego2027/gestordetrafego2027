import { asaasFetch } from './client'
import {
  AsaasPaymentSchema,
  AsaasPixQrCodeSchema,
  type AsaasPayment,
  type AsaasPixQrCode,
} from './schemas'

interface CreatePixInput {
  customerId: string
  valueCents: number
  /** YYYY-MM-DD. Default: hoje. */
  dueDate?: string
  externalReference: string
  description?: string
  idempotencyKey?: string
}

export interface CreatePixResult {
  payment: AsaasPayment
  qrCode: AsaasPixQrCode
}

function toReais(cents: number): number {
  return Math.round(cents) / 100
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Cria uma cobrança Pix no Asaas e busca o QR Code (encodedImage + payload).
 */
export async function createPixCharge(input: CreatePixInput): Promise<CreatePixResult> {
  const payment = AsaasPaymentSchema.parse(
    await asaasFetch<unknown>({
      method: 'POST',
      path: '/payments',
      idempotencyKey: input.idempotencyKey,
      body: {
        customer: input.customerId,
        billingType: 'PIX',
        value: toReais(input.valueCents),
        dueDate: input.dueDate ?? today(),
        externalReference: input.externalReference,
        description: input.description,
      },
    }),
  )

  const qrCode = AsaasPixQrCodeSchema.parse(
    await asaasFetch<unknown>({
      method: 'GET',
      path: `/payments/${payment.id}/pixQrCode`,
    }),
  )

  return { payment, qrCode }
}
