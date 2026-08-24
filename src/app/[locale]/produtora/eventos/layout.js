import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/eventos/',
    title: 'Cobertura Audiovisual de Eventos em São Paulo — House Mazzutti Produtora',
    description: 'Cobertura audiovisual de desfiles, lançamentos e eventos corporativos em São Paulo. Equipe da House Mazzutti Produtora com direção de Angelo Mazzutti.',
    image: { src: '/images/produtora/banners/banner-3.webp', alt: 'Cobertura de eventos — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function EventosLayout({ children }) {
  return children
}
