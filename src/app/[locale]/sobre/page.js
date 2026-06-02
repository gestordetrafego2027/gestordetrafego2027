'use client'

import Link from 'next/link'
import Header from '@/app/components/Header'

const FRENTES = [
  {label: 'AGÊNCIA', sub: 'Estratégia e posicionamento', href: '/agencia'},
  {label: 'STUDIO', sub: 'Imagem construída com intenção', href: '/studio'},
  {label: 'PRODUTORA', sub: 'Estratégia que ganha presença', href: '/produtora'},
  {label: 'COMUNIDADE', sub: 'Crescimento que se sustenta', href: '/comunidade'},
]

const METODO = [
  'Diagnóstico profundo',
  'Definição de posicionamento',
  'Arquitetura de solução',
  'Criação e produção',
  'Implementação e acompanhamento',
]

export default function SobrePage() {
  return (
    <div className="bg-white">
      <Header variant="dark" />

      <main>
        {/* HERO */}
        <section className="bg-black text-white px-12 md:px-48 pt-48 pb-32">
          <div className="max-w-4xl">
            <span className="text-caption text-white/60 mb-6 block">
              Sobre · Casa criativa em São Paulo desde 2016
            </span>
            <h1 className="text-h1 text-white mb-8 hmzt-hero-title">
              Estruturamos o seu projeto para comunicar com precisão.
            </h1>
            <p className="text-body text-white/75 mb-6 measure-editorial">
              A House Mazzutti vai além da publicidade. Somos um hub estratégico de
              construção de imagem e posicionamento, unindo estratégia, direção
              criativa e produção audiovisual para transformar marcas e pessoas em
              presenças sólidas e relevantes.
            </p>
            <p className="text-body text-white/75 mb-12 measure-editorial">
              Da identidade visual à reputação de mercado, desenvolvemos projetos que
              sustentam o seu posicionamento com clareza, sofisticação e consistência.
            </p>
            <Link
              href="/contato"
              className="inline-block px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500"
            >
              Iniciar conversa estratégica
            </Link>
          </div>
        </section>

        {/* ORIGEM */}
        <section className="bg-white text-black px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-neutral-400 mb-6 block">Origem com visão</span>
            <h2 className="text-h2 text-black mb-8">
              Imagem não é estética. É comunicação silenciosa.
            </h2>
            <p className="text-body text-neutral-600 measure-editorial">
              Em um mercado saturado por excesso de informação, percebemos que o
              problema não era a falta de produção — mas a ausência de direção. Foi a
              partir disso que estruturamos um modelo capaz de integrar pensamento,
              construção e execução em um único fluxo.
            </p>
          </div>
        </section>

        {/* O QUE SOMOS */}
        <section className="bg-neutral-100 text-black px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-neutral-400 mb-6 block">O que somos</span>
            <h2 className="text-h2 text-black mb-8">
              Uma Strategic House, não uma estrutura fragmentada.
            </h2>
            <p className="text-body text-neutral-600 measure-editorial">
              Funcionamos como um sistema que conecta todas as etapas necessárias para
              construir uma marca de forma consistente. Não vendemos serviços isolados:
              desenhamos soluções completas, baseadas no momento, na ambição e na
              realidade de cada cliente.
            </p>
          </div>
        </section>

        {/* COMO FUNCIONAMOS — frentes */}
        <section className="bg-white text-black px-12 md:px-48 py-32">
          <div className="max-w-5xl">
            <span className="text-caption text-neutral-400 mb-6 block">Como funcionamos</span>
            <h2 className="text-h2 text-black mb-16">
              Frentes complementares. Nenhuma funciona sozinha.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              {FRENTES.map((f) => (
                <Link
                  key={f.label}
                  href={f.href}
                  className="group bg-white p-10 md:p-12 hover:bg-black transition-colors duration-500"
                >
                  <h3 className="font-headline text-2xl md:text-3xl text-black group-hover:text-white tracking-tight mb-3 transition-colors duration-500">
                    {f.label}
                  </h3>
                  <span className="text-caption text-neutral-500 group-hover:text-white/70 transition-colors duration-500">
                    {f.sub}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGIA */}
        <section className="bg-black text-white px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-white/50 mb-6 block">Metodologia</span>
            <h2 className="text-h2 text-white mb-12">
              Nada começa na execução. Tudo começa no entendimento.
            </h2>
            <ol className="space-y-5">
              {METODO.map((etapa, i) => (
                <li key={etapa} className="flex items-baseline gap-6">
                  <span className="font-headline text-white/40 text-lg w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-body text-white/85">{etapa}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DIFERENCIAL */}
        <section className="bg-white text-black px-12 md:px-48 py-32">
          <div className="max-w-4xl">
            <span className="text-caption text-neutral-400 mb-6 block">Diferencial</span>
            <h2 className="text-h2 text-black mb-8">
              O que nos diferencia não é o que fazemos. É como pensamos.
            </h2>
            <p className="text-body text-neutral-600 mb-8 measure-editorial">
              Unimos sensibilidade estética, inteligência estratégica, experiência de
              mercado e execução precisa — com curadoria direta de{' '}
              <strong className="text-black">Angelo Mazzutti, Diretor Criativo</strong>,
              garantindo consistência em cada detalhe.
            </p>
          </div>
        </section>

        {/* LIDERANÇA */}
        <section className="bg-neutral-100 text-black px-12 md:px-48 py-32">
          <div className="max-w-5xl">
            <span className="text-caption text-neutral-400 mb-6 block">Liderança</span>
            <h2 className="text-h2 text-black mb-16">
              Direção e operação sob a mesma casa.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              <div className="bg-white p-10 md:p-12">
                <div className="text-h3 text-black">Angelo Mazzutti</div>
                <div className="text-caption text-neutral-500 mt-2 mb-6">Diretor Criativo</div>
                <p className="text-body text-neutral-600">
                  15+ anos de audiovisual e direção de imagem. Traduz estratégia de
                  marca em direção criativa autoral, com presença em cada decisão
                  crítica do projeto.
                </p>
              </div>
              <div className="bg-white p-10 md:p-12">
                <div className="text-h3 text-black">Mateus Sacavem</div>
                <div className="text-caption text-neutral-500 mt-2 mb-6">Produtor Executivo</div>
                <p className="text-body text-neutral-600">
                  Comanda a operação executiva da House — coordenação técnica,
                  cronogramas, produção e integração de equipes especializadas. A
                  engrenagem que sustenta cada projeto, da pré-produção ao master final.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO + CTA */}
        <section className="bg-black text-white px-12 md:px-48 py-40 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-h1 text-white hmzt-hero-title">
              Autoridade não se cria. Se constrói.
            </h2>
            <p className="text-body text-white/70 measure-editorial mx-auto">
              Se sua marca precisa de direção, não de volume — estamos prontos.
            </p>
            <Link
              href="/contato"
              className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500"
            >
              Iniciar uma conversa
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
        <div className="flex flex-col items-center text-center">
          <div className="mb-16">
            <span className="hm-logo" style={{fontSize: '40px', color: '#fafafa'}}>
              <span className="hm-house">House</span>
              <span className="hm-mazzutti">Mazzutti</span>
            </span>
          </div>
          <div className="flex space-x-10 mb-16">
            <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">Instagram</a>
            <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/">Home</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/studio">Studio</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/portfolio">Portfólio</Link>
            <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/contato">Contato</Link>
          </nav>
          <div className="text-caption text-neutral-700">
            © 2026 House Mazzutti. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
