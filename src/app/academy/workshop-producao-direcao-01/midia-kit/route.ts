export const dynamic = 'force-static'

export function GET() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Media Kit · Inside Out Edit 2 · House Mazzutti</title>
<meta name="description" content="Oportunidades editoriais para marcas de moda e beauty dentro do Inside Out Edit 2 — workshop de produção em São Paulo com 15 creators selecionados.">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://housemazzutti.com/academy/workshop-producao-direcao-01/midia-kit/">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --white:#ffffff;
  --bg:#f7f6f4;
  --ink:#0e0d0c;
  --muted:#888580;
  --line:#e4e2de;
  --line-dark:#d0cdc8;
  --accent:#a09880;
  --green:#7ab800;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --mono:'Courier New',Courier,monospace;
}
html{scroll-behavior:smooth;font-size:16px}
body{background:var(--white);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;min-height:100dvh}

/* ── LAYOUT ── */
.wrap{max-width:1080px;margin:0 auto;padding:0 clamp(24px,5vw,64px)}
section{padding:clamp(72px,10vw,128px) 0}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);padding:0 clamp(24px,5vw,64px)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:60px}
.nav-brand{font-size:10px;font-weight:700;letter-spacing:.2em;color:var(--ink);text-transform:uppercase;text-decoration:none}
.nav-label{font-family:var(--mono);font-size:8.5px;letter-spacing:.15em;color:var(--muted);text-transform:uppercase}
.nav-cta{font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--white);background:var(--ink);padding:10px 22px;text-decoration:none;transition:opacity .2s}
.nav-cta:hover{opacity:.75}

/* ── HERO ── */
.hero{padding-top:128px;padding-bottom:clamp(72px,10vw,128px);border-bottom:1px solid var(--line)}
.eyebrow{font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase;display:block;margin-bottom:24px}
.hero h1{font-size:clamp(3.2rem,9vw,7.5rem);font-weight:800;letter-spacing:-.04em;line-height:.92;color:var(--ink);margin-bottom:40px}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero-cols{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,6vw,80px);align-items:end}
@media(max-width:640px){.hero-cols{grid-template-columns:1fr;gap:32px}}
.hero-sub{font-size:clamp(.95rem,1.6vw,1.1rem);color:var(--muted);line-height:1.8;max-width:42ch}
.hero-meta{display:flex;flex-direction:column;gap:0}
.meta-row{display:flex;align-items:baseline;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--line)}
.meta-row:first-child{border-top:1px solid var(--line)}
.meta-label{font-family:var(--mono);font-size:8.5px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase}
.meta-value{font-size:13px;font-weight:600;color:var(--ink)}

/* ── STATEMENT ── */
.statement{background:var(--bg);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.statement-inner{padding:clamp(56px,8vw,96px) 0;max-width:820px}
.statement-inner p{font-size:clamp(1.3rem,3vw,2rem);line-height:1.5;color:var(--ink);font-weight:300;letter-spacing:-.01em}
.statement-inner p strong{font-weight:700}

/* ── NÚMEROS ── */
.numbers-section{border-bottom:1px solid var(--line)}
.numbers-grid{display:grid;grid-template-columns:repeat(5,1fr);border-left:1px solid var(--line)}
@media(max-width:768px){.numbers-grid{grid-template-columns:repeat(2,1fr) repeat(1,1fr);}}
@media(max-width:480px){.numbers-grid{grid-template-columns:1fr 1fr}}
.num-card{padding:clamp(28px,4vw,48px) clamp(16px,2.5vw,32px);border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.num-value{font-size:clamp(2.2rem,5vw,3.8rem);font-weight:800;letter-spacing:-.05em;color:var(--ink);display:block;line-height:1;margin-bottom:10px}
.num-value.accent{color:var(--accent)}
.num-label{font-family:var(--mono);font-size:8px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;line-height:1.6}

/* ── SECTION HEADING ── */
.section-head{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,6vw,80px);align-items:start;margin-bottom:clamp(40px,6vw,64px)}
@media(max-width:640px){.section-head{grid-template-columns:1fr;gap:20px}}
.section-label{font-family:var(--mono);font-size:8.5px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase;margin-bottom:20px;display:block}
.h2{font-size:clamp(1.8rem,4vw,3rem);font-weight:800;letter-spacing:-.04em;line-height:1.05;color:var(--ink)}
.section-intro{font-size:clamp(.9rem,1.5vw,1rem);color:var(--muted);line-height:1.8;padding-top:8px}

/* ── SETS GRID ── */
.sets-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line)}
@media(max-width:640px){.sets-grid{grid-template-columns:1fr}}
.set-card{background:var(--white);padding:clamp(32px,4vw,52px)}
.set-card-label{font-family:var(--mono);font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:16px}
.set-card h3{font-size:clamp(1.1rem,2vw,1.35rem);font-weight:700;color:var(--ink);letter-spacing:-.02em;margin-bottom:12px}
.set-card p{font-size:.875rem;color:var(--muted);line-height:1.8}

