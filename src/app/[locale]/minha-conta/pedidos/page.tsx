// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

function formatPrice(cents: number, currency = 'brl') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendente',
  processing: 'Processando',
  paid: 'Pago',
  failed: 'Falhou',
  refunded: 'Reembolsado',
  partially_refunded: 'Reemb. parcial',
  cancelled: 'Cancelado',
  chargeback: 'Chargeback',
}
const STATUS_COLOR: Record<string, string> = {
  paid: 'text-green-700 bg-green-50 border-green-200',
  pending: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  processing: 'text-blue-700 bg-blue-50 border-blue-200',
  failed: 'text-red-700 bg-red-50 border-red-200',
  refunded: 'text-purple-700 bg-purple-50 border-purple-200',
  partially_refunded: 'text-purple-600 bg-purple-50 border-purple-200',
  cancelled: 'text-neutral-500 bg-neutral-100 border-neutral-200',
  chargeback: 'text-red-800 bg-red-100 border-red-300',
}

export default async function PedidosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: orders } = await supabase
    .from('store_orders')
    .select(`
      id, order_number, status, total_cents, currency,
      created_at, buyer_email,
      store_order_items (
        id, quantity, unit_amount,
        product_snapshot
      )
    `)
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-neutral-900">Meus pedidos</h2>

      {!orders?.length ? (
        <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
          <p className="text-neutral-400 text-sm">Nenhum pedido encontrado.</p>
          <Link href="/loja" className="mt-4 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4">
            Ir para a loja
          </Link>
        </div>
      ) : (
        orders.map((order) => {
          const items = (order.store_order_items as any[]) ?? []
          const color = STATUS_COLOR[order.status] ?? STATUS_COLOR.cancelled
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              {/* Header do pedido */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-neutral-100 bg-neutral-50">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{order.order_number}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: 'long', year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${color}`}>
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                  <span className="text-sm font-bold text-neutral-900">
                    {formatPrice(order.total_cents, order.currency)}
                  </span>
                </div>
              </div>

              {/* Itens */}
              <div className="divide-y divide-neutral-100">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-300 text-lg flex-shrink-0">
                      ◈
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {item.product_snapshot?.name ?? 'Produto'}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {item.quantity}× {formatPrice(item.unit_amount, order.currency)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {formatPrice(item.unit_amount * item.quantity, order.currency)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
