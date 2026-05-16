'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSbClient } from '@supabase/supabase-js'

// Garante que so admin chega aqui
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  if (role !== 'admin') redirect('/crm?error=acesso_negado')
  return user!
}

// Cliente admin (service_role) — usa SUPABASE_SERVICE_ROLE_KEY do servidor
function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  if (!url || !key) throw new Error('Supabase env vars ausentes (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
  return createSbClient(url, key, { auth: { persistSession: false } })
}

export async function inviteUserAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const role = String(formData.get('role') ?? 'staff')
  const unit = String(formData.get('unit') ?? '').trim() || null

  if (!email.includes('@')) {
    redirect('/crm/admin/users?error=' + encodeURIComponent('Email invalido.'))
  }

  const hdrs = await headers()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${hdrs.get('host') ?? 'housemazzutti.com'}`

  const sb = adminClient()
  const { error } = await sb.auth.admin.inviteUserByEmail(email, {
    data: { invited_by: 'admin', unit, role },
    redirectTo: `${origin}/auth/callback?next=/login/redefinir`,
  })
  if (error) {
    redirect('/crm/admin/users?error=' + encodeURIComponent(error.message))
  }

  // Seta role/unit em app_metadata (afeta RLS)
  const { data: list } = await sb.auth.admin.listUsers({ perPage: 1000 })
  const created = list?.users.find((u) => u.email === email)
  if (created) {
    await sb.auth.admin.updateUserById(created.id, {
      app_metadata: { role, ...(unit ? { unit } : {}) },
    })
  }

  revalidatePath('/crm/admin/users')
  redirect('/crm/admin/users?ok=' + encodeURIComponent('Convite enviado para ' + email))
}

export async function updateUserRoleAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const userId = String(formData.get('user_id') ?? '')
  const role = String(formData.get('role') ?? '')
  const unit = String(formData.get('unit') ?? '').trim() || null
  if (!userId) return

  const sb = adminClient()
  await sb.auth.admin.updateUserById(userId, {
    app_metadata: { role, ...(unit ? { unit } : {}) },
  })
  revalidatePath('/crm/admin/users')
}

export async function deleteUserAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const userId = String(formData.get('user_id') ?? '')
  if (!userId) return

  const sb = adminClient()
  await sb.auth.admin.deleteUser(userId)
  revalidatePath('/crm/admin/users')
}

export async function sendRecoveryLinkAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (!email.includes('@')) return

  const hdrs = await headers()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${hdrs.get('host') ?? 'housemazzutti.com'}`

  const sb = adminClient()
  await sb.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo: `${origin}/auth/callback?next=/login/redefinir` },
  })
  revalidatePath('/crm/admin/users')
  redirect('/crm/admin/users?ok=' + encodeURIComponent('Link de recuperação enviado para ' + email))
}
