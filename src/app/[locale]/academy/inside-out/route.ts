export const dynamic = 'force-static';

export function GET() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Operação Criativa · Livro de Ângelo Mazzutti sobre direção criativa brasileira</title>
<meta name="description" content="Não é estética. É leitura. Ensaio autoral de Ângelo Mazzutti sobre vinte anos dirigindo a publicidade brasileira por dentro. 336 páginas. House Mazzutti Academy, Vol. 03 · 2026.">
<meta name="keywords" content="livro de direção criativa, ângelo mazzutti livro, operação criativa livro, house mazzutti academy, direção criativa brasileira, livro sobre publicidade brasileira, ofício do diretor criativo, método de direção criativa, agência boutique brasileira, como dirigir agência criativa">
<meta name="author" content="Ângelo Mazzutti">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:type" content="book">
<meta property="og:title" content="Operação Criativa — Ângelo Mazzutti">
<meta property="og:description" content="Não é estética. É leitura. Vinte anos dirigindo a publicidade brasileira por dentro.">
<meta property="og:image" content="https://housemazzutti.com/images/academy/operacao-criativa/og-image.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Capa do livro Operação Criativa, de Ângelo Mazzutti — House Mazzutti Academy Vol. 03">
<meta property="og:url" content="https://housemazzutti.com/pt/academy/inside-out/">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="House Mazzutti">
<meta property="book:author" content="Ângelo Mazzutti">
<meta property="book:isbn" content="978-65-00-00000-0">
<meta property="book:release_date" content="2026-06-22">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Operação Criativa — Ângelo Mazzutti">
<meta name="twitter:description" content="Não é estética. É leitura.">
<meta name="twitter:image" content="https://housemazzutti.com/images/academy/operacao-criativa/og-image.webp">
<meta name="twitter:creator" content="@housemazzutti">
<link rel="canonical" href="https://housemazzutti.com/livro/operacao-criativa">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-R61KK25PBK"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-R61KK25PBK');gtag('config','AW-16938050518');</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Archivo+Expanded:wght@400..900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/lp/workshop-io/styles.css">
<!-- JSON-LD: Book + BreadcrumbList -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Book","name":"Operação Criativa","author":{"@type":"Person","name":"Ângelo Mazzutti","url":"https://housemazzutti.com/angelo"},"publisher":{"@type":"Organization","name":"House Mazzutti Editora","url":"https://housemazzutti.com"},"inLanguage":"pt-BR","numberOfPages":336,"bookFormat":"https://schema.org/Paperback","datePublished":"2026-06-22","isbn":"978-65-00-00000-0","image":"https://housemazzutti.com/images/academy/operacao-criativa/og-image.webp","description":"Não é estética. É leitura. Ensaio autoral de Ângelo Mazzutti sobre vinte anos dirigindo a publicidade brasileira por dentro.","offers":{"@type":"Offer","price":"197.00","priceCurrency":"BRL","availability":"https://schema.org/InStock","url":"https://housemazzutti.com/pt/academy/inside-out/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://housemazzutti.com/pt/"},{"@type":"ListItem","position":2,"name":"Academy","item":"https://housemazzutti.com/pt/academy/"},{"@type":"ListItem","position":3,"name":"Operação Criativa","item":"https://housemazzutti.com/pt/academy/inside-out/"}]}
</script>
<style>
  /* ── Operação Criativa — accent paper-blood editorial ── */
  :root {
    --accent: #8b1f1f;
    --accent-glow: rgba(139,31,31,.42);
    --accent-soft: #c46060;
  }

  /* ── Movimento sutil — paralax leve no glow + flutuação da capa ── */
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-14px); }
  }
  @keyframes ringPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(139,31,31,.32); }
    50%     { box-shadow: 0 0 0 18px rgba(139,31,31,0); }
  }
  @keyframes underline {
    from { background-size: 0 1px; }
    to   { background-size: 100% 1px; }
  }
  .reveal-rise { opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
  .reveal-rise.is-in { opacity: 1; transform: none; }

  /* hero · livro */
  .hero-od {
    min-height: 100svh;
    background: var(--ink);
    display: grid;
    grid-template-columns: 1fr;
    position: relative;
    overflow: hidden;
  }
  .hero-od::before {
    content: "";
    position: absolute;
    top: -15%;
    right: -8%;
    width: 760px;
    height: 760px;
    background: radial-gradient(circle, var(--accent-glow), transparent 68%);
    pointer-events: none;
    z-index: 0;
    animation: floatY 9s ease-in-out infinite;
  }
  .hero-od-body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(96px,10vw,136px) var(--pad) clamp(40px,5vw,72px);
    gap: clamp(36px, 6vw, 64px);
  }
  .hero-od-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 18px;
    flex-wrap: wrap;
    color: var(--smoke);
  }
  .hero-od-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: center;
  }
  @media (max-width: 900px) {
    .hero-od-grid { grid-template-columns: 1fr; }
  }
  .hero-out { color: var(--accent); }

  /* mockup de livro no lugar do player */
  .book-mock {
    width: 100%;
    aspect-ratio: 3/4;
    max-width: 360px;
    margin: 0 auto;
    background: linear-gradient(160deg, #1a1a18 0%, #0e0e0c 100%);
    border: 1px solid rgba(244,241,235,.14);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(22px, 3vw, 38px);
    color: var(--paper);
    box-shadow:
      -2px 0 0 rgba(244,241,235,.06),
      14px 18px 60px rgba(0,0,0,.55);
    animation: floatY 7.5s ease-in-out infinite;
  }
  .book-mock::after {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 8px;
    background: linear-gradient(to right, rgba(0,0,0,.45), transparent);
    pointer-events: none;
  }
  .book-mock .bm-top {
    display: flex;
    justify-content: space-between;
    font-family: var(--mono);
    font-size: .6rem;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--smoke);
  }
  .book-mock .bm-title {
    font-weight: 820;
    font-variation-settings: 'wght' 820, 'wdth' 118;
    text-transform: uppercase;
    font-size: clamp(1.4rem, 2.2vw, 2.1rem);
    line-height: .96;
    letter-spacing: -.012em;
  }
  .book-mock .bm-title em {
    display: block;
    font-style: italic;
    font-weight: 500;
    font-variation-settings: 'wght' 500, 'wdth' 100;
    text-transform: none;
    font-size: .54em;
    color: var(--accent-soft);
    margin-top: 8px;
    letter-spacing: 0;
  }
  .book-mock .bm-bot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-family: var(--mono);
    font-size: .6rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--smoke);
  }
  .book-mock .bm-bot .author {
    font-family: var(--display);
    font-style: italic;
    text-transform: none;
    color: var(--paper);
    font-size: 1rem;
    letter-spacing: 0;
  }

  .hero-od-foot {
    display: flex;
    gap: clamp(18px, 3vw, 40px);
    flex-wrap: wrap;
  }
  .badge-pill {
    font-family: var(--mono);
    font-size: .66rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    border: 1px solid rgba(244,241,235,.28);
    padding: 8px 16px;
    color: var(--paper);
  }

  /* link com sublinhado animado para frases-chave */
  .ink-link {
    background-image: linear-gradient(currentColor, currentColor);
    background-position: 0 100%;
    background-size: 100% 1px;
    background-repeat: no-repeat;
    padding-bottom: 2px;
  }
  .ink-link.draw { animation: underline .9s cubic-bezier(.5,.2,.2,1) .2s both; }

  /* pricing card adaptado para produto único */
  .price-single {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--line-d);
    background: var(--paper);
    color: var(--ink);
  }
  @media (max-width: 760px) { .price-single { grid-template-columns: 1fr; } }
  .ps-left {
    padding: clamp(30px,3vw,48px);
    border-right: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  @media (max-width: 760px) { .ps-left { border-right: none; border-bottom: 1px solid var(--line); } }
  .ps-right {
    padding: clamp(30px,3vw,48px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 22px;
  }
  .ps-tag {
    font-family: var(--mono);
    font-size: .66rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: .6em;
  }
  .ps-tag::before { content:""; width: 22px; height: 1px; background: currentColor; }
  .ps-title {
    font-weight: 820;
    font-variation-settings: 'wght' 820, 'wdth' 118;
    text-transform: uppercase;
    font-size: clamp(1.6rem, 2.6vw, 2.6rem);
    line-height: .96;
    letter-spacing: -.012em;
    color: var(--ink);
  }
  .ps-title em {
    display: block;
    font-weight: 500;
    font-variation-settings: 'wght' 500, 'wdth' 100;
    font-style: italic;
    text-transform: none;
    font-size: .55em;
    color: var(--accent);
    margin-top: 6px;
    letter-spacing: 0;
  }
  .ps-meta { border-top: 1px solid var(--line); }
  .ps-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 11px 0;
    border-bottom: 1px solid var(--line-2);
    font-family: var(--mono);
    font-size: .64rem;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: #6b6862;
  }
  .ps-meta-row .v {
    color: var(--ink);
    font-family: var(--display);
    font-style: italic;
    font-size: .9rem;
    letter-spacing: 0;
    text-transform: none;
  }
  .ps-price {
    font-weight: 820;
    font-variation-settings: 'wght' 820, 'wdth' 122;
    font-size: clamp(4.5rem, 9vw, 9rem);
    line-height: .88;
    letter-spacing: -.025em;
    color: var(--ink);
  }
  .ps-cur {
    font-family: var(--mono);
    font-size: .9rem;
    font-weight: 400;
    color: var(--accent);
    vertical-align: super;
    margin-right: 4px;
    letter-spacing: .08em;
  }
  .ps-subprice {
    font-family: var(--mono);
    font-size: .68rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #6b6862;
    margin-top: 8px;
  }
  .ps-micro {
    display: flex;
    justify-content: space-between;
    font-family: var(--mono);
    font-size: .6rem;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #6b6862;
    border-top: 1px solid var(--line-2);
    padding-top: 14px;
  }
  /* botão CTA com pulso sutil */
  .btn.solid.lg .ar { transition: transform .35s cubic-bezier(.4,.1,.2,1); }
  .btn.solid.lg:hover .ar { transform: translate(4px, -4px); }
  .btn.solid.lg.pulse { animation: ringPulse 3s ease-in-out infinite; }

  /* garantia block */
  .guarantee {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: clamp(22px,3vw,40px);
    align-items: center;
    background: var(--paper-2);
    color: var(--ink);
    padding: clamp(24px,2.6vw,38px) clamp(28px,3vw,44px);
    border-left: 4px solid var(--accent);
    margin-top: clamp(20px,2.4vw,32px);
  }
  .guarantee .g-num {
    font-weight: 820;
    font-variation-settings: 'wght' 820, 'wdth' 120;
    font-size: clamp(4rem, 8vw, 7rem);
    line-height: .9;
    color: var(--accent);
    letter-spacing: -.02em;
  }
  .guarantee .g-k {
    font-family: var(--mono);
    font-size: .68rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
  }
  .guarantee .g-v {
    font-size: 1rem;
    line-height: 1.5;
    color: #2a2a27;
  }

  /* respeita preferência de redução de movimento */
  @media (prefers-reduced-motion: reduce) {
    .hero-od::before, .book-mock, .btn.solid.lg.pulse { animation: none !important; }
    .reveal-rise { opacity: 1; transform: none; transition: none; }
  }
</style>
</head>
<body>

<!-- ============ NAV ============ -->
<nav class="nav" id="nav">
  <a class="brand" href="#top"><span class="dot"></span> <span>Operação<b>Criativa</b></span></a>
  <div class="nav-right">
    <div class="nav-links">
      <a href="#tese">Tese</a>
      <a href="#sumario">Sumário</a>
      <a href="#autor">Autor</a>
      <a href="#preco">Comprar</a>
      <a href="#faq">FAQ</a>
    </div>
    <a class="nav-cta" href="#preco">Quero o livro</a>
    <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
  </div>
</nav>

<!-- ============ FULLSCREEN MENU ============ -->
<div class="menu" id="menu">
  <button class="menu-close" id="menuClose" aria-label="Fechar">✕</button>
  <ul class="menu-list">
    <li><a href="#tese"><span class="n">01</span> Tese</a></li>
    <li><a href="#sumario"><span class="n">02</span> Sumário</a></li>
    <li><a href="#autor"><span class="n">03</span> O Autor</a></li>
    <li><a href="#preco"><span class="n">04</span> Comprar</a></li>
    <li><a href="#faq"><span class="n">05</span> FAQ</a></li>
  </ul>
  <div class="menu-foot">
    <a href="https://instagram.com/housemazzutti">Instagram ↗</a>
    <a href="mailto:academy@housemazzutti.com">academy@housemazzutti.com</a>
    <span class="mono">São Paulo · BR</span>
  </div>
</div>

<!-- ============ HERO ============ -->
<header class="hero-od" id="top">
  <div class="hero-od-body">
    <div class="hero-od-top">
      <span class="mono">House Mazzutti Academy · Vol. 03 · 2026</span>
      <span class="mono">Edição inaugural · 336 páginas</span>
    </div>

    <div class="hero-od-grid">
      <div>
        <span class="eyebrow" style="color:var(--smoke)">Livro · ensaio autoral</span>
        <h1 class="display hero-title h-hero" style="margin-top:14px">
          <span class="line"><span>Operação</span></span>
          <span class="line"><span class="hero-out">Criativa.</span></span>
        </h1>
        <p class="hero-sub" style="margin-top:clamp(20px,2.4vw,32px)">
          <em>Não é estética. É leitura.</em><br>
          Vinte anos dirigindo a publicidade brasileira <em>por dentro</em> — escrito por quem
          atende a campanha antes que vire campanha.
        </p>
      </div>

      <aside class="book-mock" aria-label="Capa de Operação Criativa">
        <div class="bm-top">
          <span>House Mazzutti</span>
          <span>Vol. 03</span>
        </div>
        <div class="bm-title">
          Operação<br>Criativa
          <em>Ensaio sobre o ofício do diretor criativo brasileiro</em>
        </div>
        <div class="bm-bot">
          <span>2026 · 336 p.</span>
          <span class="author">Ângelo Mazzutti</span>
        </div>
      </aside>
    </div>

    <div class="hero-od-foot">
      <span class="badge-pill">336 páginas</span>
      <span class="badge-pill">12 capítulos</span>
      <span class="badge-pill">Impresso + ebook</span>
      <span class="badge-pill">Garantia 7 dias</span>
      <span class="badge-pill">Ângelo Mazzutti</span>
    </div>
  </div>
</header>

<!-- ============ TESE ============ -->
<section class="section paper" id="tese">
  <div class="wrap concept">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">01 — A tese</span>
      <span class="sec-index">Operação Criativa · House Mazzutti Academy</span>
    </div>
    <h2 class="big" data-reveal>Não é manual de criatividade. É <em>relatório operacional</em> de quem dirigiu por vinte anos.</h2>
    <div class="concept-foot">
      <p class="lead" data-reveal>A publicidade brasileira é conhecida pela criatividade. Pouco gente conhece a <strong>operação por trás</strong>: as decisões internas, as conversas que nunca chegam ao deck, as escolhas que separam um trabalho que existe de um trabalho que acontece. Esse livro é sobre essa operação.</p>
      <p data-reveal data-reveal-d="1" style="color:#54524d;line-height:1.5">Ângelo Mazzutti escreve do lado de quem dirige uma agência boutique há mais de vinte anos. Da reunião de briefing até o invoice — passando por casting, conflito de cliente, perda de talento, ganho de conta, gestão de equipe criativa e a arte de defender uma ideia sem perder o trabalho. Quem leu manual de marketing já leu o que precisa. <em>Esse aqui é diferente.</em></p>
    </div>
  </div>
</section>

<!-- ============ SUMÁRIO ============ -->
<section class="section paper" id="sumario" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">02 — Sumário</span>
      <span class="sec-index">12 capítulos · 3 partes · 336 páginas</span>
    </div>
    <div class="exp">
      <div class="exp-item" data-reveal>
        <span class="exp-n">01</span>
        <div>
          <div class="exp-t">A operação invisível</div>
          <div class="exp-d">O que acontece entre o briefing e a entrega que ninguém escreve em case.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">02</span>
        <div>
          <div class="exp-t">Direção é decisão</div>
          <div class="exp-d">Sobre as escolhas internas que nenhum cliente vê — e que sustentam todo o resto.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal>
        <span class="exp-n">03</span>
        <div>
          <div class="exp-t">Briefing como diagnóstico</div>
          <div class="exp-d">Por que a maior parte das campanhas falha antes de existir.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">04</span>
        <div>
          <div class="exp-t">A política da estética</div>
          <div class="exp-d">Gosto não é neutro. O lado de quem decide o que é “bonito” na sala de aprovação.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal>
        <span class="exp-n">05</span>
        <div>
          <div class="exp-t">Equipe criativa não é planilha</div>
          <div class="exp-d">Construir, manter e perder gente — o que sustenta um time além do salário.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">06</span>
        <div>
          <div class="exp-t">A reunião que decide tudo</div>
          <div class="exp-d">A apresentação criativa como ato político — defender ideia sem trair a ideia.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal>
        <span class="exp-n">07</span>
        <div>
          <div class="exp-t">O custo do não</div>
          <div class="exp-d">Quando dizer não pra cliente, pra ideia, pra job. E o que sobra depois.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">08</span>
        <div>
          <div class="exp-t">Produção é narrativa</div>
          <div class="exp-d">Cronograma, orçamento e set como camadas de uma só história — não áreas separadas.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal>
        <span class="exp-n">09</span>
        <div>
          <div class="exp-t">A entrega depois da entrega</div>
          <div class="exp-d">Pós-campanha: o que define se uma marca te recontrata em 6 meses ou nunca mais.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">10</span>
        <div>
          <div class="exp-t">Agência boutique como tese</div>
          <div class="exp-d">Por que uma estrutura pequena e dirigida vence escala genérica em mercado adulto.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal>
        <span class="exp-n">11</span>
        <div>
          <div class="exp-t">Falhar com método</div>
          <div class="exp-d">As campanhas que erraram — e por que continuam ensinando dez anos depois.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">12</span>
        <div>
          <div class="exp-t">Carta ao diretor criativo iniciante</div>
          <div class="exp-d">O que eu diria pra mim mesmo aos vinte e cinco, sabendo o que sei aos quarenta e cinco.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ ARQUITETURA: INSIDE / OUT ============ -->
<section class="section ink" id="arquitetura">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">03 — Arquitetura do livro</span>
      <span class="sec-index">De dentro pra fora · três partes</span>
    </div>
  </div>
  <div class="wrap" style="max-width:var(--maxw)">
    <div class="io">
      <div class="io-col inside" data-reveal>
        <div class="io-tag">
          <span class="io-day">Parte I</span>
          <span class="mono">A operação invisível</span>
        </div>
        <div class="io-word">Dentro</div>
        <p class="io-sub" style="margin-top:18px;color:var(--smoke)">Decisão · estética · equipe · política interna</p>
        <ul class="sched">
          <li><span class="tm">Cap. 01</span><span class="ds"><b>A operação invisível</b>o que ninguém escreve em case</span></li>
          <li><span class="tm">Cap. 02</span><span class="ds"><b>Direção é decisão</b>as escolhas que sustentam o resto</span></li>
          <li><span class="tm">Cap. 03</span><span class="ds"><b>Briefing como diagnóstico</b>onde a campanha começa a falhar</span></li>
          <li><span class="tm">Cap. 04</span><span class="ds"><b>A política da estética</b>gosto não é neutro</span></li>
        </ul>
      </div>
      <div class="io-col out" data-reveal data-reveal-d="1">
        <div class="io-tag">
          <span class="io-day">Parte II</span>
          <span class="mono">O ofício na sala</span>
        </div>
        <div class="io-word">Defesa</div>
        <p class="io-sub" style="margin-top:18px;color:#6b6862">Equipe · apresentação · conflito · produção</p>
        <ul class="sched">
          <li><span class="tm">Cap. 05</span><span class="ds"><b>Equipe criativa não é planilha</b>construir, manter, perder</span></li>
          <li><span class="tm">Cap. 06</span><span class="ds"><b>A reunião que decide tudo</b>defender sem trair</span></li>
          <li><span class="tm">Cap. 07</span><span class="ds"><b>O custo do não</b>dizer não a cliente, ideia, job</span></li>
          <li><span class="tm">Cap. 08</span><span class="ds"><b>Produção é narrativa</b>tudo é uma só história</span></li>
        </ul>
      </div>
      <div class="io-col out" data-reveal data-reveal-d="2" style="grid-column: 1 / -1;">
        <div class="io-tag">
          <span class="io-day">Parte III</span>
          <span class="mono">A tese da casa</span>
        </div>
        <div class="io-word">Fora</div>
        <p class="io-sub" style="margin-top:18px;color:#6b6862">Negócio · método · legado</p>
        <ul class="sched">
          <li><span class="tm">Cap. 09</span><span class="ds"><b>A entrega depois da entrega</b>o que recontrata uma marca</span></li>
          <li><span class="tm">Cap. 10</span><span class="ds"><b>Agência boutique como tese</b>pequena, dirigida, adulta</span></li>
          <li><span class="tm">Cap. 11</span><span class="ds"><b>Falhar com método</b>as campanhas que ainda ensinam</span></li>
          <li><span class="tm">Cap. 12</span><span class="ds"><b>Carta ao diretor iniciante</b>o que eu diria a mim mesmo</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ============ AUTOR ============ -->
<section class="section paper" id="autor">
  <div class="wrap mentor">
    <div class="mentor-img" data-reveal>
      <image-slot id="autor" placeholder="Retrato · Ângelo Mazzutti" fit="cover"></image-slot>
    </div>
    <div data-reveal data-reveal-d="1">
      <span class="eyebrow">04 — O autor</span>
      <h2 class="mentor-name" style="margin-top:18px">Ângelo<br>Mazzutti</h2>
      <p class="mentor-role">Diretor Criativo · Fundador da House Mazzutti</p>
      <p>Vinte anos de carreira dirigindo campanhas de moda, beleza e publicidade pela House Mazzutti — agência boutique brasileira por escolha, não por tamanho. <em>Operação Criativa</em> é o livro que sintetiza esse tempo: o que se aprende quando se atende cliente, se dirige equipe, se assina capa e se assume responsabilidade. Escreveu este volume por uma razão simples — porque os livros que já existem sobre o ofício, quase nenhum foi escrito por quem ainda está dentro da operação.</p>
      <div class="stats">
        <div class="stat"><div class="v">+20</div><div class="l">Anos de direção</div></div>
        <div class="stat"><div class="v">336</div><div class="l">Páginas · ensaio</div></div>
        <div class="stat"><div class="v">12</div><div class="l">Capítulos · 3 partes</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ PREÇO ============ -->
<section class="section ink" id="preco">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">05 — Adquirir</span>
      <span class="sec-index">Edição inaugural · House Mazzutti Editora · 2026</span>
    </div>
    <div class="price-single reveal-rise">
      <div class="ps-left">
        <div>
          <div class="ps-tag">Edição inaugural</div>
          <div class="ps-title" style="margin-top:14px">
            Operação Criativa
            <em>Livro impresso + ebook · House Mazzutti Vol. 03</em>
          </div>
        </div>
        <div class="ps-meta">
          <div class="ps-meta-row"><span>Formato</span><span class="v">Impresso 16 × 23 cm + ebook PDF</span></div>
          <div class="ps-meta-row"><span>Páginas</span><span class="v">336</span></div>
          <div class="ps-meta-row"><span>Capítulos</span><span class="v">12 em 3 partes</span></div>
          <div class="ps-meta-row"><span>Envio</span><span class="v">Brasil — frete incluso</span></div>
          <div class="ps-meta-row"><span>Ebook</span><span class="v">Acesso imediato após pagamento</span></div>
        </div>
      </div>
      <div class="ps-right">
        <div>
          <div class="ps-price"><span class="ps-cur">R$</span>197</div>
          <div class="ps-subprice">à vista · cartão, pix ou boleto</div>
        </div>
        <a class="btn solid lg pulse" href="/pt/checkout/operacao-criativa" style="justify-content:space-between">
          <span class="lbl">Garantir minha edição</span>
          <span class="ar">↗</span>
        </a>
        <div class="ps-micro">
          <span>Pagamento seguro</span>
          <span>Frete incluso</span>
          <span>Garantia 7 dias</span>
        </div>
      </div>
    </div>

    <div class="guarantee reveal-rise">
      <div class="g-num">7</div>
      <div>
        <div class="g-k">Garantia incondicional</div>
        <div class="g-v"><em>Sete dias para folhear, ler o primeiro capítulo, decidir.</em> Se o livro não for o que você esperava, devolvemos o valor integral — sem perguntas, sem formulário. Escreve para academy@housemazzutti.com.</div>
      </div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="section paper" id="faq">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">06 — Perguntas frequentes</span>
      <span class="sec-index">Antes de comprar — o que vale saber</span>
    </div>
    <div class="faq" data-reveal>
      <details open>
        <summary>Quem deve ler este livro? <span class="pm">+</span></summary>
        <div class="ans">Diretores criativos, donos de agência, profissionais de branding e produção que já operam no mercado e querem leitura adulta sobre o ofício. Não é introdução à publicidade — é ensaio escrito de dentro, para quem já vive a operação.</div>
      </details>
      <details>
        <summary>É um livro técnico ou um ensaio? <span class="pm">+</span></summary>
        <div class="ans">Ensaio autoral com método embutido. Cada capítulo é uma reflexão escrita em primeira pessoa, com pontos práticos de aplicação. Não é manual passo-a-passo — é leitura que reorganiza como você decide.</div>
      </details>
      <details>
        <summary>Vem o impresso e o ebook? <span class="pm">+</span></summary>
        <div class="ans">Sim. A compra inclui o livro impresso (16 × 23 cm, capa fosca, 336 páginas) e o ebook em PDF para leitura imediata enquanto o físico não chega.</div>
      </details>
      <details>
        <summary>Quanto tempo leva pra chegar? <span class="pm">+</span></summary>
        <div class="ans">Envio para todo Brasil. Capitais 3–5 dias úteis · interior 5–10 dias úteis. O ebook chega no e-mail em até 5 minutos após o pagamento ser confirmado.</div>
      </details>
      <details>
        <summary>Tem versão em inglês? <span class="pm">+</span></summary>
        <div class="ans">Por enquanto só português brasileiro. Tradução em estudo para a segunda tiragem — assine a newsletter da House Mazzutti para ser avisado quando sair.</div>
      </details>
      <details>
        <summary>Qual a política de garantia? <span class="pm">+</span></summary>
        <div class="ans">Direito de arrependimento de 7 dias (Art. 49 CDC). Escreve para academy@housemazzutti.com — reembolso integral, sem perguntas. Você fica com o livro.</div>
      </details>
    </div>
  </div>
</section>

<!-- ============ CTA FINAL ============ -->
<section class="section ink" id="reservar">
  <div class="wrap cta-final">
    <span class="eyebrow" style="color:var(--smoke)" data-reveal>Edição inaugural · entrega Brasil</span>
    <h2 class="big" data-reveal>Não é estética.<br><span class="o">É leitura.</span></h2>
    <p class="lead" data-reveal style="max-width:36ch;color:var(--smoke-lt)">Vinte anos dirigindo a publicidade brasileira por dentro — agora em livro pra ficar na estante.</p>
    <a class="btn solid lg pulse" data-reveal href="/pt/checkout/operacao-criativa"><span class="lbl">Garantir minha edição</span><span class="ar">↗</span></a>
  </div>
  <div class="marquee">
    <div class="track">
      <span>Operação Criativa</span><span class="s">Vol. 03 · House Mazzutti</span><span>·</span><span>Não é estética</span><span class="s">É leitura</span><span>·</span><span>Operação Criativa</span><span class="s">Vol. 03 · House Mazzutti</span><span>·</span><span>Não é estética</span><span class="s">É leitura</span><span>·</span>
    </div>
  </div>
</section>

<!-- ============ FOOTER ============ -->
<footer class="footer">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <div class="foot-logo">House<br>Mazzutti</div>
        <p class="mono" style="margin-top:20px;color:var(--smoke)">Editora · #OperaçãoCriativa</p>
      </div>
      <div class="foot-col">
        <h4>Navegação</h4>
        <a href="#tese">Tese</a>
        <a href="#sumario">Sumário</a>
        <a href="#autor">O Autor</a>
        <a href="#preco">Comprar</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="foot-col">
        <h4>Contato</h4>
        <a href="mailto:academy@housemazzutti.com">academy@housemazzutti.com</a>
        <a href="https://housemazzutti.com">housemazzutti.com</a>
        <a href="https://instagram.com/housemazzutti">@housemazzutti ↗</a>
        <a href="/pt/academy">Academy</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 House Mazzutti · CNPJ 24.435.135/0001-48</span>
      <span>Operação Criativa · Vol. 03 · ensaio sobre o ofício do diretor criativo brasileiro</span>
    </div>
  </div>
</footer>

<script src="/lp/workshop-io/image-slot.js"></script>
<script src="/lp/workshop-io/app-masterclass.js"></script>
<script>
  // Reveal-rise para os blocos de preço/garantia, sem depender do script externo
  (function(){
    const els = document.querySelectorAll('.reveal-rise');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(e => e.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.18 });
    els.forEach(e => io.observe(e));
  })();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
