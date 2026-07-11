/**
 * E-mail de boas-vindas pós-compra para o workshop Inside Out.
 * Identidade visual House Mazzutti — light/white editorial.
 */

interface WorkshopWelcomeParams {
  customerName?: string | null
  plan: string
  totalFormatted?: string
  orderId?: string
}

export function workshopWelcomeHTML(params: WorkshopWelcomeParams): string {
  const { customerName, plan, totalFormatted = 'R$ 1.410', orderId } = params
  const firstName = customerName?.split(' ')[0] ?? null
  const greeting = firstName ? `Olá, ${firstName}` : 'Olá'

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <title>Vaga confirmada · Inside Out Edit 2</title>
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all">Sua vaga no Inside Out Edit 2 está confirmada. Nos vemos em setembro em São Paulo.&nbsp;‌</div>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Logo -->
        <tr>
          <td align="center" style="padding-bottom:32px">
            <a href="https://housemazzutti.com" style="text-decoration:none">
              <span style="font-size:18px;font-weight:700;letter-spacing:0.15em;color:#111;text-transform:uppercase">HOUSE MAZZUTTI</span>
            </a>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#fff;border-radius:16px;padding:40px 40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08)">

            <!-- Eyebrow -->
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;color:#9ca3af;text-transform:uppercase">Inside Out · Edit 2 · São Paulo</p>

            <!-- Title -->
            <h1 style="margin:0 0 16px;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#111;line-height:1.1">Vaga confirmada.</h1>

            <!-- Intro -->
            <p style="margin:0 0 32px;font-size:15px;color:#4b5563;line-height:1.7">${greeting}. Sua inscrição no Inside Out Edit 2 está confirmada. Em setembro nos vemos no Studio Plano em São Paulo para dois dias dentro de uma produção real.</p>

            <!-- Divider -->
            <hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 28px"/>

            <!-- Event details -->
            <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.12em;color:#9ca3af;text-transform:uppercase">Detalhes do evento</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f5f5f5;vertical-align:top;width:50%">
                  <span style="font-size:11px;color:#9ca3af;display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em">Data</span>
                  <span style="font-size:14px;color:#111;font-weight:600">05 e 06 Set 2026</span>
                </td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f5f5f5;vertical-align:top">
                  <span style="font-size:11px;color:#9ca3af;display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em">Local</span>
                  <span style="font-size:14px;color:#111;font-weight:600">Studio Plano · São Paulo</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f5f5f5;vertical-align:top">
                  <span style="font-size:11px;color:#9ca3af;display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em">Formato</span>
                  <span style="font-size:14px;color:#111;font-weight:600">Presencial · 2 sets ao vivo</span>
                </td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f5f5f5;vertical-align:top">
                  <span style="font-size:11px;color:#9ca3af;display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em">Turma</span>
                  <span style="font-size:14px;color:#111;font-weight:600">Máx 15 creators</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;vertical-align:top">
                  <span style="font-size:11px;color:#9ca3af;display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em">Plano</span>
                  <span style="font-size:14px;color:#111;font-weight:600">${plan}</span>
                </td>
                <td style="padding:12px 0 0 16px;vertical-align:top">
                  <span style="font-size:11px;color:#9ca3af;display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em">Valor</span>
                  <span style="font-size:14px;color:#111;font-weight:600">${totalFormatted}</span>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 28px"/>

            <!-- O que você vai viver -->
            <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.12em;color:#9ca3af;text-transform:uppercase">O que esperar</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px">
              <tr><td style="padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px;color:#374151;line-height:1.6">→&nbsp;&nbsp;Dois sets completos — moda e beauty — com equipe profissional</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px;color:#374151;line-height:1.6">→&nbsp;&nbsp;Você produz conteúdo de campanha real para marcas</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px;color:#374151;line-height:1.6">→&nbsp;&nbsp;Direção ao vivo com Angelo Mazzutti e equipe House</td></tr>
              <tr><td style="padding:8px 0;font-size:14px;color:#374151;line-height:1.6">→&nbsp;&nbsp;Você sai com campanha no portfólio + conexões reais</td></tr>
            </table>

            <!-- Próximos passos -->
            <p style="margin:0 0 12px;font-size:15px;color:#4b5563;line-height:1.7">Nos próximos dias você vai receber um e-mail com todas as informações práticas: endereço exato do Studio Plano, horário de chegada, o que levar, briefing dos sets e acesso ao grupo exclusivo de participantes.</p>
            <p style="margin:0 0 32px;font-size:15px;color:#4b5563;line-height:1.7">Qualquer dúvida antes disso, responda este e-mail ou fale diretamente com a gente.</p>

            <!-- CTA -->
            <a href="https://housemazzutti.com/academy/workshop-producao-direcao-01/" style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 28px;border-radius:12px">Ver página do evento ↗</a>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding-top:24px">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6">
              House Mazzutti Produções Ltda &middot; CNPJ 64.448.222/0001-54<br/>
              <a href="mailto:contato@mztgrupo.com" style="color:#9ca3af">contato@mztgrupo.com</a>
              ${orderId ? `&nbsp;&middot;&nbsp;Pedido #${orderId.slice(0, 8).toUpperCase()}` : ''}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`
}
