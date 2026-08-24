import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/rp/',
    locale,
    title: 'RP e Marketing Direto para Marcas — House Mazzutti Agência',
    description: 'Relações públicas, assessoria de imprensa e marketing direto para marcas de luxo e lifestyle em São Paulo. House Mazzutti Agência.',
    image: { src: '/images/agencia/banners/banner-2.webp', alt: 'RP e Marketing Direto — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function RpLayout({ children }) {
  return children
}
