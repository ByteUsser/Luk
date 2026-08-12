import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Nav } from "@/components/Nav";
import { SkipLink } from "@/components/SkipLink";

type PublicPageShellProps = {
  children: ReactNode;
};

export function PublicPageShell({ children }: PublicPageShellProps) {
  const content = Children.map(children, (child) => {
    if (!isValidElement<{ id?: string; tabIndex?: number }>(child) || child.type !== "main") {
      return child;
    }

    return cloneElement(child, {
      id: "main-content",
      tabIndex: -1
    });
  });

  return (
    <>
      <SkipLink />
      <Nav />
      {content}
      <Footer />
      <MobileStickyCta />
    </>
  );
}
