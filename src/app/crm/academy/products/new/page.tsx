import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAcademyProductAction } from '../../actions'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Novo produto Academy' }

type SP = Promise<{ error?: string }>

export default async function NewProductPage({ searchParams }: { searchParams: SP }) {
  const { error } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') redirect('/crm?error=acesso_negado')

  return (
    <div className="space-y-5 max-w-2xl">
      <Link href="/crm/academy/products" className="text-xs text-neutral-500 hover:text-neutral-900">
        ← Produtos
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Novo produto</h1>
      <p className="text-sm text-neutral-500">
        Cria como rascunho. Edição completa fica disponível após salvar.
      </p>

      <form action={createAcademyProductAction} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5">
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-neutral-500">Título</span>
          <input
            name="title" required
            placeholder="Ex: Direção Editorial Avançada"
            className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
          />
        </label>

        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-neutral-500">Tipo</span>
            <select name="type" defaultValue="course" className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm">
              <option value="course">Curso</option>
              <option value="ebook">Ebook</option>
              <option value="live">Live</option>
              <option value="bundle">Bundle</option>
              <option value="subscription">Assinatura</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-neutral-500">Unidade</span>
            <select name="business_unit" defaultValue="studio" className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm">
              <option value="studio">Studio</option>
              <option value="agencia">Agência</option>
              <option value="produtora">Produtora</option>
              <option value="comunidade">Comunidade</option>
              <option value="angelo">Angelo</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-neutral-500">Preço (R$)</span>
            <input
              name="price_brl" type="number" step="10" min="0" defaultValue="0"
              className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
            />
          </label>
        </div>

        {error && (
          <div className="rounded border border-rose-200 bg-rose-50 text-rose-700 text-sm p-3">{error}</div>
        )}

        <button type="submit" className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700">
          Criar e editar →
        </button>
      </form>
    </div>
  )
}
