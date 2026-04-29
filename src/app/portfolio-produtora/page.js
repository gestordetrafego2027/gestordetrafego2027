'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';

export default function PortfolioProdutoraPage() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased">
      <style dangerouslySetInnerHTML={{
        __html: `
        .masonry-grid {
            column-count: 1;
            column-gap: 32px;
        }
        @media (min-width: 768px) {
            .masonry-grid {
                column-count: 2;
            }
        }
        @media (min-width: 1024px) {
            .masonry-grid {
                column-count: 4;
            }
        }
        .masonry-item {
            break-inside: avoid;
            margin-bottom: 32px;
        }
        .image-container {
            position: relative;
        }
        .image-container img {
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .image-container:hover img {
            transform: scale(1.03);
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .page-title-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 28px 40px;
            border-top: 0.5px solid #e0e0e0;
            border-bottom: 0.5px solid #e0e0e0;
            margin-top: 73px; /* Precise height of the header for alignment */
            background: #fff;
        }

        .page-title {
            font-family: 'Raleway', sans-serif;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #000;
        }

        .breadcrumb {
            font-family: 'Newsreader', serif;
            font-size: 16px;
            font-style: italic;
            color: #5f5e5e;
            padding-right: 120px;
        }
    `
      }} />

      <Header />
      <style>{`
        header { background: #fff !important; }
        header a, header div, header span { color: #000 !important; }
      `}</style>
      
      <div className="page-title-bar" style={{ paddingTop: '80px' }}>
        <span className="page-title">PORTFÓLIO PRODUTORA</span>
        <span className="breadcrumb">Home / Portfólio / Produtora</span>
      </div>

      <main className="pt-12 pb-20 px-6 md:px-8 lg:px-10">
        <div className="masonry-grid">
          {/* Item 1: Barbara Porto */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/barbara-porto" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Barbara Porto" className="w-full aspect-[3/4] object-cover block" src="/images/produtora/acessorios/barbara-porto/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Barbara Porto</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 2: Camila Scarpa */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/camila-scarpa" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Camila Scarpa" className="w-full aspect-[4/3] object-cover block" src="/images/produtora/acessorios/camila-scarpa/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Camila Scarpa</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 3: Poema Paris */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/poema-paris" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Poema Paris" className="w-full aspect-[3/4] object-cover block" src="/images/produtora/acessorios/poema-paris/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Poema Paris</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 4: PontoK */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/pontok" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="PontoK" className="w-full aspect-[4/3] object-cover block" src="/images/produtora/acessorios/pontok/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">PontoK</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 5: Dumond */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/dumond" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Dumond" className="w-full aspect-[3/4] object-cover block" src="/images/produtora/acessorios/dumond/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Dumond</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 6: Signus */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/signus" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Signus" className="w-full aspect-[4/3] object-cover block" src="/images/produtora/acessorios/signus/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Signus</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 7: Signus Versolato 01 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/signus-versolato01" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Signus Versolato 01" className="w-full aspect-[4/3] object-cover block" src="/images/produtora/acessorios/signus-versolato01/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Signus - Versolato 01</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 8: Signus Versolato 02 */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/signus-versolato02" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Signus Versolato 02" className="w-full aspect-[3/4] object-cover block" src="/images/produtora/acessorios/signus-versolato02/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Signus - Versolato 02</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 9: Signus Vertz */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/signus-vertz" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Signus Vertz" className="w-full aspect-[3/4] object-cover block" src="/images/produtora/acessorios/signus-vertz/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Signus - Vertz</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 10: Elyah */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/elyah" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Elyah" className="w-full aspect-[4/3] object-cover block" src="/images/produtora/acessorios/elyah/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Elyah</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 11: Signus Fiamma */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/signus-fiamma" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Signus Fiamma" className="w-full aspect-[3/4] object-cover block" src="/images/produtora/acessorios/signus-fiamma/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Signus - Fiamma</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 12: Signus Lavorato */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/signus-lavorato" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Signus Lavorato" className="w-full aspect-[4/3] object-cover block" src="/images/produtora/acessorios/signus-lavorato/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Signus - Lavorato</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 13: Monica Costa Jewerly */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/monica-costa-jewerly" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Monica Costa Jewerly" className="w-full aspect-[4/3] object-cover block" src="/images/produtora/acessorios/monica-costa-jewerly/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Monica Costa Jewerly</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Item 14: Signus Jean Pierre */}
          <div className="masonry-item">
            <Link href="/portfolio-produtora/signus-jean-pierre" className="block group">
              <div className="image-container overflow-hidden bg-surface-container-lowest relative">
                <img alt="Signus Jean Pierre" className="w-full aspect-[3/4] object-cover block" src="/images/produtora/acessorios/signus-jean-pierre/capa.jpg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 p-4 bg-white/90">
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black mb-1">Acessórios</span>
                  <span className="font-newsreader text-lg italic text-on-surface-variant text-center leading-tight">Signus - Jean Pierre</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer style={{ background: '#0a0a0a', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Newsreader', serif", fontSize: '16px', color: '#fff', letterSpacing: '-0.02em' }}>House Mazzutti</div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <a href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', textDecoration: 'none' }}>Instagram</a>
          <a href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', textDecoration: 'none' }}>LinkedIn</a>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', color: '#333', letterSpacing: '0.1em' }}>© 2025 House Mazzutti</div>
      </footer>
    </div>
  );
}
