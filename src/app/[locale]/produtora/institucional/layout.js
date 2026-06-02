import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/produtora/institucional',
  title: 'Vídeo Institucional em São Paulo | House Mazzutti',
  description:
    'Produção de vídeo institucional em São Paulo com direção criativa e produção executiva premium. Conte a história da sua empresa com intenção.',
})

export default function Layout({children}) {
  return children
}
