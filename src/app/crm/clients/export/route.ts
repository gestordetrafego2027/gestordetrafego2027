import { createClient } from '@/lib/supabase/server'
import { rowsToCsv, csvResponse } from '@/lib/csv'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clients')
    .select(
      'id, display_name, legal_name, document, email, phone, unit, status, lifetime_value_brl, first_purchase_at, last_purchase_at, created_at',
    )
    .order('created_at', { ascending: false })
    .limit(5000)

  if (error) return new Response(`error: ${error.message}`, { status: 500 })

  const csv = rowsToCsv(data ?? [], [
    { key: 'created_at', label: 'Criado em' },
    { key: 'display_name', label: 'Nome' },
    { key: 'legal_name', label: 'Razão social' },
    { key: 'document', label: 'CPF/CNPJ' },
    { key: 'email', label: 'E-mail' },
    { key: 'phone', label: 'Telefone' },
    { key: 'unit', label: 'Unidade' },
    { key: 'status', label: 'Status' },
    { key: 'lifetime_value_brl', label: 'LTV (BRL)' },
    { key: 'first_purchase_at', label: 'Primeira compra' },
    { key: 'last_purchase_at', label: 'Última compra' },
    { key: 'id', label: 'ID' },
  ])
  const ts = new Date().toISOString().slice(0, 10)
  return csvResponse(`clients-${ts}.csv`, csv)
}
