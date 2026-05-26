/**
 * Email de entrega digital — pós-compra de ebook.
 *
 * Identidade House Mazzutti editorial (lima Mondrian, Cormorant + Rock Grotesque).
 * Inline-styled para compatibilidade com clientes de email.
 */

export interface DigitalDeliveryParams {
  customerName?: string
  productName: string
  downloadUrl: string
  orderId: string
  expiresIn?: string // ex.: "7 dias"
  supportEmail?: string
}

export function digitalDeliveryHTML({
  customerName,
  productName,
  downloadUrl,
  orderId,
  expiresIn = '7 dias',
  supportEmail = 'academy@housemazzutti.com',
}: DigitalDeliveryParams): string {
  const greeting = customerName ? `Olá, ${customerName}.` : 'Olá.'

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Seu exemplar está pronto · ${productName}</title>
</head>
<body style="margin:0;padding:0;background:#efe9da;font-family:Georgia,serif;color:#14140e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#efe9da;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="background:#fff;max-width:560px;">

        <!-- Top band lima -->
        <tr><td style="background:#a4e80a;padding:18px 32px;">
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.34em;text-transform:uppercase;color:#14140e;font-weight:500;">
            House Mazzutti Academy · Vol. 01 · 2026
          </div>
        </td></tr>

        <!-- Hero -->
        <tr><td style="padding:48px 32px 24px;">
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#c92a2a;margin-bottom:16px;">
            ● Pedido confirmado · #${orderId.slice(0, 8)}
          </div>
          <h1 style="font-family:Georgia,'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:42px;line-height:1.02;color:#14140e;margin:0 0 16px;">
            Seu exemplar está pronto.
          </h1>
          <p style="font-family:Georgia,serif;font-size:17px;line-height:1.55;color:#2a2a22;margin:0;">
            ${greeting} Obrigado por garantir <em>${productName}</em>. Abaixo está o seu acesso ao PDF completo — diagramação editorial, alta resolução.
          </p>
        </td></tr>

        <!-- CTA download -->
        <tr><td style="padding:0 32px 32px;" align="center">
          <a href="${downloadUrl}" style="display:inline-block;background:#14140e;color:#efe9da;font-family:Helvetica,Arial,sans-serif;font-weight:500;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;padding:20px 36px;text-decoration:none;">
            Baixar o ebook →
          </a>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b6558;margin-top:18px;">
            Link válido por ${expiresIn}
          </div>
        </td></tr>

        <!-- Régua Mondrian -->
        <tr><td style="padding:0 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="height:4px;">
            <tr>
              <td width="20%" style="background:#c92a2a;height:4px;"></td>
              <td width="20%" style="background:#f0b400;height:4px;"></td>
              <td width="40%" style="background:#1e3a8a;height:4px;"></td>
              <td width="20%" style="background:#14140e;height:4px;"></td>
            </tr>
          </table>
        </td></tr>

        <!-- O que esperar -->
        <tr><td style="padding:36px 32px 8px;">
          <h2 style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.34em;text-transform:uppercase;color:#14140e;font-weight:700;margin:0 0 16px;">
            O que esperar
          </h2>
          <p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#2a2a22;margin:0 0 12px;">
            <strong style="color:#14140e;">281 páginas</strong> em 12 capítulos. Leitura sugerida em ordem — cada parte se apoia na anterior.
          </p>
          <p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#2a2a22;margin:0;">
            Recomendamos abrir num tablet ou computador para aproveitar a diagramação completa.
          </p>
        </td></tr>

        <!-- Garantia -->
        <tr><td style="padding:32px 32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(20,20,14,0.04);border-left:3px solid #14140e;">
            <tr><td style="padding:18px 22px;">
              <div style="font-family:Helvetica,Arial,sans-serif;font-size:9px;letter-spacing:0.32em;text-transform:uppercase;color:#14140e;margin-bottom:4px;">
                Garantia incondicional · 7 dias
              </div>
              <div style="font-family:Georgia,'Cormorant Garamond',serif;font-style:italic;font-size:16px;line-height:1.35;color:#14140e;">
                Se não fizer sentido pra você, escreve pra ${supportEmail} dizendo apenas isso. Devolvemos cem por cento — sem perguntar nada.
              </div>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:36px 32px 32px;background:#14140e;color:rgba(239,233,218,0.7);">
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:9px;letter-spacing:0.32em;text-transform:uppercase;font-weight:700;color:#efe9da;margin-bottom:8px;">
            House Mazzutti<span style="font-family:Georgia,serif;font-style:italic;font-weight:400;text-transform:none;">.</span>
          </div>
          <div style="font-family:Georgia,serif;font-style:italic;font-size:14px;line-height:1.5;color:rgba(239,233,218,0.55);margin-bottom:18px;">
            Marca não se constrói com estética — se constrói com leitura.
          </div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.18em;color:rgba(239,233,218,0.4);">
            © MMXXVI · House Mazzutti Edições · São Paulo · Brasil
          </div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;color:rgba(239,233,218,0.4);margin-top:8px;">
            Dúvidas? <a href="mailto:${supportEmail}" style="color:#a4e80a;text-decoration:none;">${supportEmail}</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
