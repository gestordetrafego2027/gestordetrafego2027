import {pageMetadata} from '@/lib/seo/metadata'
import {executivaServiceSchema, executivaFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/produtora/executiva',
  title: 'Produção Executiva 360° em São Paulo | House Mazzutti',
  description:
    'Inteligência operacional para campanhas complexas — cinco núcleos curados: Direção & Criação, Audiovisual, Moda & Beleza, Casting & Influência, Produção & Estrutura. House Mazzutti.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
    {name: 'Produção Executiva', url: `${brand.url}/pt/produtora/executiva/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(executivaServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(executivaFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
