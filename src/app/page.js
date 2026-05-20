"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import ClientLogos from "@/app/components/ClientLogos";
import FormDrawer from "@/app/components/FormDrawer";
import FormGeral from "@/app/components/forms/FormGeral";

/**
 * HOME PAGE - HOUSE MAZZUTTI
 * Transformação completa de HTML/Stitch para React/Next.js
 */
export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
    const [isHomeFormOpen, setIsHomeFormOpen] = useState(false);

    const heroSlides = [
        {
            label: 'STUDIO — HMZT',
            titulo: 'Sua imagem, com intenção.',
            texto: 'Foto, vídeo e direção de imagem pessoal em São Paulo.',
            cta: 'Entrar no Studio',
            link: '/studio'
        },
        {
            label: 'PRODUTORA — HMZT',
            titulo: 'Direção que executa.',
            texto: 'Campanhas de moda, beleza e narrativas institucionais.',
            cta: 'Entrar na Produtora',
            link: '/produtora'
        },
        {
            label: 'AGÊNCIA — HMZT',
            titulo: 'Marcas que ocupam espaço.',
            texto: 'Branding, rebranding e lançamentos com método autoral.',
            cta: 'Entrar na Agência',
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
                        {['/images/home/banner-1.png','/images/home/banner-2.jpg','/images/home/banner-3.jpg'].map((src, i) => (
                            <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{opacity: currentHeroSlide === i ? 1 : 0}}>
                                <img src={src} className="w-full h-full object-cover object-top" alt="" />
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                        ))}
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
                            { title: "Amanda Oliveira", sub: "Book", src: "/images/studio/amanda-oliveira/capa.jpg", link: "/portfolio-studio/amanda-oliveira" },
                            { title: "Patricia Marafon", sub: "Book", src: "/images/studio/patricia-marafon/capa.jpg", link: "/portfolio-studio/patricia-marafon" },
                            { title: "Signus - Versolato 02", sub: "Acessórios", src: "/images/produtora/acessorios/signus-versolato02/capa.jpg", link: "/portfolio-produtora/signus-versolato02" },
                            { title: "Elyah", sub: "Acessórios", src: "/images/produtora/acessorios/elyah/capa.jpg", link: "/portfolio-produtora/elyah" },
                            { title: "Knowhol", sub: "Direção de Imagem", src: "/images/agencia/knowhol/capa.jpg", link: "/portfolio-agencia/knowhol" },
                            { title: "Samrat", sub: "Direção de Imagem", src: "/images/agencia/samrat/capa.jpg", link: "/portfolio-agencia/samrat" },
                        ].map((work, i) => (
                            <Link 
                                key={i} 
                                href={work.link}
                                className="scroll-reveal relative group bg-white aspect-[4/3] overflow-hidden block"
                                data-delay={i * 100}
                                style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
                            >
                                <img
                                    alt={work.title}
                                    className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0"
                                    src={work.src}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                    <p className="text-h4 text-black">{work.title}</p>
                                    <p className="text-caption text-zinc-500 mt-2">
                                        {work.sub}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* SERVICES SECTION */}
                <section className="bg-white py-32 px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1260px] mx-auto text-center mb-12">
                        <div className="mb-24">
                            <span className="text-caption text-zinc-500 block mb-6">Método</span>
                            <h2 className="text-h2 text-black">
                                Integrado. Intencional.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[
                                {
                                    icon: "brush",
                                    title: "Branding",
                                    desc: "DNA, narrativa e identidade. Marcas que ocupam espaço — não disputam atenção.",
                                },
                                {
                                    icon: "visibility",
                                    title: "Direção",
                                    desc: "Curadoria estética. Onde a sensibilidade encontra a intenção.",
                                },
                                {
                                    icon: "photo_camera",
                                    title: "Produção",
                                    desc: "Execução de alto padrão. Imagens que falam por si — sem precisar de legenda.",
                                },
                            ].map((service, i) => (
                                <div key={i} className="flex flex-col items-center space-y-6">
                                    <span className="material-symbols-outlined text-4xl font-extralight">
                                        {service.icon}
                                    </span>
                                    <h3 className="text-h3 text-black">{service.title}</h3>
                                    <p className="text-body text-secondary measure-tight">
                                        {service.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PHILOSOPHY SECTION */}
                <section style={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: 'auto', // Changed to auto to accommodate content, user requested template but auto is safer for layout
                    minHeight: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '80px 48px'
                }}>
                    <div 
                        className="parallax-bg"
                        style={{
                            position: 'absolute',
                            top: '-30%',
                            left: 0,
                            right: 0,
                            bottom: '-30%',
                        }} 
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="/videos/housemazutti-video-sao-paulo-agfencia-foto-video-angelo.mp4" type="video/mp4" />
                        </video>
                    </div>
                    
                    <div className="noise-overlay absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32 text-white">

                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-8">
                                <div className="max-w-xl text-left">
                                    <h2 className="text-h2 text-white mb-6">
                                        Marcas fortes não disputam atenção. Elas ocupam espaço.
                                    </h2>
                                    <p className="text-caption text-white/60">
                                        Filosofia House
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STRUCTURE SELECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="text-caption text-zinc-400 mb-6 block">Soluções</span>
                                <h2 className="text-h2 text-white">Uma casa. Três frentes.</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "HMZT | STUDIO",
                                        link: "/studio",
                                        subtitle: 'Foto, vídeo e direção de imagem pessoal.',
                                        items: ["Book profissional", "Ensaio pessoal", "Cobertura externa", "Direção de imagem"]
                                    },
                                    {
                                        title: "HMZT | PRODUTORA",
                                        link: "/produtora",
                                        subtitle: 'Campanhas de moda, beleza e narrativas institucionais.',
                                        items: ["Editorial de moda", "Campanha publicitária", "Conteúdo institucional", "Produção executiva"]
                                    },
                                    {
                                        title: "HMZT | AGÊNCIA",
                                        link: "/agencia",
                                        subtitle: 'Branding, campanhas e presença digital.',
                                        items: ["Branding project", "Campanhas", "Web development", "Direção de marca"]
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined" style={{ transition: 'transform 0.4s ease, box-shadow 0.4s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
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
                                        <Link href={card.link} className="w-full border border-black py-5 text-button hover:bg-black hover:text-white transition-all duration-500 group-hover:border-white group-hover:text-white text-center block">
                                            Saiba mais
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* TESTIMONIALS SECTION */}
                <section 
                    className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center py-20"
                    style={{ minHeight: '500px' }}
                    onMouseEnter={() => {}} // dummy to allow hover states
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
                            <svg
                                className="transform -translate-x-2"
                                fill="none"
                                height="24"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-16 inset-y-0 flex items-center z-20">
                        <button
                            className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300"
                            onClick={nextSlide}
                        >
                            <svg
                                className="transform translate-x-2"
                                fill="none"
                                height="24"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            <div className="custom-nav-line ml-2"></div>
                        </button>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <span className="text-caption text-zinc-500 block mb-4">
                                O que dizem
                            </span>
                            <h2 className="text-h2 text-white">Depoimentos</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1" style={{ minHeight: '220px' }}>
                                {testimonials.map((testimonial, i) => (
                                    <div
                                        key={i}
                                        className={`testimonial-slide ${currentSlide === i ? "active" : ""}`}
                                    >
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">
                                            “{testimonial.text}”
                                        </h3>
                                        <div className="pt-6">
                                            <p className="text-caption text-white/80">
                                                {testimonial.author}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Pagination Indicators */}
                            <div className="flex space-x-3 pt-4">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${currentSlide === i ? "opacity-100" : "opacity-30"
                                            }`}
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
                            <p className="text-caption" style={{ color: '#888', marginBottom: '16px' }}>
                                Editorial
                            </p>
                            <h2 className="text-h2" style={{ color: '#000' }}>
                                Últimos artigos
                            </h2>
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
                                            <p className="text-caption" style={{ color: '#888', marginBottom: '24px' }}>
                                                {post.categoria}
                                            </p>
                                            <h3 className="text-h3" style={{ color: 'inherit', marginBottom: '40px' }}>
                                                {post.titulo}
                                            </h3>
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

                <ClientLogos />

                {/* CTA CONTACT SECTION */}
                <section
                    className="bg-black py-64 px-12 text-center relative overflow-hidden"
                    id="contato"
                >
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white">
                            Se a sua marca pede um novo olhar.
                        </h2>
                        <div className="flex flex-col items-center space-y-10">
                            <button
                                type="button"
                                onClick={() => setIsHomeFormOpen(true)}
                                className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500"
                            >
                                Iniciar uma conversa
                            </button>
                            <p className="text-caption text-zinc-500">
                                Menos tentativa. Mais direção.
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
