export const dynamic = 'force-static'

export function GET() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Inside Out · Edit 2 — Workshop HMZT · House Mazzutti</title>
<meta name="description" content="Dois dias dentro de um estúdio real. Inside Out Edit 2 — Studio Plano, São Paulo, 05 e 06 de setembro de 2026. Dois sets ao vivo, direção de campanha e pós-produção intensiva. 20 cadeiras.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://housemazzutti.com/academy/workshop-producao-direcao-01/">
<meta property="og:title" content="Inside Out · Edit 2 — Workshop HMZT">
<meta property="og:description" content="Dois dias de imersão em direção criativa e produção executiva de campanhas. São Paulo, 2026.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://housemazzutti.com/academy/workshop-producao-direcao-01/">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="House Mazzutti Academy">
<meta property="og:image" content="https://housemazzutti.com/images/academy/direcao-criativa/og-image.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://housemazzutti.com/images/academy/direcao-criativa/og-image.webp">
<meta name="twitter:title" content="Inside Out · Edit 2 — Workshop HMZT">
<meta name="twitter:description" content="Dois dias de imersão em direção criativa e produção executiva de campanhas. São Paulo, 2026.">
<!-- JSON-LD: Event + FAQPage -->
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[{"@type":"Event","name":"Inside Out · Edit 2 — Workshop HMZT","description":"Dois dias dentro de um estúdio real. Studio Plano, São Paulo, 05 e 06 de setembro de 2026. Dois sets ao vivo, direção de campanha e pós-produção intensiva. 20 cadeiras.","startDate":"2026-09-05","endDate":"2026-09-06","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode","eventStatus":"https://schema.org/EventScheduled","location":{"@type":"Place","name":"Studio Plano","address":{"@type":"PostalAddress","addressLocality":"São Paulo","addressRegion":"SP","addressCountry":"BR"}},"organizer":{"@type":"Organization","name":"House Mazzutti","url":"https://housemazzutti.com"},"performer":{"@type":"Person","name":"Ângelo Mazzutti","url":"https://housemazzutti.com/pt/angelo"},"image":"https://housemazzutti.com/images/academy/direcao-criativa/og-image.webp","url":"https://housemazzutti.com/academy/workshop-producao-direcao-01/","maximumAttendeeCapacity":20},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Para quem é o Inside Out?","acceptedAnswer":{"@type":"Answer","text":"Para fotógrafos, diretores, videomakers, produtores e profissionais da publicidade e do audiovisual que querem se aperfeiçoar na prática — participando de duas campanhas simultâneas ao lado de uma equipe de mercado consolidada. Turma fechada: 20 cadeiras."}},{"@type":"Question","name":"Onde e quando acontece?","acceptedAnswer":{"@type":"Answer","text":"Edit 2 acontece em São Paulo nos dias 05 e 06 de setembro de 2026, em dois dias intensivos e presenciais. Dia 01 no Studio Plano; Dia 02 com pós-produção online e encerramento presencial com a turma."}},{"@type":"Question","name":"Preciso de experiência prévia?","acceptedAnswer":{"@type":"Answer","text":"O workshop é voltado para quem já atua ou quer atuar com produção de alto padrão. Não é introdutório — é para quem quer elevar o nível do que já faz na prática."}},{"@type":"Question","name":"O que está incluso?","acceptedAnswer":{"@type":"Answer","text":"Os 2 dias de imersão, materiais de apoio (e-book, templates e documentos), kit do participante, souvenir exclusivo HMZT, coffee breaks, coquetel de networking e certificação oficial — conforme o plano escolhido."}},{"@type":"Question","name":"Qual a política de cancelamento?","acceptedAnswer":{"@type":"Answer","text":"Direito de arrependimento em até 7 dias (reembolso integral, Art. 49 CDC). Cancelamento até 15 dias antes do evento: reembolso parcial de 50%. A partir de 14 dias antes, sem reembolso."}},{"@type":"Question","name":"Existe certificado?","acceptedAnswer":{"@type":"Answer","text":"Sim. Certificação oficial com design profissional, além do Destaque da Imersão — premiação para o participante que mais se destacar ao longo dos dois dias."}}]}]}
</script>
<!-- Google tag — Consent Mode v2 (LGPD: defaults negados até consentimento) -->
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-R61KK25PBK"></script>
<script>gtag('js',new Date());gtag('config','G-R61KK25PBK',{send_page_view:true});gtag('config','AW-16938050518');</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/lp/workshop-io/styles.css">
</head>
<body>

<!-- ============ ANNOUNCEMENT BAR ============ -->
<div class="announce-bar" id="announceBar">
  <span class="announce-dot"></span>
  <span class="announce-txt">Abertura do <strong>Lote 1</strong> — <strong>quinta-feira, 09 de julho às 14h</strong></span>
  <a class="announce-cta" data-reserve href="#planos">Entrar na lista ↗</a>
  <button class="announce-close" id="announceClose" aria-label="Fechar">✕</button>
</div>
<style>
.announce-bar{position:fixed;top:0;left:0;right:0;z-index:200;background:#b85c2a;color:#fff;display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 20px;font-size:.78rem;letter-spacing:.04em;}
.announce-dot{width:7px;height:7px;border-radius:50%;background:#fff;opacity:.8;animation:blink 1.4s ease-in-out infinite;flex-shrink:0;}
@keyframes blink{0%,100%{opacity:.8}50%{opacity:.25}}
.announce-txt{flex:1;text-align:center;}
.announce-txt strong{font-weight:700;}
.announce-cta{color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.55);border-radius:2px;padding:4px 10px;font-size:.72rem;letter-spacing:.08em;white-space:nowrap;transition:background .2s;}
.announce-cta:hover{background:rgba(255,255,255,.15);}
.announce-close{background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:14px;padding:0 0 0 8px;flex-shrink:0;line-height:1;}
.announce-close:hover{color:#fff;}
body.has-announce .nav{top:40px;}
body.has-announce{padding-top:40px;}
@media(max-width:600px){.announce-cta{display:none;}.announce-txt{font-size:.72rem;}}
</style>
<script>
(function(){
  var bar=document.getElementById('announceBar');
  var close=document.getElementById('announceClose');
  if(sessionStorage.getItem('ann-closed')){bar.style.display='none';}else{document.body.classList.add('has-announce');}
  close.addEventListener('click',function(){bar.style.display='none';document.body.classList.remove('has-announce');sessionStorage.setItem('ann-closed','1');});
})();
</script>

<!-- ============ NAV ============ -->
<nav class="nav" id="nav">
  <a class="brand" href="#top"><span class="dot"></span> <span>Inside<b>Out</b></span></a>
  <div class="nav-right">
    <div class="nav-links">
      <a href="#conceito">Conceito</a>
      <a href="#metodo">Método</a>
      <a href="#mentor">Mentor</a>
      <a href="#planos">Planos</a>
      <a href="#faq">FAQ</a>
    </div>
    <a class="nav-cta" data-reserve href="#planos">Lista de espera</a>
    <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
  </div>
</nav>

<!-- ============ FULLSCREEN MENU ============ -->
<div class="menu" id="menu">
  <button class="menu-close" id="menuClose" aria-label="Fechar">✕</button>
  <ul class="menu-list">
    <li><a href="#conceito"><span class="n">01</span> Conceito</a></li>
    <li><a href="#vivencias"><span class="n">02</span> A Imersão</a></li>
    <li><a href="#metodo"><span class="n">03</span> Inside / Out</a></li>
    <li><a href="#mentor"><span class="n">04</span> O Mentor</a></li>
    <li><a href="#planos"><span class="n">05</span> Planos</a></li>
    <li><a href="#faq"><span class="n">06</span> FAQ</a></li>
  </ul>
  <div class="menu-foot">
    <a href="https://instagram.com/housemazzutti">Instagram ↗</a>
    <a href="mailto:marketing@mztgrupo.com">marketing@mztgrupo.com</a>
    <a href="tel:+5511952347533">+55 11 95234-7533</a>
    <span class="mono">São Paulo · BR</span>
  </div>
</div>

<!-- ============ HERO ============ -->
<header class="hero" id="top">
  <div class="hero-media" id="heroMedia">
    <div class="hero-slide active hero-slide--video">
      <!-- desktop: horizontal -->
      <video
        class="hero-video hero-video--h"
        autoplay muted loop playsinline
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;"
      >
        <source src="/videos/inside-out-hero-horizontal.mp4" type="video/mp4">
      </video>
      <!-- mobile: vertical -->
      <video
        class="hero-video hero-video--v"
        autoplay muted loop playsinline
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;display:none;"
      >
        <source src="/videos/inside-out-hero-vertical.mp4" type="video/mp4">
      </video>
    </div>
    <span class="slide-cap">Studio Plano · São Paulo<br>Inside Out · Edit 2 · Set 2026</span>
  </div>
  <style>
    @media (max-width:640px){
      .hero-video--h{display:none!important}
      .hero-video--v{display:block!important}
    }
  </style>

  <div class="hero-body">
    <div class="hero-top">
      <span class="mono">Studio Plano · São Paulo</span>
      <span class="mono">Edit 02 · 05 & 06 Set 2026</span>
    </div>

    <div class="hero-center">
      <span class="eyebrow">Workshop 100% prático · São Paulo · Set 2026</span>
      <h1 class="display hero-title h-hero" style="margin-top:14px">
        <span class="line"><span>Inside</span></span>
        <span class="line"><span class="hero-out">Out</span></span>
      </h1>
      <div class="hero-rot"><span class="rot" id="rot">Duas campanhas simultâneas · moda e beauty</span></div>
      <p class="hero-sub">Para maquiadores, modelos, fotógrafos, videomakers e stylists que querem aprimorar seu processo criativo acompanhando de perto a direção completa de duas campanhas — do pré à produção e à entrega ao cliente. <em>20 vagas.</em></p>
    </div>

    <div class="hero-foot">
      <div class="event-info-bar">
        <div class="eib-item">
          <span class="eib-l">Local</span>
          <span class="eib-v">Studio Plano · SP</span>
        </div>
        <div class="eib-sep"></div>
        <div class="eib-item">
          <span class="eib-l">Data · 2 dias</span>
          <span class="eib-v">05·06 Set 2026</span>
        </div>
        <div class="eib-sep"></div>
        <div class="eib-item">
          <span class="eib-l">Turma</span>
          <span class="eib-v">20 cadeiras</span>
        </div>
        <div class="eib-sep"></div>
        <a class="eib-cta" data-reserve href="#planos">Entrar na lista <span>↗</span></a>
      </div>
      <div class="countdown" id="countdown">
        <div class="cd-unit"><span class="cd-num" data-cd="d">00</span><span class="cd-lab">Dias</span></div>
        <div class="cd-unit"><span class="cd-num" data-cd="h">00</span><span class="cd-lab">Horas</span></div>
        <div class="cd-unit"><span class="cd-num" data-cd="m">00</span><span class="cd-lab">Min</span></div>
        <div class="cd-unit"><span class="cd-num" data-cd="s">00</span><span class="cd-lab">Seg</span></div>
      </div>
      <div class="scroll-cue">Role <span class="ln"></span></div>
    </div>
  </div>
</header>

<!-- ============ PARA QUEM É ============ -->
<section class="pq-strip">
  <div class="wrap pq-wrap">
    <span class="pq-label mono-sm">Para quem é</span>
    <div class="pq-items">
      <div class="pq-item">
        <span class="pq-icon">↗</span>
        <span><b>Fotógrafos e videomakers</b> que querem entender a direção criativa por dentro — e elevar o nível do que já entregam</span>
      </div>
      <div class="pq-item">
        <span class="pq-icon">↗</span>
        <span><b>Maquiadores e beauty artists</b> que querem ver como a direção pensa o beauty do briefing à entrega final ao cliente</span>
      </div>
      <div class="pq-item">
        <span class="pq-icon">↗</span>
        <span><b>Modelos</b> que querem entender o processo completo de produção de campanha e trabalhar melhor com qualquer diretor</span>
      </div>
      <div class="pq-item">
        <span class="pq-icon">↗</span>
        <span><b>Stylists e produtores de moda</b> que querem aprimorar seu processo criativo dentro de uma campanha real</span>
      </div>
      <div class="pq-item">
        <span class="pq-icon">↗</span>
        <span><b>Profissionais de produção executiva</b> que querem vivenciar o pré, a produção e a pós até a entrega ao cliente</span>
      </div>
      <div class="pq-item">
        <span class="pq-icon">↗</span>
        <span><b>Quem aprende fazendo</b> — acompanhando de perto cada decisão criativa, técnica e executiva de duas campanhas simultâneas</span>
      </div>
    </div>
  </div>
</section>
<style>
.pq-strip{background:var(--ink);padding:clamp(48px,6vw,72px) 0;}
.pq-wrap{display:flex;gap:clamp(40px,6vw,80px);align-items:flex-start;}
@media(max-width:700px){.pq-wrap{flex-direction:column;gap:28px;}}
.pq-label{color:var(--smoke);white-space:nowrap;padding-top:4px;}
.pq-items{display:grid;grid-template-columns:1fr 1fr;gap:0;flex:1;}
@media(max-width:640px){.pq-items{grid-template-columns:1fr;}}
.pq-item{display:flex;gap:14px;align-items:flex-start;padding:20px 20px 20px 0;border-bottom:1px solid var(--line-d);}
.pq-item:nth-child(odd){border-right:1px solid var(--line-d);padding-right:28px;}
.pq-item:nth-last-child(-n+2){border-bottom:none;}
@media(max-width:640px){.pq-item:nth-child(odd){border-right:none;}.pq-item:nth-last-child(-n+2){border-bottom:1px solid var(--line-d);}.pq-item:last-child{border-bottom:none;}}
.pq-icon{color:var(--accent);font-size:.8rem;margin-top:4px;flex-shrink:0;}
.pq-item span:last-child{font-size:.85rem;line-height:1.7;color:#c8c2b6;letter-spacing:.01em;}
</style>

<!-- ============ 01 · CONCEITO ============ -->
<section class="section paper io-conceito" id="conceito">
  <div class="wrap">
    <div class="conceito-tag" data-reveal>
      <span class="mono-sm">01 — Conceito</span>
      <span class="mono-sm">Studio Plano · SP · Set 2026</span>
    </div>
    <div class="conceito-split">
      <div class="conceito-left" data-reveal>
        <h2 class="conceito-h">Duas<br>campanhas.<br><em>Um dia.<br>Você lá.</em></h2>
      </div>
      <div class="conceito-right" data-reveal data-reveal-d="1">
        <p class="conceito-p">O Inside Out Edit 2 é voltado para profissionais de produção executiva — maquiadores, modelos, fotógrafos, videomakers e stylists — que querem aprimorar seu processo criativo acompanhando de perto a direção completa de duas campanhas reais: moda e beauty, simultâneas, num espaço profissional em São Paulo.</p>
        <p class="conceito-p">Você acompanha cada decisão — do briefing ao moodboard, da montagem do set à produção, da pós-produção à entrega final ao cliente. Não é teoria. É o processo real, por dentro, com quem faz isso no mercado.</p>
        <div class="conceito-line">
          <span>Do pré à entrega ao cliente.</span>
          <span>Dois sets simultâneos. Uma direção completa.</span>
          <span>Conhecimento que transforma o que você já faz.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ 02 · O QUE VOCÊ FAZ ============ -->
<section class="section io-faz" id="vivencias">
  <div class="wrap">
    <div class="faz-head" data-reveal>
      <span class="mono-sm">02 — O que você faz</span>
    </div>
    <div class="faz-grid">
      <div class="faz-item" data-reveal>
        <div class="faz-n">01</div>
        <div class="faz-t">Duas campanhas simultâneas</div>
        <div class="faz-d">Moda e beauty rodando ao mesmo tempo, no mesmo espaço. Você acompanha, aprende e produz dentro dos dois sets.</div>
      </div>
      <div class="faz-item" data-reveal data-reveal-d="1">
        <div class="faz-n">02</div>
        <div class="faz-t">Equipe de mercado consolidada</div>
        <div class="faz-d">Diretor criativo, fotógrafos profissionais, stylist, set design, camareira e modelos. Profissionais de grandes sets trabalhando ao seu lado.</div>
      </div>
      <div class="faz-item" data-reveal>
        <div class="faz-n">03</div>
        <div class="faz-t">Aperfeiçoamento na prática</div>
        <div class="faz-d">Cliques, direção, cenografia, figurino, locação — você absorve o processo completo de quem vive isso no mercado.</div>
      </div>
      <div class="faz-item" data-reveal data-reveal-d="1">
        <div class="faz-n">04</div>
        <div class="faz-t">Conteúdo próprio · foto e vídeo</div>
        <div class="faz-d">Cada participante tem espaço para gerar suas próprias imagens — foto ou vídeo — dentro da estrutura profissional do set.</div>
      </div>
      <div class="faz-item" data-reveal>
        <div class="faz-n">05</div>
        <div class="faz-t">Pós-produção + IA aplicada</div>
        <div class="faz-d">4h de edição ao vivo com Angelo. Retouch de still e moda com ferramentas reais de IA. Do clique à entrega.</div>
      </div>
      <div class="faz-item" data-reveal data-reveal-d="1">
        <div class="faz-n">06</div>
        <div class="faz-t">Network · São Paulo · Encerramento</div>
        <div class="faz-d">Conexões reais com profissionais do mercado e lista curada de fornecedores de São Paulo.</div>
      </div>
    </div>
  </div>
</section>

<!-- ============ OS DOIS SETS ============ -->
<section class="section paper sets-section">
  <div class="wrap">
    <div class="sets-head" data-reveal>
      <span class="mono-sm">Os dois sets · Dia 01 · Studio Plano · SP</span>
    </div>
    <div class="sets-grid">

      <!-- SET 01 · MODA -->
      <div class="set-card" data-reveal>
        <div class="set-card-top">
          <div class="set-tag mono-sm">Set 01</div>
          <div class="set-title">Moda<br>Lookbook</div>
          <ul class="set-credits">
            <li><span class="sc-role">Diretor Criativo</span><span class="sc-name">Angelo Mazzutti</span></li>
            <li><span class="sc-role">Fotógrafo</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Videomaker</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Stylist · Figurino</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Modelo</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Set Design · Cenografia</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Locação · Equipamentos</span><span class="sc-name">Studio Plano · SP</span></li>
            <li><span class="sc-role">Fotógrafo Suporte</span><span class="sc-name">Incluso</span></li>
          </ul>
        </div>
        <div class="set-img">
          <video autoplay muted loop playsinline poster="/images/produtora/moda/beatco/capa.webp" style="width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(.15) contrast(1.05);" src="/videos/beatco-moda.mp4"></video>
          <div class="set-overlay"></div>
          <div class="set-badge mono-sm">Foto · Vídeo · Lookbook · Campanha</div>
        </div>
      </div>

      <!-- SET 02 · BEAUTY -->
      <div class="set-card" data-reveal data-reveal-d="1">
        <div class="set-card-top">
          <div class="set-tag mono-sm">Set 02</div>
          <div class="set-title">Beauty<br>Still</div>
          <ul class="set-credits">
            <li><span class="sc-role">Diretor Criativo</span><span class="sc-name">Angelo Mazzutti</span></li>
            <li><span class="sc-role">Fotógrafo · Vídeo Still</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Maquiador · Beauty Artist</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Modelos</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Set Design · Cenografia</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Locação · Equipamentos</span><span class="sc-name">Studio Plano · SP</span></li>
            <li><span class="sc-role">Fotógrafo Suporte</span><span class="sc-name">Incluso</span></li>
            <li><span class="sc-role">Figurino · Styling</span><span class="sc-name">Incluso</span></li>
          </ul>
        </div>
        <div class="set-img">
          <video autoplay muted loop playsinline poster="/images/produtora/beleza/oceane/capa.webp" style="width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(.15) contrast(1.05);" src="/videos/beauty-oceane-larissa.mp4"></video>
          <div class="set-overlay"></div>
          <div class="set-badge mono-sm">Still · Beleza · Publicidade</div>
        </div>
      </div>

    </div>
  </div>
</section>
<style>
.sets-head{padding-bottom:20px;border-bottom:1px solid var(--line);margin-bottom:clamp(32px,4vw,56px);}
.sets-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2.5vw,32px);}
@media(max-width:700px){.sets-grid{grid-template-columns:1fr;}}
.set-card{display:flex;flex-direction:column;border:1px solid var(--line);overflow:hidden;}
.set-card-top{padding:clamp(20px,2.5vw,36px);background:var(--paper);}
.set-tag{color:#aaa;margin-bottom:10px;}
.set-title{font-family:var(--display);font-weight:900;font-size:clamp(2.2rem,4vw,4rem);line-height:.9;letter-spacing:-.02em;text-transform:uppercase;color:var(--ink);margin-bottom:clamp(20px,2.5vw,32px);}
.set-credits{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0;border-top:1px solid var(--line);}
.set-credits li{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:9px 0;border-bottom:1px solid var(--line);}
.sc-role{font-family:var(--mono);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#888;}
.sc-name{font-size:.78rem;font-weight:600;color:var(--ink);text-align:right;}
.set-img{position:relative;aspect-ratio:4/3;overflow:hidden;flex-shrink:0;}
.set-img img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(.2) contrast(1.05);}
.set-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,8,.72) 0%,rgba(10,10,8,.1) 55%,transparent 100%);}
.set-badge{position:absolute;bottom:16px;left:16px;color:rgba(239,233,218,.7);font-size:.58rem;letter-spacing:.16em;}
</style>

