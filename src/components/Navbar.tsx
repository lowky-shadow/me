"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Chronicle", href: "#chronicle" },
  { label: "Operations", href: "#operations" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Contact", href: "#contact" },
  // { label: "Manifest", href: "#manifest" } // Removed as integrated into Hero
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-shadow-950/80 backdrop-blur-xl border-b border-glass-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="heading-shadow text-sm text-text-primary tracking-[0.3em]"
          >
            Shadow
          </a>

          {/* Desktop */}
          <div className="hidden gap-8 items-center md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.2em] text-text-muted transition-colors duration-500 hover:text-text-primary"
              >
                {l.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              className="text-text-muted"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-x-0 top-14 z-40 bg-shadow-950/95 backdrop-blur-xl border-b border-glass-border p-6 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-xs uppercase tracking-[0.2em] text-text-muted hover:text-text-primary transition-colors duration-500"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
