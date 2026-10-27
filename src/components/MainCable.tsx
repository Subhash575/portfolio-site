"use client";

import { useEffect, useRef, useState } from "react";

// One cable runs from the hero keyboard down the page, plugging into each section through the key that opens it.
const STOPS = [
  { href: "#about", head: ".ab3-head", mat: ".ab3-mat", cap: "A", led: "#ff6b1a", n: "01", note: "a bit about me" },
  { href: "#work", head: ".wk-head", mat: ".wk-mat", cap: "P", led: "#ff6b1a", n: "02", note: "things I built" },
  { href: "#exp", head: ".cr-head", mat: ".cr-mat", cap: "E", led: "#7c5cff", n: "03", note: "how far I've come" },
  { href: "#contact", head: ".ct-head", mat: ".ct-mat", cap: "C", led: "#16a34a", n: "04", note: "let's talk" },
];

type Box = { l: number; t: number; r: number; b: number; w: number; h: number };
type Layout = {
  d: string;
  start: { x: number; y: number } | null;
  end: { x: number; y: number };
  ports: { x: number; y: number }[];
  tags: { x: number; y: number }[];
  branches: { d: string; x: number; y: number; at: number }[];
};

function measure(main: HTMLElement): Layout | null {
  // Layout offsets, not getBoundingClientRect: sections still waiting to fade in are shifted by a transform.
  const rel = (sel: string): Box | null => {
    const el = main.querySelector<HTMLElement>(sel);
    if (!el) return null;
    let l = 0, t = 0;
    for (let n: HTMLElement | null = el; n && n !== main; n = n.offsetParent as HTMLElement | null) {
      l += n.offsetLeft;
      t += n.offsetTop;
    }
    return { l, t, r: l + el.offsetWidth, b: t + el.offsetHeight, w: el.offsetWidth, h: el.offsetHeight };
  };
  const hero = rel(".kmat"), first = rel(".ab3-mat"), send = rel(".ct-letter .hirek"), letter = rel(".ct-letter");
  if (!hero || !first || !send || !letter) return null;

  const mobile = window.innerWidth <= 760;
  const gx = mobile ? 14 : first.l - 36;
  const sy = mobile ? hero.b + 10 : hero.b - 70;
  // Phone: leave from the keyboard's bottom-left corner so the cable never crosses the "press P E C" hint.
  const hx = hero.l + 10;
  let d = mobile ? `M${hx} ${hero.b - 10} C${hx} ${sy + 30} ${gx} ${sy} ${gx} ${sy + 60}` : `M${hero.l + 2} ${sy} C${gx} ${sy} ${gx} ${sy} ${gx} ${sy + 40}`;

  const ports: Layout["ports"] = [], tags: Layout["tags"] = [], branches: Layout["branches"] = [];
  let prevBottom = rel(".kfoot")?.b ?? hero.b;
  for (const s of STOPS) {
    const h2 = rel(`${s.head} h2`), mat = rel(s.mat);
    if (!h2 || !mat) return null;
    const py = h2.t + h2.h / 2;
    d += ` L${gx} ${py}`;
    ports.push({ x: gx, y: py });
    tags.push({ x: gx, y: prevBottom + (h2.t - 30 - prevBottom) / 2 });
    if (!mobile) {
      const bx = mat.l + 34, by = mat.t + 4;
      branches.push({ d: `M${gx} ${by - 30} C${gx + 40} ${by - 30} ${bx} ${by - 30} ${bx} ${by}`, x: bx, y: by, at: py });
    }
    prevBottom = mat.b;
  }
  // Finish under the letter and up into its Send key.
  const sx = send.l + send.w / 2, uy = letter.b + 16;
  d += ` L${gx} ${uy - 30} Q${gx} ${uy} ${gx + 30} ${uy} L${sx - 24} ${uy} Q${sx} ${uy} ${sx} ${uy - 24} L${sx} ${send.b + 6}`;
  return { d, start: mobile ? null : { x: hero.l + 2, y: sy }, end: { x: sx, y: send.b + 2 }, ports, tags, branches };
}

export default function MainCable() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<SVGPathElement>(null);
  const glow = useRef<SVGPathElement>(null);
  const pct = useRef<HTMLElement>(null);
  const [lay, setLay] = useState<Layout | null>(null);

  // Re-measure after fonts and the entrance animation, on resize, and whenever the page's height changes.
  useEffect(() => {
    const main = root.current?.parentElement;
    if (!main) return;
    const run = () => setLay(measure(main));
    const t = setTimeout(run, 1100);
    const ro = new ResizeObserver(run);
    ro.observe(main);
    window.addEventListener("resize", run);
    document.fonts?.ready.then(run);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, []);

  // The signal fills the cable as you scroll; ports and branches light once the signal passes them.
  useEffect(() => {
    const path = fill.current, host = root.current;
    if (!lay || !path || !host) return;
    const L = path.getTotalLength();
    const samples: [number, number][] = [];
    for (let s = 0; s <= L; s += 8) samples.push([s, path.getPointAtLength(s).y]);
    const update = () => {
      const y = window.innerHeight * 0.62 - host.getBoundingClientRect().top;
      let len = 0;
      for (const [s, sy] of samples) if (sy <= y) len = s;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) len = L;
      path.style.strokeDasharray = `${len} ${L}`;
      if (glow.current) glow.current.style.strokeDasharray = `${len} ${L}`;
      const tip = path.getPointAtLength(len).y;
      host.querySelectorAll<HTMLElement | SVGElement>("[data-at]").forEach((el) => el.classList.toggle("on", tip >= Number(el.dataset.at) - 2));
      if (pct.current) pct.current.textContent = `${Math.round((len / L) * 100)}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [lay]);

  return (
    <>
      <div className="mc" ref={root} aria-hidden="true">
        {lay && (
          <>
            <svg>
              {lay.branches.map((b) => (
                <g key={b.at}>
                  <path d={b.d} className="br" data-at={b.at} />
                  <rect x={b.x - 7} y={b.y - 5} width={14} height={10} rx={3} className="plug" data-at={b.at} />
                </g>
              ))}
              <path d={lay.d} className="base" />
              <path d={lay.d} className="core" />
              <path d={lay.d} className="glow" ref={glow} />
              <path d={lay.d} className="fill" ref={fill} />
              <path d={lay.d} className="run" />
              {lay.start && <circle cx={lay.start.x} cy={lay.start.y} r={6} className="plug on" />}
              <rect x={lay.end.x - 8} y={lay.end.y} width={16} height={9} rx={3} className="plug" />
            </svg>
            {STOPS.map((s, i) => (
              <a key={s.href} className="mc-port" href={s.href} tabIndex={-1} data-at={lay.ports[i].y} style={{ left: lay.ports[i].x, top: lay.ports[i].y, "--led": s.led } as React.CSSProperties}>
                {s.cap}
                <i />
                <small>{s.n}</small>
              </a>
            ))}
            {STOPS.map((s, i) => (
              <div key={s.note} className="mc-tag" style={{ left: lay.tags[i].x, top: lay.tags[i].y }}>
                <span>{s.note}</span>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mc-meter" aria-hidden="true">
        signal · <b ref={pct}>0%</b>
      </div>
    </>
  );
}
