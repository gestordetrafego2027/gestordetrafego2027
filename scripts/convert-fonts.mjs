// Converte todos os .otf/.ttf em public/fonts para .woff2 usando ttf2woff2
import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { execSync } from 'child_process';

const FONTS_DIR = 'public/fonts';

const files = await readdir(FONTS_DIR);
const fontFiles = files.filter(f => /\.(otf|ttf)$/i.test(f));

console.log(`Converting ${fontFiles.length} font files to WOFF2...\n`);

for (const file of fontFiles) {
  const input = join(FONTS_DIR, file);
  const output = join(FONTS_DIR, basename(file, extname(file)) + '.woff2');

  if (existsSync(output)) {
    console.log(`⏭  ${file} → already exists`);
    continue;
  }

  try {
    // ttf2woff2 reads stdin, writes stdout
    execSync(`node -e "
      const ttf2woff2 = require('ttf2woff2');
      const fs = require('fs');
      const input = fs.readFileSync('${input}');
      const output = ttf2woff2(input);
      fs.writeFileSync('${output}', output);
    "`);

    const { statSync } = await import('fs');
    const before = statSync(input).size;
    const after = statSync(output).size;
    const saved = Math.round((1 - after / before) * 100);
    console.log(`✓  ${file} → ${basename(output)} (${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB, -${saved}%)`);
  } catch (e) {
    console.error(`✗  ${file}: ${e.message}`);
  }
}

console.log('\nDone. Update globals.css to reference .woff2 files.');
