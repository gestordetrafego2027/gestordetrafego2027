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
    preco: 'R$ 2.700',
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
    preco: 'R$ 3.100',
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
    preco: 'R$ 3.800',
    tagline: 'O pacote completo.',
    bg: '/images/studio/cynthia-andrade/3.webp',
    cta: 'Fechar Ensaio 03',
  },
];

/* ─── Portfolio grid (12 fotos curadas) ──────────────────── */
const PORTFOLIO = [
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

          <p
            className="font-label uppercase tracking-[0.28em] text-[9px] text-white/45 mb-9 max-w-xs mx-auto leading-relaxed"
            data-aos="fade-up" data-aos-delay="240"
          >
            Posicione sua imagem com quem entende do assunto.
          </p>

          <div className="flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="320">
            <button
              type="button"
              onClick={() => openForm('hero')}
              className="border border-white text-white px-12 py-[17px] font-label uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors duration-300"
            >
              Garantir minha agenda
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
            Uma nova forma de aparecer no mundo.
          </h2>
          <p
            className="font-body text-zinc-500 text-base md:text-lg leading-relaxed max-w-[560px] mx-auto mb-8"
            data-aos="fade-up" data-aos-delay="130"
          >
            O Tour Marca Pessoal não é apenas uma sessão de fotos. É uma experiência completa de direção de imagem — com styling, produção editorial e audiovisual — que acontece em três dias inesquecíveis em Canoinhas, SC.
          </p>
          <p
            className="font-headline text-[1.6rem] md:text-[2.2rem] italic text-zinc-300 tracking-tight"
            data-aos="fade-up" data-aos-delay="190"
          >
            Are u ready?
          </p>
        </div>
      </section>

      {/* ── PORTFÓLIO GRID — primeiras 6 fotos ────────────────────── */}
      <section className="bg-black">
        <div className="grid grid-cols-2 gap-[2px]">
          {PORTFOLIO.slice(0, 6).map((img, i) => (
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

      {/* ── BENEFÍCIOS ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-14" data-aos="fade-up">
            <span className="font-label uppercase tracking-[0.45em] text-[8px] text-zinc-300 block mb-4">
              O que está incluído
            </span>
            <h2 className="font-headline text-black text-[2rem] md:text-[3rem] leading-[1.0] tracking-tight max-w-[600px]">
              Tudo que você precisa para uma produção de alto nível.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] border border-black/8">
            {[
              { num: '01', titulo: 'Direção criativa do início ao fim', desc: 'Angelo está presente em cada detalhe — do conceito ao clique. Você não precisa saber posar. Ele te guia.' },
              { num: '02', titulo: 'Beauty, styling e curadoria de looks', desc: 'Cabelo, maquiagem e looks escolhidos a dedo para cada produção. Você chega como está — a gente cuida do resto.' },
              { num: '03', titulo: 'Set profissional montado para você', desc: 'Iluminação, cenário, equipe técnica. Você chega, a gente já preparou tudo.' },
              { num: '04', titulo: 'Fotos tratadas e prontas para usar', desc: 'Arquivos em alta resolução entregues para redes sociais, site, press kit e o que mais precisar.' },
              { num: '05', titulo: 'Vídeos que fazem o feed parar', desc: 'BTS e fashion film para mostrar quem você é em movimento — com autoridade e leveza.' },
              { num: '06', titulo: 'Só você. Nenhuma divisão de atenção.', desc: 'Cobertura exclusiva, equipe dedicada inteiramente a você. Do check-in ao último clique.' },
            ].map((item, i) => (
              <div key={i} className="p-8 md:p-10 border border-black/8 flex gap-6" data-aos="fade-up" data-aos-delay={(i % 2) * 60}>
                <span className="font-label text-[10px] text-black/20 pt-1 shrink-0">{item.num}</span>
                <div>
                  <h3 className="font-headline text-black text-lg mb-2 leading-tight">{item.titulo}</h3>
                  <p className="font-body text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFÓLIO GRID — últimas 6 fotos ──────────────────────── */}
      <section className="bg-black">
        <div className="grid grid-cols-2 gap-[2px]">
          {PORTFOLIO.slice(6).map((img, i) => (
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

      {/* ── PÚBLICO ────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-20 md:py-28 px-6 md:px-20 border-t border-white/6">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-14" data-aos="fade-up">
            <span className="font-label uppercase tracking-[0.45em] text-[8px] text-white/25 block mb-4">
              Para quem é
            </span>
            <h2 className="font-headline text-[2.2rem] md:text-[3.4rem] text-white leading-[1.0] tracking-tight max-w-[700px] mb-6">
              Revela a beleza do seu agora.
            </h2>
            <p className="font-body text-white/50 text-base md:text-lg leading-relaxed max-w-[580px]">
              Uma experiência pensada para mulheres que já têm muito a contar — e merecem imagens que estejam à altura disso.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] border border-white/8">
            {[
              { titulo: 'Mães', desc: 'Que vivem para os outros e finalmente decidiram aparecer também.' },
              { titulo: 'Empreendedoras', desc: 'Que constroem tanto — e já é hora de o mundo ver quem está por trás disso.' },
              { titulo: 'Solteiras', desc: 'Que estão vivendo a própria vida com muita intensidade e querem guardar esse momento.' },
              { titulo: 'Casadas', desc: 'Que querem se reconhecer além do papel de mãe, esposa, filha.' },
              { titulo: 'Divorciadas', desc: 'Que saíram mais fortes de um recomeço e têm muito a celebrar.' },
              { titulo: 'Empresárias', desc: 'Que lideram com presença e querem que sua imagem comunique isso.' },
              { titulo: 'Aposentadas', desc: 'Que chegaram na fase mais bonita — e nunca se permitiram um registro à altura.' },
              { titulo: 'Em qualquer fase', desc: 'Beleza não tem prazo. Você merece aparecer agora.' },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/6" data-aos="fade-up" data-aos-delay={(i % 4 + 1) * 50}>
                <h3 className="font-headline text-lg text-white mb-3 leading-tight">{item.titulo}</h3>
                <p className="font-body text-white/35 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
                Santa Catarina Plaza ·
              </h2>
              <p className="font-label uppercase tracking-[0.35em] text-[10px] text-white/50 italic">
                Cobertura Privativa
              </p>
            </div>
            <div className="space-y-5 pt-1" data-aos="fade-left" data-aos-delay="80">
              <p className="font-body text-white/55 text-[15px] leading-relaxed">
                O ensaio acontece em uma cobertura exclusiva no coração de Canoinhas. Studio montado com iluminação profissional, equipamentos de última geração e uma atmosfera que coloca você no centro.
              </p>
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
              Escolha o seu.<br />
              <em>Cada nível foi pensado para um momento diferente.</em>
            </h2>
            <p className="font-label uppercase tracking-[0.25em] text-[9px] text-white/30 mt-4">
              Vagas limitadas · 20, 21 e 22 de Julho · Canoinhas, SC
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
                      <span className="font-headline text-4xl md:text-5xl italic text-white block">{plano.preco}</span>
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
              Ele não tira fotos.<br /><em>Ele conta quem você é.</em>
            </h2>
            <div className="space-y-4 mb-8">
              <p className="font-body text-white/55 text-[15px] leading-relaxed max-w-[420px]">
                Angelo Mazzutti é diretor criativo com mais de uma década construindo imagens que fazem sentido — para marcas, empresas e mulheres que querem ser vistas do jeito certo.
              </p>
              <p className="font-body text-white/40 text-[14px] leading-relaxed max-w-[420px]">
                No Tour Marca Pessoal, ele dirige cada detalhe da sua produção com um olhar que mistura estratégia e sensibilidade. O resultado não é uma foto bonita. É um retrato verdadeiro — e poderoso — de quem você é.
              </p>
            </div>
            <p className="font-headline text-white/60 text-lg italic">— Angelo Mazzutti</p>
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
              A gente não faz sessão de fotos. A gente constrói a sua imagem.
            </p>
            <div className="space-y-5">
              <p className="font-body text-white/55 text-[15px] leading-relaxed">
                A House Mazzutti é uma produtora criativa com estúdio próprio em São Paulo. Trabalhamos com marcas e pessoas que entendem que imagem não é vaidade — é estratégia. Cada projeto começa com escuta. Termina com algo que só poderia ser você.
              </p>
              <p className="font-body text-white/40 text-[14px] leading-relaxed">
                O Tour Marca Pessoal é a nossa experiência mais completa levada para fora de São Paulo — para chegar perto de quem quer se reconhecer na própria imagem, onde quer que esteja.
              </p>
              <p className="font-label uppercase tracking-[0.3em] text-[8px] text-white/20 pt-2">
                Escuta · Intenção · Resultado
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

      {/* ── VÍDEO ──────────────────────────────────────────────────── */}
      <section className="bg-black py-20 md:py-28 px-6 flex flex-col items-center">
        <div className="w-full max-w-[400px] aspect-[9/16] rounded-sm overflow-hidden" data-aos="fade-up">
          <iframe
            src="https://www.youtube.com/embed/P57Wt8VLMuc"
            title="Tour Marca Pessoal — House Mazzutti"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
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
            Você chegou até aqui.<br /><em>Essa é a sua vaga.</em>
          </h2>
          <p
            className="font-body text-white/50 text-base leading-relaxed max-w-[500px] mx-auto mb-3"
            data-aos="fade-up" data-aos-delay="150"
          >
            Em julho, em Canoinhas, a House Mazzutti abre portas para mulheres que estão prontas para aparecer de verdade. São vagas contadas — e cada uma delas tem um nome.
          </p>
          <p
            className="font-label uppercase tracking-[0.4em] text-[9px] text-white/30 mb-10"
            data-aos="fade-up" data-aos-delay="190"
          >
            20 · 21 · 22 de Julho · Canoinhas, SC · Vagas limitadas
          </p>
          <div data-aos="fade-up" data-aos-delay="220">
            <button
              type="button"
              onClick={() => openForm('cta_final')}
              className="border border-white text-white px-14 py-[18px] font-label uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors duration-300"
            >
              Garantir minha agenda
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
            : 'Garantir minha agenda'
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