<!-- ============ 03 · OS DOIS DIAS (CALLSHEET) ============ -->
<section class="section ink io-dias" id="metodo">
  <div class="wrap">
    <div class="dias-head" data-reveal>
      <span class="mono-sm" style="color:var(--smoke)">03 — Os dois dias</span>
      <span class="mono-sm" style="color:var(--smoke)">Studio Plano · São Paulo</span>
    </div>
    <div class="dias-grid">

      <div class="dia-col" data-reveal>
        <div class="dia-label">
          <span class="dia-num">Dia 01</span>
          <span class="dia-data mono-sm">Sáb 05 Set · Studio Plano · SP</span>
        </div>
        <div class="dia-word">Inside</div>
        <div class="callsheet">
          <div class="cs-row"><span class="cs-tm">Call</span><span class="cs-ds"><b>Alinhamento de briefing</b>1h com Angelo — escopo, conceito e direção visual da campanha</span></div>
          <div class="cs-row"><span class="cs-tm">Manhã</span><span class="cs-ds"><b>Moodboard ao vivo + montagem de set</b>Referências, mood e cenografia em tempo real</span></div>
          <div class="cs-row"><span class="cs-tm">—</span><span class="cs-ds"><b>Set 01 · Moda</b>Lookbook, foto e vídeo publicitário</span></div>
          <div class="cs-row"><span class="cs-tm">Tarde</span><span class="cs-ds"><b>Set 02 · Beauty</b>Still publicitário · nova produção</span></div>
          <div class="cs-row"><span class="cs-tm">—</span><span class="cs-ds"><b>Wrap + debriefing</b>Angelo disponível o dia inteiro</span></div>
        </div>
      </div>

      <div class="dia-divider"></div>

      <div class="dia-col" data-reveal data-reveal-d="1">
        <div class="dia-label">
          <span class="dia-num">Dia 02</span>
          <span class="dia-data mono-sm">Dom 06 Set · Online · São Paulo</span>
        </div>
        <div class="dia-word">Out</div>
        <div class="callsheet">
          <div class="cs-row"><span class="cs-tm">08:00</span><span class="cs-ds"><b>Pós-produção</b>Edição ao vivo — turma fechada</span></div>
          <div class="cs-row"><span class="cs-tm">—</span><span class="cs-ds"><b>IA aplicada</b>Retouch still e moda com ferramentas reais</span></div>
          <div class="cs-row"><span class="cs-tm">12:00</span><span class="cs-ds"><b>Fornecedores SP</b>Lista curada de parceiros</span></div>
          <div class="cs-row"><span class="cs-tm">14:00</span><span class="cs-ds"><b>Encerramento presencial</b>Almoço com a turma · São Paulo</span></div>
          <div class="cs-row"><span class="cs-tm">—</span><span class="cs-ds"><b>Certificação HMZT</b>Oficial. Assinado. Merecido.</span></div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ============ GALERIA ============ -->
