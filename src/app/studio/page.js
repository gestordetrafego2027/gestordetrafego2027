'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'

export default function StudioPage() {
    const [currentSlide, setCurrentSlide] = useState(0)

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
                <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: "105vh" }}>
                    <div className="absolute inset-0 z-0"><div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]"></div></div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-4xl">
                            <span className="hero-animate font-label uppercase tracking-[0.3em] text-[10px] text-white/60 mb-8 block" style={{ opacity: 0, transform: 'translateY(30px)' }}>É POSICIONAMENTO VISÍVEL.</span>
                            <h1 className="hero-animate font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-12 italic font-light" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                Imagem não é produção.
                            </h1>
                            <button className="hero-animate group relative px-10 py-3 border-[0.5px] border-white/30 text-white font-label text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                [ Iniciar direção de imagem ]
                            </button>
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
                {/* Section 2: Trabalhos Selecionados */}
                <section className="bg-white pt-16 pb-12 mx-auto" style={{ maxWidth: "95vw" }}>
                    <div className="mb-12 text-center flex flex-col items-center scroll-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                        <span className="font-label uppercase tracking-[0.3em] text-[10px] text-zinc-400 block mb-4">STUDIO</span>
                        <h2 className="font-headline text-3xl text-black">Trabalhos Selecionados</h2>
                        <div className="line-divider mt-6 text-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Minimalist architecture" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe4mdbRqXBNKzzngv3g_VBLp6GYZlgzzZZODsLL8bHFzPo4h2MQ_wh08IE0TeoTAnYp7r8cqXbKU7Xa5wklKFRY-ZWrYIpRSmFUuQapR_3VovlHbwzL2DnDZwXwFKOowF6p1RYMEOqh1_GwWe1FY9MUqL_MHVQ04dnmk4YyX2I1Nbz3zL-t4bcyXEQ_COqtJmLZiwYf076YUYpoITRuaCFPCaMTBWkm6LYq7RU4l8f9gyRN9hk8omSajhnHc8pNlB8BAi1ZerKdL0" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Projeto Essência</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Direção de Imagem</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="100" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Fashion portrait" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmEdY5S8J-r2-yA6KBnPbY8KJ_kzSWmaDtw4KI3V4XfuFw9crzbRkv8ODbEuL4WNOjSHEaBI3bT-J6Fg0SnQ7-F55Z7jP7UT2ZzHsyDIVGu2G67mWa2Qxorjl-Upf9isBLdGue5dKoH7891HWpO6iT5EbeCFrJCwFVIQo8-XVRq_ZaV_sJsyb9zfKO_Dm-QjDzX38uBl3zJodj4KP7GattGIKHVJ8Hkn24EzNVoNBWMnUB3avAJoDg_S2DzRoUhd5-bugSQgDzSB0" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Movimento Urbano</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Direção Criativa</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="200" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Tailoring detail" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADvGTrzOI5PEUbaeC7AW7usgMalF3qizDJJ0KUpcNG6m9gEpidT-mTLmb1F3zpPaKsm5aOEastKBq1gcgasPBFL2aQQT1TCsitpTNJuy9KBP4cgyFtyvk2nUo1WqXii9tLH0TPR_h0HV84zRlZFfEnEAJ344iW4H6sfL7IC47U5veqjHNq4WUq6MqzNrcQ8otKdLxpwV9j4bBHQPkyEGa7anAANlMNVkXbnsoFAoDyBX7opOcB3BSImGRftoLeyoU4cmneRk6ZgTk" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Alfaiataria Moderna</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Posicionamento</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Winding road" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKnc6oH_hYvu13IeEb61FyxFkY3Edhlt2km8Jry0SlDIZ7KlpeE-AVwYRezdk2O_XEVH34_DobRA7QJY4YofFZUSMXG3BeTc5IdaApkxKb3Z1Zd14giFedWaYlTg7jx83cIP-fHnIAPoHKE93UEOWCj_iGqRTd0q2BO_l4h_oMK2TIBNGbh5QW43fUo-FhcFxpTF9A5vIi9kKaAk-ZapE8zkT6Uk3Fe-VRw3DSK5F3AiqnbXBwPhBzkQ-MTLhF1bCsplLY712XU5c" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Horizonte</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Produção de Imagem</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="100" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Jewelry detail" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkA7crS5fwR9M1uHLxWGre8utOIQhLns1favg4_bqxW4l-Rhz-kocfZxJb59JIHoZo0AuTsli_xQD1X_z3OtXWtQY9FQl5HVclTTuNUMQKMWYswMESC7LVKN8Gt7F_wJV_yWoTwt54-Ob2IAfKZnaLu1muOYHzXGofG-8DJfHBXFuGu6w16J51hk_p07tLwwhj9yuhYxTb-0bc1SSn0oSkyr0OHqu7L7my2rY0YBwqS364_RTWjKGw1-ModtNWEmtX0VrKG9bErhw" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Prestigio</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Branding</p>
                            </div>
                        </div>
                        <div className="relative group bg-white aspect-[4/3] overflow-hidden scroll-reveal" data-delay="200" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <img alt="Interior design" className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFIHY560gS2ik_2GrZpF30j-g-u298R2IvVTv99wXYupz5jW7ePfhi3hHeOSQJ2w4D9995OdagrtsKYEq0WGyCiUbF4XqHAZy8VekCTL3M9cJodpb-uNjUXVWrV7ILlVTT2zmqMUAfKFTDlPXy7VUL9uEwNMf_12u39Nub3mRFN41ZWd3eCg9gWp2qZXBlD5S3HKhbGnZX9ITFbVDfNSTbkEuWv7VCiQZHtzcmfE_8zY8HzN17A0gHtn7s99IzT0-_ft0gKKjVhO8" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                <p className="font-headline text-sm text-black italic">Espaço</p>
                                <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">Curadoria</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section 3: Integrado. Estratégico. Intencional. */}
                <section className="bg-white py-32 px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1260px] mx-auto text-center">
                        <div className="mb-20 scroll-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <span className="font-label uppercase tracking-[0.3em] text-[10px] text-black block mb-4">STUDIO</span>
                            <h2 className="font-headline text-5xl text-black">Integrado. Estratégico. Intencional.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="flex flex-col items-center space-y-4 scroll-reveal" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <span className="material-symbols-outlined text-4xl font-extralight" data-icon="brush">brush</span>
                                <h3 className="font-headline text-2xl">O que a marca é.</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    Fundamentos de identity e essência traduzidos em diretrizes visuais.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 scroll-reveal" data-delay="150" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <span className="material-symbols-outlined text-4xl font-extralight" data-icon="visibility">visibility</span>
                                <h3 className="font-headline text-2xl">O que precisa comunicar.</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    A mensagem estratégica que cada frame deve carregar.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 scroll-reveal" data-delay="300" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <span className="material-symbols-outlined text-4xl font-extralight" data-icon="photo_camera">photo_camera</span>
                                <h3 className="font-headline text-2xl">E como deve ser percebida.</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    O resultado final: autoridade e desejo construídos através da lente.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section 4: Luz, Composição, Movimento, Expressão. */}
                <section className="relative bg-zinc-50/50 px-12 overflow-hidden py-32">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/4 flex-shrink-0 scroll-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm">
                                <img alt="B&W editorial photography" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHOOyecCxbUCU6_y9vpcFi6a1ZBmoHI59QTvX7-mYJHcU8SfV0rY1_M6fRpvrgcf1v5KuSRnO7opF15zAf29T5zCf08pMyHvaiZ3XGXEBKtgBCjkNScMmeU5GGltKS0Oo9t0Wv3bGq9PB3UvL93v_LlQkpfl3-LhK55rlnWxOMKNZTON2x8enWcwwJDVBKYCalcw0uB02-OgQAnRr5qEJ7eUY62VPxKwDfWI5Gesxo3Y6IZInsc8yYwcsY2YWwYfHsV3jGxJqCcg" />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4 scroll-reveal" data-delay="200" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <div className="grid grid-cols-1 gap-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Luz.</h3>
                                        <p className="font-['Raleway'] font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Direcionamento</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Composição.</h3>
                                        <p className="font-['Raleway'] font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Equilíbrio</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Movimento.</h3>
                                        <p className="font-['Raleway'] font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Dinâmica</p>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-headline text-3xl italic mb-2">Expressão.</h3>
                                        <p className="font-['Raleway'] font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">Intenção</p>
                                    </div>
                                </div>
                                <div className="max-w-3xl text-left border-t border-zinc-200 pt-8">
                                    <p className="font-headline text-xl italic leading-snug text-zinc-800">
                                        Aqui, cada detalhe responde a uma lógica. Nada é escolha estética isolada. Tudo é construção de percepção.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section 5: Equipe / QUEM ESTRUTURA */}
                <section className="bg-white px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-12 scroll-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                            <span className="font-label uppercase tracking-[0.3em] text-zinc-400 block mb-2 text-[10px]">QUEM ESTRUTURA</span>
                            <h2 className="font-headline text-3xl md:text-4xl text-black">Estratégia define. Imagem posiciona. Execução sustenta.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto max-w-[1386px]">
                            <div className="space-y-8 flex flex-col items-center text-center mb-12 scroll-reveal" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                    <img className="w-full h-full object-cover grayscale" data-alt="professional male portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0ESFf2VKUU01w1wDMvk9GSzceC_56tjvoVLme8E1KeN98y_Zc3Czxb47l9-giIZLy7mSRrqHj9zj4TNrDYF6-qHHrlZuYs5OK6L-MpUmwXBgRDC4HMoVG8uxvsjqwE64sm9SsADinIThjiDc6trCJ-GmADEkDjQ0xr990PJiKiBjDqIYnnO-J5hBFPuV90jlKCFIBhboqE9gA8O9y-e8JChB007vHeibnqmOp4yCmQIb11a7NCtW4pVkEGk5sdSQduOjAStefyk" />
                                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-headline text-2xl font-medium">Lucas Mazzutti</p>
                                    <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Direção Criativa</p>
                                </div>
                            </div>
                            <div className="space-y-8 flex flex-col items-center text-center mb-12 scroll-reveal" data-delay="150" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                    <img className="w-full h-full object-cover grayscale" data-alt="professional female portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKZY7vY0_xHh4W3MKSd3jlEIhiiS5gF9XM3hbMqdr3jwFr16elkblrJVykxmXHcbVQeSdE7P4M_onqrLajroloIvYyXsYw_0dkx6h0ZB_8-X1qnqw4DSmV8kmBfkcAOXNZeI0dmCOHcnkHUelR4XxcDwB4AvZY1mvpxgCC2uMnR-KZ6SBTSb2TJ9SVM4WCCr2S10Gy74ML33Hkky5gHCBsKXvXWS5RGCOi9p4IhVIH2fWSwjIYsSOGaHsZpmM2Y5DpYCs4eCRR17g" />
                                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-headline text-2xl font-medium">Elena Silva</p>
                                    <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Estratégia de Marca</p>
                                </div>
                            </div>
                            <div className="space-y-8 flex flex-col items-center text-center mb-12 scroll-reveal" data-delay="300" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                    <img className="w-full h-full object-cover grayscale" data-alt="professional male portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa6TINUvFDwA7LqkkHXDdt1XoEvOHZPH3W5C2QvV6FRZfba0ajm5Uz7SjeIBB2cvjuqSy1_kYZlLfz-iW_L4qigAleWRqobN3LB08IXDDRI5N-GPiiRLh0Q3f-1by3ux6jIwMvx-36JFc9OdYIW0AifoBbPdrqq0aQY6QlBeQ_0tjxfuTSZLNTq9-cWum4QH8VCNJldD682F3o4XhHqfQ4p-LB97VETj8FHvw2375aLuDGGogL3XhITfCpJK56DcJ_QXEXNFpfMM8" />
                                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-center justify-center space-x-4">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><rect height="20" rx="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                                            <a className="text-white hover:text-zinc-300 transition-colors" href="#"><svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-headline text-2xl font-medium">Arthur Porto</p>
                                    <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">Produção</p>
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
                            <span className="font-['Raleway'] uppercase tracking-[0.4em] text-[10px] text-zinc-500 block mb-1">O QUE DIZEM</span>
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
                                            <p className="font-['Raleway'] uppercase tracking-[0.35em] text-[10px] text-white/80 font-light">{testimonial.author}</p>
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
                {/* Section 6: Posicionamento & Autoridade */}
                <section className="bg-white px-12 py-20">
                    <div className="max-w-[1400px] mx-auto flex flex-col space-y-[24px]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-start">
                            <div className="grid grid-cols-2 gap-[8px] order-2 scroll-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <div className="col-span-2 aspect-square overflow-hidden bg-zinc-50">
                                    <img alt="B&W large placeholder" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkiQLtRcTbgce0k0oFWm4mlyb7RRXITzmnT-XtfQ2olO6jM2s71xr5xw5V6Rnii-hngJvHHL34YpjPIRdRfovLcbKY4QBgolXMJczrB8f2Tm9x4X2zH9ScZqlnIyN5GerHmP_0Q-ZgBSqqlVvThL6zDNMpgCG6XnS-vN5fogJc7kw-W5MNIeyILgIK9WwgyNQSsPFS13O3DxvzFfViYPBfjKlLrMB8ClfVr3JjzfzVIpYs8kmvTZO6VDCdARfX9jRaozLBbYICmQ0" />
                                </div>
                                <div className="overflow-hidden bg-zinc-100 aspect-[2/4]">
                                    <img alt="Portrait photography set" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFIHY560gS2ik_2GrZpF30j-g-u298R2IvVTv99wXYupz5jW7ePfhi3hHeOSQJ2w4D9995OdagrtsKYEq0WGyCiUbF4XqHAZy8VekCTL3M9cJodpb-uNjUXVWrV7ILlVTT2zmqMUAfKFTDlPXy7VUL9uEwNMf_12u39Nub3mRFN41ZWd3eCg9gWp2qZXBlD5S3HKhbGnZX9ITFbVDfNSTbkEuWv7VCiQZHtzcmfE_8zY8HzN17A0gHtn7s99IzT0-_ft0gKKjVhO8" />
                                </div>
                            </div>
                            <div className="flex flex-col items-start text-left order-1 scroll-reveal" data-delay="200" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                {/* SIDE IMAGE + TEXT SECTION */}
                                <div className="mb-12">
                                    <span className="font-label uppercase tracking-[0.3em] text-zinc-400 mb-2 block text-[8px]">DIFFERENTIAL</span>
                                    <h2 className="font-headline text-black leading-tight mb-4 md:text-4xl">O que parece natural foi direcionado.</h2>
                                    <p className="text-secondary leading-loose max-w-md font-light mb-6 text-[12px]">
                                        O que parece simples foi estruturado. Porque imagem não serve para aparecer. Serve para posicionar.
                                    </p>
                                    <Link className="inline-block px-10 py-5 border border-black text-black font-label uppercase tracking-[0.2em] text-[8px] hover:bg-black hover:text-white transition-all duration-300" href="/sobre">
                                        LER MAIS
                                    </Link>
                                </div>
                                <div className="w-full h-48 overflow-hidden bg-zinc-100 mb-20">
                                    <img alt="Visual separator" className="w-full h-full object-cover grayscale opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWM9LTdgigUXU-ARkrjEgnxbL1ujH595AoGTSmyL2KNSgbxAaA1i7Cd5cjAzXhsqSQFSrGjEvgaz37YmO-79RZCU6J6LMHEuV5Amyjj5amYPAyhB1X0ySQP297SeRH3SSOVsEyrYsOdPeQkKx4RWbKxD__UtjmT8LtPRflmw2q3N48kmA6vGLUcFUVO6N3JOLLktTEJv7YEA3jsWFXeu8Iu0vG81Y-n8JkXDK74k8WsYJOdrqtMyXzjGMECr7rqJju7Z2KHSO1dis" />
                                </div>
                                {/* AUTHORITY SECTION */}
                                <div className="flex flex-col items-start text-left mt-[120px]">
                                    <span className="font-label uppercase tracking-[0.3em] text-zinc-400 mb-2 block text-[8px]">AUTORIDADE</span>
                                    <h2 className="font-headline text-black leading-tight mb-4 md:text-4xl">Direção de imagem com estratégia, não execução isolada.</h2>
                                    <p className="text-secondary leading-loose max-w-md font-light mb-6 text-[12px]">
                                        O Studio da House Mazzutti é responsável por transformar posicionamento em imagem — com consistência, intenção e controle de percepção.
                                    </p>
                                    <Link className="inline-block px-10 py-5 border border-black text-black font-label uppercase tracking-[0.2em] text-[8px] hover:bg-black hover:text-white transition-all duration-300 mb-12" href="/contato">
                                        CONHEÇA O MÉTODO
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section 7: Editorial text block */}
                <section className="bg-black py-64 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 scale-110"></div>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-16 scroll-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                        <h2 className="font-headline text-4xl md:text-6xl text-white leading-tight italic">
                            Se sua imagem não representa o valor da sua marca — <span className="not-italic">o problema não é a produção.</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto border-y border-white/10 py-12">
                            <div className="space-y-4">
                                <p className="font-label uppercase tracking-widest text-[10px] text-zinc-500">Deixa de:</p>
                                <ul className="text-white space-y-2 font-light">
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white/40"></span> <span>Imagem genérica</span></li>
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white/40"></span> <span>Produção sem direção</span></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <p className="font-label uppercase tracking-widest text-[10px] text-zinc-500">Passa a:</p>
                                <ul className="text-white space-y-2 font-light">
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white"></span> <span>Consistência visual</span></li>
                                    <li className="flex items-center space-x-2"><span className="w-1 h-[1px] bg-white"></span> <span>Mais valor percebido</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-8">
                            <Link className="inline-block px-16 py-6 border-[0.5px] border-white text-white font-label uppercase tracking-[0.3em] text-[12px] hover:bg-white hover:text-black transition-all duration-300" href="/contato">
                                INICIAR CONVERSA ESTRATÉGICA
                            </Link>
                            <p className="font-label uppercase tracking-widest text-[9px] text-zinc-500">Menos tentativa. Mais direção.</p>
                        </div>
                    </div>
                </section>
                            {/* STRUCTURE SELECTION */}
                <section className="bg-white px-[40px]">
                    <div className="bg-surface-container-lowest py-32 px-12 md:px-12 lg:px-24">
                        <div className="max-w-[1440px] mx-auto">
                            <div className="text-center mb-24 scroll-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
                                <span className="font-label uppercase tracking-[0.2em] text-[10px] text-zinc-400 mb-4 block">ESCOLHA SEU NÍVEL</span>
                                <h2 className="font-headline text-4xl md:text-5xl tracking-tight">Escolha o nível ideal para o seu momento.</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "BOOK",
                                        link: "/studio/book",
                                        subtitle: '"Onde a imagem é construída com intenção"',
                                        items: ["Book profissional", "Direção de imagem", "Ensaio estratégico", "Entrega high-end"]
                                    },
                                    {
                                        title: "ENSAIO",
                                        link: "/studio/ensaio",
                                        subtitle: '"Onde a presença ganha forma e autoridade"',
                                        items: ["Ensaio pessoal", "Direção de imagem", "Posicionamento visual", "Entrega premium"]
                                    },
                                    {
                                        title: "COBERTURA",
                                        link: "/studio/cobertura",
                                        subtitle: '"Onde sua agenda vira narrativa visual"',
                                        items: ["Acompanhamento real", "Captação estratégica", "Direção de presença", "Entrega premium"]
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="p-10 border border-[#e0e0e0] flex flex-col justify-between h-full bg-white transition-all duration-400 ease-in-out hover:bg-black hover:scale-[1.04] hover:z-10 group hover-transition-refined scroll-reveal" data-delay={idx * 150} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
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
