import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-agencia/lbo',
    locale,
    title: 'LBO Consultoria | Agência — House Mazzutti',
    description: 'Projeto LBO Consultoria — logo, marca e branding desenvolvidos pela House Mazzutti em São Paulo. Veja o case completo.',
  })
}

export default function Layout({children}) {
  return children
}
