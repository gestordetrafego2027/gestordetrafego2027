import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Meu painel | House Mazzutti Academy' }

export default async function StudentDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/academy/dashboard')

  // Matrículas ativas + produto
  const { data: enrollments } = await supabase
    .from('academy_enrollments')
    .select(`
      id, granted_at, expires_at, status,
      product:academy_products!inner (
        id, slug, title, subtitle, type, cover_url, thumbnail_url,
        lesson_count, module_count, duration_minutes, price_cents
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('granted_at', { ascending: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enrolls = (enrollments ?? []) as any[]
  const productIds = enrolls.map((e) => e.product?.id).filter(Boolean)

  // Progresso agregado por produto
  const { data: progressRows } = productIds.length
    ? await supabase
        .from('academy_lesson_progress')
        .select('product_id, lesson_id, completed_at, seconds_watched, last_watched_at')
        .eq('user_id', user.id)
        .in('product_id', productIds)
    : { data: [] as Array<{ product_id: string; lesson_id: string; completed_at: string | null; seconds_watched: number | null; last_watched_at: string | null }> }

  type ProgressAgg = {
    completedLessons: number
    totalSeconds: number
    lastWatchedAt: string | null
    lastLessonId: string | null
  }
  const progByProduct = new Map<string, ProgressAgg>()
  ;((progressRows ?? []) as Array<{ product_id: string; lesson_id: string; completed_at: string | null; seconds_watched: number | null; last_watched_at: string | null }>).forEach((p) => {
    const cur = progByProduct.get(p.product_id) ?? {
      completedLessons: 0, totalSeconds: 0, lastWatchedAt: null, lastLessonId: null,
    }
    if (p.completed_at) cur.completedLessons += 1
    cur.totalSeconds += Number(p.seconds_watched ?? 0)
    if (p.last_watched_at && (!cur.lastWatchedAt || new Date(p.last_watched_at) > new Date(cur.lastWatchedAt))) {
      cur.lastWatchedAt = p.last_watched_at
      cur.lastLessonId = p.lesson_id
    }
    progByProduct.set(p.product_id, cur)
  })

  // Stats globais
  const totalSecondsWatched = Array.from(progByProduct.values())
    .reduce((acc, p) => acc + p.totalSeconds, 0)
  const totalLessonsCompleted = Array.from(progByProduct.values())
    .reduce((acc, p) => acc + p.completedLessons, 0)

  // Certificados
  const { data: certificates } = await supabase
    .from('academy_certificates')
    .select('id, code, pdf_url, issued_at, course_title_pt_snapshot, hours, product_id')
    .eq('user_id', user.id)
    .is('revoked_at', null)
    .order('issued_at', { ascending: false })
    .limit(10)

  // Próximas lives (visíveis pra ele = produto que ele tem ou lives públicas)
  const nowIso = new Date().toISOString()
  const { data: lives } = await supabase
    .from('academy_lives')
    .select('id, slug, title, scheduled_at, duration_minutes, cover_url, status, stream_url, product_id')
    .gte('scheduled_at', nowIso)
    .in('status', ['scheduled', 'live'])
    .order('scheduled_at')
    .limit(8)

  // Cursos em andamento vs concluídos vs ebooks
  const inProgress = enrolls.filter((e) => {
    const p = progByProduct.get(e.product?.id) ?? { completedLessons: 0 }
    const total = e.product?.lesson_count ?? 0
    return e.product?.type === 'course' && (total === 0 || p.completedLessons < total)
  })
  const completed = enrolls.filter((e) => {
    const p = progByProduct.get(e.product?.id) ?? { completedLessons: 0 }
    const total = e.product?.lesson_count ?? 0
    return e.product?.type === 'course' && total > 0 && p.completedLessons >= total
  })
  const ebooks = enrolls.filter((e) => e.product?.type === 'ebook')
  const liveEnrolls = enrolls.filter((e) => e.product?.type === 'live')
  const bundles = enrolls.filter((e) => e.product?.type === 'bundle' || e.product?.type === 'subscription')

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/academy" className="text-sm font-semibold tracking-tight">
            ← House Mazzutti Academy
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-neutral-500 hidden md:inline">{user.email}</span>
            <form action="/logout" method="post">
              <button className="rounded border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-100">Sair</button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section>
          <h1 className="text-2xl font-semibold tracking-tight">Olá{user.user_metadata?.full_name ? `, ${String(user.user_metadata.full_name).split(' ')[0]}` : ''}.</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {enrolls.length === 0
              ? 'Você ainda não tem matrículas ativas. Explore o catálogo.'
              : `Você tem ${enrolls.length} ${enrolls.length === 1 ? 'matrícula ativa' : 'matrículas ativas'}.`}
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Kpi label="Cursos em andamento" value={inProgress.length} />
          <Kpi label="Cursos concluídos" value={completed.length} />
          <Kpi label="Horas assistidas" value={`${Math.floor(totalSecondsWatched / 3600)}h ${Math.floor((totalSecondsWatched % 3600) / 60)}m`} />
          <Kpi label="Aulas completas" value={totalLessonsCompleted} />
        </section>

        {/* Continue de onde parou */}
        {inProgress.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Continue de onde parou</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgress.map((e) => {
                const p = progByProduct.get(e.product.id) ?? { completedLessons: 0, lastLessonId: null, lastWatchedAt: null, totalSeconds: 0 }
                const total = e.product.lesson_count ?? 0
                const pct = total > 0 ? Math.round((p.completedLessons / total) * 100) : 0
                const continueHref = p.lastLessonId
                  ? `/academy/curso/${e.product.slug}/aula/${p.lastLessonId}`
                  : `/academy/curso/${e.product.slug}`
                return (
                  <div key={e.id} className="rounded-lg border border-neutral-200 bg-white overflow-hidden flex flex-col">
                    {e.product.cover_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={e.product.cover_url} alt={e.product.title} className="w-full aspect-video object-cover" />
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="text-xs uppercase text-neutral-500 mb-1">Curso</div>
                      <h3 className="font-medium leading-tight flex-1">{e.product.title}</h3>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-neutral-500">{p.completedLessons}/{total} aulas</span>
                          <span className="font-medium tabular-nums">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-neutral-200 rounded overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <Link
                        href={continueHref}
                        className="mt-3 rounded bg-neutral-900 text-white text-sm px-3 py-2 text-center hover:bg-neutral-700"
                      >
                        {p.lastLessonId ? 'Continuar →' : 'Começar →'}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Próximas lives */}
        {!!lives?.length && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Próximas lives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lives.map((l) => (
                <Link
                  key={l.id}
                  href={`/academy/live/${l.slug}`}
                  className="rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-400 transition-colors flex items-center gap-4"
                >
                  {l.cover_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.cover_url} alt={l.title} className="w-20 h-20 rounded object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-neutral-500">
                      {new Date(l.scheduled_at).toLocaleString('pt-BR', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                      })}
                      {l.status === 'live' && (
                        <span className="ml-2 rounded bg-rose-100 text-rose-700 px-1.5 py-0.5 text-[10px] font-medium">AO VIVO</span>
                      )}
                    </div>
                    <div className="font-medium leading-tight mt-0.5">{l.title}</div>
                    {l.duration_minutes && (
                      <div className="text-xs text-neutral-500 mt-0.5">{l.duration_minutes} min</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Concluídos + Certificados */}
        {(completed.length > 0 || (certificates?.length ?? 0) > 0) && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight mb-3">Cursos concluídos</h2>
              {completed.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">Termine seu primeiro curso para vê-lo aqui.</p>
              ) : (
                <ul className="space-y-2">
                  {completed.map((e) => (
                    <li key={e.id} className="rounded border border-neutral-200 bg-white px-4 py-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{e.product.title}</span>
                      <Link href={`/academy/curso/${e.product.slug}`} className="text-xs text-blue-600 hover:underline">
                        revisar
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight mb-3">Meus certificados</h2>
              {(certificates?.length ?? 0) === 0 ? (
                <p className="text-sm text-neutral-500 italic">Conclua um curso para receber certificado.</p>
              ) : (
                <ul className="space-y-2">
                  {certificates!.map((c) => (
                    <li key={c.id} className="rounded border border-neutral-200 bg-white px-4 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{c.course_title_pt_snapshot ?? 'Certificado'}</div>
                        <div className="text-xs text-neutral-500">
                          Código: <code className="font-mono">{c.code}</code>
                          {c.hours && ` · ${c.hours}h`}
                        </div>
                      </div>
                      <div className="flex gap-2 text-xs">
                        {c.pdf_url && (
                          <a href={c.pdf_url} target="_blank" rel="noopener" className="text-blue-600 hover:underline">PDF</a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* Ebooks */}
        {ebooks.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Meus ebooks</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ebooks.map((e) => (
                <Link
                  key={e.id}
                  href={`/academy/ebook/${e.product.slug}`}
                  className="rounded-lg border border-neutral-200 bg-white overflow-hidden hover:border-neutral-400 transition-colors"
                >
                  {e.product.cover_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={e.product.cover_url} alt={e.product.title} className="w-full aspect-[3/4] object-cover" />
                  )}
                  <div className="p-3 text-sm font-medium leading-tight">{e.product.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Lives compradas */}
        {liveEnrolls.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Minhas lives</h2>
            <ul className="space-y-2">
              {liveEnrolls.map((e) => (
                <li key={e.id} className="rounded border border-neutral-200 bg-white px-4 py-2">
                  <Link href={`/academy/live/${e.product.slug}`} className="text-sm font-medium hover:underline">
                    {e.product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bundles/assinaturas */}
        {bundles.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Pacotes e assinaturas</h2>
            <ul className="space-y-2">
              {bundles.map((e) => (
                <li key={e.id} className="rounded border border-neutral-200 bg-white px-4 py-2 flex justify-between">
                  <span className="text-sm font-medium">{e.product.title}</span>
                  <span className="text-xs text-neutral-500">
                    {e.expires_at
                      ? `expira em ${new Date(e.expires_at).toLocaleDateString('pt-BR')}`
                      : 'vitalício'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {enrolls.length === 0 && (
          <section className="rounded-lg border-2 border-dashed border-neutral-200 bg-white p-8 text-center">
            <p className="text-neutral-600 mb-3">
              Você ainda não tem matrículas ativas.
            </p>
            <Link href="/academy" className="inline-block rounded bg-neutral-900 text-white text-sm px-5 py-2 hover:bg-neutral-700">
              Explorar catálogo
            </Link>
          </section>
        )}

        <footer className="border-t border-neutral-200 pt-6 text-xs text-neutral-500 flex flex-wrap gap-4 justify-between">
          <Link href="/academy" className="hover:text-neutral-900">Catálogo</Link>
          <Link href="/academy/comunidade" className="hover:text-neutral-900">Comunidade</Link>
          <span>© House Mazzutti Academy</span>
        </footer>
      </main>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="text-[10px] uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="text-xl font-semibold mt-1 tabular-nums">{value}</div>
    </div>
  )
}
