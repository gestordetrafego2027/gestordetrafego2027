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

/* ─── produtos estáticos ──────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'direcao-criativa',
    type: 'workshop',
    typeLabel: 'Workshop · Gravado',
    title: 'Direção Criativa e Produção Executiva',
    subtitle: 'Do briefing ao resultado — como pensar, dirigir e executar projetos visuais com consistência de marca.',
    features: ['Videoaulas gravadas', 'Materiais de acompanhamento', 'Acesso vitalício'],
    price: 24900,
    href: '/academy/workshop/direcao-criativa-producao-executiva',
    cover: '/images/academy/direcao-criativa/cover.webp',
    accent: '#1a1a1a',
  },
  {
    id: 'comunicacao-360',
    type: 'course',
    typeLabel: 'Curso Online · Gravado',
    title: 'Comunicação 360 para Influenciadores',
    subtitle: 'Estratégia, posicionamento e presença digital para quem constrói uma carreira baseada em imagem e autoridade.',
    features: ['Videoaulas gravadas', 'Materiais de acompanhamento', 'Acesso vitalício'],
    price: 14500,
    href: '/academy/course/comunicacao-360-influenciadores',
    cover: '/images/academy/comunicacao-360/cover.webp',
    accent: '#1a1a1a',
  },
]

/* ─── galeria workshop ─────────────────────────────────────────── */
const GALLERY = [
  { src: '/images/studio/banners/banner-1.webp', alt: 'Workshop Fotografia — bastidores' },
  { src: '/images/studio/banners/banner-2.webp', alt: 'Workshop Fotografia — produção' },
  { src: '/images/home/banner-1.webp', alt: 'Workshop Fotografia — making of' },
  { src: '/images/home/banner-2.webp', alt: 'Workshop Fotografia — equipe' },
  { src: '/images/home/banner-3.webp', alt: 'Workshop Fotografia — ambiente' },
  { src: '/images/home/philosophy-bg.webp', alt: 'Workshop Fotografia — resultado' },
]

/* ─── blog (últimos 4) ─────────────────────────────────────────── */
const BLOG_POSTS = _articlesMap
  ? Object.entries(_articlesMap)
      .slice(0, 4)
      .map(([slug, a]) => ({
        link: `/blog/${slug}`,
        titulo: a.titulo,
        excerpt: a.excerpt ?? a.intro ?? '',
        subcategoria: a.subcategoria ?? a.categoria,
        data: a.data,
      }))
  : []

