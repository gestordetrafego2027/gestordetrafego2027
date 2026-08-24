// Schemas JSON-LD por tipo de página — House Mazzutti.
// Usa @/config/site como fonte única; nada é hardcodado aqui.
// Injete via <script type="application/ld+json"> no layout ou page de cada rota.

import {brand, contact, nap, social, leadership, timeline} from '@/config/site'

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
// Agência — subpages de serviço
// ---------------------------------------------------------------------------
export const comunicacaoServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/agencia/comunicacao/#service`,
  name: 'Comunicação de Marca',
  serviceType: 'Comunicação e Conteúdo Estratégico',
  url: `${SITE}/pt/agencia/comunicacao/`,
  description:
    'Estratégia e comunicação de marca em São Paulo: conteúdo, social e campanhas com direção criativa autoral da House Mazzutti.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const webServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/agencia/web/#service`,
  name: 'Sites e Web Design',
  serviceType: 'Desenvolvimento Web',
  url: `${SITE}/pt/agencia/web/`,
  description:
    'Desenvolvimento web e landing pages orientados à conversão em São Paulo. Sites que carregam a marca com precisão, sob direção criativa da House Mazzutti.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const rpServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/agencia/rp/#service`,
  name: 'RP e Marketing Direto',
  serviceType: 'Relações Públicas',
  url: `${SITE}/pt/agencia/rp/`,
  description:
    'Assessoria de imprensa, relações públicas e marketing direto para marcas que constroem reputação. House Mazzutti — São Paulo.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

// ---------------------------------------------------------------------------
// Agência — subpages FAQ schemas
// ---------------------------------------------------------------------------
export const comunicacaoFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é comunicação de marca e por que ela importa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Comunicação de marca é o conjunto de estratégias e mensagens que constroem a percepção da empresa no mercado. Importa porque posiciona antes do produto chegar — é o que faz uma marca ser reconhecida, lembrada e escolhida. Na House Mazzutti, comunicação é tratada como extensão do branding, não como produção de conteúdo isolada.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti cria estratégia de conteúdo e gerencia redes sociais?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A agência desenvolve estratégia de conteúdo, calendário editorial, direção de arte para redes e campanhas de comunicação integrada. O ponto de partida é sempre o posicionamento da marca — o conteúdo serve à estratégia, não o contrário.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre comunicação de marca e marketing de conteúdo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Marketing de conteúdo gera tráfego e engajamento. Comunicação de marca constrói percepção e posicionamento. O primeiro foca em volume; o segundo, em relevância e reconhecimento. Na House Mazzutti, integramos os dois: cada peça de conteúdo tem estratégia de marca por trás.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a House Mazzutti integra comunicação com branding e produção?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sob uma única direção criativa. A Agência (branding e comunicação), o Studio (imagem) e a Produtora (campanhas e vídeo) são unidades da mesma casa — o que elimina o atrito entre briefing, criação e execução. O resultado é comunicação coerente em todos os pontos de contato da marca.',
      },
    },
  ],
}

export const webFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'A House Mazzutti cria sites ou apenas os projeta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A House Mazzutti entrega projetos web completos: do conceito visual ao desenvolvimento e publicação. O processo integra direção criativa e UX — o site é construído para comunicar a marca com precisão e converter visita em decisão.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo leva para criar um site pela House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um site institucional completo leva entre 4 e 8 semanas, da reunião de briefing ao go-live, dependendo do número de páginas, integrações e funcionalidades. Landing pages focadas em conversão têm prazo mais curto — em geral, 2 a 3 semanas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Os sites da House Mazzutti são otimizados para SEO e conversão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Todos os projetos web são desenvolvidos com foco em SEO técnico (meta, schema, velocidade, Core Web Vitals) e otimização de conversão: hierarquia de informação, CTAs estratégicos e UX alinhado ao posicionamento da marca.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti usa WordPress, Wix ou plataformas customizadas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A escolha da stack técnica depende do escopo e dos objetivos do projeto. Trabalhamos com plataformas modernas (Next.js, WordPress, webflow) e sistemas customizados conforme o que a marca precisa. O critério não é a ferramenta — é a performance.',
      },
    },
  ],
}

export const rpFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é assessoria de imprensa e quando uma marca precisa de uma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Assessoria de imprensa é o serviço que posiciona a marca nos meios de comunicação certos — editores, jornalistas, influenciadores e veículos formadores de opinião. Uma marca precisa de RP quando quer construir autoridade, crescer com presença orgânica e ser lembrada como referência no seu setor.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti faz RP para marcas de moda e beleza em São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A agência tem experiência em RP para marcas de moda, beleza, lifestyle e negócios criativos. Em São Paulo, onde o mercado criativo é o mais competitivo do país, presença consistente nos lugares certos é a diferença entre uma marca conhecida e uma relevante.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre RP e marketing de influência?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RP constrói credibilidade por meio de veículos jornalísticos e formadores de opinião — a menção tem autoridade editorial. Marketing de influência gera alcance e engajamento por meio de criadores de conteúdo. Ambos constroem presença, mas com mecanismos e públicos diferentes. Na House Mazzutti, integramos os dois quando o objetivo da marca exige os dois frentes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o processo de RP na House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Começa com mapeamento de posicionamento da marca e dos veículos e formadores de opinião estratégicos. A seguir, desenvolvemos o material de imprensa (releases, media kit, pitch), construímos o relacionamento com os contatos certos e monitoramos os resultados. O objetivo é presença consistente, não clipping pontual.',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// Studio — subpages de serviço
// ---------------------------------------------------------------------------
export const bookServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/studio/book/#service`,
  name: 'Book Fotográfico Profissional',
  serviceType: 'Fotografia de Moda e Imagem Pessoal',
  url: `${SITE}/pt/studio/book/`,
  description:
    'Book fotográfico profissional para modelos e talentos em São Paulo. Direção de imagem editorial que define quem o mercado escolhe.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const ensaioServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/studio/ensaio/#service`,
  name: 'Ensaio de Imagem Pessoal',
  serviceType: 'Fotografia de Imagem de Autoridade',
  url: `${SITE}/pt/studio/ensaio/`,
  description:
    'Ensaio pessoal e de imagem de autoridade em São Paulo. Presença que posiciona antes da conversa começar. Studio House Mazzutti.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const coberturaServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/studio/cobertura/#service`,
  name: 'Cobertura Fotográfica de Eventos',
  serviceType: 'Cobertura Fotográfica e de Vídeo',
  url: `${SITE}/pt/studio/cobertura/`,
  description:
    'Cobertura externa de eventos, ativações e lançamentos em São Paulo. Foto e vídeo em tempo real com direção de imagem. Studio House Mazzutti.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

