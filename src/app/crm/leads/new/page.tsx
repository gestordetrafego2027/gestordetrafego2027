import Link from 'next/link'
import { createLead } from './actions'

type SearchParams = Promise<{ error?: string }>

const LEAD_TYPES: { value: string; label: string; segment: 'commercial' | 'talents' }[] = [
  { value: 'cliente_agencia', label: 'Cliente Agência', segment: 'commercial' },
  { value: 'cliente_produtora', label: 'Cliente Produtora', segment: 'commercial' },
  { value: 'cliente_studio', label: 'Cliente Studio', segment: 'commercial' },
  { value: 'aluno_curso', label: 'Aluno de curso', segment: 'talents' },
  { value: 'afiliada', label: 'Afiliada', segment: 'talents' },
  { value: 'agenciado_casting', label: 'Agenciado / Casting', segment: 'talents' },
  { value: 'talento', label: 'Talento', segment: 'talents' },
  { value: 'fornecedor', label: 'Fornecedor', segment: 'talents' },
  { value: 'parceiro', label: 'Parceiro', segment: 'talents' },
]

export default async function NewLeadPage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams

  return (
    <div className="max-w-xl space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Novo lead</h1>
        <Link href="/crm/leads" className="text-sm text-neutral-500 hover:text-neutral-900">
          ← Voltar
        </Link>
      </header>

      <form
        action={createLead}
        className="space-y-4 bg-white border border-neutral-200 rounded-lg p-6"
      >
        <label className="block space-y-1">
          <span className="text-sm font-medium">Nome *</span>
          <input
            name="name"
            required
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Telefone</span>
            <input
              name="phone"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Cidade</span>
            <input
              name="city"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium">Fonte</span>
            <input
              name="source"
              placeholder="instagram, indicacao, site_form…"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Tipo de lead *</span>
          <select
            name="lead_type"
            defaultValue="cliente_agencia"
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
          <span className="text-sm font-medium">Notas</span>
          <textarea
            name="notes"
            rows={3}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        {error && (
          <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
        >
          Criar lead
        </button>
      </form>
    </div>
  )
}
