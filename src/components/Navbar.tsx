"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { navLinks, siteConfig } from "@/lib/data";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = mounted ? (resolvedTheme ?? theme ?? "light") : "light";
  const isDark = currentTheme === "dark";

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 sm:px-12 md:px-16 lg:px-24 py-4 sm:py-5 font-medium tracking-tight transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#0d0d0d]/90 shadow-sm backdrop-blur-md"
            : "bg-surface/80 dark:bg-[#0d0d0d]/80 backdrop-blur-md"
        } border-b border-subtle`}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="text-lg sm:text-xl font-bold tracking-tighter text-on-surface"
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-7 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative flex items-center min-h-[44px] text-sm transition-colors duration-300 ${
                  isActive
                    ? "text-accent font-semibold"
                    : "text-on-surface-variant hover:text-accent"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right side: theme toggle + CTA + hamburger */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="relative min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-on-surface-variant hover:text-accent hover:bg-accent/8 transition-all duration-300 cursor-pointer overflow-hidden"
            aria-label="Toggle dark mode"
          >
            {mounted ? (
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.svg
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="absolute h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4.5" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <line
                        key={deg}
                        x1={12 + 7.5 * Math.cos((deg * Math.PI) / 180)}
                        y1={12 + 7.5 * Math.sin((deg * Math.PI) / 180)}
                        x2={12 + 9.5 * Math.cos((deg * Math.PI) / 180)}
                        y2={12 + 9.5 * Math.sin((deg * Math.PI) / 180)}
                      />
                    ))}
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="absolute h-[18px] w-[18px]"
                    fill="currentColor"
                    stroke="none"
                  >
                    {/* Crescent moon using clip */}
                    <path
                      d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                      fill="currentColor"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            ) : (
              <span className="absolute h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Hire Me (desktop) */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="hidden sm:inline-flex min-h-[44px] items-center rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600 cursor-pointer"
          >
            Hire Me
          </a>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-on-surface-variant hover:text-accent hover:bg-accent/8 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-surface/30 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-72 bg-surface dark:bg-inverse-surface shadow-2xl p-8 pt-24 flex flex-col gap-2"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-4 py-3 min-h-[44px] rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-on-surface-variant hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="mt-6">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="block w-full min-h-[44px] rounded-lg bg-indigo-500 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-600 cursor-pointer"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
