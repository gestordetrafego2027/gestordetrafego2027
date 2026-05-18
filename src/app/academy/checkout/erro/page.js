import Link from 'next/link'
import Header from '@/app/components/Header'

export default function CheckoutErrorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24 pt-24">
        <section className="mx-auto max-w-xl px-6 py-16 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Pagamento não aprovado</h1>
          <p className="mt-3 text-neutral-600">
            Algo impediu a confirmação. Tente outra forma de pagamento ou cartão.
          </p>
          <Link href="/academy" className="mt-8 inline-block rounded-xl bg-neutral-900 px-6 py-3 text-white">
            Voltar ao catálogo
          </Link>
        </section>
      </main>
    </>
  )
}
