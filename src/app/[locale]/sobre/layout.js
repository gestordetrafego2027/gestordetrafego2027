import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand, timeline, leadership} from '@/config/site'

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${brand.url}/pt/sobre/#aboutpage`,
  url: `${brand.url}/pt/sobre/`,
  name: 'Sobre a House Mazzutti',
  description:
    'Casa criativa de direção criativa, branding e produção de imagem em São Paulo, fundada em 2016. Estratégia, imagem e presença com intenção.',
  about: {
    '@type': 'Organization',
    '@id': `${brand.url}/#organization`,
    name: brand.name,
    foundingDate: String(timeline.foundedYear),
    founder: {
      '@type': 'Person',
      '@id': `${brand.url}/pt/angelo/#angelo`,
      name: leadership.angelo.name,
      jobTitle: leadership.angelo.role,
    },
  },
  mainEntity: {'@id': `${brand.url}/#organization`},
  inLanguage: 'pt-BR',
}

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/sobre',
    locale,
    title: 'Sobre a House Mazzutti — Casa Criativa em São Paulo',
    description:
      'Quem é a House Mazzutti: casa criativa de direção criativa, branding e produção de imagem em São Paulo, fundada em 2016. Estratégia, imagem e presença com intenção.',
  })
}

export default function SobreLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Sobre', url: `${brand.url}/pt/sobre/`},
  ])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(aboutPageSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
