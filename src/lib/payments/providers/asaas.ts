import type { PaymentProvider } from '../types'

export const asaasProvider: PaymentProvider = {
  name: 'asaas',
  supports: ['pix', 'boleto'],
}
