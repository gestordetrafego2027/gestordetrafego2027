import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vaga confirmada · Inside Out Edit 2 · House Mazzutti',
  robots: { index: false },
}

export default function WorkshopConfirmadoPage() {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--ink:#0e0d0c;--paper:#f0ede8;--muted:#54524d;--line:#2a2825;--accent:#a09880}
        body{background:var(--ink);color:var(--paper);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100dvh;display:flex;flex-direction:column}
        .page{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px;text-align:center}
        .logo{font-size:11px;font-weight:700;letter-spacing:.18em;color:var(--accent);text-transform:uppercase;text-decoration:none;display:block;margin-bottom:64px}
        .check{width:56px;height:56px;border:1.5px solid var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 32px;font-size:22px;color:var(--accent)}
        .eyebrow{font-size:10px;letter-spacing:.16em;color:var(--accent);text-transform:uppercase;display:block;margin-bottom:16px}
        h1{font-size:clamp(2rem,6vw,3.5rem);font-weight:800;letter-spacing:-.02em;line-height:1.05;margin-bottom:24px}
        .sub{font-size:clamp(.9rem,1.8vw,1.05rem);color:var(--muted);line-height:1.75;max-width:38ch;margin:0 auto 48px}
        .details{display:flex;flex-wrap:wrap;gap:32px;justify-content:center;margin-bottom:56px}
        .detail{text-align:left}
        .detail-label{font-size:10px;letter-spacing:.12em;color:var(--muted);text-transform:uppercase;display:block;margin-bottom:4px}
        .detail-value{font-size:14px;color:var(--paper);font-weight:600}
        .cta{display:inline-block;background:var(--paper);color:var(--ink);text-decoration:none;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:16px 36px;transition:opacity .2s}
        .cta:hover{opacity:.85}
        .footer{margin-top:auto;padding:24px;font-size:11px;color:#3a3835;text-align:center}
        .footer a{color:var(--muted);text-decoration:none}
      `}</style>

      <div className="page">
        <a href="https://housemazzutti.com" className="logo">
          House Mazzutti
        </a>

        <div className="check">✓</div>
        <span className="eyebrow">Inside Out · Edit 2 · São Paulo</span>
        <h1>
          Vaga
          <br />
          confirmada.
        </h1>
        <p className="sub">
          Sua inscrição está confirmada. Em breve você vai receber um e-mail com todos os detalhes,
          briefing dos sets e o grupo exclusivo de participantes.
        </p>

        <div className="details">
          <div className="detail">
            <span className="detail-label">Data</span>
            <span className="detail-value">05 e 06 Set 2026</span>
          </div>
          <div className="detail">
            <span className="detail-label">Local</span>
            <span className="detail-value">Studio Plano · São Paulo</span>
          </div>
          <div className="detail">
            <span className="detail-label">Turma</span>
            <span className="detail-value">Máx 15 creators</span>
          </div>
          <div className="detail">
            <span className="detail-label">Formato</span>
            <span className="detail-value">Presencial · 2 sets ao vivo</span>
          </div>
        </div>

        <a href="/academy/workshop-producao-direcao-01/" className="cta">
          Ver página do evento ↗
        </a>
      </div>

      <footer className="footer">
        House Mazzutti Produções Ltda ·{' '}
        <a href="mailto:contato@mztgrupo.com">contato@mztgrupo.com</a>
      </footer>
    </>
  )
}
