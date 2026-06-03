import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPixCharge } from '@/lib/asaas/pix'

describe('asaas/pix.createPixCharge', () => {
  const originalFetch = globalThis.fetch
  beforeEach(() => {
    process.env.ASAAS_API_KEY = 'test_key'
    process.env.ASAAS_ENV = 'sandbox'
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('envia value em reais (não centavos) e billingType PIX', async () => {
    const payment = { id: 'pay_1', customer: 'cus_1', status: 'PENDING', value: 12.34 }
    const qr = { encodedImage: 'base64', payload: '0001', expirationDate: '2026-12-31' }
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(payment), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(qr), { status: 200 }))
    globalThis.fetch = fetchMock as unknown as typeof fetch

    const result = await createPixCharge({
      customerId: 'cus_1',
      valueCents: 1234,
      externalReference: 'order_x',
    })

    expect(result.payment.id).toBe('pay_1')
    expect(result.qrCode.payload).toBe('0001')

    const [, createInit] = fetchMock.mock.calls[0]
    const body = JSON.parse(createInit.body)
    expect(body.billingType).toBe('PIX')
    expect(body.value).toBe(12.34)
    expect(body.customer).toBe('cus_1')
    expect(body.externalReference).toBe('order_x')

    const [qrUrl] = fetchMock.mock.calls[1]
    expect(qrUrl).toContain('/payments/pay_1/pixQrCode')
  })
})
