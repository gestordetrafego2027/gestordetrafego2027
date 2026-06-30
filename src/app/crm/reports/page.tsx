import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const monthStart = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
}

const last30 = () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

export default async function ReportsPage() {
  const supabase = await createClient()

  const since = monthStart()
  const since30 = last30()

  const [
    { count: newLeadsMonth },
    { count: newClientsMonth },
    { count: invoicesIssuedMonth },
    { count: invoicesPaidMonth },
    { data: revenueByUnit },
    { data: campaignPerf },
    { data: leadsFunnel },
    { data: opps30 },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', since),
    supabase.from('clients').select('*', { count: 'exact', head: true }).gte('created_at', since),
    supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true })
      .gte('issue_date', since.slice(0, 10)),
    supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paga')
      .gte('issue_date', since.slice(0, 10)),
    supabase.from('v_revenue_monthly').select('*').order('month', { ascending: false }).limit(12),
    supabase
      .from('v_campaign_performance')
      .select('*')
      .order('attributed_revenue_brl', { ascending: false })
      .limit(10),
    supabase.from('v_leads_funnel').select('*'),
    supabase
      .from('opportunities')
      .select('amount_brl, stage, closed_at, created_at')
      .gte('created_at', since30),
  ])

  // Receita do mês (sum)
  const revenueMonth = (revenueByUnit ?? [])
    .filter((r) => r.month && r.month >= since.slice(0, 7))
    .reduce((acc, r) => acc + Number(r.revenue_brl ?? 0), 0)

  // ROAS médio (campanhas com spent > 0)
  const validCampaigns = (campaignPerf ?? []).filter((c) => Number(c.spent_brl ?? 0) > 0)
  const avgRoas = validCampaigns.length
    ? validCampaigns.reduce((acc, c) => acc + Number(c.roas ?? 0), 0) / validCampaigns.length
    : null

  // Funil agregado por status
  const STATUS_ORDER = [
    'novo',
    'em_contato',
    'qualificado',
    'proposta_enviada',
    'negociacao',
    'ganho',
    'perdido',
    'arquivado',
  ]
  const totalByStatus = new Map<string, number>()
  ;(leadsFunnel ?? []).forEach((f) => {
    if (!f.status) return
    totalByStatus.set(f.status, (totalByStatus.get(f.status) ?? 0) + Number(f.total ?? 0))
  })
  const totalLeadsAll = Array.from(totalByStatus.values()).reduce((a, b) => a + b, 0)
  const ganho = totalByStatus.get('ganho') ?? 0
  const conversionRate = totalLeadsAll > 0 ? (ganho / totalLeadsAll) * 100 : 0

  // Win-rate de oportunidades (30d)
  const closed30 = (opps30 ?? []).filter((o) => o.closed_at !== null)
  const won30 = closed30.filter((o) => o.stage === 'ganho')
  const winRate30 = closed30.length > 0 ? (won30.length / closed30.length) * 100 : 0

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Relatórios</h1>
        <p className="text-sm text-neutral-500">
          Indicadores agregados e exportação de dados para análise externa.
        </p>
      </header>

      {/* KPIs do mês */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Este mês</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Novos leads', value: newLeadsMonth ?? 0 },
            { label: 'Novos clientes', value: newClientsMonth ?? 0 },
            { label: 'Faturas emitidas', value: invoicesIssuedMonth ?? 0 },
            { label: 'Faturas pagas', value: invoicesPaidMonth ?? 0 },
            { label: 'Receita do mês', value: brl(revenueMonth) },
            { label: 'Conversão (ganho)', value: `${conversionRate.toFixed(1)}%` },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-neutral-200 bg-white p-4">
              <div className="text-[10px] uppercase tracking-wide text-neutral-500">{s.label}</div>
              <div className="text-2xl font-semibold mt-1 tabular-nums">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* KPIs 30 dias */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Últimos 30 dias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">
              Oportunidades criadas
            </div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{opps30?.length ?? 0}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">
              Win-rate (30d)
            </div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{winRate30.toFixed(1)}%</div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {won30.length}/{closed30.length} fechadas
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">
              ROAS médio (campanhas)
            </div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">
              {avgRoas === null ? '—' : `${avgRoas.toFixed(2)}×`}
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">{validCampaigns.length} campanhas</div>
          </div>
        </div>
      </section>

      {/* Funil de leads */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
          Funil de leads (todos os tempos)
        </h2>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <ul className="space-y-1">
            {STATUS_ORDER.map((s) => {
              const v = totalByStatus.get(s) ?? 0
              const pct = totalLeadsAll > 0 ? (v / totalLeadsAll) * 100 : 0
              return (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <span className="w-32 text-neutral-600 capitalize">{s.replace('_', ' ')}</span>
                  <div className="flex-1 bg-neutral-100 rounded h-4 relative overflow-hidden">
                    <div className="bg-blue-500 h-4 rounded" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-16 text-right tabular-nums">{v}</span>
                  <span className="w-14 text-right text-xs text-neutral-500 tabular-nums">
                    {pct.toFixed(1)}%
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Receita mensal */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
          Receita mensal (últimos 12 meses, por unidade)
        </h2>
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Mês</th>
                <th className="text-left px-4 py-2 font-medium">Unidade</th>
                <th className="text-right px-4 py-2 font-medium">Faturas pagas</th>
                <th className="text-right px-4 py-2 font-medium">Receita</th>
              </tr>
            </thead>
            <tbody>
              {(revenueByUnit ?? []).map((r, i) => (
                <tr key={`${r.month}-${r.unit}-${i}`} className="border-t border-neutral-100">
                  <td className="px-4 py-2 text-xs text-neutral-600">
                    {r.month
                      ? new Date(r.month).toLocaleDateString('pt-BR', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="px-4 py-2 text-xs capitalize">{r.unit ?? '—'}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{r.invoices_paid ?? 0}</td>
                  <td className="px-4 py-2 text-right tabular-nums font-medium">
                    {brl(r.revenue_brl)}
                  </td>
                </tr>
              ))}
              {(revenueByUnit ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-neutral-400 italic">
                    Sem dados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top campanhas */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
          Top campanhas por receita atribuída
        </h2>
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Campanha</th>
                <th className="text-left px-4 py-2 font-medium">Canal</th>
                <th className="text-right px-4 py-2 font-medium">Leads</th>
                <th className="text-right px-4 py-2 font-medium">Gasto</th>
                <th className="text-right px-4 py-2 font-medium">Receita atrib.</th>
                <th className="text-right px-4 py-2 font-medium">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {(campaignPerf ?? []).map((c) => (
                <tr key={c.id ?? c.slug ?? Math.random()} className="border-t border-neutral-100">
                  <td className="px-4 py-2 font-medium">
                    {c.id ? (
                      <Link href={`/crm/campaigns/${c.id}`} className="hover:underline">
                        {c.name ?? '—'}
                      </Link>
                    ) : (
                      (c.name ?? '—')
                    )}
                  </td>
                  <td className="px-4 py-2 text-xs capitalize">{c.channel ?? '—'}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{c.leads_count ?? 0}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{brl(c.spent_brl)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {brl(c.attributed_revenue_brl)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums font-medium">
                    {c.roas ? `${Number(c.roas).toFixed(2)}×` : '—'}
                  </td>
                </tr>
              ))}
              {(campaignPerf ?? []).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-neutral-400 italic">
                    Sem campanhas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Exports CSV */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
          Exportar dados (CSV)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { entity: 'leads', label: 'Leads' },
            { entity: 'clients', label: 'Clientes' },
            { entity: 'quotes', label: 'Propostas' },
            { entity: 'invoices', label: 'Faturas' },
            { entity: 'payments', label: 'Pagamentos' },
          ].map((x) => (
            <a
              key={x.entity}
              href={`/crm/api/export?entity=${x.entity}`}
              className="rounded-lg border border-neutral-300 bg-white p-3 text-sm hover:bg-neutral-50 text-center"
            >
              ↓ {x.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          Os arquivos baixam respeitando as permissões da sua unidade (RLS).
        </p>
      </section>
    </div>
  )
}
