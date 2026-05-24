import { getTranslations } from 'next-intl/server'
import Countdown from './Countdown'

export const metadata = {
  title: 'Obrigado — House Mazzutti',
  robots: { index: false, follow: false },
}

export default async function ObrigadoPage({ searchParams }) {
  const t = await getTranslations('obrigado')
  const params = (await searchParams) || {}
  const fromRaw = params.from
  const from = Array.isArray(fromRaw) ? fromRaw[0] : fromRaw

  const subKey =
    from === 'studio' ? 'studio_sub' :
    from === 'produtora' ? 'produtora_sub' :
    from === 'agencia' ? 'agencia_sub' :
    'default_sub'

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="font-headline text-5xl md:text-7xl text-black">{t('title')}</h1>
        <p className="font-body text-lg md:text-xl text-zinc-600 mt-4 max-w-xl">{t(subKey)}</p>
        <Countdown seconds={5} />
      </div>
    </main>
  )
}
