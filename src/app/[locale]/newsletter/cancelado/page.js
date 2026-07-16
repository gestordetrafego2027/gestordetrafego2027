import { Link } from '@/i18n/navigation'

export const metadata = {
  title: 'Inscrição cancelada — House Mazzutti',
  description: 'Você foi removido da lista de e-mails da House Mazzutti.',
  robots: { index: false, follow: false },
}

export default function NewsletterCancelado() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f4f0', padding: '48px 24px' }}>
      <div style={{ maxWidth: '480px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '24px' }}>
          CARTA HOUSE MAZZUTTI
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, color: '#0a0a0a', marginBottom: '16px', lineHeight: 1.3 }}>
          Inscrição cancelada.
        </h1>
        <div style={{ width: '32px', height: '1px', background: '#0a0a0a', margin: '0 auto 24px' }} />
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '40px' }}>
          Você foi removido da nossa lista. Não enviaremos mais e-mails.
          <br /><br />
          Se quiser voltar, a inscrição está sempre disponível no blog.
        </p>
        <Link
          href="/blog"
          style={{
            display: 'inline-block',
            background: '#0a0a0a',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '16px 32px',
          }}
        >
          Voltar ao blog
        </Link>
      </div>
    </main>
  )
}
