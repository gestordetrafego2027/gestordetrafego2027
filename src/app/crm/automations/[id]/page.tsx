import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RuleForm from '../RuleForm'
import { updateRuleAction, deleteRuleAction } from '../actions'

export const dynamic = 'force-dynamic'

export default async function AutomationEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: rule, error }, { data: runs }] = await Promise.all([
    supabase.from('automation_rules').select('*').eq('id', id).single(),
    supabase
      .from('automation_runs')
      .select('id, status, ran_at, lead_id, client_id, error, payload')
      .eq('rule_id', id)
      .order('ran_at', { ascending: false })
      .limit(30),
  ])

  if (error || !rule) notFound()

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

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Histórico de execuções (últimas 30)
        </h2>
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
            <li className="text-neutral-400 italic">Nenhuma execução ainda.</li>
          )}
        </ul>
      </section>
    </div>
  )
}
