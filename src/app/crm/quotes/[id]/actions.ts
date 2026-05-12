'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function sendQuoteAction(formData: FormData) {
  const quoteId = String(formData.get('quote_id') ?? '')
  if (!quoteId) return { ok: false, error: 'quote_id_missing' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('quotes')
    .update({ status: 'enviado', sent_at: new Date().toISOString() })
    .eq('id', quoteId)
  if (error) return { ok: false, error: error.message }

  revalidatePath(`/crm/quotes/${quoteId}`)
  return { ok: true }
}

export async function acceptQuoteAction(formData: FormData) {
  const quoteId = String(formData.get('quote_id') ?? '')
  if (!quoteId) return { ok: false, error: 'quote_id_missing' }

  const supabase = await createClient()
  // Trigger DB tg_quote_accepted_automation dispara as actions configuradas
  // (update_opportunity stage=ganho + create_activity).
  const { error } = await supabase
    .from('quotes')
    .update({ status: 'aceito' })
    .eq('id', quoteId)
  if (error) return { ok: false, error: error.message }

  revalidatePath(`/crm/quotes/${quoteId}`)
  revalidatePath('/crm/leads')
  revalidatePath('/crm')
  return { ok: true }
}

export async function rejectQuoteAction(formData: FormData) {
  const quoteId = String(formData.get('quote_id') ?? '')
  if (!quoteId) return { ok: false, error: 'quote_id_missing' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('quotes').update({ status: 'recusado' }).eq('id', quoteId)
  if (error) return { ok: false, error: error.message }
  revalidatePath(`/crm/quotes/${quoteId}`)
  return { ok: true }
}

export async function generateInvoiceFromQuoteAction(formData: FormData) {
  const quoteId = String(formData.get('quote_id') ?? '')
  const dueDate = String(formData.get('due_date') ?? '') || null
  if (!quoteId) return { ok: false, error: 'quote_id_missing' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Carrega quote + items + lead → cliente
  const { data: quote, error: qerr } = await supabase
    .from('quotes')
    .select(`
      id, title, total_brl, subtotal_brl, discount_brl, lead_id,
      quote_items (label, description, quantity, unit_price_brl, position)
    `)
    .eq('id', quoteId)
    .single()
  if (qerr || !quote) return { ok: false, error: qerr?.message ?? 'quote_not_found' }

  // Procura ou cria client a partir do lead
  const { data: existingClient } = await supabase
    .from('clients').select('id').eq('lead_id', quote.lead_id).maybeSingle()

  let clientId = existingClient?.id
  if (!clientId) {
    const { data: newClient, error: prom } = await supabase
      .rpc('promote_lead_to_client', {
        p_lead_id: quote.lead_id,
        p_amount_brl: Number(quote.total_brl ?? 0),
      })
    if (prom) return { ok: false, error: prom.message }
    clientId = newClient as string
  }

  if (!clientId) return { ok: false, error: 'client_id_missing' }

  // Cria invoice + items
  const { data: invoice, error: ierr } = await supabase
    .from('invoices')
    .insert({
      client_id: clientId,
      quote_id: quote.id,
      status: 'emitida',
      issue_date: new Date().toISOString().slice(0, 10),
      due_date: dueDate,
      subtotal_brl: Number(quote.subtotal_brl ?? 0),
      discount_brl: Number(quote.discount_brl ?? 0),
      total_brl: Number(quote.total_brl ?? 0),
    })
    .select('id')
    .single()
  if (ierr || !invoice) return { ok: false, error: ierr?.message ?? 'invoice_failed' }

  const items = (quote.quote_items ?? []).map((qi: {
    label: string; description: string | null; quantity: number;
    unit_price_brl: number; position: number;
  }) => ({
    invoice_id: invoice.id,
    label: qi.label,
    description: qi.description,
    quantity: qi.quantity,
    unit_price_brl: qi.unit_price_brl,
    position: qi.position,
  }))
  if (items.length) {
    await supabase.from('invoice_items').insert(items)
  }

  await supabase.from('activities').insert({
    lead_id: quote.lead_id,
    type: 'system',
    title: `Fatura emitida: ${quote.title}`,
    body: `invoice_id=${invoice.id}`,
    author_id: user?.id ?? null,
  })

  revalidatePath(`/crm/quotes/${quoteId}`)
  revalidatePath(`/crm/clients/${clientId}`)
  redirect(`/crm/clients/${clientId}`)
}
