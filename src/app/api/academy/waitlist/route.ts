import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase()
    const phone = String(body.phone ?? '').replace(/\D/g, '')
    const product = String(body.product ?? '')
      .trim()
      .slice(0, 120)

    if (!name || !email) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 })
    }
    if (!product) {
      return NextResponse.json({ error: 'Produto inválido.' }, { status: 400 })
    }

    const source = `lista-espera-${product}`
    const supabase = createServiceClient()

    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    let leadId: string

    if (existing?.id) {
      leadId = existing.id
      await supabase
        .from('leads')
        .update({ source, ...(phone ? { phone } : {}) })
        .eq('id', leadId)
    } else {
      const { data: lead, error: insertErr } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          phone: phone || null,
          lead_type: 'aluno_curso',
          segment: 'academy',
          source,
          notes: `Lista de espera — ${product}`,
        })
        .select('id')
        .single()

      if (insertErr || !lead) {
        console.error('[academy/waitlist] insert error', insertErr)
        return NextResponse.json({ error: 'Erro ao registrar. Tente novamente.' }, { status: 500 })
      }
      leadId = lead.id
    }

    await supabase.from('activities').insert({
      lead_id: leadId,
      type: 'system',
      title: `Lista de espera — ${product}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[academy/waitlist]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
