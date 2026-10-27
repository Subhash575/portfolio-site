import { track } from "@vercel/analytics";
import { siteConfig } from "@/lib/data";

// Only the clicks that tell us what recruiters do; every other link is ignored.
function eventFor(href: string) {
  if (href.endsWith(siteConfig.resume)) return "cv_download";
  if (href.endsWith("#contact")) return "go_contact";
  if (href.startsWith(siteConfig.linkedin)) return "linkedin";
  if (href.startsWith(siteConfig.github)) return "github";
  return null;
}

export function trackLink(href: string, label: string, where: string) {
  const name = eventFor(href);
  if (name) track(name, { label: label.slice(0, 40), where });
}
