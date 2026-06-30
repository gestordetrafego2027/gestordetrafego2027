import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  upsertCategoryAction,
  deleteCategoryAction,
  upsertResourceAction,
  deleteResourceAction,
} from './actions'

export const dynamic = 'force-dynamic'

const brl = (n: number | null | undefined) =>
  n === null || n === undefined
    ? '—'
    : Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type SearchParams = Promise<{
  cat_edit?: string
  res_edit?: string
  res_new_cat?: string
  error?: string
}>

export default async function TeamResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  const { cat_edit, res_edit, res_new_cat, error } = await searchParams
  const supabase = await createClient()

  const [{ data: categories }, { data: resources }] = await Promise.all([
    supabase
      .from('team_resource_categories')
      .select('id, name, slug, position')
      .order('position', { ascending: true }),
    supabase
      .from('team_resources')
      .select(
        'id, category_id, role, slug, description, target_audience, base_price_brl, final_price_brl, position, active',
      )
      .order('position', { ascending: true }),
  ])

  const editingCat = cat_edit ? (categories ?? []).find((c) => c.id === cat_edit) : null
  const editingRes = res_edit ? (resources ?? []).find((r) => r.id === res_edit) : null

  const resourcesByCategory = new Map<string, NonNullable<typeof resources>>()
  for (const r of resources ?? []) {
    const list = resourcesByCategory.get(r.category_id) ?? []
    list.push(r)
    resourcesByCategory.set(r.category_id, list)
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Recursos da equipe</h1>
          <p className="text-sm text-neutral-500">
            Cargos/funções disponíveis para alocar em propostas.
          </p>
        </div>
        <Link href="/crm/catalog" className="text-sm text-neutral-500 hover:text-neutral-900">
          ← Catálogo
        </Link>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">{error}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories panel */}
        <section className="rounded-lg border border-neutral-200 bg-white p-5 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Categorias ({categories?.length ?? 0})
          </h2>

          <ul className="space-y-1">
            {(categories ?? []).map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between text-sm border-b border-neutral-100 py-1"
              >
                <div>
                  <span className="font-medium">{c.name}</span>
                  <span className="ml-2 text-[10px] text-neutral-400 font-mono">
                    pos {c.position}
                  </span>
                </div>
                <div className="space-x-2 text-xs">
                  <Link
                    href={`/crm/catalog/team-resources?cat_edit=${c.id}`}
                    className="text-neutral-600 hover:underline"
                  >
                    editar
                  </Link>
                  <form action={deleteCategoryAction} className="inline">
                    <input type="hidden" name="category_id" value={c.id} />
                    <button className="text-rose-600 hover:underline">excluir</button>
                  </form>
                </div>
              </li>
            ))}
            {(categories ?? []).length === 0 && (
              <li className="text-xs text-neutral-400 italic">Sem categorias.</li>
            )}
          </ul>

          <form
            action={upsertCategoryAction}
            className="border-t border-neutral-100 pt-3 space-y-2"
          >
            {editingCat && <input type="hidden" name="category_id" value={editingCat.id} />}
            <input
              name="name"
              required
              defaultValue={editingCat?.name ?? ''}
              placeholder="Nome da categoria *"
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
            <div className="flex items-end gap-2">
              <label className="flex-1 space-y-0.5">
                <span className="block text-[10px] uppercase text-neutral-500">Posição</span>
                <input
                  name="position"
                  type="number"
                  defaultValue={editingCat?.position ?? 0}
                  className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                />
              </label>
              <button
                type="submit"
                className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700"
              >
                {editingCat ? 'Salvar' : '+ Criar'}
              </button>
              {editingCat && (
                <Link
                  href="/crm/catalog/team-resources"
                  className="rounded border border-neutral-300 text-xs px-3 py-1 hover:bg-neutral-50"
                >
                  Cancelar
                </Link>
              )}
            </div>
          </form>
        </section>

        {/* Resources panel */}
        <section className="lg:col-span-2 space-y-4">
          {(categories ?? []).length === 0 && (
            <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500 text-center">
              Crie uma categoria antes de cadastrar recursos.
            </div>
          )}

          {(categories ?? []).map((cat) => {
            const list = resourcesByCategory.get(cat.id) ?? []
            const isAddingHere =
              res_new_cat === cat.id || (editingRes && editingRes.category_id === cat.id)

            return (
              <div
                key={cat.id}
                className="rounded-lg border border-neutral-200 bg-white p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{cat.name}</h3>
                  <Link
                    href={`/crm/catalog/team-resources?res_new_cat=${cat.id}`}
                    className="text-xs text-neutral-600 hover:underline"
                  >
                    + adicionar recurso
                  </Link>
                </div>

                <table className="w-full text-sm">
                  <thead className="text-xs text-neutral-500">
                    <tr>
                      <th className="text-left py-1 font-medium">Função</th>
                      <th className="text-left py-1 font-medium">Público-alvo</th>
                      <th className="text-right py-1 font-medium">Base</th>
                      <th className="text-right py-1 font-medium">Final</th>
                      <th className="text-right py-1 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((r) => (
                      <tr key={r.id} className="border-t border-neutral-100">
                        <td className="py-2">
                          <div className="font-medium">
                            {r.role}
                            {!r.active && (
                              <span className="ml-2 rounded bg-neutral-100 text-neutral-500 text-[10px] px-1.5 py-0.5">
                                inativo
                              </span>
                            )}
                          </div>
                          {r.description && (
                            <div className="text-xs text-neutral-500">{r.description}</div>
                          )}
                        </td>
                        <td className="py-2 text-xs text-neutral-600">
                          {r.target_audience ?? '—'}
                        </td>
                        <td className="py-2 text-right tabular-nums text-xs">
                          {brl(r.base_price_brl)}
                        </td>
                        <td className="py-2 text-right tabular-nums text-xs font-medium">
                          {brl(r.final_price_brl)}
                        </td>
                        <td className="py-2 text-right space-x-2">
                          <Link
                            href={`/crm/catalog/team-resources?res_edit=${r.id}`}
                            className="text-xs text-neutral-600 hover:underline"
                          >
                            editar
                          </Link>
                          <form action={deleteResourceAction} className="inline">
                            <input type="hidden" name="resource_id" value={r.id} />
                            <button className="text-xs text-rose-600 hover:underline">
                              excluir
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                    {list.length === 0 && !isAddingHere && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-3 text-center text-neutral-400 italic text-xs"
                        >
                          Sem recursos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {isAddingHere && (
                  <form
                    action={upsertResourceAction}
                    className="border-t border-neutral-100 pt-3 grid grid-cols-1 md:grid-cols-12 gap-2 items-end"
                  >
                    <input type="hidden" name="category_id" value={cat.id} />
                    {editingRes && <input type="hidden" name="resource_id" value={editingRes.id} />}

                    <label className="md:col-span-5 space-y-0.5">
                      <span className="block text-[10px] uppercase text-neutral-500">
                        {editingRes ? 'Editar recurso' : 'Novo recurso'}
                      </span>
                      <input
                        name="role"
                        required
                        defaultValue={editingRes?.role ?? ''}
                        placeholder="Função/cargo *"
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <label className="md:col-span-3 space-y-0.5">
                      <span className="block text-[10px] uppercase text-neutral-500">
                        Público-alvo
                      </span>
                      <input
                        name="target_audience"
                        defaultValue={editingRes?.target_audience ?? ''}
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <label className="md:col-span-2 space-y-0.5">
                      <span className="block text-[10px] uppercase text-neutral-500">Base R$</span>
                      <input
                        name="base_price_brl"
                        type="number"
                        step="0.01"
                        defaultValue={editingRes?.base_price_brl ?? ''}
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <label className="md:col-span-2 space-y-0.5">
                      <span className="block text-[10px] uppercase text-neutral-500">Final R$</span>
                      <input
                        name="final_price_brl"
                        type="number"
                        step="0.01"
                        defaultValue={editingRes?.final_price_brl ?? ''}
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <div className="md:col-span-12">
                      <input
                        name="description"
                        defaultValue={editingRes?.description ?? ''}
                        placeholder="Descrição (opcional)"
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      />
                    </div>
                    <label className="md:col-span-2 space-y-0.5">
                      <span className="block text-[10px] uppercase text-neutral-500">Posição</span>
                      <input
                        name="position"
                        type="number"
                        defaultValue={editingRes?.position ?? 0}
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <label className="md:col-span-2 flex items-center gap-1 pb-1">
                      <input
                        type="checkbox"
                        name="active"
                        defaultChecked={editingRes?.active ?? true}
                      />
                      <span className="text-xs">ativo</span>
                    </label>
                    <div className="md:col-span-8 flex gap-2 justify-end">
                      <Link
                        href="/crm/catalog/team-resources"
                        className="rounded border border-neutral-300 text-xs px-3 py-1 hover:bg-neutral-50"
                      >
                        Cancelar
                      </Link>
                      <button
                        type="submit"
                        className="rounded bg-neutral-900 text-white text-xs px-3 py-1 hover:bg-neutral-700"
                      >
                        {editingRes ? 'Salvar' : '+ Adicionar'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}
