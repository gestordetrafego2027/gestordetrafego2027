import { Link } from '@/i18n/navigation'
import { articles as _articlesMap } from '@/app/[locale]/blog/[slug]/articles'

/* ─── resolve posts a partir de slugs (ou os 4 primeiros do mapa) ─── */
function resolvePosts(slugs) {
  const toPost = (slug, a) => ({
    link: `/blog/${slug}`,
    titulo: a.titulo,
    excerpt: a.excerpt ?? a.intro ?? '',
    categoria: a.subcategoria ?? a.categoria,
  })

  if (slugs && slugs.length) {
    return slugs
      .map((slug) => {
        const a = _articlesMap?.[slug]
        return a ? toPost(slug, a) : null
      })
      .filter(Boolean)
  }

  return _articlesMap
    ? Object.entries(_articlesMap)
        .slice(0, 4)
        .map(([slug, a]) => toPost(slug, a))
    : []
}

/* ══════════════════════════════════════════════════════════════════
   BLOG SECTION — padrão editorial "Do Blog"
   Renderiza a seção completa (cabeçalho + grade de cards).
   Uso: <BlogSection slugs={['slug-a', 'slug-b', ...]} />
        <BlogSection />  // os 4 artigos mais recentes
══════════════════════════════════════════════════════════════════ */
export default function BlogSection({
  slugs,
  eyebrow = 'Editorial',
  title = 'Do Blog',
  allHref = '/blog',
  allLabel = 'Ver todos →',
  readLabel = 'Ler →',
}) {
  const posts = resolvePosts(slugs)
  if (!posts.length) return null

  return (
    <section className="bg-[#fafafa]" style={{ borderTop: '1px solid #e8e8e8' }}>
      <div className="px-12 md:px-24 py-24">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="text-caption text-black/50 mb-4 block">{eyebrow}</span>
            <h2 className="text-h2 text-black">{title}</h2>
          </div>
          <Link
            href={allHref}
            className="text-button text-black/50 hover:text-black transition-colors border-b border-black/20 hover:border-black pb-0.5"
          >
            {allLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4 bg-black/10">
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} readLabel={readLabel} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── card individual ─────────────────────────────────────────────── */
function BlogCard({ post, readLabel = 'Ler →' }) {
  return (
    <Link
      href={post.link}
      className="group block bg-white p-8 hover:bg-[#f5f5f5] transition-colors"
      style={{ textDecoration: 'none' }}
    >
      <span className="text-caption text-black/40 mb-4 block">{post.categoria}</span>
      <h3 className="text-h4 text-black mb-3 line-clamp-3">{post.titulo}</h3>
      <p className="text-body text-black/50 line-clamp-3 text-sm mb-6">{post.excerpt}</p>
      <span className="text-button text-black/30 group-hover:text-black transition-colors border-b border-black/10 group-hover:border-black pb-0.5">
        {readLabel}
      </span>
    </Link>
  )
}
