import { NextResponse } from 'next/server'

function fmt(n: number): string {
  return 'R$ ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

interface Package {
  name: string
  price: number | null
  duration?: string
  desc?: string | null
  consulta?: boolean
}

interface Addon {
  name: string
  desc: string
  price: number | null
}

interface AddonGroup {
  category: string
  items: Addon[]
}

interface Service {
  name: string
  unit: string
  description: string
  image: string
  packages: Package[]
  addons: Addon[]
  addonGroups?: AddonGroup[]
}

const SERVICES: Record<string, Service> = {
  'branding-project': {
    name: 'Branding Project',
    unit: 'agencia',
    description:
      'A maioria das marcas erra no ponto mais importante: começa executando sem definir. O Branding Project organiza o que a marca é, como se posiciona e como deve ser percebida — antes de qualquer logotipo, antes de qualquer visual. Cinco módulos combináveis: Branding Book (estratégia), Identity Visual Book (identidade), Print Pack (materiais), Projetos Visuais & Merchandising e Fachada. Quatro pacotes — do Essencial ao Máximo — com prazos de 20 a 75 dias. Porque marca não é o que você faz — é o que fica na percepção de quem vê.',
    image: '/images/agencia/house-mazzutti/1.webp',
    packages: [
      {
        name: 'Essential',
        price: 20700,
        desc: 'Módulos 1 + 2 — Branding Book estratégico completo (posicionamento, missão, persona, tom de voz, storytelling) + Identity Visual Book (logotipo, paleta, tipografia, elementos gráficos, brand book 30–40p). Prazo: 35–40 dias.',
      },
      {
        name: 'Profissional',
        price: 35600,
        desc: 'Módulos 1 + 2 + 3 — Branding Book + Identity Visual Book + Print Pack essencial: cartão de visita, papel timbrado, envelope, assinatura de email e favicon. Marca estratégica com aplicações prontas para uso. Prazo: 40–45 dias.',
      },
      {
        name: 'Premium',
        price: 55300,
        desc: 'Módulos 1 + 2 + 3 + 4 — Branding Book + Identity Visual + Print Pack + Projetos Visuais & Merchandising: mockups de aplicação, embalagem premium, rótulo, brinde personalizado, uniforme e tote bag. Prazo: 50–60 dias.',
      },
    ],
    addons: [
      {
        name: 'Módulo: Identidade Visual',
        desc: 'Logotipo, paleta, tipografia, sistema gráfico.',
        price: null,
      },
      { name: 'Módulo: Brand Book', desc: 'Manual completo de marca.', price: null },
      { name: 'Módulo: Visual Merchandising', desc: 'Ambiente interno do PDV.', price: null },
      { name: 'Módulo: Essencial Print Pack', desc: 'Aplicações impressas.', price: null },
      { name: 'Módulo: Projeto de Fachada', desc: 'Fachada externa e sinalização.', price: null },
      { name: 'Módulo: Assessoria de Imprensa', desc: 'Assessoria de imprensa.', price: null },
    ],
  },
  'campanha-lancamento': {
    name: 'Campanha de Lançamento',
    unit: 'agencia',
    description:
      'Lançar sem estratégia é ocupar espaço. Lançar com direção é construir percepção. A Campanha de Lançamento constrói o ecossistema de comunicação completo em dez formatos: do Ecossistema 360° Multicamadas ao Storyselling de Fundadores, do Storyfilm Imersivo ao Editorial Social Premium. Cada formato é um sistema — hero film, editorial, storytelling e landing page conectados por uma única narrativa. Do conceito à ativação, orquestrado antes de qualquer câmera entrar em cena.',
    image:
      '/images/blog/campanha-lancamento/campanha-publicitaria-direcao-criativa-house-mazzutti.webp',
    packages: [
      {
        name: 'Essential',
        price: 15700,
        desc: 'Narrativa central estruturada + hero film + 5–10 vídeos curtos + editorial fotográfico + landing page. Ideal para marcas em primeiro lançamento digital ou reposicionamento com foco orgânico. Prazo: 30–40 dias.',
      },
      {
        name: 'Profissional',
        price: 28600,
        desc: 'Ecossistema completo: hero film + vídeos médios + reels + editorial + storytelling escrito + email sequence. Narrativa única desdobrada em múltiplos canais com consistência estética. Prazo: 40–50 dias.',
      },
      {
        name: 'Premium',
        price: 33300,
        desc: 'Produção de alto impacto com múltiplos formatos, criadores selecionados, estratégia de distribuição e 60–90 dias de conteúdo orgânico estruturado. Da concepção ao resultado, com governança criativa total. Prazo: 45–60 dias.',
      },
    ],
    addons: [],
  },
  'desenvolvimento-web': {
    name: 'Desenvolvimento Web',
    unit: 'agencia',
    description:
      'Presença digital não é vitrine. É posicionamento. A House desenvolve sites premium em três categorias: Pessoa Física/MEI (portfólio, landing page, marca pessoal), Empresarial (sites corporativos com CRM, agenda e automações) e E-commerce (lojas completas para moda, beleza e saúde em WooCommerce ou Nuvemshop). Cada projeto inclui consultoria, design autoral, desenvolvimento, SEO e treinamento. Um site que trabalha pela marca enquanto ela dorme.',
    image: '/images/agencia/alletto/capa.webp',
    packages: [
      {
        name: 'Essential',
        price: 5700,
        desc: 'Pessoa Física / MEI — site de marca pessoal, portfólio ou landing page até 5 páginas, SEO básico, design autoral. Para profissionais que precisam de presença digital inicial e consistente. Hospedagem e manutenção mensais disponíveis.',
      },
      {
        name: 'Profissional',
        price: 8600,
        desc: 'Empresarial — site corporativo até 15 páginas com blog, formulários inteligentes, agenda de atendimento e CRM básico integrado. SEO avançado e design premium. Para escritórios, clínicas e agências.',
      },
      {
        name: 'Premium',
        price: 13300,
        desc: 'E-commerce completo para moda, beleza ou saúde — WooCommerce ou Nuvemshop, múltiplos gateways de pagamento (PIX, cartão, boleto), logística integrada e automações de marketing. Design editorial com foco em conversão.',
      },
    ],
    addons: [],
  },
  'rp-mkt-direto': {
    name: 'RP & Marketing Direto',
    unit: 'agencia',
    description:
      'Reputação não se constrói com ação isolada — se constrói com presença consistente nos lugares certos. O RP & Marketing Direto posiciona marcas e pessoas na mídia premium, em eventos estratégicos e junto a formadores de opinião alinhados ao território da marca. Assessoria de imprensa e relações públicas integradas à narrativa do cliente. Presença que gera autoridade, não apenas visibilidade.',
    image: '/images/agencia/knowhol/1.webp',
    packages: [
      { name: 'Essential', price: 30000, duration: '3 meses', desc: null },
      { name: 'Profissional', price: 60000, duration: '3 meses', desc: null },
      { name: 'Premium', price: 100000, duration: 'Lançamento', desc: null },
    ],
    addons: [],
  },
  'book-studio': {
    name: 'Book Studio',
    unit: 'studio',
    description:
      'Antes de qualquer câmera, existe direção. O Book Studio constrói o dossiê visual de modelos, talentos e profissionais com moodboard personalizado, direção de poses e retoque high-end. Três planos — Essencial (8 fotos, 2 looks), Estratégico (10 fotos, 3 looks) e Premium (12 fotos, 4 looks) — com upgrades de vídeo disponíveis: Reel, Catwalk e Casting. Para quem entende que imagem não serve para aparecer — serve para sustentar uma carreira.',
    image: '/images/studio/amanda-oliveira/capa.webp',
    packages: [
      {
        name: 'Essencial',
        price: 2700,
        duration: 'Entrega em 5 dias',
        desc: '2 looks + 1 make & hair + 8 fotos tratadas (high-end retouching) + 2 cenas/fundos + 3 horas de sessão + moodboard personalizado. Cartão de visitas visual para agências e redes. Upgrade de vídeo disponível.',
      },
      {
        name: 'Estratégico',
        price: 3500,
        duration: 'Entrega em 7 dias',
        desc: '3 looks + 1 make & 2 hair + 10 fotos tratadas + 3 cenas/fundos + 4 horas de sessão + moodboard. Mais escolhido — equilíbrio entre versatilidade e produção. Upgrade de vídeo disponível.',
      },
      {
        name: 'Premium',
        price: 5200,
        duration: 'Entrega em 10 dias',
        desc: '4 looks + 2 make & 3 hair + 12 fotos tratadas + 4 cenas/fundos + 5 horas de sessão + moodboard. Produção full-day com máxima versatilidade de perfis. Upgrades Catwalk e Casting disponíveis.',
      },
    ],
    addons: [
      { name: 'Vídeo Catwalk', desc: 'Apresentação técnica para agências.', price: 2500 },
      { name: 'Vídeo Casting Falado', desc: 'Vídeo com roteiro para agências.', price: 3500 },
      {
        name: 'Book Impresso (Padrão)',
        desc: 'Material físico — papel premium, até 20 páginas.',
        price: 2500,
      },
      { name: 'Book Impresso (Premium)', desc: 'Acabamento luxo.', price: 4000 },
      { name: 'Fashionfilme Essencial', desc: '1 vídeo vertical até 45s.', price: 1200 },
      { name: 'Fashionfilme Estratégico', desc: '1 vídeo até 60s + teaser 15s.', price: 2000 },
      { name: 'Fashionfilme Premium', desc: '2 vídeos + cortes para tráfego.', price: 3500 },
    ],
  },
  cobertura: {
    name: 'Cobertura / Concierge Production',
    unit: 'studio',
    description:
      'O Concierge Production é a experiência de imagem pessoal premium da House — criada para clientes que desejam viver São Paulo com acompanhamento visual, produção refinada e presença construída com o mesmo cuidado de uma publi com famoso. A House acompanha desde a chegada ao hotel até o encerramento da jornada: deslocamentos, bastidores, entradas em eventos e momentos estratégicos da agenda. Fotografia, vídeo, beauty artist, stylist e suporte executivo integrados. Não é cobertura — é produção de presença.',
    image:
      '/images/blog/cobertura-presenca-sp/cobertura-externa-tempo-real-sao-paulo-house-mazzutti.webp',
    packages: [
      {
        name: 'Oficial Plan',
        price: 2700,
        duration: 'Até 2h',
        desc: 'Cobertura fotográfica profissional de evento ou agenda — registro de presença em momentos-chave com fotógrafo dedicado e direção de imagem. Entrega em galeria curada.',
      },
      {
        name: 'Essencial Plan',
        price: 4500,
        duration: 'Até 2h',
        desc: 'Cobertura fotográfica + vídeo de destaque — presença completa com foto e reels para conteúdo pós-evento. Direção de imagem e orientação de poses inclusa.',
      },
      {
        name: 'Imersive Plan',
        price: 5500,
        duration: 'Até 4h',
        desc: 'Acompanhamento imersivo — bastidores, preparação, evento e momentos estratégicos da agenda. Foto + vídeo + direção de presença + orientação de looks. A House dentro da sua rotina.',
      },
      {
        name: 'RealTime Plan',
        price: 8500,
        duration: 'Até 6h',
        desc: 'Produção de presença completa — acompanhamento total do dia com beauty artist, fotografia, vídeo e entrega de stories em tempo real. O nível de uma publi com famoso aplicado à sua própria imagem e agenda.',
      },
    ],
    addons: [],
  },
  'ensaio-pessoal': {
    name: 'Ensaio Pessoal',
    unit: 'studio',
    description:
      'Para mulheres empresárias, fundadoras, executivas e profissionais liberais que precisam de uma presença visual compatível com o lugar que ocupam — ou querem ocupar. O Ensaio Pessoal vai além do book: faz leitura do momento profissional, define direção criativa e constrói linguagem visual exclusiva. Três planos — Autoral, Editorial e Signature — com 3 a 6 horas, stylist e assistente conforme o nível. Imagem que constrói percepção, não apenas registro.',
    image: '/images/studio/mileide-mihaile/1.webp',
    packages: [
      {
        name: 'Autoral',
        price: 3700,
        duration: 'Entrega em 5 dias',
        desc: '3 horas + 3 looks + direção criativa + 15 fotos tratadas + Studio House ou locação interna. Entrada elegante para quem precisa de uma imagem mais refinada — presença visual compatível com o momento profissional.',
      },
      {
        name: 'Editorial',
        price: 6700,
        duration: 'Entrega em 8 dias',
        desc: '4 horas + 4 looks + direção criativa estratégica + 20 fotos tratadas + Studio + locação interna controlada + assistente + orientação de looks. Melhor equilíbrio entre posicionamento, sofisticação e presença autoral.',
      },
      {
        name: 'Signature',
        price: 12000,
        duration: 'Entrega em 10 dias',
        desc: '6 horas + 5 looks + direção criativa autoral + 25 fotos tratadas + Studio Premium + assistente + stylist dedicado. A experiência mais próxima de uma produção editorial de luxo — para quem precisa ser percebida com máxima autoridade.',
      },
    ],
    addons: [],
  },
  'direcao-criativa': {
    name: 'Direção & Criação Estratégica',
    unit: 'produtora',
    description:
      'Produzir não é o problema. Produzir sem critério é. A Direção & Criação Estratégica combina liderança criativa, videografia, fotografia, cenografia e narrativa publicitária em projetos onde o conceito precisa chegar intacto ao resultado final. Seis frentes de atuação. Nada é escolha estética isolada — tudo é construção de percepção.',
    image:
      '/images/blog/editorial-moda-narrativa/editorial-moda-narrativa-visual-fashion-direction-house-mazzutti.webp',
    packages: [
      { name: 'Projeto de Direção Criativa', price: 7000, desc: null },
      { name: 'Direção de Videografia', price: 6000, desc: null },
      { name: 'Direção de Fotografia', price: 6000, desc: null },
      { name: 'Projeto de Cenografia', price: 6000, desc: null },
      { name: 'Narrativa Publicitária', price: 5000, desc: null },
      { name: 'Produção Executiva', price: 8000, desc: null },
    ],
    addons: [],
  },
  'editorial-moda': {
    name: 'Editorial de Moda',
    unit: 'produtora',
    description:
      'Editorial de Moda é a ponte entre produto e percepção de marca. A House produz lookbooks, fashion films, catálogos e campanhas com direção criativa completa — conceito, moodboard, narrativa de coleção, casting, beauty e fotografia — em oito estilos editoriais: minimalista, conceitual, comercial, documental, dramático, beauty-focused, street/urbano e studio clássico. Para marcas que precisam parar de parecer apenas produto e começar a construir identidade, repertório e presença.',
    image: '/images/produtora/moda/beatco/capa.webp',
    packages: [
      {
        name: 'Lookbook (foto + vídeo)',
        price: 3000,
        desc: 'Editorial fotográfico + vídeo de coleção — looks, styling, direção criativa, fotógrafo e videomaker integrados. Para lookbooks e catálogos de lançamento com identidade visual consistente.',
      },
      {
        name: 'Fashion Film',
        price: 6000,
        desc: 'Produção audiovisual de coleção com direção criativa, roteiro visual, trilha e cinematografia. Para marcas que querem narrar sua estética em movimento — a coleção como experiência.',
      },
      {
        name: 'Short Vídeos Catálogo',
        price: 2500,
        desc: 'Série de vídeos curtos verticais por look ou produto — para reels, TikTok e e-commerce. Conversão com estética de marca: cada vídeo comunica sem precisar de legenda.',
      },
      {
        name: 'Still de Produtos',
        price: 2500,
        desc: 'Fotografia still de produtos e detalhes de coleção — para e-commerce, catálogo e materiais de venda. Qualidade editorial, leitura comercial: o produto no seu melhor ângulo.',
      },
    ],
    addons: [],
  },
  'producao-corporativa': {
    name: 'Produção Corporativa & Institucional',
    unit: 'produtora',
    description:
      'Institucional não é burocrático — é estratégico. A House transforma a presença corporativa em ativos audiovisuais em três núcleos: Posicionamento & Branding (vídeo de CEO, manifesto, banco de imagem), Educacional & Treinamento (videoaulas, treinamentos, cases de sucesso) e Eventos & Transmissões (cobertura presencial, live, captação aérea com drone). Para empresas que entendem que como se apresentam ao mundo define como são percebidas.',
    image: '/images/produtora/institucional/sense-hotel/capa.webp',
    packages: [
      {
        name: 'Vídeo de Posicionamento CEO',
        price: 4000,
        desc: 'Vídeo de autoridade com posicionamento do CEO ou fundador — roteiro estratégico, direção e produção completa. Para site, apresentações, LinkedIn e ações de alto impacto. 2 a 4 minutos.',
      },
      {
        name: 'Vídeo Explicativo',
        price: 4000,
        desc: 'Animação ou vídeo que explica o produto, serviço ou solução da marca — didático, objetivo e com identidade visual. Ideal para site, funil de vendas e suporte ao cliente. 1 a 3 minutos.',
      },
      {
        name: 'Vídeo Marketing',
        price: 5000,
        desc: 'Produção completa para campanha digital — vídeo com narrativa estratégica, estética de marca e CTA definido. Para canais digitais, mídias pagas e redes sociais. 15 a 60 segundos.',
      },
      {
        name: 'Banco de Imagem',
        price: 6000,
        desc: 'Sessão fotográfica institucional completa — equipe, espaço, produto e marca em imagens profissionais para site, apresentações, imprensa e redes. Acervo visual de autoridade.',
      },
      {
        name: 'Vídeo para Apps e Site',
        price: 5000,
        desc: 'Vídeo curto de apresentação otimizado para apps, home page e landing pages — loop sem narração ou narrado, entregue em múltiplos formatos e resoluções.',
      },
    ],
    addons: [],
  },
  'producao-educacao': {
    name: 'Produção de Educação',
    unit: 'produtora',
    description:
      'Conhecimento bem produzido muda a percepção de quem o recebe. A Produção de Educação traduz expertise em audiovisual — vídeos de treinamento, videoaulas e cases de sucesso — com o mesmo nível de direção que a House aplica em campanhas para grandes marcas. Para empresas que entendem que a embalagem é parte da mensagem.',
    image: '/images/academy/inside-out/cover.webp',
    packages: [
      { name: 'Vídeo de Treinamento', price: 4000, desc: null },
      { name: 'Vídeo-aulas', price: 5000, desc: null },
      { name: 'Cases de Sucesso', price: 4000, desc: null },
    ],
    addons: [],
  },
  'producao-eventos': {
    name: 'Produção de Eventos',
    unit: 'produtora',
    description:
      'Um evento acontece uma vez. A forma como é registrado determina como será lembrado. A Produção de Eventos entrega cobertura fotográfica e videográfica completa, transmissão ao vivo e captação aérea — com direção editorial, não apenas operação técnica. Três formatos disponíveis. O registro que honra o evento enquanto constrói percepção.',
    image:
      '/images/blog/cobertura-narrativa-visual/cobertura-narrativa-visual-sao-paulo-house-mazzutti.webp',
    packages: [
      { name: 'Cobertura de Evento', price: 6000, desc: null },
      { name: 'Transmissão Online', price: 8000, desc: null },
      { name: 'Imagens Aéreas (Drone)', price: 3000, desc: null },
    ],
    addons: [],
  },
  'banco-imagem': {
    name: 'Banco de Imagem Institucional',
    unit: 'produtora',
    description:
      'Pare de sofrer com conteúdos que só geram like e distorcem a imagem do seu negócio. O Banco de Imagem Institucional leva os estúdios de São Paulo para dentro da sua empresa — Diretor de Arte, Fotógrafo, Videomaker e Stylist em curadoria completa da sua marca, da sua equipe, do seu espaço. O nível de produção das grandes celebridades aplicado ao seu negócio. Indicado para empresas que se reposicionaram, passaram por rebranding ou retrofit, investiram em treinamento de equipe — e agora precisam que o visual online reflita quem realmente são. Para quem está estagnado no digital, sem repertório de imagem, com equipe que não condiz com o que é visto nos perfis. Uma mudança de visual completa: identidade em imagem, acervo premium e direção publicitária de alto padrão para construir reputação consistente em perfis, páginas, apresentações e documentos. Para empresas e marcas em todo o Brasil que querem parar de parecer — e começar a ser percebidas.',
    image: '/images/produtora/institucional/sense-hotel/capa.webp',
    packages: [
      {
        name: 'Banco Essencial',
        price: 4900,
        desc: 'Time de 2 pessoas (fotógrafo + diretor de arte) · 4h no seu espaço · 5 cenários curados · 60 fotos tratadas high-end · Acervo pronto para site, LinkedIn e apresentações corporativas. Entrega em 7 dias.',
      },
      {
        name: 'Banco Estratégico',
        price: 9500,
        desc: 'Time de 3 pessoas (fotógrafo + videomaker + diretor de arte) · 8h · 10 cenários · 120 fotos tratadas + 3 vídeos curtos · CEO, equipe, espaço e produto. Acervo completo para mídia digital, imprensa e documentos. Entrega em 10 dias.',
      },
      {
        name: 'Banco Premium',
        price: 18000,
        desc: 'Produção de 2 dias com equipe completa (fotógrafo, videomaker, stylist, diretor de arte, assistente) · Direção de arte full · Retrato de autoridade do CEO · Campanha institucional · 200+ fotos + 6 vídeos. Para marcas que precisam de imagem incompatível com o mercado. Entrega em 15 dias.',
      },
      {
        name: 'Banco Master',
        price: 28000,
        desc: 'O nível das grandes celebridades aplicado à sua empresa. 3 dias de produção · Equipe completa de estúdio · Direção publicitária · Identidade visual em imagem · Foto + Vídeo institucional + Reels + Making of · Acervo anual completo. Entrega em 20 dias.',
      },
    ],
    addons: [
      {
        name: 'Drone / Imagens Aéreas',
        desc: 'Captação aérea do espaço e entorno da empresa.',
        price: 3000,
      },
      {
        name: 'Vídeo de Posicionamento CEO',
        desc: 'Vídeo de autoridade 2–4 min para LinkedIn e site.',
        price: 4000,
      },
      {
        name: 'Stylist Dedicado',
        desc: 'Curadoria de looks para toda a equipe no dia da produção.',
        price: 3600,
      },
      {
        name: 'Reels Pack (5 vídeos)',
        desc: '5 vídeos curtos verticais otimizados para Instagram e LinkedIn.',
        price: 3500,
      },
      {
        name: 'Licença de Uso Ampliada',
        desc: 'Direitos de uso para mídia paga, out-of-home e impressão gráfica.',
        price: 2000,
      },
    ],
  },
  'producao-executiva': {
    name: 'Produção Executiva',
    unit: 'produtora',
    description:
      'É a inteligência operacional por trás de uma grande campanha. A Produção Executiva lidera e viabiliza produções complexas em cinco núcleos: Direção & Criação, Audiovisual, Moda & Beleza, Casting & Influência e Produção & Estrutura. Para grandes marcas e campanhas onde equipes desconectadas, criação sem execução à altura e falhas de operação não são uma opção. Monte a equipe completa ou parcial — cada adicional é um especialista curado pela House.',
    image: '/images/academy/inside-out/cover.webp',
    packages: [],
    addons: [],
    addonGroups: [
      {
        category: 'Direção & Criação',
        items: [
          {
            name: 'Produção Executiva 360°',
            price: 9600,
            desc: 'Gestão completa da campanha — da concepção ao resultado. O Produtor Executivo 360° coordena equipes, orçamentos, fornecedores e cronogramas com visão estratégica sobre cada etapa da produção.',
          },
          {
            name: 'Diretor Criativo',
            price: 8400,
            desc: 'O responsável pelo conceito que une tudo. O Diretor Criativo define a narrativa, a estética e a direção editorial do projeto — e supervisiona a execução para que a ideia original chegue intacta ao resultado.',
          },
          {
            name: 'Diretor de Arte',
            price: 7200,
            desc: 'Visão, estética e identidade visual em cada frame. O Diretor de Arte traduz o conceito criativo em linguagem visual — paleta, composição, objetos de cena — e garante a coerência entre o moodboard e o set.',
          },
          {
            name: 'Head de Criação',
            price: 9600,
            desc: 'Liderança criativa de alto nível para projetos que exigem estratégia além da execução. O Head de Criação define o posicionamento estético e narrativo da marca antes de qualquer câmera entrar em cena.',
          },
          {
            name: 'Supervisor Criativo',
            price: 6000,
            desc: 'O olhar que mantém o padrão no set. O Supervisor Criativo acompanha a produção em tempo real, garantindo que cada decisão — de luz a styling — preserve a integridade do conceito aprovado.',
          },
          {
            name: 'Roteirista',
            price: 6000,
            desc: 'Narrativa antes de câmera. O Roteirista estrutura o storytelling do projeto — roteiro técnico, falas, sequência dramática e ritmo narrativo — para que a produção saiba exatamente o que contar e como.',
          },
          {
            name: 'Ilustrador',
            price: 5400,
            desc: 'Do conceito ao visual. O Ilustrador desenvolve storyboards, elementos gráficos e peças ilustradas que complementam a identidade visual da produção com autoria e precisão estética.',
          },
          {
            name: 'Designer Gráfico',
            price: 4200,
            desc: 'Design como parte da narrativa. O Designer Gráfico cria as peças visuais da campanha — layouts, motion e identidade de materiais — com consistência entre o universo da marca e as entregas do projeto.',
          },
          {
            name: 'Redator / Copywriter',
            price: 4800,
            desc: 'A palavra que posiciona. O Redator / Copywriter cria o texto publicitário, a copy estratégica e o storytelling escrito da campanha — com voz alinhada à marca e intenção em cada linha.',
          },
        ],
      },
      {
        category: 'Audiovisual',
        items: [
          {
            name: 'Videomaker',
            price: 6000,
            desc: 'Captação com intenção. O Videomaker opera câmera com visão narrativa, enquadramentos estratégicos e domínio técnico — para que cada take entregue não apenas imagem, mas história.',
          },
          {
            name: 'Diretor de Fotografia (DP/DF)',
            price: 7200,
            desc: 'Luz, ângulo e narrativa visual. O Diretor de Fotografia lidera a estética da imagem — define o setup de luz, escolhe lentes e determina a linguagem visual que dá identidade à produção.',
          },
          {
            name: 'Operador de Câmera',
            price: 3600,
            desc: 'Precisão técnica em cada movimento. O Operador de Câmera executa a captação com domínio de equipamento, estabilidade e leitura de cena — para que o enquadramento honre a direção.',
          },
          {
            name: 'Editor de Vídeo',
            price: 3600,
            desc: 'Onde a produção ganha sentido. O Editor de Vídeo monta, ritma e finaliza o material bruto em uma peça coesa — com domínio de cor, som e narrativa visual.',
          },
          {
            name: 'Fotógrafo',
            price: 4800,
            desc: 'A imagem que permanece. O Fotógrafo captura o projeto com olhar autoral e domínio técnico — composição, luz e timing — para que cada foto comunique com precisão e sofisticação.',
          },
          {
            name: 'Editor de Foto',
            price: 2000,
            desc: 'O refinamento que eleva a imagem. O Editor de Foto trata, retoca e finaliza o material fotográfico com consistência de cor, limpeza técnica e aderência à identidade visual da marca.',
          },
          {
            name: 'Locutor',
            price: 4800,
            desc: 'A voz que ancora a narrativa. O Locutor entrega a narração com interpretação precisa, timbre profissional e ritmo alinhado ao tom da campanha.',
          },
          {
            name: 'Sound Designer',
            price: 6000,
            desc: 'O som que posiciona. O Sound Designer cria a identidade sonora da produção — efeitos, texturas e ambientação — para que o áudio seja tão estratégico quanto a imagem.',
          },
          {
            name: 'Produtor Musical',
            price: 6000,
            desc: 'A trilha que dá alma ao projeto. O Produtor Musical compõe ou seleciona a música original da produção — com sensibilidade estética e alinhamento ao universo da marca.',
          },
        ],
      },
      {
        category: 'Moda & Beleza',
        items: [
          {
            name: 'Stylist',
            price: 3600,
            desc: 'Moda como estratégia visual. O Stylist constrói a identidade de styling da produção — seleção de peças, harmonia de looks e coerência entre vestuário e conceito — para que cada roupa fale pela marca.',
          },
          {
            name: 'Assistente de Stylist',
            price: 1440,
            desc: 'O suporte que garante fluidez no set. O Assistente de Stylist apoia na organização, troca e manutenção das peças durante toda a produção.',
          },
          {
            name: 'Maquiador',
            price: 2400,
            desc: 'Beleza com intenção editorial. O Maquiador cria looks alinhados ao conceito da produção — da pele ao acabamento — com técnica, repertório estético e domínio dos diferentes universos visuais.',
          },
          {
            name: 'Cabeleireiro / Hair Styling',
            price: 2160,
            desc: 'Produção de cabelo com direção. O Cabeleireiro / Hair Styling cria e mantém os looks capilares em harmonia com o styling e a direção de arte do projeto.',
          },
          {
            name: 'Camareira',
            price: 800,
            desc: 'A ordem que sustenta o set. A Camareira organiza, cuida e disponibiliza os figurinos com precisão — garantindo que cada troca aconteça sem interrupções e sem perda de qualidade.',
          },
          {
            name: 'Passadeira',
            price: 900,
            desc: 'O acabamento que aparece na imagem. A Passadeira prepara e mantém os figurinos impecáveis durante o set — eliminando vincos e preservando a integridade visual das peças.',
          },
        ],
      },
      {
        category: 'Casting & Influência',
        items: [
          {
            name: 'Modelo New Face',
            price: 4500,
            desc: 'Frescor editorial com potencial de imagem. Modelos em início de carreira com perfil fotogênico, versatilidade e presença — curados pela House para produções que buscam autenticidade visual.',
          },
          {
            name: 'Modelo Renomada BR',
            price: 12000,
            desc: 'Presença consolidada, imagem estabelecida. Modelos com carreira nacional reconhecida, portfólio diversificado e profissionalismo de set — para produções que exigem referência e autoridade visual.',
          },
          {
            name: 'Modelo Internacional',
            price: 24000,
            desc: 'Padrão global, presença de campanha. Modelos com carreira internacional ativa, experiência em grandes produções e imagem de alto impacto — para projetos que disputam atenção em qualquer mercado.',
          },
          {
            name: 'Influencer Nano (até 10k)',
            price: 2400,
            desc: 'Micro-alcance, conexão real. Criadores com base engajada e nicho definido — ideais para ativações de autenticidade, lançamentos segmentados e campanhas que valorizam conexão acima de escala.',
          },
          {
            name: 'Influencer Micro (10k–50k)',
            price: 4800,
            desc: 'Nichado, influente e próximo. Criadores com comunidades ativas e alta taxa de conexão — para marcas que querem presença qualificada em territórios específicos de moda, beleza, saúde ou lifestyle.',
          },
          {
            name: 'Influencer Mid (50k–200k)',
            price: 9600,
            desc: 'Escala com qualidade editorial. Criadores com alcance relevante e perfil estético alinhado — para campanhas que precisam de visibilidade qualificada sem abrir mão de coerência de marca.',
          },
          {
            name: 'Influencer Macro (200k+)',
            price: 18000,
            desc: 'Alcance expressivo, autoridade de nicho. Criadores com grande base e posicionamento consolidado — para campanhas de lançamento, awareness e ações que demandam presença de escala.',
          },
          {
            name: 'Influencer Mega (5M+)',
            price: 40000,
            desc: 'Visibilidade máxima, impacto nacional. Criadores com milhões de seguidores e presença cultural relevante — para campanhas que precisam de alcance de massa com autoridade de imagem.',
          },
        ],
      },
      {
        category: 'Produção & Estrutura',
        items: [
          {
            name: 'Set Designer',
            price: 7200,
            desc: 'O espaço como parte da narrativa. O Set Designer cria e conceitua o cenário da produção — objetos, texturas, composição e atmosfera — para que o ambiente fale antes de qualquer fala ou legenda.',
          },
          {
            name: 'Cenografia',
            price: 9600,
            desc: 'Execução que transforma espaço em imagem. A Cenografia vai do conceito à montagem — construção, pintura, objetos e acabamento — entregando um set que sustenta a direção de arte do projeto.',
          },
          {
            name: 'Assistente de Produção',
            price: 1200,
            desc: 'A operação que mantém tudo em movimento. O Assistente de Produção apoia a coordenação geral do set — logística, comunicação entre equipes, cronograma e resolução de imprevistos.',
          },
          {
            name: 'Espaço / Locação',
            price: 6000,
            desc: 'O cenário certo muda tudo. A House coordena locações externas, estúdios e espaços premium em São Paulo — para que o ambiente da produção esteja alinhado ao universo estético da marca.',
          },
          {
            name: 'Catering',
            price: 4800,
            desc: 'O set funciona quando a equipe está bem. O Catering garante alimentação estruturada para a equipe durante toda a diária — com logística própria e presença discreta no set.',
          },
          {
            name: 'Brigadista',
            price: 2400,
            desc: 'Segurança como parte da produção. O Brigadista garante conformidade com normas de segurança, prevenção de incidentes e atendimento de primeiros socorros.',
          },
          {
            name: '1º Assistente de Câmera (Foquista)',
            price: 3000,
            desc: 'O foco que define a imagem. O 1º AC opera o sistema de foco da câmera com precisão técnica — garantindo nitidez, rastreamento e consistência em cada take.',
          },
          {
            name: '2º Assistente de Câmera',
            price: 2160,
            desc: 'O suporte técnico que liberta o set. O 2º AC gerencia cartões de memória, baterias e claquete — mantendo o fluxo de captação organizado.',
          },
          {
            name: 'Logger / DIT',
            price: 3360,
            desc: 'Dados seguros, produção protegida. O Logger / DIT realiza o backup em tempo real do material captado, organiza os arquivos e garante a integridade das mídias ao longo de toda a diária.',
          },
          {
            name: 'Gaffer (Ass. de Luz)',
            price: 3600,
            desc: 'A luz que define a imagem. O Gaffer coordena o departamento de elétrica e iluminação — montagem, ajustes e operação do kit de luz.',
          },
          {
            name: 'Maquinista',
            price: 3000,
            desc: 'Movimento com precisão. O Maquinista opera trilhos, grua, steadicam e demais suportes de câmera — para que os movimentos da produção sejam executados com segurança e controle total.',
          },
          {
            name: 'Best Boy',
            price: 1800,
            desc: 'O suporte que mantém o ritmo do set. O Best Boy apoia o Gaffer e o departamento técnico com logística de equipamentos e organização de cabos.',
          },
        ],
      },
    ],
  },
  'publicidade-campanha': {
    name: 'Publicidade & Campanha',
    unit: 'produtora',
    description:
      'Publicidade que apenas ocupa espaço custa igual à publicidade que constrói. A House desenvolve campanhas completas — Produção Executiva 360°, linha editorial contínua e ativações com criadores selecionados — orquestradas por uma narrativa central que atravessa formatos, plataformas e meses de execução. Uma campanha que dura além do veiculamento.',
    image: '/images/produtora/beleza/oceane/capa.webp',
    packages: [
      { name: 'Produção Executiva 360°', price: 20000, desc: null },
      { name: 'Linha Editorial (2+ meses)', price: 25000, desc: null },
      { name: 'Campanha com Influenciadores', price: 15000, desc: null },
    ],
    addons: [],
  },
}

function renderPackagesGrid(packages: Package[]): string {
  if (packages.length === 0) return ''

  const count = packages.length
  let colsClass = `cols-${count}`
  if (count > 4) colsClass = 'cols-6'

  const cards = packages
    .map((pkg, i) => {
      const isFeatured = count === 3 && i === 1
      const cardClass = isFeatured ? 'pkg-card featured' : 'pkg-card'
      const priceHtml =
        pkg.price !== null
          ? `<div class="pkg-price">${fmt(pkg.price)}</div>`
          : `<div class="pkg-price-consulta">Sob consulta</div>`
      const durationHtml = pkg.duration ? `<div class="pkg-duration">${pkg.duration}</div>` : ''
      const descHtml = pkg.desc ? `<div class="pkg-desc">${pkg.desc}</div>` : ''
      return `<div class="${cardClass}">
  <div class="pkg-name">${pkg.name}</div>
  ${priceHtml}
  ${durationHtml}
  ${descHtml}
</div>`
    })
    .join('\n')

  return `<div class="pkg-grid ${colsClass}">${cards}</div>`
}

function renderAddonsSection(addons: Addon[]): string {
  if (addons.length === 0) return ''

  const cards = addons
    .map((a) => {
      const priceHtml =
        a.price !== null
          ? `<div class="addon-price">${fmt(a.price)}</div>`
          : `<div class="addon-price-null">Incluso no pacote</div>`
      return `<div class="addon-card">
  <div class="addon-name">${a.name}</div>
  <div class="addon-desc">${a.desc}</div>
  ${priceHtml}
</div>`
    })
    .join('\n')

  return `<section class="addons-section">
  <div class="addons-title">Adicionais & Upgrades</div>
  <div class="addons-grid">${cards}</div>
</section>`
}

function renderAddonGroupsSection(groups: AddonGroup[]): string {
  if (!groups || groups.length === 0) return ''

  const groupsHtml = groups
    .map((g) => {
      const rows = g.items
        .map((item) => {
          const priceStr = item.price !== null ? fmt(item.price) : '—'
          return `<tr>
  <td class="pe-role">${item.name}</td>
  <td class="pe-desc-cell">${item.desc}</td>
  <td class="pe-price">${priceStr}</td>
</tr>`
        })
        .join('\n')

      return `<div class="pe-group">
  <div class="pe-group-title">${g.category}</div>
  <table class="pe-table"><tbody>${rows}</tbody></table>
</div>`
    })
    .join('\n')

  return `<section class="addons-section">
  <div class="addons-title">Monte Sua Equipe</div>
  ${groupsHtml}
</section>`
}

function renderPage(svc: Service): string {
  const unitLabel = svc.unit.charAt(0).toUpperCase() + svc.unit.slice(1)

  const packagesHtml =
    svc.packages.length > 0
      ? `<div class="product-inner">
  <div class="pkg-section-title">Pacotes & Valores</div>
  ${renderPackagesGrid(svc.packages)}
</div>`
      : ''

  const addonsHtml =
    svc.addonGroups && svc.addonGroups.length > 0
      ? renderAddonGroupsSection(svc.addonGroups)
      : renderAddonsSection(svc.addons)

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${svc.name} — House Mazzutti</title>
<meta name="robots" content="noindex, nofollow">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
a { color: inherit; text-decoration: none; }
:root { --bg: #faf9f7; --dark: #111; --gold: #c4a97a; --mid: #555; --muted: #999; --border: #e8e3db; --cream: #f0ede8; }
@media (prefers-color-scheme: dark) { :root { --bg: #141414; --border: #2a2a2a; --cream: #1e1e1e; --mid: #aaa; --muted: #666; } }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--dark); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
@media (prefers-color-scheme: dark) { body { color: #f0ede8; } }

.site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 28px 48px; background: transparent; transition: background 0.3s ease, transform 0.4s ease, border-bottom 0.3s ease; }
.site-header.scrolled { background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-bottom: 0.5px solid #e0e0e0; }
.site-header.hidden { transform: translateY(-100%); }
.site-logo { font-size: 18px; font-weight: 400; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; text-decoration: none; display: inline-flex; align-items: baseline; gap: 0.3em; white-space: nowrap; flex-shrink: 0; }
.site-logo .hm-house { font-weight: 400; }
.site-logo .hm-mazzutti { font-weight: 700; }
.site-header.scrolled .site-logo { color: #000; }
.site-nav { display: flex; align-items: center; gap: 0; margin: 0 auto 0 48px; }
.site-nav a { font-size: 10px; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.7); text-decoration: none; padding: 0 20px; transition: opacity 0.3s; }
.site-nav a:hover { color: #fff; opacity: 0.7; }
.site-header.scrolled .site-nav a { color: #000; }
.site-hamburger { background: none; border: none; cursor: pointer; display: flex; flex-direction: column; justify-content: center; width: 44px; height: 44px; position: relative; padding: 0; }
.hbr-line { display: block; width: 28px; height: 1px; background: #fff; position: absolute; left: 8px; transition: all 0.3s ease; }
.hbr-line:nth-child(1) { top: 14px; } .hbr-line:nth-child(2) { top: 22px; } .hbr-line:nth-child(3) { top: 30px; }
.site-header.scrolled .hbr-line { background: #000; }
.site-hamburger.open .hbr-line:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
.site-hamburger.open .hbr-line:nth-child(2) { opacity: 0; }
.site-hamburger.open .hbr-line:nth-child(3) { transform: rotate(-45deg) translate(8px, -8px); }
.side-overlay { display: none; position: fixed; inset: 0; z-index: 99998; background: rgba(0,0,0,0.3); }
.side-overlay.open { display: block; }
.side-menu { position: fixed; top: 0; right: 0; bottom: 0; width: 25vw; min-width: 320px; background: #0a0a0a; z-index: 99999; display: flex; flex-direction: column; justify-content: space-between; padding: 60px 48px; transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
.side-menu.open { transform: translateX(0); }
.side-menu-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; }
.side-menu-logo { font-size: 20px; font-weight: 400; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; display: inline-flex; gap: 0.3em; }
.side-menu-logo .hm-mazzutti { font-weight: 700; }
.side-close { background: none; border: none; cursor: pointer; position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
.side-close::before, .side-close::after { content: ''; display: block; width: 24px; height: 1px; background: #fff; position: absolute; }
.side-close::before { transform: rotate(45deg); } .side-close::after { transform: rotate(-45deg); }
.side-nav { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
.side-nav a { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #aaa; text-decoration: none; transition: color 0.3s; }
.side-nav a:hover { color: #fff; }
.side-section-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #444; margin-bottom: 16px; }
.side-section-links { display: flex; flex-direction: column; gap: 14px; margin-bottom: 40px; }
.side-section-links a { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #666; text-decoration: none; transition: color 0.3s; }
.side-section-links a:hover { color: #fff; }
.side-location { margin-bottom: 48px; }
.side-location p { font-size: 14px; font-style: italic; color: #aaa; line-height: 1.8; }
.side-divider { width: 100%; height: 0.5px; background: #222; margin-bottom: 48px; }
.side-follow-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #555; margin-bottom: 16px; }
.side-social { display: flex; flex-direction: column; gap: 12px; }
.side-social a { font-size: 14px; font-style: italic; color: #aaa; text-decoration: none; transition: color 0.3s; }
.side-social a:hover { color: #fff; }
.side-copy { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #333; margin: 0; }

.site-footer { background: #fff; border-top: 1px solid #e4e4e7; padding: 32px 48px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.footer-logo { font-size: 20px; font-weight: 400; letter-spacing: 0.04em; text-transform: uppercase; color: #000; text-decoration: none; display: inline-flex; align-items: baseline; gap: 0.3em; }
.footer-logo .hm-mazzutti { font-weight: 700; }
.footer-social { display: flex; gap: 32px; }
.footer-social a { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #000; text-decoration: none; transition: opacity 0.3s; }
.footer-social a:hover { opacity: 0.5; }
.footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 24px; }
.footer-links a { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #000; opacity: 0.5; text-decoration: none; transition: opacity 0.3s; }
.footer-links a:hover { opacity: 0.9; }
.footer-copy { font-size: 10px; letter-spacing: 0.1em; color: #a1a1aa; }

.product-hero { background: var(--dark); color: #fff; padding: 140px 64px 80px; }
.back-link { font-size: 9px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.35); text-decoration: none; display: inline-block; margin-bottom: 48px; transition: color .25s; }
.back-link:hover { color: rgba(255,255,255,0.8); }
.product-unit { font-size: 8px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
.product-name { font-size: clamp(40px, 6vw, 80px); font-weight: 900; line-height: 0.92; letter-spacing: -0.02em; text-transform: uppercase; margin-bottom: 28px; }
.product-desc { font-size: 16px; font-weight: 400; color: rgba(255,255,255,0.8); max-width: 640px; line-height: 1.8; margin-bottom: 40px; }
.product-cta { display: inline-block; background: #fff; color: #000; font-size: 9px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; padding: 14px 28px; text-decoration: none; transition: background .25s, color .25s; }
.product-cta:hover { background: var(--gold); color: #fff; }

.product-inner { max-width: 1320px; margin: 0 auto; padding: 80px 64px 120px; }

.pkg-section-title { font-size: 8px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
.pkg-grid { display: grid; gap: 1px; background: var(--border); margin-bottom: 64px; }
.pkg-grid.cols-1 { grid-template-columns: 1fr; }
.pkg-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.pkg-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.pkg-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
.pkg-grid.cols-6 { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .pkg-grid.cols-3, .pkg-grid.cols-4, .pkg-grid.cols-6 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .pkg-grid { grid-template-columns: 1fr !important; } }
.pkg-card { background: var(--bg); padding: 32px 28px; display: flex; flex-direction: column; gap: 14px; }
.pkg-card.featured { background: var(--dark); }
.pkg-card.featured .pkg-name, .pkg-card.featured .pkg-desc { color: rgba(255,255,255,0.92); }
.pkg-card.featured .pkg-price { color: var(--gold); }
.pkg-card.featured .pkg-duration { color: rgba(255,255,255,0.55); }
.pkg-name { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.pkg-price { font-size: 32px; font-weight: 900; letter-spacing: -0.02em; line-height: 1; color: var(--dark); }
@media (prefers-color-scheme: dark) { .pkg-price { color: #f0ede8; } }
.pkg-duration { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #666; }
.pkg-desc { font-size: 14px; font-weight: 400; color: #333; line-height: 1.75; }
.pkg-price-consulta { font-size: 14px; font-weight: 500; color: var(--muted); }

.addons-section { background: var(--dark); padding: 72px 64px; }
@media (max-width: 560px) { .addons-section { padding: 48px 24px; } }
.addons-title { font-size: 8px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.addons-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.07); }
@media (max-width: 900px) { .addons-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .addons-grid { grid-template-columns: 1fr; } }
.addon-card { background: #1a1a17; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.addon-name { font-size: 13px; font-weight: 600; letter-spacing: 0.05em; color: #fff; }
.addon-desc { font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.7); line-height: 1.6; }
.addon-price { font-size: 15px; font-weight: 700; color: var(--gold); margin-top: 4px; font-variant-numeric: tabular-nums; }
.addon-price-null { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-top: 4px; }

.pe-group { margin-bottom: 48px; }
.pe-group-title { font-size: 9px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.pe-table { width: 100%; border-collapse: collapse; }
.pe-table tr { border-bottom: 1px solid rgba(255,255,255,0.06); }
.pe-table tr:last-child { border-bottom: none; }
.pe-table td { padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.82); line-height: 1.5; vertical-align: top; }
.pe-table td.pe-role { padding-right: 20px; font-weight: 500; min-width: 200px; }
.pe-table td.pe-desc-cell { font-size: 13px; color: rgba(255,255,255,0.55); }
.pe-table td.pe-price { text-align: right; color: var(--gold); font-variant-numeric: tabular-nums; white-space: nowrap; padding-left: 20px; font-size: 14px; font-weight: 600; }

@media (max-width: 560px) {
  .site-nav { display: none; }
  .site-header { padding: 20px 24px; }
  .product-hero { padding: 100px 24px 60px; }
  .product-inner { padding: 48px 24px 80px; }
}
</style>
</head>
<body>
<header class="site-header" id="siteHeader">
  <a class="site-logo" href="/catalogo-servico-264">
    <span class="hm-house">House</span><span class="hm-mazzutti">Mazzutti</span>
  </a>
  <nav class="site-nav">
    <a href="/catalogo-servico-264#studio">Studio</a>
    <a href="/catalogo-servico-264#produtora">Produtora</a>
    <a href="/catalogo-servico-264#academy">Academy</a>
    <a href="/catalogo-servico-264#agencia">Agência</a>
    <a href="/catalogo-servico-264#digitais">Digitais</a>
    <a href="/catalogo-servico-264#equipe">Equipe</a>
  </nav>
  <button class="site-hamburger" id="hamburger" aria-label="Abrir menu">
    <span class="hbr-line"></span><span class="hbr-line"></span><span class="hbr-line"></span>
  </button>
</header>
<div class="side-overlay" id="sideOverlay" onclick="closeMenu()"></div>
<div class="side-menu" id="sideMenu">
  <div>
    <div class="side-menu-top">
      <span class="side-menu-logo"><span class="hm-house">House</span><span class="hm-mazzutti">Mazzutti</span></span>
      <button class="side-close" aria-label="Fechar menu" onclick="closeMenu()"></button>
    </div>
    <nav class="side-nav">
      <a href="/catalogo-servico-264#studio" onclick="closeMenu()">Studio</a>
      <a href="/catalogo-servico-264#produtora" onclick="closeMenu()">Produtora</a>
      <a href="/catalogo-servico-264#academy" onclick="closeMenu()">Academy</a>
      <a href="/catalogo-servico-264#agencia" onclick="closeMenu()">Agência</a>
      <a href="/catalogo-servico-264#digitais" onclick="closeMenu()">Produtos Digitais</a>
      <a href="/catalogo-servico-264#equipe" onclick="closeMenu()">Equipe à la Carte</a>
    </nav>
    <p class="side-section-label">Site Oficial</p>
    <div class="side-section-links">
      <a href="https://housemazzutti.com" target="_blank">Home</a>
      <a href="https://housemazzutti.com/pt/portfolio" target="_blank">Portfólio</a>
      <a href="https://housemazzutti.com/pt/contato" target="_blank">Contato</a>
    </div>
    <div class="side-location"><p>São Paulo, Brasil</p><p>23.5505° S, 46.6333° W</p></div>
    <div class="side-divider"></div>
    <p class="side-follow-label">Follow</p>
    <div class="side-social">
      <a href="https://instagram.com/housemazzutti" target="_blank">Instagram</a>
      <a href="https://www.linkedin.com/company/house-mazzutti" target="_blank">LinkedIn</a>
    </div>
  </div>
  <p class="side-copy">© 2026 HOUSE MAZZUTTI</p>
</div>

<main>
  <section class="product-hero">
    <a class="back-link" href="/catalogo-servico-264">← Catálogo de Serviços</a>
    <div class="product-unit">${unitLabel}</div>
    <h1 class="product-name">${svc.name}</h1>
    <p class="product-desc">${svc.description}</p>
    <a class="product-cta" href="https://housemazzutti.com/pt/contato" target="_blank">Solicitar Proposta</a>
  </section>
  ${packagesHtml}
  ${addonsHtml}
</main>

<footer class="site-footer">
  <a class="footer-logo" href="https://housemazzutti.com" target="_blank">
    <span class="hm-house">House</span><span class="hm-mazzutti">Mazzutti</span>
  </a>
  <div class="footer-social">
    <a href="https://instagram.com/housemazzutti" target="_blank">Instagram</a>
    <a href="https://www.linkedin.com/company/house-mazzutti" target="_blank">LinkedIn</a>
  </div>
  <div class="footer-links">
    <a href="https://housemazzutti.com/pt/politicas/privacidade" target="_blank">Privacidade</a>
    <a href="https://housemazzutti.com/pt/politicas/termos-de-uso" target="_blank">Termos de Uso</a>
    <a href="https://housemazzutti.com/pt/politicas/cookies" target="_blank">Cookies</a>
  </div>
  <p class="footer-copy">© 2026 House Mazzutti · São Paulo · Brasil</p>
</footer>

<script>
const header = document.getElementById('siteHeader');
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('sideOverlay');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current <= 60) { header.classList.remove('scrolled', 'hidden'); }
  else { header.classList.add('scrolled'); if (current > lastScroll && current > window.innerHeight) { header.classList.add('hidden'); } else { header.classList.remove('hidden'); } }
  lastScroll = current;
}, { passive: true });
hamburger.addEventListener('click', () => { hamburger.classList.add('open'); sideMenu.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; });
function closeMenu() { hamburger.classList.remove('open'); sideMenu.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
</script>
</body>
</html>`
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const svc = SERVICES[slug]
  if (!svc) return new NextResponse('Não encontrado', { status: 404 })
  return new NextResponse(renderPage(svc), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
