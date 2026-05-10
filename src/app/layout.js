import "./globals.css";

export const metadata = {
  title: "House Mazzutti — Hub Criativo & Estratégico | Da Visão à Materialização",
  description: "Hub criativo e estratégico que traduz a essência de marcas e personalidades em narrativas visuais de alto impacto. Branding, direção criativa e produção audiovisual sob uma única estrutura — São Paulo / Global.",
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
