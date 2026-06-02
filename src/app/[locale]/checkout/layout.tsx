import type { ReactNode } from 'react'

// Checkout — fluxo transacional, fora do índice de busca.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children
}
