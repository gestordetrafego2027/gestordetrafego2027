import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'

export const metadata = {
  title: 'Academy — House Mazzutti',
  description:
    'Cursos, ebooks, mentorias e conteúdo prático sobre Studio, Produtora e Agência da House Mazzutti.',
  openGraph: {
    title: 'House Mazzutti Academy',
    description: 'Aprenda Studio, Produtora e Agência com quem opera no Brasil real.',
  },
}

/* ─── dados ────────────────────────────────────────────────────── */

const BOOKS = [
  {
    slug: 'marketing-para-modelos',
    vol: '01',
    year: '2026',
    title: 'Marketing\npara Modelos.',
    subtitle: 'Da passarela física ao império digital.',
    pages: '281',
    chapters: '12',
    priceAnchor: 'R$ 197',
    price: 'R$ 49',
    tag: '−75%',
    href: '/pt/academy/marketing-para-modelos',
    cover: '/images/academy/marketing-para-modelos/cover.png',
    available: true,
  },
  {
    slug: 'preco-da-relevancia',
    vol: '02',
    year: '2026',
    title: 'O Preço\nda Relevância.',
    subtitle: 'O que o algoritmo cobra de quem quer ser visto.',
    pages: '220',
    chapters: '14',
    priceAnchor: 'R$ 227',
    price: 'R$ 137',
    tag: '−40%',
    href: '/pt/academy/preco-da-relevancia',
    cover: '/images/academy/preco-da-relevancia/cover.png',
    available: true,
  },
]

const PRODUCTS = [
  {
    slug: 'direcao-criativa',
    type: 'Curso gravado',
    title: 'Direção Criativa\ne Produção Executiva',
    description:
      'Como dirigir projetos visuais de ponta a ponta — da ideia ao entregável. Inclui materiais de acompanhamento.',
    price: 'R$ 249',
    cover: '/images/academy/direcao-criativa/cover.webp',
    href: '#',
    badge: 'Novo',
  },
  {
    slug: 'comunicacao-360',
    type: 'Curso gravado',
    title: 'Comunicação 360\npara Influenciadores',
    description:
      'Estratégia, narrativa e distribuição para quem quer crescer em múltiplas plataformas. Com materiais.',
    price: 'R$ 145',
    cover: '/images/academy/comunicacao-360/cover.webp',
    href: '#',
    badge: null,
  },
]

const GALLERY = [
  { src: '/images/home/banner-1.webp', alt: 'Workshop Fotografia — frame 1' },
  { src: '/images/home/banner-2.webp', alt: 'Workshop Fotografia — frame 2' },
  { src: '/images/home/banner-3.webp', alt: 'Workshop Fotografia — frame 3' },
  { src: '/images/home/banner-4.webp', alt: 'Workshop Fotografia — frame 4' },
  { src: '/images/home/banner-5.webp', alt: 'Workshop Fotografia — frame 5' },
  { src: '/images/home/banner-6.webp', alt: 'Workshop Fotografia — frame 6' },
]

/* ─── page ─────────────────────────────────────────────────────── */

export default function AcademyHomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="min-h-[60vh] bg-[#0f0c0a] flex flex-col justify-end px-6 pb-16 pt-32">
          <div className="mx-auto w-full max-w-6xl">
            <p className="text-caption text-neutral-500 mb-6">House Mazzutti · Academy · MMXXVI</p>
            <h1 className="text-h1 text-white max-w-4xl">
              Conhecimento que<br />
              <span className="text-neutral-400">sustenta o negócio.</span>
            </h1>
            <p className="text-body text-neutral-400 mt-6 max-w-xl">
              Cursos, ebooks e conteúdo prático sobre Studio, Produtora e Agência — pelo mesmo padrão operacional da casa.
            </p>
          </div>
        </section>

        {/* ── LIVROS ── */}
        <section className="bg-[#fafafa] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-caption text-neutral-500 mb-10">Publicações · Série Editorial</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BOOKS.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CURSOS ── */}
        <section className="bg-white px-6 py-20 border-t border-neutral-100">
          <div className="mx-auto max-w-6xl">
            <p className="text-caption text-neutral-500 mb-10">Cursos Gravados · Com materiais</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── GALERIA ── */}
        <section className="bg-[#0f0c0a] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-caption text-neutral-500 mb-3">Galeria · Workshop Fotografia</p>
            <h2 className="text-h2 text-white mb-10">Último evento.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {GALLERY.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <BlogSection />

      </main>
    </>
  )
}

/* ─── BookCard ─────────────────────────────────────────────────── */

