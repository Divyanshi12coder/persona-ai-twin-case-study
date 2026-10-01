import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Low-opacity neural field drawn on a single 2D canvas behind the dark hero.
 * ~42 nodes on desktop, ~18 on mobile; pauses when off-screen or the tab is hidden,
 * and renders one static frame for reduced-motion users.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let frame = 0;
    let visible = true;

    const seed = () => {
      const count = w < 700 ? 18 : 42;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const LINK = 150;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(122,167,255,${0.12 * (1 - d / LINK)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(170,195,255,0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!reduced && visible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    start();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start(); else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="neural-bg" aria-hidden="true" />;
}
