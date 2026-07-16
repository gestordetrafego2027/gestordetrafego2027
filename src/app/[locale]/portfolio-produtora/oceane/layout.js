import {portfolioVideoSchemas, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'
import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/oceane',
    locale,
    title: 'Oceane | Produtora — House Mazzutti',
    description: 'Produção fotográfica Oceane — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  const video = portfolioVideoSchemas['oceane']
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-produtora/`},
    {name: 'oceane', url: `${brand.url}/pt/portfolio-produtora/oceane/`},
  ])
  return (
    <>
      {video && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(video)}} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
