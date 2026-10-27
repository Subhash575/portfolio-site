"use client";

import { track } from "@vercel/analytics";
import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/data";
import { reducedMotion } from "@/lib/wires";

const reasons = ["Hiring for SDE-1", "Project / freelance", "Just saying hi"];
const istTime = () => new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date());

export default function ContactSection() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [re, setRe] = useState(reasons[0]);
  const [errs, setErrs] = useState<{ name?: string; msg?: string }>({});
  const [sent, setSent] = useState(false);
  const [done, setDone] = useState(false);
  const [copy, setCopy] = useState<string>(siteConfig.email);
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const tick = () => setClock(istTime());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  // No backend: the letter opens the visitor's own email app with everything filled in.
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      name: name.trim() ? undefined : "Add your name.",
      msg: msg.trim().length >= 10 ? undefined : "Write at least 10 characters.",
    };
    setErrs(next);
    if (next.name || next.msg) return;
    const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`${re} (from ${name.trim()})`)}&body=${encodeURIComponent(`${msg.trim()}\n\n${name.trim()}`)}`;
    track("send_letter", { reason: re });
    setSent(true);
    setTimeout(
      () => {
        setDone(true);
        window.location.href = href;
      },
      reducedMotion() ? 0 : 1100,
    );
  };

  const reset = () => {
    setSent(false);
    setDone(false);
    setName("");
    setMsg("");
  };

  const copyEmail = async () => {
    track("copy_email", { where: "contact" });
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopy("copied ✓");
    } catch {
      setCopy(`select it: ${siteConfig.email}`);
    }
    setTimeout(() => setCopy(siteConfig.email), 1800);
  };

  return (
    <section className="ct" id="contact">
      <Reveal className="ct-head">
        <span className="label">04 · contact</span>
        <h2>Send me a letter</h2>
        <p className="ct-hint">It opens your own email app. Nothing is stored here.</p>
      </Reveal>
      <Reveal className="ct-mat">
        <div className={`ct-desk${sent ? " sent" : ""}`}>
          <div className="ct-env" aria-hidden="true">
            <i className="flap" />
            <span>to: {siteConfig.email}</span>
          </div>
          <form className="ct-letter" onSubmit={send} noValidate>
            <div className="ct-stamp" aria-hidden="true">
              <div className="ct-stamp-in">
                <Image src="/images/Subhash_pic.png" alt="" width={84} height={84} />
                <b>2026</b>
                <small>SDE-1</small>
              </div>
            </div>
            <div className="ct-pm" aria-hidden="true">
              <span>NCR · IN</span>
              <b>
                OPEN
                <br />
                TO WORK
              </b>
            </div>
            <p className="ct-to">
              <span>To</span> {siteConfig.name} &lt;{siteConfig.email}&gt;
            </p>
            <label className="ct-row">
              <span>From</span>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrs((x) => ({ ...x, name: undefined }));
                }}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!errs.name}
              />
            </label>
            <p className="ct-err" role="alert">
              {errs.name}
            </p>
            <div className="ct-row">
              <span>Re</span>
              <div className="ct-re" role="radiogroup" aria-label="Reason">
                {reasons.map((r) => (
                  <button key={r} type="button" role="radio" aria-checked={re === r} onClick={() => setRe(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              rows={5}
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                setErrs((x) => ({ ...x, msg: undefined }));
              }}
              placeholder="Hi Subhash, we're hiring for…"
              aria-label="Message"
              aria-invalid={!!errs.msg}
            />
            <p className="ct-err" role="alert">
              {errs.msg}
            </p>
            <div className="ct-foot">
              <span className="ct-sign">sent from subhash.live</span>
              <button className="hirek" type="submit">
                Send <span>↵</span>
              </button>
            </div>
          </form>
          <p className="ct-done" aria-live="polite">
            {done && (
              <>
                ✓ Sealed. Opening your email app…
                <button type="button" onClick={reset}>
                  write another
                </button>
              </>
            )}
          </p>
        </div>

        <aside className="ct-side">
          <p className="rk">or reach me directly</p>
          <div className="ct-keys">
            <button type="button" className="ct-key" onClick={copyEmail}>
              <b>Copy email</b>
              <small>{copy}</small>
              <i>⧉</i>
            </button>
            <a className="ct-key" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              <b>LinkedIn</b>
              <small>/in/subhash-rana</small>
              <i>↗</i>
            </a>
            <a className="ct-key" href={siteConfig.github} target="_blank" rel="noreferrer">
              <b>GitHub</b>
              <small>@Subhash575</small>
              <i>↗</i>
            </a>
            <a className="ct-key or" href={siteConfig.resume} download>
              <b>Download CV</b>
              <small>PDF · 1 page</small>
              <i>⤓</i>
            </a>
          </div>
          <div className="ct-meta">
            <div>
              <span className="ct-dot" />
              <b>Replies within 24h</b>
              <small>usually same day</small>
            </div>
            <div>
              <b className="ct-clock">{clock}</b>
              <small>NCR, India · IST</small>
            </div>
          </div>
        </aside>
        <span className="matlbl">contact · outbox</span>
      </Reveal>
      <p className="ct-thanks">thanks for scrolling ✦</p>
    </section>
  );
}
