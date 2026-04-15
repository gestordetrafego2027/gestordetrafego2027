import ArticleContent from './ArticleContent';

export function generateStaticParams() {
    return [
        { slug: 'book-para-modelos-quem-e-escolhido' },
        { slug: 'book-modelo-imagem-trabalha-por-voce' },
        { slug: 'ensaio-pessoal-imagem-autoridade' },
        { slug: 'ensaio-pessoal-imagem-lidera-percepcao' },
        { slug: 'cobertura-externa-presenca-alto-valor' },
        { slug: 'cobertura-externa-narrativa-visual' },
        { slug: 'branding-project-arquitetura-valor' },
        { slug: 'branding-project-motor-vendas' },
        { slug: 'quanto-investir-em-branding' },
        { slug: 'campanha-lancamento-arquitetura-invisivel' },
        { slug: 'por-que-campanhas-falham' },
        { slug: 'editorial-moda-narrativa-visual' },
        { slug: 'editorial-moda-performance-vendas' },
        { slug: 'por-que-boas-ideias-nao-garantem-resultados' },
        { slug: 'producao-executiva-sistema-campanhas' },
        { slug: 'por-que-campanhas-caras-falham' }
    ];
}

export default function BlogSlugPage({ params }) {
    return <ArticleContent slug={params.slug} />;
}
