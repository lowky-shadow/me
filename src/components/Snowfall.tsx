"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

/* ── Particle type ── */
interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
  targetOpacity: number;
  rotation: number;
  rotationSpeed: number;
  layer: number;
  elongation: number; // 1 = circle, >1 = petal shape
}

const SNOW_COUNT = 60;
const SAKURA_COUNT = 40;

/* ── Snowflake factory ── */
function createSnowflake(w: number, h: number, startAbove = true): Particle {
  const layer = Math.random();
  let radius: number, speed: number, opacity: number;

  if (layer < 0.6) {
    radius = 0.5 + Math.random() * 1;
    speed = 0.2 + Math.random() * 0.3;
    opacity = 0.1 + Math.random() * 0.15;
  } else if (layer < 0.9) {
    radius = 1.5 + Math.random() * 1;
    speed = 0.5 + Math.random() * 0.4;
    opacity = 0.25 + Math.random() * 0.2;
  } else {
    radius = 2.5 + Math.random() * 1.5;
    speed = 0.8 + Math.random() * 0.5;
    opacity = 0.4 + Math.random() * 0.2;
  }

  return {
    x: Math.random() * w,
    y: startAbove ? Math.random() * -h : Math.random() * h,
    radius,
    speed,
    drift: (Math.random() - 0.5) * 0.3,
    opacity,
    targetOpacity: opacity,
    rotation: 0,
    rotationSpeed: 0,
    layer: layer < 0.6 ? 0 : layer < 0.9 ? 1 : 2,
    elongation: 1,
  };
}

/* ── Sakura petal factory ── */
function createPetal(w: number, h: number, startAbove = true): Particle {
  const layer = Math.random();
  let radius: number, speed: number, opacity: number;

  if (layer < 0.5) {
    radius = 2 + Math.random() * 1.5;
    speed = 0.3 + Math.random() * 0.25;
    opacity = 0.12 + Math.random() * 0.12;
  } else if (layer < 0.85) {
    radius = 3 + Math.random() * 2;
    speed = 0.5 + Math.random() * 0.3;
    opacity = 0.18 + Math.random() * 0.15;
  } else {
    radius = 4 + Math.random() * 2.5;
    speed = 0.6 + Math.random() * 0.35;
    opacity = 0.25 + Math.random() * 0.15;
  }

  return {
    x: Math.random() * w,
    y: startAbove ? Math.random() * -h : Math.random() * h,
    radius,
    speed,
    drift: (Math.random() - 0.5) * 0.5,
    opacity,
    targetOpacity: opacity,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    layer: layer < 0.5 ? 0 : layer < 0.85 ? 1 : 2,
    elongation: 1.6 + Math.random() * 0.8, // Petal-like ellipse
  };
}

/* ── Draw functions ── */
function drawSnowflake(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.beginPath();
  const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
  gradient.addColorStop(0, `rgba(220, 230, 240, ${p.opacity})`);
  gradient.addColorStop(1, `rgba(220, 230, 240, 0)`);
  ctx.fillStyle = gradient;
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);

  ctx.beginPath();
  const rx = p.radius;
  const ry = p.radius * p.elongation;
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);

  // Soft pastel pink with subtle warmth
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry) * 1.5);
  gradient.addColorStop(0, `rgba(212, 160, 176, ${p.opacity * 1.2})`);
  gradient.addColorStop(0.6, `rgba(224, 180, 195, ${p.opacity * 0.7})`);
  gradient.addColorStop(1, `rgba(232, 195, 208, 0)`);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.restore();
}

/**
 * Snowfall — Atmospheric particle effect.
 * Dark mode → cold white snow.
 * Light mode → soft pastel sakura petals.
 */
export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | undefined>(undefined);
  const prevThemeRef = useRef<string | undefined>(undefined);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const createParticle = useCallback(
    (w: number, h: number, startAbove = true): Particle => {
      return isDark ? createSnowflake(w, h, startAbove) : createPetal(w, h, startAbove);
    },
    [isDark]
  );

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, p: Particle) => {
      if (p.opacity <= 0.005) return;
      isDark ? drawSnowflake(ctx, p) : drawPetal(ctx, p);
    },
    [isDark]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    const count = isDark ? SNOW_COUNT : SAKURA_COUNT;

    // On theme change, fade out old particles and spawn new ones
    if (prevThemeRef.current !== undefined && prevThemeRef.current !== resolvedTheme) {
      // Fade out existing particles
      particlesRef.current.forEach((p) => {
        p.targetOpacity = 0;
      });
      // After a short delay, replace with new particles
      setTimeout(() => {
        particlesRef.current = Array.from({ length: count }, () =>
          createParticle(window.innerWidth, window.innerHeight, false)
        );
      }, 400);
    } else if (particlesRef.current.length === 0) {
      // Initial load
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(window.innerWidth, window.innerHeight, true)
      );
    }
    prevThemeRef.current = resolvedTheme;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        // Smooth opacity transition
        const opacityDiff = p.targetOpacity - p.opacity;
        if (Math.abs(opacityDiff) > 0.001) {
          p.opacity += opacityDiff * 0.05;
        }

        // Update position
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.005) * (isDark ? 0.15 : 0.3);
        p.rotation += p.rotationSpeed;

        // Wrap around
        if (p.y > h + 20) {
          Object.assign(p, createParticle(w, h, true));
          p.y = -20;
        }
        if (p.x > w + 20) p.x = -20;
        else if (p.x < -20) p.x = w + 20;

        // Draw
        drawParticle(ctx, p);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [resolvedTheme, isDark, createParticle, drawParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
