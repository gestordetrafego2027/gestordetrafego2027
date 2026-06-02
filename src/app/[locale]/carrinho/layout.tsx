import type { ReactNode } from 'react'

// Carrinho — página transacional, fora do índice de busca.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function CarrinhoLayout({ children }: { children: ReactNode }) {
  return children
}
