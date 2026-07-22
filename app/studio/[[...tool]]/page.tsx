import type { Metadata } from "next";
import { redirect } from "next/navigation";

const studioUrl = "https://janiczekfoto-panel.sanity.studio";

export const metadata: Metadata = {
  title: "Panel zdjęć",
  robots: { index: false, follow: false }
};

export default function StudioPage() {
  redirect(studioUrl);
}
