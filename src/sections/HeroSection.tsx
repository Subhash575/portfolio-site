"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/data";
import { trackLink } from "@/lib/track";
import { curve, rectIn, reducedMotion, useMeasured } from "@/lib/wires";
import { AskPilot, Commits, QuickActions, RoleCard } from "./hero/SideCards";

const PHOTO = "/images/Subhash_pic.png";
const HEADLINE = [
  { t: "I build ", em: false },
  { t: "AI agents", em: true },
  { t: "\n", em: false },
  { t: "that actually ship.", em: false },
];
const HEAD_LEN = HEADLINE.reduce((n, s) => n + s.t.length, 0);

type KeyDef = { k: string; href: string; label: string; cap?: string; led?: string; cls?: string };
const KEYS: KeyDef[] = [
  { k: "v", href: siteConfig.resume, label: "Download CV (V)", cap: "V" },
  { k: "a", href: "#about", label: "About me (A)", cls: "photo" },
  { k: "p", href: "#work", label: "Projects (P)", cap: "P", led: "var(--or)" },
  { k: "e", href: "#exp", label: "Experience (E)", cap: "E", led: "#7c5cff" },
  { k: "c", href: "#contact", label: "Contact (C)", cap: "C", led: "#16a34a" },
  { k: "enter", href: "#contact", label: "Hire me (Enter)", cap: "↵", cls: "enter" },
  { k: " ", href: "#contact", label: "Open to SDE-1 roles (Space)", cls: "space" },
];
const KEY_TEXT: Record<string, string> = { v: "cv ⤓", p: "projects", e: "experience", c: "contact" };

function go(href: string) {
  if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  else window.open(href, "_blank");
}

type Wire = { d: string; plug: { x: number; y: number; w: number; h: number }; port: { x: number; y: number; w: number; h: number } };

