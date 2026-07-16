import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema, speakableSchema, academyServiceSchema, academyCourseSchema, academyFaqSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/academy',
    locale,
    title: 'House Mazzutti Academy — Cursos, Workshops e Livros',
    description:
      'Aprenda o que só a experiência ensina: cursos, workshops e livros de branding, imagem e direção criativa com a House Mazzutti.',
  })
}

export default function AcademyLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Academy', url: `${brand.url}/pt/academy/`},
  ])
  const speakable = speakableSchema(`${brand.url}/pt/academy/`, ['h1', '.hero-title', '.hero-description', '.speakable'])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(academyServiceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(academyCourseSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(academyFaqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(speakable)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
