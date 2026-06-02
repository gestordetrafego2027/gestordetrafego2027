import ArticleContent from './ArticleContent';
import { articles } from './articles';
import { buildAlternates } from '@/lib/seo/metadata';

export function generateStaticParams() {
    return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug, locale } = await params;
    const article = articles[slug];
    const alternates = buildAlternates(`/blog/${slug}`, locale);
    if (!article) {
        return {
            title: 'Editorial House Mazzutti',
            description: 'Notas e ensaios sobre branding, direção criativa e marca pessoal.',
            alternates,
        };
    }
    return {
        title: article.metaTitle,
        description: article.metaDescription,
        keywords: article.keywords,
        alternates,
        openGraph: {
            title: article.metaTitle,
            description: article.metaDescription,
            url: alternates.canonical,
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
