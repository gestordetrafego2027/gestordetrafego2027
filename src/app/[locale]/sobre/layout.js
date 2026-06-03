import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

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
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
