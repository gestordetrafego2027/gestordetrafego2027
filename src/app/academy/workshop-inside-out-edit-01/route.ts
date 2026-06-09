export const dynamic = 'force-static';

export function GET() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Inside Out · Edit 01 · Uberlândia — House Mazzutti</title>
<meta name="description" content="Tudo que rolou na primeira edição do Workshop Inside Out — 2 dias de direção criativa e produção executiva em Uberlândia, MG. Setembro de 2025.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/lp/workshop-io-edit-01/styles.css">
</head>
<body>

<!-- ============ NAV ============ -->
<nav class="nav" id="nav">
  <a class="brand" href="#top"><span class="dot"></span> <span>Inside<b>Out</b></span></a>
  <div class="nav-right">
    <div class="nav-links">
      <a href="#aconteceu">O Evento</a>
      <a href="#metodo">Método</a>
      <a href="#galeria">Galeria</a>
      <a href="#depoimentos">Depoimentos</a>
    </div>
    <a class="nav-cta btn" href="/academy/workshop-producao-direcao-01">Edit 02 · SP ↗</a>
    <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
  </div>
</nav>

<!-- ============ FULLSCREEN MENU ============ -->
<div class="menu" id="menu">
  <button class="menu-close" id="menuClose" aria-label="Fechar">✕</button>
  <ul class="menu-list">
    <li><a href="#aconteceu"><span class="n">01</span> O Evento</a></li>
    <li><a href="#metodo"><span class="n">02</span> Método</a></li>
    <li><a href="#galeria"><span class="n">03</span> Galeria</a></li>
    <li><a href="#video"><span class="n">04</span> Aftermovie</a></li>
    <li><a href="#depoimentos"><span class="n">05</span> Depoimentos</a></li>
    <li><a href="/academy/workshop-producao-direcao-01"><span class="n">→</span> Edit 02 · SP</a></li>
  </ul>
  <div class="menu-foot">
    <a href="https://instagram.com/housemazzutti">Instagram ↗</a>
    <a href="mailto:marketing@mztgrupo.com">marketing@mztgrupo.com</a>
    <span class="mono">Uberlândia · MG · Set 2025</span>
  </div>
</div>

<!-- ============ HERO ============ -->
<header class="hero" id="top">
  <div class="hero-bg">
    <image-slot id="hero-bg" placeholder="Foto hero · Inside Out Edit 01 · Uberlândia" fit="cover"></image-slot>
  </div>

  <div class="hero-body">
    <div class="hero-kicker">
      <span class="k-accent">✓ Realizado</span>
      <span>Edit 01 · Uberlândia · MG</span>
      <span>27 e 28 Set · 2025</span>
    </div>

    <h1 class="display hero-title h-hero" style="margin:0">
      <span class="line"><span>Inside</span></span>
      <span class="line"><span class="hero-out">Out</span></span>
    </h1>

    <p class="hero-sub">A primeira edição do workshop que coloca a criação em movimento — da concepção da ideia à execução de uma campanha real. Em dois dias, Uberlândia virou set.</p>

    <div class="hero-foot">
      <div class="hero-stat">
        <span class="v">2</span>
        <span class="l">Dias de imersão</span>
      </div>
      <div class="hero-divider"></div>
      <div class="hero-stat">
        <span class="v">30</span>
        <span class="l">Participantes</span>
      </div>
      <div class="hero-divider"></div>
      <div class="hero-stat">
        <span class="v">1</span>
        <span class="l">Campanha entregue</span>
      </div>
      <div class="hero-divider"></div>
      <div class="hero-stat">
        <span class="v">UDI</span>
        <span class="l">Villa Terré · Fundinho</span>
      </div>
    </div>
  </div>
</header>

