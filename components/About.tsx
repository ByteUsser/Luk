import Image from "next/image";
import { cloudinaryAsset } from "@/lib/cloudinary";
import { InPageLink } from "@/components/InPageLink";

type AboutProps = {
  publicId: string;
};

export function About({ publicId }: AboutProps) {
  const image = cloudinaryAsset(publicId, { width: 900, quality: 68 });

  return (
    <section id="o-mnie" className="defer-render relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
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
            Łukasz Janiczek.
            <br />
            Po prostu <span className="italic">robię zdjęcia</span>
          </h2>

          <p className="mt-8 max-w-[52ch] text-[1rem] leading-relaxed text-ink/80 md:text-[1.08rem]">
            Fotografią interesuję się od dawna. Z czasem z zajawki przerodziło się to w coś, czym zacząłem
            zajmować się na serio. Profesjonalnie działam od ponad roku i cały czas się rozwijam, ale nadal
            najważniejsze jest dla mnie jedno: żeby zdjęcia były naturalne, miały klimat i nie wyglądały
            sztucznie.
          </p>

          <InPageLink
            targetId="kontakt"
            className="button-primary mt-8 max-w-full px-4 text-[0.66rem] uppercase tracking-[0.16em] sm:px-5 sm:text-[0.72rem] sm:tracking-[0.22em]"
          >
            Napisz do mnie
          </InPageLink>
        </div>
      </div>
    </section>
  );
}
