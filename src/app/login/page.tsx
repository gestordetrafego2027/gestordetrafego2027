import Link from 'next/link'
import { signInWithPassword } from './actions'

export const metadata = { title: 'Login | House Mazzutti CRM' }

type SearchParams = Promise<{ error?: string; next?: string }>

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { error, next } = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <form
        action={signInWithPassword}
        className="w-full max-w-sm space-y-4 bg-white border border-neutral-200 rounded-lg p-8 shadow-sm"
      >
        <header className="space-y-1 mb-2">
          <h1 className="text-xl font-semibold tracking-tight">House Mazzutti CRM</h1>
          <p className="text-sm text-neutral-500">Acesse sua conta para continuar.</p>
        </header>

        <input type="hidden" name="next" value={next ?? '/crm'} />

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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Senha</span>
            <Link
              href="/login/recuperar"
              className="text-xs text-neutral-500 hover:text-neutral-900 hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </label>

        {error && (
          <div className="text-sm text-red-700 border border-red-200 bg-red-50 rounded p-3 space-y-1">
            <div className="font-medium">
              {error.toLowerCase().includes('invalid') || error.toLowerCase().includes('credentials')
                ? 'Email ou senha incorretos.'
                : error}
            </div>
            <div className="text-xs text-red-600">
              Não lembra a senha?{' '}
              <Link href="/login/recuperar" className="underline font-medium">
                Recuperar agora
              </Link>
              .
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded bg-neutral-900 text-white text-sm font-medium py-2 hover:bg-neutral-700 transition"
        >
          Entrar
        </button>

        <div className="text-center text-sm pt-3 border-t border-neutral-100">
          Não tem conta?{' '}
          <Link href="/login/cadastro" className="text-neutral-900 font-medium hover:underline">
            Criar agora
          </Link>
        </div>
      </form>
    </main>
  )
}
