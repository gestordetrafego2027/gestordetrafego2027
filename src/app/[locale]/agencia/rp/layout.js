import { pageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    path: '/agencia/rp/',
    locale,
    title: 'RP e Marketing Direto para Marcas — House Mazzutti Agência',
    description: 'Relações públicas, assessoria de imprensa e marketing direto para marcas de luxo e lifestyle em São Paulo. House Mazzutti Agência.',
    image: { src: '/images/agencia/banners/banner-2.webp', alt: 'RP e Marketing Direto — House Mazzutti', width: 1200, height: 630 },
  })
}

export default function RpLayout({ children }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O que faz uma assessoria de imprensa para marcas?', acceptedAnswer: { '@type': 'Answer', text: 'Constrói relacionamento com veículos e jornalistas, pauta aparições editoriais, coordena entrevistas e garante que a narrativa da marca seja contada da forma certa nos lugares certos.' } },
      { '@type': 'Question', name: 'A House Mazzutti trabalha com RP para marcas de luxo?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. A Agência House Mazzutti tem experiência em RP para marcas de lifestyle, moda, beleza e mercado criativo, com foco em presença em mídia premium e eventos estratégicos.' } },
      { '@type': 'Question', name: 'RP e marketing direto são a mesma coisa?', acceptedAnswer: { '@type': 'Answer', text: 'Não. RP foca em reputação e presença editorial — sem pagamento por espaço. Marketing direto usa canais pagos ou proprietários (e-mail, WhatsApp, SMS) para atingir o público com mensagens específicas.' } },
      { '@type': 'Question', name: 'Como a House Mazzutti mede os resultados de RP?', acceptedAnswer: { '@type': 'Answer', text: 'Por publicações conquistadas, alcance estimado, qualidade dos veículos e impacto na percepção de marca — métricas alinhadas ao briefing estratégico definido no início do projeto.' } },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
