'use client';

import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
    return (
        <div className="bg-white">
            <style dangerouslySetInnerHTML={{ __html: `
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #ffffff;
                    color: #000000;
                }
                
                h1, .hero-title, .quote-text {
                    font-family: 'Newsreader', serif;
                    font-style: italic;
                }

                .article-title {
                    font-family: 'Newsreader', serif;
                    font-size: 1.6rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    font-style: normal;
                }

                .category-label {
                    font-family: 'Raleway', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-size: 0.7rem;
                }

                .label-text {
                    font-family: 'Raleway', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 0.75rem;
                }

                .no-border-radius {
                    border-radius: 0 !important;
                }

                .image-placeholder {
                    background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
                    width: 100%;
                    aspect-ratio: 4 / 3;
                    height: auto;
                }

                .btn-outline {
                    border: 1px solid currentColor;
                    padding: 10px 28px;
                    font-family: 'Raleway', sans-serif;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    transition: all 0.3s ease;
                    display: inline-block;
                }

                .btn-outline:hover {
                    background-color: #000000;
                    color: #ffffff;
                    border-color: #000000;
                }

                .quote-block {
                    background-color: #f8f8f8;
                    padding: 80px 40px;
                    text-align: center;
                }

                .gallery-dot {
                    width: 8px;
                    height: 8px;
                    background: #ccc;
                    border-radius: 50%;
                    margin: 0 4px;
                }

                .gallery-dot.active {
                    background: #000;
                }

                .article-card {
                    border-bottom: 0.5px solid #e5e5e5;
                    padding-bottom: 80px;
                    margin-bottom: 80px;
                }
                
                .article-card:last-of-type {
                    border-bottom: none;
                    margin-bottom: 0;
                }

                .excerpt-text {
                    font-size: 0.9rem;
                    line-height: 1.8;
                    color: #5f5e5e;
                }

                main {
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 80px 40px;
                }
            `}} />

            <h1 hidden>Blog de Branding Estratégico e Posicionamento de Marca</h1>
            
            {/* Header */}
            <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, background: '#ffffff', borderBottom: '0.5px solid #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px' }}>
                    <Link href="/" style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '20px', letterSpacing: '-0.02em', color: '#000', textDecoration: 'none' }}>HOUSE MAZZUTTI</Link>
                    <nav style={{ display: 'flex', gap: '24px' }}>
                        <Link href="/" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>HOME</Link>
                        <Link href="/about" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>SOBRE</Link>
                        <Link href="/studio" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>STUDIO</Link>
                        <Link href="/produtora" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>PRODUTORA</Link>
                        <Link href="/agencia" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>AGÊNCIA</Link>
                        <Link href="/angelo" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>ANGELO</Link>
                        <Link href="/comunidade" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>COMUNIDADE</Link>
                        <Link href="/portfolio" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>PORTFÓLIO</Link>
                        <Link href="/blog" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>BLOG</Link>
                        <Link href="/contato" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#000', textDecoration: 'none' }}>CONTATO</Link>
                    </nav>
                </div>
                <div style={{ borderBottom: '0.5px solid #f0f0f0', width: '100%' }}></div>
            </header>

            {/* Hero Section */}
            <section className="bg-white text-black px-8 flex items-center justify-center text-center border-t border-b border-[#e0e0e0]" style={{ borderTopWidth: '0.5px', borderBottomWidth: '0.5px', padding: '100px 0 40px 0' }}>
                <div className="max-w-4xl mx-auto">
                    <span className="label-text mb-4 block">House Mazzutti — Blog</span>
                    <h2 className="hero-title text-4xl md:text-[2.5rem] mb-4 leading-tight">"Nem tudo precisa ser dito. Mas o que é dito precisa ter direção."</h2>
                    <p className="label-text text-sm max-w-lg mx-auto leading-relaxed">Conteúdos sobre branding estratégico, posicionamento de marca e construção de autoridade.</p>
                </div>
            </section>

            {/* Blog Content */}
            <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '92px 40px 80px 40px' }}>
                {/* CARD 1: Padrão */}
                <article className="group article-card">
                    <div className="image-placeholder mb-10 overflow-hidden"></div>
                    <div className="text-center max-w-5xl mx-auto">
                        <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Book</span>
                        <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                            <Link href="/blog/book-para-modelos-quem-e-escolhido">Book para Modelos: o que realmente define quem é escolhido no mercado</Link>
                        </h2>
                        <p className="excerpt-text mb-8 font-light">
                            "Existe uma diferença silenciosa entre modelos que são chamados e modelos que são escolhidos. Ela não está apenas na aparência — está na inteligência da imagem."
                        </p>
                        <div className="mb-10">
                            <Link className="btn-outline" href="/blog/book-para-modelos-quem-e-escolhido">Ler Artigo</Link>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                            <span className="label-text text-gray-400">Abril 2026</span>
                            <div className="flex space-x-4">
                                <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* CARD 2: Padrão */}
                <article className="group article-card">
                    <div className="image-placeholder mb-10 overflow-hidden"></div>
                    <div className="text-center max-w-5xl mx-auto">
                        <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Book</span>
                        <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                            <Link href="/blog/book-modelo-imagem-trabalha-por-voce">Book de Modelo: quando sua imagem começa a trabalhar por você</Link>
                        </h2>
                        <p className="excerpt-text mb-8 font-light">
                            "Um book bem construído não é portfólio. É posicionamento. É a diferença entre esperar uma oportunidade e criar uma."
                        </p>
                        <div className="mb-10">
                            <Link className="btn-outline" href="/blog/book-modelo-imagem-trabalha-por-voce">Ler Artigo</Link>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                            <span className="label-text text-gray-400">Abril 2026</span>
                            <div className="flex space-x-4">
                                <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* CARD 3: Quote Block */}
                <div className="quote-block article-card">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="quote-text text-[2.5rem] md:text-[3rem] mb-6 italic leading-[1.1]">"Conteúdo sem direção é ruído. E ruído não posiciona."</h2>
                        <span className="label-text text-[#5E5E5E]">House Mazzutti</span>
                    </div>
                </div>

                {/* CARD 4: Padrão */}
                <article className="group article-card">
                    <div className="image-placeholder mb-10 overflow-hidden"></div>
                    <div className="text-center max-w-5xl mx-auto">
                        <span className="category-label text-[#5E5E5E] mb-4 block">Agência — Branding</span>
                        <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                            <Link href="/blog/marcas-fortes-ocupam-espaco">Marcas fortes não disputam atenção. Elas ocupam espaço.</Link>
                        </h2>
                        <p className="excerpt-text mb-8 font-light">
                            "A maioria constrói visibilidade. Poucos constroem posição. Existe um ponto onde a execução deixa de resolver — e a falta de direção começa a aparecer."
                        </p>
                        <div className="mb-10">
                            <Link className="btn-outline" href="/blog/marcas-fortes-ocupam-espaco">Ler Artigo</Link>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                            <span className="label-text text-gray-400">Março 2026</span>
                            <div className="flex space-x-4">
                                <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* CARD 5: Padrão */}
                <article className="group article-card">
                    <div className="image-placeholder mb-10 overflow-hidden"></div>
                    <div className="text-center max-w-5xl mx-auto">
                        <span className="category-label text-[#5E5E5E] mb-4 block">Institucional — Sobre</span>
                        <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                            <Link href="/blog/clareza-comunicacao-simplifica">Quando existe clareza — a comunicação simplifica</Link>
                        </h2>
                        <p className="excerpt-text mb-8 font-light">
                            "A simplicidade é o último estágio da sofisticação. Não é sobre produzir conteúdo. É sobre o que sua marca comunica — com ou sem presença."
                        </p>
                        <div className="mb-10">
                            <Link className="btn-outline" href="/blog/clareza-comunicacao-simplifica">Ler Artigo</Link>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                            <span className="label-text text-gray-400">Março 2026</span>
                            <div className="flex space-x-4">
                                <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* CARD 6: Link Block */}
                <div className="border-y border-gray-100 py-16 text-center article-card">
                    <h2 className="article-title hover:text-gray-500 transition-colors leading-snug">
                        <Link href="/blog/posicionamento-e-estrutura">Posicionamento não é estética. É estrutura.</Link>
                    </h2>
                </div>

                {/* CARD 7: Gallery Slider */}
                <article className="group article-card">
                    <div className="relative mb-10">
                        <div className="image-placeholder"></div>
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex">
                            <div className="gallery-dot active"></div>
                            <div className="gallery-dot"></div>
                            <div className="gallery-dot"></div>
                        </div>
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white opacity-50 hover:opacity-100">chevron_left</button>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white opacity-50 hover:opacity-100">chevron_right</button>
                    </div>
                    <div className="text-center max-w-5xl mx-auto">
                        <span className="category-label text-[#5E5E5E] mb-4 block">Produtora — Editorial de Moda</span>
                        <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                            <Link href="/blog/producao-editorial-imagem-comunica">Produção editorial: quando a imagem comunica antes da legenda</Link>
                        </h2>
                        <p className="excerpt-text mb-8 font-light">
                            "Execução técnica de alto padrão não é luxo — é necessidade. Imagens que comunicam prestígio e desejo sem precisar de explicação."
                        </p>
                        <div className="mb-10">
                            <Link className="btn-outline" href="/blog/producao-editorial-imagem-comunica">Ler Artigo</Link>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                            <span className="label-text text-gray-400">Fevereiro 2026</span>
                            <div className="flex space-x-4">
                                <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Paginação */}
                <div className="flex justify-center space-x-8 pt-12">
                    <Link className="label-text font-bold border-b-2 border-black pb-1 text-[1rem]" href="#">1</Link>
                    <Link className="label-text text-gray-400 hover:text-black transition-colors text-[1rem]" href="#">2</Link>
                    <Link className="label-text text-gray-400 hover:text-black transition-colors text-[1rem]" href="#">3</Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] text-white py-24 px-8 text-center">
                <div className="max-w-screen-lg mx-auto">
                    <div className="mb-12">
                        <span className="font-newsreader text-3xl uppercase tracking-widest font-medium">House Mazzutti</span>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-8 mb-12">
                        <Link className="label-text hover:text-gray-400" href="#">Instagram</Link>
                        <Link className="label-text hover:text-gray-400" href="#">Linkedin</Link>
                    </nav>
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16">
                        <Link className="label-text text-xs text-gray-400" href="/">Home</Link>
                        <Link className="label-text text-xs text-gray-400" href="/about">Sobre</Link>
                        <Link className="label-text text-xs text-gray-400" href="/studio">Studio</Link>
                        <Link className="label-text text-xs text-gray-400" href="/portfolio">Portfólio</Link>
                        <Link className="label-text text-xs text-gray-400" href="/blog">Blog</Link>
                        <Link className="label-text text-xs text-gray-400" href="/contato">Contato</Link>
                    </nav>
                    <div className="text-gray-600">
                        <p className="label-text text-[10px]">© 2025 House Mazzutti. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
