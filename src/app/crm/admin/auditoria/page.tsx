import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Auditoria | CRM' }

const actionColor: Record<string, string> = {
  insert: 'bg-emerald-100 text-emerald-700',
  update: 'bg-blue-100 text-blue-700',
  delete: 'bg-rose-100 text-rose-700',
}

const entityLink: Record<string, string> = {
  leads: '/crm/leads',
  clients: '/crm/clients',
  opportunities: '/crm/opportunities',
  quotes: '/crm/quotes',
  invoices: '/crm/clients',
  payments: '/crm/clients',
}

export default async function AuditoriaPage({
  searchParams,
}: {
  searchParams: Promise<{ entity?: string; actor?: string }>
}) {
  const { entity, actor } = await searchParams
  const supabase = await createClient()

  // Bloqueia não-admin
  const { data: { user } } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') {
    redirect('/crm?error=' + encodeURIComponent('Apenas admin acessa a auditoria.'))
  }

  let q = supabase
    .from('audit_log')
    .select('id, ts, actor_email, entity, entity_id, action, diff')
    .order('ts', { ascending: false })
    .limit(200)

  if (entity) q = q.eq('entity', entity)
  if (actor) q = q.eq('actor_email', actor)

  const { data: rows, error } = await q

  const entities = ['leads', 'clients', 'opportunities', 'quotes', 'invoices', 'payments']

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Auditoria</h1>
        <p className="text-sm text-neutral-500">
          Histórico completo de mutações nas tabelas críticas. Últimas 200 ações.
        </p>
      </header>

      <nav className="flex flex-wrap gap-1 text-xs">
        <Link
          href="/crm/admin/auditoria"
          className={`rounded px-2 py-1 ${!entity ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'}`}
        >
          todas
        </Link>
        {entities.map((e) => (
          <Link
            key={e}
            href={`/crm/admin/auditoria?entity=${e}`}
            className={`rounded px-2 py-1 capitalize ${
              entity === e ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            {e}
          </Link>
        ))}
      </nav>

      {error && (
        <div className="rounded border border-rose-200 bg-rose-50 text-rose-700 p-3 text-sm">
          {error.message}
        </div>
      )}

      <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 w-40">Quando</th>
              <th className="text-left px-4 py-2 w-32">Quem</th>
              <th className="text-left px-4 py-2 w-24">Ação</th>
              <th className="text-left px-4 py-2">Entidade</th>
              <th className="text-left px-4 py-2">Mudanças</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r) => (
              <tr key={r.id} className="border-t border-neutral-100 align-top">
                <td className="px-4 py-2 text-xs text-neutral-500 tabular-nums">
                  {new Date(r.ts).toLocaleString('pt-BR')}
                </td>
                <td className="px-4 py-2 text-xs text-neutral-600 truncate">
                  {r.actor_email ?? <span className="italic text-neutral-400">sistema</span>}
                </td>
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-0.5 text-xs ${actionColor[r.action] ?? ''}`}>
                    {r.action}
                  </span>
                </td>
                <td className="px-4 py-2 text-xs">
                  <span className="capitalize font-medium">{r.entity}</span>
                  {r.entity_id && (
                    <Link
                      href={`${entityLink[r.entity] ?? '/crm'}/${r.entity_id}`}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      {String(r.entity_id).slice(0, 8)}…
                    </Link>
                  )}
                </td>
                <td className="px-4 py-2 text-[11px] font-mono text-neutral-600 max-w-md">
                  {r.diff ? (
                    <details>
                      <summary className="cursor-pointer text-neutral-500">
                        {Object.keys(r.diff as Record<string, unknown>).slice(0, 4).join(', ')}
                        {Object.keys(r.diff as Record<string, unknown>).length > 4 ? '…' : ''}
                      </summary>
                      <pre className="mt-1 bg-neutral-50 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(r.diff, null, 2)}
                      </pre>
                    </details>
                  ) : (
                    <span className="italic text-neutral-400">—</span>
                  )}
                </td>
              </tr>
            ))}
            {!rows?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Sem registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}
