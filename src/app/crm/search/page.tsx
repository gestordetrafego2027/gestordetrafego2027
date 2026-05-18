import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Busca | CRM' }

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function buildOrFilter(q: string, fields: string[]): string {
  return fields.map((f) => `${f}.ilike.%${q}%`).join(',')
}

// Escape regex specials para destacar match
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function Highlight({ text, q }: { text: string | null | undefined; q: string }) {
  if (!text) return <span className="text-neutral-400">—</span>
  if (!q.trim()) return <>{text}</>
  const re = new RegExp(`(${escapeRegex(q.trim())})`, 'ig')
  const parts = text.split(re)
  return (
    <>
      {parts.map((p, i) =>
        re.test(p) ? (
          <mark key={i} className="bg-yellow-200 text-neutral-900 px-0.5 rounded">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

type EntityKey = 'all' | 'leads' | 'clients' | 'opportunities' | 'quotes' | 'invoices' | 'campaigns' | 'catalog'

const ENTITY_LABELS: Record<EntityKey, string> = {
  all: 'Tudo',
  leads: 'Leads',
  clients: 'Clientes',
  opportunities: 'Oportunidades',
  quotes: 'Propostas',
  invoices: 'Faturas',
  campaigns: 'Campanhas',
  catalog: 'Catálogo',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>
}) {
  const { q: rawQ = '', type } = await searchParams
  const term = rawQ.trim()
  const VALID_ENTITIES = ['leads','clients','opportunities','quotes','invoices','campaigns','catalog'] as const
  const entity: EntityKey =
    type && (VALID_ENTITIES as readonly string[]).includes(type)
      ? (type as EntityKey)
      : 'all'

  const supabase = await createClient()

  // Sem termo → empty state com recentes
  if (!term) {
    const [{ data: recentLeads }, { data: recentClients }] = await Promise.all([
      supabase
        .from('leads')
        .select('id, name, lead_type, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('clients')
        .select('id, display_name, unit, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
    ])
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Busca global</h1>
          <p className="text-sm text-neutral-500">
            Digite no campo do topo. Busca em leads, clientes, oportunidades, propostas, faturas, campanhas, serviços e tags.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Leads recentes</div>
            <ul className="space-y-1 text-sm">
              {(recentLeads ?? []).map((l) => (
                <li key={l.id}>
                  <Link href={`/crm/leads/${l.id}`} className="hover:underline">{l.name}</Link>
                  <span className="text-xs text-neutral-500 ml-2">{l.lead_type}</span>
                </li>
              ))}
              {!recentLeads?.length && <li className="text-xs text-neutral-400 italic">Sem leads ainda.</li>}
            </ul>
          </section>
          <section className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Clientes recentes</div>
            <ul className="space-y-1 text-sm">
              {(recentClients ?? []).map((c) => (
                <li key={c.id}>
                  <Link href={`/crm/clients/${c.id}`} className="hover:underline">{c.display_name}</Link>
                  <span className="text-xs text-neutral-500 ml-2 capitalize">{c.unit}</span>
                </li>
              ))}
              {!recentClients?.length && <li className="text-xs text-neutral-400 italic">Sem clientes ainda.</li>}
            </ul>
          </section>
        </div>

        <p className="text-xs text-neutral-500">
          Dica: digite o nome de uma <strong>tag</strong> para encontrar todos os leads classificados com ela. Funciona também com email, telefone, CPF/CNPJ, número de fatura, slug ou UTM.
        </p>
      </div>
    )
  }

  // Decide quais entidades buscar
  const want = (k: EntityKey) => entity === 'all' || entity === k

  // 1) Busca tags por nome para usar como filtro extra em leads
  const { data: matchedTags } = await supabase
    .from('tags')
    .select('id, name, color')
    .ilike('name', `%${term}%`)
    .limit(20)
  const taggedLeadIds: string[] = []
  if (matchedTags && matchedTags.length > 0) {
    const { data: lt } = await supabase
      .from('lead_tags')
      .select('lead_id')
      .in('tag_id', matchedTags.map((t) => t.id))
    for (const r of lt ?? []) taggedLeadIds.push(r.lead_id)
  }

  // 2) Queries em paralelo (só as que importam)
  const [
    leadsRes,
    leadsByTagRes,
    clientsRes,
    oppsRes,
    quotesRes,
    invoicesRes,
    campaignsRes,
    servicesRes,
  ] = await Promise.all([
    want('leads')
      ? supabase
          .from('leads')
          .select('id, name, email, phone, status, lead_type, segment, created_at')
          .or(buildOrFilter(term, ['name', 'email', 'phone', 'city']))
          .order('created_at', { ascending: false })
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
    want('leads') && taggedLeadIds.length > 0
      ? supabase
          .from('leads')
          .select('id, name, email, phone, status, lead_type, segment, created_at')
          .in('id', taggedLeadIds)
          .order('created_at', { ascending: false })
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
    want('clients')
      ? supabase
          .from('clients')
          .select('id, display_name, legal_name, email, phone, document, unit, status, lifetime_value_brl')
          .or(buildOrFilter(term, ['display_name', 'legal_name', 'email', 'phone', 'document']))
          .order('created_at', { ascending: false })
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
    want('opportunities')
      ? supabase
          .from('opportunities')
          .select('id, title, stage, amount_brl, unit, lead_id, client_id, created_at')
          .ilike('title', `%${term}%`)
          .order('created_at', { ascending: false })
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
    want('quotes')
      ? supabase
          .from('quotes')
          .select('id, title, status, total_brl, lead_id, public_token, created_at')
          .or(buildOrFilter(term, ['title']))
          .order('created_at', { ascending: false })
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
    want('invoices')
      ? supabase
          .from('invoices')
          .select('id, number, status, total_brl, paid_brl, issue_date, due_date, client_id')
          .or(buildOrFilter(term, ['number', 'notes']))
          .order('issue_date', { ascending: false })
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
    want('campaigns')
      ? supabase
          .from('campaigns')
          .select('id, name, slug, channel, status, unit, utm_campaign, utm_source')
          .or(buildOrFilter(term, ['name', 'slug', 'utm_campaign', 'utm_source', 'utm_medium', 'goal']))
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
    want('catalog')
      ? supabase
          .from('services')
          .select('id, name, slug, unit, active, description')
          .or(buildOrFilter(term, ['name', 'slug', 'description']))
          .limit(30)
      : Promise.resolve({ data: [] as never[] }),
  ])

  // Mescla leadsRes + leadsByTagRes, sem duplicar
  const leadsMap = new Map<string, NonNullable<typeof leadsRes.data>[number]>()
  for (const l of leadsRes.data ?? []) leadsMap.set(l.id, l)
  for (const l of leadsByTagRes.data ?? []) if (!leadsMap.has(l.id)) leadsMap.set(l.id, l)
  const leads = Array.from(leadsMap.values())

  const counts: Record<EntityKey, number> = {
    all: 0,
    leads: leads.length,
    clients: clientsRes.data?.length ?? 0,
    opportunities: oppsRes.data?.length ?? 0,
    quotes: quotesRes.data?.length ?? 0,
    invoices: invoicesRes.data?.length ?? 0,
    campaigns: campaignsRes.data?.length ?? 0,
    catalog: servicesRes.data?.length ?? 0,
  }
  counts.all =
    counts.leads + counts.clients + counts.opportunities +
    counts.quotes + counts.invoices + counts.campaigns + counts.catalog

  const empty = counts.all === 0

  // Render
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Busca global</h1>
        <p className="text-sm text-neutral-500">
          {counts.all} resultado{counts.all === 1 ? '' : 's'} para “<span className="font-medium">{term}</span>”
          {matchedTags && matchedTags.length > 0 && (
            <> · {matchedTags.length} tag{matchedTags.length === 1 ? '' : 's'} casaram → {taggedLeadIds.length} lead{taggedLeadIds.length === 1 ? '' : 's'}</>
          )}
        </p>
      </header>

      {/* Filtros por entidade */}
      <nav className="flex flex-wrap gap-1 text-xs">
        {(Object.keys(ENTITY_LABELS) as EntityKey[]).map((k) => {
          const active = entity === k
          const qs = new URLSearchParams({ q: term })
          if (k !== 'all') qs.set('type', k)
          return (
            <Link
              key={k}
              href={`/crm/search?${qs.toString()}`}
              className={`rounded px-2 py-1 ${
                active
                  ? 'bg-neutral-900 text-white'
                  : 'border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {ENTITY_LABELS[k]} ({counts[k]})
            </Link>
          )
        })}
      </nav>

      {/* Tags casadas */}
      {matchedTags && matchedTags.length > 0 && (
        <section className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
            Tags ({matchedTags.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedTags.map((t) => (
              <Link
                key={t.id}
                href={`/crm/leads?tag=${t.id}`}
                className="rounded px-2 py-0.5 text-xs hover:underline"
                style={{ backgroundColor: t.color ?? '#e5e7eb', color: '#111' }}
              >
                #{t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {empty && (
        <p className="text-sm text-neutral-500 italic">Nada encontrado.</p>
      )}

      {/* Leads */}
      {leads.length > 0 && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Leads ({leads.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {leads.map((l) => (
              <li key={l.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/leads/${l.id}`} className="font-medium hover:underline">
                    <Highlight text={l.name} q={term} />
                  </Link>
                  <div className="text-xs text-neutral-500">
                    <Highlight text={l.email ?? '—'} q={term} /> · <Highlight text={l.phone ?? '—'} q={term} /> · {l.lead_type} · {l.segment}
                  </div>
                </div>
                <span className="text-xs self-center rounded bg-amber-100 text-amber-900 px-2 py-0.5">
                  {l.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Clientes */}
      {!!clientsRes.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Clientes ({clientsRes.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {clientsRes.data.map((c) => (
              <li key={c.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/clients/${c.id}`} className="font-medium hover:underline">
                    <Highlight text={c.display_name} q={term} />
                  </Link>
                  <div className="text-xs text-neutral-500">
                    <Highlight text={c.email ?? '—'} q={term} /> · <Highlight text={c.phone ?? '—'} q={term} /> · {c.unit} · <Highlight text={c.document ?? '—'} q={term} />
                  </div>
                </div>
                <span className="text-xs self-center tabular-nums">
                  LTV {brl(c.lifetime_value_brl)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Oportunidades */}
      {!!oppsRes.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Oportunidades ({oppsRes.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {oppsRes.data.map((o) => (
              <li key={o.id} className="px-4 py-2 flex justify-between">
                <div>
                  <span className="font-medium">
                    <Highlight text={o.title} q={term} />
                  </span>
                  <div className="text-xs text-neutral-500 capitalize">
                    {o.stage} · {o.unit}
                    {o.lead_id && <> · <Link href={`/crm/leads/${o.lead_id}`} className="text-blue-600 hover:underline">lead</Link></>}
                    {o.client_id && <> · <Link href={`/crm/clients/${o.client_id}`} className="text-blue-600 hover:underline">cliente</Link></>}
                  </div>
                </div>
                <span className="text-xs self-center tabular-nums">{brl(o.amount_brl)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Propostas */}
      {!!quotesRes.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Propostas ({quotesRes.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {quotesRes.data.map((q) => (
              <li key={q.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/quotes/${q.id}`} className="font-medium hover:underline">
                    <Highlight text={q.title} q={term} />
                  </Link>
                  <div className="text-xs text-neutral-500">{q.status}</div>
                </div>
                <span className="text-xs self-center tabular-nums">{brl(q.total_brl)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Faturas */}
      {!!invoicesRes.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Faturas ({invoicesRes.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {invoicesRes.data.map((inv) => (
              <li key={inv.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/invoices/${inv.id}`} className="font-medium hover:underline font-mono text-xs">
                    <Highlight text={inv.number ?? inv.id.slice(0, 8)} q={term} />
                  </Link>
                  <div className="text-xs text-neutral-500">
                    {inv.status}
                    {inv.issue_date && <> · emitida {new Date(inv.issue_date).toLocaleDateString('pt-BR')}</>}
                    {inv.due_date && <> · vence {new Date(inv.due_date).toLocaleDateString('pt-BR')}</>}
                  </div>
                </div>
                <span className="text-xs self-center tabular-nums">{brl(inv.total_brl)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Campanhas */}
      {!!campaignsRes.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Campanhas ({campaignsRes.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {campaignsRes.data.map((c) => (
              <li key={c.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/campaigns/${c.id}`} className="font-medium hover:underline">
                    <Highlight text={c.name} q={term} />
                  </Link>
                  <div className="text-xs text-neutral-500 capitalize">
                    {c.channel} · {c.status}
                    {c.utm_source && <> · utm:<Highlight text={c.utm_source} q={term} /></>}
                  </div>
                </div>
                <span className="text-xs self-center text-neutral-500">{c.unit ?? '—'}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Catálogo */}
      {!!servicesRes.data?.length && (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="bg-neutral-50 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Catálogo ({servicesRes.data.length})
          </div>
          <ul className="divide-y divide-neutral-100 text-sm">
            {servicesRes.data.map((s) => (
              <li key={s.id} className="px-4 py-2 flex justify-between">
                <div>
                  <Link href={`/crm/catalog/services/${s.id}`} className="font-medium hover:underline">
                    <Highlight text={s.name} q={term} />
                  </Link>
                  <div className="text-xs text-neutral-500">
                    <span className="font-mono">{s.slug}</span> · {s.unit}
                    {!s.active && <> · <span className="text-rose-600">inativo</span></>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
