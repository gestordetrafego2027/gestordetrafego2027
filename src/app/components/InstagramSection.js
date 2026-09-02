'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const PROFILE_URL = 'https://instagram.com/housemazzutti';

/* ══════════════════════════════════════════════════════════════════
   INSTAGRAM SECTION — "Últimos conteúdos"
   Busca os posts em /api/instagram (Graph API com cache de 1h, com
   fallback para o JSON curado). Enquanto não houver post real, mostra
   só o cabeçalho + CTA do perfil — nunca card inventado.
   Uso: <InstagramSection limit={3} />
══════════════════════════════════════════════════════════════════ */
export default function InstagramSection({
    limit = 3,
    eyebrow = 'INSTAGRAM',
    title = '@housemazzutti',
    description = 'Bastidores, campanhas e o dia a dia da casa.',
    allLabel = 'VER TUDO →',
    emptyLabel = 'Acompanhar no Instagram →',
}) {
    const [posts, setPosts] = useState(null); // null = carregando

    useEffect(() => {
        const controller = new AbortController();

        fetch(`/api/instagram/?limit=${limit}`, { signal: controller.signal })
            .then((res) => (res.ok ? res.json() : { posts: [] }))
            .then((data) => setPosts(Array.isArray(data.posts) ? data.posts : []))
            .catch(() => setPosts([]));

        return () => controller.abort();
    }, [limit]);

    const isLoading = posts === null;
    const hasPosts = Array.isArray(posts) && posts.length > 0;

    return (
        <section className="bg-white" style={{ borderTop: '1px solid #e8e8e8' }}>
            <div className="px-12 md:px-24 py-24">
                {/* Cabeçalho */}
                <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="text-caption text-black/50 mb-4 block">{eyebrow}</span>
                        <h2 className="text-h2 text-black">{title}</h2>
                        <p className="text-body text-black/50 mt-4 max-w-md text-sm">{description}</p>
                    </div>
                    <a
                        href={PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-button text-black/50 hover:text-black transition-colors border-b border-black/20 hover:border-black pb-0.5"
                    >
                        {allLabel}
                    </a>
                </div>

                {/* Grade de posts */}
                {isLoading && <PostGridSkeleton count={limit} />}

                {!isLoading && hasPosts && (
                    <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 bg-black/10">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Sem post disponível: só o convite para o perfil */}
                {!isLoading && !hasPosts && (
                    <a
                        href={PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center border border-black/10 px-8 py-16 text-button text-black/60 hover:border-black hover:text-black transition-colors"
                    >
                        {emptyLabel}
                    </a>
                )}
            </div>
        </section>
    );
}

/* ─── card individual ─────────────────────────────────────────────── */
function PostCard({ post }) {
    return (
        <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-neutral-100 overflow-hidden"
            style={{ aspectRatio: '1/1' }}
        >
            <Image
                src={post.imageUrl}
                alt={post.caption || 'Publicação da House Mazzutti no Instagram'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
                loading="lazy"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Selo de formato (Reels / Carrossel) */}
            {post.mediaType !== 'IMAGE' && (
                <span className="absolute top-4 right-4 z-10 text-[9px] uppercase tracking-[0.2em] text-white/90 bg-black/40 px-2 py-1 backdrop-blur-sm">
                    {post.mediaType === 'VIDEO' ? 'Reels' : 'Carrossel'}
                </span>
            )}

            {/* Legenda no hover */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm leading-snug p-6 line-clamp-4">
                    {post.caption || 'Ver no Instagram'}
                </p>
            </div>
        </a>
    );
}

/* ─── esqueleto de carregamento ───────────────────────────────────── */
function PostGridSkeleton({ count }) {
    return (
        <div
            className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 bg-black/10"
            aria-hidden="true"
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="bg-neutral-100 animate-pulse"
                    style={{ aspectRatio: '1/1' }}
                />
            ))}
        </div>
    );
}
