'use client';

import { useState, useEffect } from 'react';
import { initAosNative } from '@/lib/aosNative';
import Header from '@/app/components/Header';
import FormDrawer from '@/app/components/FormDrawer';
import FormStudio from '@/app/components/forms/FormStudio';

/* ─── Planos ─────────────────────────────────────────────── */
const PLANOS = [
  {
    id: 'ensaio-01',
    nome: 'Ensaio 01',
    producoes: 3,
    fotos: 10,
    video: 'Making of',
    precoOriginal: 'R$ 2.700',
    voucher: '− R$ 500',
    preco: 'R$ 2.100',
    label: 'com voucher aplicado',
    tagline: 'O início da sua imagem.',
    bg: '/images/studio/leticia-moraes/capa.webp',
    cta: 'Fechar Ensaio 01',
  },
  {
    id: 'ensaio-02',
    nome: 'Ensaio 02',
    producoes: 4,
    fotos: 15,
    video: '1 BTS 20"',
    precoOriginal: 'R$ 3.100',
    voucher: '− R$ 500',
    preco: 'R$ 2.600',
    label: 'com voucher aplicado',
    tagline: 'Volume e variedade.',
    popular: true,
    bg: '/images/studio/carol-costa/3.webp',
    cta: 'Fechar Ensaio 02',
  },
  {
    id: 'ensaio-03',
    nome: 'Ensaio 03',
    producoes: 5,
    fotos: 20,
    video: '1 BTS 20" + 1 Fashion Film 20"',
    precoOriginal: 'R$ 3.800',
    voucher: '− R$ 500',
    preco: 'R$ 3.300',
    label: 'com voucher aplicado',
    tagline: 'O pacote completo.',
    bg: '/images/studio/cynthia-andrade/3.webp',
    cta: 'Fechar Ensaio 03',
  },
];

/* ─── Portfolio grid (12 fotos curadas) ──────────────────── */
const PORTFOLIO = [
  { src: '/images/produtora/beleza/superbia/1.webp',    alt: 'Superbia — House Mazzutti' },
  { src: '/images/produtora/beleza/superbia/2.webp',   alt: 'Superbia — House Mazzutti' },
  { src: '/images/studio/talita-dalbo/4.webp',         alt: 'Talita Dalbo — House Mazzutti' },
  { src: '/images/studio/talita-dalbo/3.webp',         alt: 'Talita Dalbo — House Mazzutti' },
  { src: '/images/studio/fernanda-costas/2.webp',      alt: 'Fernanda Costas — House Mazzutti' },
  { src: '/images/studio/fernanda-costas/3.webp',      alt: 'Fernanda Costas — House Mazzutti' },
  { src: '/images/studio/carol-costa/3.webp',          alt: 'Carol Costa — House Mazzutti' },
  { src: '/images/studio/carol-costa/4.webp',          alt: 'Carol Costa — House Mazzutti' },
  { src: '/images/studio/fernanda-treml/1.webp',       alt: 'Fernanda Treml — House Mazzutti' },
  { src: '/images/studio/fernanda-treml/3.webp',       alt: 'Fernanda Treml — House Mazzutti' },
  { src: '/images/studio/cynthia-andrade/3.webp',      alt: 'Cynthia Andrade — House Mazzutti' },
  { src: '/images/studio/cynthia-andrade/1.webp',      alt: 'Cynthia Andrade — House Mazzutti' },
  { src: '/images/produtora/beleza/superbia/1.webp',    alt: 'Superbia — House Mazzutti' },
  { src: '/images/produtora/beleza/superbia/2.webp',   alt: 'Superbia — House Mazzutti' },
];

/* ─── Galeria final — comunidade (B&W) ───────────────────── */
const GALLERY_BW = [
  '/images/comunidade/grid-1.webp',
  '/images/comunidade/grid-2.webp',
  '/images/comunidade/grid-3.webp',
  '/images/comunidade/grid-4.webp',
  '/images/comunidade/grid-5.webp',
  '/images/comunidade/grid-6.webp',
];

