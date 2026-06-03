import { stripeProvider } from './providers/stripe'
import { asaasProvider } from './providers/asaas'
import type { PaymentMethod, PaymentProvider } from './types'

export * from './types'

/**
 * Resolve qual provider trata o método de pagamento solicitado.
 * Cartão/assinatura → Stripe. Pix/Boleto → Asaas.
 */
export function getProvider(method: PaymentMethod): PaymentProvider {
  switch (method) {
    case 'card':
    case 'subscription':
      return stripeProvider
    case 'pix':
    case 'boleto':
      return asaasProvider
    default: {
      const _never: never = method
      throw new Error(`Método de pagamento desconhecido: ${String(_never)}`)
    }
  }
}

export { stripeProvider, asaasProvider }
