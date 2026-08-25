import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/web/',
    locale,
    title: 'Desenvolvimento Web e Digital para Marcas — House Mazzutti Agência',
    description: 'Sites, plataformas digitais e e-commerce para marcas com identidade. House Mazzutti Agência em São Paulo.',
    image: { src: `/opengraph-image?title=${encodeURIComponent('Desenvolvimento Web e Digital para Marcas')}&unit=${encodeURIComponent('Agência')}`, alt: 'Web e digital — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function WebLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'A House Mazzutti desenvolve sites institucionais?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Agência House Mazzutti projeta e desenvolve sites institucionais, portfólios digitais e plataformas de e-commerce integrados à identidade visual da marca.' } },
      { '@type': 'Question', name: 'O site desenvolvido pela House Mazzutti é otimizado para SEO?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Todos os projetos web incluem estrutura técnica para SEO — metadados, schema markup, desempenho e responsividade — para garantir visibilidade nos mecanismos de busca.' } },
      { '@type': 'Question', name: 'Qual tecnologia a House Mazzutti usa para desenvolvimento web?', acceptedAnswer: { '@type': 'Answer', text: 'A Agência escolhe a stack conforme o projeto — Next.js, React, Webflow ou WordPress, priorizando performance, escalabilidade e integração com o sistema de design da marca.' } },
      { '@type': 'Question', name: 'A House Mazzutti cuida da manutenção do site após a entrega?', acceptedAnswer: { '@type': 'Answer', text: 'Dependendo do contrato, sim. Há planos de manutenção e suporte técnico pós-lançamento. O escopo é definido no briefing inicial.' } },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Criação de Sites e Estratégia Digital em São Paulo',
    'description': 'Desenvolvimento de sites institucionais e e-commerce com posicionamento estratégico. House Mazzutti Agência em São Paulo.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'House Mazzutti',
      'url': 'https://housemazzutti.com'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo'
    },
    'serviceType': 'Web Design e Estratégia Digital'
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://housemazzutti.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Agência', 'item': 'https://housemazzutti.com/agencia' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Web', 'item': 'https://housemazzutti.com/agencia/web' },
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
