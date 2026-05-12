'use client'

import { useState, useTransition } from 'react'
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

const STAGES: Stage[] = ['descoberta', 'qualificacao', 'proposta', 'negociacao', 'ganho', 'perdido']
const STAGE_LABEL: Record<Stage, string> = {
  descoberta: 'Descoberta',
  qualificacao: 'Qualificação',
  proposta: 'Proposta',
  negociacao: 'Negociação',
  ganho: 'Ganho',
  perdido: 'Perdido',
}

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function KanbanBoard({ initial }: { initial: Opp[] }) {
  const [opps, setOpps] = useState<Opp[]>(initial)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null)
  const [, startTransition] = useTransition()

  function handleDragStart(e: React.DragEvent, oppId: string) {
    setDraggingId(oppId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', oppId)
  }

  function handleDragOver(e: React.DragEvent, stage: Stage) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragOverStage !== stage) setDragOverStage(stage)
  }

  function handleDrop(e: React.DragEvent, newStage: Stage) {
    e.preventDefault()
    const oppId = e.dataTransfer.getData('text/plain') || draggingId
    setDraggingId(null)
    setDragOverStage(null)
    if (!oppId) return
    const current = opps.find((o) => o.id === oppId)
    if (!current || current.stage === newStage) return

    // Optimistic update
    setOpps((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, stage: newStage } : o)),
    )
    startTransition(async () => {
      const res = await moveOpportunityAction(oppId, newStage)
      if (!res.ok) {
        // rollback
        setOpps((prev) =>
          prev.map((o) => (o.id === oppId ? { ...o, stage: current.stage } : o)),
        )
      }
    })
  }

  const columns = STAGES.map((s) => ({
    stage: s,
    items: opps.filter((o) => o.stage === s),
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {columns.map((col) => {
        const total = col.items.reduce((a, o) => a + Number(o.amount_brl ?? 0), 0)
        const isOver = dragOverStage === col.stage
        return (
          <div
            key={col.stage}
            onDragOver={(e) => handleDragOver(e, col.stage)}
            onDragLeave={() => setDragOverStage(null)}
            onDrop={(e) => handleDrop(e, col.stage)}
            className={`rounded-lg border bg-white transition-colors ${
              isOver ? 'border-blue-500 bg-blue-50' : 'border-neutral-200'
            }`}
          >
            <div className="border-b border-neutral-100 px-3 py-2 sticky top-0 bg-inherit">
              <div className="text-xs uppercase tracking-wide text-neutral-500">
                {STAGE_LABEL[col.stage]}
              </div>
              <div className="text-sm font-medium">
                {col.items.length} · {brl(total)}
              </div>
            </div>
            <ul className="divide-y divide-neutral-100 min-h-[80px]">
              {col.items.map((o) => (
                <li
                  key={o.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, o.id)}
                  className={`px-3 py-2 text-sm cursor-grab active:cursor-grabbing hover:bg-neutral-50 ${
                    draggingId === o.id ? 'opacity-50' : ''
                  }`}
                >
                  <div className="font-medium truncate">{o.title}</div>
                  <div className="text-xs text-neutral-500 flex justify-between mt-0.5">
                    <span className="capitalize">{o.unit}</span>
                    <span className="tabular-nums">{brl(o.amount_brl)}</span>
                  </div>
                </li>
              ))}
              {!col.items.length && (
                <li className="px-3 py-4 text-xs text-neutral-400 italic">arraste aqui</li>
              )}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
