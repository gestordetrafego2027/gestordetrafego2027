import Link from 'next/link'
import Header from '@/app/components/Header'

export const dynamic = 'force-dynamic'

export default async function CheckoutSuccessPage({ searchParams }) {
  const { order } = await searchParams
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="mx-auto max-w-xl px-6 py-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">✓</div>
          <h1 className="text-3xl font-semibold text-neutral-900">Pagamento confirmado!</h1>
          <p className="mt-3 text-neutral-600">
            Seu acesso está sendo liberado. {order && <>Pedido <span className="font-mono">{order}</span>.</>}
          </p>
          <Link href="/academy/dashboard" className="mt-8 inline-block rounded-xl bg-neutral-900 px-6 py-3 text-white">
            Ir para meu painel
          </Link>
        </section>
      </main>
    </>
  )
}
