import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  sendQuoteAction, acceptQuoteAction, rejectQuoteAction,
  generateInvoiceFromQuoteAction,
} from './actions'
import CopyLinkButton from './CopyLinkButton'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const statusBadge: Record<string, string> = {
  rascunho: 'bg-neutral-100 text-neutral-700',
  enviado: 'bg-blue-100 text-blue-700',
  aceito: 'bg-emerald-100 text-emerald-700',
  recusado: 'bg-rose-100 text-rose-700',
  expirado: 'bg-amber-100 text-amber-800',
}

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: quote, error } = await supabase
    .from('quotes')
    .select(`
      id, title, status, notes, subtotal_brl, discount_brl, total_brl,
      valid_until, sent_at, accepted_at, created_at, lead_id, public_token,
      leads (id, name, email, phone),
      quote_items (id, kind, label, description, quantity, unit_price_brl, total_brl, position)
    `)
    .eq('id', id)
    .single()

  if (error || !quote) notFound()

  const lead = quote.leads as unknown as { id: string; name: string; email: string | null; phone: string | null } | null
  const items = (quote.quote_items ?? [])
    .slice()
    .sort((a: { position: number }, b: { position: number }) => a.position - b.position)

  const { data: invoice } = await supabase
    .from('invoices').select('id, status, total_brl').eq('quote_id', id).maybeSingle()

  return (
    <div className="space-y-6">
      <div className="text-xs flex justify-between">
        {lead ? (
          <Link href={`/crm/leads/${lead.id}`} className="text-neutral-500 hover:text-neutral-900">
            ← Voltar para o lead
          </Link>
        ) : <span />}
      </div>

      <header className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{quote.title}</h1>
            {lead && (
              <div className="mt-1 text-sm text-neutral-500">
                Lead: <Link href={`/crm/leads/${lead.id}`} className="hover:underline font-medium">{lead.name}</Link>
                {lead.email && <span> · ✉️ {lead.email}</span>}
                {lead.phone && <span> · 📞 {lead.phone}</span>}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className={`rounded px-2 py-0.5 ${statusBadge[quote.status] ?? ''}`}>
                {quote.status}
              </span>
              {quote.valid_until && (
                <span className="rounded bg-neutral-100 px-2 py-0.5">
                  válida até {new Date(quote.valid_until).toLocaleDateString('pt-BR')}
                </span>
              )}
              {quote.sent_at && (
                <span className="rounded bg-neutral-100 px-2 py-0.5">
                  enviada em {new Date(quote.sent_at).toLocaleDateString('pt-BR')}
                </span>
              )}
              {quote.accepted_at && (
                <span className="rounded bg-emerald-50 text-emerald-700 px-2 py-0.5">
                  aceita em {new Date(quote.accepted_at).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase text-neutral-500">Total</div>
            <div className="text-3xl font-semibold tabular-nums">{brl(quote.total_brl)}</div>
          </div>
        </div>
      </header>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Itens
        </h2>
        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1">Item</th>
              <th className="text-left py-1">Tipo</th>
              <th className="text-right py-1">Qtd</th>
              <th className="text-right py-1">Unit.</th>
              <th className="text-right py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it: {
              id: string; label: string; kind: string; quantity: number;
              unit_price_brl: number; total_brl: number | null;
            }) => (
              <tr key={it.id} className="border-t border-neutral-100">
                <td className="py-1 font-medium">{it.label}</td>
                <td className="py-1 text-xs text-neutral-500 capitalize">{it.kind}</td>
                <td className="py-1 text-right tabular-nums">{it.quantity}</td>
                <td className="py-1 text-right tabular-nums">{brl(it.unit_price_brl)}</td>
                <td className="py-1 text-right tabular-nums">{brl(it.total_brl)}</td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-neutral-400 italic">
                  Sem itens
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="border-t-2 border-neutral-200">
            <tr>
              <td colSpan={4} className="py-1 text-right text-xs text-neutral-500">Subtotal</td>
              <td className="py-1 text-right tabular-nums">{brl(quote.subtotal_brl)}</td>
            </tr>
            {Number(quote.discount_brl ?? 0) > 0 && (
              <tr>
                <td colSpan={4} className="py-1 text-right text-xs text-neutral-500">Desconto</td>
                <td className="py-1 text-right tabular-nums text-rose-600">- {brl(quote.discount_brl)}</td>
              </tr>
            )}
            <tr>
              <td colSpan={4} className="py-1 text-right text-sm font-semibold">Total</td>
              <td className="py-1 text-right tabular-nums font-semibold">{brl(quote.total_brl)}</td>
            </tr>
          </tfoot>
        </table>
        {quote.notes && (
          <div className="mt-4 text-xs text-neutral-600 border-l-2 border-neutral-200 pl-3">
            <div className="uppercase tracking-wide text-neutral-500 mb-1">Observações</div>
            <div className="whitespace-pre-wrap">{quote.notes}</div>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Ações
        </h2>
        <div className="flex flex-wrap gap-2 items-end">
          <a
            href={`/crm/quotes/${quote.id}/print`}
            target="_blank"
            rel="noopener"
            className="rounded border border-neutral-300 text-sm px-3 py-2 hover:bg-neutral-100"
          >
            🖨️ Imprimir / Salvar PDF
          </a>
          {quote.public_token && (
            <CopyLinkButton
              url={`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/p/${encodeURIComponent(quote.public_token)}`}
            />
          )}
          {quote.status === 'rascunho' && (
            <form action={sendQuoteAction}>
              <input type="hidden" name="quote_id" value={quote.id} />
              <button className="rounded bg-blue-600 text-white text-sm px-3 py-2 hover:bg-blue-700">
                Marcar como enviada
              </button>
            </form>
          )}
          {(quote.status === 'rascunho' || quote.status === 'enviado') && (
            <>
              <form action={acceptQuoteAction}>
                <input type="hidden" name="quote_id" value={quote.id} />
                <button className="rounded bg-emerald-600 text-white text-sm px-3 py-2 hover:bg-emerald-700">
                  ✓ Marcar como aceita
                </button>
              </form>
              <form action={rejectQuoteAction}>
                <input type="hidden" name="quote_id" value={quote.id} />
                <button className="rounded border border-rose-300 text-rose-700 text-sm px-3 py-2 hover:bg-rose-50">
                  ✗ Recusada
                </button>
              </form>
            </>
          )}

          {quote.status === 'aceito' && !invoice && (
            <form action={generateInvoiceFromQuoteAction} className="flex gap-2 items-end">
              <input type="hidden" name="quote_id" value={quote.id} />
              <label className="text-xs">
                Vencimento
                <input
                  type="date"
                  name="due_date"
                  className="block mt-1 rounded border border-neutral-200 px-2 py-1 text-sm"
                />
              </label>
              <button className="rounded bg-neutral-900 text-white text-sm px-3 py-2 hover:bg-neutral-700">
                Gerar fatura
              </button>
            </form>
          )}

          {invoice && (
            <div className="text-sm">
              Fatura já emitida ({invoice.status}) — total {brl(invoice.total_brl)}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
