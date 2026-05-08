"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";

/**
 * ABOUT PAGE - HOUSE MAZZUTTI
 * Conversão idêntica do Stitch para React/Next.js
 */
export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            text: "Da identidade visual à reputação de mercado, desenvolvemos projetos que orientam e sustentam o seu posicionamento com clareza, sofisticação e consistência.",
            author: "",
        },
        {
            text: "Unimos estratégia, direção criativa e produção audiovisual para transformar marcas e pessoas em presenças sólidas e relevantes no cenário digital e global.",
            author: "",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="bg-white text-black selection:bg-black selection:text-white">
            {/* SEO Hidden H1 */}
            <h1 className="sr-only">House Mazzutti | Branding Estratégico e Posicionamento de Marca</h1>

            {/* HEADER */}
            <Header variant="dark" />
            <main>
                <section className="min-h-screen flex items-center bg-zinc-100 swiss-grid py-40">
                    <div className="max-w-5xl">
                        <span className="label-micro text-zinc-400 mb-8 block">Strategic House</span>
                        <h1 className="hero-title mb-12">Vamos além da publicidade.</h1>
                        <p className="section-title text-zinc-500 mb-20 !max-w-2xl">Estruturamos o seu projeto para comunicar com precisão.</p>
                        
                        {/* Progress Bars */}
                        <div className="space-y-12 w-full md:w-1/2">
                            {[
                                { label: "ESTRATÉGIA", value: "92%" },
                                { label: "POSICIONAMENTO", value: "88%" },
                                { label: "DIREÇÃO CRIATIVA", value: "95%" },
                                { label: "PRODUÇÃO", value: "85%" },
                            ].map((item, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex justify-between label-micro text-black">
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="h-[1px] bg-zinc-200 w-full relative">
                                        <div 
                                            className="h-full bg-black animate-progress relative" 
                                            style={{ width: item.value, "--target-width": item.value }}
                                        >
                                            <span className="absolute right-0 bottom-4 label-micro text-black">{item.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-black py-40 swiss-grid relative overflow-hidden flex items-center justify-center">
                    <div className="relative z-10 w-full max-w-4xl text-center">
                        <div className="mb-16">
                            <span className="label-micro text-white/40 block mb-4">Depoimentos</span>
                            <h2 className="section-title text-white">Vozes do Mercado</h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden" style={{ minHeight: '220px' }}>
                                {testimonials.map((t, i) => (
                                    <div key={i} className={`testimonial-slide ${currentSlide === i ? "active" : ""}`}>
                                        <h3 className="subsection-title text-white !leading-relaxed max-w-3xl mx-auto">
                                            "{t.text}"
                                        </h3>
                                    </div>
                                ))}
                            </div>
                            {/* Indicators */}
                            <div className="flex space-x-6 pt-12">
                                {testimonials.map((_, i) => (
                                    <button 
                                        key={i} 
                                        className={`w-12 h-[0.5px] transition-all duration-700 ${currentSlide === i ? "bg-white w-20" : "bg-white/20"}`} 
                                        onClick={() => goToSlide(i)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="min-h-screen flex flex-col md:flex-row swiss-grid py-40 gap-24 items-center">
                    <div className="w-full md:w-1/2">
                        <div className="max-w-lg">
                            <span className="label-micro text-zinc-400 mb-8 block">Origem</span>
                            <h2 className="section-title mb-12">A House Mazzutti nasceu de uma convicção simples.</h2>
                            <div className="space-y-8 body-text text-zinc-500">
                                <p>Em um mercado saturado por excesso de informação, percebemos que o problema não era a falta de produção — mas a ausência de direção. Foi a partir disso que estruturamos um modelo capaz de integrar pensamento, construção e execução em um único fluxo.</p>
                                <p>Cada marca que construímos é tratada como uma obra de curadoria, onde cada detalhe — do tom de voz à textura visual — é um ativo estratégico.</p>
                                <p>No mercado saturado de ruído, a comunicação muitas vezes silenciosa e precisa é o que separa os líderes dos amadores.</p>
                            </div>
                            <div className="pt-16 subsection-title">Angelo Mazzutti</div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <img 
                                alt="Portrait profile in B&W" 
                                className="w-full h-full object-cover grayscale" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxZ7RPLEdUZ-hWLjke8oCVUX55YvTrl6zkaoBFqWY4TGbl2ydWUCpp2uWwWLAYpkV1Xq_4Mi-j3c5TUIIXNdDv3VM0sZifN8wwb08edewoo8RcV-C3YDaTC23HJrElQadL7VHuPzUFO-NDNEU5kU8U7psekoAoRRVygstSfAjuNYucXTFyEN17PVOWTtn4wqLQIKRglvMzSqrgXMnIShQSHKdhCc4LNpKtPJVA_9X66yl2XNhGh1Qh1pclEv-BQUbhBPg0swc44OM"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-white py-40 swiss-grid">
                    <div className="max-w-[1440px]">
                        <div className="mb-24">
                            <span className="label-micro text-zinc-400 mb-4 block">Frentes</span>
                            <h2 className="section-title">Como Funcionamos</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                            {[
                                {
                                    title: "AGÊNCIA",
                                    items: ["Branding Project", "Web Development", "Campanha Integrada 360"]
                                },
                                {
                                    title: "STUDIO",
                                    items: ["Book Model", "Ensaio Profissional", "Cobertura Pessoal"]
                                },
                                {
                                    title: "PRODUTORA",
                                    items: ["Campanha de Moda", "Campanha de Beleza", "Conteúdo Institucional"]
                                }
                            ].map((card, idx) => (
                                <div key={idx} className="p-16 border-[0.5px] border-zinc-100 flex flex-col justify-between h-full bg-white transition-all duration-700 ease-in-out hover:bg-black group">
                                    <div>
                                        <h3 className="subsection-title mb-12 group-hover:text-white uppercase">{card.title}</h3>
                                        <ul className="space-y-6 mb-16">
                                            {card.items.map((item, i) => (
                                                <li key={i} className="label-micro text-zinc-500 group-hover:text-white/60 flex items-center gap-3">
                                                    <span className="w-1.5 h-[0.5px] bg-zinc-300 group-hover:bg-white/30"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className="btn-swiss w-full text-center group-hover:!border-white group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-black">
                                        SAIBA MAIS
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* [5] METODOLOGIA */}
                <section className="bg-black text-white py-64 swiss-grid">
                    <div className="max-w-7xl">
                        <h2 className="section-title text-center mb-40 max-w-4xl mx-auto">Nada começa na execução. Tudo começa no entendimento.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                            {[
                                { num: "01", title: "IMERSÃO", desc: "Análise profunda do DNA e objetivos do negócio." },
                                { num: "02", title: "DIAGNÓSTICO", desc: "Identificação de lacunas e oportunidades de mercado." },
                                { num: "03", title: "CONCEITO", desc: "A espinha dorsal criativa que guiará a marca." },
                                { num: "04", title: "EXECUÇÃO", desc: "Traduzindo a estratégia em ativos visuais e verbais." },
                                { num: "05", title: "MONITORAMENTO", desc: "Garantia de consistência e evolução contínua." }
                            ].map((item, i) => (
                                <div key={i} className="space-y-8">
                                    <span className="label-micro text-white/30 block">{item.num} / {item.title}</span>
                                    <div className="h-[0.5px] bg-white/10 w-full"></div>
                                    <p className="label-micro text-white/50 !leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* [6] CTA */}
                <section className="bg-white py-64 swiss-grid text-center" id="contato">
                    <div className="max-w-5xl mx-auto space-y-24">
                        <h2 className="hero-title">
                            Se sua marca precisa de direção, estamo prontos.
                        </h2>
                        <div className="flex flex-col items-center">
                            <Link className="btn-swiss" href="/contato">
                                INICIAR CONVERSA
                            </Link>
                        </div>
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
                        <Link className="menu-item text-zinc-400 hover:text-black transition-colors" href="/">HOME</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black transition-colors" href="/about">SOBRE</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black transition-colors" href="/studio">STUDIO</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black transition-colors" href="/produtora">PRODUTORA</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black transition-colors" href="/agencia">AGÊNCIA</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black transition-colors" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black transition-colors" href="/contato">CONTATO</Link>
                    </nav>
                    <div className="label-micro text-zinc-300">
                        © 2025 House Mazzutti — Direção de Imagem & Estratégia
                    </div>
                </div>
            </footer>
        </div>
    );
}
