import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function CrmHome() {
  const supabase = await createClient()

  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  const { count: commercialLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('segment', 'commercial')

  const { count: talentLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('segment', 'talents')

  const stats = [
    { label: 'Total de leads', value: totalLeads ?? 0 },
    { label: 'Commercial', value: commercialLeads ?? 0 },
    { label: 'Talents', value: talentLeads ?? 0 },
  ]

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500">Visão geral do CRM.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-neutral-200 bg-white p-5"
          >
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              {s.label}
            </div>
            <div className="text-3xl font-semibold mt-2">{s.value}</div>
          </div>
        ))}
      </section>

      <section>
        <Link
          href="/crm/leads"
          className="inline-block rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
        >
          Ver todos os leads →
        </Link>
      </section>
    </div>
  )
}
