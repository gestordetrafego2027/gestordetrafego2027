import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Route dinâmica: client Supabase só é criado em request time,
// nunca em build time (evita "supabaseKey is required" durante build).
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Configuração do servidor ausente.' }, { status: 500 })
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { email, name, source, utm } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'E-mail obrigatório.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { email: email.toLowerCase().trim(), name: name ?? null, source: source ?? 'blog', utm: utm ?? {} },
      { onConflict: 'email', ignoreDuplicates: false }
    )

  if (error) {
    console.error('[newsletter/subscribe]', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
