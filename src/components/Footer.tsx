import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-dark text-sm text-[#b5b5b5]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/#hero" className="text-lg font-extrabold text-white">
          SR<span className="text-orange">.</span>
        </Link>
        <nav className="flex gap-5" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={`/${link.href}`} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
      </div>
    </footer>
  );
}
