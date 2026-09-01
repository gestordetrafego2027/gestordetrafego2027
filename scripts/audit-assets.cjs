#!/usr/bin/env node
/**
 * Auditoria forense de imagens, links e vídeos.
 * Somente leitura — não altera nenhum arquivo do projeto.
 * Uso: node scripts/audit-assets.cjs > /dev/null && cat AUDIT_REPORT.md
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIR = path.join(ROOT, 'src');

const EXCLUDED_DIRS = [
  path.join('src', 'app', 'crm'),
  path.join('src', 'app', 'api'),
  path.join('src', 'pages_backup'),
];
const CODE_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.mdx', '.css', '.mjs']);
const IMG_EXT = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg', 'ico'];
const IMG_EXT_RE = IMG_EXT.join('|');
const MEDIA_EXT = [...IMG_EXT, 'mp4', 'webm', 'mov'];

// ─────────────────────────────────────────── util

function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next' || e.name === '.git') continue;
      walk(full, out);
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function isExcluded(relFile) {
  return EXCLUDED_DIRS.some((d) => relFile === d || relFile.startsWith(d + path.sep));
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[b.length];
}

function kb(bytes) {
  return Math.round(bytes / 1024);
}

// ─────────────────────────────────────────── 1.2 arquivos físicos em /public

const publicFiles = walk(PUBLIC_DIR).map((abs) => {
  const rel = '/' + path.relative(PUBLIC_DIR, abs).split(path.sep).join('/');
  const st = fs.statSync(abs);
  return { abs, rel, size: st.size };
});
const publicByPath = new Map(publicFiles.map((f) => [f.rel, f]));
const publicByLower = new Map();
for (const f of publicFiles) {
  const k = f.rel.toLowerCase();
  if (!publicByLower.has(k)) publicByLower.set(k, []);
  publicByLower.get(k).push(f);
}
// index por diretório (lowercase) para fuzzy
const publicByDir = new Map();
for (const f of publicFiles) {
  const d = path.posix.dirname(f.rel).toLowerCase();
  if (!publicByDir.has(d)) publicByDir.set(d, []);
  publicByDir.get(d).push(f);
}
// index por "stem" (sem extensão), lowercase
const publicByStemLower = new Map();
for (const f of publicFiles) {
  const stem = f.rel.replace(/\.[^./]+$/, '').toLowerCase();
  if (!publicByStemLower.has(stem)) publicByStemLower.set(stem, []);
  publicByStemLower.get(stem).push(f);
}


/**
 * Procura um arquivo em /public cujo caminho difira do referenciado por
 * EXATAMENTE um segmento de diretório (mesmo número de segmentos, mesmo
 * basename). Pega os casos reais de pasta renomeada ou categoria trocada —
 * ex.: /images/sobre/x.webp -> /images/about/x.webp,
 *      /images/produtora/moda/tf/1.webp -> /images/produtora/institucional/tf/1.webp
 */
function oneSegmentOff(p) {
  const a = p.toLowerCase().split('/');
  const hits = [];
  for (const f of publicFiles) {
    const b = f.rel.toLowerCase().split('/');
    if (b.length !== a.length) continue;
    if (b[b.length - 1] !== a[a.length - 1]) continue;
    let diff = 0;
    let at = -1;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { diff++; at = i; }
      if (diff > 1) break;
    }
    if (diff === 1) hits.push({ file: f, at, from: a[at], to: b[at] });
  }
  return hits;
}


/**
 * Procura arquivos cujo caminho seja o referenciado com UM segmento de diretório
 * a mais (nível de categoria omitido) ou a menos (nível de categoria a mais).
 * Pega o padrão real do projeto: /images/produtora/<slug>/capa.webp quando o
 * arquivo mora em /images/produtora/<categoria>/<slug>/capa.webp.
 */
function oneSegmentInsertedOrRemoved(p) {
  const a = p.toLowerCase().split('/');
  const hits = [];
  for (const f of publicFiles) {
    const b = f.rel.toLowerCase().split('/');
    if (b[b.length - 1] !== a[a.length - 1]) continue;
    let longer, shorter, kind;
    if (b.length === a.length + 1) { longer = b; shorter = a; kind = 'faltava'; }
    else if (b.length === a.length - 1) { longer = a; shorter = b; kind = 'sobrava'; }
    else continue;
    // longer precisa ser shorter com exatamente 1 segmento inserido
    let i = 0, j = 0, skipped = -1;
    while (i < shorter.length && j < longer.length) {
      if (shorter[i] === longer[j]) { i++; j++; }
      else if (skipped === -1) { skipped = j; j++; }
      else break;
    }
    if (i === shorter.length && (skipped !== -1 || longer.length - j === 1)) {
      const seg = longer[skipped === -1 ? longer.length - 1 : skipped];
      hits.push({ file: f, kind, seg });
    }
  }
  return hits;
}

// ─────────────────────────────────────────── 1.1 referências no código

const codeFiles = walk(SRC_DIR)
  .concat(
    ['tailwind.config.mjs', 'tailwind.config.js', 'tailwind.config.ts', 'next.config.mjs']
      .map((f) => path.join(ROOT, f))
      .filter((f) => fs.existsSync(f))
  )
  .filter((abs) => CODE_EXT.has(path.extname(abs)))
  .filter((abs) => !isExcluded(path.relative(ROOT, abs)));

/** Coleta toda string com cara de caminho de mídia local. */
const refs = []; // {file, line, raw, kind:'static'|'dynamic', ext}
const externalLinks = [];
const internalLinks = []; // {file,line,href}
const imgTags = []; // {file,line,tag,hasAlt,emptyAlt,component}
const videoTags = []; // {file,line,tag}

const STR_RE = /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g;

