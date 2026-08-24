import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/comunicacao/',
    locale,
    title: 'Comunicação e Publicidade para Marcas — House Mazzutti Agência',
    description: 'Campanhas de lançamento, conteúdo editorial e gestão de comunicação para marcas em São Paulo. House Mazzutti Agência.',
    image: { src: '/images/agencia/on-take/capa.webp', alt: 'Comunicação e publicidade — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function ComunicacaoLayout({ children }) {
  return children
}
