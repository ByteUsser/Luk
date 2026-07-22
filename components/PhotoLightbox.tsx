"use client";

import dynamic from "next/dynamic";
import type { RefObject } from "react";
import { Counter, Zoom } from "yet-another-react-lightbox/plugins";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false
});

let lightboxStylesPromise: Promise<unknown> | null = null;

export function preparePhotoLightbox() {
  if (!lightboxStylesPromise) {
    lightboxStylesPromise = Promise.all([
      import("yet-another-react-lightbox/styles.css"),
      import("yet-another-react-lightbox/plugins/counter.css")
    ]);
  }

  return lightboxStylesPromise;
}

export type PhotoLightboxSlide = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type PhotoLightboxProps = {
  slides: PhotoLightboxSlide[];
  index: number;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
};

export function PhotoLightbox({ slides, index, onClose, returnFocusRef }: PhotoLightboxProps) {
  if (index < 0) return null;

  const closeLightbox = () => {
    onClose();
    window.requestAnimationFrame(() => returnFocusRef?.current?.focus({ preventScroll: true }));
  };

  return (
    <Lightbox
      open
      className="photo-lightbox"
      index={index}
      close={closeLightbox}
      slides={slides}
      plugins={[Counter, Zoom]}
      labels={{
        Close: "Zamknij",
        Previous: "Poprzednie zdjęcie",
        Next: "Następne zdjęcie",
        "Zoom in": "Powiększ zdjęcie",
        "Zoom out": "Pomniejsz zdjęcie",
        "{index} of {total}": "{index} z {total}"
      }}
      counter={{ separator: " / " }}
      carousel={{
        preload: 3,
        padding: "4%",
        spacing: "2%",
        imageFit: "contain"
      }}
      zoom={{
        maxZoomPixelRatio: 2,
        zoomInMultiplier: 2,
        doubleClickMaxStops: 2,
        pinchZoomV4: true,
        scrollToZoom: false
      }}
      animation={{
        fade: 240,
        swipe: 280,
        navigation: 240,
        zoom: 240,
        easing: {
          swipe: "cubic-bezier(.22,.78,.22,1)",
          navigation: "cubic-bezier(.22,.78,.22,1)",
          fade: "cubic-bezier(.25,.8,.25,1)"
        }
      }}
    />
  );
}
