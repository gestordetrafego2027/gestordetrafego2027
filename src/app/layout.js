import { Abril_Fatface, Work_Sans } from 'next/font/google';
import "./globals.css";

const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-headline'
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body'
});

export const metadata = {
  title: "House Mazzutti | Branding Estratégico e Posicionamento de Marca",
  description: "House Mazzutti é uma estrutura de construção de marca focada em branding estratégico, posicionamento de autoridade e direção criativa de alto padrão.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${abrilFatface.variable} ${workSans.variable}`}>
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
