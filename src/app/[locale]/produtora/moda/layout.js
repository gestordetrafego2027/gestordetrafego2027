import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/moda/',
    title: 'Editorial de Moda Profissional para Marcas — House Mazzutti Produtora',
    description: 'Produção editorial de moda para marcas, designers e campanhas. Direção criativa de Angelo Mazzutti em São Paulo — casting, styling, fotografia e vídeo.',
    image: { src: '/images/produtora/moda/hero.webp', alt: 'Editorial de moda — House Mazzutti Produtora', width: 1200, height: 630 },
  })
}

export default function ModaLayout({ children }) {
  return children
}
