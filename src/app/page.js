"use client";

import React, { useState } from 'react';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const testimonials = [
        {
            text: "A House Mazzutti trouxe uma clareza que eu não conseguia encontrar sozinho. Eles não apenas criaram uma marca, eles criaram um novo patamar.",
            author: "JULIANO R. — FOUNDER & CEO"
        },
        {
            text: "O posicionamento estratégico mudou completamente a percepção do mercado. A estética é apenas a ponta do iceberg.",
            author: "MARINA S. — DIRETORA DE ARTE"
        },
        {
            text: "Trabalhar com a equipe foi o melhor investmento do ano. Eles entendem de negócio tanto quanto de design.",
            author: "RICARDO M. — INVESTIDOR"
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="bg-background text-on-background font-body antialiased selection:bg-primary selection:text-on-primary">
            {/* NOISE OVERLAY */}
            <div className="noise-overlay fixed inset-0 z-50"></div>

            <header className="fixed top-0 w-full flex justify-between items-center px-12 py-10 z-[60] bg-transparent">
                <div className="text-lg font-headline tracking-tight text-white uppercase italic">House Mazzutti</div>
                <nav className="hidden md:flex items-center space-x-12 ml-auto mr-12 text-white">
                    <a className="font-raleway uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity" href="#">HOME</a>
                    <a className="font-raleway uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity" href="#">SOBRE</a>
                    <a className="font-raleway uppercase tracking-[0.15em] text-[10px] font-light hover:opacity-70 transition-opacity" href="#">PORTFÓLIO</a>
                </nav>
                <div className="flex items-center space-x-6 text-white text-[10px]">
                    <span className="material-symbols-outlined">search</span>
                    <button className="flex flex-col space-y-1.5 w-6">
                        <span className="block w-full h-[1px] bg-white"></span>
                        <span className="block w-full h-[1px] bg-white"></span>
                    </button>
                </div>
            </header>

            <main>
                <section className="relative w-full h-screen overflow-hidden bg-primary flex items-center px-12 md:px-48">
                    <div className="relative z-10 max-w-4xl fade-in">
                        <span className="font-label uppercase tracking-[0.3em] text-[10px] text-white/60 mb-8 block">STRATEGIC HOUSE</span>
                        <h1 className="font-headline text-5xl md:text-8xl text-white leading-[1.1] mb-12 italic font-light">
                            A arquitetura do<br />seu posicionamento.
                        </h1>
                        <button className="px-10 py-3 border-[0.5px] border-white/30 text-white font-label text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">
                            CONHEÇA O MÉTODO
                        </button>
                    </div>
                </section>

                {/* Grid de Portfólio Simples */}
                <section className="bg-white py-32 px-12">
                    <div className="mb-20 text-center">
                        <h2 className="font-headline text-4xl text-black italic">Trabalhos Selecionados</h2>
                        <div className="line-divider mx-auto mt-6"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1400px] mx-auto">
                        <div className="aspect-[4/5] bg-zinc-100 overflow-hidden">
                            <img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe4mdbRqXBNKzzngv3g_VBLp6GYZlgzzZZODsLL8bHFzPo4h2MQ_wh08IE0TeoTAnYp7r8cqXbKU7Xa5wklKFRY-ZWrYIpRSmFUuQapR_3VovlHbwzL2DnDZwXwFKOowF6p1RYMEOqh1_GwWe1FY9MUqL_MHVQ04dnmk4YyX2I1Nbz3zL-t4bcyXEQ_COqtJmLZiwYf076YUYpoITRuaCFPCaMTBWkm6LYq7RU4l8f9gyRN9hk8omSajhnHc8pNlB8BAi1ZerKdL0" alt="Work" />
                        </div>
                        <div className="aspect-[4/5] bg-zinc-100 overflow-hidden">
                            <img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmEdY5S8J-r2-yA6KBnPbY8KJ_kzSWmaDtw4KI3V4XfuFw9crzbRkv8ODbEuL4WNOjSHEaBI3bT-J6Fg0SnQ7-F55Z7jP7UT2ZzHsyDIVGu2G67mWa2Qxorjl-Upf9isBLdGue5dKoH7891HWpO6iT5EbeCFrJCwFVIQo8-XVRq_ZaV_sJsyb9zfKO_Dm-QjDzX38uBl3zJodj4KP7GattGIKHVJ8Hkn24EzNVoNBWMnUB3avAJoDg_S2DzRoUhd5-bugSQgDzSB0" alt="Work" />
                        </div>
                        <div className="aspect-[4/5] bg-zinc-100 overflow-hidden">
                            <img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADvGTrzOI5PEUbaeC7AW7usgMalF3qizDJJ0KUpcNG6m9gEpidT-mTLmb1F3zpPaKsm5aOEastKBq1gcgasPBFL2aQQT1TCsitpTNJuy9KBP4cgyFtyvk2nUo1WqXii9tLH0TPR_h0HV84zRlZFfEnEAJ344iW4H6sfL7IC47U5veqjHNq4WUq6MqzNrcQ8otKdLxpwV9j4bBHQPkyEGa7anAANlMNVkXbnsoFAoDyBX7opOcB3BSImGRftoLeyoU4cmneRk6ZgTk" alt="Work" />
                        </div>
                    </div>
                </section>

                {/* Slider de Depoimentos */}
                <section className="bg-black py-48 px-12 text-center text-white relative">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <span className="font-raleway uppercase tracking-[0.4em] text-[10px] text-zinc-500 block mb-4">O QUE DIZEM</span>
                        {testimonials.map((t, i) => (
                            <div key={i} className={`testimonial-slide ${currentSlide === i ? 'active' : ''}`}>
                                <h3 className="font-headline text-3xl md:text-4xl italic leading-tight mb-8">"{t.text}"</h3>
                                <p className="font-raleway text-[10px] tracking-widest text-white/60">{t.author}</p>
                            </div>
                        ))}
                        <div className="flex justify-center space-x-12 mt-16">
                            <button onClick={prevSlide} className="text-white/40 hover:text-white transition-colors">ANTERIOR</button>
                            <button onClick={nextSlide} className="text-white/40 hover:text-white transition-colors">PRÓXIMO</button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-black py-24 text-center border-t border-zinc-900">
                <div className="font-headline italic text-white text-2xl mb-8">House Mazzutti</div>
                <p className="text-[9px] tracking-widest text-zinc-600 font-label">© 2025 TODOS OS DIREITOS RESERVADOS.</p>
            </footer>
        </div>
    );
}
