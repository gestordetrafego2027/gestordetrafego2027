/**
 * Capas inline para produtos da loja.
 * Tipografia: RocGroteskCondensed 400 (light) + 700 (bold) — padrão logo HOUSE MAZZUTTI.
 * Renderiza inline no DOM para herdar a fonte já carregada pela página.
 */

type CoverProps = { className?: string }

const COND = "'RocGroteskCondensed','RocGrotesk',sans-serif"

/** Rodapé "HOUSE MAZZUTTI" replicando o logo exato */
function BrandMark({ color = '#2e2e2e' }: { color?: string }) {
  return (
    <text x="40" y="756" fontFamily={COND} fontSize="9" letterSpacing="1">
      <tspan fontWeight="400" fill={color}>
        HOUSE{' '}
      </tspan>
      <tspan fontWeight="700" fill={color}>
        MAZZUTTI
      </tspan>
    </text>
  )
}

// ─── ACADEMY ─────────────────────────────────────────────────────────────────

export function CoverDirecaoCriativaAcademy({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#0f0f0f" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1d1d1d" strokeWidth="1" />
      <line x1="0" y1="200" x2="600" y2="800" stroke="#161616" strokeWidth="1" />
      <line x1="200" y1="0" x2="600" y2="533" stroke="#161616" strokeWidth="1" />
      <line x1="0" y1="0" x2="600" y2="600" stroke="#161616" strokeWidth="0.5" />

      {/* label */}
      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#5a4a2e"
      >
        HMZT ACADEMY
      </text>
      <line x1="40" y1="78" x2="220" y2="78" stroke="#222" strokeWidth="1" />

      {/* decorativo */}
      <text x="300" y="330" fontFamily={COND} fontSize="110" fill="#1a1a1a" textAnchor="middle">
        ✦
      </text>

      {/* nome: "Direção" light / "Criativa" bold */}
      <text x="40" y="502" fontFamily={COND} fontSize="72" fontWeight="400" fill="#f0ede8">
        Direção
      </text>
      <text x="40" y="580" fontFamily={COND} fontSize="72" fontWeight="700" fill="#f0ede8">
        Criativa
      </text>

      <text
        x="40"
        y="618"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#3a3a3a"
      >
        CURSO ON-LINE
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#1a1a1a" strokeWidth="1" />
      <BrandMark color="#2e2e2e" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#2e2e2e" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverMarketingInfluenciaAcademy({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#0f0f0f" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1d1d1d" strokeWidth="1" />
      <circle cx="300" cy="280" r="180" fill="none" stroke="#161616" strokeWidth="1" />
      <circle cx="300" cy="280" r="130" fill="none" stroke="#181818" strokeWidth="1" />
      <circle cx="300" cy="280" r="80" fill="none" stroke="#1e1e1e" strokeWidth="1" />
      <circle cx="300" cy="280" r="30" fill="#181818" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#5a4a2e"
      >
        HMZT ACADEMY
      </text>
      <line x1="40" y1="78" x2="220" y2="78" stroke="#222" strokeWidth="1" />

      {/* "Marketing de" light / "Influência" bold */}
      <text x="40" y="490" fontFamily={COND} fontSize="62" fontWeight="400" fill="#f0ede8">
        Marketing de
      </text>
      <text x="40" y="562" fontFamily={COND} fontSize="72" fontWeight="700" fill="#c8aa80">
        Influência
      </text>

      <text
        x="40"
        y="604"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#3a3a3a"
      >
        CURSO ON-LINE
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#1a1a1a" strokeWidth="1" />
      <BrandMark color="#2e2e2e" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#2e2e2e" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverProducaoExecutivaAcademy({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#0f0f0f" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1d1d1d" strokeWidth="1" />
      <rect x="20" y="460" width="560" height="60" fill="#161616" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#5a4a2e"
      >
        HMZT ACADEMY
      </text>
      <line x1="40" y1="78" x2="220" y2="78" stroke="#222" strokeWidth="1" />

      {/* grande numeral decorativo */}
      <text x="40" y="400" fontFamily={COND} fontSize="260" fontWeight="700" fill="#161616">
        03
      </text>

      <text
        x="40"
        y="492"
        fontFamily={COND}
        fontSize="9"
        letterSpacing="5"
        fontWeight="400"
        fill="#6b5a3e"
      >
        MÓDULO AVANÇADO
      </text>

      {/* "Produção" light / "Executiva" bold */}
      <text x="40" y="572" fontFamily={COND} fontSize="68" fontWeight="400" fill="#f0ede8">
        Produção
      </text>
      <text x="40" y="646" fontFamily={COND} fontSize="68" fontWeight="700" fill="#f0ede8">
        Executiva
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#1a1a1a" strokeWidth="1" />
      <BrandMark color="#2e2e2e" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#2e2e2e" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

// ─── STUDIO ───────────────────────────────────────────────────────────────────

export function CoverBookStudio({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f0ede8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#ddd6cc" strokeWidth="1" />
      <circle cx="300" cy="290" r="190" fill="none" stroke="#e4dfd6" strokeWidth="1" />
      <circle cx="300" cy="290" r="145" fill="none" stroke="#e8e2d8" strokeWidth="1" />
      <circle cx="300" cy="290" r="100" fill="none" stroke="#ddd6cc" strokeWidth="1.5" />
      <circle cx="300" cy="290" r="55" fill="none" stroke="#d8d0c4" strokeWidth="1" />
      <circle cx="300" cy="290" r="18" fill="#ddd6cc" />
      <line x1="300" y1="100" x2="300" y2="480" stroke="#e4dfd6" strokeWidth="0.5" />
      <line x1="110" y1="290" x2="490" y2="290" stroke="#e4dfd6" strokeWidth="0.5" />
      <line x1="166" y1="156" x2="434" y2="424" stroke="#e4dfd6" strokeWidth="0.5" />
      <line x1="434" y1="156" x2="166" y2="424" stroke="#e4dfd6" strokeWidth="0.5" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#9a8a7a"
      >
        STUDIO
      </text>
      <line x1="40" y1="78" x2="140" y2="78" stroke="#d8d0c8" strokeWidth="1" />

      {/* "Book" light / "Studio" bold */}
      <text x="40" y="560" fontFamily={COND} fontSize="80" fontWeight="400" fill="#111">
        Book
      </text>
      <text x="40" y="644" fontFamily={COND} fontSize="80" fontWeight="700" fill="#111">
        Studio
      </text>

      <text
        x="40"
        y="680"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#b0a090"
      >
        FOTOGRAFIA DE IMAGEM PESSOAL
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c8bfb5" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c8bfb5" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverCobertura({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f0ede8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#ddd6cc" strokeWidth="1" />
      {[80, 140, 200, 260, 320, 380, 440, 500].map((x) => (
        <circle key={`r1-${x}`} cx={x} cy="160" r="3" fill="#e8e2d8" />
      ))}
      {[110, 170, 230, 290, 350, 410, 470].map((x) => (
        <circle key={`r2-${x}`} cx={x} cy="200" r="3" fill="#ece6dc" />
      ))}
      {[80, 140, 200, 260, 320, 380, 440, 500].map((x) => (
        <circle key={`r3-${x}`} cx={x} cy="240" r="2.5" fill="#eee8de" />
      ))}
      {[110, 170, 230, 290, 350, 410, 470].map((x) => (
        <circle key={`r4-${x}`} cx={x} cy="280" r="2" fill="#f0ebe3" />
      ))}
      {[80, 140, 200, 260, 320, 380, 440, 500].map((x) => (
        <circle key={`r5-${x}`} cx={x} cy="320" r="1.5" fill="#f2ede7" />
      ))}

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#9a8a7a"
      >
        STUDIO
      </text>
      <line x1="40" y1="78" x2="140" y2="78" stroke="#d8d0c8" strokeWidth="1" />

      {/* "Cobertura &" light / "Concierge" bold */}
      <text x="40" y="510" fontFamily={COND} fontSize="64" fontWeight="400" fill="#111">
        Cobertura &amp;
      </text>
      <text x="40" y="586" fontFamily={COND} fontSize="72" fontWeight="700" fill="#111">
        Concierge
      </text>

      <text
        x="40"
        y="624"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#b0a090"
      >
        PRODUÇÃO EXECUTIVA · EVENTOS
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c8bfb5" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c8bfb5" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverEnsaioPessoal({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f0ede8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#ddd6cc" strokeWidth="1" />
      <line x1="480" y1="20" x2="480" y2="580" stroke="#e8e2d8" strokeWidth="1" />
      <line x1="520" y1="20" x2="520" y2="480" stroke="#ece6dc" strokeWidth="0.5" />

      {/* E decorativo condensed bold */}
      <text
        x="280"
        y="400"
        fontFamily={COND}
        fontSize="320"
        fontWeight="700"
        fill="#eae6e0"
        textAnchor="middle"
      >
        E
      </text>

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#9a8a7a"
      >
        STUDIO
      </text>
      <line x1="40" y1="78" x2="140" y2="78" stroke="#d8d0c8" strokeWidth="1" />

      {/* "Ensaio" light / "Pessoal" bold */}
      <text x="40" y="562" fontFamily={COND} fontSize="76" fontWeight="400" fill="#111">
        Ensaio
      </text>
      <text x="40" y="644" fontFamily={COND} fontSize="76" fontWeight="700" fill="#111">
        Pessoal
      </text>

      <text
        x="40"
        y="680"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#b0a090"
      >
        FOTOGRAFIA AUTORAL
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c8bfb5" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c8bfb5" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

// ─── AGÊNCIA ──────────────────────────────────────────────────────────────────

export function CoverBrandingProject({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#111" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1e1e1e" strokeWidth="1" />

      {/* B decorativo condensed bold */}
      <text x="-60" y="500" fontFamily={COND} fontSize="500" fontWeight="700" fill="#181818">
        B
      </text>

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#4a4a4a"
      >
        AGÊNCIA
      </text>
      <line x1="40" y1="78" x2="160" y2="78" stroke="#222" strokeWidth="1" />

      {/* "Branding" light / "Project" bold */}
      <text x="40" y="534" fontFamily={COND} fontSize="72" fontWeight="400" fill="#f0ede8">
        Branding
      </text>
      <text x="40" y="614" fontFamily={COND} fontSize="72" fontWeight="700" fill="#f0ede8">
        Project
      </text>

      <text
        x="40"
        y="652"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#3a3a3a"
      >
        IDENTIDADE VISUAL · ESTRATÉGIA
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#1e1e1e" strokeWidth="1" />
      <BrandMark color="#2e2e2e" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#2e2e2e" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverCampanhaLancamento({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#111" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1e1e1e" strokeWidth="1" />
      <path d="M 300 520 A 80 80 0 0 1 300 360" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M 300 540 A 130 130 0 0 1 300 280" fill="none" stroke="#181818" strokeWidth="1.5" />
      <path d="M 300 560 A 190 190 0 0 1 300 180" fill="none" stroke="#161616" strokeWidth="1.5" />
      <path d="M 300 580 A 260 260 0 0 1 300 60" fill="none" stroke="#141414" strokeWidth="1" />
      <circle cx="300" cy="440" r="6" fill="#2a2a2a" />
      <circle cx="300" cy="440" r="2" fill="#3a3a3a" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#4a4a4a"
      >
        AGÊNCIA
      </text>
      <line x1="40" y1="78" x2="160" y2="78" stroke="#222" strokeWidth="1" />

      {/* "Campanha de" light / "Lançamento" bold */}
      <text x="40" y="514" fontFamily={COND} fontSize="60" fontWeight="400" fill="#f0ede8">
        Campanha de
      </text>
      <text x="40" y="590" fontFamily={COND} fontSize="72" fontWeight="700" fill="#c8aa80">
        Lançamento
      </text>

      <text
        x="40"
        y="630"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#3a3a3a"
      >
        ESTRATÉGIA · MÍDIA · CRIAÇÃO
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#1e1e1e" strokeWidth="1" />
      <BrandMark color="#2e2e2e" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#2e2e2e" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverDesenvolvimentoWeb({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#111" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1e1e1e" strokeWidth="1" />
      {[120, 160, 200, 240, 280, 320, 360, 400, 440].map((y, i) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2={[580, 580, 440, 500, 360, 420, 300, 380, 260][i]}
          y2={y}
          stroke="#151515"
          strokeWidth="1"
        />
      ))}
      <rect x="40" y="148" width="3" height="44" fill="#1d1d1d" />
      <rect x="60" y="188" width="3" height="64" fill="#1a1a1a" />
      <rect x="80" y="228" width="3" height="44" fill="#1a1a1a" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#4a4a4a"
      >
        AGÊNCIA
      </text>
      <line x1="40" y1="78" x2="160" y2="78" stroke="#222" strokeWidth="1" />

      {/* "Desenvolvimento" light / "Web" bold */}
      <text x="40" y="530" fontFamily={COND} fontSize="64" fontWeight="400" fill="#f0ede8">
        Desenvolvi-
      </text>
      <text x="40" y="600" fontFamily={COND} fontSize="64" fontWeight="400" fill="#f0ede8">
        mento
      </text>
      <text x="40" y="672" fontFamily={COND} fontSize="72" fontWeight="700" fill="#c8aa80">
        Web
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#1e1e1e" strokeWidth="1" />
      <BrandMark color="#2e2e2e" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#2e2e2e" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverRpMktDireto({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#111" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1e1e1e" strokeWidth="1" />
      <line x1="100" y1="20" x2="580" y2="380" stroke="#161616" strokeWidth="1" />
      <line x1="40" y1="20" x2="580" y2="460" stroke="#151515" strokeWidth="1" />
      <line x1="20" y1="60" x2="580" y2="560" stroke="#141414" strokeWidth="1" />
      <line x1="20" y1="160" x2="580" y2="660" stroke="#131313" strokeWidth="1" />
      <line x1="20" y1="260" x2="500" y2="740" stroke="#121212" strokeWidth="1" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#4a4a4a"
      >
        AGÊNCIA
      </text>
      <line x1="40" y1="78" x2="160" y2="78" stroke="#222" strokeWidth="1" />

      {/* "RP &" light / "Marketing" light / "Direto" bold */}
      <text x="40" y="498" fontFamily={COND} fontSize="72" fontWeight="400" fill="#f0ede8">
        RP &amp;
      </text>
      <text x="40" y="574" fontFamily={COND} fontSize="72" fontWeight="400" fill="#f0ede8">
        Marketing
      </text>
      <text x="40" y="650" fontFamily={COND} fontSize="72" fontWeight="700" fill="#c8aa80">
        Direto
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#1e1e1e" strokeWidth="1" />
      <BrandMark color="#2e2e2e" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#2e2e2e" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

// ─── PRODUTORA ────────────────────────────────────────────────────────────────

export function CoverDirecaoCriativa({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f5f0e8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e0d8cc" strokeWidth="1" />
      <line x1="40" y1="300" x2="560" y2="300" stroke="#e8e0d4" strokeWidth="1" />
      <line x1="40" y1="340" x2="460" y2="340" stroke="#ece4d8" strokeWidth="1" />
      <line x1="40" y1="380" x2="380" y2="380" stroke="#eee8dc" strokeWidth="1" />
      <polygon points="540,290 560,300 540,310" fill="#ddd6c8" />
      <line x1="300" y1="100" x2="300" y2="260" stroke="#e4dccc" strokeWidth="1.5" />
      <line x1="220" y1="180" x2="380" y2="180" stroke="#e4dccc" strokeWidth="1.5" />
      <line x1="243" y1="123" x2="357" y2="237" stroke="#e8e0d0" strokeWidth="1" />
      <line x1="357" y1="123" x2="243" y2="237" stroke="#e8e0d0" strokeWidth="1" />
      <circle cx="300" cy="180" r="12" fill="#ddd6c8" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#8a7a6a"
      >
        PRODUTORA
      </text>
      <line x1="40" y1="78" x2="180" y2="78" stroke="#d8d0c4" strokeWidth="1" />

      {/* "Direção &" light / "Criação" light / "Estratégica" bold */}
      <text x="40" y="490" fontFamily={COND} fontSize="62" fontWeight="400" fill="#111">
        Direção &amp;
      </text>
      <text x="40" y="558" fontFamily={COND} fontSize="62" fontWeight="400" fill="#111">
        Criação
      </text>
      <text x="40" y="630" fontFamily={COND} fontSize="62" fontWeight="700" fill="#6a5a48">
        Estratégica
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c0b8ac" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c0b8ac" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverEditorialModa({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f5f0e8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e0d8cc" strokeWidth="1" />
      <line x1="20" y1="100" x2="580" y2="100" stroke="#ede6d8" strokeWidth="1" />
      <line x1="400" y1="100" x2="400" y2="500" stroke="#ede6d8" strokeWidth="1" />
      <line x1="20" y1="500" x2="400" y2="500" stroke="#ede6d8" strokeWidth="1" />
      <rect x="420" y="120" width="140" height="360" fill="#ece5d6" />

      {/* M decorativo condensed bold */}
      <text x="30" y="480" fontFamily={COND} fontSize="360" fontWeight="700" fill="#ede6d8">
        M
      </text>

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#8a7a6a"
      >
        PRODUTORA
      </text>
      <line x1="40" y1="78" x2="180" y2="78" stroke="#d8d0c4" strokeWidth="1" />

      {/* "Editorial" light / "de Moda" bold */}
      <text x="40" y="562" fontFamily={COND} fontSize="76" fontWeight="400" fill="#111">
        Editorial
      </text>
      <text x="40" y="644" fontFamily={COND} fontSize="76" fontWeight="700" fill="#111">
        de Moda
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c0b8ac" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c0b8ac" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverProducaoCorporativa({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f5f0e8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e0d8cc" strokeWidth="1" />
      {[
        [80, 120],
        [200, 120],
        [320, 120],
        [440, 120],
        [80, 240],
        [320, 240],
        [80, 360],
        [200, 360],
        [440, 360],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="100"
          height="100"
          fill="none"
          stroke="#e4dccf"
          strokeWidth="1"
        />
      ))}
      {[
        [200, 240],
        [440, 240],
        [320, 360],
      ].map(([x, y]) => (
        <rect key={`f-${x}-${y}`} x={x} y={y} width="100" height="100" fill="#ece5d6" />
      ))}

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#8a7a6a"
      >
        PRODUTORA
      </text>
      <line x1="40" y1="78" x2="180" y2="78" stroke="#d8d0c4" strokeWidth="1" />

      {/* "Produção" light / "Corporativa" bold / "& Institucional" light menor */}
      <text x="40" y="520" fontFamily={COND} fontSize="66" fontWeight="400" fill="#111">
        Produção
      </text>
      <text x="40" y="592" fontFamily={COND} fontSize="66" fontWeight="700" fill="#111">
        Corporativa
      </text>
      <text x="40" y="650" fontFamily={COND} fontSize="52" fontWeight="400" fill="#6a5a48">
        &amp; Institucional
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c0b8ac" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c0b8ac" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverProducaoEducacao({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f5f0e8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e0d8cc" strokeWidth="1" />
      <line x1="300" y1="120" x2="300" y2="460" stroke="#ddd6c8" strokeWidth="1.5" />
      {[140, 172, 204, 236, 268, 300, 332, 364, 396, 428].map((y) => (
        <line key={`l-${y}`} x1="80" y1={y} x2="280" y2={y} stroke="#ece4d6" strokeWidth="1" />
      ))}
      {[140, 172, 204, 236, 268, 300, 332, 364, 396, 428].map((y, i) => (
        <line
          key={`r-${y}`}
          x1="320"
          y1={y}
          x2={[520, 480, 500, 460, 490, 450, 520, 470, 500, 440][i]}
          y2={y}
          stroke="#ece4d6"
          strokeWidth="1"
        />
      ))}

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#8a7a6a"
      >
        PRODUTORA
      </text>
      <line x1="40" y1="78" x2="180" y2="78" stroke="#d8d0c4" strokeWidth="1" />

      {/* "Produção de" light / "Educação" bold */}
      <text x="40" y="520" fontFamily={COND} fontSize="68" fontWeight="400" fill="#111">
        Produção de
      </text>
      <text x="40" y="602" fontFamily={COND} fontSize="76" fontWeight="700" fill="#6a5a48">
        Educação
      </text>

      <text
        x="40"
        y="642"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#a09080"
      >
        CURSOS · CONTEÚDO · E-LEARNING
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c0b8ac" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c0b8ac" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverProducaoEventos({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f5f0e8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e0d8cc" strokeWidth="1" />
      <polygon points="300,120 120,460 480,460" fill="none" stroke="#e8e0d2" strokeWidth="1" />
      <polygon points="300,140 160,460 440,460" fill="none" stroke="#ece4d6" strokeWidth="1" />
      <polygon points="300,160 200,460 400,460" fill="none" stroke="#ede7d9" strokeWidth="0.5" />
      <line x1="80" y1="460" x2="520" y2="460" stroke="#ddd6c8" strokeWidth="1.5" />
      <circle cx="300" cy="120" r="8" fill="#e4dccc" />
      <circle cx="300" cy="120" r="3" fill="#d8d0c4" />

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#8a7a6a"
      >
        PRODUTORA
      </text>
      <line x1="40" y1="78" x2="180" y2="78" stroke="#d8d0c4" strokeWidth="1" />

      {/* "Produção de" light / "Eventos" bold */}
      <text x="40" y="540" fontFamily={COND} fontSize="68" fontWeight="400" fill="#111">
        Produção de
      </text>
      <text x="40" y="618" fontFamily={COND} fontSize="80" fontWeight="700" fill="#6a5a48">
        Eventos
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c0b8ac" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c0b8ac" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

export function CoverPublicidadeCampanha({ className }: CoverProps) {
  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="800" fill="#f5f0e8" />
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e0d8cc" strokeWidth="1" />

      {/* P decorativo condensed bold */}
      <text x="-40" y="450" fontFamily={COND} fontSize="460" fontWeight="700" fill="#ede7dc">
        P
      </text>

      <text
        x="40"
        y="66"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="5"
        fontWeight="400"
        fill="#8a7a6a"
      >
        PRODUTORA
      </text>
      <line x1="40" y1="78" x2="180" y2="78" stroke="#d8d0c4" strokeWidth="1" />

      {/* "Publicidade" light / "& Campanha" bold */}
      <text x="40" y="528" fontFamily={COND} fontSize="68" fontWeight="400" fill="#111">
        Publicidade
      </text>
      <text x="40" y="606" fontFamily={COND} fontSize="68" fontWeight="700" fill="#6a5a48">
        &amp; Campanha
      </text>

      <text
        x="40"
        y="646"
        fontFamily={COND}
        fontSize="8"
        letterSpacing="4"
        fontWeight="400"
        fill="#a09080"
      >
        FILME · FOTO · CONCEITO CRIATIVO
      </text>

      <line x1="40" y1="736" x2="560" y2="736" stroke="#ddd6cc" strokeWidth="1" />
      <BrandMark color="#c0b8ac" />
      <text x="560" y="756" fontFamily={COND} fontSize="10" fill="#c0b8ac" textAnchor="end">
        ✦
      </text>
    </svg>
  )
}

// ─── MAP slug → component ─────────────────────────────────────────────────────

export const COVER_MAP: Record<string, React.ComponentType<CoverProps>> = {
  'direcao-criativa-academy': CoverDirecaoCriativaAcademy,
  'marketing-de-influencia-academy': CoverMarketingInfluenciaAcademy,
  'producao-executiva-academy': CoverProducaoExecutivaAcademy,
  'book-studio': CoverBookStudio,
  cobertura: CoverCobertura,
  'ensaio-pessoal': CoverEnsaioPessoal,
  'branding-project': CoverBrandingProject,
  'campanha-lancamento': CoverCampanhaLancamento,
  'desenvolvimento-web': CoverDesenvolvimentoWeb,
  'rp-mkt-direto': CoverRpMktDireto,
  'direcao-criativa': CoverDirecaoCriativa,
  'editorial-moda': CoverEditorialModa,
  'producao-corporativa': CoverProducaoCorporativa,
  'producao-educacao': CoverProducaoEducacao,
  'producao-eventos': CoverProducaoEventos,
  'publicidade-campanha': CoverPublicidadeCampanha,
}
