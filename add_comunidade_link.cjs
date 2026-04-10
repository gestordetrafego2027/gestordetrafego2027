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

  // Insere COMUNIDADE antes do link de PORTFÓLIO (após ANGELO)
  const regex = /(<Link className="([^"]+)" href="\/angelo">ANGELO<\/Link>)(\s*\n\s*)(<Link className="[^"]+" href="\/portfolio">PORTFÓLIO<\/Link>)/;

  if (regex.test(content)) {
    content = content.replace(regex, (match, angeloLink, cls, space, portfolioLink) => {
      return `${angeloLink}${space}<Link className="${cls}" href="/comunidade">COMUNIDADE</Link>${space}${portfolioLink}`;
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log('Atualizado: ' + file);
  } else {
    console.log('AVISO - padrão não encontrado em: ' + file);
  }
});
