import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/talita-dalbo',
    locale,
    title: 'Talita Dalbo | Studio — House Mazzutti',
    description: 'Ensaio Talita Dalbo — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.',
  })
}

export default function Layout({children}) {
  return children
}
