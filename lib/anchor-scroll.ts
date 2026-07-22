type ScrollBehaviorOption = "auto" | "smooth";

type ScrollToAnchorOptions = {
  stabilize?: boolean;
};

function getHeaderOffset() {
  const header = document.querySelector("header");
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
  return Math.max(headerBottom + 18, 92);
}

function getAnchorTop(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) {
    return null;
  }

  const anchor = target.querySelector<HTMLElement>("[data-scroll-anchor]") ?? target;
  return anchor.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
}

function scrollToTop(top: number, behavior: ScrollBehaviorOption) {
  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior
  });
}

export function scrollToAnchor(
  targetId: string,
  behavior: ScrollBehaviorOption = "smooth",
  options: ScrollToAnchorOptions = {}
) {
  const initialTop = getAnchorTop(targetId);
  if (initialTop === null) {
    return false;
  }

  scrollToTop(initialTop, behavior);

  if (options.stabilize) {
    [120, 320, 700].forEach((delay) => {
      window.setTimeout(() => {
        const correctedTop = getAnchorTop(targetId);
        if (correctedTop === null) {
          return;
        }

        if (Math.abs(window.scrollY - correctedTop) > 2) {
          scrollToTop(correctedTop, "auto");
        }
      }, delay);
    });
  }

  return true;
}
