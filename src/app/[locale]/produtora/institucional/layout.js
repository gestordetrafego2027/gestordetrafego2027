import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/institucional/',
    title: 'Vídeo Institucional para Empresas — House Mazzutti Produtora',
    description: 'Produção de vídeo institucional com direção criativa em São Paulo. Apresente sua empresa com narrativa visual de alto nível. House Mazzutti Produtora.',
    image: { src: '/images/produtora/institucional/sense-hotel/capa.webp', alt: 'Vídeo institucional — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function InstitucionalLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O que é um vídeo institucional?', acceptedAnswer: { '@type': 'Answer', text: 'É um filme que apresenta a empresa, sua cultura, serviços ou produtos ao público — clientes, parceiros e investidores. Vai além do institucional genérico: tem narrativa, emoção e identidade de marca.' } },
      { '@type': 'Question', name: 'Quanto tempo dura um vídeo institucional?', acceptedAnswer: { '@type': 'Answer', text: 'Em média de 1 a 3 minutos para versão completa. A House Mazzutti entrega versões adaptadas para cada canal — LinkedIn, site, apresentações e redes sociais.' } },
      { '@type': 'Question', name: 'A House Mazzutti produz vídeo institucional fora de São Paulo?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Produtora atende marcas em todo o Brasil. Produções fora de São Paulo são avaliadas por agenda, escopo e logística.' } },
      { '@type': 'Question', name: 'Qual é o processo de produção de um vídeo institucional na House Mazzutti?', acceptedAnswer: { '@type': 'Answer', text: 'Briefing → roteiro e conceito → pré-produção (locação, elenco, equipe) → gravação → edição e pós-produção → entrega dos masters. Angelo Mazzutti dirige cada etapa.' } },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Vídeo Institucional em São Paulo',
    'description': 'Produção de vídeo institucional para empresas com narrativa de alto impacto. House Mazzutti Produtora em São Paulo — roteiro, captação e entrega final.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'House Mazzutti',
      'url': 'https://housemazzutti.com'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo'
    },
    'serviceType': 'Vídeo Institucional'
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://housemazzutti.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Produtora', 'item': 'https://housemazzutti.com/produtora' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Vídeo Institucional', 'item': 'https://housemazzutti.com/produtora/institucional' },
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
