import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { createClient } from '@/lib/supabase/server'
import LessonPlayer from './LessonPlayer'

export const dynamic = 'force-dynamic'

export default async function LessonPage({ params }) {
  const { slug, lessonSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: product } = await supabase
    .from('academy_products')
    .select('id, slug, type, title')
    .eq('slug', slug)
    .eq('type', 'course')
    .maybeSingle()
  if (!product) notFound()

  if (!user) redirect(`/login?redirect=/academy/curso/${slug}/aula/${lessonSlug}`)
  const { data: enrolled } = await supabase.rpc('fn_user_has_active_enrollment', {
    p_user_id: user.id,
    p_product_id: product.id,
  })
  if (enrolled !== true) redirect(`/academy/${product.type}/${product.slug}`)

  // Aula (lessonSlug aqui é o uuid — schema não tem slug por aula)
  const { data: lesson } = await supabase
    .from('academy_lessons')
    .select(`
      id, module_id, product_id, order_index, title, subtitle, type,
      video_url, video_provider, duration_seconds, body_md, thumbnail_url,
      attachments_count,
      resources:academy_lesson_resources(id, kind, url, label, order_index)
    `)
    .eq('id', lessonSlug)
    .eq('product_id', product.id)
    .maybeSingle()
  if (!lesson) notFound()

  // Próxima/anterior — pega todas aulas do curso ordenadas
  const { data: allLessons } = await supabase
    .from('academy_lessons')
    .select('id, order_index, module_id')
    .eq('product_id', product.id)
  const sorted = (allLessons || []).sort((a, b) => {
    if (a.module_id === b.module_id) return a.order_index - b.order_index
    return 0
  })
  const idx = sorted.findIndex((l) => l.id === lesson.id)
  const prev = idx > 0 ? sorted[idx - 1] : null
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null

  // Progresso atual
  const { data: lp } = await supabase
    .from('academy_lesson_progress')
    .select('id, last_position_seconds, completed_at, seconds_watched')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .maybeSingle()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="mx-auto max-w-5xl px-6 py-8">
          <Link href={`/academy/curso/${product.slug}`} className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900">
            ← {product.title}
          </Link>

          <h1 className="mt-4 text-2xl font-semibold text-neutral-900 md:text-3xl">{lesson.title}</h1>
          {lesson.subtitle && <p className="mt-1 text-neutral-600">{lesson.subtitle}</p>}

          {/* PLAYER (client-side, atualiza progresso) */}
          <div className="mt-6">
            <LessonPlayer
              lessonId={lesson.id}
              productId={product.id}
              videoUrl={lesson.video_url}
              videoProvider={lesson.video_provider}
              type={lesson.type}
              startAt={lp?.last_position_seconds || 0}
              durationSeconds={lesson.duration_seconds || 0}
              alreadyCompleted={!!lp?.completed_at}
            />
          </div>

          {/* TEXTO/MARKDOWN */}
          {lesson.body_md && (
            <article className="prose prose-neutral mt-8 max-w-none">
              {lesson.body_md.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </article>
          )}

          {/* RECURSOS */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Materiais</h2>
              <ul className="mt-3 space-y-2">
                {lesson.resources
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm hover:border-neutral-300"
                      >
                        <span className="text-xs uppercase text-neutral-500">{r.kind}</span>
                        <span className="text-neutral-900">{r.label}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* NAVEGAÇÃO */}
          <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-6">
            {prev ? (
              <Link
                href={`/academy/curso/${product.slug}/aula/${prev.id}`}
                className="text-sm text-neutral-700 hover:text-neutral-900"
              >
                ← Aula anterior
              </Link>
            ) : <span />}
            {next ? (
              <Link
                href={`/academy/curso/${product.slug}/aula/${next.id}`}
                className="rounded-xl bg-neutral-900 px-5 py-2 text-sm text-white hover:bg-neutral-800"
              >
                Próxima aula →
              </Link>
            ) : (
              <span className="text-sm text-emerald-700">Curso completo 🎉</span>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
