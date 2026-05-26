import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent, dispatchWebhookEvent } from '@/lib/stripe/webhook'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

// Desabilita body parsing automático do Next — precisamos do raw body
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Assinatura ausente' }, { status: 400 })
  }

  let rawBody: Buffer
  try {
    rawBody = Buffer.from(await req.arrayBuffer())
  } catch {
    return NextResponse.json({ error: 'Erro ao ler body' }, { status: 400 })
  }

  try {
    const event = await constructWebhookEvent(rawBody, sig)
    await dispatchWebhookEvent(event)
    return NextResponse.json({ received: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro desconhecido'
    logger.error({ err: msg }, 'webhook error')
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
