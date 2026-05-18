import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Campanhas | CRM' }

const statusBadge: Record<string, string> = {
  ativa: 'bg-emerald-100 text-emerald-700',
  rascunho: 'bg-neutral-100 text-neutral-600',
  pausada: 'bg-amber-100 text-amber-700',
  encerrada: 'bg-neutral-200 text-neutral-500',
}

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function CampaignsPage() {
  const supabase = await createClient()

  const [{ data: campaigns, error }, { data: perf }] = await Promise.all([
    supabase
      .from('campaigns')
      .select('id, slug, name, channel, status, unit, budget_brl, spent_brl, start_at, end_at')
      .order('created_at', { ascending: false }),
    supabase.from('v_campaign_performance').select('*'),
  ])

  const perfById = new Map((perf ?? []).map((p) => [p.id, p]))

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Campanhas</h1>
        <p className="text-sm text-neutral-500">Atribuição multi-touch, gasto e ROAS por campanha.</p>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error.message}
        </p>
      )}

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2">Campanha</th>
              <th className="text-left px-4 py-2">Canal</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-right px-4 py-2">Leads</th>
              <th className="text-right px-4 py-2">Gasto</th>
              <th className="text-right px-4 py-2">Receita atrib.</th>
              <th className="text-right px-4 py-2">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {(campaigns ?? []).map((c) => {
              const p = perfById.get(c.id)
              return (
                <tr key={c.id} className="border-t border-neutral-100">
                  <td className="px-4 py-2">
                    <Link href={`/crm/campaigns/${c.id}`} className="font-medium hover:underline">
                      {c.name}
                    </Link>
                    <div className="text-xs text-neutral-500">{c.slug}</div>
                  </td>
                  <td className="px-4 py-2 capitalize">{c.channel.replace('_', ' ')}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded px-2 py-0.5 text-xs ${statusBadge[c.status] ?? ''}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">{p?.leads_count ?? 0}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{brl(c.spent_brl)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {brl(p?.attributed_revenue_brl as number | null)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {p?.roas != null ? `${p.roas}x` : '—'}
                  </td>
                </tr>
              )
            })}
            {!campaigns?.length && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                  Nenhuma campanha cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
