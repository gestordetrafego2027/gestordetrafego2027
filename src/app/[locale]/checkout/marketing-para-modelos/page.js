/**
 * Checkout placeholder · Ebook Marketing para Modelos
 * Substituir por integração real (Hotmart / Eduzz / Cakto / Stripe) quando definido.
 */
import Link from 'next/link';

export const metadata = {
  title: 'Checkout · Marketing para Modelos · House Mazzutti Academy',
  description: 'Finalize sua compra do ebook Marketing para Modelos · Vol. 01.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#efe9da',
        color: '#14140e',
        fontFamily: '"Source Serif 4", Georgia, serif',
        display: 'grid',
        placeItems: 'center',
        padding: '64px 24px',
      }}
    >
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: '"Rock Grotesque", system-ui, sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: '#c92a2a',
            marginBottom: 18,
          }}
        >
          ● Checkout · em integração
        </div>
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 0.98,
            margin: '0 0 24px',
          }}
        >
          Estamos finalizando o gateway de pagamento.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#2a2a22', margin: '0 0 32px' }}>
          A pré-venda do <em>Marketing para Modelos · Vol. 01</em> abre em breve. Deixe seu e-mail
          em <a href="mailto:academy@housemazzutti.com" style={{ color: '#c92a2a' }}>academy@housemazzutti.com</a>{' '}
          e te avisamos no minuto em que o checkout abrir, com o desconto de lançamento garantido.
        </p>
        <Link
          href="/academy/marketing-para-modelos"
          style={{
            display: 'inline-block',
            background: '#14140e',
            color: '#efe9da',
            fontFamily: '"Rock Grotesque", system-ui, sans-serif',
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            padding: '18px 28px',
            textDecoration: 'none',
          }}
        >
          ← Voltar para a página do livro
        </Link>
      </div>
    </main>
  );
}
