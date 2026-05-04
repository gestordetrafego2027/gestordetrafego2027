import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirs = [
  'public/images/home',
  'public/images/agencia/banners',
  'public/images/produtora/banners',
  'public/images/studio/banners'
];

async function optimize() {
  for (const dir of dirs) {
    const absoluteDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absoluteDir)) {
      console.log(`Directory not found: ${dir}`);
      continue;
    }

    const files = fs.readdirSync(absoluteDir).filter(f => f.endsWith('.jpg'));
    for (const file of files) {
      const fp = path.join(absoluteDir, file);
      console.log(`Optimizing: ${fp}`);
      try {
        const buf = await sharp(fp)
          .resize(1920, null, { withoutEnlargement: true })
          .jpeg({ quality: 85 })
          .toBuffer();
        fs.writeFileSync(fp, buf);
        console.log(`Done: ${file}`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }
  console.log('All optimizations finished.');
}

optimize();
