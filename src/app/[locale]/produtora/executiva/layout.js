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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O que é produção executiva audiovisual?', acceptedAnswer: { '@type': 'Answer', text: 'É a gestão completa de uma produção — logística, orçamento, equipe técnica, casting, locações e pós-produção — garantindo que o projeto seja entregue dentro do prazo e do briefing.' } },
      { '@type': 'Question', name: 'A House Mazzutti monta a equipe técnica completa de produção?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Produtora House Mazzutti mobiliza diretores de fotografia, operadores de câmera, iluminadores, arte, maquiagem, produção de campo e pós-produção conforme o escopo.' } },
      { '@type': 'Question', name: 'A House Mazzutti atua como produtora executiva de campanhas de terceiros?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Para agências ou marcas que têm o conceito criativo definido, a House Mazzutti pode atuar como produtora executiva — cuidando de toda a logística e execução da campanha.' } },
      { '@type': 'Question', name: 'Como funciona o briefing de produção executiva?', acceptedAnswer: { '@type': 'Answer', text: 'Começa com o levantamento do escopo: locações, equipe, dias de gravação, prazos e orçamento. A House Mazzutti apresenta plano de produção e cronograma antes de qualquer contratação.' } },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Produção Executiva Audiovisual em São Paulo',
    'description': 'Gestão de produção audiovisual de ponta a ponta — orçamento, equipe, locações e cronograma. House Mazzutti Produtora em São Paulo.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'House Mazzutti',
      'url': 'https://housemazzutti.com'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo'
    },
    'serviceType': 'Produção Executiva'
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://housemazzutti.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Produtora', 'item': 'https://housemazzutti.com/produtora' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Produção Executiva', 'item': 'https://housemazzutti.com/produtora/executiva' },
    ]
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
