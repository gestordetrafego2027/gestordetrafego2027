import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/eventos/',
    title: 'Cobertura Audiovisual de Eventos em São Paulo — House Mazzutti Produtora',
    description: 'Cobertura audiovisual de desfiles, lançamentos e eventos corporativos em São Paulo. Equipe da House Mazzutti Produtora com direção de Angelo Mazzutti.',
    image: { src: '/images/produtora/banners/banner-3.webp', alt: 'Cobertura de eventos — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function EventosLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'A House Mazzutti faz cobertura fotográfica e de vídeo de eventos?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Produtora House Mazzutti realiza cobertura audiovisual completa de desfiles, lançamentos, vernissages e eventos corporativos em São Paulo, com equipe especializada e entrega editorial.' } },
      { '@type': 'Question', name: 'Qual é a diferença entre cobertura de evento e cobertura editorial?', acceptedAnswer: { '@type': 'Answer', text: 'A cobertura padrão registra o evento. A cobertura editorial da House Mazzutti tem direção de imagem — cada foto ou clipe é composto com intenção estética, gerando conteúdo de marca de alto nível.' } },
      { '@type': 'Question', name: 'A House Mazzutti entrega conteúdo para redes sociais no mesmo dia do evento?', acceptedAnswer: { '@type': 'Answer', text: 'Dependendo do pacote, sim. Oferecemos entrega de conteúdo prioritário para stories e feed no mesmo dia ou no dia seguinte mediante acordo prévio no briefing.' } },
      { '@type': 'Question', name: 'A House Mazzutti cobre eventos fora de São Paulo?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, mediante avaliação de agenda e escopo. Eventos em outras cidades são atendidos com equipe da House Mazzutti ou com parceiros locais supervisionados pela direção criativa.' } },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
