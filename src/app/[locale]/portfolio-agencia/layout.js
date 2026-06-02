import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/portfolio-agencia',
  title: 'Portfólio Agência — Branding e Marcas | House Mazzutti',
  description:
    'Portfólio da Agência House Mazzutti: branding, identidade visual e projetos de marca em São Paulo. Cases de marcas que escolheram intenção.',
})

export default function Layout({children}) {
  return children
}
