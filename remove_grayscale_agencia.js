import fs from 'fs';
import path from 'path';

const folders = ['knowhol', 'house-mazzutti', 'mabdo', 'on-take', 'pous', 'samrat'];
const baseDir = process.cwd();

const files = folders.map(f => `src/app/portfolio-agencia/${f}/page.js`);

files.forEach(fileRelPath => {
    const filePath = path.join(baseDir, fileRelPath);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    const target1 = 'className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"';
    const replacement1 = 'className="w-full h-full object-cover transition-all duration-700"';

    const target2 = 'className="w-full grayscale hover:grayscale-0 transition-all duration-700"';
    const replacement2 = 'className="w-full transition-all duration-700"';

    content = content.split(target1).join(replacement1);
    content = content.split(target2).join(replacement2);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${fileRelPath}`);
});
console.log('Done.');
