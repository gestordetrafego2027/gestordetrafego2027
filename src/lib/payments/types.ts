export type PaymentMethod = 'card' | 'subscription' | 'pix' | 'boleto'

export type PaymentStatus =
  'pending' | 'processing' | 'paid' | 'failed' | 'overdue' | 'refunded' | 'cancelled'

export type ProviderName = 'stripe' | 'asaas'

export interface CheckoutResult {
  /** ID externo do provider (session id Stripe ou payment id Asaas). */
  externalId: string
  /** URL para o usuário concluir o pagamento (Stripe Checkout, boleto PDF, etc.). */
  redirectUrl?: string
  /** QR Code Pix base64, se aplicável. */
  pixQrCodeBase64?: string
  /** Payload copia-e-cola do Pix. */
  pixPayload?: string
  /** Linha digitável do boleto. */
  bankSlipLine?: string
}

export interface PaymentProvider {
  readonly name: ProviderName
  readonly supports: ReadonlyArray<PaymentMethod>
}
