"use client";

import React, { useState } from "react";
import Link from "next/link";

/**
 * HOME PAGE - HOUSE MAZZUTTI
 * Transformação completa de HTML/Stitch para React/Next.js
 */
export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

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
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            {/* NOISE OVERLAY */}
            <div className="noise-overlay fixed inset-0 z-[100] pointer-events-none opacity-5"></div>

            {/* HEADER */}
            <header className="fixed top-0 w-full flex justify-between items-center px-12 py-10 z-50 bg-transparent">
                <div className="text-lg font-serif tracking-tight text-white uppercase font-headline">
                    House Mazzutti
                </div>
                <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12">
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/">HOME</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/about">SOBRE</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/studio">STUDIO</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/produtora">PRODUTORA</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/agencia">AGÊNCIA</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/angelo">ANGELO</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/comunidade">COMUNIDADE</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/portfolio">PORTFÓLIO</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/blog">BLOG</Link>
                    <Link className="font-raleway uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="/contato">CONTATO</Link>
                </nav>
                <div className="flex items-center space-x-6 text-white">
                    <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform">
                        <span className="material-symbols-outlined" data-icon="search">search</span>
                    </button>
                    <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform flex flex-col space-y-1.5 w-6">
                        <span className="block w-full h-[1px] bg-current"></span>
                        <span className="block w-full h-[1px] bg-current"></span>
                        <span className="block w-full h-[1px] bg-current"></span>
                    </button>
                </div>
            </header>

            <main>
                {/* HERO SECTION */}
                <section
                    className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0"
                    style={{ height: "105vh" }}
                >
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-4xl fade-in">
                            <span className="font-label uppercase tracking-[0.3em] text-[10px] text-white/60 mb-8 block">
                                STRATEGIC HOUSE
                            </span>
                            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-12 italic font-light">
                                A arquitetura do
                                <br />
                                seu posicionamento.
                            </h1>
                            <button className="group relative px-10 py-3 border-[0.5px] border-white/30 text-white font-label text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                                CONHEÇA O MÉTODO
                            </button>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 left-12 flex items-center z-20">
                        <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity">
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
                        <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity">
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
                    <div className="mb-12 text-center flex flex-col items-center">
                        <span className="font-label uppercase tracking-[0.3em] text-[10px] text-zinc-400 block mb-4">
                            BRANDING & POSICIONAMENTO
                        </span>
                        <h2 className="font-headline text-3xl text-black">Trabalhos Selecionados</h2>
                        <div className="line-divider mt-6 text-black"></div>
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
                            <div key={i} className="relative group bg-white aspect-[4/3] overflow-hidden">
                                <img
                                    alt={work.title}
                                    className="w-full h-full object-cover grayscale transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0"
                                    src={work.src}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center p-4">
                                    <p className="font-headline text-sm text-black italic">{work.title}</p>
                                    <p className="font-label uppercase tracking-widest text-[7px] text-zinc-500 mt-1">
                                        {work.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SERVICES SECTION */}
                <section className="bg-white py-32 px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1260px] mx-auto text-center mb-12">
                        <div className="mb-20">
                            <span className="font-label uppercase tracking-[0.3em] text-[10px] text-black block mb-4">
                                ATUAMOS COM
                            </span>
                            <h2 className="font-headline text-5xl text-black">
                                Integrado. Estratégico. Intencional.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
                                <div key={i} className="flex flex-col items-center space-y-4">
                                    <span className="material-symbols-outlined text-4xl font-extralight">
                                        {service.icon}
                                    </span>
                                    <h3 className="font-headline text-2xl">{service.title}</h3>
                                    <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                        {service.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PHILOSOPHY SECTION */}
                <section className="relative bg-zinc-50/50 px-12 overflow-hidden py-16">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/4 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm">
                                <img
                                    alt="B&W editorial photography"
                                    className="w-full h-full object-cover grayscale"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHOOyecCxbUCU6_y9vpcFi6a1ZBmoHI59QTvX7-mYJHcU8SfV0rY1_M6fRpvrgcf1v5KuSRnO7opF15zAf29T5zCf08pMyHvaiZ3XGXEBKtgBCjkNScMmeU5GGltKS0Oo9t0Wv3bGq9PB3UvL93v_LlQkpfl3-LhK55rlnWxOMKNZTON2x8enWcwwJDVBKYCalcw0uB02-OgQAnRr5qEJ7eUY62VPxKwDfWI5Gesxo3Y6IZInsc8yYwcsY2YWwYfHsV3jGxJqCcg"
                                />
                            </div>
                        </div>
                        <div className="flex-grow w-full py-4">
                            <div className="grid grid-cols-1 gap-y-8">
                                <div className="max-w-xl text-left">
                                    <h2 className="font-headline text-xl md:text-2xl italic leading-snug mb-2">
                                        “Marcas fortes não disputam atenção. <br />
                                        <span className="not-italic">Elas ocupam espaço.</span>”
                                    </h2>
                                    <p className="font-raleway font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">
                                        Filosofia House
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <div className="max-w-xl text-right">
                                        <h3 className="font-headline text-xl md:text-2xl leading-snug mb-2">
                                            A maioria constrói visibilidade. <br />
                                            <span className="italic">Poucos constroem posição.</span>
                                        </h3>
                                        <p className="font-raleway font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">
                                            Diferenciação
                                        </p>
                                    </div>
                                </div>
                                <div className="max-w-xl text-left">
                                    <p className="font-headline text-lg md:text-xl italic leading-snug text-zinc-800 mb-2">
                                        Não é sobre produzir conteúdo. É sobre o que sua marca comunica — com ou sem presença.
                                    </p>
                                    <p className="font-raleway font-light uppercase tracking-[0.2em] text-[9px] text-zinc-500">
                                        Comunicação Intencional
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <div className="max-w-xl text-right">
                                        <h3 className="font-headline text-xl md:text-2xl leading-tight mb-2">
                                            Existe um point onde a execução deixa de resolver. E a falta de direção começa a aparecer.
                                        </h3>
                                        <p className="font-headline text-lg italic text-zinc-400">
                                            É nesse ponto que entramos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TEAM SECTION */}
                <section className="bg-white px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-12">
                            <span className="font-label uppercase tracking-[0.3em] text-zinc-400 block mb-2 text-[10px]">
                                QUEM ESTRUTURA
                            </span>
                            <h2 className="font-headline text-3xl md:text-4xl text-black">
                                Estratégia define. Imagem posiciona. Execução sustenta.
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto max-w-[1386px]">
                            {[
                                { name: "Lucas Mazzutti", role: "Direção Criativa", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe0ESFf2VKUU01w1wDMvk9GSzceC_56tjvoVLme8E1KeN98y_Zc3Czxb47l9-giIZLy7mSRrqHj9zj4TNrDYF6-qHHrlZuYs5OK6L-MpUmwXBgRDC4HMoVG8uxvsjqwE64sm9SsADinIThjiDc6trCJ-GmADEkDjQ0xr990PJiKiBjDqIYnnO-J5hBFPuV90jlKCFIBhboqE9gA8O9y-e8JChB007vHeibnqmOp4yCmQIb11a7NCtW4pVkEGk5sdSQduOjAStefyk" },
                                { name: "Elena Silva", role: "Estratégia de Marca", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKZY7vY0_xHh4W3MKSd3jlEIhiiS5gF9XM3hbMqdr3jwFr16elkblrJVykxmXHcbVQeSdE7P4M_onqrLajroloIvYyXsYw_0dkx6h0ZB_8-X1qnqw4DSmV8kmBfkcAOXNZeI0dmCOHcnkHUelR4XxcDwB4AvZY1mvpxgCC2uMnR-KZ6SBTSb2TJ9SVM4WCCr2S10Gy74ML33Hkky5gHCBsKXvXWS5RGCOi9p4IhVIH2fWSwjIYsSOGaHsZpmM2Y5DpYCs4eCRR17g" },
                                { name: "Arthur Porto", role: "Produção", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa6TINUvFDwA7LqkkHXDdt1XoEvOHZPH3W5C2QvV6FRZfba0ajm5Uz7SjeIBB2cvjuqSy1_kYZlLfz-iW_L4qigAleWRqobN3LB08IXDDRI5N-GPiiRLh0Q3f-1by3ux6jIwMvx-36JFc9OdYIW0AifoBbPdrqq0aQY6QlBeQ_0tjxfuTSZLNTq9-cWum4QH8VCNJldD682F3o4XhHqfQ4p-LB97VETj8FHvw2375aLuDGGogL3XhITfCpJK56DcJ_QXEXNFpfMM8" },
                            ].map((member, i) => (
                                <div key={i} className="space-y-8 flex flex-col items-center text-center mb-12">
                                    <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative group cursor-pointer">
                                        <img
                                            className="w-full h-full object-cover grayscale"
                                            src={member.src}
                                            alt={member.name}
                                        />
                                        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out">
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] ease-in-out flex items-end justify-center pb-12 space-x-[30px]">
                                                <a className="text-white hover:text-zinc-300 transition-colors" href="#">
                                                    <svg
                                                        fill="none"
                                                        height="24"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                                    </svg>
                                                </a>
                                                <a className="text-white hover:text-zinc-300 transition-colors" href="#">
                                                    <svg
                                                        fill="none"
                                                        height="24"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                        <rect height="12" width="4" x="2" y="9"></rect>
                                                        <circle cx="4" cy="4" r="2"></circle>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-headline text-2xl font-medium">{member.name}</p>
                                        <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS SECTION */}
                <section className="bg-[#000000] px-12 relative overflow-hidden flex items-center justify-center min-h-[500px] py-[131px]">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-black text-[18vw] uppercase tracking-[0.1em] text-[#3a3a3a] leading-none translate-y-[40%] opacity-50">
                            DEPOIMENTOS
                        </span>
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
                        <div className="mb-4">
                            <span className="font-raleway uppercase tracking-[0.4em] text-[10px] text-zinc-500 block mb-1">
                                O QUE DIZEM
                            </span>
                            <h2 className="font-headline text-3xl text-white italic tracking-wide">Depoimentos</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-1">
                                {testimonials.map((testimonial, i) => (
                                    <div
                                        key={i}
                                        className={`testimonial-slide ${currentSlide === i ? "active" : ""}`}
                                    >
                                        <h3 className="font-headline text-2xl md:text-[2.15rem] text-white leading-snug italic max-w-3xl mx-auto">
                                            "{testimonial.text}"
                                        </h3>
                                        <div className="pt-3">
                                            <p className="font-raleway uppercase tracking-[0.35em] text-[10px] text-white/80 font-light">
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

                {/* UNIFIED POSICIONAMENTO & AUTORIDADE SECTION */}
                <section className="bg-white px-12 py-20">
                    <div className="max-w-[1400px] mx-auto flex flex-col space-y-[24px]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-start">
                            {/* Images on the LEFT */}
                            <div className="grid grid-cols-2 gap-[8px] order-2 lg:order-1">
                                <div className="col-span-2 aspect-square overflow-hidden bg-zinc-50">
                                    <img
                                        alt="B&W large photography"
                                        className="w-full h-full object-cover grayscale"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkiQLtRcTbgce0k0oFWm4mlyb7RRXITzmnT-XtfQ2olO6jM2s71xr5xw5V6Rnii-hngJvHHL34YpjPIRdRfovLcbKY4QBgolXMJczrB8f2Tm9x4X2zH9ScZqlnIyN5GerHmP_0Q-ZgBSqqlVvThL6zDNMpgCG6XnS-vN5fogJc7kw-W5MNIeyILgIK9WwgyNQSsPFS13O3DxvzFfViYPBfjKlLrMB8ClfVr3JjzfzVIpYs8kmvTZO6VDCdARfX9jRaozLBbYICmQ0"
                                    />
                                </div>
                                <div className="overflow-hidden bg-zinc-100 aspect-[2/4]">
                                    <img
                                        alt="B&W editorial photography"
                                        className="w-full h-full object-cover grayscale"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFIHY560gS2ik_2GrZpF30j-g-u298R2IvVTv99wXYupz5jW7ePfhi3hHeOSQJ2w4D9995OdagrtsKYEq0WGyCiUbF4XqHAZy8VekCTL3M9cJodpb-uNjUXVWrV7ILlVTT2zmqMUAfKFTDlPXy7VUL9uEwNMf_12u39Nub3mRFN41ZWd3eCg9gWp2qZXBlD5S3HKhbGnZX9ITFbVDfNSTbkEuWv7VCiQZHtzcmfE_8zY8HzN17A0gHtn7s99IzT0-_ft0gKKjVhO8"
                                    />
                                </div>
                            </div>

                            {/* Text on the RIGHT */}
                            <div className="flex flex-col items-start text-left order-1 lg:order-2">
                                {/* POSICIONAMENTO Block */}
                                <div className="mb-12">
                                    <span className="font-label uppercase tracking-[0.3em] text-zinc-400 mb-2 block text-[8px]">
                                        POSICIONAMENTO
                                    </span>
                                    <h2 className="font-headline text-black leading-tight mb-4 text-3xl md:text-4xl">
                                        Quando existe clareza — a comunicação simplifica.
                                    </h2>
                                    <p className="text-secondary leading-loose max-w-md font-light mb-6 text-[12px]">
                                        A simplicidade é o último estágio da sofisticação. Trabalhamos para remover o
                                        ruído e deixar apenas a essência do que torna sua marca única.
                                    </p>
                                    <a
                                        className="inline-block px-10 py-5 border border-black text-black font-label uppercase tracking-[0.2em] text-[8px] hover:bg-black hover:text-white transition-all duration-300"
                                        href="#"
                                    >
                                        LER MAIS
                                    </a>
                                </div>

                                {/* Visual Separator Image */}
                                <div className="w-full h-48 overflow-hidden bg-zinc-100 mb-20">
                                    <img
                                        alt="Visual separator"
                                        className="w-full h-full object-cover grayscale opacity-80"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWM9LTdgigUXU-ARkrjEgnxbL1ujH595AoGTSmyL2KNSgbxAaA1i7Cd5cjAzXhsqSQFSrGjEvgaz37YmO-79RZCU6J6LMHEuV5Amyjj5amYPAyhB1X0ySQP297SeRH3SSOVsEyrYsOdPeQkKx4RWbKxD__UtjmT8LtPRflmw2q3N48kmA6vGLUcFUVO6N3JOLLktTEJv7YEA3jsWFXeu8Iu0vG81Y-n8JkXDK74k8WsYJOdrqtMyXzjGMECr7rqJju7Z2KHSO1dis"
                                    />
                                </div>

                                {/* AUTORIDADE Block */}
                                <div className="flex flex-col items-start text-left mt-0 lg:mt-[120px]">
                                    <span className="font-label uppercase tracking-[0.3em] text-zinc-400 mb-2 block text-[8px]">
                                        AUTORIDADE
                                    </span>
                                    <h2 className="font-headline text-black leading-tight mb-4 text-3xl md:text-4xl">
                                        Não é sobre parecer melhor.
                                    </h2>
                                    <p className="text-secondary leading-loose max-w-md font-light mb-6 text-[12px]">
                                        É sobre não precisar provar. Se ainda existe dúvida, falta estratégia. Se existe
                                        direção, o crescimento se torna consequência.
                                    </p>
                                    <a
                                        className="inline-block px-10 py-5 border border-black text-black font-label uppercase tracking-[0.2em] text-[8px] hover:bg-black hover:text-white transition-all duration-300 mb-12"
                                        href="#"
                                    >
                                        LER MAIS
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA CONTACT SECTION */}
                <section
                    className="bg-black py-64 px-12 text-center relative overflow-hidden"
                    id="contato"
                >
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-4xl mx-auto space-y-16">
                        <h2 className="font-headline text-4xl md:text-7xl text-white leading-tight italic">
                            Se sua marca precisa de posicionamento — <span className="not-italic">seguimos.</span>
                        </h2>
                        <div className="flex flex-col items-center space-y-8">
                            <a
                                className="inline-block px-16 py-6 border-[0.5px] border-white text-white font-label uppercase tracking-[0.3em] text-[12px] hover:bg-white hover:text-black transition-all duration-300"
                                href="#"
                            >
                                INICIAR CONVERSA ESTRATÉGICA
                            </a>
                            <p className="font-label uppercase tracking-widest text-[9px] text-zinc-500">
                                Menos tentativa. Mais direção.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
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
    );
}
