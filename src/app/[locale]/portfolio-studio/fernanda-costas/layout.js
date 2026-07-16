import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

const imageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  '@id': `https://housemazzutti.com/pt/portfolio-studio/fernanda-costas/#image`,
  name: 'Fernanda Costas | Studio — House Mazzutti',
  url: 'https://housemazzutti.com/images/studio/fernanda-costas/1.webp',
  contentUrl: 'https://housemazzutti.com/images/studio/fernanda-costas/1.webp',
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
    path: '/portfolio-studio/fernanda-costas',
    locale,
    title: 'Fernanda Costas | Studio — House Mazzutti',
    description: 'Fernanda Costas — fotografia de moda e direção de imagem pela House Mazzutti em São Paulo. Veja o ensaio completo.',
    image: {src: '/images/studio/fernanda-costas/1.webp', alt: 'Fernanda Costas — studio House Mazzutti'},
  })
}

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-studio/`},
    {name: 'Fernanda Costas', url: `${brand.url}/pt/portfolio-studio/fernanda-costas/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(imageSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
