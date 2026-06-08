import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  const base = pageMetadata({
    path: '/portfolio-produtora/we-pink-01',
    locale,
    title: 'WePink — Fashion Film | House Mazzutti São Paulo',
    description: 'WePink — campanha de beleza com direção criativa e produção da House Mazzutti, produtora em São Paulo. Assista ao filme completo.',
  })
  const image = 'https://housemazzutti.com/images/produtora/beleza/we-pink-01/1.webp'
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'video.other',
      images: [{url: image, width: 800, height: 1200, alt: 'WePink — fashion film House Mazzutti São Paulo'}],
    },
    twitter: {...base.twitter, images: [image]},
  }
}

export default function Layout({children}) {
  return children
}
