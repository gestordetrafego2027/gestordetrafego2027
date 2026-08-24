import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

const creativeWorkSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${brand.url}/pt/portfolio-agencia/on-take/#work`,
  name: 'On Take — Branding | House Mazzutti',
  url: `${brand.url}/pt/portfolio-agencia/on-take/`,
  image: 'https://housemazzutti.com/images/agencia/on-take/2.webp',
  creator: {'@id': `${brand.url}/#organization`},
  author: {'@id': `${brand.url}/pt/angelo/#angelo`},
  publisher: {'@id': `${brand.url}/#organization`},
  about: {'@type': 'Service', '@id': `${brand.url}/pt/agencia/#service`},
  inLanguage: 'pt-BR',
}

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-agencia/on-take',
    locale,
    title: 'On Take | Agência — House Mazzutti',
    description: 'On Take — branding e identidade visual desenvolvidos pela House Mazzutti em São Paulo. Veja o case completo.',
  })
}

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-agencia/`},
    {name: 'On Take', url: `${brand.url}/pt/portfolio-agencia/on-take/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(creativeWorkSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
