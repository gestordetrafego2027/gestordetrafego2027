import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LeadsKanban, { type LeadCard, type StageInfo } from './LeadsKanban'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ segment?: string }>

export default async function LeadsKanbanPage({ searchParams }: { searchParams: SearchParams }) {
  const { segment } = await searchParams
  const supabase = await createClient()

  // 1) Estágios — filtra por segmento se passado, senão mostra todos
  let stagesQ = supabase
    .from('pipeline_stages')
    .select('id, name, segment, position')
    .order('position', { ascending: true })

  if (segment === 'commercial' || segment === 'talents') {
    stagesQ = stagesQ.eq('segment', segment)
  }

  const { data: stagesRaw } = await stagesQ
  const stages: StageInfo[] = (stagesRaw ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    segment: s.segment as 'commercial' | 'talents',
  }))

  // 2) Leads — força filtro por segmento se passado, senão pega últimos 300 (limit defensivo)
  let leadsQ = supabase
    .from('leads')
    .select('id, name, segment, lead_type, stage_id, status')
    .order('created_at', { ascending: false })
    .limit(300)

  if (segment === 'commercial' || segment === 'talents') {
    leadsQ = leadsQ.eq('segment', segment)
  }
  // Não mostra leads "ganho/perdido/arquivado" no kanban (são terminais)
  leadsQ = leadsQ.not('status', 'in', '(arquivado)')

  const { data: leadsRaw } = await leadsQ
  const leads: LeadCard[] = (leadsRaw ?? []).map((l) => ({
    id: l.id,
    name: l.name,
    segment: l.segment as 'commercial' | 'talents',
    lead_type: l.lead_type as string,
    stage_id: l.stage_id,
    status: l.status as string,
  }))

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline de leads</h1>
          <p className="text-sm text-neutral-500">
            Arraste para mover. {leads.length} lead{leads.length === 1 ? '' : 's'}.
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <Link
            href="/crm/leads"
            className="rounded border border-neutral-300 px-3 py-1 hover:bg-neutral-50"
          >
            ← Lista
          </Link>
          <Link
            href="/crm/leads/new"
            className="rounded bg-neutral-900 text-white px-3 py-1 hover:bg-neutral-700"
          >
            + Novo
          </Link>
        </div>
      </header>

      <nav className="flex gap-1 text-xs">
        <Link
          href="/crm/leads/kanban"
          className={`rounded px-2 py-1 ${!segment ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'}`}
        >
          Todos
        </Link>
        <Link
          href="/crm/leads/kanban?segment=commercial"
          className={`rounded px-2 py-1 ${segment === 'commercial' ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'}`}
        >
          Commercial
        </Link>
        <Link
          href="/crm/leads/kanban?segment=talents"
          className={`rounded px-2 py-1 ${segment === 'talents' ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'}`}
        >
          Talents
        </Link>
      </nav>

      {stages.length === 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Nenhum estágio definido em <code>pipeline_stages</code>
          {segment ? ` para o segmento "${segment}"` : ''}. Configure os estágios no banco para usar
          o kanban.
        </div>
      ) : (
        <LeadsKanban leads={leads} stages={stages} />
      )}
    </div>
  )
}
