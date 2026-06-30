import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { promoteLeadAction } from '../actions'
import {
  addNoteAction,
  updateLeadStatusAction,
  logActivityAction,
  attachTagAction,
  detachTagAction,
} from './actions'
import { deleteInterestAction } from './interests/actions'
import Attachments from '../../components/Attachments'
import WhatsAppButton from '../../components/WhatsAppButton'
import { waTemplates } from '@/lib/whatsapp'

export const dynamic = 'force-dynamic'

const STATUS_OPTIONS = [
  'novo',
  'em_contato',
  'qualificado',
  'proposta_enviada',
  'negociacao',
  'ganho',
  'perdido',
  'arquivado',
] as const

const ACTIVITY_TYPES = ['call', 'email', 'whatsapp', 'meeting', 'note', 'task'] as const

const activityIcon: Record<string, string> = {
  call: '📞',
  email: '✉️',
  whatsapp: '💬',
  meeting: '🤝',
  note: '📝',
  task: '✅',
  status_change: '🔄',
  stage_change: '➡️',
  quote_sent: '📄',
  system: '⚙️',
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [
    { data: lead, error: leadErr },
    { data: activities },
    { data: notes },
    { data: interests },
    { data: opps },
    { data: quotes },
    { data: attachments },
    { data: leadTags },
    { data: allTags },
  ] = await Promise.all([
    supabase.from('leads').select('*, pipeline_stages(name, slug)').eq('id', id).single(),
    supabase
      .from('activities')
      .select('id, type, title, body, created_at')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('notes')
      .select('id, body, created_at')
      .eq('lead_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('lead_service_interests')
      .select('id, answers, services(name, slug), service_packages(name)')
      .eq('lead_id', id),
    supabase
      .from('opportunities')
      .select('id, title, stage, amount_brl, created_at')
      .eq('lead_id', id),
    supabase
      .from('quotes')
      .select('id, title, status, total_brl, valid_until, sent_at, accepted_at, created_at')
      .eq('lead_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('attachments')
      .select('id, storage_path, file_name, mime_type, size_bytes, kind, created_at, description')
      .eq('lead_id', id)
      .order('created_at', { ascending: false }),
    supabase.from('lead_tags').select('tag_id, tags(id, name, slug, color)').eq('lead_id', id),
    supabase.from('tags').select('id, name, slug, color').order('name', { ascending: true }),
  ])

  const tagsOnLead = (leadTags ?? [])
    .map((lt) => {
      const t = Array.isArray(lt.tags) ? lt.tags[0] : lt.tags
      return t ? { id: t.id, name: t.name, slug: t.slug, color: t.color } : null
    })
    .filter((t): t is { id: string; name: string; slug: string; color: string | null } => !!t)
  const tagIdsOnLead = new Set(tagsOnLead.map((t) => t.id))
  const availableTags = (allTags ?? []).filter((t) => !tagIdsOnLead.has(t.id))

  // 6º elemento do array desestruturado é o resultado de attachments
  // (declarado abaixo do quotes acima por ordem de Promise.all)

  if (leadErr || !lead) notFound()

  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href="/crm/leads" className="text-neutral-500 hover:text-neutral-900">
          ← Voltar para leads
        </Link>
      </div>

      <header className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{lead.name}</h1>
            <div className="mt-1 text-sm text-neutral-500 space-x-3">
              {lead.email && <span>✉️ {lead.email}</span>}
              {lead.phone && <span>📞 {lead.phone}</span>}
              {lead.city && <span>📍 {lead.city}</span>}
              {lead.phone && (
                <WhatsAppButton
                  phone={lead.phone}
                  message={waTemplates.greetLead(lead.name)}
                  size="xs"
                  label="💬 WhatsApp"
                />
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-neutral-100 px-2 py-0.5">{lead.segment}</span>
              <span className="rounded bg-neutral-100 px-2 py-0.5">{lead.lead_type}</span>
              <span className="rounded bg-amber-100 text-amber-900 px-2 py-0.5">{lead.status}</span>
              {lead.source && (
                <span className="rounded bg-blue-50 text-blue-700 px-2 py-0.5">
                  origem: {lead.source}
                </span>
              )}
              {tagsOnLead.map((t) => (
                <span
                  key={t.id}
                  className="rounded px-2 py-0.5"
                  style={{ backgroundColor: t.color ?? '#e5e7eb', color: '#111' }}
                >
                  #{t.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <form action={updateLeadStatusAction} className="flex gap-1 items-center text-xs">
              <input type="hidden" name="lead_id" value={lead.id} />
              <select
                name="status"
                defaultValue={lead.status}
                className="rounded border border-neutral-200 px-2 py-1"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button className="rounded bg-neutral-900 text-white px-2 py-1 hover:bg-neutral-700">
                Atualizar
              </button>
            </form>

            <div className="flex gap-2">
              <Link
                href={`/crm/leads/${lead.id}/edit`}
                className="rounded border border-neutral-300 text-xs px-3 py-1 hover:bg-neutral-50"
              >
                ✎ Editar
              </Link>
              <Link
                href={`/crm/leads/${lead.id}/quote/new`}
                className="rounded bg-blue-600 text-white text-xs px-3 py-1 hover:bg-blue-700"
              >
                + Nova proposta
              </Link>
            </div>

            {lead.status !== 'ganho' && (
              <form action={promoteLeadAction} className="flex gap-1 items-center text-xs">
                <input type="hidden" name="lead_id" value={lead.id} />
                <input
                  type="number"
                  name="amount_brl"
                  placeholder="Valor R$"
                  step="100"
                  min="0"
                  className="w-24 rounded border border-neutral-200 px-2 py-1"
                />
                <button className="rounded bg-emerald-600 text-white px-2 py-1 hover:bg-emerald-700">
                  → Promover a Cliente
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
              Timeline
            </h2>

            <form
              action={logActivityAction}
              className="mb-4 space-y-2 border-b border-neutral-100 pb-4"
            >
              <input type="hidden" name="lead_id" value={lead.id} />
              <div className="flex gap-2">
                <select
                  name="type"
                  defaultValue="call"
                  className="rounded border border-neutral-200 px-2 py-1 text-sm"
                >
                  {ACTIVITY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {activityIcon[t]} {t}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="title"
                  placeholder="Título (ex: 'Liguei e marquei reunião')"
                  required
                  className="flex-1 rounded border border-neutral-200 px-3 py-1 text-sm"
                />
              </div>
              <textarea
                name="body"
                rows={2}
                placeholder="Detalhes (opcional)"
                className="w-full rounded border border-neutral-200 px-3 py-1 text-sm"
              />
              <button
                type="submit"
                className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700"
              >
                Registrar atividade
              </button>
            </form>

            <ul className="space-y-3">
              {(activities ?? []).map((a) => (
                <li key={a.id} className="flex gap-3 text-sm">
                  <span className="text-lg leading-none">{activityIcon[a.type] ?? '•'}</span>
                  <div className="flex-1">
                    <div className="font-medium">{a.title}</div>
                    {a.body && <div className="text-neutral-600 text-xs mt-0.5">{a.body}</div>}
                    <div className="text-neutral-400 text-xs mt-0.5">
                      {new Date(a.created_at).toLocaleString('pt-BR')} · {a.type}
                    </div>
                  </div>
                </li>
              ))}
              {!activities?.length && (
                <li className="text-xs text-neutral-400 italic">Sem atividades ainda.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Sidebar: Tags + Notes + Interests + Opps */}
        <aside className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
              Tags
            </h2>
            {tagsOnLead.length === 0 && (
              <p className="text-xs text-neutral-400 italic mb-2">Sem tags.</p>
            )}
            <div className="flex flex-wrap gap-2 mb-3">
              {tagsOnLead.map((t) => (
                <form key={t.id} action={detachTagAction} className="inline-flex items-center">
                  <input type="hidden" name="lead_id" value={lead.id} />
                  <input type="hidden" name="tag_id" value={t.id} />
                  <span
                    className="inline-flex items-center gap-1 rounded pl-2 pr-1 py-0.5 text-xs"
                    style={{ backgroundColor: t.color ?? '#e5e7eb', color: '#111' }}
                  >
                    {t.name}
                    <button
                      type="submit"
                      title="Remover"
                      className="rounded-full hover:bg-black/10 w-4 h-4 leading-none flex items-center justify-center"
                    >
                      ×
                    </button>
                  </span>
                </form>
              ))}
            </div>
            {availableTags.length > 0 ? (
              <form action={attachTagAction} className="flex gap-1">
                <input type="hidden" name="lead_id" value={lead.id} />
                <select
                  name="tag_id"
                  defaultValue=""
                  className="flex-1 rounded border border-neutral-200 px-2 py-1 text-xs bg-white"
                  required
                >
                  <option value="" disabled>
                    + adicionar tag…
                  </option>
                  {availableTags.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded bg-neutral-900 text-white text-xs px-2 py-1 hover:bg-neutral-700"
                >
                  +
                </button>
              </form>
            ) : (
              <p className="text-xs text-neutral-400">
                {(allTags?.length ?? 0) === 0 ? (
                  <>
                    Nenhuma tag cadastrada.{' '}
                    <Link href="/crm/tags" className="underline">
                      Criar uma →
                    </Link>
                  </>
                ) : (
                  'Todas as tags já estão aplicadas.'
                )}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
              Observações
            </h2>
            <form action={addNoteAction} className="space-y-2 mb-3">
              <input type="hidden" name="lead_id" value={lead.id} />
              <textarea
                name="body"
                rows={3}
                required
                placeholder="Adicionar observação interna…"
                className="w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700"
              >
                + Adicionar
              </button>
            </form>
            <ul className="space-y-2 text-sm">
              {(notes ?? []).map((n) => (
                <li key={n.id} className="border-l-2 border-neutral-200 pl-3">
                  <div className="whitespace-pre-wrap">{n.body}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {new Date(n.created_at).toLocaleString('pt-BR')}
                  </div>
                </li>
              ))}
              {!notes?.length && (
                <li className="text-xs text-neutral-400 italic">Nenhuma observação.</li>
              )}
            </ul>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
              Anexos
            </h2>
            <Attachments
              leadId={lead.id}
              initial={(attachments ?? []).map((a) => ({
                id: a.id,
                storage_path: a.storage_path,
                file_name: a.file_name,
                mime_type: a.mime_type,
                size_bytes: a.size_bytes,
                kind: a.kind,
                created_at: a.created_at,
                description: a.description,
              }))}
            />
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Serviços de interesse
              </h2>
              <Link
                href={`/crm/leads/${lead.id}/interests/new`}
                className="text-xs text-neutral-600 hover:underline"
              >
                + adicionar
              </Link>
            </div>
            <ul className="space-y-2 text-sm">
              {(interests ?? []).map((si) => {
                const svc = Array.isArray(si.services) ? si.services[0] : si.services
                const pkg = Array.isArray(si.service_packages)
                  ? si.service_packages[0]
                  : si.service_packages
                const serviceName = svc?.name ?? '—'
                const pkgName = pkg?.name
                const answers = si.answers as Record<string, unknown> | null
                return (
                  <li key={si.id} className="border border-neutral-100 rounded p-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-medium">{serviceName}</div>
                        {pkgName && (
                          <div className="text-xs text-neutral-500">Pacote: {pkgName}</div>
                        )}
                      </div>
                      <form action={deleteInterestAction}>
                        <input type="hidden" name="interest_id" value={si.id} />
                        <input type="hidden" name="lead_id" value={lead.id} />
                        <button
                          type="submit"
                          className="text-[10px] text-rose-600 hover:underline"
                          title="Remover interesse"
                        >
                          ×
                        </button>
                      </form>
                    </div>
                    {answers && Object.keys(answers).length > 0 && (
                      <details className="mt-1">
                        <summary className="text-xs text-neutral-500 cursor-pointer">
                          Respostas ({Object.keys(answers).length})
                        </summary>
                        <pre className="mt-1 text-[10px] bg-neutral-50 p-2 rounded overflow-x-auto">
                          {JSON.stringify(answers, null, 2)}
                        </pre>
                      </details>
                    )}
                  </li>
                )
              })}
              {!interests?.length && (
                <li className="text-xs text-neutral-400 italic">Nenhum serviço marcado.</li>
              )}
            </ul>
          </div>

          {!!quotes?.length && (
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                Propostas
              </h2>
              <ul className="space-y-2 text-sm">
                {quotes.map((q) => (
                  <li key={q.id} className="flex justify-between border-l-2 border-blue-300 pl-3">
                    <div>
                      <Link href={`/crm/quotes/${q.id}`} className="font-medium hover:underline">
                        {q.title}
                      </Link>
                      <div className="text-xs text-neutral-500 capitalize">
                        {q.status}
                        {q.valid_until &&
                          ` · válida até ${new Date(q.valid_until).toLocaleDateString('pt-BR')}`}
                      </div>
                    </div>
                    <div className="text-sm tabular-nums">
                      {(Number(q.total_brl) || 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!opps?.length && (
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                Oportunidades
              </h2>
              <ul className="space-y-2 text-sm">
                {opps.map((o) => (
                  <li
                    key={o.id}
                    className="flex justify-between border-l-2 border-emerald-300 pl-3"
                  >
                    <div>
                      <div className="font-medium">{o.title}</div>
                      <div className="text-xs text-neutral-500 capitalize">{o.stage}</div>
                    </div>
                    <div className="text-sm tabular-nums">
                      {(Number(o.amount_brl) || 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lead.details && Object.keys(lead.details as Record<string, unknown>).length > 0 && (
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                Dados do formulário
              </h2>
              <pre className="text-[10px] bg-neutral-50 p-2 rounded overflow-x-auto">
                {JSON.stringify(lead.details, null, 2)}
              </pre>
            </div>
          )}
        </aside>
      </section>
    </div>
  )
}
