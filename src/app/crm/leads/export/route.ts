import { createClient } from '@/lib/supabase/server'
import { rowsToCsv, csvResponse } from '@/lib/csv'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('id, name, email, phone, city, segment, lead_type, status, source, created_at')
    .order('created_at', { ascending: false })
    .limit(5000)

  if (error) return new Response(`error: ${error.message}`, { status: 500 })

  const csv = rowsToCsv(data ?? [], [
    { key: 'created_at', label: 'Criado em' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'phone', label: 'Telefone' },
    { key: 'city', label: 'Cidade' },
    { key: 'segment', label: 'Segmento' },
    { key: 'lead_type', label: 'Tipo' },
    { key: 'status', label: 'Status' },
    { key: 'source', label: 'Origem' },
    { key: 'id', label: 'ID' },
  ])
  const ts = new Date().toISOString().slice(0, 10)
  return csvResponse(`leads-${ts}.csv`, csv)
}
