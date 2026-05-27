"use client";

import { motion } from "framer-motion";
import { siteConfig, socialLinks } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

function LinkedInIcon() {
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

function GitHubIcon() {
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

function MailIcon() {
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

function ContactSocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") return <LinkedInIcon />;
  if (label === "GitHub") return <GitHubIcon />;
  return <MailIcon />;
}

const infoItems = (email: string) => [
  {
    icon: (
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
    ),
    label: "Email",
    value: email,
    href: `mailto:${email}`,
  },
  {
    icon: (
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
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    label: "Location",
    value: "Open to remote worldwide",
    href: null,
  },
  {
    icon: (
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Response time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactSection() {
  const email = ["subhash09468", "gmail.com"].join("@");
  const items = infoItems(email);

  return (
    <motion.section
      id="contact"
      className="py-6 md:py-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <SectionHeading
        title="Get In Touch"
        subtitle="Let's build something together"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        {/* ── Left: Info panel ── */}
        <div className="flex flex-col gap-8">
          {/* Availability badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Available for new opportunities
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-primary text-primary">
              Let&apos;s work together
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.8] text-muted">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Drop me a message —
              I&apos;ll get back to you promptly.
            </p>
          </div>

          {/* Info items */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-subtle bg-surface/80 px-4 py-3.5 dark:bg-surface-elevated/[0.03]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted dark:text-muted">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="truncate text-sm font-medium text-secondary transition-colors hover:text-accent dark:hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-secondary">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted dark:text-muted">
              Find me on
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on ${link.label}`}
                  title={link.label}
                  className="flex items-center gap-2 rounded-xl border border-subtle bg-surface-elevated px-3.5 py-2.5 text-sm font-medium text-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-subtle hover:text-primary hover:shadow-md dark:bg-surface-elevated/[0.04] dark:hover:border-white/[0.15] dark:hover:text-zinc-200"
                >
                  <ContactSocialIcon label={link.label} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Contact form ── */}
        <div className="rounded-2xl border border-subtle/80 bg-surface-elevated p-6 shadow-sm bg-surface-elevated/60 md:p-8">
          {/* Form card header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-accent" />
            <div>
              <h4 className="text-base font-semibold text-primary text-primary">
                Send a message
              </h4>
              <p className="text-xs text-muted dark:text-muted">
                All fields are required
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </motion.section>
  );
}
