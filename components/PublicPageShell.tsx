import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Nav } from "@/components/Nav";

type PublicPageShellProps = {
  children: ReactNode;
};

export function PublicPageShell({ children }: PublicPageShellProps) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <MobileStickyCta />
    </>
  );
}
