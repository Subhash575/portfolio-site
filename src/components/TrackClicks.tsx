"use client";

import { useEffect } from "react";
import { trackLink } from "@/lib/track";

// One listener for every link on the page, so sections don't each need tracking code.
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!a) return;
      const label = a.getAttribute("aria-label") ?? a.innerText.replace(/\s+/g, " ").trim();
      trackLink(a.href, label, a.closest("section")?.id || (a.closest("nav, header") ? "nav" : "page"));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
