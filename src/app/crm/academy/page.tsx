import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Academy | CRM' }

const brl = (cents: number | null | undefined) =>
  ((cents ?? 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function AcademyAdminHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') redirect('/crm?error=acesso_negado')

  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { count: productsTotal },
    { count: productsPublished },
    { count: ordersTotal },
    { count: ordersPaid },
    { count: enrollmentsActive },
    { data: revenueData },
    { data: topProducts },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('academy_products').select('*', { count: 'exact', head: true }),
    supabase.from('academy_products').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('academy_orders').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('academy_orders').select('*', { count: 'exact', head: true }).eq('status', 'paid').gte('paid_at', since30),
    supabase.from('academy_enrollments').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('academy_orders').select('total_cents').eq('status', 'paid').gte('paid_at', since30),
    supabase.from('academy_products').select('id, slug, title, type, sales_count, price_cents').order('sales_count', { ascending: false }).limit(5),
    supabase.from('academy_orders')
      .select('id, order_number, total_cents, status, billing_name, billing_email, created_at, paid_at')
      .order('created_at', { ascending: false }).limit(10),
  ])

  const revenue30 = (revenueData ?? []).reduce((acc, o) => acc + (o.total_cents ?? 0), 0)

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Academy</h1>
          <p className="text-sm text-neutral-500">Gestão de produtos, pedidos, alunos e financeiro.</p>
        </div>
        <Link
          href="/crm/academy/products/new"
          className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
        >
          + Novo produto
        </Link>
      </header>

      <nav className="flex flex-wrap gap-1 text-xs">
        <Link href="/crm/academy" className="rounded bg-neutral-900 text-white px-3 py-1">Visão geral</Link>
        <Link href="/crm/academy/products" className="rounded border border-neutral-200 px-3 py-1 hover:bg-neutral-100">Produtos</Link>
      </nav>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi label="Produtos" value={productsTotal ?? 0} sub={`${productsPublished ?? 0} publicados`} />
        <Kpi label="Pedidos (30d)" value={ordersTotal ?? 0} sub={`${ordersPaid ?? 0} pagos`} />
        <Kpi label="Receita (30d)" value={brl(revenue30)} />
        <Kpi label="Matrículas ativas" value={enrollmentsActive ?? 0} />
        <Kpi label="Ticket médio" value={
          ordersPaid ? brl(Math.round(revenue30 / Math.max(1, ordersPaid))) : 'R$ 0,00'
        } />
        <Kpi label="Conversão" value={
          ordersTotal ? `${Math.round((ordersPaid ?? 0) / Math.max(1, ordersTotal) * 100)}%` : '—'
        } />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Top 5 produtos (vendas)
          </h2>
          <table className="w-full text-sm">
            <thead className="text-xs text-neutral-500">
              <tr>
                <th className="text-left py-1">Produto</th>
                <th className="text-left py-1">Tipo</th>
                <th className="text-right py-1">Vendas</th>
                <th className="text-right py-1">Preço</th>
              </tr>
            </thead>
            <tbody>
              {(topProducts ?? []).map((p) => (
                <tr key={p.id} className="border-t border-neutral-100">
                  <td className="py-1">
                    <Link href={`/crm/academy/products/${p.id}`} className="font-medium hover:underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className="py-1 text-xs capitalize">{p.type}</td>
                  <td className="py-1 text-right tabular-nums">{p.sales_count ?? 0}</td>
                  <td className="py-1 text-right tabular-nums">{brl(p.price_cents)}</td>
                </tr>
              ))}
              {!topProducts?.length && (
                <tr><td colSpan={4} className="py-4 text-center text-neutral-400 italic">Sem produtos.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Pedidos recentes
          </h2>
          <ul className="space-y-1 text-xs">
            {(recentOrders ?? []).map((o) => (
              <li key={o.id} className="flex justify-between border-b border-neutral-100 py-1">
                <span>
                  <span className="font-mono">{o.order_number}</span>
                  <span className="ml-2 text-neutral-600">{o.billing_name ?? o.billing_email ?? '—'}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-[10px] ${
                    o.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                    o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-neutral-100 text-neutral-600'
                  }`}>{o.status}</span>
                  <span className="tabular-nums">{brl(o.total_cents)}</span>
                </span>
              </li>
            ))}
            {!recentOrders?.length && (
              <li className="text-neutral-400 italic">Nenhum pedido ainda.</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  )
}

function Kpi({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="text-[10px] uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="text-xl font-semibold mt-1 tabular-nums">{value}</div>
      {sub && <div className="text-xs text-neutral-500 mt-0.5">{sub}</div>}
    </div>
  )
}
