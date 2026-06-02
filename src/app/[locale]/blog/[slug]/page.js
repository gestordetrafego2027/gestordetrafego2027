import ArticleContent from './ArticleContent';
import { articles } from './articles';
import { buildAlternates } from '@/lib/seo/metadata';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { brand } from '@/config/site';

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
            ...(article.cover && { images: [{ url: `${brand.url}${article.cover.src}`, alt: article.cover.alt }] }),
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
    const article = articles[slug];

    const crumbs = breadcrumbSchema([
        { name: 'House Mazzutti', url: `${brand.url}/pt/` },
        { name: 'Blog', url: `${brand.url}/pt/blog/` },
        { name: article?.titulo ?? slug, url: `${brand.url}/pt/blog/${slug}/` },
    ]);

    const posting = article
        ? blogPostingSchema({
              slug,
              titulo: article.titulo,
              metaDescription: article.metaDescription,
              data: article.data,
              cover: article.cover,
          })
        : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
            />
            {posting && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(posting) }}
                />
            )}
            <ArticleContent slug={slug} />
        </>
    );
}
