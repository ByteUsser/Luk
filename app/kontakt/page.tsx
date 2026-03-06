import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default function ContactPage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="pt-20 md:pt-24">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
