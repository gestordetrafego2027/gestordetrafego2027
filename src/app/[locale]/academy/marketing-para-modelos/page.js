/**
 * Landing · Ebook Marketing para Modelos
 * House Mazzutti Academy · Vol. 01 · 2026
 * Design hi-fi reproduzido a partir do handoff editorial.
 */
import React from 'react';

const SITE_URL = 'https://housemazzutti.com';
const PAGE_PATH = '/academy/marketing-para-modelos';
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER = '/images/academy/marketing-para-modelos/cover.png';
const MOCKUP_FRONT = '/images/academy/marketing-para-modelos/mockup-front.png';
const MOCKUP_HANDS = '/images/academy/marketing-para-modelos/mockup-hands.png';
const MOCKUP_CHAIR = '/images/academy/marketing-para-modelos/mockup-chair.png';
const COVER_ABSOLUTE = `${SITE_URL}${COVER}`;
const CHECKOUT_URL = '/checkout/marketing-para-modelos';

const TITLE = 'Marketing para Modelos · Ebook · House Mazzutti Academy Vol. 01';
const DESCRIPTION =
  'Da passarela física ao império digital. O guia honesto de quem quer ser modelo no Brasil de hoje — por Angelo Mazzutti. Ebook · 281 páginas · 12 capítulos.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'marketing para modelos',
    'ebook modelo',
    'como ser modelo',
    'carreira de modelo Brasil',
    'agência de modelos',
    'Angelo Mazzutti',
    'House Mazzutti Academy',
  ],
  authors: [{ name: 'Angelo Mazzutti', url: SITE_URL }],
  creator: 'Angelo Mazzutti',
  publisher: 'House Mazzutti Edições',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'book',
    locale: 'pt_BR',
    url: PAGE_URL,
    siteName: 'House Mazzutti Academy',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: COVER_ABSOLUTE,
        width: 1700,
        height: 2500,
        alt: 'Capa do livro Marketing para Modelos — House Mazzutti Academy Vol. 01',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [COVER_ABSOLUTE],
    creator: '@housemazzutti',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'book:author': 'Angelo Mazzutti',
    'book:isbn': '',
    'book:release_date': '2026',
    'product:price:amount': '117.00',
    'product:price:currency': 'BRL',
    'product:availability': 'preorder',
  },
};

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Marketing para Modelos',
  alternateName: 'House Mazzutti Academy · Volume 01',
  bookFormat: 'https://schema.org/EBook',
  inLanguage: 'pt-BR',
  numberOfPages: 281,
  author: {
    '@type': 'Person',
    name: 'Angelo Mazzutti',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'House Mazzutti Edições',
    url: SITE_URL,
  },
  image: COVER_ABSOLUTE,
  description: DESCRIPTION,
  url: PAGE_URL,
  offers: {
    '@type': 'Offer',
    price: '117.00',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/PreOrder',
    url: PAGE_URL + '#comprar',
    priceValidUntil: '2026-12-31',
    seller: { '@type': 'Organization', name: 'House Mazzutti Edições' },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: 3,
    bestRating: 5,
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { q: 'Esse livro serve mesmo pra quem nunca fez nada de modelo?', a: 'Serve, e provavelmente serve mais. A maior parte do livro foi escrita pensando em quem está prestes a tomar a primeira decisão importante — fazer um book, mandar a primeira aplicação, assinar a primeira proposta.' },
    { q: 'Eu já sou modelo há alguns anos. Ainda faz sentido?', a: 'Os capítulos 8 (contrato), 9 (cachês e impostos) e 10 (saúde na carreira) cobrem material que mesmo modelos com dois ou três anos de estrada raramente recebem da agência.' },
    { q: 'Como é a entrega? Eu recebo um livro físico?', a: 'É ebook — PDF em alta resolução, com a diagramação editorial completa. Entrega imediata após a confirmação do pagamento.' },
    { q: 'Vou aprender a posar, andar de salto, fazer expressão?', a: 'Não. O livro é sobre marketing, posicionamento e decisão de carreira — não manual de poses.' },
    { q: 'Funciona pra quem está fora de São Paulo / Rio / Curitiba?', a: 'Sim — e provavelmente é onde ele mais ajuda. O livro mapeia onde os mercados existem e como aplicar de qualquer cidade do Brasil.' },
    { q: 'E se eu comprar, ler e não gostar?', a: 'Sete dias de garantia incondicional. Devolvemos o valor integral, sem formulário, sem ligação, sem justificativa.' },
  ].map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const CSS = `
@import url('https://api.fontshare.com/v2/css?f[]=rock-grotesque@300,400,500,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,300;1,8..60,400;1,8..60,500&display=swap');

.mpm-root {
  --paper:      #efe9da;
  --paper-deep: #e4ddc9;
  --ink:        #14140e;
  --ink-soft:   #2a2a22;
  --ink-mute:   #6b6558;
  --ink-light:  #a8a193;
  --rule-soft:  #d9d2bf;
  --lime:           #a4e80a;
  --lime-deep:      #7fbe00;
  --mondrian-red:   #c92a2a;
  --mondrian-blue:  #1e3a8a;
  --mondrian-yellow:#f0b400;
  --serif:   "Source Serif 4", "Source Serif Pro", Georgia, serif;
  --display: "Cormorant Garamond", "EB Garamond", Georgia, serif;
  --sans:    "Rock Grotesque", "Inter", "Helvetica Neue", Arial, sans-serif;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--serif);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern", "liga", "onum";
  overflow-x: hidden;
}
.mpm-root *, .mpm-root *::before, .mpm-root *::after { box-sizing: border-box; }
.mpm-root img { display: block; max-width: 100%; }

.mpm-root .wrap        { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
.mpm-root .wrap-narrow { max-width: 880px;  margin: 0 auto; padding: 0 32px; }
.mpm-root .eyebrow {
  font-family: var(--sans); font-weight: 500; font-size: 11px;
  letter-spacing: 0.34em; text-transform: uppercase; color: var(--ink-mute);
}
.mpm-root .rule-thin { height: 1px; background: var(--ink); opacity: 0.15; border: 0; }
.mpm-root .rule-mondrian { display: flex; height: 6px; width: 120px; gap: 0; }
.mpm-root .rule-mondrian span { flex: 1; }
.mpm-root .rule-mondrian span:nth-child(1) { background: var(--mondrian-red); }
.mpm-root .rule-mondrian span:nth-child(2) { background: var(--mondrian-yellow); }
.mpm-root .rule-mondrian span:nth-child(3) { background: var(--mondrian-blue); flex: 2; }
.mpm-root .rule-mondrian span:nth-child(4) { background: var(--ink); }

.mpm-root .hm-wordmark {
  font-family: var(--sans); font-weight: 700; text-transform: uppercase;
  letter-spacing: -0.015em; line-height: 0.82; font-feature-settings: "ss01", "kern";
}
.mpm-root .hm-wordmark .row { display: block; }
.mpm-root .hm-wordmark .row.thin { font-weight: 300; }
.mpm-root .hm-wordmark .row em {
  font-family: var(--display); font-style: italic; font-weight: 400;
  letter-spacing: -0.02em; text-transform: none;
}
.mpm-root .hm-tag {
  font-family: var(--sans); font-weight: 500; font-size: 10px;
  letter-spacing: 0.42em; text-transform: uppercase;
}

.mpm-root .ticker { background: var(--ink); color: var(--paper); overflow: hidden; border-bottom: 1px solid #000; }
.mpm-root .ticker-track {
  display: flex; gap: 64px; white-space: nowrap; padding: 12px 0;
  font-family: var(--sans); font-size: 11px; letter-spacing: 0.32em;
  text-transform: uppercase; color: var(--paper);
  animation: mpm-marquee 38s linear infinite; width: max-content;
}
.mpm-root .ticker-track span { opacity: 0.78; }
.mpm-root .ticker-track .star { color: var(--lime); opacity: 1; }
@keyframes mpm-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.mpm-root .masthead { background: var(--paper); border-bottom: 1px solid var(--ink); padding: 22px 0 18px; }
.mpm-root .masthead-inner {
  max-width: 1440px; margin: 0 auto; padding: 0 48px;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px;
}
.mpm-root .masthead-brand { text-decoration: none; color: var(--ink); display: inline-block; line-height: 1; }
.mpm-root .masthead-brand .hm-wordmark { font-size: 30px; letter-spacing: -0.025em; }
.mpm-root .masthead-center { display: flex; align-items: center; gap: 18px; justify-self: center; color: var(--ink); }
.mpm-root .masthead-center .hm-divider { width: 1px; height: 14px; background: var(--ink); opacity: 0.4; }
.mpm-root .masthead-right { justify-self: end; color: var(--ink-mute); }
.mpm-root .hm-tag.muted { color: var(--ink-mute); }

.mpm-root .nav { position: sticky; top: 0; z-index: 50; background: var(--paper); border-bottom: 1px solid var(--rule-soft); backdrop-filter: blur(8px); }
.mpm-root .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 18px 48px; max-width: 1440px; margin: 0 auto; }
.mpm-root .nav-brand { font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.36em; text-transform: uppercase; color: var(--ink); display: flex; align-items: center; gap: 14px; }
.mpm-root .nav-brand .pip { width: 7px; height: 7px; background: var(--mondrian-red); border-radius: 50%; display: inline-block; }
.mpm-root .nav-brand .sep { color: var(--ink-light); margin: 0 4px; }
.mpm-root .nav-links { display: flex; align-items: center; gap: 32px; font-family: var(--sans); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-mute); }
.mpm-root .nav-links a { color: inherit; text-decoration: none; transition: color .2s; }
.mpm-root .nav-links a:hover { color: var(--ink); }
.mpm-root .nav-cta { font-family: var(--sans); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--paper); background: var(--ink); padding: 10px 18px; text-decoration: none; transition: background .2s; }
.mpm-root .nav-cta:hover { background: var(--mondrian-red); }

.mpm-root .hero { background: var(--lime); color: var(--ink); position: relative; overflow: hidden; border-bottom: 1px solid #000; }
.mpm-root .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: stretch; min-height: 88vh; padding: 56px 56px 64px; max-width: 1440px; margin: 0 auto; }
.mpm-root .hero-left { display: flex; flex-direction: column; justify-content: space-between; }
.mpm-root .hero-tag { display: flex; align-items: center; gap: 14px; font-family: var(--sans); font-size: 11px; letter-spacing: 0.36em; text-transform: uppercase; color: var(--ink); }
.mpm-root .hero-tag .dot { width: 8px; height: 8px; background: var(--mondrian-red); border-radius: 50%; }
.mpm-root .hero-headline { font-family: var(--display); font-weight: 400; font-style: italic; font-size: clamp(60px, 9.2vw, 152px); line-height: 0.86; letter-spacing: -0.018em; margin: 32px 0 0; color: var(--ink); text-wrap: balance; }
.mpm-root .hero-headline .red { color: var(--mondrian-red); }
.mpm-root .hero-headline .blue { color: var(--mondrian-blue); }
.mpm-root .hero-headline .yellow { color: var(--mondrian-yellow); }
.mpm-root .hero-headline .ital { font-style: italic; }
.mpm-root .hero-sub { font-family: var(--display); font-style: italic; font-size: clamp(20px, 1.8vw, 28px); line-height: 1.25; color: var(--ink); max-width: 560px; margin: 40px 0 0; text-wrap: balance; }
.mpm-root .hero-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 56px; padding-top: 22px; border-top: 1px solid var(--ink); }
.mpm-root .hero-meta .cell .k { font-family: var(--sans); font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-soft); display: block; margin-bottom: 6px; }
.mpm-root .hero-meta .cell .v { font-family: var(--display); font-style: italic; font-size: 22px; line-height: 1.1; color: var(--ink); }
.mpm-root .hero-right { position: relative; display: flex; align-items: center; justify-content: center; }
.mpm-root .cover-stack { position: relative; width: 100%; max-width: 460px; aspect-ratio: 1 / 1.5; transform: rotate(-2.2deg); filter: drop-shadow(0 30px 60px rgba(0,0,0,0.28)) drop-shadow(0 8px 16px rgba(0,0,0,0.18)); transition: transform .6s cubic-bezier(.2,.7,.3,1); }
.mpm-root .cover-stack:hover { transform: rotate(-1deg) translateY(-6px); }
.mpm-root .cover-stack img { width: 100%; height: 100%; object-fit: cover; border: 1px solid rgba(0,0,0,0.4); }
.mpm-root .cover-stack::before { content: ""; position: absolute; inset: 0; background: var(--ink); transform: translate(14px, 14px) rotate(3deg); z-index: -1; }
.mpm-root .cover-stack::after { content: "VOL. 01 · 2026"; position: absolute; top: -18px; right: -18px; background: var(--ink); color: var(--paper); font-family: var(--sans); font-size: 10px; letter-spacing: 0.28em; padding: 10px 14px; transform: rotate(7deg); border: 1px solid var(--paper); }
.mpm-root .hero-foot { padding: 18px 56px; display: flex; justify-content: space-between; align-items: center; font-family: var(--sans); font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; color: var(--ink); border-top: 1px solid rgba(0,0,0,0.4); background: var(--lime); }

.mpm-root .pullband { background: var(--paper); padding: 110px 0 100px; border-bottom: 1px solid var(--rule-soft); text-align: center; }
.mpm-root .pullband .quote { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(40px, 5.2vw, 84px); line-height: 1.02; letter-spacing: -0.012em; color: var(--ink); margin: 0 auto; max-width: 1080px; text-wrap: balance; }
.mpm-root .pullband .quote .em { color: var(--mondrian-red); }
.mpm-root .pullband .attr { margin-top: 42px; font-family: var(--sans); font-size: 11px; letter-spacing: 0.42em; text-transform: uppercase; color: var(--ink-mute); }
.mpm-root .pullband .strip { margin: 32px auto 0; }

.mpm-root .promise { background: var(--paper); padding: 96px 0 120px; border-top: 1px solid var(--rule-soft); border-bottom: 1px solid var(--rule-soft); }
.mpm-root .promise-head { display: grid; grid-template-columns: 1fr 2fr; gap: 48px; margin-bottom: 64px; align-items: end; }
.mpm-root .promise-head h2 { font-family: var(--sans); font-weight: 700; text-transform: uppercase; font-size: clamp(40px, 5vw, 72px); line-height: 0.94; letter-spacing: -0.025em; color: var(--ink); margin: 0; }
.mpm-root .promise-head h2 em { font-family: var(--display); font-style: italic; font-weight: 400; text-transform: none; letter-spacing: -0.015em; color: var(--mondrian-red); display: block; }
.mpm-root .promise-head .lede { font-family: var(--serif); font-size: 19px; line-height: 1.55; color: var(--ink-soft); text-wrap: pretty; }
.mpm-root .promise-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
.mpm-root .promise-cols .col { padding: 40px 40px 48px; }
.mpm-root .promise-cols .col.is { background: var(--ink); color: var(--paper); }
.mpm-root .promise-cols .col.isnot { background: var(--paper); color: var(--ink); border-right: 1px solid var(--ink); }
.mpm-root .promise-cols .col h3 { font-family: var(--sans); font-weight: 700; font-size: 13px; letter-spacing: 0.4em; text-transform: uppercase; margin: 0 0 28px; display: flex; align-items: center; gap: 12px; }
.mpm-root .promise-cols .col.is h3 { color: var(--lime); }
.mpm-root .promise-cols .col.isnot h3 { color: var(--mondrian-red); }
.mpm-root .promise-cols .col h3::before { content: ""; width: 24px; height: 1px; background: currentColor; }
.mpm-root .promise-cols ul { list-style: none; padding: 0; margin: 0; }
.mpm-root .promise-cols ul li { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 26px; line-height: 1.18; padding: 18px 0 18px 36px; position: relative; border-bottom: 1px solid; text-wrap: balance; }
.mpm-root .promise-cols .col.is ul li { border-color: rgba(239,233,218,0.16); }
.mpm-root .promise-cols .col.isnot ul li { border-color: var(--rule-soft); }
.mpm-root .promise-cols ul li:last-child { border-bottom: 0; }
.mpm-root .promise-cols .col.is ul li::before { content: "+"; position: absolute; left: 0; top: 18px; font-family: var(--sans); font-style: normal; font-weight: 400; font-size: 16px; color: var(--lime); }
.mpm-root .promise-cols .col.isnot ul li::before { content: "×"; position: absolute; left: 0; top: 14px; font-family: var(--sans); font-style: normal; font-weight: 400; font-size: 22px; color: var(--mondrian-red); }

.mpm-root .toc-sec { background: var(--paper); padding: 110px 0 130px; }
.mpm-root .toc-sec .head { display: grid; grid-template-columns: auto 1fr auto; gap: 48px; align-items: end; margin-bottom: 56px; }
.mpm-root .toc-sec .head h2 { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(50px, 7.2vw, 110px); line-height: 0.9; letter-spacing: -0.018em; color: var(--ink); margin: 0; }
.mpm-root .toc-sec .head .desc { font-family: var(--serif); font-style: italic; font-size: 18px; color: var(--ink-soft); max-width: 360px; line-height: 1.5; justify-self: end; text-align: right; }
.mpm-root .toc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1px solid var(--ink); }
.mpm-root .toc-card { border-right: 1px solid var(--rule-soft); border-bottom: 1px solid var(--rule-soft); padding: 28px 26px 34px; background: var(--paper); min-height: 280px; display: flex; flex-direction: column; position: relative; transition: background .25s ease; }
.mpm-root .toc-card:nth-child(4n) { border-right: 0; }
.mpm-root .toc-card:hover { background: var(--paper-deep); }
.mpm-root .toc-card .num { font-family: var(--display); font-style: italic; font-weight: 300; font-size: 72px; line-height: 0.9; letter-spacing: -0.04em; color: var(--ink); }
.mpm-root .toc-card .num .accent { display: inline; }
.mpm-root .toc-card[data-accent="red"]    .num .accent { color: var(--mondrian-red); }
.mpm-root .toc-card[data-accent="blue"]   .num .accent { color: var(--mondrian-blue); }
.mpm-root .toc-card[data-accent="yellow"] .num .accent { color: var(--mondrian-yellow); }
.mpm-root .toc-card[data-accent="ink"]    .num .accent { color: var(--ink); }
.mpm-root .toc-card .tag { margin-top: 16px; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-mute); }
.mpm-root .toc-card .title { margin-top: 10px; font-family: var(--display); font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.15; color: var(--ink); text-wrap: balance; flex: 1; }
.mpm-root .toc-card .pages { margin-top: 18px; font-family: var(--sans); font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-mute); display: flex; justify-content: space-between; border-top: 1px solid var(--rule-soft); padding-top: 12px; }
.mpm-root .toc-foot { margin-top: 36px; display: flex; justify-content: space-between; align-items: center; font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-mute); }
.mpm-root .toc-foot strong { color: var(--ink); font-weight: 500; }

.mpm-root .audience { background: var(--ink); color: var(--paper); padding: 120px 0; }
.mpm-root .audience-head { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; margin-bottom: 72px; align-items: end; }
.mpm-root .audience-head .eyebrow { color: var(--lime); }
.mpm-root .audience-head h2 { font-family: var(--sans); font-weight: 700; text-transform: uppercase; font-size: clamp(40px, 5.4vw, 80px); line-height: 0.92; letter-spacing: -0.028em; color: var(--paper); margin: 14px 0 0; text-wrap: balance; }
.mpm-root .audience-head h2 em { font-family: var(--display); font-style: italic; font-weight: 400; text-transform: none; letter-spacing: -0.015em; color: var(--lime); }
.mpm-root .audience-head .copy { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.55; color: rgba(239,233,218,0.72); max-width: 480px; }
.mpm-root .audience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.mpm-root .aud-card { background: transparent; border: 1px solid rgba(239,233,218,0.18); padding: 28px 24px 30px; display: flex; flex-direction: column; gap: 12px; transition: border-color .25s, background .25s; }
.mpm-root .aud-card:hover { border-color: var(--lime); background: rgba(181,216,83,0.06); }
.mpm-root .aud-card .num { font-family: var(--sans); font-size: 10px; letter-spacing: 0.34em; color: var(--lime); }
.mpm-root .aud-card .ttl { font-family: var(--display); font-style: italic; font-size: 26px; line-height: 1.15; color: var(--paper); margin: 4px 0 4px; }
.mpm-root .aud-card .d { font-family: var(--serif); font-size: 15px; line-height: 1.5; color: rgba(239,233,218,0.74); }

.mpm-root .excerpt { background: var(--paper); padding: 130px 0 140px; position: relative; }
.mpm-root .excerpt-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 72px; align-items: start; }
.mpm-root .excerpt-grid .meta { position: sticky; top: 96px; }
.mpm-root .excerpt-grid .meta .label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--mondrian-red); margin-bottom: 14px; }
.mpm-root .excerpt-grid .meta h3 { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(36px, 4vw, 60px); line-height: 0.98; margin: 0; color: var(--ink); text-wrap: balance; }
.mpm-root .excerpt-grid .meta .from { font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-mute); margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--rule-soft); }
.mpm-root .excerpt-body p { font-family: var(--serif); font-size: 18.5px; line-height: 1.65; color: var(--ink); margin: 0 0 1.2em; text-align: left; hyphens: auto; text-wrap: pretty; }
.mpm-root .excerpt-body p.dropcap::first-letter { font-family: var(--display); font-style: italic; font-weight: 500; font-size: 5.4em; line-height: 0.86; float: left; padding: 0.08em 0.14em 0 0; color: var(--mondrian-red); }
.mpm-root .excerpt-body .pullquote { margin: 1.6em -8px; padding: 0 0 0 22px; border-left: 3px solid var(--mondrian-red); font-family: var(--display); font-style: italic; font-weight: 400; font-size: 30px; line-height: 1.18; color: var(--mondrian-red); letter-spacing: -0.005em; }

.mpm-root .author { background: var(--paper); padding: 110px 0 130px; border-top: 1px solid var(--rule-soft); }
.mpm-root .author-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 64px; align-items: start; }
.mpm-root .author-card { background: var(--ink); color: var(--paper); padding: 40px 36px 36px; position: relative; }
.mpm-root .author-card .label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; color: var(--lime); }
.mpm-root .author-card .nm { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 46px; line-height: 1.0; color: var(--paper); margin: 18px 0 8px; }
.mpm-root .author-card .role { font-family: var(--serif); font-style: italic; font-size: 16px; color: rgba(239,233,218,0.7); }
.mpm-root .author-card .meta-rows { margin-top: 28px; border-top: 1px solid rgba(239,233,218,0.18); padding-top: 18px; display: flex; flex-direction: column; gap: 12px; }
.mpm-root .author-card .meta-rows .row { display: grid; grid-template-columns: 100px 1fr; gap: 14px; font-family: var(--sans); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(239,233,218,0.6); padding: 6px 0; border-bottom: 1px solid rgba(239,233,218,0.08); }
.mpm-root .author-card .meta-rows .row:last-child { border-bottom: 0; }
.mpm-root .author-card .meta-rows .row .v { color: var(--paper); font-weight: 400; }
.mpm-root .author-card .mondrian-pill { position: absolute; top: 18px; right: 18px; width: 56px; height: 56px; display: grid; grid-template-columns: 1fr 0.7fr; grid-template-rows: 0.6fr 1fr; gap: 2px; }
.mpm-root .author-card .mondrian-pill > * { background: var(--paper); }
.mpm-root .author-card .mondrian-pill .a { background: var(--mondrian-red); }
.mpm-root .author-card .mondrian-pill .b { background: var(--mondrian-blue); }
.mpm-root .author-card .mondrian-pill .c { background: var(--mondrian-yellow); }
.mpm-root .author-card .mondrian-pill .d { background: var(--paper); }
.mpm-root .author-body h2 { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(36px, 4.4vw, 64px); line-height: 0.98; color: var(--ink); margin: 0 0 24px; text-wrap: balance; }
.mpm-root .author-body p { font-family: var(--serif); font-size: 18px; line-height: 1.62; color: var(--ink-soft); margin: 0 0 1em; text-align: left; }
.mpm-root .author-body .signature { margin-top: 28px; font-family: var(--display); font-style: italic; font-size: 32px; color: var(--ink); letter-spacing: -0.01em; }
.mpm-root .author-body .triangle { margin-top: 36px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
.mpm-root .author-body .triangle .cell { padding: 22px 22px; border-right: 1px solid var(--rule-soft); }
.mpm-root .author-body .triangle .cell:last-child { border-right: 0; }
.mpm-root .author-body .triangle .cell .k { font-family: var(--sans); font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 8px; }
.mpm-root .author-body .triangle .cell .v { font-family: var(--display); font-style: italic; font-size: 22px; line-height: 1.15; color: var(--ink); }

.mpm-root .pricing { background: var(--lime); color: var(--ink); padding: 130px 0 140px; border-top: 1px solid #000; border-bottom: 1px solid #000; position: relative; }
.mpm-root .pricing-head { text-align: center; margin-bottom: 56px; }
.mpm-root .pricing-head .eyebrow { color: var(--ink); opacity: 0.7; }
.mpm-root .pricing-head h2 { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(54px, 7vw, 110px); line-height: 0.92; letter-spacing: -0.015em; color: var(--ink); margin: 18px 0 0; text-wrap: balance; }
.mpm-root .pricing-head h2 .em { color: var(--mondrian-red); }
.mpm-root .price-card { max-width: 880px; margin: 0 auto; background: var(--paper); border: 1px solid var(--ink); padding: 0; display: grid; grid-template-columns: 1fr 1.2fr; box-shadow: 18px 18px 0 var(--ink); }
.mpm-root .price-left { padding: 40px 36px; border-right: 1px solid var(--ink); display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
.mpm-root .price-left .badge { display: inline-flex; align-items: center; gap: 10px; font-family: var(--sans); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--mondrian-red); }
.mpm-root .price-left .badge .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--mondrian-red); animation: mpm-pulse 1.6s ease-in-out infinite; }
@keyframes mpm-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.6); } }
.mpm-root .price-left h3 { font-family: var(--sans); font-weight: 700; text-transform: uppercase; font-size: 30px; line-height: 0.94; letter-spacing: -0.022em; margin: 0; color: var(--ink); text-wrap: balance; }
.mpm-root .price-left h3 em { font-family: var(--display); font-style: italic; font-weight: 400; text-transform: none; letter-spacing: -0.015em; color: var(--mondrian-red); display: block; margin-top: 4px; }
.mpm-root .price-left .product-meta { border-top: 1px solid var(--rule-soft); padding-top: 18px; display: flex; flex-direction: column; gap: 8px; font-family: var(--sans); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
.mpm-root .price-left .product-meta .row { display: flex; justify-content: space-between; }
.mpm-root .price-left .product-meta .row .v { color: var(--ink); }
.mpm-root .price-right { padding: 40px 36px; display: flex; flex-direction: column; gap: 18px; }
.mpm-root .price-right .num-line { display: flex; align-items: baseline; gap: 14px; }
.mpm-root .price-right .strike { font-family: var(--sans); font-size: 16px; color: var(--ink-mute); text-decoration: line-through; letter-spacing: 0.02em; }
.mpm-root .price-right .pill { font-family: var(--sans); font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; background: var(--mondrian-red); color: var(--paper); padding: 4px 10px; }
.mpm-root .price-right .price { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 92px; line-height: 0.88; color: var(--ink); letter-spacing: -0.02em; margin-top: 6px; }
.mpm-root .price-right .price .cur { font-family: var(--sans); font-style: normal; font-size: 22px; letter-spacing: 0.12em; vertical-align: top; margin-right: 6px; color: var(--ink); }
.mpm-root .price-right .pix-line { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-soft); }
.mpm-root .price-cta { display: flex; align-items: center; gap: 14px; margin-top: 6px; }
.mpm-root .btn-buy { display: inline-flex; align-items: center; justify-content: center; gap: 14px; background: var(--ink); color: var(--paper); font-family: var(--sans); font-weight: 500; font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase; padding: 22px 30px; text-decoration: none; flex: 1; transition: background .2s, transform .15s; text-align: center; }
.mpm-root .btn-buy:hover { background: var(--mondrian-red); transform: translateY(-2px); }
.mpm-root .btn-buy .arrow { font-family: var(--sans); font-size: 16px; letter-spacing: 0; }
.mpm-root .price-right .micro { font-family: var(--sans); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); margin-top: 6px; display: flex; gap: 18px; flex-wrap: wrap; }
.mpm-root .price-right .micro span::before { content: "·"; margin-right: 14px; color: var(--mondrian-red); }
.mpm-root .price-right .micro span:first-child::before { content: ""; margin: 0; }
.mpm-root .guarantee { max-width: 880px; margin: 36px auto 0; display: flex; align-items: center; gap: 28px; padding: 22px 28px; background: rgba(20,20,14,0.05); border-left: 3px solid var(--ink); }
.mpm-root .guarantee .g-num { font-family: var(--display); font-style: italic; font-size: 56px; line-height: 1; color: var(--ink); }
.mpm-root .guarantee .g-body .k { font-family: var(--sans); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 4px; }
.mpm-root .guarantee .g-body .v { font-family: var(--display); font-style: italic; font-size: 20px; line-height: 1.25; color: var(--ink); max-width: 560px; }

.mpm-root .testimonials { background: var(--paper); padding: 110px 0 120px; }
.mpm-root .testi-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 56px; gap: 32px; }
.mpm-root .testi-head h2 { font-family: var(--sans); font-weight: 700; text-transform: uppercase; font-size: clamp(40px, 5vw, 72px); line-height: 0.94; letter-spacing: -0.025em; margin: 12px 0 0; color: var(--ink); max-width: 720px; text-wrap: balance; }
.mpm-root .testi-head h2 em { font-family: var(--display); font-style: italic; font-weight: 400; text-transform: none; letter-spacing: -0.015em; color: var(--mondrian-red); }
.mpm-root .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
.mpm-root .testi { padding: 36px 32px 32px; border-right: 1px solid var(--rule-soft); display: flex; flex-direction: column; gap: 18px; }
.mpm-root .testi:last-child { border-right: 0; }
.mpm-root .testi .q { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 24px; line-height: 1.22; color: var(--ink); text-wrap: balance; flex: 1; }
.mpm-root .testi .who { border-top: 1px solid var(--rule-soft); padding-top: 14px; display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: center; }
.mpm-root .testi .who .av { width: 40px; height: 40px; border-radius: 50%; background: var(--ink); color: var(--paper); display: grid; place-items: center; font-family: var(--display); font-style: italic; font-size: 19px; }
.mpm-root .testi .who .nm { font-family: var(--sans); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); }
.mpm-root .testi .who .role { font-family: var(--serif); font-style: italic; font-size: 13px; color: var(--ink-mute); }

.mpm-root .faq { background: var(--paper); padding: 110px 0 130px; border-top: 1px solid var(--rule-soft); }
.mpm-root .faq-head { display: grid; grid-template-columns: 1fr 2fr; gap: 56px; margin-bottom: 48px; align-items: end; }
.mpm-root .faq-head h2 { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(54px, 6.8vw, 108px); line-height: 0.9; letter-spacing: -0.015em; color: var(--ink); margin: 0; }
.mpm-root .faq-head .copy { font-family: var(--serif); font-style: italic; font-size: 18px; color: var(--ink-soft); line-height: 1.5; max-width: 520px; }
.mpm-root .faq-list { border-top: 1px solid var(--ink); }
.mpm-root .faq-list details { border-bottom: 1px solid var(--rule-soft); padding: 0; }
.mpm-root .faq-list details summary { list-style: none; cursor: pointer; padding: 24px 0; display: grid; grid-template-columns: 56px 1fr 32px; gap: 18px; align-items: baseline; font-family: var(--display); font-style: italic; font-weight: 400; font-size: 26px; line-height: 1.2; color: var(--ink); }
.mpm-root .faq-list details summary::-webkit-details-marker { display: none; }
.mpm-root .faq-list details summary .n { font-family: var(--sans); font-style: normal; font-size: 10px; letter-spacing: 0.24em; color: var(--ink-mute); text-transform: uppercase; padding-top: 7px; }
.mpm-root .faq-list details summary .plus { font-family: var(--sans); font-style: normal; font-size: 22px; color: var(--mondrian-red); transition: transform .25s; justify-self: end; }
.mpm-root .faq-list details[open] summary .plus { transform: rotate(45deg); }
.mpm-root .faq-list details .a { padding: 0 32px 28px 74px; font-family: var(--serif); font-size: 17px; line-height: 1.6; color: var(--ink-soft); max-width: 820px; }

.mpm-root .final { background: var(--ink); color: var(--paper); padding: 130px 0 130px; text-align: center; border-top: 1px solid #000; }
.mpm-root .final .quote { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(46px, 6.2vw, 100px); line-height: 0.96; letter-spacing: -0.012em; color: var(--paper); max-width: 1080px; margin: 0 auto; text-wrap: balance; }
.mpm-root .final .quote .lime { color: var(--lime); }
.mpm-root .final .quote .red { color: var(--mondrian-red); }
.mpm-root .final .sub { margin-top: 32px; font-family: var(--serif); font-style: italic; font-size: 19px; color: rgba(239,233,218,0.7); max-width: 640px; margin-left: auto; margin-right: auto; line-height: 1.5; }
.mpm-root .final .cta-row { margin-top: 56px; display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; }
.mpm-root .final .btn-primary { background: var(--lime); color: var(--ink); font-family: var(--sans); font-weight: 500; font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase; padding: 24px 36px; text-decoration: none; display: inline-flex; align-items: center; gap: 14px; transition: background .2s, transform .15s; }
.mpm-root .final .btn-primary:hover { background: var(--paper); transform: translateY(-2px); }
.mpm-root .final .btn-secondary { color: var(--paper); font-family: var(--sans); font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; padding: 24px 4px; text-decoration: none; border-bottom: 1px solid rgba(239,233,218,0.4); }
.mpm-root .final .btn-secondary:hover { border-color: var(--lime); color: var(--lime); }

.mpm-root footer.mpm-footer { background: var(--ink); color: rgba(239,233,218,0.55); padding: 80px 0 32px; border-top: 1px solid rgba(239,233,218,0.1); font-family: var(--sans); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; }
.mpm-root .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
.mpm-root .footer-grid .brand-block .meta { font-family: var(--serif); font-style: italic; font-size: 15px; line-height: 1.55; color: rgba(239,233,218,0.55); text-transform: none; letter-spacing: 0.005em; max-width: 320px; margin-top: 18px; }
.mpm-root .footer-grid h4 { font-size: 10px; color: var(--lime); letter-spacing: 0.34em; margin: 0 0 16px; font-weight: 500; padding-bottom: 10px; border-bottom: 1px solid rgba(239,233,218,0.14); }
.mpm-root .footer-grid a { color: rgba(239,233,218,0.7); text-decoration: none; display: block; padding: 5px 0; }
.mpm-root .footer-grid a:hover { color: var(--lime); }
.mpm-root .footer-grid .col span.dim { color: rgba(239,233,218,0.4); display: block; padding: 5px 0; }

.mpm-root .mega-mark { border-top: 1px solid rgba(239,233,218,0.14); border-bottom: 1px solid rgba(239,233,218,0.14); padding: 64px 0 56px; margin-bottom: 32px; overflow: hidden; }
.mpm-root .mega-mark .mark-inner { font-family: var(--sans); font-weight: 700; text-transform: uppercase; color: var(--paper); font-size: clamp(80px, 16vw, 260px); line-height: 0.82; letter-spacing: -0.035em; text-align: center; white-space: nowrap; }
.mpm-root .mega-mark .mark-inner .l { display: block; }
.mpm-root .mega-mark .mark-inner em { font-family: var(--display); font-style: italic; font-weight: 400; color: var(--lime); letter-spacing: -0.04em; text-transform: none; }
.mpm-root .mega-mark .mark-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 36px; padding: 0 4px; font-family: var(--sans); font-size: 10px; letter-spacing: 0.34em; color: rgba(239,233,218,0.45); }
.mpm-root .mega-mark .mark-foot .dot { width: 6px; height: 6px; background: var(--mondrian-red); border-radius: 50%; display: inline-block; margin: 0 10px; }
.mpm-root .footer-bottom { border-top: 1px solid rgba(239,233,218,0.1); padding-top: 22px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; color: rgba(239,233,218,0.4); font-size: 10px; }

.mpm-root .gallery { background: var(--paper-deep); padding: 110px 0 120px; border-top: 1px solid var(--rule-soft); border-bottom: 1px solid var(--rule-soft); }
.mpm-root .gallery-head { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; margin-bottom: 56px; align-items: end; }
.mpm-root .gallery-head .eyebrow { color: var(--mondrian-red); }
.mpm-root .gallery-head h2 { font-family: var(--display); font-style: italic; font-weight: 400; font-size: clamp(48px, 6.4vw, 96px); line-height: 0.94; letter-spacing: -0.015em; color: var(--ink); margin: 12px 0 0; text-wrap: balance; }
.mpm-root .gallery-head h2 em { color: var(--mondrian-red); }
.mpm-root .gallery-head .copy { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.55; color: var(--ink-soft); max-width: 480px; }
.mpm-root .gallery-grid { display: grid; grid-template-columns: 1.1fr 0.9fr 1.1fr; gap: 18px; align-items: stretch; }
.mpm-root .gallery-grid figure { margin: 0; background: var(--paper); border: 1px solid var(--rule-soft); overflow: hidden; display: flex; flex-direction: column; }
.mpm-root .gallery-grid figure .ph { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #d6d2c5; }
.mpm-root .gallery-grid figure.tall .ph { aspect-ratio: 3/4; }
.mpm-root .gallery-grid figure img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.3,1); }
.mpm-root .gallery-grid figure:hover img { transform: scale(1.03); }
.mpm-root .gallery-grid figcaption { padding: 18px 20px 20px; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; font-family: var(--sans); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-mute); border-top: 1px solid var(--rule-soft); }
.mpm-root .gallery-grid figcaption strong { color: var(--ink); font-weight: 500; }
.mpm-root .gallery-foot { margin-top: 32px; display: flex; justify-content: space-between; align-items: center; gap: 24px; font-family: var(--sans); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-mute); }
.mpm-root .gallery-foot .rule-mondrian { flex-shrink: 0; }

@media (max-width: 980px) {
  .mpm-root .wrap, .mpm-root .nav-inner, .mpm-root .hero-grid, .mpm-root .hero-foot { padding-left: 24px; padding-right: 24px; }
  .mpm-root .masthead-inner { padding: 0 24px; grid-template-columns: 1fr auto; gap: 16px; }
  .mpm-root .masthead-center { display: none; }
  .mpm-root .masthead-brand .hm-wordmark { font-size: 22px; }
  .mpm-root .mega-mark { padding: 40px 0 32px; }
  .mpm-root .mega-mark .mark-foot { flex-wrap: wrap; gap: 12px; justify-content: center; text-align: center; }
  .mpm-root .nav-links { display: none; }
  .mpm-root .hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 40px 24px 56px; min-height: auto; }
  .mpm-root .hero-meta { grid-template-columns: repeat(2, 1fr); }
  .mpm-root .promise-head, .mpm-root .audience-head, .mpm-root .author-grid, .mpm-root .excerpt-grid, .mpm-root .faq-head { grid-template-columns: 1fr; gap: 28px; text-align: left; }
  .mpm-root .promise-cols { grid-template-columns: 1fr; }
  .mpm-root .promise-cols .col.isnot { border-right: 0; border-bottom: 1px solid var(--ink); }
  .mpm-root .toc-grid { grid-template-columns: repeat(2, 1fr); }
  .mpm-root .toc-card:nth-child(2n) { border-right: 0; }
  .mpm-root .toc-card:nth-child(4n) { border-right: 1px solid var(--rule-soft); }
  .mpm-root .audience-grid, .mpm-root .testi-grid, .mpm-root .author-body .triangle, .mpm-root .footer-grid { grid-template-columns: 1fr; }
  .mpm-root .testi { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
  .mpm-root .author-body .triangle .cell { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
  .mpm-root .price-card { grid-template-columns: 1fr; box-shadow: 10px 10px 0 var(--ink); }
  .mpm-root .price-left { border-right: 0; border-bottom: 1px solid var(--ink); }
  .mpm-root .price-right .price { font-size: 64px; }
  .mpm-root .toc-sec .head { grid-template-columns: 1fr; gap: 20px; }
  .mpm-root .toc-sec .head .desc { text-align: left; justify-self: start; }
  .mpm-root .faq-list details summary { grid-template-columns: 36px 1fr 24px; font-size: 20px; }
  .mpm-root .faq-list details .a { padding-left: 54px; }
  .mpm-root { font-size: 16px; }
  .mpm-root .cover-stack { max-width: 320px; margin: 0 auto; }
  .mpm-root .gallery-grid { grid-template-columns: 1fr; gap: 14px; }
  .mpm-root .gallery-head { grid-template-columns: 1fr; gap: 20px; }
  .mpm-root .gallery-foot { flex-direction: column; align-items: flex-start; gap: 14px; text-align: left; }
}
`;

