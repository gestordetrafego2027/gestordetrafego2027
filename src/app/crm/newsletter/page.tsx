// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

type Subscriber = {
  id: string
  email: string
  name: string | null
  active: boolean
  source: string | null
  created_at: string
}

type Send = {
  id: string
  article_slug: string
  article_title: string
  sent_at: string
  total_sent: number
}

// Artigos disponíveis para disparo — espelha articles.js
const ARTICLES = [
  { slug: 'book-para-modelos-quem-e-escolhido', title: 'Book para modelos: o que realmente define quem é escolhido no mercado' },
  { slug: 'book-modelo-imagem-trabalha-por-voce', title: 'Book de modelo: quando sua imagem começa a trabalhar por você' },
  { slug: 'ensaio-pessoal-imagem-autoridade', title: 'Ensaio pessoal: o que realmente constrói uma imagem de autoridade' },
  { slug: 'ensaio-pessoal-imagem-lidera-percepcao', title: 'Ensaio pessoal: quando sua imagem deixa de acompanhar sua trajetória' },
  { slug: 'cobertura-externa-presenca-alto-valor', title: 'Cobertura externa em tempo real: presença de alto valor em São Paulo' },
  { slug: 'cobertura-externa-narrativa-visual', title: 'Cobertura externa em tempo real: quando São Paulo se transforma em narrativa visual' },
  { slug: 'branding-project-arquitetura-valor', title: 'Branding project como arquitetura de valor' },
  { slug: 'branding-project-motor-vendas', title: 'Branding project como motor de vendas' },
  { slug: 'quanto-investir-em-branding', title: 'Quanto investir em branding: o guia estratégico para empresas premium' },
  { slug: 'campanha-lancamento-arquitetura-invisivel', title: 'Campanha de lançamento: a arquitetura invisível das marcas que dominam atenção' },
  { slug: 'por-que-campanhas-falham', title: 'Por que a maioria das campanhas falha' },
  { slug: 'editorial-moda-narrativa-visual', title: 'Editorial de moda como narrativa visual: do produto ao desejo' },
  { slug: 'editorial-moda-performance-vendas', title: 'Editorial de moda orientado à performance: quando imagem passa a vender' },
  { slug: 'por-que-boas-ideias-nao-garantem-resultados', title: 'Por que boas ideias não garantem bons resultados' },
  { slug: 'producao-executiva-sistema-campanhas', title: 'Produção executiva: o sistema invisível que transforma ideias em campanhas de alto impacto' },
  { slug: 'por-que-campanhas-caras-falham', title: 'Por que campanhas com alto investimento falham' },
]

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [sends, setSends] = useState<Send[]>([])
  const [loading, setLoading] = useState(true)

  // Disparo
  const [selectedSlug, setSelectedSlug] = useState('')
  const [customExcerpt, setCustomExcerpt] = useState('')
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ ok: boolean; total_sent?: number; error?: string } | null>(null)

  // Filtro
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active')
  const [search, setSearch] = useState('')

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [{ data: subs }, { data: snds }] = await Promise.all([
      supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter_sends').select('*').order('sent_at', { ascending: false }).limit(20),
    ])
    setSubscribers(subs ?? [])
    setSends(snds ?? [])
    setLoading(false)
  }

  async function handleSend() {
    if (!selectedSlug || !customExcerpt.trim()) return
    const article = ARTICLES.find(a => a.slug === selectedSlug)
    if (!article) return

    setSending(true)
    setSendResult(null)

    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send_newsletter`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            article_slug: article.slug,
            article_title: article.title,
            article_excerpt: customExcerpt,
          }),
        }
      )
      const data = await res.json()
      setSendResult(res.ok ? { ok: true, total_sent: data.total_sent } : { ok: false, error: data.error ?? 'Erro desconhecido.' })
      if (res.ok) {
        setSelectedSlug('')
        setCustomExcerpt('')
        loadData()
      }
    } catch (e: unknown) {
      setSendResult({ ok: false, error: e instanceof Error ? e.message : 'Erro de rede.' })
    } finally {
      setSending(false)
    }
  }

  async function toggleSubscriber(id: string, active: boolean) {
    await supabase.from('newsletter_subscribers').update({ active: !active }).eq('id', id)
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, active: !active } : s))
  }

  const filtered = subscribers.filter(s => {
    if (filter === 'active' && !s.active) return false
    if (filter === 'inactive' && s.active) return false
    if (search && !s.email.includes(search) && !(s.name?.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  const totalActive = subscribers.filter(s => s.active).length

  const cell = 'px-4 py-3 text-[13px]'
  const th = 'px-4 py-3 text-[10px] font-medium tracking-[0.12em] uppercase text-gray-400 text-left'

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">CRM · House Mazzutti</p>
        <h1 className="text-2xl font-light text-gray-900">Newsletter</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Inscritos ativos', value: totalActive },
          { label: 'Total de inscritos', value: subscribers.length },
          { label: 'Disparos realizados', value: sends.length },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-3xl font-light text-gray-900 mb-1">{stat.value}</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Painel de disparo */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-5">
        <h2 className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">Disparar nova carta</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-gray-400 mb-2">Artigo</label>
            <select
              value={selectedSlug}
              onChange={e => setSelectedSlug(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[13px] text-gray-800 focus:outline-none focus:border-gray-400"
            >
              <option value="">Selecionar artigo...</option>
              {ARTICLES.map(a => (
                <option key={a.slug} value={a.slug}>{a.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-[0.12em] text-gray-400 mb-2">
            Trecho de abertura do e-mail <span className="text-gray-300">(aparece no corpo antes do CTA)</span>
          </label>
          <textarea
            value={customExcerpt}
            onChange={e => setCustomExcerpt(e.target.value)}
            rows={4}
            placeholder="Cole o primeiro parágrafo do artigo ou escreva uma chamada exclusiva para os inscritos..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[13px] text-gray-800 focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSend}
            disabled={!selectedSlug || !customExcerpt.trim() || sending}
            className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.15em] px-6 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            {sending ? 'Enviando...' : `Enviar para ${totalActive} inscritos`}
          </button>

          {sendResult && (
            <p className={`text-[13px] ${sendResult.ok ? 'text-green-600' : 'text-red-500'}`}>
              {sendResult.ok
                ? `✓ ${sendResult.total_sent} e-mails enviados com sucesso.`
                : `✗ ${sendResult.error}`}
            </p>
          )}
        </div>
      </div>

      {/* Histórico de disparos */}
      {sends.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">Histórico de disparos</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={th}>Artigo</th>
                <th className={th}>Enviados</th>
                <th className={th}>Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sends.map(s => (
                <tr key={s.id}>
                  <td className={`${cell} text-gray-800 max-w-xs truncate`}>{s.article_title}</td>
                  <td className={`${cell} text-gray-600`}>{s.total_sent}</td>
                  <td className={`${cell} text-gray-400`}>{new Date(s.sent_at).toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lista de inscritos */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">Inscritos</h2>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Buscar por e-mail ou nome..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-[12px] focus:outline-none w-56"
            />
            <div className="flex rounded-lg overflow-hidden border border-gray-200 text-[10px] uppercase tracking-[0.1em]">
              {(['all', 'active', 'inactive'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {f === 'all' ? 'Todos' : f === 'active' ? 'Ativos' : 'Inativos'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[13px] text-gray-400">Carregando...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={th}>E-mail</th>
                <th className={th}>Nome</th>
                <th className={th}>Origem</th>
                <th className={th}>Inscrito em</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-[13px] text-gray-400">Nenhum inscrito encontrado.</td></tr>
              )}
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/50">
                  <td className={`${cell} text-gray-800`}>{s.email}</td>
                  <td className={`${cell} text-gray-500`}>{s.name ?? '—'}</td>
                  <td className={`${cell} text-gray-400`}>{s.source ?? '—'}</td>
                  <td className={`${cell} text-gray-400`}>{new Date(s.created_at).toLocaleDateString('pt-BR')}</td>
                  <td className={cell}>
                    <button
                      onClick={() => toggleSubscriber(s.id, s.active)}
                      className={`text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full transition-colors ${
                        s.active
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-red-50 hover:text-red-500'
                          : 'bg-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      {s.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
