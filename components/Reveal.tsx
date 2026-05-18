"use client";

import { useEffect } from "react";

/**
 * Mount-only component that wires an IntersectionObserver against any
 * element with the `.reveal` class. Adds `.in-view` when the element
 * enters the viewport, triggering the fade-in defined in globals.css.
 *
 * Stays render-free (returns null) — pure side-effect component.
 */
export function Reveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>(".reveal");

    if (reduced) {
      targets.forEach((t) => t.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return null;
}
