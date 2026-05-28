'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import ClientLogos from '@/app/components/ClientLogos'
import FormDrawer from '@/app/components/FormDrawer'

export const dynamic = 'force-dynamic'

export default function AgenciaPage() {
    const [formOpen, setFormOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0)

    const openForm = () => setFormOpen(true)
    const closeForm = () => setFormOpen(false)

    const testimonials = [
        {
            text: "Antes de ter site, tinha estratégia. A House Mazzutti entendeu que presença digital sem posicionamento é só ruído. Entregaram marca, site e comunicação alinhados.",
            author: "BEATRIZ C. — Fundadora"
        },
        {
            text: "O branding não foi só estética. Foi um sistema. Do naming à paleta, cada decisão tinha razão de ser. Hoje a marca fala por si.",
            author: "RODRIGO M. — CEO"
        },
        {
            text: "Desenvolvimento e identidade no mesmo time. Sem tradução perdida entre designers e devs. O resultado foi exatamente o que imaginamos — só melhor.",
            author: "ANA P. — Diretora de Marketing"
        }
    ]

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % testimonials.length)
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length)
    const goToSlide = (i) => setCurrentSlide(i)

    const nextBanner = () => setCurrentBannerSlide(prev => (prev + 1) % 3)
    const prevBanner = () => setCurrentBannerSlide(prev => (prev - 1 + 3) % 3)

    const heroSlides = [
        { titulo: 'Marca com intenção. Presença com estratégia.', texto: 'Branding, comunicação e desenvolvimento digital para marcas que querem ser reconhecidas — não só vistas.' },
        { titulo: 'Branding que sustenta crescimento.', texto: 'Da identidade visual à arquitetura de marca — construímos sistemas que operam por você.' },
        { titulo: 'Web development orientado à conversão.', texto: 'Sites, landing pages e plataformas que carregam a marca com precisão e transformam visita em decisão.' },
    ]

    useEffect(() => {
        document.querySelectorAll('.hero-animate').forEach(el => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(30px)'
        })
        const t = setTimeout(() => {
            document.querySelectorAll('.hero-animate').forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                }, i * 150)
            })
        }, 100)
        return () => clearTimeout(t)
    }, [currentBannerSlide])

    useEffect(() => {
        const interval = setInterval(() => setCurrentBannerSlide(prev => (prev + 1) % 3), 7000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const els = document.querySelectorAll('.scroll-reveal')
        if (!els.length) return
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const delay = parseInt(e.target.dataset.delay || '0')
                    setTimeout(() => {
                        e.target.style.opacity = '1'
                        e.target.style.transform = 'translateY(0)'
                    }, delay)
                    obs.unobserve(e.target)
                }
            })
        }, { threshold: 0.1 })
        els.forEach(el => obs.observe(el))
        return () => obs.disconnect()
    }, [])

    const services = [
        {
            title: 'BRANDING PROJECT',
            link: '/agencia/branding',
            subtitle: 'Onde identidade vira ativo estratégico.',
            items: ['Naming & Identidade Visual', 'Arquitetura de Marca', 'Tom de Voz & Posicionamento']
        },
        {
            title: 'COMUNICAÇÃO & PUBLICIDADE',
            link: '/agencia/comunicacao',
            subtitle: 'Onde mensagem vira resultado.',
            items: ['Campanhas integradas', 'Gestão de conteúdo', 'Social media & performance']
        },
        {
            title: 'WEB DEVELOPMENT',
            link: '/agencia/web',
            subtitle: 'Onde presença digital vira sistema.',
            items: ['Sites institucionais', 'Landing pages', 'E-commerce & plataformas']
        }
    ]

    return (
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
                    font-size: 20px;
                }
                .noise-overlay {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.02;
                    pointer-events: none;
                }
                .testimonial-slide { display: none; animation: slideFade 0.6s ease-in-out forwards; }
                .testimonial-slide.active { display: block; }
                @keyframes slideFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .custom-nav-line {
                    width: 40px; height: 1px; background-color: white;
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .custom-nav-btn:hover .custom-nav-line { width: 70px; }
                .nav-line { width: 40px; height: 1px; background-color: white; transition: width 0.3s ease; }
                .nav-btn:hover .nav-line { width: 60px; }
                .columns-gallery-container { height: 80vh; display: flex; width: 100%; overflow: hidden; }
                .gallery-column { flex: 1; height: 100%; position: relative; overflow: hidden; border-right: 1px solid rgba(0,0,0,0.05); }
                .gallery-column:last-child { border-right: none; }
                .project-overlay {
                    position: absolute; inset: 0; background: rgba(0,0,0,0.45);
                    display: flex; flex-direction: column; justify-content: flex-end;
                    padding: 32px; opacity: 0; transition: opacity 0.4s ease;
                }
                .gallery-column:hover .project-overlay { opacity: 1; }
                .project-overlay span { color: rgba(255,255,255,0.6); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px; }
                .project-overlay h4 { color: #fff; font-size: 20px; font-weight: 500; }
            `}} />

            <Header variant="dark" />

            <main>
                {/* ── HERO ── */}
                <section className="relative w-full overflow-hidden bg-primary" style={{ height: '105vh' }}>
                    <div className="absolute inset-0 z-0">
                        {[
                            '/images/agencia/banners/banner-1.webp',
                            '/images/agencia/banners/banner-2.webp',
                            '/images/agencia/banners/banner-3.webp',
                        ].map((src, i) => (
                            <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: currentBannerSlide === i ? 1 : 0 }}>
                                <Image src={src} alt="" fill sizes="100vw" quality={85} priority={i === 0} className="object-cover object-top"
                                    onError={e => { e.currentTarget.src = '/images/home/banner-1.webp' }} />
                                <div className="absolute inset-0 bg-black/30" />
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-3xl">
                            <span className="hero-animate text-caption text-white/70 mb-6 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                Agência — HMZT
                            </span>
                            <h1 className="hero-animate text-h1 text-white mb-8 hmzt-hero-title" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {heroSlides[currentBannerSlide].titulo}
                            </h1>
                            <p className="hero-animate text-body text-white/80 mb-12 measure-editorial" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {heroSlides[currentBannerSlide].texto}
                            </p>
                            <button type="button" onClick={openForm}
                                className="hero-animate group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500"
                                style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                Iniciar projeto
                            </button>
                        </div>
                    </div>

                    {/* nav arrows */}
                    <div className="absolute inset-y-0 left-12 flex items-center z-20">
                        <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity" onClick={prevBanner}>
                            <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16" />
                                <svg className="-ml-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20"><polyline points="15 18 9 12 15 6" /></svg>
                            </div>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-12 flex items-center z-20">
                        <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity" onClick={nextBanner}>
                            <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                <svg className="-mr-1" fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20"><polyline points="9 18 15 12 9 6" /></svg>
                                <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16" />
                            </div>
                        </button>
                    </div>
                </section>

                {/* ── PORTFÓLIO GALLERY ── */}
                <section className="bg-white pt-24 pb-0 w-full mx-auto">
                    <div className="mb-20 text-center flex flex-col items-center">
                        <span className="text-caption text-zinc-500 block mb-6">Portfólio Agência</span>
                        <h2 className="text-h2 text-black">Branding. Comunicação. Digital.</h2>
                        <div className="mt-8 h-[0.5px] w-24 bg-black/30" />
                    </div>
                    <div className="columns-gallery-container">
                        {[
                            { href: '/portfolio-agencia/knowhol', src: '/images/agencia/knowhol/1.webp', fallback: '/images/home/banner-1.webp', label: 'Branding Project', title: 'Knowhol' },
                            { href: '/portfolio-agencia/mabdo', src: '/images/agencia/mabdo/1.webp', fallback: '/images/home/banner-2.webp', label: 'Web Development', title: 'Mabdo' },
                            { href: '/portfolio-agencia/on-take', src: '/images/agencia/on-take/1.webp', fallback: '/images/home/banner-3.webp', label: 'Comunicação', title: 'On Take' },
                            { href: '/portfolio-agencia/pous', src: '/images/agencia/pous/1.webp', fallback: '/images/home/banner-4.webp', label: 'Branding & Digital', title: 'Pous' },
                        ].map((item, i) => (
                            <Link key={i} className="gallery-column group" href={item.href}>
                                <Image
                                    alt={item.title}
                                    src={item.src}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    quality={80}
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    className="object-cover"
                                    onError={e => { e.currentTarget.src = item.fallback }}
                                />
                                <div className="project-overlay">
                                    <span>{item.label}</span>
                                    <h4>{item.title}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center mt-12 pb-16">
                        <Link className="group relative px-12 py-4 border-[0.5px] border-black/30 text-black text-button hover:bg-black hover:text-white transition-all duration-500" href="/portfolio-agencia">
                            Ver todo o portfólio
                        </Link>
                    </div>
                </section>

                {/* ── MANIFESTO / PILARES ── */}
                <section className="relative bg-zinc-50/50 px-12 overflow-hidden py-32">
                    <div className="noise-overlay absolute inset-0" />
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/4 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm">
                                <Image
                                    alt="Agência House Mazzutti"
                                    src="/images/home/philosophy-bg.webp"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 25vw"
                                    quality={80}
                                    loading="lazy"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                    {[
                                        { t: 'Estratégia.', s: 'Clareza antes de execução' },
                                        { t: 'Identidade.', s: 'Marca como sistema' },
                                        { t: 'Comunicação.', s: 'Mensagem com intenção' },
                                        { t: 'Conversão.', s: 'Digital que funciona' },
                                    ].map((p, i) => (
                                        <div key={i} className="text-left">
                                            <h3 className="text-h3 text-black mb-3">{p.t}</h3>
                                            <p className="text-caption text-zinc-500">{p.s}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="max-w-3xl text-left border-t border-zinc-200 pt-10">
                                    <p className="text-h4 text-zinc-800">
                                        Antes de aparecer, posicione. Na HMZT Agência, construímos marcas que comunicam com clareza — do branding estratégico ao desenvolvimento digital e à comunicação integrada para empresas que não querem ser mais uma opção no mercado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SERVIÇOS ── */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="text-caption text-zinc-400 mb-6 block">O que fazemos</span>
                                <h2 className="text-h2 text-white">Branding, comunicação e desenvolvimento digital integrados sob a mesma direção.</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {services.map((card, idx) => (
                                    <div
                                        key={idx}
                                        className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out group scroll-reveal"
                                        data-delay={idx * 150}
                                        style={{ opacity: 0, transform: 'translateY(30px)' }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.background = '#000'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
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

                {/* ── DIFERENCIAIS ── */}
                <section className="bg-white py-32 px-12">
                    <div className="max-w-[1440px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
                            <div>
                                <span className="text-caption text-zinc-400 mb-6 block">Por que a HMZT Agência</span>
                                <h2 className="text-h2 text-black mb-12">Não trabalhamos com marca como decoração.</h2>
                                <p className="text-body text-zinc-600 measure-editorial mb-12">
                                    Branding aqui é arquitetura. Cada decisão — do naming ao hexadecimal, do copy ao código — sustenta o posicionamento. Web development não é entrega técnica: é o final do processo criativo, onde a marca se instala no digital com consistência e converte.
                                </p>
                                <button type="button" onClick={openForm} className="group relative px-12 py-4 border-[0.5px] border-black/30 text-black text-button hover:bg-black hover:text-white transition-all duration-500">
                                    Iniciar projeto
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                {[
                                    { n: '01', t: 'Direção criativa unificada', d: 'O mesmo diretor que assina o branding orienta a comunicação e aprova o desenvolvimento digital. Sem ruído entre equipes.' },
                                    { n: '02', t: 'Marca antes de mídia', d: 'Não vendemos anúncios sem posicionamento. Primeiro construímos o que vai ser comunicado — depois amplificamos.' },
                                    { n: '03', t: 'Web orientado à marca', d: 'Sites que carregam a identidade com fidelidade. Nada de templates genéricos: cada projeto nasce do briefing de marca.' },
                                    { n: '04', t: 'Entrega integrada', d: 'Branding, comunicação e digital no mesmo contrato, na mesma mesa, com o mesmo cuidado.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 border-b border-zinc-100 pb-8">
                                        <span className="text-caption text-zinc-300 shrink-0 pt-1">{item.n}</span>
                                        <div>
                                            <h3 className="text-h4 text-black mb-2">{item.t}</h3>
                                            <p className="text-body text-zinc-500">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA EDITORIAL ── */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="noise-overlay absolute inset-0" />
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white hmzt-hero-title">
                            Não é sobre ter uma marca bonita. É sobre ter uma marca que trabalha.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto border-y border-white/10 py-16">
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">Deixe de</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40" /><span>Marca sem estratégia</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40" /><span>Site sem identidade</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40" /><span>Comunicação sem posicionamento</span></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">Passe a</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white" /><span>Branding que converte</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white" /><span>Digital que representa</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white" /><span>Mensagem com intenção</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-10">
                            <button type="button" onClick={openForm} className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                Iniciar uma conversa
                            </button>
                            <p className="text-caption text-zinc-500">Menos ruído. Mais resultado.</p>
                        </div>
                    </div>
                </section>

                {/* ── ARTIGOS ── */}
                <section style={{ background: '#fff', padding: '80px 24px' }} className="overflow-hidden">
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '64px' }}>
                            <p className="text-caption" style={{ color: '#888', marginBottom: '16px' }}>Editorial</p>
                            <h2 className="text-h2" style={{ color: '#000' }}>Últimos artigos</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2px' }} className="md:grid-cols-3">
                            {[
                                { categoria: 'Agência — Branding', titulo: 'Branding Project como Arquitetura de Valor: quando uma marca deixa de ser estética — e passa a ser estratégia de crescimento', data: 'Abril 2026', slug: '/blog/branding-project-arquitetura-valor' },
                                { categoria: 'Agência — Campanhas', titulo: 'Campaign de Lançamento: a arquitetura invisível por trás das marcas que dominam atenção, constroem valor e convertem com consistência', data: 'Abril 2026', slug: '/blog/campanha-lancamento-arquitetura-invisivel' },
                                { categoria: 'Agência — Branding', titulo: 'Quanto investir em branding: o guia estratégico para construir uma marca que realmente cresce', data: 'Abril 2026', slug: '/blog/quanto-investir-em-branding' },
                            ].map((post, idx) => (
                                <Link key={idx} href={post.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div
                                        style={{ padding: '64px 48px', border: '0.5px solid #e0e0e0', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'background 0.3s, color 0.3s, transform 0.4s ease', cursor: 'pointer', color: '#000', transform: 'translateY(0)' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                    >
                                        <div>
                                            <p className="text-caption" style={{ color: '#888', marginBottom: '24px' }}>{post.categoria}</p>
                                            <h3 className="text-h3" style={{ color: 'inherit', marginBottom: '40px' }}>{post.titulo}</h3>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span className="text-caption" style={{ color: '#aaa' }}>{post.data}</span>
                                            <span style={{ fontSize: '28px', display: 'inline-block', transition: 'transform 0.4s ease' }}>→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <ClientLogos />

                {/* ── DEPOIMENTOS ── */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[500px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-bold text-[18vw] tracking-[-0.05em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-40">Depoimentos</span>
                    </div>
                    <div className="absolute left-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={prevSlide}>
                            <div className="custom-nav-line mr-2" />
                            <svg className="transform -translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>
                    </div>
                    <div className="absolute right-16 inset-y-0 flex items-center z-20">
                        <button className="custom-nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-300" onClick={nextSlide}>
                            <svg className="transform translate-x-2" fill="none" height="24" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24"><polyline points="9 18 15 12 9 6" /></svg>
                            <div className="custom-nav-line ml-2" />
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
                                    <div key={i} className={`testimonial-slide ${currentSlide === i ? 'active' : ''}`}>
                                        <h3 className="text-h3 text-white max-w-3xl mx-auto">"{t.text}"</h3>
                                        <div className="pt-6"><p className="text-caption text-white/80">{t.author}</p></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-3 pt-4">
                                {testimonials.map((_, i) => (
                                    <button key={i} className={`indicator w-8 h-[1px] bg-white transition-opacity duration-300 ${currentSlide === i ? 'opacity-100' : 'opacity-30'}`} onClick={() => goToSlide(i)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-neutral-950 text-neutral-50 py-24 px-8 border-t border-neutral-800">
                <div className="flex flex-col items-center text-center">
                    <div className="text-neutral-50 mb-12">
                        <span className="hm-logo" style={{ fontSize: '40px' }}>
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
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/produtora">Produtora</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/agencia">Agência</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/portfolio">Portfólio</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/blog">Blog</Link>
                        <Link className="text-caption text-neutral-500 hover:text-neutral-200 transition-colors" href="/contato">Contato</Link>
                    </nav>
                    <div className="text-caption text-neutral-700">© 2026 House Mazzutti. Todos os direitos reservados.</div>
                </div>
            </footer>

            {formOpen && (
                <FormDrawer isOpen={formOpen} onClose={closeForm} title="Iniciar projeto" subtitle="Conte-nos sobre seu projeto. Respondemos em até 1 dia útil.">
                    <div className="p-8 text-on-surface">
                        <p className="text-body text-on-surface-variant mb-6">Entre em contato pelo Instagram ou WhatsApp para iniciar seu projeto:</p>
                        <a href="https://instagram.com/housemazzutti" target="_blank" rel="noopener" className="block w-full text-center px-8 py-4 bg-black text-white text-button hover:bg-zinc-800 transition-colors mb-4">
                            Instagram @housemazzutti
                        </a>
                        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" className="block w-full text-center px-8 py-4 border border-black text-black text-button hover:bg-black hover:text-white transition-colors">
                            WhatsApp
                        </a>
                    </div>
                </FormDrawer>
            )}
        </div>
    )
}
