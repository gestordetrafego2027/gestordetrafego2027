#!/usr/bin/env node
/**
 * Normaliza nomes de arquivos em /public para kebab-case ASCII.
 *
 * Existe porque o Mac trata caminhos como case-insensitive e a VPS Linux não:
 * um `Capa.JPG` referenciado como `capa.jpg` funciona no seu laptop e devolve
 * 404 em produção. Espaço e acento causam o mesmo tipo de surpresa ao passar
 * pela URL.
 *
 * NÃO roda sozinho. Por padrão só mostra o que faria:
 *
 *   node scripts/rename-to-kebab.js              # dry-run (padrão)
 *   node scripts/rename-to-kebab.js --apply      # renomeia de fato
 *   node scripts/rename-to-kebab.js --apply --update-code
 *
 * `--update-code` reescreve as referências em src/** junto com o rename — sem
 * isso você renomeia os arquivos e quebra todas as referências de uma vez.
 *
 * Sempre rode `node scripts/audit-assets.cjs` depois para conferir o estado.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIR = path.join(ROOT, 'src');

const APPLY = process.argv.includes('--apply');
const UPDATE_CODE = process.argv.includes('--update-code');

const CODE_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.mdx', '.css', '.mjs']);

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
      if (e.name === 'node_modules' || e.name === '.git' || e.name === '.next') continue;
      walk(full, out);
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

/** `Ensaio Fotográfico (Final).JPG` -> `ensaio-fotografico-final.jpg` */
function kebab(name) {
  const ext = path.extname(name);
  const stem = name.slice(0, name.length - ext.length);
  const clean = stem
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove acentos
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
  return (clean || 'arquivo') + ext.toLowerCase();
}

const files = walk(PUBLIC_DIR);
const renames = [];
for (const abs of files) {
  const dir = path.dirname(abs);
  const base = path.basename(abs);
  // Dotfiles (.DS_Store, .gitkeep) não são assets servidos e o kebab comeria o
  // ponto inicial, transformando-os em arquivos comuns.
  if (base.startsWith('.')) continue;
  const next = kebab(base);
  if (next === base) continue;
  renames.push({
    absFrom: abs,
    absTo: path.join(dir, next),
    urlFrom: '/' + path.relative(PUBLIC_DIR, abs).split(path.sep).join('/'),
    urlTo: '/' + path.relative(PUBLIC_DIR, path.join(dir, next)).split(path.sep).join('/'),
  });
}

if (!renames.length) {
  console.log('Nada a renomear: todos os nomes em /public já são kebab-case ASCII.');
  process.exit(0);
}

// Colisão: dois arquivos diferentes que virariam o mesmo nome. Renomear às cegas
// apagaria um deles — aborta e mostra quais são.
const byTarget = new Map();
for (const r of renames) {
  if (!byTarget.has(r.absTo)) byTarget.set(r.absTo, []);
  byTarget.get(r.absTo).push(r.absFrom);
}
/**
 * O destino já existe como OUTRO arquivo? No macOS `existsSync` sozinho não
 * responde isso: o FS é case-insensitive, então o destino `capa.jpg` "existe"
 * quando o que está lá é o próprio `Capa.JPG` de origem. Compara por inode.
 */
function destinoOcupadoPorOutro(to, from) {
  if (!fs.existsSync(to)) return false;
  try {
    const a = fs.statSync(to);
    const b = fs.statSync(from);
    return !(a.ino === b.ino && a.dev === b.dev);
  } catch {
    return true;
  }
}

const colisoes = [...byTarget.entries()].filter(
  ([to, froms]) => froms.length > 1 || destinoOcupadoPorOutro(to, froms[0])
);
if (colisoes.length) {
  console.error('ABORTADO — os renames abaixo colidiriam (perda de arquivo):\n');
  for (const [to, froms] of colisoes) {
    console.error(`  ${path.relative(ROOT, to)}`);
    for (const f of froms) console.error(`    <- ${path.relative(ROOT, f)}`);
    if (destinoOcupadoPorOutro(to, froms[0])) console.error(`    <- (destino já ocupado por outro arquivo)`);
  }
  console.error('\nResolva manualmente antes de rodar de novo.');
  process.exit(1);
}

console.log(`${renames.length} arquivo(s) fora do padrão kebab-case:\n`);
for (const r of renames) console.log(`  ${r.urlFrom}\n  -> ${r.urlTo}\n`);

if (!APPLY) {
  console.log('Dry-run. Nada foi alterado.');
  console.log('Para aplicar:  node scripts/rename-to-kebab.js --apply --update-code');
  process.exit(0);
}

// Renomeia via nome temporário: no macOS (case-insensitive) um rename direto de
// `Capa.jpg` para `capa.jpg` é ignorado como "mesmo arquivo".
for (const r of renames) {
  const tmp = r.absTo + '.rename-tmp';
  fs.renameSync(r.absFrom, tmp);
  fs.renameSync(tmp, r.absTo);
  console.log(`renomeado: ${r.urlFrom} -> ${r.urlTo}`);
}

if (!UPDATE_CODE) {
  console.log(
    '\nATENÇÃO: arquivos renomeados, mas as referências em src/** NÃO foram atualizadas.' +
      '\nRode com --update-code, ou corrija à mão e confira com scripts/audit-assets.cjs.'
  );
  process.exit(0);
}

let arquivosTocados = 0;
let substituicoes = 0;
for (const abs of walk(SRC_DIR)) {
  if (!CODE_EXT.has(path.extname(abs))) continue;
  const original = fs.readFileSync(abs, 'utf8');
  let texto = original;
  for (const r of renames) {
    if (!texto.includes(r.urlFrom)) continue;
    substituicoes += texto.split(r.urlFrom).length - 1;
    texto = texto.split(r.urlFrom).join(r.urlTo);
  }
  if (texto !== original) {
    fs.writeFileSync(abs, texto);
    arquivosTocados++;
    console.log(`atualizado: ${path.relative(ROOT, abs)}`);
  }
}

console.log(`\n${substituicoes} referência(s) atualizada(s) em ${arquivosTocados} arquivo(s).`);
console.log('Confira agora: node scripts/audit-assets.cjs');
