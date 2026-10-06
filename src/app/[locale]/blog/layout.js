import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${brand.url}/pt/blog/#blog`,
  name: 'Blog House Mazzutti',
  description:
    'O canal onde profissionais, artistas, talentos e criadores da comunidade House Mazzutti escrevem o que pensam, compartilham opiniões e se conectam com outras vivências.',
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
    title: 'Blog House Mazzutti — Ideias, Vivências e Conexão',
    description:
      'Profissionais, artistas e criadores escrevendo sobre branding, imagem, moda e a vida online. Leve, sincero e sem rodeio — para ninguém pensar sozinho.',
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
