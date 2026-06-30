import { NextResponse, type NextRequest } from 'next/server'
import { pingLessonProgressAction } from '@/app/academy/curso/[slug]/aula/[lessonId]/actions'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Rate limit por IP — evita flood de pings de progresso.
    const rl = await checkRateLimit('api_general', getClientIp(req))
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
      )
    }

    const body = (await req.json().catch(() => null)) as {
      lesson_id?: string
      product_id?: string
      position?: number
    } | null
    if (!body?.lesson_id || !body?.product_id) {
      return NextResponse.json({ ok: false, error: 'missing_params' }, { status: 400 })
    }
    await pingLessonProgressAction(
      String(body.lesson_id),
      String(body.product_id),
      Number(body.position ?? 0),
    )
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
