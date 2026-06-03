import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
