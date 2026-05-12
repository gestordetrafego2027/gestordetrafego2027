'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createQuoteAction(formData: FormData): Promise<void> {
  const leadId = String(formData.get('lead_id') ?? '')
  const title = String(formData.get('title') ?? '').trim() || 'Proposta'
  const validUntil = String(formData.get('valid_until') ?? '') || null
  const notes = String(formData.get('notes') ?? '').trim() || null
  const discount = Number(formData.get('discount_brl') ?? 0) || 0
  const packageIds = formData.getAll('package_id').map(String).filter(Boolean)
  const addonIds = formData.getAll('addon_id').map(String).filter(Boolean)

  if (!leadId) return
  if (!packageIds.length && !addonIds.length) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Busca os preços e nomes do catálogo
  const [{ data: packages }, { data: addons }] = await Promise.all([
    packageIds.length
      ? supabase
          .from('service_packages')
          .select('id, name, price_brl, services(name)')
          .in('id', packageIds)
      : Promise.resolve({ data: [] }),
    addonIds.length
      ? supabase.from('service_addons').select('id, name, price_brl').in('id', addonIds)
      : Promise.resolve({ data: [] }),
  ])

  type Item = {
    kind: 'package' | 'addon'
    reference_id: string
    label: string
    description: string | null
    unit_price_brl: number
    quantity: number
    position: number
  }

  const items: Item[] = []
  ;(packages ?? []).forEach((p: { id: string; name: string; price_brl: number | null; services: { name: string } | { name: string }[] | null }, i: number) => {
    const svc = Array.isArray(p.services) ? p.services[0] : p.services
    items.push({
      kind: 'package',
      reference_id: p.id,
      label: `${svc?.name ?? 'Serviço'} — ${p.name}`,
      description: null,
      unit_price_brl: Number(p.price_brl ?? 0),
      quantity: 1,
      position: i,
    })
  })
  ;(addons ?? []).forEach((a, i) => {
    items.push({
      kind: 'addon',
      reference_id: a.id,
      label: a.name,
      description: null,
      unit_price_brl: Number(a.price_brl ?? 0),
      quantity: 1,
      position: items.length + i,
    })
  })

  const subtotal = items.reduce((acc, it) => acc + it.quantity * it.unit_price_brl, 0)
  const total = Math.max(0, subtotal - discount)

  const { data: quote, error: quoteErr } = await supabase
    .from('quotes')
    .insert({
      lead_id: leadId,
      owner_id: user?.id ?? null,
      title,
      notes,
      subtotal_brl: subtotal,
      discount_brl: discount,
      total_brl: total,
      valid_until: validUntil,
      status: 'rascunho',
    })
    .select('id')
    .single()

  if (quoteErr || !quote) { console.error('[createQuoteAction]', quoteErr?.message); return }

  const { error: itemsErr } = await supabase
    .from('quote_items')
    .insert(items.map((it) => ({ ...it, quote_id: quote.id })))
  if (itemsErr) { console.error('[createQuoteAction]', itemsErr.message); return }

  await supabase.from('activities').insert({
    lead_id: leadId,
    type: 'quote_sent',
    title: `Proposta criada: ${title}`,
    body: `Total: R$ ${total.toFixed(2)}`,
    author_id: user?.id ?? null,
  })

  revalidatePath(`/crm/leads/${leadId}`)
  redirect(`/crm/leads/${leadId}`)
}
