import { notFound } from 'next/navigation';
import ArticleContent from './ArticleContent';
import { articles } from './articles';
import { buildAlternates } from '@/lib/seo/metadata';
import { blogPostingSchema, newsArticleSchema, breadcrumbSchema, howToEnsaioSchema, howToBookModeloSchema, howToBrandingSchema, howToFashionFilmSchema, howToDirecaoCriativaSchema } from '@/lib/seo/schemas';
import { brand } from '@/config/site';
import { slugToCluster } from '@/lib/seo/clusters';

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
            ...(article.cover && { images: [{ url: `${brand.url}${article.cover.src}`, alt: article.cover.alt, width: 1200, height: 630 }] }),
        },
        twitter: {
            card: 'summary_large_image',
            title: article.metaTitle,
            description: article.metaDescription,
            images: article.cover
                ? [{ url: `${brand.url}${article.cover.src}`, alt: article.cover.alt }]
                : [{ url: `${brand.url}/images/og-default.webp` }],
        },
    };
}

export default async function BlogSlugPage({ params }) {
    const { slug } = await params;
    const article = articles[slug];
    if (!article) notFound();

    // Compute navigation server-side (not sent to client bundle)
    const slugList = Object.keys(articles);
    const currentIdx = slugList.indexOf(slug);
    const prevSlug = currentIdx > 0 ? slugList[currentIdx - 1] : null;
    const nextSlug = currentIdx < slugList.length - 1 ? slugList[currentIdx + 1] : null;
    const prevArticle = prevSlug ? { titulo: articles[prevSlug].titulo } : null;
    const nextArticle = nextSlug ? { titulo: articles[nextSlug].titulo } : null;

    // Sidebar data computed server-side
    const categoryCounts = Object.values(articles).reduce((acc, a) => {
        const cat = a.categoria || 'Outros'; acc[cat] = (acc[cat] || 0) + 1; return acc;
    }, {});
    const topCounts = Object.entries(categoryCounts).reduce((acc, [cat, count]) => {
        const top = cat.split(' — ')[0]; acc[top] = (acc[top] || 0) + count; return acc;
    }, {});
    const recentPosts = slugList
        .filter(k => k !== slug)
        .slice(0, 3)
        .map(k => ({ slug: k, titulo: articles[k].titulo, data: articles[k].data, cover: articles[k].cover }));

    const crumbs = breadcrumbSchema([
        { name: 'House Mazzutti', url: `${brand.url}/pt/` },
        { name: 'Blog', url: `${brand.url}/pt/blog/` },
        { name: article.titulo, url: `${brand.url}/pt/blog/${slug}/` },
    ]);

    const posting = blogPostingSchema({
        slug,
        titulo: article.titulo,
        metaDescription: article.metaDescription,
        data: article.data,
        cover: article.cover,
        respostaDireta: article.respostaDireta,
        keywords: article.keywords,
    });

    const articleFaqSchema = article.faq?.length > 0
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: article.faq.map(({ q, a }) => ({
                  '@type': 'Question',
                  name: q,
                  acceptedAnswer: { '@type': 'Answer', text: a },
              })),
          }
        : null;

    const howToSchemas = {
        'como-se-preparar-ensaio-fotografico': howToEnsaioSchema,
        'quanto-custa-book-modelo-sao-paulo': howToBookModeloSchema,
        'agencia-branding-premium-sao-paulo': howToBrandingSchema,
        'produtora-fashion-film-sao-paulo': howToFashionFilmSchema,
        'direcao-criativa-o-que-e': howToDirecaoCriativaSchema,
    };
    const articleHowToSchema = howToSchemas[slug] ?? null;

    const isNewsCluster = slugToCluster[slug] === 'mercado';
    const articleNewsSchema = isNewsCluster
        ? newsArticleSchema({
              slug,
              titulo: article.titulo,
              metaDescription: article.metaDescription,
              data: article.data,
              cover: article.cover,
              categoria: article.categoria,
          })
        : null;

    const speakableSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: article.titulo,
        url: `${brand.url}/pt/blog/${slug}/`,
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#article-speakable'],
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(posting) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
            {articleFaqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleFaqSchema) }} />
            )}
            {articleHowToSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleHowToSchema) }} />
            )}
            {articleNewsSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleNewsSchema) }} />
            )}
            <ArticleContent
                slug={slug}
                article={article}
                prevSlug={prevSlug}
                nextSlug={nextSlug}
                prevArticle={prevArticle}
                nextArticle={nextArticle}
                topCounts={topCounts}
                recentPosts={recentPosts}
            />
        </>
    );
}