<!-- ============ O QUE ACONTECEU ============ -->
<section class="section paper" id="aconteceu">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">01 — O que aconteceu</span>
      <span class="sec-index">Inside Out · Edit 01 · Set 2025</span>
    </div>
    <div class="aconteceu">
      <h2 class="big" data-reveal>De dentro pra fora — <em>do zero à campanha.</em></h2>
      <div class="aconteceu-right">
        <p class="lead" data-reveal>Dois dias intensivos em que 30 participantes aprenderam, na prática, como funciona uma produção de campanha de ponta a ponta — com Angelo Mazzutti conduzindo cada etapa ao vivo.</p>
        <p data-reveal style="color:#54524d;line-height:1.6">Na primeira edição, Uberlândia se tornou o palco de uma experiência que misturou estratégia, estética e execução real. O resultado: uma campanha completa produzida dentro do workshop, com modelos, iluminação profissional e direção de arte ao vivo.</p>
        <div class="ficha" data-reveal>
          <div class="ficha-item">
            <div class="fi-l">Data</div>
            <div class="fi-v">27 e 28 de Setembro de 2025</div>
          </div>
          <div class="ficha-item">
            <div class="fi-l">Local</div>
            <div class="fi-v">Villa Terré · R. Tiradentes, 66<br>Fundinho · Uberlândia / MG</div>
          </div>
          <div class="ficha-item">
            <div class="fi-l">Formato</div>
            <div class="fi-v">Presencial · 2 dias</div>
          </div>
          <div class="ficha-item">
            <div class="fi-l">Turma</div>
            <div class="fi-v">30 participantes · turma única</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ NÚMEROS ============ -->
<section class="section ink" style="padding-top:0;padding-bottom:0">
  <div class="wrap" style="max-width:100%;padding:0">
    <div class="numeros">
      <div class="num-item">
        <div class="v" data-count="2">2</div>
        <div class="l">Dias de imersão</div>
      </div>
      <div class="num-item">
        <div class="v" data-count="30">30</div>
        <div class="l">Participantes</div>
      </div>
      <div class="num-item">
        <div class="v" data-count="8">8</div>
        <div class="l">Módulos</div>
      </div>
      <div class="num-item">
        <div class="v" data-count="1">1</div>
        <div class="l">Campanha entregue ao vivo</div>
      </div>
    </div>
  </div>
</section>

<!-- ============ MÉTODO INSIDE / OUT ============ -->
<section class="section ink" id="metodo">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">02 — A Metodologia</span>
      <span class="sec-index">De dentro para fora · 2 dias</span>
    </div>
  </div>
  <div class="wrap" style="max-width:var(--maxw)">
    <div class="io">
      <div class="io-col inside" data-reveal>
        <div class="io-tag">
          <span class="io-day">Dia 01</span>
          <span class="mono">Arquitetura da Criação</span>
        </div>
        <div class="io-word">Inside</div>
        <p class="io-desc">Estratégia, branding, storytelling e ideação — o trabalho que acontece antes do set, que a maioria nunca vê.</p>
        <ul class="modulos">
          <li><span class="mn">09:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Welcome</b>Coffee & networking dirigido</span></li>
          <li><span class="mn">09:30</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 01</b>O DNA da Marca — com Angelo Mazzutti</span></li>
          <li><span class="mn">11:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 02</b>O Mapa do Conteúdo Infinito</span></li>
          <li><span class="mn">14:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 03</b>Storytelling que Vende</span></li>
          <li><span class="mn">16:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 04</b>Ideação com Inteligência Artificial</span></li>
          <li><span class="mn">17:30</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Encerramento</b>Happy hour & conexões</span></li>
        </ul>
      </div>
      <div class="io-col out" data-reveal data-reveal-d="1">
        <div class="io-tag">
          <span class="io-day" style="color:#6b6862">Dia 02</span>
          <span class="mono" style="color:#6b6862">Maestria da Execução</span>
        </div>
        <div class="io-word">Out</div>
        <p class="io-desc">Produção executiva, ferramentas, shooting ao vivo e entrega final — onde a ideia encontra a realidade.</p>
        <ul class="modulos" style="--line-d2:rgba(10,10,10,.08)">
          <li style="border-top-color:var(--line-2)"><span class="mn" style="color:var(--accent)">09:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 05</b>Destravando a Câmera</span></li>
          <li style="border-top-color:var(--line-2)"><span class="mn" style="color:var(--accent)">10:30</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 06</b>O Arsenal da Produção Rápida</span></li>
          <li style="border-top-color:var(--line-2)"><span class="mn" style="color:var(--accent)">14:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 07</b>A Mágica da Pós-Produção com IA</span></li>
          <li style="border-top-color:var(--line-2)"><span class="mn" style="color:var(--accent)">16:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Módulo 08</b>Hot Seat com Angelo Mazzutti</span></li>
          <li style="border-top-color:var(--line-2)"><span class="mn" style="color:var(--accent)">17:00</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Shooting</b>Campanha final ao vivo</span></li>
          <li style="border-top-color:var(--line-2)"><span class="mn" style="color:var(--accent)">17:30</span><span class="mt"><b style="font-variation-settings:'wght' 700;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em;display:block;color:var(--accent);margin-bottom:2px">Cerimônia</b>Encerramento & premiação</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ============ GALERIA ============ -->
