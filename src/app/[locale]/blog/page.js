'use client';

import React, { useState, useMemo } from 'react';
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';
import NewsletterStrip from '@/app/components/NewsletterStrip';
import { articles as articleData } from './[slug]/articles';

// Month order for sorting newest-first
const MONTH_ORDER = {
    'Janeiro': 1, 'Fevereiro': 2, 'Março': 3, 'Abril': 4,
    'Maio': 5, 'Junho': 6, 'Julho': 7, 'Agosto': 8,
    'Setembro': 9, 'Outubro': 10, 'Novembro': 11, 'Dezembro': 12,
};

function parseDate(str) {
    const [m, y] = (str || '').split(' ');
    return parseInt(y || 0) * 100 + (MONTH_ORDER[m] || 0);
}

// "Agência — RP" → "agencia"
function filterKey(categoria) {
    return (categoria || '').split(' — ')[0]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');
}

// Single source of truth — derived from articles.js, sorted newest first
const articleList = Object.entries(articleData)
    .map(([slug, a]) => ({
        slug,
        titulo: a.titulo,
        categoria: a.categoria,
        data: a.data,
        cover: a.cover,
        filterCat: filterKey(a.categoria),
        excerpt: a.intro
            ? (a.intro.length > 220 ? a.intro.slice(0, 220).trimEnd() + '…' : a.intro)
            : a.respostaDireta,
    }))
    .sort((a, b) => parseDate(b.data) - parseDate(a.data));

