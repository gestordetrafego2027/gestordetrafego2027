import Link from 'next/link'

export const metadata = { title: 'Verifique seu e-mail | House Mazzutti' }

type SP = Promise<{ email?: string; kind?: 'confirm' | 'recover' }>

export default async function SucessoPage({ searchParams }: { searchParams: SP }) {
  const { email, kind = 'confirm' } = await searchParams
  const isRecover = kind === 'recover'

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-sm space-y-4 bg-white border border-neutral-200 rounded-lg p-8 shadow-sm text-center">
        <div className="text-4xl">✉️</div>
        <h1 className="text-xl font-semibold tracking-tight">
          {isRecover ? 'Verifique seu e-mail' : 'Conta criada!'}
        </h1>
        <p className="text-sm text-neutral-600">
          Enviamos um link {isRecover ? 'de recuperação de senha' : 'de confirmação'} para{' '}
          <strong className="break-all">{email ?? 'seu e-mail'}</strong>.
        </p>
        <p className="text-xs text-neutral-500">
          O link expira em 1 hora. Verifique também a pasta de spam ou lixo eletrônico.
        </p>

        {!isRecover && (
          <p className="text-xs text-neutral-400">
            Após confirmar o e-mail, você terá acesso à loja, cursos e área de membros.
          </p>
        )}

        <div className="space-y-2 pt-3 border-t border-neutral-100">
          <Link
            href="/login?next=/minha-conta"
            className="block w-full rounded bg-neutral-900 text-white text-sm font-medium py-2 hover:bg-neutral-700 transition text-center"
          >
            Voltar para login
          </Link>
          <Link
            href={isRecover ? '/login/recuperar' : '/login/cadastro'}
            className="block text-xs text-neutral-400 hover:text-neutral-700 transition"
          >
            Não recebi o e-mail — {isRecover ? 'tentar novamente' : 'reenviar confirmação'}
          </Link>
        </div>
      </div>
    </main>
  )
}
