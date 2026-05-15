'use client'

import { useEffect } from 'react'

export default function PrintTrigger() {
  useEffect(() => {
    // Auto-dispara o diálogo de impressão ao abrir
    const id = window.setTimeout(() => window.print(), 400)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="no-print fixed top-3 right-3 flex gap-2 z-50">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded bg-neutral-900 text-white text-xs px-3 py-1.5 hover:bg-neutral-700 shadow"
      >
        Imprimir / Salvar PDF
      </button>
      <button
        type="button"
        onClick={() => window.close()}
        className="rounded border border-neutral-300 text-xs px-3 py-1.5 hover:bg-neutral-100 shadow"
      >
        Fechar
      </button>
    </div>
  )
}
