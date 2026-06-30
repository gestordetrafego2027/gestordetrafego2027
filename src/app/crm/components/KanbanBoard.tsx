'use client'

import { useState, useTransition, type ReactNode } from 'react'

export type KanbanColumn<C extends string> = {
  id: C
  label: string
  /** Tailwind classes ou estilo para o destaque da coluna no hover/drop. */
  accentClass?: string
}

export type KanbanBoardProps<I, C extends string> = {
  initial: I[]
  columns: KanbanColumn<C>[]
  /** Retorna identificador único do item. */
  getId: (item: I) => string
  /** Retorna a coluna atual do item. */
  getColumn: (item: I) => C
  /** Imutável: devolve um novo item com a coluna trocada (usado em optimistic update). */
  setColumn: (item: I, column: C) => I
  /** Persiste a mudança no servidor. Deve retornar `{ ok }`. */
  onMove: (itemId: string, newColumn: C) => Promise<{ ok: boolean }>
  /** Conteúdo do card. */
  renderItem: (item: I) => ReactNode
  /** Resumo da coluna (ex: "3 · R$ 12.000"). Default: contagem. */
  renderColumnFooter?: (items: I[]) => ReactNode
  /** Largura da grade. Default: 1 coluna mobile, N colunas desktop. */
  gridClassName?: string
  /** Texto exibido em coluna vazia. */
  emptyText?: string
}

export default function KanbanBoard<I, C extends string>({
  initial,
  columns,
  getId,
  getColumn,
  setColumn,
  onMove,
  renderItem,
  renderColumnFooter,
  gridClassName,
  emptyText = 'arraste aqui',
}: KanbanBoardProps<I, C>) {
  const [items, setItems] = useState<I[]>(initial)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<C | null>(null)
  const [, startTransition] = useTransition()

  function handleDragStart(e: React.DragEvent, itemId: string) {
    setDraggingId(itemId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', itemId)
  }

  function handleDragOver(e: React.DragEvent, col: C) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragOverCol !== col) setDragOverCol(col)
  }

  function handleDrop(e: React.DragEvent, newCol: C) {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('text/plain') || draggingId
    setDraggingId(null)
    setDragOverCol(null)
    if (!itemId) return
    const current = items.find((it) => getId(it) === itemId)
    if (!current || getColumn(current) === newCol) return

    const oldCol = getColumn(current)
    setItems((prev) => prev.map((it) => (getId(it) === itemId ? setColumn(it, newCol) : it)))
    startTransition(async () => {
      const res = await onMove(itemId, newCol)
      if (!res.ok) {
        // rollback
        setItems((prev) => prev.map((it) => (getId(it) === itemId ? setColumn(it, oldCol) : it)))
      }
    })
  }

  const grid =
    gridClassName ??
    `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${Math.min(columns.length, 6)} gap-3`

  return (
    <div className={grid}>
      {columns.map((col) => {
        const colItems = items.filter((it) => getColumn(it) === col.id)
        const isOver = dragOverCol === col.id
        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`rounded-lg border bg-white transition-colors ${
              isOver ? (col.accentClass ?? 'border-blue-500 bg-blue-50') : 'border-neutral-200'
            }`}
          >
            <div className="border-b border-neutral-100 px-3 py-2 sticky top-0 bg-inherit">
              <div className="text-xs uppercase tracking-wide text-neutral-500">{col.label}</div>
              <div className="text-sm font-medium">
                {renderColumnFooter
                  ? renderColumnFooter(colItems)
                  : `${colItems.length} item${colItems.length === 1 ? '' : 's'}`}
              </div>
            </div>
            <ul className="divide-y divide-neutral-100 min-h-[80px]">
              {colItems.map((it) => {
                const id = getId(it)
                return (
                  <li
                    key={id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, id)}
                    className={`px-3 py-2 text-sm cursor-grab active:cursor-grabbing hover:bg-neutral-50 ${
                      draggingId === id ? 'opacity-50' : ''
                    }`}
                  >
                    {renderItem(it)}
                  </li>
                )
              })}
              {colItems.length === 0 && (
                <li className="px-3 py-4 text-xs text-neutral-400 italic">{emptyText}</li>
              )}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
