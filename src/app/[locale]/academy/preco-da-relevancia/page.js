/**
 * Landing · Ebook O Preço da Relevância
 * House Mazzutti Academy · Vol. 02 · 2026
 */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SITE_URL = 'https://housemazzutti.com'
const COVER = '/images/academy/preco-da-relevancia/cover.png'
const COVER_ABSOLUTE = `${SITE_URL}${COVER}`
const CHECKOUT_URL = '/checkout/preco-da-relevancia'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'O Preço da Relevância · Ebook · House Mazzutti Academy Vol. 02',
  description: 'Um manifesto sobre o colapso da identidade na era da atenção digital. Influenciadores, plataformas e a guerra silenciosa pela atenção — por Ângelo Mazzutti.',
  keywords: ['preço da relevância', 'influenciadores', 'creator economy', 'marketing digital', 'Ângelo Mazzutti', 'House Mazzutti Academy'],
  authors: [{ name: 'Ângelo Mazzutti', url: SITE_URL }],
  creator: 'Ângelo Mazzutti',
  publisher: 'House Mazzutti Edições',
  alternates: { canonical: `${SITE_URL}/pt/academy/preco-da-relevancia` },
  openGraph: {
    type: 'book',
    locale: 'pt_BR',
    url: `${SITE_URL}/pt/academy/preco-da-relevancia`,
    siteName: 'House Mazzutti Academy',
    title: 'O Preço da Relevância · Vol. 02',
    description: 'Um manifesto sobre o colapso da identidade na era da atenção digital.',
    images: [{ url: COVER_ABSOLUTE, width: 768, height: 1376, alt: 'Capa O Preço da Relevância — House Mazzutti Academy Vol. 02' }],
  },
  twitter: { card: 'summary_large_image', title: 'O Preço da Relevância · Vol. 02', images: [COVER_ABSOLUTE] },
}

/* ─── dados do sumário ──────────────────────────────────────────── */
const PARTS = [
  {
    num: 'I.',
    name: 'A Economia da Atenção',
    tag: 'Caps 01 — 03',
    chapters: [
      { n: '01', tag: 'Parte I · Mercado', title: 'O mercado da atenção no Brasil', sub: 'Mapa do mercado', pg: '31' },
      { n: '02', tag: 'Parte I · Mercado', title: 'Os tipos de quem vende atenção', sub: '5 tamanhos · 8 famílias', pg: '57' },
      { n: '03', tag: 'Parte I · Mercado', title: 'As regras de um jogo sem juízes', sub: 'Lei, casos, práticas', pg: '81' },
    ],
  },
  {
    num: 'II.',
    name: 'O Influenciador como Produto',
    tag: 'Caps 04 — 06',
    chapters: [
      { n: '04', tag: 'Parte II · Produto', title: 'Posicionamento — o produto que você virou', sub: 'Teste dos 5 segundos', pg: '107' },
      { n: '05', tag: 'Parte II · Produto', title: 'Marca pessoal — a engenharia do eu', sub: '4 pilares', pg: '131' },
      { n: '06', tag: 'Parte II · Produto', title: 'Estética — a embalagem do humano', sub: '7 elementos', pg: '153' },
    ],
  },
  {
    num: 'III.',
    name: 'As Plataformas',
    tag: 'Caps 07 — 10',
    chapters: [
      { n: '07', tag: 'Parte III · Plataformas', title: 'As plataformas como árbitros', sub: 'O tribunal', pg: '177' },
      { n: '08', tag: 'Parte III · Plataformas', title: 'A operação por trás da relevância', sub: '3 escalas de produção', pg: '199' },
      { n: '09', tag: 'Parte III · Plataformas', title: 'O ensaio visual como linguagem', sub: '5 categorias de material', pg: '221' },
      { n: '10', tag: 'Parte III · Plataformas', title: 'A carreira como sistema', sub: 'Service blueprint', pg: '243' },
    ],
    extra: { tag: 'Fechamento', title: 'Epílogo · As duas partes pendentes', sub: 'O preço pago · O que sobra', pg: '269' },
  },
]

const AUDIENCE = [
  { n: '01', ttl: 'Você já produz conteúdo e quer entender o sistema antes de continuar dentro dele.', d: 'Tem 30 mil ou 300 mil seguidores e desconfia que está pagando um preço que ninguém te explicou.' },
  { n: '02', ttl: 'Opera no mercado como agência, marca ou plataforma.', d: 'Quer ver a engrenagem por dentro, sem manual edulcorado nem narrativa de empreendedorismo.' },
  { n: '03', ttl: 'Acompanha o fenômeno como leitor.', d: 'Jornalista, pesquisador, empresário, advogado, estrategista — e quer um diagnóstico com base brasileira.' },
  { n: '04', ttl: 'É creator profissional há mais de dois anos no jogo.', d: 'Os capítulos sobre operação, ensaio visual e carreira como sistema cobrem o que ninguém escreveu antes.' },
  { n: '05', ttl: 'Está pensando em montar marca pessoal a partir do zero.', d: 'A Parte II disseca posicionamento, narrativa, estética e tom de voz como decisões de produto — não de copy.' },
  { n: '06', ttl: 'Trabalha com creators e precisa entender as regras de 2026.', d: 'CONAR, Lei 15.325, tributação, casos CPI Bets e Hytalo Santos. O que mudou na operação real.' },
]

const TESTIMONIALS = [
  { q: '"Eu achava que tinha problema de algoritmo. Depois do capítulo 4, percebi que o problema era posicionamento. Cortei 60% do que postava e o cachê dobrou em três meses."', av: 'C', nm: 'Camila, 28', role: 'Creator de finanças · São Paulo' },
  { q: '"Sou head de influência numa marca grande. Esse livro vai virar leitura obrigatória do meu time. É o primeiro material sério sobre o mercado escrito por alguém que está dentro dele."', av: 'R', nm: 'Rodrigo, 36', role: 'Head de influência · varejo' },
  { q: '"O capítulo sobre regras (CPI Bets, caso Hytalo, CONAR) sozinho já economizou um contrato perigoso. Recomendei pra todo o nosso roster de creators."', av: 'L', nm: 'Letícia, 33', role: 'Sócia de agência · Curitiba' },
]

