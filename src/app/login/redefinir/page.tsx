import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { setNewPassword } from './actions'

export const metadata = { title: 'Redefinir senha | House Mazzutti CRM' }

type SP = Promise<{ error?: string }>

export default async function RedefinirPage({
  searchParams,
}: {
  searchParams: SP
}) {
  const { error } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Sem sessão = link expirado ou nao veio do email
  if (!user) {
    redirect('/login/recuperar?error=' + encodeURIComponent('Solicite um novo link.'))
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <form
        action={setNewPassword}
        className="w-full max-w-sm space-y-4 bg-white border border-neutral-200 rounded-lg p-8 shadow-sm"
      >
        <header className="space-y-1 mb-2">
          <h1 className="text-xl font-semibold tracking-tight">Definir nova senha</h1>
          <p className="text-sm text-neutral-500">
            Conta: <span className="font-medium">{user.email}</span>
          </p>
        </header>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Nova senha</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <span className="block text-xs text-neutral-500">Mínimo 8 caracteres.</span>
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Confirmar nova senha</span>
          <input
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </label>

        {error && (
          <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-neutral-900 text-white text-sm font-medium py-2 hover:bg-neutral-700 transition"
        >
          Salvar nova senha
        </button>

        <div className="text-center text-xs pt-2 border-t border-neutral-100">
          <Link href="/login" className="text-neutral-500 hover:text-neutral-900">
            ← Cancelar
          </Link>
        </div>
      </form>
    </main>
  )
}