<section class="section ink gallery io-gallery" id="galeria">
  <div class="wrap">
    <div class="gal-head" data-reveal>
      <span class="mono-sm" style="color:var(--smoke)">Bastidores · Edit 01</span>
      <span class="mono-sm" style="color:var(--smoke)">A atmosfera de um set profissional real</span>
    </div>
    <div class="gallery-grid">
      <div class="gallery-item" data-reveal><img src="/images/academy/studio-plano/studio-plano-1.webp" alt="Studio Plano · Camarim" loading="lazy"></div>
      <div class="gallery-item" data-reveal data-reveal-d="1"><img src="/images/academy/studio-plano/studio-plano-2.webp" alt="Studio Plano · Ciclorama" loading="lazy"></div>
      <div class="gallery-item" data-reveal data-reveal-d="2"><img src="/images/academy/studio-plano/studio-plano-3.webp" alt="Studio Plano · Lounge" loading="lazy"></div>
      <div class="gallery-item" data-reveal><img src="/images/academy/edit-01/edit01-equipe.webp" alt="Edit 01 · Equipe" loading="lazy"></div>
      <div class="gallery-item" data-reveal data-reveal-d="1"><img src="/images/academy/edit-01/edit01-model.webp" alt="Edit 01 · Set" loading="lazy"></div>
      <div class="gallery-item" data-reveal data-reveal-d="2"><img src="/images/academy/edit-01/edit01-amanda.webp" alt="Edit 01 · Produção" loading="lazy"></div>
    </div>
  </div>
