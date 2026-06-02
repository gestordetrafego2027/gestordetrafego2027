import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/angelo',
    locale,
    title: 'Angelo Mazzutti — Diretor Criativo e de Imagem | HMZT',
    description:
      '15 anos de audiovisual e direção de imagem para grandes marcas e celebridades. Conheça o diretor por trás da House Mazzutti.',
  })
}

export default function AngeloLayout({children}) {
  return children
}
