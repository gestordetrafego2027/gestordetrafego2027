/**
 * FONTE ÚNICA DE VERDADE — House Mazzutti
 * ----------------------------------------
 * Toda informação canônica de marca, tempo, contato, NAP, redes, liderança,
 * clientes aprovados e cases vive AQUI. Nenhuma página, schema ou metadata deve
 * hardcodar esses valores — importam de `@/config/site`.
 *
 * Origem das decisões: FASE 0 (documento de verdade), travada em 2026-06-02.
 *
 * REGRA: campo marcado `// TODO` está PENDENTE de dado real (bio/case/cliente).
 * Não preencher com estimativa nem com nome não aprovado (gate 0.7).
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
export interface Brand {
  name: string
  shortName: string
  alternateNames: readonly string[]
  domain: string
  url: string
  logo: string
  tagline: string
}

export interface Timeline {
  /** Fundação da operação atual (CNPJ). NUNCA misturar com a trajetória do fundador. */
  foundedYear: number
  /** Trajetória do Angelo, comunicada SEMPRE à parte. */
  founderExperience: string
  /** Frase oficial de tempo de mercado. */
  officialPhrase: string
}

export interface Contact {
  email: string
  academyEmail: string
  /** Usado em headers de e-mail transacional (Resend / EMAIL_FROM). */
  emailFrom: string
  phone: string
  whatsapp: string
}

export interface Nap {
  street: string
  neighborhood: string
  city: string
  region: string
  postalCode: string
  country: string
  /** 0.4: endereço pode ser exibido publicamente. */
  isPublic: boolean
  /** Fallback quando isPublic = false. */
  privateLabel: string
}

export interface SocialChannel {
  url: string
  handle: string
  /** 0.10: foco de 90 dias. 'primary' | 'secondary' publicam; 'idle' fica no gelo. */
  status: 'primary' | 'secondary' | 'idle'
}

export interface Person {
  name: string
  role: string
  /** Bio curta institucional. */
  bio: string
}

export interface Theme {
  /** 0.9: acento de CTA autorizado. Resto da paleta permanece P&B + cinzas. */
  ctaAccent: string
}

// ---------------------------------------------------------------------------
// 0.2 — Marca
// ---------------------------------------------------------------------------
export const brand: Brand = {
  name: 'House Mazzutti',
  shortName: 'HMZT',
  alternateNames: ['HouseMazzutti', 'HMZT'],
  domain: 'housemazzutti.com',
  url: 'https://housemazzutti.com',
  logo: 'https://housemazzutti.com/LOGO.webp',
  tagline: 'Casa criativa de direção criativa, branding e produção de imagem em São Paulo.',
} as const

// ---------------------------------------------------------------------------
// 0.1 — Régua temporal
// ---------------------------------------------------------------------------
export const timeline: Timeline = {
  foundedYear: 2016,
  founderExperience: '15+ anos de audiovisual e direção de imagem',
  officialPhrase: 'Casa criativa fundada em 2016 em São Paulo.',
} as const

// ---------------------------------------------------------------------------
// 0.3 — Contato (domínio canônico: housemazzutti.com)
// ---------------------------------------------------------------------------
export const contact: Contact = {
  email: 'contato@housemazzutti.com',
  academyEmail: 'academy@housemazzutti.com',
  emailFrom: 'House Mazzutti <contato@housemazzutti.com>',
  phone: '+55 11 95234-7533',
  whatsapp: '+55 11 95234-7533',
} as const

/** CNPJ oficial — fonte única. Usar em schemas, políticas e documentos fiscais. */
export const cnpj = '64.448.222/0001-54' as const

/** Razão social (cartão CNPJ). Usar em contratos e páginas legais. */
export const razaoSocial = 'HOUSE MAZZUTTI PRODUÇÕES LTDA' as const

/**
 * Encarregado de Proteção de Dados (DPO/LGPD) — canal oficial.
 * Decisão da Direção (07/06/2026): canal dedicado privacidade@.
 */
export const dpo = {
  name: 'Mateus Sacavem',
  email: 'privacidade@housemazzutti.com',
} as const

