import { baseLayout } from './base'

export function dataExportEmail(props: {
  buyerName: string
  exportJson: string
}): { subject: string; html: string } {
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111">Seus dados pessoais</h1>
    <p style="margin:0 0 20px;font-size:15px;color:#6b7280">
      Olá, ${props.buyerName} — conforme solicitado e em atendimento à LGPD (Art. 18, I e V),
      seguem seus dados cadastrais em formato JSON.
    </p>
    <pre style="background:#f9fafb;border-radius:10px;padding:16px;font-size:11px;color:#374151;overflow:auto;max-height:300px;font-family:monospace;line-height:1.5">${props.exportJson}</pre>
    <p style="font-size:12px;color:#9ca3af;margin-top:20px;line-height:1.6">
      Controlador: House Mazzutti Produções Ltda — CNPJ 64.448.222/0001-54.<br/>
      Para exercer outros direitos LGPD, acesse
      <a href="https://housemazzutti.com.br/minha-conta/lgpd" style="color:#9ca3af">sua área de privacidade</a>.
    </p>
  `
  return {
    subject: 'Seus dados pessoais — House Mazzutti (LGPD)',
    html: baseLayout(content, 'Exportação de dados conforme LGPD.'),
  }
}
