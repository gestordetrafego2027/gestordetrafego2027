import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/executiva/',
    title: 'Produção Executiva Audiovisual em São Paulo — House Mazzutti Produtora',
    description: 'Produção executiva completa para campanhas audiovisuais — logística, casting, equipe técnica e pós-produção. House Mazzutti Produtora em São Paulo.',
    image: { src: '/images/produtora/banners/banner-1.webp', alt: 'Produção executiva — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function ExecutivaLayout({ children }) {
  return children
}
