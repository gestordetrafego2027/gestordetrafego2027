'use client'

/**
 * YouTubeShort
 * Exibe um ou mais YouTube Shorts em formato vertical (9:16) após o grid de fotos.
 *
 * Props:
 *   urls   - string (único link) ou string[] (múltiplos links)
 *   title  - label do bloco (padrão: "Fashion Film")
 */
export default function YouTubeShort({ urls, title = 'Fashion Film' }) {
  const list = Array.isArray(urls) ? urls : [urls]

  // Extrai o ID do short de formatos:
  //   https://youtube.com/shorts/ABC123?feature=share
  //   https://youtu.be/ABC123
  //   https://www.youtube.com/watch?v=ABC123
  function extractId(url) {
    if (!url) return null
    const shorts = url.match(/shorts\/([a-zA-Z0-9_-]+)/)
    if (shorts) return shorts[1]
    const youtu = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
    if (youtu) return youtu[1]
    const watch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
    if (watch) return watch[1]
    return null
  }

  const ids = list.map(extractId).filter(Boolean)
  if (ids.length === 0) return null

  return (
    <section className="px-8 max-w-[1600px] mx-auto pb-16">
      <div className="border-t border-outline-variant/15 pt-16">
        <div className="mb-8">
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">
            {title}
          </p>
          <h2 className="font-newsreader text-3xl md:text-4xl font-light -tracking-[0.02em] leading-tight text-on-surface">
            Movimento.
          </h2>
        </div>

        {/* grid de shorts verticais */}
        <div
          className="flex flex-wrap gap-4 justify-start"
        >
          {ids.map((id) => (
            <div
              key={id}
              className="relative overflow-hidden bg-black rounded-none"
              style={{ width: 'min(340px, 100%)', aspectRatio: '9 / 16' }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`}
                title="YouTube Short"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
