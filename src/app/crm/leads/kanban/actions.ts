'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

const NO_STAGE = '__none__'

export async function moveLeadStageAction(leadId: string, newStageId: string) {
  const supabase = await createClient()

  const stageIdValue = newStageId === NO_STAGE ? null : newStageId

  // Pega nome do estágio (pra activity log) e valida que existe
  let stageName = 'sem estágio'
  if (stageIdValue) {
    const { data: stage, error: stageErr } = await supabase
      .from('pipeline_stages')
      .select('name')
      .eq('id', stageIdValue)
      .single()
    if (stageErr || !stage) {
      return { ok: false, error: 'Estágio inválido.' }
    }
    stageName = stage.name
  }

  const { error } = await supabase
    .from('leads')
    .update({ stage_id: stageIdValue })
    .eq('id', leadId)
  if (error) return { ok: false, error: error.message }

  // Activity na timeline do lead
  await supabase.from('activities').insert({
    lead_id: leadId,
    type: 'stage_change',
    title: `Estágio alterado para: ${stageName}`,
  })

  revalidatePath('/crm/leads/kanban')
  revalidatePath('/crm/leads')
  revalidatePath(`/crm/leads/${leadId}`)
  revalidatePath('/crm')
  return { ok: true }
}
