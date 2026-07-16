import {pageMetadata} from '@/lib/seo/metadata'
import {direcaoServiceSchema, direcaoFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/produtora/direcao',
  title: 'Direção & Criação Estratégica em São Paulo | House Mazzutti',
  description:
    'Liderança criativa, videografia, fotografia e narrativa publicitária para projetos onde o conceito precisa chegar intacto ao resultado. House Mazzutti Produtora — São Paulo.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
    {name: 'Direção & Criação', url: `${brand.url}/pt/produtora/direcao/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(direcaoServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(direcaoFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
