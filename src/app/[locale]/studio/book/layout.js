import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/studio/book',
  title: 'Book Fotográfico em São Paulo | House Mazzutti',
  description:
    'Book fotográfico profissional para modelos e talentos em São Paulo. Direção de imagem editorial que define quem o mercado escolhe. Agende seu book.',
})

export default function Layout({children}) {
  return children
}
