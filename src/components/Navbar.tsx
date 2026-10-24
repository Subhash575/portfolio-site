"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const observers = navLinks.map((l) => {
      const id = l.href.replace("#", "");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      const el = document.getElementById(id);
      if (el) observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/#hero" className="text-xl font-extrabold tracking-tight">
            SR<span className="text-orange">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  className={`relative py-1 text-sm transition-colors ${
                    isActive ? "font-bold text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-orange"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden rounded-full border-[1.5px] border-ink px-4 py-2 text-sm font-bold transition-colors hover:bg-ink hover:text-white sm:inline-flex"
            >
              Hire me
            </Link>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-11 w-11 items-center justify-center md:hidden"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-[68px] z-40 border-b border-line bg-white px-6 pb-6 shadow-lg md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${link.href}`}
                onClick={() => setIsMobileOpen(false)}
                className="block border-b border-line py-3 font-bold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsMobileOpen(false)}
              className="mt-4 block rounded-full bg-orange-btn py-3 text-center font-bold text-white"
            >
              Hire me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
