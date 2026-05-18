'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { TablesInsert, Json } from '@/types/database'
import { parseAnswersFromFormData, type JsonSchema } from '../../../components/JsonSchemaForm'

function bounce(leadId: string, error: string) {
  redirect(`/crm/leads/${leadId}/interests/new?error=` + encodeURIComponent(error))
}

export async function createInterestAction(formData: FormData) {
  const leadId = String(formData.get('lead_id') ?? '')
  const serviceId = String(formData.get('service_id') ?? '')
  const packageId = String(formData.get('package_id') ?? '').trim() || null
  const addonIds = formData.getAll('addon_id').map(String).filter(Boolean)
  const priority = Number(formData.get('priority') ?? 0) || 0

  if (!leadId || !serviceId) {
    redirect('/crm/leads')
  }

  const supabase = await createClient()

  // Carrega schema para parsear answers tipadas
  const { data: service, error: svcErr } = await supabase
    .from('services')
    .select('questions_schema')
    .eq('id', serviceId)
    .single()
  if (svcErr || !service) bounce(leadId, 'Serviço não encontrado.')

  const answers = parseAnswersFromFormData(
    formData,
    (service?.questions_schema ?? {}) as JsonSchema,
  )

  const payload: TablesInsert<'lead_service_interests'> = {
    lead_id: leadId,
    service_id: serviceId,
    package_id: packageId,
    addons: addonIds as unknown as Json,
    answers: answers as unknown as Json,
    priority,
  }

  const { error } = await supabase.from('lead_service_interests').insert(payload)
  if (error) bounce(leadId, error.message)

  // Log activity
  await supabase.from('activities').insert({
    lead_id: leadId,
    type: 'system',
    title: 'Interesse de serviço registrado',
  })

  revalidatePath(`/crm/leads/${leadId}`)
  redirect(`/crm/leads/${leadId}`)
}

export async function deleteInterestAction(formData: FormData) {
  const interestId = String(formData.get('interest_id') ?? '')
  const leadId = String(formData.get('lead_id') ?? '')
  if (!interestId || !leadId) redirect('/crm/leads')

  const supabase = await createClient()
  const { error } = await supabase
    .from('lead_service_interests')
    .delete()
    .eq('id', interestId)
  if (error) {
    redirect(`/crm/leads/${leadId}?error=` + encodeURIComponent(error.message))
  }

  revalidatePath(`/crm/leads/${leadId}`)
  redirect(`/crm/leads/${leadId}`)
}
