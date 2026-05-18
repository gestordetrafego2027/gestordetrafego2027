import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'CRM | House Mazzutti' }

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Atividades nas últimas 24h (badge no nav)
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count: newActivities } = await supabase
    .from('activities')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', since)
  const { count: openLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .in('status', ['novo', 'em_contato'])
  const { count: overdueInvoices } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'vencida')

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/crm" className="font-semibold tracking-tight relative">
              HM CRM
              {!!newActivities && (
                <span
                  className="absolute -top-1 -right-3 inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] w-4 h-4 leading-none tabular-nums"
                  title={`${newActivities} atividades nas últimas 24h`}
                >
                  {newActivities > 9 ? '9+' : newActivities}
                </span>
              )}
            </Link>
            <Link href="/crm/leads" className="text-neutral-600 hover:text-neutral-900 relative">
              Leads
              {!!openLeads && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-amber-500 text-white text-[10px] px-1.5 py-0.5 leading-none tabular-nums">
                  {openLeads}
                </span>
              )}
            </Link>
            <Link href="/crm/clients" className="text-neutral-600 hover:text-neutral-900 relative">
              Clientes
              {!!overdueInvoices && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] px-1.5 py-0.5 leading-none tabular-nums" title="faturas vencidas">
                  {overdueInvoices}
                </span>
              )}
            </Link>
            <Link href="/crm/opportunities" className="text-neutral-600 hover:text-neutral-900">
              Oportunidades
            </Link>
            <Link href="/crm/quotes" className="text-neutral-600 hover:text-neutral-900">
              Propostas
            </Link>
            <Link href="/crm/invoices" className="text-neutral-600 hover:text-neutral-900">
              Faturas
            </Link>
            <Link href="/crm/catalog" className="text-neutral-600 hover:text-neutral-900">
              Catálogo
            </Link>
            <Link href="/crm/campaigns" className="text-neutral-600 hover:text-neutral-900">
              Campanhas
            </Link>
            <Link href="/crm/automations" className="text-neutral-600 hover:text-neutral-900">
              Automações
            </Link>
            <Link href="/crm/reports" className="text-neutral-600 hover:text-neutral-900">
              Relatórios
            </Link>
            <Link href="/crm/ajuda" className="text-neutral-600 hover:text-neutral-900">
              Ajuda
            </Link>
            <Link href="/crm/manual" className="text-neutral-600 hover:text-neutral-900">
              Manual
            </Link>
            {((user?.app_metadata as { role?: string } | undefined)?.role === 'admin') && (
              <>
                <Link href="/crm/admin/users" className="text-violet-700 hover:text-violet-900 font-medium">
                  Usuários
                </Link>
                <Link href="/crm/admin/auditoria" className="text-violet-700 hover:text-violet-900 font-medium">
                  Auditoria
                </Link>
              </>
            )}
            <Link href="/crm/tags" className="text-neutral-600 hover:text-neutral-900">
              Tags
            </Link>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            {(() => {
              const md = (user?.app_metadata ?? {}) as { role?: string; unit?: string }
              const role = md.role
              const unit = md.unit
              return (
                <>
                  {role === 'admin' && (
                    <span className="rounded bg-violet-100 text-violet-700 text-[10px] px-2 py-0.5 uppercase tracking-wide">
                      admin
                    </span>
                  )}
                  {unit && role !== 'admin' && (
                    <span className="rounded bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 uppercase tracking-wide" title="Você vê apenas dados da sua unidade">
                      {unit}
                    </span>
                  )}
                </>
              )
            })()}
            <form action="/crm/search" method="get" className="hidden md:block">
              <input
                type="search"
                name="q"
                placeholder="Buscar leads, clientes, propostas…"
                className="rounded border border-neutral-200 px-3 py-1 text-xs w-64 focus:outline-none focus:border-neutral-400"
              />
            </form>
            <span className="text-neutral-500">{user?.email}</span>
            <form action="/logout" method="post">
              <button
                type="submit"
                className="rounded border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-100"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
