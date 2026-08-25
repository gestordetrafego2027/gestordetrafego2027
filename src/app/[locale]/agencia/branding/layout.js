import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/branding/',
    locale,
    title: 'Branding e Identidade Visual para Marcas — House Mazzutti Agência',
    description: 'Branding estratégico com direção criativa de Angelo Mazzutti. Identidade visual, nomenclatura, brandbook e voz de marca para empresas em São Paulo.',
    image: { src: `/opengraph-image?title=${encodeURIComponent('Branding e Identidade Visual para Marcas')}&unit=${encodeURIComponent('Agência')}`, alt: 'Projeto de branding — House Mazzutti Agência', width: 1200, height: 630 },
  })
}

export default function BrandingLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O que inclui um projeto de branding na House Mazzutti?', acceptedAnswer: { '@type': 'Answer', text: 'Um projeto completo de branding inclui posicionamento estratégico, naming, identidade visual (logo, paleta, tipografia), brandbook e diretrizes de aplicação, tudo sob direção de Angelo Mazzutti.' } },
      { '@type': 'Question', name: 'Quanto tempo leva um projeto de identidade visual?', acceptedAnswer: { '@type': 'Answer', text: 'Em média 30 a 60 dias, dependendo da complexidade. O processo começa com imersão e briefing, passa por conceito criativo, apresentação de direções e refinamento até a entrega final.' } },
      { '@type': 'Question', name: 'A House Mazzutti atende startups e pequenas empresas?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Agência House Mazzutti atende marcas em diferentes estágios — de startups que precisam construir identidade do zero a empresas consolidadas que buscam reposicionamento.' } },
      { '@type': 'Question', name: 'O projeto de branding inclui manual de marca?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Todo projeto entregue pela House Mazzutti Agência inclui brandbook com diretrizes de uso, aplicações e especificações técnicas para garantir consistência da marca.' } },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Branding e Identidade Visual em São Paulo',
    'description': 'Branding estratégico com direção criativa de Angelo Mazzutti. Identidade visual, naming, brandbook e voz de marca para empresas em São Paulo.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'House Mazzutti',
      'url': 'https://housemazzutti.com'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo'
    },
    'serviceType': 'Branding'
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://housemazzutti.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Agência', 'item': 'https://housemazzutti.com/agencia' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Branding', 'item': 'https://housemazzutti.com/agencia/branding' },
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
