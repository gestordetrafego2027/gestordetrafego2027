import { redirect } from 'next/navigation'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Meu painel — Academy',
  robots: { index: false },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/academy/dashboard')

  const { data: enrollments } = await supabase
    .from('academy_enrollments')
    .select(`
      id, status, granted_at, expires_at, progress_percent, completed_at,
      product:academy_products(id, slug, type, title, cover_url, lesson_count, module_count)
    `)
    .eq('user_id', user.id)
    .order('granted_at', { ascending: false })

  const { data: orders } = await supabase
    .from('academy_orders')
    .select('id, order_number, status, total_cents, currency, created_at, paid_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const { data: notifications } = await supabase
    .from('academy_notifications')
    .select('id, type, title, body, link_url, read_at, created_at')
    .eq('user_id', user.id)
    .is('archived_at', null)
    .order('created_at', { ascending: false })
    .limit(10)

  const active = (enrollments ?? []).filter((e) => e.status === 'active')
  const completed = (enrollments ?? []).filter((e) => e.completed_at)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-3xl font-semibold text-neutral-900">Olá, {user.email?.split('@')[0]}</h1>
          <p className="mt-1 text-neutral-600">
            {active.length} {active.length === 1 ? 'matrícula ativa' : 'matrículas ativas'} • {completed.length} concluídas
          </p>

          {/* MATRÍCULAS ATIVAS */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-neutral-900">Continue de onde parou</h2>
            {active.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                <p className="text-neutral-600">Nenhum produto ativo ainda.</p>
                <Link
                  href="/academy"
                  className="mt-4 inline-block rounded-xl bg-neutral-900 px-5 py-2 text-white"
                >
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {active.map((e) => (
                  <EnrollmentCard key={e.id} enrollment={e} />
                ))}
              </div>
            )}
          </div>

          {/* NOTIFICAÇÕES */}
          {notifications && notifications.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-neutral-900">Notificações</h2>
              <ul className="mt-4 space-y-2">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`rounded-xl border p-4 ${n.read_at ? 'border-neutral-200 bg-white' : 'border-amber-200 bg-amber-50'}`}
                  >
                    <div className="text-sm font-medium text-neutral-900">{n.title}</div>
                    {n.body && <div className="mt-1 text-sm text-neutral-700">{n.body}</div>}
                    {n.link_url && (
                      <Link href={n.link_url} className="mt-2 inline-block text-xs underline">
                        abrir
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HISTÓRICO DE PEDIDOS */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-neutral-900">Meus pedidos</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              {(orders ?? []).length === 0 ? (
                <p className="p-6 text-sm text-neutral-500">Nenhum pedido ainda.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
                    <tr>
                      <th className="px-4 py-3">Pedido</th>
                      <th className="px-4 py-3">Data</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td className="px-4 py-3 font-mono text-xs">{o.order_number}</td>
                        <td className="px-4 py-3">{new Date(o.created_at).toLocaleDateString('pt-BR')}</td>
                        <td className="px-4 py-3">{(o.total_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: o.currency || 'BRL' })}</td>
                        <td className="px-4 py-3">
                          <StatusPill status={o.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function EnrollmentCard({ enrollment }) {
  const p = enrollment.product
  if (!p) return null
  const href = p.type === 'course' ? `/academy/curso/${p.slug}` : `/academy/${p.type}/${p.slug}`
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      {p.cover_url && (
        <img src={p.cover_url} alt={p.title} className="aspect-[16/10] w-full object-cover" />
      )}
      <div className="flex-1 p-4">
        <p className="text-xs uppercase tracking-wide text-neutral-500">{p.type}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-neutral-900">{p.title}</h3>
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${Math.min(100, Number(enrollment.progress_percent || 0))}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            {Number(enrollment.progress_percent || 0).toFixed(0)}% concluído
          </p>
        </div>
      </div>
    </Link>
  )
}

function StatusPill({ status }) {
  const map = {
    paid: { label: 'Pago', cls: 'bg-emerald-100 text-emerald-700' },
    pending: { label: 'Pendente', cls: 'bg-amber-100 text-amber-700' },
    processing: { label: 'Processando', cls: 'bg-blue-100 text-blue-700' },
    failed: { label: 'Falhou', cls: 'bg-rose-100 text-rose-700' },
    cancelled: { label: 'Cancelado', cls: 'bg-neutral-100 text-neutral-700' },
    refunded: { label: 'Reembolsado', cls: 'bg-neutral-100 text-neutral-700' },
    expired: { label: 'Expirado', cls: 'bg-neutral-100 text-neutral-700' },
    chargeback: { label: 'Chargeback', cls: 'bg-rose-100 text-rose-700' },
  }
  const s = map[status] || { label: status, cls: 'bg-neutral-100 text-neutral-700' }
  return <span className={`rounded-full px-2 py-0.5 text-xs ${s.cls}`}>{s.label}</span>
}
