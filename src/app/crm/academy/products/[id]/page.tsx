import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  updateAcademyProductAction,
  createModuleAction,
  createLessonAction,
  deleteModuleAction,
  deleteLessonAction,
} from '../../actions'

export const dynamic = 'force-dynamic'

const brl = (c: number | null | undefined) =>
  ((c ?? 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function ProductEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') redirect('/crm?error=acesso_negado')

  const [{ data: product, error: pErr }, { data: modules }, { data: lessons }] = await Promise.all([
    supabase.from('academy_products').select('*').eq('id', id).single(),
    supabase
      .from('academy_modules')
      .select('id, order_index, title, summary, lesson_count')
      .eq('product_id', id)
      .order('order_index'),
    supabase
      .from('academy_lessons')
      .select(
        'id, module_id, order_index, title, type, video_url, duration_seconds, is_preview, is_free_for_all',
      )
      .eq('product_id', id)
      .order('order_index'),
  ])

  if (pErr || !product) notFound()

  const lessonsByModule = new Map<string, typeof lessons>()
  ;(lessons ?? []).forEach((l) => {
    if (!l.module_id) return
    const arr = lessonsByModule.get(l.module_id) ?? []
    arr.push(l)
    lessonsByModule.set(l.module_id, arr)
  })

  return (
    <div className="space-y-6">
      <div className="text-xs">
        <Link href="/crm/academy/products" className="text-neutral-500 hover:text-neutral-900">
          ← Produtos
        </Link>
      </div>

      <header className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{product.title}</h1>
            <div className="text-sm text-neutral-500 mt-1">
              <code className="font-mono text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
                /academy/{product.slug}
              </code>
              <span className="ml-2 capitalize">{product.type}</span> ·{' '}
              <span className="capitalize">{product.business_unit}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span
                className={`rounded px-2 py-0.5 ${
                  product.status === 'published'
                    ? 'bg-emerald-100 text-emerald-700'
                    : product.status === 'draft'
                      ? 'bg-neutral-100 text-neutral-700'
                      : 'bg-amber-100 text-amber-700'
                }`}
              >
                {product.status}
              </span>
              <span className="rounded bg-neutral-100 px-2 py-0.5">
                {product.lesson_count ?? 0} aulas
              </span>
              <span className="rounded bg-neutral-100 px-2 py-0.5">
                {product.module_count ?? 0} módulos
              </span>
              <span className="rounded bg-neutral-100 px-2 py-0.5">
                {product.sales_count ?? 0} vendas
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase text-neutral-500">Preço</div>
            <div className="text-2xl font-semibold tabular-nums">{brl(product.price_cents)}</div>
          </div>
        </div>
      </header>

      {error && (
        <div className="rounded border border-rose-200 bg-rose-50 text-rose-700 text-sm p-3">
          {error}
        </div>
      )}

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Informações
        </h2>
        <form action={updateAcademyProductAction} className="space-y-4">
          <input type="hidden" name="id" value={product.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Título</span>
              <input
                name="title"
                defaultValue={product.title}
                required
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Subtítulo</span>
              <input
                name="subtitle"
                defaultValue={product.subtitle ?? ''}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-neutral-500">
              Descrição curta
            </span>
            <textarea
              name="short_description"
              rows={2}
              defaultValue={product.short_description ?? ''}
              className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
            />
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Tipo</span>
              <select
                name="type"
                defaultValue={product.type}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              >
                <option value="course">Curso</option>
                <option value="ebook">Ebook</option>
                <option value="live">Live</option>
                <option value="bundle">Bundle</option>
                <option value="subscription">Assinatura</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Status</span>
              <select
                name="status"
                defaultValue={product.status}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="scheduled">Agendado</option>
                <option value="unlisted">Não listado</option>
                <option value="archived">Arquivado</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Nível</span>
              <select
                name="level"
                defaultValue={product.level}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              >
                <option value="all">Todos</option>
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Unidade</span>
              <select
                name="business_unit"
                defaultValue={product.business_unit}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              >
                <option value="studio">Studio</option>
                <option value="agencia">Agência</option>
                <option value="produtora">Produtora</option>
                <option value="comunidade">Comunidade</option>
                <option value="angelo">Angelo</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Preço (R$)</span>
              <input
                name="price_brl"
                type="number"
                step="10"
                min="0"
                defaultValue={(product.price_cents ?? 0) / 100}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                De (R$ riscado)
              </span>
              <input
                name="original_price_brl"
                type="number"
                step="10"
                min="0"
                defaultValue={(product.original_price_cents ?? 0) / 100 || ''}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                Acesso (dias)
              </span>
              <input
                name="access_duration_days"
                type="number"
                min="0"
                defaultValue={product.access_duration_days ?? ''}
                placeholder="vazio = vitalício"
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Capa URL</span>
              <input
                name="cover_url"
                defaultValue={product.cover_url ?? ''}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                Thumbnail URL
              </span>
              <input
                name="thumbnail_url"
                defaultValue={product.thumbnail_url ?? ''}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Trailer URL</span>
              <input
                name="trailer_video_url"
                defaultValue={product.trailer_video_url ?? ''}
                className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="featured" defaultChecked={product.featured} />
              <span>Destaque</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="bestseller" defaultChecked={product.bestseller} />
              <span>Bestseller</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="new_release" defaultChecked={product.new_release} />
              <span>Lançamento</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="included_in_subscription"
                defaultChecked={product.included_in_subscription}
              />
              <span>Incluso na assinatura</span>
            </label>
          </div>

          <button
            type="submit"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            Salvar
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Estrutura do curso
        </h2>

        <form action={createModuleAction} className="flex gap-2 mb-4">
          <input type="hidden" name="product_id" value={product.id} />
          <input
            name="title"
            required
            placeholder="Novo módulo (ex: Fundamentos)"
            className="flex-1 rounded border border-neutral-200 px-3 py-2 text-sm"
          />
          <button className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700">
            + Módulo
          </button>
        </form>

        <ul className="space-y-4">
          {(modules ?? []).map((m) => {
            const ls = lessonsByModule.get(m.id) ?? []
            return (
              <li key={m.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-neutral-50 px-4 py-2 border-b border-neutral-100">
                  <div className="text-sm font-semibold">
                    {m.order_index + 1}. {m.title}
                    <span className="ml-2 text-xs text-neutral-500 font-normal">
                      ({ls.length} aulas)
                    </span>
                  </div>
                  <form action={deleteModuleAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="product_id" value={product.id} />
                    <button className="text-xs text-rose-600 hover:underline">
                      excluir módulo
                    </button>
                  </form>
                </div>

                <ul className="divide-y divide-neutral-100">
                  {ls.map((l) => (
                    <li key={l.id} className="px-4 py-2 flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <span className="font-medium">
                          {l.order_index + 1}. {l.title}
                        </span>
                        <span className="ml-2 text-xs text-neutral-500">{l.type}</span>
                        {l.is_preview && (
                          <span className="ml-2 text-xs rounded bg-amber-100 text-amber-800 px-1.5 py-0.5">
                            preview
                          </span>
                        )}
                        {l.is_free_for_all && (
                          <span className="ml-2 text-xs rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.5">
                            grátis
                          </span>
                        )}
                      </div>
                      <form action={deleteLessonAction}>
                        <input type="hidden" name="id" value={l.id} />
                        <input type="hidden" name="product_id" value={product.id} />
                        <button className="text-xs text-rose-600 hover:underline">excluir</button>
                      </form>
                    </li>
                  ))}
                  {!ls.length && (
                    <li className="px-4 py-3 text-xs text-neutral-400 italic">
                      Sem aulas neste módulo.
                    </li>
                  )}
                </ul>

                <form
                  action={createLessonAction}
                  className="flex gap-2 px-4 py-2 bg-neutral-50 border-t border-neutral-100"
                >
                  <input type="hidden" name="product_id" value={product.id} />
                  <input type="hidden" name="module_id" value={m.id} />
                  <input
                    name="title"
                    required
                    placeholder="Título da aula"
                    className="flex-1 rounded border border-neutral-200 px-3 py-1.5 text-sm"
                  />
                  <input
                    name="video_url"
                    placeholder="URL do vídeo (YouTube/Vimeo/MP4)"
                    className="flex-1 rounded border border-neutral-200 px-3 py-1.5 text-sm"
                  />
                  <button className="rounded bg-neutral-700 text-white text-xs px-3 hover:bg-neutral-900">
                    + Aula
                  </button>
                </form>
              </li>
            )
          })}
          {!modules?.length && (
            <li className="text-center py-8 text-sm text-neutral-400 italic border border-dashed border-neutral-200 rounded">
              Crie o primeiro módulo acima.
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}
