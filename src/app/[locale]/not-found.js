import { Link } from '@/i18n/navigation'
import Header from '@/app/components/Header'

export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Erro 404</p>
        <h1 className="text-6xl md:text-8xl font-light tracking-tight">Página não encontrada.</h1>
        <p className="text-white/60 max-w-md">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="mt-4 px-8 py-3 border border-white/20 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        >
          Voltar ao início
        </Link>
      </main>
    </div>
  )
}
