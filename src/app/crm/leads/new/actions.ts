'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

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

export async function createLead(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim() || null
  const phone = String(formData.get('phone') ?? '').trim() || null
  const city = String(formData.get('city') ?? '').trim() || null
  const source = String(formData.get('source') ?? '').trim() || null
  const notes = String(formData.get('notes') ?? '').trim() || null
  const lead_type = String(formData.get('lead_type') ?? 'cliente_agencia') as LeadType

  if (!name) {
    redirect('/crm/leads/new?error=' + encodeURIComponent('Nome é obrigatório.'))
  }

  const segment = TALENT_TYPES.has(lead_type) ? 'talents' : 'commercial'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.from('leads').insert({
    name,
    email,
    phone,
    city,
    source,
    notes,
    lead_type,
    segment,
    owner_id: user?.id ?? null,
  })

  if (error) {
    redirect('/crm/leads/new?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/crm/leads')
  revalidatePath('/crm')
  redirect('/crm/leads')
}
