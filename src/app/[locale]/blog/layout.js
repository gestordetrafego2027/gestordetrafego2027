import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/blog',
    locale,
    title: 'Blog House Mazzutti — Branding, Imagem e Moda',
    description:
      'Ideias sobre branding, direção de imagem, moda e campanhas. O pensamento por trás da House Mazzutti.',
  })
}

export default function BlogLayout({children}) {
  return children
}
