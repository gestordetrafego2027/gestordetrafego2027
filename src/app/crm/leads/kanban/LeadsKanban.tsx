'use client'

import Link from 'next/link'
import KanbanBoard, { type KanbanColumn } from '../../components/KanbanBoard'
import { moveLeadStageAction } from './actions'

export type LeadCard = {
  id: string
  name: string
  segment: 'commercial' | 'talents'
  lead_type: string
  stage_id: string | null
  status: string
}

export type StageInfo = {
  id: string
  name: string
  segment: 'commercial' | 'talents'
}

const NO_STAGE = '__none__'

const statusBadge: Record<string, string> = {
  novo: 'bg-amber-100 text-amber-800',
  em_contato: 'bg-amber-100 text-amber-800',
  qualificado: 'bg-blue-100 text-blue-700',
  proposta_enviada: 'bg-indigo-100 text-indigo-700',
  negociacao: 'bg-indigo-100 text-indigo-700',
  ganho: 'bg-emerald-100 text-emerald-700',
  perdido: 'bg-rose-100 text-rose-700',
  arquivado: 'bg-neutral-100 text-neutral-500',
}

export default function LeadsKanban({
  leads,
  stages,
}: {
  leads: LeadCard[]
  stages: StageInfo[]
}) {
  const columns: KanbanColumn<string>[] = [
    { id: NO_STAGE, label: 'Sem estágio' },
    ...stages.map((s) => ({ id: s.id, label: `${s.name} · ${s.segment}` })),
  ]

  return (
    <KanbanBoard<LeadCard, string>
      initial={leads}
      columns={columns}
      getId={(l) => l.id}
      getColumn={(l) => l.stage_id ?? NO_STAGE}
      setColumn={(l, colId) => ({ ...l, stage_id: colId === NO_STAGE ? null : colId })}
      onMove={async (id, colId) => moveLeadStageAction(id, colId)}
      renderItem={(l) => (
        <Link href={`/crm/leads/${l.id}`} className="block">
          <div className="font-medium truncate">{l.name}</div>
          <div className="text-xs text-neutral-500 flex justify-between mt-0.5 gap-2">
            <span className="capitalize truncate">{l.lead_type}</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] shrink-0 ${
                statusBadge[l.status] ?? 'bg-neutral-100'
              }`}
            >
              {l.status}
            </span>
          </div>
        </Link>
      )}
      renderColumnFooter={(items) => <>{items.length} lead{items.length === 1 ? '' : 's'}</>}
      gridClassName={`grid grid-cols-1 md:grid-cols-3 gap-3`}
    />
  )
}
