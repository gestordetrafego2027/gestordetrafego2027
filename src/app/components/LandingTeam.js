'use client';

import Image from 'next/image';

/**
 * Seção "Diferenciais" das landings de serviço.
 *
 * Cada página passa seus próprios 3 diferenciais via prop `items`:
 *   { image, alt, title, desc }
 *
 * Cards informativos (imagem + título + descrição), sem link.
 * Mantém o layout 3-cols da seção original para não quebrar o visual.
 *
 * Default: diferenciais genéricos (fallback de segurança caso uma página
 * use <LandingTeam /> sem props).
 */
const defaultItems = [
  {
    title: 'Direção Criativa',
    desc: 'Conceito e estratégia que sustentam cada entrega.',
    image: '/images/angelo/angelo-portrait.webp',
    alt: 'Direção criativa — House Mazzutti',
  },
  {
    title: 'Direção de Imagem',
    desc: 'Padrão visual premium do briefing à curadoria.',
    image: '/images/studio/amanda-oliveira/capa.webp',
    alt: 'Direção de imagem — House Mazzutti Studio',
  },
  {
    title: 'Produção Executiva',
    desc: 'Operação completa do conceito à entrega final.',
    image: '/images/produtora/moda/hero.webp',
    alt: 'Produção executiva — House Mazzutti Produtora',
  },
];

export default function LandingTeam({
  eyebrow = 'DIFERENCIAIS',
  heading = 'O que faz a diferença na House.',
  items = defaultItems,
}) {
  return (
    <section className="bg-white px-12 border-t-[0.5px] border-zinc-100 pt-[74px] pb-[138px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <span className="font-label uppercase tracking-[0.45em] text-zinc-400 block mb-2 text-[9px]">
            {eyebrow}
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-black">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto max-w-[1386px]">
          {items.map((m) => (
            <div
              key={m.title}
              className="space-y-8 flex flex-col items-center text-center mb-12 group"
            >
              <div className="bg-zinc-100 overflow-hidden w-full aspect-square relative">
                <Image
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  alt={m.alt}
                  src={m.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-2">
                <p className="font-headline text-2xl font-medium">{m.title}</p>
                <p className="font-label text-[13px] font-light text-zinc-500 leading-relaxed max-w-[300px]">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
