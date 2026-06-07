'use client'

const logos = [
  { src: '/images/angelo/logos/wepink.webp',        alt: 'Wepink' },
  { src: '/images/angelo/logos/oceane.webp',         alt: 'Océane' },
  { src: '/images/angelo/logos/elyah.webp',          alt: 'Elyah' },
  { src: '/images/angelo/logos/jequiti.webp',        alt: 'Jequiti' },
  { src: '/images/angelo/logos/natalia-beauty.webp', alt: 'Natalia Beauty' },
  { src: '/images/angelo/logos/signus.webp',         alt: 'Signus' },
  { src: '/images/angelo/logos/poema-paris.webp',    alt: 'Poema Paris' },
  { src: '/images/angelo/logos/dumond.webp',         alt: 'Dumond' },
  { src: '/images/angelo/logos/unique-chic.webp',    alt: 'Unique Chic' },
  { src: '/images/angelo/logos/beatco.webp',         alt: 'Beatco' },
  { src: '/images/angelo/logos/saue.webp',           alt: 'Saue' },
  { src: '/images/angelo/logos/camilla-scarpa.webp', alt: 'Camilla Scarpa' },
]

export default function ClientLogos() {
  // Duplicar para loop contínuo sem salto visível
  const loop = [...logos, ...logos]

  return (
    <section className="bg-white border-b border-neutral-100 py-16 w-full overflow-hidden">
      <style>{`
        @keyframes marquee-clientes {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-clientes {
          display: flex;
          width: max-content;
          animation: marquee-clientes 40s linear infinite;
        }
        .marquee-clientes:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-clientes">
        {loop.map((logo, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center justify-center px-16"
            style={{ height: '80px' }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 w-auto object-contain opacity-50 grayscale
                         transition duration-300 hover:opacity-100 hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
