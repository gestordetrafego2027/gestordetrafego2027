import { baseLayout, divider, button } from './base'

interface OrderConfirmedProps {
  buyerName: string
  orderNumber: string
  items: { name: string; quantity: number; unitAmount: number }[]
  totalCents: number
  currency?: string
}

function fmt(cents: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(cents / 100)
}

export function orderConfirmedEmail(props: OrderConfirmedProps): { subject: string; html: string } {
  const { buyerName, orderNumber, items, totalCents, currency = 'BRL' } = props

  const itemRows = items
    .map(
      (i) => `
    <tr>
      <td style="padding:10px 0;font-size:14px;color:#374151;border-bottom:1px solid #f0f0f0">${i.name}</td>
      <td style="padding:10px 0;font-size:14px;color:#374151;text-align:center;border-bottom:1px solid #f0f0f0">${i.quantity}</td>
      <td style="padding:10px 0;font-size:14px;color:#111;font-weight:600;text-align:right;border-bottom:1px solid #f0f0f0">${fmt(i.unitAmount * i.quantity, currency)}</td>
    </tr>`,
    )
    .join('')

  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111">Pedido confirmado! ✓</h1>
    <p style="margin:0 0 24px;font-size:16px;color:#6b7280">Olá, ${buyerName} — obrigado pela sua compra.</p>

    <div style="background:#f9fafb;border-radius:10px;padding:14px 18px;margin-bottom:24px">
      <p style="margin:0;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em">Número do pedido</p>
      <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#111;font-family:monospace">${orderNumber}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th style="text-align:left;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:8px">Produto</th>
          <th style="text-align:center;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:8px">Qtd</th>
          <th style="text-align:right;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:8px">Valor</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <div style="display:flex;justify-content:flex-end;margin-top:12px">
      <table>
        <tr>
          <td style="font-size:15px;font-weight:700;color:#111;padding-top:12px;text-align:right">
            Total: ${fmt(totalCents, currency)}
          </td>
        </tr>
      </table>
    </div>

    ${divider()}

    <p style="font-size:14px;color:#6b7280;margin:0 0 20px">
      Você receberá a NFS-e por e-mail em breve. Para dúvidas, responda este e-mail.
    </p>

    ${button('Ver meu pedido', 'https://housemazzutti.com.br/minha-conta/pedidos')}
  `

  return {
    subject: `Pedido ${orderNumber} confirmado — House Mazzutti`,
    html: baseLayout(content, `Seu pedido ${orderNumber} foi confirmado.`),
  }
}
