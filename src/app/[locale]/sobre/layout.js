import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/sobre',
  title: 'Sobre a House Mazzutti — Casa Criativa em São Paulo',
  description:
    'Quem é a House Mazzutti: casa criativa de direção criativa, branding e produção de imagem em São Paulo, fundada em 2016. Estratégia, imagem e presença com intenção.',
})

export default function Layout({children}) {
  return children
}
