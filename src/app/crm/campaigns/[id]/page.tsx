import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const statusBadge: Record<string, string> = {
  rascunho: 'bg-neutral-100 text-neutral-700',
  ativa: 'bg-emerald-100 text-emerald-700',
  pausada: 'bg-amber-100 text-amber-800',
  encerrada: 'bg-neutral-200 text-neutral-500',
}

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: campaign, error: campErr }, { data: perf }, { data: campaignLeads }] =
    await Promise.all([
      supabase.from('campaigns').select('*').eq('id', id).single(),
      supabase.from('v_campaign_performance').select('*').eq('id', id).maybeSingle(),
      supabase
        .from('campaign_leads')
        .select(
          `
        id, touch_type, attributed_value_brl, created_at,
        leads(id, name, segment, status)
      `,
        )
        .eq('campaign_id', id)
        .order('created_at', { ascending: false })
        .limit(200),
    ])

  if (campErr || !campaign) notFound()

  const budget = Number(campaign.budget_brl ?? 0)
  const spent = Number(campaign.spent_brl ?? 0)
  const budgetUsage = budget > 0 ? (spent / budget) * 100 : null
  const roas = perf?.roas ? Number(perf.roas) : null

  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href="/crm/campaigns" className="text-neutral-500 hover:text-neutral-900">
          ← Voltar para campanhas
        </Link>
      </div>

      <header className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{campaign.name}</h1>
            <div className="mt-1 text-xs text-neutral-500 font-mono">{campaign.slug}</div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className={`rounded px-2 py-0.5 ${statusBadge[campaign.status] ?? ''}`}>
                {campaign.status}
              </span>
              <span className="rounded bg-neutral-100 px-2 py-0.5 capitalize">
                {campaign.channel}
              </span>
              {campaign.unit && (
                <span className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 capitalize">
                  {campaign.unit}
                </span>
              )}
              {campaign.start_at && (
                <span className="rounded bg-neutral-100 px-2 py-0.5">
                  início: {new Date(campaign.start_at).toLocaleDateString('pt-BR')}
                </span>
              )}
              {campaign.end_at && (
                <span className="rounded bg-neutral-100 px-2 py-0.5">
                  fim: {new Date(campaign.end_at).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
            {campaign.goal && (
              <p className="text-sm text-neutral-600 mt-3 whitespace-pre-wrap">{campaign.goal}</p>
            )}
          </div>
        </div>
      </header>

      {/* Métricas */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Leads</div>
          <div className="text-2xl font-semibold mt-1 tabular-nums">{perf?.leads_count ?? 0}</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Gasto</div>
          <div className="text-2xl font-semibold mt-1 tabular-nums">{brl(spent)}</div>
          {budgetUsage !== null && (
            <div className="text-xs text-neutral-500 mt-0.5">
              {budgetUsage.toFixed(1)}% de {brl(budget)}
            </div>
          )}
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">
            Receita atribuída
          </div>
          <div className="text-2xl font-semibold mt-1 tabular-nums">
            {brl(perf?.attributed_revenue_brl)}
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">ROAS</div>
          <div
            className={`text-2xl font-semibold mt-1 tabular-nums ${
              roas !== null && roas >= 1
                ? 'text-emerald-700'
                : roas !== null && roas < 1
                  ? 'text-rose-700'
                  : ''
            }`}
          >
            {roas !== null ? `${roas.toFixed(2)}×` : '—'}
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">UTM</div>
          <div className="text-xs mt-1 text-neutral-600 font-mono">
            {campaign.utm_source ?? '—'} / {campaign.utm_medium ?? '—'}
          </div>
          <div className="text-xs text-neutral-500 font-mono">{campaign.utm_campaign ?? '—'}</div>
        </div>
      </section>

      {/* Leads atribuídos */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Leads atribuídos ({campaignLeads?.length ?? 0})
        </h2>

        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1">Lead</th>
              <th className="text-left py-1">Segmento</th>
              <th className="text-left py-1">Status</th>
              <th className="text-left py-1">Touch</th>
              <th className="text-left py-1">Atribuído em</th>
              <th className="text-right py-1">Valor atrib.</th>
            </tr>
          </thead>
          <tbody>
            {(campaignLeads ?? []).map((cl) => {
              const lead = Array.isArray(cl.leads) ? cl.leads[0] : cl.leads
              return (
                <tr key={cl.id} className="border-t border-neutral-100">
                  <td className="py-2 font-medium">
                    {lead ? (
                      <Link href={`/crm/leads/${lead.id}`} className="hover:underline">
                        {lead.name}
                      </Link>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-2 text-xs capitalize">{lead?.segment ?? '—'}</td>
                  <td className="py-2 text-xs capitalize">{lead?.status ?? '—'}</td>
                  <td className="py-2 text-xs">{cl.touch_type}</td>
                  <td className="py-2 text-xs text-neutral-500">
                    {new Date(cl.created_at).toLocaleString('pt-BR')}
                  </td>
                  <td className="py-2 text-right tabular-nums">{brl(cl.attributed_value_brl)}</td>
                </tr>
              )
            })}
            {(campaignLeads ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-neutral-400 italic text-xs">
                  Nenhum lead atribuído.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}
