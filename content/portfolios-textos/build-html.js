// Build per-portfolio HTML blocks ready for WordPress paste.
const fs = require('fs');
const { portfolios, QUOTE, PHILO, AUTHOR, YEAR } = require('./build-docx');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function htmlBlock(p) {
  return `
<!-- ====== PORTFÓLIO ${p.n} · ${escapeHtml(p.name)} ====== -->
<section class="hmzt-portfolio" data-portfolio="${p.n}">

  <blockquote class="hmzt-portfolio-quote">
    <p>&ldquo;${escapeHtml(QUOTE)}&rdquo;</p>
  </blockquote>

  <ul class="hmzt-portfolio-meta">
    <li><strong>Categoria</strong><span>${escapeHtml(p.cat)}</span></li>
    <li><strong>Autor</strong><span>${escapeHtml(AUTHOR)}</span></li>
    <li><strong>Ano</strong><span>${escapeHtml(YEAR)}</span></li>
  </ul>

  <p class="hmzt-portfolio-philosophy">
    <strong>Filosofia do Studio:</strong> <em>${escapeHtml(PHILO)}</em>
  </p>

  <div class="hmzt-portfolio-body">
    <p>${escapeHtml(p.text)}</p>
  </div>

  <p class="hmzt-portfolio-team"><em>${escapeHtml(p.team)}</em></p>

</section>
<!-- ====== /PORTFÓLIO ${p.n} ====== -->
`.trim();
}

const blocks = portfolios.map(htmlBlock).join('\n\n');

// Optional CSS suggestion (commented; user can use or ignore)
const SUGGESTED_CSS = `<!--
SUGGESTED CSS (paste once in your theme's Custom CSS):

.hmzt-portfolio { max-width: 720px; margin: 4rem auto; font-family: Georgia, serif; line-height: 1.6; color: #1a1a1a; }
.hmzt-portfolio-quote { border-left: 2px solid #1a1a1a; padding-left: 1.25rem; margin: 0 0 2rem; font-style: italic; font-size: 1.1rem; color: #333; }
.hmzt-portfolio-meta { list-style: none; padding: 0; margin: 0 0 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 1rem 0; }
.hmzt-portfolio-meta li { display: flex; flex-direction: column; }
.hmzt-portfolio-meta strong { font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: #888; font-weight: 600; margin-bottom: .25rem; }
.hmzt-portfolio-meta span { font-size: .95rem; color: #1a1a1a; }
.hmzt-portfolio-philosophy { font-size: .95rem; color: #444; margin-bottom: 2rem; }
.hmzt-portfolio-body p { font-size: 1.05rem; margin-bottom: 1.5rem; text-align: justify; hyphens: auto; }
.hmzt-portfolio-team { font-size: .85rem; color: #666; border-top: 1px solid #eee; padding-top: 1rem; margin-top: 2rem; }
-->`;

// Cover index for navigation
let toc = `<!-- ÍNDICE DOS PORTFÓLIOS -->\n<ol class="hmzt-portfolios-index">\n`;
portfolios.forEach(p => {
  toc += `  <li>${p.n} — ${escapeHtml(p.name)} <em>(${escapeHtml(p.cat)})</em></li>\n`;
});
toc += `</ol>\n`;

const out = `<!--
PORTFÓLIOS INDIVIDUAIS — HOUSE MAZZUTTI
${portfolios.length} blocos HTML prontos para colar em cada página de portfólio individual.

INSTRUÇÕES:
- Cada bloco abaixo (entre <section class="hmzt-portfolio">...</section>) corresponde a uma página individual de portfólio.
- Cole o bloco correspondente no editor da página em modo HTML/Código.
- A classe "hmzt-portfolio" permite estilização unificada via CSS do tema (sugestão abaixo).
- Todos os blocos seguem a mesma estrutura: citação, ficha técnica, filosofia, texto editorial, assinatura da equipe.
-->

${SUGGESTED_CSS}

${toc}

${blocks}
`;

fs.writeFileSync('portfolios-blocos-wp.html', out);
console.log('HTML written: portfolios-blocos-wp.html (' + portfolios.length + ' blocos)');

// Also generate a preview HTML that renders the blocks
const preview = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Preview · Portfólios House Mazzutti</title>
  <style>
    body { margin: 0; background: #fafaf7; font-family: Georgia, serif; color: #1a1a1a; }
    header { padding: 4rem 2rem 2rem; text-align: center; border-bottom: 1px solid #ddd; }
    header h1 { font-size: 2rem; letter-spacing: .04em; margin: 0 0 .5rem; }
    header p { color: #666; margin: 0; }
    .hmzt-portfolio { max-width: 720px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.6; }
    .hmzt-portfolio-quote { border-left: 2px solid #1a1a1a; padding-left: 1.25rem; margin: 0 0 2rem; font-style: italic; font-size: 1.1rem; color: #333; }
    .hmzt-portfolio-meta { list-style: none; padding: 1rem 0; margin: 0 0 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; }
    .hmzt-portfolio-meta li { display: flex; flex-direction: column; }
    .hmzt-portfolio-meta strong { font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: #888; font-weight: 600; margin-bottom: .25rem; }
    .hmzt-portfolio-meta span { font-size: .95rem; }
    .hmzt-portfolio-philosophy { font-size: .95rem; color: #444; margin-bottom: 2rem; }
    .hmzt-portfolio-body p { font-size: 1.05rem; margin-bottom: 1.5rem; text-align: justify; hyphens: auto; }
    .hmzt-portfolio-team { font-size: .85rem; color: #666; border-top: 1px solid #eee; padding-top: 1rem; margin-top: 2rem; }
    h2.section-divider { max-width: 720px; margin: 6rem auto 1rem; padding: 0 1.5rem; font-size: 1.4rem; text-transform: uppercase; letter-spacing: .15em; color: #888; border-bottom: 1px solid #ddd; padding-bottom: .5rem; }
    h3.portfolio-title { max-width: 720px; margin: 0 auto 1rem; padding: 0 1.5rem; font-size: 1.4rem; }
  </style>
</head>
<body>
<header>
  <h1>HOUSE MAZZUTTI</h1>
  <p>Portfólios Individuais — Preview dos blocos para o site</p>
</header>
${(() => {
  let html = '';
  let lastCat = '';
  portfolios.forEach(p => {
    const sectionKey = p.n <= 26 ? 'STUDIO — BOOK MODEL' : p.n <= 45 ? 'STUDIO — ENSAIO PESSOAL' : 'PRODUTORA — CAMPANHAS';
    if (sectionKey !== lastCat) {
      html += `\n<h2 class="section-divider">${sectionKey}</h2>\n`;
      lastCat = sectionKey;
    }
    html += `\n<h3 class="portfolio-title">${p.n} · ${escapeHtml(p.name)}</h3>\n`;
    html += htmlBlock(p) + '\n';
  });
  return html;
})()}
</body>
</html>`;

fs.writeFileSync('portfolios-preview.html', preview);
console.log('Preview HTML written: portfolios-preview.html');
