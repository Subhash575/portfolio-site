import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pilot CLI case study",
  description:
    "How Subhash Rana built Pilot CLI, a terminal AI coding agent, and used evals to raise its tool-selection score from 0.778 to 1.0.",
};

const REPO = "https://github.com/Subhash575/pilot-cli";

// Facts on this page come from the public repo (code + commit history); update when the repo changes.
const stats = [
  { big: "0.778 → 1.0", label: "tool-selection score", sub: "file-tools eval set", hot: true },
  { big: "Solo", label: "end to end", sub: "loop, tools, UI, evals" },
  { big: "Traced", label: "every eval run", sub: "in Laminar" },
];

const pipe = [
  { label: "Ink terminal", sub: "user prompt" },
  { label: "Agent", sub: "AI SDK + Gemini", hot: true },
  { label: "Approval", sub: "y / n prompt" },
  { label: "Tools", sub: "Zod schemas" },
];

const next = [
  "Make the loop multi-turn",
  "Put the approval prompt in front of every file and shell tool",
  "Add evals for tool ordering and forbidden-tool avoidance",
];

export default function PilotCliCaseStudy() {
  return (
    <main className="cs">
      <Link href="/#work" className="cs-back">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
      </Link>

      <section className="cs-hero">
        <Reveal className="cs-head">
          <span className="label">case study · 2026 · in progress</span>
          <h1>
            Pilot <span>CLI</span>
          </h1>
          <p className="cs-lead">
            A terminal AI coding agent in TypeScript, with tool calling, an approval prompt and an
            eval suite that scores how well it picks tools.
          </p>
          <div className="cs-tags">
            {["TypeScript", "Vercel AI SDK", "Gemini", "Ink", "Zod", "Laminar"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="cs-cta">
            <a href={REPO} target="_blank" rel="noreferrer" className="hirek">
              View the code <span>↗</span>
            </a>
            <a href="#hard" className="cs-ghost">
              jump to the hard part ↓
            </a>
          </div>
        </Reveal>

        <Reveal className="cs-term">
          <div className="cs-term-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>pilot · illustrative session</span>
          </div>
          <pre aria-hidden="true">
            <span className="d">$ </span>pilot{"\n"}
            <span className="o">› </span>what does the agent loop do?{"\n"}
            <span className="d">  tool </span>
            <span className="g">readFile</span>
            <span className="d">(&quot;src/agent.ts&quot;)</span>
            {"\n"}
            <span className="y">  approve this tool call? [y/n] </span>
            <span className="cur" />
          </pre>
        </Reveal>
      </section>

      <Reveal className="cs-stats">
        {stats.map((s) => (
          <div key={s.label} className={`cs-stat${s.hot ? " hot" : ""}`}>
            <b>{s.big}</b>
            <span>{s.label}</span>
            <small>{s.sub}</small>
          </div>
        ))}
      </Reveal>

      <div className="cs-flow">
        <Reveal className="cs-step">
          <i className="cs-node">01</i>
          <div className="cs-card">
            <span className="label">the problem</span>
            <h2>AI assistants feel like black boxes</h2>
            <p>
              AI coding assistants feel like black boxes. I wanted to build one myself to understand
              how an agent decides which tool to call, and to measure whether it calls the right one.
            </p>
          </div>
        </Reveal>

        <Reveal className="cs-step">
          <i className="cs-node">02</i>
          <div className="cs-card">
            <span className="label">my part</span>
            <h2>All of it, solo</h2>
            <ul className="cs-chips">
              {["Agent loop", "Tool definitions", "Terminal UI", "Approval prompt", "Eval suite"].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="cs-step">
          <i className="cs-node">03</i>
          <div className="cs-card">
            <span className="label">what I built</span>
            <h2>One prompt, four stops, one scorer</h2>
            <ol className="cs-pipe">
              {pipe.map((n) => (
                <li key={n.label} className={n.hot ? "hot" : ""}>
                  <b>{n.label}</b>
                  <small>{n.sub}</small>
                </li>
              ))}
            </ol>
            <div className="cs-evalbar">
              <b>Eval suite</b>
              <span>mocked tools · precision/recall score · Laminar</span>
            </div>
            <p>
              The agent sends the prompt and Zod-typed tool schemas to Gemini through the Vercel AI
              SDK. Tool calls go through an approval prompt in the Ink UI before they run. The eval
              suite replays a dataset against mocked tools and scores tool selection with a
              precision/recall (F1-style) evaluator.
            </p>
          </div>
        </Reveal>

        <Reveal className="cs-step">
          <i className="cs-node">04</i>
          <div className="cs-card" id="hard">
            <span className="label">the hard part</span>
            <h2>The model kept picking the wrong file tool</h2>
            <p>My file-tools eval scored tool selection at 0.778.</p>
            <div className="cs-dx">
              <div>
                <small>cause</small>
                <b>Vague tool descriptions, not the model</b>
              </div>
              <span aria-hidden="true">→</span>
              <div>
                <small>fix</small>
                <b>Rewrote readFile and listFiles so each says exactly when to use it</b>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="cs-step">
          <i className="cs-node">05</i>
          <div className="cs-card">
            <span className="label">results</span>
            <h2>Measured, not guessed</h2>
            <div className="cs-lcd" role="img" aria-label="Tool-selection score rose from 0.778 to 1.0">
              <i className="cs-led" />
              <div className="cs-lcd-row">
                <div>
                  <small>before</small>
                  <b className="was">0.778</b>
                </div>
                <span className="arr">→</span>
                <div>
                  <small>after</small>
                  <b className="now">1.0</b>
                </div>
                <em className="cs-gain">+28%</em>
              </div>
              <div className="cs-gauge" aria-hidden="true">
                <i className="was" />
                <i className="now" />
                <u />
              </div>
              <div className="cs-scale" aria-hidden="true">
                <span>0</span>
                <span>0.5</span>
                <span>1.0</span>
              </div>
            </div>
            <p>
              Tool-selection score on the file-tools eval set: 0.778 → 1.0. Every run is traced in
              Laminar, so a regression shows up as a number, not a hunch.
            </p>
          </div>
        </Reveal>

        <Reveal className="cs-step">
          <i className="cs-node dash">06</i>
          <div className="cs-card dash">
            <span className="label">what I&apos;d do next</span>
            <h2>Still on the bench</h2>
            <ul className="cs-todo">
              {next.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="cs-end">
        <p>Want to see how it works under the hood?</p>
        <div className="cs-cta">
          <a href={REPO} target="_blank" rel="noreferrer" className="hirek">
            View the code <span>↗</span>
          </a>
          <Link href="/#contact" className="cs-ghost">
            or say hi →
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
