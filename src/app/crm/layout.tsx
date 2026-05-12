import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'CRM | House Mazzutti' }

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/crm" className="font-semibold tracking-tight">
              HM CRM
            </Link>
            <Link href="/crm/leads" className="text-neutral-600 hover:text-neutral-900">
              Leads
            </Link>
            <Link href="/crm/clients" className="text-neutral-600 hover:text-neutral-900">
              Clientes
            </Link>
            <Link href="/crm/opportunities" className="text-neutral-600 hover:text-neutral-900">
              Oportunidades
            </Link>
            <Link href="/crm/quotes" className="text-neutral-600 hover:text-neutral-900">
              Propostas
            </Link>
            <Link href="/crm/campaigns" className="text-neutral-600 hover:text-neutral-900">
              Campanhas
            </Link>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-neutral-500">{user?.email}</span>
            <form action="/logout" method="post">
              <button
                type="submit"
                className="rounded border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-100"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
