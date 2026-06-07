import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/signus-jean-pierre',
    locale,
    title: 'Signus Jean Pierre | Produtora — House Mazzutti',
    description: 'Produção fotográfica Signus Jean Pierre — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  return children
}
