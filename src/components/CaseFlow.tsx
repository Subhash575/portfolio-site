"use client";

import { useEffect, useRef } from "react";

// The signal cable down the middle fills as you scroll; each keycap node lights once the signal reaches it.
export default function CaseFlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const update = () => {
      const r = host.getBoundingClientRect();
      const tip = Math.min(Math.max(window.innerHeight * 0.6 - r.top, 0), r.height);
      host.style.setProperty("--p", `${tip}px`);
      host.querySelectorAll<HTMLElement>(".cs-node").forEach((n) => {
        const b = n.getBoundingClientRect();
        n.classList.toggle("on", b.top + b.height / 2 - r.top <= tip);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="cs-flow" ref={ref}>
      {children}
    </div>
  );
}