export default function BlogPage() {
    const t = useTranslations('blog_page');
    const [activeCategory, setActiveCategory] = useState('todos');

    const filtered = useMemo(
        () => articleList.filter(a => activeCategory === 'todos' || a.filterCat === activeCategory),
        [activeCategory],
    );

    return (
        <div className="bg-white">
            <style dangerouslySetInnerHTML={{ __html: `
                body {
                    font-family: 'RocGrotesk', sans-serif;
                    background-color: #ffffff;
                    color: #000000;
                }
                h1, .hero-title, .quote-text {
                    font-family: 'RocGrotesk', sans-serif;
                    font-style: italic;
                }
                .article-title {
                    font-family: 'RocGrotesk', sans-serif;
                    font-size: 1.6rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    font-style: normal;
                }
                .category-label {
                    font-family: 'RocGrotesk', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-size: 0.7rem;
                }
                .label-text {
                    font-family: 'RocGrotesk', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 0.75rem;
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
                    font-family: 'RocGrotesk', sans-serif;
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
                .article-card {
                    border-bottom: 0.5px solid #e5e5e5;
                    padding-bottom: 80px;
                    margin-bottom: 80px;
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
            `}} />

            <h1 hidden>{t('seo_title')}</h1>

            <Header variant="light" />

            {/* Hero */}
            <section className="bg-white text-black flex items-center justify-center text-center" style={{ borderTop: '0.5px solid #e0e0e0', borderBottom: '0.5px solid #e0e0e0', padding: '100px 0 40px 0', marginTop: '72px' }}>
                <div className="max-w-4xl mx-auto px-8">
                    <span className="label-text mb-4 block">{t('label')}</span>
                    <h2 className="hero-title text-4xl md:text-[2.5rem] mb-4 leading-tight">"{t('hero_quote')}"</h2>
                    <p className="label-text text-sm max-w-lg mx-auto leading-relaxed">{t('hero_subtitle')}</p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="flex justify-center items-center py-12 gap-8 flex-wrap px-4">
                {['todos', 'studio', 'agencia', 'produtora'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            fontFamily: "'RocGrotesk', sans-serif",
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            background: 'none',
                            border: 'none',
                            color: activeCategory === cat ? '#000' : '#aaa',
                            borderBottom: activeCategory === cat ? '0.5px solid #000' : '0.5px solid transparent',
                            paddingBottom: '4px',
                            cursor: 'pointer',
                            transition: 'color 0.2s, border-color 0.2s',
                        }}
                    >
                        {cat === 'todos' ? t('filter_todos').toUpperCase()
                            : cat === 'studio' ? t('filter_studio').toUpperCase()
                            : cat === 'agencia' ? t('filter_agencia').toUpperCase()
                            : t('filter_produtora').toUpperCase()}
                    </button>
                ))}
                <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#bbb', fontFamily: "'RocGrotesk', sans-serif" }}>
                    {filtered.length} editorial{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Article List */}
            <main>
                {filtered.map((article) => (
                    <article key={article.slug} className="article-card">
                        <Link href={`/blog/${article.slug}`} className="block mb-10 overflow-hidden">
                            {article.cover ? (
                                <img
                                    src={article.cover.src}
                                    alt={article.cover.alt}
                                    title={article.cover.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto object-cover"
                                    style={{ aspectRatio: '4 / 3' }}
                                    onError={e => {
                                        const fb = article.cover.fallback;
                                        if (fb && e.currentTarget.src !== fb) e.currentTarget.src = fb;
                                        else e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="image-placeholder" />
                            )}
                        </Link>
                        <div className="text-center max-w-5xl mx-auto">
                            <span className="category-label text-[#5E5E5E] mb-4 block">{article.categoria}</span>
                            <h2 className="article-title mb-6 hover:text-gray-500 transition-colors leading-snug">
                                <Link href={`/blog/${article.slug}`}>{article.titulo}</Link>
                            </h2>
                            <p className="excerpt-text mb-8 font-light">"{article.excerpt}"</p>
                            <div className="mb-10">
                                <Link className="btn-outline" href={`/blog/${article.slug}`}>{t('read_article')}</Link>
                            </div>
                            <div className="flex justify-between items-center pt-6" style={{ borderTop: '0.5px solid #f0f0f0' }}>
                                <span className="label-text text-gray-400">{article.data}</span>
                            </div>
                        </div>
                    </article>
                ))}

                {filtered.length === 0 && (
                    <div className="text-center py-32" style={{ fontFamily: "'RocGrotesk', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb' }}>
                        Nenhum editorial nesta categoria ainda.
                    </div>
                )}

                {/* Quote Block */}
                <div className="quote-block mt-24">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="quote-text text-[2.5rem] md:text-[3rem] mb-6 italic leading-[1.1]">"{t('closing_quote')}"</h2>
                        <span className="label-text text-[#5E5E5E]">House Mazzutti</span>
                    </div>
                </div>
            </main>

            <NewsletterStrip sourceUrl="/blog" variant="dark" />

            {/* Footer */}
            <footer className="bg-white text-zinc-900 py-24 px-8 text-center">
                <div className="max-w-screen-lg mx-auto">
                    <div className="mb-12">
                        <span className="font-newsreader text-3xl uppercase tracking-widest font-medium">House Mazzutti</span>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-8 mb-12">
                        <Link className="label-text hover:text-gray-400" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener">Instagram</Link>
                        <Link className="label-text hover:text-gray-400" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener">Linkedin</Link>
                    </nav>
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16">
                        <Link className="label-text text-xs text-gray-400" href="/">{t('footer_home')}</Link>
                        <Link className="label-text text-xs text-gray-400" href="/studio">{t('footer_studio')}</Link>
                        <Link className="label-text text-xs text-gray-400" href="/portfolio">{t('footer_portfolio')}</Link>
                        <Link className="label-text text-xs text-gray-400" href="/blog">{t('footer_blog')}</Link>
                        <Link className="label-text text-xs text-gray-400" href="/contato">{t('footer_contato')}</Link>
                    </nav>
                    <div className="text-gray-600">
                        <p className="label-text text-[10px]">{t('footer_rights')}</p>
                    </div>
                </div>
                <div className="mt-6"><SiteFooterLinks /></div>
            </footer>
        </div>
    );
}
