import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PrintTrigger from './PrintTrigger'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Proposta — Imprimir' }

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function QuotePrintPage({
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
      valid_until, sent_at, accepted_at, created_at,
      leads (name, email, phone, city),
      quote_items (id, kind, label, description, quantity, unit_price_brl, total_brl, position)
    `)
    .eq('id', id)
    .single()

  if (error || !quote) notFound()

  const lead = quote.leads as unknown as { name: string; email: string | null; phone: string | null; city: string | null } | null
  const items = (quote.quote_items ?? [])
    .slice()
    .sort((a: { position: number }, b: { position: number }) => a.position - b.position)

  const issue = quote.created_at
    ? new Date(quote.created_at).toLocaleDateString('pt-BR')
    : ''
  const validUntil = quote.valid_until
    ? new Date(quote.valid_until).toLocaleDateString('pt-BR')
    : null

  return (
    <div className="bg-white text-neutral-900 print-root">
      <PrintTrigger />

      <div className="max-w-3xl mx-auto px-10 py-12 print:p-0 print:max-w-none">
        {/* Cabeçalho */}
        <header className="flex items-start justify-between border-b border-neutral-200 pb-6 mb-8">
          <div>
            <div className="text-3xl font-bold tracking-tight">House Mazzutti</div>
            <div className="text-xs text-neutral-500 mt-1">
              housemazzutti.com · contato@housemazzutti.com
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-neutral-500">Proposta</div>
            <div className="text-sm font-mono">#{quote.id.slice(0, 8)}</div>
            <div className="text-xs text-neutral-500 mt-1">Emitida em {issue}</div>
          </div>
        </header>

        {/* Cliente */}
        <section className="mb-8 grid grid-cols-2 gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Para</div>
            <div className="font-medium">{lead?.name ?? '—'}</div>
            {lead?.email && <div className="text-sm text-neutral-600">{lead.email}</div>}
            {lead?.phone && <div className="text-sm text-neutral-600">{lead.phone}</div>}
            {lead?.city && <div className="text-sm text-neutral-600">{lead.city}</div>}
          </div>
          {validUntil && (
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
                Válida até
              </div>
              <div className="font-medium">{validUntil}</div>
            </div>
          )}
        </section>

        {/* Título */}
        <h1 className="text-2xl font-semibold tracking-tight mb-6">{quote.title}</h1>

        {/* Itens */}
        <table className="w-full text-sm mb-8">
          <thead className="border-b-2 border-neutral-900 text-left">
            <tr>
              <th className="py-2 font-semibold">Descrição</th>
              <th className="py-2 font-semibold text-right w-16">Qtd</th>
              <th className="py-2 font-semibold text-right w-28">Valor unit.</th>
              <th className="py-2 font-semibold text-right w-28">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it: {
              id: string; label: string; description: string | null;
              quantity: number; unit_price_brl: number; total_brl: number | null;
            }) => (
              <tr key={it.id} className="border-b border-neutral-100 align-top">
                <td className="py-3">
                  <div className="font-medium">{it.label}</div>
                  {it.description && (
                    <div className="text-xs text-neutral-500 mt-0.5">{it.description}</div>
                  )}
                </td>
                <td className="py-3 text-right tabular-nums">{it.quantity}</td>
                <td className="py-3 text-right tabular-nums">{brl(it.unit_price_brl)}</td>
                <td className="py-3 text-right tabular-nums">{brl(it.total_brl)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totais */}
        <div className="flex justify-end mb-8">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="py-1 pr-6 text-neutral-500">Subtotal</td>
                <td className="py-1 text-right tabular-nums">{brl(quote.subtotal_brl)}</td>
              </tr>
              {Number(quote.discount_brl ?? 0) > 0 && (
                <tr>
                  <td className="py-1 pr-6 text-neutral-500">Desconto</td>
                  <td className="py-1 text-right tabular-nums text-rose-600">
                    - {brl(quote.discount_brl)}
                  </td>
                </tr>
              )}
              <tr className="border-t-2 border-neutral-900">
                <td className="py-2 pr-6 font-semibold">Total</td>
                <td className="py-2 text-right tabular-nums font-bold text-lg">
                  {brl(quote.total_brl)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Observações */}
        {quote.notes && (
          <section className="mb-8">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">
              Observações
            </div>
            <div className="text-sm whitespace-pre-wrap text-neutral-700">{quote.notes}</div>
          </section>
        )}

        {/* Condições padrão */}
        <section className="text-xs text-neutral-500 border-t border-neutral-200 pt-6 leading-relaxed">
          <p>
            <strong>Condições gerais:</strong> validade da proposta {validUntil ? `até ${validUntil}` : '30 dias da emissão'}.
            Pagamento via PIX, boleto ou cartão (parcelável). Início dos trabalhos sob confirmação.
            Após aceite, mudanças de escopo serão orçadas separadamente.
          </p>
          <p className="mt-2">
            House Mazzutti — Studio · Agência · Produtora · Comunidade
          </p>
        </section>
      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          body { background: white; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
          .no-print, header.no-print { display: none !important; }
        }
      `}</style>
    </div>
  )
}
