import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

const imageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  '@id': `https://housemazzutti.com/pt/portfolio-studio/vitoria-boidt/#image`,
  name: 'Vitoria Boidt | Studio — House Mazzutti',
  url: 'https://housemazzutti.com/images/studio/vitoria-boidt/1.webp',
  contentUrl: 'https://housemazzutti.com/images/studio/vitoria-boidt/1.webp',
  creator: {'@id': `${brand.url}/#organization`},
  author: {'@id': `${brand.url}/pt/angelo/#angelo`},
  publisher: {'@id': `${brand.url}/#organization`},
  inLanguage: 'pt-BR',
  license: `${brand.url}/pt/politicas/`,
  acquireLicensePage: `${brand.url}/pt/contato/`,
}

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/vitoria-boidt',
    locale,
    title: 'Vitoria Boidt | Studio — House Mazzutti',
    description: 'Vitoria Boidt — fotografia de moda e direção de imagem pela House Mazzutti em São Paulo. Veja o ensaio completo.',
    image: {src: '/images/studio/vitoria-boidt/1.webp', alt: 'Vitoria Boidt — studio House Mazzutti'},
  })
}

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-studio/`},
    {name: 'Vitoria Boidt', url: `${brand.url}/pt/portfolio-studio/vitoria-boidt/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(imageSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
