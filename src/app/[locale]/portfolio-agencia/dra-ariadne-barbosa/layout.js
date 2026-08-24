import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

const creativeWorkSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${brand.url}/pt/portfolio-agencia/dra-ariadne-barbosa/#work`,
  name: 'Dra Ariadne Barbosa — Branding | House Mazzutti',
  url: `${brand.url}/pt/portfolio-agencia/dra-ariadne-barbosa/`,
  image: 'https://housemazzutti.com/images/agencia/dra-ariadne-barbosa/dra-ariadne-barbosa-logo-branding-manual-de-marca-identidade-visual-house-mazzutti-agencia-01.webp',
  creator: {'@id': `${brand.url}/#organization`},
  author: {'@id': `${brand.url}/pt/angelo/#angelo`},
  publisher: {'@id': `${brand.url}/#organization`},
  about: {'@type': 'Service', '@id': `${brand.url}/pt/agencia/#service`},
  inLanguage: 'pt-BR',
}

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-agencia/dra-ariadne-barbosa',
    locale,
    title: 'Dra Ariadne Barbosa | Agência — House Mazzutti',
    description: 'Dra Ariadne Barbosa — branding e identidade visual desenvolvidos pela House Mazzutti em São Paulo. Veja o case completo.',
  })
}

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-agencia/`},
    {name: 'Dra Ariadne Barbosa', url: `${brand.url}/pt/portfolio-agencia/dra-ariadne-barbosa/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(creativeWorkSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
