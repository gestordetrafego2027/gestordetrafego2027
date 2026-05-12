import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Oportunidades | CRM' }

const stageOrder = [
  'descoberta',
  'qualificacao',
  'proposta',
  'negociacao',
  'ganho',
  'perdido',
] as const

const stageLabel: Record<(typeof stageOrder)[number], string> = {
  descoberta: 'Descoberta',
  qualificacao: 'Qualificação',
  proposta: 'Proposta',
  negociacao: 'Negociação',
  ganho: 'Ganho',
  perdido: 'Perdido',
}

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function OpportunitiesPage() {
  const supabase = await createClient()

  const [{ data: opps, error }, { data: pipeline }] = await Promise.all([
    supabase
      .from('opportunities')
      .select('id, title, stage, amount_brl, probability, unit, expected_close, closed_at')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase.from('v_opportunities_pipeline').select('*'),
  ])

  const byStage = stageOrder.map((s) => ({
    stage: s,
    items: (opps ?? []).filter((o) => o.stage === s),
  }))

  const totalAberto = (pipeline ?? []).reduce(
    (acc, p) => acc + Number(p.amount_total_brl ?? 0),
    0,
  )
  const totalPonderado = (pipeline ?? []).reduce(
    (acc, p) => acc + Number(p.weighted_brl ?? 0),
    0,
  )

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Oportunidades</h1>
          <p className="text-sm text-neutral-500">Pipeline comercial por estágio.</p>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <div className="text-xs uppercase text-neutral-500">Em aberto</div>
            <div className="text-lg font-semibold tabular-nums">{brl(totalAberto)}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-500">Ponderado</div>
            <div className="text-lg font-semibold tabular-nums">{brl(totalPonderado)}</div>
          </div>
        </div>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error.message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {byStage.map((col) => {
          const total = col.items.reduce((a, o) => a + Number(o.amount_brl ?? 0), 0)
          return (
            <div key={col.stage} className="rounded-lg border border-neutral-200 bg-white">
              <div className="border-b border-neutral-100 px-3 py-2">
                <div className="text-xs uppercase tracking-wide text-neutral-500">
                  {stageLabel[col.stage]}
                </div>
                <div className="text-sm font-medium">
                  {col.items.length} · {brl(total)}
                </div>
              </div>
              <ul className="divide-y divide-neutral-100">
                {col.items.map((o) => (
                  <li key={o.id} className="px-3 py-2 text-sm">
                    <div className="font-medium truncate">{o.title}</div>
                    <div className="text-xs text-neutral-500 flex justify-between mt-0.5">
                      <span className="capitalize">{o.unit}</span>
                      <span className="tabular-nums">{brl(o.amount_brl)}</span>
                    </div>
                  </li>
                ))}
                {!col.items.length && (
                  <li className="px-3 py-4 text-xs text-neutral-400 italic">vazio</li>
                )}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
