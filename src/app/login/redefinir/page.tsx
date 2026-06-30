import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RedefineForm } from './RedefineForm'

export const metadata = { title: 'Redefinir senha | House Mazzutti CRM' }

export default async function RedefinirPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(
      '/login/recuperar?error=' +
        encodeURIComponent('Link expirado ou inválido. Solicite um novo link de recuperação.'),
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-sm space-y-4 bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
        <header className="space-y-1 mb-2">
          <h1 className="text-xl font-semibold tracking-tight">Definir nova senha</h1>
          <p className="text-sm text-neutral-500">
            Conta: <span className="font-medium">{user.email}</span>
          </p>
        </header>

        <RedefineForm serverError={error} />

        <div className="text-center text-xs pt-2 border-t border-neutral-100">
          <Link href="/login" className="text-neutral-500 hover:text-neutral-900">
            ← Cancelar
          </Link>
        </div>
      </div>
    </main>
  )
}
