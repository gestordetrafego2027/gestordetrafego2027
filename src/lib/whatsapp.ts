/**
 * Helpers para construir deep links de WhatsApp.
 * https://wa.me/<numero>?text=<mensagem-url-encoded>
 */

/** Normaliza telefone BR para formato internacional (E.164 sem +). */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  // Já internacional (12+ dígitos com DDI)
  if (digits.length >= 12) return digits
  // BR sem 55 (10 ou 11 dígitos: DDD + numero)
  if (digits.length === 10 || digits.length === 11) return `55${digits}`
  // Curto demais — devolve raw pra usuario decidir
  if (digits.length < 10) return null
  return digits
}

/** Gera URL wa.me a partir de telefone e mensagem opcional. */
export function whatsappUrl(phone: string | null | undefined, message?: string): string | null {
  const n = normalizePhone(phone)
  if (!n) return null
  const params = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${n}${params}`
}

/** Templates de mensagem por contexto (cliente, lead, cobrança). */
export const waTemplates = {
  greetLead: (name: string) =>
    `Olá ${name.split(' ')[0]}, aqui é da House Mazzutti. Recebemos seu contato pelo site — quando você tiver um instante, gostaria de entender melhor o seu projeto.`,
  followUp: (name: string) =>
    `Olá ${name.split(' ')[0]}, tudo bem? Aqui é da House Mazzutti — estou retomando o contato sobre o seu projeto. Posso te enviar mais detalhes?`,
  proposalSent: (name: string, url: string) =>
    `Olá ${name.split(' ')[0]}, segue o link da proposta da House Mazzutti: ${url}`,
  paymentReminder: (name: string, amount: string, due: string) =>
    `Olá ${name.split(' ')[0]}, lembrete amigável da House Mazzutti: a fatura de ${amount} vence em ${due}. Qualquer dúvida estou à disposição.`,
}
