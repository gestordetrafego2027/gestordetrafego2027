'use client'

import { useTransition } from 'react'
import { updateOrderStatus } from './actions'

const TRANSITIONS: Record<string, { value: string; label: string; color: string }[]> = {
  pending:    [{ value: 'processing', label: 'Processar', color: 'blue' }, { value: 'cancelled', label: 'Cancelar', color: 'red' }],
  processing: [{ value: 'paid', label: 'Marcar pago', color: 'green' }, { value: 'failed', label: 'Falhou', color: 'red' }, { value: 'cancelled', label: 'Cancelar', color: 'red' }],
  paid:       [{ value: 'refunded', label: 'Reembolsar', color: 'purple' }],
  failed:     [{ value: 'cancelled', label: 'Cancelar', color: 'red' }],
}

const BTN_COLOR: Record<string, string> = {
  green:  'bg-green-600 hover:bg-green-700 text-white',
  blue:   'bg-blue-600 hover:bg-blue-700 text-white',
  red:    'bg-red-100 hover:bg-red-200 text-red-700',
  purple: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
}

export function OrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition()
  const actions = TRANSITIONS[currentStatus] ?? []
  if (!actions.length) return null

  return (
    <div className="flex gap-2 flex-wrap">
      {actions.map((a) => (
        <form
          key={a.value}
          action={(fd) => startTransition(() => updateOrderStatus(fd))}
        >
          <input type="hidden" name="orderId" value={orderId} />
          <input type="hidden" name="status" value={a.value} />
          <button
            type="submit"
            disabled={isPending}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${BTN_COLOR[a.color]}`}
          >
            {a.label}
          </button>
        </form>
      ))}
    </div>
  )
}
