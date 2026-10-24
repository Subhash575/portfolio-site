import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Subhash Rana: I build AI agents that actually ship.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const cap = (bg: string, color: string, lip: string) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 14,
  background: bg,
  color,
  boxShadow: `0 6px 0 ${lip}`,
  fontWeight: 800,
  whiteSpace: "nowrap" as const,
  flexShrink: 0,
});

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/Subhash_pic.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;
  const font = (f: string) => readFile(join(process.cwd(), "src/assets/fonts", f));
  const [medium, bold] = await Promise.all([font("Inter-Medium.ttf"), font("Inter-ExtraBold.ttf")]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 44, background: "#ebe4d8", fontFamily: "Inter" }}>
        {/* the glass workbench mat */}
        <div
          style={{
            flex: 1,
            display: "flex",
            position: "relative",
            borderRadius: 28,
            border: "2px solid rgba(255,255,255,.9)",
            backgroundColor: "rgba(255,253,249,.6)",
            backgroundImage: "linear-gradient(rgba(20,20,20,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,20,.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            boxShadow: "0 24px 60px rgba(80,60,30,.18)",
            padding: "52px 56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ ...cap("#ff6b1a", "#fffdf9", "#b8400f"), width: 64, height: 64, fontSize: 28 }}>SR</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: "#141414" }}>Subhash Rana</span>
                <span style={{ fontSize: 22, color: "#5c5c5c" }}>Full-stack engineer · SDE intern @ Matchbest</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: 46, fontSize: 70, fontWeight: 800, lineHeight: 1.05, color: "#141414", letterSpacing: -2 }}>
              <span>I build AI agents</span>
              <span style={{ color: "#ff6b1a" }}>that actually ship.</span>
            </div>
            <div style={{ display: "flex", marginTop: 30 }}>
              <div style={{ ...cap("#3d5a4b", "#fffdf9", "#24382e"), padding: "10px 18px", fontSize: 24 }}>subhash.live →</div>
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: "auto" }}>
              {["308+ tests", "25% faster API", "1.0 eval score"].map((t) => (
                <div key={t} style={{ ...cap("#fffdf9", "#141414", "#d6cdbd"), padding: "10px 16px", fontSize: 22 }}>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* photo on a keycap-style display, face fully visible */}
          <div style={{ display: "flex", alignItems: "flex-end", marginLeft: 36 }}>
            <div style={{ display: "flex", width: 330, height: 400, borderRadius: 24, background: "#ffe1cc", border: "4px solid #fffdf9", boxShadow: "0 10px 0 #d6cdbd", overflow: "hidden", alignItems: "flex-end", justifyContent: "center" }}>
              <img src={src} width={322} height={392} alt="" style={{ objectFit: "cover", objectPosition: "center top" }} />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: medium, weight: 500 },
        { name: "Inter", data: bold, weight: 800 },
      ],
    },
  );
}