// ---------------------------------------------------------------------------
// Produtora — subpages de serviço
// ---------------------------------------------------------------------------
export const modaServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/moda/#service`,
  name: 'Produtora de Moda',
  serviceType: 'Produção de Campanhas de Moda',
  url: `${SITE}/pt/produtora/moda/`,
  description:
    'Produtora de moda e fashion films em São Paulo: campanhas, editoriais e direção de arte da concepção ao master final. House Mazzutti.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const institucionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/institucional/#service`,
  name: 'Produção Institucional',
  serviceType: 'Vídeo Institucional e Corporativo',
  url: `${SITE}/pt/produtora/institucional/`,
  description:
    'Produção de vídeos institucionais e corporativos em São Paulo. Conceito, direção e entrega final pela Produtora House Mazzutti.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const publicidadeServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/publicidade/#service`,
  name: 'Produção Publicitária',
  serviceType: 'Produção de Filmes Publicitários',
  url: `${SITE}/pt/produtora/publicidade/`,
  description:
    'Produção executiva de filmes e peças publicitárias em São Paulo. Equipe completa, direção criativa integrada. Produtora House Mazzutti.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

// ---------------------------------------------------------------------------
// Studio — subpages FAQ schemas
// ---------------------------------------------------------------------------
export const bookFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto custa um book profissional em São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O investimento em um book fotográfico profissional no Studio da House Mazzutti varia conforme o escopo: modelo, empresária ou executiva; meia sessão ou sessão completa; somente foto ou foto + vídeo. O valor final responde ao briefing, à locação e ao nível de direção criativa envolvido. Entre em contato para receber a tabela de pacotes e uma proposta personalizada.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o processo de um book no Studio da House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O processo começa com um briefing estratégico: leitura de perfil, posicionamento desejado no mercado e mercado-alvo. A partir daí, desenvolvemos o moodboard, selecionamos locações e realizamos a sessão com direção de imagem editorial. As imagens passam por curadoria, edição e finalização profissional antes da entrega em alta resolução.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre um book para modelo e um ensaio pessoal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O book para modelo é construído para o mercado de agências e castings — prioriza versatilidade editorial, variação de linguagem e leitura de produto. O ensaio pessoal é construído para imagem de autoridade — posiciona o profissional, empresário ou influenciador na percepção do seu público. Ambos passam pelo mesmo processo de direção criativa no Studio HMZT, mas com narrativa e entregáveis distintos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Preciso ter experiência fotográfica para fazer um book?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. A direção de imagem é o que distingue um book do Studio HMZT. Você não precisa saber posar — é exatamente aí que entra a direção: orientação de expressão, pose e movimento em tempo real durante toda a sessão.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo leva para receber as fotos depois do book?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O prazo de entrega varia conforme o pacote escolhido, mas em geral as imagens editadas e finalizadas são entregues entre 7 e 15 dias úteis após a sessão. O processo inclui curadoria, retoque e exportação em alta resolução.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Studio da House Mazzutti atende clientes fora de São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Realizamos sessões com clientes de outras cidades mediante agendamento em São Paulo. A maioria dos clientes de fora agenda briefing e moodboard remotamente e vem para SP na data da sessão. Entre em contato para verificar disponibilidade.',
      },
    },
  ],
}

export const ensaioFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Para quem é o ensaio pessoal do Studio da House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O ensaio pessoal é para empresários, profissionais liberais, influenciadores e executivos que querem uma imagem que posicione antes da conversa começar. Não é um retrato corporativo — é uma leitura visual de quem você é e onde você quer ser percebido.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre ensaio pessoal e book profissional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O ensaio pessoal foca em imagem de autoridade e presença de marca pessoal, com aplicação em redes sociais, site e mídia. O book profissional é voltado ao mercado de agências, castings e marcas — tem linguagem mais editorial e busca versatilidade comercial. Ambos partem de uma direção criativa no Studio HMZT.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a House Mazzutti dirige um ensaio pessoal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O processo começa com um briefing de marca pessoal: quem você é, onde atua, que percepção quer gerar e em que plataformas as imagens serão usadas. A partir daí, desenvolvemos conceito visual, locação e direção de imagem — tudo alinhado ao posicionamento. O ensaio é conduzido com orientação de pose, expressão e narrativa visual em tempo real.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo dura uma sessão de ensaio pessoal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uma sessão completa de ensaio pessoal dura entre 2 e 4 horas, dependendo do número de looks e locações previstas no briefing. Meia sessão tem duração média de 1h30. O tempo de entrega das imagens editadas é de 7 a 15 dias úteis.',
      },
    },
  ],
}

export const coberturaFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que está incluído em uma cobertura fotográfica de evento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cobertura do Studio HMZT inclui briefing prévio do evento, presença de fotógrafo e/ou cinegrafista com direção criativa durante o evento, curadoria e edição das imagens e entrega em alta resolução no prazo acordado. Para grandes eventos, oferecemos também vídeo de cobertura e highlight.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre cobertura de evento e fotógrafo de evento convencional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cobertura convencional registra o que acontece. A cobertura do Studio HMZT dirige a narrativa visual do evento: sabe qual momento capturar, como enquadrar para redes e mídia, e entrega imagens que posicionam a marca — não apenas documentam a ocasião.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vocês fazem cobertura de eventos corporativos e de moda em São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A House Mazzutti realiza cobertura de lançamentos, ativações de marca, eventos corporativos, shows, desfiles e inaugurações em São Paulo. Para eventos em outras cidades, consulte disponibilidade.',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// Produtora — subpages FAQ schemas
// ---------------------------------------------------------------------------
export const modaFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é um fashion film e para que serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um fashion film é um vídeo autoral que combina estética de moda com narrativa cinematográfica. Serve para campanhas de lançamento, identidade de coleção, conteúdo premium para redes sociais e posicionamento de marca no mercado de moda e beleza. Na Produtora HMZT, o fashion film nasce de um conceito — não de uma tendência.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona uma produção de campanha de moda na House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O processo começa com briefing de marca e objetivo de campanha. A seguir: conceito criativo, definição de casting, locações e set design, produção executiva (cronograma, equipe técnica, orçamento), dia de set com direção de arte e filmagem ou fotografia, e entrega do master final. Tudo sob uma única direção criativa — da ideia ao arquivo.',
      },
    },
    {
      '@type': 'Question',
      name: 'A produtora de moda da House Mazzutti cuida de casting e set design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A Produtora HMZT cobre casting (seleção de modelos e talentos alinhados ao conceito), set design (criação e montagem do ambiente de set) e toda a coordenação de produção. Não tercerizamos a direção criativa: tudo passa pela mesma mente que criou o conceito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais marcas de moda e beleza já trabalharam com a House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Produtora HMZT já realizou campanhas para WePink, Océane, Elyah, Jequiti, Natália Beauty, Dumond, Unique Chic, Poéma Paris, Signus e Camilla Scarpa, entre outras marcas de moda, beleza, joias e acessórios.',
      },
    },
  ],
}

