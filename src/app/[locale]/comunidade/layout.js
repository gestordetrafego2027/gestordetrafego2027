import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/comunidade',
    locale,
    title: 'Comunidade House Mazzutti — Rede de Marca e Imagem',
    description:
      'Uma rede que conecta cuidado, conhecimento e construção de marca em São Paulo. Conheça a Comunidade House Mazzutti.',
  })
}

export default function ComunidadeLayout({children}) {
  return children
}
