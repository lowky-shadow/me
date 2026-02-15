import { Heart } from "lucide-react";

/**
 * Footer — Minimal dark-themed footer.
 */
export default function Footer() {
  return (
    <footer className="border-t border-glass-border py-8 text-center">
      <div className="mx-auto max-w-6xl px-6">
        <p className="flex items-center justify-center gap-1.5 text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Shadow. Built with
          <Heart size={14} className="text-sakura-400 inline" />
          using Next.js &amp; TailwindCSS
        </p>
      </div>
    </footer>
  );
}
