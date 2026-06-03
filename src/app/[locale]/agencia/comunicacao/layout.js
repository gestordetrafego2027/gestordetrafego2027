import {pageMetadata} from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  path: '/agencia/comunicacao',
  title: 'Comunicação de Marca em São Paulo | House Mazzutti',
  description:
    'Estratégia e comunicação de marca em São Paulo: conteúdo, social e campanhas com direção criativa. Presença que posiciona, não só aparece.',
})

export default function Layout({children}) {
  return children
}
