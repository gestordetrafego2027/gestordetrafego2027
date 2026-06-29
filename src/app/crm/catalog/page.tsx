import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const unitLabel: Record<string, string> = {
  agencia: 'Agência',
  studio: 'Studio',
  produtora: 'Produtora',
}

const unitTagline: Record<string, string> = {
  agencia: 'Estratégia, posicionamento e direção de marca.',
  studio: 'Imagem com intenção — posicionamento visível.',
  produtora: 'Execução com direção. Materializa estratégia com controle absoluto.',
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
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-900">
                  {unitLabel[unit] ?? unit}
                </h2>
                {unitTagline[unit] && (
                  <span className="text-xs text-neutral-400 italic">{unitTagline[unit]}</span>
                )}
                <span className="text-[10px] text-neutral-300 ml-auto">{list.length} serviço{list.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map((s) => (
                  <Link
                    key={s.id}
                    href={`/crm/catalog/services/${s.id}`}
                    className="group rounded-lg border border-neutral-200 bg-white p-5 hover:border-neutral-900 hover:shadow-sm transition-all block"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-semibold text-sm text-neutral-900 group-hover:text-neutral-700 leading-snug">
                        {s.name}
                      </div>
                      {!s.active && (
                        <span className="rounded bg-neutral-100 text-neutral-400 text-[10px] px-1.5 py-0.5 shrink-0">
                          inativo
                        </span>
                      )}
                    </div>
                    {s.description && (
                      <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                        {s.description}
                      </p>
                    )}
                    <div className="text-[10px] font-mono text-neutral-300 mt-3">{s.slug}</div>
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
