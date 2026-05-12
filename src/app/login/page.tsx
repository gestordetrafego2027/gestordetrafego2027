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
          <span className="text-sm font-medium">Senha</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
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
          Entrar
        </button>
      </form>
    </main>
  )
}
