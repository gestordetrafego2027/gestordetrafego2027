'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('todos');

    const articles = [
        {
            categoria: "studio",
            subcategoria: "Studio — Book",
            titulo: "Book para Modelos: o que realmente define quem é escolhido no mercado",
            excerpt: "Existe um momento silencioso na trajetória de quem deseja trabalhar com imagem: aquele em que você percebe que talvez não esteja sendo visto da forma certa.",
            link: "/blog/book-para-modelos-quem-e-escolhido",
            data: "Abril 2026"
        },
        {
            categoria: "studio",
            subcategoria: "Studio — Book",
            titulo: "Book de Modelo: quando sua imagem começa a trabalhar por você",
            excerpt: "Existe uma mudança sutil — mas poderosa — quando alguém passa a se ver como parte do mercado. A forma de olhar para si muda. A forma de se apresentar também.",
            link: "/blog/book-modelo-imagem-trabalha-por-voce",
            data: "Abril 2026"
        },
        {
            categoria: "studio",
            subcategoria: "Studio — Ensaio",
            titulo: "Ensaio Pessoal: o que realmente constrói uma imagem de autoridade",
            excerpt: "Existe um ponto na trajetória profissional em que o crescimento deixa de depender apenas de competência. E passa a depender de percepção.",
            link: "/blog/ensaio-pessoal-imagem-autoridade",
            data: "Março 2026"
        },
        {
            categoria: "studio",
            subcategoria: "Studio — Ensaio",
            titulo: "Ensaio Pessoal: quando sua imagem deixa de acompanhar sua trajetória — e passa a liderar sua percepção",
            excerpt: "Existe uma transição silenciosa na vida profissional. Ela não acontece quando você conquista algo novo. Mas quando percebe que já não pode mais se apresentar da mesma forma.",
            link: "/blog/ensaio-pessoal-imagem-lidera-percepcao",
            data: "Março 2026"
        },
        {
            categoria: "studio",
            subcategoria: "Studio — Cobertura",
            titulo: "Cobertura Externa em Tempo Real: o que realmente define uma presença de alto valor em São Paulo",
            excerpt: "São Paulo é uma cidade que exige presença. Mas, na prática, poucas pessoas realmente constroem essa presença de forma intencional.",
            link: "/blog/cobertura-externa-presenca-alto-valor",
            data: "Fevereiro 2026"
        },
        {
            categoria: "studio",
            subcategoria: "Studio — Cobertura",
            titulo: "Cobertura Externa em Tempo Real: quando sua experiência em São Paulo se transforma em narrativa visual",
            excerpt: "Algumas experiências merecem mais do que serem vividas. Merecem ser construídas. São Paulo oferece esse cenário.",
            link: "/blog/cobertura-externa-narrativa-visual",
            data: "Fevereiro 2026"
        },
        {
            categoria: "agencia",
            subcategoria: "Agência — Branding",
            titulo: "Branding Project como Arquitetura de Valor",
            excerpt: "Existe um ponto silencioso — mas decisivo — dentro de qualquer negócio. Não é o produto. Não é o serviço. Não é nem mesmo o preço. É a forma como tudo isso é percebido.",
            link: "/blog/branding-project-arquitetura-valor",
            data: "Abril 2026"
        },
        {
            categoria: "agencia",
            subcategoria: "Agência — Branding",
            titulo: "Branding Project como Motor de Vendas",
            excerpt: "A maioria das empresas comete o mesmo erro — e ele custa caro. Investe primeiro em tráfego. Depois em conteúdo. E só então percebe que algo não funciona.",
            link: "/blog/branding-project-motor-vendas",
            data: "Março 2026"
        },
        {
            categoria: "agencia",
            subcategoria: "Agência — Branding",
            titulo: "Quanto investir em branding: o guia estratégico",
            excerpt: "A pergunta mais comum sobre branding é direta: quanto custa? Mas a pergunta mais inteligente é outra: quanto vale construir uma marca que sustenta o crescimento do meu negócio?",
            link: "/blog/quanto-investir-em-branding",
            data: "Março 2026"
        },
        {
            categoria: "agencia",
            subcategoria: "Agência — Campanhas",
            titulo: "Campaign de Lançamento: a arquitetura invisível por trás das marcas que dominam atenção",
            excerpt: "Existe uma diferença silenciosa entre marcas que lançam e marcas que crescem. As primeiras comunicam. As segundas constroem presença.",
            link: "/blog/campanha-lancamento-arquitetura-invisivel",
            data: "Fevereiro 2026"
        },
        {
            categoria: "agencia",
            subcategoria: "Agência — Campanhas",
            titulo: "Por que a maioria das campanhas falha",
            excerpt: "Vivemos a era do excesso. Mais vídeos. Mais fotos. Mais posts. Mais campanhas. E, paradoxalmente, menos impacto.",
            link: "/blog/por-que-campanhas-falham",
            data: "Janeiro 2026"
        },
        {
            categoria: "produtora",
            subcategoria: "Produtora — Editorial",
            titulo: "Editorial de Moda como Narrativa Visual",
            excerpt: "Existe um momento sutil em que a moda deixa de ser apenas matéria. E passa a ser percepção. É quando o tecido já não comunica apenas textura, mas intenção.",
            link: "/blog/editorial-moda-narrativa-visual",
            data: "Abril 2026"
        },
        {
            categoria: "produtora",
            subcategoria: "Produtora — Editorial",
            titulo: "Editorial de Moda orientado à performance: quando imagem passa a vender",
            excerpt: "Existe um momento silencioso entre ver e desejar. E outro, ainda mais decisivo, entre desejar e comprar.",
            link: "/blog/editorial-moda-performance-vendas",
            data: "Março 2026"
        },
        {
            categoria: "produtora",
            subcategoria: "Produtora — Produção Executiva",
            titulo: "Por que boas ideias não garantem bons resultados",
            excerpt: "Uma ideia forte é apenas o ponto de partida. Sem execução estruturada, ela perde intensidade, se dilui, se adapta demais e perde identidade.",
            link: "/blog/por-que-boas-ideias-nao-garantem-resultados",
            data: "Fevereiro 2026"
        },
        {
            categoria: "produtora",
            subcategoria: "Produtora — Produção Executiva",
            titulo: "Produção Executiva: o sistema invisível que transforma ideias em campanhas de alto impacto",
            excerpt: "Ideias não falham — execuções falham. Uma campanha pode nascer forte no conceito e ainda assim perder potência na prática.",
            link: "/blog/producao-executiva-sistema-campanhas",
            data: "Fevereiro 2026"
        },
        {
            categoria: "produtora",
            subcategoria: "Produtora — Produção Executiva",
            titulo: "Por que campanhas com alto investimento falham",
            excerpt: "Existe uma expectativa implícita no mercado: quanto maior o investimento, maior o resultado. Mas na prática, o que determina o resultado não é o valor investido.",
            link: "/blog/por-que-campanhas-caras-falham",
            data: "Janeiro 2026"
        }
    ];

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
                    padding: 40px 40px 80px 40px;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(10px); }
                }

                .animate-in {
                    animation: fadeIn 0.4s ease forwards;
                    display: block;
                }

                .animate-out {
                    animation: fadeOut 0.3s ease forwards;
                    pointer-events: none;
                    position: absolute;
                    visibility: hidden;
                }
            `}} />

            <h1 hidden>Blog de Branding Estratégico e Posicionamento de Marca</h1>
            
            <Header variant="light" />

            {/* Hero Section */}
            <section className="bg-white text-black px-8 flex items-center justify-center text-center border-t border-b border-[#e0e0e0]" style={{ borderTopWidth: '0.5px', borderBottomWidth: '0.5px', padding: '100px 0 40px 0', marginTop: '72px' }}>
                <div className="max-w-4xl mx-auto">
                    <span className="label-text mb-4 block">House Mazzutti — Blog</span>
                    <h2 className="hero-title text-4xl md:text-[2.5rem] mb-4 leading-tight">"Nem tudo precisa ser dito. Mas o que é dito precisa ter direção."</h2>
                    <p className="label-text text-sm max-w-lg mx-auto leading-relaxed">Conteúdos sobre branding estratégico, posicionamento de marca e construção de autoridade.</p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="flex justify-center items-center py-12" style={{ gap: '32px' }}>
                {['todos', 'studio', 'agencia', 'produtora'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{ 
                            fontFamily: "'Raleway', sans-serif", 
                            fontSize: '10px', 
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            background: 'none',
                            border: 'none',
                            color: activeCategory === cat ? '#000' : '#aaa',
                            borderBottom: activeCategory === cat ? '0.5px solid #000' : '0.5px solid transparent',
                            paddingBottom: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {cat === 'agencia' ? 'AGÊNCIA' : cat}
                    </button>
                ))}
            </div>

            {/* Blog Content */}
            <main style={{ position: 'relative' }}>
                {articles.map((article, index) => {
                    const isVisible = activeCategory === 'todos' || activeCategory === article.categoria;
                    
                    return (
                        <article 
                            key={index} 
                            className={`group article-card border-gray-200 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 max-h-[2000px] visible pb-20 mb-20 border-b relative' : 'opacity-0 max-h-0 invisible p-0 m-0 border-none absolute overflow-hidden pointer-events-none'}`}
                        >
                            <div className="image-placeholder mb-10 overflow-hidden"></div>
                            <div className="text-center max-w-5xl mx-auto" style={{ transition: 'opacity 0.3s ease-in-out', opacity: isVisible ? 1 : 0 }}>
                                <span className="category-label text-[#5E5E5E] mb-4 block">{article.subcategoria}</span>
                                <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                    <Link href={article.link}>{article.titulo}</Link>
                                </h2>
                                <p className="excerpt-text mb-8 font-light">
                                    "{article.excerpt}"
                                </p>
                                <div className="mb-10">
                                    <Link className="btn-outline" href={article.link}>Ler Artigo</Link>
                                </div>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                    <span className="label-text text-gray-400">{article.data}</span>
                                    <div className="flex space-x-4">
                                        <span className="material-symbols-outlined text-gray-400 cursor-pointer text-sm">share</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}

                {/* QUOTE BLOCK */}
                <div className="quote-block article-card mt-24" style={{ marginBottom: '0', border: 'none', position: 'relative' }}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="quote-text text-[2.5rem] md:text-[3rem] mb-6 italic leading-[1.1]">"Conteúdo sem direção é ruído. E ruído não posiciona."</h2>
                        <span className="label-text text-[#5E5E5E]">House Mazzutti</span>
                    </div>
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
