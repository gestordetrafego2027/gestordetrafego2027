import {pageMetadata} from '@/lib/seo/metadata'

export async function generateMetadata({params}) {
  const {locale} = await params
  return pageMetadata({
    path: '/portfolio',
    locale,
    title: 'Portfólio House Mazzutti — Books, Campanhas e Marcas',
    description:
      'Trabalhos selecionados de book, campanha de moda e beleza e branding dirigidos pela House Mazzutti em São Paulo.',
  })
}

export default function PortfolioLayout({children}) {
  return children
}
