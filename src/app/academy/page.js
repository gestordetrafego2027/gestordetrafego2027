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
