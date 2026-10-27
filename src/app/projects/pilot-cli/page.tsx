import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CaseFlow from "@/components/CaseFlow";
import Reveal from "@/components/Reveal";
import EvalBench from "./EvalBench";

export const metadata: Metadata = {
  title: "Pilot CLI case study",
  description:
    "How Subhash Rana built Pilot CLI, a terminal AI coding agent, and used evals to raise its tool-selection score from 0.778 to 1.0.",
};

const REPO = "https://github.com/Subhash575/pilot-cli";

// Facts on this page come from the public repo (code + commit history); update when the repo changes.
const stats = [
  { big: "0.778 → 1.0", label: "tool-selection score", sub: "file-tools eval set", hot: true },
  { big: "Solo", label: "built end to end", sub: "loop, tools, UI, evals" },
  { big: "Traced", label: "every eval run", sub: "in Laminar" },
];

const mine = ["Agent loop", "Tool definitions", "Terminal UI", "Approval prompt", "Eval suite"];

const pipe = [
  { label: "Ink terminal", sub: "user prompt" },
  { label: "Agent", sub: "AI SDK + Gemini", hot: true },
  { label: "Approval", sub: "y / n prompt" },
  { label: "Tools", sub: "Zod schemas" },
];

const next = ["Make the loop multi-turn", "Approval prompt on every file and shell tool", "Evals for tool ordering and forbidden-tool avoidance"];

export default function PilotCliCaseStudy() {
  return (
    <main className="cs">
      <Link href="/#work" className="cs-back">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
      </Link>

      <Reveal className="cs-mat">
        <div className="cs-hero">
          <div className="cs-head">
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
              <a href="#bench" className="cs-ghost">
                jump to the eval bench ↓
              </a>
            </div>
          </div>

          <div className="cs-mon" aria-hidden="true">
            <div className="cs-bezel">
              <div className="cs-screen">
                <div className="cs-term-bar">
                  <i />
                  <i />
                  <i />
                  <span>pilot · illustrative session</span>
                </div>
                <pre>
                  <span className="d">$ </span>pilot{"\n"}
                  <span className="o">› </span>what does the agent loop do?{"\n"}
                  <span className="d">  tool </span>
                  <span className="g">readFile</span>
                  <span className="d">(&quot;src/agent.ts&quot;)</span>
                  {"\n"}
                  <span className="y">  approve this tool call? [y/n] </span>
                  <span className="cur" />
                </pre>
              </div>
              <i className="cs-pwr" />
            </div>
            <div className="cs-neck" />
            <div className="cs-base" />
          </div>
        </div>

        <ul className="cs-keys">
          {stats.map((s) => (
            <li key={s.label} className={s.hot ? "hot" : ""}>
              <b>{s.big}</b>
              <span>{s.label}</span>
              <small>{s.sub}</small>
            </li>
          ))}
        </ul>
        <span className="matlbl">case study · pilot cli</span>
      </Reveal>

      <CaseFlow>
        <Reveal className="cs-step l">
          <i className="cs-node">01</i>
          <div className="cs-card cs-black">
            <div className="cs-cube" aria-hidden="true">?</div>
            <div>
              <span className="label">the problem</span>
              <h2>Why I built it</h2>
              <p>
                AI coding assistants feel like black boxes. I wanted to build one myself to understand
                how an agent decides which tool to call, and to measure whether it calls the right one.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="cs-step r">
          <i className="cs-node">02</i>
          <div className="cs-card">
            <span className="label">my part</span>
            <h2>All of it, solo</h2>
            <ul className="cs-chips">
              {mine.map((t, i) => (
                <li key={t}>
                  <small>{i + 1}</small>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="cs-step wide">
          <i className="cs-node">03</i>
          <div className="cs-card">
            <span className="label">what I built</span>
            <h2>How a prompt moves through Pilot</h2>
            <ol className="cs-pipe">
              {pipe.map((n) => (
                <li key={n.label} className={n.hot ? "hot" : ""}>
                  <i className="cs-dot" />
                  <b>{n.label}</b>
                  <small>{n.sub}</small>
                </li>
              ))}
            </ol>
            <div className="cs-evalbar">
              <i className="cs-up" aria-hidden="true">↑</i>
              <b>Eval suite</b>
              <span>replays prompts against mocked tools · scores the agent&apos;s pick · traced in Laminar</span>
            </div>
            <p>
              The agent sends the prompt and Zod-typed tool schemas to Gemini through the Vercel AI
              SDK. Tool calls go through an approval prompt in the Ink UI before they run. The eval
              suite replays a dataset against mocked tools and scores tool selection with a
              precision/recall (F1-style) evaluator.
            </p>
          </div>
        </Reveal>

        <Reveal className="cs-step wide">
          <i className="cs-node">04</i>
          <div className="cs-card" id="bench">
            <span className="label">the hard part · results</span>
            <h2>The model kept picking the wrong file tool</h2>
            <p>
              My file-tools eval scored tool selection at 0.778. The cause was vague tool
              descriptions, not the model: after rewriting the readFile and listFiles descriptions so
              each one says exactly when to use it, the score went to 1.0. Try it.
            </p>
            <EvalBench />
            <p>
              Every run is traced in Laminar, so a regression shows up as a lower score.
            </p>
          </div>
        </Reveal>

        <Reveal className="cs-step l">
          <i className="cs-node dash">05</i>
          <div className="cs-card dash">
            <span className="label">what I&apos;d do next</span>
            <h2>Cables not plugged in yet</h2>
            <ul className="cs-unplug">
              {next.map((t) => (
                <li key={t}>
                  <i aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </CaseFlow>

      <Reveal className="cs-end">
        <p>The full code is on GitHub.</p>
        <div className="cs-cta">
          <a href={REPO} target="_blank" rel="noreferrer" className="hirek">
            View the code <span>↗</span>
          </a>
          <Link href="/#contact" className="cs-ghost">
            or say hi →
          </Link>
        </div>
        <span className="matlbl">case study · plug in</span>
      </Reveal>
    </main>
  );
}
