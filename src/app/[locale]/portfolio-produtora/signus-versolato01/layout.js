import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/signus-versolato01',
    locale,
    title: 'Signus Versolato01 | Produtora — House Mazzutti',
    description: 'Produção fotográfica Signus Versolato01 — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  return children
}
