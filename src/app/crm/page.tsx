import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function CrmHome() {
  const supabase = await createClient()

  const [
    { count: totalLeads },
    { count: commercialLeads },
    { count: talentLeads },
    { count: totalClients },
    { count: openOpps },
    { data: pipeline },
    { data: revenue },
    { data: campaignPerf },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('segment', 'commercial'),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('segment', 'talents'),
    supabase.from('clients').select('*', { count: 'exact', head: true }),
    supabase.from('opportunities').select('*', { count: 'exact', head: true }).is('closed_at', null),
    supabase.from('v_opportunities_pipeline').select('*'),
    supabase.from('v_revenue_monthly').select('*').order('month', { ascending: false }).limit(6),
    supabase
      .from('v_campaign_performance')
      .select('*')
      .order('attributed_revenue_brl', { ascending: false })
      .limit(5),
  ])

  const pipelineAmount = (pipeline ?? []).reduce(
    (a, p) => a + Number(p.amount_total_brl ?? 0),
    0,
  )
  const pipelineWeighted = (pipeline ?? []).reduce(
    (a, p) => a + Number(p.weighted_brl ?? 0),
    0,
  )

  const stats = [
    { label: 'Leads totais', value: totalLeads ?? 0 },
    { label: 'Commercial', value: commercialLeads ?? 0 },
    { label: 'Talents', value: talentLeads ?? 0 },
    { label: 'Clientes', value: totalClients ?? 0 },
    { label: 'Oportunidades abertas', value: openOpps ?? 0 },
    { label: 'Pipeline (ponderado)', value: brl(pipelineWeighted) },
  ]

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500">
          Visão geral do CRM — leads, pipeline, receita e campanhas.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">{s.label}</div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Pipeline por estágio
          </h2>
          <p className="text-xs text-neutral-500 mb-3">Total aberto: {brl(pipelineAmount)}</p>
          <table className="w-full text-sm">
            <thead className="text-xs text-neutral-500">
              <tr>
                <th className="text-left py-1">Unidade</th>
                <th className="text-left py-1">Estágio</th>
                <th className="text-right py-1">Qtd</th>
                <th className="text-right py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {(pipeline ?? []).map((p, i) => (
                <tr key={i} className="border-t border-neutral-100">
                  <td className="py-1 capitalize">{p.unit ?? '—'}</td>
                  <td className="py-1 capitalize">{p.stage}</td>
                  <td className="py-1 text-right tabular-nums">{p.total}</td>
                  <td className="py-1 text-right tabular-nums">{brl(p.amount_total_brl)}</td>
                </tr>
              ))}
              {!pipeline?.length && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-neutral-400 italic">
                    sem oportunidades em aberto
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Receita mensal (últimos 6 meses)
          </h2>
          <table className="w-full text-sm mt-3">
            <thead className="text-xs text-neutral-500">
              <tr>
                <th className="text-left py-1">Mês</th>
                <th className="text-left py-1">Unidade</th>
                <th className="text-right py-1">Faturas</th>
                <th className="text-right py-1">Receita</th>
              </tr>
            </thead>
            <tbody>
              {(revenue ?? []).map((r, i) => (
                <tr key={i} className="border-t border-neutral-100">
                  <td className="py-1">
                    {r.month
                      ? new Date(r.month).toLocaleDateString('pt-BR', {
                          month: 'short',
                          year: '2-digit',
                        })
                      : '—'}
                  </td>
                  <td className="py-1 capitalize">{r.unit ?? '—'}</td>
                  <td className="py-1 text-right tabular-nums">{r.invoices_paid}</td>
                  <td className="py-1 text-right tabular-nums">{brl(r.revenue_brl)}</td>
                </tr>
              ))}
              {!revenue?.length && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-neutral-400 italic">
                    sem pagamentos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Top campanhas por receita atribuída
        </h2>
        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1">Campanha</th>
              <th className="text-left py-1">Canal</th>
              <th className="text-right py-1">Leads</th>
              <th className="text-right py-1">Gasto</th>
              <th className="text-right py-1">Receita</th>
              <th className="text-right py-1">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {(campaignPerf ?? []).map((c) => (
              <tr key={c.id} className="border-t border-neutral-100">
                <td className="py-1">{c.name}</td>
                <td className="py-1 capitalize">{c.channel?.replace('_', ' ')}</td>
                <td className="py-1 text-right tabular-nums">{c.leads_count ?? 0}</td>
                <td className="py-1 text-right tabular-nums">{brl(c.spent_brl)}</td>
                <td className="py-1 text-right tabular-nums">{brl(c.attributed_revenue_brl)}</td>
                <td className="py-1 text-right tabular-nums">
                  {c.roas != null ? `${c.roas}x` : '—'}
                </td>
              </tr>
            ))}
            {!campaignPerf?.length && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-neutral-400 italic">
                  nenhum dado de campanha
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <nav className="flex flex-wrap gap-3">
        <Link
          href="/crm/leads"
          className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
        >
          Leads →
        </Link>
        <Link
          href="/crm/clients"
          className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
        >
          Clientes →
        </Link>
        <Link
          href="/crm/opportunities"
          className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
        >
          Oportunidades →
        </Link>
        <Link
          href="/crm/campaigns"
          className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
        >
          Campanhas →
        </Link>
      </nav>
    </div>
  )
}
