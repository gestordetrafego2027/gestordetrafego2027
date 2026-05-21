const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videoDir = path.join(process.cwd(), 'public', 'videos');
const files = fs.readdirSync(videoDir);

files.forEach(file => {
  if (file.endsWith('.mp4') && !file.includes('-optimized') && !file.includes('-original')) {
    const inputPath = path.join(videoDir, file);
    const parsed = path.parse(inputPath);
    
    const posterPath = path.join(videoDir, `${parsed.name}-poster.jpg`);
    const optimizedPath = path.join(videoDir, `${parsed.name}-optimized.mp4`);

    console.log(`\n=== Otimizando ${file} ===`);

    // 1. Generate Poster
    if (!fs.existsSync(posterPath)) {
        console.log(`Gerando poster (primeiro frame) para ${file}...`);
        try {
            execSync(`ffmpeg -i "${inputPath}" -ss 00:00:00.100 -vframes 1 "${posterPath}" -y`, { stdio: 'pipe' });
            console.log(`✅ Poster gerado: ${parsed.name}-poster.jpg`);
        } catch (e) {
            console.error('❌ Erro ao gerar poster. Certifique-se de ter o ffmpeg instalado.');
        }
    } else {
        console.log(`✅ Poster já existe: ${parsed.name}-poster.jpg`);
    }

    // 2. Optimize Video (H.264 Faststart)
    // Faststart move as metadados "moov" para o começo do arquivo, permitindo tocar sem baixar tudo.
    if (!fs.existsSync(optimizedPath)) {
        console.log(`Aplicando compressão e faststart em ${file}... (isso pode demorar)`);
        try {
            execSync(`ffmpeg -i "${inputPath}" -vcodec libx264 -crf 28 -preset fast -movflags +faststart -an "${optimizedPath}" -y`, { stdio: 'pipe' });
            
            // Faz backup do original e renomeia o otimizado
            fs.renameSync(inputPath, path.join(videoDir, `${parsed.name}-original.mp4`));
            fs.renameSync(optimizedPath, inputPath);
            console.log(`✅ Vídeo otimizado e substituído. Original salvo como ${parsed.name}-original.mp4`);
        } catch (e) {
            console.error('❌ Erro ao otimizar vídeo. Certifique-se de ter o ffmpeg instalado.');
        }
    } else {
        console.log(`✅ Vídeo já otimizado.`);
    }
  }
});

console.log('\nProcesso finalizado.');
