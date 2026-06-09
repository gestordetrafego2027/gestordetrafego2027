import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio-agencia/dra-ariadne-barbosa',
    locale,
    title: 'Dra. Ariadne Barbosa | Agência — House Mazzutti',
    description: 'Projeto Dra. Ariadne Barbosa — logo, branding e manual de marca desenvolvidos pela House Mazzutti em São Paulo. Veja o case completo.',
  })
}

export default function Layout({children}) {
  return children
}
