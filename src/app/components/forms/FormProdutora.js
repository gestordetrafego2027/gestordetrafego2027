'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'

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

export default function FormProdutora({
  onClose,
  sourceUrl = '/produtora',
  ctaLocation = null,
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    brandSite: '',
    projectType: '',
    desiredDate: '',
    referral: '',
    briefing: '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from('leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        segment: 'commercial',
        lead_type: 'cliente_produtora',
        status: 'novo',
        source: sourceUrl,
        details: {
          business_unit: 'produtora',
          company: form.company,
          brand_site: form.brandSite || null,
          project_type: form.projectType,
          desired_date: form.desiredDate || null,
          referral: form.referral || null,
          briefing: form.briefing || null,
          cta_location: ctaLocation,
        },
        utm: getUtmFromUrl(),
      })

      if (insertError) {
        console.error('[FormProdutora] Supabase insert error:', insertError)
        setError('Não foi possível enviar. Tente novamente em instantes.')
        setIsSubmitting(false)
        return
      }

      router.push('/obrigado?from=produtora')
    } catch (err) {
      console.error('[FormProdutora] Unexpected error:', err)
      setError('Não foi possível enviar. Tente novamente em instantes.')
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-none px-4 py-3 font-body text-black bg-white focus:outline-none focus:border-black transition-colors'
  const labelClass = 'font-body text-sm text-gray-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2" noValidate={false}>
      <div className="flex flex-col">
        <label htmlFor="fp-company" className={labelClass}>
          Empresa / marca <span className="text-red-600">*</span>
        </label>
        <input
          id="fp-company"
          type="text"
          required
          value={form.company}
          onChange={handleChange('company')}
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-name" className={labelClass}>
          Seu nome (contato) <span className="text-red-600">*</span>
        </label>
        <input
          id="fp-name"
          type="text"
          required
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-phone" className={labelClass}>
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          id="fp-phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange('phone')}
          placeholder="(11) 99999-9999"
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="fp-email"
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-brand-site" className={labelClass}>
          Site / Instagram da marca
        </label>
        <input
          id="fp-brand-site"
          type="text"
          value={form.brandSite}
          onChange={handleChange('brandSite')}
          placeholder="@marca ou marca.com.br"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-project-type" className={labelClass}>
          Tipo de projeto <span className="text-red-600">*</span>
        </label>
        <select
          id="fp-project-type"
          required
          value={form.projectType}
          onChange={handleChange('projectType')}
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          <option value="moda">Moda</option>
          <option value="beauty">Beauty</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="editorial">Editorial</option>
          <option value="campanha">Campanha</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-date" className={labelClass}>
          Data desejada
        </label>
        <input
          id="fp-date"
          type="date"
          value={form.desiredDate}
          onChange={handleChange('desiredDate')}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-referral" className={labelClass}>
          Onde nos encontrou <span className="text-red-600">*</span>
        </label>
        <select
          id="fp-referral"
          required
          value={form.referral}
          onChange={handleChange('referral')}
          className={inputClass}
        >
          <option value="" disabled>Selecione</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google</option>
          <option value="indicacao">Indicação</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fp-briefing" className={labelClass}>
          Briefing / Mensagem
        </label>
        <textarea
          id="fp-briefing"
          rows={4}
          value={form.briefing}
          onChange={handleChange('briefing')}
          className={`${inputClass} resize-y`}
          placeholder="Conte sobre o projeto, referências, prazo, etc."
        />
      </div>

      {error ? (
        <p className="font-body text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-2 w-full md:w-auto md:self-end bg-black text-white px-8 py-3 font-label uppercase tracking-wider text-sm hover:bg-gray-900 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
