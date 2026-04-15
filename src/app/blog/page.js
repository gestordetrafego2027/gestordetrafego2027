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
                
                {/* SEÇÃO 1: STUDIO */}
                <section className="mb-24">
                    <h2 className="label-text mb-4 text-[#000]" style={{ fontFamily: "'Raleway', sans-serif", textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '1rem' }}>STUDIO</h2>
                    <div style={{ borderBottom: '0.5px solid #e0e0e0', width: '100%', marginBottom: '80px' }}></div>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Book</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/book-para-modelos-quem-e-escolhido">Book para Modelos: o que realmente define quem é escolhido no mercado</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe um momento silencioso na trajetória de quem deseja trabalhar com imagem: aquele em que você percebe que talvez não esteja sendo visto da forma certa."
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

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Book</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/book-modelo-imagem-trabalha-por-voce">Book de Modelo: quando sua imagem começa a trabalhar por você</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe uma mudança sutil — mas poderosa — quando alguém passa a se ver como parte do mercado. A forma de olhar para si muda."
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

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Ensaio</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/ensaio-pessoal-imagem-autoridade">Ensaio Pessoal: o que realmente constrói uma imagem de autoridade</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe um ponto na trajetória profissional em que o crescimento deixa de depender apenas de competência. E passa a depender de percepção."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/ensaio-pessoal-imagem-autoridade">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Março 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Ensaio</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/ensaio-pessoal-imagem-lidera-percepcao">Ensaio Pessoal: quando sua imagem deixa de acompanhar sua trajetória</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe uma transição silenciosa na vida profissional. Ela não acontece quando você conquista algo novo. Mas quando percebe que já não pode mais se apresentar da mesma forma."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/ensaio-pessoal-imagem-lidera-percepcao">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Março 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Cobertura</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/cobertura-externa-presenca-alto-valor">Cobertura Externa em Tempo Real: o que realmente define uma presença de alto valor em São Paulo</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "São Paulo é uma cidade que exige presença. Mas, na prática, poucas pessoas realmente constroem essa presença de forma intencional."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/cobertura-externa-presenca-alto-valor">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Fevereiro 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Studio — Cobertura</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/cobertura-externa-narrativa-visual">Cobertura Externa em Tempo Real: quando sua experiência em São Paulo se transforma em narrativa visual</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Algumas experiências merecem mais do que serem vividas. Merecem ser construídas."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/cobertura-externa-narrativa-visual">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Fevereiro 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="text-center mt-12 mb-8">
                        <Link href="/blog?category=studio" className="label-text hover:text-gray-500 transition-colors" style={{ display: 'inline-block', paddingBottom: '4px' }}>VER TODOS &rarr;</Link>
                    </div>
                </section>

                {/* QUOTE BLOCK */}
                <div className="quote-block article-card mb-24">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="quote-text text-[2.5rem] md:text-[3rem] mb-6 italic leading-[1.1]">"Conteúdo sem direção é ruído. E ruído não posiciona."</h2>
                        <span className="label-text text-[#5E5E5E]">House Mazzutti</span>
                    </div>
                </div>

                {/* SEÇÃO 2: AGÊNCIA */}
                <section className="mb-24">
                    <h2 className="label-text mb-4 text-[#000]" style={{ fontFamily: "'Raleway', sans-serif", textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '1rem' }}>AGÊNCIA</h2>
                    <div style={{ borderBottom: '0.5px solid #e0e0e0', width: '100%', marginBottom: '80px' }}></div>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Agência — Branding</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/branding-project-arquitetura-valor">Branding Project como Arquitetura de Valor</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Duas empresas podem entregar exatamente a mesma solução. Mas apenas uma será lembrada. Apenas uma será desejada."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/branding-project-arquitetura-valor">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Março 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Agência — Branding</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/branding-project-motor-vendas">Branding Project como Motor de Vendas</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "A maioria das empresas comete o mesmo erro. Investe primeiro em tráfego. Depois em conteúdo. E só então percebe que algo não funciona."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/branding-project-motor-vendas">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Março 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Agência — Branding</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/quanto-investir-em-branding">Quanto investir em branding: o guia estratégico</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "A pergunta mais comum sobre branding é direta: quanto custa? Mas a pergunta mais inteligente é outra."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/quanto-investir-em-branding">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Fevereiro 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Agência — Campanhas</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/campanha-lancamento-arquitetura-invisivel">Campaign de Lançamento: a arquitetura invisível</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe uma diferença silenciosa entre marcas que lançam e marcas que crescem. As primeiras comunicam. As segundas constroem presença."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/campanha-lancamento-arquitetura-invisivel">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Fevereiro 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Agência — Campanhas</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/por-que-campanhas-falham">Por que a maioria das campanhas falha</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Vivemos a era do excesso. Mais vídeos. Mais fotos. Mais posts. E, paradoxalmente, menos impacto."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/por-que-campanhas-falham">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Janeiro 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="text-center mt-12 mb-8">
                        <Link href="/blog?category=agencia" className="label-text hover:text-gray-500 transition-colors" style={{ display: 'inline-block', paddingBottom: '4px' }}>VER TODOS &rarr;</Link>
                    </div>
                </section>

                {/* SEÇÃO 3: PRODUTORA */}
                <section>
                    <h2 className="label-text mb-4 text-[#000]" style={{ fontFamily: "'Raleway', sans-serif", textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '1rem' }}>PRODUTORA</h2>
                    <div style={{ borderBottom: '0.5px solid #e0e0e0', width: '100%', marginBottom: '80px' }}></div>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Produtora — Editorial de Moda</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/editorial-moda-narrativa-visual">Editorial de Moda como Narrativa Visual</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe um momento sutil em que a moda deixa de ser apenas matéria. E passa a ser percepção."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/editorial-moda-narrativa-visual">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Janeiro 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Produtora — Editorial de Moda</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/editorial-moda-performance-vendas">Editorial de Moda orientado à performance</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe um momento silencioso entre ver e desejar. E outro, ainda mais decisivo, entre desejar e comprar."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/editorial-moda-performance-vendas">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Janeiro 2026</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Produtora — Prod. Executiva</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/por-que-boas-ideias-nao-garantem-resultados">Por que boas ideias não garantem bons resultados?</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Uma ideia forte é apenas o ponto de partida. Sem execução estruturada, ela perde intensidade, se dilui e perde identidade."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/por-que-boas-ideias-nao-garantem-resultados">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Dezembro 2025</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Produtora — Prod. Executiva</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/producao-executiva-sistema-campanhas">Produção Executiva: o sistema invisível que transforma ideias em campanhas</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Por trás de toda grande campanha existe uma estrutura que o público nunca vê — mas que define tudo."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/producao-executiva-sistema-campanhas">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Dezembro 2025</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="group article-card">
                        <div className="image-placeholder mb-10 overflow-hidden"></div>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">Produtora — Prod. Executiva</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href="/blog/por-que-campanhas-caras-falham">Por que campanhas caras falham</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">
                                "Existe uma expectativa implícita no mercado: quanto maior o investimento, maior o resultado. Mas na prática não é assim."
                            </p>
                            <div className="mb-10">
                                <Link className="btn-outline" href="/blog/por-que-campanhas-caras-falham">Ler Artigo</Link>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <span className="label-text text-gray-400">Dezembro 2025</span>
                                <div className="flex space-x-4">
                                    <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="text-center mt-12 mb-8">
                        <Link href="/blog?category=produtora" className="label-text hover:text-gray-500 transition-colors" style={{ display: 'inline-block', paddingBottom: '4px' }}>VER TODOS &rarr;</Link>
                    </div>
                </section>
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
