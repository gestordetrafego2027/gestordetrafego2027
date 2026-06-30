import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { toggleRuleAction } from './actions'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Automações | CRM' }

const triggerBadge: Record<string, string> = {
  lead_created: 'bg-blue-100 text-blue-700',
  lead_status_change: 'bg-blue-100 text-blue-700',
  stage_change: 'bg-blue-100 text-blue-700',
  quote_accepted: 'bg-emerald-100 text-emerald-700',
  invoice_overdue: 'bg-rose-100 text-rose-700',
  inactivity: 'bg-amber-100 text-amber-700',
  cron: 'bg-neutral-200 text-neutral-700',
}

export default async function AutomationsPage() {
  const supabase = await createClient()
  const [{ data: rules }, { data: recentRuns }] = await Promise.all([
    supabase
      .from('automation_rules')
      .select('id, name, description, trigger_type, active, last_run_at, run_count, created_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('automation_runs')
      .select('id, rule_id, status, ran_at, lead_id, client_id')
      .order('ran_at', { ascending: false })
      .limit(20),
  ])

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Automações</h1>
          <p className="text-sm text-neutral-500">
            Regras que disparam ações automáticas no funil. Edite, ative ou crie novas.
          </p>
        </div>
        <Link
          href="/crm/automations/new"
          className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
        >
          + Nova regra
        </Link>
      </header>

      <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2">Regra</th>
              <th className="text-left px-4 py-2">Gatilho</th>
              <th className="text-right px-4 py-2">Execuções</th>
              <th className="text-left px-4 py-2">Última rodada</th>
              <th className="text-center px-4 py-2">Ativa</th>
            </tr>
          </thead>
          <tbody>
            {(rules ?? []).map((r) => (
              <tr key={r.id} className="border-t border-neutral-100">
                <td className="px-4 py-2">
                  <Link href={`/crm/automations/${r.id}`} className="font-medium hover:underline">
                    {r.name}
                  </Link>
                  {r.description && <div className="text-xs text-neutral-500">{r.description}</div>}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs ${triggerBadge[r.trigger_type] ?? ''}`}
                  >
                    {r.trigger_type}
                  </span>
                </td>
                <td className="px-4 py-2 text-right tabular-nums">{r.run_count}</td>
                <td className="px-4 py-2 text-xs text-neutral-500">
                  {r.last_run_at ? new Date(r.last_run_at).toLocaleString('pt-BR') : '—'}
                </td>
                <td className="px-4 py-2 text-center">
                  <form action={toggleRuleAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="active" value={String(r.active)} />
                    <button
                      className={`rounded px-2 py-0.5 text-xs ${
                        r.active
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                      }`}
                    >
                      {r.active ? '● Ativa' : '○ Inativa'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {!rules?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Nenhuma automação. Crie a primeira.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Execuções recentes
        </h2>
        <ul className="space-y-1 text-xs">
          {(recentRuns ?? []).map((run) => {
            const rule = rules?.find((r) => r.id === run.rule_id)
            return (
              <li key={run.id} className="flex justify-between border-b border-neutral-100 py-1">
                <span>
                  <span className="font-medium">{rule?.name ?? 'regra removida'}</span>
                  {run.lead_id && (
                    <Link
                      href={`/crm/leads/${run.lead_id}`}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      lead
                    </Link>
                  )}
                  {run.client_id && (
                    <Link
                      href={`/crm/clients/${run.client_id}`}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      cliente
                    </Link>
                  )}
                </span>
                <span className="text-neutral-500 tabular-nums">
                  {new Date(run.ran_at).toLocaleString('pt-BR')} · {run.status}
                </span>
              </li>
            )
          })}
          {!recentRuns?.length && (
            <li className="text-neutral-400 italic">Sem execuções nas últimas 20.</li>
          )}
        </ul>
      </section>
    </div>
  )
}
