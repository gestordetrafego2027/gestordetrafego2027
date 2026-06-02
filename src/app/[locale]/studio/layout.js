import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/studio',
    locale,
    title: 'Studio HMZT — Book, Ensaio e Direção de Imagem em SP',
    description:
      'Book, ensaio e cobertura com direção de imagem pessoal em São Paulo. Foto e vídeo com intenção, sob direção de Angelo Mazzutti.',
  })
}

export default function StudioLayout({children}) {
  return children
}
