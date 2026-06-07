import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/ana-rockenbach',
    locale,
    title: 'Ana Rockenbach | Studio — House Mazzutti',
    description: 'Ensaio Ana Rockenbach — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.',
  })
}

export default function Layout({children}) {
  return children
}
