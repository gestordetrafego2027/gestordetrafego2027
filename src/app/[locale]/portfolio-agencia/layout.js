import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-agencia',
    locale,
    title: 'Portfólio Agência — Branding e Marcas | House Mazzutti',
    description:
      'Portfólio da Agência House Mazzutti: branding, identidade visual e projetos de marca em São Paulo. Cases de marcas que escolheram intenção.',
  })
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${brand.url}/pt/portfolio-agencia/#collection`,
  name: 'Portfólio Agência — House Mazzutti',
  description: 'Portfólio da Agência House Mazzutti: branding, identidade visual e projetos de marca em São Paulo.',
  url: `${brand.url}/pt/portfolio-agencia/`,
  about: {'@type': 'Service', '@id': `${brand.url}/pt/agencia/#service`},
  creator: {'@id': `${brand.url}/#organization`},
  inLanguage: 'pt-BR',
}

export default function PortfolioAgenciaLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio/`},
    {name: 'Agência', url: `${brand.url}/pt/portfolio-agencia/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(collectionSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
