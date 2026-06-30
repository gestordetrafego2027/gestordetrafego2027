import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSbClient } from '@supabase/supabase-js'
import {
  inviteUserAction,
  updateUserRoleAction,
  deleteUserAction,
  sendRecoveryLinkAction,
} from './actions'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Usuários | CRM' }

const ROLES = [
  { v: 'staff', l: 'Staff (operacional)' },
  { v: 'admin', l: 'Admin (vê tudo)' },
] as const

const UNITS = [
  { v: '', l: '— sem unit (vê tudo dentro do role) —' },
  { v: 'studio', l: 'Studio' },
  { v: 'agencia', l: 'Agência' },
  { v: 'produtora', l: 'Produtora' },
  { v: 'comunidade', l: 'Comunidade' },
] as const

type SP = Promise<{ error?: string; ok?: string }>

export default async function UsersAdminPage({ searchParams }: { searchParams: SP }) {
  const { error, ok } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') redirect('/crm?error=acesso_negado')

  // Lista usuarios via admin API
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  let users: Array<{
    id: string
    email?: string
    created_at: string
    last_sign_in_at?: string | null
    app_metadata: Record<string, unknown>
  }> = []
  let listErr: string | null = null
  if (!key) {
    listErr =
      'SUPABASE_SERVICE_ROLE_KEY não configurada no servidor. Adicione a variável de ambiente no Coolify para listar usuários.'
  } else {
    const sb = createSbClient(url, key, { auth: { persistSession: false } })
    const { data, error: err } = await sb.auth.admin.listUsers({ perPage: 200 })
    if (err) listErr = err.message
    else users = (data?.users ?? []) as never
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Usuários</h1>
        <p className="text-sm text-neutral-500">
          Convide novos usuários, ajuste roles e unidade, envie link de recuperação.
        </p>
      </header>

      {ok && (
        <div className="rounded border border-emerald-200 bg-emerald-50 text-emerald-800 p-3 text-sm">
          ✓ {ok}
        </div>
      )}
      {error && (
        <div className="rounded border border-rose-200 bg-rose-50 text-rose-700 p-3 text-sm">
          {error}
        </div>
      )}

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Convidar novo usuário
        </h2>
        <form action={inviteUserAction} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
          <label className="md:col-span-2 block text-xs">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs">
            Role
            <select
              name="role"
              defaultValue="staff"
              className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
            >
              {ROLES.map((r) => (
                <option key={r.v} value={r.v}>
                  {r.l}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs">
            Unidade (opcional)
            <select
              name="unit"
              defaultValue=""
              className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm"
            >
              {UNITS.map((u) => (
                <option key={u.v} value={u.v}>
                  {u.l}
                </option>
              ))}
            </select>
          </label>
          <button className="md:col-span-4 rounded bg-neutral-900 text-white text-sm px-4 py-2 hover:bg-neutral-700">
            + Enviar convite
          </button>
        </form>
        <p className="text-xs text-neutral-500 mt-3">
          O usuário recebe email para ativar a conta e definir senha. O convite expira em 24 horas.
        </p>
      </section>

      {listErr ? (
        <div className="rounded border border-amber-200 bg-amber-50 text-amber-900 p-4 text-sm">
          ⚠️ {listErr}
        </div>
      ) : (
        <section className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Unit</th>
                <th className="text-left px-4 py-2">Último login</th>
                <th className="text-right px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const meta = (u.app_metadata ?? {}) as { role?: string; unit?: string }
                return (
                  <tr key={u.id} className="border-t border-neutral-100 align-top">
                    <td className="px-4 py-2 font-medium text-sm">{u.email ?? '—'}</td>
                    <td className="px-4 py-2 text-xs">
                      <form action={updateUserRoleAction} className="flex gap-1 items-center">
                        <input type="hidden" name="user_id" value={u.id} />
                        <input type="hidden" name="unit" value={meta.unit ?? ''} />
                        <select
                          name="role"
                          defaultValue={meta.role ?? 'staff'}
                          className="rounded border border-neutral-200 px-2 py-1 text-xs"
                        >
                          {ROLES.map((r) => (
                            <option key={r.v} value={r.v}>
                              {r.l}
                            </option>
                          ))}
                        </select>
                        <button className="text-blue-600 hover:underline">salvar</button>
                      </form>
                    </td>
                    <td className="px-4 py-2 text-xs">
                      <form action={updateUserRoleAction} className="flex gap-1 items-center">
                        <input type="hidden" name="user_id" value={u.id} />
                        <input type="hidden" name="role" value={meta.role ?? 'staff'} />
                        <select
                          name="unit"
                          defaultValue={meta.unit ?? ''}
                          className="rounded border border-neutral-200 px-2 py-1 text-xs"
                        >
                          {UNITS.map((un) => (
                            <option key={un.v} value={un.v}>
                              {un.l.split(' ')[0]}
                            </option>
                          ))}
                        </select>
                        <button className="text-blue-600 hover:underline">salvar</button>
                      </form>
                    </td>
                    <td className="px-4 py-2 text-xs text-neutral-500">
                      {u.last_sign_in_at ? (
                        new Date(u.last_sign_in_at).toLocaleString('pt-BR')
                      ) : (
                        <span className="italic text-neutral-400">nunca</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right text-xs space-x-2">
                      <form action={sendRecoveryLinkAction} className="inline">
                        <input type="hidden" name="email" value={u.email ?? ''} />
                        <button className="text-blue-600 hover:underline">↻ reset</button>
                      </form>
                      {u.email !== user?.email && (
                        <form action={deleteUserAction} className="inline">
                          <input type="hidden" name="user_id" value={u.id} />
                          <button className="text-rose-600 hover:underline">excluir</button>
                        </form>
                      )}
                    </td>
                  </tr>
                )
              })}
              {!users.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                    Nenhum usuário.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}
    </div>
  )
}
