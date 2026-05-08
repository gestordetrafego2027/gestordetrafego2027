'use client'

import React from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'

export default function ContatoPage() {
    return (
        <div className="bg-white text-black selection:bg-black selection:text-white min-h-screen">
            <Header variant="dark" />
            
            <main>
                {/* HERO */}
                <section className="bg-white pt-40 pb-20 swiss-grid">
                    <div className="max-w-4xl">
                        <span className="label-micro text-zinc-400 mb-8 block">CONTATO</span>
                        <h1 className="hero-title text-black">Vamos iniciar um novo capítulo.</h1>
                        <p className="body-text text-zinc-500 mt-12 max-w-2xl">
                            Estamos prontos para ouvir sua visão e transformá-la em uma narrativa de impacto. Entre em contato para agendar um diagnóstico estratégico.
                        </p>
                    </div>
                </section>

                {/* INFO & MAP */}
                <section className="bg-zinc-100 py-40 swiss-grid">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div className="space-y-24">
                            <div>
                                <span className="label-micro text-zinc-400 mb-8 block">Localização</span>
                                <h3 className="subsection-title mb-6">Strategic House SP</h3>
                                <p className="body-text text-zinc-500 leading-relaxed">
                                    Rua General Chagas Santos, 1058<br />
                                    Vila Saúde, São Paulo — SP<br />
                                    Brasil
                                </p>
                            </div>
                            <div>
                                <span className="label-micro text-zinc-400 mb-8 block">Canais</span>
                                <div className="space-y-4">
                                    <p className="body-text text-black">
                                        <a href="https://wa.me/5511952347533" className="hover:opacity-50 transition-opacity">(11) 95234-7533</a>
                                    </p>
                                    <p className="body-text text-black">
                                        <a href="mailto:contato@housemazzutti.com" className="hover:opacity-50 transition-opacity">contato@housemazzutti.com</a>
                                    </p>
                                </div>
                            </div>
                            <div className="pt-8">
                                <a href="https://wa.me/5511952347533" target="_blank" rel="noopener noreferrer" className="btn-swiss">
                                    AGENDAR DIAGNÓSTICO
                                </a>
                            </div>
                        </div>
                        <div className="w-full aspect-square lg:aspect-video grayscale contrast-125 border border-zinc-200">
                            <iframe 
                                frameBorder="0" 
                                height="100%" 
                                scrolling="no" 
                                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=pt&amp;q=Rua%20General%20Chagas%20Santos,%201058%20Vila%20Sa%C3%BAde%20S%C3%A3o%20Paulo&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
                                style={{ filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }} 
                                width="100%"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* FORM SECTION */}
                <section className="bg-black py-40 swiss-grid">
                    <div className="max-w-3xl">
                        <span className="label-micro text-white/40 mb-8 block">MENSAGEM</span>
                        <h2 className="section-title text-white mb-20">Como podemos ajudar?</h2>
                        
                        <form className="space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="border-b border-white/20 pb-4">
                                    <input type="text" placeholder="NOME" className="bg-transparent w-full text-white label-micro focus:outline-none placeholder:text-white/20" />
                                </div>
                                <div className="border-b border-white/20 pb-4">
                                    <input type="email" placeholder="EMAIL" className="bg-transparent w-full text-white label-micro focus:outline-none placeholder:text-white/20" />
                                </div>
                            </div>
                            <div className="border-b border-white/20 pb-4">
                                <input type="text" placeholder="ASSUNTO" className="bg-transparent w-full text-white label-micro focus:outline-none placeholder:text-white/20" />
                            </div>
                            <div className="border-b border-white/20 pb-12">
                                <textarea placeholder="SUA MENSAGEM" rows="4" className="bg-transparent w-full text-white label-micro focus:outline-none placeholder:text-white/20 resize-none"></textarea>
                            </div>
                            <button type="button" className="btn-swiss !border-white text-white hover:bg-white hover:text-black w-full md:w-fit">
                                ENVIAR MENSAGEM
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-white py-40 swiss-grid border-t border-zinc-100">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-20">
                        <span className="hm-logo" style={{fontSize: '32px'}}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-8 mb-24">
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/">HOME</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/about">SOBRE</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/studio">STUDIO</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/agencia">AGÊNCIA</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/contato">CONTATO</Link>
                    </nav>
                    <div className="label-micro text-zinc-300">
                        © 2025 House Mazzutti — Direção de Imagem & Estratégia
                    </div>
                </div>
            </footer>
        </div>
    )
}
