import { baseLayout, button } from './base'

export function paymentFailedEmail(props: { buyerName: string; buyerEmail: string }): {
  subject: string
  html: string
} {
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111">Falha no pagamento</h1>
    <p style="margin:0 0 20px;font-size:15px;color:#6b7280">
      Olá, ${props.buyerName} — infelizmente seu pagamento não foi processado.
    </p>
    <p style="font-size:14px;color:#6b7280;margin:0 0 24px;line-height:1.6">
      Isso pode acontecer por dados incorretos, limite do cartão ou recusa do emissor.
      Tente novamente com outro método de pagamento.
    </p>
    ${button('Tentar novamente', 'https://housemazzutti.com.br/loja')}
    <p style="font-size:12px;color:#9ca3af;margin-top:20px">
      Se precisar de ajuda, responda este e-mail ou fale conosco em
      <a href="mailto:contato@mztgrupo.com" style="color:#9ca3af">contato@mztgrupo.com</a>.
    </p>
  `
  return {
    subject: 'Falha no pagamento — House Mazzutti',
    html: baseLayout(content, 'Seu pagamento não foi processado.'),
  }
}
