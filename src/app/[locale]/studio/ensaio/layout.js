import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/studio/ensaio',
  title: 'Ensaio Fotográfico em São Paulo | House Mazzutti',
  description:
    'Ensaio fotográfico pessoal e editorial em São Paulo. Direção de imagem autoral para que sua presença seja vista com a clareza que merece.',
})

export default function Layout({children}) {
  return children
}
