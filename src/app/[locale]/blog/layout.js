import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${brand.url}/pt/blog/#blog`,
  name: 'Blog House Mazzutti',
  description:
    'Ideias sobre branding, direção de imagem, moda e campanhas. O pensamento editorial da House Mazzutti.',
  url: `${brand.url}/pt/blog/`,
  inLanguage: 'pt-BR',
  publisher: {'@id': `${brand.url}/#organization`},
  author: {'@id': `${brand.url}/pt/angelo/#angelo`},
}

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
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Blog', url: `${brand.url}/pt/blog/`},
  ])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(blogSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}}
      />
      {children}
    </>
  )
}
