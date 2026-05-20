'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';

const toTitleCase = (slug) =>
  slug
    .split('-')
    .map((w) => {
      if (/^\d/.test(w)) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');

const studioBook = [
  'amanda-oliveira', 'ana-laura-saar', 'chai-e-dai', 'debora-pantaglione',
  'ana-rockenbach', 'francine-massoco', 'anna-laura', 'gab-cruz', 'arielly',
  'iasmim', 'jamile-caroline', 'jessica-bittelbrun', 'julia-moraes',
  'leticia-moraes', 'maria-eduarda', 'bruna-brummer', 'iza-feser',
  'marina-machado', 'nataly-silva', 'patricia-marafon', 'poliana-barreto',
  'sara-henriches', 'vitoria-boidt'
].map((slug) => ({
  slug,
  name: toTitleCase(slug),
  cover: `/images/studio/${slug}/capa.jpg`
}));

const studioEnsaio = [
  'andressa-gomiero', 'fernanda-treml', 'nairicia-caberlon', 'thaisi-dias',
  'brenda-mattos', 'gustavo-vioto', 'paula-assuncao', 'carol-costa',
  'leif-sinclar', 'rebeca-cabral', 'cynthia-andrade', 'maria-tereza',
  'samara-samme', 'deise-smaniotto', 'marjorie-rossi', 'simonny',
  'fernanda-costas', 'mileide-mihaile', 'talita-dalbo'
].map((slug) => ({
  slug,
  name: toTitleCase(slug),
  cover: `/images/studio/${slug}/capa.jpg`
}));

const produtoraAcessorios = [
  'barbara-porto', 'camila-scarpa', 'poema-paris', 'pontok', 'dumond',
  'signus', 'signus-versolato01', 'signus-versolato02', 'signus-vertz',
  'elyah', 'signus-fiamma', 'signus-lavorato', 'monica-costa-jewerly',
  'signus-jean-pierre'
].map((slug) => ({
  slug,
  name: toTitleCase(slug),
  cover: `/images/produtora/acessorios/${slug}/capa.jpg`
}));

const produtoraBeleza = [
  'alletto-still', 'jequiti-sense', 'we-pink-ze-felipe', 'we-pink-01',
  'jequiti-galisteu', 'natalia-beauty', 'jequiti-larissa-manoela', 'oceane'
].map((slug) => ({
  slug,
  name: toTitleCase(slug),
  cover: `/images/produtora/beleza/${slug}/capa.jpg`
}));

const agenciaProjetos = [
  'house-mazzutti', 'knowhol', 'mabdo', 'on-take', 'pous', 'samrat'
].map((slug) => ({
  slug,
  name: toTitleCase(slug),
  cover: `/images/agencia/${slug}/capa.jpg`
}));

const categories = [
  {
    slug: 'book',
    unit: 'STUDIO',
    title: 'Book',
    description: 'Books fotográficos para construção de presença e portfólio profissional.',
    cover: studioBook[0].cover,
    basePath: '/portfolio-studio',
    projects: studioBook
  },
  {
    slug: 'acessorios',
    unit: 'PRODUTORA',
    title: 'Acessórios',
    description: 'Produção de imagem para marcas de acessórios — direção criativa do briefing à entrega.',
    cover: produtoraAcessorios[0].cover,
    basePath: '/portfolio-produtora',
    projects: produtoraAcessorios
  },
  {
    slug: 'ensaio-pessoal',
    unit: 'STUDIO',
    title: 'Ensaio Pessoal',
    description: 'Ensaios autorais que traduzem identidade em imagem.',
    cover: studioEnsaio[0].cover,
    basePath: '/portfolio-studio',
    projects: studioEnsaio
  },
  {
    slug: 'beleza',
    unit: 'PRODUTORA',
    title: 'Beleza',
    description: 'Campanhas e ensaios para o segmento de beleza e cosméticos.',
    cover: produtoraBeleza[0].cover,
    basePath: '/portfolio-produtora',
    projects: produtoraBeleza
  },
  {
    slug: 'agencia-projetos',
    unit: 'AGÊNCIA',
    title: 'Branding & Direção',
    description: 'Projetos de branding, identidade e direção criativa assinados pela Agência.',
    cover: agenciaProjetos[0].cover,
    basePath: '/portfolio-agencia',
    projects: agenciaProjetos
  }
];

const FILTERS = ['TODOS', 'STUDIO', 'AGÊNCIA', 'PRODUTORA'];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('TODOS');

  const filteredCategories =
    activeFilter === 'TODOS'
      ? categories
      : categories.filter((c) => c.unit === activeFilter);

  return (
    <div className="bg-white text-black min-h-screen">
      <h1 className="sr-only">Portfólio House Mazzutti — Books, ensaios, campanhas e direção criativa</h1>

      <Header variant="light" />

      {/* HEADER EDITORIAL */}
      <section
        className="border-y border-neutral-200 text-center px-6 py-20 md:py-32"
        style={{ marginTop: '72px', borderTopWidth: '0.5px', borderBottomWidth: '0.5px' }}
      >
        <div className="max-w-4xl mx-auto">
          <span className="font-label uppercase tracking-wider text-sm text-black mb-6 block">
            HOUSE MAZZUTTI — PORTFÓLIO
          </span>
          <h2 className="font-headline font-bold uppercase text-4xl md:text-6xl leading-tight">
            Registros visuais de books, ensaios, campanhas e direções criativas assinadas pela House Mazzutti.
          </h2>
        </div>
      </section>

      {/* MENU DE FILTROS */}
      <div className="flex flex-wrap justify-center items-center gap-12 py-12 px-6">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-label uppercase tracking-wider text-sm cursor-pointer transition-colors duration-300 pb-1 ${
                isActive
                  ? 'text-black border-b-2 border-black'
                  : 'text-neutral-400 border-b-2 border-transparent hover:text-neutral-600'
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* TIMELINE */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {filteredCategories.length === 0 && (
          <p className="font-body italic text-neutral-500 text-center py-32">
            Em breve. Novos projetos da Agência estarão disponíveis.
          </p>
        )}

        {filteredCategories.map((category, idx) => {
          const isLast = idx === filteredCategories.length - 1;
          return (
            <section
              key={category.slug}
              className={`${isLast ? '' : 'border-b border-neutral-200 pb-24 mb-24'}`}
            >
              {/* Cover */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                <Image
                  src={category.cover}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>

              {/* Title block */}
              <div className="mt-8">
                <span className="font-label uppercase tracking-wider text-xs text-neutral-500 block">
                  {category.unit}
                </span>
                <h3 className="font-headline font-bold text-3xl md:text-5xl mt-2 leading-tight">
                  {category.title}
                </h3>
                <p className="font-body text-base text-neutral-600 mt-4 max-w-2xl leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Sub-grid of projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {category.projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`${category.basePath}/${project.slug}`}
                    className="group block transition-opacity duration-300 hover:opacity-80"
                  >
                    <div className="relative w-full overflow-hidden bg-neutral-100" style={{ aspectRatio: '4 / 5' }}>
                      <Image
                        src={project.cover}
                        alt={project.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <span className="font-label uppercase tracking-wider text-xs mt-3 block text-black">
                      {project.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
