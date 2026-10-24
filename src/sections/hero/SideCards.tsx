"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { pilotFaq, recentCommits, roleFit, type FaqKey, type Role } from "@/data/hero";
import { siteConfig } from "@/lib/data";
import { reducedMotion } from "@/lib/wires";

// Each card calls onSignal(key) so the hero can pulse its cable and press that key.
type CardProps = { onSignal: (key: string) => void };

export const RoleCard = forwardRef<HTMLDivElement, CardProps>(function RoleCard({ onSignal }, ref) {
  const [role, setRole] = useState<Role>("fs");
  const fit = roleFit[role];
  return (
    <div className="rc" ref={ref}>
      <p className="rk">hiring for?</p>
      <div className="roles" role="group" aria-label="Pick a role">
        {(Object.keys(roleFit) as Role[]).map((r) => (
          <button
            key={r}
            aria-pressed={role === r}
            onClick={() => {
              setRole(r);
              onSignal("p");
            }}
          >
            {roleFit[r].label}
          </button>
        ))}
      </div>
      <div className="fit fade" key={role} aria-live="polite">
        <div className="lvl">
          {fit.verdict}
          <i>
            {[1, 2, 3, 4].map((i) => (
              <b key={i} className={i <= fit.level ? "on" : ""} />
            ))}
          </i>
        </div>
        <p>
          <strong>Best proof:</strong> {fit.proof}
        </p>
        <p>{fit.skills}</p>
      </div>
    </div>
  );
});

export const QuickActions = forwardRef<HTMLDivElement, CardProps>(function QuickActions({ onSignal }, ref) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async () => {
    onSignal("c");
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied("copied ✓");
    } catch {
      setCopied("blocked");
    }
    setTimeout(() => setCopied(null), 1800);
  };
  return (
    <div className="rc" ref={ref}>
      <p className="rk">quick actions</p>
      <div className="qa">
        <button type="button" onClick={copy}>
          Copy email <small>{copied ?? "⧉"}</small>
        </button>
        <a href={siteConfig.resume} download onClick={() => onSignal("v")}>
          Download CV <small>PDF · 1 page</small>
        </a>
        <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" onClick={() => onSignal("c")}>
          Message on LinkedIn <small>↗</small>
        </a>
      </div>
    </div>
  );
});

const faqOrder: FaqKey[] = ["ai", "docker", "tests", "hire"];

export const AskPilot = forwardRef<HTMLDivElement, CardProps>(function AskPilot({ onSignal }, ref) {
  const [q, setQ] = useState<FaqKey>("ai");
  const [typed, setTyped] = useState(Infinity);
  const [down, setDown] = useState<FaqKey | null>(null);
  const auto = useRef<ReturnType<typeof setInterval> | null>(null);

  // Type the answer out each time the question changes.
  useEffect(() => {
    if (reducedMotion()) return;
    const full = pilotFaq[q].a.length + 2;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= full) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [q]);

  // Cycle through questions until the visitor presses a key.
  useEffect(() => {
    if (reducedMotion()) return;
    let n = 0;
    auto.current = setInterval(() => setQ(faqOrder[++n % faqOrder.length]), 5200);
    return () => {
      if (auto.current) clearInterval(auto.current);
    };
  }, []);

  const ask = (k: FaqKey) => {
    if (auto.current) clearInterval(auto.current);
    setDown(k);
    setTimeout(() => setDown(null), 150);
    setTyped(0);
    setQ(k);
    onSignal(k === "hire" ? "enter" : "p");
  };

  const answer = `› ${pilotFaq[q].a}`;
  const shown = answer.slice(0, typed);
  return (
    <div className="rc" ref={ref}>
      <p className="rk">
        ask pilot <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 600 }}>press a key</span>
      </p>
      <div className="pdev">
        <div className="top">
          <i />
          <i />
          <i />
          <span>pilot · faq</span>
        </div>
        <div className="pscreen" aria-live="polite">
          <div className="q">$ {pilotFaq[q].q}</div>
          <div className="a">
            {shown}
            {shown.length < answer.length && <span className="caret" />}
          </div>
        </div>
      </div>
      <div className="mkeys" role="group" aria-label="Questions">
        {faqOrder.map((k) => (
          <button key={k} aria-pressed={q === k} className={down === k ? "down" : undefined} onClick={() => ask(k)}>
            {{ ai: "AI", docker: "Docker", tests: "Tests", hire: "Hire?" }[k]}
          </button>
        ))}
      </div>
    </div>
  );
});

export const Commits = forwardRef<HTMLDivElement, CardProps>(function Commits({ onSignal }, ref) {
  return (
    <div className="rc" ref={ref} onMouseEnter={() => onSignal("")}>
      <p className="rk">
        recent commits{" "}
        <a href={siteConfig.github} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "var(--ort)", textTransform: "none", letterSpacing: 0 }}>
          GitHub ↗
        </a>
      </p>
      <ul className="graph">
        {recentCommits.map((c) => (
          <li key={c.msg}>
            <p>{c.msg}</p>
            <small>
              <b>{c.repo}</b>
              {c.date}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
});
