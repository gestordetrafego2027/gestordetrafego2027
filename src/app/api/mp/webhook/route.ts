import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@supabase/supabase-js'
import { getPayment, mpStatusToOrderStatus } from '@/lib/academy/mp'
import type { Database } from '@/types/database'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Webhook do Mercado Pago.
 * - Loga payload cru em academy_mp_webhooks (idempotente por topic+resource_id+received_at)
 * - Quando topic=payment, busca payment no MP, mapeia status e atualiza order
 * - Trigger no banco concede matrículas quando order.status -> 'paid'
 */
export async function POST(req: Request) {
  const url = new URL(req.url)
  const topic = url.searchParams.get('topic') || url.searchParams.get('type') || 'unknown'
  const resourceQuery = url.searchParams.get('id') || url.searchParams.get('data.id')

  let payload: any = {}
  try { payload = await req.json() } catch { payload = {} }

  const resourceId =
    resourceQuery ||
    payload?.data?.id?.toString() ||
    payload?.resource?.toString() ||
    'unknown'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 })
  }
  const sb = createServerClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  // Log do webhook (idempotente por unique constraint)
  const { data: logged, error: logErr } = await sb
    .from('academy_mp_webhooks')
    .insert({
      topic,
      resource_id: resourceId,
      action: payload?.action || null,
      payload,
      processing_status: 'processing',
      processing_attempts: 1,
    })
    .select('id')
    .single()

  if (logErr) {
    // Pode ser duplicata (unique). Não trava o webhook — retornar 200 evita retry desnecessário.
    console.warn('[mp/webhook] insert log:', logErr.message)
    return NextResponse.json({ ok: true, dedup: true })
  }

  try {
    if (topic === 'payment' && resourceId !== 'unknown') {
      const payment = await getPayment(resourceId)
      const orderId =
        payment?.external_reference ||
        payment?.metadata?.order_id ||
        null
      const newStatus = mpStatusToOrderStatus(payment?.status || 'pending')

      if (orderId) {
        // Atualiza order
        await (sb.from('academy_orders') as any)
          .update({
            status: newStatus,
            mp_payment_id: payment.id?.toString(),
            payment_method: mapMpPaymentMethod(payment?.payment_method_id),
          })
          .eq('id', orderId)

        // Cria/atualiza row em academy_payments
        await (sb.from('academy_payments') as any).upsert(
          {
            order_id: orderId,
            method: mapMpPaymentMethod(payment?.payment_method_id) || 'credit_card',
            status: payment?.status || 'pending',
            amount_cents: Math.round((payment?.transaction_amount || 0) * 100),
            currency: payment?.currency_id || 'BRL',
            mp_payment_id: payment.id?.toString(),
            mp_status: payment?.status,
            mp_status_detail: payment?.status_detail,
            mp_payment_type: payment?.payment_type_id,
            installments: payment?.installments || null,
            gateway_response: payment,
            paid_at: payment?.date_approved || null,
          },
          { onConflict: 'mp_payment_id' }
        )
      }

      // Marca webhook como done
      await sb
        .from('academy_mp_webhooks')
        .update({
          processing_status: 'done',
          processed_at: new Date().toISOString(),
          order_id: orderId,
        })
        .eq('id', logged.id)
    } else {
      // Outros tópicos (merchant_order, subscription, etc.) — só ignora por ora
      await sb
        .from('academy_mp_webhooks')
        .update({ processing_status: 'ignored', processed_at: new Date().toISOString() })
        .eq('id', logged.id)
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('[mp/webhook] error:', err)
    await sb
      .from('academy_mp_webhooks')
      .update({ processing_status: 'error', error_message: String(err?.message || err) })
      .eq('id', logged.id)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

function mapMpPaymentMethod(id?: string | null): Database['public']['Enums']['academy_payment_method'] | null {
  if (!id) return null
  if (id === 'pix') return 'pix'
  if (id === 'bolbradesco' || id === 'boleto') return 'boleto'
  if (id === 'debit_card' || id?.startsWith('deb')) return 'debit_card'
  return 'credit_card'
}

// MP às vezes faz GET de healthcheck.
export async function GET() {
  return NextResponse.json({ ok: true })
}
