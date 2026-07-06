import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

const PRODUCT_LABELS: Record<string, string> = {
  'marketing-para-modelos': 'Marketing para Modelos — Vol. 01',
  'preco-da-relevancia': 'O Preço da Relevância — Vol. 02',
  'casos-da-producao': 'Inside Out — Vol. 03',
  'briefing-mal-passado': 'Briefing Mal Passado — Vol. 03',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase()
    const phone = String(body.phone ?? '').replace(/\D/g, '')
    const product = String(body.product ?? '').trim()

    if (!name || !email) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 })
    }
    if (!PRODUCT_LABELS[product]) {
      return NextResponse.json({ error: 'Produto inválido.' }, { status: 400 })
    }

    const source = `academy-livro-${product}-lista-espera`
    const label = PRODUCT_LABELS[product]
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
        .update({ source, phone: phone || undefined })
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
          notes: `Lista de espera — ${label}`,
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
      title: `Entrou na lista de espera — ${label}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[academy/waitlist]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
