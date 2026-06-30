'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  pending: ['processing', 'cancelled'],
  processing: ['paid', 'failed', 'cancelled'],
  paid: ['refunded', 'partially_refunded'],
  failed: ['cancelled'],
}

const UpdateSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum([
    'pending',
    'processing',
    'paid',
    'failed',
    'refunded',
    'partially_refunded',
    'cancelled',
    'chargeback',
  ]),
})

export async function updateOrderStatus(formData: FormData) {
  const log = logger.child({ action: 'updateOrderStatus' })
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const md = (user?.app_metadata ?? {}) as { role?: string }
  if (md.role !== 'admin') return { error: 'Sem permissão.' }

  const parsed = UpdateSchema.safeParse({
    orderId: formData.get('orderId'),
    status: formData.get('status'),
  })
  if (!parsed.success) return { error: 'Dados inválidos.' }

  const { orderId, status } = parsed.data
  const service = createServiceClient()

  // Verifica transição permitida
  const { data: current } = await service
    .from('store_orders')
    .select('status')
    .eq('id', orderId)
    .maybeSingle()
  if (!current) return { error: 'Pedido não encontrado.' }

  const allowed = ALLOWED_TRANSITIONS[current.status] ?? []
  if (!allowed.includes(status)) {
    return { error: `Transição ${current.status} → ${status} não permitida.` }
  }

  const { error } = await service
    .from('store_orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (error) {
    log.error({ err: error }, 'updateOrderStatus falhou')
    return { error: 'Falha ao atualizar.' }
  }

  // Registra na timeline
  await service.from('store_order_events').insert({
    order_id: orderId,
    status,
    metadata: { updated_by: user!.id, source: 'admin_panel' },
  })

  log.info({ order_id: orderId, from: current.status, to: status }, 'status atualizado pelo admin')
  revalidatePath('/crm/store/pedidos')
  revalidatePath('/crm/store')
}