</section>

<style>
/* ── CONCEITO ── */
.conceito-tag{display:flex;justify-content:space-between;align-items:center;padding-bottom:20px;border-bottom:1px solid var(--line);margin-bottom:clamp(40px,6vw,80px);}
.conceito-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(48px,8vw,120px);align-items:start;}
@media(max-width:760px){.conceito-split{grid-template-columns:1fr;}}
.conceito-h{font-family:var(--display);font-weight:900;font-size:clamp(2.6rem,6vw,6.6rem);line-height:.9;letter-spacing:-.02em;text-transform:uppercase;margin:0;}
.conceito-h em{font-style:italic;font-weight:900;}
.conceito-p{font-size:clamp(1rem,1.15vw,1.15rem);line-height:1.75;color:#54524d;margin-bottom:2em;max-width:38ch;letter-spacing:.01em;}
.conceito-line{margin-top:clamp(40px,5vw,64px);display:flex;flex-direction:column;gap:18px;border-left:2px solid var(--ink);padding-left:22px;}
.conceito-line span{font-size:.88rem;color:#888;line-height:1.7;letter-spacing:.015em;}
/* ── O QUE VOCÊ FAZ ── */
.io-faz{background:#f4f1ea;}
.faz-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:24px;border-bottom:1px solid #ddd6c8;margin-bottom:clamp(48px,6vw,80px);}
.faz-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid #ddd6c8;}
@media(max-width:860px){.faz-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.faz-grid{grid-template-columns:1fr;}}
.faz-item{padding:clamp(32px,4vw,56px) clamp(20px,2.5vw,36px);border-right:1px solid #ddd6c8;border-bottom:1px solid #ddd6c8;}
.faz-item:nth-child(3n){border-right:none;}
@media(max-width:860px){.faz-item:nth-child(2n){border-right:none;}.faz-item:nth-child(3n){border-right:1px solid #ddd6c8;}}
.faz-n{font-family:var(--mono);font-size:.6rem;letter-spacing:.2em;color:#bbb;margin-bottom:18px;}
.faz-t{font-weight:700;font-size:clamp(.95rem,1.15vw,1.1rem);color:var(--ink);margin-bottom:12px;letter-spacing:-.01em;line-height:1.25;}
.faz-d{font-size:.85rem;line-height:1.7;color:#6a6a66;letter-spacing:.008em;}
/* ── OS DOIS DIAS ── */
.dias-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:20px;border-bottom:1px solid var(--line-d);margin-bottom:clamp(40px,6vw,80px);}
.dias-grid{display:grid;grid-template-columns:1fr 1px 1fr;gap:clamp(32px,5vw,72px);}
@media(max-width:760px){.dias-grid{grid-template-columns:1fr;}.dia-divider{display:none;}}
.dia-divider{background:var(--line-d);width:1px;}
.dia-label{margin-bottom:16px;}
.dia-num{display:block;font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--smoke);margin-bottom:4px;}
.dia-data{color:var(--smoke)!important;}
.dia-word{font-family:var(--display);font-weight:900;font-size:clamp(4rem,9vw,9rem);line-height:.88;letter-spacing:-.03em;text-transform:uppercase;color:var(--paper);margin:24px 0 32px;}
.callsheet{display:flex;flex-direction:column;gap:0;border-top:1px solid var(--line-d);}
.cs-row{display:grid;grid-template-columns:56px 1fr;gap:12px;padding:14px 0;border-bottom:1px solid var(--line-d);}
.cs-tm{font-family:var(--mono);font-size:.58rem;letter-spacing:.1em;color:var(--smoke);padding-top:2px;}
.cs-ds{font-size:.82rem;line-height:1.5;color:#c8c2b6;}
.cs-ds b{display:block;color:var(--paper);font-weight:600;margin-bottom:2px;}
/* ── GALERIA ── */
.gal-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:20px;border-bottom:1px solid var(--line-d);margin-bottom:clamp(32px,4vw,56px);}
.mono-sm{font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;}
</style>


<!-- ============ DIRETOR ============ -->
<section class="section ink diretor-section" id="mentor">
  <div class="wrap">
    <div class="diretor-eyebrow" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">04 — Quem dirige</span>
      <span class="mono" style="color:var(--smoke);font-size:.62rem;letter-spacing:.14em">Diretor Criativo · Inside Out Edit 2</span>
    </div>
    <div class="diretor-grid" data-reveal>
      <div class="diretor-foto">
        <img src="/images/academy/crew/angelo-mazzutti-crew.webp" alt="Angelo Mazzutti · Diretor Criativo" loading="lazy">
        <div class="diretor-label"><span class="mono">ANGELO MAZZUTTI</span></div>
      </div>
      <div class="diretor-bio" data-reveal data-reveal-d="1">
        <h2 class="diretor-name">Angelo<br>Mazzutti</h2>
        <p class="diretor-role mono">Diretor Criativo · Fundador<br>House Mazzutti & HMZT Produtora</p>
        <p class="diretor-text">Dez anos de campanhas reais para marcas de moda, beleza e lifestyle. Angelo não ensina o que leu — ensina o que fez. No Studio Plano, ele abre o processo que conduz seus próprios sets: as decisões de direção criativa, os bastidores da produção executiva, os acertos e os erros que nenhum curso mostra.</p>
        <p class="diretor-text">Você vai trabalhar ao lado de quem constrói o que você quer construir.</p>
        <div class="stats" style="margin-top:clamp(28px,4vw,48px);border-top:1px solid var(--line-d);padding-top:24px">
          <div class="stat"><div class="v" style="color:var(--paper)">10</div><div class="l">Anos de carreira</div></div>
          <div class="stat"><div class="v" style="color:var(--paper)">20</div><div class="l">Cadeiras · turma única</div></div>
          <div class="stat"><div class="v" style="color:var(--paper)">2</div><div class="l">Dias de imersão</div></div>
        </div>
      </div>
    </div>
  </div>
  <style>
.diretor-section{background:var(--ink);color:var(--paper);}
.diretor-eyebrow{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:clamp(32px,4vw,56px);padding-bottom:18px;border-bottom:1px solid var(--line-d);}
.diretor-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,100px);align-items:start;}
@media(max-width:860px){.diretor-grid{grid-template-columns:1fr;}}
.diretor-foto{position:relative;}
.diretor-foto img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block;filter:grayscale(.15);}
.diretor-label{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(10,10,8,.85) 0%,transparent 100%);padding:clamp(16px,3vw,32px);display:flex;align-items:flex-end;}
.diretor-label span{font-size:.6rem;letter-spacing:.22em;color:rgba(239,233,218,.7);}
.diretor-name{font-family:var(--display);font-weight:700;text-transform:uppercase;font-size:clamp(3rem,7vw,7rem);line-height:.88;letter-spacing:0;margin:0 0 20px;}
.diretor-role{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--smoke);margin-bottom:clamp(20px,3vw,36px);line-height:1.8;}
.diretor-text{color:#c8c2b6;line-height:1.7;max-width:48ch;margin-bottom:1em;}
  </style>
</section>

<!-- ============ PLANOS ============ -->
<section class="section ink" id="planos">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">05 — Sua cadeira</span>
      <span class="sec-index">20 lugares · turma fechada · sem reprise</span>
    </div>
    <div class="plans plans--lotes" data-reveal>

      <div class="plan plan--lote feat">
        <span class="ribbon">Lote atual</span>
        <div class="plan-tag"><span>Lote 1</span><span>01</span></div>
        <div class="plan-name">R$ 1.410</div>
        <div class="plan-price" style="margin:4px 0 20px"><small>3× R$ 470 · Preço de lançamento</small></div>
        <ul class="plan-feats">
          <li>Dia 01 completo no <strong>Studio Plano · SP</strong></li>
          <li>Direção de moodboard ao vivo</li>
          <li>Set 01 · Moda — still, lookbook, campanha</li>
          <li>Set 02 · Beauty — ao vivo</li>
          <li>Suporte e orientação em tempo real</li>
          <li>Material de pré-produção via link</li>
          <li>Pós-produção intensiva · Dia 02 online</li>
          <li>Lista de fornecedores e parceiros SP</li>
          <li>Certificado oficial HMZT</li>
          <li>🏆 <strong>Concorre ao Prêmio Destaque</strong> — ingresso devolvido + vaga no próximo evento</li>
        </ul>
        <button class="btn solid" data-reserve data-plan="Inside Out — Lote 1"><span class="lbl">Entrar na lista de espera</span><span class="ar">↗</span></button>
      </div>

      <div class="plan plan--lote">
        <span class="ribbon" style="background:#2a2a22;color:#efe9da">Abre 10 Jul</span>
        <div class="plan-tag"><span>Lote 2</span><span>02</span></div>
        <div class="plan-name">R$ 1.530</div>
        <div class="plan-price" style="margin:4px 0 20px"><small>3× R$ 510 · Abre 10 Jul</small></div>
        <ul class="plan-feats">
          <li>Dia 01 completo no <strong>Studio Plano · SP</strong></li>
          <li>Direção de moodboard ao vivo</li>
          <li>Set 01 · Moda — still, lookbook, campanha</li>
          <li>Set 02 · Beauty — ao vivo</li>
          <li>Suporte e orientação em tempo real</li>
          <li>Material de pré-produção via link</li>
          <li>Pós-produção intensiva · Dia 02 online</li>
          <li>Lista de fornecedores e parceiros SP</li>
          <li>Certificado oficial HMZT</li>
          <li>🏆 <strong>Concorre ao Prêmio Destaque</strong> — ingresso devolvido + vaga no próximo evento</li>
        </ul>
        <button class="btn" disabled style="opacity:.5;cursor:not-allowed;border-style:dashed"><span class="lbl">Aguarde · em breve</span></button>
      </div>

      <div class="plan plan--lote">
        <div class="plan-tag"><span>Lote 3</span><span>03</span></div>
        <div class="plan-name">R$ 1.700</div>
        <div class="plan-price" style="margin:4px 0 20px"><small>Disponível a partir de 05 Ago</small></div>
        <ul class="plan-feats">
          <li>Dia 01 completo no <strong>Studio Plano · SP</strong></li>
          <li>Direção de moodboard ao vivo</li>
          <li>Set 01 · Moda — still, lookbook, campanha</li>
          <li>Set 02 · Beauty — ao vivo</li>
          <li>Suporte e orientação em tempo real</li>
          <li>Material de pré-produção via link</li>
          <li>Pós-produção intensiva · Dia 02 online</li>
          <li>Lista de fornecedores e parceiros SP</li>
          <li>Certificado oficial HMZT</li>
          <li>🏆 <strong>Concorre ao Prêmio Destaque</strong> — ingresso devolvido + vaga no próximo evento</li>
        </ul>
        <button class="btn" data-reserve data-plan="Inside Out — Lote 3" disabled style="opacity:.45;cursor:not-allowed"><span class="lbl">Disponível 05 Ago</span></button>
      </div>

    </div>

    <div class="scarcity" data-reveal>
      <span class="vagas-txt" id="vagasTxt">14 / 20 cadeiras preenchidas</span>
      <span class="vagas-bar"><i id="vagasBar"></i></span>
      <span class="vagas-txt" style="color:var(--accent)">● Lote 1 encerrando</span>
    </div>
  </div>
</section>

<!-- ============ STUDIO PLANO ============ -->
<section class="section paper" id="local" style="padding-top:0">
  <div class="wrap">
    <div style="border:1px solid var(--line);padding:clamp(32px,5vw,64px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,64px);align-items:center;" data-reveal>
      <div style="aspect-ratio:3/4;background:var(--ink);overflow:hidden;position:relative;order:-1">
        <video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;" src="/videos/dona-onca.mp4" poster="/images/academy/studio-plano/studio-plano-1.webp"></video>
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,8,.55) 0%,transparent 55%);pointer-events:none"></div>
        <span style="position:absolute;bottom:16px;left:16px;font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;color:#fff;opacity:.7">Studio Plano · São Paulo · SP</span>
      </div>
      <div>
        <span class="eyebrow" style="margin-bottom:18px;display:block">— O Local · Dia 01</span>
        <h2 class="display" style="font-size:clamp(2rem,4vw,3.8rem);font-weight:700;text-transform:uppercase;line-height:.95;margin-bottom:clamp(18px,2.5vw,30px)">Studio<br>Plano</h2>
        <p style="color:#54524d;line-height:1.7;max-width:36ch;letter-spacing:.01em">Estúdio profissional real em São Paulo. Não uma sala de aula — o mesmo espaço onde campanhas de marcas são produzidas. Dois cicloramas, camarim completo e lounge.</p>
        <ul style="margin-top:clamp(20px,3vw,32px);list-style:none;padding:0;display:flex;flex-direction:column;gap:12px;border-left:2px solid var(--ink);padding-left:20px">
          <li style="font-size:.85rem;color:#54524d;line-height:1.6;letter-spacing:.008em"><strong style="color:var(--ink);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;display:block;margin-bottom:2px">Ciclorama</strong>Dois cicloramas equipados — branco e colorido</li>
          <li style="font-size:.85rem;color:#54524d;line-height:1.6;letter-spacing:.008em"><strong style="color:var(--ink);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;display:block;margin-bottom:2px">Iluminação</strong>Flash de estúdio, contínua e natureba disponíveis</li>
          <li style="font-size:.85rem;color:#54524d;line-height:1.6;letter-spacing:.008em"><strong style="color:var(--ink);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;display:block;margin-bottom:2px">Camarim</strong>Camarim completo para equipe e modelos</li>
          <li style="font-size:.85rem;color:#54524d;line-height:1.6;letter-spacing:.008em"><strong style="color:var(--ink);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;display:block;margin-bottom:2px">Lounge</strong>Área de convivência e coffee break</li>
        </ul>
        <p style="margin-top:24px;font-family:var(--mono);font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ink)">São Paulo · SP · 05 de Setembro 2026</p>
      </div>
    </div>
  </div>