export const publicidadeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que faz uma produtora de publicidade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uma produtora publicitária executa a produção de filmes, peças e campanhas: direção criativa, casting, locações, set design, filmagem, edição e entrega do master final. Na House Mazzutti, a produção é integrada à direção criativa desde o conceito — não existe separação entre quem pensa e quem executa.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a House Mazzutti produz um filme publicitário?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O processo começa com o briefing da marca: objetivo de campanha, produto, público e referências. A partir daí: conceito, roteiro, planejamento de set, dia de filmagem com direção, edição e finalização. O prazo e o investimento são definidos conforme o escopo do filme e a complexidade de produção.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti produz campanhas para marcas pequenas e médias?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A produtora atende desde campanhas de marcas emergentes até grandes marcas nacionais. O escopo e o investimento são adequados ao objetivo — o nível de direção criativa e qualidade de execução são os mesmos, independentemente do tamanho da marca.',
      },
    },
  ],
}

export const institucionalFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é um vídeo institucional e quando uma empresa precisa de um?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um vídeo institucional é a apresentação audiovisual da empresa — quem ela é, o que faz, por que importa e para quem. É necessário quando a marca está crescendo, reestruturando comunicação, lançando um site novo, captando investimento ou consolidando sua presença no mercado. Na House Mazzutti, o institucional é tratado como peça de posicionamento, não como relatório em vídeo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo leva para produzir um vídeo institucional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um vídeo institucional completo leva entre 3 e 6 semanas, da reunião de briefing à entrega do master. O prazo depende da complexidade de produção: número de locações, entrevistas, animações e revisões previstas. Projetos com urgência podem ser acelerados mediante planejamento específico.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti produz vídeos institucionais para empresas de quais setores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Produtora HMZT atende empresas de moda, beleza, saúde, gastronomia, educação, serviços e varejo. O que une todos os projetos é a direção criativa autoral: cada institucional nasce de uma leitura da marca, não de um template.',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// Angelo Mazzutti — Person entity (GEO / AEO / Knowledge Panel)
// sameAs lista todos os perfis públicos para desambiguação de entidade.
// ---------------------------------------------------------------------------
export const angeloPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE}/pt/angelo/#angelo`,
  name: leadership.angelo.name,
  jobTitle: leadership.angelo.role,
  description: leadership.angelo.bio,
  url: `${SITE}/pt/sobre/`,
  image: {
    '@type': 'ImageObject',
    url: `${SITE}/images/sobre/angelo-mazzutti.webp`,
    description: 'Angelo Mazzutti — Diretor Criativo da House Mazzutti em São Paulo',
  },
  worksFor: {'@id': ORG_ID},
  knowsAbout: [
    'Direção Criativa',
    'Branding',
    'Direção de Imagem',
    'Produção Audiovisual',
    'Fotografia Editorial',
    'Fashion Film',
    'Identidade Visual',
    'Posicionamento de Marca',
    'Produção de Moda',
  ],
  sameAs: [
    social.instagram.url,
    social.linkedin.url,
    social.youtube.url,
    social.facebook.url,
  ],
}

// ---------------------------------------------------------------------------
// LocalBusiness — NAP completo (Local SEO + Google Business Profile)
// Importante: @id reusa ORG_ID para unificar a entidade em todos os schemas.
// ---------------------------------------------------------------------------
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': ORG_ID,
  name: brand.name,
  alternateName: [...brand.alternateNames],
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: brand.logo,
    description: 'Logotipo House Mazzutti',
  },
  description: brand.tagline,
  telephone: contact.phone,
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: nap.street,
    addressLocality: nap.city,
    addressRegion: nap.region,
    postalCode: nap.postalCode,
    addressCountry: nap.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.615,
    longitude: -46.633,
  },
  areaServed: {
    '@type': 'City',
    name: 'São Paulo',
    '@id': 'https://www.wikidata.org/wiki/Q174',
  },
  priceRange: '$$$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  founder: {'@id': `${SITE}/pt/angelo/#angelo`},
  foundingDate: String(timeline.foundedYear),
  sameAs: [
    social.instagram.url,
    social.linkedin.url,
    social.youtube.url,
    social.facebook.url,
    'https://www.wikidata.org/wiki/Q141168351',
  ],
}

// ---------------------------------------------------------------------------
// SpeakableSpecification helper
// Gera um WebPage schema com speakable — sinaliza parágrafos-chave para IAs.
// cssSelectors: lista de seletores CSS que marcam o conteúdo falável.
// ---------------------------------------------------------------------------
export function speakableSchema(url, cssSelectors = ['h1', '.speakable', '[data-speakable]']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  }
}

// ---------------------------------------------------------------------------
// HowTo schemas — capturam featured snippet e respostas diretas em SGE / Perplexity
// ---------------------------------------------------------------------------
export const howToEnsaioSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como se preparar para um ensaio fotográfico',
  description:
    'Guia completo para se preparar para um ensaio pessoal ou book fotográfico profissional — do briefing ao dia da sessão no Studio HMZT.',
  totalTime: 'P2H',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Defina o objetivo do ensaio',
      text: 'Antes da sessão, tenha clareza sobre o propósito: book para agências, ensaio de imagem de autoridade para redes profissionais ou atualização de portfólio? O objetivo define toda a direção criativa.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Faça o briefing com o fotógrafo',
      text: 'Compartilhe referências visuais, o público-alvo das imagens e onde elas serão usadas (Instagram, LinkedIn, site, imprensa). Quanto mais contexto, mais assertiva é a direção.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Cuide do figurino com antecedência',
      text: 'Separe de 2 a 4 looks — varie entre casual, profissional e editorial. Prefira roupas que já usou e se sente confortável. Evite listras finas e logos grandes, que distraem na foto.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Cuide da pele e do cabelo',
      text: 'Hidrate bem nos dias anteriores. Para o cabelo, faça hidratação 2 dias antes — evite cortes ou colorações novas na véspera. A maquiagem deve ser compatível com o conceito do ensaio.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Durma bem na véspera',
      text: 'A câmera capta cansaço. Uma boa noite de sono é o melhor preparo técnico — mais eficaz do que qualquer produto ou técnica de última hora.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Chegue no horário e confie na direção',
      text: 'Chegar pontual preserva o tempo de aquecimento da sessão. Confie na direção do fotógrafo: as melhores fotos surgem quando se para de pensar em posar e se começa a sentir a cena.',
    },
  ],
}

