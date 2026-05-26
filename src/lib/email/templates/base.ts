/**
 * Layout base para todos os e-mails transacionais.
 * Design minimalista alinhado com identidade House Mazzutti.
 */
export function baseLayout(content: string, preview?: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <title>House Mazzutti</title>
  ${preview ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${preview}&nbsp;‌</div>` : ''}
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Logo -->
        <tr>
          <td align="center" style="padding-bottom:32px">
            <a href="https://housemazzutti.com.br" style="text-decoration:none">
              <span style="font-size:18px;font-weight:700;letter-spacing:0.15em;color:#111;text-transform:uppercase">
                HOUSE MAZZUTTI
              </span>
            </a>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#fff;border-radius:16px;padding:40px 40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding-top:24px">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6">
              House Mazzutti Produções Ltda &middot; CNPJ 64.448.222/0001-54<br/>
              <a href="https://housemazzutti.com.br/minha-conta/lgpd" style="color:#9ca3af">Gerenciar preferências</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:contato@mztgrupo.com" style="color:#9ca3af">contato@mztgrupo.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function divider(): string {
  return `<hr style="border:none;border-top:1px solid #f0f0f0;margin:24px 0"/>`
}

export function button(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 28px;border-radius:12px;margin-top:8px">${label}</a>`
}
