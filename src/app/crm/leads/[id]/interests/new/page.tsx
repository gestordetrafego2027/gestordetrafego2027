import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createInterestAction } from '../actions'
import JsonSchemaForm, { type JsonSchema } from '../../../../components/JsonSchemaForm'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ service?: string; error?: string }>

export default async function NewInterestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: SearchParams
}) {
  const { id: leadId } = await params
  const { service: selectedServiceId, error } = await searchParams
  const supabase = await createClient()

  const [{ data: lead, error: leadErr }, { data: services }] = await Promise.all([
    supabase.from('leads').select('id, name, segment').eq('id', leadId).single(),
    supabase
      .from('services')
      .select('id, name, slug, unit, active, questions_schema')
      .eq('active', true)
      .order('unit', { ascending: true })
      .order('name', { ascending: true }),
  ])

  if (leadErr || !lead) notFound()

  const service = selectedServiceId
    ? ((services ?? []).find((s) => s.id === selectedServiceId) ?? null)
    : null

  // Pacotes + adicionais do serviço selecionado
  let packages: { id: string; name: string; price_brl: number | null }[] = []
  let addons: { id: string; name: string; price_brl: number | null }[] = []
  if (service) {
    const [{ data: pkgs }, { data: adds }] = await Promise.all([
      supabase
        .from('service_packages')
        .select('id, name, price_brl')
        .eq('service_id', service.id)
        .eq('active', true)
        .order('position', { ascending: true }),
      supabase
        .from('service_addons')
        .select('id, name, price_brl')
        .eq('service_id', service.id)
        .eq('active', true)
        .order('position', { ascending: true }),
    ])
    packages = pkgs ?? []
    addons = adds ?? []
  }

  const brl = (n: number | null | undefined) =>
    n === null || n === undefined
      ? ''
      : Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Novo interesse</h1>
          <p className="text-sm text-neutral-500">
            Lead:{' '}
            <Link href={`/crm/leads/${lead.id}`} className="hover:underline font-medium">
              {lead.name}
            </Link>
          </p>
        </div>
        <Link
          href={`/crm/leads/${lead.id}`}
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          ← Voltar
        </Link>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">{error}</p>
      )}

      {/* Step 1: escolher service */}
      {!service && (
        <section className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Escolha um serviço
          </h2>
          {(services ?? []).length === 0 ? (
            <p className="text-sm text-neutral-500">
              Nenhum serviço ativo cadastrado.{' '}
              <Link href="/crm/catalog/services/new" className="underline">
                Crie um →
              </Link>
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(services ?? []).map((s) => (
                <Link
                  key={s.id}
                  href={`/crm/leads/${lead.id}/interests/new?service=${s.id}`}
                  className="rounded-lg border border-neutral-200 hover:border-neutral-400 p-3 transition-colors block"
                >
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-neutral-500 capitalize">{s.unit}</div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Step 2: form do interesse */}
      {service && (
        <form
          action={createInterestAction}
          className="space-y-6 bg-white border border-neutral-200 rounded-lg p-6"
        >
          <input type="hidden" name="lead_id" value={lead.id} />
          <input type="hidden" name="service_id" value={service.id} />

          <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
            <div>
              <div className="text-xs uppercase text-neutral-500">Serviço</div>
              <div className="text-lg font-semibold">{service.name}</div>
              <div className="text-xs text-neutral-500 capitalize">{service.unit}</div>
            </div>
            <Link
              href={`/crm/leads/${lead.id}/interests/new`}
              className="text-xs text-neutral-500 hover:underline"
            >
              ← trocar
            </Link>
          </div>

          {/* Pacote */}
          {packages.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Pacote</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-2 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-50">
                  <input type="radio" name="package_id" value="" defaultChecked />
                  <span className="text-sm text-neutral-500">— Sem pacote específico</span>
                </label>
                {packages.map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center justify-between gap-2 p-2 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2">
                      <input type="radio" name="package_id" value={p.id} />
                      <span className="text-sm font-medium">{p.name}</span>
                    </span>
                    <span className="text-xs tabular-nums text-neutral-600">
                      {brl(p.price_brl)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Adicionais */}
          {addons.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Adicionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {addons.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-center justify-between gap-2 p-2 rounded border border-neutral-200 cursor-pointer hover:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2">
                      <input type="checkbox" name="addon_id" value={a.id} />
                      <span className="text-sm">{a.name}</span>
                    </span>
                    <span className="text-xs tabular-nums text-neutral-600">
                      {brl(a.price_brl)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Questions dinâmicas */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Detalhes</h3>
            <JsonSchemaForm
              schema={(service.questions_schema ?? {}) as JsonSchema}
              namePrefix="answers"
            />
          </div>

          {/* Prioridade */}
          <label className="block space-y-1 max-w-[180px]">
            <span className="text-sm font-medium">Prioridade</span>
            <input
              name="priority"
              type="number"
              defaultValue={0}
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
            <span className="text-xs text-neutral-500">
              0 = padrão. Use números maiores para destacar este interesse.
            </span>
          </label>

          <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
            <Link
              href={`/crm/leads/${lead.id}`}
              className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
            >
              Registrar interesse
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
