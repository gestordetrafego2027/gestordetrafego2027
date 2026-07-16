import { NextResponse } from 'next/server'

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Catálogo de Serviços — House Mazzutti</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  a { color: inherit; text-decoration: none; }

  :root {
    --bg: #faf9f7;
    --dark: #111;
    --gold: #c4a97a;
    --mid: #555;
    --muted: #999;
    --border: #e8e3db;
    --cream: #f0ede8;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #141414; --border: #2a2a2a; --cream: #1e1e1e; --mid: #aaa; --muted: #666; }
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--dark);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
  }
  @media (prefers-color-scheme: dark) { body { color: #f0ede8; } }

  /* ── SITE HEADER (fixed, site-standard) ── */
  .site-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 48px;
    background: transparent;
    transition: background 0.3s ease, transform 0.4s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease;
  }
  .site-header.scrolled {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 0.5px solid #e0e0e0;
  }
  .site-header.hidden { transform: translateY(-100%); }

  .site-logo {
    font-size: 18px; font-weight: 400; letter-spacing: 0.04em; text-transform: uppercase;
    color: #fff; text-decoration: none; display: inline-flex; align-items: baseline; gap: 0.3em;
    white-space: nowrap; flex-shrink: 0;
  }
  .site-logo .hm-house { font-weight: 400; }
  .site-logo .hm-mazzutti { font-weight: 700; }
  .site-header.scrolled .site-logo { color: #000; }

  .site-nav { display: flex; align-items: center; gap: 0; margin: 0 auto 0 48px; }
  .site-nav a {
    font-size: 10px; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(255,255,255,0.7); text-decoration: none;
    padding: 0 20px; transition: opacity 0.3s;
  }
  .site-nav a:hover { color: #fff; opacity: 0.7; }
  .site-header.scrolled .site-nav a { color: #000; }
  .site-header.scrolled .site-nav a:hover { opacity: 0.6; }

  .site-hamburger {
    background: none; border: none; cursor: pointer;
    display: flex; flex-direction: column; justify-content: center;
    width: 44px; height: 44px; position: relative; padding: 0;
  }
  .hbr-line {
    display: block; width: 28px; height: 1px;
    background: #fff; position: absolute; left: 8px;
    transition: all 0.3s ease;
  }
  .hbr-line:nth-child(1) { top: 14px; }
  .hbr-line:nth-child(2) { top: 22px; }
  .hbr-line:nth-child(3) { top: 30px; }
  .site-header.scrolled .hbr-line { background: #000; }
  .site-hamburger.open .hbr-line:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
  .site-hamburger.open .hbr-line:nth-child(2) { opacity: 0; }
  .site-hamburger.open .hbr-line:nth-child(3) { transform: rotate(-45deg) translate(8px, -8px); }

  /* side menu overlay */
  .side-overlay {
    display: none; position: fixed; inset: 0; z-index: 99998;
    background: rgba(0,0,0,0.3);
  }
  .side-overlay.open { display: block; }
  .side-menu {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 25vw; min-width: 320px;
    background: #0a0a0a; z-index: 99999;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 60px 48px;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
  }
  .side-menu.open { transform: translateX(0); }
  .side-menu-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; }
  .side-menu-logo { font-size: 20px; font-weight: 400; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; display: inline-flex; gap: 0.3em; }
  .side-menu-logo .hm-mazzutti { font-weight: 700; }
  .side-close {
    background: none; border: none; cursor: pointer;
    position: relative; width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
  }
  .side-close::before, .side-close::after {
    content: ''; display: block; width: 24px; height: 1px;
    background: #fff; position: absolute;
  }
  .side-close::before { transform: rotate(45deg); }
  .side-close::after { transform: rotate(-45deg); }
  .side-nav { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
  .side-nav a {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: #aaa; text-decoration: none; transition: color 0.3s;
  }
  .side-nav a:hover { color: #fff; }
  .side-section-label {
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    color: #444; margin-bottom: 16px;
  }
  .side-section-links { display: flex; flex-direction: column; gap: 14px; margin-bottom: 40px; }
  .side-section-links a {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: #666; text-decoration: none; transition: color 0.3s;
  }
  .side-section-links a:hover { color: #fff; }
  .side-location { margin-bottom: 48px; }
  .side-location p { font-size: 14px; font-style: italic; color: #aaa; line-height: 1.8; }
  .side-divider { width: 100%; height: 0.5px; background: #222; margin-bottom: 48px; }
  .side-follow-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #555; margin-bottom: 16px; }
  .side-social { display: flex; flex-direction: column; gap: 12px; }
  .side-social a { font-size: 14px; font-style: italic; color: #aaa; text-decoration: none; transition: color 0.3s; }
  .side-social a:hover { color: #fff; }
  .side-copy { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #333; margin: 0; }

  /* ── HERO ── */
  .hero { background: var(--dark); color: #fff; padding: 120px 64px 0; }
  .hero-content { padding-bottom: 52px; }
  .hero-eyebrow { font-size: 8px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 16px; }
  .hero-h1 { font-size: clamp(52px, 8vw, 108px); font-weight: 900; line-height: 0.9; letter-spacing: -0.02em; text-transform: uppercase; color: #fff; margin-bottom: 8px; }
  .hero-h1 .dim { color: rgba(255,255,255,0.18); }
  .hero-sub { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.38); max-width: 340px; line-height: 1.65; margin-top: 20px; }
  .anchors { display: flex; gap: 0; margin-top: 40px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; }
  .anchors a {
    font-size: 8px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(255,255,255,0.28); text-decoration: none;
    padding-right: 28px; margin-right: 28px;
    border-right: 1px solid rgba(255,255,255,0.07); padding-bottom: 28px; transition: color .25s;
  }
  .anchors a:last-child { border-right: none; }
  .anchors a:hover { color: rgba(255,255,255,0.9); }

  /* ── MAIN ── */
  main { max-width: 1320px; margin: 0 auto; padding: 80px 64px 120px; }

  /* ── SECTION ── */
  .section { margin-bottom: 96px; }
  .section-head { display: flex; align-items: flex-end; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 40px; }
  .section-eyebrow { font-size: 8px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .section-h2 { font-size: clamp(30px, 4vw, 48px); font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; line-height: 1; }
  .section-count { font-size: 8px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); }

  /* ── GRID ── */
  .grid { display: grid; gap: 40px 32px; grid-template-columns: repeat(3, 1fr); }
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 900px) { .grid, .grid-4 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) {
    main { padding: 48px 24px 80px; }
    .hero { padding: 100px 24px 0; }
    .grid, .grid-2, .grid-4 { grid-template-columns: 1fr; }
    .site-nav { display: none; }
    .site-header { padding: 20px 24px; }
  }

  /* ── CARD ── */
  .card { display: block; text-decoration: none; }
  .card-img { position: relative; aspect-ratio: 3/4; overflow: hidden; background: var(--cream); margin-bottom: 16px; }
  .card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s ease; }
  .card:hover .card-img img { transform: scale(1.04); }
  .card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0); transition: background .5s; display: flex; align-items: flex-end; pointer-events: none; }
  .card:hover .card-overlay { background: rgba(0,0,0,0.3); }
  .card-overlay-cta { font-size: 8px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; padding: 20px; opacity: 0; transform: translateY(6px); transition: opacity .4s, transform .4s; }
  .card:hover .card-overlay-cta { opacity: 1; transform: translateY(0); }
  .card-cat { font-size: 7px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .card-name { font-size: 15px; font-weight: 400; line-height: 1.3; margin-bottom: 2px; }
  .card-desc { font-size: 11px; font-weight: 300; color: var(--muted); line-height: 1.55; margin-bottom: 4px; }
  .card-price { font-size: 15px; font-weight: 400; }
  .card-price.gold { color: var(--gold); }
  .card-meta { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
  .consulta { font-size: 8px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); }

  /* ── PACKAGES ── */
  .pkg-section { margin-top: 48px; }
  .pkg-label { font-size: 8px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  .pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); overflow: hidden; }
  @media (max-width: 680px) { .pkg-grid { grid-template-columns: 1fr; } }
  .pkg-card { background: var(--bg); padding: 28px 24px; display: flex; flex-direction: column; gap: 12px; }
  .pkg-card.featured { background: var(--dark); }
  .pkg-card.featured .pkg-name,
  .pkg-card.featured .pkg-desc { color: rgba(255,255,255,0.7); }
  .pkg-card.featured .pkg-price { color: var(--gold); }
  .pkg-name { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .pkg-price { font-size: 28px; font-weight: 900; letter-spacing: -0.02em; line-height: 1; }
  .pkg-desc { font-size: 11px; font-weight: 300; color: var(--mid); line-height: 1.6; }

  /* ── EBOOKS ── */
  .ebook-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  @media (max-width: 680px) { .ebook-grid { grid-template-columns: 1fr; } }
  .ebook-card { display: flex; gap: 24px; text-decoration: none; align-items: flex-start; }
  .ebook-cover { width: 120px; flex-shrink: 0; aspect-ratio: 3/4; overflow: hidden; background: var(--cream); transition: transform .5s; }
  .ebook-card:hover .ebook-cover { transform: scale(1.02); }
  .ebook-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ebook-info { flex: 1; padding-top: 4px; }
  .ebook-cat { font-size: 7px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .ebook-name { font-size: 16px; font-weight: 400; line-height: 1.25; margin-bottom: 8px; }
  .ebook-desc { font-size: 12px; font-weight: 300; color: var(--mid); line-height: 1.6; margin-bottom: 12px; }
  .ebook-price { font-size: 22px; font-weight: 900; letter-spacing: -0.02em; color: var(--gold); }
  .ebook-cta { display: inline-block; margin-top: 12px; font-size: 8px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 2px; transition: border-color .25s; }
  @media (prefers-color-scheme: dark) { .ebook-cta { color: #f0ede8; } }
  .ebook-card:hover .ebook-cta { border-color: currentColor; }

  /* ── TOUR ── */
  .tour-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 680px) { .tour-grid { grid-template-columns: 1fr; } }
  .tour-card { border: 1px solid var(--border); padding: 28px 24px; display: flex; flex-direction: column; gap: 10px; }
  .tour-card.highlight { border-color: var(--gold); }
  .tour-tag { font-size: 7px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); }
  .tour-name { font-size: 15px; font-weight: 600; line-height: 1.2; }
  .tour-desc { font-size: 11px; font-weight: 300; color: var(--mid); line-height: 1.6; }
  .tour-price { font-size: 26px; font-weight: 900; letter-spacing: -0.02em; color: var(--gold); margin-top: 4px; }
  .tour-note { font-size: 8px; font-weight: 400; color: var(--muted); letter-spacing: 0.1em; }

  /* ── EQUIPE ── */
  .equipe-section { background: var(--dark); color: #fff; padding: 80px 64px; }
  .equipe-intro { margin-bottom: 48px; }
  .equipe-title { font-size: clamp(30px, 4vw, 48px); font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; line-height: 1; margin-bottom: 12px; }
  .equipe-sub { font-size: 8px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 8px; }
  .equipe-desc { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.38); max-width: 520px; line-height: 1.65; margin-top: 16px; }
  .dept-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.07); }
  @media (max-width: 900px) { .dept-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .dept-grid { grid-template-columns: 1fr; } .equipe-section { padding: 48px 24px; } }
  .dept { background: #1a1a17; padding: 28px; }
  .dept-name { font-size: 8px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .role-table { width: 100%; border-collapse: collapse; }
  .role-table tr { border-bottom: 1px solid rgba(255,255,255,0.04); }
  .role-table tr:last-child { border-bottom: none; }
  .role-table td { font-size: 11px; color: rgba(255,255,255,0.55); padding: 8px 0; line-height: 1.4; vertical-align: top; }
  .role-table td.price { text-align: right; color: var(--gold); font-variant-numeric: tabular-nums; white-space: nowrap; padding-left: 16px; font-size: 12px; }
  .equipe-note { font-size: 10px; font-weight: 400; color: rgba(255,255,255,0.2); margin-top: 24px; letter-spacing: 0.15em; text-transform: uppercase; }

  /* ── FOOTER (site-standard) ── */
  .site-footer {
    background: #fff; border-top: 1px solid #e4e4e7;
    padding: 32px 48px;
    display: flex; flex-direction: column; align-items: center; gap: 20px;
  }
  .footer-logo {
    font-size: 20px; font-weight: 400; letter-spacing: 0.04em; text-transform: uppercase;
    color: #000; text-decoration: none; display: inline-flex; align-items: baseline; gap: 0.3em;
  }
  .footer-logo .hm-mazzutti { font-weight: 700; }
  .footer-social { display: flex; gap: 32px; }
  .footer-social a {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: #000; text-decoration: none; transition: opacity 0.3s;
  }
  .footer-social a:hover { opacity: 0.5; }
  .footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 24px; }
  .footer-links a {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: #000; opacity: 0.5; text-decoration: none; transition: opacity 0.3s;
  }
  .footer-links a:hover { opacity: 0.9; }
  .footer-copy { font-size: 10px; letter-spacing: 0.1em; color: #a1a1aa; }
</style>
</head>
<body>

<!-- SITE HEADER -->
<header class="site-header" id="siteHeader">
  <a class="site-logo" href="https://housemazzutti.com" target="_blank">
    <span class="hm-house">House</span><span class="hm-mazzutti">Mazzutti</span>
  </a>
  <nav class="site-nav">
    <a href="#studio">Studio</a>
    <a href="#produtora">Produtora</a>
    <a href="#academy">Academy</a>
    <a href="#agencia">Agência</a>
    <a href="#digitais">Digitais</a>
    <a href="#tour">Tour</a>
    <a href="#equipe">Equipe</a>
  </nav>
  <button class="site-hamburger" id="hamburger" aria-label="Abrir menu">
    <span class="hbr-line"></span>
    <span class="hbr-line"></span>
    <span class="hbr-line"></span>
  </button>
</header>

<!-- SIDE MENU -->
<div class="side-overlay" id="sideOverlay" onclick="closeMenu()"></div>
<div class="side-menu" id="sideMenu">
  <div>
    <div class="side-menu-top">
      <span class="side-menu-logo">
        <span class="hm-house">House</span><span class="hm-mazzutti">Mazzutti</span>
      </span>
      <button class="side-close" aria-label="Fechar menu" onclick="closeMenu()"></button>
    </div>
    <nav class="side-nav">
      <a href="#studio" onclick="closeMenu()">Studio</a>
      <a href="#produtora" onclick="closeMenu()">Produtora</a>
      <a href="#academy" onclick="closeMenu()">Academy</a>
      <a href="#agencia" onclick="Agência">Agência</a>
      <a href="#digitais" onclick="closeMenu()">Produtos Digitais</a>
      <a href="#tour" onclick="closeMenu()">Tour Canoinhas</a>
      <a href="#equipe" onclick="closeMenu()">Equipe à la Carte</a>
    </nav>
    <p class="side-section-label">Site Oficial</p>
    <div class="side-section-links">
      <a href="https://housemazzutti.com" target="_blank">Home</a>
      <a href="https://housemazzutti.com/pt/portfolio" target="_blank">Portfólio</a>
      <a href="https://housemazzutti.com/pt/contato" target="_blank">Contato</a>
      <a href="https://housemazzutti.com/pt/loja" target="_blank">Loja</a>
    </div>
    <div class="side-location">
      <p>São Paulo, Brasil</p>
      <p>23.5505° S, 46.6333° W</p>
    </div>
    <div class="side-divider"></div>
    <p class="side-follow-label">Follow</p>
    <div class="side-social">
      <a href="https://instagram.com/housemazzutti" target="_blank">Instagram</a>
      <a href="https://www.linkedin.com/company/house-mazzutti" target="_blank">LinkedIn</a>
    </div>
  </div>
  <p class="side-copy">© 2026 HOUSE MAZZUTTI</p>
</div>

<section class="hero">
  <div class="hero-content">
    <p class="hero-eyebrow">Catálogo de Serviços · House Mazzutti</p>
    <h1 class="hero-h1">Serviços<br><span class="dim">&amp; Produtos</span></h1>
    <p class="hero-sub">Estúdio fotográfico, produção audiovisual, branding, educação criativa e produtos digitais. São Paulo · Brasil.</p>
    <div class="anchors">
      <a href="#studio">Studio</a>
      <a href="#produtora">Produtora</a>
      <a href="#academy">Academy</a>
      <a href="#agencia">Agência</a>
      <a href="#digitais">Produtos Digitais</a>
      <a href="#tour">Tour Canoinhas</a>
      <a href="#equipe">Equipe à la Carte</a>
    </div>
  </div>
</section>

<main>

  <!-- STUDIO -->
  <section class="section" id="studio">
    <div class="section-head">
      <div>
        <p class="section-eyebrow">Book · Ensaio · Cobertura</p>
        <h2 class="section-h2">Studio</h2>
      </div>
      <span class="section-count">3 serviços</span>
    </div>
    <div class="grid">
      <a class="card" href="/catalogo-servico-264/book-studio">
        <div class="card-img">
          <img src="/images/studio/amanda-oliveira/capa.webp" alt="Book Studio" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Studio →</span></div>
        </div>
        <p class="card-cat">Studio</p>
        <div class="card-meta">
          <h3 class="card-name">Book Studio</h3>
          <span class="consulta">Consultar</span>
        </div>
        <p class="card-desc">Direção de Pose e Expressão · Tratamento Profissional · Estúdio Próprio SP · Planos Essencial, Estratégico e Premium</p>
      </a>
      <a class="card" href="/catalogo-servico-264/ensaio-pessoal">
        <div class="card-img">
          <img src="/images/studio/mileide-mihaile/1.webp" alt="Ensaio Pessoal" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Studio →</span></div>
        </div>
        <p class="card-cat">Studio</p>
        <div class="card-meta">
          <h3 class="card-name">Ensaio Pessoal</h3>
          <span class="consulta">Consultar</span>
        </div>
        <p class="card-desc">Direção Criativa · Moodboard Personalizado · Beauty Artist · Looks de Cena · De 2 a 4 Looks</p>
      </a>
      <a class="card" href="/catalogo-servico-264/cobertura">
        <div class="card-img">
          <img src="/images/blog/cobertura-presenca-sp/cobertura-externa-tempo-real-sao-paulo-house-mazzutti.webp" alt="Cobertura" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Studio →</span></div>
        </div>
        <p class="card-cat">Studio</p>
        <div class="card-meta">
          <h3 class="card-name">Cobertura &amp; Concierge Production</h3>
          <span class="consulta">Consultar</span>
        </div>
        <p class="card-desc">Cobertura de Evento · Lifestyle Premium · Equipe Técnica Dedicada · São Paulo · Planos Essencial a Imersivo</p>
      </a>
    </div>

    <div class="pkg-section">
      <p class="pkg-label">Pacotes — Book Profissional</p>
      <div class="pkg-grid">
        <div class="pkg-card">
          <p class="pkg-name">Essencial</p>
          <p class="pkg-price">R$ 2.700</p>
          <p class="pkg-desc">02 looks estratégicos · 10 fotos tratadas · Direção de pose e expressão · Estúdio próprio em São Paulo</p>
        </div>
        <div class="pkg-card featured">
          <p class="pkg-name">Estratégico</p>
          <p class="pkg-price">R$ 3.500</p>
          <p class="pkg-desc">04 looks estratégicos · 25 fotos tratadas · Moodboard personalizado · 01 video reel de apresentação</p>
        </div>
        <div class="pkg-card">
          <p class="pkg-name">Premium</p>
          <p class="pkg-price">R$ 6.100</p>
          <p class="pkg-desc">Looks ilimitados · 40 fotos high-end · Direção de imagem completa · 03 video reels de conteúdo</p>
        </div>
      </div>
    </div>

    <div class="pkg-section">
      <p class="pkg-label">Pacotes — Ensaio Pessoal</p>
      <div class="pkg-grid">
        <div class="pkg-card">
          <p class="pkg-name">Autoral</p>
          <p class="pkg-price">R$ 3.700</p>
          <p class="pkg-desc">Conceito e moodboard · 02 looks de cena · 20 fotos tratadas · Direção de presença</p>
        </div>
        <div class="pkg-card featured">
          <p class="pkg-name">Editorial</p>
          <p class="pkg-price">R$ 6.700</p>
          <p class="pkg-desc">Conceito editorial · 04 looks de cena · 35 fotos tratadas · Beauty artist e styling · 01 video reel autoral</p>
        </div>
        <div class="pkg-card">
          <p class="pkg-name">Signature</p>
          <p class="pkg-price">R$ 12.000</p>
          <p class="pkg-desc">Direção criativa completa · Looks ilimitados · 60 fotos high-end · Equipe full · 03 video reels + fashion film</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRODUTORA -->
  <section class="section" id="produtora">
    <div class="section-head">
      <div>
        <p class="section-eyebrow">Moda · Beleza · Institucional</p>
        <h2 class="section-h2">Produtora</h2>
      </div>
      <span class="section-count">6 serviços</span>
    </div>
    <div class="grid">
      <a class="card" href="/catalogo-servico-264/editorial-moda">
        <div class="card-img">
          <img src="/images/produtora/moda/beatco/capa.webp" alt="Editorial de Moda" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Produtora →</span></div>
        </div>
        <p class="card-cat">Produtora</p>
        <div class="card-meta"><h3 class="card-name">Editorial de Moda</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Lookbook · Fashion Film · Still de Produtos · Short Vídeos Catálogo · E-commerce Editorial</p>
      </a>
      <a class="card" href="/catalogo-servico-264/publicidade-campanha">
        <div class="card-img">
          <img src="/images/produtora/beleza/oceane/capa.webp" alt="Publicidade & Campanha" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Produtora →</span></div>
        </div>
        <p class="card-cat">Produtora</p>
        <div class="card-meta"><h3 class="card-name">Publicidade &amp; Campanha</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Filme Publicitário · Campanha 360° · Influenciadores · Linha Editorial · Produção Executiva</p>
      </a>
      <a class="card" href="/catalogo-servico-264/direcao-criativa">
        <div class="card-img">
          <img src="/images/blog/editorial-moda-narrativa/editorial-moda-narrativa-visual-fashion-direction-house-mazzutti.webp" alt="Direção Criativa" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Produtora →</span></div>
        </div>
        <p class="card-cat">Produtora</p>
        <div class="card-meta"><h3 class="card-name">Direção &amp; Criação Estratégica</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Direção de Arte · Fotografia · Videografia · Cenografia · Narrativa Publicitária · Do conceito à entrega</p>
      </a>
      <a class="card" href="/catalogo-servico-264/producao-corporativa">
        <div class="card-img">
          <img src="/images/produtora/institucional/sense-hotel/capa.webp" alt="Produção Corporativa" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Produtora →</span></div>
        </div>
        <p class="card-cat">Produtora</p>
        <div class="card-meta"><h3 class="card-name">Produção Corporativa &amp; Institucional</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Vídeo Institucional · Posicionamento CEO · Banco de Imagem · Vídeo Explicativo · Apps e Site</p>
      </a>
      <a class="card" href="/catalogo-servico-264/producao-educacao">
        <div class="card-img">
          <img src="/images/academy/inside-out/cover.webp" alt="Produção de Educação" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Produtora →</span></div>
        </div>
        <p class="card-cat">Produtora</p>
        <div class="card-meta"><h3 class="card-name">Produção de Educação</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Vídeo-aulas · Treinamentos Corporativos · Cases de Sucesso · E-learning Profissional</p>
      </a>
      <a class="card" href="/catalogo-servico-264/producao-eventos">
        <div class="card-img">
          <img src="/images/blog/cobertura-narrativa-visual/cobertura-narrativa-visual-sao-paulo-house-mazzutti.webp" alt="Produção de Eventos" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Produtora →</span></div>
        </div>
        <p class="card-cat">Produtora</p>
        <div class="card-meta"><h3 class="card-name">Produção de Eventos</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Cobertura ao Vivo · Transmissão Online · Drone · Fotografia e Vídeo · São Paulo e Brasil</p>
      </a>
    </div>
  </section>

  <!-- ACADEMY -->
  <section class="section" id="academy">
    <div class="section-head">
      <div>
        <p class="section-eyebrow">Cursos · Formação · Conteúdo</p>
        <h2 class="section-h2">Academy</h2>
      </div>
      <span class="section-count">3 cursos</span>
    </div>
    <div class="grid">
      <a class="card" href="https://housemazzutti.com/pt/loja/marketing-de-influencia-academy" target="_blank">
        <div class="card-img">
          <img src="/images/academy/hero-academy.webp" alt="Marketing de Influência" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Academy →</span></div>
        </div>
        <p class="card-cat">Academy</p>
        <div class="card-meta"><h3 class="card-name">Marketing de Influência — HMZT Academy</h3><span class="card-price gold">R$ 127,00</span></div>
        <p class="card-desc">Estratégia de Influência · Creators · Multicanal · 6 módulos · 100h de formação</p>
      </a>
      <a class="card" href="https://housemazzutti.com/pt/loja/direcao-criativa-academy" target="_blank">
        <div class="card-img">
          <img src="/images/academy/direcao-criativa/cover.webp" alt="Direção Criativa Academy" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Academy →</span></div>
        </div>
        <p class="card-cat">Academy</p>
        <div class="card-meta"><h3 class="card-name">Direção Criativa — HMZT Academy</h3><span class="card-price gold">R$ 147,00</span></div>
        <p class="card-desc">Conceito · Direção de Arte · Narrativa Visual · 8 módulos · 120h de formação</p>
      </a>
      <a class="card" href="https://housemazzutti.com/pt/loja/casos-da-producao-academy" target="_blank">
        <div class="card-img">
          <img src="/images/academy/casos-da-producao/cover.webp" alt="Produção Executiva Academy" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Academy →</span></div>
        </div>
        <p class="card-cat">Academy</p>
        <div class="card-meta"><h3 class="card-name">Produção Executiva — HMZT Academy</h3><span class="card-price gold">R$ 197,00</span></div>
        <p class="card-desc">Planejamento · Orçamento · Operações · Entrega · 10 módulos · 140h de formação</p>
      </a>
    </div>
  </section>

  <!-- AGÊNCIA -->
  <section class="section" id="agencia">
    <div class="section-head">
      <div>
        <p class="section-eyebrow">Branding · Web · Comunicação</p>
        <h2 class="section-h2">Agência</h2>
      </div>
      <span class="section-count">4 serviços</span>
    </div>
    <div class="grid grid-4">
      <a class="card" href="/catalogo-servico-264/rp-mkt-direto">
        <div class="card-img">
          <img src="/images/agencia/knowhol/1.webp" alt="RP & Marketing Direto" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Agência →</span></div>
        </div>
        <p class="card-cat">Agência</p>
        <div class="card-meta"><h3 class="card-name">RP &amp; Marketing Direto</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Assessoria de Imprensa · Relações com Mídia · Marketing Direto · Gestão de Reputação</p>
      </a>
      <a class="card" href="/catalogo-servico-264/desenvolvimento-web">
        <div class="card-img">
          <img src="/images/agencia/alletto/capa.webp" alt="Desenvolvimento Web" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Agência →</span></div>
        </div>
        <p class="card-cat">Agência</p>
        <div class="card-meta"><h3 class="card-name">Desenvolvimento Web</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Design Autoral · Performance · SEO · Marca Pessoal · E-commerce · Corporativo · Integrações CRM e Pagamento</p>
      </a>
      <a class="card" href="/catalogo-servico-264/branding-project">
        <div class="card-img">
          <img src="/images/agencia/house-mazzutti/1.webp" alt="Branding Project" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Agência →</span></div>
        </div>
        <p class="card-cat">Agência</p>
        <div class="card-meta"><h3 class="card-name">Branding Project</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Pesquisa Estratégica · Posicionamento · Identidade Visual · Brand Book · Aplicações · 20 a 75 dias</p>
      </a>
      <a class="card" href="/catalogo-servico-264/campanha-lancamento">
        <div class="card-img">
          <img src="/images/blog/campanha-lancamento/campanha-publicitaria-direcao-criativa-house-mazzutti.webp" alt="Campanha de Lançamento" loading="lazy">
          <div class="card-overlay"><span class="card-overlay-cta">Ver Agência →</span></div>
        </div>
        <p class="card-cat">Agência</p>
        <div class="card-meta"><h3 class="card-name">Campanha de Lançamento</h3><span class="consulta">Consultar</span></div>
        <p class="card-desc">Hero Film · Reels · Editorial · Landing Page · Storytelling Multicanal · 10 formatos disponíveis</p>
      </a>
    </div>
  </section>

  <!-- PRODUTOS DIGITAIS -->
  <section class="section" id="digitais">
    <div class="section-head">
      <div>
        <p class="section-eyebrow">Ebooks · Downloads · Avulsos</p>
        <h2 class="section-h2">Produtos Digitais</h2>
      </div>
      <span class="section-count">2 títulos</span>
    </div>
    <div class="ebook-grid">
      <a class="ebook-card" href="https://housemazzutti.com/pt/loja/marketing-para-modelos" target="_blank">
        <div class="ebook-cover">
          <img src="/images/academy/marketing-para-modelos/cover.webp" alt="Marketing para Modelos" loading="lazy">
        </div>
        <div class="ebook-info">
          <p class="ebook-cat">Ebook · Academy</p>
          <h3 class="ebook-name">Marketing para Modelos · Vol. 01</h3>
          <p class="ebook-desc">Da passarela física ao império digital. O guia honesto de quem quer ser modelo no Brasil de hoje — por Angelo Mazzutti. 281 páginas · 12 capítulos.</p>
          <p class="ebook-price">R$ 27,90</p>
          <span class="ebook-cta">Adquirir →</span>
        </div>
      </a>
      <a class="ebook-card" href="https://housemazzutti.com/pt/loja/preco-da-relevancia" target="_blank">
        <div class="ebook-cover">
          <img src="/images/academy/preco-da-relevancia/cover.webp" alt="O Preço da Relevância" loading="lazy">
        </div>
        <div class="ebook-info">
          <p class="ebook-cat">Ebook · Academy</p>
          <h3 class="ebook-name">O Preço da Relevância · Vol. 02</h3>
          <p class="ebook-desc">Manifesto sobre o colapso da identidade na era da atenção digital. Influenciadores, plataformas e a guerra silenciosa pela atenção.</p>
          <p class="ebook-price">R$ 54,00</p>
          <span class="ebook-cta">Adquirir →</span>
        </div>
      </a>
    </div>
  </section>

  <!-- TOUR CANOINHAS -->
  <section class="section" id="tour">
    <div class="section-head">
      <div>
        <p class="section-eyebrow">Ensaio Exclusivo · Edição Limitada</p>
        <h2 class="section-h2">Tour Canoinhas</h2>
      </div>
      <span class="section-count">3 cotas</span>
    </div>
    <div class="tour-grid">
      <div class="tour-card">
        <p class="tour-tag">Cota 01</p>
        <p class="tour-name">Tour Canoinhas · Ensaio 01</p>
        <p class="tour-desc">3 produções · 10 fotos tratadas · Making of</p>
        <p class="tour-price">R$ 1.900</p>
        <p class="tour-note">3× sem juros</p>
      </div>
      <div class="tour-card highlight">
        <p class="tour-tag">Cota 02</p>
        <p class="tour-name">Tour Canoinhas · Ensaio 02</p>
        <p class="tour-desc">4 produções · 15 fotos tratadas · 1 Backstage 20"</p>
        <p class="tour-price">R$ 2.600</p>
        <p class="tour-note">3× sem juros</p>
      </div>
      <div class="tour-card">
        <p class="tour-tag">Cota 03</p>
        <p class="tour-name">Tour Canoinhas · Ensaio 03</p>
        <p class="tour-desc">5 produções · 20 fotos tratadas · Backstage + Fashion Film 20"</p>
        <p class="tour-price">R$ 3.200</p>
        <p class="tour-note">3× sem juros</p>
      </div>
    </div>
  </section>

</main>

<!-- EQUIPE À LA CARTE -->
<section id="equipe" class="equipe-section">
  <div class="equipe-intro">
    <p class="equipe-sub">Produção Executiva · Profissionais por Função</p>
    <h2 class="equipe-title">Equipe à la Carte</h2>
    <p class="equipe-desc">Monte sua equipe de produção por função e diária. Todos os profissionais são coordenados pela Produção Executiva da House Mazzutti — pré-produção, contratos, logística e entrega.</p>
  </div>

  <div class="dept-grid">

    <div class="dept">
      <p class="dept-name">Criação &amp; Direção</p>
      <table class="role-table">
        <tr><td>Diretor Criativo</td><td class="price">R$ 3.500/dia</td></tr>
        <tr><td>Diretor de Arte</td><td class="price">R$ 2.200/dia</td></tr>
        <tr><td>Roteirista</td><td class="price">R$ 1.800/dia</td></tr>
        <tr><td>Produtor Criativo</td><td class="price">R$ 1.600/dia</td></tr>
        <tr><td>Assistente de Arte</td><td class="price">R$ 800/dia</td></tr>
      </table>
    </div>

    <div class="dept">
      <p class="dept-name">Câmera &amp; Fotografia</p>
      <table class="role-table">
        <tr><td>Diretor de Fotografia</td><td class="price">R$ 3.000/dia</td></tr>
        <tr><td>Operador de Câmera A</td><td class="price">R$ 1.800/dia</td></tr>
        <tr><td>Operador de Câmera B</td><td class="price">R$ 1.200/dia</td></tr>
        <tr><td>Fotógrafo</td><td class="price">R$ 2.200/dia</td></tr>
        <tr><td>Ass. de Câmera / Foco</td><td class="price">R$ 700/dia</td></tr>
        <tr><td>Drone / Piloto</td><td class="price">R$ 1.800/dia</td></tr>
      </table>
    </div>

    <div class="dept">
      <p class="dept-name">Pós-Produção</p>
      <table class="role-table">
        <tr><td>Editor de Vídeo Sênior</td><td class="price">R$ 2.500/dia</td></tr>
        <tr><td>Editor de Vídeo Pleno</td><td class="price">R$ 1.400/dia</td></tr>
        <tr><td>Motion Designer</td><td class="price">R$ 1.800/dia</td></tr>
        <tr><td>Colorista</td><td class="price">R$ 2.000/dia</td></tr>
        <tr><td>Sound Designer</td><td class="price">R$ 1.600/dia</td></tr>
        <tr><td>Retocador Fotográfico</td><td class="price">R$ 1.200/dia</td></tr>
        <tr><td>VFX Artist</td><td class="price">R$ 2.200/dia</td></tr>
      </table>
    </div>

    <div class="dept">
      <p class="dept-name">Styling &amp; Beleza</p>
      <table class="role-table">
        <tr><td>Stylist Sênior</td><td class="price">R$ 2.000/dia</td></tr>
        <tr><td>Stylist Pleno</td><td class="price">R$ 1.200/dia</td></tr>
        <tr><td>Ass. de Styling</td><td class="price">R$ 600/dia</td></tr>
        <tr><td>Make Up Artist Sênior</td><td class="price">R$ 1.800/dia</td></tr>
        <tr><td>Make Up Artist Pleno</td><td class="price">R$ 1.000/dia</td></tr>
        <tr><td>Cabelereiro</td><td class="price">R$ 1.200/dia</td></tr>
      </table>
    </div>

    <div class="dept">
      <p class="dept-name">Talentos</p>
      <table class="role-table">
        <tr><td>Modelo Editorial (cachê base)</td><td class="price">R$ 1.500/dia</td></tr>
        <tr><td>Modelo Comercial</td><td class="price">R$ 800/dia</td></tr>
        <tr><td>Ator / Apresentador</td><td class="price">R$ 2.500/dia</td></tr>
        <tr><td>Digital Influencer (micro)</td><td class="price">A partir R$ 3.000</td></tr>
        <tr><td>Digital Influencer (macro)</td><td class="price">Sob consulta</td></tr>
      </table>
    </div>

    <div class="dept">
      <p class="dept-name">Set &amp; Cenário</p>
      <table class="role-table">
        <tr><td>Cenógrafo Sênior</td><td class="price">R$ 2.500/dia</td></tr>
        <tr><td>Assistente de Cenografia</td><td class="price">R$ 800/dia</td></tr>
        <tr><td>Set Dresser</td><td class="price">R$ 1.200/dia</td></tr>
        <tr><td>Props Master</td><td class="price">R$ 1.000/dia</td></tr>
      </table>
    </div>

    <div class="dept">
      <p class="dept-name">Técnico &amp; Infraestrutura</p>
      <table class="role-table">
        <tr><td>Gaffer / Iluminação</td><td class="price">R$ 1.800/dia</td></tr>
        <tr><td>Eletricista de Set</td><td class="price">R$ 900/dia</td></tr>
        <tr><td>Técnico de Som</td><td class="price">R$ 1.500/dia</td></tr>
        <tr><td>Operador de Teleprompter</td><td class="price">R$ 600/dia</td></tr>
        <tr><td>Runner / Produção</td><td class="price">R$ 450/dia</td></tr>
        <tr><td>Produtor Executivo</td><td class="price">R$ 3.000/dia</td></tr>
      </table>
    </div>

  </div>

  <p class="equipe-note">* Valores por diária de 8h em São Paulo · Deslocamentos externos sob consulta · Taxa de coordenação executiva não inclusa</p>
</section>

<footer class="site-footer">
  <a class="footer-logo" href="https://housemazzutti.com" target="_blank">
    <span class="hm-house">House</span><span class="hm-mazzutti">Mazzutti</span>
  </a>
  <div class="footer-social">
    <a href="https://instagram.com/housemazzutti" target="_blank">Instagram</a>
    <a href="https://www.linkedin.com/company/house-mazzutti" target="_blank">LinkedIn</a>
  </div>
  <div class="footer-links">
    <a href="https://housemazzutti.com/pt/politicas/privacidade" target="_blank">Privacidade</a>
    <a href="https://housemazzutti.com/pt/politicas/termos-de-uso" target="_blank">Termos de Uso</a>
    <a href="https://housemazzutti.com/pt/politicas/cookies" target="_blank">Cookies</a>
    <a href="https://housemazzutti.com/pt/politicas" target="_blank">Central de Privacidade →</a>
  </div>
  <p class="footer-copy">© 2026 House Mazzutti · São Paulo · Brasil</p>
</footer>

<script>
  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('sideOverlay');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current <= 60) {
      header.classList.remove('scrolled', 'hidden');
    } else {
      header.classList.add('scrolled');
      if (current > lastScroll && current > window.innerHeight) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    }
    lastScroll = current;
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.add('open');
    sideMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    hamburger.classList.remove('open');
    sideMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
</script>

</body>
</html>`

export async function GET() {
  return new NextResponse(HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
