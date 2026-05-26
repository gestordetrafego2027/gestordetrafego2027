#!/usr/bin/env node
/**
 * OTIMIZADOR DE IMAGENS — House Mazzutti
 * ========================================
 * Converte todas as imagens em /public/images para WebP.
 * Reduz tamanho sem perder nitidez visual.
 *
 * Pré-requisito: node_modules instalados (npm install)
 *
 * Uso:
 *   node scripts/optimize-images.cjs
 *
 * O que faz:
 *   - Converte .jpg / .jpeg / .png → .webp  (qualidade 82, max 1920px)
 *   - Cria cópia original em public/images-backup/
 *   - Atualiza todas as referências nos arquivos .js/.ts/.tsx da src/
 *   - Gera relatório ao final (redução total em MB)
 */

const path = require('path');
const fs   = require('fs');

// ── Configuração ──────────────────────────────────────────────────────────────
const CONFIG = {
  inputDir:    path.join(__dirname, '..', 'public', 'images'),
  backupDir:   path.join(__dirname, '..', 'public', 'images-backup'),
  sourceDir:   path.join(__dirname, '..', 'src'),
  quality:     82,
  maxWidth:    1920,
  maxHeight:   1920,
};

// ── Utilitários ───────────────────────────────────────────────────────────────
function walk(dir, exts = ['.jpg', '.jpeg', '.png']) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full, exts));
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function walkSource(dir, exts = ['.js', '.ts', '.tsx', '.jsx', '.mdx']) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      files = files.concat(walkSource(full, exts));
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function fmtSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('\n❌ sharp não encontrado. Execute: npm install\n');
    process.exit(1);
  }

  const images = walk(CONFIG.inputDir);
  console.log(`\n🖼  ${images.length} imagens encontradas em ${CONFIG.inputDir}\n`);

  let totalOriginal = 0;
  let totalConverted = 0;
  let converted = 0;
  let skipped = 0;
  const errors = [];

  for (const imgPath of images) {
    const rel = path.relative(CONFIG.inputDir, imgPath);
    const outRel = rel.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outPath = path.join(CONFIG.inputDir, outRel);
    const backupPath = path.join(CONFIG.backupDir, rel);

    // Skip if WebP already exists and is newer
    if (fs.existsSync(outPath)) {
      const origMtime = fs.statSync(imgPath).mtimeMs;
      const webpMtime = fs.statSync(outPath).mtimeMs;
      if (webpMtime >= origMtime) {
        skipped++;
        continue;
      }
    }

    try {
      const origSize = fs.statSync(imgPath).size;
      totalOriginal += origSize;

      // Backup original
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(imgPath, backupPath);
      }

      // Convert to WebP
      await sharp(imgPath)
        .resize({
          width: CONFIG.maxWidth,
          height: CONFIG.maxHeight,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: CONFIG.quality, effort: 4 })
        .toFile(outPath);

      const newSize = fs.statSync(outPath).size;
      totalConverted += newSize;
      const pct = Math.round((1 - newSize / origSize) * 100);
      console.log(`  ✓ ${rel} → ${outRel}  (−${pct}%)`);
      converted++;
    } catch (err) {
      console.error(`  ✗ ${rel}: ${err.message}`);
      errors.push(rel);
    }
  }

  // ── Update source references ───────────────────────────────────────────────
  console.log('\n📝 Atualizando referências no código-fonte...\n');
  const sourceFiles = walkSource(CONFIG.sourceDir);
  let refUpdates = 0;

  for (const srcFile of sourceFiles) {
    let content = fs.readFileSync(srcFile, 'utf8');
    const updated = content
      .replace(/(['"`])(\/images\/[^'"`\s]+?)\.(jpg|jpeg|png)(['"`\s?])/gi,
               (m, q1, base, ext, q2) => `${q1}${base}.webp${q2}`);
    if (updated !== content) {
      fs.writeFileSync(srcFile, updated, 'utf8');
      console.log(`  ✓ ${path.relative(process.cwd(), srcFile)}`);
      refUpdates++;
    }
  }

  // ── Report ─────────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log(`✅ Imagens convertidas : ${converted}`);
  console.log(`⏭  Já convertidas (skip): ${skipped}`);
  if (errors.length) console.log(`❌ Erros              : ${errors.length}`);
  console.log(`📁 Referências atualizadas: ${refUpdates} arquivos`);
  if (totalOriginal > 0) {
    const saved = totalOriginal - totalConverted;
    const pct = Math.round((saved / totalOriginal) * 100);
    console.log(`\n💾 Tamanho original  : ${fmtSize(totalOriginal)}`);
    console.log(`💾 Tamanho WebP      : ${fmtSize(totalConverted)}`);
    console.log(`🎉 Economia total    : ${fmtSize(saved)} (−${pct}%)`);
  }
  console.log('─'.repeat(60));
  console.log('\n⚠️  Arquivos originais salvos em: public/images-backup/');
  console.log('   Após verificar o site, pode deletar este backup.\n');
}

main().catch(console.error);
