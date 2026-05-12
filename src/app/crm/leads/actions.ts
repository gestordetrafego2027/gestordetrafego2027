'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function promoteLeadAction(formData: FormData) {
  const leadId = String(formData.get('lead_id') ?? '')
  const amount = Number(formData.get('amount_brl') ?? 0)
  if (!leadId) return { ok: false, error: 'lead_id_missing' }

  const supabase = await createClient()
  const { data, error } = await supabase.rpc('promote_lead_to_client', {
    p_lead_id: leadId,
    p_amount_brl: amount,
  })

  if (error) return { ok: false, error: error.message }
  revalidatePath('/crm/leads')
  revalidatePath('/crm/clients')
  revalidatePath('/crm/opportunities')
  revalidatePath('/crm')
  return { ok: true, client_id: data as string }
}
