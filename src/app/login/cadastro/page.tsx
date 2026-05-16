import Link from 'next/link'
import { signUpAction } from './actions'

export const metadata = { title: 'Criar conta | House Mazzutti CRM' }

type SP = Promise<{ error?: string }>

export default async function CadastroPage({ searchParams }: { searchParams: SP }) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <form
        action={signUpAction}
        className="w-full max-w-sm space-y-4 bg-white border border-neutral-200 rounded-lg p-8 shadow-sm"
      >
        <header className="space-y-1 mb-2">
          <h1 className="text-xl font-semibold tracking-tight">Criar conta</h1>
          <p className="text-sm text-neutral-500">
            Acesso restrito a equipe e parceiros da House Mazzutti.
          </p>
        </header>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Nome completo</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Senha</span>
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
          <span className="text-sm font-medium">Confirmar senha</span>
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
          <p className="text-sm text-red-700 border border-red-200 bg-red-50 rounded p-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-neutral-900 text-white text-sm font-medium py-2 hover:bg-neutral-700 transition"
        >
          Criar conta
        </button>

        <div className="text-center text-sm pt-2 border-t border-neutral-100">
          Já tem conta?{' '}
          <Link href="/login" className="text-neutral-900 font-medium hover:underline">
            Entrar
          </Link>
        </div>
      </form>
    </main>
  )
}
