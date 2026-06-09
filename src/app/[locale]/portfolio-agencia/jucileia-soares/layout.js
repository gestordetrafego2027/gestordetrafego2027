import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-agencia/jucileia-soares',
    locale,
    title: 'Jucileia Soares | Agência — House Mazzutti',
    description: 'Projeto Jucileia Soares — branding e identidade visual desenvolvidos pela House Mazzutti em São Paulo. Veja o case completo.',
  })
}

export default function Layout({children}) {
  return children
}
