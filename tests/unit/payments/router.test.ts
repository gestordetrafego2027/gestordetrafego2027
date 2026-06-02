import { describe, it, expect } from 'vitest'
import { getProvider } from '@/lib/payments'

describe('payments/getProvider', () => {
  it('card → stripe', () => {
    expect(getProvider('card').name).toBe('stripe')
  })
  it('subscription → stripe', () => {
    expect(getProvider('subscription').name).toBe('stripe')
  })
  it('pix → asaas', () => {
    expect(getProvider('pix').name).toBe('asaas')
  })
  it('boleto → asaas', () => {
    expect(getProvider('boleto').name).toBe('asaas')
  })
  it('provider declara o que suporta', () => {
    expect(getProvider('pix').supports).toContain('pix')
    expect(getProvider('pix').supports).toContain('boleto')
    expect(getProvider('card').supports).toContain('card')
  })
})
