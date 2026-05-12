'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import ClientLogos from '@/app/components/ClientLogos'
import FormDrawer from '../components/FormDrawer'
import FormStudio from '../components/forms/FormStudio'

export default function StudioPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentGallerySlide, setCurrentGallerySlide] = useState(0)
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0)
    const [isStudioFormOpen, setIsStudioFormOpen] = useState(false)
    const prevBanner = () => setCurrentBannerSlide(prev => (prev - 1 + 3) % 3)
    const nextBanner = () => setCurrentBannerSlide(prev => (prev + 1) % 3)

    const nextGallerySlide = () => setCurrentGallerySlide(prev => (prev + 1) % 11)
    const prevGallerySlide = () => setCurrentGallerySlide(prev => (prev - 1 + 11) % 11)

    const testimonials = [
        {
            text: "Cheguei querendo um book. Saí com uma nova forma de me apresentar. A imagem deixou de só aparecer — passou a sustentar quem eu sou.",
            author: "TALITA D."
        },
        {
            text: "Cada frame foi pensado. Cada gesto, direcionado. Vi minha presença ganhar peso pela primeira vez.",
            author: "PATRICIA M."
        },
        {
            text: "Discrição total, direção firme em set e acabamento de revista. Saí com material editorial — não com um pacote de fotos.",
            author: "ANA R."
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
                .columns-gallery-container {
                    height: 100vh;
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                    background-color: #ffffff;
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
                .project-item { position: relative; overflow: hidden; cursor: pointer; }
                .project-overlay { 
                    position: absolute; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    background: rgba(0,0,0,1); 
                    transform: translateY(-100%); 
                    transition: transform 0.5s ease; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    text-align: center;
                    padding: 2rem;
                    z-index: 10;
                }
                .gallery-column:hover .project-overlay { transform: translateY(0); }
                .project-overlay h4 { color: white; font-family: 'Newsreader', serif; font-size: 18px; margin: 0; }
                .project-overlay span { color: white; font-family: 'Raleway', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; }
            `}} />


            <Header variant="dark" />
            <main>
                <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: "105vh" }}>
                    {(() => {
                        const heroSlides = [
                            { titulo: 'Direção de imagem com arte e narrativa.', texto: 'Aqui potencializamos sua imagem e registramos os momentos mais marcantes da sua trajetória.' },
                            { titulo: 'Imagem construída com intenção.', texto: 'Cada produção começa com uma escuta — e termina em imagens que sustentam sua presença.' },
                            { titulo: 'Books, ensaios e coberturas.', texto: 'Do conceito à entrega, cada detalhe pensado para comunicar com clareza e elegância.' },
                        ];
                        return <>
                            <div className="absolute inset-0 z-0">
                                {['/images/studio/banners/banner-1.jpg','/images/studio/banners/banner-2.jpg','/images/studio/banners/banner-3.jpg'].map((src, i) => (
                                    <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{opacity: currentBannerSlide === i ? 1 : 0}}>
                                        <img src={src} className="w-full h-full object-cover object-top" alt="" />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                                <div className="max-w-3xl">
                                    <span className="hero-animate text-caption text-white/70 mb-6 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>Studio — HMZT</span>
                                    <h1 className="hero-animate text-h1 text-white mb-8" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        {heroSlides[currentBannerSlide].titulo}
                                    </h1>
                                    <p className="hero-animate text-body text-white/80 mb-12 measure-editorial" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                        {heroSlides[currentBannerSlide].texto}
                                    </p>
                                    <button type="button" onClick={() => setIsStudioFormOpen(true)} className="hero-animate group relative px-12 py-4 border-[0.5px] border-white/40 text-white text-button hover:bg-white hover:text-black transition-all duration-500" style={{ opacity: 0, transform: 'translateY(30px)' }}>
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
                <section className="bg-white pt-24 pb-0 w-full mx-auto">
                    <div className="mb-20 text-center flex flex-col items-center">
                        <span className="text-caption text-zinc-500 block mb-6">Portfólio</span>
                        <h2 className="text-h2 text-black">Books. Ensaios. Coberturas.</h2>
                        <div className="line-divider mt-8 text-black"></div>
                    </div>
                    <div className="relative w-full group overflow-hidden" style={{ height: '80vh' }}>
                        <style>{`
                            .gallery-fade { animation: galleryFadeIn 0.6s ease forwards; }
                            @keyframes galleryFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                        `}</style>
                        {(() => {
                            const allModels = [
                                { href: '/portfolio-studio/amanda-oliveira', src: '/images/studio/amanda-oliveira/capa.jpg', label: 'Book', name: 'Amanda Oliveira' },
                                { href: '/portfolio-studio/talita-dalbo', src: '/images/studio/talita-dalbo/capa.jpg', label: 'Ensaio Pessoal', name: 'Talita Dalbó' },
                                { href: '/portfolio-studio/jamile-caroline', src: '/images/studio/jamile-caroline/capa.jpg', label: 'Book', name: 'Jamile Caroline' },
                                { href: '/portfolio-studio/leif-sinclar', src: '/images/studio/leif-sinclar/capa.jpg', label: 'Ensaio Pessoal', name: 'Leif Sinclar' },
                                { href: '/portfolio-studio/ana-laura-saar', src: '/images/studio/ana-laura-saar/capa.jpg', label: 'Book', name: 'Ana Laura Saar' },
                                { href: '/portfolio-studio/chai-e-dai', src: '/images/studio/chai-e-dai/capa.jpg', label: 'Book', name: 'Chai e Dai' },
                                { href: '/portfolio-studio/debora-pantaglione', src: '/images/studio/debora-pantaglione/capa.jpg', label: 'Book', name: 'Debora Pantaglione' },
                                { href: '/portfolio-studio/ana-rockenbach', src: '/images/studio/ana-rockenbach/capa.jpg', label: 'Book', name: 'Ana Rockenbach' },
                                { href: '/portfolio-studio/francine-massoco', src: '/images/studio/francine-massoco/capa.jpg', label: 'Book', name: 'Francine Massoco' },
                                { href: '/portfolio-studio/jessica-bittelbrun', src: '/images/studio/jessica-bittelbrun/capa.jpg', label: 'Book', name: 'Jessica Bittelbrun' },
                                { href: '/portfolio-studio/julia-moraes', src: '/images/studio/julia-moraes/capa.jpg', label: 'Book', name: 'Julia Moraes' },
                                { href: '/portfolio-studio/anna-laura', src: '/images/studio/anna-laura/capa.jpg', label: 'Book', name: 'Anna Laura' },
                                { href: '/portfolio-studio/gab-cruz', src: '/images/studio/gab-cruz/capa.jpg', label: 'Book', name: 'Gab Cruz' },
                                { href: '/portfolio-studio/arielly', src: '/images/studio/arielly/capa.jpg', label: 'Book', name: 'Arielly' },
                                { href: '/portfolio-studio/iasmim', src: '/images/studio/iasmim/capa.jpg', label: 'Book', name: 'Iasmim' },
                                { href: '/portfolio-studio/leticia-moraes', src: '/images/studio/leticia-moraes/capa.jpg', label: 'Book', name: 'Leticia Moraes' },
                                { href: '/portfolio-studio/maria-eduarda', src: '/images/studio/maria-eduarda/capa.jpg', label: 'Book', name: 'Maria Eduarda' },
                                { href: '/portfolio-studio/nataly-silva', src: '/images/studio/nataly-silva/capa.jpg', label: 'Book', name: 'Nataly Silva' },
                                { href: '/portfolio-studio/patricia-marafon', src: '/images/studio/patricia-marafon/capa.jpg', label: 'Book', name: 'Patricia Marafon' },
                                { href: '/portfolio-studio/poliana-barreto', src: '/images/studio/poliana-barreto/capa.jpg', label: 'Book', name: 'Poliana Barreto' },
                                { href: '/portfolio-studio/sara-henriches', src: '/images/studio/sara-henriches/capa.jpg', label: 'Book', name: 'Sara Henriches' },
                                { href: '/portfolio-studio/vitoria-boidt', src: '/images/studio/vitoria-boidt/capa.jpg', label: 'Book', name: 'Vitória Boidt' },
                                { href: '/portfolio-studio/bruna-brummer', src: '/images/studio/bruna-brummer/capa.jpg', label: 'Book', name: 'Bruna Brummer' },
                                { href: '/portfolio-studio/iza-feser', src: '/images/studio/iza-feser/capa.jpg', label: 'Book', name: 'Iza Feser' },
                                { href: '/portfolio-studio/marina-machado', src: '/images/studio/marina-machado/capa.jpg', label: 'Book', name: 'Marina Machado' },
                                { href: '/portfolio-studio/andressa-gomiero', src: '/images/studio/andressa-gomiero/capa.jpg', label: 'Ensaio Pessoal', name: 'Andressa Gomiero' },
                                { href: '/portfolio-studio/fernanda-treml', src: '/images/studio/fernanda-treml/capa.jpg', label: 'Ensaio Pessoal', name: 'Fernanda Treml' },
                                { href: '/portfolio-studio/nairicia-caberlon', src: '/images/studio/nairicia-caberlon/capa.jpg', label: 'Ensaio Pessoal', name: 'Naírícia Caberlon' },
                                { href: '/portfolio-studio/thaisi-dias', src: '/images/studio/thaisi-dias/capa.jpg', label: 'Ensaio Pessoal', name: 'Thaisi Dias' },
                                { href: '/portfolio-studio/brenda-mattos', src: '/images/studio/brenda-mattos/capa.jpg', label: 'Ensaio Pessoal', name: 'Brenda Mattos' },
                                { href: '/portfolio-studio/paula-assuncao', src: '/images/studio/paula-assuncao/capa.jpg', label: 'Ensaio Pessoal', name: 'Paula Assunção' },
                                { href: '/portfolio-studio/carol-costa', src: '/images/studio/carol-costa/capa.jpg', label: 'Ensaio Pessoal', name: 'Carol Costa' },
                                { href: '/portfolio-studio/rebeca-cabral', src: '/images/studio/rebeca-cabral/capa.jpg', label: 'Ensaio Pessoal', name: 'Rebeca Cabral' },
                                { href: '/portfolio-studio/cynthia-andrade', src: '/images/studio/cynthia-andrade/capa.jpg', label: 'Ensaio Pessoal', name: 'Cynthia Andrade' },
                                { href: '/portfolio-studio/maria-tereza', src: '/images/studio/maria-tereza/capa.jpg', label: 'Ensaio Pessoal', name: 'Maria Tereza' },
                                { href: '/portfolio-studio/samara-samme', src: '/images/studio/samara-samme/capa.jpg', label: 'Ensaio Pessoal', name: 'Samara Samme' },
                                { href: '/portfolio-studio/deise-smaniotto', src: '/images/studio/deise-smaniotto/capa.jpg', label: 'Ensaio Pessoal', name: 'Deise Smaniotto' },
                                { href: '/portfolio-studio/marjorie-rossi', src: '/images/studio/marjorie-rossi/capa.jpg', label: 'Ensaio Pessoal', name: 'Marjorie Rossi' },
                                { href: '/portfolio-studio/simonny', src: '/images/studio/simonny/capa.jpg', label: 'Ensaio Pessoal', name: 'Simonny' },
                                { href: '/portfolio-studio/fernanda-costas', src: '/images/studio/fernanda-costas/capa.jpg', label: 'Ensaio Pessoal', name: 'Fernanda Costas' },
                                { href: '/portfolio-studio/mileide-mihaile', src: '/images/studio/mileide-mihaile/capa.jpg', label: 'Ensaio Pessoal', name: 'Mileide Mihaile' },
                            ];
                            const totalPages = Math.ceil(allModels.length / 4);
                            const pageModels = allModels.slice(currentGallerySlide * 4, currentGallerySlide * 4 + 4);
                            return (
                                <div key={currentGallerySlide} className="gallery-fade columns-gallery-container w-full h-full flex">
                                    {pageModels.map((model, i) => (
                                        <Link key={i} className="gallery-column project-item group" href={model.href} style={{ flex: '0 0 25%', minWidth: '25%' }}>
                                            <img alt={model.name} className="column-image" src={model.src}/>
                                            <div className="project-overlay">
                                                <span>{model.label}</span>
                                                <h4>{model.name}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            );
                        })()}
                        <button onClick={prevGallerySlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-[0.5px] border-white/50 text-white bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40">
                            <svg fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button onClick={nextGallerySlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-[0.5px] border-white/50 text-white bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40">
                            <svg fill="none" height="20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="20">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link className="group relative px-12 py-4 border-[0.5px] border-black/30 text-black text-button hover:bg-black hover:text-white transition-all duration-500" href="/portfolio-studio">
                            Ver todo o portfólio
                        </Link>
                    </div>
                </section>
                <section className="relative bg-zinc-50/50 px-12 overflow-hidden py-32">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/4 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm">
                                <img alt="B&W architectural detail" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHOOyecCxbUCU6_y9vpcFi6a1ZBmoHI59QTvX7-mYJHcU8SfV0rY1_M6fRpvrgcf1v5KuSRnO7opF15zAf29T5zCf08pMyHvaiZ3XGXEBKtgBCjkNScMmeU5GGltKS0Oo9t0Wv3bGq9PB3UvL93v_LlQkpfl3-LhK55rlnWxOMKNZTON2x8enWcwwJDVBKYCalcw0uB02-OgQAnRr5qEJ7eUY62VPxKwDfWI5Gesxo3Y6IZInsc8yYwcsY2YWwYfHsV3jGxJqCcg" />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Luz.</h3>
                                        <p className="text-caption text-zinc-500">Direcionamento</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Composição.</h3>
                                        <p className="text-caption text-zinc-500">Equilíbrio</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Movimento.</h3>
                                        <p className="text-caption text-zinc-500">Dinâmica</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-h3 text-black mb-3">Expressão.</h3>
                                        <p className="text-caption text-zinc-500">Intenção</p>
                                    </div>
                                </div>
                                <div className="max-w-3xl text-left border-t border-zinc-200 pt-10">
                                    <p className="text-h4 text-zinc-800">
                                        Antes de qualquer produção, definimos:<br />
                                        — qual percepção precisa ser construída<br />
                                        — qual presença deve ser reforçada<br />
                                        — qual linguagem visual sustenta isso.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white py-32 px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1260px] mx-auto text-center">
                        <div className="mb-24">
                            <span className="text-caption text-zinc-400 block mb-6">Método</span>
                            <h2 className="text-h2 text-black mb-4">A maioria começa na produção.</h2>
                            <p className="text-h4 text-zinc-500">Nós começamos no entendimento.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="flex flex-col items-center space-y-8">
                                <span className="material-symbols-outlined font-extralight" style={{fontSize:'64px'}} data-icon="architecture">architecture</span>
                                <h3 className="text-h3 uppercase">Pré-produção</h3>
                                <div className="text-body text-secondary measure-tight space-y-2 text-left">
                                    <p>— Reunião de briefing</p>
                                    <p>— Análise de perfil</p>
                                    <p>— Conceito e staff</p>
                                    <p>— Mood board</p>
                                    <p>— Manual de poses</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-8">
                                <span className="material-symbols-outlined font-extralight" style={{fontSize:'64px'}} data-icon="design_services">design_services</span>
                                <h3 className="text-h3 uppercase">Execução</h3>
                                <div className="text-body text-secondary measure-tight space-y-2 text-left">
                                    <p>— Call sheet e preparação</p>
                                    <p>— Roteiros visuais e trilhas</p>
                                    <p>— Locações e cenografia</p>
                                    <p>— Direção de cena e poses</p>
                                    <p>— Equipe multi artística</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-8">
                                <span className="material-symbols-outlined font-extralight" style={{fontSize:'64px'}} data-icon="brush">brush</span>
                                <h3 className="text-h3 uppercase">Pós-produção</h3>
                                <div className="text-body text-secondary measure-tight space-y-2 text-left">
                                    <p>— Aprovação e escolha</p>
                                    <p>— Edições finais</p>
                                    <p>— Ajustes de fechamento</p>
                                    <p>— Arquivos em nuvem privada</p>
                                    <p>— Personalização e sigilo</p>
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
                            {/* STRUCTURE SELECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24">
                                <span className="text-caption text-zinc-400 mb-6 block">Escolha seu nível</span>
                                <h2 className="text-h2 text-white">Escolha o nível ideal para o seu momento.</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "BOOK",
                                        link: "/studio/book",
                                        subtitle: 'Onde a imagem é construída com intenção.',
                                        items: ["Book profissional", "Direção de imagem", "Ensaio editorial", "Entrega high-end"]
                                    },
                                    {
                                        title: "ENSAIO",
                                        link: "/studio/ensaio",
                                        subtitle: 'Onde a presença ganha forma e elegância.',
                                        items: ["Ensaio pessoal", "Direção de imagem", "Linguagem visual", "Entrega premium"]
                                    },
                                    {
                                        title: "COBERTURA",
                                        link: "/studio/cobertura",
                                        subtitle: 'Onde sua agenda vira narrativa visual.',
                                        items: ["Acompanhamento real", "Captação dedicada", "Direção de presença", "Entrega premium"]
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
                <ClientLogos />

                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510312305653-8ed496efbe75?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                        <h2 className="text-h1 text-white">
                            Sua imagem deixa de apenas aparecer. Passa a ser lembrada.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto border-y border-white/10 py-16">
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">Deixa de</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40"></span> <span>Imagem genérica</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white/40"></span> <span>Produção sem direção</span></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <p className="text-caption text-zinc-500">Passa a</p>
                                <ul className="text-body text-white space-y-3">
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white"></span> <span>Consistência visual</span></li>
                                    <li className="flex items-center space-x-3"><span className="w-3 h-[1px] bg-white"></span> <span>Mais valor percebido</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-10">
                            <button type="button" onClick={() => setIsStudioFormOpen(true)} className="inline-block px-16 py-6 border-[0.5px] border-white text-white text-button hover:bg-white hover:text-black transition-all duration-500">
                                Iniciar uma conversa
                            </button>
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
                isOpen={isStudioFormOpen}
                onClose={() => setIsStudioFormOpen(false)}
                title="Iniciar projeto"
                subtitle="Conte-nos sobre seu ensaio. Respondemos em até 1 dia útil."
            >
                <FormStudio
                    onClose={() => setIsStudioFormOpen(false)}
                    serviceType="book"
                    sourceUrl="/studio"
                />
            </FormDrawer>
        </div>
    )
}
