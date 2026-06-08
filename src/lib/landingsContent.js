/**
 * Mapa de conteúdo das landings de serviço da House Mazzutti.
 *
 * Cada serviço (book, ensaio, cobertura, moda, publicidade, institucional)
 * tem 8 entradas de galeria curadas a partir do /portfolio. As entradas
 * apontam para os projetos reais em /public/images e o seu link no portfólio.
 *
 * Pricing: BOOK a partir de R$1.700, ENSAIO a partir de R$3.700, demais
 * "Sob consulta" (proposta sob medida).
 */

const toTitleCase = (slug) =>
  slug
    .split('-')
    .map((w) => (/^\d/.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');

const studioCover = (slug) => `/images/studio/${slug}/capa.webp`;
const produtoraCover = (folder, slug) => `/images/produtora/${folder}/${slug}/capa.webp`;

const studioItem = (slug) => ({
  src: studioCover(slug),
  alt: toTitleCase(slug),
  name: toTitleCase(slug),
  href: `/portfolio-studio/${slug}`,
});

const produtoraItem = (folder, slug) => ({
  src: produtoraCover(folder, slug),
  alt: toTitleCase(slug),
  name: toTitleCase(slug),
  href: `/portfolio-produtora/${slug}`,
});

/**
 * Galeria (8 tiles asimétricos) curada por serviço.
 * Ordem dos slots: [sq1, sq2, sq3, sq4, portrait, sq5, sq6, wide]
 */
export const galleryByService = {
  book: [
    studioItem('amanda-oliveira'),
    studioItem('ana-laura-saar'),
    studioItem('jessica-bittelbrun'),
    studioItem('maria-eduarda'),
    studioItem('vitoria-boidt'),       // portrait
    studioItem('francine-massoco'),
    studioItem('gab-cruz'),
    studioItem('marina-machado'),      // wide
  ],
  ensaio: [
    studioItem('andressa-gomiero'),
    studioItem('fernanda-treml'),
    studioItem('paula-assuncao'),
    studioItem('thaisi-dias'),
    studioItem('gustavo-vioto'),       // portrait
    studioItem('carol-costa'),
    studioItem('rebeca-cabral'),
    studioItem('marjorie-rossi'),      // wide
  ],
  cobertura: [
    studioItem('mileide-mihaile'),
    studioItem('cynthia-andrade'),
    studioItem('talita-dalbo'),
    studioItem('samara-samme'),
    studioItem('emanuelly-terres'),    // portrait
    studioItem('deise-smaniotto'),
    studioItem('simonny'),
    studioItem('fernanda-costas'),     // wide
  ],
  moda: [
    produtoraItem('moda', 'beatco'),
    produtoraItem('moda', 'beatco-2'),
    produtoraItem('moda', 'pous'),
    produtoraItem('moda', 'toli'),
    produtoraItem('moda', 'idrissi'),                 // portrait
    produtoraItem('moda', 'unique-chic'),
    produtoraItem('acessorios', 'barbara-porto'),
    produtoraItem('acessorios', 'camila-scarpa'),     // wide
  ],
  publicidade: [
    produtoraItem('beleza', 'we-pink-ze-felipe'),
    produtoraItem('beleza', 'we-pink-01'),
    produtoraItem('beleza', 'jequiti-larissa-manoela'),
    produtoraItem('beleza', 'jequiti-galisteu'),
    produtoraItem('beleza', 'natalia-beauty'),        // portrait
    produtoraItem('beleza', 'oceane'),
    produtoraItem('acessorios', 'dumond'),
    produtoraItem('beleza', 'jequiti-sense'),         // wide
  ],
  institucional: [
    produtoraItem('institucional', 'sense-hotel'),
    produtoraItem('acessorios', 'signus'),
    produtoraItem('acessorios', 'signus-jean-pierre'),
    produtoraItem('acessorios', 'signus-lavorato'),
    produtoraItem('acessorios', 'signus-fiamma'),         // portrait
    produtoraItem('acessorios', 'signus-versolato01'),
    produtoraItem('acessorios', 'signus-versolato02'),
    produtoraItem('acessorios', 'signus-vertz'),          // wide
  ],
};

/**
 * Tabela de investimento por serviço.
 * Book a partir de 1.7k, Ensaio a partir de 3.7k, demais "Sob consulta".
 */
export const pricingByService = {
  book: {
    sectionKicker: 'ESCOLHA SEU NÍVEL',
    sectionTitle: 'Três níveis. Uma mesma direção.',
    tiers: [
      {
        id: 'essencial',
        name: 'ESSENCIAL',
        price: 'R$ 2.7k',
        priceCents: 270000,
        slug: 'book-essencial',
        coverImage: '/images/studio/banners/banner-1.webp',
        priceLabel: 'A PARTIR DE · ENTREGA EM 7 DIAS',
        ctaLabel: 'SELECIONAR',
        items: [
          '02 looks estratégicos',
          '10 fotos tratadas',
          'Direção de pose e expressão',
          'Estúdio próprio em São Paulo',
        ],
      },
      {
        id: 'estrategico',
        name: 'ESTRATÉGICO',
        price: 'R$ 3.5k',
        priceCents: 350000,
        slug: 'book-estrategico',
        coverImage: '/images/studio/banners/banner-2.webp',
        priceLabel: 'MAIS ESCOLHIDO · ENTREGA EM 10 DIAS',
        ctaLabel: 'SELECIONAR AGORA',
        popular: true,
        items: [
          '04 looks estratégicos',
          '25 fotos tratadas',
          'Direção de modelo / poses e expressão',
          'Estúdio próprio em SP',
          'Moodboard personalizado',
          '01 video reel de apresentação',
        ],
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        price: 'R$ 6.1k',
        priceCents: 610000,
        slug: 'book-premium',
        coverImage: '/images/studio/banners/banner-3.webp',
        priceLabel: 'PRODUÇÃO FULL-DAY',
        ctaLabel: 'SELECIONAR',
        items: [
          'Looks ilimitados',
          '40 fotos high-end',
          'Direção de imagem completa',
          '03 video reels de conteúdo',
        ],
      },
    ],
  },
  ensaio: {
    sectionKicker: 'INVESTIMENTO',
    sectionTitle: 'Projetos de impacto. Valores reais.',
    tiers: [
      {
        id: 'essencial',
        name: 'AUTORAL',
        price: 'R$ 3.7k',
        priceCents: 370000,
        slug: 'ensaio-autoral',
        coverImage: '/images/studio/marjorie-rossi/capa.webp',
        priceLabel: 'A PARTIR DE · ENTREGA EM 10 DIAS',
        ctaLabel: 'SELECIONAR',
        items: [
          'Conceito e moodboard',
          '02 looks de cena',
          '20 fotos tratadas',
          'Direção de presença',
        ],
      },
      {
        id: 'estrategico',
        name: 'EDITORIAL',
        price: 'R$ 6.7k',
        priceCents: 670000,
        slug: 'ensaio-editorial',
        coverImage: '/images/studio/marina-machado/capa.webp',
        priceLabel: 'MAIS ESCOLHIDO · ENTREGA EM 15 DIAS',
        ctaLabel: 'SELECIONAR AGORA',
        popular: true,
        items: [
          'Conceito editorial',
          '04 looks de cena',
          '35 fotos tratadas',
          'Beauty artist e styling',
          '01 video reel autoral',
        ],
      },
      {
        id: 'premium',
        name: 'SIGNATURE',
        price: 'R$ 12k',
        priceCents: 1200000,
        slug: 'ensaio-signature',
        coverImage: '/images/studio/mileide-mihaile/capa.webp',
        priceLabel: 'PRODUÇÃO COMPLETA · FULL-DAY',
        ctaLabel: 'SELECIONAR',
        items: [
          'Direção criativa completa',
          'Looks ilimitados',
          '60 fotos high-end',
          'Equipe full (beauty + styling + producer)',
          '03 video reels e fashion film curto',
        ],
      },
    ],
  },
  cobertura: {
    sectionKicker: 'INVESTIMENTO',
    sectionTitle: 'Acompanhamento premium. Proposta sob medida.',
    tiers: [
      {
        id: 'essencial',
        name: 'MEIA AGENDA',
        price: 'Sob consulta',
        priceLabel: 'COBERTURA DE 4 HORAS',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Acompanhamento 4h',
          'Fotografia profissional',
          'Direção de presença',
        ],
      },
      {
        id: 'estrategico',
        name: 'AGENDA COMPLETA',
        price: 'Sob consulta',
        priceLabel: 'MAIS ESCOLHIDO · 8 HORAS',
        ctaLabel: 'SOLICITAR PROPOSTA',
        popular: true,
        items: [
          'Acompanhamento 8h',
          'Foto e vídeo em paralelo',
          'Reels e stories no dia',
          'Suporte de produção',
        ],
      },
      {
        id: 'premium',
        name: 'CONCIERGE',
        price: 'Sob consulta',
        priceLabel: 'PRODUÇÃO FULL-DAY DEDICADA',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Acompanhamento full-day',
          'Equipe completa (foto + vídeo + beauty + styling)',
          'Direção editorial em tempo real',
          'Publicação no blog da House',
        ],
      },
    ],
  },
  moda: {
    sectionKicker: 'INVESTIMENTO',
    sectionTitle: 'Três frentes. Um mesmo padrão.',
    tiers: [
      {
        id: 'essencial',
        name: 'EDITORIAL',
        price: 'Sob consulta',
        priceLabel: 'PROPOSTA SOB MEDIDA',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Direção criativa',
          'Fotografia fashion',
          'Lookbook digital',
        ],
      },
      {
        id: 'estrategico',
        name: 'COLEÇÃO',
        price: 'Sob consulta',
        priceLabel: 'MAIS ESCOLHIDO · LANÇAMENTOS DE COLEÇÃO',
        ctaLabel: 'SOLICITAR PROPOSTA',
        popular: true,
        items: [
          'Direção completa',
          'Foto e vídeo',
          'Lookbook + catálogo',
          'Fashion film curto',
        ],
      },
      {
        id: 'premium',
        name: 'CAMPANHA COMPLETA',
        price: 'Sob consulta',
        priceLabel: 'PRODUÇÃO FULL · MULTICANAL',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Conceito e direção autoral',
          'Produção full (casting, locação, equipe)',
          'Todos os formatos (foto, fashion film, social)',
          'Entrega multicanal',
        ],
      },
    ],
  },
  publicidade: {
    sectionKicker: 'INVESTIMENTO',
    sectionTitle: 'Três níveis de produção publicitária.',
    tiers: [
      {
        id: 'essencial',
        name: 'SOCIAL FIRST',
        price: 'Sob consulta',
        priceLabel: 'CONTEÚDO PARA REDES E ADS',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Direção criativa',
          'Produção audiovisual social',
          'Gestão de equipe',
        ],
      },
      {
        id: 'estrategico',
        name: 'CAMPANHA',
        price: 'Sob consulta',
        priceLabel: 'MAIS ESCOLHIDO · LANÇAMENTO DE PRODUTO',
        ctaLabel: 'SOLICITAR PROPOSTA',
        popular: true,
        items: [
          'Direção completa',
          'Audiovisual + moda + beauty',
          'Casting',
          'Operação de set',
        ],
      },
      {
        id: 'premium',
        name: 'PRODUÇÃO COMPLETA',
        price: 'Sob consulta',
        priceLabel: 'GOVERNANÇA TOTAL · MULTICANAL',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Governança executiva total',
          'Todos os núcleos da House',
          'Entrega multicanal premium',
          'Acompanhamento estratégico pós-entrega',
        ],
      },
    ],
  },
  institucional: {
    sectionKicker: 'INVESTIMENTO',
    sectionTitle: 'O valor da sua autoridade.',
    tiers: [
      {
        id: 'essencial',
        name: 'ESSENCIAL',
        price: 'Sob consulta',
        priceLabel: 'PROPOSTA SOB MEDIDA',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Vídeo institucional',
          'Direção criativa',
          'Entrega digital',
        ],
      },
      {
        id: 'estrategico',
        name: 'ESTRATÉGICO',
        price: 'Sob consulta',
        priceLabel: 'MAIS ESCOLHIDO · NARRATIVA COMPLETA',
        ctaLabel: 'SOLICITAR PROPOSTA',
        popular: true,
        items: [
          'Vídeo institucional + vídeo explicativo',
          'Case de sucesso estruturado',
          'Banco de imagem corporativo',
        ],
      },
      {
        id: 'premium',
        name: 'PRESENÇA COMPLETA',
        price: 'Sob consulta',
        priceLabel: 'PRODUÇÃO MULTICANAL · 360º',
        ctaLabel: 'SOLICITAR PROPOSTA',
        items: [
          'Todos os formatos audiovisuais',
          'Cobertura de eventos corporativos',
          'Vídeos de treinamento',
          'Entrega multicanal coordenada',
        ],
      },
    ],
  },
};

/**
 * Tag editorial que aparece no hover do tile da galeria.
 * Ex: ENSAIO · Editorial · Studio.
 */
export const galleryTagByService = {
  book: { eyebrow: 'STUDIO', title: 'Book' },
  ensaio: { eyebrow: 'STUDIO', title: 'Ensaio' },
  cobertura: { eyebrow: 'STUDIO', title: 'Cobertura' },
  moda: { eyebrow: 'PRODUTORA', title: 'Moda' },
  publicidade: { eyebrow: 'PRODUTORA', title: 'Publicidade' },
  institucional: { eyebrow: 'PRODUTORA', title: 'Institucional' },
};
