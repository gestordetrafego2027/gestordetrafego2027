import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/service'
import { BoletoClient } from './BoletoClient'

interface Props {
  params: Promise<{ locale: string; orderId: string }>
}

export const dynamic = 'force-dynamic'

export default async function BoletoPage({ params }: Props) {
  const { locale, orderId } = await params
  const supabase = createServiceClient()
  const { data: order } = await supabase
    .from('store_orders')
    .select('id, order_number, total_cents, status, asaas_payment_id, metadata, buyer_email')
    .eq('id', orderId)
    .maybeSingle()

  if (!order || !order.asaas_payment_id) notFound()

  const asaasMeta = (order.metadata as { asaas?: Record<string, string> } | null)?.asaas
  const bankSlipUrl = asaasMeta?.bankSlipUrl
  const identificationField = asaasMeta?.identificationField
  const dueDate = asaasMeta?.dueDate

  if (!bankSlipUrl || !identificationField) notFound()

  return (
    <BoletoClient
      locale={locale}
      orderId={order.id}
      orderNumber={order.order_number}
      totalCents={order.total_cents}
      paymentId={order.asaas_payment_id}
      bankSlipUrl={bankSlipUrl}
      identificationField={identificationField}
      dueDate={dueDate ?? null}
      buyerEmail={order.buyer_email}
    />
  )
}
