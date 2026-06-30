import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

function fmt(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export default async function CuponsAdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const md = (user?.app_metadata ?? {}) as { role?: string }
  if (md.role !== 'admin') redirect('/crm')

  const { data: coupons } = await supabase
    .from('store_coupons')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Cupons de desconto</h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            {coupons?.length ?? 0} cupons cadastrados
          </p>
        </div>
        <a
          href="https://dashboard.stripe.com/test/coupons"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-700 transition-colors"
        >
          Criar no Stripe ↗
        </a>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {!coupons?.length ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-neutral-400">Nenhum cupom cadastrado.</p>
            <p className="text-xs text-neutral-300 mt-1">
              Crie cupons no Stripe Dashboard — eles são sincronizados automaticamente via webhook.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Código
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Desconto
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Usos
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Validade
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {coupons.map((c) => {
                const expired = c.valid_until ? new Date(c.valid_until) < new Date() : false
                const exhausted = c.max_redemptions ? c.times_redeemed >= c.max_redemptions : false
                const isActive = c.active && !expired && !exhausted
                return (
                  <tr key={c.id} className="hover:bg-neutral-50">
                    <td className="px-5 py-3 font-mono font-semibold text-neutral-900">{c.code}</td>
                    <td className="px-5 py-3 text-neutral-700">
                      {c.percent_off ? `${c.percent_off}%` : c.amount_off ? fmt(c.amount_off) : '—'}
                    </td>
                    <td className="px-5 py-3 text-neutral-500">
                      {c.times_redeemed}
                      {c.max_redemptions ? ` / ${c.max_redemptions}` : ''}
                    </td>
                    <td className="px-5 py-3 text-neutral-500">
                      {c.valid_until ? (
                        new Date(c.valid_until).toLocaleDateString('pt-BR')
                      ) : (
                        <span className="text-neutral-300">sem limite</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-green-50 text-green-700'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {isActive
                          ? 'Ativo'
                          : expired
                            ? 'Expirado'
                            : exhausted
                              ? 'Esgotado'
                              : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-neutral-400 text-center">
        Cupons são criados no Stripe Dashboard e sincronizados para o Supabase via{' '}
        <code className="font-mono text-neutral-500">scripts/sync-stripe-catalog.ts</code>.
      </p>
    </div>
  )
}
