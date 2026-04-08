import { Newsreader, Inter, Raleway } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: 'italic',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["300", "400"],
});

export const metadata = {
  title: "House Mazzutti | Estratégia e Posicionamento",
  description: "A arquitetura do seu posicionamento estratégico e branding.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${newsreader.variable} ${inter.variable} ${raleway.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
