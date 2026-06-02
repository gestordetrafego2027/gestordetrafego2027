import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/agencia/branding',
  title: 'Branding de Luxo em São Paulo | House Mazzutti',
  description:
    'Agência de branding e identidade visual em São Paulo. Marca com intenção e estratégia, da imersão ao sistema visual. Fale com a House Mazzutti.',
})

export default function Layout({children}) {
  return children
}
