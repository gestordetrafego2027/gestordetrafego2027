import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/web/',
    locale,
    title: 'Desenvolvimento Web e Digital para Marcas — House Mazzutti Agência',
    description: 'Sites, plataformas digitais e e-commerce para marcas com identidade. House Mazzutti Agência em São Paulo.',
    image: { src: '/images/agencia/house-mazzutti/capa.webp', alt: 'Web e digital — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function WebLayout({ children }) {
  return children
}
