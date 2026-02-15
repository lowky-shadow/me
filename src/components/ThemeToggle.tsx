"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

const modes = ["dark", "light", "system"] as const;

const icons = {
  dark: Moon,
  light: Sun,
  system: Monitor,
} as const;

/**
 * ThemeToggle — Minimal icon button that cycles dark → light → system.
 * Adds a brief transition class to <html> for smooth color switching.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cycle = useCallback(() => {
    // Enable smooth transition
    document.documentElement.classList.add("theme-transition");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 500);

    const idx = modes.indexOf(theme as (typeof modes)[number]);
    const next = modes[(idx + 1) % modes.length];
    setTheme(next);
  }, [theme, setTheme]);

  // Render a placeholder with same dimensions to avoid layout shift
  if (!mounted) {
    return <div className="h-[18px] w-[18px]" />;
  }

  const currentMode = (theme ?? "dark") as keyof typeof icons;
  const Icon = icons[currentMode] ?? Moon;

  return (
    <button
      onClick={cycle}
      className="cursor-pointer text-text-muted transition-colors duration-300 hover:text-text-primary"
      aria-label={`Current theme: ${currentMode}. Click to switch.`}
      title={`Theme: ${currentMode}`}
    >
      <Icon size={16} strokeWidth={1.5} />
    </button>
  );
}
