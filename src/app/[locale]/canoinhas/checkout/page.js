'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'

const PLANS = {
  'ensaio-01': { nome: 'Ensaio 01', preco: 'R$ 1.900', cents: 190000, desc: '3 produções · 10 fotos · Making of' },
  'ensaio-02': { nome: 'Ensaio 02', preco: 'R$ 2.600', cents: 260000, desc: '4 produções · 15 fotos · Backstage 20"', popular: true },
  'ensaio-03': { nome: 'Ensaio 03', preco: 'R$ 3.200', cents: 320000, desc: '5 produções · 20 fotos · Backstage + Fashion Film' },
}

const METHODS = [
  { id: 'pix',         label: 'PIX',          sub: 'À vista · Confirmação imediata' },
  { id: 'boleto',      label: 'Boleto',        sub: 'Vence em 3 dias úteis' },
  { id: 'credit_card', label: 'Cartão 3x',     sub: 'Sem juros casa + acrésc. operadora' },
]

function formatCpf(v) {
  return v.replace(/\D/g,'').slice(0,11)
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
}

function formatPhone(v) {
  return v.replace(/\D/g,'').slice(0,11)
    .replace(/^(\d{2})(\d)/,'($1) $2')
    .replace(/(\d{5})(\d{1,4})$/,'$1-$2')
}

/* ── Estado PIX ─────────────────────────────────────────── */
function PixResult({ data, planNome }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(data.payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }
  return (
    <div className="text-center">
      <span className="font-label uppercase tracking-[0.4em] text-[9px] text-white/30 block mb-6">
        PIX gerado · {planNome}
      </span>
      <p className="font-headline font-light text-2xl text-white mb-2">Escaneie o QR Code</p>
      <p className="font-body text-white/45 text-sm mb-8">ou copie o código PIX abaixo</p>
      {data.encodedImage && (
        <img
          src={`data:image/png;base64,${data.encodedImage}`}
          alt="QR Code PIX"
          className="w-48 h-48 mx-auto mb-8 bg-white p-3"
        />
      )}
      <button
        onClick={copy}
        className="w-full border border-white/30 text-white py-4 font-label uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors mb-6"
      >
        {copied ? 'Copiado ✓' : 'Copiar código PIX'}
      </button>
      <p className="font-body text-white/30 text-xs">
        Pedido #{data.orderNumber} · Após o pagamento você receberá a confirmação por e-mail.
      </p>
    </div>
  )
}

