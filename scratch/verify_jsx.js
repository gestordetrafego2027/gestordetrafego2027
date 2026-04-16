
import fs from 'fs';
const content = fs.readFileSync('c:/Users/almeida/Documents/house-mazzutti-v2/src/app/comunidade/page.js', 'utf8');

const lines = content.split('\n');
let level = 1; // Starting level 1 for the <div> at line 64
lines.slice(64).forEach((line, i) => {
    const lineNum = i + 65; 
    const divOpeningCount = (line.match(/<div(\s|>)/g) || []).length;
    const divClosingCount = (line.match(/<\/div>/g) || []).length;
    const sectionOpeningCount = (line.match(/<section(\s|>)/g) || []).length;
    const sectionClosingCount = (line.match(/<\/section>/g) || []).length;
    const mainOpeningCount = (line.match(/<main(\s|>)/g) || []).length;
    const mainClosingCount = (line.match(/<\/main>/g) || []).length;

    if (divOpeningCount > 0 || divClosingCount > 0 || sectionOpeningCount > 0 || sectionClosingCount > 0 || mainOpeningCount > 0 || mainClosingCount > 0) {
        level += divOpeningCount - divClosingCount + sectionOpeningCount - sectionClosingCount + mainOpeningCount - mainClosingCount;
        console.log(`${lineNum}: [Level ${level}] ${line.trim()}`);
    }
});
