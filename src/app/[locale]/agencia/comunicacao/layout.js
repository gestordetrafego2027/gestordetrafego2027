import {pageMetadata} from '@/lib/seo/metadata'
import {comunicacaoServiceSchema, comunicacaoFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/agencia/comunicacao',
  title: 'Comunicação de Marca em São Paulo | House Mazzutti',
  description:
    'Estratégia e comunicação de marca em São Paulo: conteúdo, social e campanhas com direção criativa. Presença que posiciona, não só aparece.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Agência', url: `${brand.url}/pt/agencia/`},
    {name: 'Comunicação', url: `${brand.url}/pt/agencia/comunicacao/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(comunicacaoServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(comunicacaoFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
