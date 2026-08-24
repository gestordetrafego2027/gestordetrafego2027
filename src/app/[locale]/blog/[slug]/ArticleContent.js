'use client';

import React, { useState, useCallback } from 'react';
import SiteFooterLinks from '@/app/components/SiteFooterLinks';
import { Link } from '@/i18n/navigation';
import NextImage from 'next/image';
import Header from '@/app/components/Header';
import { getRelatedLinks } from '@/lib/seo/clusters';
import { track } from '@/components/analytics/Tracking';

const CATEGORY_CTA = {
  'Studio': {
    eyebrow: 'Pronto para o seu próximo book ou ensaio?',
    headline: 'Direção criativa, luz e posicionamento em um único set.',
    label: 'VER PACOTES DO STUDIO',
    href: '/studio/',
    lead_type: 'studio',
  },
  'Agência': {
    eyebrow: 'Pronto para posicionar sua marca?',
    headline: 'Branding e estratégia que constroem autoridade real.',
    label: 'CONHECER A AGÊNCIA',
    href: '/agencia/',
    lead_type: 'agencia',
  },
  'Produtora': {
    eyebrow: 'Pronto para a próxima produção?',
    headline: 'Da pré-produção ao arquivo final — direção e execução.',
    label: 'VER A PRODUTORA',
    href: '/produtora/',
    lead_type: 'produtora',
  },
  'Academy': {
    eyebrow: 'Pronto para o próximo nível?',
    headline: 'Formação e workshops com Angelo Mazzutti.',
    label: 'VER A ACADEMY',
    href: '/pt/academy/',
    lead_type: 'academy',
  },
};

