"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { integrations, projects, type Integration, type Project } from "@/data/projects";
import { siteConfig } from "@/lib/data";
import { curve, rectIn, reducedMotion, useMeasured } from "@/lib/wires";

const nodeIcons: Record<string, React.ReactNode> = {
  pilot: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M7 10l3 2-3 2M12 15h5" />
    </>
  ),
  task: (
    <>
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="10" y="4" width="5" height="11" rx="1.5" />
      <rect x="17" y="4" width="4" height="7" rx="1.5" />
    </>
  ),
  job: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5h6v2M3 12h18" />
    </>
  ),
};

const intIcons: Record<Integration, React.ReactNode> = {
  ai: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 4v4M9 13h.01M15 13h.01" />
    </>
  ),
  eval: <path d="M4 19h16M7 16V9M12 16V5M17 16v-4" />,
  mongo: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  docker: <path d="M3 13h16c0 4-3 7-8 7S3 17 3 13zM6 10h3v3H6zM9 10h3v3H9zM12 10h3v3h-3zM9 7h3v3H9z" />,
  auth: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
};

function Preview({ p }: { p: Project }) {
  if (p.preview === "terminal")
    return (
      <div className="pv-term">
        <span style={{ color: "#ff8a4c" }}>$</span>{" "}pilot &quot;list files in src&quot;
        <br />
        <span style={{ color: "#8a857c" }}>› tool: listFiles · approve? </span>
        <span style={{ color: "#ffd2b8" }}>y</span>
        <br />
        <span style={{ color: "#8a857c" }}>› 14 files found</span>
        <br />
        <span style={{ color: "#4ade80" }}>✓ done · eval score 1.0</span>
      </div>
    );
  if (p.preview === "board")
    return (
      <div className="pv-kan">
        {[["todo", 2], ["doing", 3], ["done", 1]].map(([name, n], col) => (
          <div key={name}>
            <b>{name}</b>
            {Array.from({ length: n as number }, (_, i) => (
              <span key={i} className={col === 1 && i === 0 ? "hot" : undefined} />
            ))}
          </div>
        ))}
      </div>
    );
  return (
    <div className="pv-job">
      {[["Frontend Engineer", "applied"], ["Backend Developer", "new"], ["SDE-1, Platform", "new"]].map(([t, s]) => (
        <div key={t}>
          <i />
          {t}
          <em>{s}</em>
        </div>
      ))}
    </div>
  );
}

type Paths = { left: { id: string; d: string; mid: { x: number; y: number } }[]; right: { id: Integration; d: string }[] };

