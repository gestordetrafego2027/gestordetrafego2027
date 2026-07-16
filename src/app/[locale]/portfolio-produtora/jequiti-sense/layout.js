import {portfolioVideoSchemas, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'
import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/jequiti-sense',
    locale,
    title: 'Jequiti Sense | Produtora — House Mazzutti',
    description: 'Produção fotográfica Jequiti Sense — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  const video = portfolioVideoSchemas['jequiti-sense']
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-produtora/`},
    {name: 'jequiti-sense', url: `${brand.url}/pt/portfolio-produtora/jequiti-sense/`},
  ])
  return (
    <>
      {video && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(video)}} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
