import Link from 'next/link'
import { createServiceAction } from '../../actions'

type SearchParams = Promise<{ error?: string }>

const UNITS = [
  { value: 'agencia',   label: 'Agência' },
  { value: 'studio',    label: 'Studio' },
  { value: 'produtora', label: 'Produtora' },
] as const

export default async function NewServicePage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams

  return (
    <div className="max-w-2xl space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Novo serviço</h1>
        <Link href="/crm/catalog" className="text-sm text-neutral-500 hover:text-neutral-900">
          ← Voltar
        </Link>
      </header>

      <form
        action={createServiceAction}
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

        <label className="block space-y-1">
          <span className="text-sm font-medium">Unidade *</span>
          <select
            name="unit"
            defaultValue="agencia"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm bg-white"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Descrição</span>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked />
          <span className="text-sm">Ativo</span>
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">
            <code>questions_schema</code> (JSON, opcional)
          </span>
          <textarea
            name="questions_schema"
            rows={6}
            defaultValue="{}"
            placeholder='{"type":"object","properties":{}}'
            className="w-full rounded border border-neutral-300 px-3 py-2 text-xs font-mono"
          />
          <span className="text-xs text-neutral-500">
            JSON Schema usado depois para renderizar formulário dinâmico de interesse.
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-2">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
          <Link
            href="/crm/catalog"
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            Criar serviço
          </button>
        </div>
      </form>
    </div>
  )
}
