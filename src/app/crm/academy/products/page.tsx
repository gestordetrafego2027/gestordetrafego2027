import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Produtos Academy | CRM' }

const brl = (c: number | null | undefined) =>
  ((c ?? 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const statusBadge: Record<string, string> = {
  draft: 'bg-neutral-100 text-neutral-700',
  published: 'bg-emerald-100 text-emerald-700',
  scheduled: 'bg-blue-100 text-blue-700',
  archived: 'bg-rose-100 text-rose-700',
  unlisted: 'bg-amber-100 text-amber-700',
}

export default async function AcademyProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') redirect('/crm?error=acesso_negado')

  const { status, type } = await searchParams
  let q = supabase
    .from('academy_products')
    .select('id, slug, title, type, status, business_unit, price_cents, sales_count, lesson_count, published_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(200)
  if (status) q = q.eq('status', status as never)
  if (type) q = q.eq('type', type as never)

  const { data: products, error } = await q

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Produtos</h1>
          <p className="text-sm text-neutral-500">
            {products?.length ?? 0} produtos {status || type ? '(filtrado)' : ''}.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/crm/academy" className="rounded border border-neutral-300 text-sm px-3 py-2 hover:bg-neutral-100">
            ← Visão geral
          </Link>
          <Link href="/crm/academy/products/new" className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700">
            + Novo produto
          </Link>
        </div>
      </header>

      <nav className="flex flex-wrap gap-1 text-xs">
        <span className="text-neutral-500 self-center mr-2">Status:</span>
        <Filter base="/crm/academy/products" param="status" current={status} options={[
          { v: undefined, label: 'todos' },
          { v: 'draft', label: 'rascunho' },
          { v: 'published', label: 'publicado' },
          { v: 'scheduled', label: 'agendado' },
          { v: 'archived', label: 'arquivado' },
        ]} otherParam="type" otherValue={type} />
        <span className="text-neutral-500 self-center ml-4 mr-2">Tipo:</span>
        <Filter base="/crm/academy/products" param="type" current={type} options={[
          { v: undefined, label: 'todos' },
          { v: 'course', label: 'curso' },
          { v: 'ebook', label: 'ebook' },
          { v: 'live', label: 'live' },
          { v: 'bundle', label: 'bundle' },
          { v: 'subscription', label: 'assinatura' },
        ]} otherParam="status" otherValue={status} />
      </nav>

      {error && (
        <p className="text-sm text-red-700 border border-red-200 bg-red-50 rounded p-3">
          {error.message}
        </p>
      )}

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2">Produto</th>
              <th className="text-left px-4 py-2">Tipo</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Unidade</th>
              <th className="text-right px-4 py-2">Aulas</th>
              <th className="text-right px-4 py-2">Vendas</th>
              <th className="text-right px-4 py-2">Preço</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => (
              <tr key={p.id} className="border-t border-neutral-100">
                <td className="px-4 py-2">
                  <Link href={`/crm/academy/products/${p.id}`} className="font-medium hover:underline">
                    {p.title}
                  </Link>
                  <div className="text-xs text-neutral-400 font-mono">/{p.slug}</div>
                </td>
                <td className="px-4 py-2 capitalize text-xs">{p.type}</td>
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-0.5 text-xs ${statusBadge[p.status] ?? ''}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2 capitalize text-xs">{p.business_unit ?? '—'}</td>
                <td className="px-4 py-2 text-right tabular-nums">{p.lesson_count ?? 0}</td>
                <td className="px-4 py-2 text-right tabular-nums">{p.sales_count ?? 0}</td>
                <td className="px-4 py-2 text-right tabular-nums">{brl(p.price_cents)}</td>
              </tr>
            ))}
            {!products?.length && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Filter({
  base, param, current, options, otherParam, otherValue,
}: {
  base: string; param: string; current?: string
  options: { v: string | undefined; label: string }[]
  otherParam: string; otherValue?: string
}) {
  return (
    <>
      {options.map((opt) => {
        const active = (opt.v ?? '') === (current ?? '')
        const qs = new URLSearchParams()
        if (opt.v) qs.set(param, opt.v)
        if (otherValue) qs.set(otherParam, otherValue)
        const href = qs.toString() ? `${base}?${qs}` : base
        return (
          <Link
            key={opt.label}
            href={href}
            className={`rounded px-2 py-1 capitalize ${
              active ? 'bg-neutral-900 text-white' : 'border border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            {opt.label}
          </Link>
        )
      })}
    </>
  )
}
