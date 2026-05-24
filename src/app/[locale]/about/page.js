"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";

/**
 * ABOUT PAGE - HOUSE MAZZUTTI
 * Conversão idêntica do Stitch para React/Next.js
 */
export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            text: "Traduzimos a essência de marcas e personalidades em imagens com clareza, sofisticação e consistência.",
            author: "",
        },
        {
            text: "Direção, criação e produção sob uma única casa. Uma só conversa, do começo ao fim — sem ruído entre etapas.",
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
        <div className="page-about bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            {/* SEO Hidden H1 */}
            <h1 className="sr-only">House Mazzutti — Hub Criativo & Estratégico | Da Visão à Materialização</h1>

            {/* HEADER */}
            <Header variant="dark" />
            <main>
                {/* [0] HERO SECTION */}
                <section
                    className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0"
                    style={{ height: "105vh" }}
                >
                    <div className="absolute inset-0 z-0">
                        <Image src="/images/about/banner--04-imagem-3nsaio-house-mazzutti.png" alt="" fill sizes="100vw" quality={85} priority className="object-cover object-top" />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-4xl">
                            <span className="text-caption text-white/70 mb-6 block">SOBRE — HMZT</span>
                            <h2 className="text-h1 text-white mb-8 hmzt-hero-title">Uma só casa. Da visão à materialização.</h2>
                            <p className="text-body text-white/75 mb-12 measure-editorial">
                                Estratégia, direção criativa e produção sob um único comando — sem ruído entre etapas.
                            </p>
                            <Link
                                href="#contato"
                                className="inline-block group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500"
                            >
                                Iniciar uma conversa
                            </Link>
                        </div>
                    </div>
                </section>

                {/* [5] DIFERENCIAL SECTION */}
                <section className="min-h-[80vh] flex flex-col md:flex-row-reverse relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden h-full min-h-[500px] md:min-h-[80vh]">
                        <Image
                            alt="Direção de arte autoral — House Mazzutti"
                            src="/images/about/diferencial-mao.jpg"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={82}
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                    {/* Vertical Divider */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>

                    <div className="w-full md:w-1/2 bg-[#f5f5f5] flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-10">
                            <span className="text-caption text-neutral-600">Diferencial</span>
                            <h2 className="text-h2 text-black">O que diferencia a House não é o que fazemos.</h2>
                            <div className="space-y-5 text-body text-neutral-700">
                                <p>É como pensamos. Unimos:</p>
                                <ul className="space-y-2">
                                    <li>— sensibilidade estética</li>
                                    <li>— inteligência criativa</li>
                                    <li>— experiência de set</li>
                                    <li>— execução precisa</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* [1] HERO SECTION */}
                <section className="min-h-[calc(100vh+20px)] flex items-center bg-[#fafafa]">
                    <div className="w-full flex flex-col justify-center px-12 py-32 space-y-10 pl-[calc(3rem+15px+20px)] md:pl-[calc(6rem+15px+20px)]">
                        <span className="text-caption text-black/70">Strategic House</span>
                        <h2 className="text-h1 text-black">Vamos além da publicidade.</h2>
                        <p className="text-h4 text-[#555555] measure-editorial">Estruturamos o seu projeto para comunicar com precisão.</p>

                        {/* Progress Bars */}
                        <div className="space-y-6 pt-8 w-4/5 md:w-1/3">
                            {[
                                { label: "Estratégia", value: "92%" },
                                { label: "Posicionamento", value: "88%" },
                                { label: "Direção criativa", value: "95%" },
                                { label: "Produção", value: "85%" },
                            ].map((item, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex justify-between text-caption text-black">
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="h-[8px] bg-[#ececec] w-full relative">
                                        <div
                                            className="h-full bg-black animate-progress relative"
                                            style={{ width: item.value, "--target-width": item.value }}
                                        >
                                            <span className="percentage-tag">{item.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* [3] ORIGEM EDITORIAL */}
                <section className="min-h-[80vh] flex flex-col md:flex-row md:items-stretch relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden min-h-[500px] md:min-h-[80vh] md:self-stretch">
                        <Image
                            alt="House Mazzutti — Agência, Produtora e Direção Criativa"
                            src="/images/about/angelo-mazzutti.jpg"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={82}
                            loading="lazy"
                            className="object-cover object-top"
                        />
                    </div>
                    {/* Vertical Divider */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>

                    <div className="w-full md:w-1/2 bg-black flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-10">
                            <span className="text-caption text-neutral-400">Direção Criativa /01</span>
                            <h2 className="text-h2 text-white">Estratégia e execução. Na mesma mente.</h2>
                            <div className="space-y-5 text-body text-neutral-300">
                                <p>Mente formada na publicidade e forjada nos sets das maiores celebridades do Brasil — da Larissa Manoela à família Abravanel. Quinze anos de audiovisual e fotografia traduzidos em direção criativa autoral, com presença em cada decisão crítica do projeto.</p>
                                <p>Cada peça que sai da House passa pela sua supervisão direta: do briefing estratégico ao acabamento final. É o que garante que a essência da marca chegue intacta — sem ruído entre o conceito e o pixel.</p>
                                <p className="italic text-neutral-400">"Toda imagem que entrego carrega uma decisão de mercado. Estética sem propósito é apenas decoração."</p>
                            </div>
                            <div className="pt-6">
                                <div className="text-h3 text-white/90">Angelo Mazzutti</div>
                                <div className="text-caption text-neutral-500 mt-2">Head of Creative & Brand Strategy</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* [6] METODOLOGIA */}
                <section className="bg-white text-black py-40 overflow-hidden relative">
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none">
                        <span className="text-[20vw] font-headline tracking-[-0.05em] font-bold select-none leading-[0.85] translate-y-[15%]" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.1)', color: 'transparent' }}>Método</span>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-24">
                        <h2 className="text-h2 text-black text-center mb-32 max-w-3xl mx-auto">Nada começa na execução. Tudo começa no entendimento.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            {[
                                { num: "01 / Imersão", desc: "Mergulho no DNA e nos objetivos do projeto." },
                                { num: "02 / Leitura", desc: "Identificação de lacunas e oportunidades." },
                                { num: "03 / Conceito", desc: "Direção criativa que guia toda a entrega." },
                                { num: "04 / Execução", desc: "Produção sob supervisão direta do diretor." },
                                { num: "05 / Fine Art", desc: "Edição artesanal com acabamento editorial." }
                            ].map((item, i) => (
                                <div key={i} className="space-y-6">
                                    <span className="text-caption text-neutral-700 block">{item.num}</span>
                                    <div className="h-px bg-neutral-300 w-full"></div>
                                    <p className="text-body text-neutral-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* [6.5] PRODUÇÃO EXECUTIVA — MATEUS SACAVEM */}
                <section className="min-h-[80vh] flex flex-col md:flex-row md:items-stretch relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden min-h-[500px] md:min-h-[80vh] md:self-stretch">
                        <Image
                            alt="Mateus Sacavem — Produtor Executivo da House Mazzutti"
                            src="/images/about/mateus-sacavem.jpg"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={82}
                            loading="lazy"
                            className="object-cover object-top"
                        />
                    </div>
                    {/* Vertical Divider */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#1a1a1a] z-10"></div>

                    <div className="w-full md:w-1/2 bg-black flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-10">
                            <span className="text-caption text-neutral-400">Produção Executiva /02</span>
                            <h2 className="text-h2 text-white">Sem operação, a ideia não materializa.</h2>
                            <div className="space-y-5 text-body text-neutral-300">
                                <p>Mateus Sacavem comanda a operação executiva da House — coordenação técnica, cronogramas, produção e integração de equipes especializadas. É a engrenagem que sustenta cada projeto, da pré-produção ao master final.</p>
                                <p>Domínio em operações de alta complexidade: campanhas de moda, fashion films, ensaios premium e produções com celebridades. Onde a ambição criativa encontra estrutura real — equipe certa, prazos honestos, set sob controle.</p>
                                <p className="italic text-neutral-400">"Excelência criativa exige excelência operacional."</p>
                            </div>
                            <div className="pt-6">
                                <div className="text-h3 text-white/90">Mateus Sacavem</div>
                                <div className="text-caption text-neutral-500 mt-2">Head of Production & Operations</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* [4] COMO FUNCIONAMOS SECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="text-caption text-zinc-400 mb-6 block">Boutique 360 — Unidades House</span>
                                <h2 className="text-h2 text-white">Quatro frentes. Uma só conversa.</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    {
                                        title: "AGÊNCIA",
                                        subtitle: "Estratégias de marketing para o seu negócio.",
                                        items: ["Branding project", "Web development", "Campanha integrada 360"]
                                    },
                                    {
                                        title: "STUDIO",
                                        subtitle: "Direção de imagem e conteúdo pessoal.",
                                        items: ["Book model", "Ensaio profissional", "Cobertura pessoal"]
                                    },
                                    {
                                        title: "PRODUTORA",
                                        subtitle: "Produção Executiva Para Campanhas.",
                                        items: ["Campanha de moda", "Campanha de beleza", "Conteúdo institucional"]
                                    },
                                    {
                                        title: "COMUNIDADE",
                                        subtitle: "Ambiente de relacionamento e conexões.",
                                        items: ["Área do cliente", "Central do aluno", "Nossos parceiros", "Casting e vagas"]
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined">
                                        <div>
                                            <h3 className="text-h3 mb-6 group-hover:text-white uppercase">{card.title}</h3>
                                            {card.subtitle && <p className="text-body text-on-surface-variant mb-12 group-hover:text-white/70">{card.subtitle}</p>}
                                            <ul className="space-y-4 mb-12">
                                                {card.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-body text-on-surface-variant group-hover:text-white/80">
                                                        <span className="material-symbols-outlined text-lg">check</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button className="w-full border border-black py-5 text-button hover:bg-black hover:text-white transition-all duration-500 group-hover:border-white group-hover:text-white">
                                            Saiba mais
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* [2] DEPOIMENTOS SECTION */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center h-[480px] max-h-[480px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-bold text-[18vw] tracking-[-0.05em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-40">Depoimentos</span>
                    </div>

                    {/* Navigation */}
                    <div className="absolute left-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={prevSlide}>
                            <div className="custom-nav-line mr-2"></div>
                            <svg className="transform -translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={nextSlide}>
                            <svg className="transform translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            <div className="custom-nav-line ml-2"></div>
                        </button>
                    </div>

                    {/* Slides */}
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <span className="text-caption text-zinc-500 block mb-4">O que dizem</span>
                            <h2 className="text-h2 text-white">Depoimentos</h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1" style={{height: '220px', display: 'flex', alignItems: 'center'}}>
                                {testimonials.map((t, i) => (
                                    <div key={i} className={`testimonial-slide flex flex-col justify-center ${currentSlide === i ? "active" : ""}`}>
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">
                                            “{t.text}”
                                        </h3>
                                        {t.author && (
                                            <div className="pt-6">
                                                <p className="text-caption text-white/80">{t.author}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Indicators */}
                            <div className="flex space-x-3 pt-4">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${currentSlide === i ? "opacity-100" : "opacity-30"}`}
                                        onClick={() => goToSlide(i)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <ClientLogos />

                {/* [7] CTA */}
                <section className="bg-black py-40 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white hmzt-hero-title">
                            Imagem é consequência. Posicionamento é direção.
                        </h2>
                        <div className="flex flex-col items-center space-y-10">
                            <Link className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500" href="/contato">
                                Iniciar uma conversa
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
                <div className="flex flex-col items-center text-center">
                    <div className="text-neutral-50 mb-12">
                        <span className="hm-logo" style={{fontSize: '40px'}}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                    </div>
                    <div className="flex space-x-10 mb-16">
                        <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="#">Instagram</a>
                        <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="#">LinkedIn</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/">Home</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/about">Sobre</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/studio">Studio</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/portfolio">Portfólio</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/blog">Blog</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/contato">Contato</Link>
                    </nav>
                    <div className="text-caption text-neutral-700">
                        © 2026 House Mazzutti. Todos os direitos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
