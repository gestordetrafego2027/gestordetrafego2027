import {portfolioVideoSchemas, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'
import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  const base = pageMetadata({
    path: '/portfolio-produtora/beatco-2',
    locale,
    title: 'Beatco 02 — Fashion Film | House Mazzutti São Paulo',
    description: 'Beatco 02 — fashion film e campanha da House Mazzutti, produtora de moda em São Paulo. Direção criativa e direção de imagem. Assista ao filme completo.',
  })
  const image = 'https://housemazzutti.com/images/produtora/moda/beatco-2/1.webp'
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'video.other',
      images: [{url: image, width: 800, height: 1200, alt: 'Beatco 02 — fashion film House Mazzutti São Paulo'}],
    },
    twitter: {...base.twitter, images: [image]},
  }
}

export default function Layout({children}) {
  const video = portfolioVideoSchemas['beatco-2']
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-produtora/`},
    {name: 'beatco-2', url: `${brand.url}/pt/portfolio-produtora/beatco-2/`},
  ])
  return (
    <>
      {video && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(video)}} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
