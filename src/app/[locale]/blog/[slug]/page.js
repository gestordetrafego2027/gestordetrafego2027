import ArticleContent from './ArticleContent';
import { articles } from './articles';

export function generateStaticParams() {
    return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = articles[slug];
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

export default async function BlogSlugPage({ params }) {
    const { slug } = await params;
    return <ArticleContent slug={slug} />;
}
