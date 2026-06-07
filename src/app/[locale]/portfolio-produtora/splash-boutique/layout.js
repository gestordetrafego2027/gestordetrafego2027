import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-produtora/splash-boutique',
    locale,
    title: 'Splash Boutique | Produtora — House Mazzutti',
    description: 'Produção fotográfica Splash Boutique — direção de imagem e fotografia de produto pela House Mazzutti. Veja o ensaio completo.',
  })
}

export default function Layout({children}) {
  return children
}
