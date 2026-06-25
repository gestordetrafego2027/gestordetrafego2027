'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/submitLead'
import { clientLog } from '@/lib/logger-client'

// ⚠️  Substitua pelo número real com DDI+DDD, sem espaços ou símbolos
const HOUSE_WHATSAPP = '5511952347533'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

function getUtmFromUrl() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const utm = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return Object.keys(utm).length ? utm : null
}

const PLANOS = [
  { value: 'ensaio-01', label: 'Ensaio 01 — R$ 2.700 · 3 produções · 10 fotos' },
  { value: 'ensaio-02', label: 'Ensaio 02 — R$ 3.100 · 4 produções · 15 fotos ⭐ Mais escolhido' },
  { value: 'ensaio-03', label: 'Ensaio 03 — R$ 3.800 · 5 produções · 20 fotos' },
]

const PAGAMENTOS = [
  { value: 'avista',   label: 'À vista' },
  { value: 'boleto2x', label: 'Boleto 2x' },
  { value: 'cartao3x', label: 'Cartão 3x (+ acréscimo da operadora)' },
]

function buildWhatsAppMessage(form) {
  const planoLabel = PLANOS.find(p => p.value === form.plano)?.label ?? form.plano
  const pagtoLabel = PAGAMENTOS.find(p => p.value === form.pagamento)?.label ?? form.pagamento

  const lines = [
    'Olá, quero confirmar minha agenda. 🗓️',
    '',
    '📋 *Dados do formulário:*',
    `• Nome: ${form.name}`,
    `• WhatsApp: ${form.phone}`,
    `• Email: ${form.email}`,
    form.instagram ? `• Instagram: ${form.instagram}` : null,
    `• Plano escolhido: ${planoLabel}`,
    `• Forma de pagamento: ${pagtoLabel}`,
    form.referral ? `• Como nos encontrou: ${form.referral}` : null,
    form.message ? `• Mensagem: ${form.message}` : null,
    '',
    '📅 Tour Marca Pessoal · 20, 21 e 22 de Julho · Canoinhas, SC',
  ].filter(Boolean).join('\n')

  return encodeURIComponent(lines)
}

export default function FormCanoinhas({
  onClose,
  packageSelected = null,
  ctaLocation = null,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    instagram: '',
    plano: packageSelected?.includes('01') ? 'ensaio-01'
         : packageSelected?.includes('02') ? 'ensaio-02'
         : packageSelected?.includes('03') ? 'ensaio-03'
         : '',
    pagamento: '',
    referral: '',
    message: '',
  })

  const handleChange = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        segment: 'commercial',
        lead_type: 'cliente_tour_canoinhas',
        status: 'novo',
        source: '/pt/canoinhas',
        details: {
          business_unit: 'studio',
          service_type: 'tour_marca_pessoal',
          plano: form.plano,
          pagamento: form.pagamento,
          instagram: form.instagram || null,
          referral: form.referral || null,
          message: form.message || null,
          package_selected: packageSelected,
          cta_location: ctaLocation,
        },
        utm: getUtmFromUrl(),
      })

      // Redireciona para WhatsApp com cópia do formulário
      const msg = buildWhatsAppMessage(form)
      window.location.href = `https://wa.me/${HOUSE_WHATSAPP}?text=${msg}`
    } catch (err) {
      clientLog.error('[FormCanoinhas] Unexpected error:', err)
      setError(err?.message || 'Não foi possível enviar. Tente novamente em instantes.')
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 px-4 py-3 font-body text-black bg-white focus:outline-none focus:border-black transition-colors text-sm'
  const labelClass = 'font-body text-sm text-gray-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2" noValidate={false}>

      {/* Nome */}
      <div className="flex flex-col">
        <label htmlFor="fc-name" className={labelClass}>
          Nome completo <span className="text-red-600">*</span>
        </label>
        <input
          id="fc-name"
          type="text"
          required
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      {/* WhatsApp */}
      <div className="flex flex-col">
        <label htmlFor="fc-phone" className={labelClass}>
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          id="fc-phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange('phone')}
          placeholder="(11) 99999-9999"
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="fc-email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="fc-email"
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      {/* Instagram */}
      <div className="flex flex-col">
        <label htmlFor="fc-instagram" className={labelClass}>
          Instagram
        </label>
        <input
          id="fc-instagram"
          type="text"
          value={form.instagram}
          onChange={handleChange('instagram')}
          placeholder="@seuusuario"
          className={inputClass}
        />
      </div>

      {/* Plano */}
      <div className="flex flex-col">
        <label htmlFor="fc-plano" className={labelClass}>
          Qual plano você quer? <span className="text-red-600">*</span>
        </label>
        <select
          id="fc-plano"
          required
          value={form.plano}
          onChange={handleChange('plano')}
          className={inputClass}
        >
          <option value="" disabled>Selecione um plano</option>
          {PLANOS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Pagamento */}
      <div className="flex flex-col">
        <label htmlFor="fc-pagamento" className={labelClass}>
          Forma de pagamento <span className="text-red-600">*</span>
        </label>
        <select
          id="fc-pagamento"
          required
          value={form.pagamento}
          onChange={handleChange('pagamento')}
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          {PAGAMENTOS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Como nos encontrou */}
      <div className="flex flex-col">
        <label htmlFor="fc-referral" className={labelClass}>
          Como nos encontrou <span className="text-red-600">*</span>
        </label>
        <select
          id="fc-referral"
          required
          value={form.referral}
          onChange={handleChange('referral')}
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          <option value="Instagram">Instagram</option>
          <option value="Google">Google</option>
          <option value="Indicação">Indicação</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      {/* Mensagem opcional */}
      <div className="flex flex-col">
        <label htmlFor="fc-message" className={labelClass}>
          Alguma dúvida ou recado?
        </label>
        <textarea
          id="fc-message"
          rows={3}
          value={form.message}
          onChange={handleChange('message')}
          className={`${inputClass} resize-y`}
        />
      </div>

      {error && (
        <p className="font-body text-sm text-red-600" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-2 w-full bg-black text-white px-8 py-4 font-label uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Enviando...' : 'Confirmar agenda via WhatsApp'}
      </button>

      <p className="font-body text-[11px] text-gray-400 text-center -mt-1">
        Após enviar, você será direcionada ao nosso WhatsApp.
      </p>
    </form>
  )
}
