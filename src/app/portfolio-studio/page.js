'use client'

import Link from 'next/link';

export default function PortfolioStudioPage() {
    return (
        <div className="bg-white text-on-surface font-body selection:bg-primary selection:text-on-primary">
            <style dangerouslySetInnerHTML={{__html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
                    font-size: 20px;
                }
                .columns-gallery-container {
                    height: 100vh;
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                    background-color: #ffffff;
                }
                .gallery-column {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    border-right: 1px solid rgba(0, 0, 0, 0.05);
                }
                .gallery-column:last-child {
                    border-right: none;
                }
                .column-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .project-item { position: relative; overflow: hidden; cursor: pointer; }
                .project-overlay { 
                    position: absolute; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    background: rgba(255,255,255,0.92) !important; 
                    color: #000 !important;
                    transform: translateY(-100%); 
                    transition: transform 0.5s ease; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    text-align: center;
                    padding: 2rem;
                    z-index: 10;
                }
                .gallery-column:hover .project-overlay { transform: translateY(0); }
                .project-overlay h4 { color: #000; font-family: 'Newsreader', serif; font-size: 18px; margin: 0; }
                .project-overlay span { color: #000; font-family: 'Raleway', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; }
            `}} />

            <header style={{position: 'fixed', top: 0, width: '100%', zIndex: 50, background: 'white', borderBottom: '0.5px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px'}}>
                <div style={{fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', color: '#000', letterSpacing: '-0.05em'}}>HOUSE MAZZUTTI</div>
                <nav style={{display: 'flex', gap: '32px'}}>
                    <Link href="/" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>HOME</Link>
                    <Link href="/about" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>SOBRE</Link>
                    <Link href="/studio" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>STUDIO</Link>
                    <Link href="/produtora" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>PRODUTORA</Link>
                    <Link href="/agencia" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>AGÊNCIA</Link>
                    <Link href="/angelo" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>ANGELO</Link>
                    <Link href="/comunidade" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>COMUNIDADE</Link>
                    <Link href="/portfolio" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>PORTFÓLIO</Link>
                    <Link href="/blog" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>BLOG</Link>
                    <Link href="/contato" style={{fontFamily: 'Raleway, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#000', textDecoration: 'none'}}>CONTATO</Link>
                </nav>
            </header>
            <main className="min-h-screen">
                <section className="columns-gallery-container">
                    <Link className="gallery-column project-item group" href="/portfolio-studio/projeto-essencia">
                        <img alt="Project 1" className="column-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxXFX7iKpq0zTawLFzSng94FTqC8QmssH8UIMx6iZPuEIeFFimi1DVlCzdNyAx-7ZzfPyqfr0PD6Y1do7BO7upE9uT3z0p7MEC9gOT_-QcmR7D7n9ILiUC72Uk3pncnUI-_utLLZq5O5bw8uWL8Uhc81cOJJrRI8pIlDbC50zmv068KM36T4yaevUGEelVmUiACfma2Mp-Jji656PY9miFy3wYlgOE1SMbeKRGv64DJYBquV2fYfxpF_O5NEfaOEoodNYyOVGYbra"/>
                        <div className="project-overlay">
                            <span>Direção de Imagem</span>
                            <h4>Projeto Essência</h4>
                        </div>
                    </Link>
                    <Link className="gallery-column project-item group" href="/portfolio-studio/movimento-urbano">
                        <img alt="Project 2" className="column-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXeu4Q08taagUiEU0oRy_WfWhic5_qLyLr1nXiBqhc49nYHLtgfzpzEknKHC8c18ICqtqLpI81ZgZeonbUv0whZLdOv-wFF7-x62Kpc8fI3cLDkDInEk0QTvLeB7F2siMYzg5AlMqvEHYdV9DOMr5l9PhPHywbNjxQfqRb6RJISWTCL3R1yQdE1mz2ozPE26wr0Ij3x5GEULlpnWjhfOYPIb-guSnqGxsDWX_tlCcse-g3jZRoMhAZDIh0TzUEbKyPeee9Z9TOUIcB"/>
                        <div className="project-overlay">
                            <span>Direção Criativa</span>
                            <h4>Movimento Urbano</h4>
                        </div>
                    </Link>
                    <Link className="gallery-column project-item group" href="/portfolio-studio/alfaiataria-moderna">
                        <img alt="Project 3" className="column-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQL0BMQnfMGPt4hTwlz-SRUMnYZY4U5rG1WC6bylLDfghCKoScI3rtpRwlyty_5PL09Vbt5K5tjv2Pp4-F6DaT4vQQn32NU6RVnbTca6MvLSdJ3P2IaWqPQ8i_Sh1qc8zHS_87TVXHIWybRC-X8TV2IVZaLxtF8jU__u11uNp7rGD1OLQvEDOlyB1tqw8HHtm4tgB8JIsNQbhQqbg5JFrpCNdqI3FMcHyTCBsrPcfvRtxA_GMi4_VS4HK8umC5pps_0sPIO8q68n5"/>
                        <div className="project-overlay">
                            <span>Posicionamento</span>
                            <h4>Alfaiataria Moderna</h4>
                        </div>
                    </Link>
                    <Link className="gallery-column project-item group" href="/portfolio-studio/horizonte">
                        <img alt="Project 4" className="column-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChtDNB7cdME0kaLamJozRvfkiJws6GrvrXBnE5QRIkxB2ppxix4CG2r_LeyGl5XP-xuzQILDQ9-6ZIMjAYUHBdzn-iH8v6Lxpa6zwjO6xR4CnSkRVonntUc7FphscJZCyOhoEd8rxJtVVZ2nPrj287s6BVqdbOQ52N9vhkG5IWwtk5vxPNnArouHvfxTGaIBJYgAcsGk1qElyInif8vlUCMxZkTDnPAmv_bx8gd_oQ9L1BxaSnKbCHQ8jqgLy-kf1WgkTEZeSrrMLR"/>
                        <div className="project-overlay">
                            <span>Produção de Imagem</span>
                            <h4>Horizonte</h4>
                        </div>
                    </Link>
                </section>
            </main>
        </div>
    );
}
