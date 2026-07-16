import {pageMetadata} from '@/lib/seo/metadata'
import {studioServiceSchema, studioFaqSchema, breadcrumbSchema, speakableSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/studio',
    locale,
    title: 'Studio HMZT — Book, Ensaio e Direção de Imagem em SP',
    description:
      'Book, ensaio e cobertura com direção de imagem pessoal em São Paulo. Foto e vídeo com intenção, sob direção de Angelo Mazzutti.',
    image: { src: '/images/studio/ana-laura-saar/1.webp', alt: 'Studio House Mazzutti — Book e Ensaio Fotográfico em São Paulo' },
  })
}

export default function StudioLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Studio', url: `${brand.url}/pt/studio/`},
  ])
  const speakable = speakableSchema(`${brand.url}/pt/studio/`, ['h1', '.hero-title', '.hero-description', '.speakable'])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(studioServiceSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(studioFaqSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(speakable)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
