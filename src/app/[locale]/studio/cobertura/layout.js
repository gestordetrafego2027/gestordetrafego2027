import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/studio/cobertura/',
    locale,
    title: 'Cobertura Fotográfica de Eventos em São Paulo — House Mazzutti Studio',
    description: 'Cobertura fotográfica editorial de desfiles, lançamentos e eventos de moda em São Paulo. Direção de Angelo Mazzutti, entrega curada.',
    image: { src: '/images/studio/ana-laura-saar/1.webp', alt: 'Cobertura fotográfica editorial — House Mazzutti Studio', width: 1200, height: 630 },
  })
}

export default function CoberturaLayout({ children }) {
  return children
}
