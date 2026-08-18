// Delistada (gate 0.7) — fora do índice até permissão explícita de uso de imagem.
import {portfolioVideoSchemas} from '@/lib/seo/schemas'

export const metadata = {
  robots: {index: false, follow: false},
}

export default function Layout({children}) {
  const video = portfolioVideoSchemas['jequiti-galisteu']
  return (
    <>
      {video && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(video)}} />}
      {children}
    </>
  )
}
