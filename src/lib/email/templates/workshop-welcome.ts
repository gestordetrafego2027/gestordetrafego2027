/**
 * E-mail de boas-vindas pós-compra para o workshop Inside Out.
 * Identidade visual House Mazzutti — dark editorial.
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
<body style="margin:0;padding:0;background:#0e0d0c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0d0c;padding:48px 16px 64px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header / Logo -->
        <tr>
          <td style="padding-bottom:40px;border-bottom:1px solid #2a2825">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <a href="https://housemazzutti.com" style="text-decoration:none">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.18em;color:#a09880;text-transform:uppercase">HOUSE MAZZUTTI</span>
                  </a>
                </td>
                <td align="right">
                  <span style="font-size:10px;letter-spacing:0.12em;color:#54524d;text-transform:uppercase">Academy</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hero -->
        <tr>
          <td style="padding:48px 0 40px">
            <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.16em;color:#a09880;text-transform:uppercase">Inside Out · Edit 2 · São Paulo</p>
            <h1 style="margin:0 0 20px;font-size:36px;font-weight:800;letter-spacing:-0.02em;color:#f0ede8;line-height:1.1">Vaga<br/>confirmada.</h1>
            <p style="margin:0;font-size:15px;color:#8a8474;line-height:1.7">${greeting}. Sua inscrição no Inside Out Edit 2 está confirmada. Em setembro nos vemos no Studio Plano em São Paulo para dois dias dentro de uma produção real.</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="border-top:1px solid #2a2825;padding-bottom:40px"></td></tr>

        <!-- Event Details -->
        <tr>
          <td style="padding-bottom:40px">
            <p style="margin:0 0 24px;font-size:10px;letter-spacing:0.16em;color:#a09880;text-transform:uppercase">Detalhes do evento</p>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #1e1c1a;vertical-align:top;width:40%">
                  <span style="font-size:10px;letter-spacing:0.12em;color:#54524d;text-transform:uppercase;display:block;margin-bottom:6px">Data</span>
                  <span style="font-size:14px;color:#f0ede8;font-weight:600">05 e 06 de Setembro 2026</span>
                </td>
                <td style="padding:16px 0 16px 24px;border-bottom:1px solid #1e1c1a;vertical-align:top">
                  <span style="font-size:10px;letter-spacing:0.12em;color:#54524d;text-transform:uppercase;display:block;margin-bottom:6px">Local</span>
                  <span style="font-size:14px;color:#f0ede8;font-weight:600">Studio Plano · São Paulo</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #1e1c1a;vertical-align:top">
                  <span style="font-size:10px;letter-spacing:0.12em;color:#54524d;text-transform:uppercase;display:block;margin-bottom:6px">Formato</span>
                  <span style="font-size:14px;color:#f0ede8;font-weight:600">Presencial · 2 sets ao vivo</span>
                </td>
                <td style="padding:16px 0 16px 24px;border-bottom:1px solid #1e1c1a;vertical-align:top">
                  <span style="font-size:10px;letter-spacing:0.12em;color:#54524d;text-transform:uppercase;display:block;margin-bottom:6px">Turma</span>
                  <span style="font-size:14px;color:#f0ede8;font-weight:600">Máximo 15 creators</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;vertical-align:top">
                  <span style="font-size:10px;letter-spacing:0.12em;color:#54524d;text-transform:uppercase;display:block;margin-bottom:6px">Plano</span>
                  <span style="font-size:14px;color:#f0ede8;font-weight:600">${plan}</span>
                </td>
                <td style="padding:16px 0 0 24px;vertical-align:top">
                  <span style="font-size:10px;letter-spacing:0.12em;color:#54524d;text-transform:uppercase;display:block;margin-bottom:6px">Valor</span>
                  <span style="font-size:14px;color:#f0ede8;font-weight:600">${totalFormatted}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- O que você vai viver -->
        <tr>
          <td style="padding-bottom:40px;background:#181613;padding:32px;border:1px solid #2a2825">
            <p style="margin:0 0 20px;font-size:10px;letter-spacing:0.16em;color:#a09880;text-transform:uppercase">O que esperar</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1c1a">
                  <span style="font-size:11px;color:#54524d;margin-right:12px">→</span>
                  <span style="font-size:13px;color:#c8c2b8;line-height:1.6">Dois sets completos — moda e beauty — com equipe profissional</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1c1a">
                  <span style="font-size:11px;color:#54524d;margin-right:12px">→</span>
                  <span style="font-size:13px;color:#c8c2b8;line-height:1.6">Você produz conteúdo de campanha real para marcas</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1c1a">
                  <span style="font-size:11px;color:#54524d;margin-right:12px">→</span>
                  <span style="font-size:13px;color:#c8c2b8;line-height:1.6">Direção ao vivo com Angelo Mazzutti e equipe House</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0">
                  <span style="font-size:11px;color:#54524d;margin-right:12px">→</span>
                  <span style="font-size:13px;color:#c8c2b8;line-height:1.6">Você sai com campanha no portfólio + conexões reais</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Próximos passos -->
        <tr>
          <td style="padding:40px 0">
            <p style="margin:0 0 20px;font-size:10px;letter-spacing:0.16em;color:#a09880;text-transform:uppercase">Próximos passos</p>
            <p style="margin:0 0 12px;font-size:14px;color:#8a8474;line-height:1.7">Nos próximos dias você vai receber um e-mail com todas as informações práticas: endereço exato do Studio Plano, horário de chegada, o que levar, briefing dos sets e acesso ao grupo exclusivo de participantes.</p>
            <p style="margin:0;font-size:14px;color:#8a8474;line-height:1.7">Qualquer dúvida antes disso, responda este e-mail ou fale diretamente com a gente.</p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding-bottom:48px">
            <a href="https://housemazzutti.com/academy/workshop-producao-direcao-01/" style="display:inline-block;background:#f0ede8;color:#0e0d0c;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:16px 32px">Ver página do evento ↗</a>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="border-top:1px solid #2a2825;padding-bottom:32px"></td></tr>

        <!-- Footer -->
        <tr>
          <td>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 6px;font-size:11px;color:#54524d;line-height:1.6">
                    <a href="https://housemazzutti.com" style="color:#a09880;text-decoration:none;font-weight:600">House Mazzutti</a>
                  </p>
                  <p style="margin:0;font-size:11px;color:#3a3835;line-height:1.6">
                    House Mazzutti Produções Ltda · CNPJ 64.448.222/0001-54<br/>
                    São Paulo · Brasil
                  </p>
                </td>
                <td align="right" style="vertical-align:top">
                  <p style="margin:0;font-size:11px;color:#3a3835;line-height:1.6">
                    <a href="mailto:contato@mztgrupo.com" style="color:#54524d;text-decoration:none">contato@mztgrupo.com</a>
                  </p>
                  ${orderId ? `<p style="margin:4px 0 0;font-size:10px;color:#2a2825;line-height:1.6">Pedido #${orderId.slice(0, 8).toUpperCase()}</p>` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`
}