const CHAPTERS = [
  { n: '01', accent: 'red',    part: 'Parte i · Ler o mercado',        title: 'O mercado de moda no Brasil em 2026 (e o que não é)',           tag: 'Mapa do terreno',        page: 'p. 29'  },
  { n: '02', accent: 'blue',   part: 'Parte i · Ler o mercado',        title: 'Como o mercado avalia (e como se observar com a mesma lente)',  tag: 'A lupa profissional',    page: 'p. 47'  },
  { n: '03', accent: 'yellow', part: 'Parte i · Ler o mercado',        title: 'O investimento mínimo viável',                                  tag: 'Ordem de gasto',         page: 'p. 71'  },
  { n: '04', accent: 'red',    part: 'Parte ii · Construir presença',  title: 'Quando o book entra em cena (e como produzir sem ser enganada)',tag: 'Manual de contratação',  page: 'p. 93'  },
  { n: '05', accent: 'blue',   part: 'Parte ii · Construir presença',  title: 'Sobre redes sociais (e o que elas dizem antes de você falar)',  tag: 'Portfólio paralelo',     page: 'p. 113' },
  { n: '06', accent: 'red',    part: 'Parte iii · Entrar na agência',  title: 'Como, de fato, abordar uma agência',                            tag: 'Capítulo central',       page: 'p. 133' },
  { n: '07', accent: 'yellow', part: 'Parte iii · Entrar na agência',  title: 'O casting e a primeira reunião: 10 minutos que mudam tudo',     tag: 'Pré-casting',            page: 'p. 155' },
  { n: '08', accent: 'ink',    part: 'Parte iii · Entrar na agência',  title: 'O contrato: o que ler antes de assinar',                        tag: 'Tempo de leitura',       page: 'p. 181' },
  { n: '09', accent: 'yellow', part: 'Parte iv · Sustentar a carreira',title: 'O dinheiro real: cachês, prazos, impostos',                     tag: 'Tabelas reais',          page: 'p. 205' },
  { n: '10', accent: 'red',    part: 'Parte iv · Sustentar a carreira',title: 'Sobre saúde mental e corpo na carreira',                        tag: 'O que ninguém conta',    page: 'p. 229' },
  { n: '11', accent: 'blue',   part: 'Parte iv · Sustentar a carreira',title: 'Os primeiros 12 meses: roadmap sugerido',                       tag: 'Calendário',             page: 'p. 241' },
  { n: '12', accent: 'ink',    part: 'Parte iv · Sustentar a carreira',title: 'Para onde ir depois desse livro',                               tag: 'Próximos passos',        page: 'p. 259' },
];

