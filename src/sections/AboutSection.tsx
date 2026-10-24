"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { proofStats, skills, type Group } from "@/data/skills";
import { useMeasured } from "@/lib/wires";

const cards: { g: Group; cls: string; title: string; text: string; icon: React.ReactNode }[] = [
  {
    g: "ai",
    cls: "c-or",
    title: "AI agents",
    text: "Tool calling, approval flows and evals that measure tool choice.",
    icon: (
      <>
        <rect x="5" y="8" width="14" height="11" rx="3" />
        <path d="M12 4v4M9 13h.01M15 13h.01M3 13v2M21 13v2" />
      </>
    ),
  },
  {
    g: "fs",
    cls: "c-pe",
    title: "Full-stack apps",
    text: "Next.js, Node, PostgreSQL and MongoDB, with RBAC done right.",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="4" rx="1.5" />
        <rect x="13" y="10" width="7" height="10" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    g: "qa",
    cls: "c-wh",
    title: "Tested and secure",
    text: "JWT in HTTP-only cookies, IDOR-safe auth and real test suites.",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

export default function AboutSection() {
  const [g, setG] = useState<Group | null>(null);
  const lit = (groups: Group[]) => (!g ? "" : groups.includes(g) ? "lit" : "dim");

  // Cutting-mat ruler: a number every 120px (5 "cm").
  const [ruler, setRuler] = useState<HTMLDivElement | null>(null);
  const [marks] = useMeasured<number[]>(() => {
    const w = ruler?.clientWidth ?? 0;
    return Array.from({ length: Math.floor(w / 120) + 1 }, (_, i) => i * 120);
  }, []);

  return (
    <section className="ab" id="about">
      <Reveal className="ab3-head">
        <span className="label">01 · about</span>
        <h2>
          About <span>me</span>
        </h2>
        <p className="ab3-hint">Hover what I do to light up the tools and proof behind it.</p>
      </Reveal>
      <Reveal className="ab3-mat">
        <div className="ab3-panel">
          <i className="scr tl" />
          <i className="scr tr" />
          <i className="scr bl" />
          <i className="scr br" />
          <span className="ab3-port" aria-hidden="true" />
          <span className="ab3-etch">about.module · rev 2026</span>
          <div className="ab3-ruler" ref={setRuler} aria-hidden="true">
            {marks.map((x, i) => (
              <span key={x} style={{ left: x }}>
                {i * 5}
              </span>
            ))}
          </div>

          <div className="ab3-top">
            <div className="ab3-me">
              <span className="ab-ph">
                <Image src="/images/Subhash_pic.png" alt="Subhash Rana" width={72} height={72} />
              </span>
              <div>
                <b>Subhash Rana</b>
                <small>Full-stack engineer · AI agents</small>
                <p>
                  Based in NCR, India. I build full-stack apps with Next.js and Node, and terminal AI agents that call tools, ask before
                  risky actions, and get tested with evals.
                </p>
                <span className="ab3-edu">B.Tech CSE · CGPA 7.75 · St. Andrews Institute · 2022–26</span>
              </div>
            </div>
            <div className="ab3-stats">
              {proofStats.map((s) => (
                <div key={s.label} className={lit([s.group])}>
                  <b>
                    {s.display ?? <CountUp value={s.value} />}
                    {s.suffix && <i>{s.suffix}</i>}
                  </b>
                  <small>{s.label}</small>
                  <em>{s.source}</em>
                </div>
              ))}
            </div>
          </div>

          <p className="ab3-sub">What I do</p>
          <div className="ab3-cards" onMouseLeave={() => setG(null)}>
            {cards.map((c) => (
              <button
                key={c.g}
                className={`${c.cls}${g === c.g ? " on" : g ? " dim" : ""}`}
                onMouseEnter={() => setG(c.g)}
                onFocus={() => setG(c.g)}
                onClick={() => setG(g === c.g ? null : c.g)}
                aria-pressed={g === c.g}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {c.icon}
                </svg>
                <b>{c.title}</b>
                <small>{c.text}</small>
              </button>
            ))}
          </div>

          <div className="ab3-keys" aria-label="Skills">
            {skills.map((s) => (
              <span key={s.name} className={lit(s.groups)}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
