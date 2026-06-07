import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/jessica-bittelbrun',
    locale,
    title: 'Jessica Bittelbrun | Studio — House Mazzutti',
    description: 'Ensaio Jessica Bittelbrun — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.',
  })
}

export default function Layout({children}) {
  return children
}
