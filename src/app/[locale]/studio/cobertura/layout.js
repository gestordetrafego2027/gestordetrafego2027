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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é cobertura fotográfica editorial?',
        acceptedAnswer: { '@type': 'Answer', text: 'É um registro profissional de eventos — desfiles, lançamentos, vernissages — com tratamento editorial. Vai além do fotojornalismo: cada imagem é composta com intenção estética e narrativa de marca.' }
      },
      {
        '@type': 'Question',
        name: 'A House Mazzutti faz cobertura de desfiles de moda em São Paulo?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sim. A House Mazzutti Studio realiza coberturas editoriais de desfiles, lançamentos de coleção e eventos de moda em São Paulo com direção de Angelo Mazzutti.' }
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo leva a entrega das fotos de cobertura?',
        acceptedAnswer: { '@type': 'Answer', text: 'O prazo de entrega depende do volume e da edição contratada. Coberturas com necessidade de entrega rápida podem ser negociadas caso a caso.' }
      },
      {
        '@type': 'Question',
        name: 'A cobertura da House Mazzutti inclui vídeo?',
        acceptedAnswer: { '@type': 'Answer', text: 'A cobertura padrão é fotográfica. Para cobertura audiovisual completa (foto + vídeo), consulte a Produtora House Mazzutti em housemazzutti.com/produtora/eventos/.' }
      },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Cobertura Fotográfica de Eventos em São Paulo',
    'description': 'Cobertura fotográfica de eventos corporativos, lançamentos e desfiles com curadoria visual de alto nível. House Mazzutti Studio em São Paulo.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'House Mazzutti',
      'url': 'https://housemazzutti.com'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo'
    },
    'serviceType': 'Cobertura Fotográfica de Eventos'
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://housemazzutti.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Studio', 'item': 'https://housemazzutti.com/studio' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Cobertura', 'item': 'https://housemazzutti.com/studio/cobertura' },
    ]
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
