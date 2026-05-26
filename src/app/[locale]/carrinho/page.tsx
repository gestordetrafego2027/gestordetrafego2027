import { notFound } from 'next/navigation'
import { featureFlags } from '@/lib/feature-flags'
import { CarrinhoClient } from './CarrinhoClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carrinho — House Mazzutti',
  robots: { index: false, follow: false },
}

export default function CarrinhoPage() {
  // Kill-switch: se a loja está OFF, esta rota não existe.
  if (!featureFlags.isStoreEnabled()) notFound()
  return <CarrinhoClient />
}
