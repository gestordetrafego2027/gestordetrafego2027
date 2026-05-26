import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { articles as _articlesMap } from '@/app/[locale]/blog/[slug]/articles'

export const metadata = {
  title: 'Academy — House Mazzutti',
  description:
    'Cursos, workshops, ebooks e comunidade da House Mazzutti. Conteúdo prático sobre direção criativa, moda e comunicação.',
  openGraph: {
    title: 'House Mazzutti Academy',
    description: 'Aprenda direção criativa, comunicação e moda com quem opera no Brasil real.',
  },
}

/* ─── livros ──────────────────────────────────────────────────── */
const BOOKS = [
  {
    id: 'vol-01',
    vol: 'Vol. 01',
    title: 'Marketing para Modelos',
    subtitle: 'Da passarela física ao império digital. O guia honesto de quem quer ser modelo no Brasil de hoje.',
    pages: '281',
    chapters: '12',
    priceFull: 'R$ 70',
    price: 'R$ 49',
    discount: '−30%',
    href: '/pt/academy/marketing-para-modelos',
    cover: '/images/academy/marketing-para-modelos/cover.png',
    status: 'Disponível',
  },
  {
    id: 'vol-02',
    vol: 'Vol. 02',
    title: 'Posicionamento de Marca Pessoal',
    subtitle: 'Como construir autoridade, presença e relevância em mercados de alto valor — além da aparência.',
    pages: '—',
    chapters: '—',
    priceFull: null,
    price: 'Em breve',
    discount: null,
    href: null,
    cover: null,
    status: 'Lançamento 2026',
  },
]

/* ─── produtos ────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'direcao-criativa',
    typeLabel: 'Workshop · Gravado',
    title: 'Direção Criativa e Produção Executiva',
    subtitle: 'Do briefing ao resultado — como pensar, dirigir e executar projetos visuais com consistência de marca.',
    features: ['Videoaulas gravadas', 'Materiais de acompanhamento', 'Acesso vitalício'],
    price: 'R$ 249',
    href: '/academy/workshop/direcao-criativa-producao-executiva',
    cover: '/images/academy/direcao-criativa/cover.webp',
  },
  {
    id: 'comunicacao-360',
    typeLabel: 'Curso Online · Gravado',
    title: 'Comunicação 360 para Influenciadores',
    subtitle: 'Estratégia, posicionamento e presença digital para quem constrói uma carreira baseada em imagem e autoridade.',
    features: ['Videoaulas gravadas', 'Materiais de acompanhamento', 'Acesso vitalício'],
    price: 'R$ 145',
    href: '/academy/course/comunicacao-360-influenciadores',
    cover: '/images/academy/comunicacao-360/cover.webp',
  },
]

/* ─── galeria ─────────────────────────────────────────────────── */
const GALLERY = [
  { src: '/images/studio/banners/banner-1.webp', alt: 'Workshop Fotografia — bastidores' },
  { src: '/images/studio/banners/banner-2.webp', alt: 'Workshop Fotografia — produção' },
  { src: '/images/home/banner-1.webp', alt: 'Workshop Fotografia — making of' },
  { src: '/images/home/banner-2.webp', alt: 'Workshop Fotografia — equipe' },
  { src: '/images/home/banner-3.webp', alt: 'Workshop Fotografia — ambiente' },
  { src: '/images/home/philosophy-bg.webp', alt: 'Workshop Fotografia — resultado' },
]

