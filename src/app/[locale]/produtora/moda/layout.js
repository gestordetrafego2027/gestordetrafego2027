import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/moda/',
    title: 'Editorial de Moda Profissional para Marcas — House Mazzutti Produtora',
    description: 'Produção editorial de moda para marcas, designers e campanhas. Direção criativa de Angelo Mazzutti em São Paulo — casting, styling, fotografia e vídeo.',
    image: { src: '/images/produtora/moda/hero.webp', alt: 'Editorial de moda — House Mazzutti Produtora', width: 1200, height: 630 },
  })
}

export default function ModaLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O que é um editorial de moda profissional?', acceptedAnswer: { '@type': 'Answer', text: 'É uma produção fotográfica ou audiovisual com conceito criativo voltada a apresentar peças, coleções ou marcas de moda com narrativa visual e estética de alto nível.' } },
      { '@type': 'Question', name: 'A House Mazzutti faz shooting de moda para catálogos?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Produtora House Mazzutti realiza shootings de moda para catálogos, e-commerce, campanhas sazonais e editoriais de revista, com direção criativa de Angelo Mazzutti.' } },
      { '@type': 'Question', name: 'Quem cuida do casting e styling nos editoriais de moda?', acceptedAnswer: { '@type': 'Answer', text: 'A House Mazzutti coordena o casting, styling e direção de arte. Temos rede de modelos, stylist e equipe de produção para entregas completas em São Paulo.' } },
      { '@type': 'Question', name: 'A House Mazzutti produz fashion film para lançamento de coleção?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Produtora realiza fashion films com conceito e roteiro próprios. O filme de moda é dirigido por Angelo Mazzutti do briefing ao master final.' } },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
