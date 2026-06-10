/**
 * Reenvio manual de entrega digital.
 * Uso: npx tsx scripts/resend-delivery.ts
 *
 * Gera signed URL do Storage e envia email de entrega para um pedido específico.
 * Útil quando o webhook processou sem line_items (bug já corrigido).
 */

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

// ── Configuração manual ────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const RESEND_API_KEY = process.env.RESEND_API_KEY!

// Dados do pedido a reenviar
const ORDER_ID = 'b36ec64e-87be-4e9b-be9b-490c12b70d9f'
const BUYER_EMAIL = 'fran_by@hotmail.com'
const BUYER_NAME = 'Francelis'
const PRODUCT_SLUG = 'marketing-para-modelos' // Vol. 01 — R$ 49,00 (vol-03 ainda não está no bucket)
// ──────────────────────────────────────────────────────────────────

const PRODUCTS: Record<string, { name: string; storagePath: string; volumeLabel: string; detail: string; expiresIn: string }> = {
  'casos-da-producao': {
    name: 'Inside Out · Vol. 03',
    storagePath: 'casos-da-producao/vol-03.pdf',
    volumeLabel: 'Vol. 03',
    detail: '7 bastidores reais — do conceito à entrega com contexto de mercado e direção criativa.',
    expiresIn: '7 dias',
  },
  'marketing-para-modelos': {
    name: 'Marketing para Modelos · Vol. 01',
    storagePath: 'marketing-para-modelos/vol-01.pdf',
    volumeLabel: 'Vol. 01',
    detail: '94 páginas de leitura editorial — da passarela física ao império digital.',
    expiresIn: '7 dias',
  },
  'preco-da-relevancia': {
    name: 'O Preço da Relevância · Vol. 02',
    storagePath: 'preco-da-relevancia/vol-02.pdf',
    volumeLabel: 'Vol. 02',
    detail: '107 páginas em 10 capítulos.',
    expiresIn: '7 dias',
  },
}

async function main() {
  const product = PRODUCTS[PRODUCT_SLUG]
  if (!product) throw new Error(`Produto não encontrado: ${PRODUCT_SLUG}`)

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })

  // Gera signed URL (7 dias)
  const TTL = 60 * 60 * 24 * 7
  const { data, error } = await supabase.storage
    .from('digital-products')
    .createSignedUrl(product.storagePath, TTL)

  if (error || !data?.signedUrl) {
    throw new Error(`Erro ao gerar signed URL: ${error?.message}`)
  }

  console.log('✅ Signed URL gerada:', data.signedUrl.slice(0, 80) + '...')

  // Monta email
  const resend = new Resend(RESEND_API_KEY)
  const { data: email, error: emailErr } = await resend.emails.send({
    from: 'House Mazzutti <academy@housemazzutti.com>',
    to: BUYER_EMAIL,
    replyTo: 'academy@housemazzutti.com',
    subject: `Seu exemplar está pronto · ${product.name}`,
    html: buildHtml({
      customerName: BUYER_NAME,
      productName: product.name,
      downloadUrl: data.signedUrl,
      orderId: ORDER_ID,
      expiresIn: product.expiresIn,
      volumeLabel: product.volumeLabel,
      detail: product.detail,
    }),
  })

  if (emailErr) throw new Error(`Erro ao enviar email: ${JSON.stringify(emailErr)}`)

  console.log('✅ Email enviado — ID:', email?.id)
  console.log('   Para:', BUYER_EMAIL)
  console.log('   Produto:', product.name)
}

function buildHtml(opts: {
  customerName?: string
  productName: string
  downloadUrl: string
  orderId: string
  expiresIn?: string
  volumeLabel?: string
  detail?: string
}): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0e0e0;max-width:600px;">
        <tr><td style="background:#0a0a0a;padding:32px 40px;text-align:center;">
          <span style="color:#fff;font-size:20px;letter-spacing:4px;text-transform:uppercase;font-family:Georgia,serif;">HOUSE MAZZUTTI</span>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 16px;font-size:15px;color:#333;">
            ${opts.customerName ? `Olá, ${opts.customerName}.` : 'Olá.'}
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.6;">
            Seu exemplar de <strong>${opts.productName}</strong> está pronto para download.
            ${opts.detail ? `<br><span style="color:#666;font-size:13px;">${opts.detail}</span>` : ''}
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${opts.downloadUrl}" style="background:#0a0a0a;color:#fff;text-decoration:none;padding:14px 32px;font-size:14px;letter-spacing:2px;text-transform:uppercase;display:inline-block;">
              BAIXAR ${opts.volumeLabel ?? 'E-BOOK'}
            </a>
          </div>
          ${opts.expiresIn ? `<p style="text-align:center;font-size:12px;color:#999;margin:0 0 24px;">Este link expira em ${opts.expiresIn}.</p>` : ''}
          <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
          <p style="font-size:11px;color:#aaa;margin:0;">Pedido ${opts.orderId} · Se tiver dúvidas, responda este e-mail.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

main().catch((err) => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
