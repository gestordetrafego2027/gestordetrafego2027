'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

type PaymentMethod =
  | 'pix' | 'boleto' | 'cartao_credito' | 'cartao_debito'
  | 'transferencia' | 'dinheiro' | 'outro'

export async function recordPaymentAction(formData: FormData) {
  const clientId = String(formData.get('client_id') ?? '')
  const invoiceId = String(formData.get('invoice_id') ?? '')
  const amount = Number(formData.get('amount_brl') ?? 0)
  const method = String(formData.get('method') ?? 'pix') as PaymentMethod
  const reference = String(formData.get('reference') ?? '').trim() || null
  const paidAt = String(formData.get('paid_at') ?? '') || new Date().toISOString()

  if (!clientId || !invoiceId || !amount || amount <= 0) {
    return { ok: false, error: 'campos_invalidos' }
  }

  const supabase = await createClient()

  // 1) registra pagamento
  const { error: payErr } = await supabase.from('payments').insert({
    client_id: clientId,
    invoice_id: invoiceId,
    amount_brl: amount,
    method,
    reference,
    paid_at: paidAt,
  })
  if (payErr) return { ok: false, error: payErr.message }

  // 2) atualiza fatura: paid_brl acumulado + status (paga/parcial)
  const { data: inv } = await supabase
    .from('invoices').select('total_brl, paid_brl, status').eq('id', invoiceId).single()
  if (inv) {
    const newPaid = Number(inv.paid_brl ?? 0) + amount
    const total = Number(inv.total_brl ?? 0)
    const newStatus = newPaid >= total ? 'paga' : newPaid > 0 ? 'parcial' : inv.status
    await supabase
      .from('invoices')
      .update({ paid_brl: newPaid, status: newStatus as never })
      .eq('id', invoiceId)
  }

  // 3) atualiza LTV do cliente
  const { data: client } = await supabase
    .from('clients').select('lifetime_value_brl').eq('id', clientId).single()
  if (client) {
    await supabase
      .from('clients')
      .update({
        lifetime_value_brl: Number(client.lifetime_value_brl ?? 0) + amount,
        last_purchase_at: new Date().toISOString(),
      })
      .eq('id', clientId)
  }

  revalidatePath(`/crm/clients/${clientId}`)
  revalidatePath('/crm/clients')
  revalidatePath('/crm')
  return { ok: true }
}
