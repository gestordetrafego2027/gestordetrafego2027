// Schemas JSON-LD por tipo de página — House Mazzutti.
// Usa @/config/site como fonte única; nada é hardcodado aqui.
// Injete via <script type="application/ld+json"> no layout ou page de cada rota.

import {brand, contact, nap, social, leadership} from '@/config/site'

const SITE = brand.url
const ORG_ID = `${SITE}/#organization`

// ---------------------------------------------------------------------------
// Breadcrumb helper
// ---------------------------------------------------------------------------
export function breadcrumbSchema(items) {
  // items: [{ name, url }]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ---------------------------------------------------------------------------
// Service schemas — uma por unidade
// ---------------------------------------------------------------------------
export const agenciaServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/agencia/#service`,
  name: 'Branding e Direção Criativa',
  serviceType: 'Branding',
  url: `${SITE}/pt/agencia/`,
  description:
    'Branding, web e comunicação para marcas que querem presença com estratégia em São Paulo. Direção criativa autoral sob Angelo Mazzutti.',
  areaServed: {
    '@type': 'City',
    name: 'São Paulo',
    '@id': 'https://www.wikidata.org/wiki/Q174',
  },
  provider: {'@id': ORG_ID},
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços da Agência HMZT',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Branding',
          description: 'Identidade de marca, posicionamento e sistema visual.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web',
          description: 'Sites e landing pages com direção criativa.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Comunicação',
          description: 'Estratégia de marca e comunicação integrada.',
        },
      },
    ],
  },
}

export const brandingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/agencia/branding/#service`,
  name: 'Branding e Identidade de Marca',
  serviceType: 'Branding',
  url: `${SITE}/pt/agencia/branding/`,
  description:
    'Naming, identidade visual e posicionamento para marcas que precisam ser reconhecidas antes de serem explicadas. Da imersão ao fine art, em 35 a 75 dias.',
  areaServed: {
    '@type': 'City',
    name: 'São Paulo',
    '@id': 'https://www.wikidata.org/wiki/Q174',
  },
  provider: {'@id': ORG_ID},
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Branding Project — House Mazzutti',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Naming', description: 'Nome com fonética, disponibilidade e território de posicionamento definidos.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Identidade Visual', description: 'Logo, paleta, tipografia e sistema gráfico aplicável em qualquer ponto de contato.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tom de Voz', description: 'A linguagem da marca — como ela fala, o que afirma, o que recusa.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Arquitetura de Marca', description: 'Hierarquia clara entre marca, linhas e sub-marcas.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Book', description: 'Manual com todas as regras de uso, reduções e aplicações.' } },
    ],
  },
}

export const brandingFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto tempo leva um projeto de branding na House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entre 35 e 75 dias, conforme o escopo. A imersão começa na semana um; a entrega final fecha o ciclo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre branding e identidade visual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Identidade visual é como a marca aparece. Branding é por que ela é reconhecida. O primeiro é parte — o segundo é o todo.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti atende marcas fora de São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O processo é remoto na maior parte — imersão, leitura e aprovações acontecem à distância, com a mesma precisão.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o investimento em um Branding Project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sob proposta. O valor responde ao escopo — da marca inteira a uma etapa específica. A leitura inicial define o tamanho do projeto.',
      },
    },
  ],
}

export const studioServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/studio/#service`,
  name: 'Book, Ensaio e Direção de Imagem Pessoal',
  serviceType: 'Fotografia e direção de imagem',
  url: `${SITE}/pt/studio/`,
  description:
    'Book, ensaio e cobertura com direção de imagem pessoal em São Paulo. Foto e vídeo com intenção, sob direção de Angelo Mazzutti.',
  areaServed: {
    '@type': 'City',
    name: 'São Paulo',
    '@id': 'https://www.wikidata.org/wiki/Q174',
  },
  provider: {'@id': ORG_ID},
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços do Studio HMZT',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Book',
          description:
            'Book fotográfico com direção de imagem editorial para modelo ou profissional.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ensaio Pessoal',
          description:
            'Ensaio de imagem pessoal e de autoridade para presença profissional.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cobertura',
          description: 'Cobertura externa e em tempo real de eventos e ativações.',
        },
      },
    ],
  },
}

