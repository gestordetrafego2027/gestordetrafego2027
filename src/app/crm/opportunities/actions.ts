'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

type Stage =
  | 'descoberta' | 'qualificacao' | 'proposta'
  | 'negociacao' | 'ganho' | 'perdido'

export async function moveOpportunityAction(oppId: string, newStage: Stage) {
  const supabase = await createClient()

  const closed = newStage === 'ganho' || newStage === 'perdido'
  const probability = newStage === 'ganho' ? 100 : newStage === 'perdido' ? 0 : undefined

  const update: Record<string, unknown> = { stage: newStage }
  if (closed) update.closed_at = new Date().toISOString()
  else update.closed_at = null
  if (probability !== undefined) update.probability = probability

  const { error } = await supabase.from('opportunities').update(update as never).eq('id', oppId)
  if (error) return { ok: false, error: error.message }

  // Activity na timeline do lead vinculado (se houver)
  const { data: opp } = await supabase
    .from('opportunities').select('lead_id, title').eq('id', oppId).single()
  if (opp?.lead_id) {
    await supabase.from('activities').insert({
      lead_id: opp.lead_id,
      type: 'stage_change',
      title: `Oportunidade "${opp.title}" → ${newStage}`,
    })
  }

  revalidatePath('/crm/opportunities')
  revalidatePath('/crm')
  return { ok: true }
}