export default function WorkSection() {
  const [cur, setCur] = useState(projects[0].id);
  const P = projects.find((p) => p.id === cur)!;
  const mat = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<(HTMLSpanElement | null)[]>([]);
  const intEls = useRef<(HTMLSpanElement | null)[]>([]);
  const auto = useRef<ReturnType<typeof setInterval> | null>(null);

  const [paths] = useMeasured<Paths>(() => {
    const out: Paths = { left: [], right: [] };
    if (!mat.current || !hub.current || hub.current.offsetParent === null) return out;
    const box = mat.current.getBoundingClientRect();
    const h = rectIn(hub.current, box);
    if (h.left < 20) return out; // stacked (mobile) layout: no wires
    projects.forEach((p, i) => {
      const n = nodeEls.current[i];
      if (!n) return;
      const r = rectIn(n, box);
      const d = curve({ x: r.right + 6, y: r.top + r.height / 2 }, { x: h.left - 6, y: h.top + h.height * (0.28 + i * 0.22) }, 0.5);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      const mid = path.getPointAtLength(path.getTotalLength() / 2);
      out.left.push({ id: p.id, d, mid: { x: mid.x, y: mid.y } });
    });
    integrations.forEach((it, i) => {
      const n = intEls.current[i];
      if (!n) return;
      const r = rectIn(n, box);
      out.right.push({ id: it.id, d: curve({ x: h.right + 6, y: h.top + h.height * (0.18 + i * 0.16) }, { x: r.left - 6, y: r.top + r.height / 2 }, 0.5) });
    });
    return out;
  }, { left: [], right: [] });

  // Cycle through projects until someone picks one.
  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0;
    auto.current = setInterval(() => setCur(projects[++i % projects.length].id), 6000);
    return () => {
      if (auto.current) clearInterval(auto.current);
    };
  }, []);

  const pick = (id: string) => {
    if (auto.current) clearInterval(auto.current);
    setCur(id);
  };

  const primary = P.caseStudyUrl ? { label: "Case study →", href: P.caseStudyUrl, ext: false } : { label: "Visit site ↗", href: P.liveUrl!, ext: true };

  return (
    <section className="wk" id="work">
      <Reveal className="wk-head">
        <span className="label">02 · work</span>
        <h2>Recent projects</h2>
        <a className="wk-gh" href={siteConfig.github} target="_blank" rel="noreferrer">
          All on GitHub ↗
        </a>
      </Reveal>
      <Reveal>
        <div className="wk-mat" ref={mat}>
          <svg className="wk-wires" aria-hidden="true">
            <defs>
              <marker id="wkar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill="context-stroke" />
              </marker>
            </defs>
            {paths.left.map((w) => {
              const p = projects.find((x) => x.id === w.id)!;
              const on = w.id === cur;
              return (
                <g key={w.id}>
                  <path d={w.d} className={`w ${on ? "on" : "dim"}`} stroke={p.color} markerEnd="url(#wkar)" />
                  {on && <path d={w.d} className="flow" stroke={p.color} />}
                </g>
              );
            })}
            {paths.right.map((w) => {
              const on = P.integrations.includes(w.id);
              return <path key={w.id} d={w.d} className={`w r ${on ? "on" : "dim"}`} style={on ? { stroke: P.color } : undefined} markerEnd="url(#wkar)" />;
            })}
          </svg>

          <div className="wk-col wk-left" role="group" aria-label="Projects">
            {projects.map((p, i) => (
              <button key={p.id} className="wk-node" aria-pressed={p.id === cur} style={{ "--c": p.color } as React.CSSProperties} onClick={() => pick(p.id)}>
                <span className="wk-ic" ref={(el) => void (nodeEls.current[i] = el)}>
                  <svg viewBox="0 0 24 24">{nodeIcons[p.id]}</svg>
                  <i className="st" />
                </span>
                <b>{p.title}</b>
                <small>{p.status}</small>
              </button>
            ))}
          </div>

          <div className="wk-hub" ref={hub} aria-live="polite" style={{ "--hc": P.color } as React.CSSProperties}>
            <div className="wk-hub-in wk-swap" key={cur}>
              <div className="wk-bar">
                <i />
                <i />
                <i />
                <span>{P.repoName}</span>
                <em>● {P.status}</em>
              </div>
              <div className="wk-prev">
                <Preview p={P} />
              </div>
              <div className="wk-body">
                <div className="wk-tt">
                  <h3>{P.title}</h3>
                  <span className="wk-kpi">{P.kpi}</span>
                </div>
                <p>{P.description}</p>
                <div className="wk-stack">
                  {P.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="wk-links">
                  <a className="pri" href={primary.href} {...(primary.ext ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {primary.label}
                  </a>
                  <a href={P.repoUrl} target="_blank" rel="noreferrer">
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="wk-col wk-right" aria-label="Integrations used" style={{ "--ic": P.color } as React.CSSProperties}>
            {integrations.map((it, i) => {
              const on = P.integrations.includes(it.id);
              return (
                <div key={it.id} className={`wk-int ${on ? "on" : "dim"}`}>
                  <span ref={(el) => void (intEls.current[i] = el)}>
                    <svg viewBox="0 0 24 24">{intIcons[it.id]}</svg>
                  </span>
                  <b>
                    {it.name}
                    <br />
                    <small>{it.sub}</small>
                  </b>
                </div>
              );
            })}
          </div>

          {paths.left.map((w) => {
            const p = projects.find((x) => x.id === w.id)!;
            return (
              <span key={w.id} className={`wk-pill${w.id === cur ? "" : " dim"}`} style={{ "--c": p.color, left: w.mid.x, top: w.mid.y } as React.CSSProperties}>
                {p.tag}
              </span>
            );
          })}
          <span className="matlbl">work · system map</span>
        </div>
      </Reveal>
    </section>
  );
}
