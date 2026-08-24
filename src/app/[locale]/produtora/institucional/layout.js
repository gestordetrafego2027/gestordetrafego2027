import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/institucional/',
    title: 'Vídeo Institucional para Empresas — House Mazzutti Produtora',
    description: 'Produção de vídeo institucional com direção criativa em São Paulo. Apresente sua empresa com narrativa visual de alto nível. House Mazzutti Produtora.',
    image: { src: '/images/produtora/institucional/sense-hotel/capa.webp', alt: 'Vídeo institucional — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function InstitucionalLayout({ children }) {
  return children
}
