"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Briefcase, GraduationCap, Code2, Globe } from "lucide-react";

// Animation variant for staggered entrance
const slow = (delay = 0) => ({
  initial: { opacity: 0, y: 15 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration: 1.0, delay, ease: "easeOut" as const },
});

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:shadow@example.com", label: "Email" },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "20+", label: "Projects" },
  { value: "50+", label: "Commits" }, // Shortened for layout balance
  { value: "5+", label: "Clients" },
];

const highlights = [
  {
    icon: Briefcase,
    title: "Work Ready",
    text: "Production-grade applications, agile teams, and shipping under deadlines.",
  },
  {
    icon: Code2,
    title: "Full Stack",
    text: "End-to-end ownership — UI systems, API design, databases, and CI/CD.",
  },
  {
    icon: GraduationCap,
    title: "Always Learning",
    text: "Active contributor. Staying current with React, Node.js, and clouds.",
  },
  {
    icon: Globe,
    title: "Remote-First",
    text: "Async-native. Clear documentation, proactive comms, consistent delivery.",
  },
];

export default function UnifiedHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-20 pb-12 lg:py-0">
      {/* Fog effect at bottom */}
      <div className="fog-bottom absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Narrative */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6 lg:space-y-8">
          {/* 1. Primary Title */}
          <motion.h1
            className="heading-shadow text-4xl tracking-[0.15em] sm:text-5xl sm:tracking-[0.2em] md:text-7xl lg:text-8xl text-text-primary"
            {...slow(0.2)}
          >
            SHADOW
          </motion.h1>

          {/* 2. Short Tagline */}
          <motion.p
            className="subtitle-shadow tracking-[0.12em] sm:tracking-[0.2em] uppercase font-medium text-[11px] sm:text-[13px]"
            {...slow(0.4)}
          >
            Full-Stack Developer &amp; Systems Architect
          </motion.p>

          {/* Separator Line */}
          <motion.div
             className="h-px w-10 sm:w-12 bg-accent-violet/30 my-1 sm:my-2"
             initial={{ scaleX: 0, opacity: 0 }}
             animate={{ scaleX: 1, opacity: 1 }}
             transition={{ duration: 1.0, delay: 0.6 }}
          />

          {/* 3. Manifest Paragraph */}
          <motion.div 
            className="space-y-3 sm:space-y-4 body-shadow max-w-lg mx-auto lg:mx-0 text-sm sm:text-[0.9375rem]"
            {...slow(0.7)}
          >
            <p>
              Operating from the unseen. I build robust, scalable web applications 
              and backend systems that power modern digital experiences.
            </p>
            <p>
              Focused on clean engineering, autonomy, and the silent precision 
              of well-crafted code. 
            </p>
          </motion.div>

          {/* 4. Primary CTA & Socials */}
          <motion.div 
            className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 mt-4 sm:mt-6 w-full sm:w-auto"
            {...slow(1.0)}
          >
            <a
              href="#operations"
              className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 sm:py-3 text-xs font-medium uppercase tracking-[0.2em] text-text-primary border border-glass-border transition-all duration-700 hover:border-accent-violet/40 hover:glow-sm hover:bg-white/5"
            >
              <span>Enter the Garden</span>
            </a>

            {/* Minimal Social Links */}
            <div className="flex gap-6 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted transition-colors duration-300 hover:text-text-primary"
                  aria-label={s.label}
                >
                  <s.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Evidence (Stats & Highlights) */}
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-4">
             {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex flex-col items-center justify-center rounded-sm border border-glass-border bg-shadow-900/40 py-3 px-2 sm:py-4 sm:px-3 text-center transition-colors hover:border-accent-violet/20"
                  {...slow(0.3 + i * 0.1)}
                >
                  <span className="text-base sm:text-xl font-bold text-text-primary mb-0.5 sm:mb-1">
                    {s.value}
                  </span>
                  <span className="meta-shadow text-[8px] sm:text-[10px]">
                    {s.label}
                  </span>
                </motion.div>
             ))}
          </div>

          {/* Highlights Stack */}
          <div className="space-y-2 sm:space-y-3">
             {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  className="group flex gap-3 sm:gap-4 rounded-sm border border-glass-border bg-shadow-900/20 p-3 sm:p-4 transition-all duration-500 hover:border-accent-violet/20 hover:bg-shadow-800/40"
                  {...slow(0.5 + i * 0.1)}
                >
                  <div className="mt-1 text-text-muted group-hover:text-accent-violet transition-colors duration-500">
                    <h.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-[13px] sm:text-sm font-semibold text-text-primary tracking-wide mb-0.5 sm:mb-1">
                      {h.title}
                    </h3>
                    <p className="text-xs sm:text-[0.8125rem] leading-[1.5] sm:leading-[1.6] text-text-muted">
                      {h.text}
                    </p>
                  </div>
                </motion.div>
             ))}
          </div>

        </div>

      </div>
    </section>
  );
}
