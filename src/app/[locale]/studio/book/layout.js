import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/studio/book/',
    locale,
    title: 'Book Fotográfico Profissional em São Paulo — House Mazzutti Studio',
    description: 'Book para modelos e artistas com direção criativa de Angelo Mazzutti. Studio próprio em São Paulo, curadoria de looks e entrega high-end.',
    image: { src: '/images/studio/marina-machado/capa.webp', alt: 'Book fotográfico — House Mazzutti Studio', width: 1200, height: 630 },
  })
}

export default function BookLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quanto custa um book fotográfico na House Mazzutti?',
        acceptedAnswer: { '@type': 'Answer', text: 'Os pacotes de book no Studio House Mazzutti variam conforme o escopo — número de looks, locação e direção criativa. Consulte os pacotes detalhados em housemazzutti.com/studio/book/.' }
      },
      {
        '@type': 'Question',
        name: 'O book fotográfico da House Mazzutti inclui maquiagem e styling?',
        acceptedAnswer: { '@type': 'Answer', text: 'Dependendo do pacote, sim. A House Mazzutti oferece curadoria de looks e parceiros de beauty. Angelo Mazzutti dirige a imagem do início ao fim.' }
      },
      {
        '@type': 'Question',
        name: 'Qual é o diferencial do Studio House Mazzutti para books?',
        acceptedAnswer: { '@type': 'Answer', text: 'Direção criativa pessoal de Angelo Mazzutti, studio próprio no bairro Saúde em São Paulo, moodboard estratégico, curadoria de looks e entrega high-end com tratamento profissional.' }
      },
      {
        '@type': 'Question',
        name: 'Em quanto tempo recebo as fotos do book?',
        acceptedAnswer: { '@type': 'Answer', text: 'O prazo de entrega varia por pacote e é informado no briefing. Em geral, entre 10 e 20 dias úteis após a sessão, com tratamento de imagem incluso.' }
      },
    ],
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
