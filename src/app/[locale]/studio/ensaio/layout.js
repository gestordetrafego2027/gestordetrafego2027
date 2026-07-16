import {pageMetadata} from '@/lib/seo/metadata'
import {ensaioServiceSchema, ensaioFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/studio/ensaio',
  title: 'Ensaio Fotográfico em São Paulo | House Mazzutti',
  description:
    'Ensaio fotográfico pessoal e editorial em São Paulo. Direção de imagem autoral para que sua presença seja vista com a clareza que merece.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Studio', url: `${brand.url}/pt/studio/`},
    {name: 'Ensaio', url: `${brand.url}/pt/studio/ensaio/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ensaioServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ensaioFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
