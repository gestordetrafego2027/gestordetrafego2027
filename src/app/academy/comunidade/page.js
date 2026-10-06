import Link from 'next/link'
import Header from '@/app/components/Header'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Comunidade — House Mazzutti Academy',
}

export default async function CommunityHomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: spaces } = await supabase
    .from('academy_community_spaces')
    .select('id, slug, name, description, icon_name, post_count, requires_subscription, required_product_id, order_index')
    .eq('active', true)
    .order('order_index')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="bg-neutral-900 text-white">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h1 className="text-4xl font-semibold md:text-5xl">Comunidade House Mazzutti</h1>
            <p className="mt-3 max-w-2xl text-neutral-300">
              Espaços de troca entre alunos, talentos e profissionais. Operação no mesmo padrão da casa.
            </p>
            {!user && (
              <Link href="/login?redirect=/academy/comunidade" className="mt-6 inline-block rounded-xl bg-white px-5 py-2 text-neutral-900">
                Entrar para participar
              </Link>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <h2 className="text-2xl font-semibold text-neutral-900">Espaços</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(spaces || []).map((s) => (
              <Link
                key={s.id}
                href={`/academy/comunidade/${s.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900">{s.name}</h3>
                  <span className="text-xs text-neutral-500">{s.post_count} posts</span>
                </div>
                {s.description && <p className="mt-1 text-sm text-neutral-600">{s.description}</p>}
                {(s.requires_subscription || s.required_product_id) && (
                  <p className="mt-2 text-xs text-amber-700">Acesso restrito</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
