import ArticleContent from './ArticleContent';

export function generateStaticParams() {
    return [
        { slug: 'book-para-modelos-quem-e-escolhido' },
        { slug: 'book-modelo-imagem-trabalha-por-voce' },
        { slug: 'marcas-fortes-ocupam-espaco' },
        { slug: 'clareza-comunicacao-simplifica' },
        { slug: 'posicionamento-e-estrutura' },
        { slug: 'producao-editorial-imagem-comunica' }
    ];
}

export default function BlogSlugPage() {
    return <ArticleContent />;
}
