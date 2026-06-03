import Link from 'next/link'
import { policyList } from '@/lib/policies/content'
import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/politicas',
    locale,
    title: 'Políticas — House Mazzutti',
    description: 'Política de Privacidade, Termos de Uso, Cookies e Cancelamento da House Mazzutti.',
  })
}

export default function PoliciesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-8 py-6">
        <Link href="/">
          <span className="hm-logo" style={{ fontSize: '24px' }}>
            <span className="hm-house">House</span>
            <span className="hm-mazzutti">Mazzutti</span>
          </span>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-20">
        <h1 className="font-headline italic text-4xl text-zinc-900 mb-4">Políticas e Termos</h1>
        <p className="text-[15px] text-zinc-500 font-body leading-relaxed mb-16">
          Transparência e conformidade com a legislação brasileira — LGPD, CDC e Marco Civil da Internet.
        </p>

        <div className="space-y-0">
          {policyList.map((policy) => (
            <Link
              key={policy.slug}
              href={`/politicas/${policy.slug}`}
              className="flex items-center justify-between py-6 border-t border-zinc-100 group hover:pl-2 transition-all duration-200"
            >
              <div>
                <h2 className="font-headline italic text-xl text-zinc-900 group-hover:text-zinc-700 transition-colors mb-1">
                  {policy.title}
                </h2>
                <p className="text-[13px] text-zinc-400 font-body">
                  Atualizado em {policy.updated}
                </p>
              </div>
              <span className="text-zinc-300 group-hover:text-zinc-700 transition-colors text-xl">→</span>
            </Link>
          ))}
          <div className="border-t border-zinc-100" />
        </div>
      </main>

      <footer className="border-t border-zinc-100 px-8 py-10 text-center">
        <p className="text-[11px] text-zinc-400 font-label uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} House Mazzutti. Todos os direitos reservados.
        </p>
        <Link href="/" className="mt-3 inline-block text-[11px] text-zinc-400 hover:text-zinc-700 transition-colors">
          ← Voltar ao site
        </Link>
      </footer>
    </div>
  )
}