export const howToBookModeloSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como fazer um book de modelo profissional',
  description:
    'Passo a passo para produzir um book fotográfico de modelo que comunica versatilidade editorial e potencial comercial para agências e castings.',
  totalTime: 'P3H',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Defina o mercado-alvo do book',
      text: 'Identifique para onde o book vai trabalhar: alta moda, moda comercial, publicidade ou entretenimento. Cada mercado exige linguagem visual e variações distintas no material.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Escolha o fotógrafo pela direção, não pela câmera',
      text: 'O que diferencia um book profissional é a direção de imagem — como o fotógrafo lê o talento, orienta pose e expressão. Avalie o portfólio pela direção criativa, não pela resolução das fotos.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Planeje os looks e locações',
      text: 'Um book equilibrado tem pelo menos 3 tipos de look: comercial (limpo, legível), editorial (autoral, com mood) e neutro (rosto, expressão). As locações devem reforçar o mood sem competir com o talento.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Esteja aberto à direção na sessão',
      text: 'Na sessão, abertura para receber direção vale mais do que segurança técnica. Os melhores quadros surgem quando o modelo para de controlar e começa a confiar na orientação do fotógrafo.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Faça a curadoria com critério comercial',
      text: 'Selecione as imagens com base no que o mercado compra, não no que você mais gostou. Cada foto do book deve responder a um tipo de casting ou marca — não a uma preferência pessoal.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Distribua nos canais certos',
      text: 'Envie para agências, diretores de casting e marcas relevantes. Atualize o perfil digital com as melhores imagens. Um book só funciona quando está em movimento — circulando pelos lugares certos.',
    },
  ],
}

export const howToBrandingSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como contratar uma agência de branding premium em São Paulo',
  description:
    'Guia passo a passo para escolher e contratar uma agência de branding de alto nível — do briefing à proposta — sem desperdiçar tempo nem orçamento.',
  totalTime: 'P5D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Defina o problema, não a solução',
      text: 'Antes de falar com qualquer agência, nomeie o problema real: "somos vistos como genéricos", "perdemos clientes para concorrentes mais caros" ou "ninguém entende o que fazemos". O problema, não a lista de peças desejadas, é o briefing que uma agência de branding sério vai querer responder.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Avalie portfólio pela consistência, não pelo volume',
      text: 'Portfolio de branding deve mostrar o antes e o depois de percepção de marca — não apenas belas logomarcas. Procure coerência entre posicionamento declarado e resultado visual. Uma agência que não consegue articular por que fez cada escolha provavelmente seguiu referência, não estratégia.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Exija processo antes de proposta',
      text: 'Qualquer agência séria tem um processo documentado: como faz imersão, como define território de marca, como valida conceito. Se a primeira reunião já vem com proposta e preço, sem perguntas sobre o negócio, é sinal de que o processo é cosmético.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Alinhe escopo e expectativa de prazo',
      text: 'Branding real leva tempo. Uma identidade bem construída exige de 4 a 8 semanas de processo estratégico antes de qualquer entrega visual. Propostas que prometem identidade completa em 1 semana entregam execução sem estratégia.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Avalie quem vai trabalhar no projeto',
      text: 'Em agências premium, o sócio que apresenta não é necessariamente quem executa. Pergunte diretamente quem vai conduzir o seu projeto e solicite ver trabalhos dessa pessoa especificamente. Na House Mazzutti, Angelo Mazzutti dirige pessoalmente cada projeto de branding.',
    },
  ],
}

export const howToFashionFilmSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como produzir um fashion film para lançamento de coleção',
  description:
    'Passo a passo para planejar e executar um fashion film que posiciona a marca, serve ao algoritmo e dura além do lançamento.',
  totalTime: 'P14D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Defina o objetivo antes do conceito',
      text: 'Um fashion film pode servir a objetivos distintos: apresentar uma coleção, consolidar o território visual da marca, marcar uma virada de posicionamento ou criar conteúdo de arquivo. O objetivo define a linguagem, o ritmo de corte e onde o filme vai circular.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Construa o conceito criativo com o diretor',
      text: 'O conceito é a frase que governa cada decisão de produção — casting, locação, figurino, trilha e corte. Um fashion film sem conceito vira "imagens bonitas de roupa". Com conceito, cada quadro comunica território de marca mesmo sem legenda.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Defina casting e locação pelo conceito, não pelo orçamento',
      text: 'Casting e locação são as primeiras decisões a comunicar posicionamento. Um elenco que destoa do território visual da marca ou uma locação genérica comprometem o resultado independentemente de qualidade técnica de câmera e iluminação.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Planeje os formatos de entrega antes das filmagens',
      text: 'Defina antes de gravar quais formatos serão necessários: longa (1-3 min para site e YouTube), corte para Reels/TikTok (15-30s), stills extraídos das cenas. Gravar para reformatar depois gera desperdício de material e cortes que não funcionam.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Reserve orçamento para trilha e colorização',
      text: 'Trilha e colorização são as etapas que mais transformam material bom em material memorável — e as mais cortadas em orçamento reduzido. Um fashion film com imagem competente e trilha genérica perde 60% do impacto emocional.',
    },
  ],
}

export const howToDirecaoCriativaSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como contratar direção criativa para campanhas de marca',
  description:
    'Guia objetivo para marcas que querem contratar um diretor criativo — o que avaliar, o que perguntar e o que evitar no processo de seleção.',
  totalTime: 'P7D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Entenda o que direção criativa realmente entrega',
      text: 'Direção criativa não é sobre execução visual — é sobre a decisão estratégica que vem antes de qualquer produção. Um diretor criativo define o conceito, o território de percepção e o critério que governa cada escolha de casting, locação, iluminação e corte.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Avalie portfólio pela consistência de decisão',
      text: 'Em um portfólio de direção criativa, o que importa não é a beleza das peças — é a coerência entre o problema de marca e a solução visual. Pergunte ao diretor: "qual era o problema que esse projeto precisava resolver?". A qualidade da resposta é mais reveladora do que a imagem.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Exija processo documentado de briefing',
      text: 'Um diretor criativo sério tem um processo de imersão: como lê a marca, como mapeia o mercado, como valida conceito antes de abrir produção. Processo é a diferença entre decisão e chute — e entre um projeto com convicção e um projeto com versões.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Verifique experiência com o território da sua marca',
      text: 'Direção criativa em moda exige leitura diferente de direção em B2B ou gastronomia. A linguagem visual, o ritmo, o casting e os referentes são categorias distintas. Confirme que o diretor tem trabalho concreto no território em que sua marca compete.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Alinhe quem decide o quê antes de começar',
      text: 'Direção criativa funciona quando o diretor tem autonomia para defender o conceito. Define antes o processo de aprovação: quem vota, em que momento, com base em que critério. Um processo onde qualquer stakeholder pode alterar qualquer peça sem critério vai invalidar a direção.',
    },
  ],
}

