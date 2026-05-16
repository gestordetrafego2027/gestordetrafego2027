import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createTagAction, updateTagAction, deleteTagAction } from './actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ error?: string; edit?: string }>

export default async function TagsPage({ searchParams }: { searchParams: SearchParams }) {
  const { error, edit } = await searchParams
  const supabase = await createClient()

  const { data: tags } = await supabase
    .from('tags')
    .select('id, name, slug, color, created_at')
    .order('name', { ascending: true })

  // Contagem de uso (lead_tags) por tag, em uma query separada agregada client-side.
  const { data: leadTagRows } = await supabase
    .from('lead_tags')
    .select('tag_id')

  const usage = new Map<string, number>()
  for (const row of leadTagRows ?? []) {
    usage.set(row.tag_id, (usage.get(row.tag_id) ?? 0) + 1)
  }

  const editingTag = edit ? (tags ?? []).find((t) => t.id === edit) : null

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tags</h1>
          <p className="text-sm text-neutral-500">
            Rótulos reutilizáveis para classificar leads.
          </p>
        </div>
        <Link href="/crm/leads" className="text-sm text-neutral-500 hover:text-neutral-900">
          ← Leads
        </Link>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form (create or edit) */}
        <div className="lg:col-span-1">
          <form
            action={editingTag ? updateTagAction : createTagAction}
            className="space-y-3 rounded-lg border border-neutral-200 bg-white p-5"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              {editingTag ? 'Editar tag' : 'Nova tag'}
            </h2>

            {editingTag && (
              <input type="hidden" name="tag_id" value={editingTag.id} />
            )}

            <label className="block space-y-1">
              <span className="text-sm font-medium">Nome *</span>
              <input
                name="name"
                required
                defaultValue={editingTag?.name ?? ''}
                placeholder="ex: VIP, urgente, follow-up"
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium">Cor (opcional)</span>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="color"
                  defaultValue={editingTag?.color ?? '#9ca3af'}
                  className="h-9 w-12 rounded border border-neutral-300 p-0.5"
                />
                <span className="text-xs text-neutral-500 self-center">
                  hex, ex: #ef4444
                </span>
              </div>
            </label>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
              >
                {editingTag ? 'Salvar' : '+ Criar tag'}
              </button>
              {editingTag && (
                <Link
                  href="/crm/tags"
                  className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-50"
                >
                  Cancelar
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Tag</th>
                  <th className="text-left px-4 py-2 font-medium">Slug</th>
                  <th className="text-right px-4 py-2 font-medium">Uso</th>
                  <th className="text-right px-4 py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {!tags?.length && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-neutral-500">
                      Nenhuma tag ainda. Crie a primeira.
                    </td>
                  </tr>
                )}
                {tags?.map((t) => (
                  <tr key={t.id} className="border-t border-neutral-100">
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-2 rounded px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: t.color ?? '#e5e7eb',
                          color: '#111',
                        }}
                      >
                        {t.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-500 font-mono">
                      {t.slug}
                    </td>
                    <td className="px-4 py-3 text-right text-neutral-600 tabular-nums">
                      {usage.get(t.id) ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        href={`/crm/tags?edit=${t.id}`}
                        className="text-xs text-neutral-600 hover:text-neutral-900 hover:underline"
                      >
                        editar
                      </Link>
                      <form action={deleteTagAction} className="inline">
                        <input type="hidden" name="tag_id" value={t.id} />
                        <button
                          type="submit"
                          className="text-xs text-red-600 hover:text-red-800 hover:underline"
                        >
                          excluir
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
