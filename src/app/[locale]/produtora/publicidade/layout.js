import {pageMetadata} from '@/lib/seo/metadata'
import {publicidadeServiceSchema, publicidadeFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/produtora/publicidade',
  title: 'Produção Publicitária em São Paulo | House Mazzutti',
  description:
    'Produtora de publicidade em São Paulo: campanhas e filmes com governança criativa do briefing à entrega. Conceito que performa, produção sob controle.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
    {name: 'Publicidade', url: `${brand.url}/pt/produtora/publicidade/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(publicidadeServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(publicidadeFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
