"use client";

import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
  layer: number; // 0 (far), 1 (mid), 2 (near) for depth
}

const SNOWFLAKE_COUNT = 60;

function createSnowflake(w: number, h: number): Snowflake {
  const layer = Math.random();
  let radius, speed, opacity;

  // Depth layering
  if (layer < 0.6) {
    // Far layer (60%) — smaller, slower, dimmer
    radius = 0.5 + Math.random() * 1;
    speed = 0.2 + Math.random() * 0.3;
    opacity = 0.1 + Math.random() * 0.15;
  } else if (layer < 0.9) {
    // Mid layer (30%) — medium
    radius = 1.5 + Math.random() * 1;
    speed = 0.5 + Math.random() * 0.4;
    opacity = 0.25 + Math.random() * 0.2;
  } else {
    // Near layer (10%) — larger, faster, brighter
    radius = 2.5 + Math.random() * 1.5;
    speed = 0.8 + Math.random() * 0.5;
    opacity = 0.4 + Math.random() * 0.2;
  }

  return {
    x: Math.random() * w,
    y: Math.random() * -h, // Start above viewport
    radius,
    speed,
    drift: (Math.random() - 0.5) * 0.3, // Slight horizontal drift
    opacity,
    layer: layer < 0.6 ? 0 : layer < 0.9 ? 1 : 2,
  };
}

/**
 * Snowfall — Cinematic atmospheric effect.
 * Multi-layered depth with soft, cold white particles.
 */
export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flakesRef = useRef<Snowflake[]>([]);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize flakes
    flakesRef.current = Array.from({ length: SNOWFLAKE_COUNT }, () =>
      createSnowflake(window.innerWidth, window.innerHeight)
    );

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      flakesRef.current.forEach((flake) => {
        // Update position
        flake.y += flake.speed;
        flake.x += flake.drift + Math.sin(flake.y * 0.005) * 0.15;

        // Wrap around
        if (flake.y > window.innerHeight + 10) {
          Object.assign(
            flake,
            createSnowflake(window.innerWidth, window.innerHeight)
          );
          flake.y = -10;
        }
        if (flake.x > window.innerWidth + 10) {
          flake.x = -10;
        } else if (flake.x < -10) {
          flake.x = window.innerWidth + 10;
        }

        // Draw
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          flake.radius * 2
        );
        // Soft white center, transparent edge
        // Using nearly white but slightly cool tone: 220, 230, 240
        gradient.addColorStop(0, `rgba(220, 230, 240, ${flake.opacity})`);
        gradient.addColorStop(1, `rgba(220, 230, 240, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
