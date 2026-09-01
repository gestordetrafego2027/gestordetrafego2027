#!/usr/bin/env node
/**
 * Recomprime os MP4 de /public/videos e gera um poster de cada um.
 *
 * Motivação concreta: hoje `/public/videos` pesa ~406 MB, com arquivos de 91 MB
 * e 90 MB servidos direto do Next, sem CDN de vídeo. Um hero em autoplay desse
 * tamanho consome a banda do visitante inteira antes da página assentar.
 *
 * Para cada `nome.mp4` produz, ao lado:
 *   nome-optimized.mp4   H.264 CRF 24, faststart, no máximo 1920px de largura
 *   nome-poster.jpg      frame de 1s, 1280px de largura
 *
 * NÃO substitui o original e NÃO altera nenhuma referência no código. Depois de
 * conferir o resultado, você troca os caminhos manualmente (ou renomeia).
 *
 *   node scripts/optimize-videos.js                 # dry-run (padrão)
 *   node scripts/optimize-videos.js --apply         # processa
 *   node scripts/optimize-videos.js --apply --only hero-tour-new.mp4
 *   node scripts/optimize-videos.js --apply --crf 26 --max-width 1440
 *
 * Requer ffmpeg no PATH.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VIDEO_DIR = path.join(ROOT, 'public', 'videos');

const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
function flag(name, fallback) {
  const i = argv.indexOf(name);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}
const CRF = flag('--crf', '24');
const MAX_WIDTH = flag('--max-width', '1920');
const ONLY = flag('--only', null);

function temFfmpeg() {
  const r = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  return r.status === 0;
}

// Só o processamento precisa de ffmpeg; o dry-run é uma listagem e continua útil
// sem ele — inclusive para decidir se vale instalar.
function exigirFfmpeg() {
  if (temFfmpeg()) return;
  console.error('\nffmpeg não encontrado no PATH — necessário para --apply.\n');
  console.error('  macOS:          brew install ffmpeg');
  console.error('  Debian/Ubuntu:  sudo apt install ffmpeg');
  console.error('  Windows:        winget install Gyan.FFmpeg');
  process.exit(1);
}

if (!fs.existsSync(VIDEO_DIR)) {
  console.error(`Diretório não encontrado: ${path.relative(ROOT, VIDEO_DIR)}`);
  process.exit(1);
}

const mb = (bytes) => (bytes / 1048576).toFixed(1) + ' MB';

const alvos = fs
  .readdirSync(VIDEO_DIR)
  .filter((n) => n.toLowerCase().endsWith('.mp4'))
  // Não reprocessa o que este script já produziu.
  .filter((n) => !n.endsWith('-optimized.mp4'))
  .filter((n) => !ONLY || n === ONLY)
  .map((n) => {
    const abs = path.join(VIDEO_DIR, n);
    return { nome: n, abs, size: fs.statSync(abs).size };
  })
  .sort((a, b) => b.size - a.size);

if (!alvos.length) {
  console.log('Nenhum .mp4 para processar.');
  process.exit(0);
}

const totalAntes = alvos.reduce((a, v) => a + v.size, 0);
console.log(`${alvos.length} vídeo(s) · ${mb(totalAntes)} no total\n`);
for (const v of alvos) {
  const out = v.nome.replace(/\.mp4$/i, '-optimized.mp4');
  const jaTem = fs.existsSync(path.join(VIDEO_DIR, out));
  console.log(`  ${v.nome.slice(0, 70)}${v.nome.length > 70 ? '…' : ''}`);
  console.log(`    ${mb(v.size)}  ->  ${out.slice(0, 70)}${jaTem ? '  (já existe, será refeito)' : ''}`);
}

if (!APPLY) {
  console.log(`\nDry-run — nada foi processado.`);
  console.log(`Parâmetros atuais: CRF ${CRF}, largura máxima ${MAX_WIDTH}px.`);
  console.log(`Para processar:  node scripts/optimize-videos.js --apply`);
  process.exit(0);
}

exigirFfmpeg();

let totalDepois = 0;
let falhas = 0;

for (const v of alvos) {
  const base = v.nome.replace(/\.mp4$/i, '');
  const outVideo = path.join(VIDEO_DIR, `${base}-optimized.mp4`);
  const outPoster = path.join(VIDEO_DIR, `${base}-poster.jpg`);

  console.log(`\n▸ ${v.nome}  (${mb(v.size)})`);

  try {
    execFileSync(
      'ffmpeg',
      [
        '-y',
        '-i', v.abs,
        // só reduz; nunca faz upscale de um vídeo já menor que MAX_WIDTH
        '-vf', `scale='min(${MAX_WIDTH},iw)':-2`,
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-crf', CRF,
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '128k',
        // metadata no início do arquivo: o player começa a tocar sem baixar tudo
        '-movflags', '+faststart',
        outVideo,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'] }
    );
    const depois = fs.statSync(outVideo).size;
    totalDepois += depois;
    const reducao = (100 * (1 - depois / v.size)).toFixed(0);
    console.log(`  vídeo:  ${mb(depois)}  (−${reducao}%)`);
  } catch (e) {
    falhas++;
    console.error(`  FALHA no vídeo: ${String(e.stderr || e.message).split('\n').slice(-4).join('\n')}`);
    totalDepois += v.size;
    continue;
  }

  try {
    execFileSync(
      'ffmpeg',
      ['-y', '-ss', '1', '-i', v.abs, '-frames:v', '1', '-vf', "scale='min(1280,iw)':-2", '-q:v', '3', outPoster],
      { stdio: ['ignore', 'ignore', 'pipe'] }
    );
    console.log(`  poster: ${path.basename(outPoster)}  (${mb(fs.statSync(outPoster).size)})`);
  } catch {
    // Vídeo com menos de 1s de duração não tem frame nesse ponto — não é erro fatal.
    console.error(`  poster não gerado (vídeo curto demais para o corte em 1s?)`);
  }
}

console.log(`\n${mb(totalAntes)}  ->  ${mb(totalDepois)}`);
if (totalDepois < totalAntes) {
  console.log(`Redução: ${(100 * (1 - totalDepois / totalAntes)).toFixed(0)}%`);
}
if (falhas) console.log(`${falhas} vídeo(s) falharam.`);
console.log(`\nOs originais continuam intactos e o código ainda aponta para eles.`);
console.log(`Confira os -optimized.mp4 antes de trocar as referências.`);
