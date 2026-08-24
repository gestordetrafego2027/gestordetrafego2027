import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/publicidade/',
    title: 'Produção Publicitária para Marcas — House Mazzutti Produtora',
    description: 'Comerciais e filmes publicitários com conceito criativo e execução de alto nível em São Paulo. House Mazzutti Produtora, direção de Angelo Mazzutti.',
    image: { src: '/images/produtora/beleza/jequiti-larissa-manoela/capa.webp', alt: 'Produção publicitária — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function PublicidadeLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'A House Mazzutti produz comerciais de TV?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Produtora House Mazzutti produz filmes publicitários para TV, streaming e digital, com conceito criativo, direção de arte e pós-produção completa.' } },
      { '@type': 'Question', name: 'Qual é a diferença entre um vídeo institucional e um filme publicitário?', acceptedAnswer: { '@type': 'Answer', text: 'O vídeo institucional apresenta a empresa. O filme publicitário tem objetivo comercial claro — vender, lançar ou posicionar um produto — com roteiro, apelo emocional e call to action.' } },
      { '@type': 'Question', name: 'A House Mazzutti cria o roteiro e o conceito criativo do comercial?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Angelo Mazzutti dirige a criação do conceito, roteiro e direção de arte. Para marcas com agência parceira, trabalhamos integrados ao briefing criativo já existente.' } },
      { '@type': 'Question', name: 'Quanto tempo leva a produção de um filme publicitário?', acceptedAnswer: { '@type': 'Answer', text: 'De 3 a 8 semanas dependendo da complexidade — do briefing à entrega do master. Projetos urgentes podem ter cronograma acelerado mediante avaliação.' } },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