</section>
<style>@media (max-width:760px){#local .wrap > div{grid-template-columns:1fr!important} #local .wrap > div > div:first-child{order:0!important}}</style>

<!-- ============ DEPOIMENTOS ============ -->
<section class="section paper" id="depoimentos">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">— Edit 01 · quem esteve lá</span>
      <span class="sec-index">Palavras de quem viveu o processo</span>
    </div>
    <div class="tlist">
      <div class="tcard" data-reveal>
        <p class="tquote">Saí com um método, não com inspiração. Ver a campanha sendo construída ao vivo me mostrou o que eu não sabia que não sabia sobre direção.</p>
        <div class="tmeta"><image-slot id="t1" shape="circle" placeholder=" "></image-slot><div><div class="nm">Cassio</div><div class="rl">Fotógrafo · São Paulo / SP</div></div></div>
      </div>
      <div class="tcard" data-reveal data-reveal-d="1">
        <p class="tquote">Não é um curso — é uma produção. Você está dentro do set, tomando decisões. Isso muda o nível da sua entrega para sempre.</p>
        <div class="tmeta"><image-slot id="t2" shape="circle" placeholder=" "></image-slot><div><div class="nm">Rebeca</div><div class="rl">Maquiadora · São Paulo / SP</div></div></div>
      </div>
      <div class="tcard" data-reveal data-reveal-d="2">
        <p class="tquote">Dois dias densos, sem enrolação. A direção de moodboard ao vivo valeu sozinha. Voltei para o trabalho com outra cabeça.</p>
        <div class="tmeta"><image-slot id="t3" shape="circle" placeholder=" "></image-slot><div><div class="nm">Amanda</div><div class="rl">Stylist · São Paulo / SP</div></div></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="section paper" id="faq" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">06 — Perguntas frequentes</span>
      <span class="sec-index">Tudo o que você precisa saber</span>
    </div>
    <div class="faq" data-reveal>
      <details open><summary>Para quem é o Inside Out? <span class="pm">+</span></summary><div class="ans">Para maquiadores, modelos, fotógrafos, videomakers e stylists que querem aprimorar seu processo criativo acompanhando de perto a direção completa de duas campanhas — do pré, passando pela produção, até a entrega ao cliente. É para quem já atua e quer entender o processo por dentro. Turma fechada: 20 cadeiras.</div></details>
      <details><summary>Onde acontece o Dia 01? <span class="pm">+</span></summary><div class="ans">No <strong>Studio Plano</strong>, em São Paulo, no dia <strong>05 de setembro de 2026</strong>. Um estúdio profissional real — não uma sala de aula. O endereço completo é enviado na confirmação da inscrição.</div></details>
      <details><summary>E o Dia 02? <span class="pm">+</span></summary><div class="ans">Começa online: sala fechada no <strong>Google Meet das 8h às 12h</strong>, exclusiva para a turma — 4 horas de pós-produção intensiva com Angelo Mazzutti. Às 14h, encerramento presencial com almoço e happy hour com a turma em São Paulo.</div></details>
      <details><summary>O que trago para o Dia 01? <span class="pm">+</span></summary><div class="ans">Câmera (qualquer câmera — o importante é você saber o que fará com ela), celular, prancheta, notebook e toda a sua criatividade. O estúdio, a equipe, os modelos e o set são por conta do evento.</div></details>
      <details><summary>O que está incluso em todos os planos? <span class="pm">+</span></summary><div class="ans">Material de pré-produção via link (enviado antes do evento), Dia 01 completo no Studio Plano com 2 sets ao vivo, pós-produção intensiva no Dia 02, encerramento presencial com almoço, lista curada de fornecedores e parceiros de SP, e certificação oficial HMZT. Planos Pro e Executivo incluem benefícios adicionais.</div></details>
      <details><summary>Qual a política de cancelamento? <span class="pm">+</span></summary><div class="ans">Direito de arrependimento em até 7 dias corridos da compra (reembolso integral, Art. 49 CDC). Cancelamento até 15 dias antes do evento: reembolso de 50%. Após esse prazo, sem reembolso. Solicitações por contato@mztgrupo.com.</div></details>
    </div>
  </div>
</section>

<!-- ============ CTA FINAL ============ -->
<section class="section ink" id="reservar">
  <div class="wrap cta-final">
    <span class="eyebrow" style="color:var(--smoke)" data-reveal>20 cadeiras · Studio Plano · São Paulo</span>
    <h2 class="big" data-reveal>Sua cadeira<br><span class="o">está esperando.</span></h2>
    <p class="lead" data-reveal style="max-width:34ch;color:var(--smoke-lt)">Dois dias. Um estúdio real. Um processo que você leva para o resto da carreira.</p>
    <button class="btn solid lg" data-reveal data-reserve data-plan="Lista de espera"><span class="lbl">Entrar na lista de espera</span><span class="ar">↗</span></button>
  </div>
  <div class="marquee">
    <div class="track">
      <span>Inside Out · Edit 2</span><span class="s">Studio Plano</span><span>·</span><span>São Paulo</span><span class="s">05 & 06 Set 2026</span><span>·</span><span>Inside Out · Edit 2</span><span class="s">Studio Plano</span><span>·</span><span>São Paulo</span><span class="s">05 & 06 Set 2026</span><span>·</span>
    </div>
  </div>
</section>

<!-- ============ FOOTER ============ -->
<footer class="footer">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <div class="foot-logo">House<br>Mazzutti</div>
        <p class="mono" style="margin-top:20px;color:var(--smoke)">HMZT Produtora · #ImersaoInsideOut</p>
      </div>
      <div class="foot-col">
        <h4>Navegação</h4>
        <a href="#conceito">Conceito</a>
        <a href="#metodo">Método Inside/Out</a>
        <a href="#mentor">O Mentor</a>
        <a href="#planos">Planos</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="foot-col">
        <h4>Contato</h4>
        <a href="mailto:contato@mztgrupo.com">contato@mztgrupo.com</a>
        <a href="tel:+5511952347533">+55 11 95234-7533</a>
        <p>Planalto Paulista · São Paulo / SP</p>
        <a href="https://instagram.com/housemazzutti">Instagram ↗</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 House Mazzutti Agência Produtora · CNPJ 24.435.135/0001-48</span>
      <span>Inside Out · Edit 2 — De dentro para fora</span>
    </div>
  </div>
</footer>

<!-- ============ MODAL ============ -->
<div class="modal" id="modal">
  <div class="modal-bg" data-close></div>
  <div class="modal-card">
    <button class="modal-close" data-close aria-label="Fechar">✕</button>
    <div id="modalForm">
      <h3>Lista de espera</h3>
      <div class="sub" id="modalSub">Inside Out · Edit 2 — São Paulo · Set 2026</div>
      <p style="color:#54524d;font-size:.85rem;margin:0 0 20px;line-height:1.5">Cadastre-se e seja avisado em primeira mão quando as vagas abrirem. Sem compromisso.</p>
      <form id="form" novalidate>
        <div class="field"><label>Nome completo</label><input name="nome" type="text" autocomplete="name" placeholder="Seu nome"><div class="msg">Informe seu nome</div></div>
        <div class="field"><label>E-mail</label><input name="email" type="email" autocomplete="email" placeholder="seu@email.com"><div class="msg">E-mail inválido</div></div>
        <div class="field"><label>WhatsApp</label><input name="fone" type="tel" autocomplete="tel" placeholder="(11) 99999-9999"><div class="msg">Informe um telefone válido</div></div>
        <input type="hidden" name="plano" value="Lista de espera — Inside Out Edit 2">
        <div class="form-error" style="display:none;color:#c92a2a;font-size:13px;margin-bottom:12px;text-align:center"></div>
        <button class="btn solid" type="submit"><span class="lbl">Entrar na lista</span><span class="ar">↗</span></button>
      </form>
    </div>
    <div class="modal-success" id="modalSuccess" style="display:none">
      <div class="ok">✓</div>
      <h3>Você está na lista</h3>
      <div class="sub">Avisamos assim que as vagas abrirem.</div>
      <p style="color:#54524d;max-width:34ch;margin:0 auto">Fique de olho no seu e-mail e WhatsApp. Você vai ser um dos primeiros a saber.</p>
    </div>
  </div>
</div>

<script src="/lp/workshop-io/image-slot.js"></script>
<script src="/lp/workshop-io/app.js"></script>
</body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=120, stale-while-revalidate=3600',
    },
  })
}
