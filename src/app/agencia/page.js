'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'

export default function AgenciaPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0)

    const testimonials = [
        {
            text: "A Agência trouxe uma estratégia que não conseguíamos executar sozinhos. Eles não apenas criaram conteúdo, mas mudaram nossa percepção de marca.",
            author: "JULIANA T. — DIRETORA EXECUTIVA"
        },
        {
            text: "O que parecia complexo ficou simples através da direção deles. O resultado final superou todas as expectativas de posicionamento.",
            author: "RAFAEL S. — GERENTE DE MARKETING"
        },
        {
            text: "Trabalhar com a Agência foi investir em posicionamento real. A execução impecável é apenas o reflexo de uma estratégia muito bem feita.",
            author: "CARLA M. — CEO"
        }
    ]

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    const goToSlide = (index) => setCurrentSlide(index)

    useEffect(() => {
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
        }, { threshold: 0.1 })

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))

        return () => {
            clearTimeout(timer)
            observer.disconnect()
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
                        {['/images/agencia/banners/banner-1.jpg','/images/agencia/banners/banner-2.jpg','/images/agencia/banners/banner-3.jpg'].map((src, i) => (
                            <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{opacity: currentBannerSlide === i ? 1 : 0}}>
                                <img src={src} className="w-full h-full object-cover grayscale opacity-40" alt="" />
                            </div>
                        ))}
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center swiss-grid">
                        <div className="max-w-4xl">
                            <span className="hero-animate label-micro text-white/40 mb-8 block">AGÊNCIA & ESTRATÉGIA</span>
                            <h1 className="hero-animate hero-title text-white mb-12">
                                Marcas que ocupam espaço não disputam atenção.
                            </h1>
                            <p className="hero-animate body-text text-white/40 mb-16 max-w-2xl">
                                Consolidamos sua presença de mercado através de branding estratégico, narrativas autorais e posicionamento de luxo.
                            </p>
                            <Link href="/contato">
                                <button className="hero-animate btn-swiss !border-white text-white hover:bg-white hover:text-black">
                                    INICIAR PROJETO
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-40 swiss-grid">
                    <div className="mb-24">
                        <span className="label-micro text-zinc-400 block mb-4">Portfólio</span>
                        <h2 className="section-title">Branding & Campaign</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-0">
                        {[
                            { href: '/portfolio-agencia/projeto-1', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdxXFX7iKpq0zTawLFzSng94FTqC8QmssH8UIMx6iZPuEIeFFimi1DVlCzdNyAx-7ZzfPyqfr0PD6Y1do7BO7upE9uT3z0p7MEC9gOT_-QcmR7D7n9ILiUC72Uk3pncnUI-_utLLZq5O5bw8uWL8Uhc81cOJJrRI8pIlDbC50zmv068KM36T4yaevUGEelVmUiACfma2Mp-Jji656PY9miFy3wYlgOE1SMbeKRGv64DJYBquV2fYfxpF_O5NEfaOEoodNYyOVGYbra', label: 'Branding', name: 'Identity System 01' },
                            { href: '/portfolio-agencia/projeto-2', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXeu4Q08taagUiEU0oRy_WfWhic5_qLyLr1nXiBqhc49nYHLtgfzpzEknKHC8c18ICqtqLpI81ZgZeonbUv0whZLdOv-wFF7-x62Kpc8fI3cLDkDInEk0QTvLeB7F2siMYzg5AlMqvEHYdV9DOMr5l9PhPHywbNjxQfqRb6RJISWTCL3R1yQdE1mz2ozPE26wr0Ij3x5GEULlpnWjhfOYPIb-guSnqGxsDWX_tlCcse-g3jZRoMhAZDIh0TzUEbKyPeee9Z9TOUIcB', label: 'Publicidade', name: 'Strategic Campaign' },
                            { href: '/portfolio-agencia/projeto-3', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNQL0BMQnfMGPt4hTwlz-SRUMnYZY4U5rG1WC6bylLDfghCKoScI3rtpRwlyty_5PL09Vbt5K5tjv2Pp4-F6DaT4vQQn32NU6RVnbTca6MvLSdJ3P2IaWqPQ8i_Sh1qc8zHS_87TVXHIWybRC-X8TV2IVZaLxtF8jU__u11uNp7rGD1OLQvEDOlyB1tqw8HHtm4tgB8JIsNQbhQqbg5JFrpCNdqI3FMcHyTCBsrPcfvRtxA_GMi4_VS4HK8umC5pps_0sPIO8q68n5', label: 'Events', name: 'RP Experience' },
                            { href: '/portfolio-agencia/projeto-4', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChtDNB7cdME0kaLamJozRvfkiJws6GrvrXBnE5QRIkxB2ppxix4CG2r_LeyGl5XP-xuzQILDQ9-6ZIMjAYUHBdzn-iH8v6Lxpa6zwjO6xR4CnSkRVonntUc7FphscJZCyOhoEd8rxJtVVZ2nPrj287s6BVqdbOQ52N9vhkG5IWwtk5vxPNnArouHvfxTGaIBJYgAcsGk1qElyInif8vlUCMxZkTDnPAmv_bx8gd_oQ9L1BxaSnKbCHQ8jqgLy-kf1WgkTEZeSrrMLR', label: 'Digital', name: 'Ecosystem Build' }
                        ].map((project, i) => (
                            <Link key={i} href={project.href} className="group relative aspect-video overflow-hidden bg-zinc-100">
                                <img src={project.src} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-12">
                                    <span className="label-micro text-white/60 mb-4">{project.label}</span>
                                    <h4 className="subsection-title text-white">{project.name}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="bg-zinc-100 py-40 swiss-grid">
                    <div className="max-w-[1600px] flex flex-col lg:flex-row items-center gap-24">
                        <div className="w-full lg:w-1/3">
                            <div className="relative aspect-[3/4] overflow-hidden grayscale">
                                <img alt="Strategy detail" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" />
                            </div>
                        </div>
                        <div className="flex-grow w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Estratégia.</h3>
                                    <p className="label-micro text-zinc-400">Clareza</p>
                                </div>
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Narrativa.</h3>
                                    <p className="label-micro text-zinc-400">Coerência</p>
                                </div>
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Execução.</h3>
                                    <p className="label-micro text-zinc-400">Precisão</p>
                                </div>
                                <div className="text-left">
                                    <h3 className="subsection-title mb-2">Reputação.</h3>
                                    <p className="label-micro text-zinc-400">Consolidação</p>
                                </div>
                            </div>
                            <div className="max-w-2xl border-t border-zinc-200 pt-12">
                                <p className="section-title !text-2xl text-zinc-800">
                                    Aqui, cada detalhe responde a uma lógica. Nada é escolha estética isolada. Tudo é construção de posicionamento.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-40 swiss-grid">
                    <div className="mb-24">
                        <span className="label-micro text-zinc-400 block mb-4">Serviços</span>
                        <h2 className="section-title">Nossas Soluções</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-200">
                        {[
                            { title: "BRANDING PROJECT", subtitle: "Onde a marca é estruturada", items: ["Branding Estratégico", "Identidade Visual", "Brand Book"] },
                            { title: "CAMPANHAS", subtitle: "Onde o impacto é construído", items: ["Publicidade", "Narrativa Integrada", "Produção"] },
                            { title: "WEB DEV", subtitle: "Onde a marca ganha presença", items: ["Sites de Luxo", "E-commerce High-end", "SEO & Performance"] }
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
                                    EXPLORAR
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-zinc-100 py-40 swiss-grid">
                    <div className="mb-24">
                        <span className="label-micro text-zinc-400 block mb-4">Vozes</span>
                        <h2 className="section-title">Testimonials</h2>
                    </div>
                    <div className="max-w-4xl">
                        <div className="relative min-h-[300px]">
                            {testimonials.map((t, i) => (
                                <div key={i} className={`transition-all duration-1000 absolute inset-0 ${currentSlide === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                                    <h3 className="subsection-title mb-8 !leading-relaxed italic">"{t.text}"</h3>
                                    <p className="label-micro text-zinc-400">{t.author}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-4 mt-12">
                            {testimonials.map((_, i) => (
                                <button key={i} onClick={() => goToSlide(i)} className={`h-[1px] transition-all duration-500 ${currentSlide === i ? 'w-16 bg-black' : 'w-8 bg-zinc-300'}`}></button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-black py-64 swiss-grid text-center">
                    <div className="max-w-4xl mx-auto space-y-24">
                        <h2 className="hero-title text-white">Elevando marcas ao patamar de ícones.</h2>
                        <div className="flex flex-col items-center">
                            <Link href="/contato" className="btn-swiss !border-white text-white hover:bg-white hover:text-black">
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
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/">HOME</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/about">SOBRE</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/studio">STUDIO</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/agencia">AGÊNCIA</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="menu-item text-zinc-400 hover:text-black" href="/contato">CONTATO</Link>
                    </nav>
                    <div className="label-micro text-zinc-300">
                        © 2025 House Mazzutti — Direção de Imagem & Estratégia
                    </div>
                </div>
            </footer>
        </div>
    )
}
