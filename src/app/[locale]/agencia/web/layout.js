import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/agencia/web',
  title: 'Sites e Web Design em São Paulo | House Mazzutti',
  description:
    'Desenvolvimento web e landing pages orientados à conversão em São Paulo. Sites que carregam a marca com precisão e transformam visita em decisão.',
})

export default function Layout({children}) {
  return children
}
