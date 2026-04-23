'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'

export default function ProdutoraPage() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const testimonials = [
        {
            text: "A Produtora trouxe uma estratégia que não conseguíamos executar sozinhos. Eles não apenas criaram conteúdo, mas mudaram nossa percepção de marca.",
            author: "JULIANA T. — DIRETORA EXECUTIVA"
        },
        {
            text: "O que parecia complexo ficou simples através da direção deles. O resultado final superou todas as expectativas de posicionamento.",
            author: "RAFAEL S. — GERENTE DE MARKETING"
        },
        {
            text: "Trabalhar com a Produtora foi investir em posicionamento real. A execução impecável é apenas o reflexo de uma estratégia muito bem feita.",
            author: "CARLA M. — CEO"
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

    return (
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
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
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-4xl">
                            <span className="hero-animate font-label uppercase tracking-[0.3em] text-[10px] text-white/60 mb-8 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>PRODUTORA</span>
                            <h1 className="hero-animate font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 italic font-light" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                PRODUÇÃO E DIREÇÃO ARTÍSTICA PARA PUBLICIDADE
                            </h1>
                            <p className="hero-animate font-body text-base md:text-lg mb-10 text-white/70" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                Produção audiovisual, campanhas e conteúdo estratégico com direção criativa e posicionamento de marca.
                            </p>
                            <Link href="/contato">
                                <button className="hero-animate group relative px-10 py-3 border-[0.5px] border-white/30 text-white font-label text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                    INICIAR PROJETO
                                </button>
                            </Link>
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
                {/* Section 1: Grid de Imagens */}
                <section className="bg-white pt-16 pb-12 mx-auto" style={{ maxWidth: "95vw" }}>
                    <div className="mb-12 text-center flex flex-col items-center">
                        <span className="font-label uppercase tracking-[0.3em] text-[10px] text-zinc-400 block mb-4">PORTFOLIO PRODUTORA</span>
                        <h2 className="font-headline text-3xl text-black">PUBLICIDADE - CONTENT MKT - SET DESIGN</h2>
                        <div className="line-divider mt-6 text-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Cinema camera silhouette" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2g_W6V8_54y_wl4wNVTKKVKCOpBDnKyZk6BpUeQX4Pmxi9_0PQjAcsE-i0Jst6J978iPC0wXGhVlUFESwHZs5TCCjT2nA1AUxQFDv6EAyQOIdQJvDIm-R8_KWVi6K5gc-Y_B-S9TVyJ3edBmqb3QEwn41-UybUIoVWi1h1jl67BScFL5S22V5kf3jnmeYelv2wO0eyudpQyli4oQxSWkzhxmtxWQCpqfJasoSa8aIeFWuBRa4IoAKh2LKERYocrlIiV7EgvFYYew" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Campanha Brand Identity</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Produção Audiovisual</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="100" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Director working on set" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRMDMKmUwLGwsouoaA7vjdod3kTqWELL3b1zowH4gDqcpICu6WNGz5Fq9wuhf0SGFf_G8JSHBuAY7KwYE6G8y7IUWjZoRy_GVxj9jODc0pmn2Liqg2LRNrpiRy83NLchgjQCNEdq3wuEBHikGsuQ-NhvlYRnsb4kZIHRL3O1EtvTv11LxL0ZvsRhBZmf9P5xTPjTPcipcObCTTgP04bS5gb6EC2wt-dCUus1MZMtbdZjdkL_Vb-_u08BpGcIwnpycHJswr3f9UXpg" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Narrativa Visual</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Direção Criativa</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="200" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Professional lighting equipment" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT0pOVXqBESHOzRNU1hI6FPj_bo47wZRS9PqIj_Aup9mJVy3CTwLKLv08oZV5l0o7-AvpA7tGKDmXwXv0zqPTpmdysSKFZdriDagO8Wq3wuhdAZbHa6qn3f59eXrQUWGfQLp3Ryyxpmd1KigMIq2n2kVuANmmQDqhgbp0eeBkR3C91iVQry8ZYTCe01wZOoQfx7XIZVD1iR-dv0zQxwbaM6lczztTK6XRP_D9tpr5YSkh4gY0peH0NhxvU4_BXefXaLpCDOfV7MlY" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Lançamento Estratégico</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Execução com Direção</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Action scene filming" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVJivpJ0VnE6CHpWpnIjrbbpiXTi5Poa8jvE3JumOJCHEna0D5Q6oCjJUdHd7ot8_bthWRL5SoEDyULzMLel1P9vtmUjWwqefSv4bd9yK2fWYe1ZlT6nh3IWG9wjRaQosD6Utm1Ig9ahn9DKRMLN8cy610DnLxz80now3DGSbxkysNEo7rNPEF9Miw2ex16HyF_xHkeroob3axAgyrT_clXCpZCjgbj_QI8kV189C8FBy8DGmzWx7i1vtaSJa2xUwE3zCV5tBGjHA" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Conteúdo de Impacto</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Campanha Audiovisual</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="100" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Studio setup B&W" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_6PXbyKGYvJxEbfzmXmRW19QciE4tJ9x-FZZvcUtReBGabFvxftvIdLDGss_UhG68_ITk3-kfWI0CkUuUjHH0YxkYi0Tg3xBrTgcnG860e_EoEYEmh7vX3vZCkobOLmDbCnGZskKBBteD-Jmj5INS1jizmQQiRezM3x8Wr4VAX6xNgci8xCyo3j-73qG5yVZhO-4B9WOW8eV54FdxYsDFoxMfle0q7JCCa1bGlsqr0wHz9I-EXgWR3FiQ6NmbFkqgZAp8vzRDNyk" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Posicionamento Visual</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Produção de Imagem</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="200" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Editing suite grayscale" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyUqrC1IPUBPww33DCYdPY-7rOtg3lbmED38AelB0tTYn2MqPYkcGERtvWHA4drxpuUpc6LjhAD_s412vsfHpePPmcnutpewD5ek8asJiuUlereQ0qIRuleREigir4zmljVvSfIYyk5MkWPNVHXDQmwE5WjptCHK-Ws4bZgkFm122i6hYLBxvKLJmJokhLA61Uy9tN1bBURioVEBydJuPBs0MMbox5XQFN21ybdZhxcrFInqC_LCTxyNJkl5oJMEIqnt8BgbsZ8Zg" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Processo Estratégico</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Controle de Percepção</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section 2: Cards Informativos */}
                <section className="bg-white py-32 px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1260px] mx-auto text-center">
                        <div className="mb-20">
                            <span className="font-label uppercase tracking-[0.3em] text-[10px] text-black block mb-4">PRODUTORA</span>
                            <h2 className="font-label text-2xl md:text-3xl text-center">MAIS QUE UMA PRODUÇÃO VISUAL, MÉTODO COMPROVADO</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="flex flex-col items-center space-y-4">
                                <span className="material-symbols-outlined text-4xl font-extralight" data-icon="lightbulb">lightbulb</span>
                                <h3 className="font-headline text-2xl">O que precisa ser comunicado.</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    Mensagem estratégica definida antes da execução.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <span className="material-symbols-outlined text-4xl font-extralight" data-icon="film_strip">film_strip</span>
                                <h3 className="font-headline text-2xl">Como deve ser executado.</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    Direção criativa que transforma briefing em realidade.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <span className="material-symbols-outlined text-4xl font-extralight" data-icon="trending_up">trending_up</span>
                                <h3 className="font-headline text-2xl">E qual resultado deve gerar.</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    Percepção, autoridade e posicionamento consolidados.
                                </p>
                            </div>
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
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Estratégia.</h3>
                                        <p className="font-raleway font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Clareza</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Narrativa.</h3>
                                        <p className="font-raleway font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Coerência</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Execução.</h3>
                                        <p className="font-raleway font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Precisão</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Resultado.</h3>
                                        <p className="font-raleway font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Consolidação</p>
                                    </div>
                                </div>
                                <div className="max-w-3xl text-left border-t border-zinc-200 pt-8">
                                    <p className="font-headline text-xl italic leading-snug text-zinc-800">
                                        Aqui, cada detalhe responde a uma lógica. Nada é escolha estética isolada. Tudo é construção de posicionamento.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section 4: Equipe */}
                <section className="bg-white px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-12">
                            <span className="font-label uppercase tracking-[0.3em] text-zinc-400 block mb-2 text-[10px]">QUEM ESTRUTURA</span>
                            <h2 className="font-headline text-3xl md:text-4xl text-black">Estratégia define. Execução consolida. Imagem posiciona.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto max-w-[1386px]">
                            {/* Membro 1 */}
                            <div className="space-y-8 flex flex-col items-center text-center mb-12">
                                <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                    <img alt="Lucas Mazzutti portrait" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0ESFf2VKUU01w1wDMvk9GSzceC_56tjvoVLme8E1KeN98y_Zc3Czxb47l9-giIZLy7mSRrqHj9zj4TNrDYF6-qHHrlZuYs5OK6L-MpUmwXBgRDC4HMoVG8uxvsjqwE64sm9SsADinIThjiDc6trCJ-GmADEkDjQ0xr990PJiKiBjDqIYnnO-J5hBFPuV90jlKCFIBhboqE9gA8O9y-e8JChB007vHeibnqmOp4yCmQIb11a7NCtW4pVkEGk5sdSQduOjAStefyk" />
                                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-headline text-2xl font-medium">Ângelo Mazzutti</p>
                                    <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Dir. Criativo e Publicitário</p>
                                </div>
                            </div>
                            {/* Membro 2 */}
                            <div className="space-y-8 flex flex-col items-center text-center mb-12">
                                <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                    <img alt="Elena Silva portrait" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKZY7vY0_xHh4W3MKSd3jlEIhiiS5gF9XM3hbMqdr3jwFr16elkblrJVykxmXHcbVQeSdE7P4M_onqrLajroloIvYyXsYw_0dkx6h0ZB_8-X1qnqw4DSmV8kmBfkcAOXNZeI0dmCOHcnkHUelR4XxcDwB4AvZY1mvpxgCC2uMnR-KZ6SBTSb2TJ9SVM4WCCr2S10Gy74ML33Hkky5gHCBsKXvXWS5RGCOi9p4IhVIH2fWSwjIYsSOGaHsZpmM2Y5DpYCs4eCRR17g" />
                                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-headline text-2xl font-medium">Mateus Sacavem</p>
                                    <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Produtor Executivo</p>
                                </div>
                            </div>
                            {/* Membro 3 */}
                            <div className="space-y-8 flex flex-col items-center text-center mb-12">
                                <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                    <img alt="Arthur Porto portrait" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa6TINUvFDwA7LqkkHXDdt1XoEvOHZPH3W5C2QvV6FRZfba0ajm5Uz7SjeIBB2cvjuqSy1_kYZlLfz-iW_L4qigAleWRqobN3LB08IXDDRI5N-GPiiRLh0Q3f-1by3ux6jIwMvx-36JFc9OdYIW0AifoBbPdrqq0aQY6QlBeQ_0tjxfuTSZLNTq9-cWum4QH8VCNJldD682F3o4XhHqfQ4p-LB97VETj8FHvw2375aLuDGGogL3XhITfCpJK56DcJ_QXEXNFpfMM8" />
                                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-headline text-2xl font-medium">Henry Almeida</p>
                                    <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Gestor de IA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* TESTIMONIALS SECTION */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[500px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-black text-[18vw] uppercase tracking-[0.1em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-50">DEPOIMENTOS</span>
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
                        <div className="mb-4">
                            <span className="font-raleway uppercase tracking-[0.4em] text-[10px] text-zinc-500 block mb-1">O QUE DIZEM</span>
                            <h2 className="font-headline text-3xl text-white italic tracking-wide">Depoimentos</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1">
                                {testimonials.map((testimonial, i) => (
                                    <div key={i} className={`testimonial-slide ${currentSlide === i ? 'active' : ''}`}>
                                        <h3 className="font-headline text-2xl md:text-[2.15rem] text-white leading-snug italic max-w-3xl mx-auto">
                                            "{testimonial.text}"
                                        </h3>
                                        <div className="pt-3">
                                            <p className="font-raleway uppercase tracking-[0.35em] text-[10px] text-white/80 font-light">{testimonial.author}</p>
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
                {/* Section 6: Posicionamento */}
                {/* BLOG SECTION */}
                <section style={{ background: '#fff', padding: '160px 80px' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                        <div style={{ marginBottom: '60px' }}>
                            <p style={{
                                fontSize: '12px', letterSpacing: '0.2em',
                                textTransform: 'uppercase', color: '#aaa', marginBottom: '12px'
                            }}>
                                BLOG
                            </p>
                            <h2 style={{ fontSize: '2.8rem', fontWeight: '400', color: '#000' }}>
                                Últimos Artigos
                            </h2>
                        </div>

                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '2px'
                        }}>
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
                                            <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '20px' }}>
                                                {post.categoria}
                                            </p>
                                            <h3 style={{ fontSize: '1.6rem', fontWeight: '400', lineHeight: '1.4', color: 'inherit', marginBottom: '40px' }}>
                                                {post.titulo}
                                            </h3>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '11px', color: '#aaa' }}>{post.data}</span>
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
                {/* Section 7: Editorial CTA */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-16">
                        <h2 className="font-headline text-4xl md:text-6xl text-white leading-tight italic">
                            Se sua produção não consolida posicionamento — <span className="not-italic">o problema não é a execução.</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto border-y border-white/10 py-12">
                            <div className="space-y-4">
                                <p className="font-label uppercase tracking-widest text-[10px] text-zinc-500">Deixa de:</p>
                                <ul className="text-white space-y-2 font-light">
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white/40"></span> <span>Produção sem estratégia</span></li>
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white/40"></span> <span>Execução sem resultado</span></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <p className="font-label uppercase tracking-widest text-[10px] text-zinc-500">Passa a:</p>
                                <ul className="text-white space-y-2 font-light">
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white"></span> <span>Conteúdo com direção</span></li>
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white"></span> <span>Imagem que consolida</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-8">
                            <Link className="inline-block px-16 py-6 border-[0.5px] border-white text-white font-label uppercase tracking-[0.3em] text-[12px] hover:bg-white hover:text-black transition-all duration-300" href="/contato">
                                INICIAR CONVERSA ESTRATÉGICA
                            </Link>
                            <p className="font-label uppercase tracking-widest text-[9px] text-zinc-500">Menos volume. Mais direção.</p>
                        </div>
                    </div>
                </section>
                            {/* STRUCTURE SELECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-4 block">ESCOLHA SEU NÍVEL</span>
                                <h2 className="font-headline text-4xl md:text-5xl tracking-tight">Escolha o nível ideal para o seu momento.</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "EDITORIAL DE MODA",
                                        link: "/produtora/moda",
                                        subtitle: '"Onde a estratégia ganha forma e presença"',
                                        items: ["Produção de conteúdo", "Direção de arte", "Lookbook", "Fashion film"]
                                    },
                                    {
                                        title: "CAMPANHA PUBLICITÁRIA",
                                        link: "/produtora/publicidade",
                                        subtitle: '"Onde execução e estratégia se conectam"',
                                        items: ["Produção executiva", "Direção criativa", "Audiovisual", "Gestão completa"]
                                    },
                                    {
                                        title: "CONTEÚDO INSTITUCIONAL",
                                        link: "/produtora/institucional",
                                        subtitle: '"Onde a empresa ganha presença e clareza"',
                                        items: ["Vídeo institucional", "Vídeo explicativo", "Cases", "Cobertura de eventos"]
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined scroll-reveal" data-delay={idx * 150} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.4s ease, box-shadow 0.4s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                        <div>
                                            <h3 className="font-headline text-2xl mb-4 group-hover:text-white uppercase">{card.title}</h3>
                                            <p className="font-body font-light text-sm text-on-surface-variant mb-10 group-hover:text-white/70 italic">{card.subtitle}</p>
                                            <ul className="space-y-4 mb-12">
                                                {card.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant group-hover:text-white/80">
                                                        <span className="material-symbols-outlined text-lg">check</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Link href={card.link} className="w-full border border-black py-4 font-label uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all group-hover:border-white group-hover:text-white text-center block">
                                            SAIBA MAIS
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
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
    )
}
