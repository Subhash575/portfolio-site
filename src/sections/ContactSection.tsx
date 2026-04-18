"use client";

import { siteConfig, socialLinks } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

function ContactSocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
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
        className="h-5 w-5"
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
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20">
      <SectionHeading
        title="Get In Touch"
        subtitle="Let's build something together"
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Contact Information
          </h3>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I&apos;m always open to discussing product design work or
            partnership opportunities. Feel free to reach out using the form or
            through my social profiles.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 font-medium text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 transition-colors"
            >
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
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {siteConfig.email}
            </a>

            <div className="flex gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-zinc-100 p-3 text-zinc-700 transition hover:bg-zinc-200 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/20"
                  aria-label={link.label}
                  title={link.label}
                >
                  <ContactSocialIcon label={link.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
