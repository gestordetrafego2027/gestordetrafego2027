import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { promoteLeadAction } from './actions'

export const dynamic = 'force-dynamic'

const statusLabel: Record<string, string> = {
  novo: 'Novo',
  em_contato: 'Em contato',
  qualificado: 'Qualificado',
  proposta_enviada: 'Proposta enviada',
  negociacao: 'Negociação',
  ganho: 'Ganho',
  perdido: 'Perdido',
  arquivado: 'Arquivado',
}

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, name, email, phone, segment, lead_type, status, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-neutral-500">Últimos 50 leads cadastrados.</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/crm/leads/export"
            className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
          >
            ↓ CSV
          </a>
          <Link
            href="/crm/leads/new"
            className="rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700"
          >
            + Novo lead
          </Link>
        </div>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          Erro ao carregar leads: {error.message}
        </p>
      )}

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Nome</th>
              <th className="text-left px-4 py-2 font-medium">Contato</th>
              <th className="text-left px-4 py-2 font-medium">Tipo</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium">Criado</th>
              <th className="text-right px-4 py-2 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {!leads?.length && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                  Nenhum lead ainda. Crie o primeiro.
                </td>
              </tr>
            )}
            {leads?.map((l) => (
              <tr key={l.id} className="border-t border-neutral-100">
                <td className="px-4 py-3 font-medium">
                  <Link href={`/crm/leads/${l.id}`} className="hover:underline">
                    {l.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-600">
                  <div>{l.email ?? '—'}</div>
                  <div className="text-xs text-neutral-400">{l.phone ?? ''}</div>
                </td>
                <td className="px-4 py-3 text-neutral-600">{l.lead_type}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded bg-neutral-100 px-2 py-0.5 text-xs">
                    {statusLabel[l.status] ?? l.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-500 text-xs">
                  {new Date(l.created_at).toLocaleString('pt-BR')}
                </td>
                <td className="px-4 py-3 text-right">
                  {l.status !== 'ganho' && (
                    <form action={promoteLeadAction} className="inline-flex items-center gap-1">
                      <input type="hidden" name="lead_id" value={l.id} />
                      <input
                        type="number"
                        name="amount_brl"
                        placeholder="R$"
                        step="100"
                        min="0"
                        className="w-20 rounded border border-neutral-200 px-1.5 py-0.5 text-xs"
                      />
                      <button
                        type="submit"
                        className="rounded bg-emerald-600 text-white text-xs px-2 py-0.5 hover:bg-emerald-700"
                      >
                        → Cliente
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
