import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/produtora/moda',
  title: 'Produtora de Moda em São Paulo | House Mazzutti',
  description:
    'Produtora de moda e fashion films em São Paulo: campanhas, editoriais e direção de arte. Da concepção ao master final, com produção sob controle.',
})

export default function Layout({children}) {
  return children
}
