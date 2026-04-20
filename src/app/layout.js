import { Syne } from 'next/font/google';
import "./globals.css";

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-headline'
});

export const metadata = {
  title: "House Mazzutti | Branding Estratégico e Posicionamento de Marca",
  description: "House Mazzutti é uma estrutura de construção de marca focada em branding estratégico, posicionamento de autoridade e direção criativa de alto padrão.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${syne.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
