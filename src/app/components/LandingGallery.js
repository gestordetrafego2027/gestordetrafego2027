'use client';

import Link from 'next/link';
import { galleryByService, galleryTagByService } from '@/lib/landingsContent';

/**
 * Galeria asimétrica de 8 tiles para as landings de serviço.
 *
 * Layout:
 *   Linha 1: 4 quadrados (sq1..sq4)
 *   Linha 2: 1 portrait (3/4) + (2 quadrados + 1 wide)
 *
 * Cada tile é clicável e leva ao projeto correspondente no portfólio.
 *
 * @param {string} service - 'book' | 'ensaio' | 'cobertura' | 'moda' | 'publicidade' | 'institucional'
 */
export default function LandingGallery({ service }) {
  const items = galleryByService[service];
  const tag = galleryTagByService[service];

  if (!items || items.length < 8) {
    // Failsafe — não quebra build se faltar conteúdo
    return null;
  }

  const [sq1, sq2, sq3, sq4, portrait, sq5, sq6, wide] = items;

  return (
    <section className="bg-white px-[40px] py-0">
      <div
        className="grid grid-cols-1 gap-0 -mt-[30px] max-h-[1200px] overflow-hidden"
        style={{ maxHeight: 'calc(100% - 80px)' }}
      >
        {/* Linha 1: 4 quadrados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[sq1, sq2, sq3, sq4].map((item, idx) => (
            <Tile key={`row1-${idx}`} item={item} tag={tag} aspect="aspect-square" />
          ))}
        </div>

        {/* Linha 2: portrait + (2 squares + wide) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0">
          <Tile item={portrait} tag={tag} aspect="aspect-[3/4] md:aspect-auto" />
          <div className="grid grid-cols-1 gap-0">
            <div className="grid grid-cols-2 gap-0">
              <Tile item={sq5} tag={tag} aspect="aspect-square" />
              <Tile item={sq6} tag={tag} aspect="aspect-square" />
            </div>
            <Tile item={wide} tag={tag} aspect="aspect-[2/1]" isWide />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ item, tag, aspect, isWide = false }) {
  const overlayBox = isWide ? 'h-[86%] aspect-square' : 'w-[86%] aspect-square';

  const inner = (
    <div className={`relative ${aspect} group overflow-hidden bg-black`}>
      <img
        alt={item.alt}
        className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        src={item.src}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
        <div className={`bg-black/60 ${overlayBox} flex flex-col items-center justify-center px-4 text-center`}>
          <span className="text-white font-label text-[10px] tracking-[0.3em] mb-1">
            {tag.eyebrow} · {tag.title.toUpperCase()}
          </span>
          <span className="text-white font-headline text-lg italic">{item.name}</span>
        </div>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block focus:outline-none focus:ring-2 focus:ring-white">
        {inner}
      </Link>
    );
  }
  return inner;
}
