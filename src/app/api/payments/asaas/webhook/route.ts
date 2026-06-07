import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { logger } from '@/lib/logger'
import { createServiceClient } from '@/lib/supabase/service'
import { featureFlags } from '@/lib/feature-flags'
import { AsaasWebhookEventSchema } from '@/lib/asaas/schemas'
import { dispatchAsaasEvent } from '@/lib/asaas/webhook/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export async function POST(req: NextRequest) {
  const log = logger.child({ route: 'POST /api/payments/asaas/webhook' })

  if (!featureFlags.isAsaasEnabled()) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const expected = process.env.ASAAS_WEBHOOK_TOKEN
  if (!expected) {
    log.error('ASAAS_WEBHOOK_TOKEN não configurado')
    return NextResponse.json({ error: 'misconfigured' }, { status: 500 })
  }

  const provided = req.headers.get('asaas-access-token') ?? ''
  if (!safeEqual(provided, expected)) {
    log.warn('token inválido')
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const parsed = AsaasWebhookEventSchema.safeParse(raw)
  if (!parsed.success) {
    log.warn({ err: parsed.error.flatten() }, 'payload inválido')
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }
  const event = parsed.data
  // Asaas pode mandar id como undefined no sandbox; usa fallback determinístico
  // Prefixo asaas: evita colisão com event_ids de outros providers na tabela compartilhada
  const eventId = `asaas:${
    event.id ?? `${event.event}-${event.payment?.id ?? 'unknown'}-${event.dateCreated ?? ''}`
  }`

  const supabase = createServiceClient()

  // Dedupe (tabela compartilhada store_webhook_events)
  const { error: insertErr } = await supabase
    .from('store_webhook_events')
    .insert({ event_id: eventId, event_type: event.event, payload: raw })

  if (insertErr) {
    // 23505 = unique_violation → já processado
    if ((insertErr as { code?: string }).code === '23505') {
      log.info({ eventId }, 'evento duplicado — ignorado')
      return NextResponse.json({ received: true, deduped: true })
    }
    log.error({ err: insertErr }, 'erro ao gravar webhook event')
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  try {
    await dispatchAsaasEvent(event.event, {
      supabase,
      payment: event.payment ?? {},
    })
  } catch (err) {
    log.error({ err: String(err) }, 'falha ao processar evento')
    // 2xx mesmo assim para o Asaas não reenviar infinitamente; investigar via log
    return NextResponse.json({ received: true, processed: false })
  }

  return NextResponse.json({ received: true })
}
