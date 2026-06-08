/**
 * Validação de email com detecção de typo + sugestão de correção.
 * Inspirado em mailcheck.js — zero dependências externas.
 *
 * Cobre os erros mais comuns:
 *  - hotmial.com → hotmail.com
 *  - gmial.com → gmail.com
 *  - yaho.com → yahoo.com
 *  - outlok.com → outlook.com
 *
 * Não detecta typo no LOCAL part (anelomazzutti vs angelomazzutti) — isso
 * só com confirmação dupla ou opt-in via link. Mas reduz ~80% dos erros
 * porque a maioria é no domínio.
 */

const COMMON_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'yahoo.com',
  'yahoo.com.br',
  'icloud.com',
  'me.com',
  'uol.com.br',
  'bol.com.br',
  'terra.com.br',
  'globo.com',
  'r7.com',
  'ig.com.br',
  'proton.me',
  'protonmail.com',
] as const

const COMMON_TLDS = ['com', 'com.br', 'net', 'org', 'me', 'co', 'io'] as const

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/

export interface EmailValidationResult {
  /** true se a string parece um email bem-formado */
  valid: boolean
  /** mensagem amigável de erro pra mostrar no formulário */
  error?: string
  /** sugestão "quis dizer?" — só preenche se confiança alta */
  suggestion?: string
}

/**
 * Distância de edição (Damerau-Levenshtein simplificada).
 * Usada pra achar o domínio mais próximo na whitelist.
 */
function distance(a: string, b: string): number {
  if (a === b) return 0
  const an = a.length
  const bn = b.length
  if (an === 0) return bn
  if (bn === 0) return an
  const matrix: number[][] = Array.from({ length: an + 1 }, () =>
    new Array(bn + 1).fill(0),
  )
  for (let i = 0; i <= an; i++) matrix[i]![0] = i
  for (let j = 0; j <= bn; j++) matrix[0]![j] = j
  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i]![j] = Math.min(
        matrix[i - 1]![j]! + 1,
        matrix[i]![j - 1]! + 1,
        matrix[i - 1]![j - 1]! + cost,
      )
      // transposição (ab → ba)
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        matrix[i]![j] = Math.min(matrix[i]![j]!, matrix[i - 2]![j - 2]! + 1)
      }
    }
  }
  return matrix[an]![bn]!
}

/** Retorna o domínio mais próximo da whitelist se distância <= threshold. */
function suggestDomain(domain: string): string | undefined {
  const lower = domain.toLowerCase().trim()
  if (COMMON_DOMAINS.includes(lower as (typeof COMMON_DOMAINS)[number])) {
    return undefined // já é válido
  }
  let best: { d: string; dist: number } | null = null
  for (const known of COMMON_DOMAINS) {
    const dist = distance(lower, known)
    // Threshold relativo ao tamanho do domínio
    const maxAllowed = Math.max(1, Math.floor(known.length / 4))
    if (dist > 0 && dist <= maxAllowed) {
      if (!best || dist < best.dist) best = { d: known, dist }
    }
  }
  return best?.d
}

/** Detecta typos comuns como "hotmail.con" → "hotmail.com". */
function fixTld(domain: string): string | undefined {
  const lower = domain.toLowerCase().trim()
  // ex: "hotmail.con", "gmail.cm", "yahoo.co"
  const match = lower.match(/^(.+)\.([a-z]{1,4}(?:\.[a-z]{2,3})?)$/)
  if (!match) return undefined
  const [, name, tld] = match
  if (!name || !tld) return undefined
  if ((COMMON_TLDS as readonly string[]).includes(tld)) return undefined
  let bestTld: { t: string; dist: number } | null = null
  for (const knownTld of COMMON_TLDS) {
    const dist = distance(tld, knownTld)
    if (dist > 0 && dist <= 1) {
      if (!bestTld || dist < bestTld.dist) bestTld = { t: knownTld, dist }
    }
  }
  return bestTld ? `${name}.${bestTld.t}` : undefined
}

export function validateEmail(raw: string): EmailValidationResult {
  const value = raw.trim()

  if (!value) {
    return { valid: false, error: 'Informe seu email.' }
  }
  if (!EMAIL_REGEX.test(value)) {
    return { valid: false, error: 'Email inválido. Confira o formato.' }
  }

  const atIdx = value.lastIndexOf('@')
  const domain = value.slice(atIdx + 1)

  // 1) Tenta corrigir TLD (.con → .com)
  const tldFix = fixTld(domain)
  if (tldFix) {
    return {
      valid: true,
      suggestion: `${value.slice(0, atIdx)}@${tldFix}`,
    }
  }

  // 2) Tenta corrigir domínio inteiro (hotmial → hotmail)
  const domainFix = suggestDomain(domain)
  if (domainFix) {
    return {
      valid: true,
      suggestion: `${value.slice(0, atIdx)}@${domainFix}`,
    }
  }

  return { valid: true }
}

/** Versão pra usar em zod transform / refine. Retorna apenas boolean. */
export function isLikelyValidEmail(raw: string): boolean {
  return validateEmail(raw).valid
}
