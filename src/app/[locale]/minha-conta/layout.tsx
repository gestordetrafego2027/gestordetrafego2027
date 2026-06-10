import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { ReactNode } from 'react'

// Área logada — fora do índice de busca.
export const metadata = {
  robots: { index: false, follow: false },
}

const NAV = [
  { href: '/minha-conta', label: 'Visão geral', exact: true },
  { href: '/minha-conta/pedidos', label: 'Meus pedidos' },
  { href: '/minha-conta/dados', label: 'Dados pessoais' },
  { href: '/minha-conta/senha', label: 'Alterar senha' },
  { href: '/minha-conta/lgpd', label: 'Privacidade & LGPD' },
]

export default async function MinhaContaLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const { locale } = await params
    redirect(`/login?next=/${locale}/minha-conta`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">Minha conta</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar nav */}
          <aside className="md:w-52 flex-shrink-0">
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-white hover:text-neutral-900 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
              <form action="/logout" method="POST" className="mt-auto">
                <button
                  type="submit"
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  Sair da conta
                </button>
              </form>
            </nav>
          </aside>

          {/* Conteúdo */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
