import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/branding/',
    locale,
    title: 'Branding e Identidade Visual para Marcas — House Mazzutti Agência',
    description: 'Branding estratégico com direção criativa de Angelo Mazzutti. Identidade visual, nomenclatura, brandbook e voz de marca para empresas em São Paulo.',
    image: { src: '/images/agencia/knowhol/capa.webp', alt: 'Projeto de branding — House Mazzutti Agência', width: 1200, height: 630 },
  })
}

export default function BrandingLayout({ children }) {
  return children
}
