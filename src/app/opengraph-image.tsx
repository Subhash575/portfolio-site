import { ImageResponse } from "next/og";

export const alt = "Subhash Rana — full-stack engineer building AI coding agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          borderLeft: "24px solid #ff6b1a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, color: "#c2410c" }}>Hi there,</div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, color: "#141414" }}>
          I&apos;m&nbsp;<span style={{ color: "#ff6b1a" }}>Subhash Rana</span>
        </div>
        <div style={{ fontSize: 38, color: "#5c5c5c", marginTop: 24 }}>
          Full-stack engineer building AI coding agents
        </div>
        <div style={{ fontSize: 28, color: "#5c5c5c", marginTop: 40 }}>
          SDE Intern @ Matchbest · 308 tests · B.Tech CSE &apos;26 · subhash.live
        </div>
      </div>
    ),
    size,
  );
}
