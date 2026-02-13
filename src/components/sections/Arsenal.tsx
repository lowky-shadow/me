"use client";

import { motion } from "framer-motion";

interface SkillGroup {
  label: string;
  skills: string[];
}

const groups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS", "Bash"],
  },
  {
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "D3.js",
      "Storybook",
      "Responsive Design",
      "Accessibility (a11y)",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js",
      "Express",
      "tRPC",
      "GraphQL",
      "REST APIs",
      "WebSocket",
      "Authentication (JWT/OAuth)",
      "Rate Limiting",
    ],
  },
  {
    label: "Databases",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma ORM",
      "Database Design",
      "Migrations",
    ],
  },
  {
    label: "Infrastructure & Tools",
    skills: [
      "Docker",
      "AWS (EC2, S3, Lambda)",
      "Vercel",
      "CI/CD (GitHub Actions)",
      "Git",
      "Linux/Unix",
      "Nginx",
      "Monitoring",
    ],
  },
  {
    label: "Practices",
    skills: [
      "Agile/Scrum",
      "Code Review",
      "Testing (Jest, Playwright)",
      "Technical Writing",
      "System Design",
      "Performance Optimization",
    ],
  },
];

const slow = (delay = 0) => ({
  initial: { opacity: 0, y: 18 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration: 0.9, delay, ease: "easeInOut" as const },
});

export default function Arsenal() {
  return (
    <section id="arsenal" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <motion.h2
          className="heading-shadow mb-2 text-center text-base tracking-[0.3em] text-text-primary md:text-lg"
          {...slow()}
        >
          Arsenal
        </motion.h2>
        <motion.p
          className="subtitle-shadow mb-12 text-center"
          {...slow(0.1)}
        >
          Technical skills &amp; tools I work with
        </motion.p>

        <div className="divider-shadow mb-12" />

        {/* Skill groups — 2 column grid on larger screens */}
        <div className="grid gap-10 md:grid-cols-2">
          {groups.map((group, gi) => (
            <motion.div key={group.label} {...slow(gi * 0.06)}>
              {/* Category label */}
              <p className="meta-shadow border-b border-glass-border pb-2.5 mb-4">
                {group.label}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="underline-hover text-[0.9375rem] text-text-secondary transition-colors duration-500 hover:text-text-primary cursor-default py-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
