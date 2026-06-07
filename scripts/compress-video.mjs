import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { statSync } from 'fs';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const INPUT  = 'public/videos/house-mazzutti-fashion-film-hero.mp4';
const OUTPUT = 'public/videos/house-mazzutti-fashion-film-hero-opt.mp4';

const beforeMB = (statSync(INPUT).size / 1024 / 1024).toFixed(1);
console.log(`Comprimindo ${INPUT} (${beforeMB} MB)...`);

ffmpeg(INPUT)
  // H.264, CRF 28 = boa qualidade visual para web, reduz ~60-70% do tamanho
  .videoCodec('libx264')
  .addOption('-crf', '28')
  .addOption('-preset', 'slow')
  // Escala para 1280px de largura máxima mantendo proporção
  .addOption('-vf', 'scale=1280:-2')
  // Remove audio (vídeo hero é mudo)
  .noAudio()
  // Compatibilidade web (faststart move moov atom para o início)
  .addOption('-movflags', '+faststart')
  .output(OUTPUT)
  .on('progress', (p) => process.stdout.write(`\r  ${Math.round(p.percent || 0)}%`))
  .on('end', () => {
    const afterMB = (statSync(OUTPUT).size / 1024 / 1024).toFixed(1);
    const saved = Math.round((1 - afterMB / beforeMB) * 100);
    console.log(`\n✓ ${beforeMB}MB → ${afterMB}MB (-${saved}%)`);
    console.log(`\nSubstitua o original:\n  mv ${OUTPUT} ${INPUT}`);
  })
  .on('error', (err) => console.error('Erro:', err.message))
  .run();
