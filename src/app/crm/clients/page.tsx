import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Clientes | CRM' }

const statusBadge: Record<string, string> = {
  ativo: 'bg-emerald-100 text-emerald-700',
  inativo: 'bg-neutral-100 text-neutral-600',
  churn: 'bg-rose-100 text-rose-700',
  prospect: 'bg-amber-100 text-amber-700',
}

const brl = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: clients, error } = await supabase
    .from('clients')
    .select('id, display_name, email, unit, status, lifetime_value_brl, last_purchase_at, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
          <p className="text-sm text-neutral-500">Leads promovidos a cliente. Ordenado por entrada.</p>
        </div>
        <a
          href="/crm/clients/export"
          className="rounded border border-neutral-300 text-sm px-4 py-2 hover:bg-neutral-100"
        >
          ↓ CSV
        </a>
      </header>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error.message}
        </p>
      )}

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Unidade</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-right px-4 py-2">LTV</th>
              <th className="text-left px-4 py-2">Última compra</th>
            </tr>
          </thead>
          <tbody>
            {(clients ?? []).map((c) => (
              <tr key={c.id} className="border-t border-neutral-100">
                <td className="px-4 py-2 font-medium">
                  <Link href={`/crm/clients/${c.id}`} className="hover:underline">
                    {c.display_name}
                  </Link>
                </td>
                <td className="px-4 py-2 text-neutral-600">{c.email ?? '—'}</td>
                <td className="px-4 py-2 capitalize">{c.unit}</td>
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-0.5 text-xs ${statusBadge[c.status] ?? ''}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right tabular-nums">{brl(c.lifetime_value_brl)}</td>
                <td className="px-4 py-2 text-neutral-600">
                  {c.last_purchase_at ? new Date(c.last_purchase_at).toLocaleDateString('pt-BR') : '—'}
                </td>
              </tr>
            ))}
            {!clients?.length && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                  Nenhum cliente ainda. Promova um lead "ganho" para criar o primeiro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
