import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/ana-laura-saar',
    locale,
    title: 'Ana Laura Saar | Studio — House Mazzutti',
    description: 'Ensaio Ana Laura Saar — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.',
  })
}

export default function Layout({children}) {
  return children
}
