import React, { useState, useEffect } from 'react';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            {/* Design System applied via globals.css */}

            <header className="fixed top-0 w-full flex justify-between items-center px-12 py-10 z-50 bg-transparent">
                <div className="text-lg font-serif tracking-tight text-white uppercase font-headline">
                    House Mazzutti
                </div>
                <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12">
                    <a className="font-['Raleway'] uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="#">HOME</a>
                    <a className="font-['Raleway'] uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="#">SOBRE</a>
                    <a className="font-['Raleway'] uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="#">PORTFÓLIO</a>
                    <a className="font-['Raleway'] uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="#">BLOG</a>
                    <a className="font-['Raleway'] uppercase tracking-[0.15em] text-[11px] font-light text-white hover:opacity-70 transition-opacity duration-300" href="#">CONTATO</a>
                </nav>
                <div className="flex items-center space-x-6 text-white">
                    <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="hover:opacity-70 transition-opacity duration-100 scale-100 active:scale-[0.99] transition-transform flex flex-col space-y-1.5 w-6">
                        <span className="block w-full h-[1px] bg-current"></span>
                        <span className="block w-full h-[1px] bg-current"></span>
                        <span className="block w-full h-[1px] bg-current"></span>
                    </button>
                </div>
            </header>

            <main>
                <section className="relative w-full overflow-hidden bg-primary m-0 p-0 border-0" style={{ height: '105vh' }}>
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-12 md:pl-48">
                        <div className="max-w-4xl fade-in">
                            <span className="font-label uppercase tracking-[0.3em] text-[10px] text-white/60 mb-8 block">STRATEGIC HOUSE</span>
                            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-12 italic font-light">
                                A arquitetura do<br/>seu posicionamento.
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
                                <svg className="-ml-1" fill="none" height="20" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" width="20">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-12 flex items-center z-20">
                        <button className="nav-btn flex items-center opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 group">
                                <svg className="-mr-1" fill="none" height="20" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" width="20">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                <div className="w-10 h-[1px] bg-white transition-all duration-300 group-hover:w-16"></div>
                            </div>
                        </button>
                    </div>
                </section>

                <section className="bg-white py-24 md:py-48 transition-all duration-1000">
                    <div className="mb-24 text-center flex flex-col items-center px-6">
                        <span className="font-label uppercase tracking-[0.4em] text-[9px] text-zinc-400 block mb-6 px-4 py-1 border-b border-zinc-100">BRANDING & POSICIONAMENTO</span>
                        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-black font-light italic">Trabalhos Selecionados</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-100 border-y border-zinc-100">
                        {[
                            { title: 'Projeto Essência', subtitle: 'Branding Estratégico', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe4mdbRqXBNKzzngv3g_VBLp6GYZlgzzZZODsLL8bHFzPo4h2MQ_wh08IE0TeoTAnYp7r8cqXbKU7Xa5wklKFRY-ZWrYIpRSmFUuQapR_3VovlHbwzL2DnDZwXwFKOowF6p1RYMEOqh1_GwWe1FY9MUqL_MHVQ04dnmk4YyX2I1Nbz3zL-t4bcyXEQ_COqtJmLZiwYf076YUYpoITRuaCFPCaMTBWkm6LYq7RU4l8f9gyRN9hk8omSajhnHc8pNlB8BAi1ZerKdL0', span: 'md:col-span-8 aspect-[16/9]' },
                            { title: 'Movimento Urbano', subtitle: 'Direção Criativa', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmEdY5S8J-r2-yA6KBnPbY8KJ_kzSWmaDtw4KI3V4XfuFw9crzbRkv8ODbEuL4WNOjSHEaBI3bT-J6Fg0SnQ7-F55Z7jP7UT2ZzHsyDIVGu2G67mWa2Qxorjl-Upf9isBLdGue5dKoH7891HWpO6iT5EbeCFrJCwFVIQo8-XVRq_ZaV_sJsyb9zfKO_Dm-QjDzX38uBl3zJodj4KP7GattGIKHVJ8Hkn24EzNVoNBWMnUB3avAJoDg_S2DzRoUhd5-bugSQgDzSB0', span: 'md:col-span-4 aspect-[4/5]' },
                            { title: 'Alfaiataria Moderna', subtitle: 'Posicionamento', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADvGTrzOI5PEUbaeC7AW7usgMalF3qizDJJ0KUpcNG6m9gEpidT-mTLmb1F3zpPaKsm5aOEastKBq1gcgasPBFL2aQQT1TCsitpTNJuy9KBP4cgyFtyvk2nUo1WqXii9tLH0TPR_h0HV84zRlZFfEnEAJ344iW4H6sfL7IC47U5veqjHNq4WUq6MqzNrcQ8otKdLxpwV9j4bBHQPkyEGa7anAANlMNVkXbnsoFAoDyBX7opOcB3BSImGRftoLeyoU4cmneRk6ZgTk', span: 'md:col-span-4 aspect-[1/1]' },
                            { title: 'Horizonte', subtitle: 'Produção de Imagem', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKnc6oH_hYvu13IeEb61FyxFkY3Edhlt2km8Jry0SlDIZ7KlpeE-AVwYRezdk2O_XEVH34_DobRA7QJY4YofFZUSMXG3BeTc5IdaApkxKb3Z1Zd14giFedWaYlTg7jx83cIP-fHnIAPoHKE93UEOWCj_iGqRTd0q2BO_l4h_oMK2TIBNGbh5QW43fUo-FhcFxpTF9A5vIi9kKaAk-ZapE8zkT6Uk3Fe-VRw3DSK5F3AiqnbXBwPhBzkQ-MTLhF1bCsplLY712XU5c', span: 'md:col-span-8 aspect-[16/7]' },
                        ].map((item, idx) => (
                            <div key={idx} className={`relative group bg-white overflow-hidden ${item.span}`}>
                                <img alt={item.title} className="w-full h-full object-cover grayscale transition-all duration-[1.2s] ease-in-out group-hover:scale-110 group-hover:grayscale-0" src={item.img} />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center p-12 text-center">
                                    <p className="font-headline text-3xl text-white italic font-light translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{item.title}</p>
                                    <p className="font-label uppercase tracking-[0.3em] text-[8px] text-white/70 mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white py-48 md:py-64 px-12 border-t-[0.5px] border-zinc-100 transition-all duration-1000">
                    <div className="max-w-[1400px] mx-auto text-center mb-32">
                        <div className="mb-32">
                            <span className="font-label uppercase tracking-[0.4em] text-[9px] text-black/60 block mb-6">MÉTODO AUTORAL</span>
                            <h2 className="font-headline text-5xl md:text-7xl lg:text-8xl text-black font-light leading-tight italic">Estratégia + Estética</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="flex flex-col items-center space-y-4">
                                <span className="material-symbols-outlined text-4xl font-extralight">brush</span>
                                <h3 className="font-headline text-2xl">Branding Estratégico</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    Construção de fundamentos de marca. DNA, tom de voz e narrativa que transformam negócios em autoridades de mercado.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <span className="material-symbols-outlined text-4xl font-extralight">visibility</span>
                                <h3 className="font-headline text-2xl">Direção Criativa</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    A curadoria estética que traduz a estratégia em impacto visual. Onde a arte e o negócio se encontram.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <span className="material-symbols-outlined text-4xl font-extralight">photo_camera</span>
                                <h3 className="font-headline text-2xl">Produção de Imagem</h3>
                                <p className="text-secondary leading-relaxed font-light text-sm max-w-xs">
                                    Execução técnica de alto padrão. Imagens que comunicam prestígio e desejo sem a necessidade de legendas.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative bg-zinc-50/30 px-12 overflow-hidden py-32 md:py-64">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-24 lg:gap-48">
                        <div className="w-full lg:w-1/3 flex-shrink-0">
                            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-2xl skew-y-1">
                                <img alt="Lucas Mazzutti Portrait" className="w-full h-full object-cover grayscale transition-all duration-[2s] hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0ESFf2VKUU01w1wDMvk9GSzceC_56tjvoVLme8E1KeN98y_Zc3Czxb47l9-giIZLy7mSRrqHj9zj4TNrDYF6-qHHrlZuYs5OK6L-MpUmwXBgRDC4HMoVG8uxvsjqwE64sm9SsADinIThjiDc6trCJ-GmADEkDjQ0xr990PJiKiBjDqIYnnO-J5hBFPuV90jlKCFIBhboqE9gA8O9y-e8JChB007vHeibnqmOp4yCmQIb11a7NCtW4pVkEGk5sdSQduOjAStefyk" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-24">
                            <div className="space-y-16">
                                <div className="max-w-2xl text-left border-l border-zinc-200 pl-12 py-4">
                                    <h2 className="font-headline text-3xl md:text-5xl lg:text-5xl text-black leading-tight italic font-light">
                                        “Marcas fortes não disputam atenção. <br/>
                                        <span className="not-italic font-normal">Elas ocupam espaço.</span>”
                                    </h2>
                                    <p className="font-label font-light uppercase tracking-[0.3em] text-[9px] text-zinc-400 mt-6">Filosofia House</p>
                                </div>
                                <div className="flex justify-end pr-12">
                                    <div className="max-w-xl text-right">
                                        <h3 className="font-headline text-2xl md:text-3xl lg:text-4xl leading-snug mb-4 font-light">
                                            A maioria constrói visibilidade. <br/>
                                            <span className="italic">Poucos constroem posição.</span>
                                        </h3>
                                        <p className="font-label font-light uppercase tracking-[0.3em] text-[9px] text-zinc-400">Diferenciação</p>
                                    </div>
                                </div>
                                <div className="max-w-xl text-left pl-24">
                                    <p className="font-headline text-xl md:text-2xl italic leading-snug text-zinc-800 mb-4 font-light">
                                        Não é sobre produzir conteúdo. É sobre o que sua marca comunica — com ou sem presença.
                                    </p>
                                    <p className="font-label font-light uppercase tracking-[0.3em] text-[9px] text-zinc-400">Comunicação Intencional</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white px-12 py-48 md:py-64 border-t-[0.5px] border-zinc-100">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-24">
                            <span className="font-label uppercase tracking-[0.4em] text-zinc-400 block mb-6 text-[9px]">QUEM ESTRUTURA</span>
                            <h2 className="font-headline text-4xl md:text-6xl text-black font-light italic">Fundamentos e Visão.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-4">
                            {[
                                { name: 'Lucas Mazzutti', role: 'Direção Criativa', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe0ESFf2VKUU01w1wDMvk9GSzceC_56tjvoVLme8E1KeN98y_Zc3Czxb47l9-giIZLy7mSRrqHj9zj4TNrDYF6-qHHrlZuYs5OK6L-MpUmwXBgRDC4HMoVG8uxvsjqwE64sm9SsADinIThjiDc6trCJ-GmADEkDjQ0xr990PJiKiBjDqIYnnO-J5hBFPuV90jlKCFIBhboqE9gA8O9y-e8JChB007vHeibnqmOp4yCmQIb11a7NCtW4pVkEGk5sdSQduOjAStefyk' },
                                { name: 'Elena Silva', role: 'Estratégia de Marca', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKZY7vY0_xHh4W3MKSd3jlEIhiiS5gF9XM3hbMqdr3jwFr16elkblrJVykxmXHcbVQeSdE7P4M_onqrLajroloIvYyXsYw_0dkx6h0ZB_8-X1qnqw4DSmV8kmBfkcAOXNZeI0dmCOHcnkHUelR4XxcDwB4AvZY1mvpxgCC2uMnR-KZ6SBTSb2TJ9SVM4WCCr2S10Gy74ML33Hkky5gHCBsKXvXWS5RGCOi9p4IhVIH2fWSwjIYsSOGaHsZpmM2Y5DpYCs4eCRR17g' },
                                { name: 'Arthur Porto', role: 'Produção', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa6TINUvFDwA7LqkkHXDdt1XoEvOHZPH3W5C2QvV6FRZfba0ajm5Uz7SjeIBB2cvjuqSy1_kYZlLfz-iW_L4qigAleWRqobN3LB08IXDDRI5N-GPiiRLh0Q3f-1by3ux6jIwMvx-36JFc9OdYIW0AifoBbPdrqq0aQY6QlBeQ_0tjxfuTSZLNTq9-cWum4QH8VCNJldD682F3o4XhHqfQ4p-LB97VETj8FHvw2375aLuDGGogL3XhITfCpJK56DcJ_QXEXNFpfMM8' }
                            ].map((person, idx) => (
                                <div key={idx} className="space-y-10 group cursor-pointer bg-zinc-50/50 p-8 hover:bg-white transition-all duration-700 hover:shadow-xl relative overflow-hidden">
                                    <div className="overflow-hidden aspect-[3/4] relative">
                                        <img className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt={person.name} src={person.img} />
                                    </div>
                                    <div className="space-y-3 text-left">
                                        <p className="font-headline text-3xl font-light italic">{person.name}</p>
                                        <p className="font-label uppercase tracking-[0.3em] text-[10px] font-light text-zinc-500">{person.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-black px-12 relative overflow-hidden flex items-center justify-center min-h-[700px] py-48 md:py-64">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
                        <span className="font-body font-black text-[18vw] uppercase tracking-[0.1em] text-white/5 leading-none translate-y-[40%]">DEPOIMENTOS</span>
                    </div>
                    <div className="absolute left-8 md:left-24 inset-y-0 flex items-center z-20">
                        <button className="nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-500" onClick={prevSlide}>
                            <div className="nav-line mr-4"></div>
                        </button>
                    </div>
                    <div className="absolute right-8 md:right-24 inset-y-0 flex items-center z-20">
                        <button className="nav-btn group flex items-center opacity-40 hover:opacity-100 transition-all duration-500" onClick={nextSlide}>
                            <div className="nav-line ml-4"></div>
                        </button>
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto text-center">
                        <div className="mb-16">
                            <span className="font-label uppercase tracking-[0.5em] text-zinc-600 block mb-4 text-[10px]">O QUE DIZEM</span>
                            <h2 className="font-headline text-4xl text-white italic tracking-wide font-light">Ecos da nossa entrega</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full overflow-hidden mb-12 min-h-[250px] flex items-center justify-center">
                                {[
                                    { text: "A House Mazzutti trouxe uma clareza que eu não conseguia encontrar sozinho. Eles não apenas criaram uma marca, eles criaram um novo patamar para o meu negócio.", author: "JULIANO R. — FOUNDER & CEO" },
                                    { text: "O posicionamento estratégico mudou completamente a percepção do mercado sobre nossos serviços. A estética é apenas a ponta do iceberg.", author: "MARINA S. — DIRETORA DE ARTE" },
                                    { text: "Trabalhar com o Lucas e sua equipe foi o melhor investimento do ano. Eles entendem de negócio tanto quanto entendem de design.", author: "RICARDO M. — INVESTIDOR" }
                                ].map((slide, idx) => (
                                    <div key={idx} className={`testimonial-slide transition-all duration-1000 ${currentSlide === idx ? 'active opacity-100' : 'hidden opacity-0'}`}>
                                        <h3 className="font-headline text-3xl md:text-5xl text-white leading-snug italic max-w-4xl mx-auto font-light">
                                            “{slide.text}”
                                        </h3>
                                        <div className="pt-12">
                                            <p className="font-label uppercase tracking-[0.4em] text-[10px] text-white/40 font-light">{slide.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-6 pt-12">
                                {[0, 1, 2].map((idx) => (
                                    <button 
                                        key={idx} 
                                        className={`transition-all duration-700 h-px w-12 ${currentSlide === idx ? 'bg-white w-20' : 'bg-white/20'}`} 
                                        onClick={() => goToSlide(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white px-12 py-48 md:py-64">
                    <div className="max-w-[1400px] mx-auto flex flex-col space-y-[48px]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-start">
                            <div className="grid grid-cols-2 gap-[12px] order-2">
                                <div className="col-span-2 aspect-[4/3] overflow-hidden bg-zinc-50 border border-zinc-100">
                                    <img alt="B&W large photography" className="w-full h-full object-cover grayscale transition-all duration-[1.5s] hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkiQLtRcTbgce0k0oFWm4mlyb7RRXITzmnT-XtfQ2olO6jM2s71xr5xw5V6Rnii-hngJvHHL34YpjPIRdRfovLcbKY4QBgolXMJczrB8f2Tm9x4X2zH9ScZqlnIyN5GerHmP_0Q-ZgBSqqlVvThL6zDNMpgCG6XnS-vN5fogJc7kw-W5MNIeyILgIK9WwgyNQSsPFS13O3DxvzFfViYPBfjKlLrMB8ClfVr3JjzfzVIpYs8kmvTZO6VDCdARfX9jRaozLBbYICmQ0" />
                                </div>
                                <div className="overflow-hidden bg-zinc-100 aspect-[2/3] border border-zinc-100">
                                    <img alt="Man writing B&W" className="w-full h-full object-cover grayscale transition-all duration-[1.5s] hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFIHY560gS2ik_2GrZpF30j-g-u298R2IvVTv99wXYupz5jW7ePfhi3hHeOSQJ2w4D9995OdagrtsKYEq0WGyCiUbF4XqHAZy8VekCTL3M9cJodpb-uNjUXVWrV7ILlVTT2zmqMUAfKFTDlPXy7VUL9uEwNMf_12u39Nub3mRFN41ZWd3eCg9gWp2qZXBlD5S3HKhbGnZX9ITFbVDfNSTbkEuWv7VCiQZHtzcmfE_8zY8HzN17A0gHtn7s99IzT0-_ft0gKKjVhO8" />
                                </div>
                            </div>
                            <div className="flex flex-col items-start text-left order-1 space-y-32">
                                <div className="space-y-8">
                                    <span className="font-label uppercase tracking-[0.4em] text-zinc-400 mb-2 block text-[10px]">POSICIONAMENTO</span>
                                    <h2 className="font-headline text-black leading-tight mb-8 text-4xl md:text-5xl lg:text-6xl font-light italic">Quando existe clareza — a comunicação simplifica.</h2>
                                    <p className="text-secondary leading-relaxed max-w-md font-light mb-12 text-[14px]">
                                        A simplicidade é o último estágio da sofisticação. Trabalhamos para remover o ruído e deixar apenas a essência do que torna sua marca única.
                                    </p>
                                    <a className="inline-block px-12 py-6 border border-black/10 text-black font-label uppercase tracking-[0.3em] text-[10px] hover:bg-black hover:text-white transition-all duration-500" href="#">
                                        LER MAIS
                                    </a>
                                </div>
                                <div className="space-y-8">
                                    <span className="font-label uppercase tracking-[0.4em] text-zinc-400 mb-2 block text-[10px]">AUTORIDADE</span>
                                    <h2 className="font-headline text-black leading-tight mb-8 text-4xl md:text-5xl lg:text-6xl font-light italic">Não é sobre parecer melhor.</h2>
                                    <p className="text-secondary leading-relaxed max-w-md font-light mb-12 text-[14px]">
                                        É sobre não precisar provar. Se ainda existe dúvida, falta estratégia. Se existe direção, o crescimento se torna consequência.
                                    </p>
                                    <a className="inline-block px-12 py-6 border border-black/10 text-black font-label uppercase tracking-[0.3em] text-[10px] hover:bg-black hover:text-white transition-all duration-500" href="#">
                                        LER MAIS
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-black py-48 md:py-64 lg:py-80 px-12 text-center relative overflow-hidden" id="contato">
                    <div className="noise-overlay absolute inset-0"></div>
                    <div className="relative z-10 max-w-6xl mx-auto space-y-24">
                        <div className="space-y-8 fade-in">
                            <span className="font-label uppercase tracking-[0.5em] text-white/30 text-[10px] block">CONTATO</span>
                            <h2 className="font-headline text-5xl md:text-7xl lg:text-9xl text-white leading-[1.1] italic font-light">
                                Se sua marca precisa de <br/>posicionamento — <span className="not-italic font-normal">seguimos.</span>
                            </h2>
                        </div>
                        <div className="flex flex-col items-center space-y-12">
                            <a className="group relative px-20 py-8 border-[0.5px] border-white/20 text-white font-label uppercase tracking-[0.4em] text-[12px] hover:bg-white hover:text-black transition-all duration-700 overflow-hidden" href="#">
                                <span className="relative z-10">INICIAR CONVERSA ESTRATÉGICA</span>
                            </a>
                            <p className="font-label uppercase tracking-[0.3em] text-[10px] text-zinc-600">Menos tentativa. Mais direção.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-black text-white py-32 px-12 border-t border-zinc-900">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
                    <div className="space-y-8">
                        <div className="text-3xl font-headline italic tracking-tight text-white">House Mazzutti</div>
                        <p className="font-label text-[10px] text-zinc-600 max-w-xs leading-relaxed uppercase tracking-widest">A arquitetura da sua autoridade digital.</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-24">
                        <div className="space-y-6">
                            <span className="font-label text-[10px] text-zinc-700 uppercase tracking-widest block mb-8">SOCIAL</span>
                            <div className="flex flex-col space-y-4">
                                <a className="font-label text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest" href="#">INSTAGRAM</a>
                                <a className="font-label text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest" href="#">LINKEDIN</a>
                                <a className="font-label text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest" href="#">BEHANCE</a>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <span className="font-label text-[10px] text-zinc-700 uppercase tracking-widest block mb-8">NAVEGAÇÃO</span>
                            <nav className="flex flex-col space-y-4">
                                <a className="font-label text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest" href="#">HOME</a>
                                <a className="font-label text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest" href="#">MÉTODO</a>
                                <a className="font-label text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest" href="#">PORTFÓLIO</a>
                                <a className="font-label text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest" href="#">CONTATO</a>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1400px] mx-auto mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="font-label text-[9px] text-zinc-800 tracking-widest">
                        © 2025 HOUSE MAZZUTTI. TODOS OS DIREITOS RESERVADOS.
                    </div>
                </div>
            </footer>
        </div>
    );
}