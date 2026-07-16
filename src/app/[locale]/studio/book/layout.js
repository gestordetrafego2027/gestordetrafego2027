import {pageMetadata} from '@/lib/seo/metadata'
import {bookServiceSchema, bookFaqSchema, breadcrumbSchema, speakableSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export const metadata = pageMetadata({
  path: '/studio/book',
  title: 'Book Fotográfico em São Paulo | House Mazzutti',
  description:
    'Book fotográfico profissional para modelos e talentos em São Paulo. Direção de imagem editorial que define quem o mercado escolhe. Agende seu book.',
})

export default function Layout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Studio', url: `${brand.url}/pt/studio/`},
    {name: 'Book', url: `${brand.url}/pt/studio/book/`},
  ])
  const speakable = speakableSchema(`${brand.url}/pt/studio/book/`, ['h1', '.hero-title', '.hero-description', '.speakable'])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(bookServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(bookFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(speakable)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
