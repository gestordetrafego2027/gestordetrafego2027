import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/direcao/',
    title: 'Direção Criativa de Imagem para Marcas — House Mazzutti Produtora',
    description: 'Direção criativa de imagem para fotografia e vídeo. Angelo Mazzutti dirige cada projeto — do conceito ao resultado final — para marcas em São Paulo.',
    image: { src: '/images/produtora/banners/banner-2.webp', alt: 'Direção criativa — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function DirecaoLayout({ children }) {
  return children
}
