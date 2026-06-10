// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OrderStatusForm } from './OrderStatusForm'
import { getNfseStatus } from '@/lib/fiscal/nfeio'

function fmt(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

const STATUS_LABEL: Record<string, string> = {
  paid: 'Pago', pending: 'Pendente', processing: 'Processando',
  failed: 'Falhou', refunded: 'Reembolsado', partially_refunded: 'Reemb. parcial',
  cancelled: 'Cancelado', chargeback: 'Chargeback',
}
const STATUS_COLOR: Record<string, string> = {
  paid: 'text-green-700 bg-green-50 border-green-100',
  pending: 'text-yellow-700 bg-yellow-50 border-yellow-100',
  processing: 'text-blue-700 bg-blue-50 border-blue-100',
  failed: 'text-red-600 bg-red-50 border-red-100',
  refunded: 'text-purple-700 bg-purple-50 border-purple-100',
  partially_refunded: 'text-purple-600 bg-purple-50 border-purple-100',
  cancelled: 'text-neutral-500 bg-neutral-100 border-neutral-200',
  chargeback: 'text-red-800 bg-red-100 border-red-200',
}

type Props = { searchParams: Promise<{ status?: string; q?: string; page?: string }> }

export default async function PedidosAdminPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const md = (user?.app_metadata ?? {}) as { role?: string }
  if (md.role !== 'admin') redirect('/crm')

  const { status, q, page } = await searchParams
  const pageNum = Math.max(1, parseInt(page ?? '1'))
  const perPage = 20
  const from = (pageNum - 1) * perPage
  const to = from + perPage - 1

  let query = supabase
    .from('store_orders')
    .select(`
      id, order_number, status, total_cents, currency,
      buyer_name, buyer_email, created_at,
      payment_gateway, delivery_sent_at, delivery_email_id,
      nfse_id, nfse_number, nfse_status,
      store_order_items ( id, product_snapshot, quantity, unit_amount )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (status) query = query.eq('status', status)
  if (q) query = query.or(`buyer_email.ilike.%${q}%,order_number.ilike.%${q}%,buyer_name.ilike.%${q}%`)

  const { data: orders, count } = await query
  const totalPages = Math.ceil((count ?? 0) / perPage)

  const STATUSES = ['', 'paid', 'pending', 'processing', 'failed', 'cancelled', 'refunded']

  return (
    <div className="space-y-6">
      {/* Header + filtros */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Pedidos</h1>
        <form method="get" className="flex gap-2 flex-wrap">
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por nome, e-mail, nº pedido…"
            className="border border-neutral-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-neutral-900 w-64"
          />
          <select
            name="status"
            defaultValue={status ?? ''}
            className="border border-neutral-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s ? STATUS_LABEL[s] : 'Todos os status'}</option>
            ))}
          </select>
          <button type="submit" className="px-4 py-1.5 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700">
            Filtrar
          </button>
        </form>
      </div>

      {/* Contagem */}
      <p className="text-sm text-neutral-400">{count ?? 0} pedidos encontrados</p>

      {/* Tabela */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {!orders?.length ? (
          <p className="px-6 py-12 text-sm text-neutral-400 text-center">Nenhum pedido.</p>
        ) : (
          <div className="divide-y divide-neutral-100">
            {orders.map((order) => {
              const items = (order.store_order_items as any[]) ?? []
              return (
                <div key={order.id} className="px-6 py-4 space-y-3">
                  {/* Linha principal */}
                  <div className="flex flex-wrap items-start gap-4 justify-between">
                    <div>
                      <p className="text-sm font-bold text-neutral-900 font-mono">{order.order_number}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{order.buyer_name ?? ''} &middot; {order.buyer_email}</p>
                      <p className="text-xs text-neutral-400">
                        {new Date(order.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Gateway */}
                      {order.payment_gateway && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded border ${order.payment_gateway === 'stripe' ? 'text-indigo-700 bg-indigo-50 border-indigo-100' : 'text-sky-700 bg-sky-50 border-sky-100'}`}>
                          {order.payment_gateway === 'stripe' ? 'Cartão' : 'Pix/Boleto'}
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_COLOR[order.status] ?? 'text-neutral-500 bg-neutral-100 border-neutral-200'}`}>
                        {STATUS_LABEL[order.status] ?? order.status}
                      </span>
                      {/* Entrega */}
                      {order.delivery_sent_at ? (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full border text-emerald-700 bg-emerald-50 border-emerald-100" title={`Entregue em ${new Date(order.delivery_sent_at).toLocaleString('pt-BR')}`}>
                          ✓ PDF entregue
                        </span>
                      ) : order.status === 'paid' ? (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full border text-red-600 bg-red-50 border-red-100">
                          ⚠ PDF não entregue
                        </span>
                      ) : null}
                      <span className="text-base font-bold text-neutral-900">{fmt(order.total_cents)}</span>
                    </div>
                  </div>

                  {/* Itens */}
                  {items.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item: any, i: number) => (
                        <span key={i} className="text-xs bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1 text-neutral-600">
                          {item.quantity}× {item.product_snapshot?.name ?? 'Produto'}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* NFS-e status */}
                  {order.nfse_id && (
                    <div className="text-xs text-neutral-400 flex items-center gap-2">
                      <span className="font-medium text-neutral-600">NFS-e</span>
                      <span className="font-mono">{order.nfse_number ?? order.nfse_id}</span>
                      <span className={`px-2 py-0.5 rounded-full ${order.nfse_status === 'issued' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        {order.nfse_status ?? 'pendente'}
                      </span>
                    </div>
                  )}

                  {/* Ações */}
                  <OrderStatusForm orderId={order.id} currentStatus={order.status} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?status=${status ?? ''}&q=${q ?? ''}&page=${p}`}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm border transition-colors ${
                p === pageNum
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
