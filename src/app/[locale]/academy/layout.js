import {pageMetadata} from '@/lib/seo/metadata'

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
  return children
}