// ---------------------------------------------------------------------------
// VideoObject schemas — fashion films e vídeos institucionais (Rich Results)
// Cada schema usa o short do YouTube como embedUrl e a primeira imagem do portfólio
// como thumbnailUrl.
// ---------------------------------------------------------------------------
export const videoObjectBarbaraPorto = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${SITE}/pt/produtora/moda/#video-barbara-porto`,
  name: 'Fashion Film — Bárbara Porto Joias | House Mazzutti',
  description:
    'Fashion film para Bárbara Porto Joias — House Mazzutti Produtora, São Paulo. Direção criativa Angelo Mazzutti.',
  thumbnailUrl: `${SITE}/images/produtora/acessorios/barbara-porto/1.webp`,
  embedUrl: 'https://youtube.com/shorts/YbQQLxWJf_s',
  uploadDate: '2025-01-01',
  publisher: {'@id': ORG_ID},
  director: {'@id': `${SITE}/pt/angelo/#angelo`},
  inLanguage: 'pt-BR',
  keywords: 'fashion film, joias, Bárbara Porto, produtora de moda São Paulo, House Mazzutti',
}

export const videoObjectJequiti = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${SITE}/pt/produtora/publicidade/#video-jequiti`,
  name: 'Campanha Jequiti — House Mazzutti Produtora',
  description:
    'Produção audiovisual de campanha Jequiti — House Mazzutti Produtora, São Paulo. Direção criativa Angelo Mazzutti.',
  thumbnailUrl: `${SITE}/images/produtora/beleza/jequiti-galisteu/1.webp`,
  embedUrl: 'https://youtube.com/shorts/K5hS892LVY0',
  uploadDate: '2025-01-01',
  publisher: {'@id': ORG_ID},
  director: {'@id': `${SITE}/pt/angelo/#angelo`},
  inLanguage: 'pt-BR',
  keywords: 'campanha publicitária, Jequiti, produtora de publicidade São Paulo, House Mazzutti',
}

export const videoObjectOceane = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${SITE}/pt/produtora/moda/#video-oceane`,
  name: 'Fashion Film — Océane | House Mazzutti Produtora',
  description:
    'Fashion film para Océane — House Mazzutti Produtora, São Paulo. Direção criativa Angelo Mazzutti.',
  thumbnailUrl: `${SITE}/images/produtora/moda/hero.webp`,
  embedUrl: 'https://youtube.com/shorts/JqCwqv7dn7c',
  uploadDate: '2025-01-01',
  publisher: {'@id': ORG_ID},
  director: {'@id': `${SITE}/pt/angelo/#angelo`},
  inLanguage: 'pt-BR',
  keywords: 'fashion film, Océane, produtora de moda São Paulo, House Mazzutti',
}

