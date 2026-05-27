'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Seção "Quem estrutura" das landings de serviço.
 *
 * Substitui a equipe placeholder (Lucas/Elena/Arthur) por:
 *   1) Angelo Mazzutti — Direção Criativa (link /angelo)
 *   2) House Studio — Direção de Imagem (link /portfolio-studio)
 *   3) House Produtora — Produção Executiva (link /portfolio-produtora)
 *
 * Mantém o mesmo layout 3-cols da versão original para não quebrar visual.
 */
const members = [
  {
    name: 'Angelo Mazzutti',
    role: 'Direção Criativa',
    image: '/images/angelo/angelo-portrait.webp',
    href: '/angelo',
    alt: 'Angelo Mazzutti — diretor criativo da House Mazzutti',
  },
  {
    name: 'House Studio',
    role: 'Direção de Imagem',
    image: '/images/studio/amanda-oliveira/capa.webp',
    href: '/portfolio-studio',
    alt: 'House Mazzutti Studio — direção de imagem e ensaios autorais',
  },
  {
    name: 'House Produtora',
    role: 'Produção Executiva',
    image: '/images/produtora/moda/hero.webp',
    href: '/portfolio-produtora',
    alt: 'House Mazzutti Produtora — produção audiovisual e campanhas',
  },
];

export default function LandingTeam() {
  return (
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
          {members.map((m) => (
            <Link
              key={m.name}
              href={m.href}
              className="space-y-8 flex flex-col items-center text-center mb-12 group focus:outline-none"
            >
              <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative cursor-pointer">
                <Image
                  className="object-cover grayscale transition-transform duration-700 group-hover:scale-[1.02]"
                  alt={m.alt}
                  src={m.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end justify-center pb-12">
                  <span className="text-white font-label uppercase tracking-[0.3em] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Conhecer →
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-headline text-2xl font-medium">{m.name}</p>
                <p className="font-label uppercase tracking-widest text-[11px] font-light text-zinc-500">
                  {m.role}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
