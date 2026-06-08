import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  const base = pageMetadata({
    path: '/portfolio-produtora/signus',
    locale,
    title: 'Signus — Fashion Film | House Mazzutti São Paulo',
    description: 'Signus — fashion film e campanha da House Mazzutti, produtora de moda em São Paulo. Direção criativa e direção de imagem. Assista ao filme completo.',
  })
  const image = 'https://housemazzutti.com/images/produtora/acessorios/signus/1.webp'
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'video.other',
      images: [{url: image, width: 800, height: 1200, alt: 'Signus — fashion film House Mazzutti São Paulo'}],
    },
    twitter: {...base.twitter, images: [image]},
  }
}

export default function Layout({children}) {
  return children
}
