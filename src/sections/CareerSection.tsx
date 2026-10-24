"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { internship, internshipSpan, milestones, now } from "@/data/experience";
import { reducedMotion } from "@/lib/wires";

const START = 2022;
const YEARS = 5;
const pct = (t: number) => ((t - START) / YEARS) * 100;

// Tape ticks: a long one per year (with a label), short ones per month.
const ticks = Array.from({ length: YEARS * 12 + 1 }, (_, i) => START + i / 12);

export default function CareerSection() {
  const [tab, setTab] = useState(internship.projects[0].id);
  const [hl, setHl] = useState(false);
  const order = useRef<HTMLElement>(null);
  const project = internship.projects.find((p) => p.id === tab)!;

  const showOrder = () => {
    order.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
    setHl(true);
    setTimeout(() => setHl(false), 1400);
  };

  return (
    <section className="cr" id="exp">
      <Reveal className="cr-head">
        <span className="label">03 · career</span>
        <p className="ab3-hand">how far I&apos;ve come</p>
        <h2>Career so far</h2>
        <p className="cr-hint">Pull the tape: every mark is something real.</p>
      </Reveal>
      <Reveal className="cr-mat">
        <div className="cr-tapewrap">
          <div className="cr-case" aria-hidden="true">
            <span>
              career
              <br />
              tape
            </span>
            <i />
          </div>
          <div className="cr-track">
            <div className="cr-tape" role="img" aria-label="Timeline from 2022 to 2027">
              <div className="cr-span" style={{ "--a": internshipSpan.from, "--b": internshipSpan.to } as React.CSSProperties} />
              {ticks.map((t, i) => {
                const year = i % 12 === 0;
                const y = Math.round(t);
                return (
                  <span key={i}>
                    <i className={`tk ${year ? "y" : "m"}`} style={{ left: `${pct(t)}%` }} />
                    {year && y < START + YEARS && (
                      <span className={`yl${t >= internshipSpan.from && t <= internshipSpan.to ? " inv" : ""}`} style={{ left: `${pct(t) + (y === START ? 3 : 0)}%` }}>
                        {y}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            <div className="cr-hook" aria-hidden="true" />
            {milestones.map((m) => (
              <div key={m.title} className={`cr-mk up ${m.row}`} style={{ "--t": m.t } as React.CSSProperties}>
                <b>{m.title}</b>
                <small>{m.sub}</small>
              </div>
            ))}
            <button className="cr-mk dn band" style={{ "--t": (internshipSpan.from + internshipSpan.to) / 2 } as React.CSSProperties} onClick={showOrder}>
              <b>SDE Intern · Matchbest</b>
              <small>{internship.duration}</small>
            </button>
            <div className="cr-mk dn now" style={{ "--t": now } as React.CSSProperties}>
              <b>you are here</b>
            </div>
            <a className="cr-next" href="#contact">
              next: SDE-1 →
            </a>
          </div>
        </div>

        <div className="cr-orders">
          <article className={`cr-wo${hl ? " hl" : ""}`} ref={order}>
            <span className="cr-clip" aria-hidden="true" />
            <span className="cr-stamp" aria-hidden="true">
              completed
            </span>
            <header>
              <span className="cr-no">work order #01</span>
              <h3>{internship.role}</h3>
              <p>
                <b>{internship.company}</b> · {internship.location} · {internship.duration}
              </p>
            </header>
            <div className="cr-tabs" role="tablist" aria-label="Client projects">
              {internship.projects.map((p) => (
                <button key={p.id} role="tab" aria-selected={p.id === tab} onClick={() => setTab(p.id)}>
                  {p.name}
                </button>
              ))}
            </div>
            <div className="cr-pane wk-swap" key={tab} role="tabpanel">
              <ul>
                {project.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="stk">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </article>
          <article className="cr-wo blank">
            <span className="cr-no">work order #02</span>
            <h3>SDE-1 · 2026</h3>
            <p className="cr-blank">Your team?</p>
            <ul>
              <li>Full-stack + AI agents</li>
              <li>Remote or on-site</li>
              <li>Ready to ship from day one</li>
            </ul>
            <a className="hirek" href="#contact">
              Hire me <span>↵</span>
            </a>
          </article>
        </div>
        <span className="matlbl">career · measured</span>
      </Reveal>
    </section>
  );
}
