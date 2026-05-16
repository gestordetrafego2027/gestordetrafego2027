import Link from 'next/link'

export const metadata = { title: 'Verifique seu email | House Mazzutti CRM' }

type SP = Promise<{ email?: string; kind?: 'confirm' | 'recover' }>

export default async function SucessoPage({ searchParams }: { searchParams: SP }) {
  const { email, kind = 'confirm' } = await searchParams
  const isRecover = kind === 'recover'

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-sm space-y-4 bg-white border border-neutral-200 rounded-lg p-8 shadow-sm text-center">
        <div className="text-4xl">✉️</div>
        <h1 className="text-xl font-semibold tracking-tight">
          {isRecover ? 'Verifique seu email' : 'Conta criada!'}
        </h1>
        <p className="text-sm text-neutral-600">
          Enviamos um link {isRecover ? 'de recuperação' : 'de confirmação'} para{' '}
          <strong className="break-all">{email ?? 'seu email'}</strong>.
        </p>
        <p className="text-xs text-neutral-500">
          O link expira em 1 hora. Não esquece de olhar a pasta de spam.
        </p>
        <div className="text-sm pt-3 border-t border-neutral-100">
          <Link href="/login" className="text-neutral-900 font-medium hover:underline">
            Voltar para login
          </Link>
        </div>
      </div>
    </main>
  )
}
