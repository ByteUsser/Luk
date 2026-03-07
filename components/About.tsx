import Image from "next/image";
import { cloudinaryAsset } from "@/lib/cloudinary";

type AboutProps = {
  publicId: string;
};

export function About({ publicId }: AboutProps) {
  const image = cloudinaryAsset(publicId, { width: 900, quality: 68 });

  return (
    <section id="o-mnie" className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-[#efe7db]/55 to-transparent" />
      <div className="mx-auto grid max-w-[1300px] gap-10 md:grid-cols-[minmax(280px,380px)_1fr] md:items-center md:gap-16">
        <figure className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={image.src}
            alt="Kadr o zachodzie słońca"
            fill
            loading="lazy"
            quality={68}
            sizes="(max-width: 768px) 86vw, 380px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
          />
          <span className="absolute bottom-4 right-4 border border-cream/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.32em] text-cream">
            JL ©
          </span>
        </figure>

        <div className="relative">
          <span className="eyebrow text-cognac">O mnie</span>
          <h2 className="section-title mt-5 max-w-[13ch]">
            Janiczek Łukasz.
            <br />
            Fotografuję <span className="italic">prawdziwie</span>
          </h2>

          <p className="mt-8 max-w-[52ch] text-[1rem] leading-relaxed text-ink/80 md:text-[1.08rem]">
            Pracuję z ludźmi, którzy chcą czuć się swobodnie przed obiektywem. Tworzę kadry o ciepłym,
            analogowym charakterze, które opowiadają historię zamiast udawać perfekcję. Każda sesja to
            spokojna współpraca i uważność na detale.
          </p>

          <p className="mt-6 border-l border-cognac/45 pl-4 text-[0.95rem] italic text-ink/75">
            &quot;Najlepsze zdjęcia powstają wtedy, gdy człowiek zapomina o aparacie.&quot;
          </p>

          <a
            href="#kontakt"
            className="mt-8 inline-flex min-h-[44px] max-w-full items-center rounded-full border border-ink/25 bg-[#f3ecdf] px-4 text-[0.66rem] uppercase tracking-[0.16em] text-ink transition-colors duration-700 hover:border-cognac hover:text-cognac sm:px-5 sm:text-[0.72rem] sm:tracking-[0.22em]"
          >
            Napisz do mnie
          </a>
        </div>
      </div>
    </section>
  );
}
