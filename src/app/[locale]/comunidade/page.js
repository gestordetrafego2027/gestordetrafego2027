"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";
import FormDrawer from "@/app/components/FormDrawer";
import FormModelo from "@/app/components/forms/FormModelo";
import {useTranslations} from 'next-intl';

export default function ComunidadePage() {
    const t = useTranslations('comunidade_page');
    const tAbout = useTranslations('about');
    const tCta = useTranslations('cta');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [aboutSlide, setAboutSlide] = useState(0);
    const [talentsForm, setTalentsForm] = useState(null); // { ctaLocation }
    const openTalentsForm = (ctaLocation) => setTalentsForm({ ctaLocation });
    const closeTalentsForm = () => setTalentsForm(null);

    const aboutTestimonials = [
        { text: "Traduzimos a essência de marcas e personalidades em imagens com clareza, sofisticação e consistência.", author: "" },
        { text: "Direção, criação e produção sob uma única casa. Uma só conversa, do começo ao fim — sem ruído entre etapas.", author: "" },
    ];
    const nextAboutSlide = () => setAboutSlide((p) => (p + 1) % aboutTestimonials.length);
    const prevAboutSlide = () => setAboutSlide((p) => (p - 1 + aboutTestimonials.length) % aboutTestimonials.length);
    const goToAboutSlide = (i) => setAboutSlide(i);

    const testimonials = [
        {
            text: "Entrar para a comunidade da House foi acessar uma rede onde cada conversa tem direção. Sem ruído, com cuidado.",
            author: "MEMBRO HMZT",
        },
        {
            text: "Quem orbita a House opera no mesmo padrão da casa. É raro encontrar essa coerência em qualquer rede criativa.",
            author: "MEMBRO HMZT",
        },
        {
            text: "Cliente, parceiro, talento — todos partilham o mesmo nível de cuidado e exigência.",
            author: "MEMBRO HMZT",
        },
    ];

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
        window.addEventListener('scroll', handleScroll)

        return () => {
            clearTimeout(timer)
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const teamMembers = [
        { name: "Angelo Mazzutti", role: "Diretor Criativo", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe0ESFf2VKUU01w1wDMvk9GSzceC_56tjvoVLme8E1KeN98y_Zc3Czxb47l9-giIZLy7mSRrqHj9zj4TNrDYF6-qHHrlZuYs5OK6L-MpUmwXBgRDC4HMoVG8uxvsjqwE64sm9SsADinIThjiDc6trCJ-GmADEkDjQ0xr990PJiKiBjDqIYnnO-J5hBFPuV90jlKCFIBhboqE9gA8O9y-e8JChB007vHeibnqmOp4yCmQIb11a7NCtW4pVkEGk5sdSQduOjAStefyk" },
        { name: "Mateus Sacavem", role: "Produtor Executivo", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKZY7vY0_xHh4W3MKSd3jlEIhiiS5gF9XM3hbMqdr3jwFr16elkblrJVykxmXHcbVQeSdE7P4M_onqrLajroloIvYyXsYw_0dkx6h0ZB_8-X1qnqw4DSmV8kmBfkcAOXNZeI0dmCOHcnkHUelR4XxcDwB4AvZY1mvpxgCC2uMnR-KZ6SBTSb2TJ9SVM4WCCr2S10Gy74ML33Hkky5gHCBsKXvXWS5RGCOi9p4IhVIH2fWSwjIYsSOGaHsZpmM2Y5DpYCs4eCRR17g" },
        { name: "Henry Almeida", role: "Gestor de IA", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa6TINUvFDwA7LqkkHXDdt1XoEvOHZPH3W5C2QvV6FRZfba0ajm5Uz7SjeIBB2cvjuqSy1_kYZlLfz-iW_L4qigAleWRqobN3LB08IXDDRI5N-GPiiRLh0Q3f-1by3ux6jIwMvx-36JFc9OdYIW0AifoBbPdrqq0aQY6QlBeQ_0tjxfuTSZLNTq9-cWum4QH8VCNJldD682F3o4XhHqfQ4p-LB97VETj8FHvw2375aLuDGGogL3XhITfCpJK56DcJ_QXEXNFpfMM8" },
    ];

    const gridImages = [
        { src: "/images/comunidade/grid-1.webp", alt: "Bastidor — House Mazzutti em set", label: "Bastidor", sublabel: "Direção" },
        { src: "/images/comunidade/grid-2.webp", alt: "Set de produção — House Mazzutti", label: "Set", sublabel: "Produção" },
        { src: "/images/comunidade/grid-3.webp", alt: "Estúdio em captação — House Mazzutti", label: "Estúdio", sublabel: "Captação" },
        { src: "/images/comunidade/grid-4.webp", alt: "Equipe em operação — House Mazzutti", label: "Equipe", sublabel: "Operação" },
        { src: "/images/comunidade/grid-5.webp", alt: "Cena com iluminação cênica — House Mazzutti", label: "Cena", sublabel: "Iluminação" },
        { src: "/images/comunidade/grid-6.webp", alt: "Direção e execução em set — House Mazzutti", label: "Direção", sublabel: "Execução" },
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
            <title>Comunidade | House Mazzutti</title>

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
                                <img alt={img.alt} className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src={img.src} />
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
                        const frentes = [
                            {
                                num: "01",
                                label: "Para quem já caminha com a House",
                                title: "Área do Cliente.",
                                desc: "Onde projetos viram processo. Briefings, aprovações, arquivos e conversas reunidos em um só lugar — privado, organizado, com a sua marca tratada como obra.",
                                cta: "Acessar área do cliente",
                                action: { type: "link", href: "/login" },
                            },
                            {
                                num: "02",
                                label: "Para quem indica e movimenta",
                                title: "Afiliados.",
                                desc: "Indicação editorial com retorno. Para profissionais e amigos da casa que apresentam a House a quem busca direção — com transparência, padrão e cuidado em cada repasse.",
                                cta: "Tornar-se afiliado",
                                action: { type: "link", href: "/comunidade/afiliados" },
                            },
                            {
                                num: "03",
                                label: "Para marcas e profissionais alinhados",
                                title: "Parceiros.",
                                desc: "Co-criação entre marcas, agências e profissionais que partilham o mesmo nível de exigência. Projetos integrados, eventos, colaborações editoriais e estratégicas.",
                                cta: "Propor uma parceria",
                                action: { type: "talents-form", location: "comunidade_parceiros" },
                            },
                            {
                                num: "04",
                                label: "Para talentos que queiram somar",
                                title: "Vagas & Oportunidades.",
                                desc: "Posições abertas, freelas selecionados e castings editoriais. Espaço para quem entende que construção exige pensamento — não apenas execução.",
                                cta: "Quero ser representado",
                                action: { type: "talents-form", location: "comunidade_vagas" },
                            },
                        ];
                        return (
                            <div className="border-t-[0.5px] border-zinc-200">
                                {frentes.map((f, i) => (
                                    <div
                                        key={i}
                                        className={`border-b-[0.5px] border-zinc-200 ${i % 2 === 1 ? 'bg-zinc-50/50' : 'bg-white'}`}
                                    >
                                        <div className="max-w-[1440px] mx-auto px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                                            <div className="md:col-span-3">
                                                <span className="text-caption text-zinc-500 block">{f.num} / Frente</span>
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
                                <img alt="B&W editorial photography" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHOOyecCxbUCU6_y9vpcFi6a1ZBmoHI59QTvX7-mYJHcU8SfV0rY1_M6fRpvrgcf1v5KuSRnO7opF15zAf29T5zCf08pMyHvaiZ3XGXEBKtgBCjkNScMmeU5GGltKS0Oo9t0Wv3bGq9PB3UvL93v_LlQkpfl3-LhK55rlnWxOMKNZTON2x8enWcwwJDVBKYCalcw0uB02-OgQAnRr5qEJ7eUY62VPxKwDfWI5Gesxo3Y6IZInsc8yYwcsY2YWwYfHsV3jGxJqCcg" />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-8">
                                <div className="max-w-xl text-left">
                                    <h2 className="text-h2 text-black mb-6">
                                        Conexões que ampliam o que construímos.
                                    </h2>
                                    <p className="text-caption text-zinc-500">Filosofia House</p>
                                </div>
                                <div className="flex justify-end">
                                    <div className="max-w-xl text-right">
                                        <h3 className="text-h2 text-black mb-6">
                                            Não buscamos volume.<br />Buscamos alinhamento.
                                        </h3>
                                        <p className="text-caption text-zinc-500">Diferenciação</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[500px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-bold text-[18vw] tracking-[-0.05em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-40">Depoimentos</span>
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
                            <span className="text-caption text-zinc-500 block mb-4">O que dizem</span>
                            <h2 className="text-h2 text-white">Depoimentos</h2>
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
                            Se você se conecta com o que a House constrói — esse é o seu ponto de entrada.
                        </h2>
                        <div className="flex flex-col items-center space-y-10">
                            <a className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500" href="#frentes">
                                Escolher a sua porta
                            </a>
                            <p className="text-caption text-zinc-500">Menos tentativa. Mais direção.</p>
                        </div>
                    </div>
                </section>

                {/* ============================================================
                    SEÇÕES IMPORTADAS DA PÁGINA SOBRE (HMZT)
                    ============================================================ */}

                {/* [SOBRE-6.5] PRODUÇÃO EXECUTIVA — MATEUS SACAVEM */}
                <section className="min-h-[80vh] flex flex-col md:flex-row md:items-stretch relative">
                    <div className="w-full md:w-1/2 bg-[#ececec] relative overflow-hidden min-h-[500px] md:min-h-[80vh] md:self-stretch">
                        <Image alt="Mateus Sacavem — Produtor Executivo da House Mazzutti" src="/images/about/mateus-sacavem.webp" fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} loading="lazy" className="object-cover object-top" />
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

                {/* [SOBRE-2] DEPOIMENTOS */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center h-[480px] max-h-[480px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-bold text-[18vw] tracking-[-0.05em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-40">Depoimentos</span>
                    </div>
                    <div className="absolute left-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={prevAboutSlide}>
                            <div className="custom-nav-line mr-2"></div>
                            <svg className="transform -translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={nextAboutSlide}>
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
                            <div className="relative w-full overflow-hidden mb-1" style={{height: '220px', display: 'flex', alignItems: 'center'}}>
                                {aboutTestimonials.map((tm, i) => (
                                    <div key={i} className={`testimonial-slide flex flex-col justify-center ${aboutSlide === i ? "active" : ""}`}>
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">“{tm.text}”</h3>
                                        {tm.author && (
                                            <div className="pt-6">
                                                <p className="text-caption text-white/80">{tm.author}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-3 pt-4">
                                {aboutTestimonials.map((_, i) => (
                                    <button key={i} className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${aboutSlide === i ? "opacity-100" : "opacity-30"}`} onClick={() => goToAboutSlide(i)}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <ClientLogos />

                {/* [SOBRE-0] HERO — antes do Editorial */}
                <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: "105vh" }}>
                    <div className="absolute inset-0 z-0">
                        <Image src="/images/about/banner--04-imagem-3nsaio-house-mazzutti.webp" alt="" fill sizes="100vw" quality={85} className="object-cover object-top" />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-4xl">
                            <span className="text-caption text-white/70 mb-6 block">{tAbout('hero_label')}</span>
                            <h2 className="text-h1 text-white mb-8 hmzt-hero-title">{tAbout('hero_titulo')}</h2>
                            <p className="text-body text-white/75 mb-12 measure-editorial">{tAbout('hero_texto')}</p>
                            <Link href="/contato" className="inline-block group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                {tAbout('hero_cta')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* BLOG SECTION — Últimos artigos (penúltima) */}
                <section style={{ background: '#fff', padding: '80px 24px' }} className="overflow-hidden">
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                        <div style={{ marginBottom: '64px' }}>
                            <p className="text-caption" style={{ color: '#888', marginBottom: '16px' }}>Editorial</p>
                            <h2 className="text-h2" style={{ color: '#000' }}>Últimos artigos</h2>
                        </div>

                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)',
                            gap: '2px'
                        }} className="md:grid-cols-3">
                            {[
                                {
                                    categoria: 'Studio — Book',
                                    titulo: 'Book para Modelos: o que realmente define quem é escolhido no mercado',
                                    data: 'Abril 2026',
                                    slug: '/blog/book-para-modelos-quem-e-escolhido'
                                },
                                {
                                    categoria: 'Agência — Branding',
                                    titulo: 'Por que o branding é o ativo mais valioso de uma marca de luxo',
                                    data: 'Abril 2026',
                                    slug: '/blog/branding-project-arquitetura-valor'
                                },
                                {
                                    categoria: 'IA — Futuro',
                                    titulo: 'O papel da Inteligência Artificial na direção criativa de 2026',
                                    data: 'Abril 2026',
                                    slug: '/blog/editorial-moda-narrativa-visual'
                                }
                            ].map((post, idx) => (
                                <Link key={idx} href={post.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div
                                      style={{
                                        padding: '64px 48px',
                                        border: '0.5px solid #e0e0e0',
                                        background: '#fff',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'background 0.3s, color 0.3s, transform 0.4s ease',
                                        cursor: 'pointer',
                                        color: '#000',
                                        transform: 'translateY(0)'
                                      }}
                                      onMouseEnter={e => {
                                        e.currentTarget.style.background = '#000';
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.transform = 'translateY(-6px)';
                                      }}
                                      onMouseLeave={e => {
                                        e.currentTarget.style.background = '#fff';
                                        e.currentTarget.style.color = '#000';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                      }}
                                    >
                                        <div>
                                            <p className="text-caption" style={{ color: '#888', marginBottom: '24px' }}>{post.categoria}</p>
                                            <h3 className="text-h3" style={{ color: 'inherit', marginBottom: '40px' }}>{post.titulo}</h3>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span className="text-caption" style={{ color: '#aaa' }}>{post.data}</span>
                                            <span style={{
                                              fontSize: '28px',
                                              display: 'inline-block',
                                              transition: 'transform 0.4s ease'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                                            >→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* [SOBRE-7] CTA */}
                <section className="bg-black py-40 px-12 text-center relative overflow-hidden" id="about-contato">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white hmzt-hero-title">
                            Se você se identifica, vamos transformar seu posicionamento.
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
                    <div className="mb-16">
                        <span className="hm-logo" style={{fontSize: '40px', color: '#fafafa'}}>
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
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/contato">Contato</Link>
                    </nav>
                    <div className="text-caption text-neutral-700">
                        © 2026 House Mazzutti. Todos os direitos reservados.
                    </div>
                </div>
            </footer>

            <FormDrawer
                isOpen={!!talentsForm}
                onClose={closeTalentsForm}
                title="Faça parte da nossa rede"
                subtitle="Talentos, parceiros e amigos da casa — preencha abaixo para entrar no nosso painel."
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
