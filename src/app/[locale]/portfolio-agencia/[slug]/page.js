import AnimatedContent from './AnimatedContent';

export function generateStaticParams() {
    return [
        { slug: 'projeto-1' },
        { slug: 'projeto-2' },
        { slug: 'projeto-3' }
    ];
}

export default function ProjetoAgenciaPage() {
    return <AnimatedContent />;
}
