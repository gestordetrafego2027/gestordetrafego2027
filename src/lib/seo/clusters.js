// Internal linking por cluster de autoridade temática.
// Origem: SEO-Operacao/06-blog-clusters-e-metadados.md
// Cada post recebe: 1 link para pillar + 2-3 posts irmãos + 1 CTA de conversão.

export const clusters = {
  studio: {
    pillar: {
      url: '/studio',
      label: 'conheça o Studio da House Mazzutti',
    },
    cta: {
      url: '/contato',
      label: 'agende seu ensaio ou book',
    },
    posts: [
      'book-para-modelos-quem-e-escolhido',
      'book-modelo-imagem-trabalha-por-voce',
      'ensaio-pessoal-imagem-autoridade',
      'ensaio-pessoal-imagem-lidera-percepcao',
      'cobertura-externa-presenca-alto-valor',
      'cobertura-externa-narrativa-visual',
    ],
  },
  agencia: {
    pillar: {
      url: '/agencia',
      label: 'conheça a Agência House Mazzutti',
    },
    cta: {
      url: '/contato',
      label: 'fale com a agência',
    },
    posts: [
      'branding-project-arquitetura-valor',
      'branding-project-motor-vendas',
      'quanto-investir-em-branding',
      'campanha-lancamento-arquitetura-invisivel',
      'por-que-campanhas-falham',
      'por-que-campanhas-caras-falham',
      'por-que-boas-ideias-nao-garantem-resultados',
      'geo-visibilidade-marca-nas-ias',
      'aeo-como-ser-a-resposta-das-ias',
      'geo-aeo-posicionamento-era-das-ias',
    ],
  },
  produtora: {
    pillar: {
      url: '/produtora',
      label: 'conheça a Produtora HMZT',
    },
    cta: {
      url: '/contato',
      label: 'inicie sua campanha',
    },
    posts: [
      'producao-executiva-sistema-campanhas',
      'editorial-moda-narrativa-visual',
      'editorial-moda-performance-vendas',
      'fashion-film-o-que-e-quanto-custa',
      'video-institucional-sao-paulo-como-produzir',
      'casting-set-design-campanha-moda',
      'campanha-larissa-manoela-jequiti',
      'fashion-film-joias-barbara-porto',
      'fashion-film-emanuely-terres',
    ],
  },
  academy: {
    pillar: {
      url: '/academy',
      label: 'conheça a House Mazzutti Academy',
    },
    cta: {
      url: '/contato',
      label: 'garanta seu interesse na próxima turma',
    },
    posts: [
      'workshop-inside-out-ita-mazzutti',
    ],
  },
}

// Mapa slug → cluster
export const slugToCluster = Object.fromEntries(
  Object.entries(clusters).flatMap(([clusterName, data]) =>
    data.posts.map((slug) => [slug, clusterName]),
  ),
)

// Títulos curtos por slug (para os links de "Leia também")
export const postTitles = {
  'fashion-film-o-que-e-quanto-custa': 'Fashion Film: o que é e quanto custa?',
  'video-institucional-sao-paulo-como-produzir': 'Vídeo Institucional em SP: o guia completo',
  'casting-set-design-campanha-moda': 'Casting e Set Design numa Campanha de Moda',
  'campanha-larissa-manoela-jequiti': 'Campanha Larissa Manoela × Jequiti',
  'fashion-film-joias-barbara-porto': 'Fashion Film: Bárbara Porto Joias',
  'fashion-film-emanuely-terres': 'Fashion Film: Emanuely Terres',
  'workshop-inside-out-ita-mazzutti': 'Inside Out: a House também forma o olhar',
  'book-para-modelos-quem-e-escolhido': 'Book para Modelos: o que define quem é escolhido',
  'book-modelo-imagem-trabalha-por-voce': 'Book de Modelo: a imagem que trabalha por você',
  'ensaio-pessoal-imagem-autoridade': 'Ensaio Pessoal: imagem que constrói autoridade',
  'ensaio-pessoal-imagem-lidera-percepcao': 'Ensaio Pessoal: a imagem que lidera a percepção',
  'cobertura-externa-presenca-alto-valor': 'Cobertura Externa: presença de alto valor',
  'cobertura-externa-narrativa-visual': 'Cobertura Externa: narrativa visual com intenção',
  'branding-project-arquitetura-valor': 'Branding Project: a arquitetura de valor da marca',
  'branding-project-motor-vendas': 'Branding: o motor de vendas (não a estética)',
  'quanto-investir-em-branding': 'Quanto investir em branding (e por quê)',
  'campanha-lancamento-arquitetura-invisivel': 'Campanha de Lançamento: a arquitetura invisível',
  'por-que-campanhas-falham': 'Por que campanhas falham (e como evitar)',
  'por-que-campanhas-caras-falham': 'Por que campanhas caras também falham',
  'por-que-boas-ideias-nao-garantem-resultados': 'Por que boas ideias não garantem resultados',
  'producao-executiva-sistema-campanhas': 'Produção Executiva: o sistema por trás das campanhas',
  'editorial-moda-narrativa-visual': 'Editorial de Moda: narrativa visual que posiciona',
  'editorial-moda-performance-vendas': 'Editorial de Moda: da estética à performance',
  'geo-visibilidade-marca-nas-ias': 'GEO: por que sua marca desaparece das IAs',
  'aeo-como-ser-a-resposta-das-ias': 'AEO: como ser citado pelo ChatGPT e Gemini',
  'geo-aeo-posicionamento-era-das-ias': 'GEO + AEO: posicionamento na era das IAs',
}

/**
 * Retorna os links relacionados para um post.
 * @param {string} currentSlug
 * @returns {{ pillar, siblings: Array<{slug, title}>, cta }}
 */
export function getRelatedLinks(currentSlug) {
  const clusterName = slugToCluster[currentSlug]
  if (!clusterName) return null

  const cluster = clusters[clusterName]
  const siblings = cluster.posts
    .filter((s) => s !== currentSlug)
    .slice(0, 3)
    .map((slug) => ({slug, title: postTitles[slug]}))

  return {
    pillar: cluster.pillar,
    siblings,
    cta: cluster.cta,
  }
}
