import Link from 'next/link'
import { signUpAction } from './actions'
import RecaptchaField from '@/components/security/RecaptchaField'

export const metadata = { title: 'Criar conta | House Mazzutti' }

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
            Acesse a loja, cursos e área exclusiva de membros.
          </p>
        </header>

        <RecaptchaField action="signup" />

        <label className="block space-y-1">
          <span className="text-sm font-medium">Nome completo</span>
          <input
            name="name"
            type="text"
            required
            autoFocus
            autoComplete="name"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">E-mail</span>
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

        {/* Aceite de termos — Art. 8º LGPD */}
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            name="terms"
            type="checkbox"
            required
            className="mt-0.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <span className="text-xs text-neutral-600 leading-relaxed">
            Li e aceito os{' '}
            <Link
              href="/politicas/termos-de-uso"
              target="_blank"
              className="underline hover:text-neutral-900"
            >
              Termos de Uso
            </Link>{' '}
            e a{' '}
            <Link
              href="/politicas/privacidade"
              target="_blank"
              className="underline hover:text-neutral-900"
            >
              Política de Privacidade
            </Link>
            .
          </span>
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
          <Link
            href="/login?next=/minha-conta"
            className="text-neutral-900 font-medium hover:underline"
          >
            Entrar
          </Link>
        </div>
      </form>
    </main>
  )
}