export default function HeroSection() {
  const mat = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const kb = useRef<HTMLDivElement>(null);
  const kbWrap = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const you = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const keyEls = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [down, setDown] = useState<string | null>(null);
  const [typed, setTyped] = useState(HEAD_LEN);
  const [me, setMe] = useState({ x: -60, y: -40 });
  const [bursts, setBursts] = useState<{ id: number; d: string }[]>([]);

  const press = useCallback((k: string) => {
    setDown(k);
    setTimeout(() => setDown((cur) => (cur === k ? null : cur)), 180);
  }, []);

  // Cables: four side cards into the keyboard edges, keyboard up into the display.
  const [wires] = useMeasured<Wire[]>(() => {
    if (!mat.current || !kb.current || !screen.current) return [];
    const box = mat.current.getBoundingClientRect();
    const k = rectIn(kb.current, box);
    const out: Wire[] = [];
    cards.current.forEach((c, i) => {
      if (!c || c.offsetParent === null) return;
      const r = rectIn(c, box);
      const left = i < 2;
      const a = { x: left ? r.right : r.left, y: r.top + r.height / 2 };
      const b = { x: left ? k.left : k.right, y: k.top + k.height * (i % 2 ? 0.72 : 0.3) };
      out.push({
        d: curve(a, b),
        plug: { x: left ? a.x - 2 : a.x - 8, y: a.y - 5, w: 10, h: 10 },
        port: { x: left ? b.x - 7 : b.x - 1, y: b.y - 6, w: 8, h: 12 },
      });
    });
    const s = rectIn(screen.current, box);
    const cx = k.left + k.width / 2;
    if (out.length && k.top - s.bottom > 6) {
      out.push({ d: `M${cx} ${k.top} L${cx} ${s.bottom}`, plug: { x: cx - 6, y: s.bottom - 3, w: 12, h: 6 }, port: { x: cx - 6, y: k.top - 3, w: 12, h: 6 } });
    }
    return out;
  }, []);

  // A side card was used: flash its cable, then press the matching key.
  const signal = useCallback(
    (card: number, key: string) => {
      const w = wires[card];
      if (w && !reducedMotion()) {
        const id = Date.now() + card;
        setBursts((b) => [...b, { id, d: w.d }]);
        setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 700);
      }
      if (key) setTimeout(() => press(key), 560);
    },
    [wires, press],
  );

  // The keyboard types the headline on load, pressing keys as it goes.
  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setTyped(i);
      if (i % 2 === 0) press(["p", "e", "c", "v", "enter", " "][(i * 7) % 6]);
      if (i < HEAD_LEN) t = setTimeout(step, 55);
    };
    t = setTimeout(() => {
      setTyped(0);
      t = setTimeout(step, 120);
    }, 350);
    return () => clearTimeout(t);
  }, [press]);

  // Real keyboard: P / E / C / V / Enter press the keycap and jump there.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof Element && e.target.closest("input, textarea, select, button, [contenteditable]")) return;
      const key = KEYS.find((x) => x.k === e.key.toLowerCase() && x.k !== " ");
      if (!key) return;
      press(key.k);
      trackLink(key.href, key.label, "hero-keyboard");
      setTimeout(() => go(key.href), 160);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  // "Subhash" cursor walks the keys; "you" cursor follows the visitor.
  useEffect(() => {
    if (reducedMotion()) return;
    const tour = ["p", "e", "c", "enter", "a"];
    let n = 0;
    const id = setInterval(() => {
      const k = keyEls.current[tour[n++ % tour.length]];
      const w = kbWrap.current;
      if (!k || !w) return;
      const r = k.getBoundingClientRect();
      const b = w.getBoundingClientRect();
      setMe({ x: r.left - b.left + r.width * 0.55, y: r.top - b.top + r.height * 0.45 });
      setTimeout(() => press(k.dataset.k!), 950);
    }, 2600);
    const h = hero.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const move = (e: PointerEvent) => {
      const el = you.current;
      if (!el || !h) return;
      const b = h.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.transform = `translate(${e.clientX - b.left + 14}px, ${e.clientY - b.top + 12}px)`;
    };
    const leave = () => you.current && (you.current.style.opacity = "0");
    if (fine && h) {
      h.addEventListener("pointermove", move);
      h.addEventListener("pointerleave", leave);
    }
    return () => {
      clearInterval(id);
      h?.removeEventListener("pointermove", move);
      h?.removeEventListener("pointerleave", leave);
    };
  }, [press]);

  // Render the headline up to `typed` characters.
  let left = typed;
  const head = HEADLINE.map((s, i) => {
    const part = s.t.slice(0, Math.max(0, left));
    left -= s.t.length;
    if (s.t === "\n") return part ? <br key={i} /> : null;
    return s.em ? <em key={i}>{part}</em> : <span key={i}>{part}</span>;
  });

  return (
    <header className="khero" id="top" ref={hero}>
      <div className="kmat" ref={mat}>
        <svg className="cables" aria-hidden="true">
          {wires.map((w, i) => (
            <g key={i}>
              <path d={w.d} className="wire" />
              <path d={w.d} className="sig" style={{ animationDelay: `${-i * 0.8}s` }} />
              <rect x={w.plug.x} y={w.plug.y} width={w.plug.w} height={w.plug.h} rx={3} className="plug" />
              <rect x={w.port.x} y={w.port.y} width={w.port.w} height={w.port.h} rx={2} className="port" />
            </g>
          ))}
          {bursts.map((b) => (
            <path key={b.id} d={b.d} pathLength={100} className="burst" />
          ))}
        </svg>

        <div className="dsp" ref={screen}>
          <div className="sbar">
            <i />
            <i />
            <i />
            <span>display · subhash.live</span>
          </div>
          <span className="eyebrow">
            <Image src={PHOTO} alt="Subhash Rana" width={38} height={38} priority />
            <span>
              Hi, I&apos;m <b>Subhash Rana</b> · SDE intern @ Matchbest
            </span>
            <span className="kdot" title="Open to work" />
          </span>
          <h1 aria-label="I build AI agents that actually ship.">
            <span aria-hidden="true">
              {head}
              {typed < HEAD_LEN && <span className="tcaret" />}
            </span>
          </h1>
          <p className="lead">Full-stack engineer, B.Tech CSE &apos;26. Next.js, Node and terminal agents with evals that prove they work.</p>
        </div>

        <aside className="rail l" aria-label="Role fit and quick actions">
          <RoleCard ref={(el) => void (cards.current[0] = el)} onSignal={(k) => signal(0, k)} />
          <QuickActions ref={(el) => void (cards.current[1] = el)} onSignal={(k) => signal(1, k)} />
        </aside>

        <div className="kbwrap" ref={kbWrap}>
          <div className="kb" ref={kb}>
            {KEYS.map((key) => (
              <a
                key={key.k}
                ref={(el) => void (keyEls.current[key.k] = el)}
                data-k={key.k}
                className={`key${key.cls ? " " + key.cls : ""}${down === key.k ? " down" : ""}`}
                href={key.href}
                aria-label={key.label}
                {...(key.k === "v" ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {key.cls === "photo" ? (
                  <>
                    <Image src={PHOTO} alt="" width={86} height={86} />
                    <span className="lbl"><span className="dx">A · </span>about<span className="dx"> me</span></span>
                  </>
                ) : key.cls === "space" ? (
                  <>
                    <span className="kdot" />
                    <span className="lbl">open to SDE-1 roles · 2026</span>
                  </>
                ) : key.cls === "enter" ? (
                  <>
                    <span className="cap">↵</span>
                    <span className="lbl">
                      hire
                      <br />
                      me
                    </span>
                  </>
                ) : (
                  <>
                    {key.led && <span className="led" style={{ background: key.led }} />}
                    <span className="cap">{key.cap}</span>
                    <span className="lbl">
                      {key.k === "e" ? (
                        <>
                          exp<span className="dx">erience</span>
                          <span className="sx">.</span>
                        </>
                      ) : (
                        KEY_TEXT[key.k]
                      )}
                    </span>
                  </>
                )}
              </a>
            ))}
          </div>
          <div className="cur me" aria-hidden="true" style={{ transform: `translate(${me.x}px, ${me.y}px)` }}>
            <svg viewBox="0 0 20 20">
              <path d="M2 2 L18 9 L10 11 L7 18 Z" fill="#ff6b1a" stroke="#fff" strokeWidth="1.5" />
            </svg>
            <span>Subhash</span>
          </div>
        </div>

        <aside className="rail r" aria-label="Ask Pilot and recent commits">
          <AskPilot ref={(el) => void (cards.current[2] = el)} onSignal={(k) => signal(2, k)} />
          <Commits ref={(el) => void (cards.current[3] = el)} onSignal={(k) => signal(3, k)} />
        </aside>
        <span className="matlbl">subhash&apos;s workbench · v2026</span>
      </div>

      <div className="kfoot">
        <span className="hint">
          press <kbd>P</kbd> <kbd>E</kbd> <kbd>C</kbd>{" "}
          <span className="kdesk">
            or <kbd>↵</kbd> on your keyboard,
          </span>{" "}
          or tap a key
        </span>
        <div className="ksections">
          <a href="#work">
            <i style={{ background: "var(--or)" }} />
            Projects
          </a>
          <a href="#exp">
            <i style={{ background: "#7c5cff" }} />
            Experience
          </a>
          <a href="#contact">
            <i style={{ background: "#16a34a" }} />
            Contact
          </a>
          <a href={siteConfig.resume} download>
            <i style={{ background: "var(--ink)" }} />
            Download CV
          </a>
        </div>
      </div>
      <div className="cur you" ref={you} aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path d="M2 2 L18 9 L10 11 L7 18 Z" fill="#7c5cff" stroke="#fff" strokeWidth="1.5" />
        </svg>
        <span>you (recruiter?)</span>
      </div>
    </header>
  );
}
