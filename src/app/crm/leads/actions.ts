'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function promoteLeadAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const amount = Number(formData.get('amount_brl') ?? 0)
  if (!leadId) return

  const supabase = await createClient()
  const { error } = await supabase.rpc('promote_lead_to_client' as never, {
    p_lead_id: leadId,
    p_amount_brl: amount,
  } as never)

  if (error) {
    console.error('[promoteLeadAction]', error.message)
    return
  }
  revalidatePath('/crm/leads')
  revalidatePath('/crm/clients')
  revalidatePath('/crm/opportunities')
  revalidatePath('/crm')
}
