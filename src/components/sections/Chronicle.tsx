"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tech: string[];
}

const jobs: Job[] = [
  {
    role: "Full-Stack Developer",
    company: "Freelance / Contract",
    location: "Remote",
    period: "2023 — Present",
    bullets: [
      "Built and shipped 10+ client projects across e-commerce, SaaS dashboards, and internal tools.",
      "Designed REST and GraphQL APIs handling 50K+ daily requests with Node.js and PostgreSQL.",
      "Implemented CI/CD pipelines and Docker-based deployments on AWS and Vercel.",
      "Consistently delivered projects on time with 5-star client reviews.",
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    role: "Frontend Developer",
    company: "Tech Startup",
    location: "Remote",
    period: "2022 — 2023",
    bullets: [
      "Led frontend development for a real-time analytics dashboard used by 500+ daily active users.",
      "Reduced page load times by 40% through code splitting, lazy loading, and image optimization.",
      "Built a reusable component library with Storybook, cutting UI development time by 30%.",
      "Collaborated with backend team on WebSocket integration for live data streaming.",
    ],
    tech: ["React", "TypeScript", "D3.js", "TailwindCSS", "WebSocket"],
  },
  {
    role: "Junior Developer",
    company: "Web Agency",
    location: "On-site",
    period: "2021 — 2022",
    bullets: [
      "Developed responsive websites and landing pages for 15+ clients across various industries.",
      "Integrated third-party APIs including Stripe payments, SendGrid, and Google Maps.",
      "Maintained and improved existing codebases, fixing 200+ bugs and implementing new features.",
    ],
    tech: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
  },
];

const slow = (delay = 0) => ({
  initial: { opacity: 0, y: 18 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration: 0.9, delay, ease: "easeInOut" as const },
});

/**
 * Chronicle — Work experience timeline.
 * Shows real roles, responsibilities, and impact.
 */
export default function Chronicle() {
  return (
    <section id="chronicle" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <motion.h2
          className="heading-shadow mb-2 text-center text-base tracking-[0.3em] text-text-primary md:text-lg"
          {...slow()}
        >
          Chronicle
        </motion.h2>
        <motion.p
          className="subtitle-shadow mb-12 text-center"
          {...slow(0.1)}
        >
          Experience &amp; track record
        </motion.p>

        <div className="divider-shadow mb-12" />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-glass-border via-accent-violet/10 to-transparent hidden md:block" />

          <div className="space-y-10">
            {jobs.map((job, i) => (
              <motion.div
                key={job.period}
                className="relative md:pl-10"
                {...slow(i * 0.1)}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 top-1.5 h-2.5 w-2.5 rounded-full border border-accent-violet/30 bg-shadow-950 hidden md:block" />

                {/* Card */}
                <div className="rounded-sm border border-glass-border bg-shadow-900/30 p-5 transition-all duration-500 hover:border-accent-violet/10 hover:bg-shadow-800/30">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-text-primary">
                        {job.role}
                      </h3>
                      <p className="text-sm text-text-muted mt-0.5">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 meta-shadow">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={10} />
                        {job.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={10} />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="text-[0.8125rem] leading-[1.7] text-text-secondary pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-text-muted/40"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="meta-shadow border border-glass-border rounded-sm px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