function fmt(cents) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function AcademyHomePage() {
  return (
    <>
      <Header />

      <main
        style={{ background: '#0a0a0a', color: '#f5f0eb' }}
        className="min-h-screen"
      >
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative flex min-h-screen items-end overflow-hidden pt-24">
          {/* imagem de fundo */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home/banner-2.webp"
              alt="House Mazzutti Academy"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              style={{ filter: 'brightness(0.35)' }}
            />
          </div>

          {/* overlay gradiente */}
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to top, #0a0a0a 30%, transparent 70%)' }}
          />

          {/* conteúdo */}
          <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-20 md:px-12">
            {/* régua dourada */}
            <div style={{ width: 48, height: 1, background: '#C8A96E', marginBottom: 32 }} />

            <p
              className="mb-4 text-xs uppercase tracking-[0.32em]"
              style={{ color: '#C8A96E', fontFamily: 'RocGrotesk, sans-serif' }}
            >
              House Mazzutti Academy
            </p>

            <h1
              className="max-w-4xl text-5xl leading-[0.92] tracking-tight md:text-8xl"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#f5f0eb',
              }}
            >
              Aprenda como<br />
              <em style={{ color: '#C8A96E' }}>Studio, Produtora</em><br />
              e Agência operam.
            </h1>

            <p
              className="mt-8 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: '#a09890', fontFamily: 'RocGrotesk, sans-serif', fontWeight: 300 }}
            >
              Cursos gravados, workshops e materiais de quem executa no Brasil real.
              Direção criativa, comunicação e posicionamento de marca.
            </p>

            <div className="mt-12 flex flex-wrap gap-6">
              <a
                href="#produtos"
                style={{
                  fontFamily: 'RocGrotesk, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#0a0a0a',
                  background: '#C8A96E',
                  padding: '14px 28px',
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                Ver produtos
              </a>
              <a
                href="#livro"
                style={{
                  fontFamily: 'RocGrotesk, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#f5f0eb',
                  border: '1px solid #3a3a3a',
                  padding: '14px 28px',
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                Marketing para Modelos
              </a>
            </div>
          </div>
        </section>

        {/* ── LIVRO FEATURED ───────────────────────────────────── */}
        <section id="livro" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
          {/* label de seção */}
          <div className="mb-12 flex items-center gap-4">
            <div style={{ width: 32, height: 1, background: '#C8A96E' }} />
            <span
              style={{
                fontFamily: 'RocGrotesk, sans-serif',
                fontSize: 10,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#C8A96E',
              }}
            >
              Destaque
            </span>
          </div>

          <Link
            href="/academy/marketing-para-modelos"
            className="group block"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] overflow-hidden"
              style={{ border: '1px solid #2a2a2a', background: '#111111' }}
            >
              {/* texto */}
              <div className="flex flex-col justify-between gap-10 p-8 md:p-14">
                <div>
                  <p
                    className="mb-6 text-[10px] uppercase tracking-[0.32em]"
                    style={{ color: '#C8A96E', fontFamily: 'RocGrotesk, sans-serif' }}
                  >
                    Ebook · Lançamento · Vol. 01 · 2026
                  </p>
                  <h2
                    className="text-5xl leading-[0.9] tracking-tight md:text-7xl"
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: '#f5f0eb',
                    }}
                  >
                    Marketing<br />
                    para Modelos.
                  </h2>
                  <p
                    className="mt-6 max-w-lg text-base leading-relaxed"
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontStyle: 'italic',
                      color: '#a09890',
                    }}
                  >
                    Da passarela física ao império digital. O guia honesto de quem quer ser modelo
                    no Brasil de hoje — por Angelo Mazzutti.
                  </p>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-8" style={{ borderTop: '1px solid #2a2a2a', paddingTop: 24 }}>
                  <div className="flex gap-10">
                    <BookCell k="Páginas" v="281" />
                    <BookCell k="Capítulos" v="12" />
                    <BookCell k="Formato" v="Ebook" />
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      style={{
                        fontFamily: 'RocGrotesk, sans-serif',
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        textDecoration: 'line-through',
                        color: '#555',
                      }}
                    >
                      R$ 70
                    </span>
                    <span
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 44,
                        color: '#f5f0eb',
                        lineHeight: 1,
                      }}
                    >
                      R$ 49
                    </span>
                    <span
                      style={{
                        fontFamily: 'RocGrotesk, sans-serif',
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#C8A96E',
                        border: '1px solid #C8A96E',
                        padding: '3px 8px',
                      }}
                    >
                      −30%
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: 'RocGrotesk, sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#f5f0eb',
                    borderBottom: '1px solid #C8A96E',
                    paddingBottom: 4,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    width: 'fit-content',
                  }}
                >
                  Ver a página do livro <span>→</span>
                </div>
              </div>

              {/* capa */}
              <div
                className="flex items-center justify-center p-10 md:p-16"
                style={{ background: '#0f0f0f', minWidth: 280 }}
              >
                <div
                  className="relative transition-transform duration-700 group-hover:-translate-y-2"
                  style={{
                    width: 220,
                    aspectRatio: '2/3',
                    transform: 'rotate(-1.5deg)',
                    filter: 'drop-shadow(0 32px 48px rgba(0,0,0,0.6))',
                  }}
                >
                  <Image
                    src="/images/academy/marketing-para-modelos/cover.png"
                    alt="Capa Marketing para Modelos Vol. 01"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── PRODUTOS ─────────────────────────────────────────── */}
        <section id="produtos" className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
          <div className="mb-12 flex items-center gap-4">
            <div style={{ width: 32, height: 1, background: '#C8A96E' }} />
            <span
              style={{
                fontFamily: 'RocGrotesk, sans-serif',
                fontSize: 10,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#C8A96E',
              }}
            >
              Produtos
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px md:grid-cols-2" style={{ background: '#2a2a2a' }}>
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ── GALERIA WORKSHOP ─────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div style={{ width: 32, height: 1, background: '#C8A96E' }} />
              <span
                style={{
                  fontFamily: 'RocGrotesk, sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#C8A96E',
                }}
              >
                Último Evento
              </span>
            </div>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 28,
                color: '#f5f0eb',
                fontWeight: 400,
              }}
            >
              Workshop Fotografia
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px md:grid-cols-3" style={{ background: '#2a2a2a' }}>
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/5', background: '#111' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: 'brightness(0.85)' }}
                />
              </div>
            ))}
          </div>

          <p
            className="mt-6 text-center text-sm"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              color: '#a09890',
            }}
          >
            Registro fotográfico do último workshop presencial da House Mazzutti.
          </p>
        </section>

        {/* ── BLOG ─────────────────────────────────────────────── */}
        <section
          className="mx-auto max-w-7xl px-6 pb-32 md:px-12"
          style={{ borderTop: '1px solid #2a2a2a', paddingTop: 80 }}
        >
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div style={{ width: 32, height: 1, background: '#C8A96E' }} />
                <span
                  style={{
                    fontFamily: 'RocGrotesk, sans-serif',
                    fontSize: 10,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: '#C8A96E',
                  }}
                >
                  Editorial
                </span>
              </div>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 40,
                  color: '#f5f0eb',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                Do Blog
              </h2>
            </div>
            <Link
              href="/blog"
              style={{
                fontFamily: 'RocGrotesk, sans-serif',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#a09890',
                textDecoration: 'none',
                borderBottom: '1px solid #3a3a3a',
                paddingBottom: 2,
              }}
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4" style={{ background: '#2a2a2a' }}>
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={i} post={post} />
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────── */}
        <section
          style={{ background: '#111111', borderTop: '1px solid #2a2a2a' }}
          className="px-6 py-24 text-center md:px-12"
        >
          <div style={{ width: 1, height: 64, background: '#2a2a2a', margin: '0 auto 40px' }} />
          <p
            className="mb-4 text-xs uppercase tracking-[0.32em]"
            style={{ color: '#C8A96E', fontFamily: 'RocGrotesk, sans-serif' }}
          >
            House Mazzutti Academy
          </p>
          <h2
            className="mx-auto max-w-2xl text-4xl leading-tight md:text-6xl"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#f5f0eb',
            }}
          >
            Conhecimento que transforma como você opera.
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-base"
            style={{ color: '#a09890', fontFamily: 'RocGrotesk, sans-serif', fontWeight: 300 }}
          >
            Cursos práticos, workshop gravados e ebooks por Angelo Mazzutti.
          </p>
          <a
            href="#produtos"
            style={{
              fontFamily: 'RocGrotesk, sans-serif',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              background: '#C8A96E',
              padding: '14px 32px',
              display: 'inline-block',
              textDecoration: 'none',
              marginTop: 40,
            }}
          >
            Explorar produtos
          </a>
        </section>
      </main>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════
   COMPONENTES
