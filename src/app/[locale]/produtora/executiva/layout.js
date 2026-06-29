import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/produtora/executiva',
  title: 'Produção Executiva 360° em São Paulo | House Mazzutti',
  description:
    'Inteligência operacional para campanhas complexas — cinco núcleos curados: Direção & Criação, Audiovisual, Moda & Beleza, Casting & Influência, Produção & Estrutura. House Mazzutti.',
})

export default function Layout({children}) {
  return children
}
