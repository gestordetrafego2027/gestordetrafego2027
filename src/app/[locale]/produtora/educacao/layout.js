import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/educacao/',
    title: 'Vídeo Educacional e de Treinamento Corporativo — House Mazzutti Produtora',
    description: 'Produção de vídeo educacional, treinamentos corporativos e cursos online com direção criativa em São Paulo. House Mazzutti Produtora.',
    image: { src: '/images/produtora/banners/banner-3.webp', alt: 'Vídeo educacional — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function EducacaoLayout({ children }) {
  return children
}
