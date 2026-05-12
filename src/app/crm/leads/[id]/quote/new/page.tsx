import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createQuoteAction } from './actions'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function NewQuotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: lead }, { data: services }, { data: packages }, { data: addons }] =
    await Promise.all([
      supabase.from('leads').select('id, name, lead_type, segment').eq('id', id).single(),
      supabase.from('services').select('id, name, unit, slug').eq('active', true).order('unit'),
      supabase
        .from('service_packages')
        .select('id, name, price_brl, service_id, duration')
        .eq('active', true)
        .order('position'),
      supabase
        .from('service_addons')
        .select('id, name, price_brl, service_id')
        .eq('active', true)
        .order('position'),
    ])

  if (!lead) notFound()

  const pkgsByService = new Map<string, typeof packages>()
  ;(packages ?? []).forEach((p) => {
    if (!p.service_id) return
    const arr = pkgsByService.get(p.service_id) ?? []
    arr.push(p)
    pkgsByService.set(p.service_id, arr)
  })

  const addonsByService = new Map<string | null, typeof addons>()
  ;(addons ?? []).forEach((a) => {
    const key = a.service_id ?? null
    const arr = addonsByService.get(key) ?? []
    arr.push(a)
    addonsByService.set(key, arr)
  })

  const globalAddons = addonsByService.get(null) ?? []

  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href={`/crm/leads/${id}`} className="text-neutral-500 hover:text-neutral-900">
          ← Voltar para o lead
        </Link>
      </div>

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Nova proposta</h1>
        <p className="text-sm text-neutral-500">
          Lead: <span className="font-medium">{lead.name}</span> · {lead.lead_type}
        </p>
      </header>

      <form action={createQuoteAction} className="space-y-6">
        <input type="hidden" name="lead_id" value={id} />

        <section className="rounded-lg border border-neutral-200 bg-white p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wide text-neutral-500">Título</label>
              <input
                name="title"
                required
                defaultValue={`Proposta — ${lead.name}`}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-neutral-500">Válida até</label>
              <input
                type="date"
                name="valid_until"
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-neutral-500">
                Desconto (R$)
              </label>
              <input
                type="number"
                name="discount_brl"
                step="50"
                min="0"
                defaultValue="0"
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Observações internas
            </label>
            <textarea
              name="notes"
              rows={2}
              className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
            />
          </div>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Pacotes do catálogo
          </h2>
          <div className="space-y-5">
            {(services ?? []).map((s) => {
              const list = pkgsByService.get(s.id) ?? []
              if (!list.length) return null
              return (
                <div key={s.id}>
                  <div className="text-xs uppercase text-neutral-500 mb-2">
                    {s.unit} · {s.name}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {list.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-start gap-2 rounded border border-neutral-200 p-2 hover:border-neutral-400 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="package_id"
                          value={p.id}
                          className="mt-1"
                        />
                        <div className="flex-1 text-sm">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-neutral-500">
                            {p.duration ?? '—'} · {brl(p.price_brl)}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {!!globalAddons.length && (
          <section className="rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
              Add-ons globais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {globalAddons.map((a) => (
                <label
                  key={a.id}
                  className="flex items-start gap-2 rounded border border-neutral-200 p-2 hover:border-neutral-400 cursor-pointer"
                >
                  <input type="checkbox" name="addon_id" value={a.id} className="mt-1" />
                  <div className="flex-1 text-sm">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-neutral-500">{brl(a.price_brl)}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>
        )}

        <div className="flex justify-end gap-3">
          <Link
            href={`/crm/leads/${id}`}
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            Criar proposta
          </button>
        </div>
      </form>
    </div>
  )
}
