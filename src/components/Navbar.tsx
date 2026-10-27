"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About", key: "A" },
  { id: "work", label: "Work", key: "P" },
  { id: "exp", label: "Career", key: "E" },
  { id: "contact", label: "Contact", key: "C" },
];

export default function Navbar() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [ind, setInd] = useState({ x: 4, w: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const moveTo = (id: string) => {
    const a = linkRefs.current[id];
    if (a) setInd({ x: a.offsetLeft, w: a.offsetWidth });
  };

  // Active section follows scroll.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Slide the keycap indicator under the active link (also after fonts load / resize).
  useEffect(() => {
    const sync = () => {
      const a = linkRefs.current[active];
      if (a) setInd({ x: a.offsetLeft, w: a.offsetWidth });
    };
    sync();
    document.fonts?.ready.then(sync);
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [active]);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : undefined}>
      <div className="navbar">
        <a className="brand" href="#top" aria-label="Subhash Rana, home">
          <span className="bk">
            SR<i />
          </span>
          <span className="bt">
            <b>Subhash Rana</b>
            <small>full-stack · AI agents</small>
          </span>
        </a>
        <div className="seg" onMouseLeave={() => moveTo(active)}>
          <span className="ind" aria-hidden="true" style={{ width: ind.w, transform: `translateX(${ind.x}px)` }} />
          {links.map((l) => (
            <a
              key={l.id}
              ref={(el) => {
                linkRefs.current[l.id] = el;
              }}
              className={`sl${active === l.id ? " on" : ""}`}
              href={`/#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              onMouseEnter={() => moveTo(l.id)}
              onClick={() => setActive(l.id)}
            >
              {l.label} {l.key && <kbd>{l.key}</kbd>}
            </a>
          ))}
        </div>
        <div className="nright">
          <span className="avail">
            <i />
            Available · 2026
          </span>
          <Link className="hirek" href="/#contact">
            Hire me <span>↵</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
