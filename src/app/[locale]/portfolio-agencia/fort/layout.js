import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-agencia/fort',
    locale,
    title: 'Fort Negócios Imobiliários | Agência — House Mazzutti',
    description: 'Projeto Fort Negócios Imobiliários — branding e identidade visual desenvolvidos pela House Mazzutti em São Paulo. Veja o case completo.',
  })
}

export default function Layout({children}) {
  return children
}
