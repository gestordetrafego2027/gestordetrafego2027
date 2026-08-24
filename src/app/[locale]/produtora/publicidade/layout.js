import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/publicidade/',
    title: 'Produção Publicitária para Marcas — House Mazzutti Produtora',
    description: 'Comerciais e filmes publicitários com conceito criativo e execução de alto nível em São Paulo. House Mazzutti Produtora, direção de Angelo Mazzutti.',
    image: { src: '/images/produtora/beleza/jequiti-larissa-manoela/capa.webp', alt: 'Produção publicitária — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function PublicidadeLayout({ children }) {
  return children
}
