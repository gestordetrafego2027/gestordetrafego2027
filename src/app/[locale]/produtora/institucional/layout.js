import {pageMetadata} from '@/lib/seo/metadata'
import {institucionalServiceSchema, institucionalFaqSchema, breadcrumbSchema, speakableSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/produtora/institucional',
  title: 'Vídeo Institucional em São Paulo | House Mazzutti',
  description:
    'Produção de vídeo institucional em São Paulo com direção criativa e produção executiva premium. Conte a história da sua empresa com intenção.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Produtora', url: `${brand.url}/pt/produtora/`},
    {name: 'Institucional', url: `${brand.url}/pt/produtora/institucional/`},
  ])
  const speakable = speakableSchema(`${brand.url}/pt/produtora/institucional/`, ['h1', '.hero-title', '.hero-description', '.speakable'])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(institucionalServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(institucionalFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(speakable)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
