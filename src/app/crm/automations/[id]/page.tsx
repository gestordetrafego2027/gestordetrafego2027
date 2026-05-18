import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RuleForm from '../RuleForm'
import { updateRuleAction, deleteRuleAction } from '../actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ status?: string; period?: string }>

export default async function AutomationEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: SearchParams
}) {
  const { id } = await params
  const { status: statusFilter, period } = await searchParams
  const supabase = await createClient()

  // Período: '7' (7d) | '30' (30d) | 'all'
  const periodDays = period === '7' ? 7 : period === 'all' ? null : 30
  const since = periodDays
    ? new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000).toISOString()
    : null

  let runsQ = supabase
    .from('automation_runs')
    .select('id, status, ran_at, lead_id, client_id, error, payload')
    .eq('rule_id', id)
    .order('ran_at', { ascending: false })
    .limit(200)

  if (statusFilter && statusFilter !== 'all') {
    runsQ = runsQ.eq('status', statusFilter)
  }
  if (since) runsQ = runsQ.gte('ran_at', since)

  const [{ data: rule, error }, { data: runs }] = await Promise.all([
    supabase.from('automation_rules').select('*').eq('id', id).single(),
    runsQ,
  ])

  if (error || !rule) notFound()

  // KPIs do filtro corrente
  const successCount = (runs ?? []).filter((r) => r.status === 'success').length
  const errorCount = (runs ?? []).filter((r) => r.status === 'error').length
  const errorRate = (runs?.length ?? 0) > 0 ? (errorCount / runs!.length) * 100 : 0

  const periodLabel = period === '7' ? '7 dias' : period === 'all' ? 'todos' : '30 dias'

  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href="/crm/automations" className="text-neutral-500 hover:text-neutral-900">
          ← Voltar
        </Link>
      </div>

      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{rule.name}</h1>
          <p className="text-sm text-neutral-500">
            {rule.trigger_type} · {rule.run_count} execuções ·{' '}
            {rule.last_run_at
              ? `última em ${new Date(rule.last_run_at).toLocaleString('pt-BR')}`
              : 'nunca rodou'}
          </p>
        </div>
        <form action={deleteRuleAction}>
          <input type="hidden" name="id" value={rule.id} />
          <button className="rounded border border-rose-300 text-rose-700 text-xs px-3 py-1 hover:bg-rose-50">
            Excluir
          </button>
        </form>
      </header>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <RuleForm
          action={updateRuleAction}
          submitLabel="Salvar alterações"
          initial={{
            id: rule.id,
            name: rule.name,
            description: rule.description ?? '',
            trigger_type: rule.trigger_type,
            conditions: rule.conditions,
            actions: rule.actions,
            active: rule.active,
          }}
        />
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Execuções ({periodLabel})
          </h2>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded border border-neutral-200 bg-white px-3 py-1">
              <span className="text-neutral-500">Total:</span>{' '}
              <span className="font-semibold tabular-nums">{runs?.length ?? 0}</span>
            </div>
            <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-1">
              <span className="text-emerald-700">Sucesso:</span>{' '}
              <span className="font-semibold tabular-nums">{successCount}</span>
            </div>
            <div className="rounded border border-rose-200 bg-rose-50 px-3 py-1">
              <span className="text-rose-700">Erro:</span>{' '}
              <span className="font-semibold tabular-nums">
                {errorCount} ({errorRate.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-1 text-xs">
          <span className="text-neutral-500 mr-2 self-center">Status:</span>
          {[
            { v: undefined, label: 'todos' },
            { v: 'success',   label: 'sucesso' },
            { v: 'error',     label: 'erro' },
            { v: 'skipped',   label: 'skip' },
          ].map((opt) => {
            const active = (opt.v === undefined && !statusFilter) || statusFilter === opt.v
            const qs = new URLSearchParams()
            if (opt.v) qs.set('status', opt.v)
            if (period) qs.set('period', period)
            return (
              <Link
                key={opt.label}
                href={`/crm/automations/${rule.id}${qs.toString() ? '?' + qs.toString() : ''}`}
                className={`rounded px-2 py-1 ${active ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'}`}
              >
                {opt.label}
              </Link>
            )
          })}

          <span className="text-neutral-500 ml-4 mr-2 self-center">Período:</span>
          {[
            { v: '7',   label: '7d' },
            { v: '30',  label: '30d' },
            { v: 'all', label: 'todos' },
          ].map((opt) => {
            const active = (opt.v === '30' && !period) || period === opt.v
            const qs = new URLSearchParams()
            if (statusFilter) qs.set('status', statusFilter)
            if (opt.v !== '30') qs.set('period', opt.v)
            return (
              <Link
                key={opt.v}
                href={`/crm/automations/${rule.id}${qs.toString() ? '?' + qs.toString() : ''}`}
                className={`rounded px-2 py-1 ${active ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'}`}
              >
                {opt.label}
              </Link>
            )
          })}
        </div>

        <ul className="space-y-1 text-xs">
          {(runs ?? []).map((r) => (
            <li key={r.id} className="flex justify-between border-b border-neutral-100 py-1">
              <span>
                <span
                  className={
                    r.status === 'success'
                      ? 'text-emerald-700'
                      : r.status === 'error'
                      ? 'text-rose-700'
                      : 'text-neutral-500'
                  }
                >
                  ● {r.status}
                </span>
                {r.lead_id && (
                  <Link
                    href={`/crm/leads/${r.lead_id}`}
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    lead
                  </Link>
                )}
                {r.client_id && (
                  <Link
                    href={`/crm/clients/${r.client_id}`}
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    cliente
                  </Link>
                )}
                {r.error && <span className="ml-2 text-rose-700">erro: {r.error}</span>}
              </span>
              <span className="text-neutral-500 tabular-nums">
                {new Date(r.ran_at).toLocaleString('pt-BR')}
              </span>
            </li>
          ))}
          {!runs?.length && (
            <li className="text-neutral-400 italic">Nenhuma execução {statusFilter ? `com status "${statusFilter}"` : ''} {periodLabel === 'todos' ? '' : `nos últimos ${periodLabel}`}.</li>
          )}
        </ul>
      </section>
    </div>
  )
}
