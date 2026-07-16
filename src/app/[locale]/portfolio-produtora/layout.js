import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora',
    locale,
    title: 'Portfólio Produtora — Moda e Campanhas | House Mazzutti',
    description:
      'Portfólio da Produtora House Mazzutti: moda, beleza, campanhas e fashion films em São Paulo. Produção premium do conceito ao master.',
  })
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${brand.url}/pt/portfolio-produtora/#collection`,
  name: 'Portfólio Produtora — House Mazzutti',
  description: 'Portfólio da Produtora House Mazzutti: moda, beleza, campanhas e fashion films em São Paulo.',
  url: `${brand.url}/pt/portfolio-produtora/`,
  about: {'@type': 'Service', '@id': `${brand.url}/pt/produtora/#service`},
  creator: {'@id': `${brand.url}/#organization`},
  inLanguage: 'pt-BR',
}

export default function PortfolioProdutoraLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio/`},
    {name: 'Produtora', url: `${brand.url}/pt/portfolio-produtora/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(collectionSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
