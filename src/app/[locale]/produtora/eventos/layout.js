import {pageMetadata} from '@/lib/seo/metadata'
import {eventosServiceSchema, eventosFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/produtora/eventos',
  title: 'Produção e Cobertura de Eventos em São Paulo | House Mazzutti',
  description:
    'Cobertura fotográfica, videográfica, transmissão ao vivo e captação aérea para eventos com direção editorial. Três formatos. House Mazzutti — São Paulo.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
    {name: 'Eventos', url: `${brand.url}/pt/produtora/eventos/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(eventosServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(eventosFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