const AUDIENCE = [
  { n: '01', t: 'Você tem entre 14 e 28 anos e está pensando em ser modelo.',           d: 'Quer entender o terreno antes de gastar dinheiro, e desconfia das promessas que circulam.' },
  { n: '02', t: 'Já tem um Instagram, mas não sabe se “tá certo”.',                     d: 'Tem um capítulo inteiro sobre como o seu perfil é lido por bookers profissionais — em 9 critérios.' },
  { n: '03', t: 'Está pensando em fazer book e não sabe quanto vale.',                  d: 'As 10 perguntas, o contrato, os 5 erros que custam dinheiro. Em duas páginas você sabe se segue.' },
  { n: '04', t: 'Recebeu uma proposta de agência e não sabe se confia.',                d: 'A lista de características observáveis de uma agência sólida — e o que separa de fachada.' },
  { n: '05', t: 'É mãe, pai ou responsável e está com medo de golpe.',                  d: 'Esse livro funciona como filtro familiar antes de qualquer assinatura, qualquer pix, qualquer viagem.' },
  { n: '06', t: 'É iniciante há até dois anos e sente que está girando em falso.',      d: 'O capítulo sobre os primeiros 12 meses te dá um roadmap concreto pra recolocar o eixo.' },
];

const TESTIMONIALS = [
  { a: 'L', q: 'Eu ia gastar R$ 6.000 num book antes de ler o capítulo 4. Cancelei na semana seguinte e mandei polaroids pra três agências. Duas me responderam.', n: 'Letícia, 19', r: 'Goiânia → São Paulo' },
  { a: 'M', q: 'Eu nunca tinha visto alguém do mercado escrever desse jeito direto. Sem glamour, sem promessa. Esse livro deveria ser leitura obrigatória pra família.', n: 'Mariana, 42', r: 'Mãe de uma modelo iniciante' },
  { a: 'B', q: 'Os capítulos sobre contrato e sobre os primeiros 12 meses sozinhos já valem o livro. Estou dois anos na carreira e aprendi coisas que ninguém da agência me contou.', n: 'Bianca, 22', r: 'Modelo profissional · Curitiba' },
];

