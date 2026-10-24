"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState<"Copy" | "Copied" | "Select to copy">("Copy");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the email link still works.
      setLabel("Select to copy");
    }
    setTimeout(() => setLabel("Copy"), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 bg-ink px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-btn"
      aria-live="polite"
    >
      {label === "Copied" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}
