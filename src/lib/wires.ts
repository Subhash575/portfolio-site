"use client";

import { useEffect, useRef, useState } from "react";

export type Pt = { x: number; y: number };

// Horizontal S-curve between two points, used for every cable on the page.
export function curve(a: Pt, b: Pt, bend = 0.55) {
  const dx = (b.x - a.x) * bend;
  return `M${a.x} ${a.y} C${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
}

export function rectIn(el: Element, box: DOMRect) {
  const r = el.getBoundingClientRect();
  return { left: r.left - box.left, right: r.right - box.left, top: r.top - box.top, bottom: r.bottom - box.top, width: r.width, height: r.height };
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs `measure` after fonts load, after the entrance animation, and on resize. */
export function useMeasured<T>(measure: () => T, initial: T) {
  const [value, setValue] = useState(initial);
  const fn = useRef(measure);
  useEffect(() => {
    fn.current = measure;
  });
  useEffect(() => {
    const run = () => setValue(fn.current());
    const t = setTimeout(run, 1100);
    window.addEventListener("resize", run);
    document.fonts?.ready.then(run);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", run);
    };
  }, []);
  return [value, () => setValue(fn.current())] as const;
}
