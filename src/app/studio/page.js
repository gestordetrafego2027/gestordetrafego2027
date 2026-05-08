'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'

export default function StudioPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentGallerySlide, setCurrentGallerySlide] = useState(0)
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0)
    const prevBanner = () => setCurrentBannerSlide(prev => (prev - 1 + 3) % 3)
    const nextBanner = () => setCurrentBannerSlide(prev => (prev + 1) % 3)

    const nextGallerySlide = () => setCurrentGallerySlide(prev => (prev + 1) % 11)
    const prevGallerySlide = () => setCurrentGallerySlide(prev => (prev - 1 + 11) % 11)

    const testimonials = [
        {
            text: "A House Mazzutti trouxe uma clareza que eu não conseguia encontrar sozinho. Eles não apenas criaram uma marca, eles criaram um novo patamar para o meu negócio.",
            author: "JULIANO R. — FOUNDER & CEO"
        },
        {
            text: "O posicionamento estratégico mudou completamente a percepção do mercado sobre nossos serviços. A estética é apenas a ponta do iceberg.",
            author: "MARINA S. — DIRETORA DE ARTE"
        },
        {
            text: "Trabalhar com o Lucas e sua equipe foi o melhor investimento do ano. Eles entendem de negócio tanto quanto entendem de design.",
            author: "RICARDO M. — INVESTIDOR"
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
        <div className="bg-white text-black selection:bg-black selection:text-white">



            <Header variant="dark" />
            <main>
                <section className="relative w-full overflow-hidden bg-zinc-900" style={{ height: "100vh" }}>
                    <div className="absolute inset-0 z-0">
                        {['/images/studio/banners/banner-1.jpg','/images/studio/banners/banner-2.jpg','/images/studio/banners/banner-3.jpg'].map((src, i) => (
                            <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{opacity: currentBannerSlide === i ? 1 : 0}}>
                                <img src={src} className="w-full h-full object-cover grayscale opacity-40" alt="" />
                            </div>
                        ))}
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center swiss-grid">
                        <div className="max-w-4xl">
                            <span className="hero-animate label-micro text-white/40 mb-8 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>Studio & Production</span>
                            <h1 className="hero-animate hero-title text-white mb-12" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                A imagem como ativo estratégico de valor.
                            </h1>
                            <p className="hero-animate body-text text-white/40 mb-16 max-w-2xl" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                Construímos narrativas visuais que transcendem o estético, focadas em posicionamento, autoridade e impacto de mercado.
                            </p>
                            <Link href="/contato">
                                <button className="hero-animate btn-swiss !border-white text-white hover:bg-white hover:text-black" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                    INICIAR PROJETO
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-40 swiss-grid">
                    <div className="mb-24">
                        <span className="label-micro text-zinc-400 block mb-4">Trabalhos</span>
                        <h2 className="section-title">Selected Works</h2>
                    </div>
                    <div className="relative w-full group overflow-hidden" style={{ height: '80vh' }}>
                        <div className="columns-gallery-container w-full h-full flex">
                            {[
                                { href: '/portfolio-studio/amanda-oliveira', src: '/images/studio/amanda-oliveira/capa.jpg', label: 'Book', name: 'Amanda Oliveira' },
                                { href: '/portfolio-studio/talita-dalbo', src: '/images/studio/talita-dalbo/capa.jpg', label: 'Ensaio', name: 'Talita Dalbó' },
                                { href: '/portfolio-studio/jamile-caroline', src: '/images/studio/jamile-caroline/capa.jpg', label: 'Book', name: 'Jamile Caroline' },
                                { href: '/portfolio-studio/leif-sinclar', src: '/images/studio/leif-sinclar/capa.jpg', label: 'Ensaio', name: 'Leif Sinclar' }
                            ].map((model, i) => (
                                <Link key={i} className="gallery-column project-item group border-r border-zinc-100" href={model.href} style={{ flex: '1' }}>
                                    <img alt={model.name} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" src={model.src}/>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-8">
                                        <span className="label-micro text-white/60 mb-4">{model.label}</span>
                                        <h4 className="subsection-title text-white">{model.name}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-100 py-40 swiss-grid">
                    <div className="max-w-[1600px] flex flex-col lg:flex-row items-center gap-24">
                        <div className="w-full lg:w-1/3">
                            <div className="relative aspect-[3/4] overflow-hidden grayscale">
                                <img alt="Editorial details" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHOOyecCxbUCU6_y9vpcFi6a1ZBmoHI59QTvX7-mYJHcU8SfV0rY1_M6fRpvrgcf1v5KuSRnO7opF15zAf29T5zCf08pMyHvaiZ3XGXEBKtgBCjkNScMmeU5GGltKS0Oo9t0Wv3bGq9PB3UvL93v_LlQkpfl3-LhK55rlnWxOMKNZTON2x8enWcwwJDVBKYCalcw0uB02-OgQAnRr5qEJ7eUY62VPxKwDfWI5Gesxo3Y6IZInsc8yYwcsY2YWwYfHsV3jGxJqCcg" />
                            </div>
                        </div>
                        <div className="flex-grow w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Luz.</h3>
                                    <p className="label-micro text-zinc-400">Direcionamento</p>
                                </div>
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Composição.</h3>
                                    <p className="label-micro text-zinc-400">Equilíbrio</p>
                                </div>
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Movimento.</h3>
                                    <p className="label-micro text-zinc-400">Dinâmica</p>
                                </div>
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Expressão.</h3>
                                    <p className="label-micro text-zinc-400">Intenção</p>
                                </div>
                            </div>
                            <div className="max-w-2xl border-t border-zinc-200 pt-12">
                                <p className="section-title !text-2xl text-zinc-800">
                                    Antes de qualquer produção, definimos a percepção, o posicionamento e a linguagem visual que sustenta o seu projeto.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-40 swiss-grid">
                    <div className="mb-24">
                        <span className="label-micro text-zinc-400 block mb-4">Processo</span>
                        <h2 className="section-title">Como Entregamos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        <div className="space-y-8">
                            <span className="label-micro text-zinc-300">01 / Estratégia</span>
                            <h3 className="subsection-title">PRÉ PRODUÇÃO</h3>
                            <div className="body-text text-zinc-500 space-y-4">
                                <p>— Briefing e imersão</p>
                                <p>— Direção criativa</p>
                                <p>— Moodboard conceitual</p>
                                <p>— Scouting de locação</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <span className="label-micro text-zinc-300">02 / Criação</span>
                            <h3 className="subsection-title">EXECUÇÃO</h3>
                            <div className="body-text text-zinc-500 space-y-4">
                                <p>— Direção de cena</p>
                                <p>— Iluminação técnica</p>
                                <p>— Captação high-end</p>
                                <p>— Direção de arte</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <span className="label-micro text-zinc-300">03 / Refinamento</span>
                            <h3 className="subsection-title">PÓS-PRODUÇÃO</h3>
                            <div className="body-text text-zinc-500 space-y-4">
                                <p>— Curadoria de ativos</p>
                                <p>— Edição editorial</p>
                                <p>— Color grading</p>
                                <p>— Entrega final</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-100 py-40 swiss-grid">
                    <div className="mb-24">
                        <span className="label-micro text-zinc-400 block mb-4">Estruturas</span>
                        <h2 className="section-title">Níveis de Ensaio</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-200">
                        {[
                            { title: "BOOK", subtitle: "Imagem com intenção e propósito", items: ["Book Profissional", "Direção de Imagem", "Ensaio Estratégico"] },
                            { title: "ENSAIO", subtitle: "Presença e autoridade visual", items: ["Ensaio Pessoal", "Direção de Imagem", "Posicionamento Visual"] },
                            { title: "COBERTURA", subtitle: "Narrativa visual de agenda", items: ["Acompanhamento Real", "Captação Estratégica", "Direção de Presença"] }
                        ].map((card, i) => (
                            <div key={i} className="p-16 bg-white border-r border-zinc-200 last:border-r-0 hover:bg-black group transition-all duration-700">
                                <h3 className="subsection-title mb-2 group-hover:text-white">{card.title}</h3>
                                <p className="label-micro text-zinc-400 mb-12 group-hover:text-white/40">{card.subtitle}</p>
                                <ul className="space-y-4 mb-16">
                                    {card.items.map((item, j) => (
                                        <li key={j} className="label-micro text-zinc-500 group-hover:text-white/60">• {item}</li>
                                    ))}
                                </ul>
                                <Link href="/contato" className="btn-swiss w-full text-center group-hover:!border-white group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-black">
                                    SAIBA MAIS
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-black py-64 swiss-grid text-center">
                    <div className="max-w-4xl mx-auto space-y-24">
                        <h2 className="hero-title text-white">Pronto para elevar o nível da sua imagem?</h2>
                        <div className="flex flex-col items-center">
                            <Link href="/contato" className="btn-swiss !border-white text-white hover:bg-white hover:text-black">
                                INICIAR CONVERSA
                            </Link>
                        </div>
                    </div>
                </section>            </main>
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
    )
}
