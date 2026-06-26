'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

export async function promoteLeadAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const amount = Number(formData.get('amount_brl') ?? 0)
  if (!leadId) return

  const supabase = await createClient()
  const { error } = await supabase.rpc('promote_lead_to_client', {
    p_lead_id: leadId,
    p_amount_brl: amount,
  })

  if (error) {
    logger.error({ err: error }, '[promoteLeadAction]')
    return
  }
  revalidatePath('/crm/leads')
  revalidatePath('/crm/clients')
  revalidatePath('/crm/opportunities')
  revalidatePath('/crm')
}
