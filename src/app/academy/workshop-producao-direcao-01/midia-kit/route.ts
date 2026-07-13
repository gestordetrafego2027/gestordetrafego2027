export const dynamic = 'force-static'

export function GET() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Media Kit · Inside Out Edit 2 · House Mazzutti</title>
<meta name="description" content="Oportunidades editoriais para marcas dentro do Inside Out Edit 2 — evento de creator em São Paulo. Set de moda e beauty com 15 creators selecionados.">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://housemazzutti.com/academy/workshop-producao-direcao-01/midia-kit/">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0e0d0c;
  --paper:#f0ede8;
  --muted:#54524d;
  --line:#2a2825;
  --accent:#a09880;
  --green:#a4e80a;
  --mono:'Courier New',monospace;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}
html{scroll-behavior:smooth;font-size:16px}
body{background:var(--ink);color:var(--paper);font-family:var(--sans);-webkit-font-smoothing:antialiased;min-height:100dvh}

/* ── LAYOUT ── */
.wrap{max-width:1100px;margin:0 auto;padding:0 clamp(20px,5vw,60px)}
.section{padding:clamp(64px,10vw,120px) 0;border-top:1px solid var(--line)}
.section:first-of-type{border-top:none}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px clamp(20px,5vw,60px);display:flex;align-items:center;justify-content:space-between;background:rgba(14,13,12,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav-brand{font-size:11px;font-weight:700;letter-spacing:.16em;color:var(--accent);text-transform:uppercase;text-decoration:none}
.nav-tag{font-size:9px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;font-family:var(--mono)}
.nav-cta{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);background:var(--paper);padding:10px 20px;text-decoration:none;transition:opacity .2s}
.nav-cta:hover{opacity:.85}

/* ── HERO ── */
.hero{padding-top:140px;padding-bottom:clamp(64px,10vw,120px)}
.eyebrow{font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--accent);text-transform:uppercase;display:block;margin-bottom:20px}
.hero h1{font-size:clamp(3rem,8vw,7rem);font-weight:800;letter-spacing:-.03em;line-height:.95;margin-bottom:32px}
.hero h1 span{color:var(--accent)}
.hero-sub{font-size:clamp(1rem,1.8vw,1.2rem);color:var(--muted);line-height:1.75;max-width:52ch;margin-bottom:48px}
.hero-meta{display:flex;flex-wrap:wrap;gap:32px}
.meta-item{border-left:1px solid var(--line);padding-left:16px}
.meta-label{font-family:var(--mono);font-size:9px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;display:block;margin-bottom:4px}
.meta-value{font-size:14px;font-weight:600;color:var(--paper)}

/* ── NÚMEROS ── */
.numbers{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1px;background:var(--line)}
.num-card{background:var(--ink);padding:clamp(28px,4vw,48px) clamp(20px,3vw,36px)}
.num-card-value{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800;letter-spacing:-.04em;color:var(--paper);line-height:1;display:block;margin-bottom:8px}
.num-card-label{font-family:var(--mono);font-size:9px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;line-height:1.5}
.num-card-value.green{color:var(--green)}

/* ── O QUE É PRODUZIDO ── */
.produced-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line)}
@media(max-width:640px){.produced-grid{grid-template-columns:1fr}}
.produced-card{background:var(--ink);padding:clamp(28px,4vw,48px)}
.produced-card h3{font-size:clamp(1.1rem,2vw,1.4rem);font-weight:700;letter-spacing:-.02em;margin-bottom:12px;color:var(--paper)}
.produced-card p{font-size:.9rem;color:var(--muted);line-height:1.75}
.produced-tag{display:inline-block;font-family:var(--mono);font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);border:1px solid var(--accent);padding:3px 8px;margin-bottom:16px}

/* ── AUDIÊNCIA ── */
.audience-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:clamp(16px,3vw,32px);margin-top:40px}
.audience-card{border:1px solid var(--line);padding:28px}
.audience-card h3{font-size:1rem;font-weight:700;color:var(--paper);margin-bottom:8px}
.audience-card p{font-size:.82rem;color:var(--muted);line-height:1.7}
.audience-pct{font-size:2rem;font-weight:800;color:var(--green);letter-spacing:-.03em;display:block;margin-bottom:6px}

