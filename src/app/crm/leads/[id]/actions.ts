'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addNoteAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const body = String(formData.get('body') ?? '').trim()
  if (!leadId || !body) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('notes')
    .insert({ lead_id: leadId, body, author_id: user?.id ?? null })
  if (error) {
    console.error('[addNoteAction]', error.message)
    return
  }
  revalidatePath(`/crm/leads/${leadId}`)
}

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const status = String(formData.get('status') ?? '')
  if (!leadId || !status) return

  const supabase = await createClient()
  const { error } = await supabase
    .from('leads')
    .update({ status: status as never })
    .eq('id', leadId)
  if (error) {
    console.error('[updateLeadStatusAction]', error.message)
    return
  }

  await supabase.from('activities').insert({
    lead_id: leadId,
    type: 'status_change',
    title: `Status alterado para: ${status}`,
  })

  revalidatePath(`/crm/leads/${leadId}`)
  revalidatePath('/crm/leads')
  revalidatePath('/crm')
}

export async function attachTagAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const tagId = String(formData.get('tag_id') ?? '')
  if (!leadId || !tagId) return

  const supabase = await createClient()
  const { error } = await supabase
    .from('lead_tags')
    .insert({ lead_id: leadId, tag_id: tagId })
  if (error && !error.message.includes('duplicate')) {
    console.error('[attachTagAction]', error.message)
    return
  }
  revalidatePath(`/crm/leads/${leadId}`)
  revalidatePath('/crm/leads')
}

export async function detachTagAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const tagId = String(formData.get('tag_id') ?? '')
  if (!leadId || !tagId) return

  const supabase = await createClient()
  const { error } = await supabase
    .from('lead_tags')
    .delete()
    .eq('lead_id', leadId)
    .eq('tag_id', tagId)
  if (error) {
    console.error('[detachTagAction]', error.message)
    return
  }
  revalidatePath(`/crm/leads/${leadId}`)
  revalidatePath('/crm/leads')
}

export async function logActivityAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const type = String(formData.get('type') ?? 'note')
  const title = String(formData.get('title') ?? '').trim()
  const bodyText = String(formData.get('body') ?? '').trim() || null
  if (!leadId || !title) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase.from('activities').insert({
    lead_id: leadId,
    type: type as never,
    title,
    body: bodyText,
    author_id: user?.id ?? null,
  })
  if (error) {
    console.error('[logActivityAction]', error.message)
    return
  }
  revalidatePath(`/crm/leads/${leadId}`)
}
