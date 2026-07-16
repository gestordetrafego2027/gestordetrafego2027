import {pageMetadata} from '@/lib/seo/metadata'
import {modaServiceSchema, modaFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/produtora/moda',
  title: 'Produtora de Moda em São Paulo | House Mazzutti',
  description:
    'Produtora de moda e fashion films em São Paulo: campanhas, editoriais e direção de arte. Da concepção ao master final, com produção sob controle.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
    {name: 'Moda', url: `${brand.url}/pt/produtora/moda/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(modaServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(modaFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
