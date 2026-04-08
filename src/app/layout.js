import { Newsreader, Inter, Raleway, Playfair_Display, Montserrat, Work_Sans, Noto_Serif } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "700"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  display: "swap",
  weight: ["300", "400"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-notoserif",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "House Mazzutti | Branding Estratégico e Posicionamento de Marca",
  description: "House Mazzutti é uma estrutura de construção de marca focada em branding estratégico, posicionamento de autoridade e direção criativa de alto padrão.",
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
      <body className={`${newsreader.variable} ${inter.variable} ${raleway.variable} ${playfair.variable} ${montserrat.variable} ${workSans.variable} ${notoSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
