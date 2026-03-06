import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";

const galleryItems: GalleryItem[] = [
  { title: "Nadmorski kadr", category: "Podróże", publicId: "/portfolio/gallery-01-opt.jpg" },
  { title: "Linie architektury", category: "Miejski", publicId: "/portfolio/gallery-02-opt.jpg" },
  { title: "Odbicie chwili", category: "Detal", publicId: "/portfolio/gallery-03-opt.jpg" },
  {
    title: "Kolory wydarzeń",
    category: "Event",
    publicId: "/portfolio/gallery-04-opt.jpg",
    fit: "contain",
    cardClassName: "md:min-w-[520px]"
  },
  { title: "Nocna karoseria", category: "Motoryzacja", publicId: "/portfolio/gallery-05-opt.jpg" },
  { title: "Czerwone wskazówki", category: "Motoryzacja", publicId: "/portfolio/gallery-06-opt.jpg" }
];

const serviceItems = [
  {
    title: "Motoryzacja",
    description: "Kadry samochodowe z klimatem: detale, refleksy i mocne światło nocne.",
    publicId: "/portfolio/service-portrait-opt.jpg"
  },
  {
    title: "Podróże",
    description: "Reportażowe ujęcia miejsc i przestrzeni z filmową, ciepłą kolorystyką.",
    publicId: "/portfolio/service-plener-opt.jpg"
  },
  {
    title: "Event",
    description: "Fotografie wydarzeń i detali, które budują opowieść o całej atmosferze.",
    publicId: "/portfolio/service-couple-opt.jpg"
  }
];

export default function HomePage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero imagePublicId="/portfolio/hero-opt.jpg" />
        <Gallery items={galleryItems} />
        <About publicId="/portfolio/about-opt.jpg" />
        <Services items={serviceItems} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
