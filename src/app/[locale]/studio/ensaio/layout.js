import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/studio/ensaio/',
    locale,
    title: 'Ensaio Fotográfico Artístico em São Paulo — House Mazzutti Studio',
    description: 'Ensaios pessoais e artísticos com direção criativa de imagem. Studio exclusivo em São Paulo, styling, lighting e retoque high-end.',
    image: { src: '/images/studio/marjorie-rossi/capa.webp', alt: 'Ensaio fotográfico artístico — House Mazzutti Studio', width: 1200, height: 630 },
  })
}

export default function EnsaioLayout({ children }) {
  return children
}
