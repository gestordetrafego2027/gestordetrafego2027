import { describe, it, expect, vi } from 'vitest'
import { dispatchAsaasEvent } from '@/lib/asaas/webhook/handlers'

// Mock do resend para evitar I/O em testes
vi.mock('@/lib/email/resend', () => ({
  sendEmail: vi.fn().mockResolvedValue({ ok: true }),
}))

function makeSupabaseMock(orderRow: Record<string, unknown> | null) {
  const updateCalls: Array<Record<string, unknown>> = []

  // Encadeamento: .from().select().eq().maybeSingle()  e  .from().update().eq()
  const builder: any = {
    select: () => builder,
    eq: () => builder,
    maybeSingle: vi.fn().mockResolvedValue({ data: orderRow, error: null }),
    update: (patch: Record<string, unknown>) => {
      updateCalls.push(patch)
      return { eq: () => Promise.resolve({ data: null, error: null }) }
    },
  }
  const supabase: any = { from: () => builder, _updateCalls: updateCalls }
  return supabase
}

describe('asaas/webhook/handlers.dispatchAsaasEvent', () => {
  it('PAYMENT_CONFIRMED → status paid + paid_at', async () => {
    const supabase = makeSupabaseMock({
      id: 'o1',
      status: 'pending',
      buyer_email: 'x@y.com',
      total_cents: 100,
      order_number: 'ORD-1',
    })
    const handled = await dispatchAsaasEvent('PAYMENT_CONFIRMED', {
      supabase,
      payment: { id: 'pay_1' },
    })
    expect(handled).toBe(true)
    expect(supabase._updateCalls[0]).toMatchObject({ status: 'paid' })
    expect(supabase._updateCalls[0].paid_at).toBeTruthy()
  })

  it('PAYMENT_RECEIVED é tratado como confirmação', async () => {
    const supabase = makeSupabaseMock({
      id: 'o1',
      status: 'pending',
      buyer_email: 'x@y.com',
      total_cents: 100,
      order_number: 'ORD-1',
    })
    await dispatchAsaasEvent('PAYMENT_RECEIVED', {
      supabase,
      payment: { id: 'pay_1' },
    })
    expect(supabase._updateCalls[0]).toMatchObject({ status: 'paid' })
  })

  it('PAYMENT_CONFIRMED idempotente quando já paid (não atualiza)', async () => {
    const supabase = makeSupabaseMock({
      id: 'o1',
      status: 'paid',
      buyer_email: 'x@y.com',
      total_cents: 100,
      order_number: 'ORD-1',
    })
    await dispatchAsaasEvent('PAYMENT_CONFIRMED', {
      supabase,
      payment: { id: 'pay_1' },
    })
    expect(supabase._updateCalls).toHaveLength(0)
  })

  it('PAYMENT_REFUNDED → status refunded', async () => {
    const supabase = makeSupabaseMock({
      id: 'o1',
      status: 'paid',
      buyer_email: 'x@y.com',
      total_cents: 100,
      order_number: 'ORD-1',
    })
    await dispatchAsaasEvent('PAYMENT_REFUNDED', {
      supabase,
      payment: { id: 'pay_1' },
    })
    expect(supabase._updateCalls[0]).toMatchObject({ status: 'refunded' })
  })

  it('PAYMENT_DELETED → status cancelled', async () => {
    const supabase = makeSupabaseMock({
      id: 'o1',
      status: 'pending',
      buyer_email: 'x@y.com',
      total_cents: 100,
      order_number: 'ORD-1',
    })
    await dispatchAsaasEvent('PAYMENT_DELETED', {
      supabase,
      payment: { id: 'pay_1' },
    })
    expect(supabase._updateCalls[0]).toMatchObject({ status: 'cancelled' })
  })

  it('PAYMENT_OVERDUE → status failed', async () => {
    const supabase = makeSupabaseMock({
      id: 'o1',
      status: 'pending',
      buyer_email: 'x@y.com',
      total_cents: 100,
      order_number: 'ORD-1',
    })
    await dispatchAsaasEvent('PAYMENT_OVERDUE', {
      supabase,
      payment: { id: 'pay_1' },
    })
    expect(supabase._updateCalls[0]).toMatchObject({ status: 'failed' })
  })

  it('evento desconhecido → false', async () => {
    const supabase = makeSupabaseMock(null)
    const handled = await dispatchAsaasEvent('PAYMENT_AUTHORIZED', {
      supabase,
      payment: { id: 'pay_1' },
    })
    expect(handled).toBe(false)
  })
})
