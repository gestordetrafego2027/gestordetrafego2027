import {pageMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio',
    locale,
    title: 'Portfólio House Mazzutti — Books, Campanhas e Marcas',
    description:
      'Trabalhos selecionados de book, campanha de moda e beleza e branding dirigidos pela House Mazzutti em São Paulo.',
  })
}

export default function PortfolioLayout({children}) {
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio/`},
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
