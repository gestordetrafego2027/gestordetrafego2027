import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createBoletoCharge } from '@/lib/asaas/boleto'

describe('asaas/boleto.createBoletoCharge', () => {
  const originalFetch = globalThis.fetch
  beforeEach(() => {
    process.env.ASAAS_API_KEY = 'test_key'
    process.env.ASAAS_ENV = 'sandbox'
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('envia billingType BOLETO, valor em reais e dueDate explícita', async () => {
    const payment = {
      id: 'pay_b',
      customer: 'cus_1',
      status: 'PENDING',
      value: 49.9,
      bankSlipUrl: 'https://x/y.pdf',
      identificationField: '12345.6789',
      barCode: '8888',
      dueDate: '2026-12-10',
    }
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(payment), { status: 200 }))
    globalThis.fetch = fetchMock as unknown as typeof fetch

    const result = await createBoletoCharge({
      customerId: 'cus_1',
      valueCents: 4990,
      dueDate: '2026-12-10',
      externalReference: 'order_y',
    })

    expect(result.bankSlipUrl).toBe('https://x/y.pdf')
    const [, init] = fetchMock.mock.calls[0]
    const body = JSON.parse(init.body)
    expect(body.billingType).toBe('BOLETO')
    expect(body.value).toBe(49.9)
    expect(body.dueDate).toBe('2026-12-10')
  })
})