<section class="section ink gallery-main" id="galeria">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow" style="color:var(--smoke)">03 — Galeria</span>
      <span class="sec-index">Inside Out · Edit 01 · Uberlândia</span>
    </div>
    <h2 class="h-2 display" data-reveal style="margin-bottom:clamp(30px,4vw,56px)">Por trás<br>das câmeras</h2>
  </div>
</section>
<!-- photo strip — full bleed fora do wrap -->
<div class="photo-strip">
  <div class="ps-track">
    <!-- set 1 -->
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-equipe.jpg" alt="Equipe e alunos · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-amanda.jpg" alt="Amanda · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-model.jpg" alt="Model · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-quadro.jpg" alt="Quadro · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-modelo-scouting.jpg" alt="Scouting · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-scarpin.jpg" alt="Detalhe · Inside Out Edit 01" loading="lazy"></div>
    <!-- set 2 — duplicado para loop contínuo -->
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-equipe.jpg" alt="Equipe e alunos · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-amanda.jpg" alt="Amanda · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-model.jpg" alt="Model · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-quadro.jpg" alt="Quadro · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-modelo-scouting.jpg" alt="Scouting · Inside Out Edit 01" loading="lazy"></div>
    <div class="ps-item"><img src="/images/academy/edit-01/edit01-scarpin.jpg" alt="Detalhe · Inside Out Edit 01" loading="lazy"></div>
  </div>
</div>

<!-- ============ AFTERMOVIE ============ -->
<section class="video-section ink" id="video">
  <div class="video-wrap">
    <div class="sec-head" data-reveal style="margin-bottom:clamp(24px,3vw,40px)">
      <span class="eyebrow" style="color:var(--smoke)">04 — Aftermovie</span>
      <span class="sec-index">Inside Out · Edit 01</span>
    </div>
    <h2 class="h-2 display" data-reveal style="margin-bottom:clamp(24px,3vw,40px)">O filme<br>do evento</h2>
    <!-- Para ativar: adicione data-ytid="SEU_ID_YOUTUBE" ao div abaixo -->
    <div class="video-frame" id="videoFrame" data-ytid="">
      <image-slot id="video-thumb" placeholder="Thumbnail · Aftermovie Inside Out Edit 01" fit="cover" style="position:absolute;inset:0;width:100%;height:100%"></image-slot>
      <div class="video-placeholder" id="videoPlaceholder">
        <div class="play-btn">▶</div>
        <p>Assistir aftermovie</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ DEPOIMENTOS ============ -->