/* ── PACOTES ── */
.packages{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1px;background:var(--line)}
.pkg{background:var(--ink);padding:clamp(32px,4vw,56px) clamp(24px,3vw,40px);display:flex;flex-direction:column;gap:24px}
.pkg.featured{background:#161411}
.pkg-tag{font-family:var(--mono);font-size:8px;letter-spacing:.16em;color:var(--accent);text-transform:uppercase}
.pkg-tag.featured-tag{color:var(--green)}
.pkg h3{font-size:clamp(1.3rem,2.5vw,1.8rem);font-weight:800;letter-spacing:-.02em;color:var(--paper)}
.pkg-price{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-.04em;color:var(--paper);line-height:1}
.pkg-price span{font-size:1rem;font-weight:400;color:var(--muted);margin-left:4px}
.pkg-features{list-style:none;display:flex;flex-direction:column;gap:10px;margin-top:4px;flex:1}
.pkg-features li{font-size:.85rem;color:var(--muted);padding-left:16px;position:relative;line-height:1.6}
.pkg-features li::before{content:'→';position:absolute;left:0;color:var(--accent)}
.pkg-cta{display:inline-block;font-family:var(--mono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);background:var(--paper);padding:14px 24px;text-decoration:none;text-align:center;transition:opacity .2s;margin-top:auto}
.pkg-cta:hover{opacity:.85}
.pkg-cta.green-cta{background:var(--green);color:var(--ink)}
.pkg-note{font-family:var(--mono);font-size:8px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase}

/* ── O QUE INCLUI (geral) ── */
.include-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);margin-top:40px}
@media(max-width:640px){.include-grid{grid-template-columns:1fr}}
.include-item{background:var(--ink);padding:24px 28px;display:flex;align-items:flex-start;gap:16px}
.include-icon{font-family:var(--mono);font-size:11px;color:var(--accent);flex-shrink:0;margin-top:2px}
.include-text h4{font-size:.9rem;font-weight:600;color:var(--paper);margin-bottom:4px}
.include-text p{font-size:.78rem;color:var(--muted);line-height:1.65}

/* ── TIMELINE ── */
.timeline{display:flex;flex-direction:column;gap:0;margin-top:40px}
.tl-item{display:grid;grid-template-columns:80px 1fr;gap:24px;padding:24px 0;border-top:1px solid var(--line)}
.tl-item:last-child{border-bottom:1px solid var(--line)}
.tl-day{font-family:var(--mono);font-size:9px;letter-spacing:.14em;color:var(--accent);text-transform:uppercase;padding-top:2px}
.tl-content h4{font-size:.95rem;font-weight:600;color:var(--paper);margin-bottom:6px}
.tl-content p{font-size:.82rem;color:var(--muted);line-height:1.7}

/* ── CONTATO ── */
.contact-box{background:#161411;border:1px solid var(--line);padding:clamp(40px,6vw,80px);display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:32px}
.contact-box h2{font-size:clamp(1.8rem,4vw,3rem);font-weight:800;letter-spacing:-.03em;line-height:1.1;max-width:20ch}
.contact-links{display:flex;flex-direction:column;gap:12px;align-items:flex-end}
.contact-link{font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--paper);text-decoration:none;transition:color .2s}
.contact-link:hover{color:var(--accent)}
.contact-cta-btn{display:inline-block;background:var(--paper);color:var(--ink);font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:16px 32px;text-decoration:none;transition:opacity .2s;margin-top:8px}
.contact-cta-btn:hover{opacity:.85}

/* ── FOOTER ── */
.footer{padding:32px 0;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.footer-brand{font-size:10px;font-weight:700;letter-spacing:.16em;color:var(--accent);text-transform:uppercase}
.footer-info{font-family:var(--mono);font-size:9px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;line-height:1.8}

/* ── UTILS ── */
.h2{font-size:clamp(1.8rem,4vw,3rem);font-weight:800;letter-spacing:-.03em;line-height:1.05;margin-bottom:16px}
.section-intro{font-size:clamp(.9rem,1.6vw,1.05rem);color:var(--muted);line-height:1.75;max-width:58ch;margin-bottom:8px}
.divider{border:none;border-top:1px solid var(--line);margin:0}
.badge{display:inline-block;font-family:var(--mono);font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--green);border:1px solid var(--green);padding:3px 10px;margin-bottom:24px}
@media(max-width:768px){.contact-links{align-items:flex-start}}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <a class="nav-brand" href="https://housemazzutti.com">House Mazzutti</a>
  <span class="nav-tag">Media Kit · Inside Out Edit 2</span>
  <a class="nav-cta" href="#contato">Falar com a gente</a>
</nav>

