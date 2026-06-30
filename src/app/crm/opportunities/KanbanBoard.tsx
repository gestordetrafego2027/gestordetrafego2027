'use client'

import KanbanBoard, { type KanbanColumn } from '../components/KanbanBoard'
import { moveOpportunityAction } from './actions'

type Stage = 'descoberta' | 'qualificacao' | 'proposta' | 'negociacao' | 'ganho' | 'perdido'

type Opp = {
  id: string
  title: string
  stage: Stage
  amount_brl: number
  unit: string
  expected_close: string | null
  closed_at: string | null
}

const COLUMNS: KanbanColumn<Stage>[] = [
  { id: 'descoberta', label: 'Descoberta' },
  { id: 'qualificacao', label: 'Qualificação' },
  { id: 'proposta', label: 'Proposta' },
  { id: 'negociacao', label: 'Negociação' },
  { id: 'ganho', label: 'Ganho', accentClass: 'border-emerald-500 bg-emerald-50' },
  { id: 'perdido', label: 'Perdido', accentClass: 'border-rose-500 bg-rose-50' },
]

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function OpportunitiesKanban({ initial }: { initial: Opp[] }) {
  return (
    <KanbanBoard<Opp, Stage>
      initial={initial}
      columns={COLUMNS}
      getId={(o) => o.id}
      getColumn={(o) => o.stage}
      setColumn={(o, stage) => ({ ...o, stage })}
      onMove={async (id, newStage) => moveOpportunityAction(id, newStage)}
      renderItem={(o) => (
        <>
          <div className="font-medium truncate">{o.title}</div>
          <div className="text-xs text-neutral-500 flex justify-between mt-0.5">
            <span className="capitalize">{o.unit}</span>
            <span className="tabular-nums">{brl(o.amount_brl)}</span>
          </div>
        </>
      )}
      renderColumnFooter={(items) => {
        const total = items.reduce((a, o) => a + Number(o.amount_brl ?? 0), 0)
        return (
          <>
            {items.length} · {brl(total)}
          </>
        )
      }}
      gridClassName="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3"
    />
  )
}
