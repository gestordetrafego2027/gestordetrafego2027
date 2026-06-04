// Certificate.js — House Mazzutti Academy
// Landscape A4-ish (1400 x 990). Adaptado do kit "CERTIFICADOS CURSOS".
// Cores e tipografia (Rock Grotesk) fiéis ao kit original.

const PAPER = '#F3EFE6'
const INK = '#0E0D0B'
const PAPER_2 = '#E8E2D4'
import Image from 'next/image'

function HMZTLogo({ size = 32, color = INK }) {
  const isBlack = /^#0?[eE]?0?[dD]?0?[bB]?$|^#000000$|^#000$/.test(color)
  return (
    <Image
      src="/academy/logo.png"
      alt="House Mazzutti"
      width={size * 4}
      height={size}
      style={{
        height: size,
        width: 'auto',
        display: 'block',
        filter: isBlack ? 'none' : 'brightness(0) saturate(100%)',
        opacity: isBlack ? 1 : 0.92,
      }}
    />
  )
}

function Seal({ accent, index, kind = 'creative' }) {
  const glyph = {
    creative: (
      <g stroke={accent} strokeWidth="2" fill="none">
        <circle cx="60" cy="60" r="46" />
        <circle cx="60" cy="60" r="32" />
        {[...Array(12)].map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          const x1 = 60 + Math.cos(a) * 32
          const y1 = 60 + Math.sin(a) * 32
          const x2 = 60 + Math.cos(a) * 46
          const y2 = 60 + Math.sin(a) * 46
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
        <circle cx="60" cy="60" r="6" fill={accent} />
      </g>
    ),
    executive: (
      <g stroke={accent} strokeWidth="2" fill="none">
        <circle cx="60" cy="60" r="46" />
        <rect x="36" y="36" width="48" height="48" />
        <line x1="36" y1="52" x2="84" y2="52" />
        <line x1="36" y1="68" x2="84" y2="68" />
        <line x1="52" y1="36" x2="52" y2="84" />
        <line x1="68" y1="36" x2="68" y2="84" />
        <rect x="56" y="56" width="8" height="8" fill={accent} />
      </g>
    ),
    influence: (
      <g stroke={accent} strokeWidth="2" fill="none">
        <circle cx="60" cy="60" r="46" />
        {[[60, 28], [88, 48], [80, 82], [40, 82], [32, 48]].map(([cx, cy], i) => (
          <g key={i}>
            <line x1="60" y1="60" x2={cx} y2={cy} />
            <circle cx={cx} cy={cy} r="6" fill={accent} stroke="none" />
          </g>
        ))}
        <circle cx="60" cy="60" r="8" fill={accent} stroke="none" />
      </g>
    ),
  }[kind]

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
      {glyph}
    </svg>
  )
}

function fmtDate(d) {
  if (!d) return ''
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

/**
 * Certificate — renderiza 1 certificado (1400×990).
 * Props vindas de v_academy_certificate_public ou diretas pra preview.
 */
export default function Certificate({
  certCode = 'HM-CERT-2026-XXXXXX',
  studentName = 'NOME DO ALUNO',
  courseIndex = '01',
  courseChapter = 'CAPÍTULO I',
  coursePt = 'DIREÇÃO CRIATIVA',
  courseEn = 'CREATIVE DIRECTION',
  discipline = 'Conception, Art Direction & Narrative',
  hours = 120,
  startDate = '2026-02-14',
  endDate = '2026-05-08',
  city = 'São Paulo · Bosque da Saúde',
  founderName = 'ÂNGELO MAZZUTTI',
  founderTitle = 'Fundador & Diretor Criativo',
  coordinatorName = 'MATEUS SACAVEM',
  coordinatorTitle = 'Coordenação',
  accent = '#C8531C',
  accentSoft = '#F2E1D4',
  sealKind = 'creative',
  verifyUrl,
}) {
  const verify = verifyUrl || `https://housemazzutti.com/verify/${certCode}`

  return (
    <div
      className="hmzt-cert"
      style={{
        width: 1400,
        height: 990,
        background: PAPER,
        color: INK,
        position: 'relative',
        fontFamily: '"RocGrotesk", "Rock Grotesk", "Space Grotesk", -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Faixa vertical de acento à direita */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: accent,
        }}
      />
      {/* Banda secundária */}
      <div
        style={{
          position: 'absolute',
          right: 80,
          top: 0,
          bottom: 0,
          width: 22,
          background: accentSoft,
        }}
      />

      {/* HEADER */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '64px 180px 0 90px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <HMZTLogo size={48} />
          <div
            style={{
              borderLeft: `1px solid ${INK}33`,
              paddingLeft: 16,
              fontSize: 11,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: `${INK}99`,
            }}
          >
            House Mazzutti
            <br />
            Academy
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: `${INK}99`,
            }}
          >
            Certificate · {courseChapter}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              letterSpacing: '0.18em',
              color: accent,
              fontWeight: 700,
            }}
          >
            № {courseIndex} / 03
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={{ padding: '60px 180px 0 90px' }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: `${INK}99`,
          }}
        >
          Certificado de conclusão
        </div>

        <h1
          style={{
            fontSize: 76,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            marginTop: 24,
            color: INK,
            maxWidth: 1000,
          }}
        >
          {coursePt}
        </h1>

        <div
          style={{
            marginTop: 10,
            fontSize: 16,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: accent,
            fontWeight: 600,
          }}
        >
          {courseEn}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: `${INK}99`,
            fontStyle: 'italic',
          }}
        >
          {discipline}
        </div>

        <div style={{ marginTop: 56, fontSize: 16, lineHeight: 1.5, maxWidth: 880 }}>
          A House Mazzutti Academy certifica que
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 50,
            fontWeight: 700,
            letterSpacing: '-0.005em',
            lineHeight: 1.05,
            color: INK,
          }}
        >
          {studentName}
        </div>
        <div style={{ marginTop: 18, fontSize: 16, lineHeight: 1.5, maxWidth: 880 }}>
          concluiu integralmente o programa <strong>{coursePt}</strong> com carga horária
          de <strong>{hours} horas</strong>, no período de {fmtDate(startDate)} a {fmtDate(endDate)}.
        </div>
      </main>

      {/* RODAPÉ — assinaturas + selo */}
      <footer
        style={{
          position: 'absolute',
          left: 90,
          right: 180,
          bottom: 64,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: 56 }}>
          <SignatureBlock name={founderName} title={founderTitle} />
          <SignatureBlock name={coordinatorName} title={coordinatorTitle} />
        </div>
        <Seal accent={accent} index={courseIndex} kind={sealKind} />
      </footer>

      {/* VERIFY CODE — rodapé inferior */}
      <div
        style={{
          position: 'absolute',
          left: 90,
          bottom: 30,
          fontSize: 10,
          letterSpacing: '0.18em',
          color: `${INK}66`,
          textTransform: 'uppercase',
        }}
      >
        Verificar autenticidade: {verify}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 180,
          bottom: 30,
          fontSize: 10,
          letterSpacing: '0.22em',
          color: `${INK}66`,
        }}
      >
        {certCode} · {city}
      </div>
    </div>
  )
}

function SignatureBlock({ name, title }) {
  return (
    <div style={{ minWidth: 220 }}>
      <div
        style={{
          width: 200,
          height: 1,
          background: `${INK}33`,
          marginBottom: 10,
        }}
      />
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em' }}>{name}</div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: `${INK}99`,
          marginTop: 2,
        }}
      >
        {title}
      </div>
    </div>
  )
}
