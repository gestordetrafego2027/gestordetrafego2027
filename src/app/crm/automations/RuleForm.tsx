'use client'

import { useState } from 'react'

const TRIGGER_OPTIONS = [
  { value: 'lead_created', label: 'Quando lead é criado' },
  { value: 'lead_status_change', label: 'Quando status do lead muda' },
  { value: 'stage_change', label: 'Quando estágio muda' },
  { value: 'quote_accepted', label: 'Quando proposta é aceita' },
  { value: 'invoice_overdue', label: 'Quando fatura vence (cron diário)' },
  { value: 'inactivity', label: 'Lead inativo por N dias (cron diário)' },
  { value: 'cron', label: 'Cron customizado' },
] as const

const ACTION_TEMPLATES: Record<string, string> = {
  create_activity: JSON.stringify(
    [{ type: 'create_activity', activity_type: 'system', title: 'Lead recebido (auto)' }],
    null, 2,
  ),
  send_email: JSON.stringify(
    [{ type: 'send_email', template: 'welcome_lead' }],
    null, 2,
  ),
  update_opportunity_ganho: JSON.stringify(
    [
      { type: 'update_opportunity', stage: 'ganho' },
      { type: 'create_activity', activity_type: 'system', title: 'Proposta aceita — iniciar onboarding' },
    ],
    null, 2,
  ),
  follow_up: JSON.stringify(
    [
      { type: 'create_activity', activity_type: 'task', title: 'Follow-up de reengajamento' },
      { type: 'notify_owner' },
    ],
    null, 2,
  ),
}

const CONDITION_HINT: Record<string, string> = {
  lead_created: '{}',
  inactivity: '{"days_idle": 14, "status_in": ["novo","em_contato"]}',
  invoice_overdue: '{"days_overdue": 1}',
  quote_accepted: '{}',
  lead_status_change: '{"to": "qualificado"}',
  stage_change: '{}',
  cron: '{"cron": "0 3 * * *"}',
}

export default function RuleForm({
  action,
  initial,
  submitLabel = 'Salvar',
}: {
  action: (formData: FormData) => void | Promise<void>
  initial?: {
    id?: string
    name?: string
    description?: string
    trigger_type?: string
    conditions?: unknown
    actions?: unknown
    active?: boolean
  }
  submitLabel?: string
}) {
  const [trigger, setTrigger] = useState(initial?.trigger_type ?? 'lead_created')
  const [actionsJson, setActionsJson] = useState(
    JSON.stringify(initial?.actions ?? [], null, 2),
  )

  return (
    <form action={action} className="space-y-5">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-neutral-500">Nome</span>
          <input
            name="name"
            required
            defaultValue={initial?.name ?? ''}
            className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-neutral-500">Gatilho</span>
          <select
            name="trigger_type"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
          >
            {TRIGGER_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide text-neutral-500">Descrição</span>
        <textarea
          name="description"
          rows={2}
          defaultValue={initial?.description ?? ''}
          className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-wide text-neutral-500">
          Condições (JSON) — ex: <code>{CONDITION_HINT[trigger]}</code>
        </span>
        <textarea
          name="conditions"
          rows={3}
          defaultValue={JSON.stringify(initial?.conditions ?? {}, null, 2)}
          className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-xs font-mono"
        />
      </label>

      <div>
        <span className="text-xs uppercase tracking-wide text-neutral-500">Ações (JSON)</span>
        <div className="flex flex-wrap gap-1 mb-1 mt-1">
          {Object.entries(ACTION_TEMPLATES).map(([key, tpl]) => (
            <button
              type="button"
              key={key}
              onClick={() => setActionsJson(tpl)}
              className="text-[10px] rounded bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5"
            >
              + {key}
            </button>
          ))}
        </div>
        <textarea
          name="actions"
          rows={8}
          value={actionsJson}
          onChange={(e) => setActionsJson(e.target.value)}
          className="w-full rounded border border-neutral-200 px-3 py-2 text-xs font-mono"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="active"
          defaultChecked={initial?.active ?? true}
        />
        <span className="text-sm">Ativa</span>
      </label>

      <button
        type="submit"
        className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
      >
        {submitLabel}
      </button>
    </form>
  )
}
