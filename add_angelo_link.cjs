const fs = require('fs');
const files = [
  'src/app/page.js',
  'src/app/about/page.js',
  'src/app/studio/page.js',
  'src/app/portfolio/page.js',
  'src/app/contato/page.js'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Insere ANGELO antes do link de PORTFÓLIO (apenas primeira ocorrência — no header)
  const regex = /(<Link className="([^"]+)" href="\/agencia">AGÊNCIA<\/Link>)(\s*\n\s*)(<Link className="[^"]+" href="\/portfolio">PORTFÓLIO<\/Link>)/;

  if (regex.test(content)) {
    content = content.replace(regex, (match, agenciaLink, cls, space, portfolioLink) => {
      return `${agenciaLink}${space}<Link className="${cls}" href="/angelo">ANGELO</Link>${space}${portfolioLink}`;
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log('Atualizado: ' + file);
  } else {
    console.log('AVISO - padrão não encontrado em: ' + file);
  }
});
