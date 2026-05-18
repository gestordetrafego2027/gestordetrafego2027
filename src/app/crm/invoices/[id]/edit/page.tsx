import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateInvoiceFullAction } from '../../actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ error?: string }>

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function EditInvoicePage({
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
  ] = await Promise.all([
    supabase
      .from('invoices')
      .select('id, number, status, issue_date, due_date, discount_brl, tax_brl, notes, paid_brl, total_brl, client_id, clients(display_name)')
      .eq('id', id)
      .single(),
    supabase
      .from('invoice_items')
      .select('id, label, description, quantity, unit_price_brl, position')
      .eq('invoice_id', id)
      .order('position', { ascending: true }),
  ])

  if (invErr || !invoice) notFound()

  const cli = Array.isArray(invoice.clients) ? invoice.clients[0] : invoice.clients

  // Garante pelo menos 6 linhas pra edição (preenche com vazias se faltar)
  const existing = items ?? []
  const blanks = Math.max(0, 6 - existing.length)
  const rows: { label: string; description: string | null; quantity: number; unit_price_brl: number }[] = [
    ...existing.map((it) => ({
      label: it.label,
      description: it.description,
      quantity: Number(it.quantity ?? 1),
      unit_price_brl: Number(it.unit_price_brl ?? 0),
    })),
    ...Array(blanks).fill({ label: '', description: null, quantity: 0, unit_price_brl: 0 }),
  ]

  const paidWarning = Number(invoice.paid_brl ?? 0) > 0

  return (
    <div className="max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Editar fatura</h1>
          {cli && <p className="text-sm text-neutral-500">Cliente: {cli.display_name}</p>}
        </div>
        <Link
          href={`/crm/invoices/${invoice.id}`}
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          ← Voltar
        </Link>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error}
        </p>
      )}

      {paidWarning && (
        <p className="text-sm text-amber-800 border border-amber-200 bg-amber-50 rounded p-3">
          ⚠️ Esta fatura já tem pagamentos de {brl(invoice.paid_brl)}. O status será recalculado
          (pode mudar entre <code>parcial</code>/<code>paga</code>) após salvar.
        </p>
      )}

      <form
        action={updateInvoiceFullAction}
        className="space-y-4 bg-white border border-neutral-200 rounded-lg p-6"
      >
        <input type="hidden" name="invoice_id" value={invoice.id} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Nº interno</span>
            <input
              name="number"
              defaultValue={invoice.number ?? ''}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Emissão</span>
            <input
              name="issue_date"
              type="date"
              defaultValue={invoice.issue_date ?? ''}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Vencimento</span>
            <input
              name="due_date"
              type="date"
              defaultValue={invoice.due_date ?? ''}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        {/* Itens */}
        <div className="border-t border-neutral-100 pt-4 space-y-2">
          <div className="text-sm font-medium">Itens *</div>
          <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-wide text-neutral-500">
            <div className="col-span-5">Descrição</div>
            <div className="col-span-2 text-right">Qtd</div>
            <div className="col-span-3 text-right">Preço unit. R$</div>
            <div className="col-span-2 text-right">Desc.</div>
          </div>
          {rows.map((it, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input
                name="item_label"
                defaultValue={it.label}
                className="col-span-5 rounded border border-neutral-300 px-2 py-1 text-sm"
              />
              <input
                name="item_qty"
                type="number"
                step="1"
                min="0"
                defaultValue={it.quantity || ''}
                className="col-span-2 rounded border border-neutral-300 px-2 py-1 text-sm text-right tabular-nums"
              />
              <input
                name="item_price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={it.unit_price_brl || ''}
                className="col-span-3 rounded border border-neutral-300 px-2 py-1 text-sm text-right tabular-nums"
              />
              <input
                name="item_desc"
                defaultValue={it.description ?? ''}
                placeholder="—"
                className="col-span-2 rounded border border-neutral-300 px-2 py-1 text-xs"
              />
            </div>
          ))}
          <p className="text-xs text-neutral-500">
            Deixe a coluna "Descrição" em branco para remover a linha. Total é recalculado ao salvar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Desconto R$</span>
            <input
              name="discount_brl"
              type="number"
              step="0.01"
              defaultValue={invoice.discount_brl ?? 0}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Impostos R$</span>
            <input
              name="tax_brl"
              type="number"
              step="0.01"
              defaultValue={invoice.tax_brl ?? 0}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Observações</span>
          <textarea
            name="notes"
            rows={3}
            defaultValue={invoice.notes ?? ''}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
          <Link
            href={`/crm/invoices/${invoice.id}`}
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  )
}
