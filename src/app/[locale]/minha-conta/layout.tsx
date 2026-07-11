import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MinhaContaNav } from './MinhaContaNav'
import type { ReactNode } from 'react'

export const metadata = {
  robots: { index: false, follow: false },
}

export default async function MinhaContaLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const { locale } = await params
    redirect(`/login?next=/${locale}/minha-conta`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">Minha conta</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-52 flex-shrink-0">
            <MinhaContaNav />
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
