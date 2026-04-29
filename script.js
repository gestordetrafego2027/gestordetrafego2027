const fs = require('fs');
const path = require('path');

const models = {
  'debora-pantaglione': 4,
  'ana-rockenbach': 5,
  'francine-massoco': 4,
  'jamile-caroline': 6,
  'jessica-bittelbrun': 4,
  'julia-moraes': 6,
  'anna-laura': 6,
  'gab-cruz': 13,
  'leticia-moraes': 10,
  'nataly-silva': 10,
  'patricia-marafon': 5,
  'poliana-barreto': 5,
  'sara-henriches': 8,
  'arielly': 5,
  'iasmim': 3,
  'maria-eduarda': 3,
  'vitoria-boidt': 6,
  'bruna-brummer': 5,
  'iza-feser': 4,
  'marina-machado': 5,
  'amanda-oliveira': 4,
  'ana-laura-saar': 5,
  'chai-e-dai': 5
};

const baseDir = path.join(process.cwd(), 'src/app/portfolio-studio');

Object.keys(models).forEach(slug => {
  const file = path.join(baseDir, slug, 'page.js');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const totalFotos = models[slug];
    
    const replacement = \<div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', width: '100%'}}>
  {[1,2,3,4,5,6,7,8,9,10,11,12,13].filter(n => n <= \).map(n => (
    <img key={n} src={\\\/images/studio/\/\\\\\.jpg\\\} alt={\\\Foto \\\\\\\\} style={{width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block'}} />
  ))}
</div>
                    </div>
                    {/* Content Sidebar */}\;
    
    const regex = /<div className="portfolio-grid">[\\s\\S]*?<\\/div>\\s*<\\/div>\\s*\\{\\/\\* Content Sidebar \\*\\/\\}/;
    
    if(regex.test(content)) {
        content = content.replace(regex, replacement);
        fs.writeFileSync(file, content);
        console.log('Updated ' + slug);
    } else {
        console.log('Regex not matched in ' + slug);
    }
  } else {
    console.log('File not found: ' + file);
  }
});
