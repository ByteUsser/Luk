import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap"
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  weight: ["300", "400"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "./"
  },
  title: {
    default: `${SITE_CONFIG.name} | Fotografia portretowa i lifestyle`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description:
    "Fotograf Bochnia i okolice: portrety, plenery, sesje dla par i lifestyle w naturalnym świetle.",
  openGraph: {
    title: `${SITE_CONFIG.name} | Fotografia portretowa i lifestyle`,
    description:
      "Fotograf Bochnia, powiat bocheński, Kraków i okolice. Emocje, filmowe tony, naturalne światło.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - portfolio fotograficzne`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Fotografia portretowa i lifestyle`,
    description:
      "Portfolio fotograficzne: portret, lifestyle, plener. Emocje, filmowe tony, naturalne światło.",
    images: [SITE_CONFIG.ogImage]
  },
  manifest: "/manifest.webmanifest",
  category: "photography",
  keywords: [
    "fotograf bochnia",
    "fotograf powiat bocheński",
    "fotograf kraków",
    "sesja zdjęciowa bochnia",
    "fotograf Kraków",
    "fotografia portretowa",
    "sesja dla par bochnia",
    "sesja rodzinna bochnia",
    "sesja plenerowa",
    "sesja lifestyle",
    "janiczekfoto"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" }
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  },
  authors: [{ name: SITE_CONFIG.owner }]
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