// ---------------------------------------------------------------------------
// VideoObject — mapa central por slug de portfólio
// embedUrl: URL curta do short (sem parâmetros de feature)
// uploadDate: aproximação baseada na data de publicação
// ---------------------------------------------------------------------------
export const portfolioVideoSchemas = {
  'barbara-porto': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/barbara-porto/#video`,
    name: 'Fashion Film — Bárbara Porto Joias | House Mazzutti',
    description: 'Fashion film para Bárbara Porto Joias produzido pela House Mazzutti em São Paulo. Direção criativa Angelo Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/barbara-porto/1.webp`,
    embedUrl: 'https://youtube.com/shorts/YbQQLxWJf_s',
    uploadDate: '2024-10-01',
    inLanguage: 'pt-BR',
    keywords: 'fashion film, joias, Bárbara Porto, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'elyah': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/elyah/#video`,
    name: 'Fashion Film — Elyah Acessórios | House Mazzutti',
    description: 'Fashion film para Elyah Acessórios produzido pela House Mazzutti em São Paulo. Direção criativa Angelo Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/elyah/1.webp`,
    embedUrl: 'https://youtube.com/shorts/QNraZvoGQ80',
    uploadDate: '2024-11-01',
    inLanguage: 'pt-BR',
    keywords: 'fashion film, acessórios, Elyah, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'we-pink-01': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/we-pink-01/#video`,
    name: 'Campanha WePink — Fashion Film | House Mazzutti',
    description: 'Campanha de beleza WePink produzida pela House Mazzutti em São Paulo. Direção criativa Angelo Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/beleza/we-pink-01/1.webp`,
    embedUrl: 'https://youtube.com/shorts/IWHSrFSxRrc',
    uploadDate: '2024-09-01',
    inLanguage: 'pt-BR',
    keywords: 'WePink, campanha beleza, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'we-pink-ze-felipe': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/we-pink-ze-felipe/#video`,
    name: 'WePink × Zé Felipe — Campanha | House Mazzutti',
    description: 'Campanha WePink com Zé Felipe produzida pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/beleza/we-pink-ze-felipe/1.webp`,
    embedUrl: 'https://youtube.com/shorts/AmfGK-XrA2I',
    uploadDate: '2024-12-01',
    inLanguage: 'pt-BR',
    keywords: 'WePink, Zé Felipe, campanha beleza, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'natalia-beauty': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/natalia-beauty/#video`,
    name: 'Natália Beauty — Fashion Film | House Mazzutti',
    description: 'Campanha Natália Beauty produzida pela House Mazzutti em São Paulo. Direção criativa Angelo Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/beleza/natalia-beauty/1.webp`,
    embedUrl: 'https://youtube.com/shorts/eILOFwGTkEI',
    uploadDate: '2025-02-01',
    inLanguage: 'pt-BR',
    keywords: 'Natália Beauty, campanha beleza, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'jequiti-galisteu': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/jequiti-galisteu/#video`,
    name: 'Jequiti × Galisteu — Campanha | House Mazzutti',
    description: 'Campanha Jequiti com Adriane Galisteu produzida pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/beleza/jequiti-galisteu/1.webp`,
    embedUrl: 'https://youtube.com/shorts/K5hS892LVY0',
    uploadDate: '2024-08-01',
    inLanguage: 'pt-BR',
    keywords: 'Jequiti, Adriane Galisteu, campanha publicitária, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'jequiti-ana-castela': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/jequiti-ana-castela/#video`,
    name: 'Jequiti × Ana Castela — Campanha | House Mazzutti',
    description: 'Campanha Jequiti com Ana Castela produzida pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/beleza/jequiti-ana-castela/1.webp`,
    embedUrl: 'https://youtube.com/shorts/kbUaMjP7xdw',
    uploadDate: '2024-06-01',
    inLanguage: 'pt-BR',
    keywords: 'Jequiti, Ana Castela, campanha publicitária, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'jequiti-sense': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/jequiti-sense/#video`,
    name: 'Jequiti Sense — Campanha | House Mazzutti',
    description: 'Campanha Jequiti Sense produzida pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/beleza/jequiti-sense/1.webp`,
    embedUrl: 'https://youtube.com/shorts/K5hS892LVY0',
    uploadDate: '2024-07-01',
    inLanguage: 'pt-BR',
    keywords: 'Jequiti Sense, campanha publicitária, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'oceane': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/oceane/#video`,
    name: 'Océane — Fashion Film | House Mazzutti',
    description: 'Fashion film para Océane produzido pela House Mazzutti em São Paulo. Direção criativa Angelo Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/moda/hero.webp`,
    embedUrl: 'https://youtube.com/shorts/JqCwqv7dn7c',
    uploadDate: '2024-05-01',
    inLanguage: 'pt-BR',
    keywords: 'Océane, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'signus': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/signus/#video`,
    name: 'Signus — Fashion Film | House Mazzutti',
    description: 'Fashion film para Signus produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/signus/1.webp`,
    embedUrl: 'https://youtube.com/shorts/WQUIfamW2Gc',
    uploadDate: '2024-04-01',
    inLanguage: 'pt-BR',
    keywords: 'Signus, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'signus-fiamma': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/signus-fiamma/#video`,
    name: 'Signus Fiamma — Fashion Film | House Mazzutti',
    description: 'Fashion film Signus Fiamma produzido pela House Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/signus-fiamma/1.webp`,
    embedUrl: 'https://youtube.com/shorts/sEj18Wssidk',
    uploadDate: '2024-03-01',
    inLanguage: 'pt-BR',
    keywords: 'Signus Fiamma, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'signus-jean-pierre': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/signus-jean-pierre/#video`,
    name: 'Signus Jean Pierre — Fashion Film | House Mazzutti',
    description: 'Fashion film Signus Jean Pierre produzido pela House Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/signus-jean-pierre/1.webp`,
    embedUrl: 'https://youtube.com/shorts/TVti1pAA_JA',
    uploadDate: '2024-03-01',
    inLanguage: 'pt-BR',
    keywords: 'Signus Jean Pierre, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'signus-lavorato': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/signus-lavorato/#video`,
    name: 'Signus Lavorato — Fashion Film | House Mazzutti',
    description: 'Fashion film Signus Lavorato produzido pela House Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/signus-lavorato/1.webp`,
    embedUrl: 'https://youtube.com/shorts/qCFDXtzOUUg',
    uploadDate: '2024-02-01',
    inLanguage: 'pt-BR',
    keywords: 'Signus Lavorato, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'signus-versolato01': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/signus-versolato01/#video`,
    name: 'Signus Versolato — Fashion Film | House Mazzutti',
    description: 'Fashion film Signus Versolato produzido pela House Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/signus-versolato01/1.webp`,
    embedUrl: 'https://youtube.com/shorts/FtD8DSVlYYg',
    uploadDate: '2024-01-01',
    inLanguage: 'pt-BR',
    keywords: 'Signus Versolato, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'signus-versolato02': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/signus-versolato02/#video`,
    name: 'Signus Versolato II — Fashion Film | House Mazzutti',
    description: 'Fashion film Signus Versolato II produzido pela House Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/signus-versolato02/1.webp`,
    embedUrl: 'https://youtube.com/shorts/2i9Zp9LAGec',
    uploadDate: '2024-01-01',
    inLanguage: 'pt-BR',
    keywords: 'Signus Versolato, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'signus-vertz': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/signus-vertz/#video`,
    name: 'Signus Vertz — Fashion Film | House Mazzutti',
    description: 'Fashion film Signus Vertz produzido pela House Mazzutti.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/signus-vertz/1.webp`,
    embedUrl: 'https://youtube.com/shorts/WQUIfamW2Gc',
    uploadDate: '2023-12-01',
    inLanguage: 'pt-BR',
    keywords: 'Signus Vertz, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'camila-scarpa': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/camila-scarpa/#video`,
    name: 'Camila Scarpa — Fashion Film | House Mazzutti',
    description: 'Fashion film para Camila Scarpa produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/camila-scarpa/1.webp`,
    embedUrl: 'https://youtube.com/shorts/FlNa1Ho2YxE',
    uploadDate: '2025-01-01',
    inLanguage: 'pt-BR',
    keywords: 'Camila Scarpa, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'poema-paris': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/poema-paris/#video`,
    name: 'Poéma Paris — Fashion Film | House Mazzutti',
    description: 'Fashion film para Poéma Paris produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/poema-paris/1.webp`,
    embedUrl: 'https://youtube.com/shorts/MzG_2ONV7eg',
    uploadDate: '2024-10-01',
    inLanguage: 'pt-BR',
    keywords: 'Poéma Paris, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'pous': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/pous/#video`,
    name: 'Pous — Fashion Film | House Mazzutti',
    description: 'Fashion film para Pous produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/pous/1.webp`,
    embedUrl: 'https://youtube.com/shorts/2Fq2lN-dHrQ',
    uploadDate: '2024-09-01',
    inLanguage: 'pt-BR',
    keywords: 'Pous, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'unique-chic': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/unique-chic/#video`,
    name: 'Unique Chic — Fashion Film | House Mazzutti',
    description: 'Fashion film para Unique Chic produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/unique-chic/1.webp`,
    embedUrl: 'https://youtube.com/shorts/LEi_egcF1d4',
    uploadDate: '2024-08-01',
    inLanguage: 'pt-BR',
    keywords: 'Unique Chic, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'beatco': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/beatco/#video`,
    name: 'Beatco — Fashion Film | House Mazzutti',
    description: 'Fashion film para Beatco produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/beatco/1.webp`,
    embedUrl: 'https://youtube.com/shorts/u41gN8xO_2M',
    uploadDate: '2024-07-01',
    inLanguage: 'pt-BR',
    keywords: 'Beatco, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'beatco-2': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/beatco-2/#video`,
    name: 'Beatco II — Fashion Film | House Mazzutti',
    description: 'Fashion film Beatco II produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/beatco-2/1.webp`,
    embedUrl: 'https://youtube.com/shorts/BpCfu-YxI7s',
    uploadDate: '2024-07-01',
    inLanguage: 'pt-BR',
    keywords: 'Beatco, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'idrissi': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/idrissi/#video`,
    name: 'Idrissi — Fashion Film | House Mazzutti',
    description: 'Fashion film para Idrissi produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/idrissi/1.webp`,
    embedUrl: 'https://youtube.com/shorts/WmoHymvnxWw',
    uploadDate: '2025-03-01',
    inLanguage: 'pt-BR',
    keywords: 'Idrissi, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'monica-costa-jewerly': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/monica-costa-jewerly/#video`,
    name: 'Monica Costa Jewerly — Fashion Film | House Mazzutti',
    description: 'Fashion film para Monica Costa Jewerly produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/acessorios/monica-costa-jewerly/1.webp`,
    embedUrl: 'https://youtube.com/shorts/hdKSNnVnkBM',
    uploadDate: '2025-02-01',
    inLanguage: 'pt-BR',
    keywords: 'Monica Costa Jewerly, joias, fashion film, produtora São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'festiva': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/festiva/#video`,
    name: 'Festiva — Fashion Film | House Mazzutti',
    description: 'Fashion film para Festiva produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/festiva/1.webp`,
    embedUrl: 'https://youtube.com/shorts/5Q4Kr-sEAyY',
    uploadDate: '2025-01-01',
    inLanguage: 'pt-BR',
    keywords: 'Festiva, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'alletto-still': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/alletto-still/#video`,
    name: 'Alletto Still — Fashion Film | House Mazzutti',
    description: 'Fashion film Still para Alletto produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/alletto-still/1.webp`,
    embedUrl: 'https://youtube.com/shorts/DCD71ir1U3k',
    uploadDate: '2025-04-01',
    inLanguage: 'pt-BR',
    keywords: 'Alletto, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'splash-boutique': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/splash-boutique/#video`,
    name: 'Splash Boutique — Fashion Film | House Mazzutti',
    description: 'Fashion film para Splash Boutique produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/splash-boutique/1.webp`,
    embedUrl: 'https://youtube.com/shorts/crXyeOvnOQQ',
    uploadDate: '2024-11-01',
    inLanguage: 'pt-BR',
    keywords: 'Splash Boutique, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'toli': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/toli/#video`,
    name: 'Toli — Fashion Film | House Mazzutti',
    description: 'Fashion film para Toli produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/toli/1.webp`,
    embedUrl: 'https://youtube.com/shorts/qWLHmLcLIDE',
    uploadDate: '2025-05-01',
    inLanguage: 'pt-BR',
    keywords: 'Toli, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'tf': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/tf/#video`,
    name: 'TF — Fashion Film | House Mazzutti',
    description: 'Fashion film para TF produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/tf/1.webp`,
    embedUrl: 'https://youtube.com/shorts/5OwGG4gHcJk',
    uploadDate: '2025-04-01',
    inLanguage: 'pt-BR',
    keywords: 'TF, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
  'superbia': {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    '@id': `${SITE}/pt/portfolio-produtora/superbia/#video`,
    name: 'Superbia — Fashion Film | House Mazzutti',
    description: 'Fashion film para Superbia produzido pela House Mazzutti em São Paulo.',
    thumbnailUrl: `${SITE}/images/produtora/moda/superbia/1.webp`,
    embedUrl: 'https://youtube.com/shorts/5OwGG4gHcJk',
    uploadDate: '2025-03-01',
    inLanguage: 'pt-BR',
    keywords: 'Superbia, fashion film, produtora de moda São Paulo, House Mazzutti',
    director: {'@id': `${SITE}/pt/angelo/#angelo`},
    publisher: {'@id': ORG_ID},
  },
}

