"use client";

import { useState } from "react";

// Flip the switch to see the fix: the scores are the real eval results, the prompt and tool pick are illustrative.
export default function EvalBench() {
  const [exact, setExact] = useState(false);
  return (
    <div className="cs-bench">
      <div className="cs-ctl">
        <small>tool descriptions</small>
        <div className="cs-rocker" role="radiogroup" aria-label="Tool descriptions">
          <button type="button" role="radio" aria-checked={!exact} onClick={() => setExact(false)}>
            vague
          </button>
          <button type="button" role="radio" aria-checked={exact} className={exact ? "" : "nudge"} onClick={() => setExact(true)}>
            exact
          </button>
        </div>
        <p>{exact ? "readFile and listFiles each say exactly when to use them." : "Press exact to rewrite readFile and listFiles."}</p>
      </div>

      <div className={`cs-lcd${exact ? " good" : ""}`} aria-live="polite">
        <i className="cs-led" />
        <div className="cs-lcd-row">
          <small>prompt</small>
          <code>› show me src/agent.ts</code>
        </div>
        <div className="cs-lcd-row">
          <small>agent picked</small>
          <b className="pick">{exact ? "readFile ✓" : "listFiles ✗"}</b>
        </div>
        <div className="cs-lcd-row">
          <small>tool-selection score</small>
          <span className="score">
            <b>{exact ? "1.0" : "0.778"}</b>
            {exact && <em className="cs-gain">+28%</em>}
          </span>
        </div>
        <div className="cs-gauge" aria-hidden="true">
          <i style={{ width: exact ? "100%" : "77.8%" }} />
          <u />
        </div>
        <div className="cs-scale" aria-hidden="true">
          <span>0</span>
          <span>0.5</span>
          <span>1.0</span>
        </div>
        <span className="cs-lcd-note">scores: file-tools eval set · prompt and pick: illustrative</span>
      </div>
    </div>
  );
}
