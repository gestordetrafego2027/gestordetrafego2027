import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

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
        const inputBuffer = fs.readFileSync(filePath);
        const buffer = await sharp(inputBuffer)
          .resize(800, null, { withoutEnlargement: true })
          .jpeg({ quality: 50, progressive: true })
          .toBuffer();
        fs.writeFileSync(filePath, buffer);
        console.log('OK:', filePath);
      } catch (err) {
        console.error('ERRO:', filePath, err.message);
      }
    }
  }
}

optimizeDir('public/images/produtora/acessorios').catch(console.error);