// ---------------------------------------------------------------------------
// Produtora — subpages sem schema (direcao, executiva, eventos, educacao)
// ---------------------------------------------------------------------------
export const direcaoServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/direcao/#service`,
  name: 'Direção Criativa e Estratégica',
  serviceType: 'Direção Criativa e Produção Audiovisual',
  url: `${SITE}/pt/produtora/direcao/`,
  description:
    'Liderança criativa, videografia e fotografia para projetos onde o conceito precisa chegar intacto ao resultado. Produtora House Mazzutti — São Paulo.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const direcaoFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que faz um diretor criativo numa produção audiovisual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O diretor criativo define a linguagem visual, o conceito da peça e garante que a intenção de marca chegue intacta ao resultado final. Na House Mazzutti, a direção criativa está presente em todas as etapas — do briefing ao master — evitando que o conceito se perca em handoffs entre equipes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quando uma marca precisa de direção criativa numa campanha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sempre que o projeto precisar de coerência entre conceito, imagem e entrega. Isso inclui campanhas de lançamento, editoriais de moda, fashion films, vídeos institucionais e qualquer produção onde a identidade visual da marca precisa ser traduzida com precisão para o audiovisual.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti atende marcas de quais segmentos na direção criativa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Moda, beleza, joalheria, lifestyle, gastronomia e marcas pessoais premium. Clientes como WePink, Océane, Elyah, Jequiti, Signus e Dumond já passaram pela direção criativa da Produtora HMZT em campanhas de alto padrão.',
      },
    },
    {
      '@type': 'Question',
      name: 'Direção criativa e produção executiva são o mesmo serviço?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não, mas na House Mazzutti os dois operam sob a mesma liderança. A direção criativa define o que será realizado e como. A produção executiva garante que isso aconteça dentro do prazo, orçamento e com a equipe certa. Integrar os dois sob uma única visão é o que diferencia uma campanha executada de uma campanha bem executada.',
      },
    },
  ],
}

export const executivaServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/executiva/#service`,
  name: 'Produção Executiva 360°',
  serviceType: 'Produção Executiva de Campanhas e Projetos Audiovisuais',
  url: `${SITE}/pt/produtora/executiva/`,
  description:
    'Inteligência operacional para campanhas complexas — orçamento, cronograma, equipe técnica, casting, locações e entrega. Produtora House Mazzutti — São Paulo.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const executivaFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é produção executiva e por que ela é essencial numa campanha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Produção executiva é o sistema que garante que o conceito criativo chegue ao resultado final intacto, no prazo e dentro do orçamento. Envolve planejamento de cronograma, contratação de equipe técnica, logística de locações, casting, montagem de set e entrega do master. Sem produção executiva, campanhas ambiciosas perdem coerência e estouram orçamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto custa uma produção executiva em São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O custo de uma produção executiva varia conforme o escopo: número de dias de set, tamanho da equipe, complexidade do casting, locações e tipo de entrega. Na House Mazzutti, trabalhamos com projetos de médio e alto padrão — entre R$15.000 e R$200.000+ dependendo da campanha. Solicite um briefing para receber uma proposta detalhada.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti faz produção executiva de eventos e campanhas ao mesmo tempo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A Produtora HMZT opera cinco núcleos integrados: Direção & Criação, Audiovisual, Moda & Beleza, Casting & Influência e Produção & Estrutura. Isso permite gerenciar campanhas complexas com múltiplas frentes simultâneas sob uma única coordenação.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o processo de produção executiva da House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Começa com o briefing de campanha — objetivo, produto, público e prazo. A equipe HMZT desenvolve o plano de produção: conceito criativo, casting, locações, cronograma e orçamento detalhado. O cliente aprova cada etapa antes do set. No dia de filmagem ou fotografia, toda a estrutura já está operando. Após o set, entregamos o master no formato e prazo acordados.',
      },
    },
  ],
}

