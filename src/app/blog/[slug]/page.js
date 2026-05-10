import ArticleContent from './ArticleContent';
import { articles } from './articles';

export function generateStaticParams() {
    return Object.keys(articles).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
    const article = articles[params.slug];
    if (!article) {
        return {
            title: 'Editorial House Mazzutti',
            description: 'Notas e ensaios sobre branding, direção criativa e marca pessoal.',
        };
    }
    return {
        title: article.metaTitle,
        description: article.metaDescription,
        keywords: article.keywords,
        openGraph: {
            title: article.metaTitle,
            description: article.metaDescription,
            type: 'article',
            siteName: 'House Mazzutti',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.metaTitle,
            description: article.metaDescription,
        },
    };
}

export default function BlogSlugPage({ params }) {
    return <ArticleContent slug={params.slug} />;
}
