"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {useTranslations} from 'next-intl';
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";
import FormDrawer from "@/app/components/FormDrawer";
import FormGeral from "@/app/components/forms/FormGeral";

/**
 * HOME PAGE - HOUSE MAZZUTTI
 * Transformação completa de HTML/Stitch para React/Next.js
 */
export default function Home() {
    const t = useTranslations();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
    const [isHomeFormOpen, setIsHomeFormOpen] = useState(false);

    const heroSlides = [
        {
            label: t('hero.slide1.label'),
            titulo: t('hero.slide1.titulo'),
            texto: t('hero.slide1.texto'),
            cta: t('hero.slide1.cta'),
            link: '/studio'
        },
        {
            label: t('hero.slide2.label'),
            titulo: t('hero.slide2.titulo'),
            texto: t('hero.slide2.texto'),
            cta: t('hero.slide2.cta'),
            link: '/produtora'
        },
        {
            label: t('hero.slide3.label'),
            titulo: t('hero.slide3.titulo'),
            texto: t('hero.slide3.texto'),
            cta: t('hero.slide3.cta'),
            link: '/agencia'
        },
    ];

    const nextHeroSlide = () => {
        setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevHeroSlide = () => {
        setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextHeroSlide();
        }, 9000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Reset animations immediately
        document.querySelectorAll('.hero-animate').forEach((el) => {
            el.style.transition = 'none';
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });

        const timer = setTimeout(() => {
            document.querySelectorAll('.hero-animate').forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 150);
            });
        }, 150);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, entry.target.dataset.delay || 0);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        const parallaxEl = document.querySelector('.parallax-bg');
        const testimonialBg = document.querySelector('.parallax-testimonial');

        const handleScroll = () => {
            if (parallaxEl) {
                const rect = parallaxEl.closest('section').getBoundingClientRect();
                const offset = rect.top * 0.15;
                parallaxEl.style.transform = `translateY(${offset}px)`;
            }
            if (testimonialBg) {
                const rect2 = testimonialBg.closest('section').getBoundingClientRect();
                const offset2 = rect2.top * -0.25;
                testimonialBg.style.transform = `translate(-50%, calc(-50% + ${offset2}px))`;
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentHeroSlide]);

    const testimonials = [
        {
            text: "Não entregaram fotos. Entregaram um novo patamar para a marca. Cada escolha tinha uma razão.",
            author: "JULIANO R. — FOUNDER & CEO",
        },
        {
            text: "O Angelo não dirige uma imagem, dirige uma percepção. Foi a primeira vez que senti minha marca sendo cuidada de verdade.",
            author: "MARINA S. — DIRETORA DE ARTE",
        },
        {
            text: "Cuidado, escuta e refinamento. Uma só mente acompanhando do começo ao fim. Sem ruído, sem retrabalho.",
            author: "RICARDO M. — INVESTIDOR",
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
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            {/* NOISE OVERLAY */}
            <div className="noise-overlay fixed inset-0 z-[100] pointer-events-none opacity-5"></div>

            {/* HEADER */}
            <Header variant="dark" />
            <main>
                {/* HERO SECTION */}
                <section
                    className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0"
                    style={{ height: "105vh" }}
                >
                    <div className="absolute inset-0 z-0">
                        {/* vídeo único de fundo — permanece em loop durante todos os slides */}
                        <video
                            src="/videos/house-mazzutti-fashion-film-hero.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            poster="/images/home/banner-1.png"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-4xl fade-in">
                            <span
                                className="hero-animate text-caption text-white/70 mb-6 block"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                            >
                                {heroSlides[currentHeroSlide].label}
                            </span>
                            <h1
                                className="hero-animate text-h1 text-white mb-8 hmzt-hero-title"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                            >
                                {heroSlides[currentHeroSlide].titulo}
                            </h1>
                            <p
                                className="hero-animate text-body text-white/75 mb-12 measure-editorial"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                            >
                                {heroSlides[currentHeroSlide].texto}
                            </p>
                            <Link
                                href={heroSlides[currentHeroSlide].link}
                                className="hero-animate inline-block group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                            >
                                {heroSlides[currentHeroSlide].cta}
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 left-12 flex items-center z-20">
                        <button 
                            className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity"
                            onClick={prevHeroSlide}
                        >
                            <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                                <svg
                                    className="-ml-1"
                                    fill="none"
                                    height="20"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    width="20"
                                >
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-12 flex items-center z-20">
                        <button 
                            className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity"
                            onClick={nextHeroSlide}
                        >
                            <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                <svg
                                    className="-mr-1"
                                    fill="none"
                                    height="20"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    width="20"
                                >
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                            </div>
                        </button>
                    </div>
                </section>

                {/* SELECTED WORKS */}
                <section
                    className="bg-white py-12 mx-auto"
                    style={{ maxWidth: "95vw" }}
                >
                    <div className="mb-20 text-center flex flex-col items-center">
                        <span className="text-caption text-zinc-500 block mb-6">Obras</span>
                        <h2 className="text-h2 text-black">Trabalhos selecionados</h2>
                        <div className="line-divider mt-8 text-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {[
                            { title: "Amanda Oliveira", sub: "Book", src: "/images/studio/amanda-oliveira/capa.jpg", hover: "/images/studio/amanda-oliveira/2.jpg", link: "/portfolio-studio/amanda-oliveira" },
                            { title: "Patricia Marafon", sub: "Book", src: "/images/studio/patricia-marafon/capa.jpg", hover: "/images/studio/patricia-marafon/2.jpg", link: "/portfolio-studio/patricia-marafon" },
                            { title: "Signus - Versolato 02", sub: "Acessórios", src: "/images/produtora/acessorios/signus-versolato02/capa.jpg", hover: "/images/produtora/acessorios/signus-versolato02/2.jpg", link: "/portfolio-produtora/signus-versolato02" },
                            { title: "Elyah", sub: "Acessórios", src: "/images/produtora/acessorios/elyah/capa.jpg", hover: "/images/produtora/acessorios/elyah/2.jpg", link: "/portfolio-produtora/elyah" },
                            { title: "Knowhol", sub: "Direção de Imagem", src: "/images/agencia/knowhol/capa.jpg", hover: "/images/agencia/knowhol/2.jpg", link: "/portfolio-agencia/knowhol" },
                            { title: "Samrat", sub: "Direção de Imagem", src: "/images/agencia/samrat/capa.jpg", hover: "/images/agencia/samrat/2.jpg", link: "/portfolio-agencia/samrat" },
                        ].map((work, i) => (
                            <Link
                                key={i}
                                href={work.link}
                                className="scroll-reveal relative group bg-white aspect-[4/3] overflow-hidden block"
                                data-delay={i * 100}
                                style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
                            >
                                {/* default — capa em preto e branco */}
                                <Image
                                    alt={work.title}
                                    src={work.src}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={80}
                                    loading="lazy"
                                    className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                                />
                                {/* hover — segunda imagem do mesmo case, em cor */}
                                <Image
                                    alt=""
                                    aria-hidden="true"
                                    src={work.hover}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={80}
                                    loading="lazy"
                                    className="object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                                />
                                {/* legenda sobreposta no hover */}
                                <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/70 to-transparent">
                                    <p className="text-h4 text-white">{work.title}</p>
                                    <p className="text-caption text-white/75 mt-1">{work.sub}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>



                {/* ── SOBRE / DIFERENCIAL ────────────────────────────────── */}
                <section className="min-h-[80vh] flex flex-col md:flex-row-reverse relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden h-full min-h-[500px] md:min-h-[80vh]">
                        <Image src="/images/about/diferencial-mao.jpg" alt="Direção de arte autoral — House Mazzutti" fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} loading="lazy" className="object-cover" />
                    </div>
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

                {/* ── SOBRE / STRATEGIC HOUSE ─────────────────────────────── */}
                <section className="min-h-[calc(100vh+20px)] flex items-center bg-[#fafafa]">
                    <div className="w-full flex flex-col justify-center px-12 py-32 space-y-10 pl-[calc(3rem+15px+20px)] md:pl-[calc(6rem+15px+20px)]">
                        <span className="text-caption text-black/70">Strategic House</span>
                        <h2 className="text-h1 text-black">Vamos além da publicidade.</h2>
                        <p className="text-h4 text-[#555555] measure-editorial">Estruturamos o seu projeto para comunicar com precisão.</p>
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
                                        <div className="h-full bg-black animate-progress relative" style={{ width: item.value, "--target-width": item.value }}>
                                            <span className="percentage-tag">{item.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SOBRE / ANGELO MAZZUTTI ─────────────────────────────── */}
                <section className="min-h-[80vh] flex flex-col md:flex-row md:items-stretch relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden min-h-[500px] md:min-h-[80vh] md:self-stretch">
                        <Image alt="House Mazzutti — Agência, Produtora e Direção Criativa" src="/images/about/angelo-mazzutti.jpg" fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} loading="lazy" className="object-cover object-top" />
                    </div>
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

                {/* ── SOBRE / METODOLOGIA ─────────────────────────────────── */}
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

                {/* ── SOBRE / MATEUS SACAVEM ──────────────────────────────── */}
                <section className="min-h-[80vh] flex flex-col md:flex-row md:items-stretch relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden min-h-[500px] md:min-h-[80vh] md:self-stretch">
                        <Image alt="Mateus Sacavem — Produtor Executivo da House Mazzutti" src="/images/about/mateus-sacavem.jpg" fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} loading="lazy" className="object-cover object-top" />
                    </div>
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

                {/* ── SOBRE / QUATRO FRENTES ──────────────────────────────── */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="text-caption text-zinc-400 mb-6 block">{t('home.boutique_label')}</span>
                                <h2 className="text-h2 text-white">{t('home.boutique_titulo')}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { title: t('home.boutique_agencia_title'), subtitle: t('home.boutique_agencia_subtitle'), items: ["Branding project", "Web development", "Campanha integrada 360"], href: "/agencia" },
                                    { title: t('home.boutique_studio_title'), subtitle: t('home.boutique_studio_subtitle'), items: ["Book model", "Ensaio profissional", "Cobertura pessoal"], href: "/studio" },
                                    { title: t('home.boutique_produtora_title'), subtitle: t('home.boutique_produtora_subtitle'), items: ["Campanha de moda", "Campanha de beleza", "Conteúdo institucional"], href: "/produtora" },
                                    { title: t('home.boutique_comunidade_title'), subtitle: t('home.boutique_comunidade_subtitle'), items: ["Área do cliente", "Central do aluno", "Nossos parceiros", "Casting e vagas"], href: "/comunidade" }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined">
                                        <div>
                                            <h3 className="text-h3 mb-6 group-hover:text-white uppercase">{card.title}</h3>
                                            <p className="text-body text-on-surface-variant mb-12 group-hover:text-white/70">{card.subtitle}</p>
                                            <ul className="space-y-4 mb-12">
                                                {card.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-body text-on-surface-variant group-hover:text-white/80">
                                                        <span className="material-symbols-outlined text-lg">check</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Link href={card.href} className="w-full border border-black py-5 text-button hover:bg-black hover:text-white transition-all duration-500 group-hover:border-white group-hover:text-white text-center block">Saiba mais</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <ClientLogos />

                {/* TESTIMONIALS SECTION */}
                <section
                    className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center py-20"
                    style={{ minHeight: '500px' }}
                    onMouseEnter={() => {}}
                >
                    <div
                        className="parallax-testimonial"
                        style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '10vw', fontFamily: 'var(--font-headline)',
                            fontWeight: 700, letterSpacing: '-0.05em',
                            color: 'rgba(255,255,255,0.08)',
                            whiteSpace: 'nowrap', pointerEvents: 'none',
                            userSelect: 'none', zIndex: 0
                        }}
                    >
                        Depoimentos
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute left-16 inset-y-0 flex items-center z-20">
                        <button
                            className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300"
                            onClick={prevSlide}
                        >
                            <div className="custom-nav-line mr-2"></div>
                            <svg className="transform -translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-16 inset-y-0 flex items-center z-20">
                        <button
                            className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300"
                            onClick={nextSlide}
                        >
                            <svg className="transform translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            <div className="custom-nav-line ml-2"></div>
                        </button>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <span className="text-caption text-zinc-500 block mb-4">O que dizem</span>
                            <h2 className="text-h2 text-white">Depoimentos</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1" style={{ minHeight: '220px' }}>
                                {testimonials.map((testimonial, i) => (
                                    <div key={i} className={`testimonial-slide ${currentSlide === i ? "active" : ""}`}>
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">
                                            “{testimonial.text}”
                                        </h3>
                                        <div className="pt-6">
                                            <p className="text-caption text-white/80">{testimonial.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
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

                {/* BLOG SECTION */}
                <section style={{ background: '#fff', padding: '80px 24px' }} className="overflow-hidden">
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '64px' }}>
                            <p className="text-caption" style={{ color: '#888', marginBottom: '16px' }}>Editorial</p>
                            <h2 className="text-h2" style={{ color: '#000' }}>Últimos artigos</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2px' }} className="md:grid-cols-3">
                            {[
                                { categoria: 'Studio — Book', titulo: 'Book para Modelos: o que realmente define quem é escolhido no mercado', data: 'Abril 2026', slug: '/blog/book-para-modelos-quem-e-escolhido' },
                                { categoria: 'Agência — Branding', titulo: 'Por que o branding é o ativo mais valioso de uma marca de luxo', data: 'Abril 2026', slug: '/blog/branding-project-arquitetura-valor' },
                                { categoria: 'IA — Futuro', titulo: 'O papel da Inteligência Artificial na direção criativa de 2026', data: 'Abril 2026', slug: '/blog/editorial-moda-narrativa-visual' }
                            ].map((post, idx) => (
                                <Link key={idx} href={post.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div
                                        style={{ padding: '64px 48px', border: '0.5px solid #e0e0e0', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'background 0.3s, color 0.3s, transform 0.4s ease', cursor: 'pointer', color: '#000', transform: 'translateY(0)' }}
                                        onMouseEnter={e => { e.currentTarget.style.background='#000'; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-6px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#000'; e.currentTarget.style.transform='translateY(0)'; }}
                                    >
                                        <div>
                                            <p className="text-caption" style={{ color: '#888', marginBottom: '24px' }}>{post.categoria}</p>
                                            <h3 className="text-h3" style={{ color: 'inherit', marginBottom: '40px' }}>{post.titulo}</h3>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span className="text-caption" style={{ color: '#aaa' }}>{post.data}</span>
                                            <span style={{ fontSize: '28px', display: 'inline-block', transition: 'transform 0.4s ease' }}
                                                onMouseEnter={e => e.currentTarget.style.transform='translateX(10px)'}
                                                onMouseLeave={e => e.currentTarget.style.transform='translateX(0)'}
                                            >→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA CONTACT SECTION */}
                <section
                    className="bg-black py-64 px-12 text-center relative overflow-hidden"
                    id="contato"
                >
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white hmzt-hero-title">
                            {t('cta.cta_headline')}
                        </h2>
                        <div className="flex flex-col items-center space-y-10">
                            <button
                                type="button"
                                onClick={() => setIsHomeFormOpen(true)}
                                className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500"
                            >
                                {t('cta.start_project')}
                            </button>
                            <p className="text-caption text-zinc-500">
                                {t('cta.cta_tagline')}
                            </p>
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
                        <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">Instagram</a>
                        <a className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LinkedIn</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/">Home</Link>
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
            <FormDrawer
                isOpen={isHomeFormOpen}
                onClose={() => setIsHomeFormOpen(false)}
                title="Iniciar uma conversa"
                subtitle="Conte-nos sobre o que você precisa. Respondemos em até 1 dia útil."
            >
                <FormGeral
                    onClose={() => setIsHomeFormOpen(false)}
                    sourceUrl="/"
                    ctaLocation="home_final"
                />
            </FormDrawer>
        </div>
    );
}
