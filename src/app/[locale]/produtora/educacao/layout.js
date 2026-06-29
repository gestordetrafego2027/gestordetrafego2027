import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/produtora/educacao',
  title: 'Produção de Conteúdo Educacional | House Mazzutti Produtora',
  description:
    'Videoaulas, treinamentos corporativos e cases de sucesso com direção editorial. Conhecimento bem produzido que muda percepção. House Mazzutti — São Paulo.',
})

export default function Layout({children}) {
  return children
}
