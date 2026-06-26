import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

function fmt(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function KpiCard({ label, value, sub, href }: { label: string; value: string; sub?: string; href?: string }) {
  const inner = (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 hover:border-neutral-300 transition-colors">
      <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
      {sub && <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>}
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : inner
}

export default async function StoreAdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const md = (user?.app_metadata ?? {}) as { role?: string }
  if (md.role !== 'admin') redirect('/crm')

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    { data: kpis },
    { data: recentOrders },
    { count: pendingCount },
    { count: catalogCount },
  ] = await Promise.all([
    // Receita + pedidos do mês
    supabase
      .from('store_orders')
      .select('total_cents, status')
      .gte('created_at', startOfMonth),
    // Últimos 5 pedidos
    supabase
      .from('store_orders')
      .select('id, order_number, status, total_cents, buyer_name, buyer_email, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    // Pedidos pendentes
    supabase
      .from('store_orders')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'processing']),
    // Produtos ativos
    supabase
      .from('store_products')
      .select('*', { count: 'exact', head: true })
      .eq('active', true),
  ])

  const paidOrders = (kpis ?? []).filter((o) => o.status === 'paid')
  const revenue = paidOrders.reduce((sum, o) => sum + o.total_cents, 0)
  const orderCount = paidOrders.length

  const STATUS_COLOR: Record<string, string> = {
    paid: 'text-green-700 bg-green-50',
    pending: 'text-yellow-700 bg-yellow-50',
    processing: 'text-blue-700 bg-blue-50',
    failed: 'text-red-600 bg-red-50',
    cancelled: 'text-neutral-400 bg-neutral-100',
  }
  const STATUS_LABEL: Record<string, string> = {
    paid: 'Pago', pending: 'Pendente', processing: 'Processando',
    failed: 'Falhou', cancelled: 'Cancelado',
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Loja — Visão geral</h1>
        <p className="text-sm text-neutral-400 mt-0.5">Mês atual: {now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Receita do mês" value={fmt(revenue)} sub={`${orderCount} pedidos pagos`} />
        <KpiCard label="Pendentes" value={String(pendingCount ?? 0)} href="/crm/store/pedidos?status=pending" sub="aguardando confirmação" />
        <KpiCard label="Produtos ativos" value={String(catalogCount ?? 0)} href="/crm/store/catalogo" />
        <KpiCard label="Ticket médio" value={orderCount > 0 ? fmt(Math.round(revenue / orderCount)) : '—'} />
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-900">Pedidos recentes</h2>
          <Link href="/crm/store/pedidos" className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="divide-y divide-neutral-100">
          {!recentOrders?.length ? (
            <p className="px-6 py-8 text-sm text-neutral-400 text-center">Nenhum pedido ainda.</p>
          ) : (
            recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 font-mono">{order.order_number}</p>
                  <p className="text-xs text-neutral-400 truncate">{order.buyer_name ?? order.buyer_email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[order.status] ?? 'text-neutral-500 bg-neutral-100'}`}>
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 w-24 text-right">
                    {fmt(order.total_cents)}
                  </span>
                  <span className="text-xs text-neutral-400 w-20 text-right">
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
