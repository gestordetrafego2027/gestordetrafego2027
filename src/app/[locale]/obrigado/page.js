import Countdown from './Countdown'

const SUBHEADINGS = {
  studio: 'Em breve nossa equipe do Studio entrará em contato.',
  produtora: 'Em breve nossa equipe da Produtora entrará em contato.',
  agencia: 'Em breve nossa equipe da Agência entrará em contato.',
}

export const metadata = {
  title: 'Obrigado — House Mazzutti',
  robots: { index: false, follow: false },
}

export default async function ObrigadoPage({ searchParams }) {
  const params = (await searchParams) || {}
  const fromRaw = params.from
  const from = Array.isArray(fromRaw) ? fromRaw[0] : fromRaw
  const subheading = SUBHEADINGS[from] || 'Em breve nossa equipe entrará em contato.'

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="font-headline text-5xl md:text-7xl text-black">Obrigado!</h1>
        <p className="font-body text-lg md:text-xl text-zinc-600 mt-4 max-w-xl">{subheading}</p>
        <Countdown seconds={5} />
      </div>
    </main>
  )
}
