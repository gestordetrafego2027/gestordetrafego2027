import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/agencia/rp',
  title: 'RP & Marketing Direto em São Paulo | House Mazzutti',
  description:
    'Assessoria de imprensa, relações públicas e marketing direto para marcas que constroem reputação com presença consistente nos lugares certos. House Mazzutti — São Paulo.',
})

export default function Layout({children}) {
  return children
}
