import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import { HashAnchorManager } from "@/components/HashAnchorManager";
import { MarketingAnalytics } from "@/components/MarketingAnalytics";
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
    default: `${SITE_CONFIG.name} | Fotograf Bochnia i okolice`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description:
    "Fotograf Bochnia i okolice. Naturalne portrety, zdjęcia dla par, uroczystości i reportaże. Dojazd do Krakowa i Tarnowa.",
  openGraph: {
    title: `${SITE_CONFIG.name} | Fotograf Bochnia i okolice`,
    description:
      "Naturalne portrety, zdjęcia dla par, rodzinne uroczystości i reportaże. Bochnia, Kraków, Tarnów i Małopolska.",
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
    title: `${SITE_CONFIG.name} | Fotograf Bochnia i okolice`,
    description:
      "Naturalne portrety, zdjęcia dla par, rodzinne uroczystości i reportaże.",
    images: [SITE_CONFIG.ogImage]
  },
  manifest: "/manifest.webmanifest",
  category: "photography",
  icons: {
    icon: [
      { url: "/brand-mark-j.png", sizes: "768x768", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" }
    ],
    shortcut: [{ url: "/favicon-48x48.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  authors: [{ name: SITE_CONFIG.owner }]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" data-scroll-behavior="smooth">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <Script id="scroll-reset" strategy="beforeInteractive">
          {`(() => {
            if ('scrollRestoration' in window.history) {
              window.history.scrollRestoration = 'manual';
            }

            const rawHash = window.location.hash.slice(1);
            if (rawHash && !rawHash.startsWith(':~:text=')) {
              return;
            }

            const resetScroll = () => window.scrollTo(0, 0);
            window.addEventListener('pageshow', resetScroll);
            window.addEventListener('load', resetScroll, { once: true });
            resetScroll();
          })();`}
        </Script>
        <HashAnchorManager />
        <MarketingAnalytics />
        {children}
      </body>
    </html>
  );
}
