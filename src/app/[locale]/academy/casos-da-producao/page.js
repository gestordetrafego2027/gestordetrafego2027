/**
 * Landing — Briefing Mal Passado
 * House Mazzutti Academy · Vol. 03 · 2026
 * 25 capítulos · 417 páginas · 3 partes
 * Duas formas de leitura: PDF R$ 54 · Impresso R$ 95
 */

import Link from 'next/link'
import Image from 'next/image'

// ============================================================
// PLACEHOLDERS — quando decidir checkout/prazo/frete, troca aqui
// ============================================================
const CHECKOUT_DIGITAL_URL  = '/pt/checkout/casos-da-producao'
const CHECKOUT_IMPRESSO_URL = '/pt/checkout/briefing-mal-passado-impresso'
const PRAZO_IMPRESSO_DIAS   = '10' // dias úteis até despacho
const REGRA_FRETE           = 'Frete calculado no checkout pelos Correios para todo o Brasil.'
const SITE_URL              = 'https://housemazzutti.com'
const CANONICAL_URL         = `${SITE_URL}/pt/academy/casos-da-producao/`
const OG_IMAGE              = `${SITE_URL}/og/briefing-mal-passado.webp`

// ============================================================
// METADATA — Next.js App Router
// ============================================================
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Briefing Mal Passado · House Mazzutti Academy',
  description:
    'O livro que nomeia o monstro silencioso da publicidade brasileira. 25 capítulos de leitura aplicada por Ângelo Mazzutti. Versão digital R$ 54 · Impressa R$ 95.',
  keywords: [
    'briefing publicidade',
    'briefing mal passado',
    'direção criativa',
    'produção executiva',
    'House Mazzutti Academy',
    'Ângelo Mazzutti',
    'livro publicidade brasileira',
    'ebook direção criativa',
    'método de briefing',
    'agência boutique brasileira',
  ],
  authors: [{ name: 'Ângelo Mazzutti', url: SITE_URL }],
  creator: 'Ângelo Mazzutti',
  publisher: 'House Mazzutti',
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: 'book',
    title: 'Briefing Mal Passado · House Mazzutti Academy',
    description:
      'Bastidores do caos criativo na publicidade brasileira. 25 capítulos, 417 páginas. Versão digital R$ 54 · Impressa R$ 95.',
    url: CANONICAL_URL,
    siteName: 'House Mazzutti',
    locale: 'pt_BR',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Briefing Mal Passado — House Mazzutti Academy Vol. 03' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Briefing Mal Passado · House Mazzutti Academy',
    description: 'Briefing mal passado mata projeto. Briefing bem passado salva carreira.',
    images: [OG_IMAGE],
    creator: '@housemazzutti',
  },
}

