/**
 * Landing · Livro Vol. 03 — Operação Criativa
 * House Mazzutti Academy · Vol. 03 · 2026
 * 336 páginas · 12 capítulos · 3 partes · Ângelo Mazzutti
 */
import React from 'react'
import SiteFooterLinks from '@/app/components/SiteFooterLinks'
import Image from 'next/image'
import Link from 'next/link'

const SITE_URL   = 'https://housemazzutti.com'
const COVER      = '/images/academy/casos-da-producao/cover.webp'
const COVER_ABS  = `${SITE_URL}${COVER}`
const CHECKOUT_URL = '/pt/checkout/casos-da-producao'

const TITULO = 'Operação Criativa'
const SUBTITULO = 'Não é estética. É leitura. Ensaio autoral de Ângelo Mazzutti sobre vinte anos dirigindo a publicidade brasileira por dentro. 336 páginas. House Mazzutti Academy, Vol. 03 · 2026.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${TITULO} · Livro de Ângelo Mazzutti sobre direção criativa brasileira`,
  description: SUBTITULO,
  keywords: [
    'livro de direção criativa',
    'ângelo mazzutti livro',
    'operação criativa livro',
    'house mazzutti academy',
    'direção criativa brasileira',
    'livro sobre publicidade brasileira',
    'ofício do diretor criativo',
    'método de direção criativa',
    'agência boutique brasileira',
    'como dirigir agência criativa',
  ],
  authors: [{ name: 'Ângelo Mazzutti', url: SITE_URL }],
  creator: 'Ângelo Mazzutti',
  publisher: 'House Mazzutti Editora',
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  alternates: { canonical: `${SITE_URL}/pt/academy/casos-da-producao` },
  openGraph: {
    type: 'book',
    locale: 'pt_BR',
    url: `${SITE_URL}/pt/academy/casos-da-producao`,
    siteName: 'House Mazzutti',
    title: `${TITULO} — Ângelo Mazzutti`,
    description: 'Não é estética. É leitura. Vinte anos dirigindo a publicidade brasileira por dentro.',
    images: [{ url: COVER_ABS, width: 1200, height: 630, alt: `Capa do livro ${TITULO}, de Ângelo Mazzutti — House Mazzutti Academy Vol. 03` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITULO} — Ângelo Mazzutti`,
    description: 'Não é estética. É leitura.',
    images: [COVER_ABS],
    creator: '@housemazzutti',
  },
}

/* ─── 7 casos ───────────────────────────────────────────────────── */
const CAPITULOS = [
  { n: '01', tag: 'Parte I · Dentro',  title: 'A operação invisível',          sub: 'O que acontece entre o briefing e a entrega que ninguém escreve em case.', detail: 'Abertura · Parte I',       pg: '17' },
  { n: '02', tag: 'Parte I · Dentro',  title: 'Direção é decisão',              sub: 'Sobre as escolhas internas que nenhum cliente vê — e que sustentam todo o resto.', detail: 'Decisão · método', pg: '37' },
  { n: '03', tag: 'Parte I · Dentro',  title: 'Briefing como diagnóstico',      sub: 'Por que a maior parte das campanhas falha antes de existir.', detail: 'Cliente · escopo · risco', pg: '59' },
  { n: '04', tag: 'Parte I · Dentro',  title: 'A política da estética',         sub: 'Gosto não é neutro. O lado de quem decide o que é "bonito" na sala de aprovação.', detail: 'Aprovação · poder · linguagem', pg: '83' },
  { n: '05', tag: 'Parte II · Defesa', title: 'Equipe criativa não é planilha', sub: 'Construir, manter e perder gente — o que sustenta um time além do salário.', detail: 'Liderança · cultura · saída', pg: '107' },
  { n: '06', tag: 'Parte II · Defesa', title: 'A reunião que decide tudo',      sub: 'A apresentação criativa como ato político — defender ideia sem trair a ideia.', detail: 'Apresentação · defesa · entrega', pg: '129' },
  { n: '07', tag: 'Parte II · Defesa', title: 'O custo do não',                 sub: 'Quando dizer não pra cliente, pra ideia, pra job. E o que sobra depois.', detail: 'Limite · ética · margem', pg: '153' },
  { n: '08', tag: 'Parte II · Defesa', title: 'Produção é narrativa',           sub: 'Cronograma, orçamento e set como camadas de uma só história — não áreas separadas.', detail: 'Execução · integração', pg: '177' },
  { n: '09', tag: 'Parte III · Fora',  title: 'A entrega depois da entrega',    sub: 'Pós-campanha: o que define se uma marca te recontrata em 6 meses ou nunca mais.', detail: 'Recompra · vínculo · legado', pg: '203' },
  { n: '10', tag: 'Parte III · Fora',  title: 'Agência boutique como tese',     sub: 'Por que uma estrutura pequena e dirigida vence escala genérica em mercado adulto.', detail: 'Negócio · escala · escolha', pg: '229' },
  { n: '11', tag: 'Parte III · Fora',  title: 'Falhar com método',              sub: 'As campanhas que erraram — e por que continuam ensinando dez anos depois.', detail: 'Falha · aprendizado · honestidade', pg: '257' },
  { n: '12', tag: 'Parte III · Fora',  title: 'Carta ao diretor criativo iniciante', sub: 'O que eu diria pra mim mesmo aos vinte e cinco, sabendo o que sei aos quarenta e cinco.', detail: 'Carta · síntese · próxima geração', pg: '297' },
]

const AUDIENCE = [
  { n: '01', ttl: 'Você dirige uma agência criativa, produtora ou studio e quer ler quem ainda está dentro da operação.',                            d: 'Doze capítulos sobre as decisões que ninguém escreve em case — política interna, equipe, defesa de ideia, relação com cliente. Escrito por quem dirige uma boutique brasileira há mais de vinte anos.' },
  { n: '02', ttl: 'É diretor criativo, head de arte ou produtor executivo e procura ensaio adulto sobre o ofício.',                                 d: 'Não é introdução à publicidade. É reflexão sobre o que se aprende dirigindo — acertos, erros, padrões que se repetem. Para quem já vive a rotina e quer reorganizar como decide.' },
  { n: '03', ttl: 'Está montando uma agência boutique e precisa de referência de método, não de manual genérico.',                                 d: 'A Parte III sintetiza por que uma estrutura pequena e dirigida vence escala genérica em mercado adulto. Tese, não receita.' },
  { n: '04', ttl: 'É cliente — marca, fundador, CMO — e quer entender por dentro como uma operação criativa séria funciona.',                       d: 'Leitura que muda como você briefa, aprova e dá feedback. Cliente que entende a operação contrata melhor, recontrata mais, paga menos retrabalho.' },
  { n: '05', ttl: 'Está começando como diretor criativo e quer um mapa escrito por quem já fez o caminho.',                                         d: 'A "Carta ao diretor criativo iniciante" (capítulo final) condensa o que o autor diria a si mesmo aos vinte e cinco anos. Atalho real para evitar erros caros.' },
]

const FAQS = [
  { n: '01', q: 'É manual técnico, ensaio autoral ou livro de negócios?', a: 'Ensaio autoral com método embutido. Cada capítulo é uma reflexão em primeira pessoa, com pontos práticos no fim. Não é manual passo-a-passo — é leitura adulta que reorganiza como você decide. Quem espera template encontrará tese; quem espera tese encontrará prática aplicada.' },
  { n: '02', q: 'Quem deve ler este livro?', a: 'Diretores criativos, donos de agência boutique, produtores executivos, profissionais de branding e marca que já operam no mercado. Também serve para clientes adultos que querem entender por dentro como uma operação criativa séria funciona.' },
  { n: '03', q: 'A compra inclui livro impresso e ebook?', a: 'Sim. Edição inaugural inclui o livro impresso (formato 16 × 23 cm, capa fosca, 336 páginas) com frete incluso para todo o Brasil e o ebook em PDF de alta resolução com acesso imediato após o pagamento — você começa a ler enquanto o físico não chega.' },
  { n: '04', q: 'Quanto tempo o impresso leva para chegar?', a: 'Brasil inteiro. Capitais 3–5 dias úteis · interior 5–10 dias úteis. O ebook chega no seu e-mail em até cinco minutos depois da confirmação do pagamento — pix é imediato, cartão depende do antifraude.' },
  { n: '05', q: 'Há tradução em inglês ou espanhol?', a: 'Por enquanto só português brasileiro. Tradução em estudo para a segunda tiragem. Assine a newsletter da House Mazzutti para ser avisado quando sair — sem spam, só lançamentos.' },
  { n: '06', q: 'E se eu comprar e não gostar?', a: 'Sete dias de garantia incondicional (Art. 49 CDC). Escreve pra academy@housemazzutti.com dizendo que não foi pra você — devolvemos o valor integral. Sem formulário, sem ligação, sem justificativa. Você fica com o livro.' },
]

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function CasosDaProducaoPage() {
  const css = `
    .cdp-root {
      --paper: #f0e8d6;
      --paper-warm: #e8dfc8;
      --paper-edge: #ddd4ba;
      --ink: #0a0a08;
      --ink-soft: #1a1a16;
      --ink-mute: #5a5646;
      --ink-light: #8a8470;
      --rule-soft: #d0c8b0;
      --forest: #0a0a08;
      --forest-deep: #0a0a08;
      --forest-light: #3a3830;
      --signal: #c9a85c;
      --display: "Anton", "Oswald", "Impact", sans-serif;
      --serif: "Source Serif 4", "Source Serif Pro", Georgia, serif;
      --sans: "Inter", Arial, sans-serif;
      --mono: "JetBrains Mono", "IBM Plex Mono", "Courier New", monospace;
      background: var(--paper);
      color: var(--ink);
      font-family: var(--serif);
      font-size: 17px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .cdp-root *, .cdp-root *::before, .cdp-root *::after { box-sizing: border-box; }
    .cdp-root a { color: inherit; }
    .cdp-root img { display: block; max-width: 100%; }
    .cdp-root .wrap { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
    .cdp-root .wrap-narrow { max-width: 880px; margin: 0 auto; padding: 0 32px; }

    .cdp-root .eyebrow { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--forest); }

    /* Ticker */
    .cdp-root .ticker { background: var(--forest-deep); color: var(--paper); overflow: hidden; }
    .cdp-root .ticker-track { display: flex; gap: 56px; white-space: nowrap; padding: 12px 0; font-family: var(--mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; animation: cdp-marquee 48s linear infinite; width: max-content; }
    .cdp-root .ticker-track span { opacity: 0.78; }
    .cdp-root .ticker-track .star { color: var(--signal); opacity: 1; }
    @keyframes cdp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* Masthead */
    .cdp-root .masthead { background: var(--paper); border-bottom: 1px solid var(--ink); padding: 22px 0 18px; }
    .cdp-root .masthead-inner { max-width: 1440px; margin: 0 auto; padding: 0 48px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; }
    .cdp-root .masthead-brand { text-decoration: none; color: var(--ink); display: inline-block; line-height: 1; }
    .cdp-root .hm-tag { font-family: var(--mono); font-weight: 500; font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; }
    .cdp-root .masthead-center { display: flex; align-items: center; gap: 18px; justify-self: center; }
    .cdp-root .hm-divider { width: 1px; height: 14px; background: var(--ink); opacity: 0.4; }
    .cdp-root .masthead-right { justify-self: end; color: var(--ink-mute); }

    /* Nav */
    .cdp-root .nav { position: sticky; top: 0; z-index: 50; background: rgba(242,239,232,0.94); border-bottom: 1px solid var(--rule-soft); backdrop-filter: blur(8px); }
    .cdp-root .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 48px; max-width: 1440px; margin: 0 auto; }
    .cdp-root .nav-brand { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); display: flex; align-items: center; gap: 14px; text-decoration: none; }
    .cdp-root .nav-brand .pip { width: 7px; height: 7px; background: var(--forest); display: inline-block; }
    .cdp-root .nav-links { display: flex; align-items: center; gap: 30px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .cdp-root .nav-links a { color: inherit; text-decoration: none; transition: color .2s; }
    .cdp-root .nav-links a:hover { color: var(--forest); }
    .cdp-root .nav-cta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--paper); background: var(--forest); padding: 10px 18px; text-decoration: none; transition: background .2s; font-weight: 500; }
    .cdp-root .nav-cta:hover { background: var(--ink); }

    /* Hero */
    .cdp-root .hero { background: #0a0a08; background-image: radial-gradient(ellipse at top right, rgba(201,168,92,0.18), transparent 55%), radial-gradient(ellipse at bottom left, rgba(0,0,0,0.6), transparent 70%); color: var(--paper); position: relative; overflow: hidden; }
    .cdp-root .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: stretch; min-height: 92vh; padding: 64px 56px 80px; max-width: 1440px; margin: 0 auto; }
    .cdp-root .hero-left { display: flex; flex-direction: column; justify-content: space-between; gap: 40px; }
    .cdp-root .hero-tag { display: flex; align-items: center; gap: 14px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); }
    .cdp-root .hero-tag .dot { width: 8px; height: 8px; background: var(--signal); display: inline-block; }
    .cdp-root .hero-tag .ms { flex: 1; height: 1px; background: var(--paper); opacity: 0.35; max-width: 200px; }
    .cdp-root .hero-headline { font-family: var(--display); font-weight: 400; font-size: clamp(56px, 9vw, 148px); line-height: 0.88; letter-spacing: -0.018em; margin: 28px 0 0; color: var(--paper); text-transform: uppercase; }
    .cdp-root .hero-headline .da { color: var(--paper); opacity: 0.5; font-size: 0.5em; vertical-align: middle; padding: 0 0.1em; }
    .cdp-root .hero-sub { font-family: var(--serif); font-style: italic; font-size: clamp(18px, 1.7vw, 26px); line-height: 1.32; color: var(--paper); max-width: 560px; margin: 36px 0 0; opacity: 0.9; border-left: 2px solid var(--signal); padding-left: 18px; }
    .cdp-root .hero-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 36px; padding-top: 22px; border-top: 1px solid rgba(242,239,232,0.25); }
    .cdp-root .hero-meta .cell .k { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); opacity: 0.55; display: block; margin-bottom: 6px; }
    .cdp-root .hero-meta .cell .v { font-family: var(--serif); font-style: italic; font-size: 18px; line-height: 1.1; color: var(--paper); }
    .cdp-root .hero-right { position: relative; display: flex; align-items: center; justify-content: center; }
    .cdp-root .cover-stack { position: relative; width: 100%; max-width: 420px; aspect-ratio: 2 / 3; transform: rotate(-2deg); filter: drop-shadow(0 35px 70px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.4)); transition: transform .6s cubic-bezier(.2,.7,.3,1); }
    .cdp-root .cover-stack:hover { transform: rotate(-0.8deg) translateY(-6px); }
    .cdp-root .cover-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--forest) 0%, var(--forest-deep) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; border: 1px solid rgba(242,239,232,0.15); }
    .cdp-root .cover-placeholder .vol { font-family: var(--mono); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); opacity: 0.5; }
    .cdp-root .cover-placeholder .num { font-family: var(--display); font-weight: 400; font-size: 120px; line-height: 0.85; color: var(--paper); opacity: 0.15; letter-spacing: -0.02em; }
    .cdp-root .cover-placeholder .label { font-family: var(--display); font-weight: 400; font-size: 22px; text-transform: uppercase; color: var(--paper); opacity: 0.4; letter-spacing: -0.01em; text-align: center; padding: 0 24px; }
    .cdp-root .grid-marks { position: absolute; top: 30px; left: 56px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em; color: rgba(242,239,232,0.28); line-height: 1.7; }
    .cdp-root .grid-marks-r { position: absolute; bottom: 80px; right: 56px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em; color: rgba(242,239,232,0.28); line-height: 1.7; text-align: right; }
    .cdp-root .hero-foot { border-top: 1px solid rgba(242,239,232,0.15); padding: 18px 56px; display: flex; justify-content: space-between; align-items: center; font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--paper); background: rgba(0,0,0,0.3); max-width: 1440px; margin: 0 auto; }
    .cdp-root .hero-foot .star { color: var(--signal); }

    /* Pullband */
    .cdp-root .pullband { background: var(--ink); color: var(--paper); padding: 130px 0 120px; text-align: center; position: relative; overflow: hidden; }
    .cdp-root .pullband::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 800px; background: radial-gradient(circle, rgba(42,74,46,0.5), transparent 70%); pointer-events: none; }
    .cdp-root .pullband .wrap { position: relative; }
    .cdp-root .pullband .quote { font-family: var(--display); font-weight: 400; font-size: clamp(40px, 5.6vw, 96px); line-height: 0.96; letter-spacing: -0.012em; text-transform: uppercase; color: var(--paper); margin: 0 auto; max-width: 1080px; }
    .cdp-root .pullband .quote .em { color: var(--signal); display: block; }
    .cdp-root .pullband .attr { margin-top: 48px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--paper); opacity: 0.55; }
    .cdp-root .pullband .strip { width: 80px; height: 3px; background: var(--signal); margin: 30px auto 0; }

    /* Promessa */
    .cdp-root .promise { background: var(--paper); padding: 110px 0 130px; border-bottom: 1px solid var(--rule-soft); }
    .cdp-root .promise-head { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; margin-bottom: 64px; align-items: end; }
    .cdp-root .promise-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(44px, 5.6vw, 88px); line-height: 0.92; letter-spacing: -0.018em; color: var(--ink); margin: 0; }
    .cdp-root .promise-head h2 em { font-style: normal; color: var(--forest); display: block; }
    .cdp-root .promise-head .lede { font-family: var(--serif); font-size: 19px; line-height: 1.6; color: var(--ink-soft); border-left: 2px solid var(--forest); padding-left: 18px; }
    .cdp-root .promise-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); }
    .cdp-root .promise-cols .col { padding: 42px 40px 50px; }
    .cdp-root .promise-cols .col.is { background: var(--forest-deep); color: var(--paper); }
    .cdp-root .promise-cols .col.isnot { background: var(--paper); color: var(--ink); border-right: 1px solid var(--ink); }
    .cdp-root .promise-cols .col h3 { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; margin: 0 0 28px; display: flex; align-items: center; gap: 12px; }
    .cdp-root .promise-cols .col.is h3 { color: var(--signal); }
    .cdp-root .promise-cols .col.isnot h3 { color: var(--forest); }
    .cdp-root .promise-cols .col h3::before { content: ""; width: 24px; height: 2px; background: currentColor; }
    .cdp-root .promise-cols ul { list-style: none; padding: 0; margin: 0; }
    .cdp-root .promise-cols ul li { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: 21px; line-height: 1.32; padding: 18px 0 18px 36px; position: relative; border-bottom: 1px solid; }
    .cdp-root .promise-cols .col.is ul li { border-color: rgba(242,239,232,0.14); }
    .cdp-root .promise-cols .col.isnot ul li { border-color: var(--rule-soft); }
    .cdp-root .promise-cols ul li:last-child { border-bottom: 0; }
    .cdp-root .promise-cols .col.is ul li::before { content: "+"; position: absolute; left: 0; top: 16px; font-family: var(--mono); font-style: normal; font-weight: 600; font-size: 16px; color: var(--signal); }
    .cdp-root .promise-cols .col.isnot ul li::before { content: "×"; position: absolute; left: 0; top: 14px; font-family: var(--mono); font-style: normal; font-weight: 600; font-size: 20px; color: var(--forest); }

    /* TOC — sumário */
    .cdp-root .toc-sec { background: var(--paper-warm); padding: 120px 0 130px; }
    .cdp-root .toc-sec .head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .cdp-root .toc-sec .head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(64px, 9vw, 148px); line-height: 0.88; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .cdp-root .toc-sec .head h2 em { font-style: normal; color: var(--forest); }
    .cdp-root .toc-sec .head .desc { font-family: var(--serif); font-style: italic; font-size: 20px; line-height: 1.45; color: var(--ink-soft); }
    .cdp-root .toc-list { border-top: 1.5px solid var(--ink); }
    .cdp-root .toc-item { display: grid; grid-template-columns: 80px 1fr auto; gap: 28px; align-items: baseline; padding: 28px 0; border-bottom: 1px solid var(--rule-soft); transition: background .2s; cursor: default; }
    .cdp-root .toc-item:hover { background: var(--paper); padding-left: 12px; padding-right: 12px; margin: 0 -12px; }
    .cdp-root .toc-item .num { font-family: var(--display); font-weight: 400; font-size: 48px; line-height: 0.9; color: var(--forest); letter-spacing: -0.02em; }
    .cdp-root .toc-item .body .tag { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--forest-light); margin-bottom: 6px; }
    .cdp-root .toc-item .body .title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 26px; line-height: 1.0; color: var(--ink); letter-spacing: -0.01em; }
    .cdp-root .toc-item .body .sub { font-family: var(--serif); font-style: italic; font-size: 15px; line-height: 1.4; color: var(--ink-mute); margin-top: 4px; }
    .cdp-root .toc-item .meta { text-align: right; }
    .cdp-root .toc-item .meta .detail { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-mute); }
    .cdp-root .toc-item .meta .pg { font-family: var(--mono); font-size: 11px; color: var(--ink); margin-top: 6px; }
    .cdp-root .toc-foot { margin-top: 24px; padding-top: 18px; border-top: 1.5px solid var(--ink); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .cdp-root .toc-foot strong { color: var(--ink); }

    /* Excerpt */
    .cdp-root .excerpt { background: var(--ink); color: var(--paper); padding: 130px 0; position: relative; overflow: hidden; }
    .cdp-root .excerpt-grid { display: grid; grid-template-columns: 0.85fr 1.6fr; gap: 80px; align-items: start; max-width: 1180px; margin: 0 auto; padding: 0 48px; }
    .cdp-root .excerpt .meta { position: sticky; top: 100px; }
    .cdp-root .excerpt .meta .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--signal); margin-bottom: 18px; display: flex; align-items: baseline; gap: 12px; }
    .cdp-root .excerpt .meta .label::after { content: ""; flex: 1; height: 1px; background: var(--signal); max-width: 80px; opacity: 0.55; }
    .cdp-root .excerpt .meta h3 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 44px; line-height: 0.96; color: var(--paper); margin: 0 0 22px; letter-spacing: -0.012em; }
    .cdp-root .excerpt .meta .from { font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--paper); opacity: 0.55; }
    .cdp-root .excerpt-body p { font-family: var(--serif); font-size: 18px; line-height: 1.65; color: var(--paper); opacity: 0.93; margin: 0 0 1.2em; }
    .cdp-root .excerpt-body p.dropcap::first-letter { font-family: var(--display); font-weight: 400; font-size: 4.2em; line-height: 0.92; float: left; padding: 0.06em 0.12em 0 0; color: var(--signal); margin-right: 0.06em; }
    .cdp-root .excerpt-body .pullquote { font-family: var(--display); font-weight: 400; font-size: 34px; line-height: 1.0; text-transform: uppercase; color: var(--signal); margin: 1.4em -8px; padding: 18px 22px; border-left: 4px solid var(--signal); background: rgba(42,74,46,0.22); letter-spacing: -0.01em; }

    /* Audience */
    .cdp-root .audience { background: var(--paper); padding: 120px 0 130px; border-bottom: 1px solid var(--rule-soft); }
    .cdp-root .audience-head { display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px; align-items: end; margin-bottom: 56px; }
    .cdp-root .audience-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(40px, 5.2vw, 76px); line-height: 0.94; letter-spacing: -0.018em; color: var(--ink); margin: 18px 0 0; }
    .cdp-root .audience-head h2 em { font-style: normal; color: var(--forest); }
    .cdp-root .audience-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .cdp-root .audience-grid { border-top: 1.5px solid var(--ink); }
    .cdp-root .aud-row { display: grid; grid-template-columns: 64px 1fr 1.4fr; gap: 32px; align-items: baseline; padding: 28px 0; border-bottom: 1px solid var(--rule-soft); }
    .cdp-root .aud-row .num { font-family: var(--display); font-weight: 400; font-size: 36px; color: var(--forest); line-height: 1; letter-spacing: -0.02em; }
    .cdp-root .aud-row .ttl { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 20px; line-height: 1.08; color: var(--ink); letter-spacing: -0.005em; }
    .cdp-root .aud-row .d { font-family: var(--serif); font-size: 14.5px; line-height: 1.55; color: var(--ink-soft); }

    /* Author */
    .cdp-root .author { background: var(--paper-warm); padding: 130px 0; }
    .cdp-root .author-grid { display: grid; grid-template-columns: 0.85fr 1.4fr; gap: 64px; align-items: start; }
    .cdp-root .author-card { background: var(--ink); color: var(--paper); padding: 36px 32px 40px; position: sticky; top: 100px; }
    .cdp-root .author-card .strip { height: 4px; background: var(--forest); margin-bottom: 32px; }
    .cdp-root .author-avatar-wrap { position: relative; margin: 0 0 28px; padding-left: 8px; }
    .cdp-root .author-avatar-wrap::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--forest); z-index: 0; }
    .cdp-root .author-avatar { position: relative; z-index: 1; width: 100%; aspect-ratio: 4/5; overflow: hidden; border: 1px solid rgba(242,239,232,0.18); background: var(--ink); }
    .cdp-root .author-avatar-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: grayscale(15%) contrast(1.05); display: block; }
    .cdp-root .author-card .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--signal); margin-bottom: 14px; }
    .cdp-root .author-card .nm { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 52px; line-height: 0.92; color: var(--paper); margin-bottom: 18px; letter-spacing: -0.018em; }
    .cdp-root .author-card .nm em { font-style: normal; color: var(--signal); display: block; }
    .cdp-root .author-card .role { font-family: var(--serif); font-style: italic; font-size: 15px; line-height: 1.45; color: var(--paper); opacity: 0.78; margin-bottom: 28px; }
    .cdp-root .author-card .meta-rows { border-top: 1px solid rgba(242,239,232,0.16); }
    .cdp-root .author-card .meta-rows .row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid rgba(242,239,232,0.16); font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; }
    .cdp-root .author-card .meta-rows .row span:first-child { color: var(--paper); opacity: 0.5; }
    .cdp-root .author-card .meta-rows .row .v { color: var(--paper); font-family: var(--serif); font-style: italic; font-size: 13px; letter-spacing: 0; text-transform: none; }
    .cdp-root .author-body h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(38px, 4.8vw, 72px); line-height: 0.94; color: var(--ink); margin: 0 0 32px; letter-spacing: -0.018em; }
    .cdp-root .author-body h2 em { font-style: normal; color: var(--forest); }
    .cdp-root .author-body p { font-family: var(--serif); font-size: 18px; line-height: 1.65; color: var(--ink-soft); margin: 0 0 1.2em; }
    .cdp-root .author-body .signature { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 28px; color: var(--forest); margin-top: 32px; letter-spacing: -0.01em; }
    .cdp-root .author-body .triangle { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 56px; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); }
    .cdp-root .author-body .triangle .cell { padding: 22px 20px; border-right: 1px solid var(--rule-soft); }
    .cdp-root .author-body .triangle .cell:last-child { border-right: 0; }
    .cdp-root .author-body .triangle .k { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--forest); margin-bottom: 10px; }
    .cdp-root .author-body .triangle .v { font-family: var(--serif); font-style: italic; font-size: 15px; line-height: 1.4; color: var(--ink); }

    /* Pricing */
    .cdp-root .pricing { background: var(--forest-deep); color: var(--paper); padding: 130px 0; position: relative; overflow: hidden; }
    .cdp-root .pricing::before { content: ""; position: absolute; top: -30%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(74,122,80,0.5), transparent 70%); pointer-events: none; }
    .cdp-root .pricing .wrap { position: relative; }
    .cdp-root .pricing-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .cdp-root .pricing-head .eyebrow { color: var(--signal); display: flex; align-items: center; gap: 14px; }
    .cdp-root .pricing-head .eyebrow::after { content: ""; flex: 1; height: 1px; background: var(--signal); max-width: 200px; opacity: 0.55; }
    .cdp-root .pricing-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(44px, 5.6vw, 88px); line-height: 0.94; margin: 18px 0 0; letter-spacing: -0.018em; color: var(--paper); }
    .cdp-root .pricing-head h2 .em { color: var(--signal); display: block; }
    .cdp-root .price-card { background: var(--paper); color: var(--ink); display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--paper); }
    .cdp-root .price-left { padding: 40px 36px 44px; border-right: 1px solid var(--rule-soft); display: flex; flex-direction: column; justify-content: space-between; gap: 32px; }
    .cdp-root .price-left .badge { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--forest); display: inline-flex; align-items: center; gap: 10px; margin-bottom: 18px; }
    .cdp-root .price-left .badge .dot { width: 8px; height: 8px; background: var(--forest); border-radius: 50%; }
    .cdp-root .price-left h3 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 34px; line-height: 0.96; color: var(--ink); margin: 0; letter-spacing: -0.012em; }
    .cdp-root .price-left h3 em { font-family: var(--serif); font-style: italic; font-weight: 400; text-transform: none; font-size: 17px; color: var(--forest); display: block; margin-top: 8px; letter-spacing: 0; }
    .cdp-root .product-meta .row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid var(--rule-soft); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); }
    .cdp-root .product-meta .row .v { color: var(--ink); font-family: var(--serif); font-style: italic; font-size: 14px; letter-spacing: 0; text-transform: none; }
    .cdp-root .price-right { padding: 40px 36px 44px; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
    .cdp-root .num-line { display: flex; align-items: center; gap: 14px; }
    .cdp-root .num-line .pill { background: var(--forest); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; padding: 6px 10px; font-weight: 500; }
    .cdp-root .price { font-family: var(--display); font-weight: 400; font-size: 132px; line-height: 0.86; color: var(--ink); letter-spacing: -0.025em; margin: 8px 0 0; }
    .cdp-root .price .cur { font-family: var(--mono); font-size: 22px; color: var(--forest); letter-spacing: 0; vertical-align: top; margin-right: 8px; font-weight: 500; }
    .cdp-root .pix-line { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-soft); }
    .cdp-root .btn-buy { display: flex; justify-content: space-between; align-items: center; background: var(--forest); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; padding: 22px 26px; text-decoration: none; transition: background .2s; }
    .cdp-root .btn-buy:hover { background: var(--ink); }
    .cdp-root .btn-buy .arrow { font-family: var(--display); font-size: 24px; letter-spacing: 0; }
    .cdp-root .micro { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mute); padding-top: 14px; border-top: 1px solid var(--rule-soft); }
    .cdp-root .guarantee { margin-top: 36px; background: var(--paper-warm); color: var(--ink); display: grid; grid-template-columns: auto 1fr; gap: 32px; align-items: center; padding: 28px 32px; border-left: 4px solid var(--forest); }
    .cdp-root .guarantee .g-num { font-family: var(--display); font-weight: 400; font-size: 96px; line-height: 0.85; color: var(--forest); letter-spacing: -0.03em; }
    .cdp-root .guarantee .k { font-family: var(--mono); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--forest); margin-bottom: 6px; }
    .cdp-root .guarantee .v { font-family: var(--serif); font-size: 17px; line-height: 1.55; color: var(--ink); }
    .cdp-root .guarantee .v em { font-style: italic; }

    /* FAQ */
    .cdp-root .faq { background: var(--paper); padding: 130px 0; border-top: 1px solid var(--rule-soft); }
    .cdp-root .faq-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 56px; align-items: end; }
    .cdp-root .faq-head h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(52px, 6.5vw, 112px); line-height: 0.9; color: var(--ink); margin: 0; letter-spacing: -0.018em; }
    .cdp-root .faq-head h2 em { font-style: normal; color: var(--forest); display: block; }
    .cdp-root .faq-head .copy { font-family: var(--serif); font-size: 18px; line-height: 1.6; color: var(--ink-soft); }
    .cdp-root .faq-head .copy strong { color: var(--forest); }
    .cdp-root .faq-list { border-top: 1.5px solid var(--ink); }
    .cdp-root .faq details { border-bottom: 1px solid var(--rule-soft); transition: background .2s; }
    .cdp-root .faq details[open] { background: var(--paper-warm); }
    .cdp-root .faq summary { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: baseline; padding: 26px 0; cursor: pointer; list-style: none; }
    .cdp-root .faq summary::-webkit-details-marker { display: none; }
    .cdp-root .faq summary .n { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 0.22em; color: var(--forest); }
    .cdp-root .faq summary em { font-family: var(--serif); font-style: italic; font-size: 21px; line-height: 1.35; color: var(--ink); font-weight: 400; }
    .cdp-root .faq summary .plus { font-family: var(--display); font-size: 28px; color: var(--forest); transition: transform .25s; }
    .cdp-root .faq details[open] .plus { transform: rotate(45deg); }
    .cdp-root .faq .a { padding: 0 0 28px 56px; font-family: var(--serif); font-size: 17px; line-height: 1.65; color: var(--ink-soft); max-width: 880px; }

    /* Final */
    .cdp-root .final { background: var(--ink); color: var(--paper); padding: 150px 0 160px; text-align: center; position: relative; overflow: hidden; }
    .cdp-root .final::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 1000px; height: 1000px; background: radial-gradient(circle, rgba(42,74,46,0.38), transparent 65%); pointer-events: none; }
    .cdp-root .final .wrap-narrow { position: relative; }
    .cdp-root .final .quote { font-family: var(--display); font-weight: 400; font-size: clamp(34px, 4.4vw, 68px); line-height: 1.06; text-transform: uppercase; color: var(--paper); margin: 0; letter-spacing: -0.012em; }
    .cdp-root .final .quote .green { color: var(--signal); }
    .cdp-root .final .quote em { font-family: var(--serif); font-style: italic; text-transform: none; color: var(--paper); font-weight: 400; letter-spacing: 0; }
    .cdp-root .final .sub { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.5; color: var(--paper); opacity: 0.78; margin: 40px auto 0; max-width: 600px; }
    .cdp-root .cta-row { margin-top: 56px; display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .cdp-root .btn-primary { background: var(--forest); color: var(--paper); font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 32px; text-decoration: none; transition: background .2s; display: inline-flex; align-items: center; gap: 16px; }
    .cdp-root .btn-primary:hover { background: var(--forest-light); }
    .cdp-root .btn-primary span { font-family: var(--display); font-size: 22px; letter-spacing: 0; }
    .cdp-root .btn-secondary { background: transparent; color: var(--paper); font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; padding: 20px 28px; text-decoration: none; border: 1px solid rgba(242,239,232,0.28); transition: border-color .2s; }
    .cdp-root .btn-secondary:hover { border-color: var(--paper); }

    /* Footer */
    .cdp-root footer { background: var(--paper); color: var(--ink); padding: 0 0 32px; border-top: 1px solid var(--rule-soft); }
    .cdp-root .mega-mark { text-align: center; padding: 80px 0 60px; border-bottom: 1px solid var(--rule-soft); }
    .cdp-root .mega-mark .mark-inner { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(72px, 13vw, 200px); line-height: 0.85; color: var(--ink); letter-spacing: -0.025em; }
    .cdp-root .mega-mark .mark-inner em { font-style: normal; color: var(--forest); }
    .cdp-root .mega-mark .mark-foot { display: flex; justify-content: space-between; margin-top: 32px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-mute); }
    .cdp-root .mega-mark .mark-foot .dot { display: inline-block; width: 4px; height: 4px; background: var(--forest); border-radius: 50%; vertical-align: middle; margin: 0 6px; }
    .cdp-root .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; padding-top: 56px; }
    .cdp-root .footer-grid .col h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--forest); margin: 0 0 18px; font-weight: 600; }
    .cdp-root .footer-grid .col a, .cdp-root .footer-grid .col .dim { display: block; font-family: var(--serif); font-size: 15px; line-height: 1.55; color: var(--ink); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
    .cdp-root .footer-grid .col a:hover { color: var(--forest); }
    .cdp-root .footer-grid .col .dim { color: var(--ink-mute); }
    .cdp-root .footer-grid .brand-block .meta { font-family: var(--serif); font-style: italic; font-size: 17px; line-height: 1.4; color: var(--ink-soft); margin-top: 24px; border-left: 2px solid var(--forest); padding-left: 14px; max-width: 380px; }
    .cdp-root .footer-bottom { display: flex; justify-content: space-between; padding: 24px 0 0; margin-top: 40px; border-top: 1px solid var(--rule-soft); font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-mute); }

    /* Responsivo */
    @media (max-width: 980px) {
      .cdp-root .wrap { padding: 0 28px; }
      .cdp-root .hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 48px 28px 64px; }
      .cdp-root .hero-meta { grid-template-columns: 1fr 1fr; }
      .cdp-root .grid-marks, .cdp-root .grid-marks-r { display: none; }
      .cdp-root .promise-head, .cdp-root .audience-head, .cdp-root .pricing-head, .cdp-root .faq-head, .cdp-root .toc-sec .head { grid-template-columns: 1fr; gap: 24px; }
      .cdp-root .promise-cols { grid-template-columns: 1fr; }
      .cdp-root .promise-cols .col.isnot { border-right: 0; border-bottom: 1px solid var(--ink); }
      .cdp-root .toc-item { grid-template-columns: 56px 1fr; }
      .cdp-root .toc-item .meta { display: none; }
      .cdp-root .aud-row { grid-template-columns: 48px 1fr; }
      .cdp-root .aud-row .d { display: none; }
      .cdp-root .author-grid { grid-template-columns: 1fr; }
      .cdp-root .author-card { position: static; }
      .cdp-root .author-body .triangle { grid-template-columns: 1fr; }
      .cdp-root .author-body .triangle .cell { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
      .cdp-root .price-card { grid-template-columns: 1fr; }
      .cdp-root .price-left { border-right: 0; border-bottom: 1px solid var(--rule-soft); }
      .cdp-root .footer-grid { grid-template-columns: 1fr 1fr; }
      .cdp-root .excerpt-grid { grid-template-columns: 1fr; gap: 40px; }
      .cdp-root .excerpt .meta { position: static; }
      .cdp-root .masthead-inner { grid-template-columns: 1fr; text-align: center; }
      .cdp-root .masthead-center, .cdp-root .masthead-right { justify-self: center; }
      .cdp-root .nav-inner { padding: 14px 28px; flex-direction: column; gap: 14px; }
      .cdp-root .nav-links { gap: 18px; flex-wrap: wrap; justify-content: center; }
      .cdp-root .footer-bottom { flex-direction: column; gap: 12px; }
      .cdp-root .cover-stack { max-width: 280px; margin: 0 auto; }
    }
  `

  return (
    <div className="cdp-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,300;1,8..60,400;1,8..60,500&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      {/* ── TICKER ──────────────────────────────────────────────── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span>House Mazzutti Academy</span><span className="star">★</span>
              <span>Operação Criativa — não é estética, é leitura</span><span className="star">★</span>
              <span>Ângelo Mazzutti · Volume 03 · 2026</span><span className="star">★</span>
              <span>336 páginas · 12 capítulos · 3 partes</span><span className="star">★</span>
              <span>Vinte anos dirigindo a publicidade brasileira por dentro</span><span className="star">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────────────── */}
      <header className="masthead">
        <div className="masthead-inner">
          <Link href="https://housemazzutti.com" className="masthead-brand" aria-label="House Mazzutti" style={{textDecoration:'none',color:'inherit'}}>
            <span style={{fontSize:'22px'}}>House Mazzutti</span>
          </Link>
          <div className="masthead-center">
            <span className="hm-tag">Academy</span>
            <span className="hm-divider" />
            <span className="hm-tag">Volume 03 · MMXXVI</span>
          </div>
          <div className="masthead-right" />
        </div>
      </header>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand"><span className="pip" />Operação Criativa · Livro</a>
          <div className="nav-links">
            <a href="#sumario">Sumário</a>
            <a href="#trecho">Trecho</a>
            <a href="#autor">O autor</a>
            <a href="#faq">Perguntas</a>
          </div>
          <a href="#comprar" className="nav-cta">Quero o livro →</a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="hero">
        <div className="grid-marks">OC · 2026<br />EPS · 336<br />12 CAPS</div>
        <div className="grid-marks-r">UN · LIVRO<br />BR · 2026<br />VOL · 03</div>

        <div className="hero-grid">
          <div className="hero-left">
            <div>
              <div className="hero-tag">
                <span className="dot" />{' '}House Mazzutti Academy · Vol. 03 · 2026
                <span className="ms" />
              </div>
              <h1 className="hero-headline">
                Operação<br />
                Criativa.
              </h1>
              <p className="hero-sub">
                <em>Não é estética. É leitura.</em> Vinte anos dirigindo a publicidade brasileira <em>por dentro</em> — ensaio autoral de Ângelo Mazzutti sobre o ofício do diretor criativo. Para quem ainda está na operação, não nas arquibancadas.
              </p>
            </div>
            <div className="hero-meta">
              <div className="cell"><span className="k">Autor</span><span className="v">Ângelo Mazzutti</span></div>
              <div className="cell"><span className="k">Formato</span><span className="v">Impresso + ebook</span></div>
              <div className="cell"><span className="k">Capítulos</span><span className="v">12 em 3 partes</span></div>
              <div className="cell"><span className="k">Páginas</span><span className="v">336</span></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="cover-stack">
              <Image
                src={COVER}
                alt="Capa do livro Operação Criativa, de Ângelo Mazzutti — House Mazzutti Academy Vol. 03"
                fill
                sizes="(max-width: 980px) 280px, 420px"
                className="object-cover"
                style={{ border: '1px solid rgba(0,0,0,0.5)' }}
              />
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <span><span className="star">★</span> Operação Criativa · ensaio sobre o ofício do diretor criativo brasileiro</span>
          <span>Ângelo Mazzutti · House Mazzutti Editora · 2026</span>
        </div>
      </header>

      {/* ── PULLBAND ─────────────────────────────────────────────── */}
      <section className="pullband">
        <div className="wrap">
          <p className="quote">
            Operação criativa<br />
            <span className="em">não é estética.</span><br />
            É leitura do mercado.
          </p>
          <div className="strip" />
          <div className="attr">— Operação Criativa · Ângelo Mazzutti</div>
        </div>
      </section>

      {/* ── PROMESSA ─────────────────────────────────────────────── */}
      <section className="promise">
        <div className="wrap">
          <div className="promise-head">
            <h2>O que você<em>tem em mãos.</em></h2>
            <p className="lede">Não é manual de criatividade. É <em>relatório operacional</em> escrito por quem dirige uma agência boutique brasileira há mais de vinte anos. O ofício do diretor criativo lido por dentro: equipe, política, conflito de cliente, defesa de ideia, ganho e perda de conta — tudo o que não cabe em case e sustenta toda a operação.</p>
          </div>
          <div className="promise-cols">
            <div className="col isnot">
              <h3>Esse livro não é</h3>
              <ul>
                <li>Manual de criatividade ou template de processo</li>
                <li>Coletânea de cases prontos para Instagram</li>
                <li>Receita de viralização ou hack de algoritmo</li>
                <li>Livro escrito por consultor de fora da operação</li>
              </ul>
            </div>
            <div className="col is">
              <h3>Esse livro é</h3>
              <ul>
                <li>Ensaio autoral sobre o ofício do diretor criativo</li>
                <li>Vinte anos de operação adulta documentados em 336 páginas</li>
                <li>Tese sobre agência boutique como modelo de negócio</li>
                <li>Carta direta a quem ainda decide o que vai pra rua</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUMÁRIO ──────────────────────────────────────────────── */}
      <section className="toc-sec" id="sumario">
        <div className="wrap">
          <div className="head">
            <h2>12 <em>Capítulos.</em></h2>
            <p className="desc"><em>Três partes — Dentro · Defesa · Fora. Cada capítulo é um ensaio em primeira pessoa, com pontos práticos de aplicação no fim. 336 páginas para ler em ordem ou abrir onde dói mais.</em></p>
          </div>

          <div className="toc-list">
            {CAPITULOS.map((c) => (
              <article className="toc-item" key={c.n}>
                <div className="num">{c.n}</div>
                <div className="body">
                  <div className="tag">{c.tag}</div>
                  <div className="title">{c.title}</div>
                  <div className="sub">{c.sub}</div>
                </div>
                <div className="meta">
                  <div className="detail">{c.detail}</div>
                  <div className="pg">p. {c.pg}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="toc-foot">
            <span><strong>12</strong> capítulos · Dentro · Defesa · Fora</span>
            <span><strong>336</strong> páginas · House Mazzutti Editora · <strong>2026</strong></span>
          </div>
        </div>
      </section>

      {/* ── TRECHO ───────────────────────────────────────────────── */}
      <section className="excerpt" id="trecho">
        <div className="excerpt-grid">
          <aside className="meta">
            <div className="label">Trecho · Cap. 02</div>
            <h3>Direção<br />é decisão.</h3>
            <div className="from">336 páginas · edição inaugural 2026</div>
          </aside>
          <div className="excerpt-body">
            <p className="dropcap">Quem dirige uma agência criativa por tempo suficiente entende uma coisa que nenhum manual ensina: a maior parte do trabalho não é criar — é decidir. Decidir o que entra no deck e o que fica fora. Decidir qual cliente atender e qual recusar. Decidir quando defender uma ideia e quando ceder sem traí-la. Decidir quem entra na equipe e, mais difícil, quem sai.</p>
            <p>A indústria gosta de falar de criatividade como se fosse o coração da agência. É a estética da coisa. A verdade operacional é outra: o coração da agência é o sistema de decisão que sustenta a criatividade. Tira a decisão e a criatividade vira inspiração — bonita, sazonal, inútil pra sustentar uma operação.</p>
            <p className="pullquote">Direção é o que separa um trabalho que existe de um trabalho que acontece.</p>
            <p>Existir é fácil. Toda agência tem trabalhos que existem — apresentações em PDF, moodboards bem feitos, decks impecáveis. Acontecer é diferente. Acontecer é uma campanha que vai pra rua, gera resposta, vende produto, recontrata cliente. Entre existir e acontecer há sempre uma série de decisões que ninguém te ensina a tomar — e que, tomadas mal, destroem o trabalho antes que ele saia do escritório.</p>
            <p>Este capítulo é sobre essas decisões. Não as criativas — as operacionais. As que ninguém escreve em case.</p>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM ────────────────────────────────────────────── */}
      <section className="audience">
        <div className="wrap">
          <div className="audience-head">
            <div>
              <div className="eyebrow">Para quem foi escrito</div>
              <h2>Esse livro <em>é pra você</em><br />se ainda está<br />na operação.</h2>
            </div>
            <p className="copy">Não é introdução à publicidade. É ensaio adulto sobre o ofício de dirigir — escrito de dentro, para quem decide. Se você fecha briefing, defende ideia em sala, contrata e demite, lida com cliente difícil e ainda assim opera com método, está no lugar certo.</p>
          </div>
          <div className="audience-grid">
            {AUDIENCE.map((a) => (
              <article className="aud-row" key={a.n}>
                <div className="num">{a.n}</div>
                <div className="ttl">{a.ttl}</div>
                <div className="d">{a.d}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOR ────────────────────────────────────────────────── */}
      <section className="author" id="autor">
        <div className="wrap">
          <div className="author-grid">
            <aside className="author-card">
              <div className="strip" />
              <div className="author-avatar-wrap">
                <div className="author-avatar">
                  <Image
                    src="/images/angelo/angelo-portrait.webp"
                    alt="Ângelo Mazzutti — House Mazzutti"
                    width={520}
                    height={650}
                    sizes="(max-width: 768px) 60vw, 280px"
                    quality={90}
                    className="author-avatar-img"
                  />
                </div>
              </div>
              <div className="label">O autor</div>
              <div className="nm">Ângelo<br /><em>Mazzutti.</em></div>
              <div className="role">Diretor Criativo · Fundador da House Mazzutti — agência boutique brasileira por escolha, não por tamanho. São Paulo.</div>
              <div className="meta-rows">
                <div className="row"><span>Atuação</span><span className="v">+20 anos de direção</span></div>
                <div className="row"><span>Frentes</span><span className="v">Agência · Produtora · Studio</span></div>
                <div className="row"><span>Cidade</span><span className="v">São Paulo, Brasil</span></div>
                <div className="row"><span>Selo</span><span className="v">House Mazzutti Editora</span></div>
              </div>
            </aside>
            <div className="author-body">
              <h2>Quem escreve <em>é quem ainda</em><br />está na sala — não<br />nas arquibancadas.</h2>
              <p>Dirijo a House Mazzutti há mais de vinte anos. Vivo a operação criativa todos os dias: briefing real, cliente real, equipe real, escolha real. <em>Operação Criativa</em> é a síntese desse tempo — o que se aprende quando se atende cliente, se dirige equipe, se assina capa e se assume responsabilidade.</p>
              <p>Quase nenhum livro sobre o ofício do diretor criativo foi escrito por quem ainda está dentro da operação. A maioria é olhar de fora — consultor, observador, jornalista. Este é diferente. Foi escrito de dentro, por uma razão simples: o que sustenta uma boutique é exatamente o que esses outros livros não conseguem ver.</p>
              <p>Doze capítulos. Três partes. Trezentas e trinta e seis páginas. <em>Não é estética. É leitura.</em></p>
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

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section className="pricing" id="comprar">
        <div className="wrap">
          <div className="pricing-head">
            <div>
              <div className="eyebrow">Edição inaugural · Volume 03</div>
              <h2>Antes de aprovar<br />a próxima<br /><span className="em">campanha, vale ler.</span></h2>
            </div>
          </div>
          <div className="price-card">
            <div className="price-left">
              <div>
                <div className="badge"><span className="dot" /> Lançamento · Edição inaugural</div>
                <h3>Operação Criativa<em>Vol. 03 · 2026 · Livro impresso + ebook</em></h3>
              </div>
              <div className="product-meta">
                <div className="row"><span>Formato</span><span className="v">Impresso 16 × 23 cm + ebook PDF</span></div>
                <div className="row"><span>Páginas</span><span className="v">336 · 12 capítulos · 3 partes</span></div>
                <div className="row"><span>Envio</span><span className="v">Brasil — frete incluso</span></div>
                <div className="row"><span>Ebook</span><span className="v">Acesso imediato após pagamento</span></div>
                <div className="row"><span>Selo</span><span className="v">House Mazzutti Editora</span></div>
              </div>
            </div>
            <div className="price-right">
              <div className="num-line">
                <span className="pill">Edição de lançamento</span>
              </div>
              <div className="price"><span className="cur">R$</span>197</div>
              <div className="pix-line"><em>à vista · cartão, pix ou boleto</em></div>
              <div>
                <a href={CHECKOUT_URL} className="btn-buy">Quero meu exemplar <span className="arrow">→</span></a>
              </div>
              <div className="micro">
                <span>Pagamento seguro</span>
                <span>Frete incluso</span>
                <span>Garantia 7 dias</span>
              </div>
            </div>
          </div>
          <div className="guarantee">
            <div className="g-num">7</div>
            <div className="g-body">
              <div className="k">Garantia incondicional</div>
              <div className="v"><em>Sete dias para folhear, ler o primeiro capítulo e decidir.</em> Se não for o que você esperava, devolvemos o valor integral — sem perguntas, sem formulário. Você fica com o livro.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
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

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="final">
        <div className="wrap-narrow">
          <p className="quote">
            Não é estética.<br />
            <span className="green">É leitura.</span><br />
            <em>Vinte anos por dentro, agora em livro.</em>
          </p>
          <p className="sub">336 páginas. 12 capítulos. Três partes. Ensaio autoral de Ângelo Mazzutti sobre o ofício do diretor criativo brasileiro — escrito por quem ainda está na sala.</p>
          <div className="cta-row">
            <a href="#comprar" className="btn-primary">Garantir meu exemplar <span>→</span></a>
            <a href="#sumario" className="btn-secondary">Ver o sumário</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer>
        <div className="mega-mark">
          <div className="mark-inner">
            HOUSE MAZZUTTI<em>.</em>
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
              <span className="dim" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, letterSpacing: 0 }}>House Mazzutti Editora — selo editorial da House Mazzutti, dirigido por Ângelo Mazzutti.</span>
              <p className="meta">Não é estética. É leitura.<br />Por Ângelo Mazzutti.</p>
            </div>
            <div className="col">
              <h4>Catálogo</h4>
              <Link href="/pt/academy/marketing-para-modelos">Vol. 01 · Marketing para Modelos</Link>
              <Link href="/pt/academy/preco-da-relevancia">Vol. 02 · O Preço da Relevância</Link>
              <a href="#" style={{ color: 'var(--signal)', fontWeight: 500 }}>Vol. 03 · Operação Criativa</a>
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
