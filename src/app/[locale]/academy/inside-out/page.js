/**
 * Landing · Inside Out: Masterclass On-demand
 * House Mazzutti Academy · 2026
 *
 * Sistema visual idêntico ao das outras landings do Academy (O Preço da
 * Relevância, Marketing para Modelos) — paleta --paper / --blood / --ink,
 * tipografia Anton + Source Serif 4 + JetBrains Mono.
 */
import React from 'react'
import SiteFooterLinks from '@/app/components/SiteFooterLinks'
import Link from 'next/link'

const SITE_URL = 'https://housemazzutti.com'
const CHECKOUT_URL = '/checkout/inside-out'
const OG_IMAGE = `${SITE_URL}/images/academy/inside-out/cover-og.webp`

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Inside Out · Masterclass On-demand · House Mazzutti Academy',
  description:
    'A imersão completa do workshop Inside Out agora em vídeo on-demand. Direção criativa, posicionamento de marca e identidade visual — do processo interno à entrega final. Por Ângelo Mazzutti.',
  keywords: [
    'inside out masterclass',
    'direção criativa',
    'posicionamento de marca',
    'identidade visual',
    'House Mazzutti Academy',
    'Ângelo Mazzutti',
    'curso online de branding',
  ],
  authors: [{ name: 'Ângelo Mazzutti', url: SITE_URL }],
  creator: 'Ângelo Mazzutti',
  publisher: 'House Mazzutti Academy',
  alternates: { canonical: `${SITE_URL}/pt/academy/inside-out` },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${SITE_URL}/pt/academy/inside-out`,
    siteName: 'House Mazzutti Academy',
    title: 'Inside Out · Masterclass On-demand',
    description:
      'A imersão completa em vídeo. Direção criativa e posicionamento de marca do processo interno à entrega final.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Inside Out — Masterclass On-demand · House Mazzutti Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inside Out · Masterclass On-demand',
    images: [OG_IMAGE],
  },
}

/* ─── módulos da masterclass ────────────────────────────────────── */
const MODULES = [
  {
    num: '01',
    title: 'O processo antes do processo',
    sub: 'Como a direção criativa começa antes de qualquer briefing',
    tag: 'Fundação',
    duration: '—',
  },
  {
    num: '02',
    title: 'Identidade como sistema',
    sub: 'Os elementos que transformam preferência estética em linguagem de marca',
    tag: 'Identidade',
    duration: '—',
  },
  {
    num: '03',
    title: 'Posicionamento que resiste',
    sub: 'A diferença entre discurso de marca e decisão de marca — e por que importa',
    tag: 'Posicionamento',
    duration: '—',
  },
  {
    num: '04',
    title: 'Da concepção à entrega',
    sub: 'O percurso interno de um projeto criativo real — do inside ao out',
    tag: 'Processo',
    duration: '—',
  },
  {
    num: '05',
    title: 'Referência, não imitação',
    sub: 'Como absorver o mercado sem se tornar derivativo',
    tag: 'Repertório',
    duration: '—',
  },
  {
    num: '06',
    title: 'Apresentação e defesa criativa',
    sub: 'Vender a ideia sem trair a ideia — e saber quando ceder',
    tag: 'Entrega',
    duration: '—',
  },
]

const AUDIENCE = [
  {
    n: '01',
    ttl: 'Diretores criativos e designers que querem formalizar o próprio processo.',
    d: 'A masterclass nomeia o que muita gente opera por instinto — e dá estrutura replicável para projetos futuros.',
  },
  {
    n: '02',
    ttl: 'Profissionais de branding que buscam profundidade além do toolkit padrão.',
    d: 'Não é curso de software nem de tendência. É sobre decisão criativa — o que vai antes de qualquer execução.',
  },
  {
    n: '03',
    ttl: 'Fundadores e gestores que tomam decisões de identidade de marca.',
    d: 'Entender o processo criativo pelo lado de quem cria muda a qualidade das perguntas — e das aprovações.',
  },
  {
    n: '04',
    ttl: 'Quem participou do workshop presencial e quer revisitar o conteúdo.',
    d: 'A íntegra. Assista quantas vezes quiser, no módulo que precisar, quando precisar.',
  },
]

const FAQS = [
  {
    n: '01',
    q: 'É a gravação do workshop presencial?',
    a: 'Sim — e mais. É a íntegra do Inside Out gravada com qualidade de produção. O conteúdo é o mesmo da imersão presencial; o formato on-demand te dá o que o presencial não dava: a possibilidade de pausar, rever e assistir no ritmo certo pra você.',
  },
  {
    n: '02',
    q: 'Preciso ter experiência prévia em direção criativa ou branding?',
    a: 'A masterclass foi desenhada para quem já trabalha com criação, branding ou comunicação de marca — não é introdução ao tema. Se você já opera nesse universo e quer profundidade, está no lugar certo.',
  },
  {
    n: '03',
    q: 'Como funciona o acesso após a compra?',
    a: 'Imediatamente após a confirmação do pagamento você recebe por e-mail o link de acesso ao conteúdo em vídeo. O acesso é vitalício — sem prazo de expiração, sem limite de visualizações.',
  },
  {
    n: '04',
    q: 'Tem certificado?',
    a: 'Sim. Ao concluir os módulos você pode solicitar o certificado de conclusão da House Mazzutti Academy pelo e-mail academy@housemazzutti.com.',
  },
  {
    n: '05',
    q: 'E se eu não gostar?',
    a: 'Sete dias de garantia incondicional. Escreve pra academy@housemazzutti.com dizendo apenas que não foi pra você — devolvemos o valor integral, sem pergunta, sem formulário.',
  },
]

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function InsideOutPage() {
  const css = `
    .io-root {
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
    .io-root *, .io-root *::before, .io-root *::after { box-sizing: border-box; }
    .io-root a { color: inherit; }
    .io-root img { display: block; max-width: 100%; }
    .io-root .wrap { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
    .io-root .wrap-narrow { max-width: 880px; margin: 0 auto; padding: 0 32px; }

    /* Typography */
    .io-root .eyebrow { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); }

    /* Ticker */
    .io-root .ticker { background: var(--ink); color: var(--paper); overflow: hidden; }
    .io-root .ticker-track { display: flex; gap: 56px; white-space: nowrap; padding: 12px 0; font-family: var(--mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; animation: io-marquee 48s linear infinite; width: max-content; }
    .io-root .ticker-track span { opacity: 0.78; }
    .io-root .ticker-track .star { color: var(--blood-bright); opacity: 1; }
    @keyframes io-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* Masthead */
    .io-root .masthead { background: var(--paper); border-bottom: 1px solid var(--ink); padding: 22px 0 18px; }
    .io-root .masthead-inner { max-width: 1440px; margin: 0 auto; padding: 0 48px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; }
    .io-root .masthead-brand { text-decoration: none; color: var(--ink); font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 22px; letter-spacing: -0.01em; }
    .io-root .masthead-tag { font-family: var(--mono); font-weight: 500; font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; }
    .io-root .masthead-center { display: flex; align-items: center; gap: 18px; justify-self: center; }
    .io-root .hm-divider { width: 1px; height: 14px; background: var(--ink); opacity: 0.4; }

    /* Nav */
    .io-root .nav { position: sticky; top: 0; z-index: 50; background: rgba(241,236,221,0.94); border-bottom: 1px solid var(--rule-soft); backdrop-filter: blur(8px); }
    .io-root .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 48px; max-width: 1440px; margin: 0 auto; }
    .io-root .nav-brand { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); display: flex; align-items: center; gap: 14px; text-decoration: none; }
    .io-root .nav-brand .pip { width: 7px; height: 7px; background: var(--blood); display: inline-block; }
    .io-root .nav-links { display: flex; align-items: center; gap: 30px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .io-root .nav-links a { color: inherit; text-decoration: none; transition: color .2s; }
    .io-root .nav-links a:hover { color: var(--blood); }
    .io-root .nav-cta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--paper); background: var(--blood); padding: 10px 18px; text-decoration: none; transition: background .2s; font-weight: 500; }
    .io-root .nav-cta:hover { background: var(--ink); }

    /* Hero */
    .io-root .hero { background: var(--ink); color: var(--paper); position: relative; overflow: hidden; min-height: 90vh; }
    .io-root .hero::before { content: ""; position: absolute; top: -20%; right: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(139,31,31,0.45), transparent 70%); pointer-events: none; }
    .io-root .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center; padding: 80px 56px 96px; max-width: 1440px; margin: 0 auto; position: relative; }
    .io-root .hero-left { display: flex; flex-direction: column; gap: 36px; }
    .io-root .hero-tag { display: flex; align-items: center; gap: 14px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); opacity: 0.7; }
    .io-root .hero-tag .dot { width: 8px; height: 8px; background: var(--blood-bright); flex-shrink: 0; }
    .io-root .hero-headline { font-family: var(--display); font-weight: 400; font-size: clamp(72px, 11vw, 180px); line-height: 0.85; letter-spacing: -0.02em; text-transform: uppercase; color: var(--paper); margin: 0; }
    .io-root .hero-headline .out { color: var(--blood-bright); display: block; }
    .io-root .hero-sub { font-family: var(--serif); font-style: italic; font-size: clamp(19px, 1.8vw, 28px); line-height: 1.35; color: var(--paper); opacity: 0.85; border-left: 2px solid var(--blood-bright); padding-left: 18px; max-width: 560px; }
    .io-root .hero-badges { display: flex; flex-wrap: wrap; gap: 12px; }
    .io-root .badge-pill { font-family: var(--mono); font-size: 10px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--paper); border: 1px solid rgba(241,236,221,0.3); padding: 8px 14px; }
    .io-root .hero-right { display: flex; align-items: center; justify-content: center; }
    .io-root .hero-screen { width: 100%; max-width: 520px; aspect-ratio: 16/10; background: rgba(255,255,255,0.04); border: 1px solid rgba(241,236,221,0.14); position: relative; display: flex; align-items: center; justify-content: center; }
    .io-root .play-btn { width: 72px; height: 72px; background: var(--blood); display: flex; align-items: center; justify-content: center; cursor: default; }
    .io-root .play-btn svg { width: 28px; height: 28px; fill: var(--paper); margin-left: 4px; }
    .io-root .screen-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 16px; background: rgba(15,12,10,0.7); font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--paper); opacity: 0.7; }
    .io-root .hero-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1px solid rgba(241,236,221,0.18); padding-top: 32px; }
    .io-root .hero-meta .cell { padding-right: 24px; border-right: 1px solid rgba(241,236,221,0.14); }
    .io-root .hero-meta .cell:last-child { border-right: 0; padding-right: 0; padding-left: 24px; }
    .io-root .hero-meta .cell .k { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); opacity: 0.5; display: block; margin-bottom: 6px; }
    .io-root .hero-meta .cell .v { font-family: var(--serif); font-style: italic; font-size: 18px; line-height: 1.1; color: var(--paper); }

    /* Pull */
    .io-root .pullband { background: var(--blood-deep); color: var(--paper); padding: 110px 0 100px; text-align: center; position: relative; overflow: hidden; }
    .io-root .pullband::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,0,0,0.35), transparent 70%); pointer-events: none; }
    .io-root .pullband .wrap { position: relative; }
    .io-root .pullband .quote { font-family: var(--display); font-weight: 400; font-size: clamp(40px, 5.6vw, 96px); line-height: 0.96; letter-spacing: -0.014em; text-transform: uppercase; color: var(--paper); margin: 0 auto; max-width: 1100px; }
    .io-root .pullband .quote .em { color: rgba(241,236,221,0.55); display: block; }
    .io-root .pullband .attr { margin-top: 36px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); opacity: 0.55; }
    .io-root .pullband .strip { width: 60px; height: 2px; background: rgba(241,236,221,0.4); margin: 24px auto 0; }

    /* Modules */
    .io-root .modules { background: var(--paper); padding: 120px 0 130px; }
    .io-root .modules-head { display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px; margin-bottom: 64px; align-items: end; }
    .io-root .modules-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(52px, 7vw, 112px); line-height: 0.9; letter-spacing: -0.018em; color: var(--ink); margin: 0; }
    .io-root .modules-head h2 em { font-style: normal; color: var(--blood); display: block; }
    .io-root .modules-head .lede { font-family: var(--serif); font-size: 19px; line-height: 1.6; color: var(--ink-soft); border-left: 2px solid var(--blood); padding-left: 18px; }
    .io-root .mod-list { border-top: 1.5px solid var(--ink); }
    .io-root .mod-item { display: grid; grid-template-columns: 80px 1fr auto; gap: 32px; align-items: center; padding: 32px 0; border-bottom: 1px solid var(--rule-soft); transition: background .2s; }
    .io-root .mod-item:hover { background: var(--paper-warm); margin: 0 -24px; padding: 32px 24px; }
    .io-root .mod-num { font-family: var(--display); font-weight: 400; font-size: 52px; line-height: 0.9; color: var(--blood); letter-spacing: -0.02em; }
    .io-root .mod-body .tag { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); margin-bottom: 8px; }
    .io-root .mod-body .title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 26px; line-height: 1.0; color: var(--ink); letter-spacing: -0.01em; margin-bottom: 8px; }
    .io-root .mod-body .sub { font-family: var(--serif); font-style: italic; font-size: 16px; line-height: 1.45; color: var(--ink-mute); }
    .io-root .mod-dur { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); white-space: nowrap; }

    /* Audience */
    .io-root .audience { background: var(--paper-warm); padding: 120px 0 130px; }
    .io-root .audience-head { display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px; align-items: end; margin-bottom: 56px; }
    .io-root .audience-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(44px, 5.4vw, 80px); line-height: 0.94; letter-spacing: -0.018em; color: var(--ink); margin: 18px 0 0; }
    .io-root .audience-head h2 em { font-style: normal; color: var(--blood); }
    .io-root .audience-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .io-root .audience-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border-top: 1.5px solid var(--ink); }
    .io-root .aud-card { padding: 36px 32px 40px; border-right: 1px solid var(--rule-soft); border-bottom: 1px solid var(--rule-soft); }
    .io-root .aud-card:nth-child(2n) { border-right: 0; }
    .io-root .aud-card .num { font-family: var(--display); font-weight: 400; font-size: 38px; color: var(--blood); line-height: 1; letter-spacing: -0.02em; margin-bottom: 18px; }
    .io-root .aud-card .ttl { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 20px; line-height: 1.05; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.005em; }
    .io-root .aud-card .d { font-family: var(--serif); font-size: 15px; line-height: 1.55; color: var(--ink-soft); }

    /* Author */
    .io-root .author { background: var(--paper); padding: 130px 0; border-top: 1px solid var(--rule-soft); }
    .io-root .author-grid { display: grid; grid-template-columns: 0.85fr 1.4fr; gap: 64px; align-items: start; }
    .io-root .author-card { background: var(--ink); color: var(--paper); padding: 36px 32px 40px; position: sticky; top: 100px; }
    .io-root .author-card .blood-strip { height: 4px; background: var(--blood); margin-bottom: 32px; }
    .io-root .author-card .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--blood-bright); margin-bottom: 14px; }
    .io-root .author-card .nm { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 52px; line-height: 0.92; color: var(--paper); margin-bottom: 18px; letter-spacing: -0.018em; }
    .io-root .author-card .nm em { font-style: normal; color: var(--blood-bright); display: block; }
    .io-root .author-card .role { font-family: var(--serif); font-style: italic; font-size: 15px; line-height: 1.45; color: var(--paper); opacity: 0.8; margin-bottom: 28px; }
    .io-root .author-card .meta-rows { border-top: 1px solid rgba(241,236,221,0.18); }
    .io-root .author-card .meta-rows .row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid rgba(241,236,221,0.18); font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; }
    .io-root .author-card .meta-rows .row span:first-child { color: var(--paper); opacity: 0.55; }
    .io-root .author-card .meta-rows .row .v { color: var(--paper); font-family: var(--serif); font-style: italic; font-size: 13px; letter-spacing: 0; text-transform: none; }
    .io-root .author-body h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(40px, 5.2vw, 78px); line-height: 0.94; color: var(--ink); margin: 0 0 32px; letter-spacing: -0.018em; }
    .io-root .author-body h2 em { font-style: normal; color: var(--blood); }
    .io-root .author-body p { font-family: var(--serif); font-size: 18px; line-height: 1.65; color: var(--ink-soft); margin: 0 0 1.2em; }
    .io-root .author-body .signature { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 28px; color: var(--blood); margin-top: 32px; letter-spacing: -0.01em; }

    /* Pricing */
    .io-root .pricing { background: var(--ink); color: var(--paper); padding: 130px 0; position: relative; overflow: hidden; }
    .io-root .pricing::before { content: ""; position: absolute; top: -20%; right: -8%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(139,31,31,0.5), transparent 70%); pointer-events: none; }
    .io-root .pricing .wrap { position: relative; }
    .io-root .pricing-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .io-root .pricing-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 6vw, 92px); line-height: 0.94; margin: 18px 0 0; letter-spacing: -0.018em; color: var(--paper); }
    .io-root .pricing-head h2 .em { color: var(--blood-bright); display: block; }
    .io-root .price-card { background: var(--paper); color: var(--ink); display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
    .io-root .price-left { padding: 40px 36px 44px; border-right: 1px solid var(--rule-soft); display: flex; flex-direction: column; justify-content: space-between; gap: 32px; }
    .io-root .price-left .badge { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); display: inline-flex; align-items: center; gap: 10px; margin-bottom: 18px; }
    .io-root .price-left .badge .dot { width: 8px; height: 8px; background: var(--blood); border-radius: 50%; }
    .io-root .price-left h3 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 34px; line-height: 0.96; color: var(--ink); margin: 0; letter-spacing: -0.012em; }
    .io-root .price-left h3 em { font-family: var(--serif); font-style: italic; font-weight: 400; text-transform: none; font-size: 17px; color: var(--blood); display: block; margin-top: 8px; letter-spacing: 0; }
    .io-root .product-meta .row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid var(--rule-soft); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .io-root .product-meta .row .v { color: var(--ink); font-family: var(--serif); font-style: italic; font-size: 14px; letter-spacing: 0; text-transform: none; }
    .io-root .price-right { padding: 40px 36px 44px; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
    .io-root .num-line { display: flex; align-items: center; gap: 14px; }
    .io-root .num-line .pill { background: var(--blood); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; padding: 6px 10px; font-weight: 500; }
    .io-root .price { font-family: var(--display); font-weight: 400; font-size: 120px; line-height: 0.86; color: var(--ink); letter-spacing: -0.025em; margin: 8px 0 0; }
    .io-root .price .cur { font-family: var(--mono); font-size: 20px; color: var(--blood); letter-spacing: 0; vertical-align: top; margin-right: 6px; font-weight: 500; }
    .io-root .pix-line { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-soft); }
    .io-root .btn-buy { display: flex; justify-content: space-between; align-items: center; background: var(--blood); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; padding: 22px 26px; text-decoration: none; transition: background .2s; }
    .io-root .btn-buy:hover { background: var(--ink); }
    .io-root .btn-buy .arrow { font-family: var(--display); font-size: 24px; letter-spacing: 0; }
    .io-root .micro { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); padding-top: 14px; border-top: 1px solid var(--rule-soft); }
    .io-root .guarantee { margin-top: 36px; background: var(--paper-warm); color: var(--ink); display: grid; grid-template-columns: auto 1fr; gap: 32px; align-items: center; padding: 28px 32px; border-left: 4px solid var(--blood); }
    .io-root .guarantee .g-num { font-family: var(--display); font-weight: 400; font-size: 96px; line-height: 0.85; color: var(--blood); letter-spacing: -0.03em; }
    .io-root .guarantee .k { font-family: var(--mono); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--blood); margin-bottom: 6px; }
    .io-root .guarantee .v { font-family: var(--serif); font-size: 17px; line-height: 1.55; color: var(--ink); }
    .io-root .guarantee .v em { font-style: italic; }

    /* FAQ */
    .io-root .faq { background: var(--paper); padding: 130px 0; border-top: 1px solid var(--rule-soft); }
    .io-root .faq-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .io-root .faq-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(56px, 7vw, 120px); line-height: 0.9; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .io-root .faq-head h2 em { font-style: normal; color: var(--blood); display: block; }
    .io-root .faq-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .io-root .faq-head .copy strong { color: var(--blood); }
    .io-root .faq-list { border-top: 1.5px solid var(--ink); }
    .io-root .faq details { border-bottom: 1px solid var(--rule-soft); }
    .io-root .faq details[open] { background: var(--paper-warm); }
    .io-root .faq summary { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: baseline; padding: 26px 0; cursor: pointer; list-style: none; }
    .io-root .faq summary::-webkit-details-marker { display: none; }
    .io-root .faq summary .n { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.22em; color: var(--blood); }
    .io-root .faq summary em { font-family: var(--serif); font-style: italic; font-size: 22px; line-height: 1.35; color: var(--ink); font-weight: 400; }
    .io-root .faq summary .plus { font-family: var(--display); font-size: 28px; color: var(--blood); transition: transform .25s; }
    .io-root .faq details[open] .plus { transform: rotate(45deg); }
    .io-root .faq .a { padding: 0 0 28px 56px; font-family: var(--serif); font-size: 17px; line-height: 1.65; color: var(--ink-soft); max-width: 880px; }

    /* Final CTA */
    .io-root .final { background: var(--ink); color: var(--paper); padding: 150px 0 160px; text-align: center; position: relative; overflow: hidden; }
    .io-root .final::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 900px; height: 900px; background: radial-gradient(circle, rgba(139,31,31,0.32), transparent 65%); pointer-events: none; }
    .io-root .final .wrap-narrow { position: relative; }
    .io-root .final .quote { font-family: var(--display); font-weight: 400; font-size: clamp(36px, 4.6vw, 72px); line-height: 1.06; text-transform: uppercase; color: var(--paper); margin: 0; letter-spacing: -0.012em; }
    .io-root .final .quote .blood { color: var(--blood-bright); }
    .io-root .final .quote em { font-family: var(--serif); font-style: italic; text-transform: none; color: var(--paper); font-weight: 400; letter-spacing: 0; }
    .io-root .final .sub { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.5; color: var(--paper); opacity: 0.8; margin: 40px auto 0; max-width: 600px; }
    .io-root .cta-row { margin-top: 56px; display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .io-root .btn-primary { background: var(--blood); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 32px; text-decoration: none; transition: background .2s; display: inline-flex; align-items: center; gap: 16px; }
    .io-root .btn-primary:hover { background: var(--blood-bright); }
    .io-root .btn-primary span { font-family: var(--display); font-size: 22px; letter-spacing: 0; }
    .io-root .btn-secondary { background: transparent; color: var(--paper); font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 28px; text-decoration: none; border: 1px solid rgba(241,236,221,0.3); transition: border-color .2s; }
    .io-root .btn-secondary:hover { border-color: var(--paper); }

    /* Footer */
    .io-root footer { background: var(--paper); color: var(--ink); padding: 0 0 32px; border-top: 1px solid var(--rule-soft); }
    .io-root .mega-mark { text-align: center; padding: 80px 0 60px; border-bottom: 1px solid var(--rule-soft); }
    .io-root .mega-mark .mark-inner { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(80px, 14vw, 220px); line-height: 0.85; color: var(--ink); letter-spacing: -0.025em; }
    .io-root .mega-mark .mark-inner em { font-style: normal; color: var(--blood); }
    .io-root .mega-mark .mark-foot { display: flex; justify-content: space-between; margin-top: 32px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-mute); }
    .io-root .mega-mark .mark-foot .dot { display: inline-block; width: 4px; height: 4px; background: var(--blood); border-radius: 50%; vertical-align: middle; margin: 0 6px; }
    .io-root .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; padding-top: 56px; }
    .io-root .footer-grid .col h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--blood); margin: 0 0 18px; font-weight: 600; }
    .io-root .footer-grid .col a, .io-root .footer-grid .col .dim { display: block; font-family: var(--serif); font-size: 15px; line-height: 1.55; color: var(--ink); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
    .io-root .footer-grid .col a:hover { color: var(--blood); }
    .io-root .footer-grid .col .dim { color: var(--ink-mute); }
    .io-root .footer-grid .brand-block .meta { font-family: var(--serif); font-style: italic; font-size: 17px; line-height: 1.4; color: var(--ink-soft); margin-top: 24px; border-left: 2px solid var(--blood); padding-left: 14px; max-width: 380px; }
    .io-root .footer-bottom { display: flex; justify-content: space-between; padding: 24px 0 0; margin-top: 40px; border-top: 1px solid var(--rule-soft); font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-mute); }

    /* Responsive */
    @media (max-width: 980px) {
      .io-root .wrap { padding: 0 28px; }
      .io-root .hero-grid { grid-template-columns: 1fr; padding: 52px 28px 72px; }
      .io-root .hero-meta { grid-template-columns: 1fr 1fr; gap: 16px; }
      .io-root .hero-meta .cell { border-right: 0; padding: 0; }
      .io-root .modules-head, .io-root .audience-head, .io-root .pricing-head, .io-root .faq-head { grid-template-columns: 1fr; gap: 24px; }
      .io-root .mod-item { grid-template-columns: 60px 1fr; }
      .io-root .mod-dur { display: none; }
      .io-root .audience-grid { grid-template-columns: 1fr; }
      .io-root .aud-card { border-right: 0; }
      .io-root .author-grid { grid-template-columns: 1fr; }
      .io-root .author-card { position: static; }
      .io-root .price-card { grid-template-columns: 1fr; }
      .io-root .price-left { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
      .io-root .footer-grid { grid-template-columns: 1fr 1fr; }
      .io-root .masthead-inner { grid-template-columns: 1fr; text-align: center; }
      .io-root .masthead-center { justify-self: center; }
      .io-root .nav-inner { padding: 14px 28px; flex-direction: column; gap: 14px; }
      .io-root .nav-links { gap: 18px; flex-wrap: wrap; justify-content: center; }
      .io-root .footer-bottom { flex-direction: column; gap: 12px; }
    }
  `

  return (
    <div className="io-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,300;1,8..60,400;1,8..60,500&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      {/* ── TICKER ─────────────────────────────────────────────── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span>House Mazzutti Academy</span><span className="star">★</span>
              <span>Inside Out · Masterclass On-demand</span><span className="star">★</span>
              <span>Direção criativa do processo interno à entrega final</span><span className="star">★</span>
              <span>Acesso vitalício · assista no seu ritmo</span><span className="star">★</span>
              <span>São Paulo · 2026</span><span className="star">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── MASTHEAD ───────────────────────────────────────────── */}
      <header className="masthead">
        <div className="masthead-inner">
          <Link href="https://housemazzutti.com" className="masthead-brand" aria-label="House Mazzutti">
            House Mazzutti
          </Link>
          <div className="masthead-center">
            <span className="masthead-tag">Academy</span>
            <span className="hm-divider" />
            <span className="masthead-tag">Masterclass · MMXXVI</span>
          </div>
          <div />
        </div>
      </header>

      {/* ── NAV ────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand"><span className="pip" />Inside Out · Masterclass</a>
          <div className="nav-links">
            <a href="#modulos">Módulos</a>
            <a href="#para-quem">Para quem</a>
            <a href="#autor">O autor</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#comprar" className="nav-cta">Garantir acesso →</a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-tag">
              <span className="dot" />
              House Mazzutti Academy · Masterclass On-demand · 2026
            </div>
            <div>
              <h1 className="hero-headline">
                Inside<br />
                <span className="out">Out.</span>
              </h1>
              <p className="hero-sub">
                <em>Do processo criativo interno à entrega final.</em> A imersão completa em vídeo — direção criativa, posicionamento de marca e identidade como sistema, agora disponível pra assistir no seu ritmo, quando quiser, quantas vezes precisar.
              </p>
            </div>
            <div className="hero-badges">
              <span className="badge-pill">Acesso vitalício</span>
              <span className="badge-pill">6 módulos</span>
              <span className="badge-pill">Certificado incluso</span>
              <span className="badge-pill">Garantia 7 dias</span>
            </div>
            <div className="hero-meta">
              <div className="cell"><span className="k">Instrutor</span><span className="v">Ângelo Mazzutti</span></div>
              <div className="cell"><span className="k">Formato</span><span className="v">Vídeo on-demand</span></div>
              <div className="cell"><span className="k">Módulos</span><span className="v">6</span></div>
              <div className="cell"><span className="k">Acesso</span><span className="v">Vitalício</span></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-screen">
              <div className="play-btn" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="screen-label">Inside Out · Masterclass On-demand · House Mazzutti Academy</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── PULLBAND ───────────────────────────────────────────── */}
      <section className="pullband">
        <div className="wrap">
          <p className="quote">
            O processo criativo não começa<br />
            <span className="em">no briefing. Começa antes.</span>
          </p>
          <div className="strip" />
          <div className="attr">— Inside Out · Ângelo Mazzutti</div>
        </div>
      </section>

      {/* ── MÓDULOS ────────────────────────────────────────────── */}
      <section className="modules" id="modulos">
        <div className="wrap">
          <div className="modules-head">
            <h2>O que você<em>vai ver.</em></h2>
            <p className="lede">Seis módulos que percorrem o processo criativo de dentro pra fora — da decisão interna que ninguém vê até a entrega que o cliente aprova. Não é teoria de manual: é o processo real, destrinchado ao vivo.</p>
          </div>
          <div className="mod-list">
            {MODULES.map((m) => (
              <article className="mod-item" key={m.num}>
                <div className="mod-num">{m.num}<span style={{ color: 'var(--blood)' }}>.</span></div>
                <div className="mod-body">
                  <div className="tag">{m.tag}</div>
                  <div className="title">{m.title}</div>
                  <div className="sub">{m.sub}</div>
                </div>
                <div className="mod-dur">{m.duration}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUEM ──────────────────────────────────────────── */}
      <section className="audience" id="para-quem">
        <div className="wrap">
          <div className="audience-head">
            <div>
              <div className="eyebrow">Para quem foi feito</div>
              <h2>Essa masterclass<em>é pra você</em></h2>
            </div>
            <p className="copy">Foi desenhada pra quem já opera no universo criativo e quer profundidade — não introdução. Se você se reconhece em algum destes perfis, o conteúdo foi feito pra você.</p>
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
              <div className="label">O instrutor</div>
              <div className="nm">Ângelo<br /><em>Mazzutti.</em></div>
              <div className="role">Publicitário, estrategista de marca e diretor criativo da House Mazzutti — São Paulo. Mais de 20 anos construindo marcas por dentro e por fora.</div>
              <div className="meta-rows">
                <div className="row"><span>Atuação</span><span className="v">+20 anos</span></div>
                <div className="row"><span>Frentes</span><span className="v">Agência · Produtora · Studio</span></div>
                <div className="row"><span>Cidade</span><span className="v">São Paulo, Brasil</span></div>
                <div className="row"><span>Formação</span><span className="v">Publicidade e Propaganda</span></div>
              </div>
            </aside>
            <div className="author-body">
              <h2>Quem conduz a imersão<em>não ensina teoria.</em><br />Opera o processo<br />todo dia.</h2>
              <p>Construo marcas há mais de vinte anos. Estrategista de formação, diretor criativo na prática, sócio numa casa que assina projetos para grandes marcas e para pessoas que viraram marca.</p>
              <p>O Inside Out nasceu de uma pergunta que aparecia em quase toda conversa com profissionais de criação: <em>como você decide o que decide?</em> Não a execução — o processo anterior à execução. A lógica interna que produz escolhas criativas sustentáveis.</p>
              <p>Essa masterclass é a resposta que dei ao vivo. Agora disponível para você assistir no seu ritmo — e voltar quantas vezes precisar.</p>
              <div className="signature">— Ângelo Mazzutti</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────── */}
      <section className="pricing" id="comprar">
        <div className="wrap">
          <div className="pricing-head">
            <div>
              <div className="eyebrow">Masterclass On-demand · 2026</div>
              <h2>Acesso imediato,<br /><span className="em">para sempre.</span></h2>
            </div>
          </div>
          <div className="price-card">
            <div className="price-left">
              <div>
                <div className="badge"><span className="dot" />Edição de lançamento</div>
                <h3>Inside Out<em>Masterclass On-demand · 2026</em></h3>
              </div>
              <div className="product-meta">
                <div className="row"><span>Formato</span><span className="v">Vídeo on-demand</span></div>
                <div className="row"><span>Módulos</span><span className="v">6</span></div>
                <div className="row"><span>Acesso</span><span className="v">Vitalício — sem prazo</span></div>
                <div className="row"><span>Certificado</span><span className="v">Incluído</span></div>
                <div className="row"><span>Entrega</span><span className="v">Link imediato após o pagamento</span></div>
              </div>
            </div>
            <div className="price-right">
              <div className="num-line">
                <span className="pill">Lançamento</span>
              </div>
              <div className="price"><span className="cur">R$</span>197</div>
              <div className="pix-line"><em>à vista · cartão, pix ou boleto</em></div>
              <div>
                <a href={CHECKOUT_URL} className="btn-buy">
                  Garantir acesso agora <span className="arrow">→</span>
                </a>
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
              <div className="v"><em>Sete dias para assistir, testar e desistir.</em> Se não for o que você esperava, devolvemos o valor integral — sem perguntas, sem formulário, sem justificativa.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="faq" id="faq">
        <div className="wrap">
          <div className="faq-head">
            <h2>Perguntas<em>diretas.</em></h2>
            <p className="copy">As que chegam com mais frequência. Outras dúvidas: <strong>academy@housemazzutti.com</strong></p>
          </div>
          <div className="faq-list">
            {FAQS.map((f) => (
              <details key={f.n}>
                <summary>
                  <span className="n">{f.n}</span>
                  <span><em>{f.q}</em></span>
                  <span className="plus">+</span>
                </summary>
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
            Do processo que<br />
            <span className="blood">ninguém vê</span><br />
            <em>à entrega que todos</em><br />
            reconhecem.
          </p>
          <p className="sub">Inside Out é sobre a distância entre a decisão criativa interna e o resultado que chega ao cliente. Essa masterclass percorre esse caminho inteiro — e você pode assistir quantas vezes quiser.</p>
          <div className="cta-row">
            <a href="#comprar" className="btn-primary">Garantir acesso agora <span>→</span></a>
            <a href="#modulos" className="btn-secondary">Ver os módulos</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer>
        <div className="mega-mark">
          <div className="mark-inner">
            HOUSE MAZZUTTI<em>.</em>
          </div>
          <div className="wrap mark-foot">
            <span>Academy</span>
            <span>Inside Out <span className="dot" /> 2026 <span className="dot" /> São Paulo</span>
            <span>Masterclass</span>
          </div>
        </div>
        <div className="wrap">
          <div className="footer-grid">
            <div className="brand-block col">
              <h4>A masterclass</h4>
              <span className="dim" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, letterSpacing: 0 }}>Inside Out — House Mazzutti Academy, dirigido por Ângelo Mazzutti.</span>
              <p className="meta">Do processo interno à entrega final.<br />Direção criativa como decisão, não como estilo.</p>
            </div>
            <div className="col">
              <h4>Catálogo Academy</h4>
              <Link href="/pt/academy/marketing-para-modelos">Ebook · Vol. 01</Link>
              <Link href="/pt/academy/preco-da-relevancia">Ebook · Vol. 02</Link>
              <a href="#" style={{ color: 'var(--blood)' }}>Inside Out · Masterclass</a>
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
            <span>© MMXXVI · House Mazzutti Academy · Todos os direitos reservados</span>
            <span>São Paulo · Brasil</span>
          </div>
        </div>
        <div className="mt-6"><SiteFooterLinks /></div>
      </footer>
    </div>
  )
}
