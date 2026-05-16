import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateLeadAction } from './actions'

export const dynamic = 'force-dynamic'

const LEAD_TYPES: { value: string; label: string; segment: 'commercial' | 'talents' }[] = [
  { value: 'cliente_agencia',   label: 'Cliente Agência',     segment: 'commercial' },
  { value: 'cliente_produtora', label: 'Cliente Produtora',   segment: 'commercial' },
  { value: 'cliente_studio',    label: 'Cliente Studio',      segment: 'commercial' },
  { value: 'aluno_curso',       label: 'Aluno de curso',      segment: 'talents' },
  { value: 'afiliada',          label: 'Afiliada',            segment: 'talents' },
  { value: 'agenciado_casting', label: 'Agenciado / Casting', segment: 'talents' },
  { value: 'talento',           label: 'Talento',             segment: 'talents' },
  { value: 'fornecedor',        label: 'Fornecedor',          segment: 'talents' },
  { value: 'parceiro',          label: 'Parceiro',            segment: 'talents' },
]

export default async function EditLeadPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error: errorMsg } = await searchParams
  const supabase = await createClient()

  const [
    { data: lead, error: leadErr },
    { data: stages },
  ] = await Promise.all([
    supabase.from('leads').select('*').eq('id', id).single(),
    supabase
      .from('pipeline_stages')
      .select('id, name, segment, position')
      .order('position', { ascending: true }),
  ])

  if (leadErr || !lead) notFound()

  return (
    <div className="max-w-xl space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Editar lead</h1>
        <Link
          href={`/crm/leads/${lead.id}`}
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          ← Voltar
        </Link>
      </header>

      <form
        action={updateLeadAction}
        className="space-y-4 bg-white border border-neutral-200 rounded-lg p-6"
      >
        <input type="hidden" name="lead_id" value={lead.id} />

        <label className="block space-y-1">
          <span className="text-sm font-medium">Nome *</span>
          <input
            name="name"
            required
            defaultValue={lead.name}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              defaultValue={lead.email ?? ''}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Telefone</span>
            <input
              name="phone"
              defaultValue={lead.phone ?? ''}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Cidade</span>
            <input
              name="city"
              defaultValue={lead.city ?? ''}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Fonte</span>
            <input
              name="source"
              defaultValue={lead.source ?? ''}
              placeholder="instagram, indicacao, site_form…"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Tipo de lead *</span>
            <select
              name="lead_type"
              defaultValue={lead.lead_type}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm bg-white"
            >
              {LEAD_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} · {t.segment}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Estágio do pipeline</span>
            <select
              name="stage_id"
              defaultValue={lead.stage_id ?? ''}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm bg-white"
            >
              <option value="">— sem estágio —</option>
              {(stages ?? []).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.segment})
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Notas</span>
          <textarea
            name="notes"
            rows={3}
            defaultValue={lead.notes ?? ''}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        {errorMsg && (
          <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-2">
            {errorMsg}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
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
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  )
}
