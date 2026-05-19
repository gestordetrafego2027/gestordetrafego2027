import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { createClient } from '@/lib/supabase/server'
import PostComposer from './PostComposer'

export const dynamic = 'force-dynamic'

export default async function SpacePage({ params }) {
  const { spaceSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: space } = await supabase
    .from('academy_community_spaces')
    .select('id, slug, name, description, requires_subscription, required_product_id')
    .eq('slug', spaceSlug)
    .eq('active', true)
    .maybeSingle()
  if (!space) notFound()

  let canPost = false
  if (user) {
    const { data } = await supabase.rpc('fn_user_can_access_space', {
      p_user_id: user.id,
      p_space_id: space.id,
    })
    canPost = data === true
  }

  const { data: posts } = await supabase
    .from('academy_posts')
    .select(`
      id, type, title, body_md, created_at, pinned,
      comment_count, reaction_count,
      author:profiles(id, full_name, avatar_url)
    `)
    .eq('space_id', space.id)
    .eq('status', 'published')
    .order('pinned', { ascending: false })
    .order('last_activity_at', { ascending: false })
    .limit(50)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="mx-auto max-w-3xl px-6 py-10">
          <Link href="/academy/comunidade" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900">
            ← Comunidade
          </Link>
          <h1 className="mt-3 text-3xl font-semibold text-neutral-900">{space.name}</h1>
          {space.description && <p className="mt-1 text-neutral-600">{space.description}</p>}

          {/* COMPOSER */}
          {user ? (
            canPost ? (
              <div className="mt-6">
                <PostComposer spaceId={space.id} />
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Você precisa ter acesso ao produto/assinatura vinculado para postar neste espaço.
              </div>
            )
          ) : (
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 text-sm">
              <Link href={`/login?redirect=/academy/comunidade/${space.slug}`} className="underline">
                Entrar
              </Link>{' '}
              para participar.
            </div>
          )}

          {/* FEED */}
          <div className="mt-8 space-y-4">
            {(posts || []).length === 0 ? (
              <p className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-500">
                Ainda nenhum post. Seja o primeiro.
              </p>
            ) : (
              posts.map((p) => <PostCard key={p.id} post={p} />)
            )}
          </div>
        </section>
      </main>
    </>
  )
}

function PostCard({ post }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5">
      <header className="mb-3 flex items-center gap-3">
        {post.author?.avatar_url ? (
          <img src={post.author.avatar_url} alt="" className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="h-9 w-9 rounded-full bg-neutral-200" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-900">{post.author?.full_name || 'Membro'}</p>
          <p className="text-xs text-neutral-500">{new Date(post.created_at).toLocaleString('pt-BR')}</p>
        </div>
        {post.pinned && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">Fixado</span>}
      </header>
      {post.title && <h3 className="mb-2 text-lg font-semibold text-neutral-900">{post.title}</h3>}
      {post.body_md && (
        <div className="whitespace-pre-wrap text-sm text-neutral-800">{post.body_md}</div>
      )}
      <footer className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
        <span>❤ {post.reaction_count}</span>
        <span>💬 {post.comment_count}</span>
      </footer>
    </article>
  )
}