══════════════════════════════════════════════════════════════════ */

function ProductCard({ product }) {
  return (
    <Link
      href={product.href}
      className="group block"
      style={{ background: '#111111', textDecoration: 'none' }}
    >
      {/* capa */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0f0f0f' }}>
        <Image
          src={product.cover}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'brightness(0.6)' }}
          onError={() => {}}
        />
        {/* badge tipo */}
        <div
          className="absolute top-5 left-5"
          style={{
            fontFamily: 'RocGrotesk, sans-serif',
            fontSize: 9,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C8A96E',
            border: '1px solid #C8A96E',
            padding: '4px 10px',
            background: 'rgba(10,10,10,0.7)',
          }}
        >
          {product.typeLabel}
        </div>
      </div>

      {/* conteúdo */}
      <div className="flex flex-col gap-5 p-8">
        <div>
          <h3
            className="text-2xl leading-tight"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#f5f0eb',
            }}
          >
            {product.title}
          </h3>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: '#a09890', fontFamily: 'RocGrotesk, sans-serif', fontWeight: 300 }}
          >
            {product.subtitle}
          </p>
        </div>

        {/* features */}
        <ul className="flex flex-col gap-1.5">
          {product.features.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-xs"
              style={{ color: '#555', fontFamily: 'RocGrotesk, sans-serif' }}
            >
              <span style={{ color: '#C8A96E' }}>—</span> {f}
            </li>
          ))}
        </ul>

        {/* preço + cta */}
        <div
          className="flex items-end justify-between pt-5"
          style={{ borderTop: '1px solid #2a2a2a' }}
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 36,
              color: '#f5f0eb',
              lineHeight: 1,
            }}
          >
            {fmt(product.price)}
          </span>
          <span
            className="transition-colors group-hover:text-[#C8A96E]"
            style={{
              fontFamily: 'RocGrotesk, sans-serif',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#a09890',
              borderBottom: '1px solid #3a3a3a',
              paddingBottom: 2,
            }}
          >
            Acessar →
          </span>
        </div>
      </div>
    </Link>
  )
}

function BookCell({ k, v }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'RocGrotesk, sans-serif',
          fontSize: 9,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#555',
        }}
      >
        {k}
      </div>
      <div
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontSize: 22,
          color: '#f5f0eb',
          marginTop: 4,
        }}
      >
        {v}
      </div>
    </div>
  )
}

function BlogCard({ post }) {
  return (
    <Link
      href={post.link}
      className="group block p-6"
      style={{ background: '#111111', textDecoration: 'none' }}
    >
      <p
        className="mb-4 text-[9px] uppercase tracking-[0.28em]"
        style={{ color: '#C8A96E', fontFamily: 'RocGrotesk, sans-serif' }}
      >
        {post.subcategoria || post.categoria}
      </p>
      <h3
        className="line-clamp-3 text-base leading-snug"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: '#f5f0eb',
        }}
      >
        {post.titulo}
      </h3>
      <p
        className="mt-3 line-clamp-3 text-xs leading-relaxed"
        style={{ color: '#555', fontFamily: 'RocGrotesk, sans-serif', fontWeight: 300 }}
      >
        {post.excerpt}
      </p>
      <p
        className="mt-5 text-[10px] uppercase tracking-[0.2em] transition-colors group-hover:text-[#C8A96E]"
        style={{ color: '#3a3a3a', fontFamily: 'RocGrotesk, sans-serif' }}
      >
        Ler →
      </p>
    </Link>
  )
}
