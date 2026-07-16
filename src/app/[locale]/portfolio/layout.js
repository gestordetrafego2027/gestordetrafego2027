import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio',
    locale,
    title: 'Portfólio House Mazzutti — Books, Campanhas e Marcas',
    description:
      'Trabalhos selecionados de book, campanha de moda e beleza e branding dirigidos pela House Mazzutti em São Paulo.',
  })
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${brand.url}/pt/portfolio/#collection`,
  name: 'Portfólio House Mazzutti',
  description: 'Trabalhos selecionados de book, campanha de moda e beleza e branding dirigidos pela House Mazzutti em São Paulo.',
  url: `${brand.url}/pt/portfolio/`,
  about: {'@id': `${brand.url}/#organization`},
  creator: {'@id': `${brand.url}/#organization`},
  inLanguage: 'pt-BR',
}

export default function PortfolioLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(collectionSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
