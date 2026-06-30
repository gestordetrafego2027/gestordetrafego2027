// Gráficos SVG inline — zero dependências. Server components.

type BarDatum = { label: string; value: number; secondary?: number }

export function BarChart({
  data,
  height = 160,
  label = '',
  formatValue,
}: {
  data: BarDatum[]
  height?: number
  label?: string
  formatValue?: (n: number) => string
}) {
  if (!data.length) {
    return <EmptyChart height={height} label={label} />
  }
  const max = Math.max(1, ...data.map((d) => d.value))
  const fmt = formatValue ?? ((n: number) => n.toLocaleString('pt-BR'))

  return (
    <div>
      {label && (
        <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">{label}</div>
      )}
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => {
          const h = (d.value / max) * (height - 24)
          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="text-[10px] tabular-nums mb-1 text-neutral-600">{fmt(d.value)}</div>
              <div
                className="w-full bg-gradient-to-t from-neutral-900 to-neutral-600 rounded-t"
                style={{ height: Math.max(2, h) }}
                title={`${d.label}: ${fmt(d.value)}`}
              />
              <div className="text-[10px] text-neutral-500 mt-1 truncate w-full text-center">
                {d.label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type LinePoint = { label: string; value: number }

export function LineChart({
  data,
  height = 160,
  label = '',
  formatValue,
}: {
  data: LinePoint[]
  height?: number
  label?: string
  formatValue?: (n: number) => string
}) {
  if (data.length < 2) {
    return <EmptyChart height={height} label={label} />
  }
  const max = Math.max(1, ...data.map((d) => d.value))
  const min = Math.min(0, ...data.map((d) => d.value))
  const range = max - min || 1
  const w = 100
  const h = 100
  const pad = 4
  const fmt = formatValue ?? ((n: number) => n.toLocaleString('pt-BR'))

  const points = data
    .map((d, i) => {
      const x = pad + (i * (w - 2 * pad)) / (data.length - 1)
      const y = h - pad - ((d.value - min) / range) * (h - 2 * pad)
      return `${x},${y}`
    })
    .join(' ')

  const areaPoints = `${pad},${h - pad} ${points} ${w - pad},${h - pad}`

  return (
    <div>
      {label && (
        <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">{label}</div>
      )}
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height, width: '100%' }}>
        <polygon points={areaPoints} fill="rgba(16,185,129,0.15)" />
        <polyline
          points={points}
          fill="none"
          stroke="rgb(16,185,129)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((d, i) => {
          const x = pad + (i * (w - 2 * pad)) / (data.length - 1)
          const y = h - pad - ((d.value - min) / range) * (h - 2 * pad)
          return <circle key={i} cx={x} cy={y} r="1.2" fill="rgb(16,185,129)" />
        })}
      </svg>
      <div className="flex justify-between mt-1 text-[10px] text-neutral-500">
        {data.map((d, i) => (
          <span key={i} className="truncate" title={`${d.label}: ${fmt(d.value)}`}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function StageFunnel({
  data,
  label = '',
}: {
  data: { stage: string; total: number; amount: number }[]
  label?: string
}) {
  if (!data.length) return <EmptyChart height={140} label={label} />
  const max = Math.max(1, ...data.map((d) => d.total))
  const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return (
    <div>
      {label && (
        <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">{label}</div>
      )}
      <div className="space-y-1">
        {data.map((d) => {
          const w = (d.total / max) * 100
          return (
            <div key={d.stage} className="flex items-center gap-2 text-xs">
              <span className="w-24 capitalize truncate">{d.stage}</span>
              <div className="flex-1 bg-neutral-100 rounded h-5 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-700 h-full transition-all"
                  style={{ width: `${w}%` }}
                />
                <span className="absolute inset-0 flex items-center px-2 text-[10px] text-white font-medium tabular-nums">
                  {d.total} · {brl(d.amount)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EmptyChart({ height, label }: { height: number; label: string }) {
  return (
    <div>
      {label && (
        <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">{label}</div>
      )}
      <div
        className="flex items-center justify-center text-xs text-neutral-400 italic border border-dashed border-neutral-200 rounded"
        style={{ height }}
      >
        sem dados ainda
      </div>
    </div>
  )
}
