import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/we-pink-01',
    locale,
    title: 'We Pink 01 | Produtora — House Mazzutti',
    description: 'Produção fotográfica We Pink 01 — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  return children
}
