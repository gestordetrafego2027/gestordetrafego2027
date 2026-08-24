import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/studio/book/',
    locale,
    title: 'Book Fotográfico Profissional em São Paulo — House Mazzutti Studio',
    description: 'Book para modelos e artistas com direção criativa de Angelo Mazzutti. Studio próprio em São Paulo, curadoria de looks e entrega high-end.',
    image: { src: '/images/studio/marina-machado/capa.webp', alt: 'Book fotográfico — House Mazzutti Studio', width: 1200, height: 630 },
  })
}

export default function BookLayout({ children }) {
  return children
}
