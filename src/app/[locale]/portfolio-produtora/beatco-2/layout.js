import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/beatco-2',
    locale,
    title: 'Beatco 2 | Produtora — House Mazzutti',
    description: 'Produção fotográfica Beatco 2 — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  return children
}