<!-- HERO -->
<div class="wrap">
  <section class="hero">
    <span class="eyebrow">Media Kit · Oportunidades Editoriais para Marcas</span>
    <h1>Inside<br/><span>Out</span><br/>Edit 2</h1>
    <p class="hero-sub">Um evento de creator em São Paulo onde marcas entram como parte da produção — não como patrocinador de banner. Seu produto vive dentro de um editorial de moda e beauty dirigido ao vivo, com 15 creators selecionados.</p>
    <div class="hero-meta">
      <div class="meta-item">
        <span class="meta-label">Data</span>
        <span class="meta-value">05 e 06 Set 2026</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Local</span>
        <span class="meta-value">Studio Plano · São Paulo</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Creators</span>
        <span class="meta-value">15 selecionados</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Sets</span>
        <span class="meta-value">Moda + Beauty</span>
      </div>
    </div>
  </section>
</div>

<!-- NÚMEROS -->
<div class="section" style="padding-top:0;border-top:none">
  <div class="numbers">
    <div class="num-card">
      <span class="num-card-value green">15</span>
      <span class="num-card-label">Creators<br/>selecionados</span>
    </div>
    <div class="num-card">
      <span class="num-card-value">2</span>
      <span class="num-card-label">Sets de produção<br/>moda e beauty</span>
    </div>
    <div class="num-card">
      <span class="num-card-value">2</span>
      <span class="num-card-label">Dias de<br/>produção ao vivo</span>
    </div>
    <div class="num-card">
      <span class="num-card-value green">30+</span>
      <span class="num-card-label">Conteúdos de<br/>campanha gerados</span>
    </div>
    <div class="num-card">
      <span class="num-card-value">100%</span>
      <span class="num-card-label">Conteúdo orgânico<br/>e autoral</span>
    </div>
  </div>
</div>

<!-- O QUE É PRODUZIDO -->
<div class="wrap">
  <section class="section">
    <span class="badge">Editorial</span>
    <h2 class="h2">O que é produzido<br/>dentro do evento</h2>
    <p class="section-intro">Dois sets ao vivo com equipe técnica completa — direção, fotografia, vídeo, make e styling. Cada creator produz conteúdo de campanha real. A marca está dentro da imagem, não ao lado dela.</p>

    <div class="produced-grid" style="margin-top:40px">
      <div class="produced-card">
        <span class="produced-tag">Set 01 · Moda</span>
        <h3>Editorial de Moda</h3>
        <p>Lookbook e campanha de moda com direção completa de Angelo Mazzutti. Styling profissional, modelos e equipe técnica. Os creators dirigem e produzem conteúdo neste cenário — fotos e vídeos que funcionam como campanha de marca.</p>
      </div>
      <div class="produced-card">
        <span class="produced-tag">Set 02 · Beauty</span>
        <h3>Editorial de Beauty</h3>
        <p>Set de beauty com make artístico, iluminação editorial e direção criativa. Conteúdo para marcas de cosméticos, skincare e lifestyle. Os creators produzem reels, fotos e tutoriais dentro de um ambiente de produção profissional.</p>
      </div>
      <div class="produced-card">
        <span class="produced-tag">Conteúdo</span>
        <h3>O que cada creator entrega</h3>
        <p>Cada participante produz ao mínimo: 1 foto editorial, 1 vídeo de campanha (reels/shorts) e conteúdo de bastidor. Todo o material é autoral — não é UGC genérico, é editorial assinado com direção profissional.</p>
      </div>
      <div class="produced-card">
        <span class="produced-tag">Direção</span>
        <h3>Curadoria e direção</h3>
        <p>Angelo Mazzutti dirige os dois sets ao vivo. A produção é da House Mazzutti — a mesma equipe por trás de campanhas para marcas nacionais e internacionais de moda, beauty e lifestyle.</p>
      </div>
    </div>
  </section>
</div>

