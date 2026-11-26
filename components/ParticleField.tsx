"use client";
import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number };

/** Lightweight canvas network. Reacts to the pointer, pauses off-screen, static when reduced motion is on. */
export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, running = false;
    let dots: Dot[] = [];
    const pointer = { x: -9999, y: -9999 };
    const LINK = 130;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(36, Math.min(95, Math.floor((w * h) / 15000)));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      }));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(91,212,255,${(1 - d / LINK) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dp = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (dp < 170) {
          ctx.strokeStyle = `rgba(139,124,255,${(1 - dp / 170) * 0.65})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
        ctx.fillStyle = dp < 170 ? "rgba(139,124,255,0.95)" : "rgba(91,212,255,0.85)";
        ctx.beginPath(); ctx.arc(a.x, a.y, 2, 0, Math.PI * 2); ctx.fill();
      }
    };

    const tick = () => {
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(tick); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
      if (reduce) draw();
    };
    const onLeave = () => { pointer.x = pointer.y = -9999; if (reduce) draw(); };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