/* ── AUDIÊNCIA ── */
.audience-section{background:var(--bg);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.audience-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);margin-top:clamp(40px,6vw,64px)}
@media(max-width:768px){.audience-grid{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.audience-grid{grid-template-columns:1fr}}
.audience-card{background:var(--bg);padding:clamp(24px,3vw,40px)}
.audience-pct{font-size:clamp(2rem,4.5vw,3.2rem);font-weight:800;letter-spacing:-.05em;color:var(--ink);display:block;line-height:1;margin-bottom:12px}
.audience-card h3{font-size:.875rem;font-weight:700;color:var(--ink);margin-bottom:6px}
.audience-card p{font-size:.78rem;color:var(--muted);line-height:1.75}

/* ── O QUE A MARCA RECEBE ── */
.benefits-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--line);margin-top:clamp(40px,6vw,64px)}
@media(max-width:768px){.benefits-grid{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.benefits-grid{grid-template-columns:1fr}}
.benefit-item{background:var(--white);padding:clamp(28px,3vw,44px)}
.benefit-num{font-family:var(--mono);font-size:9px;letter-spacing:.1em;color:var(--line-dark);display:block;margin-bottom:16px}
.benefit-item h4{font-size:.9rem;font-weight:700;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
.benefit-item p{font-size:.8rem;color:var(--muted);line-height:1.75}

/* ── PACOTES ── */
.packages-section{background:var(--bg);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.packages-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);margin-top:clamp(40px,6vw,64px)}
@media(max-width:640px){.packages-grid{grid-template-columns:1fr}}
.pkg{background:var(--bg);padding:clamp(32px,4vw,56px) clamp(24px,3vw,40px);display:flex;flex-direction:column}
.pkg.featured{background:var(--ink)}
.pkg-tag{font-family:var(--mono);font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:20px}
.pkg.featured .pkg-tag{color:var(--accent)}
.pkg h3{font-size:clamp(1.2rem,2.5vw,1.6rem);font-weight:800;letter-spacing:-.03em;color:var(--ink);margin-bottom:8px}
.pkg.featured h3{color:var(--white)}
.pkg-price{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;letter-spacing:-.04em;color:var(--ink);margin-bottom:32px;line-height:1}
.pkg.featured .pkg-price{color:var(--white)}
.pkg-price small{font-size:.85rem;font-weight:400;color:var(--muted);margin-left:4px}
.pkg.featured .pkg-price small{color:#a09880}
.pkg-divider{border:none;border-top:1px solid var(--line-dark);margin-bottom:24px}
.pkg.featured .pkg-divider{border-color:#2a2825}
.pkg-features{list-style:none;display:flex;flex-direction:column;gap:12px;flex:1;margin-bottom:32px}
.pkg-features li{font-size:.83rem;color:var(--muted);line-height:1.6;padding-left:16px;position:relative}
.pkg-features li::before{content:'—';position:absolute;left:0;color:var(--line-dark)}
.pkg.featured .pkg-features li{color:#9ca3af}
.pkg.featured .pkg-features li::before{color:#4a4845}
.pkg-cta{display:block;font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--white);background:var(--ink);padding:16px 24px;text-decoration:none;text-align:center;transition:opacity .2s;margin-top:auto}
.pkg-cta:hover{opacity:.75}
.pkg.featured .pkg-cta{background:var(--white);color:var(--ink)}
.pkg-note{font-family:var(--mono);font-size:7.5px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;display:block;margin-top:14px;text-align:center}
.pkg.featured .pkg-note{color:#4a4845}

/* ── CONTATO ── */
.contact-inner{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,80px);align-items:center;padding:clamp(64px,10vw,120px) 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
@media(max-width:640px){.contact-inner{grid-template-columns:1fr;gap:40px}}
.contact-inner h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-.04em;line-height:1.05;color:var(--ink)}
.contact-inner p{font-size:.9rem;color:var(--muted);line-height:1.8;margin-top:16px;max-width:38ch}
.contact-links{display:flex;flex-direction:column;gap:0}
.contact-link{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;transition:color .2s}
.contact-link:first-child{border-top:1px solid var(--line)}
.contact-link:hover{color:var(--muted)}
.contact-link-arrow{color:var(--muted)}
.contact-cta{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--white);background:var(--ink);padding:16px 32px;text-decoration:none;transition:opacity .2s;margin-top:24px}
.contact-cta:hover{opacity:.75}

/* ── FOOTER ── */
footer{padding:28px 0;border-top:1px solid var(--line)}
.footer-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.footer-brand{font-size:9.5px;font-weight:700;letter-spacing:.2em;color:var(--ink);text-transform:uppercase}
.footer-info{font-family:var(--mono);font-size:8px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;line-height:1.8;text-align:right}
@media(max-width:640px){.footer-info{text-align:left}}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-inner">
    <a class="nav-brand" href="https://housemazzutti.com">House Mazzutti</a>
    <span class="nav-label">Media Kit · Inside Out Edit 2</span>
    <a class="nav-cta" href="#contato">Falar com a gente</a>
  </div>
</nav>

<!-- HERO -->
<div class="wrap">
  <section class="hero">
    <span class="eyebrow">Media Kit · Inside Out Edit 2 · São Paulo · Set 2026</span>
    <h1>Inside<br/><em>Out</em><br/>Edit 2</h1>
    <div class="hero-cols">
      <p class="hero-sub">Um evento de produção em São Paulo onde marcas de moda e beauty entram como parte do editorial — não como patrocinador de banner. Seu produto aparece dentro da imagem, com direção, com 15 creators selecionados.</p>
      <div class="hero-meta">
        <div class="meta-row">
          <span class="meta-label">Data</span>
          <span class="meta-value">05 e 06 Set 2026</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Local</span>
          <span class="meta-value">Studio Plano · São Paulo</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Creators</span>
          <span class="meta-value">15 selecionados por curadoria</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Sets</span>
          <span class="meta-value">Moda + Beauty</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Direção</span>
          <span class="meta-value">Angelo Mazzutti</span>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- STATEMENT -->
<div class="statement">
  <div class="wrap">
    <div class="statement-inner">
      <p>O Inside Out é uma produção editorial real. Dois sets ao vivo — moda e beauty — com equipe técnica completa, direção criativa e 15 creators produzindo conteúdo de campanha. <strong>Marcas entram como parte da produção.</strong> O produto não está ao lado do conteúdo: ele está dentro.</p>
    </div>
  </div>
</div>

<!-- NÚMEROS -->
<div class="numbers-section">
  <div class="numbers-grid">
    <div class="num-card">
      <span class="num-value">15</span>
      <span class="num-label">Creators<br/>selecionados</span>
    </div>
    <div class="num-card">
      <span class="num-value">2</span>
      <span class="num-label">Sets de produção<br/>Moda + Beauty</span>
    </div>
    <div class="num-card">
      <span class="num-value">2</span>
      <span class="num-label">Dias de produção<br/>ao vivo</span>
    </div>
    <div class="num-card">
      <span class="num-value accent">30+</span>
      <span class="num-label">Conteúdos de<br/>campanha gerados</span>
    </div>
    <div class="num-card">
      <span class="num-value accent">100%</span>
      <span class="num-label">Conteúdo orgânico<br/>e autoral</span>
    </div>
  </div>
</div>

<!-- O QUE É PRODUZIDO -->
<div class="wrap">
  <section>
    <div class="section-head">
      <div>
        <span class="section-label">Editorial</span>
        <h2 class="h2">O que é produzido dentro do evento</h2>
      </div>
      <p class="section-intro">Dois sets ao vivo com equipe técnica completa — direção, fotografia, vídeo, make e styling. A marca é integrada ao cenário, ao look ou ao produto em uso pelos creators. O resultado é conteúdo editorial assinado.</p>
    </div>
    <div class="sets-grid">
      <div class="set-card">
        <span class="set-card-label">Set 01 · Moda</span>
        <h3>Editorial de Moda</h3>
        <p>Lookbook e campanha de moda com direção completa. Styling profissional, modelos e equipe técnica. Os creators produzem fotos e vídeos de campanha dentro do set — a marca aparece integrada ao cenário e ao look.</p>
      </div>
      <div class="set-card">
        <span class="set-card-label">Set 02 · Beauty</span>
        <h3>Editorial de Beauty</h3>
        <p>Set de beauty com make artístico, iluminação editorial e direção criativa. Conteúdo para marcas de cosméticos, skincare e lifestyle. Os creators produzem reels, fotos e tutoriais com o produto em uso real.</p>
      </div>
      <div class="set-card">
        <span class="set-card-label">Entrega por creator</span>
        <h3>O que cada creator produz</h3>
        <p>No mínimo 1 foto editorial, 1 vídeo de campanha e conteúdo de bastidor. Todo o material é autoral — não é UGC genérico, é editorial com direção profissional que a marca pode usar nos próprios canais.</p>
      </div>
      <div class="set-card">
        <span class="set-card-label">Direção</span>
        <h3>Curadoria e direção House</h3>
        <p>Angelo Mazzutti dirige os dois sets ao vivo. A produção é da House Mazzutti — a mesma equipe por trás de campanhas para marcas nacionais e internacionais de moda, beauty e lifestyle.</p>
      </div>
    </div>
  </section>
</div>

<!-- AUDIÊNCIA -->
<div class="audience-section">
  <div class="wrap">
    <section>
      <div class="section-head">
        <div>
          <span class="section-label">Perfil dos creators</span>
          <h2 class="h2">Quem produz o conteúdo</h2>
        </div>
        <p class="section-intro">Selecionados por curadoria — não é inscrição aberta. Todos têm produção ativa, audiência engajada e atuação em moda, beauty ou lifestyle. São creators que vendem e influenciam decisão de compra.</p>
      </div>
      <div class="audience-grid">
        <div class="audience-card">
          <span class="audience-pct">40%</span>
          <h3>Moda</h3>
          <p>Styling, tendências e editorial. Audiência com alto engajamento em vestuário e acessórios.</p>
        </div>
        <div class="audience-card">
          <span class="audience-pct">30%</span>
          <h3>Beauty</h3>
          <p>Skincare, make e rotina. Comunidade fidelizada com forte influência de compra em cosméticos.</p>
        </div>
        <div class="audience-card">
          <span class="audience-pct">20%</span>
          <h3>Criativos</h3>
          <p>Diretores e produtores de conteúdo. Decisores e multiplicadores de referência no mercado.</p>
        </div>
        <div class="audience-card">
          <span class="audience-pct">10%</span>
          <h3>Lifestyle</h3>
          <p>Profissionais do mercado que produzem campanha e consomem referências editoriais.</p>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- O QUE A MARCA RECEBE -->
<div class="wrap">
  <section>
    <div class="section-head">
      <div>
        <span class="section-label">Benefícios</span>
        <h2 class="h2">O que a marca recebe</h2>
      </div>
      <p class="section-intro">Presença editorial real — não patrocínio de logo. A marca sai do evento com conteúdo de campanha, banco de imagens e alcance orgânico através dos 15 creators.</p>
    </div>
    <div class="benefits-grid">
      <div class="benefit-item">
        <span class="benefit-num">01</span>
        <h4>Produto integrado ao set</h4>
        <p>O produto entra no cenário, no styling ou em uso pelos creators — parte natural do editorial, não merchandising.</p>
      </div>
      <div class="benefit-item">
        <span class="benefit-num">02</span>
        <h4>Conteúdo para uso irrestrito</h4>
        <p>Todo o conteúdo produzido pelos creators no set da marca pode ser usado pela própria marca em seus canais.</p>
      </div>
      <div class="benefit-item">
        <span class="benefit-num">03</span>
        <h4>Publicação orgânica pelos creators</h4>
        <p>Cada creator publica nas suas redes com menção à marca — alcance real, sem formato de anúncio pago.</p>
      </div>
      <div class="benefit-item">
        <span class="benefit-num">04</span>
        <h4>Banco de imagens editorial</h4>
        <p>Fotos e vídeos do set em alta resolução — produção com equipe técnica completa e direção profissional.</p>
      </div>
      <div class="benefit-item">
        <span class="benefit-num">05</span>
        <h4>Presença nas comunicações</h4>
        <p>A marca aparece nos materiais do evento — e-mail para participantes e publicações da House Mazzutti sobre o Inside Out.</p>
      </div>
      <div class="benefit-item">
        <span class="benefit-num">06</span>
        <h4>Acesso ao evento</h4>
        <p>Um representante acompanha a produção nos dois dias — presença no set e conexão direta com os creators.</p>
      </div>
    </div>
  </section>
</div>

<!-- PACOTES -->
<div class="packages-section">
  <div class="wrap">
    <section>
      <div class="section-head">
        <div>
          <span class="section-label">Investimento</span>
          <h2 class="h2">Formatos de presença editorial</h2>
        </div>
        <p class="section-intro">Dois formatos de entrada. Cada pacote é exclusivo por categoria — não trabalhamos marcas concorrentes no mesmo evento. As vagas são limitadas.</p>
      </div>
      <div class="packages-grid">
        <div class="pkg">
          <span class="pkg-tag">Editorial de Fotos</span>
          <h3>Foto</h3>
          <div class="pkg-price">R$ 4.000 <small>/ marca</small></div>
          <hr class="pkg-divider"/>
          <ul class="pkg-features">
            <li>Produto integrado no set de moda ou beauty</li>
            <li>Fotos editoriais de campanha com todos os 15 creators</li>
            <li>Banco de imagens em alta resolução para uso irrestrito</li>
            <li>Publicação orgânica pelos creators com menção à marca</li>
            <li>Menção nas comunicações do evento</li>
            <li>1 acesso ao set nos dois dias</li>
          </ul>
          <a href="mailto:contato@mztgrupo.com?subject=Media Kit · Editorial Foto · Inside Out Edit 2" class="pkg-cta">Solicitar proposta</a>
          <span class="pkg-note">Exclusivo por categoria de produto</span>
        </div>
        <div class="pkg featured">
          <span class="pkg-tag">✦ Editorial de Fotos e Vídeos</span>
          <h3>Foto + Vídeo</h3>
          <div class="pkg-price">R$ 7.000 <small>/ marca</small></div>
          <hr class="pkg-divider"/>
          <ul class="pkg-features">
            <li>Produto integrado no set de moda ou beauty</li>
            <li>Fotos editoriais de campanha com todos os 15 creators</li>
            <li>Vídeos de campanha — reels e conteúdo de bastidor</li>
            <li>Banco completo de fotos e vídeos em alta para uso irrestrito</li>
            <li>Publicação orgânica pelos creators com menção e tag</li>
            <li>Presença destacada nas comunicações do evento</li>
            <li>2 acessos ao set nos dois dias</li>
          </ul>
          <a href="mailto:contato@mztgrupo.com?subject=Media Kit · Editorial Foto + Vídeo · Inside Out Edit 2" class="pkg-cta">Solicitar proposta</a>
          <span class="pkg-note">Apenas 1 marca neste formato</span>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- CONTATO -->
<div class="wrap" id="contato">
  <div class="contact-inner">
    <div>
      <span class="section-label">Fale com a House</span>
      <h2>Sua marca dentro<br/>do editorial.</h2>
      <p>Respondemos em até 24h. As vagas são exclusivas por categoria — quando um formato fecha, fecha. Melhor conversar antes.</p>
      <a class="contact-cta" href="mailto:contato@mztgrupo.com?subject=Media Kit · Inside Out Edit 2 — Interesse de marca">Enviar interesse ↗</a>
    </div>
    <div class="contact-links">
      <a class="contact-link" href="mailto:contato@mztgrupo.com">
        <span>contato@mztgrupo.com</span>
        <span class="contact-link-arrow">↗</span>
      </a>
      <a class="contact-link" href="https://wa.me/5548999999999" target="_blank">
        <span>WhatsApp direto</span>
        <span class="contact-link-arrow">↗</span>
      </a>
      <a class="contact-link" href="https://housemazzutti.com/academy/workshop-producao-direcao-01/" target="_blank">
        <span>Página do evento</span>
        <span class="contact-link-arrow">↗</span>
      </a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="wrap">
  <footer>
    <div class="footer-inner">
      <span class="footer-brand">House Mazzutti</span>
      <div class="footer-info">
        Inside Out · Edit 2 · São Paulo · Set 2026<br/>
        contato@mztgrupo.com · CNPJ 64.448.222/0001-54
      </div>
    </div>
  </footer>
</div>

</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