export const produtoraServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/#service`,
  name: 'Produção de Moda, Beleza e Publicidade',
  serviceType: 'Produção audiovisual e execução de campanhas',
  url: `${SITE}/pt/produtora/`,
  description:
    'Produção executiva, casting e set design para campanhas de moda, beleza e publicidade. Produtora da House Mazzutti em São Paulo.',
  areaServed: {
    '@type': 'City',
    name: 'São Paulo',
    '@id': 'https://www.wikidata.org/wiki/Q174',
  },
  provider: {'@id': ORG_ID},
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços da Produtora HMZT',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Campanha de Moda',
          description:
            'Produção completa de campanhas de moda — conceito, casting, set e direção.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Publicidade',
          description: 'Produção executiva de filmes e peças publicitárias.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Set Design',
          description: 'Criação e execução de set design para campanhas e editoriais.',
        },
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// FAQPage schemas — uma por unidade
// ---------------------------------------------------------------------------
export const agenciaFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto tempo leva um projeto de branding na House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um branding project completo leva entre 6 e 12 semanas, dependendo da complexidade da marca. O processo passa por Imersão, Leitura de Mercado, Conceito, Execução e Fine Art antes da entrega final.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre branding e identidade visual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Identidade visual é o sistema gráfico (logo, cores, tipografia). Branding é a arquitetura de valor da marca — posicionamento, voz, estratégia e como tudo isso se traduz visualmente. Na House Mazzutti, fazemos branding completo, da estratégia à execução.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti atende marcas fora de São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Atendemos marcas de todo o Brasil remotamente. Para projetos que exigem presença em set, operamos principalmente em São Paulo, mas realizamos produções em outras cidades mediante agendamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o investimento em um branding project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada projeto é orçado individualmente após uma conversa de briefing. O investimento varia de acordo com a escopo — marca nova, reposicionamento ou sistema completo. Entre em contato pelo formulário para receber uma proposta.',
      },
    },
  ],
}

export const studioFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Como funciona um book no Studio da House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O processo começa com uma conversa de briefing para entender seu objetivo — modelo, empresária, influenciadora ou executiva. A partir daí, desenvolvemos o conceito visual, selecionamos locações e realizamos a sessão com direção de imagem editorial. As imagens passam por edição e finalização profissional antes da entrega.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que está incluso em um ensaio pessoal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O ensaio pessoal inclui briefing de conceito, direção de imagem, locação planejada, sessão fotográfica e/ou de vídeo, edição e entrega das imagens selecionadas em alta resolução. A quantidade de imagens e o tempo de sessão variam conforme o pacote escolhido.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vocês fazem cobertura de eventos em São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A House Mazzutti realiza cobertura externa de eventos, ativações de marca, inaugurações e lançamentos. Trabalhamos com foto e vídeo em tempo real, com direção e curadoria de imagem no próprio evento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto custa um book profissional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O investimento varia de acordo com o escopo — modelo, empresária ou executiva; meia sessão ou sessão completa; foto ou foto + vídeo. Entre em contato para receber a tabela de pacotes e uma proposta personalizada.',
      },
    },
  ],
}

export const produtoraFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que uma produtora executiva faz numa campanha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A produtora executiva é responsável por tudo que acontece antes, durante e depois do set: orçamento, cronograma, contratação de equipe técnica, casting, locações, set design, direção de arte e entrega final. Na House Mazzutti, esse processo é integrado à direção criativa desde o conceito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vocês cuidam de casting e set design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A Produtora HMZT cobre casting (seleção de modelos e talentos), set design (criação e execução do ambiente de set) e toda a coordenação de produção. Tudo sob uma única direção criativa.',
      },
    },
    {
      '@type': 'Question',
      name: 'A Produtora atende marcas de moda e beleza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim — moda e beleza são os segmentos principais da Produtora HMZT. Temos experiência em campanhas de marcas de cosméticos, moda feminina, joias e acessórios, além de campanhas institucionais.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como começar uma campanha com a House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O primeiro passo é uma conversa de briefing — objetivo da campanha, produto, público e referências. A partir daí, desenvolvemos o conceito criativo e apresentamos a proposta de produção. Use o formulário de contato ou o WhatsApp para iniciar.',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// BlogPosting schema helper
// ---------------------------------------------------------------------------
export function blogPostingSchema({slug, titulo, metaDescription, data, cover}) {
  const url = `${SITE}/pt/blog/${slug}/`
  // Converte data "Abril 2026" → formato ISO aproximado
  const months = {
    Janeiro: '01', Fevereiro: '02', Março: '03', Abril: '04',
    Maio: '05', Junho: '06', Julho: '07', Agosto: '08',
    Setembro: '09', Outubro: '10', Novembro: '11', Dezembro: '12',
  }
  let dateISO = ''
  if (data) {
    const [mes, ano] = data.split(' ')
    dateISO = months[mes] ? `${ano}-${months[mes]}-01` : ''
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: titulo,
    description: metaDescription,
    url,
    ...(dateISO && {datePublished: dateISO, dateModified: dateISO}),
    author: {
      '@type': 'Person',
      '@id': `${SITE}/pt/angelo/#angelo`,
      name: leadership.angelo.name,
    },
    publisher: {'@id': ORG_ID},
    ...(cover && {
      image: {
        '@type': 'ImageObject',
        url: `${SITE}${cover.src}`,
        description: cover.alt,
      },
    }),
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
  }
}
