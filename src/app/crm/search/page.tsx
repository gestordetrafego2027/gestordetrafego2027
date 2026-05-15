import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Busca | CRM' }

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function buildOrFilter(q: string, fields: string[]): string {
  // Postgrest OR syntax: field1.ilike.%q%,field2.ilike.%q%
  return fields.map((f) => `${f}.ilike.%${q}%`).join(',')
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const term = q.trim()
  const supabase = await createClient()

  const [leads, clients, quotes] = term
    ? await Promise.all([
        supabase
          .from('leads')
          .select('id, name, email, phone, status, lead_type, created_at')
          .or(buildOrFilter(term, ['name', 'email', 'phone']))
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('clients')
          .select('id, display_name, email, phone, document, unit, status, lifetime_value_brl')
          .or(buildOrFilter(term, ['display_name', 'legal_name', 'email', 'phone', 'document']))
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('quotes')
          .select('id, title, status, total_brl, lead_id')
          .ilike('title', `%${term}%`)
          .order('created_at', { ascending: false })
          .limit(20),
      ])
    : [{ data: [] as never[] }, { data: [] as never[] }, { data: [] as never[] }]

  const empty =
    !leads.data?.length && !clients.data?.length && !quotes.data?.length

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Busca global</h1>
        <p className="text-sm text-neutral-500">
          {term ? <>Resultados para “<span className="font-medium">{term}</span>”</> : 'Digite no campo no topo.'}
        </p>
      </header>

      {term && empty && (
        <p className="text-sm text-neutral-500 italic">Nada encontrado.</p>
      )}

      {!!leads.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Leads ({leads.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {leads.data.map((l) => (
              <li key={l.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/leads/${l.id}`} className="font-medium hover:underline">
                    {l.name}
                  </Link>
                  <div className="text-xs text-neutral-500">
                    {l.email ?? '—'} · {l.phone ?? '—'} · {l.lead_type}
                  </div>
                </div>
                <span className="text-xs self-center rounded bg-amber-100 text-amber-900 px-2 py-0.5">
                  {l.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!!clients.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Clientes ({clients.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {clients.data.map((c) => (
              <li key={c.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/clients/${c.id}`} className="font-medium hover:underline">
                    {c.display_name}
                  </Link>
                  <div className="text-xs text-neutral-500">
                    {c.email ?? '—'} · {c.phone ?? '—'} · {c.unit} · {c.document ?? '—'}
                  </div>
                </div>
                <span className="text-xs self-center tabular-nums">
                  LTV {brl(c.lifetime_value_brl)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!!quotes.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Propostas ({quotes.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {quotes.data.map((q) => (
              <li key={q.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/quotes/${q.id}`} className="font-medium hover:underline">
                    {q.title}
                  </Link>
                  <div className="text-xs text-neutral-500">{q.status}</div>
                </div>
                <span className="text-xs self-center tabular-nums">{brl(q.total_brl)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
