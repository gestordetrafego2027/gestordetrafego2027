import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { promoteLeadAction } from './actions'

export const dynamic = 'force-dynamic'

const statusLabel: Record<string, string> = {
  novo: 'Novo',
  em_contato: 'Em contato',
  qualificado: 'Qualificado',
  proposta_enviada: 'Proposta enviada',
  negociacao: 'Negociação',
  ganho: 'Ganho',
  perdido: 'Perdido',
  arquivado: 'Arquivado',
}

const STATUS_VALUES = [
  'novo','em_contato','qualificado','proposta_enviada',
  'negociacao','ganho','perdido','arquivado',
] as const
const SEGMENT_VALUES = ['commercial', 'talents'] as const

type SearchParams = Promise<{
  segment?: string
  status?: string
  tag?: string
  stage?: string
}>

export default async function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  const { segment, status, tag, stage } = await searchParams
  const supabase = await createClient()

  // 1) Tags/stages para dropdowns
  const [{ data: allTags }, { data: stages }] = await Promise.all([
    supabase.from('tags').select('id, name, slug, color').order('name', { ascending: true }),
    supabase
      .from('pipeline_stages')
      .select('id, name, segment, position')
      .order('position', { ascending: true }),
  ])

  // 2) Se filtro por tag, obter os lead_ids dessa tag
  let leadIdsFromTag: string[] | null = null
  if (tag) {
    const { data: lt } = await supabase
      .from('lead_tags')
      .select('lead_id')
      .eq('tag_id', tag)
    leadIdsFromTag = (lt ?? []).map((r) => r.lead_id)
    if (leadIdsFromTag.length === 0) leadIdsFromTag = ['__none__'] // força resultado vazio
  }

  // 3) Query principal
  let q = supabase
    .from('leads')
    .select('id, name, email, phone, segment, lead_type, status, stage_id, created_at, pipeline_stages(name)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (segment && (SEGMENT_VALUES as readonly string[]).includes(segment)) {
    q = q.eq('segment', segment as 'commercial' | 'talents')
  }
  if (status && (STATUS_VALUES as readonly string[]).includes(status)) {
    q = q.eq('status', status as (typeof STATUS_VALUES)[number])
  }
  if (stage) {
    q = q.eq('stage_id', stage)
  }
  if (leadIdsFromTag) {
    q = q.in('id', leadIdsFromTag)
  }

  const { data: leads, error } = await q

  // 4) Buscar tags dos leads listados (uma query batch)
  const leadIds = (leads ?? []).map((l) => l.id)
  const { data: leadTagRows } = leadIds.length
    ? await supabase
        .from('lead_tags')
        .select('lead_id, tags(id, name, slug, color)')
        .in('lead_id', leadIds)
    : { data: [] as { lead_id: string; tags: { id: string; name: string; slug: string; color: string | null } | { id: string; name: string; slug: string; color: string | null }[] | null }[] }

  const tagsByLead = new Map<string, { id: string; name: string; color: string | null }[]>()
  for (const row of leadTagRows ?? []) {
    const t = Array.isArray(row.tags) ? row.tags[0] : row.tags
    if (!t) continue
    const list = tagsByLead.get(row.lead_id) ?? []
    list.push({ id: t.id, name: t.name, color: t.color })
    tagsByLead.set(row.lead_id, list)
  }

  const hasFilter = !!(segment || status || tag || stage)

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-neutral-500">
            {leads?.length ?? 0} resultado{(leads?.length ?? 0) === 1 ? '' : 's'} {hasFilter ? '(filtrado)' : '(últimos 100)'}.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/crm/leads/kanban"
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
          >
            ⊞ Kanban
          </Link>
          <a
            href="/crm/api/export?entity=leads"
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
          >
            ↓ CSV
          </a>
          <Link
            href="/crm/leads/new"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            + Novo lead
          </Link>
        </div>
      </header>

      {/* Filtros */}
      <form
        method="get"
        className="flex flex-wrap items-end gap-2 rounded-lg border border-neutral-200 bg-white p-3 text-sm"
      >
        <label className="space-y-0.5">
          <span className="block text-[10px] uppercase tracking-wide text-neutral-500">Segmento</span>
          <select
            name="segment"
            defaultValue={segment ?? ''}
            className="rounded border border-neutral-200 px-2 py-1 text-sm bg-white"
          >
            <option value="">todos</option>
            <option value="commercial">commercial</option>
            <option value="talents">talents</option>
          </select>
        </label>
        <label className="space-y-0.5">
          <span className="block text-[10px] uppercase tracking-wide text-neutral-500">Status</span>
          <select
            name="status"
            defaultValue={status ?? ''}
            className="rounded border border-neutral-200 px-2 py-1 text-sm bg-white"
          >
            <option value="">todos</option>
            {STATUS_VALUES.map((s) => (
              <option key={s} value={s}>{statusLabel[s] ?? s}</option>
            ))}
          </select>
        </label>
        <label className="space-y-0.5">
          <span className="block text-[10px] uppercase tracking-wide text-neutral-500">Estágio</span>
          <select
            name="stage"
            defaultValue={stage ?? ''}
            className="rounded border border-neutral-200 px-2 py-1 text-sm bg-white"
          >
            <option value="">todos</option>
            {(stages ?? []).map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.segment})</option>
            ))}
          </select>
        </label>
        <label className="space-y-0.5">
          <span className="block text-[10px] uppercase tracking-wide text-neutral-500">Tag</span>
          <select
            name="tag"
            defaultValue={tag ?? ''}
            className="rounded border border-neutral-200 px-2 py-1 text-sm bg-white"
          >
            <option value="">todas</option>
            {(allTags ?? []).map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded bg-neutral-900 text-white text-sm px-3 py-1 hover:bg-neutral-700"
        >
          Filtrar
        </button>
        {hasFilter && (
          <Link
            href="/crm/leads"
            className="rounded border border-neutral-300 text-sm px-3 py-1 hover:bg-neutral-50"
          >
            Limpar
          </Link>
        )}
      </form>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          Erro ao carregar leads: {error.message}
        </p>
      )}

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Nome</th>
              <th className="text-left px-4 py-2 font-medium">Contato</th>
              <th className="text-left px-4 py-2 font-medium">Tipo</th>
              <th className="text-left px-4 py-2 font-medium">Estágio</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium">Tags</th>
              <th className="text-left px-4 py-2 font-medium">Criado</th>
              <th className="text-right px-4 py-2 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {!leads?.length && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-neutral-500">
                  {hasFilter ? 'Nenhum lead encontrado com esses filtros.' : 'Nenhum lead ainda. Crie o primeiro.'}
                </td>
              </tr>
            )}
            {leads?.map((l) => {
              const stageObj = Array.isArray(l.pipeline_stages) ? l.pipeline_stages[0] : l.pipeline_stages
              const stageName = stageObj?.name ?? null
              const leadTagList = tagsByLead.get(l.id) ?? []
              return (
                <tr key={l.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-medium">
                    <Link href={`/crm/leads/${l.id}`} className="hover:underline">
                      {l.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    <div>{l.email ?? '—'}</div>
                    <div className="text-xs text-neutral-400">{l.phone ?? ''}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{l.lead_type}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {stageName ? (
                      <span className="rounded bg-indigo-50 text-indigo-700 px-2 py-0.5 text-xs">
                        {stageName}
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded bg-neutral-100 px-2 py-0.5 text-xs">
                      {statusLabel[l.status] ?? l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {leadTagList.map((t) => (
                        <span
                          key={t.id}
                          className="rounded px-1.5 py-0.5 text-[10px]"
                          style={{ backgroundColor: t.color ?? '#e5e7eb', color: '#111' }}
                        >
                          {t.name}
                        </span>
                      ))}
                      {leadTagList.length === 0 && (
                        <span className="text-[10px] text-neutral-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 text-xs">
                    {new Date(l.created_at).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {l.status !== 'ganho' && (
                      <form action={promoteLeadAction} className="inline-flex items-center gap-1">
                        <input type="hidden" name="lead_id" value={l.id} />
                        <input
                          type="number"
                          name="amount_brl"
                          placeholder="R$"
                          step="100"
                          min="0"
                          className="w-20 rounded border border-neutral-200 px-1.5 py-0.5 text-xs"
                        />
                        <button
                          type="submit"
                          className="rounded bg-emerald-600 text-white text-xs px-2 py-0.5 hover:bg-emerald-700"
                        >
                          → Cliente
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
