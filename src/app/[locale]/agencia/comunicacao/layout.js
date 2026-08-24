import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/comunicacao/',
    locale,
    title: 'Comunicação e Publicidade para Marcas — House Mazzutti Agência',
    description: 'Campanhas de lançamento, conteúdo editorial e gestão de comunicação para marcas em São Paulo. House Mazzutti Agência.',
    image: { src: '/images/agencia/on-take/capa.webp', alt: 'Comunicação e publicidade — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function ComunicacaoLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O que é uma campanha de comunicação integrada?', acceptedAnswer: { '@type': 'Answer', text: 'É uma campanha que alinha mensagem, visual e tom em todos os canais — redes sociais, imprensa, e-mail, eventos e mídia paga — para criar uma percepção consistente da marca.' } },
      { '@type': 'Question', name: 'A House Mazzutti faz gestão de redes sociais?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Agência House Mazzutti oferece gestão de comunicação digital com produção de conteúdo, calendário editorial e direção de imagem alinhada à identidade da marca.' } },
      { '@type': 'Question', name: 'Como funciona uma campanha de lançamento com a House Mazzutti?', acceptedAnswer: { '@type': 'Answer', text: 'Começa com briefing de posicionamento, seguido de conceito criativo, produção do material (foto, vídeo, copy) e distribuição coordenada nos canais relevantes para o público da marca.' } },
      { '@type': 'Question', name: 'A House Mazzutti produz o material visual das campanhas?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Agência trabalha em conjunto com o Studio e a Produtora House Mazzutti para entregar conteúdo fotográfico e audiovisual de alto padrão integrado à estratégia de comunicação.' } },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
