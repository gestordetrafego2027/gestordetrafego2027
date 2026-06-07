/**
 * Gera layout.js com generateMetadata para páginas de portfolio
 * que não têm metadata própria. Executa uma vez.
 */
import { readdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = 'src/app/[locale]';

const SECTIONS = [
  {
    dir: 'portfolio-agencia',
    section: 'Agência',
    type: 'Branding e Identidade Visual',
    desc: (name) => `Projeto ${name} — branding e identidade visual desenvolvidos pela House Mazzutti em São Paulo. Veja o case completo.`,
  },
  {
    dir: 'portfolio-produtora',
    section: 'Produtora',
    type: 'Direção de Imagem',
    desc: (name) => `Produção fotográfica ${name} — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.`,
  },
  {
    dir: 'portfolio-studio',
    section: 'Studio',
    type: 'Fotografia e Studio',
    desc: (name) => `Ensaio ${name} — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.`,
  },
];

function toTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

let created = 0;
let skipped = 0;

for (const { dir, section, type, desc } of SECTIONS) {
  const sectionPath = join(BASE, dir);
  const entries = readdirSync(sectionPath, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('[') && e.name !== 'node_modules');

  for (const entry of entries) {
    const slug = entry.name;
    const layoutPath = join(sectionPath, slug, 'layout.js');
    const pagePath = join(sectionPath, slug, 'page.js');

    // Só gera se existir page.js e não existir layout.js
    if (!existsSync(pagePath) || existsSync(layoutPath)) {
      skipped++;
      continue;
    }

    const name = toTitle(slug);
    const title = `${name} | ${section} — House Mazzutti`;
    const description = desc(name);

    const content = `import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/${dir}/${slug}',
    locale,
    title: '${title}',
    description: '${description}',
  })
}

export default function Layout({children}) {
  return children
}
`;

    writeFileSync(layoutPath, content);
    console.log(`✓ ${dir}/${slug}/layout.js`);
    created++;
  }
}

console.log(`\nCriados: ${created} | Ignorados: ${skipped}`);