<!-- AUDIÊNCIA -->
<div class="wrap">
  <section class="section">
    <span class="badge">Audiência</span>
    <h2 class="h2">Quem são os creators</h2>
    <p class="section-intro">Selecionados por curadoria — não é inscrição aberta. Todos têm produção ativa, audiência engajada e atuação em moda, beauty ou lifestyle.</p>
    <div class="audience-grid">
      <div class="audience-card">
        <span class="audience-pct">40%</span>
        <h3>Creators de Moda</h3>
        <p>Conteúdo de moda, styling e tendências. Audiência de 10k a 500k seguidores com alto engajamento.</p>
      </div>
      <div class="audience-card">
        <span class="audience-pct">30%</span>
        <h3>Creators de Beauty</h3>
        <p>Skincare, make e rotina de beleza. Comunidade fidelizada com forte influência de compra.</p>
      </div>
      <div class="audience-card">
        <span class="audience-pct">20%</span>
        <h3>Diretores Criativos</h3>
        <p>Profissionais de agências e estúdios criativos. Decisores de marca e compra de serviços.</p>
      </div>
      <div class="audience-card">
        <span class="audience-pct">10%</span>
        <h3>Publicitários e Produtores</h3>
        <p>Profissionais do mercado que produzem campanha — consumidores e multiplicadores de referência.</p>
      </div>
    </div>
  </section>
</div>

<!-- TIMELINE -->
<div class="wrap">
  <section class="section">
    <span class="badge">Cronograma</span>
    <h2 class="h2">Como funciona<br/>a produção</h2>
    <p class="section-intro">Dois dias de produção intensa. A marca acompanha, aparece e tem conteúdo ao final de cada dia.</p>
    <div class="timeline">
      <div class="tl-item">
        <span class="tl-day">Dia 01<br/>05 Set</span>
        <div class="tl-content">
          <h4>Set de Moda — Editorial completo</h4>
          <p>Montagem do set, briefing com os creators, produção dirigida ao vivo. A marca é integrada ao cenário e ao styling. Ao final do dia: banco de imagens e vídeos de campanha para a marca.</p>
        </div>
      </div>
      <div class="tl-item">
        <span class="tl-day">Dia 02<br/>06 Set</span>
        <div class="tl-content">
          <h4>Set de Beauty — Tutorial e campanha</h4>
          <p>Set de beauty com make artístico. Conteúdo em formato tutorial, reels e fotos editoriais. A marca de beauty aparece nos conteúdos de cada creator — natural, editorial e com direção.</p>
        </div>
      </div>
      <div class="tl-item">
        <span class="tl-day">Pós<br/>Set 2026</span>
        <div class="tl-content">
          <h4>Entrega e publicação</h4>
          <p>Cada creator publica o conteúdo produzido no evento nas suas redes. A marca recebe os arquivos originais em alta resolução para uso em seus próprios canais.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- O QUE INCLUI -->
<div class="wrap">
  <section class="section">
    <span class="badge">Benefícios</span>
    <h2 class="h2">O que a marca recebe</h2>
    <div class="include-grid">
      <div class="include-item">
        <span class="include-icon">→</span>
        <div class="include-text">
          <h4>Produto no set</h4>
          <p>Integração natural do produto no cenário, styling ou uso pelos creators durante a produção — não é merchandising, é parte do editorial.</p>
        </div>
      </div>
      <div class="include-item">
        <span class="include-icon">→</span>
        <div class="include-text">
          <h4>Conteúdo para uso irrestrito</h4>
          <p>Todos os conteúdos produzidos pelos creators no set da marca podem ser usados pela própria marca em seus canais — redes sociais, site, campanhas.</p>
        </div>
      </div>
      <div class="include-item">
        <span class="include-icon">→</span>
        <div class="include-text">
          <h4>Publicação pelos creators</h4>
          <p>Cada creator publica o conteúdo do evento nas suas redes com menção à marca — alcance orgânico real, sem formato de anúncio.</p>
        </div>
      </div>
      <div class="include-item">
        <span class="include-icon">→</span>
        <div class="include-text">
          <h4>Presença na comunicação</h4>
          <p>A marca aparece nas comunicações do evento — e-mail para participantes, stories e publicações da House Mazzutti sobre o Inside Out.</p>
        </div>
      </div>
      <div class="include-item">
        <span class="include-icon">→</span>
        <div class="include-text">
          <h4>Banco de imagens editorial</h4>
          <p>Fotos e vídeos do set em alta resolução para uso da marca — produção com equipe técnica completa, iluminação e direção profissional.</p>
        </div>
      </div>
      <div class="include-item">
        <span class="include-icon">→</span>
        <div class="include-text">
          <h4>Acesso ao evento</h4>
          <p>Um representante da marca pode acompanhar a produção nos dois dias — presença no set, conexão direta com os creators e com a equipe House.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- PACOTES -->
<div class="wrap">
  <section class="section">
    <span class="badge">Investimento</span>
    <h2 class="h2">Pacotes editoriais</h2>
    <p class="section-intro">Três formatos de presença. Cada pacote é exclusivo — não vendemos mais de uma marca por categoria no mesmo evento.</p>
  </section>