/* ─── blog ────────────────────────────────────────────────────── */
const BLOG_POSTS = _articlesMap
  ? Object.entries(_articlesMap)
      .slice(0, 4)
      .map(([slug, a]) => ({
        link: `/blog/${slug}`,
        titulo: a.titulo,
        excerpt: a.excerpt ?? a.intro ?? '',
        categoria: a.subcategoria ?? a.categoria,
        data: a.data,
      }))
  : []

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function AcademyHomePage() {
  return (
    <>
      <Header variant="dark" />

      <main className="bg-black text-white">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="relative w-full overflow-hidden"
          style={{ height: '105vh' }}
        >
          <div className="absolute inset-0 z-0 bg-black">
            <Image
              src="/images/home/banner-2.webp"
              alt="House Mazzutti Academy"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              style={{ opacity: 0.35 }}
            />
          </div>
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to top, #000 25%, transparent 65%)' }}
          />

          <div className="relative z-20 h-full flex flex-col justify-center px-12 md:pl-48">
            <div className="max-w-4xl">
              <span className="text-caption text-white/60 mb-6 block">
                House Mazzutti Academy
              </span>
              <h1 className="text-h1 text-white mb-8 hmzt-hero-title">
                Aprenda como Studio,<br />
                Produtora e Agência<br />
                operam.
              </h1>
              <p className="text-body text-white/70 mb-12 measure-editorial">
                Cursos gravados, workshops e materiais de quem executa no Brasil real.
                Direção criativa, comunicação e posicionamento de marca.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#livros"
                  className="inline-block px-12 py-4 border-[0.5px] border-white/40 text-button text-white hover:bg-white hover:text-black transition-all duration-500"
                >
                  Ver livros
                </a>
                <a
                  href="#produtos"
                  className="inline-block px-12 py-4 border-[0.5px] border-white/20 text-button text-white/60 hover:border-white/40 hover:text-white transition-all duration-500"
                >
                  Cursos e Workshops
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── LIVROS ───────────────────────────────────────────── */}
        <section id="livros" className="bg-[#fafafa]">
          <div className="px-12 md:px-24 py-24">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <span className="text-caption text-black/50 mb-4 block">Publicações</span>
                <h2 className="text-h2 text-black">Livros</h2>
              </div>
              <span className="text-caption text-black/40">{BOOKS.length} volumes</span>
            </div>

            <div className="grid grid-cols-1 gap-px md:grid-cols-2 bg-black/10">
              {BOOKS.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CURSOS & WORKSHOPS ───────────────────────────────── */}
        <section id="produtos" className="bg-black">
          <div className="px-12 md:px-24 py-24">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <span className="text-caption text-white/40 mb-4 block">Formação</span>
                <h2 className="text-h2 text-white">Cursos & Workshops</h2>
              </div>
              <span className="text-caption text-white/30">{PRODUCTS.length} produtos</span>
            </div>

            <div className="grid grid-cols-1 gap-px md:grid-cols-2 bg-white/10">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── GALERIA ──────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a]">
          <div className="px-12 md:px-24 py-24">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <span className="text-caption text-white/40 mb-4 block">Último Evento</span>
                <h2 className="text-h2 text-white">Workshop Fotografia</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px md:grid-cols-3 bg-white/5">
              {GALLERY.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden bg-black"
                  style={{ aspectRatio: '4/5' }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    style={{ opacity: 0.85 }}
                  />
                </div>
              ))}
            </div>

            <p className="text-caption text-white/30 text-center mt-8">
              Registro do último workshop presencial — House Mazzutti
            </p>
          </div>
        </section>

        {/* ── BLOG ─────────────────────────────────────────────── */}
        <section className="bg-[#fafafa]" style={{ borderTop: '1px solid #e8e8e8' }}>
          <div className="px-12 md:px-24 py-24">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <span className="text-caption text-black/50 mb-4 block">Editorial</span>
                <h2 className="text-h2 text-black">Do Blog</h2>
              </div>
              <Link
                href="/blog"
                className="text-button text-black/50 hover:text-black transition-colors border-b border-black/20 hover:border-black pb-0.5"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4 bg-black/10">
              {BLOG_POSTS.map((post, i) => (
                <BlogCard key={i} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────── */}
        <section className="bg-black">
          <div
            className="px-12 md:px-24 py-32 flex flex-col items-start"
            style={{ borderTop: '1px solid #222' }}
          >
            <span className="text-caption text-white/40 mb-8 block">House Mazzutti Academy</span>
            <h2 className="text-h1 text-white mb-8 max-w-3xl hmzt-hero-title">
              Conhecimento que transforma como você opera.
            </h2>
            <p className="text-body text-white/60 mb-12 measure-editorial">
              Cursos práticos, workshops gravados e livros por Angelo Mazzutti.
            </p>
            <a
              href="#livros"
              className="inline-block px-12 py-4 border-[0.5px] border-white/40 text-button text-white hover:bg-white hover:text-black transition-all duration-500"
            >
              Explorar produtos
            </a>
          </div>
        </section>

      </main>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════
   COMPONENTES
══════════════════════════════════════════════════════════════════ */

function BookCard({ book }) {
  const isAvailable = book.href !== null

  const inner = (
    <div className="group bg-white flex flex-col md:flex-row h-full transition-colors hover:bg-[#f5f5f5]">
      {/* capa */}
      <div
        className="relative flex items-center justify-center bg-[#f0f0f0] shrink-0"
        style={{ minHeight: 280, width: '100%', maxWidth: 200 }}
      >
        {book.cover ? (
          <div
            className="relative transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              width: 120,
              aspectRatio: '2/3',
              margin: '40px 0',
              filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.18))',
            }}
          >
            <Image
              src={book.cover}
              alt={`Capa ${book.title}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center border border-dashed border-black/20"
            style={{ width: 120, aspectRatio: '2/3', margin: '40px 0' }}
          >
            <span className="text-caption text-black/30 text-center px-2">Em breve</span>
          </div>
        )}
      </div>

      {/* conteúdo */}
      <div className="flex flex-col justify-between p-8 md:p-10 flex-1">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-caption text-black/40">{book.vol}</span>
            <span
              className="text-caption px-3 py-1 border"
              style={{
                borderColor: isAvailable ? '#000' : '#ccc',
                color: isAvailable ? '#000' : '#aaa',
              }}
            >
              {book.status}
            </span>
          </div>
          <h3 className="text-h3 text-black mb-4">{book.title}</h3>
          <p className="text-body text-black/60 measure-editorial">{book.subtitle}</p>
        </div>

        <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 24, marginTop: 24 }}>
          <div className="flex items-end justify-between">
            <div className="flex gap-8">
              <BookMeta k="Páginas" v={book.pages} />
              <BookMeta k="Capítulos" v={book.chapters} />
            </div>
            <div className="flex items-baseline gap-3">
              {book.priceFull && (
                <span className="text-caption text-black/30 line-through">{book.priceFull}</span>
              )}
              <span className={`text-h3 ${isAvailable ? 'text-black' : 'text-black/40'}`}>
                {book.price}
              </span>
              {book.discount && (
                <span
                  className="text-caption px-2 py-0.5 bg-black text-white"
                >
                  {book.discount}
                </span>
              )}
            </div>
          </div>

          {isAvailable && (
            <div className="mt-6">
              <span className="text-button text-black border-b border-black/30 pb-0.5 group-hover:border-black transition-colors">
                Ver o livro →
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (!isAvailable) return <div>{inner}</div>
  return <Link href={book.href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</Link>
}

function BookMeta({ k, v }) {
  return (
    <div>
      <div className="text-caption text-black/30 mb-1">{k}</div>
      <div className="text-h4 text-black">{v}</div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Link
      href={product.href}
      className="group block bg-black"
      style={{ textDecoration: 'none' }}
    >
      {/* capa */}
      <div
        className="relative overflow-hidden bg-[#111]"
        style={{ aspectRatio: '16/9' }}
      >
        <Image
          src={product.cover}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.55 }}
        />
        <div className="absolute top-5 left-5">
          <span
            className="text-caption text-white/70 border border-white/30 px-3 py-1"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            {product.typeLabel}
          </span>
        </div>
      </div>

      {/* texto */}
      <div className="p-8 md:p-10 flex flex-col gap-6">
        <div>
          <h3 className="text-h3 text-white mb-3">{product.title}</h3>
          <p className="text-body text-white/50 measure-editorial">{product.subtitle}</p>
        </div>

        <ul className="flex flex-col gap-2">
          {product.features.map((f, i) => (
            <li key={i} className="text-caption text-white/40 flex items-center gap-3">
              <span className="w-3 h-px bg-white/30 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div
          className="flex items-end justify-between pt-6"
          style={{ borderTop: '1px solid #222' }}
        >
          <span className="text-h3 text-white">{product.price}</span>
          <span className="text-button text-white/40 group-hover:text-white transition-colors border-b border-white/20 group-hover:border-white pb-0.5">
            Acessar →
          </span>
        </div>
      </div>
    </Link>
  )
}

function BlogCard({ post }) {
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
        Ler →
      </span>
    </Link>
  )
}
