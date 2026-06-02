import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/contato',
    locale,
    title: 'Contato — House Mazzutti | Studio, Agência e Produtora SP',
    description:
      'Fale com a House Mazzutti em São Paulo: books, branding e campanhas. Respondemos em até 1 dia útil.',
  })
}

export default function ContatoLayout({children}) {
  return children
}
