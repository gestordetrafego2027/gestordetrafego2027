import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/portfolio-studio',
  title: 'Portfólio Studio — Books e Ensaios | House Mazzutti',
  description:
    'Portfólio do Studio House Mazzutti: books, ensaios e direção de imagem pessoal em São Paulo. Veja o trabalho que define presença.',
})

export default function Layout({children}) {
  return children
}
