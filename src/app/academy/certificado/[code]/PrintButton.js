'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        background: '#0E0D0B',
        color: '#fff',
        padding: '10px 16px',
        borderRadius: 10,
        border: 'none',
        cursor: 'pointer',
        fontSize: 12,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}
    >
      Imprimir / Salvar PDF
    </button>
  )
}
