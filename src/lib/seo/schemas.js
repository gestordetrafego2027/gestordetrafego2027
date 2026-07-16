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
