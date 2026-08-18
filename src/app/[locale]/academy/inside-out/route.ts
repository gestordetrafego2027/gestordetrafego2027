export const dynamic = 'force-static'

export function GET() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Inside Out · Masterclass On-demand — House Mazzutti Academy</title>
<meta name="description" content="A imersão completa do Inside Out agora em vídeo on-demand. Direção criativa e produção executiva de campanhas — do processo interno à entrega final. Por Ângelo Mazzutti.">
<meta property="og:title" content="Inside Out · Masterclass On-demand">
<meta property="og:description" content="A imersão completa em vídeo. Direção criativa do processo interno à entrega final — assista no seu ritmo.">
<meta property="og:image" content="https://housemazzutti.com/images/academy/inside-out/og-image.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta property="og:url" content="https://housemazzutti.com/pt/academy/inside-out/">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="House Mazzutti Academy">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Inside Out · Masterclass On-demand">
<meta name="twitter:description" content="A imersão completa em vídeo. Direção criativa do processo interno à entrega final — assista no seu ritmo.">
<meta name="twitter:image" content="https://housemazzutti.com/images/academy/inside-out/og-image.webp">
<link rel="canonical" href="https://housemazzutti.com/pt/academy/inside-out/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Course","@id":"https://housemazzutti.com/pt/academy/inside-out/#course","name":"Inside Out — Direção de Imagem e Produção","description":"Programa presencial de formação em direção de imagem e produção audiovisual para fotógrafos e profissionais do mercado criativo. Conduzido por Angelo Mazzutti em São Paulo.","url":"https://housemazzutti.com/pt/academy/inside-out/","provider":{"@id":"https://housemazzutti.com/#organization"},"instructor":{"@type":"Person","@id":"https://housemazzutti.com/pt/angelo/#angelo","name":"Angelo Mazzutti"},"courseMode":"onsite","inLanguage":"pt-BR","locationCreated":{"@type":"City","name":"São Paulo"},"educationalLevel":"Profissional"}</script>
<!-- Google tag — Consent Mode v2 (LGPD: defaults negados até consentimento) -->
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-R61KK25PBK"></script>
<script>gtag('js',new Date());gtag('config','G-R61KK25PBK',{send_page_view:true});gtag('config','AW-16938050518');</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Archivo+Expanded:wght@400..900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/lp/workshop-io/styles.css">
<style>
  /* ── Masterclass overrides — mantém identidade, troca accent p/ blood ── */
  :root {
    --accent: #8b1f1f;         /* blood vermelho profundo (vs laranja do workshop) */
    --accent-glow: rgba(139,31,31,.45);
  }
  /* hero on-demand: coluna única + visual de player */
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
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, var(--accent-glow), transparent 68%);
    pointer-events: none;
    z-index: 0;
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
  /* player mockup */
  .player-mock {
    width: 100%;
    aspect-ratio: 16/10;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(244,241,235,.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 16px;
  }
  .play-ring {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .play-ring svg { width: 28px; height: 28px; fill: #fff; margin-left: 4px; }
  .player-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 16px;
    background: rgba(10,10,10,.6);
    font-family: var(--mono);
    font-size: .65rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--smoke);
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
</style>
</head>
<body>

<!-- ============ NAV ============ -->
<nav class="nav" id="nav">
  <a class="brand" href="#top"><span class="dot"></span> <span>Inside<b>Out</b></span></a>
  <div class="nav-right">
    <div class="nav-links">
      <a href="#conceito">Conceito</a>
      <a href="#modulos">Módulos</a>
      <a href="#mentor">Mentor</a>
      <a href="#preco">Preço</a>
      <a href="#faq">FAQ</a>
    </div>
    <a class="nav-cta" href="#preco">Lista de espera</a>
    <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
  </div>
</nav>

<!-- ============ FULLSCREEN MENU ============ -->
<div class="menu" id="menu">
  <button class="menu-close" id="menuClose" aria-label="Fechar">✕</button>
  <ul class="menu-list">
    <li><a href="#conceito"><span class="n">01</span> Conceito</a></li>
    <li><a href="#modulos"><span class="n">02</span> Módulos</a></li>
    <li><a href="#mentor"><span class="n">03</span> O Mentor</a></li>
    <li><a href="#preco"><span class="n">04</span> Preço</a></li>
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
      <span class="mono">Masterclass On-demand · 2026</span>
      <span class="mono">House Mazzutti Academy</span>
    </div>

    <div class="hero-od-grid">
      <div>
        <span class="eyebrow" style="color:var(--smoke)">De dentro para fora</span>
        <h1 class="display hero-title h-hero" style="margin-top:14px">
          <span class="line"><span>Inside</span></span>
          <span class="line"><span class="hero-out">Out</span></span>
        </h1>
        <p class="hero-sub" style="margin-top:clamp(20px,2.4vw,32px)">
          A imersão completa em vídeo — direção criativa e produção executiva de campanhas,
          do processo interno <em>(Inside)</em> à entrega final <em>(Out)</em>.
          Assista no seu ritmo, quantas vezes precisar.
        </p>
      </div>

      <div class="player-mock" aria-label="Preview da masterclass">
        <div class="play-ring">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="player-label">Inside Out · Masterclass On-demand · House Mazzutti Academy</div>
      </div>
    </div>

    <div class="hero-od-foot">
      <span class="badge-pill">Acesso vitalício</span>
      <span class="badge-pill">6 módulos</span>
      <span class="badge-pill">Certificado incluso</span>
      <span class="badge-pill">Garantia 7 dias</span>
      <span class="badge-pill">Ângelo Mazzutti</span>
    </div>
  </div>
</header>

<!-- ============ CONCEITO ============ -->
<section class="section paper" id="conceito">
  <div class="wrap concept">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">01 — Conceito</span>
      <span class="sec-index">Masterclass On-demand · Inside Out</span>
    </div>
    <h2 class="big" data-reveal>O processo criativo que ninguém te mostrou <em>por dentro.</em></h2>
    <div class="concept-foot">
      <p class="lead" data-reveal>O Inside Out surgiu de uma pergunta recorrente: <strong>como você decide o que decide?</strong> Não a execução — o processo anterior à execução. A lógica interna que produz escolhas criativas sustentáveis e campanhas que funcionam de verdade.</p>
      <p data-reveal data-reveal-d="1" style="color:#54524d;line-height:1.5">Dois dias de imersão presencial condensados em vídeo on-demand. A íntegra do workshop — da arquitetura da criação à maestria da execução — agora disponível para você assistir no seu ritmo, voltar quando precisar e aplicar imediatamente no seu processo.</p>
    </div>
  </div>
</section>

<!-- ============ MÓDULOS ============ -->
<section class="section paper" id="modulos" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">02 — Conteúdo</span>
      <span class="sec-index">6 módulos · teoria + prática + processo real</span>
    </div>
    <div class="exp">
      <div class="exp-item" data-reveal>
        <span class="exp-n">01</span>
        <div>
          <div class="exp-t">O DNA da Marca</div>
          <div class="exp-d">Estratégia, posicionamento e o que vem antes de qualquer execução visual.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">02</span>
        <div>
          <div class="exp-t">Identidade como Sistema</div>
          <div class="exp-d">Os elementos que transformam preferência estética em linguagem de marca consistente.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal>
        <span class="exp-n">03</span>
        <div>
          <div class="exp-t">Storytelling que Vende</div>
          <div class="exp-d">Narrativa aplicada — da concepção do conceito ao moodboard apresentável.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">04</span>
        <div>
          <div class="exp-t">Produção Executiva</div>
          <div class="exp-d">Cronogramas, orçamentos e controle real — a execução que torna a ideia realidade.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal>
        <span class="exp-n">05</span>
        <div>
          <div class="exp-t">Shooting ao Vivo</div>
          <div class="exp-d">Acompanhe um shooting completo — modelos, figurino, direção de arte e pós-produção.</div>
        </div>
      </div>
      <div class="exp-item" data-reveal data-reveal-d="1">
        <span class="exp-n">06</span>
        <div>
          <div class="exp-t">Apresentação e Defesa Criativa</div>
          <div class="exp-d">Como vender a ideia sem trair a ideia — e saber quando ceder sem perder o trabalho.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ MÉTODO INSIDE / OUT ============ -->
<section class="section ink" id="metodo">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">03 — A Metodologia</span>
      <span class="sec-index">De dentro para fora · 2 dias em vídeo</span>
    </div>
  </div>
  <div class="wrap" style="max-width:var(--maxw)">
    <div class="io">
      <div class="io-col inside" data-reveal>
        <div class="io-tag">
          <span class="io-day">Parte 01</span>
          <span class="mono">Arquitetura da Criação</span>
        </div>
        <div class="io-word">Inside</div>
        <p class="io-sub" style="margin-top:18px;color:var(--smoke)">Estratégia · Branding · Storytelling · Ideação</p>
        <ul class="sched">
          <li><span class="tm">Mód. 01</span><span class="ds"><b>O DNA da Marca</b>com Ângelo Mazzutti</span></li>
          <li><span class="tm">Mód. 02</span><span class="ds"><b>Identidade como Sistema</b>de preferência a linguagem</span></li>
          <li><span class="tm">Mód. 03</span><span class="ds"><b>Storytelling que Vende</b>do briefing ao moodboard</span></li>
        </ul>
      </div>
      <div class="io-col out" data-reveal data-reveal-d="1">
        <div class="io-tag">
          <span class="io-day">Parte 02</span>
          <span class="mono">Maestria da Execução</span>
        </div>
        <div class="io-word">Out</div>
        <p class="io-sub" style="margin-top:18px;color:#6b6862">Produção · Shooting · Entrega</p>
        <ul class="sched">
          <li><span class="tm">Mód. 04</span><span class="ds"><b>Produção Executiva</b>cronograma, orçamento, controle</span></li>
          <li><span class="tm">Mód. 05</span><span class="ds"><b>Shooting ao Vivo</b>campanha real completa</span></li>
          <li><span class="tm">Mód. 06</span><span class="ds"><b>Apresentação Criativa</b>defesa, aprovação, entrega</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ============ MENTOR ============ -->
<section class="section paper" id="mentor">
  <div class="wrap mentor">
    <div class="mentor-img" data-reveal>
      <image-slot id="mentor" placeholder="Retrato · Ângelo Mazzutti" fit="cover"></image-slot>
    </div>
    <div data-reveal data-reveal-d="1">
      <span class="eyebrow">04 — O Mentor</span>
      <h2 class="mentor-name" style="margin-top:18px">Ângelo<br>Mazzutti</h2>
      <p class="mentor-role">Diretor Criativo · Fundador House Mazzutti</p>
      <p>Uma década dedicada à criação de valor estético e narrativo para marcas. À frente da House Mazzutti, Ângelo dirige campanhas de moda, beleza e publicidade que transformam marcas em referências. No Inside Out, ele abre o processo real — visão, técnica, acertos e erros — que separa o profissional de excelência do executor comum.</p>
      <div class="stats">
        <div class="stat"><div class="v">+20</div><div class="l">Anos de carreira</div></div>
        <div class="stat"><div class="v">6</div><div class="l">Módulos gravados</div></div>
        <div class="stat"><div class="v">∞</div><div class="l">Revisões incluídas</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ PREÇO ============ -->
<section class="section ink" id="preco">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">05 — Acesso</span>
      <span class="sec-index">Masterclass · 10 de agosto de 2026</span>
    </div>
    <div class="price-single" data-reveal>
      <div class="ps-left">
        <div>
          <div class="ps-tag">Edição de lançamento</div>
          <div class="ps-title" style="margin-top:14px">
            Inside Out
            <em>Masterclass On-demand · 2026</em>
          </div>
        </div>
        <div class="ps-meta">
          <div class="ps-meta-row"><span>Formato</span><span class="v">Vídeo on-demand</span></div>
          <div class="ps-meta-row"><span>Módulos</span><span class="v">6</span></div>
          <div class="ps-meta-row"><span>Acesso</span><span class="v">Vitalício — sem prazo</span></div>
          <div class="ps-meta-row"><span>Certificado</span><span class="v">Incluso</span></div>
          <div class="ps-meta-row"><span>Entrega</span><span class="v">Link imediato após o pagamento</span></div>
        </div>
      </div>
      <div class="ps-right">
        <div>
          <div class="ps-price"><span class="ps-cur">R$</span>197</div>
          <div class="ps-subprice">lançamento 10 de agosto</div>
        </div>
        <a class="btn solid lg" href="/checkout/inside-out" style="justify-content:space-between">
          <span class="lbl">Entrar na lista de espera</span>
          <span class="ar">↗</span>
        </a>
        <div class="ps-micro">
          <span>Sem compromisso</span>
          <span>Avisamos no lançamento</span>
          <span>Acesso vitalício</span>
        </div>
      </div>
    </div>

    <div class="guarantee" data-reveal>
      <div class="g-num">7</div>
      <div>
        <div class="g-k">Garantia incondicional</div>
        <div class="g-v"><em>Sete dias para assistir, testar e desistir.</em> Se não for o que você esperava, devolvemos o valor integral — sem perguntas, sem formulário, sem justificativa. Escreve para academy@housemazzutti.com.</div>
      </div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="section paper" id="faq">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">06 — Perguntas frequentes</span>
      <span class="sec-index">Tudo o que você precisa saber</span>
    </div>
    <div class="faq" data-reveal>
      <details open>
        <summary>É a gravação do workshop presencial? <span class="pm">+</span></summary>
        <div class="ans">Sim — e mais. É a íntegra do Inside Out gravada com qualidade de produção. O conteúdo é o mesmo da imersão presencial; o formato on-demand te dá o que o presencial não dava: pausar, rever e assistir no ritmo certo pra você.</div>
      </details>
      <details>
        <summary>Para quem é a masterclass? <span class="pm">+</span></summary>
        <div class="ans">Para profissionais de criação, branding, comunicação e produção que já operam no mercado e querem profundidade. Não é introdução ao tema — é processo avançado destrinchado por quem dirige campanhas reais há mais de 20 anos.</div>
      </details>
      <details>
        <summary>Como funciona o acesso após a compra? <span class="pm">+</span></summary>
        <div class="ans">Imediatamente após a confirmação do pagamento você recebe por e-mail o link de acesso ao conteúdo em vídeo. O acesso é vitalício — sem prazo de expiração, sem limite de visualizações.</div>
      </details>
      <details>
        <summary>Existe certificado? <span class="pm">+</span></summary>
        <div class="ans">Sim. Ao concluir os módulos você solicita o certificado de conclusão da House Mazzutti Academy pelo e-mail academy@housemazzutti.com.</div>
      </details>
      <details>
        <summary>Preciso de experiência prévia? <span class="pm">+</span></summary>
        <div class="ans">A masterclass foi desenhada para quem já trabalha com criação, branding ou comunicação. Se você já opera nesse universo e quer profundidade, está no lugar certo.</div>
      </details>
      <details>
        <summary>Qual a política de garantia? <span class="pm">+</span></summary>
        <div class="ans">Direito de arrependimento de 7 dias (Art. 49 CDC). Escreve para academy@housemazzutti.com — reembolso integral, sem perguntas.</div>
      </details>
    </div>
  </div>
</section>

<!-- ============ CTA FINAL ============ -->
<section class="section ink" id="reservar">
  <div class="wrap cta-final">
    <span class="eyebrow" style="color:var(--smoke)" data-reveal>Acesso imediato · vitalício</span>
    <h2 class="big" data-reveal>Da ideia à<br><span class="o">campanha.</span></h2>
    <p class="lead" data-reveal style="max-width:32ch;color:var(--smoke-lt)">De dentro para fora: o processo completo que separa quem executa de quem dirige.</p>
    <a class="btn solid lg" data-reveal href="/checkout/inside-out"><span class="lbl">Entrar na lista de espera</span><span class="ar">↗</span></a>
  </div>
  <div class="marquee">
    <div class="track">
      <span>Inside Out</span><span class="s">Masterclass On-demand</span><span>·</span><span>Direção Criativa</span><span class="s">Produção Executiva</span><span>·</span><span>Inside Out</span><span class="s">Masterclass On-demand</span><span>·</span><span>Direção Criativa</span><span class="s">Produção Executiva</span><span>·</span>
    </div>
  </div>
</section>

<!-- ============ FOOTER ============ -->
<footer class="footer">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <div class="foot-logo">House<br>Mazzutti</div>
        <p class="mono" style="margin-top:20px;color:var(--smoke)">Academy · #InsideOutMasterclass</p>
      </div>
      <div class="foot-col">
        <h4>Navegação</h4>
        <a href="#conceito">Conceito</a>
        <a href="#modulos">Módulos</a>
        <a href="#mentor">O Mentor</a>
        <a href="#preco">Preço</a>
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
      <span>Inside Out · Masterclass On-demand — De dentro para fora</span>
    </div>
  </div>
</footer>

<script src="/lp/workshop-io/image-slot.js"></script>
<script src="/lp/workshop-io/app-masterclass.js"></script>
</body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
