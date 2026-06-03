import { NextRequest, NextResponse } from 'next/server'
import { featureFlags } from '@/lib/feature-flags'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Ctx {
  params: Promise<{ paymentId: string }>
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!featureFlags.isAsaasEnabled()) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
  const { paymentId } = await ctx.params
  if (!paymentId) {
    return NextResponse.json({ error: 'paymentId obrigatório' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('store_orders')
    .select('id, status, paid_at, order_number')
    .eq('asaas_payment_id', paymentId)
    .maybeSingle()

  if (error || !data) {
    return NextResponse.json({ status: 'unknown' }, { status: 404 })
  }

  return NextResponse.json({
    orderId: data.id,
    orderNumber: data.order_number,
    status: data.status,
    paidAt: data.paid_at,
  })
}
