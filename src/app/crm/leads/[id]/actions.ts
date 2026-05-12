'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addNoteAction(formData: FormData) {
  const leadId = String(formData.get('lead_id') ?? '')
  const body = String(formData.get('body') ?? '').trim()
  if (!leadId || !body) return { ok: false, error: 'campos_invalidos' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('notes')
    .insert({ lead_id: leadId, body, author_id: user?.id ?? null })
  if (error) return { ok: false, error: error.message }
  revalidatePath(`/crm/leads/${leadId}`)
  return { ok: true }
}

export async function updateLeadStatusAction(formData: FormData) {
  const leadId = String(formData.get('lead_id') ?? '')
  const status = String(formData.get('status') ?? '')
  if (!leadId || !status) return { ok: false, error: 'campos_invalidos' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('leads')
    .update({ status: status as never })
    .eq('id', leadId)
  if (error) return { ok: false, error: error.message }

  // Log na timeline
  await supabase.from('activities').insert({
    lead_id: leadId,
    type: 'status_change',
    title: `Status alterado para: ${status}`,
  })

  revalidatePath(`/crm/leads/${leadId}`)
  revalidatePath('/crm/leads')
  revalidatePath('/crm')
  return { ok: true }
}

export async function logActivityAction(formData: FormData) {
  const leadId = String(formData.get('lead_id') ?? '')
  const type = String(formData.get('type') ?? 'note')
  const title = String(formData.get('title') ?? '').trim()
  const bodyText = String(formData.get('body') ?? '').trim() || null
  if (!leadId || !title) return { ok: false, error: 'campos_invalidos' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase.from('activities').insert({
    lead_id: leadId,
    type: type as never,
    title,
    body: bodyText,
    author_id: user?.id ?? null,
  })
  if (error) return { ok: false, error: error.message }
  revalidatePath(`/crm/leads/${leadId}`)
  return { ok: true }
}
