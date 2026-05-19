import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function CourseHomePage({ params }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: product } = await supabase
    .from('academy_products')
    .select('id, slug, type, title, subtitle, cover_url, status, author_id')
    .eq('slug', slug)
    .eq('type', 'course')
    .maybeSingle()
  if (!product) notFound()

  // matrícula
  if (!user) redirect(`/login?redirect=/academy/curso/${slug}`)
  const { data: enrolled } = await supabase.rpc('fn_user_has_active_enrollment', {
    p_user_id: user.id,
    p_product_id: product.id,
  })
  if (enrolled !== true) {
    redirect(`/academy/${product.type}/${product.slug}`)
  }

  // módulos + aulas
  const { data: modules } = await supabase
    .from('academy_modules')
    .select(`
      id, order_index, title, summary, duration_minutes, lesson_count,
      lessons:academy_lessons(id, order_index, title, type, duration_seconds, is_preview)
    `)
    .eq('product_id', product.id)
    .order('order_index')

  // progresso
  const { data: progress } = await supabase
    .from('academy_lesson_progress')
    .select('lesson_id, completed_at')
    .eq('user_id', user.id)
    .eq('product_id', product.id)
  const completedSet = new Set((progress ?? []).filter((p) => p.completed_at).map((p) => p.lesson_id))

  // primeira aula não concluída
  let resumeLessonId = null
  for (const m of modules || []) {
    const ls = (m.lessons || []).sort((a, b) => a.order_index - b.order_index)
    const next = ls.find((l) => !completedSet.has(l.id))
    if (next) { resumeLessonId = next.id; break }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="bg-neutral-900 text-white">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/academy/dashboard" className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white">
              ← Meu painel
            </Link>
            <h1 className="mt-4 text-3xl font-semibold md:text-4xl">{product.title}</h1>
            {product.subtitle && <p className="mt-2 text-neutral-300">{product.subtitle}</p>}
            {resumeLessonId && (
              <Link
                href={`/academy/curso/${product.slug}/aula/${resumeLessonId}`}
                className="mt-8 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
              >
                {completedSet.size === 0 ? 'Começar curso' : 'Continuar de onde parou'} →
              </Link>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-10">
          {(!modules || modules.length === 0) ? (
            <p className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-600">
              Conteúdo em preparação.
            </p>
          ) : (
            <div className="space-y-6">
              {modules.map((m, i) => (
                <div key={m.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  <header className="border-b border-neutral-100 bg-neutral-50 px-5 py-4">
                    <div className="text-xs uppercase tracking-wide text-neutral-500">Módulo {i + 1}</div>
                    <h2 className="text-lg font-semibold text-neutral-900">{m.title}</h2>
                    {m.summary && <p className="mt-1 text-sm text-neutral-600">{m.summary}</p>}
                  </header>
                  <ul className="divide-y divide-neutral-100">
                    {(m.lessons || [])
                      .sort((a, b) => a.order_index - b.order_index)
                      .map((l) => {
                        const done = completedSet.has(l.id)
                        return (
                          <li key={l.id}>
                            <Link
                              href={`/academy/curso/${product.slug}/aula/${l.id}`}
                              className="flex items-center gap-3 px-5 py-3 transition hover:bg-neutral-50"
                            >
                              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${done ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                                {done ? '✓' : '▶'}
                              </span>
                              <span className="flex-1 text-sm text-neutral-900">{l.title}</span>
                              {l.duration_seconds && (
                                <span className="text-xs text-neutral-500">
                                  {Math.round(l.duration_seconds / 60)} min
                                </span>
                              )}
                            </Link>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
