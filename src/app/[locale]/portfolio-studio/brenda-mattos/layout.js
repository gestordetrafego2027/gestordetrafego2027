import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-studio/brenda-mattos',
    locale,
    title: 'Brenda Mattos | Studio — House Mazzutti',
    description: 'Ensaio Brenda Mattos — fotografia de moda e studio pela House Mazzutti em São Paulo. Veja as imagens do projeto.',
  })
}

export default function Layout({children}) {
  return children
}