const FAQ = [
  { n: '01', q: 'Esse livro serve mesmo pra quem nunca fez nada de modelo?', a: 'Serve, e provavelmente serve mais. A maior parte do livro foi escrita pensando em quem está prestes a tomar a primeira decisão importante — fazer um book, mandar a primeira aplicação, assinar a primeira proposta. Quem está nesse ponto economiza mais com a informação certa.' },
  { n: '02', q: 'Eu já sou modelo há alguns anos. Ainda faz sentido?', a: 'Os capítulos 8 (contrato), 9 (cachês e impostos) e 10 (saúde na carreira) cobrem material que mesmo modelos com dois ou três anos de estrada raramente recebem da agência. Leia o sumário com atenção e decida pelo seu momento.' },
  { n: '03', q: 'Como é a entrega? Eu recebo um livro físico?', a: 'É ebook — PDF em alta resolução, com a diagramação editorial completa, pronto pra ler no celular, tablet ou computador. A entrega é imediata após a confirmação do pagamento, por e-mail e link de download direto.' },
  { n: '04', q: 'Vou aprender a posar, andar de salto, fazer expressão?', a: 'Não. Esse livro deixa claro logo na introdução: ele não é manual de poses. Existe gente melhor que eu pra isso, e nos capítulos certos eu te indico onde procurar. O livro é sobre marketing, posicionamento e decisão de carreira.' },
  { n: '05', q: 'Funciona pra quem está fora de São Paulo / Rio / Curitiba?', a: 'Sim — e provavelmente é onde ele mais ajuda. O livro mapeia onde os mercados existem, quais nichos têm trabalho regional, e como aplicar de qualquer cidade do Brasil sem precisar viajar antes da hora.' },
  { n: '06', q: 'E se eu comprar, ler e não gostar?', a: 'Sete dias de garantia incondicional. Você escreve pra academy@housemazzutti.com dizendo apenas que não foi pra você, e devolvemos o valor integral. Sem formulário, sem ligação, sem justificativa.' },
];

