/**
 * HmBullet — bullet editorial da House Mazzutti.
 * Mini "H" em outline, pensado pra anteceder itens de lista em landings.
 * Padrão: 12px, peso fino (1.2). Tamanhos `sm` (10) e `lg` (16) opcionais.
 *
 * Uso:
 *   <li>
 *     <HmBullet />
 *     {item}
 *   </li>
 */
export default function HmBullet({ size = 'md', className = '' }) {
  const px = size === 'sm' ? 10 : size === 'lg' ? 16 : 12
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 inline-block ${className}`}
      style={{ verticalAlign: 'middle' }}
    >
      <line x1="3" y1="2" x2="3" y2="10" />
      <line x1="9" y1="2" x2="9" y2="10" />
      <line x1="3" y1="6" x2="9" y2="6" />
    </svg>
  )
}
