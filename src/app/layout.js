import "./globals.css";

export const metadata = {
  title: "House Mazzutti | Direção Criativa, Branding e Produção",
  description: "House Mazzutti é uma casa criativa que traduz marcas e pessoas em imagens com clareza, sofisticação e consistência. Branding, direção criativa e produção sob uma só conversa — São Paulo.",
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
