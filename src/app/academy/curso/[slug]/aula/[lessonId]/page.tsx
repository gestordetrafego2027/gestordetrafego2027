import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VideoPlayer from './VideoPlayer'
import { toggleLessonCompleteAction } from './actions'

export const dynamic = 'force-dynamic'

export default async function LessonPlayerPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>
}) {
  const { slug, lessonId } = await params
  const supabase = await createClient()

  // 1) Produto
  const { data: product, error: prodErr } = await supabase
    .from('academy_products')
    .select('id, slug, title, type, author_id')
    .eq('slug', slug)
    .single()
  if (prodErr || !product) notFound()

  // 2) Auth + enrollment (a lesson pode ser preview/grátis)
  const { data: { user } } = await supabase.auth.getUser()

  const { data: lesson } = await supabase
    .from('academy_lessons')
    .select('id, module_id, product_id, order_index, title, subtitle, type, video_url, video_provider, duration_seconds, body_md, is_preview, is_free_for_all, thumbnail_url')
    .eq('id', lessonId)
    .eq('product_id', product.id)
    .single()
  if (!lesson) notFound()

  const isFreeOrPreview = lesson.is_preview || lesson.is_free_for_all

  if (!isFreeOrPreview) {
    if (!user) {
      redirect(`/login?next=${encodeURIComponent(`/academy/curso/${slug}/aula/${lessonId}`)}`)
    }
    const { data: enrollment } = await supabase
      .from('academy_enrollments')
      .select('id, expires_at, status')
      .eq('user_id', user!.id)
      .eq('product_id', product.id)
      .eq('status', 'active')
      .maybeSingle()
    const now = new Date()
    const expired = enrollment?.expires_at && new Date(enrollment.expires_at) < now
    if (!enrollment || expired) {
      redirect(`/academy/curso/${slug}?error=${encodeURIComponent('Você não tem acesso a esta aula. Faça a matrícula para liberar.')}`)
    }
  }

  // 3) Carrega módulos + lessons da estrutura inteira pra navegação
  const [{ data: modules }, { data: allLessons }, { data: resources }, { data: progress }] =
    await Promise.all([
      supabase
        .from('academy_modules')
        .select('id, order_index, title, subtitle')
        .eq('product_id', product.id)
        .order('order_index'),
      supabase
        .from('academy_lessons')
        .select('id, module_id, order_index, title, duration_seconds, is_preview, is_free_for_all')
        .eq('product_id', product.id)
        .order('order_index'),
      supabase
        .from('academy_lesson_resources')
        .select('id, label, kind, url, position')
        .eq('lesson_id', lesson.id)
        .order('position'),
      user
        ? supabase
            .from('academy_lesson_progress')
            .select('lesson_id, completed_at, last_position_seconds')
            .eq('user_id', user.id)
            .eq('product_id', product.id)
        : Promise.resolve({ data: [] as Array<{ lesson_id: string; completed_at: string | null; last_position_seconds: number | null }> }),
    ])

  const progressMap = new Map<string, { completed: boolean; pos: number }>()
  ;((progress ?? []) as Array<{ lesson_id: string; completed_at: string | null; last_position_seconds: number | null }>).forEach((p) => {
    progressMap.set(p.lesson_id, { completed: !!p.completed_at, pos: p.last_position_seconds ?? 0 })
  })

  const sortedLessons = (allLessons ?? []).slice()
  const currentIdx = sortedLessons.findIndex((l) => l.id === lesson.id)
  const prevLesson = currentIdx > 0 ? sortedLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < sortedLessons.length - 1 ? sortedLessons[currentIdx + 1] : null

  const currentProgress = progressMap.get(lesson.id) ?? { completed: false, pos: 0 }
  const totalCompleted = Array.from(progressMap.values()).filter((p) => p.completed).length
  const completionPct = sortedLessons.length > 0
    ? Math.round((totalCompleted / sortedLessons.length) * 100)
    : 0

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <Link href={`/academy/curso/${slug}`} className="text-neutral-500 hover:text-neutral-900">
            ← {product.title}
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500">
              {totalCompleted}/{sortedLessons.length} aulas · {completionPct}%
            </span>
            <div className="w-32 h-1.5 bg-neutral-200 rounded overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${completionPct}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Conteúdo principal */}
        <section className="space-y-5">
          <VideoPlayer
            videoUrl={lesson.video_url}
            videoProvider={lesson.video_provider}
            lessonId={lesson.id}
            productId={product.id}
            initialPositionSeconds={currentProgress.pos}
          />

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1>
            {lesson.subtitle && (
              <p className="text-neutral-500 mt-1 text-sm">{lesson.subtitle}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-neutral-100 px-2 py-0.5">{lesson.type ?? 'video'}</span>
              {lesson.duration_seconds && (
                <span className="rounded bg-neutral-100 px-2 py-0.5">
                  {fmtDuration(lesson.duration_seconds)}
                </span>
              )}
              {lesson.is_preview && (
                <span className="rounded bg-amber-100 text-amber-800 px-2 py-0.5">Preview</span>
              )}
              {lesson.is_free_for_all && (
                <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5">Grátis</span>
              )}
            </div>
          </div>

          {/* Botões de ação */}
          {user && (
            <form action={toggleLessonCompleteAction} className="flex gap-2">
              <input type="hidden" name="lesson_id" value={lesson.id} />
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="completed" value={String(!currentProgress.completed)} />
              <button
                type="submit"
                className={`rounded px-4 py-2 text-sm font-medium ${
                  currentProgress.completed
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-neutral-900 text-white hover:bg-neutral-700'
                }`}
              >
                {currentProgress.completed ? '✓ Aula concluída' : 'Marcar como concluída'}
              </button>
            </form>
          )}

          {/* Conteúdo em texto */}
          {lesson.body_md && (
            <article className="prose prose-neutral max-w-none text-sm bg-white border border-neutral-200 rounded p-5 whitespace-pre-wrap">
              {lesson.body_md}
            </article>
          )}

          {/* Recursos */}
          {!!resources?.length && (
            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                Recursos
              </h2>
              <ul className="space-y-2 text-sm">
                {resources.map((r) => (
                  <li key={r.id} className="flex items-center gap-2">
                    <span className="text-xs uppercase rounded bg-neutral-100 px-2 py-0.5">
                      {r.kind ?? 'link'}
                    </span>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener"
                      className="text-blue-600 hover:underline"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Navegação prev/next */}
          <nav className="flex items-center justify-between border-t border-neutral-200 pt-4">
            {prevLesson ? (
              <Link
                href={`/academy/curso/${slug}/aula/${prevLesson.id}`}
                className="text-sm text-neutral-600 hover:text-neutral-900 truncate max-w-xs"
              >
                ← {prevLesson.title}
              </Link>
            ) : <span />}
            {nextLesson ? (
              <Link
                href={`/academy/curso/${slug}/aula/${nextLesson.id}`}
                className="text-sm font-medium rounded bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700"
              >
                Próxima: {nextLesson.title.slice(0, 40)} →
              </Link>
            ) : (
              <Link
                href={`/academy/curso/${slug}`}
                className="text-sm text-neutral-500 hover:text-neutral-900"
              >
                Voltar para o curso
              </Link>
            )}
          </nav>
        </section>

        {/* Sidebar — índice do curso */}
        <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-100px)] overflow-y-auto">
          <div className="rounded-lg border border-neutral-200 bg-white">
            <div className="px-4 py-3 border-b border-neutral-100 text-xs uppercase tracking-wide text-neutral-500">
              Conteúdo do curso
            </div>
            <ul className="divide-y divide-neutral-100">
              {(modules ?? []).map((m) => {
                const lessonsInModule = sortedLessons.filter((l) => l.module_id === m.id)
                return (
                  <li key={m.id}>
                    <div className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-50">
                      {m.order_index + 1}. {m.title}
                    </div>
                    <ul>
                      {lessonsInModule.map((l) => {
                        const p = progressMap.get(l.id)
                        const isCurrent = l.id === lesson.id
                        return (
                          <li key={l.id}>
                            <Link
                              href={`/academy/curso/${slug}/aula/${l.id}`}
                              className={`flex items-center gap-2 px-4 py-2 text-xs hover:bg-neutral-50 ${
                                isCurrent ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                              }`}
                            >
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                                p?.completed ? 'bg-emerald-500 text-white' : 'border border-neutral-300'
                              }`}>
                                {p?.completed ? '✓' : ''}
                              </span>
                              <span className={`truncate ${isCurrent ? 'font-medium' : 'text-neutral-700'}`}>
                                {l.title}
                              </span>
                              {l.duration_seconds && (
                                <span className="ml-auto text-[10px] text-neutral-400 tabular-nums">
                                  {fmtDuration(l.duration_seconds)}
                                </span>
                              )}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
              {!modules?.length && (
                <li className="px-4 py-6 text-center text-xs text-neutral-400 italic">
                  Curso sem módulos ainda.
                </li>
              )}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}

function fmtDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  return `${m}m${s > 0 ? ` ${s}s` : ''}`
}
