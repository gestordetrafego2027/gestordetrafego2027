import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio',
    locale,
    title: 'Portfólio Studio — Books e Ensaios | House Mazzutti',
    description:
      'Portfólio do Studio House Mazzutti: books, ensaios e direção de imagem pessoal em São Paulo. Veja o trabalho que define presença.',
  })
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${brand.url}/pt/portfolio-studio/#collection`,
  name: 'Portfólio Studio — House Mazzutti',
  description: 'Portfólio do Studio House Mazzutti: books, ensaios e direção de imagem pessoal em São Paulo.',
  url: `${brand.url}/pt/portfolio-studio/`,
  about: {'@type': 'Service', '@id': `${brand.url}/pt/studio/#service`},
  creator: {'@id': `${brand.url}/#organization`},
  inLanguage: 'pt-BR',
}

export default function PortfolioStudioLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio/`},
    {name: 'Studio', url: `${brand.url}/pt/portfolio-studio/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(collectionSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
