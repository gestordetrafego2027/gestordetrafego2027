import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

const imageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  '@id': `https://housemazzutti.com/pt/portfolio-studio/sara-henriches/#image`,
  name: 'Sara Henriches | Studio — House Mazzutti',
  url: 'https://housemazzutti.com/images/studio/sara-henriches/1.webp',
  contentUrl: 'https://housemazzutti.com/images/studio/sara-henriches/1.webp',
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
    path: '/portfolio-studio/sara-henriches',
    locale,
    title: 'Sara Henriches | Studio — House Mazzutti',
    description: 'Sara Henriches — fotografia de moda e direção de imagem pela House Mazzutti em São Paulo. Veja o ensaio completo.',
    image: {src: '/images/studio/sara-henriches/1.webp', alt: 'Sara Henriches — studio House Mazzutti'},
  })
}

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-studio/`},
    {name: 'Sara Henriches', url: `${brand.url}/pt/portfolio-studio/sara-henriches/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(imageSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