export const eventosServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/eventos/#service`,
  name: 'Produção e Cobertura de Eventos',
  serviceType: 'Produção Audiovisual e Cobertura de Eventos',
  url: `${SITE}/pt/produtora/eventos/`,
  description:
    'Cobertura fotográfica, videográfica e transmissão ao vivo para eventos, ativações e lançamentos com direção editorial. House Mazzutti — São Paulo.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const eventosFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que inclui o serviço de cobertura de eventos da House Mazzutti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cobertura HMZT inclui briefing prévio do evento, presença de fotógrafo e/ou cinegrafista com direção criativa durante o evento, curadoria e edição das imagens, e entrega em alta resolução no prazo acordado. Para grandes eventos, também oferecemos vídeo de cobertura, highlight e transmissão ao vivo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais tipos de eventos a House Mazzutti cobre em São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lançamentos de marca, ativações de produto, eventos corporativos, desfiles de moda, inaugurações, shows e experiências de marca. Atendemos tanto eventos íntimos quanto produções de grande escala, sempre com direção de imagem — não apenas registro.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre cobertura fotográfica e produção de evento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cobertura é o registro do evento em tempo real — foto, vídeo, highlight. Produção de evento envolve conceber e executar toda a estrutura do evento: cenografia, ativações, roteiro, equipe técnica e logística. A Produtora HMZT oferece os dois serviços, integrados ou separados conforme a necessidade.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti atende eventos fora de São Paulo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, mediante consulta de disponibilidade e planejamento logístico. Já realizamos coberturas e produções em outras cidades do Brasil. Entre em contato com antecedência de pelo menos 3 semanas para projetos fora de São Paulo.',
      },
    },
  ],
}

export const educacaoServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/pt/produtora/educacao/#service`,
  name: 'Produção de Conteúdo Educacional',
  serviceType: 'Produção Audiovisual para Educação e Treinamento',
  url: `${SITE}/pt/produtora/educacao/`,
  description:
    'Videoaulas, treinamentos corporativos e cases com direção editorial. Conteúdo educacional bem produzido que muda percepção. House Mazzutti — São Paulo.',
  areaServed: {'@type': 'City', name: 'São Paulo', '@id': 'https://www.wikidata.org/wiki/Q174'},
  provider: {'@id': ORG_ID},
}

export const educacaoFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é produção de conteúdo educacional e quando contratar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Produção de conteúdo educacional é a criação audiovisual de videoaulas, módulos de treinamento, onboarding corporativo, masterclasses e cases de sucesso. Contratar quando a empresa quer escalar conhecimento interno, lançar um curso online, criar treinamentos de equipe ou produzir conteúdo de autoridade para o mercado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre videoaula corporativa e vídeo institucional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O vídeo institucional apresenta a empresa ao mercado — quem ela é e o que oferece. A videoaula corporativa transmite conhecimento para um público específico: colaboradores, alunos ou clientes. Na House Mazzutti, os dois partem do mesmo princípio: conteúdo com direção editorial, não apenas câmera ligada.',
      },
    },
    {
      '@type': 'Question',
      name: 'A House Mazzutti produz conteúdo para plataformas EAD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Entregamos os módulos nos formatos compatíveis com as principais plataformas EAD (MP4, H.264) e podemos adaptar o projeto para os padrões técnicos exigidos pela plataforma do cliente. Incluímos legendas, vinhetas de abertura e identidade visual alinhada ao branding da empresa.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo leva para produzir um curso ou treinamento corporativo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um módulo de treinamento simples (até 10 vídeos de 5-10 min) leva entre 3 e 5 semanas, da reunião de briefing à entrega dos arquivos finais. Cursos completos com múltiplos módulos, animações e material complementar podem levar de 6 a 12 semanas. O prazo é definido após o mapeamento de conteúdo.',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// Academy — EducationOrganization + Course schemas
// ---------------------------------------------------------------------------
export const academyServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationOrganization',
  '@id': `${SITE}/pt/academy/#educationorg`,
  name: 'House Mazzutti Academy',
  description:
    'Cursos, workshops e livros de branding, direção de imagem e fotografia de moda com a House Mazzutti em São Paulo.',
  url: `${SITE}/pt/academy/`,
  parentOrganization: {'@id': `${SITE}/#organization`},
  founder: {'@id': `${SITE}/pt/angelo/#angelo`},
  areaServed: {'@type': 'City', name: 'São Paulo'},
  knowsAbout: [
    'Fotografia de Moda',
    'Direção de Imagem',
    'Branding',
    'Direção Criativa',
    'Workshop de Fotografia',
  ],
  sameAs: [`${SITE}/pt/academy/`],
}

export const academyCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${SITE}/pt/academy/#course-inside-out`,
  name: 'Inside Out — Workshop de Fotografia de Moda',
  description:
    'Imersão prática em fotografia de moda e direção de imagem com Angelo Mazzutti e Ita Mazzutti. Metodologia autoral da House Mazzutti, turmas limitadas em São Paulo.',
  url: `${SITE}/pt/academy/`,
  provider: {'@id': `${SITE}/pt/academy/#educationorg`},
  instructor: {'@id': `${SITE}/pt/angelo/#angelo`},
  courseMode: 'onsite',
  inLanguage: 'pt-BR',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/LimitedAvailability',
    priceCurrency: 'BRL',
    url: `${SITE}/pt/contato/`,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite',
    location: {
      '@type': 'Place',
      name: 'House Mazzutti Studio',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
    },
  },
}

export const academyFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é a House Mazzutti Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É o braço educacional da House Mazzutti: cursos, workshops e livros de branding, fotografia de moda e direção de imagem com metodologia desenvolvida por Angelo Mazzutti ao longo de 15 anos de mercado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais cursos e workshops a Academy oferece?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O carro-chefe é o Inside Out, imersão prática em fotografia de moda e direção de imagem. A Academy também oferece workshops temáticos de direção criativa, branding e editorial de moda, além de livros e materiais formativos.',
      },
    },
    {
      '@type': 'Question',
      name: 'O workshop Inside Out é presencial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Inside Out acontece presencialmente em São Paulo, com turmas intencionalmente pequenas para garantir atenção individualizada. As datas e vagas são divulgadas pelo Instagram @housemazzutti.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como me inscrevo nos cursos da House Mazzutti Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Acesse a página de Contato ou acompanhe o Instagram @housemazzutti para saber quando as inscrições abrem. As turmas têm vagas limitadas e costumam fechar antes da divulgação oficial.',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// BlogPosting schema helper
// ---------------------------------------------------------------------------
export function newsArticleSchema({slug, titulo, metaDescription, data, cover, categoria}) {
  const url = `${SITE}/pt/blog/${slug}/`
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
    '@type': 'NewsArticle',
    '@id': `${url}#news`,
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
    image: {
      '@type': 'ImageObject',
      url: cover ? `${SITE}${cover.src}` : `${SITE}/images/og-default.webp`,
      description: cover?.alt ?? titulo,
    },
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
    ...(categoria && {
      about: {
        '@type': 'Thing',
        name: categoria,
      },
    }),
    articleSection: 'Mercado Criativo',
    isAccessibleForFree: true,
  }
}

export function blogPostingSchema({slug, titulo, metaDescription, data, cover, respostaDireta, keywords}) {
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
    image: {
      '@type': 'ImageObject',
      url: cover ? `${SITE}${cover.src}` : `${SITE}/images/og-default.webp`,
      description: cover?.alt ?? titulo,
    },
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
    ...(respostaDireta && {abstract: respostaDireta}),
    ...(keywords && {keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords}),
  }
}
