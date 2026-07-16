import {pageMetadata} from '@/lib/seo/metadata'
import {coberturaServiceSchema, coberturaFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/studio/cobertura',
  title: 'Cobertura Fotográfica em São Paulo | House Mazzutti',
  description:
    'Cobertura fotográfica e audiovisual de eventos em São Paulo com direção de imagem da House Mazzutti. Registro editorial, não só foto de evento.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Studio', url: `${brand.url}/pt/studio/`},
    {name: 'Cobertura', url: `${brand.url}/pt/studio/cobertura/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(coberturaServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(coberturaFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
