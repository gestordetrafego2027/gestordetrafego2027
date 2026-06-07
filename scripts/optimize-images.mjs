import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname } from 'path';

const DIRS = ['public/images/agencia', 'public/images/produtora', 'public/images/studio'];
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 75;
const JPEG_QUALITY = 80;
const MIN_SIZE_BYTES = 150 * 1024; // só recomprime se >150KB

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walkDir(full));
    else if (/\.(webp|jpe?g)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function run() {
  let totalBefore = 0, totalAfter = 0, count = 0;

  for (const dir of DIRS) {
    const files = await walkDir(dir);
    for (const file of files) {
      const { size } = await stat(file);
      if (size < MIN_SIZE_BYTES) continue;

      const ext = extname(file).toLowerCase();
      const isJpeg = ext === '.jpg' || ext === '.jpeg';

      try {
        const img = sharp(file);
        const meta = await img.metadata();

        let pipeline = img;
        if (meta.width > MAX_WIDTH) {
          pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
        }

        const tmp = file + '.tmp';
        if (isJpeg) {
          await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true }).toFile(tmp);
        } else {
          await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(tmp);
        }

        const { size: newSize } = await stat(tmp);
        if (newSize < size) {
          await rename(tmp, file);
          totalBefore += size;
          totalAfter += newSize;
          count++;
          const saved = Math.round((1 - newSize / size) * 100);
          console.log(`✓ ${file.replace('public/', '')} ${Math.round(size/1024)}KB → ${Math.round(newSize/1024)}KB (-${saved}%)`);
        } else {
          // original era melhor, descarta tmp
          await rename(tmp, file + '.discard');
          await (await import('fs')).promises.unlink(file + '.discard').catch(() => {});
        }
      } catch (e) {
        console.error(`✗ ${file}: ${e.message}`);
      }
    }
  }

  console.log(`\n✅ ${count} imagens otimizadas`);
  console.log(`   Antes: ${Math.round(totalBefore/1024/1024)}MB`);
  console.log(`   Depois: ${Math.round(totalAfter/1024/1024)}MB`);
  console.log(`   Economizado: ${Math.round((totalBefore-totalAfter)/1024/1024)}MB (${Math.round((1-totalAfter/totalBefore)*100)}%)`);
}

run();
