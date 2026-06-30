import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Propostas | CRM' }

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const STATUS_OPTIONS = ['todos', 'rascunho', 'enviado', 'aceito', 'recusado', 'expirado'] as const

const statusBadge: Record<string, string> = {
  rascunho: 'bg-neutral-100 text-neutral-700',
  enviado: 'bg-blue-100 text-blue-700',
  aceito: 'bg-emerald-100 text-emerald-700',
  recusado: 'bg-rose-100 text-rose-700',
  expirado: 'bg-amber-100 text-amber-800',
}

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status: filter } = await searchParams
  const supabase = await createClient()

  let q = supabase
    .from('quotes')
    .select(
      `
      id, title, status, total_brl, valid_until, sent_at, accepted_at, created_at,
      leads(id, name)
    `,
    )
    .order('created_at', { ascending: false })
    .limit(100)

  if (filter && filter !== 'todos' && STATUS_OPTIONS.includes(filter as never)) {
    q = q.eq('status', filter as 'rascunho' | 'enviado' | 'aceito' | 'recusado' | 'expirado')
  }

  const { data: quotes, error } = await q

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Propostas</h1>
          <p className="text-sm text-neutral-500">Últimas 100, filtrável por status.</p>
        </div>
        <a
          href="/crm/api/export?entity=quotes"
          className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
        >
          ↓ CSV
        </a>
        <nav className="flex gap-1 text-xs">
          {STATUS_OPTIONS.map((s) => {
            const active = (filter ?? 'todos') === s
            const href = s === 'todos' ? '/crm/quotes' : `/crm/quotes?status=${s}`
            return (
              <Link
                key={s}
                href={href}
                className={`rounded px-2 py-1 capitalize ${
                  active
                    ? 'bg-neutral-900 text-white'
                    : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {s}
              </Link>
            )
          })}
        </nav>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error.message}
        </p>
      )}

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2">Proposta</th>
              <th className="text-left px-4 py-2">Lead</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Validade</th>
              <th className="text-right px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {(quotes ?? []).map((q) => {
              const lead = q.leads as unknown as { id: string; name: string } | null
              return (
                <tr key={q.id} className="border-t border-neutral-100">
                  <td className="px-4 py-2">
                    <Link href={`/crm/quotes/${q.id}`} className="font-medium hover:underline">
                      {q.title}
                    </Link>
                    <div className="text-xs text-neutral-400">
                      {new Date(q.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-neutral-600">
                    {lead ? (
                      <Link href={`/crm/leads/${lead.id}`} className="hover:underline">
                        {lead.name}
                      </Link>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`rounded px-2 py-0.5 text-xs ${statusBadge[q.status] ?? ''}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-neutral-500">
                    {q.valid_until ? new Date(q.valid_until).toLocaleDateString('pt-BR') : '—'}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">{brl(q.total_brl)}</td>
                </tr>
              )
            })}
            {!quotes?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Nenhuma proposta {filter && filter !== 'todos' ? `com status "${filter}"` : ''}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