function BookCard({ book }) {
  const el = (
    <div
      className="group relative overflow-hidden border border-neutral-900 bg-neutral-900 flex flex-col md:flex-row transition-transform hover:-translate-y-1"
      style={{ boxShadow: '8px 8px 0 #0f0c0a' }}
    >
      {/* texto */}
      <div className="flex flex-col justify-between gap-6 p-8 flex-1">
        <div>
          <p className="text-caption text-neutral-500 mb-4">
            Vol. {book.vol} · {book.year}
          </p>
          <h3
            className="text-white leading-[0.94] tracking-tight"
            style={{ fontFamily: 'RocGrotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {book.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < book.title.split('\n').length - 1 && <br />}</span>
            ))}
          </h3>
          <p className="text-body text-neutral-400 mt-4">{book.subtitle}</p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-4 border-t border-neutral-700 pt-5 mb-5">
            <BookMeta label="Páginas" value={book.pages} />
            <BookMeta label="Capítulos" value={book.chapters} />
            <BookMeta label="Formato" value="Ebook" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-caption text-neutral-600 line-through">{book.priceAnchor}</span>
            <span className="text-white text-2xl font-semibold">{book.price}</span>
            <span className="text-[11px] font-medium tracking-wide bg-white text-neutral-900 px-2 py-0.5">{book.tag}</span>
          </div>
        </div>

        {book.available && (
          <div className="inline-flex w-fit items-center gap-3 border border-neutral-700 text-white px-6 py-3 text-button transition-colors group-hover:bg-white group-hover:text-neutral-900 group-hover:border-white">
            Ver o livro →
          </div>
        )}
      </div>

      {/* capa */}
      <div className="relative w-full md:w-52 min-h-[200px] bg-neutral-800 flex items-center justify-center p-6">
        <div
          className="relative aspect-[2/3] w-36 transition-transform duration-700"
          style={{ transform: 'rotate(-2.2deg)', filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.5))' }}
        >
          <Image
            src={book.cover}
            alt={`Capa ${book.title}`}
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )

  return book.available ? <Link href={book.href}>{el}</Link> : el
}

function BookMeta({ label, value }) {
  return (
    <div>
      <p className="text-caption text-neutral-600">{label}</p>
      <p className="text-white text-sm font-medium mt-0.5">{value}</p>
    </div>
  )
}

/* ─── ProductCard ──────────────────────────────────────────────── */

function ProductCard({ product }) {
  return (
    <Link
      href={product.href}
      className="group relative flex flex-col border border-neutral-200 bg-white overflow-hidden transition-transform hover:-translate-y-1"
      style={{ boxShadow: '4px 4px 0 #e5e5e5' }}
    >
      {/* cover */}
      <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
        <Image
          src={product.cover}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] tracking-widest uppercase px-3 py-1">
            {product.badge}
          </span>
        )}
      </div>

      {/* texto */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div>
          <p className="text-caption text-neutral-500 mb-2">{product.type}</p>
          <h3
            className="text-neutral-900 leading-tight"
            style={{ fontFamily: 'RocGrotesk, sans-serif', fontWeight: 600, fontSize: 'clamp(20px, 2.5vw, 26px)' }}
          >
            {product.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < product.title.split('\n').length - 1 && <br />}</span>
            ))}
          </h3>
          <p className="text-body text-neutral-500 mt-3">{product.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-neutral-900 text-xl font-semibold">{product.price}</span>
          <span className="text-button text-neutral-900 group-hover:underline">Ver curso →</span>
        </div>
      </div>
    </Link>
  )
}

/* ─── BlogSection ──────────────────────────────────────────────── */

async function BlogSection() {
  let posts = []
  try {
    const { articles: articlesMap } = await import('@/app/[locale]/blog/[slug]/articles.js')
    posts = Object.entries(articlesMap)
      .slice(0, 4)
      .map(([slug, a]) => ({
        slug,
        title: a.title,
        date: a.date,
        excerpt: a.excerpt || a.intro || '',
        category: a.category || 'Editorial',
      }))
  } catch {
    // articles module not found
  }

  if (posts.length === 0) return null

  return (
    <section className="bg-[#fafafa] px-6 py-20 border-t border-neutral-100">
      <div className="mx-auto max-w-6xl">
        <p className="text-caption text-neutral-500 mb-3">Blog · House Mazzutti</p>
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-h2 text-neutral-900">Leituras recentes.</h2>
          <Link href="/blog" className="text-button text-neutral-500 hover:text-neutral-900 transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/pt/blog/${post.slug}`}
              className="group flex flex-col gap-3 border-t border-neutral-200 pt-6 hover:border-neutral-900 transition-colors"
            >
              <p className="text-caption text-neutral-500">{post.category} · {post.date}</p>
              <h3
                className="text-neutral-900 leading-snug group-hover:underline"
                style={{ fontFamily: 'RocGrotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(18px, 2vw, 22px)' }}
              >
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-body text-neutral-500 line-clamp-2">{post.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
