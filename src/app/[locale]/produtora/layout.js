import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/produtora',
    locale,
    title: 'Produtora de Moda, Beleza e Publicidade em São Paulo',
    description:
      'Produção executiva, casting e set design para campanhas de moda, beleza e institucional. Produtora da House Mazzutti em SP.',
  })
}

export default function ProdutoraLayout({children}) {
  return children
}
