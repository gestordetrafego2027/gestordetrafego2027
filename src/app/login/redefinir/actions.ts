'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'

// Papéis de CRM (app_metadata.role). Quem tem papel volta para o CRM;
// cliente da loja volta para a área de membro.
const CRM_ROLES = new Set(['admin', 'staff', 'gestor', 'comercial', 'financeiro'])

export async function setNewPassword(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const hdrs = await headers()
  const ip =
    hdrs.get('x-real-ip') ?? hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
  const rl = await checkRateLimit('auth', ip)
  if (!rl.allowed) {
    return { error: 'Muitas tentativas. Aguarde um minuto e tente novamente.' }
  }

  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  if (password.length < 8) {
    return { error: 'A senha precisa ter ao menos 8 caracteres.' }
  }
  if (password.length > 72) {
    return { error: 'A senha pode ter no máximo 72 caracteres.' }
  }
  if (password !== confirm) {
    return { error: 'As senhas não conferem.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect(
      '/login/recuperar?error=' +
        encodeURIComponent('Sessão expirada. Solicite um novo link de recuperação.'),
    )
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    return { error: error.message }
  }

  // Troca de senha derruba as demais sessões: se o link vazou, quem estava
  // logado em outro dispositivo perde o acesso.
  try {
    await supabase.auth.signOut({ scope: 'others' })
  } catch {
    // Não bloqueia o fluxo — a senha já foi alterada com sucesso.
  }

  const role = (user.app_metadata as { role?: string } | undefined)?.role
  if (role && CRM_ROLES.has(role)) {
    redirect('/crm/?reset=ok')
  }

  const locale = hdrs.get('x-next-intl-locale') ?? 'pt'
  redirect(`/${locale}/minha-conta?reset=ok`)
}
