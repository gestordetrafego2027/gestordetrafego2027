import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Link } from '@/i18n/navigation'

export const dynamic = 'force-dynamic'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export default async function MinhaContaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const { locale } = await params
    redirect(`/login?next=/${locale}/minha-conta`)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, display_name, email, avatar_url')
    .eq('id', user.id)
    .maybeSingle()

  // Últimos 3 pedidos
  const { data: recentOrders } = await supabase
    .from('store_orders')
    .select('id, order_number, status, total_cents, currency, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  const statusLabel: Record<string, string> = {
    pending: 'Pendente',
    processing: 'Processando',
    paid: 'Pago',
    failed: 'Falhou',
    refunded: 'Reembolsado',
    cancelled: 'Cancelado',
  }
  const statusColor: Record<string, string> = {
    paid: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50',
    processing: 'text-blue-600 bg-blue-50',
    failed: 'text-red-600 bg-red-50',
    refunded: 'text-purple-600 bg-purple-50',
    cancelled: 'text-neutral-500 bg-neutral-100',
  }

  const displayName = profile?.display_name ?? profile?.full_name ?? profile?.email ?? 'Cliente'

  return (
    <div className="space-y-6">
      {/* Boas-vindas */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <p className="text-sm text-neutral-400 mb-1">Olá,</p>
        <h2 className="text-xl font-semibold text-neutral-900">{displayName}</h2>
        <p className="text-sm text-neutral-400 mt-0.5">{profile?.email ?? user.email}</p>
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-neutral-900">Pedidos recentes</h3>
          <Link href="/minha-conta/pedidos" className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors">
            Ver todos →
          </Link>
        </div>

        {!recentOrders?.length ? (
          <div className="text-center py-8">
            <p className="text-sm text-neutral-400">Você ainda não fez pedidos.</p>
            <Link href="/loja" className="mt-3 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4">
              Explorar loja
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{order.order_number}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[order.status] ?? 'text-neutral-500 bg-neutral-100'}`}>
                    {statusLabel[order.status] ?? order.status}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {formatPrice(order.total_cents)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Links rápidos */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/minha-conta/dados" className="bg-white rounded-2xl border border-neutral-100 p-5 hover:border-neutral-300 transition-colors">
          <p className="text-sm font-semibold text-neutral-900">Dados pessoais</p>
          <p className="text-xs text-neutral-400 mt-1">Nome, telefone, endereço</p>
        </Link>
        <Link href="/minha-conta/lgpd" className="bg-white rounded-2xl border border-neutral-100 p-5 hover:border-neutral-300 transition-colors">
          <p className="text-sm font-semibold text-neutral-900">Privacidade</p>
          <p className="text-xs text-neutral-400 mt-1">LGPD, dados e consentimentos</p>
        </Link>
      </div>
    </div>
  )
}