export default function TourMarcaPessoalPage() {
  const [formCta, setFormCta] = useState(null);
  const openForm = (ctaLocation, packageSelected = null) =>
    setFormCta({ ctaLocation, packageSelected });
  const closeForm = () => setFormCta(null);

  useEffect(() => {
    const cleanup = initAosNative();
    return cleanup;
  }, []);

  return (
    <div className="bg-black text-white font-body antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        .hmzt-line { height: 0.5px; background: currentColor; opacity: 0.2; }
      `}} />

      <h1 className="sr-only">Tour Marca Pessoal — House Mazzutti · Canoinhas, SC · 20, 21 e 22 de Julho</h1>
      <Header variant="dark" />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/studio/canoinhas-hero/mobile.webp" />
          <source media="(min-width: 768px)" srcSet="/images/studio/canoinhas-hero/desktop.webp" />
          <img
            fetchPriority="high"
            src="/images/studio/canoinhas-hero/hero.webp"
            alt="Tour Marca Pessoal — House Mazzutti"
            className="absolute inset-0 w-full h-full object-cover object-top md:object-[center_30%]"
          />
        </picture>
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">

          <span
            className="font-label uppercase tracking-[0.45em] text-[9px] text-white/40 mb-3 block"
            data-aos="fade-up" data-aos-delay="50"
          >
            House Mazzutti apresenta
          </span>

          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <p className="font-headline text-[5.5rem] md:text-[8rem] lg:text-[10rem] text-white leading-[0.85] tracking-tight">
              TOUR
            </p>
            <p className="font-label uppercase tracking-[0.55em] text-[11px] text-white/55 mt-3">
              Marca Pessoal
            </p>
          </div>

          {/* datas abaixo de Marca Pessoal */}
          <div className="flex items-center gap-4 mb-6" data-aos="fade-up" data-aos-delay="140">
            <div className="hmzt-line w-6" />
            <span className="font-label uppercase tracking-[0.4em] text-[12px] text-white/65">
              20 · 21 · 22 de Julho · <strong className="font-bold text-white">Canoinhas, SC</strong>
            </span>
            <div className="hmzt-line w-6" />
          </div>

          <div className="hmzt-line w-14 mx-auto mb-7" data-aos="fade-up" data-aos-delay="170" />

          <div className="flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="320">
            <button
              type="button"
              onClick={() => openForm('hero')}
              className="border border-white text-white px-12 py-[17px] font-label uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors duration-300"
            >
              Garantir minha vaga
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/25 text-white/50 px-10 py-[17px] font-label uppercase tracking-[0.25em] text-[10px] hover:border-white/60 hover:text-white transition-colors duration-300"
            >
              Ver planos
            </button>
          </div>
        </div>

        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <span className="font-label text-[8px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-9 bg-white/60 animate-pulse" />
        </div>
      </section>

      {/* ── PROMESSA ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 text-center">
        <div className="max-w-[860px] mx-auto">
          <span
            className="font-label uppercase tracking-[0.45em] text-[9px] text-zinc-300 mb-8 block"
            data-aos="fade-up"
          >
            House Mazzutti · Canoinhas, SC
          </span>
          <h2
            className="font-headline text-black text-[2.2rem] md:text-[3.6rem] lg:text-[4.4rem] leading-[1.0] tracking-tight mb-8"
            data-aos="fade-up" data-aos-delay="80"
          >
            Chegou a hora de transformar sua história em uma mega produção de moda e beleza.
          </h2>
          <p
            className="font-headline text-[1.8rem] md:text-[2.8rem] italic text-zinc-300 tracking-tight"
            data-aos="fade-up" data-aos-delay="160"
          >
            Are u ready?
          </p>
        </div>
      </section>

      {/* ── PÚBLICO ────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-20 md:py-28 px-6 md:px-20 border-t border-white/6">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-14" data-aos="fade-up">
            <span className="font-label uppercase tracking-[0.45em] text-[8px] text-white/25 block mb-4">
              Para quem é
            </span>
            <h2 className="font-headline text-[2rem] md:text-[3rem] text-white leading-tight tracking-tight max-w-[600px]">
              Feito para mulheres que já chegaram — e precisam ser vistas assim.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] border border-white/8">
            {[
              {
                titulo: 'Empreendedoras',
                desc: 'Você tem um negócio sólido e precisa que sua imagem comunique o mesmo nível do que entrega.',
              },
              {
                titulo: 'Executivas e líderes',
                desc: 'Você ocupa uma posição de influência e quer que sua presença digital reflita quem você é de verdade.',
              },
              {
                titulo: 'Profissionais em transição',
                desc: 'Você está se reposicionando e precisa de uma imagem que abra portas — não que explique o passado.',
              },
              {
                titulo: 'Consultoras e coaches',
                desc: 'Você vende autoridade e transformação — sua imagem precisa transmitir isso antes mesmo de falar.',
              },
              {
                titulo: 'Criativas e artistas',
                desc: 'Você tem um universo estético próprio e quer um ensaio que finalmente faça jus ao que você cria.',
              },
              {
                titulo: 'Influenciadoras e creators',
                desc: 'Você quer elevar o padrão do seu conteúdo com produção editorial de alto nível e direção criativa real.',
              },
              {
                titulo: 'Médicas e profissionais da saúde',
                desc: 'Você constrói autoridade no digital e precisa de uma imagem que transmita credibilidade e sofisticação.',
              },
              {
                titulo: 'Advogadas e juristas',
                desc: 'Você representa pessoas e causas — e quer que sua presença inspire confiança à primeira impressão.',
              },
              {
                titulo: 'Mulheres em lançamento',
                desc: 'Você está lançando algo grande — um livro, um curso, uma marca — e precisa de imagens à altura do momento.',
              },
            ].map((item, i) => (
              <div key={i} className="p-10 border border-white/6" data-aos="fade-up" data-aos-delay={(i % 3 + 1) * 60}>
                <span className="font-label uppercase tracking-[0.3em] text-[8px] text-white/20 block mb-5">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-headline text-xl text-white mb-4 leading-tight">{item.titulo}</h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ───────────────────────────────────────────── */}
      <section className="bg-black py-20 md:py-28 px-6 md:px-20 border-t border-white/6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            <div className="shrink-0 md:w-[340px]" data-aos="fade-right">
              <span className="font-label uppercase tracking-[0.45em] text-[8px] text-white/25 block mb-4">
                Diferenciais
              </span>
              <h2 className="font-headline text-[1.9rem] md:text-[2.4rem] text-white leading-tight tracking-tight">
                Uma produção completa.<br /><em>Não uma sessão de fotos.</em>
              </h2>
            </div>
            <div className="flex-1" data-aos="fade-left" data-aos-delay="80">
              <div className="space-y-0">
                {[
                  { titulo: 'Direção criativa do início ao fim', desc: 'Angelo Mazzutti dirige cada produção com foco em posicionamento, não apenas estética.' },
                  { titulo: 'Styling e curadoria de looks', desc: 'Cada produção tem looks selecionados para comunicar quem você é — com intenção estratégica.' },
                  { titulo: 'Set profissional montado', desc: 'Studio completo com iluminação de estúdio, fundo, refletores e equipe técnica presente.' },
                  { titulo: 'Fotos tratadas em alta resolução', desc: 'Entrega de arquivos prontos para uso em redes sociais, site, press kit e mídia.' },
                  { titulo: 'Vídeos BTS e fashion film', desc: 'Conteúdo audiovisual para alimentar redes sociais com autoridade e alcance.' },
                  { titulo: 'Experiência exclusiva e privativa', desc: 'Cobertura exclusiva, equipe dedicada. Nenhum compartilhamento de espaço ou atenção.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 py-5 border-b border-white/8 group" data-aos="fade-up" data-aos-delay={i * 50}>
                    <span className="font-label text-[9px] text-white/20 pt-[3px] shrink-0 w-5">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="font-headline text-white text-base mb-1 group-hover:text-white/80 transition-colors">{item.titulo}</p>
                      <p className="font-body text-white/35 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFÓLIO GRID — 2×3 portrait ─────────────────────────── */}
      <section className="bg-black">
        <div className="grid grid-cols-2 gap-[2px]">
          {PORTFOLIO.map((img, i) => (
            <div key={i} className="aspect-[2/3] overflow-hidden group">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── PROPOSTA ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-[40px]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div data-aos="fade-right">
            <span className="font-label uppercase tracking-[0.35em] text-[9px] text-zinc-400 mb-5 block">
              O que é
            </span>
            <h2 className="font-headline text-black text-[2rem] md:text-[2.8rem] leading-[1.05] tracking-tight">
              Experiência e método.<br />
              <em>Nada por acaso.</em>
            </h2>
          </div>
          <div data-aos="fade-left" data-aos-delay="100">
            <p className="font-body text-zinc-500 text-base leading-relaxed mb-5">
              O Tour Marca Pessoal é uma experiência completa de direção de imagem — conceito, styling, set e curadoria — concentrada em três dias em Canoinhas.
            </p>
            <p className="font-body text-zinc-400 text-sm leading-relaxed">
              Não é uma sessão de fotos. É a construção da imagem que você vai usar para se posicionar no seu próximo passo.
            </p>
          </div>
        </div>
      </section>

      {/* ── LOCAL & ACOMODAÇÃO ─────────────────────────────────────── */}
      <section className="bg-black overflow-hidden">
        <style>{`
          @keyframes marquee-local {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-local {
            display: flex;
            width: max-content;
            animation: marquee-local 32s linear infinite;
          }
          .marquee-local:hover { animation-play-state: paused; }
        `}</style>

        {/* Galeria corrida */}
        <div className="marquee-local pt-20">
          {[...Array(2)].map((_, loop) => (
            [
              '/images/studio/canoinhas-hotel/1.webp',
              '/images/studio/canoinhas-hotel/2.webp',
              '/images/studio/canoinhas-hotel/3.webp',
              '/images/studio/canoinhas-hotel/4.webp',
              '/images/studio/canoinhas-hotel/5.webp',
              '/images/studio/canoinhas-hotel/6.webp',
              '/images/studio/canoinhas-hotel/7.webp',
              '/images/studio/canoinhas-hotel/8.webp',
              '/images/studio/canoinhas-hotel/9.webp',
              '/images/studio/canoinhas-hotel/10.webp',
              '/images/studio/canoinhas-hotel/11.webp',
            ].map((src, i) => (
              <div
                key={`${loop}-${i}`}
                className="shrink-0 w-[280px] md:w-[360px] h-[420px] md:h-[500px] mx-[3px] overflow-hidden"
              >
                <img
                  src={src}
                  alt="Local do ensaio — Canoinhas"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
            ))
          ))}
        </div>

        {/* Texto — após galeria */}
        <div className="max-w-[1100px] mx-auto px-6 md:px-20 pt-14 pb-20">
          <div className="flex flex-col md:flex-row gap-14 md:gap-24 items-start">
            <div className="shrink-0 md:w-[380px]" data-aos="fade-right">
              <span className="font-label uppercase tracking-[0.4em] text-[8px] text-white/25 block mb-4">
                O Local · Canoinhas, SC
              </span>
              <h2 className="font-headline text-[2rem] md:text-[2.6rem] text-white leading-tight tracking-tight mb-5">
                Studio completo, equipamentos de primeira linha e um espaço feito para você brilhar.
              </h2>
              <p className="font-label uppercase tracking-[0.35em] text-[10px] text-white/50 italic">
                Santa Catarina Plaza · Cobertura Privativa
              </p>
            </div>
            <div className="space-y-5 pt-1" data-aos="fade-left" data-aos-delay="80">
              <p className="font-body text-white/55 text-[15px] leading-relaxed">
                O ensaio acontece em uma cobertura exclusiva no coração de Canoinhas — um studio montado com iluminação profissional, equipamentos de última geração e toda a infraestrutura necessária para uma produção de alto padrão. Você chega. A equipe faz o resto.
              </p>
              <p className="font-body text-white/35 text-[14px] leading-relaxed">
                Espaço amplo, atmosfera de luxo, discrição total. Cada detalhe pensado para que o resultado seja impecável.
              </p>
              <div className="flex flex-wrap gap-8 pt-3">
                {['Studio completo', 'Equipamentos pro', 'Ambiente privativo', 'Infraestrutura total'].map(tag => (
                  <span key={tag} className="font-label uppercase tracking-[0.3em] text-[8px] text-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANOS ─────────────────────────────────────────────────── */}
      <section id="planos" className="bg-zinc-950 px-6 md:px-[40px] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">

          <div className="mb-16" data-aos="fade-up">
            <span className="font-label uppercase tracking-[0.35em] text-[9px] text-white/40 mb-4 block">
              Investimento
            </span>
            <h2 className="font-headline text-[1.8rem] md:text-[2.6rem] text-white tracking-tight">
              Escolha seu nível.<br />
              <em>Posicione sua imagem com quem entende do assunto.</em>
            </h2>
            <p className="font-label uppercase tracking-[0.25em] text-[9px] text-white/30 mt-4">
              Vagas limitadas para 20 · 21 · 22 de Julho.
            </p>
          </div>

          <div className="flex flex-col gap-[2px]">
            {PLANOS.map((plano, idx) => (
              <div
                key={plano.id}
                className="relative aspect-[3/2] border border-white/10 overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 80}
              >
                {/* Foto de fundo */}
                <img
                  src={plano.bg}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-500" />

                {plano.popular && (
                  <span className="absolute top-5 right-5 font-label text-[8px] tracking-widest bg-white text-black px-2 py-1 z-10">
                    MAIS ESCOLHIDO
                  </span>
                )}

                {/* Conteúdo em layout horizontal */}
                <div className="relative z-10 h-full flex flex-col md:flex-row items-stretch p-8 md:p-12 gap-8">
                  {/* Coluna esquerda: nome + entregáveis */}
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="font-headline text-3xl md:text-4xl text-white mb-1">{plano.nome}</h3>
                    <p className="font-label uppercase tracking-[0.2em] text-[9px] text-white/40 mb-8">
                      {plano.tagline}
                    </p>
                    <div className="space-y-[6px] max-w-[320px]">
                      {[
                        { label: 'Produções', valor: plano.producoes },
                        { label: 'Fotos tratadas', valor: plano.fotos },
                        { label: 'Vídeo', valor: plano.video },
                      ].map(({ label, valor }) => (
                        <div key={label} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-[5px]">
                          <span className="font-label uppercase tracking-[0.18em] text-[8px] text-white/40">{label}</span>
                          <span className="font-body text-sm text-white/80 text-right">{valor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divisor vertical */}
                  <div className="hidden md:block w-px bg-white/10 self-stretch" />

                  {/* Coluna direita: preço + CTA */}
                  <div className="flex flex-col justify-center items-start md:items-end md:min-w-[220px] gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-body text-sm text-white/30 line-through">{plano.precoOriginal}</span>
                        <span className="font-label text-[8px] tracking-widest text-white/40 bg-white/8 px-2 py-[3px]">VOUCHER {plano.voucher}</span>
                      </div>
                      <span className="font-headline text-4xl md:text-5xl italic text-white block">{plano.preco}</span>
                      <span className="font-label text-[8px] tracking-widest text-white/30 block mt-1">{plano.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openForm(`plano_${plano.id}`, `${plano.nome} — ${plano.preco}`)}
                      className="border border-white/50 px-8 py-[14px] font-label uppercase text-[10px] tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 w-full md:w-auto"
                    >
                      {plano.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="font-body text-white/25 text-xs text-center mt-8" data-aos="fade-up">
            Reserva com 30% · saldo na entrega · cartão ou PIX
          </p>
        </div>
      </section>

      {/* ── ANGELO MAZZUTTI ────────────────────────────────────────── */}
      <section className="bg-black border-t border-white/6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Foto em moldura */}
          <div className="w-full md:w-[42%] flex items-center justify-center py-16 md:py-24 px-10 md:px-16" data-aos="fade-right">
            <div className="border border-white/20 p-3 w-full max-w-[260px] md:max-w-[300px]">
              <img
                src="/images/angelo/angelo-portrait.webp"
                alt="Angelo Mazzutti — Diretor Criativo"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover object-top"
              />
            </div>
          </div>
          {/* Texto */}
          <div className="flex-1 flex flex-col justify-center px-10 md:px-16 py-16 md:py-24" data-aos="fade-left">
            <span className="font-label uppercase tracking-[0.4em] text-[8px] text-white/25 mb-6 block">
              Direção Criativa
            </span>
            <h2 className="font-headline text-[2rem] md:text-[2.6rem] text-white leading-tight tracking-tight mb-8">
              O estrategista<br />por trás da House.
            </h2>
            <div className="space-y-4 mb-8">
              <p className="font-body text-white/55 text-[15px] leading-relaxed max-w-[420px]">
                Angelo une visão estética e inteligência de mercado para marcas e pessoas que buscam ir além do óbvio.
              </p>
              <p className="font-body text-white/40 text-[14px] leading-relaxed max-w-[420px]">
                Traduz a essência de cada projeto em narrativas que ressoam — não apenas aparecem. Transforma visibilidade em desejo, e desejo em valor duradouro.
              </p>
            </div>
            <p className="font-headline text-white/70 text-lg italic">— Angelo Mazzutti</p>
          </div>
        </div>
      </section>

      {/* ── SOBRE A HOUSE ──────────────────────────────────────────── */}
      <section className="bg-black py-24 px-6 md:px-20 border-t border-white/6">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          {/* Texto */}
          <div className="flex-1 min-w-0" data-aos="fade-right">
            <span className="font-label uppercase tracking-[0.4em] text-[8px] text-white/25 block mb-3">
              Sobre a House
            </span>
            <p className="font-headline text-[1.65rem] md:text-[2.1rem] text-white leading-snug tracking-tight mb-8">
              Não é sobre tirar fotos. É sobre criar ícones.
            </p>
            <div className="space-y-5">
              <p className="font-body text-white/55 text-[15px] leading-relaxed">
                A House Mazzutti é uma produtora criativa com estúdio próprio em São Paulo, especializada em direção de imagem pessoal, editorial e audiovisual. Cada projeto nasce de um diagnóstico — não de um orçamento.
              </p>
              <p className="font-body text-white/40 text-[14px] leading-relaxed">
                Uma experiência pensada do conceito à curadoria — para quem já ocupa um lugar e precisa ser vista nele.
              </p>
              <p className="font-label uppercase tracking-[0.3em] text-[8px] text-white/20 pt-2">
                Controle estético · Coerência · Atmosfera
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIA MARQUEE — HOUSE ────────────────────────────────── */}
      <section className="bg-black overflow-hidden pb-0">
        <div className="overflow-hidden">
          <div className="marquee-house">
            {[...Array(2)].map((_, loop) => (
              [
                '/images/comunidade/grid-1.webp',
                '/images/comunidade/grid-2.webp',
                '/images/comunidade/grid-3.webp',
                '/images/comunidade/grid-4.webp',
                '/images/comunidade/grid-5.webp',
                '/images/comunidade/grid-6.webp',
              ].map((src, i) => (
                <div key={`${loop}-${i}`} className="shrink-0 w-[280px] md:w-[360px] h-[420px] md:h-[500px] mx-[3px] overflow-hidden">
                  <img src={src} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-all duration-700" alt="House Mazzutti" />
                </div>
              ))
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee-house { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-house { display: flex; width: max-content; animation: marquee-house 28s linear infinite; }
          .marquee-house:hover { animation-play-state: paused; }
        `}</style>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────── */}
      <section className="relative py-36 px-6 overflow-hidden">
        <img
          loading="lazy"
          src="/images/studio/francielle-reis/4.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="relative z-10 max-w-[700px] mx-auto text-center">
          <span
            className="font-label uppercase tracking-[0.4em] text-[9px] text-white/35 mb-7 block"
            data-aos="fade-up"
          >
            20 · 21 · 22 de Julho · Canoinhas, SC
          </span>
          <h2
            className="font-headline text-[1.9rem] md:text-[3rem] text-white leading-tight tracking-tight mb-8"
            data-aos="fade-up" data-aos-delay="80"
          >
            Chegou a hora de posicionar e viver essa experiência com a House Mazzutti.
          </h2>
          <p
            className="font-label uppercase tracking-[0.45em] text-[10px] text-white/60 mb-3"
            data-aos="fade-up" data-aos-delay="150"
          >
            Vagas limitadas.
          </p>
          <p
            className="font-body text-white/40 text-sm mb-10"
            data-aos="fade-up" data-aos-delay="190"
          >
            Escolha seu plano e garanta sua data agora.
          </p>
          <div data-aos="fade-up" data-aos-delay="220">
            <button
              type="button"
              onClick={() => openForm('cta_final')}
              className="border border-white text-white px-14 py-[18px] font-label uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors duration-300"
            >
              Garantir minha vaga
            </button>
          </div>
        </div>
      </section>

      {/* ── RODAPÉ MÍNIMO ──────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/10 py-10 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-headline text-white text-xl tracking-tight">House Mazzutti</p>
        <p className="font-label uppercase tracking-[0.3em] text-[9px] text-white/30">
          © 2026 · Canoinhas, Santa Catarina
        </p>
        <p className="font-label uppercase tracking-[0.25em] text-[9px] text-white/15">
          26.1794° S, 50.3919° W
        </p>
      </footer>

      {/* ── FORM DRAWER ────────────────────────────────────────────── */}
      <FormDrawer
        isOpen={!!formCta}
        onClose={closeForm}
        title={
          formCta?.packageSelected
            ? `Fechar — ${formCta.packageSelected}`
            : 'Garantir minha vaga'
        }
        subtitle="Vagas limitadas · 20, 21 e 22 de Julho · Canoinhas, SC"
      >
        <FormStudio
          onClose={closeForm}
          serviceType="ensaio"
          sourceUrl="/canoinhas"
          packageSelected={formCta?.packageSelected ?? null}
          ctaLocation={formCta?.ctaLocation ?? null}
        />
      </FormDrawer>
    </div>
  );
}
