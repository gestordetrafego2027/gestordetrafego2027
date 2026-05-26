import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import ProductCard from '@/app/components/academy/ProductCard'
import { listPublishedProducts } from '@/lib/academy/queries'

export const metadata = {
  title: 'Academy — House Mazzutti',
  description:
    'Cursos, ebooks, mentorias, lives e comunidade da House Mazzutti. Conteúdo prático sobre Studio, Produtora e Agência.',
  openGraph: {
    title: 'House Mazzutti Academy',
    description: 'Aprenda Studio, Produtora e Agência com quem opera no Brasil real.',
  },
}

const SECTIONS = [
  { type: 'course', title: 'Cursos', subtitle: 'Treinamentos completos em vídeo' },
  { type: 'ebook', title: 'Ebooks', subtitle: 'Manuais práticos para download' },
  { type: 'mentorship', title: 'Mentorias', subtitle: 'Acompanhamento direto' },
  { type: 'live_event', title: 'Lives', subtitle: 'Encontros ao vivo' },
  { type: 'bundle', title: 'Combos', subtitle: 'Pacotes com desconto' },
]

export default async function AcademyHomePage() {
  const all = await listPublishedProducts({ limit: 200 })
  const byType = SECTIONS.map((s) => ({
    ...s,
    items: all.filter((p) => p.type === s.type),
  })).filter((s) => s.items.length > 0)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        {/* HERO */}
        <section className="bg-neutral-900 px-6 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm uppercase tracking-widest text-neutral-400">
              House Mazzutti Academy
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              Aprenda como Studio, Produtora e Agência se sustentam no Brasil real.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-300">
              Cursos, ebooks, mentorias e uma comunidade que opera no mesmo padrão da casa.
            </p>
          </div>
        </section>

        {/* FEATURED · VOL. 01 */}
        <section className="mx-auto max-w-6xl px-6 pt-16">
          <FeaturedBookCard />
        </section>

        {/* CATÁLOGO */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          {all.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-16">
              {byType.map((section) => (
                <CatalogSection key={section.type} section={section} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

function CatalogSection({ section }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900">{section.title}</h2>
          {section.subtitle && (
            <p className="text-sm text-neutral-600">{section.subtitle}</p>
          )}
        </div>
        <span className="text-sm text-neutral-500">{section.items.length} itens</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function FeaturedBookCard() {
  return (
    <Link
      href="/academy/marketing-para-modelos"
      className="group relative block overflow-hidden border border-neutral-900 bg-[#a4e80a] transition-transform hover:-translate-y-1"
      style={{ boxShadow: '12px 12px 0 #14140e' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
        {/* texto */}
        <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[#14140e]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#c92a2a]" />
              Lançamento · Vol. 01 · 2026
            </div>
            <h3
              className="mt-6 text-5xl leading-[0.92] tracking-tight text-[#14140e] md:text-7xl"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic' }}
            >
              <span style={{ color: '#c92a2a' }}>M</span>arketing
              <br />
              <span style={{ color: '#f0b400' }}>p</span>ara
              <br />
              <span style={{ color: '#1e3a8a' }}>M</span>odelos.
            </h3>
            <p
              className="mt-6 max-w-md text-lg leading-snug text-[#14140e]/85"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic' }}
            >
              Da passarela física ao império digital. O guia honesto de quem quer ser modelo
              no Brasil de hoje — por Angelo Mazzutti.
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[#14140e]/40 pt-6">
            <div className="grid grid-cols-3 gap-6 text-[#14140e]">
              <Cell k="Páginas" v="281" />
              <Cell k="Capítulos" v="12" />
              <Cell k="Formato" v="Ebook" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-xs uppercase tracking-[0.28em] text-[#14140e]/60 line-through">
                R$ 197
              </span>
              <span
                className="text-4xl text-[#14140e]"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic' }}
              >
                R$ 117
              </span>
            </div>
          </div>

          <div
            className="inline-flex w-fit items-center gap-3 bg-[#14140e] px-6 py-4 text-xs font-medium uppercase tracking-[0.28em] text-[#efe9da] transition-colors group-hover:bg-[#c92a2a]"
            style={{ fontFamily: 'RocGrotesk, sans-serif' }}
          >
            Ver a página do livro
            <span className="text-base">→</span>
          </div>
        </div>

        {/* capa */}
        <div className="relative flex items-center justify-center bg-[#a4e80a] p-8 md:p-12">
          <div
            className="relative aspect-[2/3] w-full max-w-[280px] transition-transform duration-700 group-hover:-rotate-[1deg] group-hover:-translate-y-1.5"
            style={{
              transform: 'rotate(-2.2deg)',
              filter:
                'drop-shadow(0 24px 40px rgba(0,0,0,0.28)) drop-shadow(0 6px 12px rgba(0,0,0,0.18))',
            }}
          >
            <Image
              src="/images/academy/marketing-para-modelos/cover.png"
              alt="Capa do livro Marketing para Modelos · Vol. 01"
              fill
              sizes="(max-width: 768px) 70vw, 280px"
              className="object-cover"
            />
            <span
              className="absolute -right-4 -top-4 rotate-[7deg] border border-[#efe9da] bg-[#14140e] px-3 py-2 text-[9px] uppercase tracking-[0.28em] text-[#efe9da]"
              style={{ fontFamily: 'RocGrotesk, sans-serif' }}
            >
              Vol. 01 · 2026
            </span>
          </div>
        </div>
      </div>

      {/* régua Mondrian */}
      <div className="flex h-1.5 w-full">
        <span className="flex-1 bg-[#c92a2a]" />
        <span className="flex-1 bg-[#f0b400]" />
        <span className="flex-[2] bg-[#1e3a8a]" />
        <span className="flex-1 bg-[#14140e]" />
      </div>
    </Link>
  )
}

function Cell({ k, v }) {
  return (
    <div>
      <div
        className="text-[9px] uppercase tracking-[0.32em] text-[#14140e]/60"
        style={{ fontFamily: 'RocGrotesk, sans-serif' }}
      >
        {k}
      </div>
      <div
        className="mt-1 text-xl text-[#14140e]"
        style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic' }}
      >
        {v}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-16 text-center">
      <h2 className="text-2xl font-semibold text-neutral-900">Em breve.</h2>
      <p className="mx-auto mt-3 max-w-xl text-neutral-600">
        Os primeiros ebooks, cursos e mentorias da House Mazzutti Academy ficam disponíveis aqui em breve.
        Cadastre-se para receber o lançamento.
      </p>
    </div>
  )
}
