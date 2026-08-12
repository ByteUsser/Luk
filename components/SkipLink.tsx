"use client";

import type { KeyboardEvent, MouseEvent } from "react";

function moveToMainContent() {
  const main = document.getElementById("main-content");
  if (!main) {
    return;
  }

  main.focus({ preventScroll: true });
  main.scrollIntoView({ block: "start", behavior: "auto" });
}

export function SkipLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    moveToMainContent();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    moveToMainContent();
  };

  return (
    <a href="#main-content" className="skip-link" onClick={handleClick} onKeyDown={handleKeyDown}>
      Przejdź do treści
    </a>
  );
}
