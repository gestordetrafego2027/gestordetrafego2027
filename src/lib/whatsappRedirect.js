// Utilitário central: redireciona para o WhatsApp da House com cópia do formulário.
// Usado por todos os formulários públicos após submitLead() com sucesso.
// Também registra o clique em `whatsapp_clicks` via API route.

const HOUSE_WHATSAPP = '5511952347533'
const MENSAGEM_PADRAO = 'Olá, quero dar andamento na minha produção com a House Mazzutti.'
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
 * Redireciona para o WhatsApp da House com os dados do formulário.
 * Registra o evento em `whatsapp_clicks` (fire-and-forget).
 *
 * @param {string} formLabel  - Nome legível do formulário (ex: "Studio", "Agência")
 * @param {Array<{label: string, value: string|null|undefined}>} fields
 *   - Lista de campos na ordem desejada; itens com value falsy são omitidos.
 */
export function redirectToHouseWhatsApp(formLabel, fields) {
  const linhas = [
    MENSAGEM_PADRAO,
    '',
    `📋 *Formulário: ${formLabel}*`,
    ...fields
      .filter((f) => f.value !== null && f.value !== undefined && f.value !== '')
      .map((f) => `• ${f.label}: ${f.value}`),
  ]

  const mensagem = linhas.join('\n')

  // Registra em background — não bloqueia o redirect
  try {
    fetch('/api/whatsapp-click', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        source: window.location.pathname,
        location: `form_${formLabel.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        message: mensagem.slice(0, 500),
        utm: getUtmFromUrl(),
      }),
    }).catch(() => {})
  } catch {
    // fire-and-forget
  }

  window.location.href = `https://wa.me/${HOUSE_WHATSAPP}?text=${encodeURIComponent(mensagem)}`
}
