import { notFound } from 'next/navigation'
import Link from 'next/link'
import { policies, policySlugs } from '@/lib/policies/content'
import { pageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/schemas'
import { brand } from '@/config/site'
import CookiePrefsButton from '@/components/consent/CookiePrefsButton'

export function generateStaticParams() {
  return policySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params
  const policy = policies[slug]
  if (!policy) return { title: 'Políticas — House Mazzutti' }
  return pageMetadata({
    path: `/politicas/${slug}`,
    locale,
    title: policy.metaTitle,
    description: policy.metaDescription,
  })
}

export default async function PolicyPage({ params }) {
  const { slug } = await params
  const policy = policies[slug]
  if (!policy) notFound()

  const crumbs = breadcrumbSchema([
    { name: 'House Mazzutti', url: `${brand.url}/pt/` },
    { name: 'Políticas', url: `${brand.url}/pt/politicas/` },
    { name: policy.title, url: `${brand.url}/pt/politicas/${slug}/` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header simples */}
        <header className="border-b border-zinc-100 px-8 py-6">
          <Link href="/" className="inline-block">
            <span className="hm-logo" style={{ fontSize: '24px' }}>
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </span>
          </Link>
        </header>

        <main className="max-w-3xl mx-auto px-8 py-20">
          {/* Breadcrumb visual */}
          <nav className="flex items-center gap-2 text-[11px] font-label uppercase tracking-[0.2em] text-zinc-400 mb-12">
            <Link href="/" className="hover:text-zinc-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/politicas" className="hover:text-zinc-700 transition-colors">Políticas</Link>
            <span>/</span>
            <span className="text-zinc-700">{policy.title}</span>
          </nav>

          {/* Título */}
          <h1 className="font-headline italic text-4xl md:text-5xl text-zinc-900 mb-4">
            {policy.title}
          </h1>
          <p className="text-[12px] font-label uppercase tracking-[0.2em] text-zinc-400 mb-16">
            Última atualização: {policy.updated}
          </p>

          {/* Conteúdo */}
          <div className="space-y-12">
            {policy.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-headline text-xl text-zinc-900 mb-4 pb-3 border-b border-zinc-100">
                  {section.heading}
                </h2>
                <div className="text-[15px] text-zinc-600 font-body leading-[1.9] whitespace-pre-line">
                  {section.body.split('\n').map((line, j) => {
                    // Negrito com **texto**
                    const parts = line.split(/\*\*([^*]+)\*\*/g)
                    return (
                      <p key={j} className={line.startsWith('-') ? 'ml-4' : line === '' ? 'my-3' : 'mb-2'}>
                        {parts.map((part, k) =>
                          k % 2 === 1 ? <strong key={k} className="text-zinc-800 font-medium">{part}</strong> : part
                        )}
                      </p>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Gerenciar consentimento (somente na Política de Cookies) */}
          {slug === 'cookies' && (
            <div className="mt-16 pt-10 border-t border-zinc-100">
              <p className="text-[11px] font-label uppercase tracking-[0.25em] text-zinc-400 mb-6">
                Suas preferências
              </p>
              <CookiePrefsButton />
            </div>
          )}

          {/* Links para outras políticas */}
          <div className="mt-20 pt-10 border-t border-zinc-100">
            <p className="text-[11px] font-label uppercase tracking-[0.25em] text-zinc-400 mb-6">
              Outras políticas
            </p>
            <div className="flex flex-col gap-3">
              {policySlugs
                .filter((s) => s !== slug)
                .map((s) => (
                  <Link
                    key={s}
                    href={`/politicas/${s}`}
                    className="text-[14px] font-body text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2"
                  >
                    <span className="text-zinc-300">→</span>
                    {policies[s].title}
                  </Link>
                ))}
            </div>
          </div>
        </main>

        {/* Footer mínimo */}
        <footer className="border-t border-zinc-100 px-8 py-10 text-center">
          <p className="text-[11px] text-zinc-400 font-label uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} House Mazzutti. Todos os direitos reservados.
          </p>
          <Link href="/" className="mt-3 inline-block text-[11px] text-zinc-400 hover:text-zinc-700 transition-colors">
            ← Voltar ao site
          </Link>
        </footer>
      </div>
    </>
  )
}
