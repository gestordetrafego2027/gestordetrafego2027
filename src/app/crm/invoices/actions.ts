'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { TablesInsert, TablesUpdate } from '@/types/database'

type InvoiceStatus = 'rascunho' | 'emitida' | 'paga' | 'parcial' | 'vencida' | 'cancelada'
type PaymentMethod =
  | 'pix' | 'boleto' | 'cartao_credito' | 'cartao_debito'
  | 'transferencia' | 'dinheiro' | 'outro'

function num(v: FormDataEntryValue | null): number {
  if (v === null || v === '') return 0
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function nullableStr(v: FormDataEntryValue | null): string | null {
  if (v === null) return null
  const s = String(v).trim()
  return s ? s : null
}

function bounce(path: string, error: string) {
  redirect(`${path}?error=${encodeURIComponent(error)}`)
}

// =============== INVOICE CREATE (manual) ===============

export async function createManualInvoiceAction(formData: FormData) {
  const clientId = String(formData.get('client_id') ?? '')
  if (!clientId) bounce('/crm/invoices/new', 'Selecione um cliente.')

  const issueDate = String(formData.get('issue_date') ?? '').trim() || new Date().toISOString().slice(0, 10)
  const dueDate = nullableStr(formData.get('due_date'))
  const status = (String(formData.get('status') ?? 'rascunho') as InvoiceStatus)
  const number = nullableStr(formData.get('number'))
  const notes = nullableStr(formData.get('notes'))
  const discount = num(formData.get('discount_brl'))
  const tax = num(formData.get('tax_brl'))

  // Items: campos paralelos item_label[], item_qty[], item_price[], item_desc[]
  const labels = formData.getAll('item_label').map(String)
  const qtys = formData.getAll('item_qty').map((v) => num(v))
  const prices = formData.getAll('item_price').map((v) => num(v))
  const descs = formData.getAll('item_desc').map((v) => String(v ?? ''))

  const items = labels
    .map((label, i) => ({
      label: label.trim(),
      description: (descs[i] ?? '').trim() || null,
      quantity: qtys[i] || 1,
      unit_price_brl: prices[i] || 0,
      position: i,
    }))
    .filter((it) => it.label && (it.quantity > 0 || it.unit_price_brl > 0))

  if (items.length === 0) bounce('/crm/invoices/new', 'Adicione ao menos um item.')

  const subtotal = items.reduce((acc, it) => acc + it.quantity * it.unit_price_brl, 0)
  const total = Math.max(0, subtotal - discount + tax)

  const supabase = await createClient()
  const payload: TablesInsert<'invoices'> = {
    client_id: clientId,
    issue_date: issueDate,
    due_date: dueDate,
    status,
    number,
    notes,
    subtotal_brl: subtotal,
    discount_brl: discount,
    tax_brl: tax,
    total_brl: total,
  }

  const { data: inv, error } = await supabase.from('invoices').insert(payload).select('id, client_id').single()
  if (error || !inv) bounce('/crm/invoices/new', error?.message ?? 'erro')

  // Itens
  const itemRows: TablesInsert<'invoice_items'>[] = items.map((it) => ({
    invoice_id: inv!.id,
    label: it.label,
    description: it.description,
    quantity: it.quantity,
    unit_price_brl: it.unit_price_brl,
    position: it.position,
  }))
  const { error: itemErr } = await supabase.from('invoice_items').insert(itemRows)
  if (itemErr) {
    // best-effort: deleta a invoice se falhar
    await supabase.from('invoices').delete().eq('id', inv!.id)
    bounce('/crm/invoices/new', itemErr.message)
  }

  revalidatePath('/crm/invoices')
  redirect(`/crm/invoices/${inv!.id}`)
}

// =============== FULL EDIT ===============

export async function updateInvoiceFullAction(formData: FormData) {
  const id = String(formData.get('invoice_id') ?? '')
  if (!id) redirect('/crm/invoices')

  const issueDate = String(formData.get('issue_date') ?? '').trim() || new Date().toISOString().slice(0, 10)
  const dueDate = nullableStr(formData.get('due_date'))
  const number = nullableStr(formData.get('number'))
  const notes = nullableStr(formData.get('notes'))
  const discount = num(formData.get('discount_brl'))
  const tax = num(formData.get('tax_brl'))

  // Items
  const labels = formData.getAll('item_label').map(String)
  const qtys = formData.getAll('item_qty').map((v) => num(v))
  const prices = formData.getAll('item_price').map((v) => num(v))
  const descs = formData.getAll('item_desc').map((v) => String(v ?? ''))

  const items = labels
    .map((label, i) => ({
      label: label.trim(),
      description: (descs[i] ?? '').trim() || null,
      quantity: qtys[i] || 1,
      unit_price_brl: prices[i] || 0,
      position: i,
    }))
    .filter((it) => it.label && (it.quantity > 0 || it.unit_price_brl > 0))

  if (items.length === 0) bounce(`/crm/invoices/${id}/edit`, 'Adicione ao menos um item.')

  const subtotal = items.reduce((acc, it) => acc + it.quantity * it.unit_price_brl, 0)
  const total = Math.max(0, subtotal - discount + tax)

  const supabase = await createClient()
  const patch: TablesUpdate<'invoices'> = {
    issue_date: issueDate,
    due_date: dueDate,
    number,
    notes,
    subtotal_brl: subtotal,
    discount_brl: discount,
    tax_brl: tax,
    total_brl: total,
  }
  const { error: invErr } = await supabase.from('invoices').update(patch).eq('id', id)
  if (invErr) bounce(`/crm/invoices/${id}/edit`, invErr.message)

  // Replace items: delete all, insert new
  await supabase.from('invoice_items').delete().eq('invoice_id', id)
  const itemRows: TablesInsert<'invoice_items'>[] = items.map((it) => ({
    invoice_id: id,
    label: it.label,
    description: it.description,
    quantity: it.quantity,
    unit_price_brl: it.unit_price_brl,
    position: it.position,
  }))
  const { error: itemErr } = await supabase.from('invoice_items').insert(itemRows)
  if (itemErr) bounce(`/crm/invoices/${id}/edit`, itemErr.message)

  // Recompute paid (if payments existed, status might change)
  await recomputeInvoicePaid(id)

  revalidatePath(`/crm/invoices/${id}`)
  revalidatePath('/crm/invoices')
  redirect(`/crm/invoices/${id}`)
}

// =============== STATUS / DELETE ===============

export async function updateInvoiceStatusAction(formData: FormData) {
  const id = String(formData.get('invoice_id') ?? '')
  const status = String(formData.get('status') ?? '') as InvoiceStatus
  if (!id || !status) redirect('/crm/invoices')

  const supabase = await createClient()
  const patch: TablesUpdate<'invoices'> = { status }
  const { error } = await supabase.from('invoices').update(patch).eq('id', id)
  if (error) bounce(`/crm/invoices/${id}`, error.message)

  revalidatePath(`/crm/invoices/${id}`)
  revalidatePath('/crm/invoices')
  redirect(`/crm/invoices/${id}`)
}

export async function deleteInvoiceAction(formData: FormData) {
  const id = String(formData.get('invoice_id') ?? '')
  if (!id) redirect('/crm/invoices')

  const supabase = await createClient()
  // Apaga itens + payments primeiro (defensivo)
  await supabase.from('invoice_items').delete().eq('invoice_id', id)
  await supabase.from('payments').delete().eq('invoice_id', id)
  const { error } = await supabase.from('invoices').delete().eq('id', id)
  if (error) bounce(`/crm/invoices/${id}`, error.message)

  revalidatePath('/crm/invoices')
  redirect('/crm/invoices')
}

// =============== PAYMENTS ===============

async function recomputeInvoicePaid(invoiceId: string) {
  const supabase = await createClient()
  const [{ data: pays }, { data: inv }] = await Promise.all([
    supabase.from('payments').select('amount_brl').eq('invoice_id', invoiceId),
    supabase.from('invoices').select('total_brl, status').eq('id', invoiceId).single(),
  ])
  const paid = (pays ?? []).reduce((acc, p) => acc + Number(p.amount_brl ?? 0), 0)
  let nextStatus: InvoiceStatus | undefined
  if (inv) {
    const total = Number(inv.total_brl ?? 0)
    if (paid >= total && total > 0) nextStatus = 'paga'
    else if (paid > 0 && paid < total) nextStatus = 'parcial'
    // se já estava cancelada/rascunho, não mexer
    if (inv.status === 'cancelada' || inv.status === 'rascunho') nextStatus = undefined
  }
  const patch: TablesUpdate<'invoices'> = { paid_brl: paid }
  if (nextStatus) patch.status = nextStatus
  await supabase.from('invoices').update(patch).eq('id', invoiceId)
}

export async function addPaymentAction(formData: FormData) {
  const invoiceId = String(formData.get('invoice_id') ?? '')
  if (!invoiceId) redirect('/crm/invoices')

  const amount = num(formData.get('amount_brl'))
  if (amount <= 0) bounce(`/crm/invoices/${invoiceId}`, 'Valor inválido.')

  const method = (String(formData.get('method') ?? 'pix') as PaymentMethod)
  const paidAt = String(formData.get('paid_at') ?? '').trim() || new Date().toISOString()
  const reference = nullableStr(formData.get('reference'))

  const supabase = await createClient()

  // Precisa do client_id da invoice
  const { data: inv } = await supabase
    .from('invoices')
    .select('client_id')
    .eq('id', invoiceId)
    .single()
  if (!inv) bounce(`/crm/invoices/${invoiceId}`, 'Fatura não encontrada.')

  const payload: TablesInsert<'payments'> = {
    invoice_id: invoiceId,
    client_id: inv!.client_id,
    amount_brl: amount,
    method,
    paid_at: paidAt,
    reference,
  }
  const { error } = await supabase.from('payments').insert(payload)
  if (error) bounce(`/crm/invoices/${invoiceId}`, error.message)

  await recomputeInvoicePaid(invoiceId)

  revalidatePath(`/crm/invoices/${invoiceId}`)
  revalidatePath('/crm/invoices')
  redirect(`/crm/invoices/${invoiceId}`)
}

export async function deletePaymentAction(formData: FormData) {
  const paymentId = String(formData.get('payment_id') ?? '')
  const invoiceId = String(formData.get('invoice_id') ?? '')
  if (!paymentId || !invoiceId) redirect('/crm/invoices')

  const supabase = await createClient()
  const { error } = await supabase.from('payments').delete().eq('id', paymentId)
  if (error) bounce(`/crm/invoices/${invoiceId}`, error.message)

  await recomputeInvoicePaid(invoiceId)

  revalidatePath(`/crm/invoices/${invoiceId}`)
  redirect(`/crm/invoices/${invoiceId}`)
}
