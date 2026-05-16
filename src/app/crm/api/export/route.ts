// CSV export endpoint protegido por sessão.
// GET /crm/api/export?entity=leads|clients|payments|quotes|invoices

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

type TableName = keyof Database['public']['Tables']

const ENTITY_QUERIES: Record<
  string,
  { table: TableName; columns: string; order?: { col: string; asc?: boolean } }
> = {
  leads: {
    table: 'leads',
    columns:
      'id,created_at,name,email,phone,city,segment,lead_type,status,source,owner_id',
    order: { col: 'created_at', asc: false },
  },
  clients: {
    table: 'clients',
    columns:
      'id,created_at,display_name,legal_name,document,email,phone,city,state,unit,status,lifetime_value_brl,last_purchase_at',
    order: { col: 'created_at', asc: false },
  },
  payments: {
    table: 'payments',
    columns:
      'id,paid_at,client_id,invoice_id,method,amount_brl,reference,received_by',
    order: { col: 'paid_at', asc: false },
  },
  quotes: {
    table: 'quotes',
    columns:
      'id,created_at,lead_id,title,status,subtotal_brl,discount_brl,total_brl,valid_until,sent_at,accepted_at',
    order: { col: 'created_at', asc: false },
  },
  invoices: {
    table: 'invoices',
    columns:
      'id,issue_date,due_date,client_id,quote_id,number,status,subtotal_brl,discount_brl,total_brl,paid_brl',
    order: { col: 'issue_date', asc: false },
  },
}

function escapeCsv(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v)
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function toCsv(rows: Record<string, unknown>[], cols: string[]): string {
  const header = cols.join(',')
  const lines = rows.map((r) => cols.map((c) => escapeCsv(r[c])).join(','))
  return [header, ...lines].join('\n')
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const entity = url.searchParams.get('entity') ?? ''
  const cfg = ENTITY_QUERIES[entity]
  if (!cfg) {
    return NextResponse.json({ error: 'invalid_entity' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  let q = supabase.from(cfg.table).select(cfg.columns).limit(10000)
  if (cfg.order) q = q.order(cfg.order.col, { ascending: cfg.order.asc ?? false })
  const { data, error } = await q
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const cols = cfg.columns.split(',').map((c) => c.trim())
  const csv = toCsv((data ?? []) as unknown as Record<string, unknown>[], cols)
  const filename = `${entity}-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
