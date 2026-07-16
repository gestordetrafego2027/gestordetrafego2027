import {pageMetadata} from '@/lib/seo/metadata'
import {rpServiceSchema, rpFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/agencia/rp',
  title: 'RP & Marketing Direto em São Paulo | House Mazzutti',
  description:
    'Assessoria de imprensa, relações públicas e marketing direto para marcas que constroem reputação com presença consistente nos lugares certos. House Mazzutti — São Paulo.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Agência', url: `${brand.url}/pt/agencia/`},
    {name: 'RP', url: `${brand.url}/pt/agencia/rp/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(rpServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(rpFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
