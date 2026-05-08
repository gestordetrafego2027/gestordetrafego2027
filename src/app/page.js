"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";

/**
 * HOME PAGE - HOUSE MAZZUTTI
 * Transformação completa de HTML/Stitch para React/Next.js
 */
export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

    const heroSlides = [
        {
            label: 'STUDIO - HMZT',
            titulo: 'Conteúdo Pessoal',
            texto: 'Produção e direção de imagem pessoal em São Paulo.',
            cta: 'CONHECER O STUDIO',
            link: '/studio'
        },
        {
            label: 'PRODUTORA - HMZT',
            titulo: 'Produção Executiva',
            texto: 'Gestão de Projetos Audiovisuais e Casting para Marcas Corporativas.',
            cta: 'CONHECER A PRODUTORA',
            link: '/produtora'
        },
        {
            label: 'AGÊNCIA - HMZT',
            titulo: 'Gestão de Marcas',
            texto: 'Branding, Rebranding e Lançamentos de campanha.',
            cta: 'CONHECER A AGÊNCIA',
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
            text: "A House Mazzutti trouxe uma clareza que eu não conseguia encontrar sozinho. Eles não apenas criaram uma marca, eles criaram um novo patamar para o meu negócio.",
            author: "JULIANO R. — FOUNDER & CEO",
        },
        {
            text: "O posicionamento estratégico mudou completamente a percepção do mercado sobre nossos serviços. A estética é apenas a ponta do iceberg.",
            author: "MARINA S. — DIRETORA DE ARTE",
        },
        {
            text: "Trabalhar com o Lucas e sua equipe foi o melhor investmento do ano. Eles entendem de negócio tanto quanto entendem de design.",
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
        <div className="bg-white text-black selection:bg-black selection:text-white">
            {/* NOISE OVERLAY */}
            <div className="noise-overlay"></div>

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
                    <div className="relative z-10 h-full flex flex-col justify-center swiss-grid">
                        <div className="max-w-4xl">
                            <span
                                className="hero-animate label-micro mb-6 block text-white/60"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                            >
                                {heroSlides[currentHeroSlide].label}
                            </span>
                            <h1
                                className="hero-animate hero-title text-white mb-8"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                            >
                                {heroSlides[currentHeroSlide].titulo}
                            </h1>
                            <p 
                                className="hero-animate body-text mb-12 text-white/60"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                            >
                                {heroSlides[currentHeroSlide].texto}
                            </p>
                            <Link
                                href={heroSlides[currentHeroSlide].link}
                                className="hero-animate btn-swiss inline-block !border-white text-white hover:bg-white hover:text-black"
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
                    className="bg-white py-40 swiss-grid"
                >
                    <div className="mb-24 text-left">
                        <span className="label-micro text-zinc-400 block mb-4">Portfólio</span>
                        <h2 className="section-title text-black">Trabalhos Selecionados</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {[
                            { title: "Projeto Essência", sub: "Branding Estratégico", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe4mdbRqXBNKzzngv3g_VBLp6GYZlgzzZZODsLL8bHFzPo4h2MQ_wh08IE0TeoTAnYp7r8cqXbKU7Xa5wklKFRY-ZWrYIpRSmFUuQapR_3VovlHbwzL2DnDZwXwFKOowF6p1RYMEOqh1_GwWe1FY9MUqL_MHVQ04dnmk4YyX2I1Nbz3zL-t4bcyXEQ_COqtJmLZiwYf076YUYpoITRuaCFPCaMTBWkm6LYq7RU4l8f9gyRN9hk8omSajhnHc8pNlB8BAi1ZerKdL0" },
                            { title: "Movimento Urbano", sub: "Direção Criativa", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmEdY5S8J-r2-yA6KBnPbY8KJ_kzSWmaDtw4KI3V4XfuFw9crzbRkv8ODbEuL4WNOjSHEaBI3bT-J6Fg0SnQ7-F55Z7jP7UT2ZzHsyDIVGu2G67mWa2Qxorjl-Upf9isBLdGue5dKoH7891HWpO6iT5EbeCFrJCwFVIQo8-XVRq_ZaV_sJsyb9zfKO_Dm-QjDzX38uBl3zJodj4KP7GattGIKHVJ8Hkn24EzNVoNBWMnUB3avAJoDg_S2DzRoUhd5-bugSQgDzSB0" },
                            { title: "Alfaiataria Moderna", sub: "Posicionamento", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuADvGTrzOI5PEUbaeC7AW7usgMalF3qizDJJ0KUpcNG6m9gEpidT-mTLmb1F3zpPaKsm5aOEastKBq1gcgasPBFL2aQQT1TCsitpTNJuy9KBP4cgyFtyvk2nUo1WqXii9tLH0TPR_h0HV84zRlZFfEnEAJ344iW4H6sfL7IC47U5veqjHNq4WUq6MqzNrcQ8otKdLxpwV9j4bBHQPkyEGa7anAANlMNVkXbnsoFAoDyBX7opOcB3BSImGRftoLeyoU4cmneRk6ZgTk" },
                            { title: "Horizonte", sub: "Produção de Imagem", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKnc6oH_hYvu13IeEb61FyxFkY3Edhlt2km8Jry0SlDIZ7KlpeE-AVwYRezdk2O_XEVH34_DobRA7QJY4YofFZUSMXG3BeTc5IdaApkxKb3Z1Zd14giFedWaYlTg7jx83cIP-fHnIAPoHKE93UEOWCj_iGqRTd0q2BO_l4h_oMK2TIBNGbh5QW43fUo-FhcFxpTF9A5vIi9kKaAk-ZapE8zkT6Uk3Fe-VRw3DSK5F3AiqnbXBwPhBzkQ-MTLhF1bCsplLY712XU5c" },
                            { title: "Prestigio", sub: "Branding", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkA7crS5fwR9M1uHLxWGre8utOIQhLns1favg4_bqxW4l-Rhz-kocfZxJb59JIHoZo0AuTsli_xQD1X_z3OtXWtQY9FQl5HVclTTuNUMQKMWYswMESC7LVKN8Gt7F_wJV_yWoTwt54-Ob2IAfKZnaLu1muOYHzXGofG-8DJfHBXFuGu6w16J51hk_p07tLwwhj9yuhYxTb-0bc1SSn0oSkyr0OHqu7L7my2rY0YBwqS364_RTWjKGw1-ModtNWEmtX0VrKG9bErhw" },
                            { title: "Espaço", sub: "Curadoria", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFIHY560gS2ik_2GrZpF30j-g-u298R2IvVTv99wXYupz5jW7ePfhi3hHeOSQJ2w4D9995OdagrtsKYEq0WGyCiUbF4XqHAZy8VekCTL3M9cJodpb-uNjUXVWrV7ILlVTT2zmqMUAfKFTDlPXy7VUL9uEwNMf_12u39Nub3mRFN41ZWd3eCg9gWp2qZXBlD5S3HKhbGnZX9ITFbVDfNSTbkEuWv7VCiQZHtzcmfE_8zY8HzN17A0gHtn7s99IzT0-_ft0gKKjVhO8" },
                        ].map((work, i) => (
                            <div 
                                key={i} 
                                className="scroll-reveal relative group bg-white aspect-[4/3] overflow-hidden"
                                data-delay={i * 100}
                                style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
                            >
                                <img
                                    alt={work.title}
                                    className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0"
                                    src={work.src}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                    <p className="subsection-title text-black">{work.title}</p>
                                    <p className="label-micro text-zinc-500 mt-2">
                                        {work.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SERVICES SECTION */}
                <section className="bg-white py-40 swiss-grid border-t-[0.5px] border-zinc-100">
                    <div className="max-w-[1260px] mb-24">
                        <div className="mb-12">
                            <span className="label-micro text-zinc-400 block mb-4">Serviços</span>
                            <h2 className="section-title text-black">
                                Integrado. Estratégico. Intencional.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                            {[
                                {
                                    icon: "brush",
                                    title: "Branding Estratégico",
                                    desc: "Construção de fundamentos de marca. DNA, tom de voz e narrativa que transformam negócios em autoridades de mercado.",
                                },
                                {
                                    icon: "visibility",
                                    title: "Direção Criativa",
                                    desc: "A curadoria estética que traduz a estratégia em impacto visual. Onde a arte e o negócio se encontram.",
                                },
                                {
                                    icon: "photo_camera",
                                    title: "Produção de Imagem",
                                    desc: "Execução técnica de alto padrão. Imagens que comunicam prestígio e desejo sem a necessidade de legendas.",
                                },
                            ].map((service, i) => (
                                <div key={i} className="flex flex-col space-y-6">
                                    <span className="material-symbols-outlined text-4xl !font-thin">
                                        {service.icon}
                                    </span>
                                    <h3 className="subsection-title">{service.title}</h3>
                                    <p className="body-text text-zinc-500">
                                        {service.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PHILOSOPHY SECTION */}
                <section className="relative overflow-hidden min-h-[70vh] flex items-center swiss-grid py-40">
                    <div 
                        className="parallax-bg absolute inset-0 -z-10"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1920&q=80)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4,
                            filter: 'grayscale(100%)'
                        }} 
                    />
                    
                    <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-24 text-black">
                        <div className="w-full lg:w-1/3 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <img
                                    alt="B&W editorial photography"
                                    className="w-full h-full object-cover grayscale"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHOOyecCxbUCU6_y9vpcFi6a1ZBmoHI59QTvX7-mYJHcU8SfV0rY1_M6fRpvrgcf1v5KuSRnO7opF15zAf29T5zCf08pMyHvaiZ3XGXEBKtgBCjkNScMmeU5GGltKS0Oo9t0Wv3bGq9PB3UvL93v_LlQkpfl3-LhK55rlnWxOMKNZTON2x8enWcwwJDVBKYCalcw0uB02-OgQAnRr5qEJ7eUY62VPxKwDfWI5Gesxo3Y6IZInsc8yYwcsY2YWwYfHsV3jGxJqCcg"
                                />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="max-w-2xl">
                                <h2 className="section-title mb-8">
                                    Marcas fortes não disputam atenção. Elas ocupam espaço.
                                </h2>
                                <p className="label-micro text-zinc-500">
                                    Filosofia House
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STRUCTURE SELECTION */}
                <section className="bg-white py-40 swiss-grid">
                    <div className="max-w-[1440px]">
                        <div className="mb-24">
                            <span className="label-micro text-zinc-400 mb-4 block">Soluções</span>
                            <h2 className="section-title">Estruturas de Negócio</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                            {[
                                {
                                    title: "STUDIO",
                                    link: "/studio",
                                    subtitle: 'Direção de Imagem Pessoal',
                                    items: ["Book Profissional", "Ensaio Pessoal", "Cobertura Externa", "Produção de Moda"]
                                },
                                {
                                    title: "PRODUTORA",
                                    link: "/produtora",
                                    subtitle: 'Campanhas e Publicidade',
                                    items: ["Editorial de Moda", "Casting Estratégico", "Conteúdo Institucional", "Produção Executiva"]
                                },
                                {
                                    title: "AGÊNCIA",
                                    link: "/agencia",
                                    subtitle: 'Branding e Estratégia',
                                    items: ["Branding Project", "Posicionamento Digital", "Web Development", "Gestão de Presença"]
                                }
                            ].map((card, idx) => (
                                <div key={idx} className="p-16 border-[0.5px] border-zinc-100 flex flex-col justify-between h-full bg-white transition-all duration-700 ease-in-out hover:bg-black group">
                                    <div>
                                        <h3 className="subsection-title mb-2 group-hover:text-white">{card.title}</h3>
                                        <p className="body-text text-zinc-400 mb-12 group-hover:text-white/40">{card.subtitle}</p>
                                        <ul className="space-y-4 mb-16">
                                            {card.items.map((item, i) => (
                                                <li key={i} className="label-micro text-zinc-500 group-hover:text-white/60 flex items-center gap-3">
                                                    <span className="w-1.5 h-[0.5px] bg-zinc-300 group-hover:bg-white/30"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link href={card.link} className="btn-swiss w-full text-center group-hover:!border-white group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-black">
                                        Explorar
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* TESTIMONIALS SECTION */}
                <section 
                    className="bg-black py-40 swiss-grid relative overflow-hidden flex items-center justify-center"
                    style={{ minHeight: '600px' }}
                >
                    <div className="relative z-10 w-full max-w-4xl text-center">
                        <div className="mb-16">
                            <span className="label-micro text-white/40 block mb-4">
                                Testemunhos
                            </span>
                            <h2 className="section-title text-white">Vozes do Mercado</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden" style={{ minHeight: '220px' }}>
                                {testimonials.map((testimonial, i) => (
                                    <div
                                        key={i}
                                        className={`testimonial-slide ${currentSlide === i ? "active" : ""}`}
                                    >
                                        <h3 className="subsection-title text-white !leading-relaxed max-w-3xl mx-auto">
                                            "{testimonial.text}"
                                        </h3>
                                        <div className="pt-8">
                                            <p className="label-micro text-white/40">
                                                {testimonial.author}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Pagination Indicators */}
                            <div className="flex space-x-6 pt-12">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`w-12 h-[0.5px] transition-all duration-700 ${currentSlide === i ? "bg-white w-20" : "bg-white/20"
                                            }`}
                                        onClick={() => goToSlide(i)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLOG SECTION */}
                <section className="bg-white py-40 swiss-grid">
                    <div className="max-w-[1400px]">
                        <div className="mb-24">
                            <p className="label-micro text-zinc-400 mb-4">Editorial</p>
                            <h2 className="section-title">Últimos Artigos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[0.5px] border-zinc-100">
                            {[
                                {
                                    categoria: 'Studio — Book',
                                    titulo: 'O que define o sucesso no mercado de moda atual',
                                    data: 'Maio 2026',
                                    slug: '/blog/book-para-modelos-quem-e-escolhido'
                                },
                                {
                                    categoria: 'Agência — Branding',
                                    titulo: 'O branding como ativo de valor no luxo contemporâneo',
                                    data: 'Maio 2026',
                                    slug: '/blog/branding-project-arquitetura-valor'
                                },
                                {
                                    categoria: 'Direção — Criativa',
                                    titulo: 'Narrativas visuais e o futuro da direção de imagem',
                                    data: 'Maio 2026',
                                    slug: '/blog/editorial-moda-narrativa-visual'
                                }
                            ].map((post, idx) => (
                                <Link key={idx} href={post.slug} className="group border-[0.5px] border-zinc-100 p-16 flex flex-col justify-between aspect-square hover:bg-black transition-all duration-700">
                                    <div>
                                        <p className="label-micro text-zinc-400 mb-8 group-hover:text-white/40">
                                            {post.categoria}
                                        </p>
                                        <h3 className="subsection-title group-hover:text-white">
                                            {post.titulo}
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="label-micro text-zinc-300 group-hover:text-white/20">{post.data}</span>
                                        <span className="text-2xl group-hover:text-white transition-transform duration-500 group-hover:translate-x-2">→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA CONTACT SECTION */}
                <section
                    className="bg-black py-64 swiss-grid text-center relative overflow-hidden"
                    id="contato"
                >
                    <div className="relative z-10 max-w-5xl mx-auto space-y-24">
                        <h2 className="hero-title text-white !max-w-none">
                            Onde a visão encontra a execução.
                        </h2>
                        <div className="flex flex-col items-center space-y-12">
                            <Link
                                className="btn-swiss !border-white text-white hover:bg-white hover:text-black"
                                href="/contato"
                            >
                                INICIAR PROJETO
                            </Link>
                            <p className="label-micro text-white/30">
                                Direção Criativa & Estratégia Premium
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
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
    );
}
