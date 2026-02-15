"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useState, type FormEvent } from "react";

const directLinks = [
  { icon: Mail, label: "shadow@example.com", href: "mailto:shadow@example.com" },
  { icon: Linkedin, label: "linkedin.com/in/shadow", href: "https://linkedin.com" },
  { icon: Github, label: "github.com/shadow", href: "https://github.com" },
  { icon: Twitter, label: "@shadow", href: "https://twitter.com" },
];

const slow = (delay = 0) => ({
  initial: { opacity: 0, y: 18 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.9, delay, ease: "easeInOut" as const },
});

export default function ContactShadow() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <motion.h2
          className="heading-shadow mb-2 text-center text-base tracking-[0.3em] text-text-primary md:text-lg"
          {...slow()}
        >
          Contact
        </motion.h2>
        <motion.p
          className="subtitle-shadow mb-12 text-center"
          {...slow(0.1)}
        >
          Let&apos;s build something together
        </motion.p>

        <div className="divider-shadow mb-12" />

        {/* Two-column: form + direct links */}
        <div className="grid gap-8 md:grid-cols-5">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-3"
            {...slow(0.15)}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Your name"
                required
                className="rounded-none border-glass-border bg-shadow-900/40 text-[0.9375rem] text-text-secondary placeholder:text-text-muted/40 focus:border-accent-violet/20 h-11 transition-colors duration-500"
              />
              <Input
                type="email"
                placeholder="Email address"
                required
                className="rounded-none border-glass-border bg-shadow-900/40 text-[0.9375rem] text-text-secondary placeholder:text-text-muted/40 focus:border-accent-violet/20 h-11 transition-colors duration-500"
              />
            </div>
            <Input
              placeholder="Subject"
              className="rounded-none border-glass-border bg-shadow-900/40 text-[0.9375rem] text-text-secondary placeholder:text-text-muted/40 focus:border-accent-violet/20 h-11 transition-colors duration-500"
            />
            <Textarea
              placeholder="Your message..."
              rows={5}
              required
              className="rounded-none border-glass-border bg-shadow-900/40 text-[0.9375rem] text-text-secondary placeholder:text-text-muted/40 focus:border-accent-violet/20 resize-none transition-colors duration-500"
            />

            <button
              type="submit"
              disabled={submitted}
              className="w-full rounded-none border border-glass-border bg-transparent px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary transition-all duration-700 hover:border-accent-violet/25 hover:text-text-primary hover-glow-sm disabled:opacity-50"
            >
              {submitted ? "Message Sent ✓" : "Send Message"}
            </button>
          </motion.form>

          {/* Direct contact links */}
          <motion.div className="md:col-span-2 space-y-4" {...slow(0.2)}>
            <p className="meta-shadow border-b border-glass-border pb-2.5 mb-5">
              Direct Contact
            </p>

            {directLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2 group"
              >
                <link.icon
                  size={14}
                  className="text-text-muted group-hover:text-accent-violet transition-colors duration-500"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-500">
                  {link.label}
                </span>
              </a>
            ))}

            <div className="pt-4 border-t border-glass-border">
              <p className="meta-shadow mb-2">
                Availability
              </p>
              <p className="text-[0.8125rem] text-text-secondary leading-[1.7]">
                Open to full-time positions and contract work.
                Based in India, flexible with remote timezones.
                Usually respond within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
