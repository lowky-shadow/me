"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

interface Operation {
  code: string;
  title: string;
  desc: string;
  highlights: string[];
  tags: string[];
  github?: string;
  demo?: string;
}

const operations: Operation[] = [
  {
    code: "01",
    title: "Cloud Dashboard",
    desc: "Real-time cloud infrastructure monitoring platform with draggable widget system and automated alerting.",
    highlights: [
      "Built draggable widget grid with react-dnd, supporting custom layouts per user",
      "Implemented WebSocket-based live metric streaming with 200ms latency",
      "Designed alert pipeline processing 10K+ events/day with priority queuing",
      "D3.js visualizations for CPU, memory, network, and custom metric charts",
    ],
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js", "Redis"],
    github: "#",
    demo: "#",
  },
  {
    code: "02",
    title: "AI Chat Platform",
    desc: "Multi-model conversational AI with streaming responses, persistent context, and team collaboration.",
    highlights: [
      "Integrated OpenAI, Anthropic, and local LLM APIs with unified streaming interface",
      "Built context window management with token counting and smart truncation",
      "Implemented conversation branching and forking for team exploration",
      "tRPC type-safe API with Prisma ORM handling 100K+ message records",
    ],
    tags: ["Next.js", "OpenAI", "Prisma", "tRPC", "PostgreSQL", "Vercel"],
    github: "#",
    demo: "#",
  },
  {
    code: "03",
    title: "E-Commerce Engine",
    desc: "Headless commerce backend with Stripe payment processing, inventory management, and order lifecycle tracking.",
    highlights: [
      "Stripe integration with webhook handling for payments, refunds, and subscriptions",
      "Inventory state machine with real-time stock tracking and low-stock alerts",
      "Order lifecycle management with status tracking and email notifications",
      "Redis caching layer reducing database queries by 60%",
    ],
    tags: ["Node.js", "PostgreSQL", "Stripe", "Redis", "Docker", "AWS"],
    github: "#",
  },
  {
    code: "04",
    title: "Component Library",
    desc: "Production-grade design system with token-based theming, full a11y compliance, and interactive documentation.",
    highlights: [
      "40+ composable components with consistent API patterns",
      "Token-based theming supporting dark/light mode and custom brand colors",
      "WCAG 2.1 AA compliant — keyboard navigation, screen reader support, focus management",
      "Storybook documentation with interactive examples and usage guidelines",
    ],
    tags: ["React", "TypeScript", "Storybook", "CSS", "Figma", "Testing Library"],
    github: "#",
    demo: "#",
  },
];

const slow = (delay = 0) => ({
  initial: { opacity: 0, y: 18 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration: 0.9, delay, ease: "easeInOut" as const },
});

export default function Operations() {
  return (
    <section id="operations" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <motion.h2
          className="heading-shadow mb-2 text-center text-base tracking-[0.3em] text-text-primary md:text-lg"
          {...slow()}
        >
          Operations
        </motion.h2>
        <motion.p
          className="subtitle-shadow mb-12 text-center"
          {...slow(0.1)}
        >
          Selected projects &amp; systems I&apos;ve built
        </motion.p>

        <div className="divider-shadow mb-12" />

        {/* Cards — vertical stack */}
        <div className="space-y-6">
          {operations.map((op, i) => (
            <motion.div
              key={op.code}
              className="group relative rounded-sm border border-glass-border bg-shadow-900/30 p-6 transition-all duration-700 hover:border-accent-violet/12 hover:bg-shadow-800/30"
              {...slow(i * 0.08)}
            >
              {/* Left accent */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-violet/15 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              {/* Header row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="meta-shadow block mb-1.5">
                    Operation {op.code}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-text-primary transition-colors duration-500">
                    {op.title}
                  </h3>
                </div>
                <div className="flex gap-2 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                  {op.github && (
                    <a href={op.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors duration-500" aria-label={`${op.title} source`}>
                      <Github size={14} />
                    </a>
                  )}
                  {op.demo && (
                    <a href={op.demo} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors duration-500" aria-label={`${op.title} demo`}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-[0.8125rem] leading-[1.7] text-text-secondary mb-5">
                {op.desc}
              </p>

              {/* Highlight bullets */}
              <ul className="space-y-2 mb-5">
                {op.highlights.map((h, hi) => (
                  <li
                    key={hi}
                    className="text-[0.8125rem] leading-[1.7] text-text-muted pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-accent-violet/40"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {op.tags.map((tag) => (
                  <span
                    key={tag}
                    className="meta-shadow border border-glass-border rounded-sm px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* More on GitHub link */}
        <motion.div className="mt-8 text-center" {...slow(0.1)}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-text-muted transition-colors duration-500 hover:text-text-primary"
          >
            More on GitHub
            <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