// ============================================================
// JSON-LD — Schema.org Book + Offers (digital + impresso)
// ============================================================
const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Briefing Mal Passado',
  alternateName: 'Bastidores do caos criativo na publicidade brasileira',
  author: { '@type': 'Person', name: 'Ângelo Mazzutti', url: `${SITE_URL}/pt/angelo/` },
  publisher: { '@type': 'Organization', name: 'House Mazzutti', url: SITE_URL },
  inLanguage: 'pt-BR',
  bookFormat: ['https://schema.org/EBook', 'https://schema.org/Paperback'],
  numberOfPages: 417,
  datePublished: '2026',
  isPartOf: { '@type': 'BookSeries', name: 'House Mazzutti Academy', position: 3 },
  image: OG_IMAGE,
  offers: [
    {
      '@type': 'Offer',
      name: 'Versão Digital (PDF)',
      price: '54.00',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: CANONICAL_URL,
    },
    {
      '@type': 'Offer',
      name: 'Versão Impressa',
      price: '95.00',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: CANONICAL_URL,
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/pt/` },
    { '@type': 'ListItem', position: 2, name: 'Academy', item: `${SITE_URL}/pt/academy/` },
    { '@type': 'ListItem', position: 3, name: 'Briefing Mal Passado', item: CANONICAL_URL },
  ],
}

// ============================================================
// CONTEÚDO ESTRUTURADO
// ============================================================
const SINAIS = [
  { n: '01', titulo: 'Prazo de ontem',                       texto: '“Pra ontem” é confissão de planejamento ausente. Não é urgência — é caos disfarçado de prioridade.' },
  { n: '02', titulo: 'Objetivo vago',                        texto: '“Aumentar vendas”, “engajar mais”, “posicionar a marca”. Tudo isso é desejo, não objetivo. Briefing sem número é briefing sem direção.' },
  { n: '03', titulo: 'Referência sem racional',              texto: 'Cliente manda quatro campanhas que curtiu. Sem dizer o que curtiu, nem por quê. Referência sem racional é gosto pessoal vestido de briefing.' },
  { n: '04', titulo: 'Escopo elástico',                      texto: '“Mais ou menos isso, depois a gente alinha.” Escopo elástico é como uma blusa que vai apertando até estrangular o projeto.' },
  { n: '05', titulo: 'Múltiplos decisores invisíveis',       texto: 'Cada camada de aprovação que você não conhece é um voto de veto que vai aparecer na última semana.' },
  { n: '06', titulo: 'Ausência de restrição legal',          texto: 'A campanha é regulada — CONAR, ANVISA, BACEN — e ninguém mencionou. Restrição legal omitida no briefing reaparece em ofício de retirada.' },
  { n: '07', titulo: 'Sem orçamento declarado',              texto: '“Manda a proposta que a gente vê.” Briefing sem orçamento é convite a perder tempo dos dois lados.' },
]

const PERGUNTAS = [
  'Qual é o problema do negócio que essa campanha precisa resolver?',
  'Quem é a pessoa que vai ver isso — e o que ela está fazendo quando vê?',
  'O que conta como sucesso, em número?',
  'Quais são as três restrições inegociáveis?',
  'Quem aprova — em que ordem?',
  'O que NÃO entra nessa campanha?',
  'Se essa campanha sair perfeita, o que muda no negócio do cliente em 90 dias?',
]

// ============================================================
// COMPONENTE
// ============================================================
export default function CasosDaProducaoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ===== Estilos locais — identidade visual da capa do livro ===== */}
      <style dangerouslySetInnerHTML={{ __html: `
        .bmp-root { --paper: #fafaf7; --ink: #0b0b0a; --blood: #8b1f1f; --mute: #6a6a6a; --rule: #e6e4dc; background: var(--paper); color: var(--ink); }
        .bmp-display { font-family: 'RocGrotesk', sans-serif; font-weight: 700; letter-spacing: -0.045em; line-height: 0.86; text-transform: uppercase; }
        .bmp-display em { font-style: normal; color: var(--blood); }
        .bmp-h2 { font-family: 'RocGrotesk', sans-serif; font-weight: 700; letter-spacing: -0.03em; line-height: 0.92; text-transform: uppercase; }
        .bmp-h2 em { font-style: normal; color: var(--blood); }
        .bmp-h3 { font-family: 'RocGrotesk', sans-serif; font-weight: 700; letter-spacing: -0.015em; line-height: 1.0; text-transform: uppercase; }
        .bmp-num { font-family: 'RocGrotesk', sans-serif; font-weight: 700; color: var(--blood); letter-spacing: -0.02em; line-height: 1; }
        .bmp-quote { font-family: 'RocGrotesk', sans-serif; font-weight: 700; letter-spacing: -0.025em; line-height: 0.95; text-transform: uppercase; }
        .bmp-quote em { font-style: normal; color: var(--blood); }
        .bmp-tag { font-family: 'RocGrotesk', sans-serif; font-weight: 500; letter-spacing: 0.34em; text-transform: uppercase; font-size: 11px; color: var(--mute); }
        .bmp-cta { font-family: 'RocGrotesk', sans-serif; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; }
        .bmp-blood-strip { background: var(--blood); height: 4px; }
        .bmp-blood-dot { width: 10px; height: 10px; background: var(--blood); display: inline-block; }
        .bmp-hero-headline { font-size: clamp(72px, 13vw, 220px); }
        .bmp-section-headline { font-size: clamp(48px, 8vw, 128px); }
        .bmp-spectrum { background: linear-gradient(180deg, var(--paper) 0%, #f2efe6 100%); }
      `}} />

      <main className="bmp-root">

        {/* ===================== HERO ===================== */}
        <section className="px-6 py-16 md:py-24 max-w-[1440px] mx-auto">
          {/* Topo: identificação editorial */}
          <div className="flex items-baseline justify-between mb-10 md:mb-16">
            <p className="bmp-tag flex items-center gap-3">
              <span className="bmp-blood-dot" /> House Mazzutti Academy · Vol. 03
            </p>
            <p className="bmp-tag hidden md:block">2026 · 417 págs · 25 capítulos</p>
          </div>

          {/* Grid: título + capa */}
          <div className="grid md:grid-cols-[1.35fr_1fr] gap-10 md:gap-16 items-center">
            <div>
              <h1 className="bmp-display bmp-hero-headline">
                Briefing<br /><em>Mal Passado.</em>
              </h1>

              <div className="bmp-blood-strip w-24 mt-8 md:mt-12" />

              <p className="font-headline text-lg md:text-2xl text-neutral-800 mt-8 max-w-xl leading-snug">
                Bastidores do caos criativo na publicidade brasileira.
              </p>
            </div>

            {/* Capa do livro */}
            <div className="relative aspect-[3/4] w-full max-w-[420px] mx-auto md:ml-auto md:mr-0">
              <Image
                src="/images/academy/casos-da-producao/cover.webp"
                alt="Capa do livro Briefing Mal Passado — Ângelo Mazzutti, House Mazzutti Academy Vol. 03"
                fill
                priority
                sizes="(max-width: 768px) 80vw, 420px"
                className="object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>

          {/* Linha de tensão */}
          <div className="mt-16 md:mt-24 max-w-3xl">
            <div className="font-body text-base md:text-lg text-neutral-800 space-y-4">
              <p>
                Existe um inimigo silencioso que atravessa a publicidade brasileira de ponta a ponta. Do estágio em agência grande à direção de operação boutique. Do freelancer recém-formado ao publicitário com vinte anos de estrada.
              </p>
              <p className="text-xl md:text-2xl font-headline" style={{fontWeight:700, letterSpacing:'-0.01em'}}>
                Ele tem um nome curto e desconfortável.
              </p>
            </div>
          </div>

          {/* Pull quote ÂNCORA — peso máximo */}
          <blockquote className="bmp-quote mt-16 md:mt-20 max-w-5xl border-l-[6px] border-[var(--blood)] pl-6 md:pl-10 py-2" style={{fontSize:'clamp(34px,5.4vw,76px)'}}>
            Briefing mal passado <em>mata projeto.</em><br />
            Briefing bem passado <em>salva carreira.</em>
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-3 mt-12 md:mt-16">
            <a
              href="#formatos"
              className="bmp-cta inline-block bg-[var(--ink)] text-[var(--paper)] text-sm px-10 py-5 hover:bg-[var(--blood)] transition-colors"
            >
              Quero o livro →
            </a>
            <a
              href="#monstro"
              className="bmp-cta inline-block text-sm px-10 py-5 border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
            >
              Ler o que tem dentro
            </a>
          </div>
        </section>

        {/* ===================== O MONSTRO ===================== */}
        <section id="monstro" className="px-6 py-24 md:py-32 bmp-spectrum border-t border-[var(--rule)]">
          <div className="max-w-4xl mx-auto">
            <p className="bmp-tag mb-6">— 01 · O monstro</p>
            <h2 className="bmp-h2 bmp-section-headline mb-12">
              O monstro<br /><em>de todo mundo.</em>
            </h2>

            <div className="font-body text-lg space-y-6 text-neutral-800">
              <p>Todo profissional do ofício conhece esse monstro.</p>
              <p>
                Ele chega no e-mail das nove da manhã com prazo pra ontem. Vem com objetivo na primeira linha — <em>aumentar vendas</em> — e zero contexto na segunda. Pede “um Wes Anderson com vibe de Cannes e orçamento de TikTok”. Esquece de mencionar que o cliente final é regulado pela ANVISA — e isso aparece no dia da entrega.
              </p>
              <p>
                Todo cliente, em algum momento, foi cúmplice dele. Às vezes sem perceber. Às vezes com pressa. Raramente com má-fé.
              </p>
              <p>
                E todo projeto que desabou na última semana de produção desabou, em maior ou menor grau, porque alguém em algum momento passou o briefing mal.
              </p>
            </div>

            <blockquote className="bmp-quote my-12 max-w-3xl border-l-[6px] border-[var(--blood)] pl-6 md:pl-8 py-2" style={{fontSize:'clamp(26px,3.4vw,44px)'}}>
              Briefing mal passado não é <em>falha individual.</em><br />
              É falha <em>sistêmica.</em>
            </blockquote>

            <p className="font-headline text-xl md:text-2xl text-[var(--ink)] mt-8" style={{fontWeight:700, letterSpacing:'-0.012em', lineHeight:1.2}}>
              Este livro nomeia o monstro.<br />E ensina o que fazer com ele.
            </p>
          </div>
        </section>

        {/* ===================== 7 SINAIS ===================== */}
        <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
          <p className="bmp-tag mb-6">— 02 · Diagnóstico</p>
          <h2 className="bmp-h2 bmp-section-headline mb-6">
            Os 7 sinais do<br /><em>briefing mal passado.</em>
          </h2>
          <p className="font-headline text-lg md:text-2xl text-neutral-600 mb-16 max-w-2xl" style={{fontWeight:500}}>
            Reconheça antes que ele entre em produção.
          </p>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {SINAIS.map((s) => (
              <div key={s.n} className="border-t-2 border-[var(--ink)] pt-6 group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="bmp-num text-5xl md:text-6xl">{s.n}</span>
                  <h3 className="bmp-h3 text-2xl md:text-3xl">{s.titulo}</h3>
                </div>
                <p className="font-body text-base md:text-lg text-neutral-700 leading-relaxed">{s.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== 7 PERGUNTAS ===================== */}
        <section className="px-6 py-24 md:py-32 bg-[var(--ink)] text-[var(--paper)]">
          <div className="max-w-5xl mx-auto">
            <p className="bmp-tag mb-6" style={{color:'#a0a0a0'}}>— 03 · Antídoto</p>
            <h2 className="bmp-h2 bmp-section-headline mb-6 text-[var(--paper)]">
              E as 7 perguntas que<br /><span style={{color:'var(--blood)'}}>constroem briefing bem passado.</span>
            </h2>
            <p className="font-headline text-lg md:text-2xl text-neutral-400 mb-16 max-w-2xl" style={{fontWeight:500}}>
              Decora antes de aceitar o próximo projeto.
            </p>

            <ol className="space-y-2">
              {PERGUNTAS.map((p, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline border-t border-neutral-800 py-6 md:py-8 hover:bg-neutral-800/30 transition-colors px-2 md:px-4 -mx-2 md:-mx-4">
                  <span className="bmp-num text-4xl md:text-6xl" style={{color:'var(--blood)'}}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-headline text-xl md:text-3xl leading-snug text-[var(--paper)]" style={{fontWeight:500}}>{p}</p>
                </li>
              ))}
            </ol>

            <blockquote className="bmp-quote mt-20 max-w-4xl border-l-[6px] border-[var(--blood)] pl-6 md:pl-10 py-2" style={{fontSize:'clamp(26px,3.4vw,44px)', color:'var(--paper)'}}>
              Quem aprende a passar briefing direito economiza, ao longo da carreira, mais horas, dinheiro e relacionamentos que <em>qualquer outra habilidade técnica.</em>
            </blockquote>
          </div>
        </section>

        {/* ===================== A OBRA ===================== */}
        <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
          <p className="bmp-tag mb-6">— 04 · A obra</p>
          <h2 className="bmp-h2 bmp-section-headline mb-10">
            <em>417</em> páginas.<br />25 capítulos. 3 partes.
          </h2>

          <div className="font-body text-lg text-neutral-700 max-w-3xl mb-16 space-y-4">
            <p>
              Vinte e cinco capítulos divididos em três partes. Em cada capítulo, em algum ponto, o monstro do briefing volta — porque ele atravessa o ofício inteiro.
            </p>
            <p>
              Quatrocentas e dezessete páginas. Vinte anos de leitura aplicada à publicidade brasileira contemporânea.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="border-t-[3px] border-[var(--blood)] pt-6">
              <p className="bmp-tag mb-3" style={{color:'var(--blood)'}}>PARTE I</p>
              <h3 className="bmp-h3 text-3xl md:text-4xl mb-4">A Direção</h3>
              <p className="font-body text-base text-neutral-700 mb-4">
                A arquitetura da criação. Cultura visual. Briefing. Posicionamento. Moodboard. Storytelling. IA aplicada à ideação.
              </p>
              <p className="font-label text-sm text-neutral-500 italic">
                8 capítulos. É aqui que o briefing mal passado se forma — e onde o bem passado começa a se construir.
              </p>
            </div>

            <div className="border-t-[3px] border-[var(--blood)] pt-6">
              <p className="bmp-tag mb-3" style={{color:'var(--blood)'}}>PARTE II</p>
              <h3 className="bmp-h3 text-3xl md:text-4xl mb-4">A Produção</h3>
              <p className="font-body text-base text-neutral-700 mb-4">
                A maestria da execução. Direção de arte. Câmera. Casting. Pré-produção. Orçamento. Regulamentação. Edição. Pós. Cinco cases reais da House.
              </p>
              <p className="font-label text-sm text-neutral-500 italic">
                13 capítulos. É aqui que o briefing bem passado vira filme. E que o mal passado vira processo.
              </p>
            </div>

            <div className="border-t-[3px] border-[var(--blood)] pt-6">
              <p className="bmp-tag mb-3" style={{color:'var(--blood)'}}>PARTE III</p>
              <h3 className="bmp-h3 text-3xl md:text-4xl mb-4">O Diretor Criativo</h3>
              <p className="font-body text-base text-neutral-700 mb-4">
                O ofício e a vida. Liderança em operação enxuta. Negociação e venda. Atendimento ao cliente. Construção de carreira.
              </p>
              <p className="font-label text-sm text-neutral-500 italic">
                4 capítulos. Por que tantos profissionais passam vinte anos lutando contra o mesmo monstro — e como sair desse ciclo.
              </p>
            </div>
          </div>

          <p className="font-body text-base text-neutral-600 italic mt-16 max-w-3xl">
            Mais Prólogo, Manifesto, Posfácio, Glossário, Notas e Referências.
          </p>
        </section>

        {/* ===================== PARA QUEM É ===================== */}
        <section className="px-6 py-24 md:py-32 bmp-spectrum border-t border-[var(--rule)]">
          <div className="max-w-6xl mx-auto">
            <p className="bmp-tag mb-6">— 05 · Corte de público</p>
            <h2 className="bmp-h2 bmp-section-headline mb-16">
              Para quem este<br /><em>livro foi escrito.</em>
            </h2>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <p className="bmp-tag mb-6 flex items-center gap-3" style={{color:'var(--blood)'}}>
                  <span className="bmp-blood-dot" /> Para você
                </p>
                <ul className="font-body text-base md:text-lg space-y-4 text-neutral-800">
                  <li>→ Você dirige uma operação criativa boutique e quer profissionalizar sem virar agência grande.</li>
                  <li>→ Você trabalha em agência tradicional e está cansado do mesmo ciclo: briefing mal passado, virar a noite, entregar mesmo assim, repetir.</li>
                  <li>→ Você é freelancer e cobra menos do que deveria porque ainda não tem método pra defender preço.</li>
                  <li>→ Você é diretor de marca e quer aprender a passar briefing direito antes de chamar a próxima agência.</li>
                  <li>→ Você é estudante avançado e quer ler o ofício por dentro — não por manual americano traduzido.</li>
                </ul>
              </div>

              <div>
                <p className="bmp-tag mb-6 flex items-center gap-3">
                  <span style={{width:'10px', height:'10px', display:'inline-block', background:'#cdcdcd'}} /> Para você não
                </p>
                <ul className="font-body text-base md:text-lg space-y-4 text-neutral-600">
                  <li>→ Você quer um guia em dez passos com transformação garantida em trinta dias.</li>
                  <li>→ Você quer ouvir que o cliente é sempre o problema. Não é.</li>
                  <li>→ Você quer um manual técnico genérico de publicidade. Hegarty, Ogilvy e Sullivan já fizeram esse trabalho.</li>
                  <li>→ Você quer motivacional. Aqui há ofício — não palestra.</li>
                </ul>
              </div>
            </div>

            <p className="font-body text-lg text-neutral-900 mt-16 max-w-2xl">
              Este livro trata o leitor como adulto. Se você quer ser tratado assim, o livro é seu.
            </p>
          </div>
        </section>

        {/* ===================== AUTOR ===================== */}
        <section className="px-6 py-24 md:py-32 max-w-5xl mx-auto">
          <p className="bmp-tag mb-6">— 06 · Quem escreve</p>
          <h2 className="bmp-h2 bmp-section-headline mb-12">
            Ângelo<br /><em>Mazzutti.</em>
          </h2>

          <div className="font-body text-lg space-y-6 text-neutral-800 mb-12">
            <p>
              <strong>Ângelo Mazzutti</strong> é diretor criativo, publicitário e produtor executivo. Comanda a House Mazzutti — casa criativa boutique sediada em São Paulo, com dez anos de operação contados desde o BUZÓN, em Uberlândia, em 2016.
            </p>
            <p>
              Sua trajetória atravessa vinte anos de ofício. De aprendiz de linha de produção em fábrica de sandálias em Uberlândia, em 2005, a diretor criativo de marcas nacionais e celebridades, em 2026.
            </p>
            <p>
              No meio do caminho: telemarketing, visual merchandising na Espanha, faculdade de publicidade e marketing, BUZÓN em Uberlândia, quatro anos de assessoria de marketing e imprensa para a Câmara Municipal de Uberlândia, e a mudança para São Paulo em 2021 — quando o BUZÓN virou House Mazzutti.
            </p>
            <p>
              Em 2025, conduziu em Uberlândia a segunda edição do workshop <em>Inside Out — de dentro pra fora</em>, embrião deste livro.
            </p>
          </div>

          <blockquote className="bmp-quote border-l-[6px] border-[var(--blood)] pl-6 md:pl-10 py-2 mt-4" style={{fontSize:'clamp(24px,3.2vw,40px)'}}>
            <em>Briefing Mal Passado</em> é o primeiro livro de Ângelo. Não é fim de carreira — é <em>régua editorial</em> cravada no meio do ofício.
          </blockquote>
        </section>

        {/* ===================== FORMATOS / INVESTIMENTO ===================== */}
        <section id="formatos" className="px-6 py-24 md:py-32 bg-[var(--ink)] text-[var(--paper)]">
          <div className="max-w-5xl mx-auto">
            <p className="bmp-tag mb-6" style={{color:'#a0a0a0'}}>— 07 · Adquirir</p>
            <h2 className="bmp-h2 bmp-section-headline mb-6 text-[var(--paper)]">
              Duas formas<br /><span style={{color:'var(--blood)'}}>de ler.</span>
            </h2>
            <p className="font-headline text-lg md:text-2xl text-neutral-400 mb-16 max-w-2xl" style={{fontWeight:500}}>
              Mesma obra. Mesmo conteúdo. Você escolhe como.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* DIGITAL */}
              <div className="border border-neutral-700 p-10 transition hover:border-[var(--blood)] relative">
                <p className="bmp-tag mb-3" style={{color:'#a0a0a0'}}>VERSÃO DIGITAL</p>
                <h3 className="bmp-h3 text-4xl md:text-5xl mb-8">PDF</h3>

                <p className="bmp-display mb-8" style={{fontSize:'clamp(64px,9vw,128px)', lineHeight:0.86}}>
                  <span style={{fontSize:'0.42em', color:'var(--blood)', verticalAlign:'top', marginRight:'0.2em'}}>R$</span>54
                </p>

                <p className="font-body text-base text-neutral-300 mb-8">
                  PDF de alta resolução, otimizado para leitura em tablet, computador e leitor de ebook. Entrega imediata após confirmação do pagamento. Licenciado para uso individual.
                </p>

                <a
                  href={CHECKOUT_DIGITAL_URL}
                  className="bmp-cta inline-block w-full text-center bg-[var(--paper)] text-[var(--ink)] text-sm px-8 py-5 hover:bg-[var(--blood)] hover:text-[var(--paper)] transition-colors"
                >
                  Comprar versão digital →
                </a>
              </div>

              {/* IMPRESSO */}
              <div className="border-2 border-[var(--blood)] p-10 transition bg-neutral-900/30 relative">
                <span className="absolute top-0 right-0 bg-[var(--blood)] text-[var(--paper)] bmp-tag px-3 py-1.5" style={{color:'var(--paper)'}}>Mais procurado</span>
                <p className="bmp-tag mb-3" style={{color:'var(--blood)'}}>VERSÃO IMPRESSA</p>
                <h3 className="bmp-h3 text-4xl md:text-5xl mb-8">Livro físico</h3>

                <p className="bmp-display mb-8" style={{fontSize:'clamp(64px,9vw,128px)', lineHeight:0.86}}>
                  <span style={{fontSize:'0.42em', color:'var(--blood)', verticalAlign:'top', marginRight:'0.2em'}}>R$</span>95
                </p>

                <p className="font-body text-base text-neutral-300 mb-8">
                  Edição em capa cartonada, miolo em papel offset 90g, formato 16 × 23 cm. Produção própria da House Mazzutti. Envio em até {PRAZO_IMPRESSO_DIAS} dias úteis após confirmação do pagamento.
                </p>

                <a
                  href={CHECKOUT_IMPRESSO_URL}
                  className="bmp-cta inline-block w-full text-center bg-[var(--blood)] text-[var(--paper)] text-sm px-8 py-5 hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
                >
                  Comprar versão impressa →
                </a>
              </div>
            </div>

            <p className="font-raleway text-sm text-neutral-500 italic mt-12 text-center max-w-2xl mx-auto">
              Também disponível em breve nas principais livrarias online — Amazon, entre outras. Para venda direta com o autor, esta página.
            </p>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto">
          <p className="bmp-tag mb-6">— 08 · Antes de comprar</p>
          <h2 className="bmp-h2 bmp-section-headline mb-16">
            Antes de<br /><em>comprar.</em>
          </h2>

          <div className="space-y-10">
            <Faq q="Qual a diferença entre a versão online e a impressa?">
              O conteúdo é idêntico — 25 capítulos, 417 páginas, mesma obra. A diferença é o formato. A versão online é PDF para leitura em tela. A versão impressa é livro físico produzido pela House Mazzutti, com capa cartonada e miolo em papel offset.
            </Faq>

            <Faq q="Quanto tempo leva para receber?">
              Versão digital: imediata. O link de download chega no e-mail logo após a confirmação do pagamento. Versão impressa: até {PRAZO_IMPRESSO_DIAS} dias úteis após confirmação, com envio para todo o Brasil. {REGRA_FRETE}
            </Faq>

            <Faq q="Posso compartilhar o ebook com colegas de trabalho?">
              A licença é de uso individual. Para usos coletivos — equipe de agência, casa criativa, sala de aula — entre em contato pelo e-mail academy@housemazzutti.com para licenciamento institucional.
            </Faq>

            <Faq q="Tenho garantia de devolução?">
              Sim. Sete dias após a compra, conforme o Código de Defesa do Consumidor (Art. 49). Se o livro não for o que você esperava, devolvemos integralmente. Sem perguntas.
            </Faq>

            <Faq q="Vou conseguir aplicar o método na próxima segunda-feira?">
              Os 7 sinais e as 7 perguntas, sim. Decora as duas listas antes de aceitar o próximo projeto, e você já mudou o jogo. O resto do livro aprofunda. Não é manual de receita rápida — é régua de carreira.
            </Faq>

            <Faq q="O livro serve para quem está começando?">
              Serve. Aliás, é especialmente útil para quem está começando — porque é o livro que o autor queria ter lido aos vinte e cinco anos.
            </Faq>

            <Faq q="Vai ter outros livros da House Mazzutti Academy?">
              Este é o Vol. 03 da série. Os próximos volumes seguem em desenvolvimento.
            </Faq>
          </div>
        </section>

        {/* ===================== CTA FINAL ===================== */}
        <section className="px-6 py-24 md:py-32 bmp-spectrum border-t border-[var(--rule)]">
          <div className="max-w-4xl mx-auto">
            <p className="bmp-tag mb-6">— Última chamada</p>
            <h2 className="bmp-h2 bmp-section-headline mb-12">
              Antes de fechar<br /><em>esta página.</em>
            </h2>

            <div className="font-body text-lg space-y-6 text-neutral-800 mb-12">
              <p>
                Você abre o e-mail amanhã. Chega um briefing — <em>pra ontem, objetivo vago, referência sem racional, sem orçamento declarado, com decisor invisível por trás</em>.
              </p>
              <p>
                Você tem dois caminhos. Aceitar e descobrir o problema na pré-produção. Ou ler antes — e devolver com as sete perguntas.
              </p>
              <p>Este livro é a régua pra escolher o segundo caminho.</p>
            </div>

            <blockquote className="bmp-quote border-l-[6px] border-[var(--blood)] pl-6 md:pl-10 py-2 mb-12" style={{fontSize:'clamp(28px,4vw,56px)'}}>
              Briefing mal passado <em>mata projeto.</em><br />
              Briefing bem passado <em>salva carreira.</em>
            </blockquote>

            <a
              href="#formatos"
              className="bmp-cta inline-block bg-[var(--ink)] text-[var(--paper)] text-sm px-10 py-5 hover:bg-[var(--blood)] transition-colors"
            >
              Quero o livro →
            </a>
          </div>
        </section>

        {/* ===================== RODAPÉ LOCAL ===================== */}
        <section className="px-6 py-16 border-t border-neutral-200">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-sm">
            <p className="font-label tracking-widest text-neutral-500">
              House Mazzutti Academy · Vol. 03<br />
              © 2026 Ângelo Mazzutti · House Mazzutti
            </p>
            <ul className="font-label tracking-widest text-neutral-500 flex flex-wrap gap-6">
              <li><Link href="/pt/termo-de-uso/" className="hover:text-neutral-900">Termo de Uso</Link></li>
              <li><Link href="/pt/aviso-legal/" className="hover:text-neutral-900">Aviso Legal</Link></li>
              <li><Link href="/pt/contato/" className="hover:text-neutral-900">Contato</Link></li>
            </ul>
          </div>
        </section>

      </main>
    </>
  )
}

// ============================================================
// SUBCOMPONENTE — FAQ item
// ============================================================
function Faq({ q, children }) {
  return (
    <div className="border-t border-neutral-200 pt-6">
      <h3 className="font-headline text-xl md:text-2xl mb-3">{q}</h3>
      <p className="font-body text-base text-neutral-700 leading-relaxed">{children}</p>
    </div>
  )
}