<section class="section paper" id="depoimentos">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <span class="eyebrow">05 — Quem esteve lá</span>
      <span class="sec-index">Vozes da Edit 01</span>
    </div>
    <div class="tlist">
      <div class="tcard" data-reveal>
        <p class="tquote">Depoimento 01 — substitua pelo texto real do participante. Duas ou três frases sobre a experiência.</p>
        <div class="tmeta">
          <div class="av"><image-slot id="t1" shape="circle" placeholder=" "></image-slot></div>
          <div>
            <div class="nm">Nome Participante</div>
            <div class="rl">Profissão · Cidade</div>
          </div>
        </div>
      </div>
      <div class="tcard" data-reveal data-reveal-d="1">
        <p class="tquote">Depoimento 02 — substitua pelo texto real do participante. Duas ou três frases sobre a experiência.</p>
        <div class="tmeta">
          <div class="av"><image-slot id="t2" shape="circle" placeholder=" "></image-slot></div>
          <div>
            <div class="nm">Nome Participante</div>
            <div class="rl">Profissão · Cidade</div>
          </div>
        </div>
      </div>
      <div class="tcard" data-reveal data-reveal-d="2">
        <p class="tquote">Depoimento 03 — substitua pelo texto real do participante. Duas ou três frases sobre a experiência.</p>
        <div class="tmeta">
          <div class="av"><image-slot id="t3" shape="circle" placeholder=" "></image-slot></div>
          <div>
            <div class="nm">Nome Participante</div>
            <div class="rl">Profissão · Cidade</div>
          </div>
        </div>
      </div>
      <div class="tcard" data-reveal>
        <p class="tquote">Depoimento 04 — substitua pelo texto real do participante. Duas ou três frases sobre a experiência.</p>
        <div class="tmeta">
          <div class="av"><image-slot id="t4" shape="circle" placeholder=" "></image-slot></div>
          <div>
            <div class="nm">Nome Participante</div>
            <div class="rl">Profissão · Cidade</div>
          </div>
        </div>
      </div>
      <div class="tcard" data-reveal data-reveal-d="1">
        <p class="tquote">Depoimento 05 — substitua pelo texto real do participante. Duas ou três frases sobre a experiência.</p>
        <div class="tmeta">
          <div class="av"><image-slot id="t5" shape="circle" placeholder=" "></image-slot></div>
          <div>
            <div class="nm">Nome Participante</div>
            <div class="rl">Profissão · Cidade</div>
          </div>
        </div>
      </div>
      <div class="tcard" data-reveal data-reveal-d="2">
        <p class="tquote">Depoimento 06 — substitua pelo texto real do participante. Duas ou três frases sobre a experiência.</p>
        <div class="tmeta">
          <div class="av"><image-slot id="t6" shape="circle" placeholder=" "></image-slot></div>
          <div>
            <div class="nm">Nome Participante</div>
            <div class="rl">Profissão · Cidade</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ CTA → EDIT 02 ============ -->
<section class="section ink" id="edit02">
  <div class="wrap cta-next">
    <span class="eyebrow" style="color:var(--smoke)" data-reveal>A próxima edição chegou</span>
    <h2 class="big" data-reveal>Edit 02<br><span class="o">São Paulo.</span></h2>
    <p class="lead" data-reveal style="max-width:32ch;color:var(--smoke-lt);text-align:center">A imersão continua — desta vez na capital. Vagas limitadas a 30 participantes.</p>
    <a class="btn solid lg" data-reveal href="/academy/workshop-producao-direcao-01"><span class="lbl">Ver Edit 02 · SP</span><span class="ar">↗</span></a>
  </div>
  <div class="marquee">
    <div class="track">
      <span>Edit 01</span><span class="s">Uberlândia</span><span>·</span><span>Edit 02</span><span class="s">São Paulo</span><span>·</span><span>Inside Out</span><span class="s">Direção Criativa</span><span>·</span><span>Edit 01</span><span class="s">Uberlândia</span><span>·</span><span>Edit 02</span><span class="s">São Paulo</span><span>·</span><span>Inside Out</span><span class="s">Direção Criativa</span><span>·</span>
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
        <a href="#aconteceu">O Evento</a>
        <a href="#metodo">Método Inside/Out</a>
        <a href="#galeria">Galeria</a>
        <a href="#depoimentos">Depoimentos</a>
        <a href="/academy/workshop-producao-direcao-01">Edit 02 · São Paulo ↗</a>
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
      <span>© 2025 House Mazzutti Agência Produtora · CNPJ 24.435.135/0001-48</span>
      <span>Inside Out · Edit 01 — Uberlândia · MG</span>
    </div>
  </div>
</footer>

<script src="/lp/workshop-io/image-slot.js"></script>
<script src="/lp/workshop-io-edit-01/app.js"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