</div>

<div class="packages">
  <div class="pkg">
    <div>
      <span class="pkg-tag">Presença Editorial</span>
      <h3>Set Partner</h3>
    </div>
    <div class="pkg-price">R$ 3.500 <span>/ marca</span></div>
    <ul class="pkg-features">
      <li>Produto integrado em 1 set (moda ou beauty)</li>
      <li>Conteúdo de 15 creators com menção orgânica</li>
      <li>Banco de imagens e vídeos do set para uso da marca</li>
      <li>Menção nas comunicações do evento</li>
      <li>1 acesso ao set para acompanhar a produção</li>
    </ul>
    <a href="mailto:contato@mztgrupo.com?subject=Media Kit · Set Partner · Inside Out Edit 2" class="pkg-cta">Solicitar proposta</a>
    <span class="pkg-note">Exclusivo por categoria de produto</span>
  </div>

  <div class="pkg featured">
    <div>
      <span class="pkg-tag featured-tag">✦ Destaque</span>
      <h3>Lead Brand</h3>
    </div>
    <div class="pkg-price">R$ 7.500 <span>/ marca</span></div>
    <ul class="pkg-features">
      <li>Produto integrado nos 2 sets (moda e beauty)</li>
      <li>Naming em um dos sets — "Set [Marca]"</li>
      <li>Briefing personalizado com os creators antes do evento</li>
      <li>Conteúdo de todos os 15 creators com menção e tag</li>
      <li>Banco completo de fotos e vídeos em alta</li>
      <li>Presença destacada nas comunicações do evento</li>
      <li>2 acessos ao set nos dois dias de produção</li>
    </ul>
    <a href="mailto:contato@mztgrupo.com?subject=Media Kit · Lead Brand · Inside Out Edit 2" class="pkg-cta green-cta">Solicitar proposta</a>
    <span class="pkg-note">Apenas 1 marca neste formato</span>
  </div>

  <div class="pkg">
    <div>
      <span class="pkg-tag">Customizado</span>
      <h3>Branded Set</h3>
    </div>
    <div class="pkg-price" style="font-size:1.4rem;padding-top:8px">Sob consulta</div>
    <ul class="pkg-features">
      <li>Set temático desenvolvido exclusivamente para a marca</li>
      <li>Direção criativa alinhada ao branding da marca</li>
      <li>Cenografia e styling conforme identidade da marca</li>
      <li>Conteúdo exclusivo — não compartilhado com outras marcas</li>
      <li>Todos os benefícios do Lead Brand</li>
      <li>Relatório de alcance e entrega pós-evento</li>
    </ul>
    <a href="mailto:contato@mztgrupo.com?subject=Media Kit · Branded Set · Inside Out Edit 2" class="pkg-cta">Solicitar proposta</a>
    <span class="pkg-note">Produção personalizada — vagas limitadas</span>
  </div>
</div>

<!-- CONTATO -->
<div class="wrap" id="contato">
  <section class="section">
    <div class="contact-box">
      <div>
        <span class="eyebrow" style="margin-bottom:16px">Fale com a House</span>
        <h2 style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;letter-spacing:-.03em;line-height:1.1;max-width:20ch">Sua marca dentro<br/>do editorial.</h2>
        <p style="font-size:.9rem;color:var(--muted);line-height:1.75;max-width:40ch;margin-top:16px">Respondemos em até 24h. As vagas são limitadas por categoria — melhor conversar antes que o formato certo feche.</p>
      </div>
      <div class="contact-links">
        <a class="contact-link" href="mailto:contato@mztgrupo.com">contato@mztgrupo.com</a>
        <a class="contact-link" href="https://wa.me/5511999999999" target="_blank">WhatsApp direto</a>
        <a class="contact-cta-btn" href="mailto:contato@mztgrupo.com?subject=Media Kit · Inside Out Edit 2 — Interesse de marca">Enviar interesse ↗</a>
      </div>
    </div>
  </section>
</div>

<!-- FOOTER -->
<div class="wrap">
  <footer class="footer">
    <span class="footer-brand">House Mazzutti</span>
    <div class="footer-info">
      Inside Out · Edit 2 · São Paulo · Set 2026<br/>
      contato@mztgrupo.com
    </div>
    <span class="footer-info">© 2026 House Mazzutti Produções Ltda<br/>CNPJ 64.448.222/0001-54</span>
  </footer>
</div>

</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