for (const abs of codeFiles) {
  const rel = path.relative(ROOT, abs);
  const content = fs.readFileSync(abs, 'utf8');
  const lines = content.split('\n');

  lines.forEach((lineText, idx) => {
    const lineNo = idx + 1;
    // ── strings com extensão de mídia
    let m;
    STR_RE.lastIndex = 0;
    while ((m = STR_RE.exec(lineText))) {
      const quote = m[1];
      const val = m[2];
      const mediaRe = new RegExp(`\\.(${MEDIA_EXT.join('|')})(\\?|#|$)`, 'i');
      if (!mediaRe.test(val)) continue;
      if (/^(https?:)?\/\//i.test(val)) continue; // externo
      if (/^data:/i.test(val)) continue;
      const dynamic = quote === '`' && /\$\{/.test(val);
      refs.push({
        file: rel,
        line: lineNo,
        raw: val,
        kind: dynamic ? 'dynamic' : 'static',
        ext: (val.match(mediaRe) || [])[1]?.toLowerCase(),
      });
    }
    // ── url(...) em CSS
    const cssRe = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
    while ((m = cssRe.exec(lineText))) {
      const val = m[1];
      if (/^(https?:)?\/\//i.test(val) || /^data:/i.test(val)) continue;
      const mediaRe = new RegExp(`\\.(${MEDIA_EXT.join('|')})(\\?|#|$)`, 'i');
      if (!mediaRe.test(val)) continue;
      refs.push({
        file: rel,
        line: lineNo,
        raw: val,
        kind: /\$\{/.test(val) ? 'dynamic' : 'static',
        ext: (val.match(mediaRe) || [])[1]?.toLowerCase(),
      });
    }
  });

  // ── tags <img> / <Image> (multi-linha)
  const tagRe = /<(img|Image)\b([\s\S]*?)\/?>/g;
  let t;
  while ((t = tagRe.exec(content))) {
    const before = content.slice(0, t.index);
    const lineNo = before.split('\n').length;
    const attrs = t[2];
    const hasAlt = /\balt\s*=/.test(attrs);
    const emptyAlt = /\balt\s*=\s*(["'])\s*\1/.test(attrs);
    const srcAttr =
      (attrs.match(/\bsrc\s*=\s*["']([^"']*)["']/) || [])[1] ||
      (attrs.match(/\bsrc\s*=\s*\{\s*`([^`]*)`/) || [])[1] ||
      null;
    // `route.ts`/`route.js` devolvem HTML como string (new Response(html)).
    // Ali não existe JSX — next/image é tecnicamente impossível.
    const isRawHtml = /[/\\]route\.(ts|js|tsx|jsx)$/.test(rel);
    const isPixel = srcAttr != null && /^https?:\/\//i.test(srcAttr);
    const isDataUri = srcAttr != null && /^data:/i.test(srcAttr);
    imgTags.push({
      file: rel,
      line: lineNo,
      component: t[1],
      hasAlt,
      emptyAlt,
      src: srcAttr,
      migratable: t[1] === 'img' && !isRawHtml && !isPixel && !isDataUri,
      reason: isRawHtml
        ? 'HTML em string dentro de route handler — sem JSX'
        : isPixel
          ? 'pixel de tracking / URL externa'
          : isDataUri
            ? 'data: URI (QR code) — next/image não aplica'
            : null,
      snippet: t[0].replace(/\s+/g, ' ').slice(0, 200),
    });
  }

  // ── tags <video>
  const vidRe = /<video\b([\s\S]*?)>/g;
  while ((t = vidRe.exec(content))) {
    const before = content.slice(0, t.index);
    const lineNo = before.split('\n').length;
    const attrs = t[1];
    const vsrc =
      (attrs.match(/\bsrc\s*=\s*["']([^"']*)["']/) || [])[1] ||
      (attrs.match(/\bsrc\s*=\s*\{\s*["'`]([^"'`]*)["'`]/) || [])[1] ||
      null;
    const vposter =
      (attrs.match(/\bposter\s*=\s*["']([^"']*)["']/) || [])[1] ||
      (attrs.match(/\bposter\s*=\s*\{\s*["'`]([^"'`]*)["'`]/) || [])[1] ||
      null;
    videoTags.push({
      file: rel,
      line: lineNo,
      attrs,
      src: vsrc,
      poster: vposter,
      snippet: t[0].replace(/\s+/g, ' ').slice(0, 300),
      hasPoster: /\bposter\s*=/.test(attrs),
      preload: (attrs.match(/\bpreload\s*=\s*["']?([a-z]+)/) || [])[1] || null,
      playsInline: /\bplaysInline\b/.test(attrs),
    });
  }

  // ── links href
  const hrefRe = /\bhref\s*=\s*(?:(["'])([^"']*)\1|\{\s*`([^`]*)`\s*\}|\{\s*(["'])([^"']*)\4\s*\})/g;
  while ((t = hrefRe.exec(content))) {
    const before = content.slice(0, t.index);
    const lineNo = before.split('\n').length;
    const val = t[2] ?? t[3] ?? t[5];
    if (val == null) continue;
    if (/^(https?:)?\/\//i.test(val)) {
      externalLinks.push({ file: rel, line: lineNo, href: val });
    } else if (val.startsWith('/')) {
      internalLinks.push({
        file: rel,
        line: lineNo,
        href: val,
        dynamic: /\$\{/.test(val),
      });
    }
  }
}

// ─────────────────────────────────────────── 1.3 cruzar refs estáticas

function normalizeRef(raw) {
  let p = raw.split('?')[0].split('#')[0].trim();
  if (!p.startsWith('/')) return null; // relativo/import — resolvido pelo bundler
  return p;
}

const results = { OK: [], CASE_MISMATCH: [], EXT_MISMATCH: [], FUZZY_MATCH: [], BROKEN: [], SKIPPED: [] };
const dynamicRefs = [];
const usedPublicPaths = new Set();

/**
 * Classifica um caminho absoluto de /public em uma das categorias da auditoria
 * e registra o resultado. `r` é a referência original (arquivo, linha, raw).
 */
function classify(p, r) {
  if (publicByPath.has(p)) {
    results.OK.push({ ...r, resolved: p });
    usedPublicPaths.add(p);
    return;
  }
  // b) case
  const lowerHits = publicByLower.get(p.toLowerCase());
  if (lowerHits && lowerHits.length) {
    results.CASE_MISMATCH.push({ ...r, suggestion: lowerHits[0].rel });
    usedPublicPaths.add(lowerHits[0].rel);
    return;
  }
  // c) extensão
  const stemHits = publicByStemLower.get(p.replace(/\.[^./]+$/, '').toLowerCase());
  if (stemHits && stemHits.length) {
    results.EXT_MISMATCH.push({ ...r, suggestion: stemHits[0].rel, alternatives: stemHits.map((h) => h.rel) });
    usedPublicPaths.add(stemHits[0].rel);
    return;
  }
  // d) fuzzy no mesmo diretório
  const dir = path.posix.dirname(p).toLowerCase();
  const siblings = publicByDir.get(dir) || [];
  const base = path.posix.basename(p).toLowerCase();
  let best = null;
  for (const sib of siblings) {
    const d = levenshtein(base, path.posix.basename(sib.rel).toLowerCase());
    if (d <= 3 && (!best || d < best.d)) best = { d, file: sib };
  }
  if (best) {
    results.FUZZY_MATCH.push({ ...r, suggestion: best.file.rel, distance: best.d });
    return;
  }
  // d2) um único segmento de diretório diferente (pasta renomeada / categoria trocada)
  const segHits = oneSegmentOff(p);
  if (segHits.length === 1) {
    results.FUZZY_MATCH.push({
      ...r,
      suggestion: segHits[0].file.rel,
      distance: 1,
      note: `diretório trocado: \`${segHits[0].from}\` -> \`${segHits[0].to}\``,
    });
    return;
  }
  if (segHits.length > 1) {
    // Vários candidatos só é sinal quando o segmento divergente NÃO é a pasta
    // imediata do arquivo — aí é categoria renomeada. Se for a pasta imediata,
    // são apenas homônimos (cover.webp existe em toda pasta de artigo) e a
    // "sugestão" seria uma imagem de outro assunto: isso é BROKEN, não fuzzy.
    const deep = segHits.filter((h) => h.at < p.split('/').length - 2);
    if (deep.length) {
      results.FUZZY_MATCH.push({
        ...r,
        suggestion: deep[0].file.rel,
        distance: 1,
        note: `${deep.length} candidatos com 1 diretório de diferença: ${deep.map((h) => '`' + h.file.rel + '`').join(', ')}`,
      });
      return;
    }
    results.BROKEN.push({
      ...r,
      resolved: p,
      note: `${segHits.length} arquivos homônimos em pastas irmãs — nenhum é esta imagem`,
    });
    return;
  }
  // d3) nível de categoria omitido/sobrando no caminho
  const insHits = oneSegmentInsertedOrRemoved(p);
  if (insHits.length === 1) {
    const h = insHits[0];
    results.FUZZY_MATCH.push({
      ...r,
      suggestion: h.file.rel,
      distance: 1,
      note: `nível de categoria ${h.kind}: \`${h.seg}\``,
    });
    return;
  }
  if (insHits.length > 1) {
    results.BROKEN.push({
      ...r,
      resolved: p,
      note: `${insHits.length} candidatos ao inserir/remover um nível: ${insHits.map((h) => '`' + h.file.rel + '`').join(', ')} — ambíguo`,
    });
    return;
  }

  // e) fuzzy no caminho inteiro
  let bestPath = null;
  for (const f of publicFiles) {
    if (path.posix.dirname(f.rel).toLowerCase() === dir) continue;
    const d = levenshtein(p.toLowerCase(), f.rel.toLowerCase());
    if (d <= 3 && (!bestPath || d < bestPath.d)) bestPath = { d, file: f };
  }
  if (bestPath) {
    results.FUZZY_MATCH.push({ ...r, suggestion: bestPath.file.rel, distance: bestPath.d, note: 'caminho similar' });
    return;
  }
  results.BROKEN.push({ ...r, resolved: p, ...(r.hostVar ? { note: 'caminho estático atrás de variável de domínio (OG / JSON-LD)' } : {}) });
}

function normalizeRef(raw) {
  const p = raw.split('?')[0].split('#')[0].trim();
  if (!p.startsWith('/')) return null; // relativo/import — resolvido pelo bundler
  return p;
}

// Caso especial: `${SITE_URL}/images/og-default.webp` — o prefixo é uma variável de
// domínio, mas o caminho é 100% estático. É resolvível e conta como referência
// estática (são as imagens de OG / JSON-LD, críticas para SEO).
const HOST_VAR_RE = /^\$\{[A-Za-z_$][\w$.]*\}(\/.*)$/;

for (const r of refs) {
  if (r.kind === 'dynamic') {
    const m = HOST_VAR_RE.exec(r.raw);
    if (m) {
      classify(normalizeRef(m[1]), { ...r, hostVar: true, kind: 'static-host-var' });
    } else {
      dynamicRefs.push(r);
    }
    continue;
  }
  const p = normalizeRef(r.raw);
  if (!p) {
    results.SKIPPED.push({ ...r, reason: 'caminho relativo / import' });
    continue;
  }
  classify(p, r);
}

const stillDynamic = dynamicRefs;

// ─────────────────────────────────────────── 1.4 refs dinâmicas

// slugs conhecidos: diretórios de rota
function routeSlugs(base) {
  const dir = path.join(ROOT, base);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('[') && !e.name.startsWith('_'))
    .map((e) => e.name);
}


const dynamicReport = stillDynamic.map((r) => {
  // tenta identificar prefixo estático
  const prefix = r.raw.split('${')[0];
  const suffix = r.raw.includes('}') ? r.raw.slice(r.raw.lastIndexOf('}') + 1) : '';
  let candidates = [];
  if (prefix.startsWith('/')) {
    const dir = prefix.replace(/\/[^/]*$/, '');
    candidates = publicFiles
      .filter((f) => f.rel.toLowerCase().startsWith(prefix.toLowerCase()) && f.rel.toLowerCase().endsWith(suffix.toLowerCase()))
      .map((f) => f.rel);
  }
  return { ...r, prefix, suffix, matchCount: candidates.length, sample: candidates.slice(0, 3) };
});

// marca como usados os arquivos que casam com padrões dinâmicos
for (const d of dynamicReport) {
  if (!d.prefix.startsWith('/')) continue;
  for (const f of publicFiles) {
    if (f.rel.toLowerCase().startsWith(d.prefix.toLowerCase()) && f.rel.toLowerCase().endsWith(d.suffix.toLowerCase())) {
      usedPublicPaths.add(f.rel);
    }
  }
}

// ─────────────────────────────────────────── 1.5 órfãos

// varre TODO o repo (inclusive crm/api/configs) por menções ao basename,
// para não classificar como órfão algo referenciado fora do escopo.
const allRepoFiles = walk(SRC_DIR)
  .concat(walk(path.join(ROOT, 'content')))
  .concat(walk(path.join(ROOT, 'supabase')))
  .concat([path.join(ROOT, 'next.config.mjs'), path.join(ROOT, 'tailwind.config.mjs')].filter((f) => fs.existsSync(f)))
  .filter((f) => CODE_EXT.has(path.extname(f)));
const allRepoText = allRepoFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

const orphans = publicFiles.filter((f) => {
  if (usedPublicPaths.has(f.rel)) return false;
  const base = path.posix.basename(f.rel);
  if (allRepoText.includes(base)) return false;
  const stem = base.replace(/\.[^.]+$/, '');
  if (stem.length > 6 && allRepoText.includes(stem)) return false;
  return true;
});

// ─────────────────────────────────────────── 1.6 rotas existentes

const appDir = path.join(SRC_DIR, 'app');
const routes = new Set();
const dynamicRoutes = [];
for (const abs of walk(appDir)) {
  const b = path.basename(abs);
  // `route.ts` também serve HTML nesta base (ex.: /catalogo-servico-264, workshops)
  if (!/^(page|route)\.(js|jsx|ts|tsx)$/.test(b)) continue;
  let rel = path.relative(appDir, path.dirname(abs)).split(path.sep).join('/');
  const segs = rel === '' ? [] : rel.split('/');
  const clean = segs.filter((s) => !/^\(.*\)$/.test(s)); // route groups
  const route = '/' + clean.join('/');
  if (clean.some((s) => s.startsWith('['))) {
    dynamicRoutes.push(route);
  } else {
    routes.add(route === '/' ? '/' : route);
  }
}
// expande [locale]
const LOCALES = ['pt', 'en', 'es'];
const expandedRoutes = new Set();
for (const r of routes) {
  if (r.startsWith('/[locale]')) {
    for (const l of LOCALES) expandedRoutes.add(r.replace('/[locale]', '/' + l));
  } else {
    expandedRoutes.add(r);
  }
}
const LOCALE_ALT = '(?:' + LOCALES.join('|') + ')';
function routeToRegex(route) {
  const body = route
    .split('/')
    .map((seg) => {
      if (seg === '') return '';
      if (seg === '[locale]') return '/' + LOCALE_ALT;
      if (/^\[\[\.\.\..*\]\]$/.test(seg)) return '(?:/[^/]+)*';
      if (/^\[\.\.\..*\]$/.test(seg)) return '/[^/]+(?:/[^/]+)*';
      if (/^\[.*\]$/.test(seg)) return '/[^/]+';
      return '/' + seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('');
  return new RegExp('^' + (body || '/') + '/?$');
}
const dynamicRouteRes = dynamicRoutes.map((r) => ({ route: r, re: routeToRegex(r) }));

// redirects declarados no next.config
const nextCfgText = fs.readFileSync(path.join(ROOT, 'next.config.mjs'), 'utf8');
// Apenas o bloco `async redirects()` — o bloco `headers()` também usa `source:`
// e o catch-all '/:path*' de lá faria QUALQUER rota parecer válida.
const redirectsBlock = (() => {
  const i = nextCfgText.indexOf('async redirects()');
  return i === -1 ? '' : nextCfgText.slice(i);
})();
const redirectSources = [...redirectsBlock.matchAll(/source:\s*'([^']+)'/g)].map((m) => m[1]);

// Converte um `source` do next.config (sintaxe path-to-regexp) em RegExp.
// Trata `:nome(regex)` ANTES de `:nome` — senão `/:year(\\d{4})/:path*` vira
// `^/[^/]+/.*$`, que casa com QUALQUER rota e zera o resultado da auditoria.
function sourceToRegex(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === ':') {
      const nameMatch = /^:(\w+)/.exec(src.slice(i));
      if (nameMatch) {
        i += nameMatch[0].length;
        if (src[i] === '(') {
          // captura o grupo balanceado e usa o regex do usuário tal e qual
          let depth = 1;
          let j = i + 1;
          while (j < src.length && depth > 0) {
            if (src[j] === '(') depth++;
            else if (src[j] === ')') depth--;
            j++;
          }
          out += '(?:' + src.slice(i + 1, j - 1) + ')';
          i = j;
          if (src[i] === '*') { out += '*'; i++; }
          else if (src[i] === '+') { out += '+'; i++; }
          else if (src[i] === '?') { out += '?'; i++; }
        } else if (src[i] === '*') {
          out += '.*';
          i++;
        } else if (src[i] === '+') {
          out += '[^/]+(?:/[^/]+)*';
          i++;
        } else if (src[i] === '?') {
          out += '[^/]*';
          i++;
        } else {
          out += '[^/]+';
        }
        continue;
      }
    }
    out += ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    i++;
  }
  return new RegExp('^' + out + '/?$');
}
const redirectRes = redirectSources.map(sourceToRegex);


// Rotas fora do i18n (espelha NON_I18N em src/middleware.ts)
const NON_I18N = ['/crm','/login','/logout','/api','/academy','/auth','/downloads','/lp','/sitemap.xml','/robots.txt','/catalogo-servico-264'];
// Espelha ACADEMY_I18N_REDIRECTS em src/middleware.ts: /academy/... sem locale
// é 301 para /pt/academy/..., logo o link NÃO está quebrado.
const ACADEMY_I18N_REDIRECTS = new Set(
  [...fs.readFileSync(path.join(SRC_DIR, 'middleware.ts'), 'utf8').matchAll(/'(\/(?:academy|checkout)\/[^']*)':\s*'\/pt\//g)].map((m) => m[1])
);

function matchesSomeRoute(p) {
  if (expandedRoutes.has(p)) return true;
  for (const d of dynamicRouteRes) if (d.re.test(p)) return true;
  return false;
}

function routeExists(href) {
  const clean = (href.split('?')[0].split('#')[0].replace(/\/+$/, '')) || '/';
  // arquivo estático servido de /public
  if (publicByPath.has(clean) || publicByLower.has(clean.toLowerCase())) return true;
  if (matchesSomeRoute(clean)) return true;
  if (ACADEMY_I18N_REDIRECTS.has(clean)) return true;
  // link sem prefixo de locale: o middleware next-intl prefixa /pt
  const firstSeg = '/' + clean.split('/')[1];
  const hasLocale = LOCALES.includes(clean.split('/')[1]);
  const isNonI18n = NON_I18N.some((pre) => clean === pre || clean.startsWith(pre + '/'));
  if (!hasLocale && !isNonI18n && matchesSomeRoute('/pt' + (clean === '/' ? '' : clean))) return true;
  // redirect declarado no next.config
  for (const re of redirectRes) {
    if (re.test(clean)) return true;
    if (!hasLocale && re.test('/pt' + clean)) return true;
  }
  return false;
}

// Sanity check: rotas propositalmente inexistentes DEVEM falhar. Se passarem,
// o matcher está permissivo demais e o resultado de links seria inútil.
const SELF_TEST = ['/rota-que-nao-existe-xyz', '/pt/rota-que-nao-existe-xyz', '/pt/blog/'];
for (const t of SELF_TEST) {
  console.error(`[self-test] ${t} -> ${routeExists(t) ? 'EXISTE' : 'quebrado'}`);
}

const brokenLinks = [];
const seenLinks = new Set();
for (const l of internalLinks) {
  if (l.dynamic) continue;
  const key = l.href;
  if (!routeExists(l.href)) {
    brokenLinks.push(l);
  }
  seenLinks.add(key);
}

// ─────────────────────────────────────────── output

function esc(s) {
  return String(s).replace(/\|/g, '\\|');
}

const totalBytes = publicFiles.reduce((a, f) => a + f.size, 0);
const top20 = [...publicFiles].sort((a, b) => b.size - a.size).slice(0, 20);
const orphanBytes = orphans.reduce((a, f) => a + f.size, 0);

const noAlt = imgTags.filter((t) => !t.hasAlt);
const emptyAlt = imgTags.filter((t) => t.hasAlt && t.emptyAlt);
const rawImgTags = imgTags.filter((t) => t.component === 'img');

const now = new Date().toISOString().slice(0, 10);

let out = '';
out += `# Auditoria Forense — House Mazzutti\n`;
out += `Gerado em: ${now}\n`;
out += `Escopo: \`src/**\` (exclui \`src/app/crm/**\`, \`src/app/api/**\`, \`src/pages_backup/**\`) + \`next.config.mjs\` + \`tailwind.config.mjs\`\n\n`;

out += `## Sumário Executivo\n\n`;
out += `| Métrica | Valor |\n|---|---:|\n`;
out += `| Total de referências de mídia | ${refs.length} |\n`;
out += `| — estáticas (inclui \`\${SITE_URL}\` + caminho fixo) | ${refs.length - stillDynamic.length} |\n`;
out += `| — dinâmicas de verdade (slug/índice variável) | ${stillDynamic.length} |\n`;
out += `| Imagens OK | ${results.OK.length} |\n`;
out += `| Case mismatch (correção automática) | ${results.CASE_MISMATCH.length} |\n`;
out += `| Extensão mismatch (correção automática) | ${results.EXT_MISMATCH.length} |\n`;
out += `| Fuzzy match (correção sugerida) | ${results.FUZZY_MATCH.length} |\n`;
out += `| **BROKEN irrecuperáveis** | **${results.BROKEN.length}** |\n`;
out += `| Referências ignoradas (relativas/import) | ${results.SKIPPED.length} |\n`;
out += `| Arquivos em /public | ${publicFiles.length} |\n`;
out += `| Imagens órfãs em /public | ${orphans.length} (${(orphanBytes / 1048576).toFixed(1)} MB) |\n`;
out += `| Links internos quebrados | ${brokenLinks.length} |\n`;
out += `| Links externos (revisão manual) | ${externalLinks.length} |\n`;
out += `| Tags \`<img>\` cruas (a migrar) | ${rawImgTags.length} |\n`;
out += `| Tags \`<Image>\` (next/image) já usadas | ${imgTags.length - rawImgTags.length} |\n`;
out += `| Imagens SEM atributo alt | ${noAlt.length} |\n`;
out += `| Imagens com alt="" | ${emptyAlt.length} |\n`;
out += `| Tags \`<video>\` | ${videoTags.length} |\n`;
out += `| Peso total de /public | ${(totalBytes / 1048576).toFixed(1)} MB |\n\n`;

out += `---\n\n`;
out += `## ⛔ BLOQUEIO DE ACESSO — \`www.housemazzutti.com\` sem certificado\n\n`;
out += `Achado fora do escopo de código, mas de impacto maior que qualquer imagem\n`;
out += `quebrada: **quem digita \`www.\` não consegue entrar no site.**\n\n`;
out += `Evidência coletada em 2026-09-01:\n\n`;
out += `| Host | DNS | Certificado servido | HTTP |\n|---|---|---|---|\n`;
out += `| \`housemazzutti.com\` | 31.97.17.85 | Let's Encrypt, SAN = \`housemazzutti.com\` | 307 → \`/pt/\` (ok) |\n`;
out += `| \`www.housemazzutti.com\` | 31.97.17.85 | **\`CN=TRAEFIK DEFAULT CERT\` (autoassinado)** | **503** |\n`;
out += `| \`app.housemazzutti.com\` | **sem registro** | — | — |\n\n`;
out += `O DNS do \`www\` aponta certo, mas o Traefik do Coolify não tem router para\n`;
out += `esse host: devolve o certificado padrão (daí o \`NET::ERR_CERT_AUTHORITY_INVALID\`\n`;
out += `no navegador) e, ignorando o TLS, um 503. Causa: o domínio cadastrado na\n`;
out += `aplicação no Coolify é só \`https://housemazzutti.com\` — sem o \`www\`, o\n`;
out += `Let's Encrypt nunca emitiu certificado para ele.\n\n`;
out += `**A correção é no painel do Coolify, não no código** (ver \`PERFORMANCE.md\`).\n`;
out += `O erro de TLS acontece antes de qualquer requisição HTTP chegar ao Next, então\n`;
out += `nenhum \`redirect\` em \`next.config.mjs\` resolve isso sozinho.\n\n`;
out += `---\n\n`;
out += `### Top 20 arquivos mais pesados em /public\n\n`;
out += `| # | Arquivo | Tamanho | Referenciado? |\n|---:|---|---:|:--:|\n`;
top20.forEach((f, i) => {
  const used = usedPublicPaths.has(f.rel) || allRepoText.includes(path.posix.basename(f.rel));
  out += `| ${i + 1} | \`${f.rel}\` | ${(f.size / 1048576).toFixed(1)} MB | ${used ? 'sim' : '**NÃO**'} |\n`;
});
out += `\n---\n\n`;

function section(title, items, render) {
  out += `## ${title} — ${items.length}\n\n`;
  if (!items.length) {
    out += `_Nenhuma ocorrência._\n\n`;
    return;
  }
  out += render(items);
  out += `\n`;
}

section('CASE_MISMATCH (Linux vai quebrar)', results.CASE_MISMATCH, (items) => {
  let s = `| Arquivo:linha | Referência no código | Arquivo real |\n|---|---|---|\n`;
  for (const i of items) s += `| \`${i.file}:${i.line}\` | \`${esc(i.raw)}\` | \`${esc(i.suggestion)}\` |\n`;
  return s;
});

section('EXT_MISMATCH (extensão diferente)', results.EXT_MISMATCH, (items) => {
  let s = `| Arquivo:linha | Referência | Arquivo real | Alternativas |\n|---|---|---|---|\n`;
  for (const i of items)
    s += `| \`${i.file}:${i.line}\` | \`${esc(i.raw)}\` | \`${esc(i.suggestion)}\` | ${i.alternatives.map((a) => '`' + esc(a) + '`').join(', ')} |\n`;
  return s;
});

section('FUZZY_MATCH (sugestão — precisa de decisão)', results.FUZZY_MATCH, (items) => {
  let s = `| Arquivo:linha | Referência | Sugestão | Distância | Nota |\n|---|---|---|---:|---|\n`;
  for (const i of items)
    s += `| \`${i.file}:${i.line}\` | \`${esc(i.raw)}\` | \`${esc(i.suggestion)}\` | ${i.distance} | ${i.note || ''} |\n`;
  return s;
});

section('BROKEN — irrecuperáveis', results.BROKEN, (items) => {
  let s = `| Arquivo:linha | Referência |\n|---|---|\n`;
  for (const i of items) s += `| \`${i.file}:${i.line}\` | \`${esc(i.raw)}\` |\n`;
  return s;
});

const dynamicZero = dynamicReport.filter((d) => d.matchCount === 0);
section('Referências DINÂMICAS com ZERO arquivos correspondentes (quebradas)', dynamicZero, (items) => {
  let s = `| Arquivo:linha | Padrão |\n|---|---|\n`;
  for (const i of items) s += `| \`${i.file}:${i.line}\` | \`${esc(i.raw)}\` |\n`;
  return s;
});

section('Referências DINÂMICAS (template literals)', dynamicReport, (items) => {
  let s = `| Arquivo:linha | Padrão | Arquivos que casam | Exemplo |\n|---|---|---:|---|\n`;
  for (const i of items)
    s += `| \`${i.file}:${i.line}\` | \`${esc(i.raw)}\` | ${i.matchCount === 0 ? '**0**' : i.matchCount} | ${i.sample.map((x) => '`' + esc(x) + '`').join('<br>')} |\n`;
  return s;
});

section('Links internos quebrados', brokenLinks, (items) => {
  let s = `| Arquivo:linha | href |\n|---|---|\n`;
  for (const i of items) s += `| \`${i.file}:${i.line}\` | \`${esc(i.href)}\` |\n`;
  return s;
});

function existsPub(v) {
  if (!v) return null;
  if (/\$\{/.test(v)) return 'dinâmico';
  if (/^https?:/i.test(v)) return 'externo';
  const c = v.split('?')[0].split('#')[0];
  return publicByPath.has(c) ? 'ok' : 'FALTANDO';
}
section('Vídeos', videoTags, (items) => {
  let s = `| Arquivo:linha | src | arquivo | poster | arquivo do poster | preload | playsInline |\n`;
  s += `|---|---|:--:|---|:--:|:--:|:--:|\n`;
  for (const i of items) {
    const se = existsPub(i.src);
    const pe = existsPub(i.poster);
    s += `| \`${i.file}:${i.line}\` | ${i.src ? '`' + esc(i.src) + '`' : '—'} | ${se === 'FALTANDO' ? '**FALTANDO**' : se || '—'} `;
    s += `| ${i.poster ? '`' + esc(i.poster) + '`' : '**sem poster**'} | ${pe === 'FALTANDO' ? '**FALTANDO**' : pe || '—'} `;
    s += `| ${i.preload || '**ausente**'} | ${i.playsInline ? 'sim' : '**não**'} |\n`;
  }
  return s;
});

section('Imagens sem atributo alt', noAlt, (items) => {
  let s = `| Arquivo:linha | Tag | Trecho |\n|---|---|---|\n`;
  for (const i of items) s += `| \`${i.file}:${i.line}\` | \`<${i.component}>\` | \`${esc(i.snippet.slice(0, 120))}\` |\n`;
  return s;
});

section('Imagens com alt="" (verificar se decorativas)', emptyAlt, (items) => {
  let s = `| Arquivo:linha | Tag |\n|---|---|\n`;
  for (const i of items) s += `| \`${i.file}:${i.line}\` | \`<${i.component}>\` |\n`;
  return s;
});

const migratable = rawImgTags.filter((t) => t.migratable);
const notMigratable = rawImgTags.filter((t) => !t.migratable);

section('Tags <img> que PODEM migrar para next/image (JSX)', migratable, (items) => {
  const byFile = new Map();
  for (const i of items) byFile.set(i.file, (byFile.get(i.file) || 0) + 1);
  let s = `| Arquivo | Ocorrências |\n|---|---:|\n`;
  for (const [f, c] of [...byFile.entries()].sort((a, b) => b[1] - a[1])) s += `| \`${f}\` | ${c} |\n`;
  return s;
});

section('Tags <img> que NÃO podem migrar (impossibilidade técnica)', notMigratable, (items) => {
  const byFile = new Map();
  for (const i of items) {
    const k = i.file + '||' + i.reason;
    byFile.set(k, (byFile.get(k) || 0) + 1);
  }
  let s = `\`next/image\` exige JSX e um loader do Next. Os casos abaixo não atendem\n`;
  s += `esse pré-requisito — migrá-los quebraria a página.\n\n`;
  s += `| Arquivo | Ocorrências | Motivo |\n|---|---:|---|\n`;
  for (const [k, c] of [...byFile.entries()].sort((a, b) => b[1] - a[1])) {
    const [f, reason] = k.split('||');
    s += `| \`${f}\` | ${c} | ${reason} |\n`;
  }
  return s;
});

// ── saúde do par src+fallback nos artigos do blog ──────────────────────────
// `ArticleImage` (ArticleContent.js) troca para `fallback` no onError do browser.
// Logo, `src` quebrado só aparece para o visitante se o `fallback` também quebrar.
// Mas o OG/JSON-LD usa `cover.src` direto — esse quebra sempre.
const ART = 'src/app/[locale]/blog/[slug]/articles.js';
const artAbs = path.join(ROOT, ART);
const blogHealth = { srcOk: 0, degradado: [], visivel: [] };
if (fs.existsSync(artAbs)) {
  const txt = fs.readFileSync(artAbs, 'utf8');
  const ls = txt.split('\n');
  const re2 = /"src":\s*"([^"]+)"/g;
  let mm;
  while ((mm = re2.exec(txt))) {
    const lineNo = txt.slice(0, mm.index).split('\n').length;
    const win = ls.slice(Math.max(0, lineNo - 5), Math.min(ls.length, lineNo + 5)).join('\n');
    const fb = (win.match(/"fallback":\s*"([^"]+)"/) || [])[1] || null;
    let slug = '?';
    for (let i = lineNo - 1; i >= 0; i--) {
      const km = ls[i].match(/^\s{2}['"]?([a-z0-9-]+)['"]?:\s*\{/);
      if (km) { slug = km[1]; break; }
    }
    const rec = { lineNo, src: mm[1], fb, slug };
    if (publicByPath.has(mm[1])) blogHealth.srcOk++;
    else if (fb && publicByPath.has(fb)) blogHealth.degradado.push(rec);
    else blogHealth.visivel.push(rec);
  }
}

out += `## Saúde das imagens dos artigos do blog\n\n`;
out += `\`ArticleImage\` (\`ArticleContent.js:43\`) troca para \`fallback\` no \`onError\` do\n`;
out += `navegador. Então um \`src\` quebrado só vira buraco na tela quando o \`fallback\`\n`;
out += `também está quebrado. O OG/Twitter/JSON-LD, porém, usa \`cover.src\` direto\n`;
out += `(\`blog/[slug]/page.js:35\` e \`:42\`) — esse quebra em todo caso.\n\n`;
out += `| Situação | Entradas |\n|---|---:|\n`;
out += `| \`src\` existe | ${blogHealth.srcOk} |\n`;
out += `| \`src\` quebrado, \`fallback\` salva a tela (mas OG quebra) | ${blogHealth.degradado.length} |\n`;
out += `| **\`src\` E \`fallback\` quebrados — buraco visível na página** | **${blogHealth.visivel.length}** |\n\n`;
const bySlugVis = new Map();
for (const e of blogHealth.visivel) bySlugVis.set(e.slug, (bySlugVis.get(e.slug) || 0) + 1);
out += `### Artigos com imagem visivelmente quebrada\n\n`;
out += `| Artigo (slug) | Imagens quebradas |\n|---|---:|\n`;
for (const [k, v] of [...bySlugVis.entries()].sort((a, b) => b[1] - a[1])) out += `| \`${k}\` | ${v} |\n`;
out += `\n`;
const bySlugDeg = new Map();
for (const e of blogHealth.degradado) bySlugDeg.set(e.slug, (bySlugDeg.get(e.slug) || 0) + 1);
out += `### Artigos que dependem do fallback (imagem genérica no lugar da própria)\n\n`;
out += `| Artigo (slug) | Imagens ausentes |\n|---|---:|\n`;
for (const [k, v] of [...bySlugDeg.entries()].sort((a, b) => b[1] - a[1])) out += `| \`${k}\` | ${v} |\n`;
out += `\n`;

section('Imagens órfãs em /public (NÃO deletadas)', orphans, (items) => {
  const sorted = [...items].sort((a, b) => b.size - a.size);
  let s = `Total: ${(orphanBytes / 1048576).toFixed(1)} MB. Nada foi removido — lista apenas para revisão.\n\n`;
  s += `| Arquivo | KB |\n|---|---:|\n`;
  for (const f of sorted) s += `| \`${f.rel}\` | ${kb(f.size)} |\n`;
  return s;
});

section('Links externos (revisão manual — sem requests HTTP)', (() => {
  const map = new Map();
  for (const l of externalLinks) {
    let host;
    try {
      host = new URL(l.href.startsWith('//') ? 'https:' + l.href : l.href).host;
    } catch {
      host = l.href;
    }
    if (!map.has(host)) map.set(host, []);
    map.get(host).push(l);
  }
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
})(), (items) => {
  let s = `| Host | Ocorrências | Primeiro uso |\n|---|---:|---|\n`;
  for (const [host, list] of items) s += `| \`${esc(host)}\` | ${list.length} | \`${list[0].file}:${list[0].line}\` |\n`;
  return s;
});


// ─────────────────────────────────────────── BROKEN_IMAGES_TODO.md

let todo = '';
todo += `# Imagens quebradas — pendentes de decisão manual\n`;
todo += `Gerado por \`node scripts/audit-assets.cjs\` em ${now}. Regenere após qualquer correção.\n\n`;
todo += `Nenhuma referência foi removida do código. Cada item abaixo continua apontando\n`;
todo += `para o caminho original — a ação é sua.\n\n`;

todo += `## Como ler\n\n`;
todo += `- **FUZZY** — existe um arquivo parecido em \`/public\`. Aceitar a sugestão ou indicar o certo.\n`;
todo += `- **BROKEN** — não existe nada equivalente. O arquivo precisa ser produzido.\n\n`;

if (results.FUZZY_MATCH.length) {
  todo += `---\n\n# FUZZY — sugestão disponível (${results.FUZZY_MATCH.length})\n\n`;
  for (const i of results.FUZZY_MATCH) {
    todo += `## ${i.file}:${i.line}\n`;
    todo += `- Referência: \`${i.raw}\`\n`;
    todo += `- Sugestão: \`${i.suggestion}\` (distância: ${i.distance})${i.note ? ` — ${i.note}` : ''}\n`;
    todo += `- Ação: [ ] aceitar sugestão  [ ] indicar caminho correto  [ ] produzir a imagem\n\n`;
  }
}

// BROKEN agrupado: os artigos de blog dominam e cada um precisa de um set de imagens,
// não de uma correção de caminho. Agrupar por artigo torna a lista acionável.
const ARTF = 'src/app/[locale]/blog/[slug]/articles.js';
const artBroken = results.BROKEN.filter((b) => b.file === ARTF);
const otherBroken = results.BROKEN.filter((b) => b.file !== ARTF);

if (artBroken.length) {
  const artAbs2 = path.join(ROOT, ARTF);
  const ls2 = fs.readFileSync(artAbs2, 'utf8').split('\n');
  const slugOf = (line) => {
    for (let i = line - 1; i >= 0; i--) {
      const km = ls2[i].match(/^\s{2}['"]?([a-z0-9-]+)['"]?:\s*\{/);
      if (km) return km[1];
    }
    return '?';
  };
  const bySlug = new Map();
  for (const b of artBroken) {
    const sl = slugOf(b.line);
    if (!bySlug.has(sl)) bySlug.set(sl, []);
    bySlug.get(sl).push(b);
  }
  todo += `---\n\n# BROKEN — imagens de artigo que precisam ser produzidas (${artBroken.length})\n\n`;
  todo += `Todas em \`${ARTF}\`. Não é caminho errado: o arquivo não existe.\n`;
  todo += `O \`fallback\` de cada entrada já aponta para uma imagem real, então a página\n`;
  todo += `não fica com buraco — mas mostra uma imagem genérica no lugar da própria, e o\n`;
  todo += `Open Graph (que usa \`cover.src\` direto) continua quebrado até o arquivo existir.\n\n`;
  todo += `Fluxo sugerido: \`foto-artigo-blog <slug>\` por artigo.\n\n`;
  for (const [sl, list] of [...bySlug.entries()].sort((a, b) => b[1].length - a[1].length)) {
    todo += `## \`${sl}\` — ${list.length} imagem(ns)\n\n`;
    for (const b of list) todo += `- [ ] L${b.line} \`${b.raw}\`\n`;
    todo += `\n`;
  }
}

if (otherBroken.length) {
  todo += `---\n\n# BROKEN — fora dos artigos (${otherBroken.length})\n\n`;
  for (const b of otherBroken) {
    todo += `## ${b.file}:${b.line}\n`;
    todo += `- Referência: \`${b.raw}\`\n`;
    if (b.note) todo += `- Nota: ${b.note}\n`;
    todo += `- Ação: [ ] produzir a imagem  [ ] indicar caminho correto  [ ] remover a referência\n\n`;
  }
}

const dynZero = dynamicReport.filter((d) => d.matchCount === 0);
if (dynZero.length) {
  todo += `---\n\n# Padrões dinâmicos sem nenhum arquivo (${dynZero.length})\n\n`;
  todo += `Um padrão com zero correspondências significa galeria inteira vazia em produção.\n\n`;
  for (const d of dynZero) {
    todo += `## ${d.file}:${d.line}\n`;
    todo += `- Padrão: \`${d.raw}\`\n`;
    todo += `- Ação: [ ] produzir as imagens  [ ] corrigir o caminho  [ ] despublicar a página\n\n`;
  }
}

fs.writeFileSync(path.join(ROOT, 'BROKEN_IMAGES_TODO.md'), todo);

fs.writeFileSync(path.join(ROOT, 'AUDIT_REPORT.md'), out);

// JSON para as fases seguintes
fs.writeFileSync(
  path.join(ROOT, '.audit-data.json'),
  JSON.stringify(
    {
      results,
      dynamicReport,
      brokenLinks,
      videoTags,
      imgTags,
      orphans: orphans.map((o) => ({ rel: o.rel, size: o.size })),
      externalLinks,
      stats: { totalBytes, publicCount: publicFiles.length },
    },
    null,
    2
  )
);

console.error(
  `OK=${results.OK.length} CASE=${results.CASE_MISMATCH.length} EXT=${results.EXT_MISMATCH.length} FUZZY=${results.FUZZY_MATCH.length} BROKEN=${results.BROKEN.length} DYN=${stillDynamic.length} DYN0=${dynamicReport.filter((d)=>d.matchCount===0).length} ORPHAN=${orphans.length} LINKS_BROKEN=${brokenLinks.length} IMGTAGS=${rawImgTags.length} VIDEOS=${videoTags.length}`
);
