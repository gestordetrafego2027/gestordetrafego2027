'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

/**
 * Marca lesson como completa (ou desmarca) + atualiza progresso.
 * Idempotente. Bump watch_count.
 */
export async function toggleLessonCompleteAction(formData: FormData): Promise<void> {
  const lessonId = String(formData.get('lesson_id') ?? '')
  const productId = String(formData.get('product_id') ?? '')
  const completed = String(formData.get('completed') ?? 'false') === 'true'
  const slug = String(formData.get('slug') ?? '')
  if (!lessonId || !productId) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Garante que user tem enrollment ativo
  const { data: enroll } = await supabase
    .from('academy_enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .eq('status', 'active')
    .maybeSingle()
  if (!enroll) return

  // Upsert progress
  const { data: existing } = await supabase
    .from('academy_lesson_progress')
    .select('id, watch_count, first_watched_at')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  const now = new Date().toISOString()
  if (existing) {
    await supabase
      .from('academy_lesson_progress')
      .update({
        completed_at: completed ? now : null,
        last_watched_at: now,
        watch_count: (existing.watch_count ?? 0) + (completed ? 0 : 1),
      })
      .eq('id', existing.id)
  } else {
    await supabase.from('academy_lesson_progress').insert({
      user_id: user.id,
      lesson_id: lessonId,
      product_id: productId,
      first_watched_at: now,
      last_watched_at: now,
      completed_at: completed ? now : null,
      watch_count: 1,
      seconds_watched: 0,
      last_position_seconds: 0,
    })
  }

  if (slug) revalidatePath(`/academy/curso/${slug}/aula/${lessonId}`)
  revalidatePath('/academy/dashboard')
}

/**
 * Atualiza posição/segundos assistidos (chamado pelo player a cada N segundos).
 */
export async function pingLessonProgressAction(
  lessonId: string,
  productId: string,
  positionSeconds: number,
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: existing } = await supabase
    .from('academy_lesson_progress')
    .select('id, seconds_watched, last_position_seconds')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  const now = new Date().toISOString()
  if (existing) {
    const newSeconds = Math.max(existing.seconds_watched ?? 0, Math.floor(positionSeconds))
    await supabase
      .from('academy_lesson_progress')
      .update({
        last_position_seconds: Math.floor(positionSeconds),
        seconds_watched: newSeconds,
        last_watched_at: now,
      })
      .eq('id', existing.id)
  } else {
    await supabase.from('academy_lesson_progress').insert({
      user_id: user.id,
      lesson_id: lessonId,
      product_id: productId,
      first_watched_at: now,
      last_watched_at: now,
      last_position_seconds: Math.floor(positionSeconds),
      seconds_watched: Math.floor(positionSeconds),
      watch_count: 1,
    })
  }
}
