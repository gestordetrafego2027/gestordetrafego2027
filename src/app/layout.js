import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://housemazzutti.com'),
  title: {
    default: 'House Mazzutti — Direção Criativa e Branding em São Paulo',
    template: '%s',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
