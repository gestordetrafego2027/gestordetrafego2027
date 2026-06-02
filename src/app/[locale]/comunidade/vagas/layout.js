import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/comunidade/vagas',
  title: 'Vagas e Carreiras | House Mazzutti',
  description:
    'Vagas e oportunidades na House Mazzutti, casa criativa de São Paulo. Junte-se a um time de direção criativa, produção e imagem.',
})

export default function Layout({children}) {
  return children
}
