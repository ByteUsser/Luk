import type { GalleryCategorySlug } from "@/lib/gallery-categories";

type SocialImage = {
  photo: string;
  alt: string;
  position?: string;
  branded?: boolean;
};

export const GALLERY_SOCIAL_IMAGES: Record<GalleryCategorySlug, SocialImage> = {
  portrety: {
    photo: "/portfolio/gallery/001-wiosenny-portret.jpg",
    alt: "Portret kobiety wśród kwitnących drzew - Janiczek Foto",
    position: "50% 36%"
  },
  "sesje-dla-par": {
    photo: "/portfolio/gallery/051-bliskosc-w-lawendzie.jpg",
    alt: "Dłonie pary podczas sesji w lawendzie - Janiczek Foto"
  },
  sluby: {
    photo: "/og/wedding-reportage-1200x630.jpg",
    alt: "Para młoda nad morzem o zachodzie słońca - Janiczek Foto",
    branded: true
  },
  uroczystosci: {
    photo: "/og/cover-1200x630.jpg",
    alt: "Dziecko z rodziną podczas uroczystości - Janiczek Foto"
  },
  eventy: {
    photo: "/portfolio/gallery/003-parkiet-i-energia.jpg",
    alt: "Dynamiczny moment podczas wydarzenia - Janiczek Foto"
  },
  motoryzacja: {
    photo: "/portfolio/gallery/009-samochod-przed-domem.jpg",
    alt: "Samochód przed budynkiem - Janiczek Foto"
  },
  podroze: {
    photo: "/portfolio/gallery/005-nadmorski-widok.jpg",
    alt: "Nadmorski widok i architektura - Janiczek Foto"
  }
};
