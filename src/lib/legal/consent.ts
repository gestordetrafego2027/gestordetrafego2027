/**
 * Consentimento de compra (aceite do Termo de Compra e Venda do ebook).
 *
 * Usado tanto no client (checkbox do PaymentMethodSelector) quanto no server
 * (rotas de checkout + webhooks) para registrar, de forma auditável, que o
 * cliente leu e aceitou os termos ANTES de pagar.
 *
 * O registro fica em `store_orders.metadata.consent` (jsonb) — sem coluna nova,
 * consistente com o padrão da casa de guardar dados de pedido em metadata.
 */

/** Versão dos termos vigentes no aceite. Suba isto quando o texto legal mudar. */
export const TERMS_VERSION = 'compra-venda-2026-06'

/** Políticas que o cliente declara ter lido ao comprar. */
export const CONSENT_POLICY_SLUGS = ['termos-de-uso', 'cancelamento-e-reembolso'] as const

/** Payload enviado pelo client ao confirmar a compra. */
export interface PurchaseConsentInput {
  accepted: boolean
  termsVersion: string
}

/** Registro persistido em store_orders.metadata.consent. */
export interface PurchaseConsentRecord {
  accepted: true
  terms_version: string
  policies: string[]
  accepted_at: string
  ip?: string | null
}

/**
 * Normaliza/valida o consentimento recebido do client e carimba com a hora do
 * servidor (fonte confiável). Retorna null se o aceite não veio marcado.
 */
export function buildConsentRecord(
  input: PurchaseConsentInput | undefined | null,
  opts: { ip?: string | null } = {},
): PurchaseConsentRecord | null {
  if (!input?.accepted) return null
  return {
    accepted: true,
    terms_version: input.termsVersion || TERMS_VERSION,
    policies: [...CONSENT_POLICY_SLUGS],
    accepted_at: new Date().toISOString(),
    ip: opts.ip ?? null,
  }
}
