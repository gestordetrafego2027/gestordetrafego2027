'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import ClientLogos from '@/app/components/ClientLogos'
import FormDrawer from '@/app/components/FormDrawer'
import FormAgenciaB2B from '@/app/components/forms/FormAgenciaB2B'

export default function AgenciaPage() {
    const [formCta, setFormCta] = useState(null)
    const openForm = (ctaLocation) => setFormCta({ ctaLocation })
    const closeForm = () => setFormCta(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0)
    const prevBanner = () => setCurrentBannerSlide(prev => (prev - 1 + 3) % 3)
    const nextBanner = () => setCurrentBannerSlide(prev => (prev + 1) % 3)

    const testimonials = [
        {
            text: "Reposicionaram nossa marca em três meses. Não entregavam um pacote — entregavam uma forma nova de existir.",
            author: "JULIANA T."
        },
        {
            text: "Marca, identidade e site nasceram da mesma cabeça. Nada se perdeu entre etapas — porque não havia etapas separadas.",
            author: "RAFAEL S."
        },
        {
            text: "Saímos com uma marca que sustenta preço. O retorno não está no design — está no lugar que ele autoriza ocupar.",
            author: "CARLA M."
        }
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerSlide(prev => (prev + 1) % 3)
        }, 7000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            <title>Agência HMZT — Branding, Design e Digital | House Mazzutti</title>
            <style dangerouslySetInnerHTML={{
                __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
                    font-size: 20px;
                }
                .hero-slider-container {
                    perspective: 1000px;
                }
                .fade-in {
                    animation: fadeIn 1.2s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .nav-line {
                    width: 40px;
                    height: 1px;
                    background-color: white;
                    transition: width 0.3s ease, opacity 0.3s ease;
                }
                .nav-btn:hover .nav-line {
                    width: 60px;
                }
                .text-justify-none { text-align-last: left; }
                .masonry-item:nth-child(even) { margin-top: 4rem; }
                .letter-spacing-huge { letter-spacing: 0.3em; }
                .line-divider { height: 0.5px; width: 100px; background-color: currentColor; opacity: 0.3; }
                .noise-overlay {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.02;
                    pointer-events: none;
                }
                .custom-nav-line {
                    width: 40px;
                    height: 1px;
                    background-color: white;
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .custom-nav-btn:hover .custom-nav-line {
                    width: 70px;
                }
                .testimonial-slide {
                    display: none;
                    animation: slideFade 0.6s ease-in-out forwards;
                }
                .testimonial-slide.active {
                    display: block;
                }
                @keyframes slideFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />

            <Header variant="dark" />

            <main>
                {/* HERO */}
                <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: "105vh" }}>
                    {(() => {
                        const heroSlides = [
                            { titulo: 'Direção, identidade e presença de marca.', texto: 'Da consolidação do branding à identidade visual e ao plano de campanha integrada.' },
                            { titulo: 'Marcas fortes não disputam atenção. Ocupam espaço.', texto: 'Construímos presença com clareza, consistência e intenção.' },
                            { titulo: 'Da criação à reputação.', texto: 'Cada decisão de marca nasce de uma leitura cuidadosa do contexto e do público.' },
                        ];
                        return <>
                            <div className="absolute inset-0 z-0">
                                {['/images/agencia/banners/banner-1.jpg','/images/agencia/banners/banner-2.jpg','/images/agencia/banners/banner-3.jpg'].map((src, i) => (
                                    <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{opacity: currentBannerSlide === i ? 1 : 0}}>
                                        <img src={src} className="w-full h-full object-cover object-top" alt="" />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                                <div className="max-w-3xl">
                                    <span className="hero-animate text-caption text-white/70 mb-6 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>Agência — HMZT</span>
                                    <h1 className="hero-animate text-h1 text-white mb-8" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        {heroSlides[currentBannerSlide].titulo}
                                    </h1>
                                    <p className="hero-animate text-body text-white/80 mb-12 measure-editorial" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        {heroSlides[currentBannerSlide].texto}
                                    </p>
                                    <button type="button" onClick={() => openForm('hero')} className="hero-animate group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        Iniciar projeto
                                    </button>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 left-12 flex items-center z-20">
                                <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity" onClick={prevBanner}>
                                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                        <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                                        <svg className="-ml-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    </div>
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-12 flex items-center z-20">
                                <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity" onClick={nextBanner}>
                                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                        <svg className="-mr-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                                    </div>
                                </button>
                            </div>
                        </>;
                    })()}
                </section>

                {/* Section 2: Gallery */}
                <section className="bg-white pt-24 pb-0 w-full mx-auto">
                    <div className="mb-20 text-center flex flex-col items-center">
                        <span className="text-caption text-zinc-500 block mb-6">Portfólio Agência</span>
                        <h2 className="text-h2 text-black">Branding. Publicidade. RP e Eventos.</h2>
                        <div className="line-divider mt-8 text-black"></div>
                    </div>
                    <div className="columns-gallery-container" style={{ height: '80vh' }}>
                        <Link className="gallery-column project-item group" href="/portfolio-agencia/samrat">
                            <img alt="Samrat" className="column-image" src="/images/agencia/samrat/1.jpg"/>
                            <div className="project-overlay">
                                <span>Branding</span>
                                <h4>Samrat</h4>
                            </div>
                        </Link>
                        <Link className="gallery-column project-item group" href="/portfolio-agencia/on-take">
                            <img alt="On Take" className="column-image" src="/images/agencia/on-take/1.jpg"/>
                            <div className="project-overlay">
                                <span>Publicidade</span>
                                <h4>On Take</h4>
                            </div>
                        </Link>
                        <Link className="gallery-column project-item group" href="/portfolio-agencia/mabdo">
                            <img alt="Mabdo" className="column-image" src="/images/agencia/mabdo/1.jpg"/>
                            <div className="project-overlay">
                                <span>RP e Eventos</span>
                                <h4>Mabdo</h4>
                            </div>
                        </Link>
                        <Link className="gallery-column project-item group" href="/portfolio-agencia/knowhol">
                            <img alt="Knowhol" className="column-image" src="/images/agencia/knowhol/1.jpg"/>
                            <div className="project-overlay">
                                <span>Estratégia</span>
                                <h4>Knowhol</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link className="group relative px-12 py-4 border-[0.5px] border-black/30 text-black text-button hover:bg-black hover:text-white transition-all duration-500" href="/portfolio-agencia">
                            Ver todo o portfólio
                        </Link>
                    </div>
                </section>
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato" style={{minHeight: 'auto', paddingTop: '80px', paddingBottom: '80px'}}>
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white">
                            Da criação à reputação.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto border-y border-white/10 py-16">
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">Antes de qualquer ação, estruturamos</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40"></span> <span>direção de marca</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40"></span> <span>narrativa e linguagem</span></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">E sustentamos com</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white"></span> <span>identidade visual e sistema gráfico</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white"></span> <span>presença digital com cuidado</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-10">
                            <button type="button" onClick={() => openForm('final')} className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                Entender como funciona
                            </button>
                            <p className="text-body text-zinc-400 max-w-2xl measure-editorial text-center">
                                A partir disso, tudo passa a ter lógica. O resultado não é apenas técnica — é clareza aplicada. A Agência não executa isoladamente: ela direciona todo o sistema.
                            </p>
                        </div>
                    </div>
                </section>
                {/* STRUCTURE SELECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="text-caption text-zinc-400 mb-6 block">Para empresários e autônomos</span>
                                <h2 className="text-h2 text-white">Qual dessas frentes pode ajudar sua marca hoje?</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "BRANDING PROJECT",
                                        link: "/agencia/branding",
                                        subtitle: 'Onde a marca é definida e estruturada.',
                                        items: ["Construção de marca", "Identidade visual", "Brand book", "Aplicações"]
                                    },
                                    {
                                        title: "CAMPANHAS",
                                        link: "/agencia/campanhas",
                                        subtitle: 'Onde o impacto nasce com cuidado.',
                                        items: ["Campanhas publicitárias", "Narrativa integrada", "Produção", "Multicanal"]
                                    },
                                    {
                                        title: "WEB DEVELOPMENT",
                                        link: "/agencia/desenvolvimento",
                                        subtitle: 'Onde sua marca ganha presença digital.',
                                        items: ["Sites profissionais", "E-commerce", "SEO", "Performance"]
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined scroll-reveal" data-delay={idx * 150} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.4s ease, box-shadow 0.4s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
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
                                {testimonials.map((testimonial, i) => (
                                    <div key={i} className={`testimonial-slide ${currentSlide === i ? 'active' : ''}`}>
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
                                        className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${currentSlide === i ? 'opacity-100' : 'opacity-30'}`}
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

                {/* Section 3: Conceitos em Colunas */}
                <section className="relative bg-zinc-50/50 px-12 overflow-hidden py-32">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/4 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm">
                                <img alt="B&W production set" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-xLyiPsyfV2aUDjj4bLVN-3PR3HTgwb2sBZ2lNLOnRCx5P32jkgh8ax5ZPBG1rbNGZv4_Z-SbpotTgPOzOyPI4yxtxOO9cQDxh4T1a5XqIyeGGIWyVItbLrFI9bHo0SMNos-LC-NwPVMpqExEbiVz8H_jbGSpE2m8WK3FlOJZC4OmovBhNVqgta-wv3V9oN9cGfrZ_LWx1Cn9gD0JTHjmCxn-uVL5ipKqjmTIRT1N5FlL1eCVuUq4PGege9Tjt5mdnWfhkxSsidA" />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Estratégia.</h3>
                                        <p className="text-caption text-zinc-500">Clareza</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Narrativa.</h3>
                                        <p className="text-caption text-zinc-500">Coerência</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Execução.</h3>
                                        <p className="text-caption text-zinc-500">Precisão</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Resultado.</h3>
                                        <p className="text-caption text-zinc-500">Consolidação</p>
                                    </div>
                                </div>
                                <div className="max-w-3xl text-left border-t border-zinc-200 pt-10">
                                    <p className="text-h4 text-zinc-800">
                                        Aqui, cada detalhe responde a uma lógica. Nada é escolha isolada — tudo é construção de presença.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ClientLogos />

                {/* FINAL CTA SECTION */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato-final" style={{minHeight: 'auto', paddingTop: '80px', paddingBottom: '80px'}}>
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white">
                            Sua marca merece ocupar espaço — não disputar atenção.
                        </h2>
                        <div className="flex flex-col items-center space-y-10">
                            <Link className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500" href="/contato">
                                Iniciar uma conversa
                            </Link>
                            <p className="text-caption text-zinc-500">Menos tentativa. Mais direção.</p>
                        </div>
                    </div>
                </section>
            </main>
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
                isOpen={!!formCta}
                onClose={closeForm}
                title="Iniciar projeto"
                subtitle="Conte-nos sobre seu desafio. Respondemos em até 1 dia útil."
            >
                <FormAgenciaB2B
                    onClose={closeForm}
                    sourceUrl="/agencia"
                    ctaLocation={formCta?.ctaLocation ?? null}
                />
            </FormDrawer>
            <style dangerouslySetInnerHTML={{ __html: `
                .columns-gallery-container {
                    height: 80vh;
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                }
                .gallery-column {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    border-right: 1px solid rgba(0, 0, 0, 0.05);
                }
                .gallery-column:last-child {
                    border-right: none;
                }
                .column-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            `}} />
        </div>
    )
}
