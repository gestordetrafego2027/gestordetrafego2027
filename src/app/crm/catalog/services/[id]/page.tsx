import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  updateServiceAction, deleteServiceAction,
  upsertPackageAction, deletePackageAction,
  upsertAddonAction, deleteAddonAction,
} from '../../actions'

export const dynamic = 'force-dynamic'

const UNITS = [
  { value: 'agencia',   label: 'Agência' },
  { value: 'studio',    label: 'Studio' },
  { value: 'produtora', label: 'Produtora' },
] as const

const brl = (n: number | null | undefined) =>
  n === null || n === undefined ? '—' : Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type SearchParams = Promise<{
  edit?: string
  pkg_edit?: string
  addon_edit?: string
  error?: string
}>

export default async function ServiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: SearchParams
}) {
  const { id } = await params
  const { edit, pkg_edit, addon_edit, error } = await searchParams
  const supabase = await createClient()

  const [
    { data: service, error: svcErr },
    { data: packages },
    { data: addons },
  ] = await Promise.all([
    supabase.from('services').select('*').eq('id', id).single(),
    supabase
      .from('service_packages')
      .select('id, name, slug, description, duration, price_brl, position, active')
      .eq('service_id', id)
      .order('position', { ascending: true }),
    supabase
      .from('service_addons')
      .select('id, name, slug, description, price_brl, position, active')
      .eq('service_id', id)
      .order('position', { ascending: true }),
  ])

  if (svcErr || !service) notFound()

  const isEditing = edit === '1'
  const editingPkg = pkg_edit ? (packages ?? []).find((p) => p.id === pkg_edit) : null
  const editingAddon = addon_edit ? (addons ?? []).find((a) => a.id === addon_edit) : null

  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href="/crm/catalog" className="text-neutral-500 hover:text-neutral-900">
          ← Voltar para catálogo
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error}
        </p>
      )}

      {/* Header / Edit form */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        {!isEditing ? (
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{service.name}</h1>
              <div className="mt-1 text-xs text-neutral-500 font-mono">{service.slug}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-neutral-100 px-2 py-0.5 capitalize">
                  {service.unit}
                </span>
                {service.active ? (
                  <span className="rounded bg-emerald-50 text-emerald-700 px-2 py-0.5">ativo</span>
                ) : (
                  <span className="rounded bg-rose-50 text-rose-700 px-2 py-0.5">inativo</span>
                )}
              </div>
              {service.description && (
                <p className="text-sm text-neutral-600 mt-3 whitespace-pre-wrap">
                  {service.description}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/crm/catalog/services/${service.id}?edit=1`}
                className="rounded border border-neutral-300 text-xs px-3 py-1 hover:bg-neutral-50"
              >
                ✎ Editar
              </Link>
              <form action={deleteServiceAction}>
                <input type="hidden" name="service_id" value={service.id} />
                <button className="rounded border border-rose-300 text-rose-700 text-xs px-3 py-1 hover:bg-rose-50">
                  Excluir
                </button>
              </form>
            </div>
          </div>
        ) : (
          <form action={updateServiceAction} className="space-y-4">
            <input type="hidden" name="service_id" value={service.id} />

            <label className="block space-y-1">
              <span className="text-sm font-medium">Nome *</span>
              <input
                name="name"
                required
                defaultValue={service.name}
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1">
                <span className="text-sm font-medium">Unidade</span>
                <select
                  name="unit"
                  defaultValue={service.unit}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm bg-white"
                >
                  {UNITS.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 mt-6">
                <input type="checkbox" name="active" defaultChecked={service.active} />
                <span className="text-sm">Ativo</span>
              </label>
            </div>

            <label className="block space-y-1">
              <span className="text-sm font-medium">Descrição</span>
              <textarea
                name="description"
                rows={3}
                defaultValue={service.description ?? ''}
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium">
                <code>questions_schema</code> (JSON)
              </span>
              <textarea
                name="questions_schema"
                rows={6}
                defaultValue={JSON.stringify(service.questions_schema ?? {}, null, 2)}
                className="w-full rounded border border-neutral-300 px-3 py-2 text-xs font-mono"
              />
            </label>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <Link
                href={`/crm/catalog/services/${service.id}`}
                className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-50"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </section>

      {/* PACKAGES */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Pacotes ({packages?.length ?? 0})
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1 font-medium">Nome</th>
              <th className="text-left py-1 font-medium">Duração</th>
              <th className="text-right py-1 font-medium">Preço</th>
              <th className="text-right py-1 font-medium">Pos.</th>
              <th className="text-right py-1 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(packages ?? []).map((p) => (
              <tr key={p.id} className="border-t border-neutral-100">
                <td className="py-2">
                  <div className="font-medium">{p.name}</div>
                  {p.description && (
                    <div className="text-xs text-neutral-500">{p.description}</div>
                  )}
                </td>
                <td className="py-2 text-neutral-600 text-xs">{p.duration ?? '—'}</td>
                <td className="py-2 text-right tabular-nums">{brl(p.price_brl)}</td>
                <td className="py-2 text-right text-xs text-neutral-500">{p.position}</td>
                <td className="py-2 text-right space-x-2">
                  <Link
                    href={`/crm/catalog/services/${service.id}?pkg_edit=${p.id}`}
                    className="text-xs text-neutral-600 hover:underline"
                  >
                    editar
                  </Link>
                  <form action={deletePackageAction} className="inline">
                    <input type="hidden" name="package_id" value={p.id} />
                    <input type="hidden" name="service_id" value={service.id} />
                    <button className="text-xs text-rose-600 hover:underline">excluir</button>
                  </form>
                </td>
              </tr>
            ))}
            {(packages ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-neutral-400 italic text-xs">
                  Nenhum pacote.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Package form (create or edit) */}
        <form
          action={upsertPackageAction}
          className="border-t border-neutral-100 pt-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-end"
        >
          <input type="hidden" name="service_id" value={service.id} />
          {editingPkg && <input type="hidden" name="package_id" value={editingPkg.id} />}

          <label className="md:col-span-4 space-y-0.5">
            <span className="block text-[10px] uppercase text-neutral-500">
              {editingPkg ? 'Editar pacote' : 'Novo pacote'}
            </span>
            <input
              name="name"
              required
              defaultValue={editingPkg?.name ?? ''}
              placeholder="Nome *"
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="md:col-span-3 space-y-0.5">
            <span className="block text-[10px] uppercase text-neutral-500">Duração</span>
            <input
              name="duration"
              defaultValue={editingPkg?.duration ?? ''}
              placeholder="ex: 30 dias"
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="md:col-span-2 space-y-0.5">
            <span className="block text-[10px] uppercase text-neutral-500">Preço</span>
            <input
              name="price_brl"
              type="number"
              step="0.01"
              defaultValue={editingPkg?.price_brl ?? ''}
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="md:col-span-1 space-y-0.5">
            <span className="block text-[10px] uppercase text-neutral-500">Pos.</span>
            <input
              name="position"
              type="number"
              defaultValue={editingPkg?.position ?? 0}
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="md:col-span-1 flex items-center gap-1 pb-1">
            <input
              type="checkbox"
              name="active"
              defaultChecked={editingPkg?.active ?? true}
            />
            <span className="text-xs">ativo</span>
          </label>
          <div className="md:col-span-12">
            <input
              name="description"
              defaultValue={editingPkg?.description ?? ''}
              placeholder="Descrição (opcional)"
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </div>
          <div className="md:col-span-12 flex gap-2 justify-end">
            {editingPkg && (
              <Link
                href={`/crm/catalog/services/${service.id}`}
                className="rounded border border-neutral-300 text-xs px-3 py-1 hover:bg-neutral-50"
              >
                Cancelar
              </Link>
            )}
            <button
              type="submit"
              className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700"
            >
              {editingPkg ? 'Salvar pacote' : '+ Adicionar pacote'}
            </button>
          </div>
        </form>
      </section>

      {/* ADDONS */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Adicionais ({addons?.length ?? 0})
        </h2>

        <table className="w-full text-sm">
          <thead className="text-xs text-neutral-500">
            <tr>
              <th className="text-left py-1 font-medium">Nome</th>
              <th className="text-right py-1 font-medium">Preço</th>
              <th className="text-right py-1 font-medium">Pos.</th>
              <th className="text-right py-1 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(addons ?? []).map((a) => (
              <tr key={a.id} className="border-t border-neutral-100">
                <td className="py-2">
                  <div className="font-medium">{a.name}</div>
                  {a.description && (
                    <div className="text-xs text-neutral-500">{a.description}</div>
                  )}
                </td>
                <td className="py-2 text-right tabular-nums">{brl(a.price_brl)}</td>
                <td className="py-2 text-right text-xs text-neutral-500">{a.position}</td>
                <td className="py-2 text-right space-x-2">
                  <Link
                    href={`/crm/catalog/services/${service.id}?addon_edit=${a.id}`}
                    className="text-xs text-neutral-600 hover:underline"
                  >
                    editar
                  </Link>
                  <form action={deleteAddonAction} className="inline">
                    <input type="hidden" name="addon_id" value={a.id} />
                    <input type="hidden" name="service_id" value={service.id} />
                    <button className="text-xs text-rose-600 hover:underline">excluir</button>
                  </form>
                </td>
              </tr>
            ))}
            {(addons ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-neutral-400 italic text-xs">
                  Nenhum adicional.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <form
          action={upsertAddonAction}
          className="border-t border-neutral-100 pt-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-end"
        >
          <input type="hidden" name="service_id" value={service.id} />
          {editingAddon && <input type="hidden" name="addon_id" value={editingAddon.id} />}

          <label className="md:col-span-5 space-y-0.5">
            <span className="block text-[10px] uppercase text-neutral-500">
              {editingAddon ? 'Editar adicional' : 'Novo adicional'}
            </span>
            <input
              name="name"
              required
              defaultValue={editingAddon?.name ?? ''}
              placeholder="Nome *"
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="md:col-span-2 space-y-0.5">
            <span className="block text-[10px] uppercase text-neutral-500">Preço</span>
            <input
              name="price_brl"
              type="number"
              step="0.01"
              defaultValue={editingAddon?.price_brl ?? ''}
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="md:col-span-1 space-y-0.5">
            <span className="block text-[10px] uppercase text-neutral-500">Pos.</span>
            <input
              name="position"
              type="number"
              defaultValue={editingAddon?.position ?? 0}
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="md:col-span-1 flex items-center gap-1 pb-1">
            <input
              type="checkbox"
              name="active"
              defaultChecked={editingAddon?.active ?? true}
            />
            <span className="text-xs">ativo</span>
          </label>
          <div className="md:col-span-12">
            <input
              name="description"
              defaultValue={editingAddon?.description ?? ''}
              placeholder="Descrição (opcional)"
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </div>
          <div className="md:col-span-12 flex gap-2 justify-end">
            {editingAddon && (
              <Link
                href={`/crm/catalog/services/${service.id}`}
                className="rounded border border-neutral-300 text-xs px-3 py-1 hover:bg-neutral-50"
              >
                Cancelar
              </Link>
            )}
            <button
              type="submit"
              className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700"
            >
              {editingAddon ? 'Salvar adicional' : '+ Adicionar'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
