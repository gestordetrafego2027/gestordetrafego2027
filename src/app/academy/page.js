import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import BlogSection from '@/app/components/BlogSection'

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
    year: '2026',
    title: 'Marketing para Modelos',
    subtitle: 'Da passarela física ao império digital. O guia honesto de quem quer ser modelo no Brasil de hoje — por Angelo Mazzutti.',
    pages: '94',
    chapters: '12',
    format: 'Ebook',
    priceFull: null,
    price: 'R$ 49',
    discount: null,
    href: '/pt/academy/marketing-para-modelos',
    cover: '/images/academy/marketing-para-modelos/cover.webp',
    coverBg: '#a4e80a',
    status: 'Disponível',
    available: true,
  },
  {
    id: 'vol-02',
    vol: 'Vol. 02',
    year: '2026',
    title: 'O Preço da Relevância',
    subtitle: 'O que o algoritmo cobra de quem quer ser visto. Tese sobre atenção, plataforma e o custo real de existir digitalmente.',
    pages: '—',
    chapters: '10',
    format: 'Ebook',
    priceFull: null,
    price: 'R$ 46',
    discount: null,
    href: '/pt/academy/preco-da-relevancia',
    cover: '/images/academy/preco-da-relevancia/cover.webp',
    coverBg: '#6e1313',
    status: 'Lançamento',
    available: true,
  },
  {
    id: 'vol-03',
    vol: 'Vol. 03',
    year: '2026',
    title: 'Em breve',
    subtitle: 'O próximo volume da série editorial House Mazzutti está em produção.',
    pages: '—',
    chapters: '—',
    format: 'Ebook',
    priceFull: null,
    price: '—',
    discount: null,
    href: null,
    cover: null,
    coverBg: '#111111',
    status: 'Em breve',
    available: false,
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
    href: '/academy/workshop-producao-direcao-01',
    cover: '/images/academy/direcao-criativa/cover.jpg',
  },
  {
    id: 'comunicacao-360',
    typeLabel: 'Imersão Presencial · Gravada',
    title: 'Inside Out · Edit 01 — Uberlândia',
    subtitle: 'Tudo que rolou em 2 dias de imersão real — da concepção do briefing à campanha entregue ao vivo. Assista como participante.',
    features: ['Gravação completa do evento', 'Direção criativa e produção ao vivo', 'Acesso vitalício'],
    price: 'R$ 145',
    href: '/academy/workshop-inside-out-edit-01',
    cover: '/images/academy/comunicacao-360/cover.jpg',
  },
]

/* ─── galeria ─────────────────────────────────────────────────── */
const GALLERY = [
  { src: '/images/academy/gallery/grid-1.webp', alt: 'Workshop Inside Out — bastidores' },
  { src: '/images/academy/gallery/grid-2.webp', alt: 'Workshop Inside Out — produção' },
  { src: '/images/academy/gallery/grid-3.webp', alt: 'Workshop Inside Out — making of' },
  { src: '/images/academy/gallery/grid-4.webp', alt: 'Workshop Inside Out — equipe' },
  { src: '/images/academy/gallery/grid-5.webp', alt: 'Workshop Inside Out — ambiente' },
  { src: '/images/academy/gallery/grid-6.webp', alt: 'Workshop Inside Out — resultado' },
]

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
                Aprenda o que<br />
                só a experiência<br />
                ensina.
              </h1>
              <p className="text-body text-white/70 mb-12 measure-editorial">
                Livros e cursos feitos por quem cria, dirige e executa — para quem quer fazer o mesmo.
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
                <span className="text-caption text-black/50 mb-4 block">Publicações · Série Editorial</span>
                <h2 className="text-h2 text-black">Livros</h2>
              </div>
              <span className="text-caption text-black/40">{BOOKS.filter(b => b.available).length} volumes · Vol. 03 em breve</span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                <h2 className="text-h2 text-white">Por trás das câmeras</h2>
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
                    style={{ opacity: 1 }}
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── BLOG ─────────────────────────────────────────────── */}
        <BlogSection />

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
  const inner = (
    <div className="group flex flex-col bg-white overflow-hidden border border-black/8 transition-transform duration-300 hover:-translate-y-1" style={{ boxShadow: '0 2px 0 #e0e0e0' }}>

      {/* ── capa ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ background: book.coverBg ?? '#1a1a1a', aspectRatio: '3/4' }}
      >
        {/* capa flutuante */}
        {book.cover ? (
          <div
            className="relative z-10 transition-transform duration-700 group-hover:scale-[1.03]"
            style={{
              width: '72%',
              aspectRatio: '2/3',
              filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.55)) drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
              transform: 'rotate(-1deg)',
            }}
          >
            <Image
              src={book.cover}
              alt={`Capa ${book.title}`}
              fill
              sizes="(max-width: 768px) 72vw, 25vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <span className="text-white/15 text-[96px] font-light" style={{ fontFamily: 'serif' }}>03</span>
          </div>
        )}

        {/* badge vol/status */}
        <div className="absolute top-5 left-5 flex items-center gap-2 z-20">
          <span className="text-caption text-white/60 bg-black/40 px-3 py-1 backdrop-blur-sm">
            {book.vol} · {book.year}
          </span>
          <span
            className="text-caption px-3 py-1"
            style={{
              background: book.available ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
              color: book.available ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {book.status}
          </span>
        </div>
      </div>

      {/* ── informações ── */}
      <div className="flex flex-col gap-0 p-8 md:p-10">

        {/* título + subtítulo */}
        <h3 className="text-h3 text-black mb-3">{book.title}</h3>
        <p className="text-body text-black/55 measure-editorial mb-8">{book.subtitle}</p>

        {/* metadados */}
        <div className="grid grid-cols-3 gap-4 pb-7 mb-7" style={{ borderBottom: '1px solid #e8e8e8' }}>
          <BookMeta k="Páginas" v={book.pages} />
          <BookMeta k="Capítulos" v={book.chapters} />
          <BookMeta k="Formato" v={book.format} />
        </div>

        {/* preço + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            {book.priceFull && (
              <span className="text-caption text-black/30 line-through">{book.priceFull}</span>
            )}
            <span className="text-h3 text-black">{book.price}</span>
            {book.discount && (
              <span className="text-caption bg-black text-white px-2 py-0.5">{book.discount}</span>
            )}
          </div>
          {book.available && (
            <span className="text-button text-black border-b border-black/25 pb-0.5 group-hover:border-black transition-colors">
              Ver o livro →
            </span>
          )}
        </div>

      </div>
    </div>
  )

  if (!book.available || !book.href) return <div>{inner}</div>
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
          style={{ opacity: 1 }}
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

