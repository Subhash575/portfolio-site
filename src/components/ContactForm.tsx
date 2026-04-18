"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface FormState {
  name: string;
  email: string;
  message: string;
  website: string;
}

interface ContactApiResponse {
  message?: string;
  eventId?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [toastMessage, setToastMessage] = useState("");
  const formStartedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (status === "idle" || status === "loading") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStatus("idle");
      setToastMessage("");
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setToastMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          formStartedAt: formStartedAtRef.current,
        }),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (!response.ok) {
        throw new Error(
          payload.message || "Something went wrong while sending your message.",
        );
      }

      setStatus("success");
      setToastMessage("Message sent successfully. I will get back to you soon.");
      setForm({ name: "", email: "", message: "", website: "" });
      formStartedAtRef.current = Date.now();
    } catch (error) {
      setStatus("error");
      setToastMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now. Please try again later.",
      );
    }
  };

  const inputClasses =
    "w-full px-5 py-3.5 rounded-xl bg-surface-container-lowest dark:bg-surface-container border border-outline/40 dark:border-outline/40 text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary/70 transition-all duration-300";

  return (
    <motion.form variants={fadeUp} onSubmit={handleSubmit} className="relative space-y-5">
      <AnimatePresence>
        {toastMessage && status !== "loading" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className={`rounded-xl border px-4 py-3 text-sm font-medium ${
              status === "error"
                ? "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            }`}
            role="status"
            aria-live="polite"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={inputClasses}
          aria-label="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClasses}
          aria-label="Your email"
        />
      </div>

      <div>
        <label htmlFor="contact-website" className="sr-only">
          Leave this field empty
        </label>
        <input
          id="contact-website"
          name="website"
          type="text"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className={`${inputClasses} resize-none`}
          aria-label="Your message"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full gradient-primary text-white py-4 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 cursor-pointer"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 animate-spin"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" className="opacity-30" />
              <path d="M21 12a9 9 0 0 0-9-9" />
            </svg>
            Sending...
          </span>
        ) : status === "success" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Message Sent!
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Send Message
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
          </span>
        )}
      </button>
    </motion.form>
  );
}
