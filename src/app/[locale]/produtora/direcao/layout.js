import { pageMetadata } from '@/lib/seo/metadata'

export function generateMetadata() {
  return pageMetadata({
    path: '/produtora/direcao/',
    title: 'Direção Criativa de Imagem para Marcas — House Mazzutti Produtora',
    description: 'Direção criativa de imagem para fotografia e vídeo. Angelo Mazzutti dirige cada projeto — do conceito ao resultado final — para marcas em São Paulo.',
    image: { src: '/images/produtora/banners/banner-2.webp', alt: 'Direção criativa — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function DirecaoLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O que faz um diretor criativo de imagem?', acceptedAnswer: { '@type': 'Answer', text: 'Um diretor de imagem define o conceito visual de uma produção — do mood ao set design, passando por iluminação, direção de poses e coerência estética com a identidade da marca.' } },
      { '@type': 'Question', name: 'A House Mazzutti oferece direção criativa avulsa para produções?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Angelo Mazzutti pode atuar como diretor criativo em produções de terceiros — agências, marcas ou produtoras — que buscam uma visão criativa de alto nível sem produção completa.' } },
      { '@type': 'Question', name: 'Direção criativa inclui consultoria de marca?', acceptedAnswer: { '@type': 'Answer', text: 'Depende do escopo. A House Mazzutti pode integrar consultoria de posicionamento visual junto à direção criativa, especialmente em lançamentos ou reposicionamentos de marca.' } },
      { '@type': 'Question', name: 'Angelo Mazzutti dirige todas as produções pessoalmente?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A House Mazzutti não terceiriza a direção criativa. Angelo Mazzutti está presente em cada projeto, do briefing ao set e à aprovação final.' } },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
