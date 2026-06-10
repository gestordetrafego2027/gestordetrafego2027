"use client";

import React, { useState, useEffect } from "react";
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import Link from "next/link";
import Image from "next/image";
import {useTranslations} from 'next-intl';
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";
import BlogSection from "@/app/components/BlogSection";
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
        window.addEventListener('scroll', handleScroll, { passive: true });

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
                    className="relative w-full overflow-hidden bg-black m-0 p-0 border-0"
                    style={{ height: "105vh" }}
                >
                    <div className="absolute inset-0 z-0 bg-black">
                        {/* vídeo único de fundo — sem imagem poster, sem slides de imagem */}
                        <video
                            src="/videos/house-mazzutti-fashion-film-hero.mp4"
                            poster="/images/hero-poster.webp"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            width={1920}
                            height={1080}
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

                {/* ── SOBRE / STRATEGIC HOUSE ─────────────────────────────── */}
                <section className="min-h-[calc(100vh+20px)] flex items-center bg-[#fafafa]">
                    <div className="w-full flex flex-col justify-center px-12 py-32 space-y-10 pl-[calc(3rem+15px+20px)] md:pl-[calc(6rem+15px+20px)]">
                        <span className="text-caption text-black/70">{t('about.strategic_label')}</span>
                        <h2 className="text-h1 text-black">{t('about.strategic_titulo')}</h2>
                        <p className="text-h4 text-[#555555] measure-editorial">{t('about.strategic_subtitulo')}</p>
                        <div className="space-y-6 pt-8 w-4/5 md:w-1/3">
                            {t.raw('about.strategic_items').map((item, index) => (
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

                {/* SELECTED WORKS */}
                <section
                    className="bg-white py-12 mx-auto"
                    style={{ maxWidth: "95vw" }}
                >
                    <div className="mb-20 text-center flex flex-col items-center">
                        <span className="text-caption text-zinc-500 block mb-6">{t('home.works_label')}</span>
                        <h2 className="text-h2 text-black">{t('home.works_title')}</h2>
                        <div className="line-divider mt-8 text-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {[
                            { title: "Amanda Oliveira", sub: "Book", src: "/images/studio/amanda-oliveira/capa.webp", hover: "/images/studio/amanda-oliveira/2.webp", link: "/portfolio-studio/amanda-oliveira" },
                            { title: "Patricia Marafon", sub: "Book", src: "/images/studio/patricia-marafon/capa.webp", hover: "/images/studio/patricia-marafon/2.webp", link: "/portfolio-studio/patricia-marafon" },
                            { title: "Signus - Lavorato", sub: "Acessórios", src: "/images/produtora/acessorios/signus-lavorato/capa.webp", hover: "/images/produtora/acessorios/signus-lavorato/2.webp", link: "/portfolio-produtora/signus-lavorato" },
                            { title: "Elyah", sub: "Acessórios", src: "/images/produtora/acessorios/elyah/capa.webp", hover: "/images/produtora/acessorios/elyah/2.webp", link: "/portfolio-produtora/elyah" },
                            { title: "Knowhol", sub: "Direção de Imagem", src: "/images/agencia/knowhol/capa.webp", hover: "/images/agencia/knowhol/2.webp", link: "/portfolio-agencia/knowhol" },
                            { title: "Samrat", sub: "Direção de Imagem", src: "/images/agencia/samrat/capa.webp", hover: "/images/agencia/samrat/2.webp", link: "/portfolio-agencia/samrat" },
                        ].map((work, i) => (
                            <Link
                                key={i}
                                href={work.link}
                                className="scroll-reveal relative group bg-white aspect-[3/4] overflow-hidden block"
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
                        <Image src="/images/about/diferencial-mao.webp" alt="Direção de arte autoral — House Mazzutti" fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} loading="lazy" className="object-cover" />
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>
                    <div className="w-full md:w-1/2 bg-[#f5f5f5] flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-10">
                            <span className="text-caption text-neutral-600">{t('about.diferencial_label')}</span>
                            <h2 className="text-h2 text-black">{t('about.diferencial_titulo')}</h2>
                            <div className="space-y-5 text-body text-zinc-400">
                                <p>{t('about.diferencial_intro')}</p>
                                <ul className="space-y-2">
                                    {t.raw('about.diferencial_items').map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SOBRE / ANGELO MAZZUTTI ─────────────────────────────── */}
                <section className="min-h-[80vh] flex flex-col md:flex-row md:items-stretch relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden min-h-[500px] md:min-h-[80vh] md:self-stretch">
                        <Image alt="House Mazzutti — Agência, Produtora e Direção Criativa" src="/images/about/angelo-mazzutti.webp" fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} loading="lazy" className="object-cover object-top" />
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-px bg-[#cccccc] z-10"></div>
                    <div className="w-full md:w-1/2 bg-black flex flex-col justify-center px-8 md:px-24 pb-24 pt-[calc(8rem-30px)]">
                        <div className="max-w-lg space-y-10">
                            <span className="text-caption text-neutral-400">{t('about.origem_label')}</span>
                            <h2 className="text-h2 text-white">{t('about.origem_titulo')}</h2>
                            <div className="space-y-5 text-body text-neutral-300">
                                <p>{t('about.origem_p1')}</p>
                                <p>{t('about.origem_p2')}</p>
                                <p className="italic text-neutral-400">{t('about.origem_quote')}</p>
                            </div>
                            <div className="pt-6">
                                <div className="text-h3 text-white/90">Angelo Mazzutti</div>
                                <div className="text-caption text-neutral-500 mt-2">{t('about.origem_role')}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SOBRE / METODOLOGIA ─────────────────────────────────── */}
                <section className="bg-white text-black py-40 overflow-hidden relative">
                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-24">
                        <h2 className="text-h2 text-black text-center mb-32 max-w-3xl mx-auto">{t('about.metodo_titulo')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            {t.raw('about.metodo_items').map((item, i) => (
                                <div key={i} className="space-y-6">
                                    <span className="text-caption text-zinc-400 block">{item.num}</span>
                                    <div className="h-px bg-neutral-300 w-full"></div>
                                    <p className="text-body text-neutral-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FRENTES — BANNERS DAS PÁGINAS ───────────────────────── */}
                <section className="bg-white">
                    <div className="flex flex-col md:flex-row h-auto md:h-[85vh]">
                        {[
                            { label: t('home.frentes_agencia_label'), sub: t('home.frentes_agencia_sub'), img: '/images/agencia/banners/banner-1.webp', href: '/agencia' },
                            { label: t('home.frentes_studio_label'), sub: t('home.frentes_studio_sub'), img: '/images/studio/banners/banner-1.webp', href: '/studio' },
                            { label: t('home.frentes_produtora_label'), sub: t('home.frentes_produtora_sub'), img: '/images/produtora/banners/banner-1.webp', href: '/produtora' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative flex-1 overflow-hidden group"
                                style={{ minHeight: '380px' }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />
                                <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-12">
                                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-white/60 mb-3 block">{item.sub}</span>
                                    <h3 className="font-headline text-3xl md:text-4xl text-white tracking-tight mb-6">{item.label}</h3>
                                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-white border-b border-white/40 pb-1 w-fit group-hover:border-white transition-colors duration-300">{t('home.frentes_cta')}</span>
                                </div>
                            </Link>
                        ))}
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
                        {t('home.testimonials_ghost')}
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
                            <span className="text-caption text-zinc-500 block mb-4">{t('home.testimonials_label')}</span>
                            <h2 className="text-h2 text-white">{t('home.testimonials_titulo')}</h2>
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


                {/* COMUNIDADE SECTION */}
                <section className="bg-black py-24 px-6 md:px-12 overflow-hidden">
                    <div className="max-w-[1440px] mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                            <div>
                                <span className="text-caption text-white/40 uppercase tracking-widest block mb-4">House Mazzutti Academy</span>
                                <h2 className="text-h2 text-white leading-tight">Comunidade.</h2>
                                <p className="text-body text-white/50 mt-4 max-w-md">
                                    Espaços de troca entre alunos, talentos e profissionais. Operação no mesmo padrão da casa.
                                </p>
                            </div>
                            <Link
                                href="/academy/comunidade"
                                className="shrink-0 px-8 py-3 border border-white/20 text-white text-caption uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                            >
                                Entrar na comunidade →
                            </Link>
                        </div>

                        {/* Grid de imagens — 6 células iguais 3×2 */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                            {[
                                '/images/comunidade/grid-1.webp',
                                '/images/comunidade/grid-2.webp',
                                '/images/comunidade/grid-3.webp',
                                '/images/comunidade/grid-4.webp',
                                '/images/comunidade/grid-5.webp',
                                '/images/comunidade/grid-6.webp',
                            ].map((src, i) => (
                                <Link
                                    key={i}
                                    href="/academy/comunidade"
                                    className="relative overflow-hidden bg-neutral-900 group"
                                    style={{ aspectRatio: '4/3' }}
                                >
                                    <Image
                                        src={src}
                                        alt="Comunidade House Mazzutti"
                                        fill
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        quality={80}
                                        loading="lazy"
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                                </Link>
                            ))}
                        </div>

                        {/* CTA pós-grid */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-10">
                            <div>
                                <p className="text-white text-base font-medium leading-snug">Faça parte da comunidade House Mazzutti.</p>
                                <p className="text-white/40 text-sm mt-1">Acesso exclusivo a conteúdo, bastidores e conexões do mercado criativo.</p>
                            </div>
                            <Link
                                href="/academy/comunidade"
                                className="shrink-0 px-10 py-4 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-neutral-100 transition-colors duration-300"
                            >
                                Entrar na comunidade →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* BLOG SECTION */}
                <BlogSection
                    slugs={[
                        'book-para-modelos-quem-e-escolhido',
                        'branding-project-arquitetura-valor',
                        'editorial-moda-narrativa-visual',
                        'campanha-lancamento-arquitetura-invisivel',
                    ]}
                    eyebrow={t('home.blog_section_label')}
                    title={t('home.blog_section_title')}
                    allLabel={t('home.blog_see_all')}
                    readLabel={t('home.blog_read')}
                />

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
            <footer className="bg-white text-zinc-900 py-24 px-8 border-t border-zinc-200">
                <div className="flex flex-col items-center text-center">
                    <div className="text-zinc-900 mb-12">
                        <span className="hm-logo" style={{fontSize: '40px'}}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                    </div>
                    <div className="flex space-x-10 mb-16">
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">Instagram</a>
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LinkedIn</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/">Home</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/studio">Studio</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/portfolio">Portfólio</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/blog">Blog</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/contato">Contato</Link>
                    </nav>
                    <div className="text-caption text-zinc-400">
                        {t('footer.copyright')}
                    </div>
                </div>
              <div className="mt-6"><SiteFooterLinks /></div>
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
