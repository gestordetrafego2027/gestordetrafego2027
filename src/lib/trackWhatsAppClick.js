// Registra clique no WhatsApp no banco + abre o link.
// Fire-and-forget: nunca bloqueia a abertura do WA por erro de rede/banco.

const HOUSE_WHATSAPP = '5511952347533'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

function getUtmFromUrl() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utm = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return utm
}

/**
 * Registra o clique em banco e abre o WhatsApp da House.
 *
 * @param {object} opts
 * @param {string}  opts.location  - Identificador do botão/link (ex: 'floating_button', 'hero_cta')
 * @param {string} [opts.message]  - Mensagem pré-preenchida (sem encode; a função encoda)
 * @param {string} [opts.source]   - Página atual; padrão: window.location.pathname
 */
export async function trackAndOpenWhatsApp({ location, message = '', source } = {}) {
  const currentSource = source ?? (typeof window !== 'undefined' ? window.location.pathname : null)
  const utm = getUtmFromUrl()

  // Abre o WA imediatamente — não aguarda o registro
  const encodedMsg = message ? `?text=${encodeURIComponent(message)}` : ''
  window.open(`https://wa.me/${HOUSE_WHATSAPP}${encodedMsg}`, '_blank', 'noopener,noreferrer')

  // Registra em background — ignora erros silenciosamente
  try {
    await fetch('/api/whatsapp-click', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ source: currentSource, location, message: message || null, utm }),
    })
  } catch {
    // fire-and-forget
  }
}
