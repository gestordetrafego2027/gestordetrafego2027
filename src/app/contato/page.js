"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";

export default function ContatoPage() {
    useEffect(() => {
        const handleScroll = function () {
            const nav = document.getElementById('main-nav');
            if (nav) {
                if (window.scrollY > 80) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Initial setup
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="dark antialiased" style={{minHeight: '101vh'}}>
            <style jsx global>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                body {
                    background-color: #131313;
                    color: #e5e2e1;
                }
                ::-webkit-scrollbar {
                    width: 4px;
                }
                ::-webkit-scrollbar-track {
                    background: #0a0a0a;
                }
                ::-webkit-scrollbar-thumb {
                    background: #474747;
                }
                #main-nav {
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                }
                #main-nav.scrolled {
                    background-color: #ffffff;
                    border-bottom: 0.5px solid #e0e0e0;
                }
            `}</style>



            {/* 2. HERO SECTION */}
            <Header variant="light" />

            {/* HERO SECTION CONTATO */}
            <section className="bg-white flex flex-col items-center justify-center text-center w-full h-[512px] pt-[80px]">
                <div className="h-[1px] bg-[#e0e0e0] w-16 mb-8"></div>
                <span className="font-[Raleway] uppercase tracking-[0.3em] text-[10px] text-zinc-400 block mb-4">
                    HOUSE MAZZUTTI
                </span>
                <h1 className="font-headline text-5xl md:text-6xl text-black mb-6">
                    CONTATO
                </h1>
                <p className="font-headline text-black italic text-2xl font-light mb-8">
                    Sua visão. Nossa estratégia.
                </p>
                <div className="h-[1px] bg-[#e0e0e0] w-16 mt-2"></div>
            </section>

            {/* 3. MAP + INFO SECTION */}
            <section className="flex flex-col md:flex-row w-full bg-white py-[60px] px-[40px]">
                {/* Col 1: Map */}
                <div className="w-full md:w-[60%] h-[400px] md:h-auto bg-surface-container-lowest grayscale contrast-125 opacity-90 max-w-[760px] mx-auto !h-[430px]">
                    <iframe frameBorder="0" height="430" marginHeight="0" marginWidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=pt&amp;q=Rua%20General%20Chagas%20Santos,%201058%20Vila%20Sa%C3%BAde%20S%C3%A3o%20Paulo&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" style={{ filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }} width="100%">
                    </iframe>
                </div>
                {/* Col 2: Info */}
                <div className="w-full md:w-[40%] bg-white p-12 md:p-24 flex flex-col justify-center pt-12 md:pt-0 pb-0 px-0">
                    <p className="font-['Raleway'] uppercase tracking-[0.15em] text-[11px] text-neutral-400 mb-2">LOCALIZAÇÃO</p>
                    <h2 className="font-['Newsreader'] text-4xl text-neutral-900 mb-6 font-medium">Strategic House SP</h2>
                    <div className="h-[0.5px] bg-neutral-200 w-full mb-8"></div>
                    <div className="space-y-8 mb-12">
                        <div>
                            <p className="font-['Inter'] font-light text-neutral-600 text-lg leading-relaxed">
                                Rua General Chagas Santos, 1058<br />
                                Vila Saúde, São Paulo — SP<br />
                                Brasil
                            </p>
                        </div>
                        <div className="space-y-4">
                            <a className="flex items-center gap-3 group" href="https://wa.me/5511952347533">
                                <span className="material-symbols-outlined text-neutral-400 group-hover:text-black transition-colors">chat_bubble</span>
                                <span className="font-['Inter'] text-neutral-700">(11) 95234-7533</span>
                            </a>
                            <a className="flex items-center gap-3 group" href="mailto:contato@housemazzutti.com">
                                <span className="material-symbols-outlined text-neutral-400 group-hover:text-black transition-colors">mail</span>
                                <span className="font-['Inter'] text-neutral-700">contato@housemazzutti.com</span>
                            </a>
                        </div>
                    </div>
                    <a className="inline-block border-[0.5px] border-neutral-900 px-8 py-4 font-['Raleway'] uppercase tracking-[0.1em] text-[12px] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-center" href="https://wa.me/5511952347533" target="_blank" rel="noopener noreferrer">
                        AGENDAR DIAGNÓSTICO
                    </a>
                </div>
            </section>

            {/* 4. CONTACT FORM SECTION */}
            <section className="bg-[#0f0f0f] py-[60px] px-8 md:px-16 flex justify-center border-t-[0.5px] border-white/5">
                <div className="max-w-[700px] w-full">
                    <div className="text-center mb-16">
                        <p className="font-['Raleway'] uppercase tracking-[0.15em] text-[11px] text-neutral-500 mb-3">STRATEGIC HOUSE</p>
                        <h3 className="font-['Newsreader'] text-white text-4xl md:text-5xl uppercase tracking-tight mb-4">CONTATE-NOS</h3>
                        <p className="font-['Newsreader'] italic text-white/70 text-lg">Ouvimos. Arquitetamos. Transformamos.</p>
                    </div>
                    <form className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="relative">
                                <input className="w-full bg-transparent border-b border-white/30 border-t-0 border-l-0 border-r-0 px-0 py-3 text-white placeholder-white/40 font-['Inter'] focus:ring-0 focus:border-white transition-all" id="name" placeholder="NOME" type="text" />
                            </div>
                            <div className="relative">
                                <input className="w-full bg-transparent border-b border-white/30 border-t-0 border-l-0 border-r-0 px-0 py-3 text-white placeholder-white/40 font-['Inter'] focus:ring-0 focus:border-white transition-all" id="email" placeholder="EMAIL" type="email" />
                            </div>
                        </div>
                        <div className="relative">
                            <input className="w-full bg-transparent border-b border-white/30 border-t-0 border-l-0 border-r-0 px-0 py-3 text-white placeholder-white/40 font-['Inter'] focus:ring-0 focus:border-white transition-all" id="subject" placeholder="ASSUNTO" type="text" />
                        </div>
                        <div className="relative">
                            <textarea className="w-full bg-transparent border-b border-white/30 border-t-0 border-l-0 border-r-0 px-0 py-3 text-white placeholder-white/40 font-['Inter'] focus:ring-0 focus:border-white transition-all resize-none" id="message" placeholder="SUA MENSAGEM" rows="4"></textarea>
                        </div>
                        <div className="flex flex-col items-center gap-12 pt-8">
                            <button className="w-full md:w-auto min-w-[280px] border-[0.5px] border-white px-10 py-5 font-['Raleway'] uppercase tracking-[0.2em] text-[12px] text-white hover:bg-white hover:text-black transition-all duration-300" onClick={() => window.location.href = 'mailto:contato@housemazzutti.com'} type="button">
                                ENVIAR MENSAGEM
                            </button>
                            <div className="text-center">
                                <p className="font-['Raleway'] uppercase tracking-[0.3em] text-[9px] text-white/40">Estratégia. Essência. Legado.</p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* 5. FOOTER (Shared) */}
            <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
                <div className="flex flex-col items-center text-center">
                    <div className="text-3xl font-serif text-neutral-50 mb-12">House Mazzutti</div>
                    <div className="flex space-x-8 mb-12">
                        <a className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="#">INSTAGRAM</a>
                        <a className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="#">LINKEDIN</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-16">
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/">HOME</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/about">SOBRE</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/studio">STUDIO</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/blog">BLOG</Link>
                        <Link className="font-label text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors" href="/contato">CONTATO</Link>
                    </nav>
                    <div className="font-label text-[9px] text-neutral-700">
                        © 2025 House Mazzutti. TODOS OS DIREITOS RESERVADOS.
                    </div>
                </div>
            </footer>
        </div>
    );
}
