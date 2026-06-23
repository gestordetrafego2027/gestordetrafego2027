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
  { src: '/images/studio/leticia-moraes/capa.webp',    alt: 'Leticia Moraes — House Mazzutti' },
  { src: '/images/studio/ana-rockenbach/capa.webp',    alt: 'Ana Rockenbach — House Mazzutti' },
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
  { src: '/images/studio/francielle-reis/1.webp',      alt: 'Francielle Reis — House Mazzutti' },
  { src: '/images/studio/francielle-reis/3.webp',      alt: 'Francielle Reis — House Mazzutti' },
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
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </picture>
        <div className="absolute inset-0 bg-black/65" />

        {/* datas */}
        <div className="absolute top-0 inset-x-0 z-20 pt-[72px] flex justify-center">
          <div className="flex items-center gap-5" data-aos="fade-down" data-aos-delay="0">
            <div className="hmzt-line w-8" />
            <span className="font-label uppercase tracking-[0.4em] text-[13px] text-white/70">
              20 · 21 · 22 de Julho · <strong className="font-bold text-white">Canoinhas, SC</strong>
            </span>
            <div className="hmzt-line w-8" />
          </div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">

          <span
            className="font-label uppercase tracking-[0.45em] text-[9px] text-white/40 mb-3 block"
            data-aos="fade-up" data-aos-delay="50"
          >
            House Mazzutti apresenta
          </span>

          <div className="mb-7" data-aos="fade-up" data-aos-delay="100">
            <p className="font-headline text-[5.5rem] md:text-[8rem] lg:text-[10rem] text-white leading-[0.85] tracking-tight">
              TOUR
            </p>
            <p className="font-label uppercase tracking-[0.55em] text-[11px] text-white/55 mt-3">
              Marca Pessoal
            </p>
          </div>

          <div className="hmzt-line w-14 mx-auto mb-7" data-aos="fade-up" data-aos-delay="150" />

          <p
            className="font-label uppercase tracking-[0.28em] text-[9px] text-white/45 mb-9 max-w-xs mx-auto leading-relaxed"
            data-aos="fade-up" data-aos-delay="200"
          >
            Posicione sua imagem com quem entende do assunto.
          </p>

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

      {/* ── PORTFÓLIO GRID ─────────────────────────────────────────── */}
      <section className="bg-black">
        {/* Linha 1: 4 quadrados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
          {PORTFOLIO.slice(0, 4).map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden group">
              <img src={img.src} alt={img.alt} loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
        {/* Linha 2: 1 portrait largo + 2 quadrados */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-[2px]">
          <div className="aspect-[4/3] md:aspect-auto overflow-hidden group" style={{minHeight:'320px'}}>
            <img src={PORTFOLIO[4].src} alt={PORTFOLIO[4].alt} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img src={PORTFOLIO[5].src} alt={PORTFOLIO[5].alt} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img src={PORTFOLIO[6].src} alt={PORTFOLIO[6].alt} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
        {/* Linha 3: 2 quadrados + 1 wide */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-[2px]">
          <div className="aspect-square overflow-hidden group">
            <img src={PORTFOLIO[7].src} alt={PORTFOLIO[7].alt} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img src={PORTFOLIO[8].src} alt={PORTFOLIO[8].alt} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="aspect-[2/1] overflow-hidden group">
            <img src={PORTFOLIO[9].src} alt={PORTFOLIO[9].alt} loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
        {/* Linha 4: 2 wide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          <div className="aspect-[3/2] overflow-hidden group">
            <img src={PORTFOLIO[10].src} alt={PORTFOLIO[10].alt} loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="aspect-[3/2] overflow-hidden group">
            <img src={PORTFOLIO[11].src} alt={PORTFOLIO[11].alt} loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
        {/* Linha 5: 2 restantes */}
        <div className="grid grid-cols-2 gap-[2px]">
          <div className="aspect-square overflow-hidden group">
            <img src={PORTFOLIO[12].src} alt={PORTFOLIO[12].alt} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="aspect-square overflow-hidden group">
            <img src={PORTFOLIO[13].src} alt={PORTFOLIO[13].alt} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
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

      {/* ── PLANOS ─────────────────────────────────────────────────── */}
      <section id="planos" className="bg-zinc-950 px-6 md:px-[40px] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">

          <div className="mb-16" data-aos="fade-up">
            <span className="font-label uppercase tracking-[0.35em] text-[9px] text-white/40 mb-4 block">
              Investimento
            </span>
            <h2 className="font-headline text-[1.8rem] md:text-[2.6rem] text-white tracking-tight">
              Escolha seu nível.<br />
              <em>Feche agora.</em>
            </h2>
            <p className="font-label uppercase tracking-[0.25em] text-[9px] text-white/30 mt-4">
              Vagas limitadas para 20 · 21 · 22 de Julho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {PLANOS.map((plano, idx) => (
              <div
                key={plano.id}
                className="relative border border-white/10 p-9 flex flex-col justify-between overflow-hidden group"
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
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/55 transition-colors duration-500" />
                {/* Conteúdo relativo ao overlay */}
                <div className="relative z-10 flex flex-col h-full">

                {plano.popular && (
                  <span className="absolute top-5 right-5 font-label text-[8px] tracking-widest bg-white text-black px-2 py-1 group-hover:bg-black group-hover:text-white transition-colors">
                    MAIS ESCOLHIDO
                  </span>
                )}

                <div>
                  <h3 className="font-headline text-2xl mb-1">{plano.nome}</h3>
                  <p className="font-label uppercase tracking-[0.2em] text-[9px] text-white/40 group-hover:text-black/50 mb-7">
                    {plano.tagline}
                  </p>

                  {/* Tabela de entregáveis */}
                  <div className="space-y-[6px] mb-8">
                    {[
                      { label: 'Produções', valor: plano.producoes },
                      { label: 'Fotos tratadas', valor: plano.fotos },
                      { label: 'Vídeo', valor: plano.video },
                    ].map(({ label, valor }) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 border-b border-white/8 group-hover:border-black/10 pb-[5px]">
                        <span className="font-label uppercase tracking-[0.18em] text-[8px] text-white/35 group-hover:text-black/40">{label}</span>
                        <span className="font-body text-sm text-white/80 group-hover:text-black/80 text-right">{valor}</span>
                      </div>
                    ))}
                  </div>

                  {/* Preços */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-body text-sm text-white/25 group-hover:text-black/25 line-through">{plano.precoOriginal}</span>
                      <span className="font-label text-[8px] tracking-widest text-white/35 group-hover:text-black/40 bg-white/8 group-hover:bg-black/8 px-2 py-[3px]">VOUCHER {plano.voucher}</span>
                    </div>
                    <span className="font-headline text-4xl italic text-white group-hover:text-black">{plano.preco}</span>
                    <span className="font-label text-[8px] tracking-widest text-white/30 group-hover:text-black/40 block mt-1">
                      {plano.label}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openForm(`plano_${plano.id}`, `${plano.nome} — ${plano.preco}`)}
                  className="w-full border border-white/50 py-[14px] font-label uppercase text-[10px] tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  {plano.cta}
                </button>
                </div>{/* /z-10 */}
              </div>
            ))}
          </div>

          <p className="font-body text-white/25 text-xs text-center mt-8" data-aos="fade-up">
            Reserva com 30% · saldo na entrega · cartão ou PIX
          </p>
        </div>
      </section>

      {/* ── SOBRE A HOUSE ──────────────────────────────────────────── */}
      <section className="bg-black py-24 px-6 md:px-20 border-t border-white/6">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          <div className="shrink-0" data-aos="fade-right">
            <span className="font-label uppercase tracking-[0.4em] text-[8px] text-white/25 block mb-3">
              Sobre a House
            </span>
            <p className="font-headline text-[1.65rem] md:text-[2.1rem] text-white leading-snug tracking-tight max-w-[320px]">
              Não é sobre tirar fotos. É sobre criar ícones.
            </p>
          </div>
          <div className="space-y-5 pt-1" data-aos="fade-left" data-aos-delay="80">
            <p className="font-body text-white/55 text-[15px] leading-relaxed max-w-[500px]">
              A House Mazzutti é uma produtora criativa com estúdio próprio em São Paulo, especializada em direção de imagem pessoal, editorial e audiovisual. Cada projeto nasce de um diagnóstico — não de um orçamento.
            </p>
            <p className="font-body text-white/40 text-[14px] leading-relaxed max-w-[500px]">
              Uma experiência pensada do conceito à curadoria — para quem já ocupa um lugar e precisa ser vista nele.
            </p>
            <p className="font-label uppercase tracking-[0.3em] text-[8px] text-white/20 pt-2">
              Controle estético · Coerência · Atmosfera
            </p>
          </div>
        </div>
      </section>

      {/* ── ANGELO MAZZUTTI ────────────────────────────────────────── */}
      <section className="bg-black border-t border-white/6">
        <div className="flex flex-col md:flex-row">
          {/* Foto */}
          <div className="w-full md:w-[42%] aspect-[3/4] md:aspect-auto md:min-h-[560px] relative overflow-hidden">
            <img
              src="/images/angelo/angelo-portrait.webp"
              alt="Angelo Mazzutti — Diretor Criativo"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top grayscale"
            />
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

      {/* ── GALERIA B&W — COMUNIDADE ───────────────────────────────── */}
      <section className="bg-black">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
          {GALLERY_BW.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden group">
              <img
                src={src}
                alt="House Mazzutti — Canoinhas"
                loading="lazy"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
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