// Image with automatic fallback (uses portfolio image if dedicated blog image is missing)
function ArticleImage({ data, className = '', sizes = '', priority = false }) {
    const [src, setSrc] = useState(data.src);
    const handleError = () => {
        if (data.fallback && src !== data.fallback) {
            setSrc(data.fallback);
        }
    };
    return (
        <img
            src={src}
            alt={data.alt}
            title={data.alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding={priority ? 'sync' : 'async'}
            onError={handleError}
            className={className}
            sizes={sizes}
        />
    );
}

// Reading time estimator
function readingTime(article) {
    const text = [
        article.intro,
        ...(article.sections || []).flatMap(s => s.paragraphs),
        article.conclusao,
    ].filter(Boolean).join(' ');
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

export default function ArticleContent({ slug, article, prevSlug, nextSlug, prevArticle, nextArticle, topCounts, recentPosts }) {
    const [shareMsg, setShareMsg] = useState('');
    const minutes = readingTime(article);

    const handleShare = useCallback(async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        try {
            if (navigator.share) {
                await navigator.share({ title: article.titulo, url });
            } else {
                await navigator.clipboard.writeText(url);
                setShareMsg('Link copiado!');
                setTimeout(() => setShareMsg(''), 2500);
            }
        } catch (_) {}
    }, [article.titulo]);

    return (
        <div className="bg-white text-zinc-800 m-0 p-0 antialiased font-sans">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                    font-size: 18px;
                }
                body {
                    font-feature-settings: "kern" 1;
                    -webkit-font-smoothing: antialiased;
                }
                .hairline-b { border-bottom: 0.5px solid #e0e0e0; }
                .hairline-t { border-top: 0.5px solid #e0e0e0; }
                .hairline-all { border: 0.5px solid #e0e0e0; }
                .fine-line { border-bottom: 0.5px solid #f0f0f0; }
                .article-h2 {
                    font-family: 'RocGrotesk', sans-serif;
                    font-style: italic;
                    font-size: 1.75rem;
                    line-height: 1.25;
                    color: #18181b;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.01em;
                }
                .article-body p {
                    margin-bottom: 1.5rem;
                }
            `}} />

            {/* TopAppBar */}
            <Header variant="light" />
            <div className="h-20 w-full"></div>

            {/* Title Block */}
            <section className="mt-0 hairline-b pt-7 pb-4 px-10 flex justify-between items-center bg-white">
                <div className="text-[14px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900">EDITORIAL</div>
                <div className="pr-[120px] font-headline italic text-zinc-500 text-[18px] hidden md:block">
                    Home / Editorial / {article.categoria}
                </div>
            </section>

            {/* Main Content Layout */}
            <main className="max-w-[1400px] mx-auto flex flex-col lg:flex-row px-8 py-16 gap-16 items-start">
                {/* Article Content */}
                <article className="flex-1 max-w-[860px]">
                    {/* Hero Cover */}
                    {article.cover && (
                    <figure className="mb-12">
                        <div className="relative aspect-video bg-zinc-100 group overflow-hidden">
                            <ArticleImage
                                data={article.cover}
                                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                                sizes="(max-width: 1024px) 100vw, 860px"
                                priority
                            />
                        </div>
                        {article.cover.caption && (
                            <figcaption className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-label mt-3 text-right">
                                {article.cover.caption}
                            </figcaption>
                        )}
                    </figure>
                    )}

                    {/* Metadata & Title */}
                    <header className="mb-12 text-center md:text-left">
                        <div className="text-[10px] font-label font-bold uppercase tracking-widest text-zinc-500 mb-4">
                            {article.categoria} · {article.data} · {minutes} min de leitura
                        </div>
                        <h1 className="text-2xl md:text-4xl font-headline italic leading-tight text-zinc-900 mb-6">
                            {article.titulo}
                        </h1>
                        <p className="text-[14px] uppercase tracking-[0.18em] text-zinc-500 font-label">por Angelo Mazzutti · Diretor Criativo</p>
                    </header>

                    {/* Resposta Direta — bloco GEO/AEO extraível por IAs e SpeakableSpecification */}
                    {article.respostaDireta && (
                        <div id="article-speakable" className="border-l-2 border-zinc-900 pl-6 mb-10 bg-zinc-50 py-5 pr-6">
                            <p className="text-[10px] font-label uppercase tracking-[0.2em] text-zinc-600 mb-2">Resposta rápida</p>
                            <p className="text-zinc-900 text-base md:text-lg leading-relaxed font-body">{article.respostaDireta}</p>
                        </div>
                    )}

                    {/* Intro Lead */}
                    <div className="article-body text-zinc-800 text-base md:text-lg leading-[1.85] font-body mb-12">
                        <p className="text-lg md:text-xl text-zinc-900 leading-[1.7] font-light first-letter:text-5xl first-letter:font-headline first-letter:italic first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
                            {article.intro}
                        </p>
                    </div>

                    {/* Sections (H2 + paragraphs) */}
                    {article.sections && article.sections.map((section, idx) => (
                        <section key={idx} className="article-body text-zinc-700 text-sm md:text-base leading-[1.9] font-body mb-12">
                            <h2 className="article-h2">{section.h2}</h2>
                            {section.paragraphs.map((para, pIdx) => (
                                <p key={pIdx}>{para}</p>
                            ))}
                            {/* Editorial image break after second section */}
                            {idx === 1 && article.interior && article.interior.length >= 2 && (
                                <figure className="my-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="aspect-[3/4] md:aspect-[2/3] bg-zinc-100 overflow-hidden">
                                            <ArticleImage
                                                data={article.interior[0]}
                                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <div className="aspect-[3/4] md:aspect-[2/3] bg-zinc-100 overflow-hidden">
                                            <ArticleImage
                                                data={article.interior[1]}
                                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>
                                    <figcaption className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-label mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <span>{article.interior[0].caption}</span>
                                        <span>{article.interior[1].caption}</span>
                                    </figcaption>
                                </figure>
                            )}
                        </section>
                    ))}

                    {/* Pull Quote */}
                    {article.citacao && (
                        <div className="bg-zinc-950 text-white p-12 md:p-16 mb-12 text-center">
                            <blockquote className="font-headline italic text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                                "{article.citacao}"
                            </blockquote>
                            <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-label">— Filosofia HMZT</div>
                        </div>
                    )}

                    {/* Conclusion */}
                    {article.conclusao && (
                        <div className="article-body text-zinc-800 text-base md:text-lg leading-[1.85] font-body mb-12">
                            <p className="text-lg italic font-headline text-zinc-900">{article.conclusao}</p>
                        </div>
                    )}

                    {/* FAQ Section — GEO/AEO: perguntas e respostas extraíveis por IAs */}
                    {article.faq && article.faq.length > 0 && (
                        <section className="mt-12 mb-12">
                            <h2 className="font-headline text-2xl md:text-3xl text-zinc-900 mb-8">Perguntas frequentes</h2>
                            <div className="divide-y divide-zinc-100">
                                {article.faq.map((item, i) => (
                                    <div key={i} className="py-6">
                                        <p className="font-headline text-base md:text-lg text-zinc-900 mb-3">{item.q}</p>
                                        <p className="text-zinc-600 font-body text-sm md:text-base leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CTA Contextual — mapeado por categoria do artigo */}
                    {(() => {
                        const prefix = (article.categoria || '').split(' — ')[0];
                        const cta = CATEGORY_CTA[prefix] || {
                            eyebrow: 'Pronto para a próxima decisão?',
                            headline: 'Da visão à materialização.',
                            label: 'INICIAR CONVERSA',
                            href: '/contato',
                            lead_type: 'blog_generico',
                        };
                        return (
                            <div className="my-16 hairline-t hairline-b py-12 text-center">
                                <p className="font-label uppercase tracking-[0.25em] text-[11px] text-zinc-500 mb-4">{cta.eyebrow}</p>
                                <h3 className="font-headline italic text-2xl text-zinc-900 mb-8">{cta.headline}</h3>
                                <Link
                                    href={cta.href}
                                    onClick={() => track('Lead', { lead_type: cta.lead_type, content_name: article.titulo })}
                                    className="inline-block px-12 py-4 bg-black text-white font-label uppercase tracking-[0.3em] text-[11px] hover:bg-zinc-800 transition-colors"
                                >
                                    {cta.label}
                                </Link>
                            </div>
                        );
                    })()}

                    {/* Leia também — internal linking por cluster */}
                    {(() => {
                        const related = getRelatedLinks(slug)
                        if (!related) return null
                        return (
                            <div className="my-16 pt-10 hairline-t">
                                <p className="font-label uppercase tracking-[0.25em] text-[11px] text-zinc-500 mb-8">Leia também</p>
                                <div className="space-y-4 mb-10">
                                    {related.siblings.map((item) => (
                                        <Link
                                            key={item.slug}
                                            href={`/blog/${item.slug}`}
                                            className="flex items-center gap-3 group text-zinc-800 hover:text-zinc-900 transition-colors"
                                        >
                                            <span className="text-zinc-300 text-sm">→</span>
                                            <span className="text-[14px] font-body leading-snug border-b border-transparent group-hover:border-zinc-900 transition-colors">
                                                {item.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href={related.pillar.url}
                                    className="inline-block text-[11px] font-label font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 transition-colors"
                                >
                                    {related.pillar.label} →
                                </Link>
                            </div>
                        )
                    })()}

                    {/* Article Footer */}
                    <footer className="pt-8 hairline-t flex justify-between items-center mb-16">
                        <div className="text-[10px] font-label font-bold uppercase tracking-widest text-zinc-600">{article.data}</div>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors bg-transparent border-none cursor-pointer p-0"
                        >
                            <span className="text-[10px] font-label font-bold uppercase tracking-widest">
                                {shareMsg || 'Compartilhar'}
                            </span>
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </footer>

                    {/* Prev / Next Navigation */}
                    {(prevArticle || nextArticle) && (
                        <nav className="grid grid-cols-2 gap-4 mb-12 hairline-t pt-8">
                            {prevArticle ? (
                                <Link href={`/blog/${prevSlug}`} className="group flex flex-col gap-1">
                                    <span className="text-[9px] font-label uppercase tracking-[0.25em] text-zinc-600">← Anterior</span>
                                    <span className="text-[13px] font-body text-zinc-700 group-hover:text-zinc-900 leading-snug transition-colors line-clamp-2">{prevArticle.titulo}</span>
                                </Link>
                            ) : <div />}
                            {nextArticle ? (
                                <Link href={`/blog/${nextSlug}`} className="group flex flex-col gap-1 text-right">
                                    <span className="text-[9px] font-label uppercase tracking-[0.25em] text-zinc-600">Próximo →</span>
                                    <span className="text-[13px] font-body text-zinc-700 group-hover:text-zinc-900 leading-snug transition-colors line-clamp-2">{nextArticle.titulo}</span>
                                </Link>
                            ) : <div />}
                        </nav>
                    )}

                    {/* Return Link */}
                    <div className="mb-20">
                        <Link className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 flex items-center gap-2 hover:opacity-70 transition-opacity" href="/blog">
                            ← Voltar ao Editorial
                        </Link>
                    </div>

                    {/* Author Section */}
                    <div className="flex items-center gap-8 p-8 hairline-t border-b-[0.5px] border-zinc-100 mb-20">
                        <NextImage alt="Angelo Mazzutti" className="w-20 h-20 rounded-full object-cover grayscale" src="/images/angelo/angelo-portrait.webp" width={80} height={80} />
                        <div>
                            <div className="text-[10px] font-label font-bold uppercase tracking-widest text-zinc-600 mb-1">AUTOR</div>
                            <div className="text-[18px] font-headline italic text-zinc-900 mb-2">Angelo Mazzutti</div>
                            <p className="text-[14px] text-zinc-500 font-body leading-[1.7] max-w-md">Diretor Criativo da House Mazzutti. 20 anos de ofício no audiovisual, com direção criativa para marcas premium e personalidades.</p>
                        </div>
                    </div>
                </article>

                {/* Sidebar (Sticky) */}
                <aside className="hidden lg:flex flex-col w-80 sticky" style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
                    {/* About Sidebar */}
                    <div className="mb-12 pb-10 hairline-b">
                        <NextImage alt="House Mazzutti" className="w-[100px] h-[100px] rounded-full object-cover bg-black mb-6" src="/images/angelo/hmzt-logo.webp" width={100} height={100} />
                        <h4 className="text-zinc-900 mb-4">
                            <span className="hm-logo" style={{ fontSize: '20px' }}>
                                <span className="hm-house">House</span>
                                <span className="hm-mazzutti">Mazzutti</span>
                            </span>
                        </h4>
                        <p className="text-[14px] text-zinc-500 font-body leading-relaxed">Hub criativo & estratégico. Branding, direção criativa e produção audiovisual sob uma única estrutura — da concepção ao acabamento final.</p>
                        <Link href="/" className="mt-6 inline-block text-[12px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 border-b-[0.5px] border-zinc-900 pb-1">CONHECER A HOUSE</Link>
                    </div>

                    {/* Recent Posts */}
                    <div className="mb-12">
                        <h4 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-8 pt-8 hairline-t">EDITORIAIS RECENTES</h4>
                        <div className="space-y-8 pb-8 hairline-b">
                            {(recentPosts || []).map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-4 group cursor-pointer">
                                    <div className="w-[70px] h-[70px] bg-zinc-100 flex-shrink-0 overflow-hidden">
                                        <ArticleImage
                                            data={post.cover}
                                            className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-label font-bold uppercase text-zinc-600 mb-1">{post.data}</div>
                                        <h5 className="text-[13px] font-body font-medium text-zinc-800 leading-snug group-hover:underline">{post.titulo}</h5>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories — dynamic */}
                    <div className="mb-12">
                        <h4 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-6">CATEGORIAS</h4>
                        <ul className="space-y-3">
                            {Object.entries(topCounts).sort((a,b) => b[1]-a[1]).map(([cat, count]) => (
                                <li key={cat} className="flex justify-between text-[11px] font-label uppercase tracking-tighter text-zinc-500 hover:text-zinc-900 transition-colors">
                                    <span>{cat}</span>
                                    <span>{String(count).padStart(2, '0')}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div>
                        <h4 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-6">TAGS</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">BRANDING</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">DIREÇÃO</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">EDITORIAL</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">FASHION</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">MARCA PESSOAL</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">CAMPANHA</span>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-zinc-200 py-12 px-8">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-xl font-headline italic text-zinc-900">HOUSE MAZZUTTI</div>
                    <div className="flex gap-12">
                        <a className="text-[10px] tracking-[0.2em] uppercase font-label text-zinc-600 hover:text-zinc-900 transition-colors" href="https://instagram.com/housemazzutti" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                        <a className="text-[10px] tracking-[0.2em] uppercase font-label text-zinc-600 hover:text-zinc-900 transition-colors" href="https://www.linkedin.com/company/house-mazzutti" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase font-label text-zinc-500">
                        © {new Date().getFullYear()} HOUSE MAZZUTTI · São Paulo / Global
                    </div>
                </div>
              <div className="mt-6"><SiteFooterLinks /></div>
            </footer>
        </div>
    );
}
