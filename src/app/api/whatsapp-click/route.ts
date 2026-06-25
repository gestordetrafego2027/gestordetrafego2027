import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  let body: {
    source?: string
    location?: string
    message?: string
    utm?: Record<string, string>
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const ip = getClientIp(req)
  const userAgent = req.headers.get('user-agent') ?? null

  const supabase = createClient(url, key)
  const { error } = await supabase.from('whatsapp_clicks').insert({
    source: body.source ?? null,
    location: body.location ?? null,
    message: body.message ? body.message.slice(0, 500) : null,
    ip,
    user_agent: userAgent,
    utm: body.utm ?? {},
  })

  if (error) {
    console.error('[whatsapp-click]', error.message)
    // Não bloqueia o usuário — o clique já abriu o WA
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