const FAQS = [
  { n: '01', q: 'Esse livro serve pra quem está começando agora?', a: 'Serve, mas não da forma tradicional. Não é manual de "como começar". É diagnóstico de mercado. Quem está prestes a entrar economiza anos sabendo, antes, como o sistema opera. Esse capítulo de Mercado da Atenção (Cap 01) já te dá a fotografia do terreno.' },
  { n: '02', q: 'Eu já tenho audiência consolidada. Ainda faz sentido?', a: 'Provavelmente é onde o livro mais entrega. Os capítulos 07 a 10 (Plataformas, Operação, Ensaio Visual, Carreira como Sistema) cobrem material que mesmo creators com cinco anos de estrada raramente formalizam. Service blueprint aplicado a carreira de creator é, em 2026, a fronteira menos explorada.' },
  { n: '03', q: 'Como é a entrega? Eu recebo um livro físico?', a: 'É ebook — PDF em alta resolução, com a diagramação editorial completa, pronto pra ler no celular, tablet ou computador. Entrega imediata após a confirmação do pagamento, por e-mail e link de download direto.' },
  { n: '04', q: 'Vou aprender truque de algoritmo, hack de engajamento?', a: 'Não. Esse livro deixa claro logo na introdução: não é um livro de truque. Algoritmo muda mais rápido do que se escreve. O foco é a plataforma como tribunal, não o algoritmo como juiz de plantão. Quem quer truque de feed encontra em vinte canais. Quem quer entender o sistema, em poucos.' },
  { n: '05', q: 'É um livro de motivação ou de empreendedorismo?', a: 'Nem um, nem outro. É um ensaio crítico sobre o mercado da atenção — com a estrutura editorial de manifesto e o rigor de relatório de mercado. Quem busca discurso de incentivo está no lugar errado. Quem busca a engenharia do que está acontecendo, está no lugar certo.' },
  { n: '06', q: 'E se eu comprar, ler e não gostar?', a: 'Sete dias de garantia incondicional. Você escreve pra academy@housemazzutti.com dizendo apenas que não foi pra você, e devolvemos o valor integral. Sem formulário, sem ligação, sem justificativa.' },
]

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function PrecoDaRelevanciaPage() {
  const css = `
    .pdr-root {
      --paper: #f1ecdd;
      --paper-warm: #ece5d2;
      --paper-edge: #e1d9c2;
      --ink: #0f0c0a;
      --ink-soft: #1c1814;
      --ink-mute: #6a6155;
      --ink-light: #a39989;
      --rule-soft: #d8d1bd;
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
    .pdr-root *, .pdr-root *::before, .pdr-root *::after { box-sizing: border-box; }
    .pdr-root a { color: inherit; }
    .pdr-root img { display: block; max-width: 100%; }
    .pdr-root .wrap { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
    .pdr-root .wrap-narrow { max-width: 880px; margin: 0 auto; padding: 0 32px; }

    /* Fonts */
    .pdr-root .eyebrow { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); }

    /* Ticker */
    .pdr-root .ticker { background: var(--ink); color: var(--paper); overflow: hidden; }
    .pdr-root .ticker-track { display: flex; gap: 56px; white-space: nowrap; padding: 12px 0; font-family: var(--mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; animation: pdr-marquee 42s linear infinite; width: max-content; }
    .pdr-root .ticker-track span { opacity: 0.78; }
    .pdr-root .ticker-track .star { color: var(--blood-bright); opacity: 1; }
    @keyframes pdr-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* Masthead */
    .pdr-root .masthead { background: var(--paper); border-bottom: 1px solid var(--ink); padding: 22px 0 18px; }
    .pdr-root .masthead-inner { max-width: 1440px; margin: 0 auto; padding: 0 48px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; }
    .pdr-root .masthead-brand { text-decoration: none; color: var(--ink); display: inline-block; line-height: 1; }
    .pdr-root .hm-wordmark { font-family: var(--display); font-weight: 400; text-transform: uppercase; letter-spacing: -0.012em; line-height: 0.82; font-size: 32px; }
    .pdr-root .hm-wordmark .row { display: block; }
    .pdr-root .hm-wordmark .row em { font-family: var(--serif); font-style: italic; font-weight: 500; color: var(--blood); text-transform: none; letter-spacing: -0.01em; }
    .pdr-root .hm-tag { font-family: var(--mono); font-weight: 500; font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; }
    .pdr-root .masthead-center { display: flex; align-items: center; gap: 18px; justify-self: center; }
    .pdr-root .hm-divider { width: 1px; height: 14px; background: var(--ink); opacity: 0.4; }
    .pdr-root .masthead-right { justify-self: end; color: var(--ink-mute); }

    /* Nav */
    .pdr-root .nav { position: sticky; top: 0; z-index: 50; background: rgba(241,236,221,0.94); border-bottom: 1px solid var(--rule-soft); backdrop-filter: blur(8px); }
    .pdr-root .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 48px; max-width: 1440px; margin: 0 auto; }
    .pdr-root .nav-brand { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); display: flex; align-items: center; gap: 14px; text-decoration: none; }
    .pdr-root .nav-brand .pip { width: 7px; height: 7px; background: var(--blood); display: inline-block; }
    .pdr-root .nav-links { display: flex; align-items: center; gap: 30px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .pdr-root .nav-links a { color: inherit; text-decoration: none; transition: color .2s; }
    .pdr-root .nav-links a:hover { color: var(--blood); }
    .pdr-root .nav-cta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--paper); background: var(--blood); padding: 10px 18px; text-decoration: none; transition: background .2s; font-weight: 500; }
    .pdr-root .nav-cta:hover { background: var(--ink); }

    /* Hero */
    .pdr-root .hero { background: var(--blood-deep); background-image: radial-gradient(ellipse at top right, rgba(201,42,42,0.5), transparent 50%), radial-gradient(ellipse at bottom left, rgba(0,0,0,0.4), transparent 70%); color: var(--paper); position: relative; overflow: hidden; }
    .pdr-root .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: stretch; min-height: 92vh; padding: 64px 56px 80px; max-width: 1440px; margin: 0 auto; }
    .pdr-root .hero-left { display: flex; flex-direction: column; justify-content: space-between; gap: 40px; }
    .pdr-root .hero-tag { display: flex; align-items: center; gap: 14px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); }
    .pdr-root .hero-tag .dot { width: 8px; height: 8px; background: var(--blood-bright); display: inline-block; }
    .pdr-root .hero-tag .ms { flex: 1; height: 1px; background: var(--paper); opacity: 0.4; max-width: 200px; }
    .pdr-root .hero-headline { font-family: var(--display); font-weight: 400; font-size: clamp(64px, 10vw, 168px); line-height: 0.86; letter-spacing: -0.018em; margin: 28px 0 0; color: var(--paper); text-transform: uppercase; }
    .pdr-root .hero-headline .da { color: var(--paper); opacity: 0.55; font-size: 0.55em; vertical-align: middle; padding: 0 0.1em; }
    .pdr-root .hero-sub { font-family: var(--serif); font-style: italic; font-size: clamp(20px, 1.9vw, 30px); line-height: 1.28; color: var(--paper); max-width: 560px; margin: 40px 0 0; opacity: 0.92; border-left: 2px solid var(--blood-bright); padding-left: 18px; }
    .pdr-root .hero-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 36px; padding-top: 22px; border-top: 1px solid rgba(241,236,221,0.3); }
    .pdr-root .hero-meta .cell .k { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); opacity: 0.6; display: block; margin-bottom: 6px; }
    .pdr-root .hero-meta .cell .v { font-family: var(--serif); font-style: italic; font-size: 20px; line-height: 1.1; color: var(--paper); }
    .pdr-root .hero-right { position: relative; display: flex; align-items: center; justify-content: center; }
    .pdr-root .cover-stack { position: relative; width: 100%; max-width: 460px; aspect-ratio: 1 / 1.5; transform: rotate(-2.2deg); filter: drop-shadow(0 35px 70px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.4)); transition: transform .6s cubic-bezier(.2,.7,.3,1); }
    .pdr-root .cover-stack:hover { transform: rotate(-1deg) translateY(-6px); }
    .pdr-root .grid-marks { position: absolute; top: 30px; left: 56px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em; color: rgba(241,236,221,0.32); line-height: 1.7; }
    .pdr-root .grid-marks-r { position: absolute; bottom: 80px; right: 56px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em; color: rgba(241,236,221,0.32); line-height: 1.7; text-align: right; }
    .pdr-root .hero-foot { border-top: 1px solid rgba(241,236,221,0.18); padding: 18px 56px; display: flex; justify-content: space-between; align-items: center; font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); background: var(--ink); max-width: 1440px; margin: 0 auto; }
    .pdr-root .hero-foot .star { color: var(--blood-bright); }

    /* Pullband */
    .pdr-root .pullband { background: var(--ink); color: var(--paper); padding: 130px 0 120px; text-align: center; position: relative; overflow: hidden; }
    .pdr-root .pullband::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 800px; background: radial-gradient(circle, rgba(139,31,31,0.4), transparent 70%); pointer-events: none; }
    .pdr-root .pullband .wrap { position: relative; }
    .pdr-root .pullband .quote { font-family: var(--display); font-weight: 400; font-size: clamp(48px, 6.4vw, 110px); line-height: 0.94; letter-spacing: -0.012em; text-transform: uppercase; color: var(--paper); margin: 0 auto; max-width: 1180px; }
    .pdr-root .pullband .quote .em { color: var(--blood-bright); display: block; }
    .pdr-root .pullband .attr { margin-top: 48px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); opacity: 0.6; }
    .pdr-root .pullband .strip { width: 80px; height: 3px; background: var(--blood-bright); margin: 30px auto 0; }

    /* Promessa */
    .pdr-root .promise { background: var(--paper); padding: 110px 0 130px; border-bottom: 1px solid var(--rule-soft); }
    .pdr-root .promise-head { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; margin-bottom: 64px; align-items: end; }
    .pdr-root .promise-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 6vw, 96px); line-height: 0.92; letter-spacing: -0.018em; color: var(--ink); margin: 0; }
    .pdr-root .promise-head h2 em { font-style: normal; color: var(--blood); display: block; }
    .pdr-root .promise-head .lede { font-family: var(--serif); font-size: 19px; line-height: 1.6; color: var(--ink-soft); border-left: 2px solid var(--blood); padding-left: 18px; }
    .pdr-root .promise-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); }
    .pdr-root .promise-cols .col { padding: 42px 40px 50px; }
    .pdr-root .promise-cols .col.is { background: var(--ink); color: var(--paper); }
    .pdr-root .promise-cols .col.isnot { background: var(--paper); color: var(--ink); border-right: 1px solid var(--ink); }
    .pdr-root .promise-cols .col h3 { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; margin: 0 0 28px; display: flex; align-items: center; gap: 12px; }
    .pdr-root .promise-cols .col.is h3 { color: var(--blood-bright); }
    .pdr-root .promise-cols .col.isnot h3 { color: var(--blood); }
    .pdr-root .promise-cols .col h3::before { content: ""; width: 24px; height: 2px; background: currentColor; }
    .pdr-root .promise-cols ul { list-style: none; padding: 0; margin: 0; }
    .pdr-root .promise-cols ul li { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.32; padding: 18px 0 18px 36px; position: relative; border-bottom: 1px solid; }
    .pdr-root .promise-cols .col.is ul li { border-color: rgba(241,236,221,0.16); }
    .pdr-root .promise-cols .col.isnot ul li { border-color: var(--rule-soft); }
    .pdr-root .promise-cols ul li:last-child { border-bottom: 0; }
    .pdr-root .promise-cols .col.is ul li::before { content: "+"; position: absolute; left: 0; top: 16px; font-family: var(--mono); font-style: normal; font-weight: 600; font-size: 16px; color: var(--blood-bright); }
    .pdr-root .promise-cols .col.isnot ul li::before { content: "×"; position: absolute; left: 0; top: 14px; font-family: var(--mono); font-style: normal; font-weight: 600; font-size: 20px; color: var(--blood); }

    /* Sumário */
    .pdr-root .toc-sec { background: var(--paper-warm); padding: 120px 0 130px; }
    .pdr-root .toc-sec .head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .pdr-root .toc-sec .head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(72px, 10vw, 168px); line-height: 0.88; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .pdr-root .toc-sec .head h2 em { font-style: normal; color: var(--blood); }
    .pdr-root .toc-sec .head .desc { font-family: var(--serif); font-style: italic; font-size: 20px; line-height: 1.45; color: var(--ink-soft); }
    .pdr-root .toc-part { display: grid; grid-template-columns: auto 1fr auto; gap: 28px; align-items: baseline; margin: 56px 0 24px; padding-top: 32px; border-top: 1.5px solid var(--ink); }
    .pdr-root .toc-part .pt-num { font-family: var(--display); font-weight: 400; font-size: 56px; line-height: 0.9; color: var(--blood); letter-spacing: -0.02em; }
    .pdr-root .toc-part .pt-name { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 32px; line-height: 1; color: var(--ink); letter-spacing: -0.01em; }
    .pdr-root .toc-part .pt-tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-mute); }
    .pdr-root .toc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
    .pdr-root .toc-card { padding: 28px 24px 32px; border-top: 1px solid var(--rule-soft); border-right: 1px solid var(--rule-soft); background: transparent; transition: background .25s; display: flex; flex-direction: column; gap: 12px; min-height: 220px; }
    .pdr-root .toc-card:hover { background: var(--paper); }
    .pdr-root .toc-card:nth-child(3n) { border-right: 0; }
    .pdr-root .toc-card .num { font-family: var(--display); font-weight: 400; font-size: 64px; line-height: 0.85; color: var(--ink); letter-spacing: -0.02em; }
    .pdr-root .toc-card .num .accent { color: var(--blood); }
    .pdr-root .toc-card .tag { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); }
    .pdr-root .toc-card .title { font-family: var(--serif); font-style: italic; font-weight: 500; font-size: 21px; line-height: 1.22; color: var(--ink); margin-top: auto; }
    .pdr-root .toc-card .pages { display: flex; justify-content: space-between; margin-top: 14px; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-mute); border-top: 1px solid var(--rule-soft); padding-top: 12px; }
    .pdr-root .toc-foot { margin-top: 32px; padding-top: 18px; border-top: 1.5px solid var(--ink); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .pdr-root .toc-foot strong { color: var(--ink); }

    /* Excerpt */
    .pdr-root .excerpt { background: var(--ink); color: var(--paper); padding: 130px 0; position: relative; overflow: hidden; }
    .pdr-root .excerpt-grid { display: grid; grid-template-columns: 0.85fr 1.6fr; gap: 80px; align-items: start; max-width: 1180px; margin: 0 auto; padding: 0 48px; }
    .pdr-root .excerpt .meta { position: sticky; top: 100px; }
    .pdr-root .excerpt .meta .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--blood-bright); margin-bottom: 18px; display: flex; align-items: baseline; gap: 12px; }
    .pdr-root .excerpt .meta .label::after { content: ""; flex: 1; height: 1px; background: var(--blood-bright); max-width: 80px; opacity: 0.6; }
    .pdr-root .excerpt .meta h3 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 48px; line-height: 0.96; color: var(--paper); margin: 0 0 22px; letter-spacing: -0.012em; }
    .pdr-root .excerpt .meta .from { font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--paper); opacity: 0.6; }
    .pdr-root .excerpt-body p { font-family: var(--serif); font-size: 18px; line-height: 1.65; color: var(--paper); opacity: 0.95; margin: 0 0 1.2em; }
    .pdr-root .excerpt-body p.dropcap::first-letter { font-family: var(--display); font-weight: 400; font-size: 4.4em; line-height: 0.92; float: left; padding: 0.06em 0.12em 0 0; color: var(--blood-bright); margin-right: 0.06em; }
    .pdr-root .excerpt-body .pullquote { font-family: var(--display); font-weight: 400; font-size: 38px; line-height: 1.0; text-transform: uppercase; color: var(--blood-bright); margin: 1.4em -8px; padding: 18px 22px; border-left: 4px solid var(--blood-bright); background: rgba(139,31,31,0.18); letter-spacing: -0.01em; }

    /* Audience */
    .pdr-root .audience { background: var(--paper); padding: 120px 0 130px; border-bottom: 1px solid var(--rule-soft); }
    .pdr-root .audience-head { display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px; align-items: end; margin-bottom: 56px; }
    .pdr-root .audience-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(44px, 5.4vw, 80px); line-height: 0.94; letter-spacing: -0.018em; color: var(--ink); margin: 18px 0 0; }
    .pdr-root .audience-head h2 em { font-style: normal; color: var(--blood); }
    .pdr-root .audience-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .pdr-root .audience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1.5px solid var(--ink); }
    .pdr-root .aud-card { padding: 32px 28px 36px; border-right: 1px solid var(--rule-soft); border-bottom: 1px solid var(--rule-soft); }
    .pdr-root .aud-card:nth-child(3n) { border-right: 0; }
    .pdr-root .aud-card .num { font-family: var(--display); font-weight: 400; font-size: 38px; color: var(--blood); line-height: 1; letter-spacing: -0.02em; margin-bottom: 18px; }
    .pdr-root .aud-card .ttl { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 22px; line-height: 1.05; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.005em; }
    .pdr-root .aud-card .d { font-family: var(--serif); font-size: 14.5px; line-height: 1.55; color: var(--ink-soft); }

    /* Author */
    .pdr-root .author { background: var(--paper-warm); padding: 130px 0; }
    .pdr-root .author-grid { display: grid; grid-template-columns: 0.85fr 1.4fr; gap: 64px; align-items: start; }
    .pdr-root .author-card { background: var(--ink); color: var(--paper); padding: 36px 32px 40px; position: sticky; top: 100px; }
    .pdr-root .author-card .blood-strip { height: 4px; background: var(--blood); margin-bottom: 32px; }
    .pdr-root .author-card .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--blood-bright); margin-bottom: 14px; }
    .pdr-root .author-card .nm { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 56px; line-height: 0.92; color: var(--paper); margin-bottom: 18px; letter-spacing: -0.018em; }
    .pdr-root .author-card .nm em { font-style: normal; color: var(--blood-bright); display: block; }
    .pdr-root .author-card .role { font-family: var(--serif); font-style: italic; font-size: 15px; line-height: 1.45; color: var(--paper); opacity: 0.8; margin-bottom: 28px; }
    .pdr-root .author-card .meta-rows { border-top: 1px solid rgba(241,236,221,0.18); }
    .pdr-root .author-card .meta-rows .row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid rgba(241,236,221,0.18); font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; }
    .pdr-root .author-card .meta-rows .row span:first-child { color: var(--paper); opacity: 0.55; }
    .pdr-root .author-card .meta-rows .row .v { color: var(--paper); font-family: var(--serif); font-style: italic; font-size: 13px; letter-spacing: 0; text-transform: none; }
    .pdr-root .author-body h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(40px, 5.2vw, 78px); line-height: 0.94; color: var(--ink); margin: 0 0 32px; letter-spacing: -0.018em; }
    .pdr-root .author-body h2 em { font-style: normal; color: var(--blood); }
    .pdr-root .author-body p { font-family: var(--serif); font-size: 18px; line-height: 1.65; color: var(--ink-soft); margin: 0 0 1.2em; }
    .pdr-root .author-body .signature { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 28px; color: var(--blood); margin-top: 32px; letter-spacing: -0.01em; }
    .pdr-root .author-body .triangle { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 56px; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); }
    .pdr-root .author-body .triangle .cell { padding: 22px 20px; border-right: 1px solid var(--rule-soft); }
    .pdr-root .author-body .triangle .cell:last-child { border-right: 0; }
    .pdr-root .author-body .triangle .k { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); margin-bottom: 10px; }
    .pdr-root .author-body .triangle .v { font-family: var(--serif); font-style: italic; font-size: 15.5px; line-height: 1.4; color: var(--ink); }

    /* Testimonials */
    .pdr-root .testimonials { background: var(--paper); padding: 120px 0; border-top: 1px solid var(--rule-soft); }
    .pdr-root .testi-head { margin-bottom: 56px; }
    .pdr-root .testi-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(40px, 5vw, 72px); line-height: 0.94; color: var(--ink); margin: 16px 0 0; letter-spacing: -0.018em; }
    .pdr-root .testi-head h2 em { font-style: normal; color: var(--blood); }
    .pdr-root .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .pdr-root .testi { padding: 32px 28px 28px; background: var(--paper-warm); border-top: 3px solid var(--blood); }
    .pdr-root .testi .q { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.5; color: var(--ink); margin: 0 0 28px; }
    .pdr-root .testi .who { display: flex; align-items: center; gap: 14px; border-top: 1px solid var(--rule-soft); padding-top: 18px; }
    .pdr-root .testi .av { width: 38px; height: 38px; background: var(--ink); color: var(--paper); font-family: var(--display); font-weight: 400; font-size: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .pdr-root .testi .nm { font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink); }
    .pdr-root .testi .role { font-family: var(--serif); font-style: italic; font-size: 13px; color: var(--ink-mute); }

    /* Pricing */
    .pdr-root .pricing { background: var(--ink); color: var(--paper); padding: 130px 0; position: relative; overflow: hidden; }
    .pdr-root .pricing::before { content: ""; position: absolute; top: -30%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(139,31,31,0.5), transparent 70%); pointer-events: none; }
    .pdr-root .pricing .wrap { position: relative; }
    .pdr-root .pricing-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .pdr-root .pricing-head .eyebrow { color: var(--blood-bright); display: flex; align-items: center; gap: 14px; }
    .pdr-root .pricing-head .eyebrow::after { content: ""; flex: 1; height: 1px; background: var(--blood-bright); max-width: 200px; opacity: 0.6; }
    .pdr-root .pricing-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 6vw, 92px); line-height: 0.94; margin: 18px 0 0; letter-spacing: -0.018em; color: var(--paper); }
    .pdr-root .pricing-head h2 .em { color: var(--blood-bright); display: block; }
    .pdr-root .price-card { background: var(--paper); color: var(--ink); display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--paper); }
    .pdr-root .price-left { padding: 40px 36px 44px; border-right: 1px solid var(--rule-soft); display: flex; flex-direction: column; justify-content: space-between; gap: 32px; }
    .pdr-root .price-left .badge { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); display: inline-flex; align-items: center; gap: 10px; margin-bottom: 18px; }
    .pdr-root .price-left .badge .dot { width: 8px; height: 8px; background: var(--blood); border-radius: 50%; }
    .pdr-root .price-left h3 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 36px; line-height: 0.96; color: var(--ink); margin: 0; letter-spacing: -0.012em; }
    .pdr-root .price-left h3 em { font-family: var(--serif); font-style: italic; font-weight: 400; text-transform: none; font-size: 18px; color: var(--blood); display: block; margin-top: 8px; letter-spacing: 0; }
    .pdr-root .product-meta .row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid var(--rule-soft); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .pdr-root .product-meta .row .v { color: var(--ink); font-family: var(--serif); font-style: italic; font-size: 14px; letter-spacing: 0; text-transform: none; }
    .pdr-root .price-right { padding: 40px 36px 44px; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
    .pdr-root .num-line { display: flex; align-items: center; gap: 14px; }
    .pdr-root .num-line .strike { font-family: var(--mono); font-size: 14px; color: var(--ink-mute); text-decoration: line-through; }
    .pdr-root .num-line .pill { background: var(--blood); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; padding: 6px 10px; font-weight: 500; }
    .pdr-root .price { font-family: var(--display); font-weight: 400; font-size: 132px; line-height: 0.86; color: var(--ink); letter-spacing: -0.025em; margin: 8px 0 0; }
    .pdr-root .price .cur { font-family: var(--mono); font-size: 22px; color: var(--blood); letter-spacing: 0; vertical-align: top; margin-right: 8px; font-weight: 500; }
    .pdr-root .pix-line { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-soft); }
    .pdr-root .btn-buy { display: flex; justify-content: space-between; align-items: center; background: var(--blood); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; padding: 22px 26px; text-decoration: none; transition: background .2s; }
    .pdr-root .btn-buy:hover { background: var(--ink); }
    .pdr-root .btn-buy .arrow { font-family: var(--display); font-size: 24px; letter-spacing: 0; }
    .pdr-root .micro { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); padding-top: 14px; border-top: 1px solid var(--rule-soft); }
    .pdr-root .guarantee { margin-top: 36px; background: var(--paper-warm); color: var(--ink); display: grid; grid-template-columns: auto 1fr; gap: 32px; align-items: center; padding: 28px 32px; border-left: 4px solid var(--blood); }
    .pdr-root .guarantee .g-num { font-family: var(--display); font-weight: 400; font-size: 96px; line-height: 0.85; color: var(--blood); letter-spacing: -0.03em; }
    .pdr-root .guarantee .k { font-family: var(--mono); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); margin-bottom: 6px; }
    .pdr-root .guarantee .v { font-family: var(--serif); font-size: 17px; line-height: 1.55; color: var(--ink); }
    .pdr-root .guarantee .v em { font-style: italic; }

    /* FAQ */
    .pdr-root .faq { background: var(--paper); padding: 130px 0; border-top: 1px solid var(--rule-soft); }
    .pdr-root .faq-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .pdr-root .faq-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(56px, 7vw, 120px); line-height: 0.9; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .pdr-root .faq-head h2 em { font-style: normal; color: var(--blood); display: block; }
    .pdr-root .faq-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .pdr-root .faq-head .copy strong { color: var(--blood); }
    .pdr-root .faq-list { border-top: 1.5px solid var(--ink); }
    .pdr-root .faq details { border-bottom: 1px solid var(--rule-soft); transition: background .2s; }
    .pdr-root .faq details[open] { background: var(--paper-warm); }
    .pdr-root .faq summary { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: baseline; padding: 26px 0; cursor: pointer; list-style: none; }
    .pdr-root .faq summary::-webkit-details-marker { display: none; }
    .pdr-root .faq summary .n { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.22em; color: var(--blood); }
    .pdr-root .faq summary em { font-family: var(--serif); font-style: italic; font-size: 22px; line-height: 1.35; color: var(--ink); font-weight: 400; }
    .pdr-root .faq summary .plus { font-family: var(--display); font-size: 28px; color: var(--blood); transition: transform .25s; }
    .pdr-root .faq details[open] .plus { transform: rotate(45deg); }
    .pdr-root .faq .a { padding: 0 0 28px 56px; font-family: var(--serif); font-size: 17px; line-height: 1.65; color: var(--ink-soft); max-width: 880px; }

    /* Final */
    .pdr-root .final { background: var(--ink); color: var(--paper); padding: 150px 0 160px; text-align: center; position: relative; overflow: hidden; }
    .pdr-root .final::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 1000px; height: 1000px; background: radial-gradient(circle, rgba(139,31,31,0.35), transparent 65%); pointer-events: none; }
    .pdr-root .final .wrap-narrow { position: relative; }
    .pdr-root .final .quote { font-family: var(--display); font-weight: 400; font-size: clamp(36px, 4.6vw, 72px); line-height: 1.06; text-transform: uppercase; color: var(--paper); margin: 0; letter-spacing: -0.012em; }
    .pdr-root .final .quote .blood { color: var(--blood-bright); }
    .pdr-root .final .quote em { font-family: var(--serif); font-style: italic; text-transform: none; color: var(--paper); font-weight: 400; letter-spacing: 0; }
    .pdr-root .final .sub { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.5; color: var(--paper); opacity: 0.8; margin: 40px auto 0; max-width: 600px; }
    .pdr-root .cta-row { margin-top: 56px; display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .pdr-root .btn-primary { background: var(--blood); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 32px; text-decoration: none; transition: background .2s; display: inline-flex; align-items: center; gap: 16px; }
    .pdr-root .btn-primary:hover { background: var(--blood-bright); }
    .pdr-root .btn-primary span { font-family: var(--display); font-size: 22px; letter-spacing: 0; }
    .pdr-root .btn-secondary { background: transparent; color: var(--paper); font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 28px; text-decoration: none; border: 1px solid rgba(241,236,221,0.3); transition: border-color .2s; }
    .pdr-root .btn-secondary:hover { border-color: var(--paper); }

    /* Footer */
    .pdr-root footer { background: var(--paper); color: var(--ink); padding: 0 0 32px; border-top: 1px solid var(--rule-soft); }
    .pdr-root .mega-mark { text-align: center; padding: 80px 0 60px; border-bottom: 1px solid var(--rule-soft); }
    .pdr-root .mega-mark .mark-inner { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(80px, 14vw, 220px); line-height: 0.85; color: var(--ink); letter-spacing: -0.025em; }
    .pdr-root .mega-mark .mark-inner em { font-style: normal; color: var(--blood); }
    .pdr-root .mega-mark .mark-foot { display: flex; justify-content: space-between; margin-top: 32px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-mute); }
    .pdr-root .mega-mark .mark-foot .dot { display: inline-block; width: 4px; height: 4px; background: var(--blood); border-radius: 50%; vertical-align: middle; margin: 0 6px; }
    .pdr-root .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; padding-top: 56px; }
    .pdr-root .footer-grid .col h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--blood); margin: 0 0 18px; font-weight: 600; }
    .pdr-root .footer-grid .col a, .pdr-root .footer-grid .col .dim { display: block; font-family: var(--serif); font-size: 15px; line-height: 1.55; color: var(--ink); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
    .pdr-root .footer-grid .col a:hover { color: var(--blood); }
    .pdr-root .footer-grid .col .dim { color: var(--ink-mute); }
    .pdr-root .footer-grid .brand-block .meta { font-family: var(--serif); font-style: italic; font-size: 17px; line-height: 1.4; color: var(--ink-soft); margin-top: 24px; border-left: 2px solid var(--blood); padding-left: 14px; max-width: 380px; }
    .pdr-root .footer-bottom { display: flex; justify-content: space-between; padding: 24px 0 0; margin-top: 40px; border-top: 1px solid var(--rule-soft); font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-mute); }

    /* Responsivo */
    @media (max-width: 980px) {
      .pdr-root .wrap { padding: 0 28px; }
      .pdr-root .hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 48px 28px 64px; }
      .pdr-root .hero-meta { grid-template-columns: 1fr 1fr; }
      .pdr-root .grid-marks, .pdr-root .grid-marks-r { display: none; }
      .pdr-root .promise-head, .pdr-root .audience-head, .pdr-root .pricing-head, .pdr-root .faq-head, .pdr-root .toc-sec .head { grid-template-columns: 1fr; gap: 24px; }
      .pdr-root .promise-cols, .pdr-root .audience-grid, .pdr-root .toc-grid, .pdr-root .testi-grid { grid-template-columns: 1fr; }
      .pdr-root .promise-cols .col.isnot { border-right: 0; border-bottom: 1px solid var(--ink); }
      .pdr-root .aud-card, .pdr-root .toc-card { border-right: 0; }
      .pdr-root .author-grid { grid-template-columns: 1fr; }
      .pdr-root .author-card { position: static; }
      .pdr-root .author-body .triangle { grid-template-columns: 1fr; }
      .pdr-root .author-body .triangle .cell { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
      .pdr-root .price-card { grid-template-columns: 1fr; }
      .pdr-root .price-left { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
      .pdr-root .footer-grid { grid-template-columns: 1fr 1fr; }
      .pdr-root .excerpt-grid { grid-template-columns: 1fr; gap: 40px; }
      .pdr-root .excerpt .meta { position: static; }
      .pdr-root .masthead-inner { grid-template-columns: 1fr; text-align: center; }
      .pdr-root .masthead-center, .pdr-root .masthead-right { justify-self: center; }
      .pdr-root .nav-inner { padding: 14px 28px; flex-direction: column; gap: 14px; }
      .pdr-root .nav-links { gap: 18px; flex-wrap: wrap; justify-content: center; }
      .pdr-root .footer-bottom { flex-direction: column; gap: 12px; }
      .pdr-root .cover-stack { max-width: 320px; margin: 0 auto; }
    }
  `

  return (
    <div className="pdr-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://api.fontshare.com" />
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
              <span>Volume 02 — O Preço da Relevância</span><span className="star">★</span>
              <span>Um manifesto sobre o colapso da identidade na era da atenção digital</span><span className="star">★</span>
              <span>10 capítulos · 10 perguntas · 281 páginas</span><span className="star">★</span>
              <span>Edição 2026 · São Paulo</span><span className="star">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── MASTHEAD ───────────────────────────────────────────── */}
      <header className="masthead">
        <div className="masthead-inner">
          <Link href="https://housemazzutti.com" className="masthead-brand" aria-label="House Mazzutti">
            <span className="hm-wordmark">
              <span className="row">HOUSE</span>
              <span className="row">MAZZUTTI<em>.</em></span>
            </span>
          </Link>
          <div className="masthead-center">
            <span className="hm-tag">Academy</span>
            <span className="hm-divider" />
            <span className="hm-tag">Volume 02 · MMXXVI</span>
          </div>
          <div className="masthead-right">
            <span className="hm-tag" style={{ color: 'var(--ink-mute)' }}>São Paulo · BR</span>
          </div>
        </div>
      </header>

      {/* ── NAV ────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand"><span className="pip" />O Preço da Relevância · Ebook</a>
          <div className="nav-links">
            <a href="#sumario">Sumário</a>
            <a href="#trecho">Trecho</a>
            <a href="#autor">O autor</a>
            <a href="#faq">Perguntas</a>
          </div>
          <a href="#comprar" className="nav-cta">Comprar ebook →</a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <header className="hero">
        <div className="grid-marks">1321 · 100<br />EPS · 100<br />16CUS</div>
        <div className="grid-marks-r">UN · LIVRO<br />BR · 2026<br />VOL · 02</div>

        <div className="hero-grid">
          <div className="hero-left">
            <div>
              <div className="hero-tag">
                <span className="dot" />{' '}House Mazzutti Academy · Vol. 02 · 2026
                <span className="ms" />
              </div>
              <h1 className="hero-headline">
                O Preço<br />
                <span className="da">DA</span><br />
                <span className="l2">Relevância.</span>
              </h1>
              <p className="hero-sub">
                <em>Um manifesto sobre o colapso da identidade na era da atenção digital.</em> Influenciadores, plataformas e a guerra silenciosa pela atenção — por quem fica do lado de quem paga.
              </p>
            </div>
            <div className="hero-meta">
              <div className="cell"><span className="k">Autor</span><span className="v">Ângelo Mazzutti</span></div>
              <div className="cell"><span className="k">Formato</span><span className="v">Ebook · PDF</span></div>
              <div className="cell"><span className="k">Capítulos</span><span className="v">10 + 10 perguntas</span></div>
              <div className="cell"><span className="k">Páginas</span><span className="v">281</span></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="cover-stack">
              <Image src={COVER} alt="Capa do livro O Preço da Relevância" fill sizes="(max-width: 980px) 320px, 460px" className="object-cover" style={{ border: '1px solid rgba(0,0,0,0.6)' }} />
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <span><span className="star">★</span> Relevância não é gratuita · quem aceita o jogo, aceita o preço</span>
          <span>Pré-venda aberta · Edição inaugural</span>
        </div>
      </header>

      {/* ── PULLBAND ───────────────────────────────────────────── */}
      <section className="pullband">
        <div className="wrap">
          <p className="quote">
            Algoritmo é o juiz de plantão.<br />
            <span className="em">Plataforma é o tribunal.</span>
          </p>
          <div className="strip" />
          <div className="attr">— Capítulo 07 · Ângelo Mazzutti</div>
        </div>
      </section>

      {/* ── PROMESSA ───────────────────────────────────────────── */}
      <section className="promise">
        <div className="wrap">
          <div className="promise-head">
            <h2>O que você<em>tem em mãos.</em></h2>
            <p className="lede">Esse não é um manual de carreira de creator. É um diagnóstico do sistema em que carreiras de influência são construídas, monetizadas, queimadas e descartadas. Escrito por quem está em reuniões onde se decide quem entra ou não em campanha.</p>
          </div>
          <div className="promise-cols">
            <div className="col isnot">
              <h3>Esse livro não é</h3>
              <ul>
                <li>Truque de algoritmo ou hack de engajamento</li>
                <li>Template de copy para Stories</li>
                <li>Discurso de motivação para começar</li>
                <li>Promessa de que o jogo é justo</li>
              </ul>
            </div>
            <div className="col is">
              <h3>Esse livro é</h3>
              <ul>
                <li>Um diagnóstico do mercado da atenção no Brasil em 2026</li>
                <li>A engenharia do eu — posicionamento, marca, estética</li>
                <li>Como as plataformas operam como árbitros invisíveis</li>
                <li>A informação que separa quem opera de quem é operado</li>
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
            <p className="desc"><em>Três lentes sobre o mercado da atenção. Dez capítulos. Dez páginas de Perguntas — não exercícios de motivação, verificações de coerência antes de seguir.</em></p>
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
            <span>+ <strong>Colofão</strong> · House Mazzutti Edições &nbsp;·&nbsp; p. 281</span>
            <span><strong>281</strong> páginas no total</span>
          </div>
        </div>
      </section>

      {/* ── TRECHO ─────────────────────────────────────────────── */}
      <section className="excerpt" id="trecho">
        <div className="excerpt-grid">
          <aside className="meta">
            <div className="label">Trecho · Introdução</div>
            <h3>O mercado<br />que ninguém chama<br />de mercado.</h3>
            <div className="from">Páginas 15 – 18 · primeira edição, 2026</div>
          </aside>
          <div className="excerpt-body">
            <p className="dropcap">Em janeiro de 2026, quando Lula sancionou a Lei nº 15.325 e regulamentou a profissão de "multimídia" no Brasil, a imprensa apelidou de Lei dos Influenciadores. A piada foi boa. A piada também esconde o que de fato aconteceu — o Estado, dois decretos depois das outras democracias, finalmente nomeou um mercado que já existia há quinze anos. O mercado da atenção.</p>
            <p>Não se chama assim. Quase nunca se chama assim. Os relatórios de mercado falam em "creator economy". Os investidores falam em "audience-driven business". As agências falam em "branded content". Todo mundo escolhe um eufemismo. Mas o que se vende é uma coisa só — o direito de ocupar três segundos do tempo de outra pessoa.</p>
            <p className="pullquote">Esse livro é sobre o preço desse direito.</p>
            <p>Há uns três anos descobri que estava ouvindo, em quase toda reunião comigo, uma versão da mesma frase: <em>"Eu tenho 80 mil seguidores, mas não consigo viver disso. O que estou fazendo de errado?"</em> Não importava quem dizia. A pergunta era a mesma. A resposta também — só que ninguém estava disposto a ouvir por inteiro. Porque a resposta inteira não é "poste mais", nem "melhore seu nicho", nem "engaje com sua audiência". A resposta inteira é que essa pessoa entrou num mercado <em>sem saber que era mercado</em>. Aceitou regras invisíveis. Vendeu atenção sem saber o preço da venda.</p>
            <p>Esse livro é a resposta inteira.</p>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM ──────────────────────────────────────────── */}
      <section className="audience">
        <div className="wrap">
          <div className="audience-head">
            <div>
              <div className="eyebrow">Para quem foi escrito</div>
              <h2>Esse livro <em>é pra você</em><br />se em algum momento…</h2>
            </div>
            <p className="copy">Foi escrito para um leitor específico, e ele preferiu não fingir. Se você se reconhece em pelo menos um destes cenários, esse livro foi feito pra encurtar muito do seu caminho.</p>
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
              <div className="label">O autor</div>
              <div className="nm">Ângelo<br /><em>Mazzutti.</em></div>
              <div className="role">Publicitário, estrategista de marca e diretor criativo da House Mazzutti — São Paulo.</div>
              <div className="meta-rows">
                <div className="row"><span>Atuação</span><span className="v">+20 anos</span></div>
                <div className="row"><span>Frentes</span><span className="v">Agência · Produtora · Studio</span></div>
                <div className="row"><span>Cidade</span><span className="v">São Paulo, Brasil</span></div>
                <div className="row"><span>Selo</span><span className="v">House Mazzutti Edições</span></div>
              </div>
            </aside>
            <div className="author-body">
              <h2>Quem te escreve <em>não é creator.</em><br />É quem fica do lado<br />de quem paga.</h2>
              <p>Construo marcas há mais de vinte anos. Publicitário de formação, estrategista por escolha, diretor criativo no dia a dia, sócio numa casa que assina projetos para grandes marcas e para pessoas que viraram marca.</p>
              <p>Convivo com creator todo dia. Estou em reuniões onde se decide se uma pessoa entra ou não entra em campanha. Vejo o lado de quem produz e o lado de quem paga. Esse livro foi escrito pelo lado de quem contrata — e pelo lado de quem dirige a narrativa — sobre como o lado de quem é contratado pode chegar com mais lucidez ao balcão.</p>
              <p>É o ângulo que falta no mercado. A maioria dos manuais sobre carreira de influenciador foi escrita por influenciadores. O que tem de valor neles é vivência. O que falta é perspectiva de fora.</p>
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

      {/* ── PRICING ────────────────────────────────────────────── */}
      <section className="pricing" id="comprar">
        <div className="wrap">
          <div className="pricing-head">
            <div>
              <div className="eyebrow">Edição de lançamento · Volume 02</div>
              <h2>Antes de aceitar<br />o próximo<br /><span className="em">contrato, vale ler.</span></h2>
            </div>
          </div>
          <div className="price-card">
            <div className="price-left">
              <div>
                <div className="badge"><span className="dot" /> Pré-venda aberta · vagas limitadas</div>
                <h3>O Preço da Relevância<em>Vol. 02 · 2026</em></h3>
              </div>
              <div className="product-meta">
                <div className="row"><span>Formato</span><span className="v">Ebook · PDF (alta)</span></div>
                <div className="row"><span>Páginas</span><span className="v">281</span></div>
                <div className="row"><span>Capítulos</span><span className="v">10 + 10 Perguntas</span></div>
                <div className="row"><span>Entrega</span><span className="v">Imediata após o pix</span></div>
                <div className="row"><span>Atualizações</span><span className="v">Vitalícias na v.1</span></div>
              </div>
            </div>
            <div className="price-right">
              <div className="num-line">
                <span className="strike">de R$ 227</span>
                <span className="pill">−42% lançamento</span>
              </div>
              <div className="price"><span className="cur">R$</span>137</div>
              <div className="pix-line"><em>ou 12× de R$ 14,40 no cartão · pix com 5% off</em></div>
              <div>
                <a href={CHECKOUT_URL} className="btn-buy">Quero o ebook agora <span className="arrow">→</span></a>
              </div>
              <div className="micro">
                <span>Pagamento seguro</span>
                <span>Acesso vitalício</span>
                <span>Garantia 7 dias</span>
              </div>
            </div>
          </div>
          <div className="guarantee">
            <div className="g-num">7</div>
            <div className="g-body">
              <div className="k">Garantia incondicional</div>
              <div className="v"><em>Sete dias para ler, testar nas suas decisões e desistir.</em> Se não fizer sentido pra você, devolvemos cem por cento — sem perguntar nada.</div>
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
            Relevância <span className="blood">não é gratuita.</span><br />
            <em>Quem aceita o jogo,</em><br />
            aceita o <span className="blood">preço.</span>
          </p>
          <p className="sub">Esse livro nomeia o acordo silencioso entre o influenciador e o sistema. Antes do próximo contrato, antes do próximo lançamento, antes da próxima decisão de posicionamento.</p>
          <div className="cta-row">
            <a href="#comprar" className="btn-primary">Garantir meu exemplar <span>→</span></a>
            <a href="#sumario" className="btn-secondary">Ver o sumário completo</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer>
        <div className="mega-mark">
          <div className="mark-inner">
            <span className="l">HOUSE MAZZUTTI<em>.</em></span>
          </div>
          <div className="wrap mark-foot">
            <span>Academy</span>
            <span>Vol. 02 <span className="dot" /> 2026 <span className="dot" /> São Paulo</span>
            <span>Edições</span>
          </div>
        </div>
        <div className="wrap">
          <div className="footer-grid">
            <div className="brand-block col">
              <h4>O selo</h4>
              <span className="dim" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, letterSpacing: 0 }}>House Mazzutti Edições — selo editorial da House Mazzutti, dirigido por Ângelo Mazzutti.</span>
              <p className="meta">Relevância não é gratuita.<br />Quem aceita o jogo, aceita o preço.</p>
            </div>
            <div className="col">
              <h4>Catálogo</h4>
              <Link href="/pt/academy/marketing-para-modelos">Vol. 01 · Marketing para Modelos</Link>
              <a href="#sumario">Vol. 02 · O Preço da Relevância</a>
              <span className="dim">Vol. 03 · em breve</span>
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
      </footer>
    </div>
  )
}
