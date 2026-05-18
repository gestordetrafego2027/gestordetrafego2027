import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const STATUS_VALUES = [
  'rascunho','emitida','paga','parcial','vencida','cancelada',
] as const

const statusBadge: Record<string, string> = {
  rascunho:   'bg-neutral-100 text-neutral-700',
  emitida:    'bg-blue-100 text-blue-700',
  paga:       'bg-emerald-100 text-emerald-700',
  parcial:    'bg-amber-100 text-amber-800',
  vencida:    'bg-rose-100 text-rose-700',
  cancelada:  'bg-neutral-200 text-neutral-500',
}

type SearchParams = Promise<{ status?: string; client?: string }>

export default async function InvoicesPage({ searchParams }: { searchParams: SearchParams }) {
  const { status, client } = await searchParams
  const supabase = await createClient()

  let q = supabase
    .from('invoices')
    .select(`
      id, number, status, issue_date, due_date,
      subtotal_brl, discount_brl, tax_brl, total_brl, paid_brl,
      client_id, clients(id, display_name)
    `)
    .order('issue_date', { ascending: false })
    .limit(200)

  if (status && (STATUS_VALUES as readonly string[]).includes(status)) {
    q = q.eq('status', status as (typeof STATUS_VALUES)[number])
  }
  if (client) q = q.eq('client_id', client)

  const { data: invoices, error } = await q

  // Totais resumidos
  const totalEmitido = (invoices ?? []).reduce((acc, i) => acc + Number(i.total_brl ?? 0), 0)
  const totalPago = (invoices ?? []).reduce((acc, i) => acc + Number(i.paid_brl ?? 0), 0)
  const totalVencido = (invoices ?? [])
    .filter((i) => i.status === 'vencida')
    .reduce((acc, i) => acc + (Number(i.total_brl ?? 0) - Number(i.paid_brl ?? 0)), 0)

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Faturas</h1>
          <p className="text-sm text-neutral-500">
            {invoices?.length ?? 0} fatura{invoices?.length === 1 ? '' : 's'}.
          </p>
        </div>
        <Link
          href="/crm/invoices/new"
          className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
        >
          + Nova fatura
        </Link>
      </header>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-xs uppercase text-neutral-500">Total emitido</div>
          <div className="text-2xl font-semibold tabular-nums">{brl(totalEmitido)}</div>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs uppercase text-emerald-700">Total pago</div>
          <div className="text-2xl font-semibold tabular-nums text-emerald-700">{brl(totalPago)}</div>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
          <div className="text-xs uppercase text-rose-700">Em aberto (vencidas)</div>
          <div className="text-2xl font-semibold tabular-nums text-rose-700">{brl(totalVencido)}</div>
        </div>
      </div>

      {/* Filtros */}
      <form
        method="get"
        className="flex flex-wrap items-end gap-2 rounded-lg border border-neutral-200 bg-white p-3 text-sm"
      >
        <label className="space-y-0.5">
          <span className="block text-[10px] uppercase tracking-wide text-neutral-500">Status</span>
          <select
            name="status"
            defaultValue={status ?? ''}
            className="rounded border border-neutral-200 px-2 py-1 text-sm bg-white"
          >
            <option value="">todos</option>
            {STATUS_VALUES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded bg-neutral-900 text-white text-sm px-3 py-1 hover:bg-neutral-700"
        >
          Filtrar
        </button>
        {(status || client) && (
          <Link
            href="/crm/invoices"
            className="rounded border border-neutral-300 text-sm px-3 py-1 hover:bg-neutral-50"
          >
            Limpar
          </Link>
        )}
      </form>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error.message}
        </p>
      )}

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Nº</th>
              <th className="text-left px-4 py-2 font-medium">Cliente</th>
              <th className="text-left px-4 py-2 font-medium">Emissão</th>
              <th className="text-left px-4 py-2 font-medium">Vencimento</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-right px-4 py-2 font-medium">Total</th>
              <th className="text-right px-4 py-2 font-medium">Pago</th>
            </tr>
          </thead>
          <tbody>
            {(!invoices || invoices.length === 0) && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                  Nenhuma fatura {status ? `com status "${status}"` : 'cadastrada'}.
                </td>
              </tr>
            )}
            {(invoices ?? []).map((i) => {
              const cli = Array.isArray(i.clients) ? i.clients[0] : i.clients
              return (
                <tr key={i.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-mono text-xs">
                    <Link href={`/crm/invoices/${i.id}`} className="hover:underline">
                      {i.number ?? i.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {cli ? (
                      <Link href={`/crm/clients/${cli.id}`} className="hover:underline">
                        {cli.display_name}
                      </Link>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-500">
                    {i.issue_date ? new Date(i.issue_date).toLocaleDateString('pt-BR') : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-500">
                    {i.due_date ? new Date(i.due_date).toLocaleDateString('pt-BR') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs ${statusBadge[i.status] ?? ''}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{brl(i.total_brl)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-emerald-700">{brl(i.paid_brl)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
