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
const sections = [
  {
    title: "The problem",
    body: "AI coding assistants feel like black boxes. I wanted to build one myself to understand how an agent decides which tool to call, and to measure whether it calls the right one.",
  },
  {
    title: "My part",
    body: "Solo project: agent loop, tool definitions, terminal UI, approval prompt and the eval suite.",
  },
  {
    title: "The hard part",
    body: "The model kept choosing the wrong file tool. My file-tools eval scored tool selection at 0.778. The cause was vague tool descriptions, not the model: after rewriting the readFile and listFiles descriptions so each one says exactly when to use it, the score went to 1.0.",
  },
  {
    title: "Results",
    body: "Tool-selection score on the file-tools eval set: 0.778 → 1.0. Every run is traced in Laminar, so a regression shows up as a number, not a hunch.",
  },
  {
    title: "What I'd do next",
    body: "Make the loop multi-turn, put the approval prompt in front of every file and shell tool, and add evals for tool ordering and forbidden-tool avoidance.",
  },
];

const nodes = [
  { x: 10, label: "Ink terminal", sub: "user prompt" },
  { x: 170, label: "Agent", sub: "AI SDK + Gemini" },
  { x: 330, label: "Approval", sub: "y / n prompt" },
  { x: 490, label: "Tools", sub: "Zod schemas" },
];

export default function PilotCliCaseStudy() {
  const card = (s: (typeof sections)[number], i: number) => (
    <Reveal key={s.title} className="cs-card">
      <span className="label">{String(i).padStart(2, "0")}</span>
      <h2>{s.title}</h2>
      <p>{s.body}</p>
    </Reveal>
  );
  return (
    <main className="cs">
      <Link href="/#work" className="cs-back">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
      </Link>

      <Reveal className="cs-head">
        <span className="label">case study</span>
        <h1>
          Pilot <span>CLI</span>
        </h1>
        <p className="cs-lead">
          A terminal AI coding agent in TypeScript, with tool calling, an approval prompt and an
          eval suite that scores how well it picks tools.
        </p>
        <div className="cs-tags">
          {["TypeScript", "Vercel AI SDK", "Gemini", "Ink", "Zod", "Laminar", "2026 · in progress"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <a href={REPO} target="_blank" rel="noreferrer" className="hirek">
          View the code <span>↗</span>
        </a>
      </Reveal>

      <div className="cs-mat">
        {card(sections[0], 1)}
        {card(sections[1], 2)}
        <Reveal className="cs-card wide">
          <span className="label">03</span>
          <h2>What I built</h2>
          <figure className="cs-fig">
            <svg viewBox="0 0 640 190" role="img" aria-labelledby="pilot-diagram-title">
              <title id="pilot-diagram-title">
                Pilot CLI flow: the terminal sends a prompt to the agent, the agent asks for approval,
                then runs a tool; an eval suite with mocked tools scores the agent&apos;s tool choice.
              </title>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="#c2410c" />
                </marker>
              </defs>
              {nodes.map((n, i) => (
                <g key={n.label}>
                  <rect x={n.x} y="20" width="140" height="56" rx="12" fill={i === 1 ? "#ff6b1a" : "#ffffff"} stroke="#17140f" strokeWidth="1.5" />
                  <text x={n.x + 70} y="44" textAnchor="middle" fontSize="14" fontWeight="800" fill="#17140f">{n.label}</text>
                  <text x={n.x + 70} y="62" textAnchor="middle" fontSize="11" fill={i === 1 ? "#1a0800" : "#5c5c5c"}>{n.sub}</text>
                  {i < nodes.length - 1 && (
                    <line x1={n.x + 140} y1="48" x2={n.x + 168} y2="48" stroke="#c2410c" strokeWidth="2" markerEnd="url(#arrow)" />
                  )}
                </g>
              ))}
              <rect x="170" y="120" width="300" height="56" rx="12" fill="#17140f" />
              <text x="320" y="144" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">Eval suite</text>
              <text x="320" y="162" textAnchor="middle" fontSize="11" fill="#d4d4d4">mocked tools · precision/recall score · Laminar</text>
              <line x1="240" y1="120" x2="240" y2="80" stroke="#c2410c" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow)" />
            </svg>
            <figcaption>
              The agent sends the prompt and Zod-typed tool schemas to Gemini through the Vercel AI
              SDK. Tool calls go through an approval prompt in the Ink UI before they run. The eval
              suite replays a dataset against mocked tools and scores tool selection with a
              precision/recall (F1-style) evaluator.
            </figcaption>
          </figure>
        </Reveal>
        {card(sections[2], 4)}
        <Reveal className="cs-card cs-res">
          <span className="label">05</span>
          <h2>{sections[3].title}</h2>
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
          <p>{sections[3].body}</p>
        </Reveal>
        <Reveal className="cs-card wide">
          <span className="label">06</span>
          <h2>{sections[4].title}</h2>
          <p>{sections[4].body}</p>
        </Reveal>
        <span className="matlbl">case study · pilot cli</span>
      </div>
    </main>
  );
}
