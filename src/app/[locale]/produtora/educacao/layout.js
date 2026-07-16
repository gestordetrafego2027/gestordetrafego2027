import {pageMetadata} from '@/lib/seo/metadata'
import {educacaoServiceSchema, educacaoFaqSchema, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/produtora/educacao',
  title: 'Produção de Conteúdo Educacional | House Mazzutti Produtora',
  description:
    'Videoaulas, treinamentos corporativos e cases de sucesso com direção editorial. Conhecimento bem produzido que muda percepção. House Mazzutti — São Paulo.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
    {name: 'Conteúdo Educacional', url: `${brand.url}/pt/produtora/educacao/`},
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(educacaoServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(educacaoFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
