import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createManualInvoiceAction } from '../actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ client?: string; error?: string }>

export default async function NewInvoicePage({ searchParams }: { searchParams: SearchParams }) {
  const { client: preselectedClient, error } = await searchParams
  const supabase = await createClient()

  const { data: clients } = await supabase
    .from('clients')
    .select('id, display_name, unit')
    .order('display_name', { ascending: true })

  const today = new Date().toISOString().slice(0, 10)
  // due padrão = +30 dias
  const due = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

  const itemRows = 6 // até 6 linhas de item por padrão

  return (
    <div className="max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Nova fatura</h1>
        <Link href="/crm/invoices" className="text-sm text-neutral-500 hover:text-neutral-900">
          ← Voltar
        </Link>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error}
        </p>
      )}

      <form
        action={createManualInvoiceAction}
        className="space-y-4 bg-white border border-neutral-200 rounded-lg p-6"
      >
        <label className="block space-y-1">
          <span className="text-sm font-medium">Cliente *</span>
          <select
            name="client_id"
            required
            defaultValue={preselectedClient ?? ''}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm bg-white"
          >
            <option value="" disabled>Selecione…</option>
            {(clients ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.display_name} ({c.unit})
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Nº interno</span>
            <input
              name="number"
              placeholder="auto"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Status</span>
            <select
              name="status"
              defaultValue="rascunho"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm bg-white"
            >
              <option value="rascunho">rascunho</option>
              <option value="emitida">emitida</option>
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Emissão</span>
            <input
              name="issue_date"
              type="date"
              defaultValue={today}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Vencimento</span>
            <input
              name="due_date"
              type="date"
              defaultValue={due}
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
            <div className="col-span-2 text-right">Total</div>
          </div>
          {Array.from({ length: itemRows }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input
                name="item_label"
                placeholder={i === 0 ? 'Ex: Mensalidade gestão de tráfego' : ''}
                className="col-span-5 rounded border border-neutral-300 px-2 py-1 text-sm"
              />
              <input
                name="item_qty"
                type="number"
                step="1"
                min="0"
                defaultValue={i === 0 ? 1 : ''}
                className="col-span-2 rounded border border-neutral-300 px-2 py-1 text-sm text-right tabular-nums"
              />
              <input
                name="item_price"
                type="number"
                step="0.01"
                min="0"
                className="col-span-3 rounded border border-neutral-300 px-2 py-1 text-sm text-right tabular-nums"
              />
              <div className="col-span-2 text-right text-xs text-neutral-400">—</div>
              <input type="hidden" name="item_desc" value="" />
            </div>
          ))}
          <p className="text-xs text-neutral-500">
            Deixe linhas em branco onde não houver item. Total é calculado automaticamente.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Desconto R$</span>
            <input
              name="discount_brl"
              type="number"
              step="0.01"
              defaultValue={0}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Impostos R$</span>
            <input
              name="tax_brl"
              type="number"
              step="0.01"
              defaultValue={0}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Observações</span>
          <textarea
            name="notes"
            rows={3}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
          <Link
            href="/crm/invoices"
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            Criar fatura
          </button>
        </div>
      </form>
    </div>
  )
}
