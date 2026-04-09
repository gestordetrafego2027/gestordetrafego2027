import Link from 'next/link'

export default function Header() {
    return (
        <header className="fixed top-0 w-full flex justify-between items-center px-12 py-10 z-50 bg-transparent">
            <div className="text-lg font-serif tracking-tight text-white uppercase font-headline">
                House Mazzutti
            </div>
            <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12">
                <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/">HOME</Link>
                <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/about">SOBRE</Link>
                <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/studio">STUDIO</Link>
                <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/portfolio">PORTFÓLIO</Link>
                <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/blog">BLOG</Link>
                <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/contato">CONTATO</Link>
            </nav>
            <div className="flex items-center space-x-6 text-white">
                <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform">
                    <span className="material-symbols-outlined" data-icon="search">search</span>
                </button>
                <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform flex flex-col space-y-1.5 w-6">
                    <span className="block w-full h-[1px] bg-current"></span>
                    <span className="block w-full h-[1px] bg-current"></span>
                    <span className="block w-full h-[1px] bg-current"></span>
                </button>
            </div>
        </header>
    )
}
