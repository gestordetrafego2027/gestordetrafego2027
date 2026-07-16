import {pageMetadata} from '@/lib/seo/metadata'
import {webServiceSchema, webFaqSchema, breadcrumbSchema, speakableSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/agencia/web',
  title: 'Sites e Web Design em São Paulo | House Mazzutti',
  description:
    'Desenvolvimento web e landing pages orientados à conversão em São Paulo. Sites que carregam a marca com precisão e transformam visita em decisão.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Agência', url: `${brand.url}/pt/agencia/`},
    {name: 'Web', url: `${brand.url}/pt/agencia/web/`},
  ])
  const speakable = speakableSchema(`${brand.url}/pt/agencia/web/`, ['h1', '.hero-title', '.hero-description', '.speakable'])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(webServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(webFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(speakable)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
