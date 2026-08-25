import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/studio/ensaio/',
    locale,
    title: 'Ensaio Fotográfico Artístico em São Paulo — House Mazzutti Studio',
    description: 'Ensaios pessoais e artísticos com direção criativa de imagem. Studio exclusivo em São Paulo, styling, lighting e retoque high-end.',
    image: { src: `/opengraph-image?title=${encodeURIComponent('Ensaio Fotográfico Artístico em São Paulo')}&unit=${encodeURIComponent('Studio')}`, alt: 'Ensaio fotográfico artístico — House Mazzutti Studio', width: 1200, height: 630 },
  })
}

export default function EnsaioLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é um ensaio fotográfico artístico?',
        acceptedAnswer: { '@type': 'Answer', text: 'Um ensaio artístico é uma sessão fotográfica com conceito criativo — diferente de um book técnico, ele parte de uma ideia visual, mood ou narrativa pessoal, com direção de imagem do início ao fim.' }
      },
      {
        '@type': 'Question',
        name: 'Como funciona um ensaio fotográfico na House Mazzutti?',
        acceptedAnswer: { '@type': 'Answer', text: 'Começa com um briefing para entender o conceito e o perfil do cliente. Angelo Mazzutti cria o moodboard, dirige o styling e comanda a sessão no studio ou em locação externa em São Paulo.' }
      },
      {
        '@type': 'Question',
        name: 'A House Mazzutti faz ensaios em locação externa?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sim. Além do studio próprio no Saúde, a House Mazzutti realiza ensaios em locações externas em São Paulo conforme o conceito do projeto.' }
      },
      {
        '@type': 'Question',
        name: 'Qual a diferença entre ensaio e book fotográfico?',
        acceptedAnswer: { '@type': 'Answer', text: 'O book é voltado a objetivos profissionais (modelo, ator, marca pessoal) com foco em versatilidade de looks. O ensaio parte de um conceito artístico ou narrativa pessoal, com liberdade criativa maior.' }
      },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Ensaio Fotográfico Pessoal em São Paulo',
    'description': 'Ensaio fotográfico para executivos, empreendedores e criadores que querem construir autoridade visual. Direção criativa de Angelo Mazzutti em São Paulo.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'House Mazzutti',
      'url': 'https://housemazzutti.com'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo'
    },
    'serviceType': 'Ensaio Fotográfico Pessoal'
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://housemazzutti.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Studio', 'item': 'https://housemazzutti.com/studio' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Ensaio', 'item': 'https://housemazzutti.com/studio/ensaio' },
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
