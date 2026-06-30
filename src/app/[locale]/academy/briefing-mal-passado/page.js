/**
 * Landing · Briefing Mal Passado
 * House Mazzutti Academy · Vol. 03 · 2026
 * 25 capítulos · 417 páginas · 3 partes
 * Formatos: PDF R$ 54 · Impresso R$ 95 · Combo R$ 119
 *
 * Estrutura espelha /pt/academy/preco-da-relevancia (Vol.02) com adaptações:
 *  - Pricing em 3 cards (digital / combo destacado / impresso) — não 1 só
 *  - Seção de sample lead magnet entre depoimentos e pricing
 *  - Accent "blood" preservado, namespace .bmp-*
 */
import React from 'react'
import SiteFooterLinks from '@/app/components/SiteFooterLinks'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { SampleLeadForm } from '@/components/academy/SampleLeadForm'

const SITE_URL = 'https://housemazzutti.com'
const COVER = '/images/academy/briefing-mal-passado/cover.webp'
const COVER_ABSOLUTE = `${SITE_URL}${COVER}`
const CHECKOUT_DIGITAL_URL  = '/checkout/briefing-mal-passado'
const CHECKOUT_IMPRESSO_URL = '/checkout/briefing-mal-passado-impresso'
const CHECKOUT_COMBO_URL    = '/checkout/briefing-mal-passado-combo'
const PRAZO_IMPRESSO_DIAS   = '10'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Briefing Mal Passado · Vol. 03 · House Mazzutti Academy',
  description:
    'O livro que nomeia o monstro silencioso da publicidade brasileira. 25 capítulos de leitura aplicada sobre os 7 sinais do briefing mal passado e as 7 perguntas que filtram um bom cliente. PDF R$ 54 · Impresso R$ 95 · Combo R$ 119.',
  keywords: [
    'briefing mal passado',
    'briefing publicidade',
    'gestão criativa',
    'agência de publicidade',
    'house mazzutti',
    'ângelo mazzutti',
    'house mazzutti academy',
  ],
  authors: [{ name: 'Ângelo Mazzutti', url: SITE_URL }],
  creator: 'Ângelo Mazzutti',
  publisher: 'House Mazzutti Edições',
  alternates: { canonical: `${SITE_URL}/pt/academy/briefing-mal-passado` },
  openGraph: {
    type: 'book',
    locale: 'pt_BR',
    url: `${SITE_URL}/pt/academy/briefing-mal-passado`,
    siteName: 'House Mazzutti Academy',
    title: 'Briefing Mal Passado · Vol. 03',
    description:
      'O monstro silencioso da publicidade brasileira em 25 capítulos. 7 sinais, 7 perguntas e o vocabulário que faltava pra filtrar trabalho ruim antes dele entrar pelo cronograma.',
    images: [{ url: COVER_ABSOLUTE, width: 1200, height: 630, alt: 'Briefing Mal Passado — House Mazzutti Academy Vol. 03' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Briefing Mal Passado · Vol. 03',
    description: 'Briefing mal passado mata projeto. Briefing bem passado salva carreira.',
    images: [COVER_ABSOLUTE],
  },
}

/* ─── Dados do sumário ──────────────────────────────────────────── */
const PARTS = [
  {
    num: 'I.',
    name: 'O monstro silencioso',
    tag: 'Caps 01 — 08',
    chapters: [
      { n: '01', tag: 'Parte I · Diagnóstico', title: 'O que é um briefing mal passado',                sub: 'Definição operacional',  pg: '21' },
      { n: '02', tag: 'Parte I · Diagnóstico', title: 'Por que ninguém chama pelo nome',                sub: 'A política do silêncio', pg: '37' },
      { n: '03', tag: 'Parte I · Diagnóstico', title: 'Quem perde — e quanto custa',                    sub: 'Cliente, agência, criação', pg: '53' },
      { n: '04', tag: 'Parte I · Diagnóstico', title: 'A fila de comando e o telefone sem fio',         sub: 'Cliente → conta → criação', pg: '69' },
      { n: '05', tag: 'Parte I · Diagnóstico', title: 'O briefing herdado de reunião sem você',         sub: 'O segundo grau de erro', pg: '85' },
      { n: '06', tag: 'Parte I · Diagnóstico', title: 'O briefing escrito pra impressionar o chefe',    sub: 'Quando o pedido vira PR interno', pg: '99' },
      { n: '07', tag: 'Parte I · Diagnóstico', title: 'O briefing que esconde o que ninguém aprova',    sub: 'O elefante na sala', pg: '113' },
      { n: '08', tag: 'Parte I · Diagnóstico', title: 'Como o monstro se forma e por onde se alimenta', sub: 'Antropologia da pauta', pg: '127' },
    ],
  },
  {
    num: 'II.',
    name: 'Os 7 sinais',
    tag: 'Caps 09 — 15',
    chapters: [
      { n: '09', tag: 'Parte II · Sinais', title: '1. Verbos vagos que parecem ação',         sub: '"alavancar", "potencializar"', pg: '143' },
      { n: '10', tag: 'Parte II · Sinais', title: '2. Objetivo virou lista de desejos',       sub: 'Quando tudo é prioridade', pg: '159' },
      { n: '11', tag: 'Parte II · Sinais', title: '3. Público-alvo igual a censo do IBGE',    sub: 'Persona sem cara, sem dor', pg: '173' },
      { n: '12', tag: 'Parte II · Sinais', title: '4. Referência sem critério de leitura',    sub: '"igual a este, mas diferente"', pg: '189' },
      { n: '13', tag: 'Parte II · Sinais', title: '5. KPI que ninguém vai medir',             sub: 'Métrica de vitrine', pg: '203' },
      { n: '14', tag: 'Parte II · Sinais', title: '6. Prazo que desconta o tempo do erro',    sub: 'Cronograma sem buffer', pg: '219' },
      { n: '15', tag: 'Parte II · Sinais', title: '7. Verba que não cabe no escopo escrito',  sub: 'Quando o número conta a verdade', pg: '233' },
    ],
  },
  {
    num: 'III.',
    name: 'As 7 perguntas',
    tag: 'Caps 16 — 22',
    chapters: [
      { n: '16', tag: 'Parte III · Antídoto', title: '1. Qual é a decisão de negócio por trás dessa pauta', sub: 'Por que agora, por que assim', pg: '249' },
      { n: '17', tag: 'Parte III · Antídoto', title: '2. O que essa peça precisa fazer acontecer',          sub: 'Função, não forma', pg: '263' },
      { n: '18', tag: 'Parte III · Antídoto', title: '3. Quem é a pessoa que vai consumir isso',            sub: 'Persona com dia, hora, dor', pg: '277' },
      { n: '19', tag: 'Parte III · Antídoto', title: '4. Como vocês saberão que deu certo',                 sub: 'Métrica vinculada à decisão', pg: '291' },
      { n: '20', tag: 'Parte III · Antídoto', title: '5. O que está fora de escopo — e por quê',            sub: 'O que o cliente já desistiu', pg: '305' },
      { n: '21', tag: 'Parte III · Antídoto', title: '6. Quem aprova — e quem só comenta',                  sub: 'Fluxo de aprovação documentado', pg: '319' },
      { n: '22', tag: 'Parte III · Antídoto', title: '7. O que aconteceria se não fizéssemos nada',         sub: 'Custo da inação', pg: '333' },
    ],
    extra: { tag: 'Aplicação', title: 'Caps 23 — 25 · O briefing bem passado em uso real', sub: 'Aceitar, recusar, reescrever', pg: '349' },
  },
]

const AUDIENCE = [
  { n: '01', ttl: 'Redator/redatora pleno cansado do ciclo: briefing errado, virar a noite, entregar mesmo assim, repetir.',
    d: 'O livro nomeia o que você sente há anos e nunca teve vocabulário pra descrever. Te dá os 7 sinais pra diagnosticar antes da reunião, não depois da terceira rodada de aprovação.' },
  { n: '02', ttl: 'Diretor/diretora de criação que quer profissionalizar a leitura de briefing do time.',
    d: 'Parte II vira checklist da reunião de partida. Parte III vira ritual de aceite. Você para de absorver caos como mérito e começa a devolver briefing antes de gastar 40 horas de equipe.' },
  { n: '03', ttl: 'Planner/strategist que precisa diagnosticar briefing antes do escopo virar contrato.',
    d: 'Ganha o método de leitura crítica que faltava entre a reunião com cliente e a entrega do contracted brief. As 7 perguntas viram framework de calibração — vocabulário comum com criação.' },
  { n: '04', ttl: 'Account/atendimento que faz interface cliente → agência todo dia e absorve a fricção.',
    d: 'O livro te dá legitimidade pra devolver briefing ao cliente sem parecer arrogante. Reescreve o roteiro da reunião de alinhamento. Te tira do lugar de tradutor improvisado.' },
  { n: '05', ttl: 'Cliente que contrata agência e quer aprender a passar briefing que economiza rodada.',
    d: 'É o livro que sua agência queria te indicar e não tem coragem. Mostra exatamente como o briefing chega no outro lado — e o que muda quando ele chega bem passado. Economia direta no cronograma.' },
  { n: '06', ttl: 'Líder de marketing in-house que pede projeto pra agência ou pro time interno.',
    d: 'Você para de receber peça que não casa com a expectativa e descobre que o problema nunca foi a entrega. Era o pedido. O livro te dá a régua pra calibrar pedido antes de virar deadline.' },
]

const TESTIMONIALS = [
  { q: '"Esse livro deveria vir junto com o crachá no primeiro dia de agência. Cortei reunião improdutiva em 40% só usando as 7 perguntas no aceite de briefing."',
    av: 'M', nm: 'Mariana, 31', role: 'Diretora de criação · agência independente' },
  { q: '"Sou planner há 12 anos e nunca vi alguém escrever sobre briefing com essa honestidade. O capítulo 7 sozinho já valeu o livro — me poupou de aceitar dois projetos podres no último trimestre."',
    av: 'R', nm: 'Rafael, 38', role: 'Head de planejamento · mid-market' },
  { q: '"Sou cliente do lado anunciante. Comprei pra entender o que minha agência reclama em silêncio. Reescrevi nosso template interno de briefing no dia seguinte. A próxima campanha entrou em produção 3 semanas antes."',
    av: 'J', nm: 'Júlia, 42', role: 'Gerente de marca · varejo nacional' },
]

const FAQS = [
  { n: '01', q: 'Esse livro serve pra quem está começando agora na publicidade?',
    a: 'Serve, e talvez seja onde mais economiza tempo. Quem entra agora ganha vocabulário pra nomear o que está sentindo desde o estágio — e evita normalizar o caos como se fosse parte do ofício. A Parte I (Diagnóstico) é especialmente útil pra esse leitor.' },
  { n: '02', q: 'Eu já tenho 10+ anos de mercado. Vou aprender algo novo?',
    a: 'Provavelmente é onde o livro mais entrega. Parte III (As 7 Perguntas) e os capítulos 23–25 (Aplicação) formalizam um método de leitura crítica que veterano usa por intuição mas raramente documenta. Você sai com ferramenta replicável pro time, não só repertório pessoal.' },
  { n: '03', q: 'Qual a diferença entre a versão digital, impressa e o combo?',
    a: 'O conteúdo é idêntico — 25 capítulos, 417 páginas, mesma obra. Digital (R$ 54) é PDF entregue por e-mail logo após o pagamento. Impressa (R$ 95) é livro físico em capa cartonada, miolo offset 90g, formato 16×23 cm, despachada em até ' + PRAZO_IMPRESSO_DIAS + ' dias úteis. Combo (R$ 119) entrega os dois — economia de R$ 30.' },
  { n: '04', q: 'Quanto tempo leva pra receber?',
    a: 'Digital: imediata. Link de download chega no e-mail logo após a confirmação do pagamento, válido por 7 dias. Impressa e Combo: até ' + PRAZO_IMPRESSO_DIAS + ' dias úteis até o despacho, depois Correios pro Brasil inteiro. Frete calculado no checkout.' },
  { n: '05', q: 'É um livro de motivação ou auto-ajuda criativa?',
    a: 'Nem um, nem outro. É um manual operacional sobre como reconhecer briefing ruim antes de aceitar, devolver com vocabulário e reescrever com método. Sem discurso sobre paixão, propósito ou "abraçar o caos criativo". O foco é o ofício, não o sentimento.' },
  { n: '06', q: 'E se eu comprar, ler e não gostar?',
    a: '7 dias de garantia incondicional. Você escreve pra academy@housemazzutti.com dizendo apenas que não foi pra você, e devolvemos o valor integral. Sem formulário, sem ligação, sem justificativa.' },
]

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function BriefingMalPassadoPage() {
  /* JSON-LD */
  const offers = [
    { '@type': 'Offer', priceCurrency: 'BRL', price: '54.00', availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${CHECKOUT_DIGITAL_URL}`, itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'House Mazzutti Edições' },
      itemOffered: { '@type': 'Book', name: 'Briefing Mal Passado · PDF', bookFormat: 'https://schema.org/EBook' } },
    { '@type': 'Offer', priceCurrency: 'BRL', price: '95.00', availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${CHECKOUT_IMPRESSO_URL}`, itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'House Mazzutti Edições' },
      itemOffered: { '@type': 'Book', name: 'Briefing Mal Passado · Impresso', bookFormat: 'https://schema.org/Paperback' } },
    { '@type': 'Offer', priceCurrency: 'BRL', price: '119.00', availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${CHECKOUT_COMBO_URL}`, itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'House Mazzutti Edições' },
      itemOffered: { '@type': 'Book', name: 'Briefing Mal Passado · Combo (PDF + Impresso)' } },
  ]
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'Briefing Mal Passado',
    alternateName: 'Briefing Mal Passado · Vol. 03',
    author: { '@type': 'Person', name: 'Ângelo Mazzutti' },
    publisher: { '@type': 'Organization', name: 'House Mazzutti Edições' },
    inLanguage: 'pt-BR',
    numberOfPages: 417,
    bookFormat: 'https://schema.org/EBook',
    image: COVER_ABSOLUTE,
    url: `${SITE_URL}/pt/academy/briefing-mal-passado`,
    description: 'O livro que nomeia o monstro silencioso da publicidade brasileira. 25 capítulos sobre os 7 sinais do briefing mal passado e as 7 perguntas que filtram um bom cliente.',
    offers,
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'House Mazzutti', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Academy', item: `${SITE_URL}/pt/academy/` },
      { '@type': 'ListItem', position: 3, name: 'Briefing Mal Passado', item: `${SITE_URL}/pt/academy/briefing-mal-passado/` },
    ],
  }
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  const css = `
    .bmp-root {
      --paper: #f7f4eb;
      --paper-warm: #efeadd;
      --paper-edge: #e6e0d0;
      --ink: #0b0b0a;
      --ink-soft: #1a1814;
      --ink-mute: #6a655c;
      --ink-light: #a39d92;
      --rule-soft: #ddd8ca;
      --blood: #8b1f1f;
      --blood-deep: #6e1313;
      --blood-bright: #c92a2a;
      --signal: #d9b35b;
      --display: "Anton", "Oswald", "Impact", sans-serif;
      --serif: "Source Serif 4", "Source Serif Pro", Georgia, serif;
      --sans: "Rock Grotesque", "Inter", Arial, sans-serif;
      --mono: "JetBrains Mono", "IBM Plex Mono", "Courier New", monospace;
      background: var(--paper);
      color: var(--ink);
      font-family: var(--serif);
      font-size: 17px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .bmp-root *, .bmp-root *::before, .bmp-root *::after { box-sizing: border-box; }
    .bmp-root a { color: inherit; }
    .bmp-root img { display: block; max-width: 100%; }
    .bmp-root .wrap { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
    .bmp-root .wrap-narrow { max-width: 880px; margin: 0 auto; padding: 0 32px; }
    .bmp-root .eyebrow { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); }

    /* Ticker */
    .bmp-root .ticker { background: var(--ink); color: var(--paper); overflow: hidden; }
    .bmp-root .ticker-track { display: flex; gap: 56px; white-space: nowrap; padding: 12px 0; font-family: var(--mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; animation: bmp-marquee 42s linear infinite; width: max-content; }
    .bmp-root .ticker-track span { opacity: 0.78; }
    .bmp-root .ticker-track .star { color: var(--blood-bright); opacity: 1; }
    @keyframes bmp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* Masthead */
    .bmp-root .masthead { background: var(--paper); border-bottom: 1px solid var(--ink); padding: 22px 0 18px; }
    .bmp-root .masthead-inner { max-width: 1440px; margin: 0 auto; padding: 0 48px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; }
    .bmp-root .masthead-brand { text-decoration: none; color: var(--ink); display: inline-block; line-height: 1; }
    .bmp-root .hm-tag { font-family: var(--mono); font-weight: 500; font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; }
    .bmp-root .masthead-center { display: flex; align-items: center; gap: 18px; justify-self: center; }
    .bmp-root .hm-divider { width: 1px; height: 14px; background: var(--ink); opacity: 0.4; }
    .bmp-root .masthead-right { justify-self: end; color: var(--ink-mute); }

    /* Nav */
    .bmp-root .nav { position: sticky; top: 0; z-index: 50; background: rgba(247,244,235,0.94); border-bottom: 1px solid var(--rule-soft); backdrop-filter: blur(8px); }
    .bmp-root .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 48px; max-width: 1440px; margin: 0 auto; }
    .bmp-root .nav-brand { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); display: flex; align-items: center; gap: 14px; text-decoration: none; }
    .bmp-root .nav-brand .pip { width: 7px; height: 7px; background: var(--blood); display: inline-block; }
    .bmp-root .nav-links { display: flex; align-items: center; gap: 30px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .bmp-root .nav-links a { color: inherit; text-decoration: none; transition: color .2s; }
    .bmp-root .nav-links a:hover { color: var(--blood); }
    .bmp-root .nav-cta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--paper); background: var(--blood); padding: 10px 18px; text-decoration: none; transition: background .2s; font-weight: 500; }
    .bmp-root .nav-cta:hover { background: var(--ink); }

    /* Hero */
    .bmp-root .hero { background: var(--blood-deep); background-image: radial-gradient(ellipse at top right, rgba(201,42,42,0.5), transparent 50%), radial-gradient(ellipse at bottom left, rgba(0,0,0,0.4), transparent 70%); color: var(--paper); position: relative; overflow: hidden; }
    .bmp-root .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: stretch; min-height: 92vh; padding: 64px 56px 80px; max-width: 1440px; margin: 0 auto; }
    .bmp-root .hero-left { display: flex; flex-direction: column; justify-content: space-between; gap: 40px; }
    .bmp-root .hero-tag { display: flex; align-items: center; gap: 14px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); }
    .bmp-root .hero-tag .dot { width: 8px; height: 8px; background: var(--blood-bright); display: inline-block; }
    .bmp-root .hero-tag .ms { flex: 1; height: 1px; background: var(--paper); opacity: 0.4; max-width: 200px; }
    .bmp-root .hero-headline { font-family: var(--display); font-weight: 400; font-size: clamp(64px, 10vw, 168px); line-height: 0.86; letter-spacing: -0.018em; margin: 28px 0 0; color: var(--paper); text-transform: uppercase; }
    .bmp-root .hero-headline em { font-style: normal; color: var(--paper); opacity: 0.65; font-family: var(--serif); font-weight: 400; font-size: 0.58em; vertical-align: middle; padding: 0 0.05em; }
    .bmp-root .hero-sub { font-family: var(--serif); font-style: italic; font-size: clamp(20px, 1.9vw, 30px); line-height: 1.28; color: var(--paper); max-width: 560px; margin: 40px 0 0; opacity: 0.92; border-left: 2px solid var(--blood-bright); padding-left: 18px; }
    .bmp-root .hero-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 36px; padding-top: 22px; border-top: 1px solid rgba(247,244,235,0.3); }
    .bmp-root .hero-meta .cell .k { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); opacity: 0.6; display: block; margin-bottom: 6px; }
    .bmp-root .hero-meta .cell .v { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.1; color: var(--paper); }
    .bmp-root .hero-right { position: relative; display: flex; align-items: center; justify-content: center; }
    .bmp-root .cover-stack { position: relative; width: 100%; max-width: 460px; aspect-ratio: 1 / 1.5; transform: rotate(-2.2deg); filter: drop-shadow(0 35px 70px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.4)); transition: transform .6s cubic-bezier(.2,.7,.3,1); }
    .bmp-root .cover-stack:hover { transform: rotate(-1deg) translateY(-6px); }
    .bmp-root .grid-marks { position: absolute; top: 30px; left: 56px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em; color: rgba(247,244,235,0.32); line-height: 1.7; }
    .bmp-root .grid-marks-r { position: absolute; bottom: 80px; right: 56px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em; color: rgba(247,244,235,0.32); line-height: 1.7; text-align: right; }
    .bmp-root .hero-foot { border-top: 1px solid rgba(247,244,235,0.18); padding: 18px 56px; display: flex; justify-content: space-between; align-items: center; font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); background: var(--ink); max-width: 1440px; margin: 0 auto; }
    .bmp-root .hero-foot .star { color: var(--blood-bright); }

    /* Pullband */
    .bmp-root .pullband { background: var(--ink); color: var(--paper); padding: 130px 0 120px; text-align: center; position: relative; overflow: hidden; }
    .bmp-root .pullband::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 800px; background: radial-gradient(circle, rgba(139,31,31,0.4), transparent 70%); pointer-events: none; }
    .bmp-root .pullband .wrap { position: relative; }
    .bmp-root .pullband .quote { font-family: var(--display); font-weight: 400; font-size: clamp(48px, 6.4vw, 110px); line-height: 0.94; letter-spacing: -0.012em; text-transform: uppercase; color: var(--paper); margin: 0 auto; max-width: 1180px; }
    .bmp-root .pullband .quote .em { color: var(--blood-bright); display: block; }
    .bmp-root .pullband .attr { margin-top: 48px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); opacity: 0.6; }
    .bmp-root .pullband .strip { width: 80px; height: 3px; background: var(--blood-bright); margin: 30px auto 0; }

    /* Promessa */
    .bmp-root .promise { background: var(--paper); padding: 110px 0 130px; border-bottom: 1px solid var(--rule-soft); }
    .bmp-root .promise-head { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; margin-bottom: 64px; align-items: end; }
    .bmp-root .promise-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 6vw, 96px); line-height: 0.92; letter-spacing: -0.018em; color: var(--ink); margin: 0; }
    .bmp-root .promise-head h2 em { font-style: normal; color: var(--blood); display: block; }
    .bmp-root .promise-head .lede { font-family: var(--serif); font-size: 19px; line-height: 1.6; color: var(--ink-soft); border-left: 2px solid var(--blood); padding-left: 18px; }
    .bmp-root .promise-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); }
    .bmp-root .promise-cols .col { padding: 42px 40px 50px; }
    .bmp-root .promise-cols .col.is { background: var(--ink); color: var(--paper); }
    .bmp-root .promise-cols .col.isnot { background: var(--paper); color: var(--ink); border-right: 1px solid var(--ink); }
    .bmp-root .promise-cols .col h3 { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; margin: 0 0 28px; display: flex; align-items: center; gap: 12px; }
    .bmp-root .promise-cols .col.is h3 { color: var(--blood-bright); }
    .bmp-root .promise-cols .col.isnot h3 { color: var(--blood); }
    .bmp-root .promise-cols .col h3::before { content: ""; width: 24px; height: 2px; background: currentColor; }
    .bmp-root .promise-cols ul { list-style: none; padding: 0; margin: 0; }
    .bmp-root .promise-cols ul li { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.32; padding: 18px 0 18px 36px; position: relative; border-bottom: 1px solid; }
    .bmp-root .promise-cols .col.is ul li { border-color: rgba(247,244,235,0.16); }
    .bmp-root .promise-cols .col.isnot ul li { border-color: var(--rule-soft); }
    .bmp-root .promise-cols ul li:last-child { border-bottom: 0; }
    .bmp-root .promise-cols .col.is ul li::before { content: "+"; position: absolute; left: 0; top: 16px; font-family: var(--mono); font-style: normal; font-weight: 600; font-size: 16px; color: var(--blood-bright); }
    .bmp-root .promise-cols .col.isnot ul li::before { content: "×"; position: absolute; left: 0; top: 14px; font-family: var(--mono); font-style: normal; font-weight: 600; font-size: 20px; color: var(--blood); }

    /* Sumário */
    .bmp-root .toc-sec { background: var(--paper-warm); padding: 120px 0 130px; }
    .bmp-root .toc-sec .head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .bmp-root .toc-sec .head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(72px, 10vw, 168px); line-height: 0.88; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .bmp-root .toc-sec .head h2 em { font-style: normal; color: var(--blood); }
    .bmp-root .toc-sec .head .desc { font-family: var(--serif); font-style: italic; font-size: 20px; line-height: 1.45; color: var(--ink-soft); }
    .bmp-root .toc-part { display: grid; grid-template-columns: auto 1fr auto; gap: 28px; align-items: baseline; margin: 56px 0 24px; padding-top: 32px; border-top: 1.5px solid var(--ink); }
    .bmp-root .toc-part .pt-num { font-family: var(--display); font-weight: 400; font-size: 56px; line-height: 0.9; color: var(--blood); letter-spacing: -0.02em; }
    .bmp-root .toc-part .pt-name { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 32px; line-height: 1; color: var(--ink); letter-spacing: -0.01em; }
    .bmp-root .toc-part .pt-tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-mute); }
    .bmp-root .toc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
    .bmp-root .toc-card { padding: 28px 24px 32px; border-top: 1px solid var(--rule-soft); border-right: 1px solid var(--rule-soft); background: transparent; transition: background .25s; display: flex; flex-direction: column; gap: 12px; min-height: 220px; }
    .bmp-root .toc-card:hover { background: var(--paper); }
    .bmp-root .toc-card:nth-child(3n) { border-right: 0; }
    .bmp-root .toc-card .num { font-family: var(--display); font-weight: 400; font-size: 64px; line-height: 0.85; color: var(--ink); letter-spacing: -0.02em; }
    .bmp-root .toc-card .num .accent { color: var(--blood); }
    .bmp-root .toc-card .tag { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); }
    .bmp-root .toc-card .title { font-family: var(--serif); font-style: italic; font-weight: 500; font-size: 21px; line-height: 1.22; color: var(--ink); margin-top: auto; }
    .bmp-root .toc-card .pages { display: flex; justify-content: space-between; margin-top: 14px; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-mute); border-top: 1px solid var(--rule-soft); padding-top: 12px; }
    .bmp-root .toc-foot { margin-top: 32px; padding-top: 18px; border-top: 1.5px solid var(--ink); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .bmp-root .toc-foot strong { color: var(--ink); }

    /* Excerpt */
    .bmp-root .excerpt { background: var(--ink); color: var(--paper); padding: 130px 0; position: relative; overflow: hidden; }
    .bmp-root .excerpt-grid { display: grid; grid-template-columns: 0.85fr 1.6fr; gap: 80px; align-items: start; max-width: 1180px; margin: 0 auto; padding: 0 48px; }
    .bmp-root .excerpt .meta { position: sticky; top: 100px; }
    .bmp-root .excerpt .meta .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--blood-bright); margin-bottom: 18px; display: flex; align-items: baseline; gap: 12px; }
    .bmp-root .excerpt .meta .label::after { content: ""; flex: 1; height: 1px; background: var(--blood-bright); max-width: 80px; opacity: 0.6; }
    .bmp-root .excerpt .meta h3 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 48px; line-height: 0.96; color: var(--paper); margin: 0 0 22px; letter-spacing: -0.012em; }
    .bmp-root .excerpt .meta .from { font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--paper); opacity: 0.6; }
    .bmp-root .excerpt-body p { font-family: var(--serif); font-size: 18px; line-height: 1.65; color: var(--paper); opacity: 0.95; margin: 0 0 1.2em; }
    .bmp-root .excerpt-body p.dropcap::first-letter { font-family: var(--display); font-weight: 400; font-size: 4.4em; line-height: 0.92; float: left; padding: 0.06em 0.12em 0 0; color: var(--blood-bright); margin-right: 0.06em; }
    .bmp-root .excerpt-body .pullquote { font-family: var(--display); font-weight: 400; font-size: 38px; line-height: 1.0; text-transform: uppercase; color: var(--blood-bright); margin: 1.4em -8px; padding: 18px 22px; border-left: 4px solid var(--blood-bright); background: rgba(139,31,31,0.18); letter-spacing: -0.01em; }

    /* Audience */
    .bmp-root .audience { background: var(--paper); padding: 120px 0 130px; border-bottom: 1px solid var(--rule-soft); }
    .bmp-root .audience-head { display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px; align-items: end; margin-bottom: 56px; }
    .bmp-root .audience-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(44px, 5.4vw, 80px); line-height: 0.94; letter-spacing: -0.018em; color: var(--ink); margin: 18px 0 0; }
    .bmp-root .audience-head h2 em { font-style: normal; color: var(--blood); }
    .bmp-root .audience-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .bmp-root .audience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1.5px solid var(--ink); }
    .bmp-root .aud-card { padding: 32px 28px 36px; border-right: 1px solid var(--rule-soft); border-bottom: 1px solid var(--rule-soft); }
    .bmp-root .aud-card:nth-child(3n) { border-right: 0; }
    .bmp-root .aud-card .num { font-family: var(--display); font-weight: 400; font-size: 38px; color: var(--blood); line-height: 1; letter-spacing: -0.02em; margin-bottom: 18px; }
    .bmp-root .aud-card .ttl { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 22px; line-height: 1.05; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.005em; }
    .bmp-root .aud-card .d { font-family: var(--serif); font-size: 14.5px; line-height: 1.55; color: var(--ink-soft); }

    /* Author */
    .bmp-root .author { background: var(--paper-warm); padding: 130px 0; }
    .bmp-root .author-grid { display: grid; grid-template-columns: 0.85fr 1.4fr; gap: 64px; align-items: start; }
    .bmp-root .author-card { background: var(--ink); color: var(--paper); padding: 36px 32px 40px; position: sticky; top: 100px; }
    .bmp-root .author-card .blood-strip { height: 4px; background: var(--blood); margin-bottom: 32px; }
    .bmp-root .author-avatar-wrap { position: relative; margin: 0 0 28px; padding-left: 8px; }
    .bmp-root .author-avatar-wrap::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--blood); z-index: 0; }
    .bmp-root .author-avatar { position: relative; z-index: 1; width: 100%; aspect-ratio: 4/5; overflow: hidden; border: 1px solid rgba(247,244,235,0.22); background: var(--ink); }
    .bmp-root .author-avatar-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: grayscale(20%) contrast(1.05); display: block; }
    .bmp-root .author-card .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--blood-bright); margin-bottom: 14px; }
    .bmp-root .author-card .nm { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 56px; line-height: 0.92; color: var(--paper); margin-bottom: 18px; letter-spacing: -0.018em; }
    .bmp-root .author-card .nm em { font-style: normal; color: var(--blood-bright); display: block; }
    .bmp-root .author-card .role { font-family: var(--serif); font-style: italic; font-size: 15px; line-height: 1.45; color: var(--paper); opacity: 0.8; margin-bottom: 28px; }
    .bmp-root .author-card .meta-rows { border-top: 1px solid rgba(247,244,235,0.18); }
    .bmp-root .author-card .meta-rows .row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid rgba(247,244,235,0.18); font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; }
    .bmp-root .author-card .meta-rows .row span:first-child { color: var(--paper); opacity: 0.55; }
    .bmp-root .author-card .meta-rows .row .v { color: var(--paper); font-family: var(--serif); font-style: italic; font-size: 13px; letter-spacing: 0; text-transform: none; }
    .bmp-root .author-body h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(40px, 5.2vw, 78px); line-height: 0.94; color: var(--ink); margin: 0 0 32px; letter-spacing: -0.018em; }
    .bmp-root .author-body h2 em { font-style: normal; color: var(--blood); }
    .bmp-root .author-body p { font-family: var(--serif); font-size: 18px; line-height: 1.65; color: var(--ink-soft); margin: 0 0 1.2em; }
    .bmp-root .author-body .signature { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 28px; color: var(--blood); margin-top: 32px; letter-spacing: -0.01em; }
    .bmp-root .author-body .triangle { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 56px; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); }
    .bmp-root .author-body .triangle .cell { padding: 22px 20px; border-right: 1px solid var(--rule-soft); }
    .bmp-root .author-body .triangle .cell:last-child { border-right: 0; }
    .bmp-root .author-body .triangle .k { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); margin-bottom: 10px; }
    .bmp-root .author-body .triangle .v { font-family: var(--serif); font-style: italic; font-size: 15.5px; line-height: 1.4; color: var(--ink); }

    /* Testimonials */
    .bmp-root .testimonials { background: var(--paper); padding: 120px 0; border-top: 1px solid var(--rule-soft); }
    .bmp-root .testi-head { margin-bottom: 56px; }
    .bmp-root .testi-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(40px, 5vw, 72px); line-height: 0.94; color: var(--ink); margin: 16px 0 0; letter-spacing: -0.018em; }
    .bmp-root .testi-head h2 em { font-style: normal; color: var(--blood); }
    .bmp-root .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .bmp-root .testi { padding: 32px 28px 28px; background: var(--paper-warm); border-top: 3px solid var(--blood); }
    .bmp-root .testi .q { font-family: var(--serif); font-style: italic; font-size: 18px; line-height: 1.5; color: var(--ink); margin: 0 0 28px; }
    .bmp-root .testi .who { display: flex; align-items: center; gap: 14px; border-top: 1px solid var(--rule-soft); padding-top: 18px; }
    .bmp-root .testi .av { width: 38px; height: 38px; background: var(--ink); color: var(--paper); font-family: var(--display); font-weight: 400; font-size: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .bmp-root .testi .nm { font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink); }
    .bmp-root .testi .role { font-family: var(--serif); font-style: italic; font-size: 13px; color: var(--ink-mute); }

    /* Sample lead */
    .bmp-root .sample-sec { background: var(--paper-warm); padding: 110px 0; border-top: 1px solid var(--rule-soft); }
    .bmp-root .sample-head { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: end; margin-bottom: 40px; }
    .bmp-root .sample-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 6vw, 96px); line-height: 0.92; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .bmp-root .sample-head h2 em { font-style: normal; color: var(--blood); display: block; }
    .bmp-root .sample-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); border-left: 2px solid var(--blood); padding-left: 18px; }

    /* Pricing (3 cards) */
    .bmp-root .pricing { background: var(--ink); color: var(--paper); padding: 130px 0; position: relative; overflow: hidden; }
    .bmp-root .pricing::before { content: ""; position: absolute; top: -30%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(139,31,31,0.5), transparent 70%); pointer-events: none; }
    .bmp-root .pricing .wrap { position: relative; }
    .bmp-root .pricing-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 64px; align-items: end; }
    .bmp-root .pricing-head .eyebrow { color: var(--blood-bright); display: flex; align-items: center; gap: 14px; }
    .bmp-root .pricing-head .eyebrow::after { content: ""; flex: 1; height: 1px; background: var(--blood-bright); max-width: 200px; opacity: 0.6; }
    .bmp-root .pricing-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 6vw, 92px); line-height: 0.94; margin: 18px 0 0; letter-spacing: -0.018em; color: var(--paper); }
    .bmp-root .pricing-head h2 .em { color: var(--blood-bright); display: block; }
    .bmp-root .price-trio { display: grid; grid-template-columns: 1fr 1.1fr 1fr; gap: 16px; align-items: stretch; }
    .bmp-root .price-card { background: var(--paper); color: var(--ink); padding: 36px 28px 32px; display: flex; flex-direction: column; gap: 18px; border: 1px solid var(--paper); position: relative; }
    .bmp-root .price-card.featured { background: var(--paper); border: 2px solid var(--blood); transform: translateY(-12px); box-shadow: 0 25px 60px rgba(139,31,31,0.35); }
    .bmp-root .price-card .badge-top { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--blood); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; padding: 6px 14px; white-space: nowrap; font-weight: 600; }
    .bmp-root .price-card .ribbon { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); font-weight: 600; }
    .bmp-root .price-card h3 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 28px; line-height: 0.96; color: var(--ink); margin: 0; letter-spacing: -0.012em; }
    .bmp-root .price-card .num { font-family: var(--display); font-weight: 400; font-size: 84px; line-height: 0.86; color: var(--ink); letter-spacing: -0.025em; margin: 4px 0 0; }
    .bmp-root .price-card .num .cur { font-family: var(--mono); font-size: 16px; color: var(--blood); letter-spacing: 0; vertical-align: top; margin-right: 6px; font-weight: 500; }
    .bmp-root .price-card .strike-line { font-family: var(--mono); font-size: 11px; color: var(--ink-mute); letter-spacing: 0.04em; }
    .bmp-root .price-card .strike-line s { text-decoration: line-through; }
    .bmp-root .price-card .blurb { font-family: var(--serif); font-size: 14.5px; line-height: 1.55; color: var(--ink-soft); flex: 1; }
    .bmp-root .price-card .blurb em { color: var(--blood); font-style: normal; }
    .bmp-root .price-card .buy { display: flex; justify-content: space-between; align-items: center; background: var(--blood); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; padding: 18px 22px; text-decoration: none; transition: background .2s; }
    .bmp-root .price-card .buy:hover { background: var(--ink); }
    .bmp-root .price-card.alt .buy { background: var(--ink); color: var(--paper); }
    .bmp-root .price-card.alt .buy:hover { background: var(--blood); }
    .bmp-root .price-card .buy .arrow { font-family: var(--display); font-size: 20px; letter-spacing: 0; }
    .bmp-root .guarantee { margin-top: 56px; background: var(--paper-warm); color: var(--ink); display: grid; grid-template-columns: auto 1fr; gap: 32px; align-items: center; padding: 28px 32px; border-left: 4px solid var(--blood); }
    .bmp-root .guarantee .g-num { font-family: var(--display); font-weight: 400; font-size: 96px; line-height: 0.85; color: var(--blood); letter-spacing: -0.03em; }
    .bmp-root .guarantee .k { font-family: var(--mono); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); margin-bottom: 6px; }
    .bmp-root .guarantee .v { font-family: var(--serif); font-size: 17px; line-height: 1.55; color: var(--ink); }
    .bmp-root .guarantee .v em { font-style: italic; }

    /* FAQ */
    .bmp-root .faq { background: var(--paper); padding: 130px 0; border-top: 1px solid var(--rule-soft); }
    .bmp-root .faq-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .bmp-root .faq-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(56px, 7vw, 120px); line-height: 0.9; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .bmp-root .faq-head h2 em { font-style: normal; color: var(--blood); display: block; }
    .bmp-root .faq-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .bmp-root .faq-head .copy strong { color: var(--blood); }
    .bmp-root .faq-list { border-top: 1.5px solid var(--ink); }
    .bmp-root .faq details { border-bottom: 1px solid var(--rule-soft); transition: background .2s; }
    .bmp-root .faq details[open] { background: var(--paper-warm); }
    .bmp-root .faq summary { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: baseline; padding: 26px 0; cursor: pointer; list-style: none; }
    .bmp-root .faq summary::-webkit-details-marker { display: none; }
    .bmp-root .faq summary .n { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.22em; color: var(--blood); }
    .bmp-root .faq summary em { font-family: var(--serif); font-style: italic; font-size: 22px; line-height: 1.35; color: var(--ink); font-weight: 400; }
    .bmp-root .faq summary .plus { font-family: var(--display); font-size: 28px; color: var(--blood); transition: transform .25s; }
    .bmp-root .faq details[open] .plus { transform: rotate(45deg); }
    .bmp-root .faq .a { padding: 0 0 28px 56px; font-family: var(--serif); font-size: 17px; line-height: 1.65; color: var(--ink-soft); max-width: 880px; }

    /* Final CTA */
    .bmp-root .final { background: var(--ink); color: var(--paper); padding: 150px 0 160px; text-align: center; position: relative; overflow: hidden; }
    .bmp-root .final::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 1000px; height: 1000px; background: radial-gradient(circle, rgba(139,31,31,0.35), transparent 65%); pointer-events: none; }
    .bmp-root .final .wrap-narrow { position: relative; }
    .bmp-root .final .quote { font-family: var(--display); font-weight: 400; font-size: clamp(36px, 4.6vw, 72px); line-height: 1.06; text-transform: uppercase; color: var(--paper); margin: 0; letter-spacing: -0.012em; }
    .bmp-root .final .quote .blood { color: var(--blood-bright); }
    .bmp-root .final .quote em { font-family: var(--serif); font-style: italic; text-transform: none; color: var(--paper); font-weight: 400; letter-spacing: 0; }
    .bmp-root .final .sub { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.5; color: var(--paper); opacity: 0.8; margin: 40px auto 0; max-width: 600px; }
    .bmp-root .cta-row { margin-top: 56px; display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .bmp-root .btn-primary { background: var(--blood); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 32px; text-decoration: none; transition: background .2s; display: inline-flex; align-items: center; gap: 16px; }
    .bmp-root .btn-primary:hover { background: var(--blood-bright); }
    .bmp-root .btn-primary span { font-family: var(--display); font-size: 22px; letter-spacing: 0; }
    .bmp-root .btn-secondary { background: transparent; color: var(--paper); font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 28px; text-decoration: none; border: 1px solid rgba(247,244,235,0.3); transition: border-color .2s; }
    .bmp-root .btn-secondary:hover { border-color: var(--paper); }

    /* Footer */
    .bmp-root footer { background: var(--paper); color: var(--ink); padding: 0 0 32px; border-top: 1px solid var(--rule-soft); }
    .bmp-root .mega-mark { text-align: center; padding: 80px 0 60px; border-bottom: 1px solid var(--rule-soft); }
    .bmp-root .mega-mark .mark-inner { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(64px, 12vw, 200px); line-height: 0.85; color: var(--ink); letter-spacing: -0.025em; }
    .bmp-root .mega-mark .mark-inner em { font-style: normal; color: var(--blood); }
    .bmp-root .mega-mark .mark-foot { display: flex; justify-content: space-between; margin-top: 32px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-mute); }
    .bmp-root .mega-mark .mark-foot .dot { display: inline-block; width: 4px; height: 4px; background: var(--blood); border-radius: 50%; vertical-align: middle; margin: 0 6px; }
    .bmp-root .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; padding-top: 56px; }
    .bmp-root .footer-grid .col h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--blood); margin: 0 0 18px; font-weight: 600; }
    .bmp-root .footer-grid .col a, .bmp-root .footer-grid .col .dim { display: block; font-family: var(--serif); font-size: 15px; line-height: 1.55; color: var(--ink); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
    .bmp-root .footer-grid .col a:hover { color: var(--blood); }
    .bmp-root .footer-grid .col .dim { color: var(--ink-mute); }
    .bmp-root .footer-grid .brand-block .meta { font-family: var(--serif); font-style: italic; font-size: 17px; line-height: 1.4; color: var(--ink-soft); margin-top: 24px; border-left: 2px solid var(--blood); padding-left: 14px; max-width: 380px; }
    .bmp-root .footer-bottom { display: flex; justify-content: space-between; padding: 24px 0 0; margin-top: 40px; border-top: 1px solid var(--rule-soft); font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-mute); }

    /* Responsivo */
    @media (max-width: 980px) {
      .bmp-root .wrap { padding: 0 28px; }
      .bmp-root .hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 48px 28px 64px; }
      .bmp-root .hero-meta { grid-template-columns: 1fr 1fr; }
      .bmp-root .grid-marks, .bmp-root .grid-marks-r { display: none; }
      .bmp-root .promise-head, .bmp-root .audience-head, .bmp-root .pricing-head, .bmp-root .faq-head, .bmp-root .toc-sec .head, .bmp-root .sample-head { grid-template-columns: 1fr; gap: 24px; }
      .bmp-root .promise-cols, .bmp-root .audience-grid, .bmp-root .toc-grid, .bmp-root .testi-grid, .bmp-root .price-trio { grid-template-columns: 1fr; }
      .bmp-root .price-card.featured { transform: none; }
      .bmp-root .promise-cols .col.isnot { border-right: 0; border-bottom: 1px solid var(--ink); }
      .bmp-root .aud-card, .bmp-root .toc-card { border-right: 0; }
      .bmp-root .author-grid { grid-template-columns: 1fr; }
      .bmp-root .author-card { position: static; }
      .bmp-root .author-body .triangle { grid-template-columns: 1fr; }
      .bmp-root .author-body .triangle .cell { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
      .bmp-root .footer-grid { grid-template-columns: 1fr 1fr; }
      .bmp-root .excerpt-grid { grid-template-columns: 1fr; gap: 40px; padding: 0 28px; }
      .bmp-root .excerpt .meta { position: static; }
      .bmp-root .masthead-inner { grid-template-columns: 1fr; text-align: center; }
      .bmp-root .masthead-center, .bmp-root .masthead-right { justify-self: center; }
      .bmp-root .nav-inner { padding: 14px 28px; flex-direction: column; gap: 14px; }
      .bmp-root .nav-links { gap: 18px; flex-wrap: wrap; justify-content: center; }
      .bmp-root .footer-bottom { flex-direction: column; gap: 12px; }
      .bmp-root .cover-stack { max-width: 320px; margin: 0 auto; }
    }
  `

  return (
    <div className="bmp-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,300;1,8..60,400;1,8..60,500;1,8..60,600&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      {/* ── TICKER ─────────────────────────────────────────────── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span>House Mazzutti Academy</span><span className="star">★</span>
              <span>Volume 03 — Briefing Mal Passado</span><span className="star">★</span>
              <span>O monstro silencioso da publicidade brasileira</span><span className="star">★</span>
              <span>25 capítulos · 417 páginas · 3 partes</span><span className="star">★</span>
              <span>Edição 2026 · São Paulo</span><span className="star">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── MASTHEAD ───────────────────────────────────────────── */}
      <header className="masthead">
        <div className="masthead-inner">
          <Link href="https://housemazzutti.com" className="masthead-brand" aria-label="House Mazzutti" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '22px' }}>House Mazzutti</span>
          </Link>
          <div className="masthead-center">
            <span className="hm-tag">Academy</span>
            <span className="hm-divider" />
            <span className="hm-tag">Volume 03 · MMXXVI</span>
          </div>
          <div className="masthead-right"><span className="hm-tag">PDF · Impresso · Combo</span></div>
        </div>
      </header>

      {/* ── NAV ────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand"><span className="pip" />Briefing Mal Passado · Vol. 03</a>
          <div className="nav-links">
            <a href="#sumario">Sumário</a>
            <a href="#trecho">Trecho</a>
            <a href="#autor">O autor</a>
            <a href="#faq">Perguntas</a>
          </div>
          <a href="#comprar" className="nav-cta">Quero o livro →</a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <header className="hero">
        <div className="grid-marks">2603 · 100<br />PDF · 100<br />25CAP</div>
        <div className="grid-marks-r">UN · LIVRO<br />BR · 2026<br />VOL · 03</div>

        <div className="hero-grid">
          <div className="hero-left">
            <div>
              <div className="hero-tag">
                <span className="dot" />{' '}House Mazzutti Academy · Vol. 03 · 2026
                <span className="ms" />
              </div>
              <h1 className="hero-headline">
                Briefing<br />
                <em>mal</em><br />
                Passado.
              </h1>
              <p className="hero-sub">
                <em>O monstro silencioso da publicidade brasileira.</em> 25 capítulos sobre por que o briefing chega errado, quem perde quando isso acontece, e como nomear, devolver e reescrever — antes de virar deadline na sua mesa.
              </p>
            </div>
            <div className="hero-meta">
              <div className="cell"><span className="k">Autor</span><span className="v">Ângelo Mazzutti</span></div>
              <div className="cell"><span className="k">Formatos</span><span className="v">PDF · Impresso · Combo</span></div>
              <div className="cell"><span className="k">Capítulos</span><span className="v">25 em 3 partes</span></div>
              <div className="cell"><span className="k">Páginas</span><span className="v">417 · ed. 2026</span></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="cover-stack">
              <Image src={COVER} alt="Capa do livro Briefing Mal Passado — Ângelo Mazzutti, House Mazzutti Academy Vol. 03" fill sizes="(max-width: 980px) 320px, 460px" priority className="object-cover" style={{ border: '1px solid rgba(0,0,0,0.6)' }} />
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <span><span className="star">★</span> Briefing mal passado mata projeto · Briefing bem passado salva carreira</span>
          <span>Lançamento 2026 · Edição inaugural</span>
        </div>
      </header>

      {/* ── PULLBAND ───────────────────────────────────────────── */}
      <section className="pullband">
        <div className="wrap">
          <p className="quote">
            Briefing mal passado<br />
            mata projeto.<br />
            <span className="em">Briefing bem passado salva carreira.</span>
          </p>
          <div className="strip" />
          <div className="attr">— Introdução · Ângelo Mazzutti</div>
        </div>
      </section>

      {/* ── PROMESSA ───────────────────────────────────────────── */}
      <section className="promise">
        <div className="wrap">
          <div className="promise-head">
            <h2>O que você<em>tem em mãos.</em></h2>
            <p className="lede">Não é manual de redação publicitária. É leitura crítica de briefing, escrita por quem ocupa os dois lados da mesa há mais de 20 anos. Os 7 sinais que diagnosticam o problema antes da reunião. As 7 perguntas que filtram cliente bom de cliente predador. O vocabulário que faltava pra nomear o caos sem culpar pessoa.</p>
          </div>
          <div className="promise-cols">
            <div className="col isnot">
              <h3>Esse livro não é</h3>
              <ul>
                <li>Curso de redação ou copywriting</li>
                <li>Manual de “como vender mais ao cliente”</li>
                <li>Discurso motivacional sobre paixão criativa</li>
                <li>Receita pronta de processo de aprovação</li>
              </ul>
            </div>
            <div className="col is">
              <h3>Esse livro é</h3>
              <ul>
                <li>Diagnóstico operacional do briefing mal passado</li>
                <li>Sistema de 7 sinais pra detectar antes da execução</li>
                <li>7 perguntas que reescrevem briefing em reunião</li>
                <li>Critério pra aceitar, recusar ou devolver com argumento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUMÁRIO ────────────────────────────────────────────── */}
      <section className="toc-sec" id="sumario">
        <div className="wrap">
          <div className="head">
            <h2>Sumário<em>.</em></h2>
            <p className="desc"><em>Três partes em sequência operacional: diagnóstico do monstro, os 7 sinais de leitura, as 7 perguntas que devolvem o briefing reescrito. 25 capítulos, 417 páginas, edição inaugural.</em></p>
          </div>

          {PARTS.map((part) => (
            <div key={part.num}>
              <div className="toc-part">
                <div className="pt-num">{part.num}</div>
                <div className="pt-name">{part.name}</div>
                <div className="pt-tag">{part.tag}</div>
              </div>
              <div className="toc-grid">
                {part.chapters.map((ch) => (
                  <article className="toc-card" key={ch.n}>
                    <div className="num">{ch.n}<span className="accent">.</span></div>
                    <div className="tag">{ch.tag}</div>
                    <div className="title">{ch.title}</div>
                    <div className="pages"><span>{ch.sub}</span><span>p. {ch.pg}</span></div>
                  </article>
                ))}
                {part.extra && (
                  <article className="toc-card" style={{ gridColumn: 'span 2', background: 'var(--paper)' }}>
                    <div className="num" style={{ color: 'var(--blood)' }}>—</div>
                    <div className="tag">{part.extra.tag}</div>
                    <div className="title">{part.extra.title}</div>
                    <div className="pages"><span>{part.extra.sub}</span><span>p. {part.extra.pg}</span></div>
                  </article>
                )}
              </div>
            </div>
          ))}

          <div className="toc-foot">
            <span>+ <strong>Colofão · House Mazzutti Edições</strong> &nbsp;·&nbsp; p. 411</span>
            <span><strong>25</strong> capítulos · <strong>3</strong> partes · <strong>417</strong> páginas</span>
          </div>
        </div>
      </section>

      {/* ── TRECHO ─────────────────────────────────────────────── */}
      <section className="excerpt" id="trecho">
        <div className="excerpt-grid">
          <aside className="meta">
            <div className="label">Trecho · Introdução</div>
            <h3>O monstro<br />que ninguém<br />chama pelo nome.</h3>
            <div className="from">Páginas 13 – 17 · primeira edição, 2026</div>
          </aside>
          <div className="excerpt-body">
            <p className="dropcap">Toda agência tem um monstro silencioso que ninguém nomeia. Ele não aparece nos awards, não vira case na newsletter do mercado, não tem coluna em revista de comunicação. Mas está em toda reunião de criação, em toda virada de prazo, em toda apresentação que volta com a marcação genérica de “falta algo”. Esse monstro tem nome — e o nome dele é briefing mal passado.</p>
            <p>Há três anos faço uma pergunta no início de toda reunião de partida com cliente novo: <em>“o último projeto que vocês contrataram, qual foi a primeira virada de escopo?”</em> Em quinze respostas, treze me devolvem a mesma história: alguém na cadeia entendeu o pedido de um jeito, alguém entendeu de outro, e a equipe de criação descobriu a divergência três rodadas de aprovação depois. Cronograma virou pó. Honorário virou prejuízo. Time virou roteiro de saída.</p>
            <p className="pullquote">A culpa não é da criação. Nunca foi.</p>
            <p>O problema raramente é talento, raramente é processo de aprovação, quase nunca é dedicação. O problema é que o pedido <em>chegou errado</em> — e ninguém na cadeia teve repertório, tempo ou licença pra devolver. Esse livro é sobre isso: como o briefing chega errado, por que ninguém devolve, e qual é o pequeno conjunto de ferramentas que falta — só sete sinais e sete perguntas — pra que devolver vire ofício, não confronto.</p>
            <p>Quem leu até aqui e sentiu reconhecimento, esse livro foi escrito pra você.</p>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM ──────────────────────────────────────────── */}
      <section className="audience">
        <div className="wrap">
          <div className="audience-head">
            <div>
              <div className="eyebrow">Para quem foi escrito</div>
              <h2>Esse livro <em>é pra você</em><br />se em alguma reunião…</h2>
            </div>
            <p className="copy">Foi escrito para seis perfis específicos da cadeia criativa. Se você se reconhece em pelo menos um dos cenários abaixo, encurta muito do seu próximo trimestre.</p>
          </div>
          <div className="audience-grid">
            {AUDIENCE.map((a) => (
              <article className="aud-card" key={a.n}>
                <div className="num">{a.n}</div>
                <div className="ttl">{a.ttl}</div>
                <div className="d">{a.d}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOR ──────────────────────────────────────────────── */}
      <section className="author" id="autor">
        <div className="wrap">
          <div className="author-grid">
            <aside className="author-card">
              <div className="blood-strip" />
              <div className="author-avatar-wrap">
                <div className="author-avatar">
                  <Image src="/images/angelo/angelo-portrait.webp" alt="Ângelo Mazzutti — autor, House Mazzutti" width={520} height={650} sizes="(max-width: 768px) 60vw, 280px" quality={90} className="author-avatar-img" />
                </div>
              </div>
              <div className="label">O autor</div>
              <div className="nm">Ângelo<br /><em>Mazzutti.</em></div>
              <div className="role">Publicitário, estrategista de marca e diretor criativo da House Mazzutti — São Paulo. Vinte e dois anos lendo briefing dos dois lados da mesa.</div>
              <div className="meta-rows">
                <div className="row"><span>Atuação</span><span className="v">+20 anos</span></div>
                <div className="row"><span>Frentes</span><span className="v">Agência · Produtora · Studio</span></div>
                <div className="row"><span>Cidade</span><span className="v">São Paulo, Brasil</span></div>
                <div className="row"><span>Selo</span><span className="v">House Mazzutti Edições</span></div>
              </div>
            </aside>
            <div className="author-body">
              <h2>Quem te escreve<br /><em>já entregou</em> briefing<br />mal passado também.</h2>
              <p>Construo marca há mais de vinte anos. Publicitário de formação, estrategista por escolha, diretor criativo no dia a dia. Sócio numa casa que assina projeto pra marca grande, pra cliente médio e pra pessoa que virou marca. Estou em reunião de cliente, em reunião de criação e em reunião de revisão de escopo — quase sempre no mesmo dia.</p>
              <p>O livro não é teoria. É o que eu queria ter recebido aos 24 anos quando virei diretor de criação pela primeira vez. É o que entrego hoje pra cada profissional que entra na House. É o resumo das mesmas 25 lições que repito em onboarding desde que parei de contar.</p>
              <p>Em 2025, conduzi em Uberlândia a segunda edição do workshop <em>Inside Out — de dentro pra fora</em>, embrião deste livro. <em>Briefing Mal Passado</em> é o primeiro livro escrito por mim — não é fim de carreira, é régua editorial cravada no meio do ofício.</p>
              <div className="signature">— Ângelo Mazzutti</div>
              <div className="triangle">
                <div className="cell"><div className="k">Agência</div><div className="v">Estratégia e posicionamento de marca.</div></div>
                <div className="cell"><div className="k">Produtora</div><div className="v">Execução visual com padrão de campanha.</div></div>
                <div className="cell"><div className="k">Studio</div><div className="v">Desenvolvimento de imagem de talentos.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ────────────────────────────────────────── */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testi-head">
            <div className="eyebrow">O que estão dizendo</div>
            <h2>Leitores da pré-venda,<br /><em>em outubro de 2026.</em></h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t) => (
              <article className="testi" key={t.nm}>
                <p className="q">{t.q}</p>
                <div className="who">
                  <div className="av">{t.av}</div>
                  <div><div className="nm">{t.nm}</div><div className="role">{t.role}</div></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE LEAD MAGNET ─────────────────────────────────── */}
      <section className="sample-sec" id="sample">
        <div className="wrap">
          <div className="sample-head">
            <h2>Capítulo 1.<br /><em>De graça.</em></h2>
            <p className="copy">O primeiro capítulo é o que abre o livro — e o que define o tom. Recebe no e-mail, lê em 15 minutos, decide depois. Sem cobrança, sem ligação, sem follow-up agressivo.</p>
          </div>
          <SampleLeadForm />
        </div>
      </section>

      {/* ── PRICING (3 cards) ──────────────────────────────────── */}
      <section className="pricing" id="comprar">
        <div className="wrap">
          <div className="pricing-head">
            <div>
              <div className="eyebrow">Edição inaugural · Volume 03</div>
              <h2>Três formas<br /><span className="em">de ler.</span></h2>
            </div>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--paper)', opacity: 0.8, lineHeight: 1.55 }}>Mesma obra. Mesmo conteúdo. Você escolhe como. O combo entrega os dois e economiza R$ 30.</p>
          </div>

          <div className="price-trio">
            {/* DIGITAL */}
            <div className="price-card alt">
              <div className="ribbon">Versão digital · PDF</div>
              <h3>PDF</h3>
              <div className="num"><span className="cur">R$</span>54</div>
              <p className="blurb">PDF de alta resolução, otimizado pra tablet, computador e leitor de e-book. <em>Entrega imediata</em> após pagamento. Licença individual.</p>
              <a href={CHECKOUT_DIGITAL_URL} className="buy">Comprar PDF <span className="arrow">→</span></a>
            </div>

            {/* COMBO — destaque */}
            <div className="price-card featured">
              <span className="badge-top">Melhor valor · economiza R$ 30</span>
              <div className="ribbon">Combo PDF + Impresso</div>
              <h3>Ler + colecionar</h3>
              <div className="num"><span className="cur">R$</span>119</div>
              <div className="strike-line"><s>R$ 149 avulso</s> · 20% off</div>
              <p className="blurb">PDF imediato <em>+</em> livro físico em capa cartonada, despachado em até {PRAZO_IMPRESSO_DIAS} dias úteis. <em>Leia agora, colecione depois.</em></p>
              <a href={CHECKOUT_COMBO_URL} className="buy">Quero o combo <span className="arrow">→</span></a>
            </div>

            {/* IMPRESSO */}
            <div className="price-card alt">
              <div className="ribbon">Versão impressa</div>
              <h3>Livro físico</h3>
              <div className="num"><span className="cur">R$</span>95</div>
              <p className="blurb">Capa cartonada, miolo offset 90g, formato 16 × 23 cm. <em>Produção House Mazzutti.</em> Envio em até {PRAZO_IMPRESSO_DIAS} dias úteis após pagamento.</p>
              <a href={CHECKOUT_IMPRESSO_URL} className="buy">Comprar impresso <span className="arrow">→</span></a>
            </div>
          </div>

          <div className="guarantee">
            <div className="g-num">7</div>
            <div className="g-body">
              <div className="k">Garantia incondicional</div>
              <div className="v"><em>Sete dias para ler, testar nas suas reuniões e desistir.</em> Se não fizer sentido pra você, devolvemos cem por cento — sem perguntar nada.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="faq" id="faq">
        <div className="wrap">
          <div className="faq-head">
            <h2>Perguntas<em>honestas.</em></h2>
            <p className="copy">As mesmas que aparecem na caixa de entrada da House. Se a sua não estiver aqui, escreve direto: <strong>academy@housemazzutti.com</strong></p>
          </div>
          <div className="faq-list">
            {FAQS.map((f) => (
              <details key={f.n}>
                <summary><span className="n">{f.n}</span><span><em>{f.q}</em></span><span className="plus">+</span></summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="final">
        <div className="wrap-narrow">
          <p className="quote">
            Briefing mal passado <span className="blood">mata projeto.</span><br />
            <em>Briefing bem passado</em><br />
            salva <span className="blood">carreira.</span>
          </p>
          <p className="sub">Esse livro nomeia o monstro silencioso que come cronograma, queima margem e cansa equipe. Antes do próximo briefing, antes da próxima reunião de aceite, antes da próxima virada de prazo.</p>
          <div className="cta-row">
            <a href="#comprar" className="btn-primary">Quero o livro <span>→</span></a>
            <a href="#sumario" className="btn-secondary">Ver o sumário completo</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer>
        <div className="mega-mark">
          <div className="mark-inner">
            <span>BRIEFING MAL PASSADO<em>.</em></span>
          </div>
          <div className="wrap mark-foot">
            <span>Academy</span>
            <span>Vol. 03 <span className="dot" /> 2026 <span className="dot" /> São Paulo</span>
            <span>Edições</span>
          </div>
        </div>
        <div className="wrap">
          <div className="footer-grid">
            <div className="brand-block col">
              <h4>O selo</h4>
              <span className="dim" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, letterSpacing: 0 }}>House Mazzutti Edições — selo editorial da House Mazzutti, dirigido por Ângelo Mazzutti.</span>
              <p className="meta">Briefing mal passado mata projeto.<br />Briefing bem passado salva carreira.</p>
            </div>
            <div className="col">
              <h4>Catálogo</h4>
              <Link href="/pt/academy/marketing-para-modelos">Vol. 01 · Marketing para Modelos</Link>
              <Link href="/pt/academy/preco-da-relevancia">Vol. 02 · O Preço da Relevância</Link>
              <a href="#sumario">Vol. 03 · Briefing Mal Passado</a>
            </div>
            <div className="col">
              <h4>House Mazzutti</h4>
              <Link href="/pt/agencia">Agência</Link>
              <Link href="/pt/produtora">Produtora</Link>
              <Link href="/pt/studio">Studio</Link>
              <Link href="/academy">Academy</Link>
            </div>
            <div className="col">
              <h4>Contato</h4>
              <a href="mailto:academy@housemazzutti.com">academy@housemazzutti.com</a>
              <a href="https://housemazzutti.com">housemazzutti.com</a>
              <a href="https://instagram.com/housemazzutti">@housemazzutti</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© MMXXVI · House Mazzutti Edições · Todos os direitos reservados</span>
            <span>São Paulo · Brasil</span>
          </div>
        </div>
        <div className="mt-6"><SiteFooterLinks /></div>
      </footer>
    </div>
  )
}
