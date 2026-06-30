import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'
import { z } from 'zod'

const bodySchema = z.object({
  article_slug: z.string().min(1),
  article_title: z.string().min(1),
  article_excerpt: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const parsed = bodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      logger.error('newsletter/send: variáveis de ambiente ausentes')
      return NextResponse.json({ error: 'Configuração do servidor incompleta.' }, { status: 500 })
    }

    const res = await fetch(`${supabaseUrl}/functions/v1/send_newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify(parsed.data),
    })

    const data = await res.json()
    if (!res.ok) {
      logger.error({ status: res.status, data }, 'newsletter/send: Edge Function retornou erro')
      return NextResponse.json(
        { error: data.error ?? 'Erro ao enviar newsletter.' },
        { status: res.status },
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    logger.error({ err }, 'newsletter/send: exceção')
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
