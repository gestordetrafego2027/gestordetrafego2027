import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

sharp.cache(false);

async function optimizeDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await optimizeDir(filePath);
    } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
      try {
        const buffer = await sharp(filePath)
          .resize(1200, null, { withoutEnlargement: true })
          .jpeg({ quality: 60, progressive: true })
          .toBuffer();
        fs.writeFileSync(filePath, buffer);
        console.log('Otimizado:', filePath);
      } catch (err) {
        console.error('Erro ao otimizar:', filePath, err.message);
      }
    }
  }
}

optimizeDir('public/images').catch(console.error);
