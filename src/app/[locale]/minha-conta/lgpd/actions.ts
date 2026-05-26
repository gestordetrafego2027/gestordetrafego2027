'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

/**
 * Atualiza consentimento de marketing (opt-in/out).
 * Art. 8 LGPD — consentimento deve ser livre, informado e inequívoco.
 */
export async function updateMarketingConsent(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const consent = formData.get('marketing_consent') === 'true'

  await supabase
    .from('profiles')
    .update({ marketing_consent: consent, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  logger.info({ user_id: user.id, consent }, 'marketing_consent atualizado')
}

/**
 * Exportação de dados pessoais — Art. 18, II LGPD.
 * Retorna JSON com todos os dados do usuário.
 * Produção: gerar arquivo e enviar por e-mail (Sprint 5).
 */
export async function requestDataExport(): Promise<{ ok: boolean; message: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão expirada.' }

  // Log da solicitação (compliance)
  logger.info({ user_id: user.id }, 'LGPD: solicitação de exportação de dados')

  // Sprint 5: gerar arquivo + enviar por Resend
  return {
    ok: true,
    message: 'Sua solicitação foi registrada. Você receberá seus dados por e-mail em até 15 dias úteis, conforme LGPD.',
  }
}

/**
 * Solicitação de exclusão de conta — Art. 18, VI LGPD.
 * Anonimiza dados pessoais; mantém registros fiscais (obrigação legal — Art. 16, II).
 */
export async function requestAccountDeletion(): Promise<{ ok: boolean; message: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão expirada.' }

  const service = createServiceClient()
  const log = logger.child({ user_id: user.id })

  try {
    // Anonimiza o perfil — mantém id para FK de pedidos (obrigação fiscal)
    await service.from('profiles').update({
      full_name: '[REMOVIDO]',
      display_name: null,
      email: `deleted_${user.id}@removed.invalid`,
      phone: null,
      city: null,
      state: null,
      cpf: null,
      avatar_url: null,
      bio: null,
      instagram_handle: null,
      linkedin_handle: null,
      tiktok_handle: null,
      marketing_consent: false,
      metadata: { lgpd_deletion_requested_at: new Date().toISOString() },
      updated_at: new Date().toISOString(),
    }).eq('id', user.id)

    // Remove sessões ativas
    await supabase.auth.signOut({ scope: 'global' })

    log.info('LGPD: conta anonimizada com sucesso')
  } catch (err) {
    log.error({ err }, 'LGPD: falha ao anonimizar conta')
    return { ok: false, message: 'Não foi possível processar. Entre em contato: contato@mztgrupo.com' }
  }

  redirect('/login?lgpd=deleted')
}
