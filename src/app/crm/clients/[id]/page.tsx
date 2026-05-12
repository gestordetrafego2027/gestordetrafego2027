import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { recordPaymentAction } from './actions'

const METHODS = [
  'pix', 'boleto', 'cartao_credito', 'cartao_debito',
  'transferencia', 'dinheiro', 'outro',
] as const

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const statusBadge: Record<string, string> = {
  ativo: 'bg-emerald-100 text-emerald-700',
  inativo: 'bg-neutral-100 text-neutral-600',
  churn: 'bg-rose-100 text-rose-700',
  prospect: 'bg-amber-100 text-amber-700',
}

const invoiceStatusBadge: Record<string, string> = {
  rascunho: 'bg-neutral-100 text-neutral-600',
  emitida: 'bg-blue-100 text-blue-700',
  paga: 'bg-emerald-100 text-emerald-700',
  parcial: 'bg-amber-100 text-amber-700',
  vencida: 'bg-rose-100 text-rose-700',
  cancelada: 'bg-neutral-200 text-neutral-500',
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [
    { data: client, error: clientErr },
    { data: opps },
    { data: invoices },
    { data: payments },
    { data: lead },
  ] = await Promise.all([
    supabase.from('clients').select('*').eq('id', id).single(),
    supabase
      .from('opportunities')
      .select('id, title, stage, amount_brl, closed_at, created_at')
      .eq('client_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('invoices')
      .select('id, number, status, issue_date, due_date, total_brl, paid_brl')
      .eq('client_id', id)
      .order('issue_date', { ascending: false }),
    supabase
      .from('payments')
      .select('id, method, amount_brl, paid_at, reference')
      .eq('client_id', id)
      .order('paid_at', { ascending: false })
      .limit(20),
    supabase.from('clients').select('lead_id').eq('id', id).single().then(async (r) => {
      if (!r.data?.lead_id) return { data: null }
      return supabase.from('leads').select('id, name, email').eq('id', r.data.lead_id).single()
    }),
  ])

  if (clientErr || !client) notFound()

  const totalPago = (payments ?? []).reduce((a, p) => a + Number(p.amount_brl ?? 0), 0)
  const totalFaturado = (invoices ?? []).reduce((a, i) => a + Number(i.total_brl ?? 0), 0)
  const totalAberto = (invoices ?? []).filter(i => i.status !== 'paga' && i.status !== 'cancelada')
    .reduce((a, i) => a + (Number(i.total_brl ?? 0) - Number(i.paid_brl ?? 0)), 0)

  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href="/crm/clients" className="text-neutral-500 hover:text-neutral-900">
          ← Voltar para clientes
        </Link>
      </div>

      <header className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{client.display_name}</h1>
            {client.legal_name && (
              <div className="text-sm text-neutral-500">{client.legal_name}</div>
            )}
            <div className="mt-1 text-sm text-neutral-500 space-x-3">
              {client.email && <span>✉️ {client.email}</span>}
              {client.phone && <span>📞 {client.phone}</span>}
              {client.document && <span>🪪 {client.document}</span>}
              {client.city && <span>📍 {client.city}{client.state ? `/${client.state}` : ''}</span>}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-neutral-100 px-2 py-0.5 capitalize">{client.unit}</span>
              <span className={`rounded px-2 py-0.5 ${statusBadge[client.status] ?? ''}`}>
                {client.status}
              </span>
              {lead?.data && (
                <Link
                  href={`/crm/leads/${lead.data.id}`}
                  className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 hover:underline"
                >
                  ← lead de origem
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">LTV</div>
          <div className="text-xl font-semibold mt-1 tabular-nums">{brl(client.lifetime_value_brl)}</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Total faturado</div>
          <div className="text-xl font-semibold mt-1 tabular-nums">{brl(totalFaturado)}</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Total recebido</div>
          <div className="text-xl font-semibold mt-1 tabular-nums">{brl(totalPago)}</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Em aberto</div>
          <div className="text-xl font-semibold mt-1 tabular-nums text-rose-600">{brl(totalAberto)}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Faturas
          </h2>
          <table className="w-full text-sm">
            <thead className="text-xs text-neutral-500">
              <tr>
                <th className="text-left py-1">Nº / Emissão</th>
                <th className="text-left py-1">Status</th>
                <th className="text-right py-1">Total</th>
                <th className="text-right py-1">Pago</th>
              </tr>
            </thead>
            <tbody>
              {(invoices ?? []).map((i) => (
                <tr key={i.id} className="border-t border-neutral-100">
                  <td className="py-1">
                    <div>{i.number ?? `#${i.id.slice(0, 8)}`}</div>
                    <div className="text-xs text-neutral-500">
                      {new Date(i.issue_date).toLocaleDateString('pt-BR')}
                      {i.due_date && ` · venc. ${new Date(i.due_date).toLocaleDateString('pt-BR')}`}
                    </div>
                  </td>
                  <td className="py-1">
                    <span className={`rounded px-2 py-0.5 text-xs ${invoiceStatusBadge[i.status] ?? ''}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="py-1 text-right tabular-nums">{brl(i.total_brl)}</td>
                  <td className="py-1 text-right tabular-nums text-emerald-700">{brl(i.paid_brl)}</td>
                </tr>
              ))}
              {!invoices?.length && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-neutral-400 italic">
                    sem faturas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Pagamentos recentes
          </h2>

          {!!(invoices ?? []).filter((i) => i.status !== 'paga' && i.status !== 'cancelada').length && (
            <form action={recordPaymentAction} className="space-y-2 mb-4 border-b border-neutral-100 pb-4">
              <input type="hidden" name="client_id" value={client.id} />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label>
                  Fatura
                  <select
                    name="invoice_id"
                    required
                    className="mt-1 w-full rounded border border-neutral-200 px-2 py-1"
                  >
                    {(invoices ?? [])
                      .filter((i) => i.status !== 'paga' && i.status !== 'cancelada')
                      .map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.number ?? `#${i.id.slice(0, 6)}`} · {brl(Number(i.total_brl) - Number(i.paid_brl))} pendente
                        </option>
                      ))}
                  </select>
                </label>
                <label>
                  Valor (R$)
                  <input
                    type="number" name="amount_brl" step="0.01" min="0.01" required
                    className="mt-1 w-full rounded border border-neutral-200 px-2 py-1 tabular-nums"
                  />
                </label>
                <label>
                  Método
                  <select name="method" className="mt-1 w-full rounded border border-neutral-200 px-2 py-1">
                    {METHODS.map((m) => (
                      <option key={m} value={m}>{m.replace('_', ' ')}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Referência (Pix/NSU/…)
                  <input
                    type="text" name="reference"
                    className="mt-1 w-full rounded border border-neutral-200 px-2 py-1"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="rounded bg-emerald-600 text-white text-xs px-3 py-1 hover:bg-emerald-700"
              >
                + Registrar pagamento
              </button>
            </form>
          )}

          <ul className="space-y-2 text-sm">
            {(payments ?? []).map((p) => (
              <li key={p.id} className="flex justify-between border-l-2 border-emerald-300 pl-3">
                <div>
                  <div className="font-medium capitalize">{p.method.replace('_', ' ')}</div>
                  <div className="text-xs text-neutral-500">
                    {new Date(p.paid_at).toLocaleString('pt-BR')}
                    {p.reference && ` · ref: ${p.reference}`}
                  </div>
                </div>
                <div className="tabular-nums text-emerald-700 font-medium">
                  {brl(p.amount_brl)}
                </div>
              </li>
            ))}
            {!payments?.length && (
              <li className="text-xs text-neutral-400 italic">sem pagamentos registrados</li>
            )}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Oportunidades
        </h2>
        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1">Título</th>
              <th className="text-left py-1">Estágio</th>
              <th className="text-left py-1">Fechada em</th>
              <th className="text-right py-1">Valor</th>
            </tr>
          </thead>
          <tbody>
            {(opps ?? []).map((o) => (
              <tr key={o.id} className="border-t border-neutral-100">
                <td className="py-1 font-medium">{o.title}</td>
                <td className="py-1 capitalize">{o.stage}</td>
                <td className="py-1 text-xs text-neutral-500">
                  {o.closed_at ? new Date(o.closed_at).toLocaleDateString('pt-BR') : '—'}
                </td>
                <td className="py-1 text-right tabular-nums">{brl(o.amount_brl)}</td>
              </tr>
            ))}
            {!opps?.length && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-neutral-400 italic">
                  nenhuma oportunidade
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}
