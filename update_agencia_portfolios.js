import fs from 'fs';
import path from 'path';

const folders = ['knowhol', 'house-mazzutti', 'mabdo', 'on-take', 'pous', 'samrat'];
const baseDir = process.cwd();

const files = folders.map(f => `src/app/portfolio-agencia/${f}/page.js`);

files.forEach(fileRelPath => {
    const filePath = path.join(baseDir, fileRelPath);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping: ${fileRelPath} (not found)`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Update import
    content = content.replace(
        "import React, { useEffect } from 'react';",
        "import React, { useEffect, useState } from 'react';"
    );

    // 2. Add state and functions
    const stateFuncs = `
    const [selectedImg, setSelectedImg] = useState(null)
    const openImg = (src) => { setSelectedImg(src); document.body.style.overflow = 'hidden'; const h = document.querySelector('header'); if(h) h.style.display = 'none'; }
    const closeImg = () => { setSelectedImg(null); document.body.style.overflow = ''; const h = document.querySelector('header'); if(h) h.style.display = ''; }
`;
    // Find the export line
    const exportMatch = content.match(/export default function \w+Page\(\) \{/);
    if (exportMatch) {
        content = content.replace(exportMatch[0], exportMatch[0] + stateFuncs);
    }

    // 3. Update vertical images map (using regex to be flexible with alt)
    const verticalMapRegex = /\{verticalImages\.map\(\(src, i\) => \(\s+<div key=\{i\} className="image-anim relative overflow-hidden group">\s+<img alt="[^"]+" className="w-full grayscale hover:grayscale-0 transition-all duration-700" src=\{src\}\/>\s+<\/div>\s+\)\)\}/;
    const verticalReplacement = `{verticalImages.map((src, i) => (
                            <div key={i} className="image-anim relative overflow-hidden group cursor-pointer" onClick={() => openImg(src)} style={{maxHeight:'600px'}}>
                                <img alt="vertical" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src={src} style={{maxHeight:'600px'}}/>
                            </div>
                        ))}`;
    content = content.replace(verticalMapRegex, verticalReplacement);

    // 4. Update horizontal images map
    const horizontalMapRegex = /\{horizontalImages\.map\(\(src, i\) => \(\s+<div key=\{i\} className="image-anim relative overflow-hidden group">\s+<img alt="[^"]+" className="w-full grayscale hover:grayscale-0 transition-all duration-700" src=\{src\} style=\{\{aspectRatio:'16\/9', objectFit:'cover'\}\}\/>\s+<\/div>\s+\)\)\}/;
    const horizontalReplacement = `{horizontalImages.map((src, i) => (
                            <div key={i} className="image-anim relative overflow-hidden group cursor-pointer" onClick={() => openImg(src)}>
                                <img alt="horizontal" className="w-full grayscale hover:grayscale-0 transition-all duration-700" src={src} style={{aspectRatio:'16/9', objectFit:'cover'}}/>
                            </div>
                        ))}`;
    content = content.replace(horizontalMapRegex, horizontalReplacement);

    // 5. Add lightbox before last </div>
    const lightboxHtml = `
            {selectedImg && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={closeImg}>
                    <img src={selectedImg} className="max-h-screen max-w-screen object-contain" />
                </div>
            )}
`;
    // We want to insert it before the very last </div> which is before the closing };
    // Usually the last lines are:
    //         </div>
    //     );
    // }
    
    const lastDivMatch = content.lastIndexOf('</div>');
    if (lastDivMatch !== -1) {
        content = content.slice(0, lastDivMatch) + lightboxHtml + content.slice(lastDivMatch);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${fileRelPath}`);
});
console.log('Done.');
