import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/portfolio-produtora',
  title: 'Portfólio Produtora — Moda e Campanhas | House Mazzutti',
  description:
    'Portfólio da Produtora House Mazzutti: moda, beleza, campanhas e fashion films em São Paulo. Produção premium do conceito ao master.',
})

export default function Layout({children}) {
  return children
}