/* ── Estado Boleto ──────────────────────────────────────── */
function BoletoResult({ data, planNome }) {
  return (
    <div className="text-center">
      <span className="font-label uppercase tracking-[0.4em] text-[9px] text-white/30 block mb-6">
        Boleto gerado · {planNome}
      </span>
      <p className="font-headline font-light text-2xl text-white mb-2">Boleto pronto</p>
      <p className="font-body text-white/45 text-sm mb-8">Vencimento: {data.dueDate}</p>
      {data.identificationField && (
        <div className="bg-white/5 border border-white/10 p-4 mb-6 text-left">
          <p className="font-label text-[8px] tracking-[0.3em] uppercase text-white/30 mb-2">Linha digitável</p>
          <p className="font-body text-white text-xs break-all leading-relaxed">{data.identificationField}</p>
        </div>
      )}
      <a
        href={data.bankSlipUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full border border-white text-white py-4 font-label uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors mb-6"
      >
        Abrir boleto PDF
      </a>
      <p className="font-body text-white/30 text-xs">
        Pedido #{data.orderNumber} · A confirmação chega por e-mail após o pagamento.
      </p>
    </div>
  )
}

/* ── Formulário principal ────────────────────────────────── */
function CheckoutForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('plano') ?? 'ensaio-01'
  const plan = PLANS[planId] ?? PLANS['ensaio-01']

  const [form, setForm] = useState({
    buyerName: '', buyerEmail: '', buyerCpf: '', buyerPhone: '', instagram: '',
  })
  const [method, setMethod] = useState('pix')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const set = (k) => (e) => {
    let v = e.target.value
    if (k === 'buyerCpf')   v = formatCpf(v)
    if (k === 'buyerPhone') v = formatPhone(v)
    setForm(f => ({ ...f, [k]: v }))
  }

  async function submit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/tour/canoinhas/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          paymentMethod: method,
          buyerName: form.buyerName,
          buyerEmail: form.buyerEmail,
          buyerCpf: form.buyerCpf.replace(/\D/g,''),
          buyerPhone: form.buyerPhone.replace(/\D/g,''),
          instagram: form.instagram || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erro ao processar pagamento.')
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
        return
      }
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full bg-transparent border border-white/15 px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20'
  const labelCls = 'font-label uppercase tracking-[0.3em] text-[8px] text-white/40 block mb-2'

  if (result) {
    return result.method === 'pix'
      ? <PixResult data={result} planNome={plan.nome} />
      : <BoletoResult data={result} planNome={plan.nome} />
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Resumo do plano */}
      <div className="border border-white/10 p-5 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-label uppercase tracking-[0.4em] text-[8px] text-white/30 block mb-1">
              Tour Marca Pessoal · Canoinhas
            </span>
            <p className="font-headline font-light text-xl text-white">{plan.nome}</p>
            <p className="font-body text-white/40 text-xs mt-1">{plan.desc}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-headline italic text-2xl text-white">{plan.preco}</p>
            {plan.popular && (
              <span className="font-label text-[7px] tracking-[0.3em] text-white/40 uppercase">Mais escolhido</span>
            )}
          </div>
        </div>
      </div>

      {/* Dados pessoais */}
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Nome completo *</label>
          <input required value={form.buyerName} onChange={set('buyerName')} className={inputCls} autoComplete="name" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>E-mail *</label>
            <input required type="email" value={form.buyerEmail} onChange={set('buyerEmail')} className={inputCls} autoComplete="email" />
          </div>
          <div>
            <label className={labelCls}>WhatsApp *</label>
            <input required type="tel" value={form.buyerPhone} onChange={set('buyerPhone')} placeholder="(11) 99999-9999" className={inputCls} autoComplete="tel" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>CPF *</label>
            <input required value={form.buyerCpf} onChange={set('buyerCpf')} placeholder="000.000.000-00" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Instagram</label>
            <input value={form.instagram} onChange={set('instagram')} placeholder="@seuusuario" className={inputCls} />
          </div>
        </div>
      </div>

      {/* Forma de pagamento */}
      <div>
        <p className={labelCls}>Forma de pagamento *</p>
        <div className="grid grid-cols-3 gap-2">
          {METHODS.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              className={`p-4 border text-left transition-colors ${method === m.id ? 'border-white bg-white/5' : 'border-white/15 hover:border-white/30'}`}
            >
              <p className="font-label uppercase tracking-[0.2em] text-[9px] text-white mb-1">{m.label}</p>
              <p className="font-body text-white/30 text-[10px] leading-snug">{m.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="font-body text-red-400 text-sm" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-5 font-label uppercase tracking-[0.35em] text-[10px] transition-colors ${loading ? 'bg-white/20 text-white/40 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-100'}`}
      >
        {loading ? 'Processando…' : method === 'credit_card' ? 'Pagar com cartão →' : method === 'boleto' ? 'Gerar boleto' : 'Gerar PIX'}
      </button>

      <p className="font-body text-white/20 text-[11px] text-center">
        Pagamento seguro via Asaas · Seus dados são protegidos
      </p>
    </form>
  )
}

/* ── Page ──────────────────────────────────────────────── */
export default function TourCheckoutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body antialiased">
      <div className="max-w-[560px] mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/pt/canoinhas"
            className="font-label uppercase tracking-[0.35em] text-[8px] text-white/25 hover:text-white/50 transition-colors mb-8 block"
          >
            ← Tour Marca Pessoal
          </Link>
          <span className="font-label uppercase tracking-[0.45em] text-[8px] text-white/25 block mb-3">
            House Mazzutti · Canoinhas, SC
          </span>
          <h1 className="font-headline font-light text-[2rem] md:text-[2.6rem] text-white leading-tight">
            Reservar agenda
          </h1>
          <p className="font-body text-white/40 text-sm mt-2">
            20, 21 e 22 de Julho · Vagas limitadas
          </p>
        </div>

        <Suspense fallback={<div className="text-white/30 font-body text-sm">Carregando…</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  )
}
