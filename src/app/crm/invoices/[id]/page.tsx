import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  updateInvoiceStatusAction, deleteInvoiceAction,
  addPaymentAction, deletePaymentAction,
} from '../actions'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const statusBadge: Record<string, string> = {
  rascunho:   'bg-neutral-100 text-neutral-700',
  emitida:    'bg-blue-100 text-blue-700',
  paga:       'bg-emerald-100 text-emerald-700',
  parcial:    'bg-amber-100 text-amber-800',
  vencida:    'bg-rose-100 text-rose-700',
  cancelada:  'bg-neutral-200 text-neutral-500',
}

const STATUS_VALUES = [
  'rascunho','emitida','paga','parcial','vencida','cancelada',
] as const

const METHODS = [
  'pix', 'boleto', 'cartao_credito', 'cartao_debito',
  'transferencia', 'dinheiro', 'outro',
] as const

type SearchParams = Promise<{ error?: string }>

export default async function InvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: SearchParams
}) {
  const { id } = await params
  const { error } = await searchParams
  const supabase = await createClient()

  const [
    { data: invoice, error: invErr },
    { data: items },
    { data: payments },
  ] = await Promise.all([
    supabase
      .from('invoices')
      .select(`
        id, number, status, issue_date, due_date,
        subtotal_brl, discount_brl, tax_brl, total_brl, paid_brl,
        notes, quote_id,
        client_id, clients(id, display_name, email, phone, unit)
      `)
      .eq('id', id)
      .single(),
    supabase
      .from('invoice_items')
      .select('id, label, description, quantity, unit_price_brl, total_brl, position')
      .eq('invoice_id', id)
      .order('position', { ascending: true }),
    supabase
      .from('payments')
      .select('id, amount_brl, method, paid_at, reference')
      .eq('invoice_id', id)
      .order('paid_at', { ascending: false }),
  ])

  if (invErr || !invoice) notFound()

  const cli = Array.isArray(invoice.clients) ? invoice.clients[0] : invoice.clients
  const totalDue = Number(invoice.total_brl ?? 0) - Number(invoice.paid_brl ?? 0)
  const today = new Date().toISOString().slice(0, 16)

  return (
    <div className="space-y-6">
      <div className="text-xs flex items-center justify-between">
        <Link href="/crm/invoices" className="text-neutral-500 hover:text-neutral-900">
          ← Voltar para faturas
        </Link>
        {cli && (
          <Link href={`/crm/clients/${cli.id}`} className="text-neutral-500 hover:text-neutral-900">
            Cliente: {cli.display_name} →
          </Link>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error}
        </p>
      )}

      <header className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Fatura {invoice.number ?? invoice.id.slice(0, 8)}
            </h1>
            {cli && (
              <div className="mt-1 text-sm text-neutral-500">
                {cli.display_name}
                {cli.email && ` · ✉️ ${cli.email}`}
                {cli.phone && ` · 📞 ${cli.phone}`}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className={`rounded px-2 py-0.5 ${statusBadge[invoice.status] ?? ''}`}>
                {invoice.status}
              </span>
              {invoice.issue_date && (
                <span className="rounded bg-neutral-100 px-2 py-0.5">
                  emitida em {new Date(invoice.issue_date).toLocaleDateString('pt-BR')}
                </span>
              )}
              {invoice.due_date && (
                <span className="rounded bg-neutral-100 px-2 py-0.5">
                  vence em {new Date(invoice.due_date).toLocaleDateString('pt-BR')}
                </span>
              )}
              {invoice.quote_id && (
                <Link
                  href={`/crm/quotes/${invoice.quote_id}`}
                  className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 hover:underline"
                >
                  ← origem em proposta
                </Link>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase text-neutral-500">Total</div>
            <div className="text-3xl font-semibold tabular-nums">{brl(invoice.total_brl)}</div>
            <div className="text-xs text-neutral-500 mt-1">
              pago: <span className="text-emerald-700 tabular-nums">{brl(invoice.paid_brl)}</span>
            </div>
            <div className="text-xs text-neutral-500">
              em aberto: <span className={`tabular-nums ${totalDue > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>{brl(totalDue)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Itens */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Itens
        </h2>
        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1">Descrição</th>
              <th className="text-right py-1">Qtd</th>
              <th className="text-right py-1">Unit.</th>
              <th className="text-right py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {(items ?? []).map((it) => (
              <tr key={it.id} className="border-t border-neutral-100">
                <td className="py-1">
                  <div className="font-medium">{it.label}</div>
                  {it.description && (
                    <div className="text-xs text-neutral-500">{it.description}</div>
                  )}
                </td>
                <td className="py-1 text-right tabular-nums">{it.quantity}</td>
                <td className="py-1 text-right tabular-nums">{brl(it.unit_price_brl)}</td>
                <td className="py-1 text-right tabular-nums">{brl(it.total_brl)}</td>
              </tr>
            ))}
            {(items ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-neutral-400 italic">Sem itens</td>
              </tr>
            )}
          </tbody>
          <tfoot className="border-t-2 border-neutral-200">
            <tr>
              <td colSpan={3} className="py-1 text-right text-xs text-neutral-500">Subtotal</td>
              <td className="py-1 text-right tabular-nums">{brl(invoice.subtotal_brl)}</td>
            </tr>
            {Number(invoice.discount_brl ?? 0) > 0 && (
              <tr>
                <td colSpan={3} className="py-1 text-right text-xs text-neutral-500">Desconto</td>
                <td className="py-1 text-right tabular-nums text-rose-600">- {brl(invoice.discount_brl)}</td>
              </tr>
            )}
            {Number(invoice.tax_brl ?? 0) > 0 && (
              <tr>
                <td colSpan={3} className="py-1 text-right text-xs text-neutral-500">Impostos</td>
                <td className="py-1 text-right tabular-nums">{brl(invoice.tax_brl)}</td>
              </tr>
            )}
            <tr>
              <td colSpan={3} className="py-1 text-right text-sm font-semibold">Total</td>
              <td className="py-1 text-right tabular-nums font-semibold">{brl(invoice.total_brl)}</td>
            </tr>
          </tfoot>
        </table>
        {invoice.notes && (
          <div className="mt-4 text-xs text-neutral-600 border-l-2 border-neutral-200 pl-3">
            <div className="uppercase tracking-wide text-neutral-500 mb-1">Observações</div>
            <div className="whitespace-pre-wrap">{invoice.notes}</div>
          </div>
        )}
      </section>

      {/* Payments */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Pagamentos ({payments?.length ?? 0})
        </h2>

        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1">Data</th>
              <th className="text-left py-1">Método</th>
              <th className="text-left py-1">Referência</th>
              <th className="text-right py-1">Valor</th>
              <th className="text-right py-1">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(payments ?? []).map((p) => (
              <tr key={p.id} className="border-t border-neutral-100">
                <td className="py-2 text-xs text-neutral-600">
                  {new Date(p.paid_at).toLocaleString('pt-BR')}
                </td>
                <td className="py-2 text-xs capitalize">{p.method}</td>
                <td className="py-2 text-xs text-neutral-500 font-mono">{p.reference ?? '—'}</td>
                <td className="py-2 text-right tabular-nums text-emerald-700 font-medium">{brl(p.amount_brl)}</td>
                <td className="py-2 text-right">
                  <form action={deletePaymentAction} className="inline">
                    <input type="hidden" name="payment_id" value={p.id} />
                    <input type="hidden" name="invoice_id" value={invoice.id} />
                    <button className="text-xs text-rose-600 hover:underline">excluir</button>
                  </form>
                </td>
              </tr>
            ))}
            {(payments ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="py-3 text-center text-neutral-400 italic text-xs">
                  Nenhum pagamento registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Form de pagamento */}
        {invoice.status !== 'cancelada' && totalDue > 0 && (
          <form
            action={addPaymentAction}
            className="border-t border-neutral-100 pt-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-end"
          >
            <input type="hidden" name="invoice_id" value={invoice.id} />

            <label className="md:col-span-3 space-y-0.5">
              <span className="block text-[10px] uppercase text-neutral-500">Valor *</span>
              <input
                name="amount_brl"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={totalDue.toFixed(2)}
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm tabular-nums"
              />
            </label>
            <label className="md:col-span-3 space-y-0.5">
              <span className="block text-[10px] uppercase text-neutral-500">Método</span>
              <select
                name="method"
                defaultValue="pix"
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm bg-white"
              >
                {METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="md:col-span-3 space-y-0.5">
              <span className="block text-[10px] uppercase text-neutral-500">Data/hora</span>
              <input
                name="paid_at"
                type="datetime-local"
                defaultValue={today}
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
              />
            </label>
            <label className="md:col-span-2 space-y-0.5">
              <span className="block text-[10px] uppercase text-neutral-500">Referência</span>
              <input
                name="reference"
                placeholder="opcional"
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
              />
            </label>
            <div className="md:col-span-1">
              <button
                type="submit"
                className="w-full rounded bg-emerald-600 text-white text-xs px-2 py-1 hover:bg-emerald-700"
              >
                +
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Ações */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Ações
        </h2>
        <div className="flex flex-wrap gap-3 items-end">
          <form action={updateInvoiceStatusAction} className="flex gap-1 items-end">
            <input type="hidden" name="invoice_id" value={invoice.id} />
            <label className="space-y-0.5">
              <span className="block text-[10px] uppercase text-neutral-500">Alterar status</span>
              <select
                name="status"
                defaultValue={invoice.status}
                className="rounded border border-neutral-300 px-2 py-1 text-sm bg-white"
              >
                {STATUS_VALUES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <button className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700">
              Salvar
            </button>
          </form>

          <Link
            href={`/crm/invoices/${invoice.id}/edit`}
            className="rounded border border-neutral-300 text-xs px-3 py-1 hover:bg-neutral-50"
          >
            ✎ Editar itens
          </Link>

          <form action={deleteInvoiceAction}>
            <input type="hidden" name="invoice_id" value={invoice.id} />
            <button className="rounded border border-rose-300 text-rose-700 text-xs px-3 py-1 hover:bg-rose-50">
              Excluir fatura
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
