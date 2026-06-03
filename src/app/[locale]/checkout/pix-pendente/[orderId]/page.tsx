import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/service'
import { PixPendenteClient } from './PixPendenteClient'

interface Props {
  params: Promise<{ locale: string; orderId: string }>
}

export const dynamic = 'force-dynamic'

export default async function PixPendentePage({ params }: Props) {
  const { locale, orderId } = await params
  const supabase = createServiceClient()
  const { data: order } = await supabase
    .from('store_orders')
    .select('id, order_number, total_cents, status, asaas_payment_id, metadata')
    .eq('id', orderId)
    .maybeSingle()

  if (!order || !order.asaas_payment_id) notFound()

  const asaasMeta = (order.metadata as { asaas?: Record<string, string> } | null)?.asaas
  const encodedImage = asaasMeta?.encodedImage
  const payload = asaasMeta?.payload
  const expirationDate = asaasMeta?.expirationDate

  if (!encodedImage || !payload) notFound()

  return (
    <PixPendenteClient
      locale={locale}
      orderId={order.id}
      orderNumber={order.order_number}
      paymentId={order.asaas_payment_id}
      totalCents={order.total_cents}
      encodedImage={encodedImage}
      payload={payload}
      expirationDate={expirationDate ?? null}
      initialStatus={order.status}
    />
  )
}