// ---------------------------------------------------------------------------
// 0.4 — NAP (único e público)
// ---------------------------------------------------------------------------
export const nap: Nap = {
  street: 'Rua General Chagas Santos, 1058',
  neighborhood: 'Vila da Saúde',
  city: 'São Paulo',
  region: 'SP',
  postalCode: '04146-051',
  country: 'BR',
  isPublic: true,
  privateLabel: 'São Paulo – SP, atendimento sob agendamento',
} as const

/** Endereço formatado em 1 linha — usar em rodapés, schema, certificados. */
export const napOneLine = `${nap.street} – ${nap.neighborhood}, ${nap.city} – ${nap.region}, ${nap.postalCode}`

// ---------------------------------------------------------------------------
// 0.10 — Redes (foco: Instagram primário, LinkedIn secundário)
// ---------------------------------------------------------------------------
export const social = {
  instagram: {
    url: 'https://instagram.com/housemazzutti',
    handle: '@housemazzutti',
    status: 'primary',
  },
  linkedin: {
    url: 'https://www.linkedin.com/company/house-mazzutti',
    handle: 'house-mazzutti',
    status: 'secondary',
  },
  youtube: {
    url: 'https://www.youtube.com/channel/UC1E5b0T8A1bFaBL__RxzCrw',
    handle: 'House Mazzutti',
    status: 'idle',
  },
  facebook: {
    url: 'https://www.facebook.com/housemazzutti/',
    handle: 'housemazzutti',
    status: 'idle',
  },
} as const satisfies Record<string, SocialChannel>

/** Só os canais que publicam — para `sameAs` no schema e links de rodapé. */
export const activeSocial = Object.values(social).filter((c) => c.status !== 'idle')

// ---------------------------------------------------------------------------
// 0.8 — Liderança institucional (Angelo + Mateus). Ita: só crédito de prestador.
// ---------------------------------------------------------------------------
export const leadership = {
  angelo: {
    name: 'Angelo Mazzutti',
    role: 'Diretor Criativo',
    // TODO 0.8 — substituir pela bio final (Drive: TEXTOS › HOUSE INSTITUCIONAL).
    bio: 'Diretor criativo da House Mazzutti. 15+ anos de audiovisual e direção de imagem, traduzindo estratégia de marca em direção criativa autoral.',
  },
  mateus: {
    name: 'Mateus Sacavem',
    role: 'Produtor Executivo',
    // TODO 0.8 — substituir pela bio final (Drive: TEXTOS › HOUSE INSTITUCIONAL).
    bio: 'Produtor executivo da House Mazzutti. Comanda a operação — coordenação técnica, cronogramas e integração de equipes, da pré-produção ao master final.',
  },
} as const satisfies Record<string, Person>

// ---------------------------------------------------------------------------
// 0.5 / 0.7 — Clientes e cases (HARD GATE)
// Só entram nomes marcados por Angelo como "real + permissão". Sem exceção.
// ---------------------------------------------------------------------------

/** Marcas aprovadas para citar como case/logo. TODO 0.5 — confirmar lista final. */
export const approvedClients: readonly string[] = [
  // TODO: lista definitiva (Drive: LOGO CLIENTES). Ex.: 'Jequiti', 'Dumond', 'Oceane'...
]

/** Figuras públicas/celebridades — bloqueadas até "real + permissão" explícito. */
export const blockedNames: readonly string[] = [
  'Larissa Manoela',
  'Adriane Galisteu',
  'Ana Castela',
  'Zé Felipe',
  'Simony',
  'Mileide Mihaile',
  'família Abravanel',
] as const

export interface Case {
  client: string
  context: string
  action: string
  /** Número de resultado REAL. Nunca estimativa de análise externa. */
  result: string
}

/** 2–4 cases com prova. TODO 0.5 — preencher com números reais (Drive: MARKETING). */
export const cases: readonly Case[] = [
  // TODO: contexto → ação → número, só com dado confirmado.
]

// ---------------------------------------------------------------------------
// 0.9 — Tema (acento de CTA; resto permanece P&B)
// ---------------------------------------------------------------------------
export const theme: Theme = {
  ctaAccent: '#c92a2a',
} as const

// ---------------------------------------------------------------------------
// Export agregado
// ---------------------------------------------------------------------------
export const site = {
  brand,
  timeline,
  contact,
  nap,
  napOneLine,
  social,
  activeSocial,
  leadership,
  approvedClients,
  blockedNames,
  cases,
  theme,
} as const

export default site