const TICKER_ITEMS = [
  'House Mazzutti Academy',
  'Volume 01 — Marketing para Modelos',
  'Da passarela física ao império digital',
  '12 capítulos · 12 checklists · 281 páginas',
  'Edição 2026 · São Paulo',
];

export default function MarketingParaModelosPage() {
  const tickerLoop = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="mpm-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* TICKER */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {tickerLoop.map((t, i) => (
            <React.Fragment key={i}>
              <span>{t}</span>
              <span className="star">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MASTHEAD */}
      <header className="masthead">
        <div className="masthead-inner">
          <a href="#" className="masthead-brand" aria-label="House Mazzutti">
            <span className="hm-wordmark">
              <span className="row">House</span>
              <span className="row">Mazzutti<em>.</em></span>
            </span>
          </a>
          <div className="masthead-center">
            <span className="hm-tag">Academy</span>
            <span className="hm-divider"></span>
            <span className="hm-tag">Volume 01 · MMXXVI</span>
          </div>
          <div className="masthead-right">
            <span className="hm-tag muted">São Paulo · BR</span>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <span className="pip"></span> Marketing para Modelos <span className="sep">·</span> Ebook
          </a>
          <div className="nav-links">
            <a href="#sumario">Sumário</a>
            <a href="#trecho">Trecho</a>
            <a href="#autor">O autor</a>
            <a href="#faq">Perguntas</a>
          </div>
          <a href="#comprar" className="nav-cta">Comprar ebook →</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div>
              <div className="hero-tag"><span className="dot"></span> House Mazzutti Academy · Vol. 01 · 2026</div>
              <h1 className="hero-headline">
                <span className="red ital">M</span><span className="ital">arketing</span><br/>
                <span className="yellow ital">p</span><span className="ital">ara</span><br/>
                <span className="blue ital">M</span><span className="ital">odelos.</span>
              </h1>
              <p className="hero-sub"><em>Da passarela física ao império digital.</em> O guia honesto de quem quer ser modelo no Brasil de hoje — escrito por quem está do outro lado da mesa.</p>
            </div>
            <div className="hero-meta">
              <div className="cell"><span className="k">Autor</span><span className="v">Angelo Mazzutti</span></div>
              <div className="cell"><span className="k">Formato</span><span className="v">Ebook · PDF</span></div>
              <div className="cell"><span className="k">Capítulos</span><span className="v">12 + 12 checklists</span></div>
              <div className="cell"><span className="k">Páginas</span><span className="v">281</span></div>
            </div>
          </div>
          <div className="hero-right">
            <div className="cover-stack">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={COVER} alt="Capa do livro Marketing para Modelos" />
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <span>★ Marca não se constrói com estética · se constrói com leitura</span>
          <span>Pré-venda aberta · Edição inaugural</span>
        </div>
      </header>

      {/* PULL QUOTE */}
      <section className="pullband">
        <div className="wrap">
          <p className="quote">
            A maior parte da informação que circula sobre <em>como começar uma carreira</em> de modelo no Brasil <span className="em">é mentira.</span><br/>
            E grande parte dela é <em>mentira lucrativa.</em>
          </p>
          <div className="attr">— Trecho da introdução · Angelo Mazzutti</div>
          <div className="rule-mondrian strip"><span></span><span></span><span></span><span></span></div>
        </div>
      </section>

      {/* PROMESSA */}
      <section className="promise">
        <div className="wrap">
          <div className="promise-head">
            <h2><span>O que você</span><em>tem em mãos.</em></h2>
            <p className="lede">Esse livro foi escrito do lado de quem contrata, dirige a narrativa e aprova quem vai pra campanha — sobre como você pode chegar melhor preparada. É o ângulo que faltava no mercado.</p>
          </div>
          <div className="promise-cols">
            <div className="col isnot">
              <h3>Esse livro não é</h3>
              <ul>
                <li>Um manual de poses</li>
                <li>Um conjunto de afirmações motivacionais</li>
                <li>Uma lista de agências para mandar email</li>
                <li>Uma promessa de que você vai ser modelo</li>
              </ul>
            </div>
            <div className="col is">
              <h3>Esse livro é</h3>
              <ul>
                <li>Um mapa do mercado de modelos no Brasil em 2026</li>
                <li>Um filtro pra decidir antes de gastar dinheiro</li>
                <li>Um guia prático dos primeiros doze meses</li>
                <li>A informação que separa passo informado de passo emocional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SUMÁRIO */}
      <section className="toc-sec" id="sumario">
        <div className="wrap">
          <div className="head">
            <h2>Sumário<em>.</em></h2>
            <div></div>
            <p className="desc"><em>Doze capítulos. Doze checklists. Você pode ler em ordem — e eu recomendo.</em></p>
          </div>
          <div className="toc-grid">
            {CHAPTERS.map((c) => (
              <article key={c.n} className="toc-card" data-accent={c.accent}>
                <div className="num">{c.n}<span className="accent">.</span></div>
                <div className="tag">{c.part}</div>
                <div className="title">{c.title}</div>
                <div className="pages"><span>{c.tag}</span><span>{c.page}</span></div>
              </article>
            ))}
          </div>
          <div className="toc-foot">
            <span>+ <strong>Conclusão</strong> · Carta final do Angelo · p. 271</span>
            <span><strong>281</strong> páginas no total</span>
          </div>
        </div>
      </section>

      {/* EXCERPT */}
      <section className="excerpt" id="trecho">
        <div className="wrap-narrow excerpt-grid" style={{ maxWidth: 1180 }}>
          <aside className="meta">
            <div className="label">Trecho · Introdução</div>
            <h3>Por que esse livro precisa existir.</h3>
            <div className="from">Páginas 17 – 19 · primeira edição, 2026</div>
          </aside>
          <div className="excerpt-body">
            <p className="dropcap">Esse livro nasceu de uma frase que ouvi de uma menina de 17 anos numa sala de espera de agência em São Paulo, no fim de 2024. Ela tinha vindo de Goiânia, sozinha, com um book de R$ 4.500 que a mãe parcelou em dez. Estava sentada do meu lado, esperando ser atendida. Olhou pra mim e perguntou:</p>
            <p className="pullquote">— Você acha que eu tenho perfil?</p>
            <p>Eu não respondi naquele dia. Disse alguma coisa educada e desviei. Mas saí pensando nela por semanas. Porque a pergunta dela — <em>eu tenho perfil?</em> — não tinha como ser respondida ali, naquele segundo, por um estranho. E mesmo assim era a única pergunta que importava pra ela. E ela tinha investido R$ 4.500 da família sem saber a resposta.</p>
            <p>Esse livro é a resposta que eu não dei naquele dia. Não pra ela especificamente — talvez ela nem leia isso. Mas pras outras que vão sentar naquela sala de espera nos próximos anos, com R$ 4.500 do orçamento da família investidos em algo que ninguém lhes explicou.</p>
          </div>
        </div>
      </section>

      {/* GALLERY · objeto físico */}
      <section className="gallery">
        <div className="wrap">
          <div className="gallery-head">
            <div>
              <div className="eyebrow">Objeto editorial</div>
              <h2>Um livro <em>pra ter na mão</em> — não pra rolar no feed.</h2>
            </div>
            <p className="copy">Diagramação editorial, paleta Mondrian sobre lima saturado, capa em peso de revista de moda. Pensado pra ficar visível na estante — e ser aberto antes de cada decisão importante de carreira.</p>
          </div>

          <div className="gallery-grid">
            <figure>
              <div className="ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOCKUP_CHAIR} alt="Marketing para Modelos · House Mazzutti Vol. 01 sobre cadeira de aço" loading="lazy" />
              </div>
              <figcaption><span>01 · Editorial</span><strong>Vol. 01 · 2026</strong></figcaption>
            </figure>

            <figure className="tall">
              <div className="ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOCKUP_HANDS} alt="Mãos segurando o livro Marketing para Modelos · House Mazzutti" loading="lazy" />
              </div>
              <figcaption><span>02 · Escala real</span><strong>15 × 22 cm</strong></figcaption>
            </figure>

            <figure>
              <div className="ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOCKUP_FRONT} alt="Capa frontal · Marketing para Modelos · da passarela física ao império digital" loading="lazy" />
              </div>
              <figcaption><span>03 · Capa</span><strong>House Mazzutti Edições</strong></figcaption>
            </figure>
          </div>

          <div className="gallery-foot">
            <span>★ Marca pessoal · Posicionamento · Carreira · Monetização</span>
            <div className="rule-mondrian"><span></span><span></span><span></span><span></span></div>
            <span>House Mazzutti Academy · MMXXVI</span>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="audience">
        <div className="wrap">
          <div className="audience-head">
            <div>
              <div className="eyebrow">Para quem foi escrito</div>
              <h2>Esse livro <em>é pra você</em> se em algum momento…</h2>
            </div>
            <p className="copy">Eu prefiro vender menos e acertar do que vender mais e te frustrar. Se você se reconhece em pelo menos um destes cenários, esse livro foi feito pra encurtar muito do seu caminho.</p>
          </div>
          <div className="audience-grid">
            {AUDIENCE.map((a) => (
              <article key={a.n} className="aud-card">
                <div className="num">{a.n}</div>
                <div className="ttl">{a.t}</div>
                <div className="d">{a.d}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="author" id="autor">
        <div className="wrap">
          <div className="author-grid">
            <aside className="author-card">
              <div className="mondrian-pill">
                <div className="a"></div>
                <div className="b"></div>
                <div className="c"></div>
                <div className="d"></div>
              </div>
              <div className="label">O autor</div>
              <div className="nm">Angelo<br/><em>Mazzutti.</em></div>
              <div className="role">Publicitário, estrategista de marca e diretor criativo da House Mazzutti — São Paulo.</div>
              <div className="meta-rows">
                <div className="row"><span>Atuação</span><span className="v">+15 anos</span></div>
                <div className="row"><span>Frentes</span><span className="v">Agência · Produtora · Studio</span></div>
                <div className="row"><span>Cidade</span><span className="v">São Paulo, Brasil</span></div>
                <div className="row"><span>Selo</span><span className="v">House Mazzutti Edições</span></div>
              </div>
            </aside>
            <div className="author-body">
              <h2>Quem te escreve <em>não é modelo.</em><br/>É quem fica do outro lado da mesa.</h2>
              <p>Sou publicitário de formação, estrategista de marca por escolha, e diretor criativo no dia a dia. Construí a House Mazzutti exatamente porque, em algum momento, percebi que não dava mais pra separar essas três disciplinas.</p>
              <p>Quem hoje contrata uma modelo não está contratando uma foto — está contratando um pedaço da narrativa de uma marca. E quem está contratando essa narrativa precisa pensar marketing, produção e direção criativa ao mesmo tempo.</p>
              <p>Esse livro foi escrito pelo lado de quem contrata e pelo lado de quem dirige a narrativa, sobre como o lado de quem é contratado pode chegar melhor preparado.</p>
              <div className="signature">— Angelo Mazzutti</div>
              <div className="triangle">
                <div className="cell"><div className="k">Agência</div><div className="v">Estratégia e posicionamento de marca.</div></div>
                <div className="cell"><div className="k">Produtora</div><div className="v">Execução visual com padrão de campanha.</div></div>
                <div className="cell"><div className="k">Studio</div><div className="v">Desenvolvimento de imagem de talentos.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testi-head">
            <div>
              <div className="eyebrow">O que estão dizendo</div>
              <h2><span>Leitoras da pré-venda,</span> <em>em outubro de 2026.</em></h2>
            </div>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="testi">
                <p className="q">“{t.q}”</p>
                <div className="who">
                  <div className="av">{t.a}</div>
                  <div><div className="nm">{t.n}</div><div className="role">{t.r}</div></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="comprar">
        <div className="wrap">
          <div className="pricing-head">
            <div className="eyebrow">Edição de lançamento · Volume 01</div>
            <h2>Antes do próximo<br/>casting <em className="em">vale ler.</em></h2>
          </div>
          <div className="price-card">
            <div className="price-left">
              <div>
                <div className="badge"><span className="dot"></span> Pré-venda aberta · vagas limitadas</div>
                <h3><span>Marketing para Modelos</span><em>Vol. 01 · 2026</em></h3>
              </div>
              <div className="product-meta">
                <div className="row"><span>Formato</span><span className="v">Ebook · PDF (alta)</span></div>
                <div className="row"><span>Páginas</span><span className="v">281</span></div>
                <div className="row"><span>Capítulos</span><span className="v">12 + 12 checklists</span></div>
                <div className="row"><span>Entrega</span><span className="v">Imediata após o pix</span></div>
                <div className="row"><span>Atualizações</span><span className="v">Vitalícias na v.1</span></div>
              </div>
            </div>
            <div className="price-right">
              <div className="num-line">
                <span className="strike">de R$ 197</span>
                <span className="pill">−42% lançamento</span>
              </div>
              <div className="price"><span className="cur">R$</span>117</div>
              <div className="pix-line"><em>ou 12× de R$ 12,30 no cartão · pix com 5% off</em></div>
              <div className="price-cta">
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
            <div className="g-num"><em>7</em></div>
            <div className="g-body">
              <div className="k">Garantia incondicional</div>
              <div className="v"><em>Sete dias para ler, testar nas suas decisões e desistir.</em> Se não fizer sentido pra você, devolvemos cem por cento — sem perguntar nada.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="wrap">
          <div className="faq-head">
            <h2>Perguntas<br/><em>honestas.</em></h2>
            <p className="copy">As mesmas que aparecem na caixa de entrada da House. Se a sua não estiver aqui, escreve direto: <strong>academy@housemazzutti.com</strong></p>
          </div>
          <div className="faq-list">
            {FAQ.map((f) => (
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

      {/* FINAL */}
      <section className="final">
        <div className="wrap-narrow">
          <p className="quote">
            Quem tem informação <span className="lime">economiza dinheiro.</span><br/>
            Quem tem informação <em>chega na agência preparado</em> e é levado a sério.<br/>
            Quem tem informação <span className="red">sabe quando insistir e quando parar.</span>
          </p>
          <p className="sub">Esse livro existe pra te dar essa informação — antes do próximo book, antes do próximo casting, antes do próximo pix.</p>
          <div className="cta-row">
            <a href="#comprar" className="btn-primary">Garantir meu exemplar <span>→</span></a>
            <a href="#sumario" className="btn-secondary">Ver o sumário completo</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mpm-footer">
        <div className="mega-mark">
          <div className="mark-inner">
            <span className="l">House Mazzutti<em>.</em></span>
          </div>
          <div className="wrap mark-foot">
            <span>Académia</span>
            <span>Vol. 01 · 2026 · São Paulo</span>
            <span>Edições</span>
          </div>
        </div>
        <div className="wrap">
          <div className="footer-grid">
            <div className="brand-block col">
              <h4>O selo</h4>
              <span className="dim" style={{ textTransform: 'none', letterSpacing: '0.005em', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15 }}>
                House Mazzutti Edições — selo editorial da House Mazzutti, dirigido por Angelo Mazzutti.
              </span>
              <p className="meta">Marca não se constrói com estética<br/>— se constrói com leitura.</p>
            </div>
            <div className="col">
              <h4>Catálogo</h4>
              <a href="#sumario">Vol. 01 · Marketing para Modelos</a>
              <span className="dim">Vol. 02 · em breve</span>
              <span className="dim">Vol. 03 · em breve</span>
            </div>
            <div className="col">
              <h4>House Mazzutti</h4>
              <a href="/agencia">Agência</a>
              <a href="/produtora">Produtora</a>
              <a href="/studio">Studio</a>
              <a href="#">Academy</a>
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
  );
}
