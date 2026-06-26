/**
 * Schemas Zod para payloads do Asaas.
 * Cobre apenas os campos que usamos — Asaas devolve mais.
 */
import { z } from 'zod'

export const AsaasCustomerSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional().nullable(),
  cpfCnpj: z.string().optional().nullable(),
  externalReference: z.string().optional().nullable(),
})
export type AsaasCustomer = z.infer<typeof AsaasCustomerSchema>

export const AsaasPaymentSchema = z.object({
  id: z.string(),
  customer: z.string(),
  status: z.string(), // PENDING, RECEIVED, CONFIRMED, OVERDUE, REFUNDED, etc.
  value: z.number(),
  netValue: z.number().optional(),
  totalValue: z.number().optional().nullable(),
  installmentCount: z.number().optional().nullable(),
  installmentValue: z.number().optional().nullable(),
  billingType: z.enum(['PIX', 'BOLETO', 'CREDIT_CARD', 'UNDEFINED']).optional(),
  dueDate: z.string().optional(),
  invoiceUrl: z.string().optional().nullable(),
  bankSlipUrl: z.string().optional().nullable(),
  identificationField: z.string().optional().nullable(),
  barCode: z.string().optional().nullable(),
  externalReference: z.string().optional().nullable(),
})
export type AsaasPayment = z.infer<typeof AsaasPaymentSchema>

export const AsaasPixQrCodeSchema = z.object({
  encodedImage: z.string(), // base64 PNG
  payload: z.string(), // copia-e-cola
  expirationDate: z.string().optional(),
})
export type AsaasPixQrCode = z.infer<typeof AsaasPixQrCodeSchema>

export const AsaasWebhookEventSchema = z.object({
  id: z.string().optional(), // event id
  event: z.string(),
  dateCreated: z.string().optional(),
  payment: AsaasPaymentSchema.partial().optional(),
})
export type AsaasWebhookEvent = z.infer<typeof AsaasWebhookEventSchema>
