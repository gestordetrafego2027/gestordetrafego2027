import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const phone = String(body.phone ?? '').replace(/\D/g, '')

    if (!name || !email) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Upsert por e-mail para evitar duplicatas
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    let leadId: string

    if (existing?.id) {
      leadId = existing.id
      // Atualiza source se vier sem
      await supabase
        .from('leads')
        .update({ source: 'workshop-io-edit2-lista-espera', phone: phone || undefined })
        .eq('id', leadId)
    } else {
      const { data: lead, error: insertErr } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          phone: phone || null,
          lead_type: 'aluno_curso',
          segment: 'talents',
          source: 'workshop-io-edit2-lista-espera',
          notes: 'Lista de espera — Inside Out Edit 2 · São Paulo · Set 2026',
        })
        .select('id')
        .single()

      if (insertErr || !lead) {
        console.error('[waitlist] insert error', insertErr)
        return NextResponse.json({ error: 'Erro ao registrar. Tente novamente.' }, { status: 500 })
      }

      leadId = lead.id
    }

    // Log de atividade no CRM
    await supabase.from('activities').insert({
      lead_id: leadId,
      type: 'system',
      title: 'Entrou na lista de espera — Inside Out Edit 2',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
