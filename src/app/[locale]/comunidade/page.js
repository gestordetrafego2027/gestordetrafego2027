"use client";

import React, { useState, useEffect } from "react";
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";
import FormDrawer from "@/app/components/FormDrawer";
import FormModelo from "@/app/components/forms/FormModelo";
import BlogSection from "@/app/components/BlogSection";
import {useTranslations} from 'next-intl';

export default function ComunidadePage() {
    const t = useTranslations('comunidade_page');
    const tCta = useTranslations('cta');
    const tFooter = useTranslations('footer');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [talentsForm, setTalentsForm] = useState(null); // { ctaLocation }
    const openTalentsForm = (ctaLocation) => setTalentsForm({ ctaLocation });
    const closeTalentsForm = () => setTalentsForm(null);


    const testimonials = t.raw('testimonials');

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    const goToSlide = (index) => setCurrentSlide(index);

    useEffect(() => {
        // [1] HERO ANIMATION (TEXTOS)
        document.querySelectorAll('.hero-animate').forEach((el) => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(30px)'
        })

        const timer = setTimeout(() => {
            document.querySelectorAll('.hero-animate').forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                }, i * 150)
            })
        }, 150)

        // [2] SCROLL REVEAL (OBSERVER)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1'
                        entry.target.style.transform = 'translateY(0)'
                    }, entry.target.dataset.delay || 0)
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el)
        })

        // [3] PARALLAX BG EFFECT
        const handleScroll = () => {
            document.querySelectorAll('.parallax-bg').forEach((bg) => {
                const rect = bg.parentElement.getBoundingClientRect()
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = rect.top * 0.15
                    bg.style.transform = `translateY(${offset}px)`
                }
            })
        }
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            clearTimeout(timer)
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const teamMembers = [
        { name: "Angelo Mazzutti", role: t('team_role_0'), src: "/images/angelo/angelo-portrait.webp" },
        { name: "Mateus Sacavem", role: t('team_role_1'), src: "/images/comunidade/grid-1.webp" },
        { name: "Henry Almeida", role: t('team_role_2'), src: "/images/comunidade/grid-2.webp" },
    ];

    const gridImages = [
        { src: "/images/comunidade/grid-1.webp", alt: "Bastidor — House Mazzutti em set", label: t('grid_img_0_label'), sublabel: t('grid_img_0_sub') },
        { src: "/images/comunidade/grid-2.webp", alt: "Set de produção — House Mazzutti", label: t('grid_img_1_label'), sublabel: t('grid_img_1_sub') },
        { src: "/images/comunidade/grid-3.webp", alt: "Estúdio em captação — House Mazzutti", label: t('grid_img_2_label'), sublabel: t('grid_img_2_sub') },
        { src: "/images/comunidade/grid-4.webp", alt: "Equipe em operação — House Mazzutti", label: t('grid_img_3_label'), sublabel: t('grid_img_3_sub') },
        { src: "/images/comunidade/grid-5.webp", alt: "Cena com iluminação cênica — House Mazzutti", label: t('grid_img_4_label'), sublabel: t('grid_img_4_sub') },
        { src: "/images/comunidade/grid-6.webp", alt: "Direção e execução em set — House Mazzutti", label: t('grid_img_5_label'), sublabel: t('grid_img_5_sub') },
    ];

    const SocialIcons = () => (
        <>
            <a className="text-white hover:text-zinc-300 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener" aria-label="Instagram House Mazzutti">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
            </a>
            <a className="text-white hover:text-zinc-300 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener" aria-label="LinkedIn House Mazzutti">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect height="12" width="4" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            </a>
        </>
    );

    return (
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            <style dangerouslySetInnerHTML={{
                __html: `
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; font-size: 20px; }
                .fade-in { animation: fadeIn 1.2s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .nav-line { width: 40px; height: 1px; background-color: white; transition: width 0.3s ease, opacity 0.3s ease; }
                .nav-btn:hover .nav-line { width: 60px; }
                .line-divider { height: 0.5px; width: 100px; background-color: currentColor; opacity: 0.3; }
                .noise-overlay {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.02; pointer-events: none;
                }
                .custom-nav-line { width: 40px; height: 1px; background-color: white; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                .custom-nav-btn:hover .custom-nav-line { width: 70px; }
                .testimonial-slide { animation: slideFade 0.6s ease-in-out forwards; }
                @keyframes slideFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            ` }} />

            {/* HEADER */}
            <Header variant="dark" />

            <main>
                {/* [1] HERO */}
                <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: "105vh" }}>
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/comunidade/hero.webp"
                            alt="Produção House Mazzutti — equipe em set"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-5xl">
                            <span className="hero-animate text-caption text-white/70 mb-8 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>{t('hero_label')}</span>
                            <h1 className="hero-animate text-h1 text-white mb-12 hmzt-hero-title" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t('hero_titulo')}
                            </h1>
                            <p className="hero-animate text-body text-white/75 mb-12 measure-editorial" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t('hero_texto')}
                            </p>
                            <a href="#frentes" className="hero-animate inline-block group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t('hero_cta')}
                            </a>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 left-12 flex items-center z-20">
                        <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                                <svg className="-ml-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-12 flex items-center z-20">
                        <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                <svg className="-mr-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                            </div>
                        </button>
                    </div>
                </section>

                {/* GRID SECTION */}
                <section className="bg-white py-12 mx-auto" style={{ maxWidth: "95vw" }}>
                    <div className="mb-20 text-center flex flex-col items-center">
                        <span className="text-caption text-zinc-500 block mb-6">{t('grid_label')}</span>
                        <h2 className="text-h2 text-black">{t('grid_titulo')}</h2>
                        <div className="line-divider mt-8 text-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {gridImages.map((img, i) => (
                            <div key={i} className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay={i * 100} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <img fetchpriority="high" alt={img.alt} className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src={img.src} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                    <p className="text-h4 text-black">{img.label}</p>
                                    <p className="text-caption text-zinc-500 mt-2">{img.sublabel}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AS QUATRO FRENTES — pontos de entrada da comunidade */}
                <section id="frentes" className="bg-white border-t-[0.5px] border-zinc-100">
                    <div className="max-w-[1440px] mx-auto px-12 pt-32 pb-20 text-center">
                        <span className="text-caption text-zinc-500 block mb-6">{t('frentes_label')}</span>
                        <h2 className="text-h2 text-black measure-editorial mx-auto">
                            {t('frentes_titulo')}
                        </h2>
                    </div>

                    {(() => {
                        const frentesData = t.raw('frentes');
                        const frentesActions = [
                            { type: "link", href: "/login" },
                            { type: "link", href: "/comunidade/afiliados" },
                            { type: "talents-form", location: "comunidade_parceiros" },
                            { type: "talents-form", location: "comunidade_vagas" },
                        ];
                        const frentes = frentesData.map((f, i) => ({ ...f, action: frentesActions[i] }));
                        return (
                            <div className="border-t-[0.5px] border-zinc-200">
                                {frentes.map((f, i) => (
                                    <div
                                        key={i}
                                        className={`border-b-[0.5px] border-zinc-200 ${i % 2 === 1 ? 'bg-zinc-50/50' : 'bg-white'}`}
                                    >
                                        <div className="max-w-[1440px] mx-auto px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                                            <div className="md:col-span-3">
                                                <span className="text-caption text-zinc-500 block">{f.num} / {t('frente_num_label')}</span>
                                                <p className="text-caption text-zinc-400 mt-3">{f.label}</p>
                                            </div>
                                            <div className="md:col-span-6">
                                                <h3 className="text-h2 text-black mb-8 hmzt-hero-title">{f.title}</h3>
                                                <p className="text-body text-zinc-700 measure-editorial">{f.desc}</p>
                                            </div>
                                            <div className="md:col-span-3 md:flex md:justify-end">
                                                {f.action.type === "link" ? (
                                                    <Link
                                                        href={f.action.href}
                                                        className="inline-block px-10 py-4 border-[0.5px] border-black text-black text-button hover:bg-black hover:text-white transition-all duration-500 text-center"
                                                    >
                                                        {f.cta}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => openTalentsForm(f.action.location)}
                                                        className="inline-block px-10 py-4 border-[0.5px] border-black text-black text-button hover:bg-black hover:text-white transition-all duration-500 text-center"
                                                    >
                                                        {f.cta}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </section>

                {/* FILOSOFIA */}
                <section className="relative bg-zinc-50/50 px-12 overflow-hidden py-16">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/4 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm">
                                <img loading="lazy" alt="Bastidor de set — House Mazzutti" className="w-full h-full object-cover grayscale" src="/images/comunidade/hero.webp" />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-8">
                                <div className="max-w-xl text-left">
                                    <h2 className="text-h2 text-black mb-6">
                                        {t('filosofia_titulo')}
                                    </h2>
                                    <p className="text-caption text-zinc-500">{t('filosofia_caption')}</p>
                                </div>
                                <div className="flex justify-end">
                                    <div className="max-w-xl text-right">
                                        <h3 className="text-h2 text-black mb-6">
                                            {t('filosofia_alt_titulo')}
                                        </h3>
                                        <p className="text-caption text-zinc-500">{t('filosofia_alt_caption')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[500px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-bold text-[18vw] tracking-[-0.05em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-40">{t('dep_titulo')}</span>
                    </div>
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
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <span className="text-caption text-zinc-500 block mb-4">{t('dep_label')}</span>
                            <h2 className="text-h2 text-white">{t('dep_titulo')}</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1">
                                {testimonials.map((t, i) => (
                                    <div key={i} className={`testimonial-slide ${currentSlide === i ? "block" : "hidden"}`}>
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">
                                            “{t.text}”
                                        </h3>
                                        <div className="pt-6">
                                            <p className="text-caption text-white/80">{t.author}</p>
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

                <ClientLogos />

                {/* CTA FINAL */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white hmzt-hero-title">
                            {t('cta_titulo')}
                        </h2>
                        <div className="flex flex-col items-center space-y-10">
                            <a className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500" href="#frentes">
                                {t('cta_btn')}
                            </a>
                            <p className="text-caption text-zinc-500">{t('cta_sub')}</p>
                        </div>
                    </div>
                </section>

                <ClientLogos />

                {/* ── FRENTES — BANNERS ───────────────────────────────── */}
                <section className="bg-white">
                    <div className="flex flex-col md:flex-row h-auto md:h-[85vh]">
                        {[
                            { label: t('banner_agencia_label'), sub: t('banner_agencia_sub'), img: '/images/agencia/banners/banner-1.webp', href: '/agencia' },
                            { label: t('banner_studio_label'), sub: t('banner_studio_sub'), img: '/images/studio/banners/banner-1.webp', href: '/studio' },
                            { label: t('banner_produtora_label'), sub: t('banner_produtora_sub'), img: '/images/produtora/banners/banner-1.webp', href: '/produtora' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative flex-1 overflow-hidden group"
                                style={{ minHeight: '380px' }}
                            >
                                <img loading="lazy" src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />
                                <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-12">
                                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-white/60 mb-3 block">{item.sub}</span>
                                    <h3 className="font-headline text-3xl md:text-4xl text-white tracking-tight mb-6">{item.label}</h3>
                                    <span className="font-label uppercase tracking-[0.2em] text-[10px] text-white border-b border-white/40 pb-1 w-fit group-hover:border-white transition-colors duration-300">{t('banner_saiba_mais')}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* BLOG SECTION — Do Blog (penúltima) */}
                <BlogSection
                    slugs={[
                        'book-para-modelos-quem-e-escolhido',
                        'branding-project-arquitetura-valor',
                        'editorial-moda-narrativa-visual',
                        'campanha-lancamento-arquitetura-invisivel',
                    ]}
                    allLabel={t('blog_see_all')}
                    readLabel={t('blog_read')}
                />

            </main>

            {/* FOOTER */}
            <footer className="bg-white text-zinc-900 py-24 px-8 border-t border-zinc-200">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-16">
                        <span className="hm-logo" style={{fontSize: '40px', color: '#fafafa'}}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                    </div>
                    <div className="flex space-x-10 mb-16">
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">Instagram</a>
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">LinkedIn</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/">{tFooter('home')}</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/studio">{tFooter('studio')}</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/portfolio">{tFooter('portfolio')}</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/contato">{tFooter('contato')}</Link>
                    </nav>
                    <div className="text-caption text-zinc-400">
                        {tFooter('copyright')}
                    </div>
                </div>
              <div className="mt-6"><SiteFooterLinks /></div>
            </footer>

            <FormDrawer
                isOpen={!!talentsForm}
                onClose={closeTalentsForm}
                title={t('form_titulo')}
                subtitle={t('form_sub')}
            >
                {talentsForm ? (
                    <FormModelo
                        onClose={closeTalentsForm}
                        sourceUrl="/comunidade"
                        ctaLocation={talentsForm.ctaLocation}
                    />
                ) : null}
            </FormDrawer>
        </div>
    );
}
