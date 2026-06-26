/**
 * Cobrança via cartão de crédito no Asaas com parcelamento.
 *
 * O campo `totalValue` enviado ao Asaas é o valor COM juros — os juros
 * ficam inteiramente com o cliente. O lojista recebe o valor base líquido.
 *
 * Asaas exige tokenização do cartão via SDK client-side (checkout.js) ou
 * via payment link hospedado. Este módulo oferece as duas abordagens:
 *
 * 1. `createCreditCardPaymentLink` — gera um link de pagamento Asaas
 *    com installmentCount e totalValue pré-configurados. O cliente paga
 *    no ambiente seguro do Asaas. Mais simples, sem PCI scope.
 *
 * 2. `createCreditCardCharge` — cobrança direta com token do cartão já
 *    tokenizado pelo client-side. Requer integração do Asaas Checkout.js
 *    no frontend.
 */
import { asaasFetch } from './client'
import { AsaasPaymentSchema, type AsaasPayment } from './schemas'
import { getInstallmentOption, type InstallmentCount } from './installments'

function toReais(cents: number): number {
  return Math.round(cents) / 100
}

// ── Payment Link ─────────────────────────────────────────────────────────────

interface CreateCreditCardLinkInput {
  customerId: string
  /** Valor base do produto em centavos (sem juros). */
  baseCents: number
  /** Número de parcelas. Juros calculados automaticamente sobre baseCents. */
  installments: InstallmentCount
  externalReference: string
  description?: string
  /** YYYY-MM-DD. Default: hoje. */
  dueDate?: string
  idempotencyKey?: string
}

export interface CreditCardLinkResult {
  payment: AsaasPayment
  /** Total cobrado do cliente (com juros) em centavos. */
  totalCents: number
  /** Valor de cada parcela em centavos. */
  installmentCents: number
  installmentCount: InstallmentCount
  /** URL do link de pagamento gerado pelo Asaas (redirecionar o cliente). */
  paymentUrl: string | null
}

/**
 * Cria uma cobrança parcelada via cartão no Asaas com link de pagamento.
 * O `totalValue` enviado é o valor COM juros — custo 100% do cliente.
 */
export async function createCreditCardPaymentLink(
  input: CreateCreditCardLinkInput,
): Promise<CreditCardLinkResult> {
  const option = getInstallmentOption(input.baseCents, input.installments)

  const today = new Date().toISOString().slice(0, 10)

  const raw = await asaasFetch<unknown>({
    method: 'POST',
    path: '/payments',
    idempotencyKey: input.idempotencyKey,
    body: {
      customer: input.customerId,
      billingType: 'CREDIT_CARD',
      value: toReais(option.installmentCents),
      totalValue: toReais(option.totalCents),
      installmentCount: option.count > 1 ? option.count : undefined,
      installmentValue: option.count > 1 ? toReais(option.installmentCents) : undefined,
      dueDate: input.dueDate ?? today,
      externalReference: input.externalReference,
      description: input.description,
    },
  })

  const payment = AsaasPaymentSchema.parse(raw)

  return {
    payment,
    totalCents: option.totalCents,
    installmentCents: option.installmentCents,
    installmentCount: option.count,
    paymentUrl: payment.invoiceUrl ?? null,
  }
}

// ── Charge com token (client-side tokenization) ───────────────────────────────

interface CreditCardToken {
  creditCardToken: string
}

interface CreateCreditCardChargeInput {
  customerId: string
  baseCents: number
  installments: InstallmentCount
  externalReference: string
  description?: string
  dueDate?: string
  token: CreditCardToken
  idempotencyKey?: string
  /** IP do cliente para análise antifraude (obrigatório pelo Asaas). */
  remoteIp: string
}

export interface CreditCardChargeResult {
  payment: AsaasPayment
  totalCents: number
  installmentCents: number
  installmentCount: InstallmentCount
}

/**
 * Cobrança direta com token de cartão gerado client-side.
 * Requer que o frontend tokenize o cartão via Asaas Checkout.js.
 */
export async function createCreditCardCharge(
  input: CreateCreditCardChargeInput,
): Promise<CreditCardChargeResult> {
  const option = getInstallmentOption(input.baseCents, input.installments)
  const today = new Date().toISOString().slice(0, 10)

  const raw = await asaasFetch<unknown>({
    method: 'POST',
    path: '/payments',
    idempotencyKey: input.idempotencyKey,
    body: {
      customer: input.customerId,
      billingType: 'CREDIT_CARD',
      value: toReais(option.installmentCents),
      totalValue: toReais(option.totalCents),
      installmentCount: option.count > 1 ? option.count : undefined,
      installmentValue: option.count > 1 ? toReais(option.installmentCents) : undefined,
      dueDate: input.dueDate ?? today,
      externalReference: input.externalReference,
      description: input.description,
      creditCardToken: input.token.creditCardToken,
      remoteIp: input.remoteIp,
    },
  })

  const payment = AsaasPaymentSchema.parse(raw)

  return {
    payment,
    totalCents: option.totalCents,
    installmentCents: option.installmentCents,
    installmentCount: option.count,
  }
}
