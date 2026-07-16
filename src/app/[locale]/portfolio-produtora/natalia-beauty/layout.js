import {portfolioVideoSchemas, breadcrumbSchema} from '@/lib/seo/schemas'
import {brand} from '@/config/site'
import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  const base = pageMetadata({
    path: '/portfolio-produtora/natalia-beauty',
    locale,
    title: 'Natália Beauty — Fashion Film | House Mazzutti São Paulo',
    description: 'Natália Beauty — campanha de beleza com direção criativa e produção da House Mazzutti, produtora em São Paulo. Assista ao filme completo.',
  })
  const image = 'https://housemazzutti.com/images/produtora/beleza/natalia-beauty/1.webp'
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'video.other',
      images: [{url: image, width: 800, height: 1200, alt: 'Natália Beauty — fashion film House Mazzutti São Paulo'}],
    },
    twitter: {...base.twitter, images: [image]},
  }
}

export default function Layout({children}) {
  const video = portfolioVideoSchemas['natalia-beauty']
  const crumbs = breadcrumbSchema([
    {name: 'House Mazzutti', url: `${brand.url}/pt/`},
    {name: 'Portfólio', url: `${brand.url}/pt/portfolio-produtora/`},
    {name: 'natalia-beauty', url: `${brand.url}/pt/portfolio-produtora/natalia-beauty/`},
  ])
  return (
    <>
      {video && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(video)}} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs)}} />
      {children}
    </>
  )
}
