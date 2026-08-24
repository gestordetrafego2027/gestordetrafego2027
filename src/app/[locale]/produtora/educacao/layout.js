import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/educacao/',
    title: 'Vídeo Educacional e de Treinamento Corporativo — House Mazzutti Produtora',
    description: 'Produção de vídeo educacional, treinamentos corporativos e cursos online com direção criativa em São Paulo. House Mazzutti Produtora.',
    image: { src: '/images/produtora/banners/banner-3.webp', alt: 'Vídeo educacional — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function EducacaoLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'A House Mazzutti produz vídeos para plataformas EAD?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Produtora House Mazzutti produz vídeos educacionais para plataformas de ensino a distância, com qualidade cinematic, apresentadores e materiais de apoio visual.' } },
      { '@type': 'Question', name: 'Qual é o diferencial de um vídeo educacional bem produzido?', acceptedAnswer: { '@type': 'Answer', text: 'Retenção. Um vídeo com boa iluminação, áudio limpo, edição dinâmica e identidade visual consistente aumenta o engajamento e a percepção de autoridade de quem ensina.' } },
      { '@type': 'Question', name: 'A House Mazzutti produz treinamentos corporativos em vídeo?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Treinamentos, onboarding e comunicação interna em vídeo são parte do portfólio da Produtora House Mazzutti — com roteiro, gravação e edição completos.' } },
      { '@type': 'Question', name: 'Quantos vídeos posso gravar em um dia de produção?', acceptedAnswer: { '@type': 'Answer', text: 'Depende do formato e do roteiro. Em uma jornada de set, é possível gravar de 5 a 15 vídeos curtos ou 2 a 4 aulas longas. O planejamento é feito no briefing de pré-produção.' } },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Workshop de Fotografia de Moda em São Paulo',
    'description': 'Workshops e formação em fotografia de moda, direção de imagem e produção visual com Angelo Mazzutti em São Paulo.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'House Mazzutti',
      'url': 'https://housemazzutti.com'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo'
    },
    'serviceType': 'Educação em Fotografia e Direção de Imagem'
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://housemazzutti.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Produtora', 'item': 'https://housemazzutti.com/produtora' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Educação', 'item': 'https://housemazzutti.com/produtora/educacao' },
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
