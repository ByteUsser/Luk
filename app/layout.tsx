import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap"
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  weight: ["200", "300", "400"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://janiczekfoto.pl"),
  alternates: {
    canonical: "/"
  },
  title: {
    default: "Janiczek Foto | Fotografia portretowa i lifestyle",
    template: "%s | Janiczek Foto"
  },
  description:
    "Warm cinematic photography from Poland. Portrety, plener i sesje lifestyle w naturalnym świetle.",
  openGraph: {
    title: "Janiczek Foto",
    description:
      "Portfolio fotograficzne: portret, lifestyle, plener. Emocje, filmowe tony, naturalne światło.",
    url: "https://janiczekfoto.pl",
    siteName: "Janiczek Foto",
    locale: "pl_PL",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  },
  authors: [{ name: "Janiczek Łukasz" }]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${cormorant.variable} ${jost.variable}`}>{children}</body>
    </html>
  );
}
