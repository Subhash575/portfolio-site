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
  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
      <Link href="/#projects" className="inline-flex items-center gap-1 text-sm font-bold text-orange-text">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
      </Link>

      <Reveal>
        <p className="mt-8 font-hand text-2xl text-orange-text">case study</p>
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Pilot <span className="text-orange">CLI</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          A terminal AI coding agent in TypeScript, with tool calling, an approval prompt and an
          eval suite that scores how well it picks tools.
        </p>
        <p className="mt-3 text-sm text-muted">
          TypeScript · Vercel AI SDK · Gemini · Ink · Zod · Laminar · 2026 · in progress
        </p>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-orange-btn px-5 py-2.5 font-bold text-white"
        >
          View the code
        </a>
      </Reveal>

      {sections.slice(0, 2).map((s) => (
        <Reveal key={s.title} className="mt-12">
          <h2 className="text-2xl font-extrabold">{s.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
        </Reveal>
      ))}

      <Reveal className="mt-12">
        <h2 className="text-2xl font-extrabold">What I built</h2>
        <figure className="mt-5 border border-line bg-[#fffaf6] p-4">
          <svg viewBox="0 0 640 190" className="w-full" role="img" aria-labelledby="pilot-diagram-title">
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
                <rect x={n.x} y="20" width="140" height="56" fill={i === 1 ? "#ff6b1a" : "#ffffff"} stroke="#141414" strokeWidth="1.5" />
                <text x={n.x + 70} y="44" textAnchor="middle" fontSize="14" fontWeight="800" fill="#141414">{n.label}</text>
                <text x={n.x + 70} y="62" textAnchor="middle" fontSize="11" fill={i === 1 ? "#1a0800" : "#5c5c5c"}>{n.sub}</text>
                {i < nodes.length - 1 && (
                  <line x1={n.x + 140} y1="48" x2={n.x + 168} y2="48" stroke="#c2410c" strokeWidth="2" markerEnd="url(#arrow)" />
                )}
              </g>
            ))}
            <rect x="170" y="120" width="300" height="56" fill="#141414" />
            <text x="320" y="144" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">Eval suite</text>
            <text x="320" y="162" textAnchor="middle" fontSize="11" fill="#d4d4d4">mocked tools · precision/recall score · Laminar</text>
            <line x1="240" y1="120" x2="240" y2="80" stroke="#c2410c" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow)" />
          </svg>
          <figcaption className="mt-3 text-sm text-muted">
            The agent sends the prompt and Zod-typed tool schemas to Gemini through the Vercel AI
            SDK. Tool calls go through an approval prompt in the Ink UI before they run. The eval
            suite replays a dataset against mocked tools and scores tool selection with a
            precision/recall (F1-style) evaluator.
          </figcaption>
        </figure>
      </Reveal>

      {sections.slice(2).map((s) => (
        <Reveal key={s.title} className="mt-12">
          <h2 className="text-2xl font-extrabold">{s.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
        </Reveal>
      ))}
    </main>
  );
}
