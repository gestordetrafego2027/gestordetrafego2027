import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/studio/cobertura',
  title: 'Cobertura Fotográfica em São Paulo | House Mazzutti',
  description:
    'Cobertura fotográfica e audiovisual de eventos em São Paulo com direção de imagem da House Mazzutti. Registro editorial, não só foto de evento.',
})

export default function Layout({children}) {
  return children
}
