import Link from 'next/link'
import { requestPasswordReset } from './actions'
import RecaptchaField from '@/components/security/RecaptchaField'

export const metadata = { title: 'Recuperar senha | House Mazzutti CRM' }

type SP = Promise<{ error?: string; ok?: string; email?: string }>

export default async function RecuperarPage({
  searchParams,
}: {
  searchParams: SP
}) {
  const { error, ok, email } = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-sm space-y-4 bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
        <header className="space-y-1 mb-2">
          <h1 className="text-xl font-semibold tracking-tight">Recuperar senha</h1>
          <p className="text-sm text-neutral-500">
            Informe seu email. Vamos enviar um link para redefinir a senha.
          </p>
        </header>

        {ok ? (
          <div className="rounded border border-emerald-200 bg-emerald-50 text-emerald-800 p-3 text-sm">
            ✓ Email enviado para <strong>{email}</strong>. Verifique a caixa de entrada
            (e a pasta de spam). O link expira em 1 hora.
          </div>
        ) : (
          <form action={requestPasswordReset} className="space-y-4">
            <RecaptchaField action="recover" />
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

            {error && (
              <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded bg-neutral-900 text-white text-sm font-medium py-2 hover:bg-neutral-700 transition"
            >
              Enviar link de recuperação
            </button>
          </form>
        )}

        <div className="text-center text-sm pt-2 border-t border-neutral-100">
          <Link href="/login" className="text-neutral-600 hover:text-neutral-900">
            ← Voltar para login
          </Link>
        </div>
      </div>
    </main>
  )
}
