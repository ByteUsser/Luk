type ScrollBehaviorOption = "auto" | "smooth";

type ScrollToAnchorOptions = {
  stabilize?: boolean;
  focus?: boolean;
};

function getHeaderOffset() {
  const header = document.querySelector("header");
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
  return Math.max(headerBottom + 18, 92);
}

function getAnchorElement(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) {
    return null;
  }

  if (targetId === "main-content") {
    return target;
  }

  return target.querySelector<HTMLElement>("[data-scroll-anchor]") ?? target;
}

function getAnchorTop(targetId: string) {
  const anchor = getAnchorElement(targetId);
  return anchor
    ? anchor.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
    : null;
}

function focusAnchor(targetId: string) {
  const anchor = getAnchorElement(targetId);
  if (!anchor) {
    return;
  }

  const previousTabIndex = anchor.getAttribute("tabindex");
  if (previousTabIndex === null) {
    anchor.setAttribute("tabindex", "-1");
    anchor.addEventListener(
      "blur",
      () => {
        anchor.removeAttribute("tabindex");
      },
      { once: true }
    );
  }

  anchor.focus({ preventScroll: true });
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

  if (options.focus) {
    window.requestAnimationFrame(() => focusAnchor(targetId));
  }

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
