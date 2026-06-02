import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/agencia',
    locale,
    title: 'Agência de Branding e Direção Criativa em São Paulo',
    description:
      'Branding, web e comunicação para marcas que querem presença com estratégia. Direção criativa autoral da House Mazzutti em SP.',
  })
}

export default function AgenciaLayout({children}) {
  return children
}
