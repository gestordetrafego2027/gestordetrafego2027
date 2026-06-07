import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/leif-sinclar',
    locale,
    title: 'Leif Sinclar | Studio — House Mazzutti',
    description: 'Ensaio Leif Sinclar — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.',
  })
}

export default function Layout({children}) {
  return children
}
