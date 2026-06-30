'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

type Trigger =
  | 'lead_created'
  | 'lead_status_change'
  | 'stage_change'
  | 'quote_accepted'
  | 'invoice_overdue'
  | 'inactivity'
  | 'cron'

function parseJson(value: string, fallback: unknown): unknown {
  if (!value.trim()) return fallback
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export async function createRuleAction(formData: FormData): Promise<void> {
  const name = String(formData.get('name') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim() || null
  const trigger_type = String(formData.get('trigger_type') ?? 'lead_created') as Trigger
  const conditionsRaw = String(formData.get('conditions') ?? '{}')
  const actionsRaw = String(formData.get('actions') ?? '[]')
  const active = formData.get('active') === 'on'

  if (!name) return

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('automation_rules')
    .insert({
      name,
      description,
      trigger_type: trigger_type as never,
      conditions: parseJson(conditionsRaw, {}) as never,
      actions: parseJson(actionsRaw, []) as never,
      active,
      created_by: user?.id ?? null,
    })
    .select('id')
    .single()

  if (error || !data) {
    logger.error({ err: error }, '[createRuleAction]')
    return
  }
  revalidatePath('/crm/automations')
  redirect(`/crm/automations/${data.id}`)
}

export async function updateRuleAction(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const name = String(formData.get('name') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim() || null
  const trigger_type = String(formData.get('trigger_type') ?? 'lead_created') as Trigger
  const conditionsRaw = String(formData.get('conditions') ?? '{}')
  const actionsRaw = String(formData.get('actions') ?? '[]')
  const active = formData.get('active') === 'on'

  const supabase = await createClient()
  const { error } = await supabase
    .from('automation_rules')
    .update({
      name,
      description,
      trigger_type: trigger_type as never,
      conditions: parseJson(conditionsRaw, {}) as never,
      actions: parseJson(actionsRaw, []) as never,
      active,
    })
    .eq('id', id)
  if (error) {
    logger.error({ err: error }, '[updateRuleAction]')
    return
  }
  revalidatePath('/crm/automations')
  revalidatePath(`/crm/automations/${id}`)
}

export async function toggleRuleAction(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '')
  const active = String(formData.get('active') ?? 'false') === 'true'
  if (!id) return
  const supabase = await createClient()
  const { error } = await supabase.from('automation_rules').update({ active: !active }).eq('id', id)
  if (error) {
    logger.error({ err: error }, '[toggleRuleAction]')
    return
  }
  revalidatePath('/crm/automations')
}

export async function deleteRuleAction(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '')
  if (!id) return
  const supabase = await createClient()
  const { error } = await supabase.from('automation_rules').delete().eq('id', id)
  if (error) {
    logger.error({ err: error }, '[deleteRuleAction]')
    return
  }
  revalidatePath('/crm/automations')
  redirect('/crm/automations')
}
