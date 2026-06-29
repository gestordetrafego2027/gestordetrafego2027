import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/produtora/eventos',
  title: 'Produção e Cobertura de Eventos em São Paulo | House Mazzutti',
  description:
    'Cobertura fotográfica, videográfica, transmissão ao vivo e captação aérea para eventos com direção editorial. Três formatos. House Mazzutti — São Paulo.',
})

export default function Layout({children}) {
  return children
}
