// "use client";

// import { motion } from "framer-motion";
// import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
// import { socialLinks, siteConfig } from "@/lib/data";

// function SocialIcon({ label }: { label: string }) {
// if (label === "LinkedIn") {
// return (
// <svg
// aria-hidden="true"
// viewBox="0 0 24 24"
// className="h-5 w-5"
// fill="currentColor"
// >
// <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1.01 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.15V21h-4v-5.46c0-1.3-.02-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.88V21h-4V9Z" />
// </svg>
// );
// }

// if (label === "GitHub") {
// return (
// <svg
// aria-hidden="true"
// viewBox="0 0 24 24"
// className="h-5 w-5"
// fill="currentColor"
// >
// <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.38 6.84 9.73.5.1.66-.22.66-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.77-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 7.02c.85 0 1.7.12 2.5.36 1.9-1.34 2.74-1.06 2.74-1.06.55 1.43.2 2.5.1 2.75.64.73 1.03 1.65 1.03 2.77 0 3.95-2.34 4.81-4.57 5.07.36.32.67.95.67 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.17.59.67.49A10.22 10.22 0 0 0 22 12.25C22 6.6 17.52 2 12 2Z" />
// </svg>
// );
// }

// return (
// <svg
// aria-hidden="true"
// viewBox="0 0 24 24"
// className="h-5 w-5"
// fill="none"
// stroke="currentColor"
// strokeWidth="2"
// strokeLinecap="round"
// strokeLinejoin="round"
// >
// <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
// <path d="m3 7 9 6 9-6" />
// </svg>
// );
// }

// export default function Footer() {
// return (
// <footer className="w-full border-t border-outline-variant/10 bg-surface-container-low dark:bg-surface-container-lowest px-6 py-12 sm:px-8">
// <motion.div
// variants={staggerContainer}
// initial="hidden"
// whileInView="visible"
// viewport={viewportConfig}
// className="max-w-7xl mx-auto"
// >
// <motion.div
// variants={fadeUp}
// className="flex flex-col items-center justify-between gap-6 sm:flex-row"
// >
// <p className="text-center text-sm font-medium text-on-surface-variant sm:text-left">
// © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
// </p>

// <div className="flex items-center gap-3">
// {socialLinks.map((link) => (
// <a
// key={link.label}
// href={link.href}
// target={link.href.startsWith("http") ? "_blank" : undefined}
// rel={
// link.href.startsWith("http")
// ? "noopener noreferrer"
// : undefined
// }
// className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-elevated/70 text-on-surface-variant transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent dark:bg-surface-elevated/5"
// aria-label={link.label}
// title={link.label}
// >
// <SocialIcon label={link.label} />
// </a>
// ))}
// </div>
// </motion.div>
// </motion.div>
// </footer>
// );
// }

"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { socialLinks, siteConfig, navLinks } from "@/lib/data";

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1.01 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.15V21h-4v-5.46c0-1.3-.02-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.88V21h-4V9Z" />
      </svg>
    );
  }
  if (label === "GitHub") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.38 6.84 9.73.5.1.66-.22.66-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.77-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 7.02c.85 0 1.7.12 2.5.36 1.9-1.34 2.74-1.06 2.74-1.06.55 1.43.2 2.5.1 2.75.64.73 1.03 1.65 1.03 2.77 0 3.95-2.34 4.81-4.57 5.07.36.32.67.95.67 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.17.59.67.49A10.22 10.22 0 0 0 22 12.25C22 6.6 17.52 2 12 2Z" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

const handleNavClick = (href: string) => {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-subtle/60 bg-surface/80 bg-surface/50 px-6 pt-14 pb-8 sm:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mx-auto max-w-5xl"
      >
        {/* ── Top row ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-10 sm:flex-row sm:justify-between"
        >
          {/* Brand + tagline */}
          <div className="flex flex-col gap-3 max-w-xs">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="text-xl font-bold tracking-tighter text-primary text-primary"
            >
              {siteConfig.name.split(" ")[0]}
              <span className="text-accent">.</span>
            </a>
            <p className="text-sm leading-relaxed text-muted">
              Building clean, performant web experiences with modern
              technologies. Open to remote opportunities worldwide.
            </p>

            {/* Social icons */}
            <div className="mt-1 flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={`${siteConfig.name} on ${link.label}`}
                  title={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-subtle bg-surface-elevated text-muted shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-subtle hover:text-accent hover:shadow-md dark:bg-surface-elevated/[0.04] dark:hover:border-white/[0.15] dark:hover:text-accent"
                >
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted dark:text-muted">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm font-medium text-muted transition-colors duration-200 hover:text-accent dark:hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA block */}
          <div className="flex flex-col gap-3 max-w-[200px]">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted dark:text-muted">
              Let&apos;s connect
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-accent dark:hover:text-accent break-all"
            >
              {siteConfig.email}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
            >
              Hire Me
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          variants={fadeUp}
          className="my-8 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-white/[0.08]"
        />

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <p className="text-xs text-muted dark:text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted dark:text-muted">
            Built with <span className="font-medium text-muted">Next.js</span>
            {" & "}
            <span className="font-medium text-muted">Tailwind CSS</span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
