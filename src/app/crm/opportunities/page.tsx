import { createClient } from '@/lib/supabase/server'
import KanbanBoard from './KanbanBoard'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Oportunidades | CRM' }

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function OpportunitiesPage() {
  const supabase = await createClient()

  const [{ data: opps }, { data: pipeline }] = await Promise.all([
    supabase
      .from('opportunities')
      .select('id, title, stage, amount_brl, unit, expected_close, closed_at')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase.from('v_opportunities_pipeline').select('*'),
  ])

  const totalAberto = (pipeline ?? []).reduce((acc, p) => acc + Number(p.amount_total_brl ?? 0), 0)
  const totalPonderado = (pipeline ?? []).reduce((acc, p) => acc + Number(p.weighted_brl ?? 0), 0)

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Oportunidades</h1>
          <p className="text-sm text-neutral-500">
            Arraste cards entre colunas para mudar o estágio.
          </p>
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

      <KanbanBoard
        initial={(opps ?? []).map((o) => ({
          id: o.id,
          title: o.title,
          stage: o.stage as never,
          amount_brl: Number(o.amount_brl ?? 0),
          unit: o.unit,
          expected_close: o.expected_close,
          closed_at: o.closed_at,
        }))}
      />
    </div>
  )
}
