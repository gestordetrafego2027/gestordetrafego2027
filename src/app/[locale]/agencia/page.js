'use client'

import { useState, useEffect } from 'react'
import { trackAndOpenWhatsApp } from '@/lib/trackWhatsAppClick'
import { track } from '@/components/analytics/Tracking'
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Header from '@/app/components/Header'
import ClientLogos from '@/app/components/ClientLogos'
import FormDrawer from '@/app/components/FormDrawer'
import BlogSection from '@/app/components/BlogSection'
import TypewriterText from '@/app/components/TypewriterText'

export default function AgenciaPage() {
    const t = useTranslations('agencia')
    const tFooter = useTranslations('footer')
    const tNav = useTranslations('nav')
    const [formOpen, setFormOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0)

    const openForm = () => {
        track('Lead', { lead_type: 'agencia', content_name: 'Agência Form' })
        setFormOpen(true)
    }
    const closeForm = () => setFormOpen(false)

    const testimonials = t.raw('depoimentos')

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % testimonials.length)
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length)
    const goToSlide = (i) => setCurrentSlide(i)

    const nextBanner = () => setCurrentBannerSlide(prev => (prev + 1) % 3)
    const prevBanner = () => setCurrentBannerSlide(prev => (prev - 1 + 3) % 3)

    const heroSlides = t.raw('hero_slides')

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) {
            document.querySelectorAll('.hero-animate').forEach(el => {
                el.style.transition = 'none'
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
            })
            return
        }
        document.querySelectorAll('.hero-animate').forEach(el => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(30px)'
        })
        const t = setTimeout(() => {
            document.querySelectorAll('.hero-animate').forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                }, i * 150)
            })
        }, 100)
        return () => clearTimeout(t)
    }, [currentBannerSlide])

    useEffect(() => {
        const interval = setInterval(() => setCurrentBannerSlide(prev => (prev + 1) % 3), 4550)
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

    const servicesLinks = ['/agencia/branding', '/agencia/comunicacao', '/agencia/web', '/agencia/rp']
    const services = t.raw('servicos').map((s, i) => ({
        title: s.titulo,
        link: servicesLinks[i],
        subtitle: s.subtitulo,
        items: s.itens
    }))

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
                .columns-gallery-container {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 16px;
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                @media (min-width: 768px) { .columns-gallery-container { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; } }
                .gallery-column {
                    position: relative;
                    overflow: hidden;
                    aspect-ratio: 3 / 4;
                    background: #f3f3f4;
                }
                .gallery-column img { transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
                .gallery-column:hover img { transform: scale(1.04); }
                .project-overlay {
                    position: absolute; inset: 0; background: rgba(0,0,0,0.45);
                    display: flex; flex-direction: column; justify-content: flex-end;
                    padding: 28px; opacity: 0; transition: opacity 0.4s ease;
                }
                .gallery-column:hover .project-overlay { opacity: 1; }
                .project-overlay span { color: rgba(255,255,255,0.7); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px; }
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
                                {t('hero_label')}
                            </span>
                            <h1 data-tw-slide className="hero-animate text-h1 text-white mb-8 hmzt-hero-title" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <TypewriterText text={heroSlides[currentBannerSlide].titulo} delay={200} />
                            </h1>
                            <p className="hero-animate text-body text-white/80 mb-12 measure-editorial" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {heroSlides[currentBannerSlide].texto}
                            </p>
                            <button type="button" onClick={openForm}
                                className="hero-animate group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500"
                                style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t('hero_cta')}
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
                        <span className="text-caption text-zinc-500 block mb-6">{t('portfolio_label')}</span>
                        <h2 className="text-h2 text-black">{t('portfolio_titulo')}</h2>
                        <div className="mt-8 h-[0.5px] w-24 bg-black/30" />
                    </div>
                    <div className="columns-gallery-container">
                        {[
                            { href: '/portfolio-agencia/house-mazzutti', src: '/images/agencia/house-mazzutti/capa.webp', fallback: '/images/home/banner-1.webp', label: 'Branding & Identidade', title: 'House Mazzutti' },
                            { href: '/portfolio-agencia/knowhol', src: '/images/agencia/knowhol/capa.webp', fallback: '/images/home/banner-2.webp', label: 'Branding Project', title: 'Knowhol' },
                            { href: '/portfolio-agencia/mabdo', src: '/images/agencia/mabdo/capa.webp', fallback: '/images/home/banner-3.webp', label: 'Web Development', title: 'Mabdo' },
                            { href: '/portfolio-agencia/on-take', src: '/images/agencia/on-take/capa.webp', fallback: '/images/home/banner-4.webp', label: 'Comunicação', title: 'On Take' },
                            { href: '/portfolio-agencia/pous', src: '/images/agencia/pous/capa.webp', fallback: '/images/home/banner-1.webp', label: 'Branding & Digital', title: 'Pous' },
                            { href: '/portfolio-agencia/samrat', src: '/images/agencia/samrat/capa.webp', fallback: '/images/home/banner-2.webp', label: 'Branding & Digital', title: 'Samrat' },
                            { href: '/portfolio-agencia/alletto', src: '/images/agencia/alletto/capa.webp', fallback: '/images/home/banner-3.webp', label: 'Comunicação & Publicidade', title: 'Alletto' },
                            { href: '/portfolio-agencia/fort', src: '/images/agencia/fort/fort-negocios-imobiliarios-branding-identidade-visual-house-mazzutti-agencia-01.webp', fallback: '/images/home/banner-4.webp', label: 'Branding & Identidade', title: 'Fort Negócios Imobiliários' },
                            { href: '/portfolio-agencia/dra-ariadne-barbosa', src: '/images/agencia/dra-ariadne-barbosa/dra-ariadne-barbosa-logo-branding-manual-de-marca-identidade-visual-house-mazzutti-agencia-01.webp', fallback: '/images/home/banner-1.webp', label: 'Branding & Manual de Marca', title: 'Dra. Ariadne Barbosa' },
                            { href: '/portfolio-agencia/jucileia-soares', src: '/images/agencia/jucileia-soares/jucileia-soares-branding-identidade-visual-house-mazzutti-agencia-01.webp', fallback: '/images/home/banner-2.webp', label: 'Branding & Identidade', title: 'Jucileia Soares' },
                            { href: '/portfolio-agencia/lbo', src: '/images/agencia/lbo/lbo-consultoria-logo-marca-branding-house-mazzutti-agencia-design-01.webp', fallback: '/images/home/banner-3.webp', label: 'Branding & Consultoria', title: 'LBO Consultoria' },
                            { href: '/portfolio-agencia/luiz-jr', src: '/images/agencia/luiz-jr/luiz-jr-branding-identidade-visual-house-mazzutti-agencia-01.webp', fallback: '/images/home/banner-4.webp', label: 'Branding & Identidade', title: 'Luiz Jr' },
                        ].map((item, i) => (
                            <Link key={i} className="gallery-column group" href={item.href}>
                                <Image
                                    alt={item.title}
                                    src={item.src}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    quality={90}
                                    loading={i < 3 ? 'eager' : 'lazy'}
                                    className="object-cover object-center"
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
                            {t('see_all_portfolio')}
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
                                    {t.raw('pilares').map((p, i) => (
                                        <div key={i} className="text-left">
                                            <h3 className="text-h3 text-black mb-3">{p.titulo}</h3>
                                            <p className="text-caption text-zinc-500">{p.subtitulo}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="max-w-3xl text-left border-t border-zinc-200 pt-10">
                                    <p className="text-h4 text-zinc-800">
                                        {t('manifesto')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SERVIÇOS ── */}
                <section className="bg-white">
                    {(() => {
                        const panelImages = [
                            '/images/agencia/fort/fort-negocios-imobiliarios-branding-identidade-visual-house-mazzutti-agencia-02.webp',
                            '/images/agencia/alletto/2.webp',
                            '/images/agencia/lbo/lbo-consultoria-logo-marca-branding-house-mazzutti-agencia-design-03.webp',
                        ]
                        return (
                            <div className="flex flex-col md:flex-row" style={{ minHeight: 'clamp(520px, 80vh, 900px)' }}>
                                {services.map((card, idx) => (
                                    <Link
                                        key={idx}
                                        href={card.link}
                                        className="relative flex-1 overflow-hidden group"
                                        style={{ minHeight: 'clamp(300px, 50vw, 900px)' }}
                                    >
                                        <Image
                                            src={panelImages[idx]}
                                            alt={card.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            quality={75}
                                            priority={idx === 0}
                                            loading="eager"
                                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-500" />
                                        <div className="absolute bottom-0 left-0 p-8 md:p-10">
                                            <p className="font-label uppercase tracking-[0.45em] text-[9px] text-white/40 mb-3">{card.items.join(' · ')}</p>
                                            <h3 className="font-headline font-light text-white text-2xl mb-4">{card.title}</h3>
                                            <span className="text-caption text-white/80 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                                                {t('saiba_mais')} →
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
                    })()}
                </section>

                {/* ── DIFERENCIAIS ── */}
                <section className="bg-white py-32 px-12">
                    <div className="max-w-[1440px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
                            <div>
                                <span className="text-caption text-zinc-400 mb-6 block">{t('diferenciais_label')}</span>
                                <h2 className="text-h2 text-black mb-12">{t('diferenciais_titulo')}</h2>
                                <p className="text-body text-zinc-600 measure-editorial mb-12">
                                    {t('diferenciais_texto')}
                                </p>
                                <button type="button" onClick={openForm} className="group relative px-12 py-4 border-[0.5px] border-black/30 text-black text-button hover:bg-black hover:text-white transition-all duration-500">
                                    {t('iniciar_projeto')}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                {t.raw('diferenciais').map((item, i) => (
                                    <div key={i} className="flex gap-8 border-b border-zinc-100 pb-8">
                                        <span className="text-caption text-zinc-300 shrink-0 pt-1">{item.num}</span>
                                        <div>
                                            <h3 className="text-h4 text-black mb-2">{item.titulo}</h3>
                                            <p className="text-body text-zinc-500">{item.desc}</p>
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
                            {t('cta_titulo')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto border-y border-white/10 py-16">
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">{t('cta_deixe_label')}</p>
                                <ul className="text-body text-white space-y-3">
                                    {t.raw('cta_deixe').map((item, i) => (
                                        <li key={i} className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40" /><span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">{t('cta_passe_label')}</p>
                                <ul className="text-body text-white space-y-3">
                                    {t.raw('cta_passe').map((item, i) => (
                                        <li key={i} className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white" /><span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-10">
                            <button type="button" onClick={openForm} className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                {t('cta_btn')}
                            </button>
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2 text-[11px] font-label">
                                    <span style={{ color: '#f5c518', letterSpacing: '0.05em' }}>★★★★★</span>
                                    <span className="text-zinc-400">5.0 · 32 avaliações no Google</span>
                                </div>
                                <p className="text-caption text-zinc-500">{t('cta_tagline')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── ARTIGOS ── */}
                <BlogSection
                    slugs={[
                        'branding-project-arquitetura-valor',
                        'campanha-lancamento-arquitetura-invisivel',
                        'quanto-investir-em-branding',
                        'por-que-campanhas-falham',
                    ]}
                    allLabel={t('blog_see_all')}
                    readLabel={t('blog_read')}
                />

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
                            <span className="text-caption text-zinc-500 block mb-4">{t('depoimentos_label')}</span>
                            <h2 className="text-h2 text-white">{t('depoimentos_titulo')}</h2>
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

            {/* FAQ — obrigatório para FAQPage schema ser válido no Rich Results Test */}
            <section className="bg-white py-24 px-8 border-t border-zinc-100">
                <div className="max-w-3xl mx-auto">
                    <p className="font-label uppercase tracking-[0.45em] text-[9px] text-zinc-400 mb-6">{t('faq_label')}</p>
                    <h2 className="font-headline italic text-3xl text-zinc-900 mb-16">{t('faq_titulo')}</h2>
                    <div className="space-y-0">
                        {t.raw('faq').map(({q, a}, i) => (
                            <details key={i} className="group border-t border-zinc-100 py-6 cursor-pointer">
                                <summary className="flex justify-between items-center list-none font-headline italic text-lg text-zinc-900 gap-4">
                                    {q}
                                    <span className="text-zinc-400 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-2xl leading-none">+</span>
                                </summary>
                                <p className="mt-4 text-[15px] text-zinc-500 font-body leading-[1.8]">{a}</p>
                            </details>
                        ))}
                        <div className="border-t border-zinc-100" />
                    </div>
                </div>
            </section>

            <footer className="bg-white text-zinc-900 py-24 px-8 border-t border-zinc-200">
                <div className="flex flex-col items-center text-center">
                    <div className="text-zinc-900 mb-12">
                        <span className="hm-logo" style={{ fontSize: '40px' }}>
                            <span className="hm-house">House</span>
                            <span className="hm-mazzutti">Mazzutti</span>
                        </span>
                    </div>
                    <div className="flex space-x-10 mb-16">
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-20">
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/">Home</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/studio">Studio</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/produtora">Produtora</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/agencia">Agência</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/portfolio">Portfólio</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/blog">Blog</Link>
                        <Link className="text-caption text-zinc-500 hover:text-zinc-900 transition-colors" href="/contato">Contato</Link>
                    </nav>
                    <div className="flex flex-col items-center gap-3"><div className="text-caption text-zinc-400">{tFooter('copyright')}</div><div className="flex gap-6"><a href="/politicas/privacidade" className="text-caption text-neutral-600 hover:text-neutral-300 transition-colors">Privacidade</a><a href="/politicas/termos-de-uso" className="text-caption text-neutral-600 hover:text-neutral-300 transition-colors">Termos</a><a href="/politicas/cookies" className="text-caption text-neutral-600 hover:text-neutral-300 transition-colors">Cookies</a><a href="/politicas/cancelamento-e-reembolso" className="text-caption text-neutral-600 hover:text-neutral-300 transition-colors">Cancelamento</a></div></div>
                </div>
              <div className="mt-6"><SiteFooterLinks /></div>
            </footer>

            {formOpen && (
                <FormDrawer isOpen={formOpen} onClose={closeForm} title={t('form_title')} subtitle={t('form_subtitle')}>
                    <div className="p-8 text-on-surface">
                        <p className="text-body text-on-surface-variant mb-6">{t('form_contact_text')}</p>
                        <a href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-8 py-4 bg-black text-white text-button hover:bg-zinc-800 transition-colors mb-4">
                            Instagram @housemazzutti
                        </a>
                        <button
                            type="button"
                            onClick={() => trackAndOpenWhatsApp({ location: 'agencia_form_drawer', message: 'Olá, quero dar andamento na minha produção com a House Mazzutti.' })}
                            className="block w-full text-center px-8 py-4 border border-black text-black text-button hover:bg-black hover:text-white transition-colors"
                        >
                            WhatsApp
                        </button>
                    </div>
                </FormDrawer>
            )}
        </div>
    )
}
