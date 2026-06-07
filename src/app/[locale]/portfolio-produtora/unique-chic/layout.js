import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/unique-chic',
    locale,
    title: 'Unique Chic | Produtora — House Mazzutti',
    description: 'Produção fotográfica Unique Chic — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  return children
}
