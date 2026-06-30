'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'
import { sendEmail } from '@/lib/email/resend'
import { dataExportEmail } from '@/lib/email/templates/data-export'

/**
 * Atualiza consentimento de marketing (opt-in/out).
 * Art. 8 LGPD — consentimento deve ser livre, informado e inequívoco.
 */
export async function updateMarketingConsent(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
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
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão expirada.' }

  logger.info({ user_id: user.id }, 'LGPD: solicitação de exportação de dados')

  // Coleta dados do perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select(
      'full_name, display_name, email, phone, city, state, created_at, marketing_consent, terms_accepted_at',
    )
    .eq('id', user.id)
    .maybeSingle()

  // Coleta pedidos (sem dados de pagamento sensíveis)
  const { data: orders } = await supabase
    .from('store_orders')
    .select('order_number, status, total_cents, currency, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const exportData = {
    exported_at: new Date().toISOString(),
    lgpd_article: 'Art. 18, I e V — Lei 13.709/2018',
    profile: profile ?? {},
    orders: orders ?? [],
  }

  const exportJson = JSON.stringify(exportData, null, 2)
  const email = profile?.email ?? user.email ?? ''
  const name = profile?.display_name ?? profile?.full_name ?? 'Cliente'

  if (email) {
    const { subject, html } = dataExportEmail({ buyerName: name, exportJson })
    await sendEmail({ to: email, subject, html, tags: [{ name: 'type', value: 'lgpd_export' }] })
  }

  return {
    ok: true,
    message: 'Seus dados foram enviados para seu e-mail cadastrado.',
  }
}

/**
 * Solicitação de exclusão de conta — Art. 18, VI LGPD.
 * Anonimiza dados pessoais; mantém registros fiscais (obrigação legal — Art. 16, II).
 */
export async function requestAccountDeletion(): Promise<{ ok: boolean; message: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão expirada.' }

  const service = createServiceClient()
  const log = logger.child({ user_id: user.id })

  try {
    // Anonimiza o perfil — mantém id para FK de pedidos (obrigação fiscal)
    await service
      .from('profiles')
      .update({
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
      })
      .eq('id', user.id)

    // Remove sessões ativas
    await supabase.auth.signOut({ scope: 'global' })

    log.info('LGPD: conta anonimizada com sucesso')
  } catch (err) {
    log.error({ err }, 'LGPD: falha ao anonimizar conta')
    return {
      ok: false,
      message: 'Não foi possível processar. Entre em contato: contato@housemazzutti.com',
    }
  }

  redirect('/login?lgpd=deleted')
}
