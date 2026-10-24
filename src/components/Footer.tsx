import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer>
      © {new Date().getFullYear()} {siteConfig.name} · built on a workbench with Next.js
    </footer>
  );
}
