import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  redirect('/pt/academy/casos-da-producao#comprar')
}
