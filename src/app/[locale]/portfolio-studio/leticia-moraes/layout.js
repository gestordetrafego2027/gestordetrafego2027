import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/leticia-moraes',
    locale,
    title: 'Leticia Moraes | Studio — House Mazzutti',
    description: 'Ensaio Leticia Moraes — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.',
  })
}

export default function Layout({children}) {
  return children
}
