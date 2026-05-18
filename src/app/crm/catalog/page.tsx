import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const unitLabel: Record<string, string> = {
  agencia: 'Agência',
  studio: 'Studio',
  produtora: 'Produtora',
}

export default async function CatalogPage() {
  const supabase = await createClient()
  const { data: services, error } = await supabase
    .from('services')
    .select('id, name, slug, unit, active, position, description')
    .order('unit', { ascending: true })
    .order('position', { ascending: true })

  const byUnit = new Map<string, typeof services>()
  for (const s of services ?? []) {
    const list = byUnit.get(s.unit) ?? []
    list.push(s)
    byUnit.set(s.unit, list)
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Catálogo</h1>
          <p className="text-sm text-neutral-500">
            Serviços, pacotes e adicionais oferecidos pela House.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/crm/catalog/team-resources"
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
          >
            👥 Recursos da equipe
          </Link>
          <Link
            href="/crm/catalog/services/new"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            + Novo serviço
          </Link>
        </div>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error.message}
        </p>
      )}

      {(!services || services.length === 0) && (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
          Nenhum serviço cadastrado. Crie o primeiro para começar a oferecer propostas.
        </div>
      )}

      <div className="space-y-6">
        {['agencia', 'studio', 'produtora'].map((unit) => {
          const list = byUnit.get(unit) ?? []
          if (list.length === 0) return null
          return (
            <section key={unit}>
              <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
                {unitLabel[unit] ?? unit}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map((s) => (
                  <Link
                    key={s.id}
                    href={`/crm/catalog/services/${s.id}`}
                    className="rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-400 transition-colors block"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium">{s.name}</div>
                      {!s.active && (
                        <span className="rounded bg-neutral-100 text-neutral-500 text-[10px] px-1.5 py-0.5">
                          inativo
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{s.slug}</div>
                    {s.description && (
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{s.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
