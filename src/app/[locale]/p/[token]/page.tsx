import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { acceptQuoteByTokenAction } from './actions'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Sua proposta — House Mazzutti',
  robots: { index: false, follow: false },
}

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type QuoteRow = {
  id: string; title: string; status: string; notes: string | null;
  subtotal_brl: number; discount_brl: number; total_brl: number;
  valid_until: string | null; sent_at: string | null;
  accepted_at: string | null; created_at: string;
  lead_name: string; lead_email: string | null;
  lead_phone: string | null; lead_city: string | null;
  items: Array<{
    id: string; kind: string; label: string; description: string | null;
    quantity: number; unit_price_brl: number; total_brl: number; position: number;
  }>;
}

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .rpc('get_quote_by_token', { p_token: token })
    .returns<QuoteRow[]>()

  const quote = data?.[0]
  if (error || !quote) notFound()

  const validUntil = quote.valid_until
    ? new Date(quote.valid_until).toLocaleDateString('pt-BR') : null
  const issue = new Date(quote.created_at).toLocaleDateString('pt-BR')
  const accepted = quote.status === 'aceito'

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <header className="flex items-start justify-between border-b border-neutral-200 pb-5 mb-8">
          <div>
            <div className="text-2xl font-bold tracking-tight">House Mazzutti</div>
            <div className="text-xs text-neutral-500 mt-0.5">
              housemazzutti.com · contato@mztgrupo.com
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">Proposta</div>
            <div className="text-sm font-mono">#{quote.id.slice(0, 8)}</div>
            <div className="text-xs text-neutral-500 mt-0.5">Emitida em {issue}</div>
          </div>
        </header>

        {accepted && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 mb-6 text-sm text-emerald-800">
            ✓ Proposta aceita em{' '}
            {quote.accepted_at && new Date(quote.accepted_at).toLocaleDateString('pt-BR')}.
            Em breve nossa equipe entrará em contato para iniciar o onboarding.
          </div>
        )}

        <section className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Para</div>
            <div className="font-medium">{quote.lead_name}</div>
            {quote.lead_email && <div className="text-sm text-neutral-600">{quote.lead_email}</div>}
            {quote.lead_phone && <div className="text-sm text-neutral-600">{quote.lead_phone}</div>}
            {quote.lead_city && <div className="text-sm text-neutral-600">{quote.lead_city}</div>}
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

        <h1 className="text-2xl font-semibold tracking-tight mb-6">{quote.title}</h1>

        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs text-neutral-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-2">Descrição</th>
                <th className="px-4 py-2 text-right w-16">Qtd</th>
                <th className="px-4 py-2 text-right w-28">Valor unit.</th>
                <th className="px-4 py-2 text-right w-28">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((it) => (
                <tr key={it.id} className="border-t border-neutral-100 align-top">
                  <td className="px-4 py-3">
                    <div className="font-medium">{it.label}</div>
                    {it.description && (
                      <div className="text-xs text-neutral-500 mt-0.5">{it.description}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{it.quantity}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{brl(it.unit_price_brl)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{brl(it.total_brl)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        {quote.notes && (
          <section className="mb-8 rounded-lg bg-white border border-neutral-200 p-5">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">
              Observações
            </div>
            <div className="text-sm whitespace-pre-wrap text-neutral-700">{quote.notes}</div>
          </section>
        )}

        {!accepted && (
          <section className="rounded-lg bg-white border-2 border-emerald-500 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">Aceitar proposta</h2>
            <p className="text-sm text-neutral-600 mb-4">
              Ao confirmar, você concorda com os termos descritos acima. Nossa equipe entrará
              em contato em até 1 dia útil para iniciar o trabalho.
            </p>
            <form action={acceptQuoteByTokenAction}>
              <input type="hidden" name="token" value={token} />
              <button
                type="submit"
                className="w-full md:w-auto rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 transition-colors"
              >
                ✓ Aceitar e iniciar
              </button>
            </form>
          </section>
        )}

        <section className="text-xs text-neutral-500 border-t border-neutral-200 pt-6 leading-relaxed">
          <p>
            <strong>Condições gerais:</strong> validade {validUntil ? `até ${validUntil}` : '30 dias da emissão'}.
            Pagamento via PIX, boleto ou cartão (parcelável). Após aceite, mudanças de
            escopo serão orçadas separadamente.
          </p>
          <p className="mt-2">House Mazzutti — Studio · Agência · Produtora · Comunidade</p>
        </section>
      </div>
    </div>
  )
}
