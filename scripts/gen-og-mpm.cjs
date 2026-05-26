const sharp = require('sharp');
(async () => {
  const cover = await sharp('public/images/academy/marketing-para-modelos/cover.png')
    .resize({ height: 520, fit: 'inside' })
    .png()
    .toBuffer();

  const svg = `<svg width='1200' height='630' xmlns='http://www.w3.org/2000/svg'>
<rect width='1200' height='630' fill='#a4e80a'/>
<text x='80' y='150' font-family='Georgia, serif' font-style='italic' font-size='84' font-weight='400' fill='#14140e'>Marketing</text>
<text x='80' y='240' font-family='Georgia, serif' font-style='italic' font-size='84' font-weight='400' fill='#14140e'>para Modelos.</text>
<text x='80' y='320' font-family='Georgia, serif' font-style='italic' font-size='34' fill='#14140e' opacity='0.85'>Da passarela física ao império digital.</text>
<text x='80' y='510' font-family='Helvetica, Arial, sans-serif' font-size='18' letter-spacing='4' fill='#14140e' opacity='0.7'>HOUSE MAZZUTTI ACADEMY · VOL. 01 · 2026</text>
<rect x='80' y='540' width='40' height='4' fill='#c92a2a'/>
<rect x='120' y='540' width='40' height='4' fill='#f0b400'/>
<rect x='160' y='540' width='80' height='4' fill='#1e3a8a'/>
<rect x='240' y='540' width='40' height='4' fill='#14140e'/>
</svg>`;

  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#a4e80a' } })
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: cover, top: 55, left: 750 },
    ])
    .png()
    .toFile('public/images/academy/marketing-para-modelos/og-image.png');

  await sharp('public/images/academy/marketing-para-modelos/og-image.png')
    .webp({ quality: 90 })
    .toFile('public/images/academy/marketing-para-modelos/og-image.webp');

  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });
