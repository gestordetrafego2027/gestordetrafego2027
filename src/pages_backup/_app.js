import '../styles/globals.css';
import React from 'react';
import { Newsreader, Inter, Raleway } from 'next/font/google';

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
  weight: ['300'],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${newsreader.variable} ${inter.variable} ${raleway.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}