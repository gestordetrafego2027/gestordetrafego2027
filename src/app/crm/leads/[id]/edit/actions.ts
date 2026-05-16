'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { TablesUpdate } from '@/types/database'

type LeadType =
  | 'aluno_curso'
  | 'afiliada'
  | 'agenciado_casting'
  | 'talento'
  | 'fornecedor'
  | 'parceiro'
  | 'cliente_agencia'
  | 'cliente_produtora'
  | 'cliente_studio'

const TALENT_TYPES = new Set<LeadType>([
  'aluno_curso',
  'afiliada',
  'agenciado_casting',
  'talento',
  'fornecedor',
  'parceiro',
])

export async function updateLeadAction(formData: FormData) {
  const id = String(formData.get('lead_id') ?? '')
  if (!id) redirect('/crm/leads')

  const name = String(formData.get('name') ?? '').trim()
  if (!name) {
    redirect(`/crm/leads/${id}/edit?error=` + encodeURIComponent('Nome é obrigatório.'))
  }

  const lead_type = String(formData.get('lead_type') ?? 'cliente_agencia') as LeadType
  const segment = TALENT_TYPES.has(lead_type) ? 'talents' : 'commercial'

  const patch: TablesUpdate<'leads'> = {
    name,
    email: String(formData.get('email') ?? '').trim() || null,
    phone: String(formData.get('phone') ?? '').trim() || null,
    city: String(formData.get('city') ?? '').trim() || null,
    source: String(formData.get('source') ?? '').trim() || null,
    notes: String(formData.get('notes') ?? '').trim() || null,
    lead_type,
    segment,
  }

  const stageRaw = String(formData.get('stage_id') ?? '').trim()
  patch.stage_id = stageRaw || null

  const supabase = await createClient()
  const { error } = await supabase.from('leads').update(patch).eq('id', id)
  if (error) {
    redirect(`/crm/leads/${id}/edit?error=` + encodeURIComponent(error.message))
  }

  // Log activity for stage change if needed (best-effort; ignore errors)
  await supabase.from('activities').insert({
    lead_id: id,
    type: 'system',
    title: 'Lead atualizado',
  })

  revalidatePath(`/crm/leads/${id}`)
  revalidatePath('/crm/leads')
  revalidatePath('/crm')
  redirect(`/crm/leads/${id}`)
}
