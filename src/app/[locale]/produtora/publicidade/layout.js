import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/produtora/publicidade',
  title: 'Produção Publicitária em São Paulo | House Mazzutti',
  description:
    'Produtora de publicidade em São Paulo: campanhas e filmes com governança criativa do briefing à entrega. Conceito que performa, produção sob controle.',
})

export default function Layout({children}) {
  return children
}
